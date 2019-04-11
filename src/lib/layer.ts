import {css, define, Component, html, off, once, defineBinding, on, render, renderComplete} from "flit"
import {timeout, Timeout, align} from "ff"
import {TemplateResult} from "flit/out/lib/parts"


@define('f-layer')
export class Layer extends Component {

	static style = css`
	:host{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1000;	//same with window, so if a layer trigger is in window, we must move layer to makesure the layer behind the window
		background: #fff;
		filter: drop-shadow(0 0 3px rgba(#000, 0.3));
		border-radius: 8px;
	}

	.trangle{
		position: absolute;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-bottom: 10px solid #fff;
		top: -10px;

		&-herizontal{
			border-top: 8px solid transparent;
			border-bottom: 8px solid transparent;
			border-right: 8px solid #fff;
			border-left: 0;
			top: auto;
			left: -8px;
		}
	}
	`

	opened: boolean = false
	transition: string = 'fade'
	trangle: boolean = true
	herizontal: boolean = false

	render() {
		return html`
		<template class="layer" :show=${{when: this.opened, transition: this.transition}}>
			${this.trangle ? html`<div class="trangle" :ref="trangle" :class.trangle-herizontal=${this.herizontal}></div>` : ''}
			<slot></slot>
		</template>`
	}
}


@define('f-title-layer')
export class TitleLayer extends Layer {

	static style = css`
	:host{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1100;
		max-width: 220px;
		padding: 8px 12px;
		pointer-events: none;
		background: #333;
		color: #fff;
		filter: drop-shadow(0 0 2px rgba(#000, 0.5));
		border-radius: 2px;
	}

	.trangle{
		position: absolute;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-bottom: 8px solid #333;
		top: -8px;

		&-herizontal{
			border-top: 6px solid transparent;
			border-bottom: 6px solid transparent;
			border-right: 6px solid #333;
		}
	}
	`

	title: string | TemplateResult = ''
	alignPosition: string = 't'
	alignMargin: number | number[] = 2
	hideDelay: number = 200

	target: HTMLElement | null = null
	private timeout: Timeout | null = null

	render() {
		return html`
		<template :show=${{when: this.opened, transition: this.transition}}>
			${this.trangle ? html`<div class="trangle" :ref="trangle" :class.trangle-herizontal=${this.herizontal}></div>` : ''}
			<div class="title">${this.title}</div>
		</template>`
	}

	onRendered() {
		if (this.opened) {
			this.align()
		}
	}

	// May be called when el is not changed but title changed.
	set(target: HTMLElement, title: string) {
		if (this.target && this.target !== target) {
			this.unbindLastTarget()
		}
		
		this.target = target
		this.title = title
	}

	private unbindLastTarget() {
		off(this.target!, 'mouseleave', this.hideLater, this)
	}

	show() {
		if (this.timeout) {
			this.timeout.cancel()
		}

		this.opened = true
		once(this.target!, 'mouseleave', this.hideLater, this)
	}

	private align() {
		align(this.el, this.target!, this.alignPosition, {margin: this.alignMargin, trangle: this.refs.trangle})
	}

	private hideLater() {
		if (this.timeout) {
			this.timeout.cancel()
		}

		// When user mouse over fom one to another, we need to show title for the second item immediately.
		// So have we need a timeout during which the layer is not truly hide.
		this.timeout = timeout(this.hide.bind(this), this.hideDelay)
	}

	hide() {
		if (this.timeout) {
			this.timeout.cancel()
		}

		this.opened = false
		off(this.target!, 'mouseleave', this.hideLater, this)
	}
}

let titleLayer: TitleLayer | null = null
async function getTitleLayer(): Promise<TitleLayer> {
	if (!titleLayer) {
		titleLayer = await Component.getAsync(render('<f-title-layer />', document.body) as HTMLElement) as TitleLayer
		await renderComplete()
	}

	return titleLayer
}


defineBinding('title', class TitleBinding {

	private el: HTMLElement
	private value: string
	private showDelay: number = 0
	private timeout: Timeout | null = null

	constructor(el: HTMLElement, value: unknown) {
		this.el = el
		this.value = value as string

		on(this.el, 'mouseenter', this.onMouseEnter, this)
	}

	async update (value: string) {
		this.value = value

		// It can only update target when the title for current binding is showing.
		if (titleLayer && titleLayer.target === this.el) {
			titleLayer.set(this.el, value)
		}
	}

	private async onMouseEnter() {
		let titleLayer = await getTitleLayer()
		if (titleLayer.opened) {
			this.show()
		}
		else {
			this.showLater()
		}
	}

	private async show() {
		let titleLayer = await getTitleLayer()
		titleLayer.set(this.el, this.value)
		titleLayer.show()
	}

	private showLater() {
		if (this.timeout) {
			this.timeout.cancel()
		}

		this.timeout = timeout(this.show.bind(this), this.showDelay)
		once(this.el, 'mouseleave', this.onMouseLeave, this)
	}

	private onMouseLeave () {
		if (this.timeout) {
			this.timeout.cancel()
		}
	}
})