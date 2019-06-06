import {css, define, html, on, once, Component, off, render} from 'flit'
import {getStyle, constrain} from 'ff';


export interface ResizerEvents {
	change: (size: number) => void
}

type ResizerPosition = 'top' | 'right' | 'bottom' | 'left'


@define('f-resizer')
export class Resizer extends Component<ResizerEvents> {
	
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
	`}

	static properties = ['position', 'resizeRate', 'min', 'max']

	position: ResizerPosition = 'right'
	resizeRate: number = 1	// You may set this to `2` for parent that aligns to center .
	max: number = Infinity
	min: number = 0

	render() {
		return html`
		<template
			:class=${this.position}
			@mousedown=${this.onStartResize}
		/>
	`}

	onReady() {
		if (getStyle(this.el.parentElement!, 'position') === 'static') {
			throw new Error('Parent of "<f-resizer>" must can\'t have an "static" position')
		}
	}

	onStartResize(e: MouseEvent) {
		let startX = e.clientX
		let startY = e.clientY
		let startParentWidth = this.el.parentElement!.offsetWidth
		let startParentHeight = this.el.parentElement!.offsetHeight

		let onMouseMove = (e: MouseEvent) => {
			e.preventDefault()
			this.resize(startParentWidth, startParentHeight, e.clientX - startX, e.clientY - startY, false)
		}

		let onMouseUp = (e: MouseEvent) => {
			off(document, 'mousemove', onMouseMove as (e: Event) => void)
			this.resize(startParentWidth, startParentHeight, e.clientX - startX, e.clientY - startY, true)
			cursorMask.remove()
		}

		let cursorMask = render(html`
			<div class="resizing-mask" :class=${this.position === 'left' || this.position === 'right' ? 'herizontal' : 'vertical'}
		/>`, this).firstElementChild as HTMLElement

		document.body.append(cursorMask)

		on(document, 'mousemove', onMouseMove as (e: Event) => void)
		once(document, 'mouseup', onMouseUp as (e: Event) => void)
	}

	private resize(startParentWidth: number, startParentHeight: number, movementX: number, movementY: number, isLastResize: boolean) {
		let value: number

		if (this.position === 'top' || this.position === 'bottom') {
			let flag = this.position === 'bottom' ? 1 : -1

			value = startParentHeight + flag * movementY * this.resizeRate
			value = constrain(value, this.min, this.max)
			this.el.parentElement!.style.height = value + 'px'
		}
		else {
			let flag = this.position === 'right' ? 1 : -1

			value = startParentWidth + flag * movementX * this.resizeRate
			value = constrain(value, this.min, this.max)
			this.el.parentElement!.style.width = value + 'px'
		}

		if (isLastResize) {
			this.emit('change', value)
		}
	}
}