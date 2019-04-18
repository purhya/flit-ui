import {css, define, html, cache, on, off, Component} from "flit"
import {Popup} from "./popup"
import {theme} from "./theme"
import {Menu, MenuItem} from "./menu";


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

	onCreated() {
		super.onCreated()
		this.initFocus()
	}

	initFocus() {
		let focusEl = this.el.querySelector('button') || this.el
		if (focusEl === this.el) {
			this.el.setAttribute('tabindex', '0')
		}
		on(focusEl, 'focus', this.onFocus, this)
		on(focusEl, 'blur', this.onBlur, this)
	}

	onFocus() {
		on(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			// May cause button tigger additional click event if not prevent.
			e.preventDefault()
			this.toggleOpened()
		}
		else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			if (this.opened) {
				let menuEl = this.refs.layer.querySelector('f-menu') as HTMLElement | null
				if (menuEl) {
					let menuitems = [...menuEl.children].filter(el => el.localName === 'f-menuitem') as HTMLElement[]
					let menuitem = menuitems.length > 0 ? e.key === 'ArrowUp' ? menuitems[menuitems.length- 1] : menuitems[0] : null
					if (menuitem) {
						(Component.get(menuEl) as Menu).setHoverItem((Component.get(menuitem) as MenuItem))
					}
				}
			}
			else {
				this.showLayerLater()
			}
		}
		else if (e.key === 'Escape') {
			if (this.opened) {
				this.hideLayerLater()
			}
		}
	}

	onBlur() {
		off(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}
}