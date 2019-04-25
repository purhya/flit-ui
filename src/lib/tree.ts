import {Component, css, define, html, repeat, renderComplete} from 'flit'
import {scrollToView} from 'ff'
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
export class Tree extends Component<TreeEvents> {

	static style() {
		return css`
		:host{
			display: block;
			position: relative;
			//overflow: auto;
		}

		// As a scroll inner, items are always too wide
		.inner{
			position: absolute;
			left: 0;
			top: 0;
			min-width: 100%;
		}
	`}

	data: TreeDataItem | null = null
	children: TreeDataItem[] | null = null
	currentPath: string = ''

	loading: boolean = false
	selectedItem: TreeItem | null = null
	itemMap: {[key: string]: TreeItem} = {}
	root!: Tree
	parent: null = null
	deep: number = 0
	hasChildren: boolean = false
	itemsHasIcon: boolean = false

	render() {
		let innerPart = this.data ? repeat(this.children, (item) => html`
			<f-treeitem
				:root=${this}
				:data=${item}
				:deep=${this.deep}
			/>`)
			: html`<slot />`

		return html`
		<template tabindex="0">
			<div class="inner">
				${innerPart}
			</div>
		</template>
	`}

	async onCreated() {
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
			this.emit('select', item)
		}
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
export class TreeItem extends Component {

	static style() {
		let {lh, mainColor} = theme

		return css`
		:host{
			display: block;
		}

		.line{
			display: flex;
			cursor: pointer;

			&:hover{
				color: ${mainColor};
			}

			&.hover{
				background: #eee;
			}

			&.expanded{
				color: ${mainColor};
				background: ${mainColor.alpha(0.05)};

				&.hover{
					background: ${mainColor.alpha(0.1)};
				}

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

	root!: Tree
	parent!: TreeItem | Tree
	expanded: boolean = false
	loading: boolean = false
	selected: boolean = false
	hasChildren: boolean = false
	itemsHasIcon: boolean = false

	render() {
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
				:class.selected=${this.selected}
				:class.expanded=${this.expanded}
				:style.padding-left.px=${lh(25) * this.deep}
				@click=${this.onClick}
			>
				<div class="arrow-placeholder" @click.stop=${this.toggleExpanded}>
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

	async onCreated() {
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

	onClick() {
		// First click to selected, secondary click to expand
		if (this.selected) {
			this.expand()
		}
		else {
			this.select()
		}
	}

	select() {
		this.root.selectItem(this)
	}

	deselect() {
		this.selected = false
	}

	toggleExpanded() {
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
