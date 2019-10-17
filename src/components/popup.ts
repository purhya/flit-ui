import {css, define, Component, html, appendTo} from '@pucelle/flit'
import {theme} from '../style/theme'


/**It's the base class for all the layer which will align with another element. */
@define('f-popup')
export class Popup<E = any> extends Component<E> {

	static style() {
		let {layerBorderRadius, layerBackgroundColor, layerShadowBlurRadius, layerShadowColor} = theme

		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1000;	// Same with window, so if in window, we must move it behind the window
			background: ${layerBackgroundColor};
			border-radius: ${layerBorderRadius}px;
			filter: drop-shadow(0 1px ${layerShadowBlurRadius / 2}px ${layerShadowColor});	// 3px nearly equals 6px in box-shadow.
		}

		.trangle{
			position: absolute;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			border-bottom: 11px solid ${layerBackgroundColor};
			top: -11px;

			&-herizontal{
				border-top: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-right: 11px solid ${layerBackgroundColor};
				border-left: 0;
				top: auto;
				left: -11px;
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

	protected render() {
		return html`
			${this.trangle ? html`
				<div class="trangle" :ref="trangle" :class.trangle-herizontal=${this.herizontal} />
			` : ''}
			<slot />
		`
	}
	
	// Call `update` every time after restored from `cache(...)`.
	protected onConnected() {
		// Why render `<layer>` to body?
		// It's very common that the `el` is covered or clipped,
		// which will cause the `<layer>` is not fully visible.
		// You can still render the `<layer>` in the same scroller with `<popup>`.

		// Why inserted into body every time?
		// Most layers share same `z-index`, append newly opened `<layer>` will makesure it covers others.

		// Note that:
		// The template `content` can't pass into `<layer>` as an argument,
		// it will cause the template was parsed in `<layer>` context.

		// The `<layer>` will be cached in `<popup>`, and element will be removed when not in use.
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
}
