import {css, define, Component, html, appendTo} from '@pucelle/flit'
import {theme} from '../style/theme'
import {PopupBinding, PopupOptions} from '../bindings/popup'


/**It's the base class for all the popup which will align with another element. */
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

		.trangle{
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

	herizontal: boolean = false
	trangle: boolean = true
	
	/**
	 * The selector to get HTML element to append to or the HTML element.
	 * Note that don't specify this value to `document.body`, it may not prepared when class initialize. 
	 */
	appendTo: Element | string | null = 'body'

	/** 
	 * Used for sub classes to specify default popup options,
	 * Such that no need to specify them each time in the `popup()`.
	 * Will be overwrite by options in `popup()`.
	 */
	defaultPopupOptions: PopupOptions | null = null

	protected binding: PopupBinding | null = null

	protected render() {
		return html`
		<template tabindex="0">
			${this.trangle ? html`
				<div class="trangle" :ref="trangle" :class.trangle-herizontal=${this.herizontal} />
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
	
	applyAppendTo() {
		if (this.appendTo) {
			appendTo(this.el, this.appendTo)
		}
	}

	setPopupBinding(binding: PopupBinding) {
		this.binding = binding
	}

	close() {
		if (this.binding) {
			this.binding.hidePopupLater()
		}
		else {
			this.el.remove()
		}
	}
}
