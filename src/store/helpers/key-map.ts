/** Used to merge items with same keys for `Store`. */
export class KeyMap<T = any> {

	protected readonly key: keyof T
	protected map: Map<any, T>

	constructor(key: keyof T) {
		if (!key) {
			throw new Error('"key" parameter must be provided when initializing "KeyMap"!')
		}

		this.key = key
		this.map = new Map()
	}

	has(item: T): boolean {
		return this.map.has(item[this.key])
	}

	get(item: T): T | undefined{
		return this.map.get(item[this.key])
	}

	add(item: T) {
		this.map.set(item[this.key], item)
	}

	delete(item: T) {
		this.map.delete(item[this.key])
	}

	clear() {
		this.map = new Map()
	}
}

