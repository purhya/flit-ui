import {css, define, html, repeat, renderComplete, show} from 'flit'
import {scrollToView} from 'ff'
import {MenuItem, SubMenu, Menu} from './menu'


interface TreeDataItem {
	icon?: string
	text: string
	path: string
	children?: Promise<TreeDataItem[]> | TreeDataItem[]
}

interface TreeEvents {
	select: (item: TreeItem) => void
}


/**
 * The difference of Menu vs Tree:
 * Menu supports `<menuitem>`s and `<submenu>`s, but not data rendering.
 * Tree supports only data rendering.
 * Each `<treeitem>` has a `path` property, such that you can control the opened tree item by setting path.
 */
@define('f-tree')
export class Tree<Events = any> extends Menu<Events & TreeEvents> {

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

	static properties = [...Menu.properties, 'scrollable']
	
	scrollable: boolean = false
	data: TreeDataItem | null = null
	children: TreeDataItem[] | null = null
	currentPath: string = ''

	protected loading: boolean = false
	protected itemMap: {[key: string]: TreeItem} = {}

	protected render() {
		return html`
		<template
			tabindex="0"
			:class.scrollable=${this.scrollable}
			@@focus=${this.onFocus}
			@@blur=${this.onBlur}
		>
			<div class="inner" :ref="inner">
				${this.renderInner()}
			</div>
		</template>
	`}

	renderInner() {
		let innerPart = this.data ? repeat(this.children, (item) => html`
			<f-treeitem
				.root=${this}
				.data=${item}
				.deep=${this.deep}
			>
				${item.text}
			</f-treeitem>
			${item.children ? html`
				<f-treemenu
					.root=${this}
					.data=${item}
					.deep=${this.deep + 1}
				>
			` : ''}
		`)
		: ''

		return innerPart
	}

	protected async onCreated() {
		super.onCreated()
		await this.loadChildren()

		if (this.data) {
			this.currentPath = this.data.path
		}
	}

	async loadChildren() {
		if (this.data) {
			if (this.data.children instanceof Promise) {
				this.loading = true
				this.children = await this.data.children
				this.loading = false
			}
			else {
				this.children = this.data.children || null
			}
		}
	}

	register(item: TreeItem) {
		this.itemMap[item.data.path] = item
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
				await item.expandSub()
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


@define('f-treemenu')
export class TreeMenu<Events = any> extends SubMenu<Events>{

	root!: Tree
	data: TreeDataItem | null = null
	children: TreeDataItem[] | null = null
	protected loading: boolean = false

	protected render() {
		return html`
		<template
			${show(
				this.root.layer ? true : this.opened,
				this.root.layer ? undefined : {transition: {properties: ['height', 'opacity']}}
			)}
			:class.has-icon="${this.itemsHasIcon}"
		>
			${this.renderInner()}
		</template>
	`}

	renderInner = Tree.prototype.renderInner

	protected async onCreated() {
		super.onCreated()
		await this.loadChildren()
	}

	loadChildren = Tree.prototype.loadChildren
}


@define('f-treeitem')
export class TreeItem<Events = any> extends MenuItem<Events> {

	root!: Tree
	data!: TreeDataItem

	protected async onCreated() {
		super.onCreated()
		this.root.register(this)
	}
}
