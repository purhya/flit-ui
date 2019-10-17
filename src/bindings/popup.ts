import {off, defineBinding, on, Binding, BindingResult, TemplateResult, TransitionOptions, once, renderComplete, Context, Transition, Template, renderComponent, clearTransition, Options} from '@pucelle/flit'
import {Timeout, timeout, MouseLeave, watchLayout, Rect, align} from '@pucelle/ff'
import {Popup} from '../components/popup'


export type RenderFn = () => TemplateResult

export interface PopupOptions {

	/** If name specified, all the `:popup` with same name will share and reuse popup component each other. */
	name?: string

	/** 
	 * How to trigger the popup.
	 * Should not change it.
	 */
	trigger?: 'hover' | 'click' | 'focus' | 'contextmenu'

	/** Element to align to, default value is current element. */
	alignTo?: () => Element

	/** Where the popup align, reference to `align`. */
	alignPosition?: string

	/** Popup align margin, reference to `align`. */
	alignMargin?: number | number[]

	/** Such that mouse hover unexpected will not cause layer popup, only for `hover` and `focus` trigger. */
	showDelay?: number

	/** Such that when mouse hover from `el` to `layer` will not cause it flush. */
	hideDelay?: number

	/** Should show trangle. */
	trangle?: boolean

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
	alignPosition: 't',
	alignMargin: 3,
	showDelay: 0,
	hideDelay: 200,
	trangle: true,
	transition: 'fade',
	onOpenedChanged: () => undefined
}


/**
 * `:popup="..."`
 * `popup(title: string, {alignPosition: ..., ...})`
 */
export class PopupBinding<R = RenderFn> implements Binding<[R, PopupOptions | undefined]> {

	protected el: HTMLElement
	protected context: Context
	protected renderFn!: RenderFn
	protected options: Options<PopupOptions> = new Options(defaultPopupOptions)
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
		let firstlyUpdate = !this.options.updated

		this.renderFn = renderFn as unknown as RenderFn
		this.options.update(options)

		if (firstlyUpdate) {
			this.bindTrigger()
		}
		else {
			this.updatePopup()
		}
	}

	protected bindTrigger() {
		let trigger = this.options.get('trigger')

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

		let trigger = this.options.get('trigger')
		let showDelay = this.options.get('showDelay')

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
			await this.showPopup()
		}
	}

	protected async showPopup() {
		if (this.opened) {
			return
		}

		let {popup, inUse} = this.getPopup()
		popup.applyAppendTo()
		popup.el.style.visibility = 'hidden'
		
		this.setOpened(true)

		await renderComplete()
		if (!this.isPopupInControl()) {
			return
		}

		this.alignPopup()
		popup.el.style.visibility = ''

		if (inUse) {
			clearTransition(popup.el)
		}
		else {
			new Transition(popup.el, this.options.get('transition')).enter()
		}

		let trigger = this.options.get('trigger')
		if (trigger === 'hover') {
			off(this.el, 'mouseleave', this.hidePopupLater, this)

			// Should not use once to watch, or if the hideLater it triggered was canceled, This can't trigger again.
			this.unwatchLeave = MouseLeave.on([this.el, popup.el], this.hidePopupLater.bind(this), {
				delay: this.options.get('hideDelay'),
				mouseIn: true,
			})
		}
		else if (trigger === 'click' || trigger === 'contextmenu') {
			on(document, 'mousedown', this.onDocMouseDown, this)
		}
		
		this.unwatchRect = watchLayout(this.el, 'rect', this.onElRectChanged.bind(this))
	}

	protected setOpened(opened: boolean) {
		this.opened = opened

		let onOpenedChanged = this.options.get('onOpenedChanged')
		if (onOpenedChanged) {
			onOpenedChanged(opened)
		}
	}

	// If popup is not been reused by another.
	protected isPopupInControl(): boolean {
		if (!this.popup) {
			return false
		}

		let name = this.options.get('name')
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
		let name = this.options.get('name')
		let popup: Popup | null = null
		let template: Template | null = null
		let inUse: boolean = false

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
			let renderResult = renderComponent(result, this.context)
			template = renderResult.template
			popup = renderResult.component! as Popup

			if (name) {
				NamedPopupCache.set(name, {popup, template})
			}
		}

		if (name) {
			NamedPopupsInUse.set(popup, this)
		}

		this.popup = popup
		this.popupTemplate = template

		return {popup, inUse}
	}

	protected async updatePopup() {
		if (this.isPopupInControl()) {
			let result = this.renderFn()
			let name = this.options.get('name')
			let popup = this.popup!
			let template = this.popupTemplate!

			if (template.canMergeWith(result)) {
				template.merge(result)
			}
			else {
				popup.el.remove()
				
				let renderResult = renderComponent(result, this.context)
				template = this.popupTemplate = renderResult.template
				popup = renderResult.component! as Popup

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

	protected onElRectChanged(rect: Rect) {
		let dw = document.documentElement.offsetWidth
		let dh = document.documentElement.offsetHeight

		let inViewport = rect.width > 0 && rect.height > 0 && rect.top < dh && rect.bottom > 0 && rect.left < dw && rect.right > 0
		if (inViewport && !this.shouldHideWhenElLayerChanged()) {
			this.alignPopup()
		}
		else {
			this.hidePopupLater()
		}
	}

	protected shouldHideWhenElLayerChanged(): boolean {
		return this.options.get('trigger') === 'hover'
	}

	protected alignPopup() {
		let toAlign = this.popup!.el
		let alignToFn = this.options.get('alignTo')
		let alignTo = alignToFn ? alignToFn() : this.el
		let trangle = this.popup!.refs.trangle

		align(toAlign, alignTo, this.options.get('alignPosition'), {
			margin: this.options.get('alignMargin'),
			canShrinkInY: true,
			trangle,
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

		let trigger = this.options.get('trigger')
		let hideDelay = trigger === 'hover' ? 0 : this.options.get('hideDelay')

		if (hideDelay > 0) {
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

		let name = this.options.get('name')
		let popupEl = this.popup!.el

		if (this.isPopupInControl()) {
			if (name) {
				NamedPopupsInUse.delete(this.popup!)
			}

			new Transition(popupEl, this.options.get('transition')).leave().then((finish: boolean) => {
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
		let trigger = this.options.get('trigger')

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