import {off, defineBinding, on, Binding, BindingResult, TemplateResult, TransitionOptions, once, Context, Transition, Template, UpdatableOptions, html, onRenderComplete, render, getRenderedAsComponent, enqueueUpdatable} from '@pucelle/flit'
import {Timeout, timeout, MouseLeave, watchLayout, align, isVisibleInViewport, AlignPosition, EventEmitter, AlignOptions} from '@pucelle/ff'
import {Popup} from '../components/popup'
import {RenderFn} from '../types'


export interface PopupOptions {

	/** 
	 * If specified, all the `:popup` binding with same key will share and reuse one popup component.
	 * It's very useful when many same type popup contents exist.
	 */
	key?: string

	/** 
	 * How to trigger the popup.
	 * You should not change it after set.
	 */
	trigger?: 'hover' | 'click' | 'focus' | 'contextmenu'

	/** Element to align to, use current element if not specified. */
	alignTo?: (trigger: Element) => Element

	/** Where the popup align, reference to `align`. */
	alignPosition?: AlignPosition

	/** Popup align margin, reference to `align`. Default value is `4`. */
	alignMargin?: number | number[]

	/** 
	 * Delay showing in millseconds, such that mouse hover unexpected will not cause layer popup.
	 * Only for `hover` and `focus` trigger.
	 * Default value is `100`.
	 */
	showDelay?: number

	/** 
	 * Delay hiding in millseconds, such that mouse hover from `el` to `layer` will not cause it flush.
	 * Default value is `100`.
	 */
	hideDelay?: number

	/** Should show triangle. */
	triangle?: boolean

	/** 
	 * Should align triangle in a fixed position.
	 * Default value is `false`, means triangle will be adjusted to be in the center of the edge of el or target.
	 */
	fixTriangle?: boolean

	/** Transition options to play transition when popup hiding and showing. */
	transition?: TransitionOptions
}

interface PopupBindingEvents {
	
	/** To trigger when `opened` state of popup binding changed. */
	openedStateChange?: (opened: boolean) => void
}


/** Default popup options. */
export const DefaultPopupOptions: PopupOptions = {
	trigger: 'hover',
	alignPosition: 'b',
	alignMargin: 4,
	showDelay: 100,
	hideDelay: 100,
	triangle: true,
	fixTriangle: false,
	transition: {name: 'fade'},
}


/** Cache shared popup component. */
const SharedPopupCache: Map<string, {template: Template, popup: Popup}> = new Map()

/** Cache popup component usage. */
const SharedPopupsInUse: Map<Popup, PopupBinding> = new Map()

/** Get a shared popup component by key. */
function getSharedPopupByKey(key: string) {
	let cache = SharedPopupCache.get(key)
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
	protected opened: boolean = false
	protected showTimeout: Timeout | null = null
	protected hideTimeout: Timeout | null = null
	protected unwatchRect: (() => void) | null = null
	protected unwatchLeave: (() => void) | null = null
	protected popupTemplate: Template | null = null
	protected popup: Popup | null = null

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

	/** `renderFn` should never change. */
	update(renderFn: RenderFn, options?: PopupOptions) {
		let firstTimeUpdate = this.options.isNotUpdated()

		this.renderFn = renderFn
		this.options.update(options)

		if (firstTimeUpdate) {
			// Must knows trigger type firstly.
			this.bindTrigger()
		}
		else {
			enqueueUpdatable(this)
		}
	}

	protected bindTrigger() {
		let trigger = this.getOption('trigger')

		// Clicking to trigger must have no delay.
		if (trigger === 'click') {
			on(this.el, 'click', this.togglePopupOpened, this)
		}
		else if (trigger === 'hover') {
			on(this.el, 'mouseenter', this.showPopupLater, this)
		}
		else {
			on(this.el, trigger, this.showPopupLater, this)
		}
	}

	/** Toggle opened state and show or hide popup component immediately. */
	protected togglePopupOpened() {
		if (this.opened) {
			this.hidePopup()
		}
		else {
			this.showPopup()
		}
	}

	/** Show popup component after a short time out. */
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

		// If give a delay for `click` type trigger, it will feel like a stuck or slow responsive.
		if (trigger === 'hover' || trigger === 'focus') {
			showDelay = 0
		}

		this.showTimeout = timeout(() => {
			this.showTimeout = null
			this.showPopup()
		}, showDelay)

		this.bindLeavingTriggerEvents()
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
		let trigger = this.getOption('trigger')

		if (trigger === 'hover') {
			once(this.el, 'mouseleave', this.hidePopupLater, this)
		}
		else if (trigger === 'focus') {
			once(this.el, 'blur', this.hidePopupLater, this)
		}
	}

	/** Unbind events to handle leaving trigger element before popup component showing. */
	protected unbindLeavingTriggerEvents() {
		let trigger = this.getOption('trigger')
		if (trigger === 'hover') {
			off(this.el, 'mouseleave', this.hidePopupLater, this)
		}
		else if (trigger === 'focus') {
			off(this.el, 'blur', this.hidePopupLater, this)
		}
	}

	/** Hide popup component after a short time out. */
	hidePopupLater() {
		if (this.hideTimeout) {
			return
		}

		this.clearShowTimeout()

		if (!this.opened) {
			return
		}

		let hideDelay = this.getOption('hideDelay')

		this.hideTimeout = timeout(() => {
			this.hideTimeout = null
			this.hidePopup()
		}, hideDelay)
	}

	/** Clear timeout for showing popup component. */
	protected clearShowTimeout() {
		if (this.showTimeout) {
			this.showTimeout.cancel()
			this.showTimeout = null
		}
	}

	/** Show popup component. */
	showPopup() {
		if (this.opened) {
			return
		}

		this.unbindLeavingTriggerEvents()		
		this.setOpened(true)
		enqueueUpdatable(this)
	}
	
	__updateImmediately() {

		// Why must enqueue updating?
		// There are 2 entries: trigger here, and update from parent component.
		// We should merge them into one.

		if (!this.opened) {
			return
		}

		if (this.popup) {
			this.updatePopup()
		}
		else {
			let popup = this.createPopup()
			popup.el.style.visibility = 'hidden'

			// May do something in handlers of `openedStateChange` event.
			onRenderComplete(() => {
				if (!this.isPopupInControl() || !this.opened) {
					return
				}

				this.alignPopup()
				popup.el.style.visibility = ''
				this.mayGetFocus()

				new Transition(popup.el, this.getOption('transition')).enter()

				this.bindLeaveEvents()
				this.unwatchRect = watchLayout(this.el, 'rect', this.onTriggerRectChanged.bind(this))
			})
		}
	}

	/** Get a cached popup component, or create a new one. */
	protected createPopup() {
		let result = this.renderFn()
		let key = this.getOption('key')
		let popup: Popup | null = null
		let template: Template | null = null

		if (!(result instanceof TemplateResult)) {
			result = html`${result}`
		}

		if (key) {
			let cache = getSharedPopupByKey(key)
			if (cache) {
				({popup, template} = cache)

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
			// No need to watch the renderFn, it will be watched from outer component render function.
			template = render(result, this.context)
			popup = getRenderedAsComponent(template) as Popup

			if (key) {
				SharedPopupCache.set(key, {popup, template})
			}
		}

		if (key) {
			SharedPopupsInUse.set(popup, this)
		}

		this.popup = popup
		this.popupTemplate = template

		popup.setBinding(this as PopupBinding)
		popup.applyAppendTo()

		return popup
	}

	/** Update popup component. */
	protected updatePopup() {
		if (!this.isPopupInControl()) {
			return
		}

		let result = this.renderFn()
		let key = this.getOption('key')
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

			if (key) {
				SharedPopupCache.set(key, {popup, template})
			}
		}

		onRenderComplete(() => {
			if (!this.isPopupInControl() || !this.opened) {
				return
			}

			this.alignPopup()
		})
	}

	/** Set opened state and triggers event. */
	protected setOpened(opened: boolean) {
		this.opened = opened
		this.emit('openedStateChange', opened)
	}

	/** Whether current popup component is not been used by another binding. */
	protected isPopupInControl(): boolean {
		if (!this.popup) {
			return false
		}

		let key = this.getOption('key')
		if (!key) {
			return true
		}

		return SharedPopupsInUse.get(this.popup) === this
	}

	/** Align popup component. */
	protected alignPopup() {
		let popup = this.popup!
		let alignToFn = this.getOption('alignTo')
		let alignTo = alignToFn ? alignToFn(this.el) : this.el

		align(popup.el, alignTo, this.getOption('alignPosition'), this.getAlignOptions())
	}

	/** Get align options. */
	protected getAlignOptions() {
		let triangle = this.popup!.refs.triangle

		return {
			margin: this.getOption('alignMargin'),
			canShrinkInY: true,
			triangle,
			fixTriangle: this.getOption('fixTriangle'), 
		} as AlignOptions
	}

	/** Make element of popup component get focus if possible. */
	protected mayGetFocus() {
		let trigger = this.getOption('trigger')
		if ((trigger !== 'hover' && trigger !== 'focus') && this.popup && this.popup.el.tabIndex >= 0) {
			this.popup.el.focus()
		}
	}

	/** Bind hiding popup component events. */
	protected bindLeaveEvents() {
		let trigger = this.getOption('trigger')
		if (trigger === 'hover') {
			// Should not use `MouseLeave.once`, because `hidePopupLater` may be canceled, it needs trigger again.
			this.unwatchLeave = MouseLeave.on([this.el, this.popup!.el], this.hidePopupLater.bind(this), {
				delay: this.getOption('hideDelay'),
				mouseIn: true,
			})
		}
		else if (trigger === 'click' || trigger === 'contextmenu') {
			on(document, 'mousedown', this.onDocMouseDown, this)
		}
		else if (trigger === 'focus') {
			on(this.el, 'blur', this.hidePopupLater, this)
		}
	}

	/** Unbind hiding popup component events. */
	protected unbindLeaveEvents() {
		let trigger = this.getOption('trigger')
		if (trigger === 'hover') {
			if (this.unwatchLeave) {
				this.unwatchLeave()
			}
		}
		else if (trigger === 'click' || trigger === 'contextmenu') {
			off(document, 'mousedown', this.onDocMouseDown, this)
		}
		else if (trigger === 'focus') {
			off(this.el, 'blur', this.hidePopupLater, this)
		}
	}

	/** Hide popup component. */
	protected hidePopup() {
		if (!this.opened) {
			return
		}

		this.unbindLeaveEvents()

		if (this.unwatchRect) {
			this.unwatchRect()
			this.unwatchRect = null
		}

		if (this.isPopupInControl()) {
			let key = this.getOption('key')
			let popupEl = this.popup!.el

			if (key) {
				SharedPopupsInUse.delete(this.popup!)
			}

			new Transition(popupEl, this.getOption('transition')).leave().then(finish => {
				if (finish) {
					popupEl.remove()
				}
			})
		}

		this.setOpened(false)
		this.popup = null
		this.popupTemplate = null
	}

	/** Trigger when mouse down on document. */
	protected onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (!this.el.contains(target) && (!this.popup || !this.popup.el.contains(target))) {
			this.hidePopupLater()
		}
	}

	/** After trigger element position changed. */
	protected onTriggerRectChanged() {
		if (isVisibleInViewport(this.el, 0.5, this.popup!.el)) {
			if (this.popup) {
				this.alignPopup()
			}
		}
		else {
			this.onNotInViewport()
		}
	}

	/** After trigger not in viewport. */
	protected onNotInViewport() {
		this.hidePopupLater()
	}

	remove() {
		off(this.el, 'mouseenter', this.showPopupLater, this)

		if (this.popup) {
			this.popup.el.remove()
		}
	}
}


/**
 * Bind trigger element with it's popup component,
 * and make popup component poped-up when interact with trigger element.
 * @param renderFn Should return a `<f-popup />` type template result.
 * @param options Popup options, `{trigger, alignTo, alignPosition, ...}`.
 */
export const popup = defineBinding('popup', PopupBinding) as (renderFn: RenderFn, options?: PopupOptions) => BindingResult