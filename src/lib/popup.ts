import {css, define, Component, html, on, off, cache, once, renderComplete, getComponent} from 'flit'
import {getAlignDirection, onceMouseLeaveAll, align, timeout, Timeout, watch, Rect} from 'ff'
import {Layer} from './layer'
import {theme} from './theme'


// It's the base class for all the popup component.
@define('f-popup')
export class Popup<Events = {}> extends Component<Events> {

	static style() {
		let {mainColor} = theme

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
		}
		
		.opened{
			color: ${mainColor};

			button{
				color: ${mainColor};
				border-color: ${mainColor};
			}
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

	// Such that mouse hover unexpected will not cause layer popup, only for `hover` and `focus` trigger.
	hoverShowDelay: number = 100

	// Such that when mouse hover from `el` to `layer` will not cause 
	hoverHideDelay: number = 100

	private timeout: Timeout | null = null
	private unwatchRect: (() => void) | null = null
	private unwatchLeave: (() => void) | null = null
	focusEl!: HTMLElement

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

	onReady() {
		if (this.trigger === 'hover') {
			on(this.el, 'mouseenter', this.showLayerLater, this)
		}
		else if (this.trigger === 'click') {
			on(this.el, 'click', this.toggleOpened, this)
		}
		else {
			on(this.el, this.trigger, this.showLayerLater, this)
		}

		this.initFocus()

		if (this.opened) {
			this.showLayer()
		}
	}

	private initFocus() {
		this.focusEl = this.el.querySelector('button, a, input, [tabindex="0"]') || this.el
		if (this.focusEl === this.el) {
			this.el.setAttribute('tabindex', '0')
		}

		on(this.focusEl, 'focus', this.onFocus, this)
		on(this.focusEl, 'blur', this.onBlur, this)
	}

	private onFocus() {
		on(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			// May cause button tigger additional click event if not prevent.
			e.preventDefault()
			this.toggleOpened()
		}
		else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			if (!this.opened) {
				this.showLayer()
			}
		}
		else if (e.key === 'Escape') {
			if (this.opened) {
				this.hideLayer()
			}
		}
	}

	private onBlur() {
		off(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	toggleOpened() {
		if (this.opened) {
			this.hideLayer()
		}
		else {
			this.showLayer()
		}
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
				this.timeout = timeout(this.showLayer.bind(this), this.hoverShowDelay)

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
		this.alignLayer()

		// When only one child element exclude trangle and it can get focus, e.g.: `<menu>`, focus it.
		this.mayFocusLayer()

		if (this.trigger === 'hover') {
			off(this.el, 'mouseleave', this.hideLayerLater, this)
			this.unwatchLeave = onceMouseLeaveAll([this.el, this.refs.layer], this.hideLayerLater.bind(this))
		}
		else if (this.trigger === 'click' || this.trigger === 'contextmenu') {
			on(document, 'mousedown', this.onDocMouseDown, this)
		}
		
		this.unwatchRect = watch(this.el, 'rect', this.onLayerRectChanged.bind(this))
	}

	private mayFocusLayer() {
		let layer = this.refs.layer as HTMLElement
		let layerHasTrangle = (getComponent(layer) as Layer).trangle
		let children = (layerHasTrangle ? [...layer.children].slice(1) : [...layer.children]) as HTMLElement[]

		if (children.length === 1 && children[0].tabIndex === 0) {
			children[0].focus()
		}
		else if (layer.querySelector('a, button, input, [tabindex="0"]')) {
			layer.focus()
		}
	}

	private onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (!this.el.contains(target) && !this.refs.layer.contains(target)) {
			this.hideLayerLater()
		}
	}

	private onLayerRectChanged(rect: Rect) {
		if (rect.width > 0 && rect.height > 0) {
			this.alignLayer()
		}
		else {
			this.hideLayerLater()
		}
	}

	alignLayer() {
		let trangle = (getComponent(this.refs.layer) as Layer).refs.trangle
		align(this.refs.layer, this.el, this.alignPosition, {margin: this.alignMargin, canShrinkInY: true, trangle})
	}

	hideLayerLater() {
		this.clearTimeoutAndUnwatch()
		this.unbindEventsBeforeHide()

		if (this.opened) {
			this.timeout = timeout(this.hideLayer.bind(this), this.hoverHideDelay)
		}
	}

	hideLayer() {
		this.clearTimeoutAndUnwatch()
		this.unbindEventsBeforeHide()
		
		if (this.opened) {
			this.restoreFocusFromLayer()
		}

		this.opened = false
	}

	private unbindEventsBeforeHide() {
		if (this.trigger === 'click' || this.trigger === 'contextmenu') {
			off(document, 'mousedown', this.onDocMouseDown, this)
		}
	}

	private restoreFocusFromLayer() {
		if (document.activeElement && this.refs.layer.contains(document.activeElement)) {
			this.focusEl.focus()
		}
	}
}