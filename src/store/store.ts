import {Emitter, Order} from 'ff'


export interface StoreEvents {
	change: () => void
}

export interface StoreOptions<Item> {
	data?: Item[] | null
	key?: string | number
	filter?: ((item: Item) => boolean)
	order?: Order<Item>
}


/** Used to replace same key items in `Store`. */
class KeyMap<Item extends object> {

	private key: string | number
	private map: Map<string | number, Item>

	constructor(key: string | number) {
		if (!key) {
			throw new Error('"key" must be provided when instantiate "KeyMap"!')
		}

		this.key = key
		this.map = new Map()
	}

	has(item: Item): boolean {
		return this.map.has((item as any)[this.key])
	}

	get(item: Item): Item | undefined{
		return this.map.get((item as any)[this.key])
	}

	add (item: Item) {
		this.map.set((item as any)[this.key], item)
	}

	delete(item: Item) {
		this.map.delete((item as any)[this.key])
	}

	clear() {
		this.map = new Map()
	}
}


/* Used to cache object type data and support selection, ordering and filtering. */
export class Store<Item extends object = object> extends Emitter<StoreEvents> {

	/** The whole data. */
	data: Item[] = []

	/** Current data after been sorted and filtered. */
	currentData: Item[] = []

	/** If `key` specified, when different but same key items added, it covers the old one. */
	key: string | number | null = null

	/** Used to filter data items. */
	filter: ((item: Item) => boolean) | null = null

	/** used to sort items, see `ff.orderBy` */
	order: Order<Item> | null = null

	/** Used to select range items by `shift + click`. */
	private lastTouchedItem: Item | null = null

	private selected: Item[] = []
	private map: KeyMap<Item> | null = null
	private selectedMap: KeyMap<Item> | null = null

	constructor(options: StoreOptions<Item> = {}) {
		super()

		if (options.key) {
			this.map = new KeyMap(options.key)
			this.selectedMap = new KeyMap(options.key)
		}

		let data = options.data
		delete options.data
		Object.assign(this, options)
		this.initData(data)
	}

	private initData(data: Item[] | null | undefined) {
		if (data) {
			this.addItems(data)
		}
	}

	private addItems(items: Item[], atStart: boolean = false) {
		if (items.length > 0) {
			if (this.map) {
				for (let item of items) {
					this.map.add(item)
				}
			}

			if (atStart) {
				this.data.unshift(...items)
			}
			else {
				this.data.push(...items)
			}

			let filteredItems = this.filter ? items.filter(this.filter) : items
			this.addItemsToCurrentData(filteredItems, atStart)
		}
	}

	private addItemsToCurrentData(items: Item[], atStart: boolean = false) {
		if (this.order) {
			if (items.length > 1) {
				let newData = this.currentData.length > 0 ? [...this.currentData, ...items] : items
				this.order.sortArray(newData)
				this.currentData = newData
			}
			else {
				for (let item of items) {
					this.order.binaryInsert(this.currentData, item)
				}
			}
		}
		else {
			if (atStart) {
				this.currentData.unshift(...items)
			}
			else {
				this.currentData.push(...items)
			}
		}
	}

	setOrder(order: Order<Item> | null) {
		this.order = order
		this.updateCurrentData()
		this.emit('change')
	}

	clearOrder() {
		this.setOrder(null)
	}

	setFilter(filter: ((item: Item) => boolean) | null) {
		this.filter = filter
		this.updateCurrentData()
		this.deselectAll()
		this.emit('change')
	}

	clearFilter() {
		this.setFilter(null)
	}

	private updateCurrentData() {
		this.clearCurrentData()
		this.addItemsToCurrentData(this.filter ? this.data.filter(this.filter) : this.data)
	}

	private clearCurrentData() {
		this.currentData = []
	}

	add(...items: Item[]) {
		this.remove(...items)
		this.addItems(items)
		this.emit('change')
	}

	addToStart(...items: Item[]) {
		this.remove(...items)
		this.addItems(items, true)
		this.emit('change')
	}

	push(...items: Item[]) {
		this.addItems(items)
		this.emit('change')
	}

	unshift(...items: Item[]) {
		this.addItems(items, true)
		this.emit('change')
	}

	insert(index: number, ...items: Item[]) {
		if (items.length > 0) {
			this.data.splice(index, 0, ...items)

			if (this.map) {
				for (let item of items) {
					this.map.add(item)
				}
			}

			if (this.order) {
				this.addItemsToCurrentData(this.filter ? items.filter(this.filter) : items)
			}
			else {
				this.updateCurrentData()
			}
		}

		this.emit('change')
	}

	has(item: Item): boolean {
		if (this.map) {
			return this.map.has(item)
		}
		else {
			return this.data.includes(item)
		}
	}

	get(item: Item): Item | undefined {
		if (this.map) {
			return this.map.get(item)
		}
		else {
			return item
		}
	}

	remove(...items: Item[]): Item[] {
		let toRemoveSet: Set<Item> = new Set()

		if (this.map) {
			for (let item of items) {
				if (this.map.has(item)) {
					toRemoveSet.add(this.map.get(item)!)
					this.map.delete(item)
				}
			}
		}
		else {
			for (let item of items) {
				if (this.data.includes(item)) {
					toRemoveSet.add(item)
				}
			}
		}

		if (toRemoveSet.size > 0) {
			this.data = this.data.filter(item => !toRemoveSet.has(item))

			if (this.map) {
				this.currentData = this.currentData.filter(item => this.map!.has(item))
			}
			else {
				this.currentData = this.currentData.filter(item => !toRemoveSet.has(item))
			}
			
			this.deselect(...toRemoveSet)
			this.emit('change')
		}

		return [...toRemoveSet]
	}

	isSelected(item: Item): boolean {
		if (this.selectedMap) {
			return this.selectedMap.has(item)
		}
		else {
			return this.selected.includes(item)
		}
	}

	isPartlySelected(): boolean {
		let selectedCount = this.selected.length
		return selectedCount > 0 && selectedCount < this.currentData.length
	}

	isSelectedAll(): boolean {
		let selectedCount = this.selected.length
		return selectedCount > 0 && selectedCount === this.currentData.length
	}

	getSelectedCount(): number {
		return this.selected.length
	}

	select(...items: Item[]) {
		if (this.selectedMap) {
			for (let item of items) {
				if (!this.selectedMap.has(item)) {
					this.selected.push(item)
					this.selectedMap.add(item)
				}
			}
		}
		else {
			for (let item of items) {
				if (!this.selected.includes(item)) {
					this.selected.push(item)
				}
			}
		}

		this.lastTouchedItem = items[0]
	}

	deselect(...items: Item[]) {
		if (items === this.selected) {
			this.deselectAll()
		}
		else {
			let toRemoveSet = new Set()

			if (this.selectedMap) {
				for (let item of items) {
					if (this.selectedMap.has(item)) {
						toRemoveSet.add(this.selectedMap.get(item))
						this.selectedMap.delete(item)
					}
				}
			}
			else {
				for (let item of items) {
					if (this.selected.includes(item)) {
						toRemoveSet.add(item)
					}
				}
			}

			if (toRemoveSet.size > 0) {
				this.selected = this.selected.filter(item => !toRemoveSet.has(item))
			}
		}

		this.lastTouchedItem = items[0]
	}

	toggleSelect(item: Item) {
		if (this.isSelected(item)) {
			this.deselect(item)
		}
		else {
			this.select(item)
		}

		this.lastTouchedItem = item
	}

	selectByKeyboardEvent(item: Item, event: KeyboardEvent) {
		if (event.shiftKey) {
			this.shiftSelect(item)
		}
		else {
			this.toggleSelect(item)
		}
	}

	shiftSelect(item: Item) {
		let startIndex = Math.max(this.lastTouchedItem ? this.getIndex(this.lastTouchedItem) : 0, 0)
		let endIndex = this.getIndex(item)

		if (endIndex >= 0) {
			if (startIndex > endIndex) {
				[startIndex, endIndex] = [endIndex, startIndex]
			}

			endIndex += 1

			if (this.isSelected(item)) {
				this.deselect(...this.currentData.slice(startIndex, endIndex))
			}
			else {
				this.select(...this.currentData.slice(startIndex, endIndex))
			}
		}
	}

	getIndex(item: Item): number {
		if (this.map && !this.map.has(item)) {
			return -1
		}

		return this.data.indexOf(this.get(item)!)
	}

	selectAll() {
		this.select(...this.currentData)
	}

	deselectAll() {
		this.selected = []

		if (this.selectedMap) {
			this.selectedMap.clear()
		}
	}

	toggleSelectAll() {
		if (this.isSelectedAll()) {
			this.deselectAll()
		}
		else {
			this.selectAll()
		}
	}

	clear() {
		this.data = []
		this.clearCurrentData()
		this.deselectAll()

		if (this.map) {
			this.map.clear()
		}
		
		this.emit('change')
	}
}
