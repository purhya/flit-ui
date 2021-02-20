import {encodeHTML, format} from '@pucelle/ff'
import {updateAllComponents} from '@pucelle/flit'


export class Translations {

	protected language: string = 'en-us'
	protected data: Map<string, Record<string, string>> = new Map([['en-us', {}]])

	/** Get current language. */
	getLanguage() {
		return this.language
	}

	/** 
	 * Set current language and update all components.
	 * @language Language to set, like `en-us`, `zh-cn`.
	 */
	setLanguage(language: string) {
		this.language = language
		updateAllComponents()
	}

	/** 
	 * Add a translation pieces in `{key: value}` format.
	 * @language Language to add translation pieces to.
	 * @pieces Translation pieces, in `{key: translation, ...}` format.
	 */
	add(language: string, pieces: Record<string, string>) {
		let data = this.data.get(language)
		if (!data) {
			this.data.set(language, data = {})
		}

		Object.assign(data, pieces)
	}

	/** 
	 * Get translation value from key and may format with arguments.
	 * @param key Translation key.
	 * @param args Parameters format translation value.
	 */
	get(key: string, ...args: (string | number)[]): string {
		let data = this.data.get(this.language)
		
		if (!data) {
			data = this.data.get('en-us')!
		}

		let value = data[key]

		if (args.length) {
			value = format(value, args)
		}

		return value
	}
	
	/** 
	 * Translate string like `DefaultValue@@key`.
	 * @param key Translation key.
	 * @param args Parameters format translation value.
	 */
	translate(key: string, ...args: (string | number)[]): string {
		let [defaultValue, id] = key.split('@@')
		let data = this.data.get(this.language)
		let value: string = ''

		if (!data) {
			data = this.data.get('en-us')
		}

		if (id) {
			value = data![id] || defaultValue
		}

		if (args.length) {
			value = format(value, args)
		}

		return value
	}

	/** 
	 * Translate `"xxx"` to `<b>xxx</b>`.
	 * @param key Translation key.
	 * @param args Parameters format translation value.
	 */
	translateQuoteToBold(key: string, ...args: (string | number)[]): string {
		let value = this.translate(key, ...args.map(arg => encodeHTML(String(arg))))
		return value.replace(/"(.+?)"/g, '<b>$1</b>')
	}
}


/** Global transition API. */
export const translations = new Translations()


/** Transitions for `<f-dialog>`. */
translations.add('en-us', {
	ok: 'OK',
	cancel: 'Cancel',
	yes: 'Yes',
	no: 'No',
})
