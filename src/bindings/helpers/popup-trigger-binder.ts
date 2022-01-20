import {EventEmitter, MouseLeave} from "@pucelle/ff"
import {off, on} from "@pucelle/flit"


export type TiggerType = 'hover' | 'click' | 'focus' | 'contextmenu'

interface PopupTriggerEvents {
	'will-show': () => void
	'will-hide': () => void
	'cancel-show': () => void
	'hide': () => void
	'toggle-show-hide': () => void
}


export class PopupTriggerBinder extends EventEmitter<PopupTriggerEvents> {

	trigger: TiggerType = 'hover'

	private el: Element
	private popupEl: Element | null = null
	private unwatchLeave: null | (() => void) = null

	constructor(el: Element) {
		super()
		this.el = el	
	}

	setTrigger(trigger: TiggerType) {
		this.trigger = this.getMappedTrigger(trigger)
	}

	private getMappedTrigger(trigger: TiggerType): TiggerType {

		// If no mouse, uses click event instead.
		if (trigger === 'hover' && !this.havePointer()) {
			trigger = 'click'
		}

		return trigger
	}

	private havePointer() {
		return matchMedia('(pointer:fine)').matches
	}

	bindEnter() {
		if (this.trigger === 'click') {
			on(this.el, this.trigger, this.onClickEl, this)
		}
		else if (this.trigger === 'contextmenu') {
			on(this.el, this.trigger, this.onContextMenu, this)
		}
		else if (this.trigger === 'hover') {
			on(this.el, 'mouseenter', this.onMouseEnterOrFocusEl, this)
		}
		else if (this.trigger === 'focus') {
			on(this.el, 'focus', this.onMouseEnterOrFocusEl, this)

			if (this.el.contains(document.activeElement)) {
				this.emit('will-show')
			}
		}
	}

	unbindEnter() {
		if (this.trigger === 'click') {
			off(this.el, this.trigger, this.onClickEl, this)
		}
		else if (this.trigger === 'contextmenu') {
			off(this.el, this.trigger, this.onContextMenu, this)
		}
		else if (this.trigger === 'hover') {
			off(this.el, 'mouseenter', this.onMouseEnterOrFocusEl, this)
		}
		else if (this.trigger === 'focus') {
			off(this.el, 'focus', this.onMouseEnterOrFocusEl, this)
		}
	}

	private onClickEl(e: Event) {
		e.preventDefault()
		e.stopPropagation()
		this.togglePopupShowHide()
	}

	private onContextMenu(e: Event) {
		e.preventDefault()
		e.stopPropagation()
		this.togglePopupShowHide()
	}

	/** Toggle opened state and show or hide popup immediately. */
	private togglePopupShowHide() {
		this.emit('toggle-show-hide')
	}

	private onMouseEnterOrFocusEl(e: Event) {
		e.stopPropagation()
		this.emit('will-show')
	}

	/** Bind events to handle leaving trigger element before popup showing. */
	bindLeaveBeforeShow() {
		if (this.trigger === 'hover') {
			on(this.el, 'mouseleave', this.cancelShowingPopup, this)
		}
	}

	/** Unbind events to handle leaving trigger element before popup showing. */
	unBindLeaveBeforeShow() {
		if (this.trigger === 'hover') {
			off(this.el, 'mouseleave', this.cancelShowingPopup, this)
		}
	}

	private cancelShowingPopup() {
		this.emit('cancel-show')
	}

	/** Bind events to hiden popup events. */
	bindLeave(hideDelay: number, popupEl: Element) {
		this.popupEl = popupEl

		if (this.trigger === 'hover') {
			if (this.havePointer()) {

				// Should not use `MouseLeave.once`, because `hidePopupLater` may be canceled, it needs trigger again.
				this.unwatchLeave = MouseLeave.on(this.el, popupEl,
					() => {
						this.emit('hide')
					},
					{
						delay: hideDelay,
						mouseIn: true,
					}
				)
			}
			else {
				on(document, 'touchstart', this.onDocMouseDownOrTouch, this)
			}
		}
		else if (this.trigger === 'click' || this.trigger === 'contextmenu') {
			on(document, 'mousedown', this.onDocMouseDownOrTouch, this)
			MouseLeave.lock(this.el, this.popupEl)
		}
		else if (this.trigger === 'focus') {
			on(this.el, 'blur', this.hidePopupLater, this)
		}
	}

	/** Trigger when mouse down on document, and not inside `el` or popup. */
	private onDocMouseDownOrTouch(e: Event) {
		let target = e.target as Element

		if (!this.el.contains(target) && !this.popupEl?.contains(target)) {
			this.emit('will-hide')
		}
	}

	private hidePopupLater() {
		this.emit('will-hide')
	}

	/** Unbind events to hide popup. */
	unbindLeave() {
		if (this.trigger === 'hover') {
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
		else if (this.trigger === 'click' || this.trigger === 'contextmenu') {
			off(document, 'mousedown', this.onDocMouseDownOrTouch, this)
			MouseLeave.unlock(this.el, this.popupEl)
		}
		else if (this.trigger === 'focus') {
			off(this.el, 'blur', this.hidePopupLater, this)
		}
	}

}