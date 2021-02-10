import {updateAllComponents, updateAllStyles} from '@pucelle/flit'
import {avg} from '@pucelle/ff'
import {Color} from './color'


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

	popupBackgroundColor: string
	popupBorderRadius: number
	popupShadowColor: string
	popupShadowBlurRadius: number

	focusBlurRadius: number

	fontSize: number

	/** Note that the `lineHeight` is the height of normal one line components, not the `lineHeight` of multiple lines. */
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

	'popupBackgroundColor' |
	'popupShadowColor'
]: Color}

type NotColorOptions = {[key in Exclude<keyof ThemeOptions, keyof ColorOptions>]: ThemeOptions[key]}


export class Theme implements ColorOptions, NotColorOptions {
	
	protected themeMap: Map<string, Partial<ThemeOptions>> = new Map()
	protected options: ThemeOptions
	protected willUpdate: boolean = false
	
	mode: 'dark' | 'light' = 'light'

	constructor() {
		this.options = Object.assign({}, defaultLightThemeOptions, defaultMediumThemeOptions) as ThemeOptions
	}

	defineTheme(name: string, options: Partial<ThemeOptions>) {
		this.themeMap.set(name, options)
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

	/** Assigns theme options to current options, so it may keep options of last theme. */
	changeTheme(...names: string[]) {
		for (let name of names) {
			if (!this.themeMap.has(name)) {
				throw new Error(`"${name}" is not a defined theme`)
			}

			Object.assign(this.options, this.themeMap.get(name)!)
		}

		this.mode = this.getThemeDrakOrLightMode(this.options)
		this.update()
	}

	set<K extends keyof ThemeOptions>(key: K, value: ThemeOptions[K]) {
		this.options[key] = value
		this.update()
	}

	protected async update() {
		if (!this.willUpdate) {
			this.willUpdate = true

			await Promise.resolve()
			updateAllComponents()
			updateAllStyles()
			this.willUpdate = false
		}
	}

	protected getOption<P extends keyof ThemeOptions>(property: P): ThemeOptions[P] {
		return this.options[property] as ThemeOptions[P]
	}

	/** 
	 * Pass the px value for `font-size` on default theme settings, returns the size in current theme settings.
	 * Returns value will be at least 11.
	 */
	get adjustFontSize() {
		return (size: number): number =>  {
			return Math.max(Math.round(size * this.fontSize / defaultMediumThemeOptions.fontSize!), 11)
		}
	}

	/** Pass the px value for `line-height` on default theme settings, returns the line height in current theme settings. */
	get adjust() {
		return (size: number): number => {
			return Math.round(size * this.lineHeight / defaultMediumThemeOptions.lineHeight!)
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


	get popupBackgroundColor(): Color {
		return new Color(this.getOption('popupBackgroundColor'))
	}

	get popupBorderRadius() {
		return this.getOption('popupBorderRadius')
	}

	get popupShadowBlurRadius() {
		return this.getOption('popupShadowBlurRadius')
	}

	get popupShadowColor() {
		return new Color(this.getOption('popupShadowColor'))
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


const defaultLightThemeOptions: Partial<ThemeOptions> = {
	mainColor: '#3a6cf6',
	backgroundColor: '#fff',
	textColor: '#000',

	infoColor: '#3369fa',
	successColor: '#29bc04',
	errorColor: '#e10000',
	warningColor: '#f3b907',

	borderColor: '#9b9b9b',

	popupBackgroundColor: '#fff',
	popupShadowColor: 'rgba(0, 0, 0, 0.4)',
}

const defaultMediumThemeOptions: Partial<ThemeOptions> = {
	borderRadius: 4,
	popupBorderRadius: 4,
	popupShadowBlurRadius: 6,
	focusBlurRadius: 6,
	fontSize: 14,	// Should set `font-size` and `line-height` on html or body early before js loaded to avoid flushing.
	lineHeight: 28,
}


export const theme = new Theme()

theme.defineTheme('light', defaultLightThemeOptions)

theme.defineTheme('dark', {
	mainColor: '#3a6cf6',
	backgroundColor: '#333',
	textColor: '#eee',
	borderColor: '#888',
	popupBackgroundColor: '#333',
	popupShadowColor: 'rgba(0, 0, 0, 0.6)',
})

theme.defineTheme('small', {
	fontSize: 13,
	lineHeight: 24,
})

theme.defineTheme('medium', defaultMediumThemeOptions)

theme.defineTheme('large', {
	fontSize: 16,
	lineHeight: 32,
})

theme.defineTheme('touch', {
	fontSize: 18,
	lineHeight: 46,
})