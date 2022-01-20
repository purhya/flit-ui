import {EventEmitter, Timeout} from '@pucelle/ff'


interface PopupStateEvents {
	'do-show': () => void
	'do-hide': () => void
}


/** 
 * Manages popup state for a popup-binding.
 * Popup state is very complex, so have a class for it.
 */
export class PopupState extends EventEmitter<PopupStateEvents> {

	/** Be `true` after opened popup. */
	opened: boolean = false

	/** When decided to open popup. */
	private willShowSoon: boolean = false

	/** When decided to hide popup. */
	private willHideSoon: boolean = false

	/** Be a `Timeout` after decided to open popup but not yet. */
	private showTimeout: Timeout | null = null

	/** Be a `Timeout` after decided to close popup but not yet. */
	private hideTimeout: Timeout | null = null

	/** 
	 * Send a request to show popup after a few millseconds delay.
	 * Returns whether the request is the first show request.
	 */
	willShow(showDelay: number): boolean {
		if (this.willShowSoon) {
			return false
		}

		if (showDelay > 0) {
			this.showTimeout = new Timeout(() => {
				this.showTimeout = null
				this.show()
			}, showDelay)

			this.willShowSoon = true
		}
		else {
			this.show()
		}

		return true
	}

	/** Cancel `will show`. */
	willNotShow() {
		this.showTimeout?.cancel()
		this.willShowSoon = false
	}

	/** 
	 * Send a request to hide popup after a few millseconds delay.
	 * Returns whether the request is the first request.
	 */
	willHide(hideDelay: number): boolean {
		if (this.willHideSoon) {
			return false
		}

		if (hideDelay > 0) {
			this.hideTimeout = new Timeout(() => {
				this.hide()
			}, hideDelay)

			this.willHideSoon = true
		}
		else {
			this.hide()
		}

		return true
	}

	/** Cancel `will hide`. */
	willNotHide() {
		this.hideTimeout?.cancel()
		this.hideTimeout = null
		this.willHideSoon = false
	}

	/** 
	 * Send a request to show immediately.
	 * Returns whether the request is the first request.
	 */
	show() {
		this.willNotShow()
		this.willNotHide()

		if (!this.opened) {
			this.opened = true
			this.emit('do-show')
			return true
		}

		return false
	}

	/** 
	 * Send a request to hide immediately.
	 * Returns whether the request is the first request.
	 */
	hide() {
		this.willNotShow()
		this.willNotHide()

		if (this.opened) {
			this.opened = false
			this.emit('do-hide')
			return true
		}

		return false
	}

	/** Clean and restore to start state. */
	clean() {
		this.willNotShow()
		this.willNotHide()
		this.opened = false
	}
}