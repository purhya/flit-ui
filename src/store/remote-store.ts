import {CanSortKeys, EventEmitter} from '@pucelle/ff'
import {LiveAsyncRepeatDataOptions} from '@pucelle/flit'
import {PageDataCacher} from './helpers/page-data-cacher'


export interface RemoteStoreEvents {

	/** Triggers after data changed. */
	dataChange: () => void
}


export interface RemoteStoreOptions {

	/** Data item count in one page, dedided by backend interface */
	pageSize?: number

	/** How many pages of data to be preloaded. */
	preloadPageCount?: number
}


/**
 * Compare to `Store`, `RemoteStore` loads data for one page each time.
 * And every time after data changed, it refreshs to reload data from server.
 * 
 * You should extends this class and overwrite abstract methods,
 * and should support like column ordering and filtering or searching in backend.
 */
export abstract class RemoteStore<T = any> extends EventEmitter<RemoteStoreEvents> {

	protected readonly cacher: PageDataCacher<T>

	/** Main key property. */
	protected readonly key: keyof T | null = null

	/** Current ordered key. */
	protected orderKey: CanSortKeys<T> | null = null

	/** Current ordered direction. */
	protected orderDirection: 'asc' | 'desc' | '' = ''

	/** Word to filter results. */
	protected filterWord: string | null = null

	constructor(options: RemoteStoreOptions = {}) {
		super()

		let pageSize = options.pageSize ?? 50
		let preloadPageCount = options.preloadPageCount ?? 0
		this.cacher = new PageDataCacher(pageSize, this.dataCount.bind(this), this.dataGetter.bind(this), preloadPageCount)
	}

	/** Get total data count. */
	protected abstract dataCount(): Promise<number> | number

	/** Get page data from start and end indices. */
	protected abstract dataGetter(startIndex: number, endIndex: number): Promise<Iterable<T>> | Iterable<T>

	/** Set ordering key and apply it to backend. */
	setOrder(key: CanSortKeys<T> | null, direction: 'asc' | 'desc' | '' = '') {
		this.orderKey = key
		this.orderDirection = direction
		this.reloadLater()
	}

	/** Get order rule. */
	getOrder(): {order: string | null, orderDirection: "" | "asc" | "desc"} {
		return {
			order: this.orderKey as string,
			orderDirection: this.orderDirection,
		}
	}

	/** Set filter word to filter data items and apply it to backend. */
	setFilter(filterWord: string | null) {
		this.filterWord = filterWord
		this.reloadLater()
	}

	/** Get current filter word. */
	getFilter(): string | null {
		return this.filterWord
	}

	/** Get cache map. */
	getCache() {
		return this.cacher.getCache()
	}

	/** Set cache map. */
	setCache(cacheMap: Map<number, (T | null)[]>) {
		this.cacher.setCache(cacheMap)
	}

	/** Whether will reload. */
	protected willReload: boolean = false

	/** Clear cache data later. */
	protected reloadLater() {
		if (!this.willReload) {
			Promise.resolve().then(() => {
				this.sync()
			})

			this.willReload = true
		}
	}

	/** Clear cache data immediately. */
	protected reloadImmediately() {
		this.cacher.clear()
	}

	/** 
	 * Normally when calls `reload`, setting filter or order will cause update current data in next micro task.
	 * If you can ensure everything is ready, you may sync to load new data immediately.
	 */
	sync() {
		if (this.willReload) {
			this.reloadImmediately()
			this.emit('dataChange')
			this.willReload = false
		}
	}

	/** Reload all data. */
	reload() {
		this.reloadLater()
	}

	/** Get data items immediately. */
	async getDataCount(): Promise<number> {
		return await this.cacher.getDataCount()
	}

	/** Get data items immediately. */
	getImmediateData(startIndex: number, endIndex: number): (T | null)[] {
		return this.cacher.getImmediateData(startIndex, endIndex)
	}

	/** Get fresh data items. */
	async getFreshData(startIndex: number, endIndex: number): Promise<T[]> {
		return this.cacher.getFreshData(startIndex, endIndex)
	}

	/** Get options for `liveAsyncRepeatDirective`. */
	getLiveAsyncRepeatDirectiveOptions(): LiveAsyncRepeatDataOptions<T> {
		return {
			key: this.key || undefined,
			dataCount: this.getDataCount.bind(this),
			immediateDataGetter: this.getImmediateData.bind(this),
			asyncDataGetter: this.getFreshData.bind(this),
		}
	}
}