import {css, define, Component, html} from "flit"
import {theme} from "./theme"


@define('f-menu')
export class Menu extends Component {

	static style() {
		return css`
		:host{
			display: block;
		}

		.tooltip{
			padding: 6px 0;

			.menu-item-title{
				padding-left: 16px;
				padding-right: 16px;
			}

			.menu-item-right-icon{
				width: 16px;
				margin-left: 8px;
			}

			.menu-spliter{
				padding: 0 15px;
			}
		}
	`}

	static properties = ['selectable', 'dir-selectable']

	/** Can select bottom most item as current. */
	selectable: boolean = false

	/** Can select directory of items as current. */
	dirSelectable: boolean = false


	/** Relate with the `padding-left` of items */
	deep: number = 0

	/** If any direct items in it has icon */
	hasIcon: boolean = false

	current: MenuItem | null = null

	/** Called when child item or submenu selected. */
	setCurrent(item: MenuItem) {
		if (this.selectable) {
			if (this.current) {
				this.current.active = false
			}
			
			item.active = true
			this.current = item
		}
	}
}


@define('f-submenu')
export class SubMenu extends Component {

	static style() {
		return css`
		:host{
			display: block;
			overflow: hidden; // To play 'height' transition
		}
	`}

	opened: boolean = false

	deep: number = 1
	hasIcon: boolean = false
	closestMenu: Menu | SubMenu | null = null
	topMenu: Menu | null = null

	render() {
		return html`
		<template :show=${{when: this.opened, transition: 'height'}}>
			<slot></slot>
		</template>
	`}

	onCreated () {
		this.closestMenu = Component.get(this.el.parentElement!.closest('f-menu, f-submenu') as HTMLElement) as Menu | SubMenu
		if (!this.closestMenu) {
			throw new Error(`"<f-submenu>" must be contained in a "<f-menu>"`)
		}
		this.topMenu = this.closestMenu instanceof Menu ? this.closestMenu : this.closestMenu.topMenu
		this.deep = this.closestMenu.deep + 1

		if (this.el.previousElementSibling) {
			let menuItem = Component.get(this.el.previousElementSibling as HTMLElement)
			if (menuItem instanceof MenuItem) {
				menuItem.subMenu = this
			}
		}
	}
}


@define('f-menuitem')
export class MenuItem extends Component {

	static style() {
		let {lineHeight, mainColor} = theme

		return css`
		:host{
			display: block;
			position: relative;
			display: flex;
			cursor: pointer;
			padding-right: 10px;

			&:hover{
				color: ${mainColor};
				background: ${mainColor.alpha(0.05)};
			}

			&.open{
				color: ${mainColor};
			}

			&.active{
				color: ${mainColor};
				background: ${mainColor.alpha(0.1)};
			}
		}

		// If at least one item in menu has icon, but current one not,
		// still need an element to place.
		.icon-place{
			width: ${lineHeight}px;
			display: flex;

			f-icon{
				margin: auto;
			}
		}

		.right-arrow{
			margin-left: auto;
			margin-right: -4px;
		}

		.text{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	`}

	static properties = ['icon']

	icon: string = ''

	active: boolean = false
	closestMenu: Menu | SubMenu | null = null
	topMenu: Menu | null = null
	subMenu: SubMenu | null = null

	render() {
		return html`
		<template
			:class.active=${this.active}
			:style.padding-left.px=${this.closestMenu!.deep * 25}
			@@click=${this.onClick}
		>
		${
			this.closestMenu!.hasIcon ? html`
			<div class="icon-place">
				${this.icon ? html`<f-icon :type=${this.icon} />` : ''}
			</div>` : ''
		}
			<span class="text">
				<slot></slot>
			</span>
			${this.subMenu ? html`<f-icon class="right-arrow" :type=${this.subMenu.opened ? 'up' : 'down'} />` : ''}
		</template>
	`}

	onCreated () {
		this.closestMenu = Component.get(this.el.closest('f-menu, f-submenu') as HTMLElement) as Menu | SubMenu
		if (!this.closestMenu) {
			throw new Error(`"<f-menuitem>" must be contained in a "<f-menu>"`)
		}

		this.closestMenu.hasIcon = this.closestMenu.hasIcon || !!this.icon
		this.topMenu = this.closestMenu instanceof Menu ? this.closestMenu : this.closestMenu.topMenu

		if (this.active) {
			this.topMenu!.setCurrent(this)
		}
	}

	onClick () {
		let topMenu = this.topMenu!

		if (this.subMenu) {
			let noNeedToChangeOpen = topMenu.selectable && topMenu.dirSelectable && this.subMenu.opened && topMenu.current !== this
			if (!noNeedToChangeOpen) {
				this.subMenu.opened = !this.subMenu.opened
			}
		}

		if (topMenu.dirSelectable || !this.subMenu) {
			topMenu.setCurrent(this)
		}
	}
}


@define('f-menuspliter')
export class MenuSpliter extends Component {
	static style = css`
	:host{
		background-color: #eee;
		background-clip: content-box;
		height: 1px;
	}`
}

