import {css, define, Component, html, on, off, cache, once, renderComplete, getComponent} from 'flit'
import {getAlignDirection, onceMouseLeaveAll, align, timeout, Timeout, watchLayout, Rect} from 'ff'
import {Layer} from './layer'
import {theme} from '../style/theme'


// It's the base class for all the popup component.
@define('f-popup')
export class Popup<Events = any> extends Component<Events> {

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
		`
	}

	static properties = ['trigger', 'opened', 'trangle', 'alignPosition', 'alignMargin']

	trigger: 'hover' | 'click' | 'focus' | 'contextmenu' = 'hover'
	opened: boolean = false
	trangle: boolean = true
	alignPosition: string = 't'
	alignMargin: number | number[] = 3
	transition: string = 'fade'

	// Such that mouse hover unexpected will not cause layer popup, only for `hover` and `focus` trigger.
	hoverShowDelay: number = 100

	// Such that when mouse hover from `el` to `layer` will not cause 
	hoverHideDelay: number = 100

	protected timeout: Timeout | null = null
	protected unwatchRect: (() => void) | null = null
	protected unwatchLeave: (() => void) | null = null
	protected focusEl!: HTMLElement

	protected render() {
		// When hide, layer was removed from body
		// When show, layer was restored into popup, and then trigger connect, then update, then appended to body.
		let layerPart = cache(this.opened ? this.renderLayer() : '', {transition: this.transition, enterAtStart: true})
		
		return html`
			<template :class.opened="${this.opened}">
				<slot />${layerPart}
			</template>
		`
	}
	
	protected renderLayer() {
		return html`
		<f-layer
			class="layer"
			:ref="layer"
			.popup=${this}
			.herizontal=${this.isHerizontal()}
			.trangle=${this.trangle}
		>
			<slot name="content" />
		</f-layer>
		`
	}

	protected isHerizontal() {
		let direction = getAlignDirection(this.alignPosition)
		return direction === 'l' || direction === 'r'
	}

	protected onReady() {
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

	protected initFocus() {
		this.focusEl = this.el.querySelector('button, a, input, [tabindex="0"]') || this.el

		if (this.focusEl === this.el) {
			this.el.setAttribute('tabindex', '0')
		}

		on(this.focusEl, 'focus', this.onFocus, this)
		on(this.focusEl, 'blur', this.onBlur, this)
	}

	protected onFocus() {
		on(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	protected onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			// May cause button tiggering additional click event if not prevent.
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

	protected onBlur() {
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

	protected onDisconnected() {
		// After disconnected, the component imediately locked and will not update.
		// So we must delete the layer element because it's in the body.
		this.opened = false

		if (this.refs.layer) {
			this.refs.layer.remove()
		}
	}

	protected clearTimeout() {
		if (this.timeout) {
			this.timeout.cancel()
		}
	}

	protected unwatch() {
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
		this.clearTimeout()

		if (!this.opened) {
			this.unwatch()

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
		this.clearTimeout()
		this.unwatch()
		this.opened = true

		// Wait for `refs.layer` to be referenced.
		await renderComplete()
		this.alignLayer()

		// When only one child element exclude trangle and it can get focus, e.g.: `<menu>`, focus it.
		this.mayFocusLayer()

		if (this.trigger === 'hover') {
			off(this.el, 'mouseleave', this.hideLayerLater, this)
			this.unwatchLeave = onceMouseLeaveAll([this.el, this.refs.layer], this.onMouseLeave.bind(this))
		}
		else if (this.trigger === 'click' || this.trigger === 'contextmenu') {
			on(document, 'mousedown', this.onDocMouseDown, this)
		}
		
		this.unwatchRect = watchLayout(this.el, 'rect', this.onElRectChanged.bind(this))
	}

	protected mayFocusLayer() {
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

	protected onMouseLeave() {
		this.hideLayerLater()
	}

	protected onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (!this.el.contains(target) && !this.refs.layer.contains(target)) {
			this.hideLayerLater()
		}
	}

	protected onElRectChanged(rect: Rect) {
		let dw = document.documentElement.offsetWidth
		let dh = document.documentElement.offsetHeight

		let inViewport = rect.width > 0 && rect.height > 0 && rect.top < dh && rect.bottom > 0 && rect.left < dw && rect.right > 0
		if (inViewport && !this.shouldHideWhenElLayerChanged()) {
			this.alignLayer()
		}
		else {
			this.hideLayerLater()
		}
	}

	protected shouldHideWhenElLayerChanged(): boolean {
		return this.trigger === 'hover'
	}

	protected alignLayer() {
		let trangle = (getComponent(this.refs.layer) as Layer).refs.trangle
		align(this.refs.layer, this.el, this.alignPosition, {margin: this.alignMargin, canShrinkInY: true, trangle})
	}

	hideLayerLater() {
		this.clearTimeout()
		this.unwatch()
		this.unbindEventsBeforeHide()

		if (this.opened) {
			this.timeout = timeout(this.hideLayer.bind(this), this.hoverHideDelay)
		}
	}

	hideLayer() {
		this.clearTimeout()
		this.unwatch()
		this.unbindEventsBeforeHide()
		
		if (this.opened && this.focusEl) {
			this.restoreFocusFromLayer()
		}

		this.opened = false
	}

	protected unbindEventsBeforeHide() {
		if (this.trigger === 'click' || this.trigger === 'contextmenu') {
			off(document, 'mousedown', this.onDocMouseDown, this)
		}
	}

	protected restoreFocusFromLayer() {
		if (document.activeElement && this.refs.layer && this.refs.layer.contains(document.activeElement)) {
			this.focusEl.focus()
		}
	}
}