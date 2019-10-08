import {css, define, html, cache} from 'flit'
import {Popup} from './popup'
import {theme} from '../style/theme'


@define('f-dropdown')
export class Dropdown<Events = any> extends Popup<Events> {

	static style() {
		let {lh, fs} = theme

		return css`
		${super.style()}

		:host{
			display: inline-flex;
		}

		.layer{
			padding: 5px 0;
			font-size: ${fs(12)}px;

			f-menuitem{
				padding: 0 ${lh(7)}px;
			}
		}

		.list{
			overflow-y: auto;
			max-height: 100%;
		}
		`
	}

	static properties = ['icon', ...Popup.properties]

	trigger: 'hover' | 'click' | 'focus' | 'contextmenu' = 'click'
	alignPosition: string = 'b'
	icon: string = 'down'

	protected render() {
		let layerPart = cache(this.opened ? (this.renderLayer()) : '', this.transition)
		
		return html`
		<template :class.opened="${this.opened}">
			<slot />
			${this.icon ? html`<f-icon .type="${this.icon}" />` : ''}
			${layerPart}
		</template>
		`
	}

	protected renderLayer() {
		return html`
		<f-layer
			class="layer"
			:ref="layer"
			.popup=${this}
			.herizontal=${this.isHerizontal()}
			.trangle=${this.trangle}
		>
			<div class="list">
				<slot name="content" />
			</div>
		</f-layer>
		`
	}
}