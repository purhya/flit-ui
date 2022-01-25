import {off, defineBinding, Binding, BindingResult, TemplateResult, TransitionOptions, Context, Transition, Template, UpdatableOptions, html, onRenderComplete, render, getRenderedAsComponent, enqueueUpdatableInOrder, QueueUpdateOrder} from '@pucelle/flit'
import {watchLayout, isVisibleInViewport, AlignPosition, EventEmitter, AlignOptions, Aligner} from '@pucelle/ff'
import {Popup} from '../components/popup'
import {RenderFn} from '../types'
import {SharedPopups} from './helpers/shared-popups'
import {PopupState} from './helpers/popup-state'
import {PopupTriggerBinder, TiggerType} from './helpers/popup-trigger-binder'


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
	readonly trigger?: TiggerType

	/** Element to align to, use current element if not specified. */
	alignTo?: (trigger: Element) => Element

	/** Where the popup align, reference to `align`. */
	alignPosition?: AlignPosition

	/** Popup align margin, reference to `align`. Default value is `4`. */
	alignMargin?: number | number[]

	/** 
	 * Whether can shrink height in y direction when there is not enough space.
	 * Default value is `false`.
	 */
	canShrinkInY?: boolean

	/** 
	 * Whether stick to viewport edges where there is not enough space.
	 * Default value is `true`.
	 */
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

	/**
	 * Whether should show triangle.
	 * Default value is `true`.
	 */
	triangle?: boolean

	/** 
	 * Whether should align triangle in a fixed relative position.
	 * Default value is `false`,
	 * triangle element will be adjusted to be in the center of the intersect part of align element and target.
	 */
	fixTriangle?: boolean

	/** Transition options to play transition when popup hiding and showing. */
	transition?: TransitionOptions

	/** 
	 * If specified as `true`, will show popup immediately.
	 * Only works when initializing.
	 * Default value is `false`.
	 */
	showImmediately?: boolean

	/** 
	 * If specified as `true`, popup element will get focus after poped-up if it can get focus.
	 * Default value is `false`.
	 */
	autoFocus?: boolean

	/** 
	 * Whether the popup is pointerable and can interact with mouse.
	 * Default value is `true`.
	 */
	pointerable?: boolean

	/** 
	 * Whether caches the popup component after it hides.
	 * Default value is `false`.
	 */
	cacheable?: boolean

	/** 
	 * If specified as `true`, will keep the popup visible once popup opened,
	 * until this value becomes `false`, or hide popup manually.
	 * Default value is `false`.
	 */
	keepVisible?: boolean
}

interface PopupBindingEvents {
	
	/** Triggers when `opened` state of popup-binding changed. */
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
	protected readonly state: PopupState
	protected readonly binder: PopupTriggerBinder
	protected readonly options: UpdatableOptions<PopupOptions>

	protected renderFn!: RenderFn

	/** Used to watch rect change after popup opened. */
	protected unwatchRect: (() => void) | null = null

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

	/** Whether stops the popup hidden. */
	protected keptToBeVisible: boolean = false

	constructor(el: Element, context: Context) {
		super()

		this.el = el as HTMLElement
		this.context = context
		this.binder = new PopupTriggerBinder(this.el)
		this.state = new PopupState()

		// Not it does't assign default values to it.
		this.options = new UpdatableOptions({})

		this.initPopupEvents()
	}

	protected initPopupEvents() {
		this.binder.on('will-show', this.showPopupLater, this)
		this.binder.on('will-hide', this.onHideFomBinder, this)
		this.binder.on('cancel-show', this.cancelShowingFromBinder, this)
		this.binder.on('hide', this.onHideFomBinder, this)
		this.binder.on('toggle-show-hide', this.togglePopupShowHide, this)

		this.state.on('do-show', this.doShowingPopup, this)
		this.state.on('do-hide', this.doHidingPopup, this)
	}

	protected onWillHideFomBinder() {
		if (this.shouldKeepVisible()) {
			this.keptToBeVisible = true
			return
		}

		this.hidePopupLater()
	}

	protected onHideFomBinder() {
		if (this.shouldKeepVisible()) {
			this.keptToBeVisible = true
			return
		}

		this.hidePopup()
	}

	/** 
	 * Although we call it `cancal showing`,
	 * May still be in opened state right now.
	 */
	protected cancelShowingFromBinder() {
		if (this.state.opened) {
			this.hidePopup()
		}
		else {
			this.state.willNotShow()
		}
	}

	/** Whether the tooltip should keep to be visible. */
	protected shouldKeepVisible(): boolean {
		return this.options.get('keepVisible')
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
			this.binder.setTrigger(this.getOption('trigger'))
			this.bindEnterEvents()
		}
		else if (this.state.opened) {
			enqueueUpdatableInOrder(this, this.context, QueueUpdateOrder.Directive)
		}

		if (this.keptToBeVisible && !this.options.get('keepVisible')) {
			this.hidePopupLater()
		}
	}

	protected bindEnterEvents() {
		this.binder.bindEnter()

		if (this.getOption('showImmediately')) {
			this.showPopupLater()
		}
	}

	protected unbindEnterEvents() {
		this.binder.unbindEnter()
	}

	/** Toggle opened state and show or hide popup component immediately. */
	protected togglePopupShowHide() {
		if (this.state.opened) {
			this.state.hide()
		}
		else {
			this.state.show()
		}
	}

	/** Show popup component after a short time out. */
	showPopupLater() {
		let showDelay = this.getOption('showDelay')
		let key = this.getOption('key')

		// If can reuse exist, show without delay.
		if (SharedPopups.isKeyInUse(key)) {
			showDelay = 0
		}

		// If give a delay for `click` type trigger, it will feel like a stuck or slow responsive.
		if (this.binder.trigger === 'click' || this.binder.trigger === 'focus') {
			showDelay = 0
		}

		let willShow = this.state.willShow(showDelay)
		if (willShow) {
			this.binder.bindLeaveBeforeShow()
		}
	}

	/** Show popup component, can be called repeatedly. */
	showPopup() {
		this.state.show()
	}

	/** Truly show popup when required. */
	protected doShowingPopup() {
		enqueueUpdatableInOrder(this, this.context, QueueUpdateOrder.Directive)
		this.emit('openedStateChange', true)
	}
	
	__updateImmediately() {
		if (!this.state.opened) {
			return
		}

		if (this.popup) {
			this.updatePopup()
		}
		else {
			this.renderPopup()
		}
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

	/** Render the popup component. */
	protected renderPopup() {
		let isOldExist = this.ensurePopup()
		let popupEl = this.popup!.el

		popupEl.style.pointerEvents = this.getOption('pointerable') ? '' : 'none'
		popupEl.style.visibility = 'hidden'
		
		this.binder.bindLeave(this.getOption('hideDelay'), this.popup!.el)

		onRenderComplete(() => {
			this.afterPopupRendered(isOldExist)
		})
	}

	/** Align and play transition after popup rendered. */
	protected afterPopupRendered(isOldExist: boolean) {
		// May do something in the handlers of `openedStateChange` event and make it closed.
		if (!this.state.opened || !this.popup) {
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
		if (!isOldExist) {
			new Transition(this.popup.el, this.getOption('transition')).enter()
		}

		// Watch it's rect changing.
		this.unwatchRect = watchLayout(this.el, 'rect', this.onTriggerRectChanged.bind(this))
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

	/** 
	 * Get a cached popup component, or create a new one.
	 * Returns whether old popup in same key is existing.
	 */
	protected ensurePopup(): boolean {

		// Here no need to watch the renderFn, it will be watched from the outer component.
		let result = this.renderFn()

		let key = this.getOption('key')
		let popup: Popup | null = null
		let template: Template | null = null
		let cache = key ? SharedPopups.findCache(key, this.el) : null

		// Make sure the render result is a template result.
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
		if (!popup && cache) {
			if (cache.template.canPatchBy(result)) {
				popup = cache.popup
				template = cache.template
				template.patch(result)
			}
		}
		
		// Create new popup.
		if (!popup || !template) {
			template = render(result, this.context)
			popup = getRenderedAsComponent(template) as Popup
		}

		// Cleans old popups, and cut it's relationship with other popup-binding.
		if (key && cache) {
			SharedPopups.cleanPopupControls(key, cache, popup, this)
		}

		// Add as cache.
		if (key) {
			SharedPopups.addCache(key, {popup, template})
			SharedPopups.setPopupUser(popup, this)
		}

		this.popup = popup
		this.popupTemplate = template

		popup.setBinding(this)
		popup.applyAppendTo()

		let isOldExist = !!cache?.popup
		return isOldExist
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
		let trigger = this.binder.trigger
		if (this.getOption('autoFocus') && (trigger !== 'hover' && trigger !== 'focus') && this.popup && this.popup.el.tabIndex >= 0) {
			this.popup.el.focus()
		}
	}

	/** Hide popup component after a short time out. */
	hidePopupLater() {
		let hideDelay = this.getOption('hideDelay')
		this.state.willHide(hideDelay)
	}

	/** Hide popup component, can be called repeatedly. */
	hidePopup() {
		this.state.hide()
	}

	/** Truly Hide popup when required. */
	protected doHidingPopup() {
		let popup = this.popup!
		let popupEl = popup.el

		this.clean()

		new Transition(popupEl, this.getOption('transition')).leave().then(finish => {
			if (finish) {
				popupEl.remove()
			}
		})

		this.emit('openedStateChange', false)
	}

	/** Returns whether the popup-binding can lose control of popup. */
	__canLoseControl() {
		return !this.keptToBeVisible
	}

	/** Rlease control with it's popup component after another popup-binding take it. */
	__losePopupControl() {
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

		this.binder.unbindLeave()

		if (this.unwatchRect) {
			this.unwatchRect()
			this.unwatchRect = null
		}

		this.state.clean()
		this.popup = null
		this.popupTemplate = null
		this.aligner = null
	}
	
	remove() {
		off(this.el, 'mouseenter', this.showPopupLater, this)

		if (this.state.opened) {
			this.hidePopup()
		}
		else {
			this.clean()
		}

		this.unbindEnterEvents()
	}
}


/**
 * Bind trigger element with it's popup component,
 * and make popup component poped-up when interact with trigger element.
 * @param renderFn Should return a `<f-popup />` type template result.
 * @param options Popup options, `{trigger, alignTo, alignPosition, ...}`.
 */
export const popup = defineBinding('popup', PopupBinding) as (renderFn: RenderFn, options?: PopupOptions) => BindingResult