import {Order} from '@pucelle/ff'
import {RemoteStore} from '../../store/remote-store'
import {Store} from '../../store/store'
import {Table} from '../table'


/** Can get from a table, the result can be used to restore table state. */
export interface TableStateOptions {

	/** Caches filter. Default value is `true`. */
	filter?: boolean

	/** Caches order column and direction. Default value is `true`. */
	order?: boolean

	/** Caches start index. Default value is `true`. */
	startIndex?: boolean

	/** 
	 * Caches data of store.
	 * Specifies this to `true` when you use one store to cache different data.
	 * Default value is `false`.
	 */
	data?: boolean

	/** 
	 * Caches whole store.
	 * Specifies this to `true` when you use different store to cache different data.
	 * Default value is `false`.
	 */
	store?: boolean

	/** 
	 * Customized data is an object, it will be poped-up after restore.
	 * Uses a `{}` as default if not specified.
	 */
	customized?: object
}


/** Can get from a table, the result can be used to restore table state. */
interface TableState {
	storeFilter?: ((item: any) => boolean) | string | null
	storeOrder?: {order: Order<any> | string | null, orderDirection: "" | "asc" | "desc"}
	startIndex?: number
	orderName?: string | null
	orderDirection?: '' | 'asc' | 'desc'
	data?: Map<any, any> | any[]
	store?: Store | RemoteStore
	customized?: object | undefined
}


const DefaultTableStateOptions: TableStateOptions = {
	filter: true,
	order: true,
	startIndex: true,
	data: false,
	store: false,
	customized: {},
}


export class TableStateCacher {

	private readonly table: Table
	private readonly cacheMap: Map<string, TableState> = new Map()

	constructor (table: Table) {
		this.table = table
	}

	/** Cache current table state. */
	cache(name: string, options: TableStateOptions) {
		let state = this.getState(options)
		this.cacheMap.set(name, state)
	}

	private getState(options: TableStateOptions): TableState {
		let table = this.table
		let store = this.table.store as Store | RemoteStore
		let state: TableState = {}

		options = {...DefaultTableStateOptions, ...options}

		if (options.filter) {
			state.storeFilter = store.getFilter()
		}

		if (options.order) {
			state.storeOrder = store.getOrder()
			state.orderName = table.getOrderName()
			state.orderDirection = table.getOrderDirection()
		}

		if (options.startIndex) {
			state.startIndex = table.getFirstVisibleIndex()
		}

		if (options.data) {
			state.data = store instanceof RemoteStore ? store.getCache() : store.getFullData()
		}

		if (options.store) {
			state.store = store
		}

		state.customized = options.customized

		return state
	}

	/** 
	 * Restore table state by it's cached name.
	 * Returns customized data with `{}` as default value if restored successfully,
	 * Returns `undefined` if have no cache to restore.
	 * Will clear the cache after restored.
	 */
	restore(name: string): object | undefined {
		let table = this.table
		let store = this.table.store as Store | RemoteStore

		let state = this.cacheMap.get(name)
		if (!state) {
			return undefined
		}

		if (state.storeFilter !== undefined) {
			store.setFilter(state.storeFilter as any)
		}

		if (state.storeOrder !== undefined) {
			store.setOrder(state.storeOrder.order as any, state.storeOrder.orderDirection)
		}

		if (state.orderName !== undefined && state.orderDirection !== undefined) {
			table.setOrder(state.orderName, state.orderDirection)
		}

		if (state.startIndex !== undefined) {
			table.setStartIndex(state.startIndex)
		}

		if (state.data !== undefined) {
			if (store instanceof RemoteStore) {
				store.setCache(state.data as any)
			} 
			else {
				store.setFullData(state.data as any)
			}
		}

		if (state.store) {
			table.store = store
		}

		this.clear(name)

		return state.customized
	}

	/** Clear cache with specified name. */
	clear(name: string) {
		this.cacheMap.delete(name)
	}
}