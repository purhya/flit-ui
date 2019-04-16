import {define, Component, html, css, getEasing, on, off} from 'flit'
import {theme} from './theme'
import {Color} from './color'


@define('f-switch')
export class Switch extends Component<{change: (value: boolean) => void}> {

	static style() {
		let {mainColor, lineHeight} = theme

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
			width: ${lineHeight * 1.333}px;
			height: ${lineHeight * 0.8}px;
			border-radius: ${lineHeight * 0.4}px;
			padding: 2px;
			margin: ${lineHeight * 0.1}px 0;
			transition: all 0.2s ${getEasing('ease-out-cubic')};
			cursor: pointer;
			background: #ccc;

			&:hover{
				background: ${new Color('#ccc').darken(5)};
			}
			
			&:focus{
				box-shadow: 0 0 3px ${mainColor};
			}
		}
	
		.ball{
			width: ${lineHeight * 0.8 - 4}px;
			height: ${lineHeight * 0.8 - 4}px;
			background: #fff;
			border-radius: 50%;
			transition: all 0.2s ${getEasing('ease-out-cubic')};
		}
	
		.on{		
			background: ${mainColor};

			&:hover{
				background: ${mainColor.darken(5)};
			}
		}
	
		.on .ball{
			margin-left: calc(100% - ${lineHeight * 0.8 - 4}px);
		}
	`}

	static properties = ['checked']

	checked: boolean = false

	render() {
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

	onClick () {
		this.checked = !this.checked
		this.emit('change', this.checked)
	}

	onFocus() {
		on(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	onKeyDown(e: KeyboardEvent) {
		e.preventDefault()

		if (e.key === 'Enter') {
			this.onClick()
		}
		else if (e.key === 'ArrowLeft') {
			if (this.checked) {
				this.onClick()
			}
		}
		else if (e.key === 'ArrowRight') {
			if (!this.checked) {
				this.onClick()
			}
		}
	}

	onBlur() {
		off(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}
}
