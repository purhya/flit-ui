import {css, define, Component, html, on, off, cache, once, renderComplete} from "flit"
import {getAlignDirection, onceMouseLeaveAll, align, timeout, Timeout, watch, Rect} from "ff"
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

	// Although this property is not used to render, it can be used to get current opened state and can be captured by inner content.
	popup: Popup | null = null

	render() {
		return html`
		<template>
			${this.trangle ? html`<div class="trangle" :ref="trangle" :class.trangle-herizontal=${this.herizontal}></div>` : ''}
			<slot></slot>
		</template>`
	}
}


// It's the base class for all the popup component.
@define('f-popup')
export class Popup extends Component {

	static style() {
		let {mainColor} = theme

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
		}
		
		.opened{
			color: ${mainColor};
		}

		.layer{}
	`}

	static properties = ['trigger']

	opened: boolean = false
	transition: string = 'fade'
	hasTrangle: boolean = true
	alignPosition: string = 't'
	alignMargin: number | number[] = 3
	trigger: 'hover' | 'click' | 'focus' | 'contextmenu' = 'hover'
	showDelay: number = 0
	hideDelay: number = 100

	/**
	 * The selector to get HTML element to append to or the HTML element.
	 * Note that don't specify this value to `document.body`, it may not prepared when class initialize. 
	 */
	appendLayerTo: Element | string | null = 'body'
	
	timeout: Timeout | null = null
	private unwatch: (() => void) = () => {}
	private unwatchLeave: (() => void) = () => {}

	render() {
		let layerPart = cache(this.opened ? (this.renderLayer()) : '', this.transition)
		
		return html`
			<template :class.opened="${this.opened}">
				<slot />${layerPart}
			</template>
		`
	}

	renderLayer() {
		return html`
		<f-layer
			class="layer"
			:ref="layer"
			:popup=${this}
			:herizontal=${this.isHerizontal()}
			:trangle=${this.hasTrangle}
		>
			<slot name="content" />
		</f-layer>
	`}

	isHerizontal() {
		let direction = getAlignDirection(this.alignPosition)
		return direction === 'l' || direction === 'r'
	}

	onCreated() {
		if (this.trigger === 'hover') {
			on(this.el, 'mouseenter', this.showLayerLater, this)
			on(this.el, 'click', this.toggleOpened, this)
		}
		else {
			on(this.el, this.trigger, this.showLayerLater, this)
		}

		if (this.opened) {
			this.showLayer()
		}
	}

	async onUpdated() {
		if (this.opened) {
			await renderComplete()
			this.alignLayer()
		}
	}

	toggleOpened() {
		if (this.opened) {
			this.hideLayerLater()
		}
		else {
			this.showLayerLater()
		}
	}
	
	alignLayer() {
		let trangle = (Component.get(this.refs.layer as HTMLElement) as Layer).refs.trangle as HTMLElement
		align(this.refs.layer as HTMLElement, this.el, this.alignPosition, {margin: this.alignMargin, canShrinkInY: true, trangle})
	}

	onDisconnected() {
		// After disconnected, the component imediately locked and will never update.
		// So we must delete the layer element because it's in the body.
		this.opened = false

		if (this.refs.layer) {
			this.refs.layer.remove()
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
			else if (this.trigger === 'click' || this.trigger === 'contextmenu') {
				once(document, 'mousedown', this.hideLayerLater, this)
			}
			else if (this.trigger === 'focus') {
				once(this.el, 'blur', this.hideLayerLater, this)
			}
		}
	}

	async showLayer() {
		this.opened = true

		// Wait for `refs.layer` to be referenced.
		await renderComplete()
		this.moveLayer()
		
		if (this.trigger === 'hover') {
			off(this.el, 'mouseleave', this.hideLayerLater, this)
			this.unwatchLeave = onceMouseLeaveAll([this.el, this.refs.layer], this.hideLayerLater.bind(this))
		}
		else if (this.trigger === 'click' || this.trigger === 'contextmenu') {
			off(document, 'mousedown', this.hideLayerLater, this)
			on(document, 'mousedown', this.onDocMouseDown, this)

			if (this.trigger === 'click') {
				on(this.el, 'click', this.hideLayerLater, this)
			}
		}

		this.unwatch = watch(this.el, 'rect', this.onRectChanged.bind(this))
	}

	moveLayer() {
		// Why render `<layer>` to body?
		// It's very common that the `el` is covered or clipped,
		// which will cause the `<layer>` is not fully visible.
		// You can still render the `<layer>` in the same scroller with `<popup>`.

		// Why inserted into body every time?
		// Most layers share same `z-index`, append newly opened `<layer>` will makesure it covers others.

		// Note that:
		// The template `content` can't pass into `<layer>` as an argument,
		// it will cause the template was parsed in `<layer>` context.

		// The `<layer>` will be cached in `<popup>`, and element will be removed when not in use.
		// After restored from `cache`, it will be inserted back into `<popup>`.
		// So here we need to move it to `body` after every time rendered.

		// If there are serval nodes which belong to an template you need to append into another element,
		// Don't forget to move the anchor nodes, or the whole template nodes into the target element,
		// or they will can't be removed because they are outside of the template node ranges.

		// In the future, we may implement a flit directive `renderTo(..., ...)`, 
		// to render elements and it's anchor node to another element.

		if (typeof this.appendLayerTo === 'string') {
			let target = document.querySelector(this.appendLayerTo)
			if (target) {
				target.append(this.refs.layer)
			}
		}
		else if (this.appendLayerTo) {
			this.appendLayerTo.append(this.refs.layer)
		}
	}

	onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (!this.el.contains(target) && !this.refs.layer.contains(target)) {
			this.hideLayerLater()
		}
	}

	hideLayerLater() {
		if (this.timeout) {
			this.timeout.cancel()
		}
		
		if (this.opened) {
			if (this.trigger === 'hover') {
				this.unwatchLeave()
			}
			else if (this.trigger === 'click' || this.trigger === 'contextmenu') {
				off(document, 'mousedown', this.onDocMouseDown, this)
	
				if (this.trigger === 'click') {
					off(this.el, 'click', this.hideLayerLater, this)
				}
			}

			this.unwatch()
			
			this.timeout = timeout(this.hideLayer.bind(this), this.hideDelay)
		}
	}

	hideLayer() {
		this.opened = false
	}

	onRectChanged(rect: Rect) {
		if (rect.width > 0 && rect.height > 0) {
			this.alignLayer()
		}
		else {
			this.hideLayerLater()
		}
	}
}
