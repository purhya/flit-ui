import {css, define, Component, html, on, renderInContext, renderComplete} from "flit"
import {theme} from "./theme"
import {onceMouseLeaveAll, align} from "ff";
import {Transition} from "flit/out/lib/transition"
import {Layer} from "./popup"


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
	itemsHasIcon: boolean = false

	/** Assigned in `<dropdown>` */
	layerEl: HTMLElement | null = null

	private current: MenuItem | null = null
	private openedSubMenus: SubMenu[] = []
	private unwatchSubMenusLeave: (() => void) = () => {}
	
	onCreated() {
		this.layerEl = this.el.closest('f-layer') as HTMLElement | null
		if (this.layerEl) {
			let layer = Component.get(this.layerEl) as Layer
			let popup = layer.popup!
			popup.watch('opened', (opened) => {
				if (!opened) {
					this.hideAllSubMenuLayers()
				}
			})
		}
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

	onSubMenuOpened(submenu: SubMenu) {
		let oldOpenedSubMenus = this.openedSubMenus
		let newOpenedSubMenus = this.openedSubMenus = [submenu]
		let parentSubMenu = submenu.parentMenu

		while (parentSubMenu && (parentSubMenu instanceof SubMenu)) {
			newOpenedSubMenus.unshift(parentSubMenu)
			parentSubMenu = parentSubMenu.parentMenu
		}

		for (let oldSubMenu of oldOpenedSubMenus) {
			if (!newOpenedSubMenus.includes(oldSubMenu)) {
				oldSubMenu.hideLayer()
			}
		}

		let openedLayerEls = [this.layerEl!, ...newOpenedSubMenus.map(subMenu => subMenu.layerEl!)]
		this.unwatchSubMenusLeave()
		this.unwatchSubMenusLeave = onceMouseLeaveAll(openedLayerEls, this.hideAllSubMenuLayers.bind(this))
	}

	private hideAllSubMenuLayers() {
		for (let subMenu of this.openedSubMenus) {
			subMenu.hideLayer()
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
			padding: 0 ${lineHeight / 3}px;

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
			display: flex;
			width: ${lineHeight}px;
			margin-right: -${lineHeight / 3}px;

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
			padding: 0 ${lineHeight / 3}px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	`}

	static properties = ['icon']

	icon: string = ''

	active: boolean = false
	parentMenu: Menu | SubMenu | null = null
	topMenu: Menu | null = null
	subMenu: SubMenu | null = null

	render() {
		let parentMenu = this.parentMenu!
		let topMenu = this.topMenu!
		let subMenu = this.subMenu
		
		let icon = parentMenu.itemsHasIcon ? html`
			<div class="icon-place">
				${this.icon ? html`<f-icon :type=${this.icon} />` : ''}
			</div>
		` : ''

		let rightIcon: any = ''
		if (subMenu) {
			let rightIconType = topMenu!.layerEl
				? 'right' : subMenu.opened
				? 'up' : 'down'
			
			rightIcon = html`<f-icon class="right-arrow" :type=${rightIconType} />`
		}

		return html`
			<template
				:class.active=${this.active}
				:class.submenu-opened=${topMenu!.layerEl && subMenu && subMenu.opened}
				:style.padding-left.px=${topMenu!.layerEl ? '' : parentMenu.itemsHasIcon ? parentMenu.deep * 25 + 5 : parentMenu.deep * 25}
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
		this.parentMenu = Component.get(this.el.closest('f-menu, f-submenu') as HTMLElement) as Menu | SubMenu
		if (!this.parentMenu) {
			throw new Error(`"<f-menuitem>" must be contained in a "<f-menu>"`)
		}

		this.parentMenu.itemsHasIcon = this.parentMenu.itemsHasIcon || !!this.icon
		this.topMenu = this.parentMenu instanceof Menu ? this.parentMenu : this.parentMenu.topMenu

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
			if (!topMenu.layerEl) {
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
		let {fontSize} = theme

		return css`
		:host{
			display: block;
			overflow: hidden; // To play 'height' transition
		}
		
		.layer{
			padding: 5px 0;
			font-size: ${fontSize * 6 / 7}px;
		}
	`}

	opened: boolean = false
	deep: number = 1
	itemsHasIcon: boolean = false
	parentMenu: Menu | SubMenu | null = null
	topMenu: Menu | null = null
	layerEl: HTMLElement | null = null

	private menuItem: MenuItem | null = null

	render() {
		return html`
		<template
			:show=${{when: this.topMenu!.layerEl ? true : this.opened, transition: this.topMenu!.layerEl ? '' : 'height'}}
			:class.has-icon="${this.itemsHasIcon}"
		>
			<slot></slot>
		</template>
	`}

	onCreated() {
		this.parentMenu = Component.get(this.el.parentElement!.closest('f-menu, f-submenu') as HTMLElement) as Menu | SubMenu
		if (!this.parentMenu) {
			throw new Error(`"<f-submenu>" must be contained in a "<f-menu>"`)
		}
		this.topMenu = this.parentMenu instanceof Menu ? this.parentMenu : this.parentMenu.topMenu
		this.deep = this.parentMenu.deep + 1

		if (this.el.previousElementSibling) {
			let menuItem = Component.get(this.el.previousElementSibling as HTMLElement)
			if (menuItem instanceof MenuItem) {
				menuItem.subMenu = this
				this.menuItem = menuItem
			}
		}

		if (this.topMenu!.layerEl) {
			this.initWhenInLayer()
		}
	}

	private initWhenInLayer() {
		this.el.remove()

		if (this.menuItem) {
			on(this.menuItem.el, 'mouseenter', this.showInLayer, this)
		}

		if (this.opened) {
			this.opened = false
			this.showInLayer()
		}
	}

	private async showInLayer() {
		// If already opened, just hide included submenus.
		if (this.opened) {
			this.topMenu!.onSubMenuOpened(this)
		}
		else {
			this.opened = true

			if (!this.layerEl) {
				this.layerEl = renderInContext(this, html`<f-layer class="layer" :trangle=${false} />`).firstElementChild as HTMLElement
				this.layerEl.append(this.el)
			}

			document.body.append(this.layerEl)
			this.topMenu!.onSubMenuOpened(this)

			await renderComplete()
			align(this.layerEl, this.menuItem!.el, 'rt', {margin: [5, 0]})
			new Transition(this.layerEl, {name: 'fade'}).enter()
		}
	}

	hideLayer() {
		this.opened = false

		new Transition(this.layerEl!, {name: 'fade'}).leave().then((finish: boolean) => {
			if (finish) {
				this.layerEl!.remove()
			}
		})
	}
}

