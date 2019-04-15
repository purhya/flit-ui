import {css, define, Component, html, on, off, cache, once, renderComplete} from "flit"
import {getAlignDirection, watchUntil, onceMouseLeaveAll, align, timeout, Timeout} from "ff"
import {theme} from "./theme"


// It's the base class for all the layer which will align with another element.
@define('f-layer')
export class Layer extends Component {

	static style() {
		let {borderRadius} = theme

		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1000;	// Same with window, so if in window, we must move it behind the window
			background: #fff;
			filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.33));	// 3px nearly equals 6px in box-shadow.
			border-radius: ${borderRadius * 2}px;
		}

		.trangle{
			position: absolute;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			border-bottom: 11px solid #fff;
			top: -11px;

			&-herizontal{
				border-top: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-right: 11px solid #fff;
				border-left: 0;
				top: auto;
				left: -11px;
			}
		}
	`}

	herizontal: boolean = false
	trangle: boolean = true

	/**
	 * The selector to get HTML element to append to or the HTML element.
	 * Note that don't specify this value to `document.body`, it may not prepared when class initialize. 
	 */
	appendTo: HTMLElement | string | null = 'body'

	render() {
		return html`
		<template>
			${this.trangle ? html`<div class="trangle" :ref="trangle" :class.trangle-herizontal=${this.herizontal}></div>` : ''}
			<slot></slot>
		</template>`
	}

	// Why render `layer` to body?
	// It's very common that the `el` is covered or clipped,
	// which will cause the `layer` is not fully visible.
	// You can still render the `<layer>` in the same scroller with `<popup>`.

	// Note that:
	// The template `content` can't pass into `layer` as an argument,
	// it will cause the template was parsed in `layer` context.

	// The `<layer>` will be cached in `<popup>`, and element will be removed when not in use.
	// And after restored from `cache`, it will be inserted back into `<popup>`.
	// So here we need to move it to `body` after every time rendered.
	onRendered() {
		if (typeof this.appendTo === 'string') {
			let target = document.querySelector(this.appendTo)
			if (target) {
				target.append(this.el)
			}
		}
		else if (this.appendTo) {
			this.appendTo.append(this.el)
		}
	}
}


// It's the base class for all the popup component.
@define('f-popup')
export class Popup extends Component {

	static style() {
		return css`
		:host{
			display: inline-block;
		}
	`}

	opened: boolean = false
	transition: string = 'fade'
	hasTrangle: boolean = true
	alignPosition: string = 't'
	alignMargin: number | number[] = 5
	trigger: 'hover' | 'click' | 'focus' | 'contextmenu' = 'hover'
	showDelay: number = 0
	hideDelay: number = 100
	appendLayerTo:  HTMLElement | string | null = 'body'
	
	timeout: Timeout | null = null
	private unwatch: (() => void) = () => undefined

	render() {
		let layerPart = cache(this.opened ? (this.renderLayer()) : '', this.transition)
		return html`<slot />${layerPart}`
	}

	renderLayer() {
		return html`
		<f-layer
			:ref="layer"
			:herizontal=${this.isHerizontal()}
			:trangle=${this.hasTrangle}
			:appendTo=${this.appendLayerTo}
		>
			<slot name="content" />
		</f-layer>
	`}

	isHerizontal() {
		let direction = getAlignDirection(this.alignPosition)
		return direction === 'l' || direction === 'r'
	}

	onCreated() {
		this.bindTriggerEvents()

		if (this.opened) {
			this.showLayer()
		}
	}

	onRendered() {
		if (this.refs.layer && this.opened) {
			this.alignLayer()
		}
	}

	alignLayer() {
		let trangle = (Component.get(this.refs.layer) as Layer).refs.trangle
		align(this.refs.layer, this.el, this.alignPosition, {margin: this.alignMargin, canShrinkInY: true, trangle})
	}

	onDisconnected() {
		// Must remove layer since it may be showing in `body`
		if (this.refs.layer) {
			this.refs.layer.remove()
		}
	}

	bindTriggerEvents() {
		if (this.trigger === 'hover') {
			on(this.el, 'mouseenter', this.showLayerLater, this)
		}
		else {
			on(this.el, this.trigger, this.showLayerLater, this)
		}
	}

	showLayerLater() {
		if (this.timeout) {
			this.timeout.cancel()
		}
		
		if (!this.opened) {
			this.timeout = timeout(this.showLayer.bind(this), this.showDelay)
			
			if (this.trigger === 'hover') {
				once(this.el, 'mouseleave', this.hideLayerLater, this)
			}
			else if (this.trigger === 'focus') {
				once(this.el, 'blur', this.hideLayerLater, this)
			}
			else if (this.trigger === 'click' || this.trigger === 'contextmenu') {
				once(document, 'mousedown', this.hideLayerLater, this)
			}
		}
	}

	async showLayer() {
		this.opened = true

		// Wait for `refs.layer` to be referenced.
		await renderComplete()
		
		if (this.trigger === 'hover') {
			off(this.el, 'mouseleave', this.hideLayerLater, this)
			onceMouseLeaveAll([this.el, this.refs.layer], this.hideLayerLater.bind(this))
		}
		else if (this.trigger === 'click' || this.trigger === 'contextmenu') {
			off(document, 'mousedown', this.hideLayerLater, this)
			on(document, 'mousedown', this.onDocMouseDown, this)
		}

		this.unwatch = watchUntil(this.el, 'outview', this.hideLayerLater.bind(this))
	}

	onDocMouseDown(e: Event) {
		let target = e.target as HTMLElement

		if (!this.el.contains(target) && !this.refs.layer.contains(target)) {
			off(document, 'mousedown', this.onDocMouseDown, this)
			this.hideLayerLater()
		}
	}

	hideLayerLater() {
		if (this.timeout) {
			this.timeout.cancel()
		}
		
		if (this.opened) {
			this.unwatch()
			this.timeout = timeout(this.hideLayer.bind(this), this.hideDelay)
		}
	}

	hideLayer() {
		this.opened = false
	}

	// Components like `<dropdown>` will need this when clicking.
	toggleOpened() {
		if (this.opened) {
			this.hideLayerLater()
		}
		else {
			this.showLayerLater()
		}
	}
}
