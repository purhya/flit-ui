import {define, Component, html, css, on, once, off} from '@pucelle/flit'
import {theme} from '../style/theme'
import {constrain, getRect, Rect, toDecimal, MouseLeave} from '@pucelle/ff'
import {tooltip} from '../bindings/tooltip'


export interface SliderEvents {
	change: (value: number) => void
	dragstart: () => void
	dragend: () => void
}

@define('f-slider')
export class Slider<E = any> extends Component<E & SliderEvents> {

	static style() {
		let {mainColor, borderColor, adjust, adjustFontSize, focusBlurRadius, backgroundColor} = theme
		let grooveSize = 1
		let ballSize = Math.ceil(adjust(7)) * 2 + grooveSize

		return css`
		:host{
			display: inline-flex;
			vertical-align: top;
			flex-direction: column;
			justify-content: center;
			position: relative;
			width: ${adjust(150)}px;
			height: ${adjust(30)}px;
			font-size: ${adjustFontSize(13)}px;
			cursor: pointer;

			&:focus .ball{
				box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
				border-color: ${mainColor};
			}
		}

		.groove{
			position: relative;
			height: ${grooveSize}px;
		}

		.groove-bg{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: ${borderColor};
		}
	
		.progress{
			position: relative;
			background: ${mainColor};
			height: 100%;
		}
	
		.ball{
			border-radius: 50%;
			border: 1px solid ${borderColor};
			background: ${backgroundColor};
			float: right;
			width: ${ballSize}px;
			height: ${ballSize}px;
			margin: -${(ballSize - grooveSize) / 2}px -${Math.round(ballSize / 2)}px;

			&:hover{
				border-color: ${mainColor};
			}
		}

		.dragging{
			.ball{
				border-color: ${mainColor.darken(10)};
				background: ${mainColor.darken(10)};
			}
		}

		:host[vertical]{
			width: ${adjust(30)}px;
			height: ${adjust(150)}px;
			flex-direction: row;

			.groove{
				width: ${grooveSize}px;
				height: 100%;
			}

			.progress{
				position: absolute;
				bottom: 0;
				width: 100%;
				height: 0;
			}

			.ball{
				margin: -${Math.round(ballSize / 2)}px -${(ballSize - grooveSize) / 2}px;
			}
		}
		`
	}

	vertical: boolean = false
	min: number = 0
	max: number = 100
	step: number = 1
	value: number = 0

	protected draging: boolean = false

	protected render() {
		let tip = tooltip(this.renderTooltipValue(), {
			alignTo: () => this.refs.ball,
			alignPosition: this.vertical ? 'r' : 't'
		})

		return html`
		<template
			tabindex="0"
			:class.dragging=${this.draging}
			${tip}
			@@mousedown=${this.onMouseDown}
			@@focus=${this.onFocus}
			@@blur=${this.onBlur}
		>
			<div class="groove" :ref="groove">
				<div class="groove-bg" />
				<div class="progress"
					:style.width.percent=${this.vertical ? '' : this.getPercent()}
					:style.height.percent=${this.vertical ? this.getPercent() : ''}
				>
					<div class="ball" :ref="ball" />
				</div>
			</div>
		</template>
		`
	}

	protected renderTooltipValue(): string {
		return String(this.value)
	}

	protected getPercent() {
		if (this.value === this.min) {
			return 0
		}
		
		let percentage = (this.value - this.min) / (this.max - this.min) * 100
		return constrain(percentage, 0, 100)
	}

	protected onMouseDown(e: MouseEvent) {
		let rect = getRect(this.refs.groove)
		let unkeep = MouseLeave.keep(this.el)
		this.draging = true

		// If clicked the ball, not move; only move when clicked the groove.
		if (!(e.target as Element).matches(this.scopeClassName('.ball'))) {
			this.changeValueByEvent(e, rect)
		}

		let onMouseMove = (e: MouseEvent) => {
			// Disable selecting text unexpectedly, and makesure ball not lose focus.
			e.preventDefault()
			this.changeValueByEvent(e, rect)
		}

		on(document, 'mousemove', onMouseMove as (e: Event) => void)

		once(document, 'mouseup', () => {
			off(document, 'mousemove', onMouseMove as (e: Event) => void)
			unkeep()
			this.draging = false
			this.emit('dragend')
		})

		this.emit('dragstart')
	}

	protected changeValueByEvent(e: MouseEvent, rect: Rect) {
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
		let newValue = toDecimal(this.min + diff, 4)

		if (newValue !== oldValue) {
			this.emit('change', this.value = newValue)
		}
	}

	protected onWheel(e: WheelEvent) {
		if (!this.step || document.activeElement !== this.el) {
			return
		}

		let newValue

		// deltaY < 0 when wheel up
		if (e.deltaY < 0 && this.vertical || e.deltaY > 0 && !this.vertical) {
			newValue = toDecimal(Math.min(this.value + this.step, this.max), 4)
		}
		else {
			newValue = toDecimal(Math.max(this.value - this.step, this.min), 4)
		}

		if (newValue !== this.value) {
			this.emit('change', this.value = newValue)
		}
	}

	protected onFocus() {
		on(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
		on(document, 'wheel.prevent', this.onWheel as (e: Event) => void, this)
	}

	protected onKeyDown(e: KeyboardEvent) {
		let newValue

		if (this.vertical) {
			if (e.key === 'ArrowUp') {
				e.preventDefault()
				newValue = Math.min(this.value + this.step, this.max)
			}
			else if (e.key === 'ArrowDown') {
				e.preventDefault()
				newValue = Math.max(this.value - this.step, this.min)
			}
		}
		else {
			if (e.key === 'ArrowLeft') {
				e.preventDefault()
				newValue = Math.max(this.value - this.step, this.min)
			}
			else if (e.key === 'ArrowRight') {
				e.preventDefault()
				newValue = Math.min(this.value + this.step, this.max)
			}
		}
		
		if (newValue !== undefined && newValue !== this.value) {
			this.emit('change', this.value = newValue)
		}
	}

	protected onBlur() {
		off(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
		off(document, 'wheel', this.onWheel as (e: Event) => void, this)
	}
}
