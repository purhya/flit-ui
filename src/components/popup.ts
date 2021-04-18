import {css, define, Component, html} from '@pucelle/flit'
import {theme} from '../style/theme'
import {PopupBinding, PopupOptions} from '../bindings/popup'
import {appendTo} from '../utils/element'


/** `<f-popup>` is the container for popup content. */
@define('f-popup')
export class Popup<E = any> extends Component<E> {

	static style() {
		let {popupBorderRadius, popupBackgroundColor, popupShadowBlurRadius, popupShadowColor, adjust} = theme
		let w = adjust(10)
		let h = adjust(7)
		let x = adjust(11)

		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1000;	// Same with window, so if in window, we must move it behind the window
			background: ${popupBackgroundColor};
			border-radius: ${popupBorderRadius}px;
			filter: drop-shadow(0 0 ${popupShadowBlurRadius / 2}px ${popupShadowColor});	// 3px nearly equals 6px in box-shadow.
		}

		.triangle{
			// Must be the styles in top position
			position: absolute;
			border-left: ${w / 2}px solid transparent;
			border-right: ${w / 2}px solid transparent;
			border-bottom: ${h}px solid ${popupBackgroundColor};
			top: -${h}px;
			left: ${x}px;	// 11 + 5 = 16

			&-herizontal{
				border-top: ${w / 2}px solid transparent;
				border-bottom: ${w / 2}px solid transparent;
				border-right: ${h}px solid ${popupBackgroundColor};
				border-left: 0;
				top: ${x}px;
				left: -${h}px;
			}
		}
		`
	}

	readonly refs!: {

		/** Triangle element, may be `undefined`. */
		triangle: HTMLElement
	}

	/** 
	 * Options to overwrite default popup binding to control default alignment.
	 * Will be overwritten by options passed to `popup(...)`.
	 */
	readonly defaultPopupOptions: PopupOptions | null = null

	protected binding: PopupBinding | null = null

	/** Show triangle element in herizontal order - left or right position. */
	herizontal: boolean = false

	/** Whether shows triangle element. */
	triangle: boolean = true
	
	/** Where to append current popup. */
	appendTo: Element | string | null = 'body'

	protected render() {
		return html`
			<template tabindex="0">
				${this.triangle ? html`
					<div class="triangle" :ref="triangle" :class.triangle-herizontal=${this.herizontal} />
				` : ''}
				<slot />
			</template>
		`
	}
	
	// Call `update` every time after restored from `cache(...)`.
	protected onConnected() {
		// Why render `<popup>` to body?
		// It's very common that the `el` is covered or clipped,
		// which will cause the `<popup>` is not fully visible.
		// You can still render the `<popup>` in the same scroller with `<popup>`.

		// Why inserted into body every time?
		// Most popups share same `z-index`, append newly opened `<popup>` will makesure it covers others.

		// Note that:
		// The template `content` can't pass into `<popup>` as an argument,
		// it will cause the template was parsed in `<popup>` context.

		// The `<popup>` will be cached in `<popup>`, and element will be removed when not in use.
		// After restored from `cache`, it will be inserted back into `<popup>`.
		// So here we need to move it to `body` after every time rendered.

		// If there are serval nodes which belong to an template you need to append into another element,
		// Don't forget to move the anchor nodes, or the whole template nodes into the target element,
		// or they will can't be removed because they are outside of the template node ranges.

		// In the future, we may implement a flit directive `renderTo(..., ...)`, 
		// to render elements and it's anchor node to another element.

		this.applyAppendTo()
	}
	
	/** Insert popup element into target specified by `appendTo`. */
	applyAppendTo() {
		if (this.appendTo) {
			appendTo(this.el, this.appendTo)
		}
	}

	/** Set related popup binding. */
	setBinding(binding: PopupBinding) {
		this.binding = binding
	}

	/** Close popup content, may play leave transition. */
	close() {
		if (this.binding) {
			this.binding.hidePopupLater()
		}
		else {
			this.el.remove()
		}
	}

	/** Get the trigger element. */
	getTriggerElement() {
		return this.binding?.getTriggerElement() || null
	}
}
