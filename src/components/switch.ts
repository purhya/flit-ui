import {define, Component, html, css, getEasing, on, off} from '@pucelle/flit'
import {theme} from '../style/theme'


export interface SwitchEvents {
	change: (value: boolean) => void
}

@define('f-switch')
export class Switch<E = any> extends Component<E & SwitchEvents> {

	static style() {
		let {mainColor, lineHeight, adjustByLineHeight: lh, focusBlurRadius, backgroundColor} = theme
		let h = lh(18)
		let w = h * 2 - 8

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
			width: ${w}px;
			height: ${h}px;
			background: ${backgroundColor.highlight(23.3)};
			border-radius: ${h / 2}px;
			padding: 1px;
			margin: ${(lineHeight - h ) / 2}px 0;
			transition: background-color 0.2s ${getEasing('ease-out-cubic')};
			cursor: pointer;

			&:hover{
				background: ${backgroundColor.highlight(33)};
			}
			
			&:focus{
				box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
			}
		}
	
		.ball{
			width: ${h - 2}px;
			height: ${h - 2}px;
			background: ${backgroundColor};
			border-radius: 50%;
			transition: margin 0.2s ${getEasing('ease-out-cubic')};
		}
	
		.on{		
			background: ${mainColor};

			.ball{
				border-color: ${backgroundColor};
				margin-left: calc(100% - ${h - 2}px);
			}

			&:hover{
				background: ${mainColor.darken(10)};
			}
		}
		`
	}

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
		`
	}

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
