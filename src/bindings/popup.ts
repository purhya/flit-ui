import {off, defineBinding, on, Binding, BindingResult, TemplateResult, TransitionOptions, once, renderComplete, Context, Transition, Template, clearTransition, UpdatableOptions, html, onRenderComplete, render, getRenderedAsComponent} from '@pucelle/flit'
import {Timeout, timeout, MouseLeave, watchLayout, align, isVisibleInViewport, AlignPosition} from '@pucelle/ff'
import {Popup} from '../components/popup'
import {RenderFn} from '../types'


export interface PopupOptions {

	/** If name specified, all the `:popup` with same name will share and reuse popup component each other. */
	name?: string

	/** 
	 * How to trigger the popup.
	 * You should not change it after set.
	 */
	trigger?: 'hover' | 'click' | 'focus' | 'contextmenu'

	/** Element to align to, default value is current element. */
	alignTo?: (trigger: Element) => Element

	/** Where the popup align, reference to `align`. */
	alignPosition?: AlignPosition

	/** Popup align margin, reference to `align`. */
	alignMargin?: number | number[]

	/** Such that mouse hover unexpected will not cause layer popup, only for `hover` and `focus` trigger. */
	showDelay?: number

	/** Such that when mouse hover from `el` to `layer` will not cause it flush. */
	hideDelay?: number

	/** Should show triangle. */
	triangle?: boolean

	/** 
	 * Should align triangle in a fixed position.
	 * Default value is `false`, means triangle will be adjusted to be in the center of the edge of el or target.
	 */
	fixTriangle?: boolean

	/** Transition options for popup hiding and showing. */
	transition?: TransitionOptions

	/** To notify when `opened` changed. */
	onOpenedChanged?: (opened: boolean) => void
}


const NamedPopupCache: Map<string, {template: Template, popup: Popup}> = new Map()
const NamedPopupsInUse: Map<Popup, PopupBinding<any>> = new Map()

function getPopupCacheFromName(name: string) {
	let cache = NamedPopupCache.get(name)
	if (cache) {
		let popup = cache.popup

		// If current popup is in use, not reuse it
		if (MouseLeave.inUse(popup.el)) {
			return null
		}

		return cache
	}

	return null
}


const defaultPopupOptions: PopupOptions = {
	trigger: 'hover',
	alignPosition: 'b',
	alignMargin: 4,
	showDelay: 0,
	hideDelay: 200,
	triangle: true,
	fixTriangle: false,
	transition: {name: 'fade'},
	onOpenedChanged: () => undefined
}


/**
 * `:popup="..."`
 * `popup(title: string, {alignPosition: ..., ...})`
 */
export class PopupBinding<R = RenderFn> implements Binding<R> {

	protected el: HTMLElement
	protected context: Context
	protected renderFn!: RenderFn
	protected options: UpdatableOptions<PopupOptions> = new UpdatableOptions(defaultPopupOptions)
	protected opened: boolean = false
	protected showTimeout: Timeout | null = null
	protected hideTimeout: Timeout | null = null
	protected unwatchRect: (() => void) | null = null
	protected unwatchLeave: (() => void) | null = null
	protected unwatchResult: (() => void) | null = null
	protected popupTemplate: Template | null = null
	
	popup: Popup | null = null

	constructor(el: Element, context: Context) {
		this.el = el as HTMLElement
		this.context = context
	}

	/** `renderFn` should never change. */
	update(renderFn: R, options?: PopupOptions) {
		let firstTimeUpdate = this.options.isNotUpdated()

		this.renderFn = renderFn as unknown as RenderFn
		this.options.update(options)

		if (firstTimeUpdate) {
			this.bindTrigger()
		}
		else {
			this.updatePopup()
		}
	}

	protected getOption<K extends keyof PopupOptions>(key: K): Required<PopupOptions>[K] {
		let value: PopupOptions[K] | undefined

		if (this.popup && this.popup.defaultPopupOptions) {
			value = this.popup.defaultPopupOptions[key]
		}

		if (value === undefined) {
			value = this.options.get(key)
		}

		return value as Required<PopupOptions>[K]
	}

	protected bindTrigger() {
		let trigger = this.getOption('trigger')

		if (trigger === 'hover') {
			on(this.el, 'mouseenter', this.showPopupLater, this)
		}
		else if (trigger === 'click') {
			on(this.el, 'click', this.toggleOpened, this)
		}
		else {
			on(this.el, trigger, this.showPopupLater, this)
		}
	}

	remove() {
		off(this.el, 'mouseenter', this.showPopupLater, this)

		if (this.popup) {
			this.popup.el.remove()
		}
	}
	
	protected toggleOpened() {
		if (this.opened) {
			this.hidePopup()
		}
		else {
			this.showPopup()
		}
	}

	async showPopupLater() {
		if (this.showTimeout) {
			return
		}

		this.clearHideTimeout()

		if (this.opened) {
			return
		}

		let trigger = this.getOption('trigger')
		let showDelay = this.getOption('showDelay')

		if (trigger === 'hover' || trigger === 'focus') {
			this.showTimeout = timeout(() => {
				this.showTimeout = null
				this.showPopup()
			}, showDelay)

			if (trigger === 'hover') {
				once(this.el, 'mouseleave', this.hidePopupLater, this)
			}
			else if (trigger === 'focus') {
				once(this.el, 'blur', this.hidePopupLater, this)
			}
		}
		else {
			this.showPopup()
		}
	}

	protected showPopup() {
		if (this.opened) {
			return
		}

		let {popup, inUse} = this.getPopup()
		popup.applyAppendTo()
		popup.el.style.visibility = 'hidden'
		
		this.setOpened(true)

		// May do something in callback of `setOpened` and `await renderComplete` there.
		onRenderComplete(() => {
			if (!this.isPopupInControl()) {
				return
			}

			this.alignPopup()
			popup.el.style.visibility = ''
			this.mayFocus()

			if (inUse) {
				clearTransition(popup.el)
			}
			else {
				new Transition(popup.el, this.getOption('transition')).enter()
			}

			let trigger = this.getOption('trigger')
			if (trigger === 'hover') {
				off(this.el, 'mouseleave', this.hidePopupLater, this)
			}
			else if (trigger === 'focus') {
				off(this.el, 'blur', this.hidePopupLater, this)
			}

			this.bindLeave()
			this.unwatchRect = watchLayout(this.el, 'rect', this.onElRectChanged.bind(this))
		})
	}

	protected mayFocus() {
		let trigger = this.getOption('trigger')
		if ((trigger !== 'hover' && trigger !== 'focus') && this.el.tabIndex >= 0) {
			this.el.focus()
		}
	}

	protected bindLeave() {
		let trigger = this.getOption('trigger')
		if (trigger === 'hover') {
			// Should not use once to watch, or if the hideLater it triggered was canceled, This can't trigger again.
			this.unwatchLeave = MouseLeave.on([this.el, this.popup!.el], this.hidePopupLater.bind(this), {
				delay: this.getOption('hideDelay'),
				mouseIn: true,
			})
		}
		else if (trigger === 'click' || trigger === 'contextmenu') {
			on(document, 'mousedown', this.onDocMouseDown, this)
		}
	}

	protected setOpened(opened: boolean) {
		this.opened = opened

		let onOpenedChanged = this.getOption('onOpenedChanged')
		if (onOpenedChanged) {
			onOpenedChanged(opened)
		}
	}

	// If popup is not been reused by another.
	protected isPopupInControl(): boolean {
		if (!this.popup) {
			return false
		}

		let name = this.getOption('name')
		if (!name) {
			return true
		}

		return NamedPopupsInUse.get(this.popup!) === this
	}

	protected clearHideTimeout() {
		if (this.hideTimeout) {
			this.hideTimeout.cancel()
			this.hideTimeout = null
		}
	}

	protected getPopup() {
		let result = this.renderFn()
		let name = this.getOption('name')
		let popup: Popup | null = null
		let template: Template | null = null
		let inUse: boolean = false

		if (!(result instanceof TemplateResult)) {
			result = html`${result}`
		}

		if (name) {
			let cache = getPopupCacheFromName(name)
			if (cache) {
				({popup, template} = cache)
				inUse = NamedPopupsInUse.has(popup)

				if (template.canMergeWith(result)) {
					template.merge(result)
				}
				else {
					popup.el.remove()
					popup = null
				}
			}
		}
		
		if (!popup) {
			let template = render(result, this.context)
			popup = getRenderedAsComponent(template) as Popup

			if (name) {
				NamedPopupCache.set(name, {popup, template})
			}
		}

		if (name) {
			NamedPopupsInUse.set(popup, this)
		}

		this.popup = popup
		this.popupTemplate = template

		popup.setPopupBinding(this as PopupBinding<any>)

		return {popup, inUse}
	}

	protected async updatePopup() {
		if (this.isPopupInControl()) {
			let result = this.renderFn()
			let name = this.getOption('name')
			let popup = this.popup!
			let template = this.popupTemplate!

			if (!(result instanceof TemplateResult)) {
				result = html`${result}`
			}

			if (template.canMergeWith(result)) {
				template.merge(result)
			}
			else {
				popup.el.remove()
				
				let template = this.popupTemplate = render(result, this.context)
				popup = getRenderedAsComponent(template) as Popup

				if (name) {
					NamedPopupCache.set(name, {popup, template})
				}
			}

			await renderComplete()
			this.alignPopup()
		}
	}

	protected onMouseLeave() {
		this.hidePopupLater()
	}

	protected onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (!this.el.contains(target) && !this.popup!.el.contains(target)) {
			this.hidePopupLater()
		}
	}

	protected onElRectChanged() {
		if (isVisibleInViewport(this.el)) {
			if (this.popup) {
				this.alignPopup()
			}
		}
		else {
			this.onNotInViewport()
		}
	}

	protected onNotInViewport() {
		this.hidePopupLater()
	}

	protected alignPopup() {
		let popup = this.popup!
		let alignToFn = this.getOption('alignTo')
		let alignTo = alignToFn ? alignToFn(this.el) : this.el
		let triangle = this.popup!.refs.triangle

		align(popup.el, alignTo, this.getOption('alignPosition'), {
			margin: this.getOption('alignMargin'),
			canShrinkInY: true,
			triangle,
			fixTriangle: this.getOption('fixTriangle'), 
		})
	}

	hidePopupLater() {
		if (this.hideTimeout) {
			return
		}

		this.clearShowTimeout()

		if (!this.opened) {
			return
		}

		let trigger = this.getOption('trigger')
		let hideDelay = trigger === 'hover' ? 0 : this.getOption('hideDelay')

		if ((trigger === 'hover' || trigger === 'focus') && hideDelay > 0) {
			this.hideTimeout = timeout(() => {
				this.hideTimeout = null
				this.hidePopup()
			}, hideDelay)
		}
		else {
			this.hidePopup()
		}
	}

	protected clearShowTimeout() {
		if (this.showTimeout) {
			this.showTimeout.cancel()
			this.showTimeout = null
		}
	}

	protected hidePopup() {
		if (!this.opened) {
			return
		}

		// Must unwatch here, not in `hideLater`, or if it was canceled...
		this.unwatch()

		let name = this.getOption('name')
		let popupEl = this.popup!.el

		if (this.isPopupInControl()) {
			if (name) {
				NamedPopupsInUse.delete(this.popup!)
			}

			new Transition(popupEl, this.getOption('transition')).leave().then((finish: boolean) => {
				if (finish) {
					popupEl.remove()
				}
			})
		}

		this.setOpened(false)
		this.popup = null
		this.popupTemplate = null
	}

	protected unwatch() {
		let trigger = this.getOption('trigger')

		if (this.unwatchRect) {
			this.unwatchRect()
			this.unwatchRect = null
		}

		if (this.unwatchLeave) {
			this.unwatchLeave()
			this.unwatchLeave = null
		}

		if (this.unwatchResult) {
			this.unwatchResult()
			this.unwatchResult = null
		}

		if (trigger === 'click' || trigger === 'contextmenu') {
			off(document, 'mousedown', this.onDocMouseDown, this)
		}
	}
}


export const popup = defineBinding('popup', PopupBinding) as (renderFn: RenderFn, options?: PopupOptions) => BindingResult