import {css, define, Component, html, on, renderInContext, renderComplete, off} from "flit"
import {theme} from "./theme"
import {onceMouseLeaveAll, align, getPreviousElement, getNextElement} from "ff"
import {Transition} from "flit/out/lib/transition"
import {Popup} from "./popup"
import {Layer} from "./layer"


@define('f-menu')
export class Menu extends Component {

	static style() {
		return css`
		:host{
			display: block;
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
	
	topMenu!: Menu

	private selectedItem: MenuItem | null = null
	private hoverItem: MenuItem | null = null
	private openedSubMenus: SubMenu[] = []
	private unwatchSubMenusLeave: (() => void) | null = null

	render() {
		return html`
		<template
			tabindex="0"
			@focus=${this.onFocus}
			@blur=${this.onBlur}
		>
			<slot />
		</template>
	`}
	
	onCreated() {
		this.topMenu = this

		this.layerEl = this.el.closest('f-layer') as HTMLElement | null
		if (this.layerEl) {
			let layer = Component.get(this.layerEl) as Layer
			let popup = layer.popup as Popup

			this.watch(() => popup.opened, (opened) => {
				if (!opened) {
					this.hideAllSubMenuLayers()
				}
			})
		}
	}
	
	/** Called when child item or submenu selected. */
	setSelectedItem(menuItem: MenuItem) {
		if (this.selectable) {
			if (this.selectedItem) {
				this.selectedItem.selected = false
			}
			
			menuItem.selected = true
			this.selectedItem = menuItem
		}

		this.setHoverItem(menuItem)
	}

	setHoverItem(menuItem: MenuItem | null) {
		if (this.hoverItem) {
			this.hoverItem.hoverAt = false
		}
		
		this.hoverItem = menuItem

		if (menuItem) {
			menuItem.hoverAt = true

			if (document.activeElement !== this.el) {
				this.el.focus()
			}

			let siblingsMenuItems = ([...menuItem.el.parentElement!.children] as HTMLElement[]).filter(el => el.localName === 'f-menuitem').map(Component.get) as MenuItem[]
			siblingsMenuItems.forEach(item => {
				if (item !== menuItem && item.subMenu && item.subMenu.opened) {
					this.hideSubMenuLayer(item.subMenu)
				}
			})
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
		if (this.unwatchSubMenusLeave) {
			this.unwatchSubMenusLeave()
		}
		this.unwatchSubMenusLeave = onceMouseLeaveAll(openedLayerEls, this.hideAllSubMenuLayers.bind(this))
	}

	private hideAllSubMenuLayers() {
		for (let subMenu of this.openedSubMenus) {
			subMenu.hideLayer()
		}
		this.openedSubMenus = []
	}

	private hideSubMenuLayer(subMenu: SubMenu) {
		let index = this.openedSubMenus.findIndex(menu => menu === subMenu)
		if (index > -1) {
			for (let subMenu of this.openedSubMenus.slice(index)) {
				subMenu.hideLayer()
			}
			
			this.openedSubMenus = this.openedSubMenus.slice(0, index)
		}
	}
	
	onFocus() {
		// May have `hoverItem` from `mouseenter` event before got focus.
		if (!this.hoverItem) {
			this.hoverOneItem()
		}
		
		on(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	private onKeyDown(e: KeyboardEvent) {
		let hoverItem = this.hoverItem
		if (!hoverItem) {
			return
		}

		if (e.key === 'Enter') {
			e.preventDefault()
			
			if (this.layerEl && hoverItem.subMenu) {
				if (hoverItem.subMenu.opened) {
					hoverItem.subMenu.hideLayer()
				}
				else {
					hoverItem.subMenu.showInLayer()
				}
			}
			else if (hoverItem) {
				hoverItem.onClick()
				
				if (this.layerEl) {
					(Component.get(this.layerEl) as Layer).popup!.hideLayer()
				}
			}
		}
		else if (e.key === 'ArrowLeft') {
			e.preventDefault()

			if (this.layerEl && hoverItem.parentMenu && (hoverItem.parentMenu instanceof SubMenu) && hoverItem.parentMenu.parentMenu) {
				hoverItem.parentMenu.parentMenu.hoverOneItem()
			}
		}
		else if (e.key === 'ArrowRight') {
			e.preventDefault()

			if (this.layerEl && hoverItem.subMenu) {
				if (hoverItem.subMenu.opened) {
					hoverItem.subMenu.hoverOneItem()
				}
				else {
					hoverItem.subMenu.showInLayer()
				}
			}
		}
		else if (e.key === 'ArrowUp') {
			e.preventDefault()
			this.hoverPreviousItem()
		}
		else if (e.key === 'ArrowDown') {
			e.preventDefault()
			this.hoverNextItem()
		}
		else if (e.key === 'Escape') {
			e.preventDefault()

			if (this.layerEl) {
				(Component.get(this.layerEl) as Layer).popup!.hideLayer()
			}
		}
	}

	private hoverPreviousItem() {
		let prev: HTMLElement | null = this.hoverItem!.el
		do {
			prev = getPreviousElement(prev, this.el) as HTMLElement | null
		}
		while (prev && prev.localName !== 'f-menuitem')

		if (prev) {
			this.setHoverItem(Component.get(prev) as MenuItem)
		}
	}

	private hoverNextItem() {
		let next: HTMLElement | null = this.hoverItem!.el
		do {
			next = getNextElement(next, this.el) as HTMLElement | null
		}
		while (next && next.localName !== 'f-menuitem')

		if (next) {
			this.setHoverItem(Component.get(next) as MenuItem)
		}
	}

	hoverOneItem() {
		let menuItems = ([...this.el.children].filter(el => el.localName === 'f-menuitem') as HTMLElement[]).map(Component.get) as MenuItem[]

		let menuItem = menuItems.find(item => !!item.subMenu && item.subMenu.opened)

		if (!menuItem) {
			menuItem = menuItems.find(item => item.selected)
		}

		if (!menuItem) {
			menuItem = menuItems[0]
		}
		
		if (menuItem) {
			this.topMenu.setHoverItem(menuItem)
		}
	}

	onBlur() {
		this.setHoverItem(null)
		off(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
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

			&.hover{
				background: #eee;
			}

			&.selected{
				color: ${mainColor};
				background: ${mainColor.alpha(0.1)};

				&.hover{
					background: ${mainColor.alpha(0.15)};
				}
			}

			&.submenu-opened{
				color: ${mainColor};
				background: ${mainColor.alpha(0.05)};

				&.hover{
					background: ${mainColor.alpha(0.1)};
				}
			}
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

	selected: boolean = false
	hoverAt: boolean = false
	parentMenu!: Menu | SubMenu
	topMenu!: Menu
	subMenu!: SubMenu

	render() {
		let parentMenu = this.parentMenu
		let topMenu = this.topMenu
		let subMenu = this.subMenu
		
		let icon = parentMenu.itemsHasIcon ? html`
			<div class="icon-place">
				${this.icon ? html`<f-icon :type=${this.icon} />` : ''}
			</div>
		` : ''

		let rightIcon: any = ''
		if (subMenu) {
			let rightIconType = topMenu.layerEl
				? 'right' : subMenu.opened
				? 'up' : 'down'
			
			rightIcon = html`<f-icon class="right-arrow" :type=${rightIconType} />`
		}

		let iconSize = theme.lineHeight - 5

		return html`
			<template
				:class.selected=${this.selected}
				:class.hover=${this.hoverAt}
				:class.submenu-opened=${topMenu.layerEl && subMenu && subMenu.opened}
				:style.padding-left.px=${topMenu.layerEl ? '' : parentMenu.itemsHasIcon ? parentMenu.deep * iconSize + 5 : parentMenu.deep * iconSize}
				@click=${this.onClick}
				@mouseenter=${this.onMouseEnter}
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

		if (this.selected) {
			this.topMenu.setSelectedItem(this)
		}
	}

	onClick() {
		let topMenu = this.topMenu

		if (this.subMenu) {
			// Can select current item as an directory
			if (topMenu.selectable && topMenu.dirSelectable) {
				topMenu.setSelectedItem(this)
			}

			// Otherwise it been controlled by registered 'mouseenter' event.
			if (!topMenu.layerEl) {
				this.subMenu.opened = !this.subMenu.opened
			}
		}
		else {
			topMenu.setSelectedItem(this)
		}
	}

	onMouseEnter() {
		this.topMenu.setHoverItem(this)
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
	parentMenu!: Menu | SubMenu
	topMenu!: Menu
	layerEl: HTMLElement | null = null

	private menuItem: MenuItem | null = null

	render() {
		return html`
		<template
			:show=${{when: this.topMenu.layerEl ? true : this.opened, transition: this.topMenu.layerEl ? '' : 'height'}}
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

		if (this.topMenu.layerEl) {
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

	async showInLayer() {
		// If already opened, just hide included submenus.
		if (this.opened) {
			this.topMenu.onSubMenuOpened(this)
		}
		else {
			this.opened = true

			if (!this.layerEl) {
				this.layerEl = renderInContext(this, html`<f-layer class="layer" :trangle=${false} />`).firstElementChild as HTMLElement
				this.layerEl.append(this.el)
			}

			document.body.append(this.layerEl)
			this.topMenu.onSubMenuOpened(this)

			await renderComplete()
			align(this.layerEl, this.menuItem!.el, 'rt', {margin: [5, 0]})
			new Transition(this.layerEl, {name: 'fade'}).enter()
		}
	}

	hideLayer() {
		this.opened = false

		if (this.layerEl) {
			new Transition(this.layerEl!, {name: 'fade'}).leave().then((finish: boolean) => {
				if (finish) {
					this.layerEl!.remove()
				}
			})
		}
	}

	hoverOneItem() {
		Menu.prototype.hoverOneItem.call(this)
	}
}

