import {off, defineBinding, on, Binding, BindingResult, TemplateResult, TransitionOptions, Context, Transition, Template, UpdatableOptions, html, onRenderComplete, render, getRenderedAsComponent, enqueueUpdatableInOrder, QueueUpdateOrder} from '@pucelle/flit'
import {Timeout, MouseLeave, watchLayout, isVisibleInViewport, AlignPosition, EventEmitter, AlignOptions, Aligner} from '@pucelle/ff'
import {Popup} from '../components/popup'
import {RenderFn} from '../types'
import {SharedPopups} from './helpers/shared-popups'


export interface PopupOptions {

	/** 
	 * If specified, all the `:popup` binding with same key will share and reuse one popup component.
	 * It's very useful when many same type popup contents exist.
	 */
	readonly key?: string

	/** 
	 * How to trigger the popup.
	 * You should not change it after initialized.
	 * Note when use `focus` type trigger, you must ensure element can get focus.
	 */
	readonly trigger?: 'hover' | 'click' | 'focus' | 'contextmenu'

	/** Element to align to, use current element if not specified. */
	alignTo?: (trigger: Element) => Element

	/** Where the popup align, reference to `align`. */
	alignPosition?: AlignPosition

	/** Popup align margin, reference to `align`. Default value is `4`. */
	alignMargin?: number | number[]

	/** Whether can shrink height in y direction when there is not enough space. */
	canShrinkInY?: boolean

	/** Whether stick to viewport edges where there is not enough space. */
	stickToEdges?: boolean

	/** 
	 * Delay showing in millseconds, such that mouse hover unexpected will not cause layer popup.
	 * Only for `hover` and `focus` trigger types.
	 * Default value is `100`.
	 */
	showDelay?: number

	/** 
	 * Delay hiding in millseconds, such that mouse hover from `el` to `layer` will not cause it flush.
	 * Default value is `100`.
	 */
	hideDelay?: number

	/** Whether should show triangle. */
	triangle?: boolean

	/** 
	 * Whether should align triangle in a fixed relative position.
	 * Default value is `false`, triangle element will be adjusted to be in the center of the intersect part of align element and target.
	 */
	fixTriangle?: boolean

	/** Transition options to play transition when popup hiding and showing. */
	transition?: TransitionOptions

	/** 
	 * If specified as `true`, will show popup immediately.
	 * Only works when initializing.
	 */
	showImmediately?: boolean

	/** If specified as `true`, popup element will get focus after poped-up if it can get focus. */
	autoFocus?: boolean

	/** Whether the popup is pointerable and can interact with mouse. */
	pointerable?: boolean

	/** Whether caches the popup component after it hides. */
	cacheable?: boolean
}

interface PopupBindingEvents {
	
	/** Triggers when `opened` state of popup binding changed. */
	openedStateChange?: (opened: boolean) => void

	/** Triggers before align popup to current element. */
	willAlign?: () => void
}


/** Default popup options. */
export const DefaultPopupOptions: PopupOptions = {
	trigger: 'hover',
	alignPosition: 'b',
	alignMargin: 4,
	canShrinkInY: true,
	stickToEdges: true,
	triangle: true,
	fixTriangle: false,
	showDelay: 100,
	hideDelay: 200,
	transition: {name: 'fade'},
	showImmediately: false,
	autoFocus: false,
	pointerable: true,
	cacheable: false,
}


/**
 * A `:popup` binding can bind trigger element with it's popup component,
 * and make popup component poped-up when interact with trigger element.
 * 
 * `:popup=${() => popupComponent}`
 */
export class PopupBinding extends EventEmitter<PopupBindingEvents> implements Binding<RenderFn> {

	protected readonly el: HTMLElement
	protected readonly context: Context
	protected readonly options: UpdatableOptions<PopupOptions>

	protected renderFn!: RenderFn

	/** When decided to open or opened. */
	protected willOpen: boolean = false

	/** Be `true` after opened popup. */
	protected opened: boolean = false

	/** Be a `Timeout` after decided to open popup but not yet. */
	protected showTimeout: Timeout | null = null

	/** Be a `Timeout` after decided to close popup but not yet. */
	protected hideTimeout: Timeout | null = null

	/** Used to watch rect change after popup opened. */
	protected unwatchRect: (() => void) | null = null

	/** Used to watch mouse leaves trigger or popup element after popup opened. */
	protected unwatchLeave: (() => void) | null = null

	/** Current popup. */
	protected popup: Popup | null = null

	/** Controls current popup. */
	protected popupTemplate: Template | null = null

	/** Align to current popup. */
	protected aligner: Aligner | null = null

	/** Cached popup for reusing when `cacheable` is `true`. */
	protected cachedPopup: Popup | null = null

	/** Cached popup template for reusing when `cacheable` is `true`. */
	protected cachedPopupTemplate: Template | null = null

	constructor(el: Element, context: Context) {
		super()

		this.el = el as HTMLElement
		this.context = context

		// Don't assign default values.
		this.options = new UpdatableOptions({})
	}

	protected getOption<K extends keyof PopupOptions>(key: K): NonNullable<PopupOptions[K]> {
		let value: PopupOptions[K] = this.options.get(key)

		// `popupOptions` in popup component have a higher priority that default options.
		if (value === undefined && this.popup && this.popup.defaultPopupOptions) {
			value = this.popup.defaultPopupOptions[key]
		}

		if (value === undefined) {
			value = DefaultPopupOptions[key]
		}

		return value!
	}

	/** Get the trigger element. */
	getTriggerElement() {
		return this.el
	}

	/** `renderFn` should never change. */
	update(renderFn: RenderFn, options?: PopupOptions) {
		let firstTimeUpdate = this.options.isNotUpdated()

		this.renderFn = renderFn
		this.options.update(options)

		if (firstTimeUpdate) {
			// Must knows trigger type firstly, then can bind trigger.
			// Bind it late can improve performance.
			onRenderComplete(() => {
				this.bindTrigger()
			})
		}
		else if (this.opened) {
			enqueueUpdatableInOrder(this, this.context, QueueUpdateOrder.Directive)
		}
	}

	protected bindTrigger() {
		let trigger = this.getMappedTrigger()

		if (trigger === 'click') {
			on(this.el, trigger, this.onClickEl, this)
		}
		else if (trigger === 'contextmenu') {
			on(this.el, trigger, this.onContextMenu, this)
		}
		else if (trigger === 'hover') {
			on(this.el, 'mouseenter', this.onEnterOrFocusEl, this)
		}
		else if (trigger === 'focus') {
			on(this.el, 'focus', this.onEnterOrFocusEl, this)

			if (this.el.contains(document.activeElement)) {
				this.showPopupLater()
			}
		}

		if (this.getOption('showImmediately')) {
			this.showPopupLater()
		}
	}

	protected getMappedTrigger() {
		let trigger = this.getOption('trigger')

		// No mouse, uses click event instead.
		if (trigger === 'hover' && !this.havePointer()) {
			trigger = 'click'
		}

		return trigger
	}

	protected havePointer() {
		return matchMedia('(pointer:fine)').matches
	}

	protected onClickEl(e: Event) {
		e.preventDefault()
		e.stopPropagation()
		this.togglePopupOpened()
	}

	protected onContextMenu(e: Event) {
		e.preventDefault()
		e.stopPropagation()
		this.togglePopupOpened()
	}

	protected onEnterOrFocusEl(e: Event) {
		e.stopPropagation()
		this.showPopupLater()
	}

	protected unbindTrigger() {
		let trigger = this.getMappedTrigger()

		if (trigger === 'click') {
			off(this.el, trigger, this.onClickEl, this)
		}
		else if (trigger === 'contextmenu') {
			off(this.el, trigger, this.onContextMenu, this)
		}
		else if (trigger === 'hover') {
			off(this.el, 'mouseenter', this.onEnterOrFocusEl, this)
		}
		else if (trigger === 'focus') {
			off(this.el, 'focus', this.onEnterOrFocusEl, this)
		}
	}

	/** Toggle opened state and show or hide popup component immediately. */
	protected togglePopupOpened() {
		if (this.opened) {
			this.willOpen = false
			this.hidePopup()
		}
		else {
			this.willOpen = true
			this.showPopup()
		}
	}

	/** Show popup component after a short time out. */
	showPopupLater() {
		if (this.willOpen) {
			return
		}

		let trigger = this.getMappedTrigger()
		let showDelay = this.getOption('showDelay')
		let key = this.getOption('key')

		// If can reuse exist, show without delay.
		if (SharedPopups.isKeyInUse(key)) {
			showDelay = 0
		}

		// If give a delay for `click` type trigger, it will feel like a stuck or slow responsive.
		if (trigger === 'click' || trigger === 'focus') {
			showDelay = 0
		}

		this.willOpen = true

		if (showDelay > 0) {
			this.showTimeout = new Timeout(() => {
				this.showTimeout = null

				if (this.willOpen) {
					this.showPopup()
				}
			}, showDelay)
		}
		else {
			this.showPopup()
		}

		this.bindLeavingTriggerEvents()
	}

	/** Clear timeout for showing popup component. */
	protected clearShowTimeout() {
		if (this.showTimeout) {
			this.showTimeout.cancel()
			this.showTimeout = null
		}
	}

	/** Clear timeout for hiding popup component. */
	protected clearHideTimeout() {
		if (this.hideTimeout) {
			this.hideTimeout.cancel()
			this.hideTimeout = null
		}
	}

	/** Bind events to handle leaving trigger element before popup component showing. */
	protected bindLeavingTriggerEvents() {
		let trigger = this.getMappedTrigger()
		if (trigger === 'hover') {
			on(this.el, 'mouseleave', this.cancelShowingPopup, this)
		}
	}

	/** Unbind events to handle leaving trigger element before popup component showing. */
	protected unbindLeavingTriggerEvents() {
		let trigger = this.getMappedTrigger()
		if (trigger === 'hover') {
			off(this.el, 'mouseleave', this.cancelShowingPopup, this)
		}
	}

	/** Cancel showing popup. */
	protected cancelShowingPopup() {
		this.willOpen = false
		this.unbindLeavingTriggerEvents()
		this.clearShowTimeout()
	}

	/** Show popup component. */
	showPopup() {
		this.willOpen = true
		enqueueUpdatableInOrder(this, this.context, QueueUpdateOrder.Directive)
	}
	
	__updateImmediately() {
		// Why must enqueue updating?
		// There are 2 entries: trigger here, and update from parent component.
		// We should merge them into one.

		if (!this.willOpen) {
			return
		}

		if (this.popup) {
			this.updatePopup()
		}
		else {
			let isOldInUse = this.ensurePopup()
			this.popup!.el.style.visibility = 'hidden'
			
			this.unbindLeavingTriggerEvents()
			this.bindLeaveEvents()

			this.setOpened(true)

			onRenderComplete(() => {
				// May do something in the handlers of `openedStateChange` event and make it closed.
				if (!this.willOpen || !this.popup) {
					return
				}

				// May align not successfully.
				let aligned = this.alignPopup()
				if (!aligned) {
					return
				}

				this.popup.el.style.visibility = ''
				this.mayGetFocus()

				// Plays transition.
				if (!isOldInUse) {
					new Transition(this.popup.el, this.getOption('transition')).enter()
				}

				// Watch it's rect changing.
				this.unwatchRect = watchLayout(this.el, 'rect', this.onTriggerRectChanged.bind(this))
			})
		}
	}

	/** 
	 * Get a cached popup component, or create a new one.
	 * Returns whether old popup is in use.
	 */
	protected ensurePopup(): boolean {
		let result = this.renderFn()
		let key = this.getOption('key')
		let popup: Popup | null = null
		let template: Template | null = null

		/** Whether can patch with existed popup and reuse it. */
		let canShareWithOld = true

		/** Whether the existed popup is in use. */
		let isOldInUse = false

		if (!(result instanceof TemplateResult)) {
			result = html`${result}`
		}

		// Uses cache.
		if (this.cachedPopup && this.cachedPopupTemplate) {
			popup = this.cachedPopup

			if (this.cachedPopupTemplate.canPatchBy(result)) {
				this.cachedPopupTemplate.patch(result)
				popup = this.cachedPopup
				template = this.cachedPopupTemplate
				this.cachedPopup = null
				this.cachedPopupTemplate = null
			}
		}

		// Uses shared cache by `key`.
		if (!popup && key) {
			let cache = SharedPopups.getCache(key)
			if (cache) {
				({popup, template} = cache)

				let currentTriggerInsideCachedPopup = popup.el.contains(this.el)

				// Reuse and patch.
				if (!currentTriggerInsideCachedPopup && template.canPatchBy(result)) {
					template.patch(result)
				}

				// Can't reuse since trigger element inside it.
				else if (currentTriggerInsideCachedPopup) {
					popup = null
				}

				// Destroy otherwise same name popup immediately.
				else {
					canShareWithOld = false
				}
			}
		}
		
		if (popup) {
			// Whether is used by other popup binding, such that no need to play transition.
			let usedByBinding = SharedPopups.getPopupUser(popup)

			// If is using, lose the control of it.
			// No matter whether can reuse it or not.
			if (usedByBinding && usedByBinding !== this) {
				usedByBinding.losePopupControl()
			}

			isOldInUse = !!usedByBinding

			// Delete the popup that can't be shared.
			if (!canShareWithOld) {
				popup.el.remove()
				popup = null
			}
		}
		
		if (!popup) {
			// No need to watch the renderFn, it will be watched from outer component render function.
			template = render(result, this.context)
			popup = getRenderedAsComponent(template) as Popup

			if (key) {
				SharedPopups.addCache(key, {popup, template})
			}
		}

		if (key) {
			SharedPopups.setPopupUser(popup, this)
		}

		this.popup = popup
		this.popupTemplate = template

		popup.setBinding(this as PopupBinding)
		popup.applyAppendTo()
		popup.el.style.pointerEvents = this.getOption('pointerable') ? '' : 'none'

		return isOldInUse
	}

	/** Rlease control with a popup component after another binding take it. */
	losePopupControl() {
		this.clean()
	}

	/** Cleans all popup properties. */
	protected clean() {
		let key = this.getOption('key')
		let popup = this.popup
		let popupTemplate = this.popupTemplate

		if (key && popup) {
			SharedPopups.deleteCache(key, popup)
		}

		if (popup && popupTemplate && this.options.get('cacheable')) {
			this.cachedPopup = popup
			this.cachedPopupTemplate = popupTemplate
		}

		this.unbindLeaveEvents()

		if (this.unwatchRect) {
			this.unwatchRect()
			this.unwatchRect = null
		}

		this.willOpen = false
		this.setOpened(false)
		this.popup = null
		this.popupTemplate = null
		this.aligner = null
	}

	/** Update popup component, calls when updating an outer component. */
	protected updatePopup() {
		let result = this.renderFn()
		let key = this.getOption('key')
		let popup = this.popup!
		let template = this.popupTemplate!

		if (!(result instanceof TemplateResult)) {
			result = html`${result}`
		}

		if (template.canPatchBy(result)) {
			template.patch(result)
		}
		else {
			popup.el.remove()
			
			let template = this.popupTemplate = render(result, this.context)
			popup = getRenderedAsComponent(template) as Popup

			if (key) {
				SharedPopups.addCache(key, {popup, template})
			}
		}

		onRenderComplete(() => {
			if (this.popup) {
				this.alignPopup()
			}
		})
	}

	/** Set opened state and triggers event. */
	protected setOpened(opened: boolean) {
		if (opened !== this.opened) {
			this.opened = opened
			this.emit('openedStateChange', opened)
		}
	}

	/** Align popup component, returns whether aligns it successfully. */
	protected alignPopup(): boolean {
		let popup = this.popup!
		let alignToFn = this.getOption('alignTo')
		let alignTo = alignToFn ? alignToFn(this.el) : this.el

		this.emit('willAlign')

		// Create a aligner since align too much times for a tooltip.
		if (!this.aligner) {
			this.aligner = new Aligner(popup.el, alignTo, this.getOption('alignPosition'), this.getAlignOptions())
		}

		let aligned = this.aligner.align()
		if (!aligned) {
			this.hidePopup()
			return false
		}

		return true
	}

	/** Get align options. */
	protected getAlignOptions(): AlignOptions {
		let triangle = this.popup!.refElements.triangle as HTMLElement

		return {
			margin: this.getOption('alignMargin'),
			canShrinkInY: this.getOption('canShrinkInY'),
			triangle,
			fixTriangle: this.getOption('fixTriangle'),
			stickToEdges: this.getOption('stickToEdges'),
		}
	}

	/** Make element of popup component get focus if possible. */
	protected mayGetFocus() {
		let trigger = this.getMappedTrigger()
		if (this.getOption('autoFocus') && (trigger !== 'hover' && trigger !== 'focus') && this.popup && this.popup.el.tabIndex >= 0) {
			this.popup.el.focus()
		}
	}

	/** Bind hiding popup component events. */
	protected bindLeaveEvents() {
		let trigger = this.getOption('trigger')
		if (trigger === 'hover') {
			if (this.havePointer()) {
				// Should not use `MouseLeave.once`, because `hidePopupLater` may be canceled, it needs trigger again.
				this.unwatchLeave = MouseLeave.on(this.el, this.popup!.el, this.hidePopup.bind(this), {
					delay: this.getOption('hideDelay'),
					mouseIn: true,
				})
			}
			else {
				on(document, 'touchstart', this.onDocMouseDownOrTouch, this)
			}
		}
		else if (trigger === 'click' || trigger === 'contextmenu') {
			on(document, 'mousedown', this.onDocMouseDownOrTouch, this)
			MouseLeave.lock(this.el, this.popup?.el)
		}
		else if (trigger === 'focus') {
			on(this.el, 'blur', this.hidePopupLater, this)
		}
	}

	/** Unbind hiding popup component events. */
	protected unbindLeaveEvents() {
		let trigger = this.getOption('trigger')
		if (trigger === 'hover') {
			if (this.havePointer()) {
				if (this.unwatchLeave) {
					this.unwatchLeave()
					this.unwatchLeave = null
				}
			}
			else {
				off(document, 'touchstart', this.onDocMouseDownOrTouch, this)
			}
		}
		else if (trigger === 'click' || trigger === 'contextmenu') {
			off(document, 'mousedown', this.onDocMouseDownOrTouch, this)
			MouseLeave.unlock(this.el, this.popup?.el)
		}
		else if (trigger === 'focus') {
			off(this.el, 'blur', this.hidePopupLater, this)
		}
	}

	/** Hide popup component after a short time out. */
	hidePopupLater() {
		if (!this.opened) {
			return
		}

		let hideDelay = this.getOption('hideDelay')

		this.hideTimeout = new Timeout(() => {
			this.hideTimeout = null

			if (this.opened) {
				this.hidePopup()
			}
		}, hideDelay)

		this.willOpen = false
	}

	/** Hide popup component. */
	protected hidePopup() {
		let popup = this.popup!
		let popupEl = popup.el

		new Transition(popupEl, this.getOption('transition')).leave().then(finish => {
			if (finish) {
				popupEl.remove()
			}
		})

		this.clean()
	}

	/** Trigger when mouse down on document. */
	protected onDocMouseDownOrTouch(e: Event) {
		let target = e.target as Element

		if (!this.el.contains(target) && (!this.popup || !this.popup.el.contains(target))) {
			this.hidePopupLater()
		}
	}

	/** After trigger element position changed. */
	protected onTriggerRectChanged() {
		if (isVisibleInViewport(this.el, 0.1, this.popup!.el)) {
			if (this.popup) {
				this.alignPopup()
			}
		}
		else {
			this.hidePopupLater()
		}
	}

	remove() {
		off(this.el, 'mouseenter', this.showPopupLater, this)

		if (this.opened) {
			this.hidePopup()
		}
		else {
			this.clean()
		}

		this.unbindTrigger()
	}
}


/**
 * Bind trigger element with it's popup component,
 * and make popup component poped-up when interact with trigger element.
 * @param renderFn Should return a `<f-popup />` type template result.
 * @param options Popup options, `{trigger, alignTo, alignPosition, ...}`.
 */
export const popup = defineBinding('popup', PopupBinding) as (renderFn: RenderFn, options?: PopupOptions) => BindingResult