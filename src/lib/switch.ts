import {define, Component, html, css, getEasing, on, off} from 'flit'
import {theme} from './theme'


export interface SwitchEvents {
	change: (value: boolean) => void
}

@define('f-switch')
export class Switch<Events = any> extends Component<Events & SwitchEvents> {

	static style() {
		let {mainColor, lh, textColor} = theme
		let h = Math.round(lh(10)) * 2
		let w = h * 2 - 6

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
			width: ${w}px;
			height: ${h}px;
			color: ${textColor.lighten(20)};
			border: 1px solid currentColor;
			border-radius: ${h / 2}px;
			padding: 1px;
			margin: ${(lh(30) - h ) / 2}px 0;
			transition: background-color 0.2s ${getEasing('ease-out-cubic')};
			cursor: pointer;

			&:hover{
				color: ${mainColor};
			}
			
			&:focus{
				box-shadow: 0 0 3px ${mainColor};
			}
		}
	
		.ball{
			width: ${h - 4}px;
			height: ${h - 4}px;
			background: #fff;
			border: 1px solid ${textColor.lighten(10)};;
			border-radius: 50%;
			transition: margin 0.2s ${getEasing('ease-out-cubic')};
		}
	
		.on{		
			background: ${mainColor};
			color: ${mainColor};

			.ball{
				border-color: #fff;
				margin-left: calc(100% - ${h - 4}px);
			}

			&:hover{
				background: ${mainColor.darken(10)};
			}
		}
	`}

	static properties = ['checked']

	checked: boolean = false

	protected render() {
		return html`
		<template
			tabindex="0"
			:class.on=${this.checked}
			@@click=${this.onClick}
			@@focus=${this.onFocus}
			@@blur=${this.onBlur}
		>
			<div class="ball"></div>
		</template>
	`}

	protected onClick () {
		this.checked = !this.checked
		this.emit('change', this.checked)
	}

	protected onFocus() {
		on(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	protected onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault()
			this.onClick()
		}
		else if (e.key === 'ArrowLeft') {
			if (this.checked) {
				e.preventDefault()
				this.onClick()
			}
		}
		else if (e.key === 'ArrowRight') {
			if (!this.checked) {
				e.preventDefault()
				this.onClick()
			}
		}
	}

	protected onBlur() {
		off(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}
}
