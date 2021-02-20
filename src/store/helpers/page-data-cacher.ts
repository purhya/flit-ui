import {repeatForTimes} from '@pucelle/ff'


/** Page data getter. */
export type PageDataGetter<T> = (startIndex: number, endIndex: number) => Promise<Iterable<T>> | Iterable<T>


export class PageDataCacher<T> {

	private readonly pageSize: number
	private readonly dataCount: () => (number | Promise<number>)
	private readonly dataGetter: PageDataGetter<T>
	private readonly preloadPageCount: number

	private cache: Map<number, (T | null)[]> = new Map()
	private requests: Map<number, Promise<void>> = new Map()
	private totalDataCount: number | null = null

	constructor(pageSize: number, dataCount: () => (number | Promise<number>), dataGetter: PageDataGetter<T>, preloadPageCount: number = 0) {
		this.pageSize = pageSize
		this.dataCount = dataCount
		this.dataGetter = dataGetter
		this.preloadPageCount = preloadPageCount
	}

	/** Get data count and also caches it. */
	async getDataCount() {
		if (this.totalDataCount !== null) {
			return this.totalDataCount
		}

		let dataCountConfig = this.dataCount
		let dataCount: number | Promise<number>
		let knownDataCount = 0

		if (typeof dataCountConfig === 'function') {
			dataCount = dataCountConfig()
		}
		else {
			dataCount = dataCountConfig
		}
		
		if (dataCount instanceof Promise) {
			knownDataCount = await dataCount
		}
		else {
			knownDataCount = dataCount
		}

		this.totalDataCount = knownDataCount

		return knownDataCount
	}


	/** Get data items immediately. */
	getImmediateData(startIndex: number, endIndex: number): (T | null)[] {
		let startPageIndex = Math.floor(startIndex / this.pageSize)		// 49 -> 0, 50 -> 1
		let endPageIndex = Math.floor((endIndex - 1) / this.pageSize)	// 50 -> 0, 51 -> 1
		let items: (T | null)[] = []

		for (let i = startPageIndex; i <= endPageIndex; i++) {
			let cacheItems = this.cache.get(i)
			let pageItems = cacheItems
			
			if (!pageItems) {
				pageItems = repeatForTimes(null, this.pageSize)
			}

			if (i === startPageIndex && i === endPageIndex) {
				items.push(...pageItems.slice(startIndex - startPageIndex * this.pageSize, endIndex - endPageIndex * this.pageSize))
			}
			else if (i === startPageIndex) {
				items.push(...pageItems.slice(startIndex - startPageIndex * this.pageSize))
			}
			else if (i === endPageIndex) {
				items.push(...pageItems.slice(0, endIndex - endPageIndex * this.pageSize))
			}
			else {
				items.push(...pageItems)
			}
		}

		this.preloadDataIfNeeded(endPageIndex + 1)

		return items
	}

	/** Get fresh data items. */
	async getFreshData(startIndex: number, endIndex: number): Promise<T[]> {
		let startPageIndex = Math.floor(startIndex / this.pageSize)		// 49 -> 0, 50 -> 1
		let endPageIndex = Math.floor((endIndex - 1) / this.pageSize)	// 50 -> 0, 51 -> 1
		let promises: Promise<void>[] = []

		for (let i = startPageIndex; i <= endPageIndex; i++) {
			promises.push(this.ensurePageData(i))
		}

		this.preloadDataIfNeeded(endPageIndex + 1)

		await Promise.all(promises)
		return this.getImmediateData(startIndex, endIndex) as T[]
	}

	/** Preload more pages of data. */
	private async preloadDataIfNeeded(startPageIndex: number) {
		if (this.totalDataCount !== null && this.preloadPageCount > 0) {
			let endPageIndex = Math.floor((this.totalDataCount - 1) / this.pageSize)	// 50 -> 0, 51 -> 1

			for (let i = startPageIndex; i <= endPageIndex && i < startPageIndex + this.preloadPageCount; i++) {
				await this.ensurePageData(i)
			}
		}
	}

	/** Load page data if needed. */
	private async ensurePageData(pageIndex: number) {
		if (!this.cache.has(pageIndex)) {
			await this.loadPageData(pageIndex)
		}
	}

	/** Load  page data in specified index. */
	private loadPageData(pageIndex: number): Promise<void> {
		// It's very often that you load one page of data, and then still load this page after scrolled.
		// So we need to cache requests for pages before it returned.
		if (this.requests.has(pageIndex)) {
			return this.requests.get(pageIndex)!
		}

		let startIndex = pageIndex * this.pageSize
		let endIndex = (pageIndex + 1) * this.pageSize
		
		if (this.totalDataCount !== null) {
			endIndex = Math.min(endIndex, this.totalDataCount)
		}

		let requestPromise = this.dataGetter(startIndex, endIndex)

		if (requestPromise instanceof Promise) {
			let promise = requestPromise.then(items => {
				let fresh = this.requests.has(pageIndex)

				if (fresh) {
					this.cache.set(pageIndex, [...items])
					this.requests.delete(pageIndex)
				}
			})

			this.requests.set(pageIndex, promise)

			return promise
		}
		else {
			this.cache.set(pageIndex, [...requestPromise])
			return Promise.resolve()
		}
	}

	/** Moves data after insert or delete at specified index. */
	moveData(index: number, moveCount: number) {
		if (moveCount === 0) {
			return
		}

		let startPageIndex = Math.floor(index / this.pageSize)
		let endPageIndex = Math.floor((index + moveCount) / this.pageSize)

		if (startPageIndex > endPageIndex) {
			[startPageIndex, endPageIndex] = [endPageIndex, startPageIndex]
		}

		let maxPageIndex = Math.max(...this.cache.keys())
		let maxIndex = this.cache.get(maxPageIndex)!.length + maxPageIndex * this.pageSize
		let maxNewIndex = maxIndex + moveCount
		let maxNewPageIndex = Math.ceil(maxNewIndex / this.pageSize)

		// Moves right, get each from a left position.
		if (moveCount > 0) {
			for (let pageIndex = maxNewPageIndex; pageIndex > endPageIndex; pageIndex--) {
				let startIndex = pageIndex * this.pageSize
				let endIndex = pageIndex * this.pageSize + this.pageSize

				startIndex -= moveCount
				endIndex -= moveCount

				this.makeNewCacheItem(pageIndex, startIndex, endIndex)
			}
		}

		// Moves left, get each from a right position.
		else {
			for (let pageIndex = endPageIndex + 1; pageIndex <= maxNewPageIndex; pageIndex++) {
				let startIndex = pageIndex * this.pageSize
				let endIndex = pageIndex * this.pageSize + this.pageSize

				startIndex -= moveCount
				endIndex -= moveCount

				this.makeNewCacheItem(pageIndex, startIndex, endIndex)
			}
		}

		// Removes the affected pages.
		for (let pageIndex = startPageIndex; pageIndex <= endPageIndex; pageIndex++) {
			this.cache.delete(pageIndex)
		}

		// Removes the rest pages.
		for (let pageIndex = maxNewPageIndex + 1; pageIndex <= maxPageIndex; pageIndex++) {
			this.cache.delete(pageIndex)
		}

		// Removes the requests that affected.
		for (let pageIndex of [...this.requests.keys()]) {
			if (pageIndex >= startPageIndex) {
				this.requests.delete(pageIndex)
			}
		}

		if (this.totalDataCount !== null) {
			this.totalDataCount += moveCount
		}
	}

	/** Create new cache item from start and end indices. */
	private makeNewCacheItem(pageIndex: number, startIndex: number, endIndex: number) {
		let items = this.getImmediateData(startIndex, endIndex)
		let hasAnyItem = items.some(item => item !== null)

		if (hasAnyItem) {
			this.cache.set(pageIndex, items)
			return true
		}

		return false
	}

	/** Clear all data cache. */
	clear() {
		this.cache = new Map()
		this.totalDataCount = null
	}
}