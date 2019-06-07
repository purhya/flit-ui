import {Component, css, define, html, repeat, renderComplete, on, getComponent, off} from 'flit'
import {scrollToView, getPreviousVisibleElement, getNextVisibleElement} from 'ff'
import {theme} from './theme'


interface TreeDataItem {
	icon: string
	text: string
	path: string
	children: Promise<TreeDataItem[]> | TreeDataItem[]
}

interface TreeEvents {
	select: (item: TreeItem) => void
}


@define('f-tree')
export class Tree<Events = any> extends Component<Events & TreeEvents> {

	static style() {
		return css`
		:host{
			display: block;
			position: relative;
			
		}

		.scrollable{
			overflow: auto;

			// As a scroll inne because items in tree are always wide.
			.inner{
				position: absolute;
				left: 0;
				top: 0;
				min-width: 100%;
			}
		}
	`}

	static properties = ['scrollable']

	data: TreeDataItem | null = null
	children: TreeDataItem[] | null = null
	currentPath: string = ''
	scrollable: boolean = false

	protected loading: boolean = false
	protected selectedItem: TreeItem | null = null
	protected itemMap: {[key: string]: TreeItem} = {}
	protected root!: Tree
	protected parent: null = null
	protected deep: number = 0
	protected hasChildren: boolean = false
	protected hoverItem: TreeItem | null = null
	itemsHasIcon: boolean = false

	protected render() {
		let innerPart = this.data ? repeat(this.children, (item) => html`
			<f-treeitem
				:root=${this}
				:data=${item}
				:deep=${this.deep}
			/>`)
			: html`<slot />`

		return html`
		<template
			tabindex="0"
			:class.scrollable=${this.scrollable}
			@focus=${this.onFocus}
			@blur=${this.onBlur}
		>
			<div class="inner" :ref="inner">
				${innerPart}
			</div>
		</template>
	`}

	protected async onCreated() {
		this.root = this

		if (this.data) {
			if (this.data.children instanceof Promise) {
				this.loading = true
				this.children = await this.data.children
				this.loading = false
			}
			else {
				this.children = this.data.children
			}

			this.currentPath = this.data.path
		}
		else {
			this.hasChildren = this.el.children.length > 0
		}
	}

	register(item: TreeItem) {
		this.itemMap[item.path] = item
	}

	selectItem(item: TreeItem) {
		if (this.selectedItem !== item) {
			if (this.selectedItem) {
				this.selectedItem.deselect()
			}

			item.selected = true
			this.selectedItem = item
			this.currentPath = item.path
			this.setHoverItem(item)
			this.emit('select', item)
		}
	}

	setHoverItem(item: TreeItem | null) {
		if (this.hoverItem) {
			this.hoverItem.hoverAt = false
		}
		
		this.hoverItem = item

		if (item) {
			item.hoverAt = true
		}
	}

	protected onFocus() {
		if (!this.hoverItem) {
			this.hoverOneItem()
		}
		
		on(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	protected onKeyDown(e: KeyboardEvent) {
		let hoverItem = this.hoverItem
		if (!hoverItem) {
			if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
				e.preventDefault()
				this.hoverOneItem()
			}
			return
		}

		if (e.key === 'Enter') {
			e.preventDefault()
			hoverItem.click()
		}
		else if (e.key === 'ArrowUp') {
			e.preventDefault()
			this.hoverPreviousItem()
		}
		else if (e.key === 'ArrowDown') {
			e.preventDefault()
			this.hoverNextItem()
		}
	}

	protected hoverPreviousItem() {
		let prev: HTMLElement | null = this.hoverItem!.el
		do {
			prev = getPreviousVisibleElement(prev, this.el) as HTMLElement | null
		}
		while (prev && !(getComponent(prev) instanceof TreeItem))

		if (prev) {
			this.setHoverItem(getComponent(prev) as TreeItem)
		}
	}

	protected hoverNextItem() {
		let next: HTMLElement | null = this.hoverItem!.el
		do {
			next = getNextVisibleElement(next, this.el) as HTMLElement | null
		}
		while (next && !(getComponent(next) instanceof TreeItem))

		if (next) {
			this.setHoverItem(getComponent(next) as TreeItem)
		}
	}

	hoverOneItem() {
		let items = ([...this.refs.inner.children] as HTMLElement[]).map(getComponent).filter(com => com instanceof TreeItem) as TreeItem[]
		let item = items.find(item => item.selected)

		if (!item) {
			item = items.find(item => item.expanded)
		}

		if (!item) {
			item = items[0]
		}
		
		if (item) {
			this.setHoverItem(item)
		}
	}

	protected onBlur() {
		this.setHoverItem(null)
		off(document, 'keydown', this.onKeyDown as (e: Event) => void, this)
	}

	// Set current path from outside, will open all the directories on the way.
	async setPath(path: string) {
		let map = this.itemMap

		let oldItem = map[this.currentPath]
		if (oldItem) {
			oldItem.deselect()
		}

		this.currentPath = path

		// Here to expand directories on the way.
		let parentPath = ''
		let pathParts = path.split('/')

		for (let part of pathParts) {
			parentPath += (parentPath.endsWith('/') ? '' : '/') + part

			let item = map[parentPath]
			if (item) {
				await item.expand()
			}
		}

		await renderComplete()
		let item = map[path]
		if (item) {
			item.select()
			scrollToView(item.el)
		}
	}
}


@define('f-treeitem')
export class TreeItem<Events = any> extends Component<Events> {

	static style() {
		let {lh, mainColor} = theme

		return css`
		:host{
			display: block;
		}

		.line{
			display: flex;
			cursor: pointer;

			&.hover{
				background: #eee;
			}

			&.expanded{
				.arrow{
					transform: rotate(180deg);
				}
			}

			&.selected{
				color: ${mainColor};
				background: ${mainColor.alpha(0.1)};

				&.hover{
					background: ${mainColor.alpha(0.15)};
				}
			}
		}

		.arrow-placeholder{
			display: flex;
			width: ${lh(30)}px;

			.arrow{
				margin: auto;
			}
		}

		.icon{
			display: flex;
			width: ${lh(30)}px;
			margin-left: ${lh(-5)}px;

			f-icon{
				margin: auto;
			}
		}

		.text{
			flex: 1;
			min-width: 0;
			padding: 0 ${lh(10)} 0 0px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.menu{
			overflow: hidden;
		}
	`}

	static properties = ['text']

	data: TreeDataItem | null = null
	text: string = ''
	icon: string = ''
	path: string = ''
	children: TreeDataItem[] | null = null
	deep: number = -1

	protected root!: Tree
	protected parent!: TreeItem | Tree
	protected loading: boolean = false
	protected hasChildren: boolean = false
	expanded: boolean = false
	selected: boolean = false
	hoverAt: boolean = false
	itemsHasIcon: boolean = false

	protected render() {
		let {lh} = theme

		let innerPart = this.children ? repeat(this.children, (item) => html`
			<f-treeitem
				:root=${this.root}
				:data=${item}
				:deep=${this.deep + 1}
			/>`
		) : html`<slot />`

		return html `
		<template>
			<div class="line"
				:class.hover=${this.hoverAt}
				:class.selected=${this.selected}
				:class.expanded=${this.expanded}
				:style.padding-left.px=${lh(25) * this.deep}
				@click=${this.onClick}
				@mouseenter=${this.onMouseEnter}
			>
				<div class="arrow-placeholder" @click.stop=${this.toggleExpanded}> <!-- Stop to avoid trigger click on ".line" -->
					${this.children && this.children.length > 0 || this.hasChildren ? html`<f-icon class="arrow" type="down" />` : ''}
				</div>

			${this.parent.itemsHasIcon ? html`
				<div class="icon">
					${this.icon ? html`<f-icon :type=${this.icon} />` : ''}
				</div>` : ''
			}
				<div class="text">${this.text}</div>
			</div>
			<ul class="menu" :show=${{when: this.expanded, transition: {properties: ['height', 'opacity']}}}>
				${innerPart}
			</ul>
		</template>
	`}

	protected async onCreated() {
		if (!this.root) {
			this.root = this.closest(Tree)!
		}

		if (this.deep === -1) {
			let closestItem = this.closest(TreeItem)
			this.deep = closestItem ? closestItem.deep + 1 : 0
		}

		if (this.data) {
			this.text = this.data.text
			this.icon = this.data.icon
			this.path = this.data.path

			if (this.data.children instanceof Promise) {
				this.children = await this.data.children
			}
			else {
				this.children = this.data.children
			}
		}
		else {
			this.hasChildren = this.el.children.length > 0
		}
		
		this.parent = this.closest(TreeItem) || this.closest(Tree)!
		this.parent.itemsHasIcon = this.parent.itemsHasIcon || !!this.icon
	}

	protected onClick() {
		this.click()
	}

	click() {
		// First click to selected, secondary click to expand
		if (!this.selected) {
			this.select()
		}

		this.toggleExpanded()
	}

	protected onMouseEnter() {
		this.root.setHoverItem(this)
	}

	select() {
		this.root.selectItem(this)
	}

	deselect() {
		this.selected = false
	}

	protected toggleExpanded() {
		if (this.expanded) {
			this.expanded = false
		}
		else {
			this.expand()
		}
	}

	expand() {
		this.expanded = true
	}
}
