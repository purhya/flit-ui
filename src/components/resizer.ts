import {css, define, html, on, once, Component, off, render} from '@pucelle/flit'
import {constrain, getStyleValue} from '@pucelle/ff'


interface ResizerEvents {

	/** Triggers after every time resizing. */
	resize: (size: number) => void

	/** Triggers after resize end. */
	change: (size: number) => void
}

/** Resize direction to indicate which direction the resizer should be align to relative it's parent. */
export type ResizerPosition = 'top' | 'right' | 'bottom' | 'left'


/** `<f-resizer>` should an absolute type resizer bar, drag it will */
@define('f-resizer')
export class Resizer<E = {}> extends Component<E & ResizerEvents> {
	
	static style() {
		return css`
		:host{
			position: absolute;
			z-index: 100;
		}

		.top{
			width: 100%;
			height: 10px;
			top: -5px;
			left: 0;
			cursor: ns-resize;
		}

		.bottom{
			width: 100%;
			height: 10px;
			bottom: -5px;
			left: 0;
			cursor: ns-resize;
		}

		.left{
			width: 10px;
			height: 100%;
			top: 0;
			left: -5px;
			cursor: ew-resize;
		}

		.right{
			width: 10px;
			height: 100%;
			top: 0;
			right: -5px;
			cursor: ew-resize;
		}

		.resizing-mask{
			position: fixed;
			z-index: 9999;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;

			&.herizontal{
				cursor: ew-resize;
			}

			&.vertical{
				cursor: ns-resize;
			}
		}
		`
	}

	/** Which position should align resizer relative to parent. */
	position: ResizerPosition = 'right'

	/** Resizing speed rate, set it to `2` if element aligns to center, and moves 1px will cause 2px increases. */
	rate: number = 1

	/** Minimum size of parent. */
	min: number = 0

	/** Maximum size of parent. */
	max: number = Infinity

	/** Current size of parent. */
	size: number = -1

	protected render() {
		return html`
			<template
				:class=${this.position}
				@mousedown=${this.onStartResize}
			></template>
		`
	}

	protected onReady() {
		if (getStyleValue(this.el.parentElement!, 'position') === 'static') {
			throw new Error('Parent of "<f-resizer>" must can\'t have an "static" position')
		}
	}

	protected onStartResize(this: Resizer, e: MouseEvent) {
		let startX = e.clientX
		let startY = e.clientY
		let startParentWidth = this.el.parentElement!.offsetWidth
		let startParentHeight = this.el.parentElement!.offsetHeight

		let onMouseMove = (e: MouseEvent) => {
			e.preventDefault()
			this.resize(startParentWidth, startParentHeight, e.clientX - startX, e.clientY - startY)
		}

		let onMouseUp = () => {
			off(document, 'mousemove', onMouseMove as (e: Event) => void)
			cursorMask.remove()
			this.emit('change', this.size)
		}

		let cursorMask = render(html`
			<div class="resizing-mask" class="${this.position === 'left' || this.position === 'right' ? 'herizontal' : 'vertical'}" />
		`, this).getFirstElement() as HTMLElement

		document.body.append(cursorMask)

		on(document, 'mousemove', onMouseMove as (e: Event) => void)
		once(document, 'mouseup', onMouseUp)
	}

	protected resize(this: Resizer, startParentWidth: number, startParentHeight: number, movementX: number, movementY: number) {
		let value: number

		if (this.position === 'top' || this.position === 'bottom') {
			let flag = this.position === 'bottom' ? 1 : -1

			value = startParentHeight + flag * movementY * this.rate
			value = constrain(value, this.min, this.max)
			this.el.parentElement!.style.height = value + 'px'
		}
		else {
			let flag = this.position === 'right' ? 1 : -1

			value = startParentWidth + flag * movementX * this.rate
			value = constrain(value, this.min, this.max)
			this.el.parentElement!.style.width = value + 'px'
		}

		this.size = value
		this.emit('change', this.size)
	}
}