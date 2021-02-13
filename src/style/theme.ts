import {updateAllComponents, updateAllStyles} from '@pucelle/flit'
import {avg} from '@pucelle/ff'
import {Color} from './color'


export interface ThemeOptions {

	/** Main hightlight color. */
	mainColor: string

	/** Background color. */
	backgroundColor: string

	/** Text color. */
	textColor: string
	
	/** Color for success message. */
	successColor: string

	/** Color for error message. */
	errorColor: string

	/** Color for warning message. */
	warningColor: string

	/** Color for info message. */
	infoColor:string

	/** Border color. */
	borderColor: string

	/** Border radius in pixels. */
	borderRadius: number

	/** Color of popup backgound. */
	popupBackgroundColor: string

	/** Popup border radius in pixels. */
	popupBorderRadius: number

	/** Color of popup shadow. */
	popupShadowColor: string

	/** Popup shadow blur radius in pixels. */
	popupShadowBlurRadius: number

	/** Blur radius in pixels for focus elements. */
	focusBlurRadius: number

	/** Font size. */
	fontSize: number

	/** Height of normal one line components, not the `lineHeight` of multiple lines. */
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
		this.options = {...defaultLightThemeOptions, ...defaultMediumThemeOptions} as ThemeOptions
	}

	/** Define a new theme from overwritten options. */
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

	/** 
	 * Assigns more theme options to current options, so it may keep options of last theme.
	 * Default themes includes: dark, light, small, medium, large, touch.
	 */
	assignTheme(...names: string[]) {
		for (let name of names) {
			if (!this.themeMap.has(name)) {
				throw new Error(`"${name}" is not a defined theme`)
			}

			Object.assign(this.options, this.themeMap.get(name)!)
		}

		this.mode = this.getThemeDrakOrLightMode(this.options)
		this.update()
	}

	/** Set single options. */
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
	 * Convert `font-size` on default theme settings, to the size in current theme settings.
	 * Returns value will be at least 11.
	 */
	get adjustFontSize() {
		return (size: number): number =>  {
			return Math.max(Math.round(size * this.fontSize / defaultMediumThemeOptions.fontSize!), 11)
		}
	}

	/** Convert `line-height` on default theme settings, to the line height in current theme settings. */
	get adjust() {
		return (size: number): number => {
			return Math.round(size * this.lineHeight / defaultMediumThemeOptions.lineHeight!)
		}
	}

	/** Main hightlight color. */
	get mainColor(): Color {
		return new Color(this.getOption('mainColor'))
	}

	/** Background color. */
	get backgroundColor(): Color {
		return new Color(this.getOption('backgroundColor'))
	}

	/** Text color. */
	get textColor(): Color {
		return new Color(this.getOption('textColor'))
	}

	/** Color for success message. */
	get successColor(): Color {
		return new Color(this.getOption('successColor'))
	}

	/** Color for error message. */
	get errorColor(): Color {
		return new Color(this.getOption('errorColor'))
	}

	/** Color for warning message. */
	get warningColor(): Color {
		return new Color(this.getOption('warningColor'))
	}

	/** Color for info message. */
	get infoColor(): Color {
		return new Color(this.getOption('infoColor'))
	}

	/** Border color. */
	get borderColor(): Color {
		return new Color(this.getOption('borderColor'))
	}

	/** Border radius in pixels. */
	get borderRadius() {
		return this.getOption('borderRadius')
	}

	/** Color of popup backgound. */
	get popupBackgroundColor(): Color {
		return new Color(this.getOption('popupBackgroundColor'))
	}

	/** Popup border radius in pixels. */
	get popupBorderRadius() {
		return this.getOption('popupBorderRadius')
	}

	/** Popup shadow blur radius in pixels. */
	get popupShadowBlurRadius() {
		return this.getOption('popupShadowBlurRadius')
	}

	/** Color of popup shadow. */
	get popupShadowColor() {
		return new Color(this.getOption('popupShadowColor'))
	}

	/** Blur radius in pixels for focus elements. */
	get focusBlurRadius() {
		return this.getOption('focusBlurRadius')
	}

	/** Font size. */
	get fontSize() {
		return this.getOption('fontSize')
	}

	/** Height of normal one line components, not the `lineHeight` of multiple lines. */
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