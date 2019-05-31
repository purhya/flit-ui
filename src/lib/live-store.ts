import {Emitter} from 'ff'


interface LiveStoreEvents {
	change: () => void
}


/**
 * Compare to `Store`, it loads data for one page each time.
 * And every time after data changed, it refreshs to reload all datas.
 * It's an extension for `liveRepeat` directive, to cache data,
 * you should extends this class to overwrite some methods.
 */
export abstract class LiveStore<Item extends object = object> extends Emitter<LiveStoreEvents> {

	version: number = 1

	abstract dataCount(): Promise<number> | number
	abstract dataGetter(start: number, size: number): Promise<Iterable<Item>> | Iterable<Item>

	setOrderKey(_key: string) {
		this.upgrade()
	}

	clearOrder() {
		this.upgrade()
	}

	upgrade() {
		this.version++
		this.emit('change')
	}
}