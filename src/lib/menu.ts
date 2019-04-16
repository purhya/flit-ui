import {css, define, Component, html, on, renderInContext, renderComplete} from "flit"
import {theme} from "./theme"
import {onceMouseLeaveAll, align} from "ff";


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

	static properties = ['selectable', 'dirSelectable']

	/** Can select bottom most item as current. */
	selectable: boolean = false

	/** Can select directory of items as current. */
	dirSelectable: boolean = false


	/** Relate with the `padding-left` of items */
	deep: number = 0

	/** If any direct items in it has icon */
	hasIcon: boolean = false

	/** Assigned in `<dropdown>` */
	inLayer: boolean = false

	private current: MenuItem | null = null
	
	onCreated() {
		this.inLayer = !!this.el.closest('f-layer')
	}
	
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
			padding-left: 0 ${lineHeight / 3}px;

			&:hover{
				color: ${mainColor};
				background: ${mainColor.alpha(0.05)};
			}
		}

		.active{
			color: ${mainColor};
			background: ${mainColor.alpha(0.1)};
		}

		.submenu-opened{
			color: ${mainColor};
			background: ${mainColor.alpha(0.05)};
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
			margin-right: 4px;
		}

		.text{
			flex: 1;
			padding-right: ${lineHeight / 3}px;
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
		let icon = this.closestMenu!.hasIcon ? html`
			<div class="icon-place">
				${this.icon ? html`<f-icon :type=${this.icon} />` : ''}
			</div>
		` : ''

		let rightIcon: any = ''
		if (this.subMenu) {
			let rightIconType = this.topMenu!.inLayer
				? 'right' : this.subMenu.opened
				? 'up' : 'down'
			
			rightIcon = html`<f-icon class="right-arrow" :type=${rightIconType} />`
		}

		return html`
			<template
				:class.active=${this.active}
				:class.submenu-opened=${this.topMenu!.inLayer && this.subMenu && this.subMenu.opened}
				:style.padding-left.px=${this.topMenu!.inLayer ? '' : this.closestMenu!.deep * 25}
				@@click=${this.onClick}
			>
				${icon}
				<span class="text">
					<slot></slot>
				</span>
				${rightIcon}
			</template>
		`
	}

	onCreated() {
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

	private onClick() {
		let topMenu = this.topMenu!

		if (this.subMenu) {
			// Can select current item as an directory
			if (topMenu.selectable && topMenu.dirSelectable) {
				topMenu.setCurrent(this)
			}

			// Otherwise it been controlled by registered 'mouseenter' event.
			if (!topMenu.inLayer) {
				this.subMenu.opened = !this.subMenu.opened
			}
		}
		else {
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


@define('f-submenu')
export class SubMenu extends Component {

	static style() {
		let {fontSize, lineHeight} = theme

		return css`
		:host{
			display: block;
			overflow: hidden; // To play 'height' transition
		}
		
		f-menuitem{
			padding: 0 ${lineHeight / 5}px;
		}

		.layer{
			padding: 5px 0;
			font-size: ${fontSize * 6 / 7}px;
		}
	`}

	opened: boolean = false
	deep: number = 1
	hasIcon: boolean = false
	closestMenu: Menu | SubMenu | null = null
	topMenu: Menu | null = null

	private menuItem: MenuItem | null = null
	private unwatchLeave: (() => void) = () => {}

	render() {
		return html`
		<template :show=${{when: this.topMenu!.inLayer ? true : this.opened, transition: this.topMenu!.inLayer ? '' : 'height'}}>
			<slot></slot>
		</template>
	`}

	onCreated() {
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
				this.menuItem = menuItem
			}
		}

		if (this.topMenu!.inLayer) {
			this.initWhenInLayer()
		}
	}

	private initWhenInLayer() {
		this.el.remove()

		if (this.menuItem) {
			on(this.menuItem.el, 'mouseenter', this.showInLayer, this)
		}

		if (this.opened) {
			this.showInLayer()
		}
	}

	private async showInLayer() {
		this.opened = true

		let layerEl = this.refs.layer
		if (!layerEl) {
			layerEl = this.refs.layer = renderInContext(this, html`<f-layer class="layer" :trangle=${false} />`).firstElementChild as HTMLElement
			layerEl.append(this.el)
		}

		document.body.append(layerEl)

		await renderComplete()
		align(layerEl, this.menuItem!.el, 'rt', {margin: [5, 0]})

		this.unwatchLeave = onceMouseLeaveAll([this.menuItem!.el, this.el], this.hideLayer.bind(this))
	}

	private hideLayer() {
		this.refs.layer.remove()
		this.unwatchLeave()
	}
}

