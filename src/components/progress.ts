import {define, Component, css, html} from '@pucelle/flit'
import {theme} from '../style/theme'
import {tooltip} from '../bindings/tooltip'


/** Now only a input, will extend to list suggestted local or remote data in future. */
@define('f-progress')
export class Progress<E = any> extends Component<E> {

	static style() {
		let {mainColor, adjust} = theme

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
		`
	}

	/** Betweens 0-1. */
	value: number = 0

	/** Fixed decimal count of progress text. */
	decimalCount: number = 1

	protected render() {
		// 0.5123 -> 51.2%
		let value = (Math.min(this.value, 1) * 100).toFixed(this.decimalCount) + '%'

		let tip = tooltip(value, {
			alignTo: () => this.refs.progress,
			alignPosition: 'bc-tr',
			alignMargin: [8, 0],
		})

		return html`
		<template ${tip}>
			<div class="groove">
				<div class="progress" :ref="progress" :style.width.percent=${Math.min(this.value, 1) * 100}></div>
			</div>
		</template>
		`
	}
}