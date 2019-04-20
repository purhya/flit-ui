import {updateStyles, updateComponents} from 'flit'
import {Color} from './color'


export interface ThemeOptions {
	mainColor: string
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


export class Theme implements ColorOptions, NotColorOptions {
	
	private themeMap: Map<string, ThemeOptions> = new Map()
	private options: ThemeOptions

	defaultThemeOptions: Required<ThemeOptions> = {
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

	constructor() {
		this.options = this.defaultThemeOptions
	}

	define(name: string, options: ThemeOptions) {
		this.themeMap.set(name, options)
	}

	set(name: string) {
		if (!this.themeMap.has(name)) {
			throw new Error(`"${name}" is not a defined theme`)
		}

		this.options = this.themeMap.get(name)!
		
		updateStyles()
		updateComponents()
	}

	private getOption<P extends keyof ThemeOptions>(property: P): Required<ThemeOptions>[P] {
		if (this.options[property] !== undefined) {
			return this.options[property]!
		}
		else {
			return this.defaultThemeOptions[property]
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




// export const suggestColors = {
// 	'cyan'     : '#48c7c7',
// 	'blue'     : '#3988e5',
// 	'darkblue' : '#0077cf',
// 	'skyblue'  : '#4eb2ea',
// 	'purple'   : '#be66cc',
// 	'red'      : '#ff6666',
// 	'pink'     : '#ff8095',
// 	'brown'    : '#d65c5c',
// 	'orange'   : '#f67d51',
// 	'green'    : '#15af78',
// 	'grey'     : '#888888',
// }
