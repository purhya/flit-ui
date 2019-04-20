import {css, define, Component, html, on, off, cache, once, renderComplete, getComponent} from "flit"
import {getAlignDirection, onceMouseLeaveAll, align, timeout, Timeout, watch, Rect} from "ff"
import {Layer} from "./layer"


// It's the base class for all the popup component.
@define('f-popup')
export class Popup<Events = {}> extends Component<Events> {

	static style() {
		return css`
		:host{
			display: inline-block;
			vertical-align: top;
		}
		
		.opened{}
		.layer{}
	`}

	static properties = ['trigger']

	opened: boolean = false
	transition: string = 'fade'
	hasTrangle: boolean = true
	alignPosition: string = 't'
	alignMargin: number | number[] = 3
	trigger: 'hover' | 'click' | 'focus' | 'contextmenu' = 'hover'

	// Such that mouse hover unexpected will not cause layer popup, only for `hover` and `focus` trigger.
	showDelay: number = 100

	// Such that when mouse hover from `el` to `layer` will not cause 
	hideDelay: number = 100

	timeout: Timeout | null = null
	private unwatchRect: (() => void) | null = null
	private unwatchLeave: (() => void) | null = null

	render() {
		// When hide, layer was removed from body
		// When show, layer was restored into popup, and then trigger connect, then update, then appended to body.
		let layerPart = cache(this.opened ? this.renderLayer() : '', this.transition)
		
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
		else if (this.trigger === 'click') {
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
		let trangle = (getComponent(this.refs.layer) as Layer).refs.trangle
		align(this.refs.layer, this.el, this.alignPosition, {margin: this.alignMargin, canShrinkInY: true, trangle})
	}

	onDisconnected() {
		// After disconnected, the component imediately locked and will not update.
		// So we must delete the layer element because it's in the body.
		this.opened = false

		if (this.refs.layer) {
			this.refs.layer.remove()
		}
	}

	clearTimeoutAndUnwatch() {
		if (this.timeout) {
			this.timeout.cancel()
			this.timeout = null
		}

		if (this.unwatchRect) {
			this.unwatchRect()
			this.unwatchRect = null
		}

		if (this.unwatchLeave) {
			this.unwatchLeave()
			this.unwatchLeave = null
		}
	}

	showLayerLater() {
		this.clearTimeoutAndUnwatch()

		if (!this.opened) {
			if (this.trigger === 'hover' || this.trigger === 'focus') {
				this.timeout = timeout(this.showLayer.bind(this), this.showDelay)

				if (this.trigger === 'hover') {
					once(this.el, 'mouseleave', this.hideLayerLater, this)
				}
				else if (this.trigger === 'focus') {
					once(this.el, 'blur', this.hideLayerLater, this)
				}
			}
			else {
				this.showLayer()
			}
		}
	}

	async showLayer() {
		this.clearTimeoutAndUnwatch()
		this.opened = true

		// Wait for `refs.layer` to be referenced.
		await renderComplete()

		if (this.trigger === 'hover') {
			off(this.el, 'mouseleave', this.hideLayerLater, this)
			this.unwatchLeave = onceMouseLeaveAll([this.el, this.refs.layer], this.hideLayerLater.bind(this))
		}
		else if (this.trigger === 'click' || this.trigger === 'contextmenu') {
			on(document, 'mousedown', this.onDocMouseDown, this)
		}

		this.unwatchRect = watch(this.el, 'rect', this.onRectChanged.bind(this))
	}

	onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (!this.el.contains(target) && !this.refs.layer.contains(target)) {
			this.hideLayerLater()
		}
	}

	hideLayerLater() {
		this.clearTimeoutAndUnwatch()
		
		if (this.opened) {
			if (this.trigger === 'click' || this.trigger === 'contextmenu') {
				off(document, 'mousedown', this.onDocMouseDown, this)
			}

			this.timeout = timeout(this.hideLayer.bind(this), this.hideDelay)
		}
	}

	hideLayer() {
		this.clearTimeoutAndUnwatch()
		this.opened = false
	}

	private onRectChanged(rect: Rect) {
		if (rect.width > 0 && rect.height > 0) {
			this.alignLayer()
		}
		else {
			this.hideLayerLater()
		}
	}
}