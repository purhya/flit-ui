import {define, Component, html, css, on, once, off} from 'flit'
import {theme} from './theme'
import {constrain, getRect, Rect} from 'ff'


@define('f-slider')
export class Slider extends Component<{change: (value: boolean) => void}> {

	static style() {
		let {mainColor, lineHeight} = theme
		let size = Math.ceil(lineHeight / 4) * 2

		return css`
		:host{
			display: inline-flex;
			vertical-align: top;
			flex-direction: column;
			justify-content: center;
			cursor: default;
			position: relative;
			width: ${lineHeight * 5}px;
			height: ${lineHeight}px;
			color: ${mainColor};
			cursor: pointer;
		}

		.groove{
			position: relative;
			height: 4px;
		}

		.groove-bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: currentColor;
			opacity: 0.4;
		}
	
		.progress{
			position: relative;
			background: currentColor;
			height: 100%;
		}
	
		.ball{
			border-radius: 50%;
			border: 3px solid currentColor;
			background: #fff;
			float: right;
			width: ${size}px;
			height: ${size}px;
			margin: ${-size / 2 + 2}px -${size / 2}px;
		}
	
		:host[vertical]{
			width: ${lineHeight}px;
			height: ${lineHeight * 5}px;
			flex-direction: row;

			.groove{
				width: 4px;
				height: 100%;
			}

			.progress{
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 0;
			}

			.ball{
				margin: -${size / 2}px ${-size / 2 + 2}px;
			}
		}
		`
	}

	static properties = ['vertical', 'min', 'max', 'step', 'value']

	render() {
		return html`
			<template
				:class.$dragging=${this.draging}
				@@mousedown=${this.onMouseDown}
				@@wheel.prevent=${this.onWheel}
			>
				<div class="groove" :ref="groove">
					<div class="groove-bg"></div>
					<div class="progress"
						:style.width.percent=${this.vertical ? '' : this.getPercent()}
						:style.height.percent=${this.vertical ? this.getPercent() : ''}
					>
						<div class="ball"></div>
					</div>
				</div>
			</template>
		`
	}

	vertical: boolean = false
	min: number = 0
	max: number = 100
	step: number = 1
	value: number = 0

	private draging: boolean = false

	getPercent() {
		if (this.value === this.min) {
			return 0
		}
		
		let percentage = (this.value - this.min) / (this.max - this.min) * 100
		return constrain(percentage, 0, 100)
	}

	onMouseDown(e: MouseEvent) {
		let rect = getRect(this.refs.groove)
		this.changeValueByEvent(e, rect)
		this.draging = true

		let onMouseMove = (e: MouseEvent) => {
			this.changeValueByEvent(e, rect)
		}

		on(document, 'mousemove', onMouseMove as any)

		once(document, 'mouseup', () => {
			off(document, 'mousemove', onMouseMove as any)
			this.draging = false
		})
	}

	changeValueByEvent(e: MouseEvent, rect: Rect) {
		let rate

		if (this.vertical) {
			rate = constrain(1 - (e.clientY - rect.top) / rect.height, 0, 1)
		}
		else {
			rate = constrain((e.clientX - rect.left) / rect.width, 0, 1)
		}

		let diff = (this.max - this.min) * rate

		if (this.step) {
			diff = Math.round(diff / this.step) * this.step
		}

		let oldValue = this.value
		let newValue = this.min + diff

		if (newValue !== oldValue) {
			this.emit('change', this.value = newValue)
		}
	}

	onWheel(e: WheelEvent) {
		if (this.step) {
			let oldValue = this.value
			let newValue

			// deltaY < 0 when wheel up
			if (e.deltaY < 0 && this.vertical || e.deltaY > 0 && !this.vertical) {
				newValue = Math.min(this.value + this.step, this.max)
			}
			else {
				newValue = Math.max(this.value - this.step, this.min)
			}

			if (newValue !== oldValue) {
				this.emit('change', this.value = newValue)
			}
		}
	}
}
