import {css, define, html, cache} from 'flit'
import {Popup} from './popup'
import {theme} from './theme'


@define('f-dropdown')
export class Dropdown extends Popup {

	static style() {
		let {lh, fs: fpx} = theme

		return css`
		${super.style()}
		.layer{
			padding: 5px 0;
			font-size: ${fpx(12)}px;

			f-menuitem{
				padding: 0 ${lh(10)}px;
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