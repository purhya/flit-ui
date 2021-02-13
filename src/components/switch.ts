import {define, Component, html, css, getCSSEasingValue, on, off} from '@pucelle/flit'
import {theme} from '../style/theme'


export interface SwitchEvents {

	/** Triggers after switch on or off state changed. */
	change: (value: boolean) => void
}


/** `<f-switch>` work just like `<f-checkbox>` but easier to interact with. */
@define('f-switch')
export class Switch<E = any> extends Component<E & SwitchEvents> {

	static style() {
		let {mainColor, adjust, focusBlurRadius, backgroundColor} = theme
		let h = adjust(18)
		let w = h * 2 - 8

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
			width: ${w}px;
			height: ${h}px;
			background: ${backgroundColor.toMiddle(23.3)};
			border-radius: ${h / 2}px;
			padding: 1px;
			margin: ${(adjust(28) - h ) / 2}px 0;
			transition: background-color 0.2s ${getCSSEasingValue('ease-out-cubic')};
			cursor: pointer;

			&:hover{
				background: ${backgroundColor.toMiddle(33)};
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
			transition: margin 0.2s ${getCSSEasingValue('ease-out-cubic')};
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

	/** Whether the switch is in on state. */
	value: boolean = false

	protected render() {
		return html`
		<template
			tabindex="0"
			:class.on=${this.value}
			@click=${this.onClick}
			@focus=${this.onFocus}
			@blur=${this.onBlur}
		>
			<div class="ball"></div>
		</template>
		`
	}

	protected onClick() {
		this.toggleState()
	}

	protected toggleState() {
		this.value = !this.value
		this.emit('change', this.value)
	}

	protected onFocus() {
		on(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	protected onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault()
			this.toggleState()
		}
		else if (e.key === 'ArrowLeft') {
			if (this.value) {
				e.preventDefault()
				this.toggleState()
			}
		}
		else if (e.key === 'ArrowRight') {
			if (!this.value) {
				e.preventDefault()
				this.toggleState()
			}
		}
	}

	protected onBlur() {
		off(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}
}
