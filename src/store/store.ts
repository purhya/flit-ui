import {Emitter, Order, OrderFunction, CanSortKeys} from '@pucelle/ff'
import {KeyMap} from './helpers/key-map'


export interface StoreEvents {

	/** Triggers after current data changed. */
	dataChange: () => void
}

export interface StoreOptions<T> {
	
	/** If provided, different data items with same key will be treated as same. */
	key?: keyof T

	/** Data array for initialize. */
	data?: T[] | null

	/** Filter for initialize. */
	filter?: ((item: T) => boolean)

	/** Start order, can include several column keys and direction. */
	order?: Order<T>
}


/* Used to cache object type data and support selection, ordering and filtering. */
export class Store<T = any> extends Emitter<StoreEvents> {

	/** If `key` specified, when different but same key items added, it covers the old one. */
	protected readonly key: keyof T | null = null

	/** All data keys and mapped data items. */
	protected readonly dataMap: KeyMap<T> | null = null

	/** All selected data keys and mapped data items. */
	protected readonly selectedMap: KeyMap<T> | null = null

	/** Last clicked item, used to select range items start from it by clicking `shift + click`. */
	protected lastTouchedItem: T | null = null

	/** A filter function to filter data items. */
	protected filter: ((item: T) => boolean) | null = null

	/** Order instance, can include several column keys and direction. */
	protected order: Order<T> | null = null

	/** Current order direction. */
	protected orderDirection: 'asc' | 'desc' | '' = ''

	/** Full data before filtering or ordering. */
	protected fullData: T[] = []

	/** Current data after been filtered and sorted. */
	protected currentData: T[] = []

	/** All selected data items. */
	protected selected: T[] = []

	constructor(options: StoreOptions<T> = {}) {
		super()

		if (options.key) {
			this.key = options.key
			this.dataMap = new KeyMap(options.key)
			this.selectedMap = new KeyMap(options.key)
		}

		this.filter = options.filter || null
		this.order = options.order || null

		if (options.data) {
			this.addItems(options.data)
		}
	}

	protected addItems(items: T[], toStart: boolean = false) {
		if (items.length > 0) {
			if (this.dataMap) {
				for (let item of items) {
					this.dataMap.add(item)
				}
			}

			if (toStart) {
				this.fullData.unshift(...items)
			}
			else {
				this.fullData.push(...items)
			}

			let filteredItems = this.filter ? items.filter(this.filter) : items
			this.addItemsToCurrentData(filteredItems, toStart)
		}
	}

	protected addItemsToCurrentData(items: T[], toStart: boolean = false) {
		if (this.order) {
			if (items.length > 1) {
				let newData = [...this.currentData, ...items]
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
			if (toStart) {
				this.currentData.unshift(...items)
			}
			else {
				this.currentData.push(...items)
			}
		}
	}

	/** Get all the data. */
	getFullData(): T[] {
		return this.fullData
	}

	/** 
	 * Set all the data.
	 * will update `currentData` later, except you call `syncCurrentData`.
	 */
	setFullData(data: T[]) {
		this.fullData = data

		if (this.dataMap) {
			this.dataMap.clear()

			for (let item of data) {
				this.dataMap.add(item)
			}
		}

		this.updateCurrentDataLater()
	}

	/** Get current data. */
	getCurrentData(): T[] {
		return this.currentData
	}

	/** 
	 * Set ordering rule.
	 * will update `currentData` later, except you call `syncCurrentData`.
	 */
	setOrder(by: CanSortKeys<T> | OrderFunction<T> | null, direction: 'asc' | 'desc' | '' = '') {
		this.order = by === null ? null : new Order([by, direction || 'asc'])
		this.orderDirection = direction
		this.updateCurrentDataLater()
	}

	/** Get current ordering rule. */
	getOrder(): {order: Order<T> | null, orderDirection: "" | "asc" | "desc"} {
		return {
			order: this.order,
			orderDirection: this.orderDirection,
		}
	}

	/** 
	 * Set filter to filter data items.
	 * will update `currentData` later, except you call `syncCurrentData`.
	 */
	setFilter(filter: ((item: T) => boolean) | null) {
		this.filter = filter
		this.deselectAll()
		this.updateCurrentDataLater()
	}

	/** Get current filter. */
	getFilter(): ((item: T) => boolean) | null {
		return this.filter
	}

	/** Whether will update current data. */
	protected willUpdateCurrentData: boolean = false

	/** Update current data later after filter or order changed. */
	protected updateCurrentDataLater() {
		if (!this.willUpdateCurrentData) {
			this.willUpdateCurrentData = true

			Promise.resolve().then(() => {
				this.sync()
			})
		}
	}

	/** Update current data immediately after filter or order changed. */
	protected updateCurrentDataImmediately() {
		let currentData = this.filter ? this.fullData.filter(this.filter) : [...this.fullData]

		if (this.order) {
			this.order.sortArray(currentData)
		}

		this.currentData = currentData
	}

	/** 
	 * Normally when update `fullData`, setting filter or order will cause update current data in next micro task.
	 * If you can ensure everything is ready, you may sync to update current data immediately.
	 */
	sync() {
		if (this.willUpdateCurrentData) {
			this.updateCurrentDataImmediately()
			this.emit('dataChange')
			this.willUpdateCurrentData = false
		}
	}

	/** Add data items to the end position, removes repeative items firstly. */
	add(...items: T[]) {
		this.remove(...items)
		this.addItems(items)
		this.emit('dataChange')
	}

	/** Add data items to the start position, removes repeative items firstly. */
	addToStart(...items: T[]) {
		this.remove(...items)
		this.addItems(items, true)
		this.emit('dataChange')
	}

	/** Push data items to the end position. */
	push(...items: T[]) {
		this.addItems(items)
		this.emit('dataChange')
	}

	/** Unshift data items to the start position. */
	unshift(...items: T[]) {
		this.addItems(items, true)
		this.emit('dataChange')
	}

	/** Insert data items to specified position. */
	insert(index: number, ...items: T[]) {
		if (items.length > 0) {
			this.fullData.splice(index, 0, ...items)

			if (this.dataMap) {
				for (let item of items) {
					this.dataMap.add(item)
				}
			}

			if (this.order) {
				this.addItemsToCurrentData(this.filter ? items.filter(this.filter) : items)
			}
			else {
				this.updateCurrentDataImmediately()
			}
		}

		this.emit('dataChange')
	}

	/** Chech whether having specified item in full data. */
	has(item: T): boolean {
		if (this.dataMap) {
			return this.dataMap.has(item)
		}
		else {
			return this.fullData.includes(item)
		}
	}

	/** Chech whether having specified item in current data. */
	hasCurrent(item: T): boolean {
		if (!this.has(item)) {
			return false
		}

		if (this.filter && !this.filter(item)) {
			return false
		}

		return true
	}

	/** Get a cached item from the not pricise item that having same key. */
	get(item: T): T | undefined {
		if (this.dataMap) {
			return this.dataMap.get(item)
		}
		else {
			return item
		}
	}

	/** Removes items. */
	remove(...items: T[]): T[] {
		let toRemove: Set<T> = new Set()

		if (this.dataMap) {
			for (let item of items) {
				if (this.dataMap.has(item)) {
					toRemove.add(this.dataMap.get(item)!)
					this.dataMap.delete(item)
				}
			}
		}
		else {
			for (let item of items) {
				if (this.fullData.includes(item)) {
					toRemove.add(item)
				}
			}
		}

		if (toRemove.size > 0) {
			this.fullData = this.fullData.filter(item => !toRemove.has(item))

			if (this.dataMap) {
				this.currentData = this.currentData.filter(item => this.dataMap!.has(item))
			}
			else {
				this.currentData = this.currentData.filter(item => !toRemove.has(item))
			}
			
			this.deselect(...toRemove)
			this.emit('dataChange')
		}

		return [...toRemove]
	}

	/** Get selected data. */
	getSelected(): T[] {
		return this.selected
	}

	/** Get selected data. */
	setSelected(items: T[]) {
		this.selected = items
	}

	/** Returns whether an item is selected. */
	isSelected(item: T): boolean {
		if (this.selectedMap) {
			return this.selectedMap.has(item)
		}
		else {
			return this.selected.includes(item)
		}
	}

	/** Whether selected at least one, but not all. */
	isPartlySelected(): boolean {
		let selectedCount = this.selected.length
		return selectedCount > 0 && selectedCount < this.currentData.length
	}

	/** Whether selected all items. */
	isSelectedAll(): boolean {
		let selectedCount = this.selected.length
		return selectedCount > 0 && selectedCount === this.currentData.length
	}

	/** Get selected count. */
	getSelectedCount(): number {
		return this.selected.length
	}

	/** Selected items. */
	select(...items: T[]) {
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

	/** Deselect items. */
	deselect(...items: T[]) {
		if (items === this.selected) {
			this.deselectAll()
		}
		else {
			let toRemove = new Set()

			if (this.selectedMap) {
				for (let item of items) {
					if (this.selectedMap.has(item)) {
						toRemove.add(this.selectedMap.get(item))
						this.selectedMap.delete(item)
					}
				}
			}
			else {
				for (let item of items) {
					if (this.selected.includes(item)) {
						toRemove.add(item)
					}
				}
			}

			if (toRemove.size > 0) {
				this.selected = this.selected.filter(item => !toRemove.has(item))
			}
		}

		this.lastTouchedItem = items[0]
	}

	/** Toggle select state of item. */
	toggleSelect(item: T) {
		if (this.isSelected(item)) {
			this.deselect(item)
		}
		else {
			this.select(item)
		}

		this.lastTouchedItem = item
	}

	/** Select or deselect a range if pressed shify key, otherwise select or deselect one. */
	selectByKeyEvent(item: T, event: KeyboardEvent) {
		if (event.shiftKey) {
			this.shiftSelect(item)
		}
		else {
			this.toggleSelect(item)
		}
	}

	/** Select or deselect a range, from last touched item to current item. */
	shiftSelect(item: T) {
		let startIndex = Math.max(this.lastTouchedItem ? this.getFullIndexOf(this.lastTouchedItem) : 0, 0)
		let endIndex = this.getFullIndexOf(item)

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

	/** Get item index in full data. */
	getFullIndexOf(item: T): number {
		if (this.dataMap && !this.dataMap.has(item)) {
			return -1
		}

		return this.fullData.indexOf(this.get(item)!)
	}

	/** Get item index in current data. */
	getCurrentIndexOf(item: T): number {
		if (this.dataMap && !this.dataMap.has(item)) {
			return -1
		}

		return this.currentData.indexOf(this.get(item)!)
	}

	/** Select all items. */
	selectAll() {
		this.select(...this.currentData)
	}

	/** Deselect all items. */
	deselectAll() {
		this.selected = []

		if (this.selectedMap) {
			this.selectedMap.clear()
		}
	}

	/** Select all items if not, otherwise deselect all. */
	toggleSelectAll() {
		if (this.isSelectedAll()) {
			this.deselectAll()
		}
		else {
			this.selectAll()
		}
	}

	/** Clears all data. */
	clear() {
		this.fullData = []
		this.currentData = []
		this.deselectAll()

		if (this.dataMap) {
			this.dataMap.clear()
		}
		
		this.emit('dataChange')
	}
}
