import {define, Component, css, html} from '@pucelle/flit'
import {theme} from '../style/theme'
import {tooltip} from '../bindings/tooltip'


/** `<f-progress>` gives a progress notification in percentage, just like `<input type=progress>`. */
@define('f-progress')
export class Progress<E = any> extends Component<E> {

	static style() {
		let {mainColor, adjust, adjustFontSize} = theme

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
			position: relative;
			width: ${adjust(200)}px;
			height: ${adjust(28)}px;
		}

		.groove{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			height: 1px;
			margin: auto 0;
			background: ${mainColor.alpha(0.2)};
		}

		.progress{
			height: 100%;
			background: ${mainColor};
		}

		.tooltip{
			font-family: consolas;
			font-size: ${adjustFontSize(14)}px;
		}
		`
	}

	/** 
	 * Progress value betweens 0~1.
	 * Defult value is `0`.
	 */
	value: number = 0

	/** 
	 * Fixed decimal count of progress text.
	 * Defult value is `null`.
	 */
	decimalCount: number | null = null

	protected render() {
		let tip = tooltip(this.renderTooltipValue(), {
			alignTo: () => this.refElements.progress,
			alignPosition: 'bc-tr',
			alignMargin: [8, 0],
		})

		return html`
			<template ${tip}>
				<div class="groove">
					<div class="progress" :refElement="progress" :style.width.percent=${Math.min(this.value, 1) * 100}></div>
				</div>
			</template>
		`
	}

	renderTooltipValue() {
		let tipValue = (Math.min(this.value, 1) * 100)
		let tipText = tipValue.toString()

		if (this.decimalCount !== null) {
			tipText = tipValue.toFixed(this.decimalCount)
		}
		tipText += '%'

		return html`<span class="${this.scopeClassName('tooltip')}">${tipText}</span>`
	}
}