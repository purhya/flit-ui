import {css, define, Component, html} from "flit"


@define('f-layer')
export class Layer extends Component {

	static style() {
		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1000;	//same with window, so if a layer trigger is in window, we must move layer to makesure the layer behind the window
			background: #fff;
			filter: drop-shadow(0 0 3px rgba(#000, 0.3));
			border-radius: 8px;
		}

		.trangle{
			position: absolute;
			border-left: 8px solid transparent;
			border-right: 8px solid transparent;
			border-bottom: 10px solid #fff;
			top: -10px;

			&-herizontal{
				border-top: 8px solid transparent;
				border-bottom: 8px solid transparent;
				border-right: 10px solid #fff;
				border-left: 0;
				top: auto;
				left: -10px;
			}
		}
		`
	}

	opened: boolean = false
	transition: string = 'fade'
	trangle: boolean = true
	herizontal: boolean = false

	render() {
		return html`
		<template class="layer" :show=${{when: this.opened, transition: this.transition}}>
			${this.trangle ? html`<div class="trangle" :ref="trangle" :class.trangle-herizontal=${this.herizontal}></div>` : ''}
			<slot></slot>
		</template>`
	}
}
