import {css, define, html, cache} from "flit"
import {Popup} from "./popup"
import {theme} from "./theme"


@define('f-dropdown')
export class Dropdown extends Popup {

	static style() {
		let {mainColor, lineHeight, fontSize} = theme

		return css`
		:host{
			display: inline-flex;
			vertical-align: top;
			position: relative;
			cursor: pointer;

			&:hover, &.opened{
				color: ${mainColor};
			}
		}

		.layer{
			padding: 5px 0;
			font-size: ${fontSize * 6 / 7}px;

			f-menuitem{
				padding: 0 ${lineHeight / 3}px;
			}
		}
	`}

	static properties = ['icon', ...Popup.properties]

	trigger: 'hover' | 'click' | 'focus' | 'contextmenu' = 'click'
	alignPosition: string = 'b'
	icon: string = 'down'

	render() {
		let layerPart = cache(this.opened ? (this.renderLayer()) : '', this.transition)
		
		return html`
		<template :class.opened="${this.opened}">
			<slot />
			${this.icon ? html`<f-icon :type="${this.icon}" />` : ''}
			${layerPart}
		</template>
	`}
}