import {css, define, Component, html, appendTo} from 'flit'
import {theme} from './theme'
import {Popup} from './popup'


// It's the base class for all the layer which will align with another element.
@define('f-layer')
export class Layer extends Component {

	static style() {
		let {layerRadius} = theme

		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1000;	// Same with window, so if in window, we must move it behind the window
			background: #fff;
			filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.33));	// 3px nearly equals 6px in box-shadow.
			border-radius: ${layerRadius}px;
		}

		.trangle{
			position: absolute;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			border-bottom: 11px solid #fff;
			top: -11px;

			&-herizontal{
				border-top: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-right: 11px solid #fff;
				border-left: 0;
				top: auto;
				left: -11px;
			}
		}
	`}

	herizontal: boolean = false
	trangle: boolean = true
	
	/**
	 * The selector to get HTML element to append to or the HTML element.
	 * Note that don't specify this value to `document.body`, it may not prepared when class initialize. 
	 */
	appendTo: Element | string | null = 'body'

	// Although this property is not used to render, it can be used to get current opened state and can be captured by inner content.
	popup: Popup | null = null

	protected render() {
		return html`
		<template tabindex="0">
			${this.trangle ? html`<div class="trangle" :ref="trangle" :class.trangle-herizontal=${this.herizontal}></div>` : ''}
			<slot></slot>
		</template>`
	}
	
	// Call `update` every time after restored from `cache(...)`.
	protected onReady() {
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

		if (this.appendTo) {
			appendTo(this.el, this.appendTo)
		}
	}
}
