import {Emitter} from 'ff'
import {LiveAsyncRepeatDirective} from 'flit'


interface AsyncStoreEvents {
	change: () => void
}


/**
 * Compare to `Store`, it loads data for one page each time.
 * And every time after data changed, it refreshs to reload all datas.
 * It's an extension for `liveRepeat` directive, to cache data,
 * you should extends this class to supports like column ordering and searching.
 */
export abstract class AsyncStore<Item extends object = object> extends Emitter<AsyncStoreEvents> {

	repeatDir!: LiveAsyncRepeatDirective<Item>
	orderKey: string = ''
	orderDirection: 'asc' | 'desc' | '' = ''

	abstract dataCount(): Promise<number> | number
	abstract dataGetter(start: number, size: number): Promise<Iterable<Item>> | Iterable<Item>

	setRepeatDirective(dir: LiveAsyncRepeatDirective<Item>) {
		this.repeatDir = dir
	}
	
	reset() {
		if (this.repeatDir) {
			this.repeatDir.reset()
		}
		this.emit('change')
	}

	setOrder(key: string, direction: 'asc' | 'desc' | '') {
		this.orderKey = key
		this.orderDirection = direction

		if (this.repeatDir) {
			this.repeatDir.reload()
		}
		this.emit('change')
	}

	clearOrder() {
		this.orderKey = ''
		this.orderDirection = ''

		if (this.repeatDir) {
			this.repeatDir.reload()
		}
		this.emit('change')
	}
}