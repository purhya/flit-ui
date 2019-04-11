import {updateStyles, addGlobalStyle, css, update} from 'flit'
import {Color} from './color'


export interface ThemeOptions {
	mainColor: string
	textColor?: string
	successColor?: string
	errorColor?: string
	borderRadius?: number
	fontSize?: number
	lineHeight?: number
}

type ColorOptions = {[key in 'mainColor' | 'textColor' | 'successColor' | 'errorColor']: Color}
type NotColorOptions = {[key in Exclude<keyof ThemeOptions, keyof ColorOptions>]: ThemeOptions[key]}


export class Theme implements ColorOptions, NotColorOptions {
	
	private themeMap: Map<string, ThemeOptions> = new Map()
	private options: Required<ThemeOptions>

	defaultThemeOptions: Required<ThemeOptions> = {
		mainColor: '#0077cf',
		textColor: '#333',
		successColor: '#00af41',
		errorColor: '#ff0000',
		borderRadius: 4,
		fontSize: 14,	// Should also set font-size and line-height on html or body to avoid flushing.
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

		this.options = Object.assign({}, this.defaultThemeOptions, this.themeMap.get(name))
		
		updateStyles()
		update()
	}

	get mainColor(): Color {
		return new Color(this.options.mainColor)
	}

	get textColor(): Color {
		return new Color(this.options.textColor)
	}

	get successColor(): Color {
		return new Color(this.options.successColor)
	}

	get errorColor(): Color {
		return new Color(this.options.errorColor)
	}

	get borderRadius() {
		return this.options.borderRadius
	}

	get fontSize() {
		return this.options.fontSize
	}

	get lineHeight() {
		return this.options.lineHeight
	}
}

export const theme = new Theme()


addGlobalStyle(() => {
	let {mainColor, textColor, successColor, errorColor, borderRadius, lineHeight} = theme

	return css`
	html{
		color: ${theme.textColor};
		font-size: ${theme.fontSize}px;
		line-height: ${theme.lineHeight}px;
	}

	button{
		display: inline-flex;
		justify-content: center;
		height: ${lineHeight}px;
		line-height: ${lineHeight - 2}px;
		border: 1px solid ${textColor.lighten(20)};
		color: ${textColor.lighten(10)};
		border-radius: ${borderRadius}px;
		padding: 0 ${lineHeight / 3 + Math.max(0, (borderRadius - 5) / 2)}px;
		background: #fff;
		text-align: center;
		cursor: pointer;
		vertical-align: top;
		
		&:hover{
			border-color: ${mainColor};
			color: ${mainColor};
		}
	
		&:active{
			border-color: ${mainColor.darken(10)};
			color: ${mainColor.darken(10)};
			background: ${mainColor.alpha(0.05)};
		}
	
		f-icon, f-icon-loading{
			&:first-child{
				margin-left: ${-(lineHeight / 10 - 1)}px;
				margin-right: ${lineHeight / 5 - 2}px;
			}

			&:last-child{
				margin-right: ${-(lineHeight / 10 - 1)}px;
				margin-left: ${lineHeight / 5 - 2}px;
			}
		}

		&[filled]{
			background: ${mainColor};
			border-color: ${mainColor};
			color: #fff;

			&:hover{
				background: ${mainColor.darken(5)};
				border-color: ${mainColor.darken(5)};
			}
		
			&:active{
				background: ${mainColor.darken(10)};
				border-color: ${mainColor.darken(10)};
			}
		}

		&[borderless]{
			border: none;
			padding-left: ${lineHeight / 3}px;
			padding-right: ${lineHeight / 3}px;
			line-height: ${lineHeight}px;

			&:active{
				background: none;
			}
		}

		&[round]{
			width: ${lineHeight}px;
			border-radius: ${lineHeight / 2}px;
			padding: 0;
			font-size: 0;

			f-icon, f-icon-loading{
				margin-left: auto;
				margin-right: auto;
			}
		}
	}

	[type=text], [type=number], [type=email]{
		height: ${lineHeight}px;
		padding: 0 0 0 ${lineHeight / 5 + 2}px;
	}
	
	textarea{
		padding: ${lineHeight / 5 - 2}px ${lineHeight / 5 + 2}px;
		line-height: ${lineHeight * 0.7 + 1}px;
	}
	
	[type=text], [type=number], [type=email], textarea{
		border: none;
		box-shadow: inset 0 -1px 0 0 #888;
		background: #e5e5e5;
	}
	
	.f-touched{
		&.f-valid, :valid{
			box-shadow: inset 0 -2px 0 0 ${successColor};
		}

		.f-invalid, :invalid{
			box-shadow: inset 0 -2px 0 0 ${errorColor};
		}
	}

	.fade-enter, .fade-leave{
		transition: opacity 0.2s ease-out;
	}
	
	.fade-enter-from, .fade-leave-to{
		opacity: 0;
	}
	
	.fade-enter-to, .fade-leave-from{
		opacity: 1;
	}
	`
})


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
