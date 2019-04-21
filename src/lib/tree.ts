// import {Component, css, define, html, repeat} from 'flit'


// class Tree extends Component {

// 	static style() {
// 		return css`
// 		:host{
// 			display: block;
// 			overflow: auto;
// 			position: relative;
// 		}

// 		// As a scroll inner, items are always too wide
// 		.inner{
// 			position: absolute;
// 			left: 0;
// 			top: 0;
// 			min-width: 100%;
// 		}
// 	`}

// 	render() {
// 		return html`
// 		<div class="inner">
// 		${
// 			repeat(this.children, (item) => html`
// 			<f-tree-item
// 				f-for="item of children"
// 				:root="root"
// 				:data="item"
// 				:deep=${0}
// 			/>
// 			`)
// 		}
			
// 		</div>
// 	`}

// 	data: null,

// 	path: '/',

// 	//its a promise interface, you can overwrite this
// 	getChildren (data) {
// 		return data.children
// 	}

// 	//you can overwrite this
// 	getPath (data) {
// 		return data.path
// 	}

// 	//you can overwrite this
// 	getName (data) {
// 		return this.getPath(data).afterLast('/')
// 	}

// 	//you can overwrite this
// 	getIcon (data) {
// 		return data.icon
// 	}


// 	async onCreated () {
// 		this.root = this
// 		this.leafMap = {}
// 		this.children = await this.getChildren(this.data)
// 	}


// 	register (path, leaf) {
// 		this.leafMap[path] = leaf
// 	}


// 	isCurrentPath (path) {
// 		return this.path === path
// 	}


// 	//from leaf
// 	onSelectPathFromLeaf (path) {
// 		this.setPath(path)
// 		this.emit('select', path)
// 	}


// 	//from outside
// 	async setPath (path, willExpand = true) {
// 		let map = this.leafMap

// 		if (this.path) {
// 			let oldLeaf = map[this.path]
// 			if (oldLeaf) {
// 				oldLeaf.deselect()
// 			}
// 		}

// 		this.path = path

// 		if (willExpand) {
// 			let parentPath = ''
// 			let pathParts = path.split('/')

// 			for (let part of pathParts) {
// 				parentPath += (parentPath.endsWith('/') ? '' : '/') + part

// 				let leaf = map[parentPath]
// 				if (leaf) {
// 					await leaf.expand()
// 				}
// 			}
// 		}

// 		FF.nextTick(() => {
// 			let leaf = map[path]
// 			if (leaf) {
// 				leaf.select()
// 				leaf.el.scrollToView()
// 			}
// 		})
// 	}
// }


// @define('f-tree-item')
// class TreeItem extends Component {

// 	static style() {
// 		return css`
// 		:host{
// 			display: block;
// 		}

// 		&-leaf{
// 			line-height: 36px;
// 		}

// 		&-title{
// 			height: 36px;
// 			padding-left: 4px;
// 			padding-right: 10px;
// 			display: flex;
// 			cursor: pointer;

// 			&:hover{
// 				color: $main-color;
// 			}

// 			&.active{
// 				background: $main-color-opacity-5;
// 				color: $main-color;
// 			}
// 		}

// 		&-expand{
// 			width: 24px;
// 			display: flex;

// 			&-empty .icon{
// 				visibility: hidden;
// 			}
// 		}

// 		.icon-down{
// 			transition: transform 0.25s ease;
// 		}

// 		&-icon{
// 			width: 24px;
// 			display: flex;
// 		}

// 		&-name{
// 			white-space: nowrap;
// 			overflow: hidden;
// 			text-overflow: ellipsis;
// 			margin-left: 7px;
// 		}

// 		&-expanded{
// 			.icon-down{
// 				transform: rotate(180deg);
// 			}
// 		}

// 		&-menu{
// 			overflow: hidden;
// 		}
// 	`}

// 	template: `
// 		<tree-leaf class="tree-leaf">
// 			<div class="tree-title"
// 				:class.tree-expanded="expanded"
// 				:class.active="isSelected"
// 				:style.padding-left.px="4 + 24 * deep"
// 				@click="onClickLeaf"
// 			>
// 				<div class="tree-expand"
// 					:class.tree-expand-empty="isEmpty()"
// 					@click.stop="toggleExpanded"
// 				>
// 					<icon type="down"></icon>
// 				</div>
// 				<div class="tree-icon">
// 					<icon :type="getIcon()"></icon>
// 				</div>
// 				<div class="tree-name">{{getName()}}</div>
// 			</div>
// 			<ul class="tree-menu" f-show="expanded" f-transition="height, opacity">
// 				<tree-leaf
// 					f-for="item of children"
// 					:root="root"
// 					:data="item"
// 					:deep="deep + 1"
// 				></tree-leaf>
// 			</ul>
// 		</tree-leaf>
// 	`,

// 	data: null,

// 	root: null,

// 	//inner properties
// 	deep: 0,

// 	expanded: false,

// 	loading: false,

// 	children: null,

// 	isSelected: false,


// 	onReady () {
// 		this.root.register(this.root.getPath(this.data), this)
// 	}


// 	getName () {
// 		return this.root.getName(this.data)
// 	}


// 	getIcon () {
// 		return this.root.getIcon(this.data) || 'folder'
// 	}


// 	isEmpty () {
// 		return this.children && this.children.length === 0
// 	}


// 	onClickLeaf () {
// 		let path = this.root.getPath(this.data)

// 		if (!this.root.isCurrentPath(path)) {
// 			this.select()
// 			this.root.onSelectPathFromLeaf(path)
// 		}
// 		else {
// 			this.expand()
// 		}
// 	}


// 	toggleExpanded () {
// 		if (this.expanded) {
// 			this.expanded = false
// 		}
// 		else {
// 			this.expand()
// 		}
// 	}


// 	async expand () {
// 		if (this.children) {
// 			this.expanded = true
// 		}
// 		else {
// 			this.loading = true
// 			this.children = await this.root.getChildren(this.data)
// 			this.loading = false

// 			FF.nextTick(() => {
// 				this.expanded = true
// 			})
// 		}
// 	}


// 	select () {
// 		this.isSelected = true
// 	}


// 	deselect () {
// 		this.isSelected = false
// 	}
// })
