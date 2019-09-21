import {off, defineBinding, on, Binding, BindingResult, TemplateResult, TransitionOptions, once, renderComplete, Context, Transition, Template, renderComponent, clearTransition} from 'flit'
import {Timeout, timeout, onMouseLeaveAll, watchLayout, Rect, align} from 'ff'
import {Layer} from '../components/layer'


type RenderFn = () => TemplateResult

export interface PopupOptions {

	// If name specified, all the `:popup` with same name will share and reuse created popup component.
	name?: string

	trigger?: 'hover' | 'click' | 'focus' | 'contextmenu'
	alignPosition?: string
	alignMargin?: number | number[]

	// Such that mouse hover unexpected will not cause layer popup, only for `hover` and `focus` trigger.
	showDelay?: number

	// Such that when mouse hover from `el` to `layer` will not cause it flush.
	hideDelay?: number

	trangle?: boolean
	transition?: TransitionOptions
}

const namedPopupCache: Map<string, {template: Template, popup: Layer}> = new Map()
const usingNamedPopups: Map<Layer, PopupBinding> = new Map()

let defaultPopupOptions: Required<PopupOptions> = {
	name: '',
	trigger: 'hover',
	alignPosition: 't',
	alignMargin: 3,
	showDelay: 0,
	hideDelay: 200,
	trangle: true,
	transition: 'fade',
}


/**
 * `:popup="..."`
 * `popup(title: string, {alignPosition: ..., ...})`
 */
class PopupBinding implements Binding<[RenderFn, PopupOptions | undefined]> {

	protected el: HTMLElement
	protected context: Context
	protected renderFn!: RenderFn
	protected options: PopupOptions = {}
	protected opened: boolean = false
	protected showTimeout: Timeout | null = null
	protected hideTimeout: Timeout | null = null
	protected unwatchRect: (() => void) | null = null
	protected unwatchLeave: (() => void) | null = null
	protected focusEl!: HTMLElement
	protected popup: Layer | null = null

	constructor(el: Element, context: Context) {
		this.el = el as HTMLElement
		this.context = context
		on(this.el, 'mouseenter', this.showPopupLater, this)
		this.initFocus()
	}

	async update(renderFn: RenderFn, options?: PopupOptions) {
		this.renderFn = renderFn
		this.options = options || {}
	}

	remove() {
		off(this.el, 'mouseenter', this.showPopupLater, this)

		if (this.popup) {
			this.popup.el.remove()
		}
	}
	
	protected initFocus() {
		this.focusEl = this.el.querySelector('button, a, input, [tabindex="0"]') || this.el

		if (this.focusEl === this.el) {
			this.el.setAttribute('tabindex', '0')
		}

		on(this.focusEl, 'focus', this.onFocus, this)
	}

	protected onFocus() {
		on(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
		once(this.focusEl, 'blur', this.onBlur, this)
	}

	protected onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			// May cause button tiggering additional click event if not prevent here.
			e.preventDefault()
			this.toggleOpened()
		}
		else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			if (!this.opened) {
				this.showPopup()
			}
		}
		else if (e.key === 'Escape') {
			if (this.opened) {
				this.hidePopup()
			}
		}
	}

	protected onBlur() {
		off(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	protected toggleOpened() {
		if (this.opened) {
			this.hidePopup()
		}
		else {
			this.showPopup()
		}
	}

	protected getOption<K extends keyof PopupOptions>(key: K): Required<PopupOptions>[K] {
		let value = this.options[key] as Required<PopupOptions>[K] | undefined
		if (value !== undefined) {
			return value
		}

		return defaultPopupOptions[key]
	}

	showPopupLater() {
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

	protected async showPopup() {
		if (this.opened) {
			return
		}

		this.opened = true
		this.popup = this.getPopupComponent()
		this.popup.applyAppendTo()

		let name = this.getOption('name')
		this.popup!.el.style.visibility = 'hidden'

		await renderComplete()
		if (!this.popup) {
			return
		}

		let popupEl = this.popup!.el
		this.alignPopup()
		popupEl.style.visibility = ''

		let shouldPlayTransition = !name || !usingNamedPopups.has(this.popup!)
		if (shouldPlayTransition) {
			new Transition(popupEl, this.getOption('transition')).enter()
		}
		else {
			clearTransition(popupEl)
		}

		// When only one child element exclude trangle and it can get focus, e.g.: `<menu>`, focus it.
		this.mayFocusLayer()

		let trigger = this.getOption('trigger')
		if (trigger === 'hover') {
			off(this.el, 'mouseleave', this.hidePopupLater, this)

			// Should not use once to watch, or if the hideLater it triggered was canceled, This can't trigger again.
			this.unwatchLeave = onMouseLeaveAll([this.el, this.popup.el], this.hidePopupLater.bind(this), this.getOption('hideDelay'))
		}
		else if (trigger === 'click' || trigger === 'contextmenu') {
			on(document, 'mousedown', this.onDocMouseDown, this)
		}
		
		this.unwatchRect = watchLayout(this.el, 'rect', this.onElRectChanged.bind(this))
	}

	protected clearHideTimeout() {
		if (this.hideTimeout) {
			this.hideTimeout.cancel()
			this.hideTimeout = null
		}
	}

	protected getPopupComponent(): Layer {
		let name = this.getOption('name')!
		let popup: Layer | null = null
		let template: Template
		let result = this.renderFn()

		if (name && namedPopupCache.has(name)) {
			({popup, template} = namedPopupCache.get(name)!)

			if (template.canMergeWith(result)) {
				template.merge(result)
			}
			else {
				popup.el.remove()
				popup = null
			}
		}
		
		if (!popup) {
			let renderResult = renderComponent(result)
			template = renderResult.template
			popup = renderResult.component! as Layer
			namedPopupCache.set(name, {popup, template})
		}

		if (name) {
			usingNamedPopups.set(popup, this)
		}

		return popup
	}

	protected mayFocusLayer() {
		let popupEl = this.popup!.el
		let childCanGetFocus = popupEl.querySelector('a, button, input, [tabindex="0"]') as HTMLElement | null

		if (childCanGetFocus) {
			childCanGetFocus.focus()
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
		return this.getOption('trigger') === 'hover'
	}

	protected alignPopup() {
		let populEl = this.popup!.el
		let trangle = this.popup!.refs.trangle

		align(populEl, this.el, this.getOption('alignPosition'), {
			margin: this.getOption('alignMargin'),
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

		let trigger = this.getOption('trigger')
		let hideDelay = trigger === 'hover' ? 0 : this.getOption('hideDelay')

		this.hideTimeout = timeout(() => {
			this.hideTimeout = null
			this.hidePopup()
		}, hideDelay)
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

		// Must unwatch here, not the hideLater, or if it was canceled...
		this.unwatch()

		if (this.opened && this.focusEl) {
			this.restoreFocusFromLayer()
		}

		let name = this.getOption('name')
		let popupEl = this.popup!.el
		let shouldHidePopup = !name || usingNamedPopups.get(this.popup!) === this

		this.opened = false
		this.popup = null

		if (shouldHidePopup) {
			if (name) {
				usingNamedPopups.delete(this.popup!)
			}

			new Transition(popupEl, this.getOption('transition')).leave().then((finish: boolean) => {
				if (finish) {
					popupEl.remove()
				}
			})
		}
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

		if (trigger === 'click' || trigger === 'contextmenu') {
			off(document, 'mousedown', this.onDocMouseDown, this)
		}
	}

	protected restoreFocusFromLayer() {
		if (document.activeElement && this.popup && this.popup.el.contains(document.activeElement)) {
			this.focusEl.focus()
		}
	}
}

export const popup = defineBinding('popup', PopupBinding) as (renderFn: RenderFn, options?: PopupOptions) => BindingResult