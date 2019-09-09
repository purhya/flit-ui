import {updateStyles, update} from 'flit'
import {Color} from './color'
import {avg} from 'ff';


export interface ThemeOptions {
	mainColor: string
	backgroundColor: string
	textColor: string
	
	successColor: string
	errorColor: string
	warningColor: string
	infoColor:string

	borderColor: string
	borderRadius: number

	layerBackgroundColor: string
	layerBorderRadius: number
	layerShadowColor: string
	layerShadowBlurRadius: number

	focusBlurRadius: number

	fontSize: number
	lineHeight: number
}

type ColorOptions = {[key in
	'mainColor' |
	'backgroundColor' |
	'textColor' |

	'borderColor' |
	'successColor' |
	'errorColor' |
	'warningColor' |
	'infoColor' |

	'layerBackgroundColor' |
	'layerShadowColor'

]: Color}

type NotColorOptions = {[key in Exclude<keyof ThemeOptions, keyof ColorOptions>]: ThemeOptions[key]}


const defaultLightThemeOptions: ThemeOptions = {
	mainColor: '#0077cf',
	backgroundColor: '#fff',
	textColor: '#333',

	successColor: '#00af41',
	errorColor: '#ff0000',
	warningColor: '#f48862',
	infoColor: '#3988e5',

	borderColor: '#777',
	borderRadius: 15,

	layerBackgroundColor: '#fff',
	layerBorderRadius: 8,
	layerShadowColor: 'rgba(0, 0, 0, 0.33)',
	layerShadowBlurRadius: 6,

	focusBlurRadius: 3,
	fontSize: 14,	// Should set `font-size` and `line-height` on html or body early before js loaded to avoid flushing.
	lineHeight: 30,
}

const defaultDrakThemeOptions: ThemeOptions = {
	mainColor: '#2288cc',
	backgroundColor: '#303030',
	textColor: new Color('#fff').darken(10).toString(),

	successColor: '#00af41',
	errorColor: '#ff0000',
	warningColor: '#f48862',
	infoColor: '#3988e5',

	borderColor: '#aaa',
	borderRadius: 15,

	layerBackgroundColor: new Color('#303030').lighten(5).toString(),
	layerBorderRadius: 8,
	layerShadowColor: 'rgba(0, 0, 0, 0.66)',
	layerShadowBlurRadius: 6,

	focusBlurRadius: 3,
	fontSize: 14,	// Should set `font-size` and `line-height` on html or body early before js loaded to avoid flushing.
	lineHeight: 30,
}

export class Theme implements ColorOptions, NotColorOptions {
	
	protected themeMap: Map<string, ThemeOptions> = new Map()
	protected options: ThemeOptions
	protected willUpdate: boolean = false
	mode: 'dark' | 'light' = 'light'

	constructor() {
		this.options = Object.assign({}, defaultLightThemeOptions)
	}

	defineTheme(name: string, options: Partial<ThemeOptions>) {
		let defaultTheme = this.getThemeDrakOrLightMode(options) === 'dark' ? defaultDrakThemeOptions : defaultLightThemeOptions
		this.themeMap.set(name, Object.assign({}, defaultTheme, options))
	}

	private getThemeDrakOrLightMode(options: Partial<ThemeOptions>): 'dark' | 'light' {
		if (options.backgroundColor) {
			let [r, g, b] = new Color(options.backgroundColor).getRGBA()
			if (avg([r, g, b]) < 0.5) {
				return 'dark'
			}
		}
		else if (options.textColor) {
			let [r, g, b] = new Color(options.textColor).getRGBA()
			if (avg([r, g, b]) > 0.5) {
				return 'dark'
			}
		}

		return 'light'
	}

	changeTheme(name: string) {
		if (!this.themeMap.has(name)) {
			throw new Error(`"${name}" is not a defined theme`)
		}

		this.options = this.themeMap.get(name)!
		this.mode = this.getThemeDrakOrLightMode(this.options)
		this.updateStylesAndComponents()
	}

	set<K extends keyof ThemeOptions>(key: K, value: ThemeOptions[K]) {
		this.options[key] = value
		this.updateStylesAndComponents()
	}

	updateStylesAndComponents() {
		if (!this.willUpdate) {
			this.willUpdate = true

			Promise.resolve().then(() => {
				updateStyles()
				update()
				this.willUpdate = false
			})
		}
	}

	protected getOption<P extends keyof ThemeOptions>(property: P): ThemeOptions[P] {
		return this.options[property] as ThemeOptions[P]
	}

	/** Pass the px value for `font-size` on default theme settings, returns the size in current theme settings. */
	get fs() {
		return (size: number): number =>  {
			return Math.max(Math.ceil(size * this.fontSize / defaultLightThemeOptions.fontSize), 11)
		}
	}

	/** Pass the px value for `line-height` on default theme settings, returns the line height in current theme settings. */
	get lh() {
		return (size: number): number => {
			return Math.round(size * this.lineHeight / defaultLightThemeOptions.lineHeight)
		}
	}

	get mainColor(): Color {
		return new Color(this.getOption('mainColor'))
	}

	get backgroundColor(): Color {
		return new Color(this.getOption('backgroundColor'))
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


	get borderColor(): Color {
		return new Color(this.getOption('borderColor'))
	}

	get borderRadius() {
		return this.getOption('borderRadius')
	}


	get layerBackgroundColor(): Color {
		return new Color(this.getOption('layerBackgroundColor'))
	}

	get layerBorderRadius() {
		return this.getOption('layerBorderRadius')
	}

	get layerShadowBlurRadius() {
		return this.getOption('layerShadowBlurRadius')
	}

	get layerShadowColor() {
		return new Color(this.getOption('layerShadowColor'))
	}


	get focusBlurRadius() {
		return this.getOption('focusBlurRadius')
	}

	get fontSize() {
		return this.getOption('fontSize')
	}

	get lineHeight() {
		return this.getOption('lineHeight')
	}
}

export const theme = new Theme()

theme.defineTheme('light', defaultLightThemeOptions)
theme.defineTheme('dark', defaultDrakThemeOptions)