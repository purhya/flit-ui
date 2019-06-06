import {updateStyles, updateComponents} from 'flit'
import {Color} from './color'


export interface ThemeOptions {
	mainColor?: string
	textColor?: string
	successColor?: string
	errorColor?: string
	warningColor?: string
	infoColor?:string
	borderRadius?: number
	layerRadius?: number
	fontSize?: number
	lineHeight?: number
}

type ColorOptions = {[key in 'mainColor' | 'textColor' | 'successColor' | 'errorColor' | 'warningColor' | 'infoColor']: Color}
type NotColorOptions = {[key in Exclude<keyof ThemeOptions, keyof ColorOptions>]: ThemeOptions[key]}


export const defaultThemeOptions: Required<ThemeOptions> = {
	mainColor: '#0077cf',
	textColor: '#333',
	successColor: '#00af41',
	errorColor: '#ff0000',
	warningColor: '#f48862',
	infoColor: '#3988e5',
	borderRadius: 15,
	layerRadius: 8,
	fontSize: 14,	// Should set `font-size` and `line-height` on html or body to avoid flushing.
	lineHeight: 30,
}

export class Theme implements ColorOptions, NotColorOptions {
	
	protected themeMap: Map<string, ThemeOptions> = new Map()
	protected options: ThemeOptions
	protected willUpdate: boolean = false

	constructor() {
		this.options = Object.assign({}, defaultThemeOptions)
	}

	defineTheme(name: string, options: ThemeOptions) {
		this.themeMap.set(name, options)
	}

	changeTheme(name: string) {
		if (!this.themeMap.has(name)) {
			throw new Error(`"${name}" is not a defined theme`)
		}

		this.options = this.themeMap.get(name)!
		this.updateStylesAndComponents()
	}

	set<K extends keyof ThemeOptions>(key: K, value: ThemeOptions[K]) {
		this.options[key] = value
		this.updateStylesAndComponents()
	}

	restore() {
		this.options = Object.assign({}, defaultThemeOptions)
		this.updateStylesAndComponents()
	}

	updateStylesAndComponents() {
		if (!this.willUpdate) {
			this.willUpdate = true

			Promise.resolve().then(() => {
				updateStyles()
				updateComponents()
				this.willUpdate = false
			})
		}
	}

	protected getOption<P extends keyof ThemeOptions>(property: P): Required<ThemeOptions>[P] {
		if (this.options[property] !== undefined) {
			return this.options[property]! as Required<ThemeOptions>[P]
		}
		else {
			return defaultThemeOptions[property]
		}
	}

	/** Pass the px value for `font-size` on default theme settings, returns the size in current theme settings. */
	get fs() {
		return (size: number): number =>  {
			return Math.max(Math.ceil(size * this.fontSize / defaultThemeOptions.fontSize), 11)
		}
	}

	/** Pass the px value for `line-height` on default theme settings, returns the line height in current theme settings. */
	get lh() {
		return (size: number): number => {
			return Math.round(size * this.lineHeight / defaultThemeOptions.lineHeight)
		}
	}

	get mainColor(): Color {
		return new Color(this.getOption('mainColor'))
	}

	get textColor(): Color {
		return new Color(this.getOption('textColor'))
	}

	get successColor(): Color {
		return new Color(this.getOption('successColor'))
	}

	get errorColor(): Color {
		return new Color(this.getOption('errorColor'))
	}

	get warningColor(): Color {
		return new Color(this.getOption('warningColor'))
	}

	get infoColor(): Color {
		return new Color(this.getOption('infoColor'))
	}

	get borderRadius() {
		return this.getOption('borderRadius')
	}

	get layerRadius() {
		return this.getOption('layerRadius')
	}

	get fontSize() {
		return this.getOption('fontSize')
	}

	get lineHeight() {
		return this.getOption('lineHeight')
	}
}

export const theme = new Theme()
