import {css, define, Component, html} from "flit"
import {Popover} from "./popover"
import {theme} from "./theme"


// It's the base class for all the layer which will align with another element.
@define('f-layer-inner')
export class LayerInner extends Component {

	static style() {
		let {borderRadius} = theme

		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1000;	//Same with window, so if in window, we must move it behind the window
			background: #fff;
			filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
			border-radius: ${borderRadius * 2}px;
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
		`
	}

	herizontal: boolean = false
	opened: boolean = false
	transition: string = 'fade'
	trangle: boolean = true
	target: Popover | null = null

	render() {
		return html`
		<template :show=${{when: this.opened, transition: this.transition}}>
			${this.trangle ? html`<div class="trangle" :ref="trangle" :class.trangle-herizontal=${this.herizontal}></div>` : ''}
			<slot></slot>
		</template>`
	}

	onRendered() {
		if (this.opened) {
			this.target!.align(this.refs.trangle)
		}
	}
}
