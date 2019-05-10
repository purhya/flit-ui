import {Component, css, define, html, TemplateResult, liveRepeat, repeat, onRenderComplete, off, render, on, once} from 'flit'
import {theme} from './theme'
import {Store} from './store'
import {getScrollbarWidth, watch, Order, getNumeric, sum, toDecimal} from 'ff'


interface Column<Item = any> {
	title: string
	width?: number
	minWidth?: number
	flex?: number
	orderable?: boolean

	// If not specified, implies that the `render` will return string | number to sort.
	orderBy?: (item: Item) => string | number

	render: (item: Item, index: number) => TemplateResult | string | number
}


@define('f-grid')
export class Grid<Item extends object> extends Component {

	static style() {
		let {fs, mainColor} = theme

		return css`
		:host{
			display: flex;
			flex-direction: column;
			height: 200px;
		}

		.head{
			padding-right: 8px;
			border-bottom: 1px solid #ddd;
			color: #888;
			font-size: ${fs(12)}px;
			user-select: none;
		}

		.columns{
			display: flex;
		}

		.column{
			position: relative;
			display: flex;
			align-items: stretch;
			padding: 0 8px;

			&:last-child{
				padding-right: 0;
			}
		}

		.column-left{
			flex: 1;
			display: flex;

			&:hover .order{
				display: flex;
			}
		}

		.column-title{
			flex: 0 1 auto;
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.resizable .column-title{
			flex: 1;
		}

		.order{
			width: 20px;
			display: none;
			flex: none;
			margin-right: -5px;

			&.current{
				display: flex;
			}
		}

		.resizer{
			position: relative;
			z-index: 1;
			width: 17px;
			margin-left: auto;
			margin-right: -16px;
			cursor: e-resize;

			&::before{
				content: '';
				position: absolute;
				left: 8px;
				top: 6px;
				bottom: 6px;
				width: 1px;
				background: #ddd;
			}
		}

		.scroller{
			flex: 1;
			overflow-y: scroll;
			overflow-x: hidden;
		}

		.body{
			flex: 1;
			overflow-y: scroll;
			overflow-x: hidden;
		}

		.rows{
			display: table;
			table-layout: fixed;
			width: 100%;
		}

		tr{
			&:hover{
				background: ${mainColor.alpha(0.05)};
			}

			&.selected{
				background: ${mainColor.alpha(0.1)};
			}
		}

		td{
			vertical-align: middle;
			padding: 0 8px;
			border-bottom: 1px solid #eee;
			cursor: default;
		}

		f-checkbox{
			max-width: 100%;
			height: 100%;

			f-icon{
				margin-right: 10px;
			}
		}

		.resizing-mask{
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			cursor: e-resize;
		}
	`}

	static properties = ['resizable', 'live', 'groupSize']

	resizable: boolean = false
	live: boolean = false
	groupSize: number = 50
	columns!: Column<Item>[]
	store!: Store<Item>
	minWidth: number = 64

	private orderedColumnIndex: number = -1
	private orderDirection: 'asc' | 'desc' | '' = ''
	private unwatchSize: (() => void) | null = null
	private columnWidths: number[] | null = null
	private resizingColumnWidths: number[] | null = null

	render() {
		return html`
		<div class="head" :ref="head" ?disabled=${this.store.currentData.length === 0}>
			<div class="columns" :ref="columns">
				${this.renderColumns()}
			</div>
		</div>

		<div class="body">
			<table class="rows">
				<colgroup :ref="colgroup">
					${this.columns.map(_c => html`<col />`)}
				</colgroup>
				${this.renderRows()}
			</table>
		</div>
	`}

	renderColumns() {
		return this.columns.map((column, index) => {
			return html`
			<div class="column" @click=${(e: MouseEvent) => this.doOrdering(e, index)}>
				<div class="column-left">
					<div class="column-title">${column.title}</div>
					${column.orderable || column.orderBy ? html`
						<div class="order" :class.current=${this.orderedColumnIndex === index && this.orderDirection !== ''}>
							<f-icon :type=${this.getOrderIcon(index)} />
						</div>`
					: ''}
				</div>

				${this.resizable && index < this.columns.length - 1 ? html`
					<div class="resizer" @mousedown=${(e: MouseEvent) => this.onStartResize(e, index)} />`
				: ''}
			</div>`
		})
	}

	renderRows() {
		if (this.live) {
			return liveRepeat(
				{
					data: this.store.currentData,
					groupSize: this.groupSize
				},
				this.renderRow.bind(this)
			)
		}
		else {
			return repeat(
				this.store.currentData,
				this.renderRow.bind(this)
			)
		}
	}

	renderRow(item: Item, index: number) {
		let tds = this.columns.map((column) => column.render(item, index)).map(content => {
			return html`<td>${content}</td>`
		})

		return html`<tr>${tds}</tr>`
	}

	getOrderIcon(index: number): string {
		if (index === this.orderedColumnIndex) {
			if (this.orderDirection === 'asc') {
				return 'order-asc'
			}
			else if (this.orderDirection === 'desc') {
				return 'order-desc'
			}
		}

		return 'order-default'
	}

	onReady() {
		onRenderComplete(() => {
			this.refs.head.style.paddingRight = getScrollbarWidth() + 'px'
			this.updatColumnWidths()
		})

		this.onReconnected()
	}

	onReconnected () {
		this.unwatchSize = watch(this.el, 'size', () => this.updatColumnWidths())
	}

	onDisconnected() {
		if (this.unwatchSize) {
			this.unwatchSize()
			this.unwatchSize = null
		}
	}


	// Order part
	doOrdering(e: MouseEvent, index: number) {
		if ((e.target as HTMLElement).closest(this.scopeClassName('.resizer'))) {
			return
		}

		let canOrder = this.columns[index].orderable || this.columns[index].orderBy
		if (!canOrder) {
			return
		}

		let direction: 'asc' | 'desc' | '' = ''

		if (index === this.orderedColumnIndex) {
			direction = this.orderDirection === '' ? 'asc' : this.orderDirection === 'asc' ? 'desc' : ''
		}
		else {
			direction = 'asc'
		}

		if (direction === '') {
			this.store.setOrder(null)
		}
		else {
			let column = this.columns[index]
			let order = new Order([(column.orderBy || column.render) as (item: Item) => string | number, direction])
			this.store.setOrder(order)
		}

		this.orderedColumnIndex = index
		this.orderDirection = direction
	}


	// Resize part
	updatColumnWidths() {
		let totalWidth = this.refs.head.clientWidth - getNumeric(this.refs.head, 'paddingLeft') - getNumeric(this.refs.head, 'paddingRight')
		let totalBaseWidth = 0
		let totalFlex = 0
		let addFlexToEveryColumn = false

		let widthAndFlexArray = this.columns.map(({flex, width, minWidth}) => {
			let baseWidth = Math.max(width || 0, minWidth || this.minWidth)
			return [baseWidth, flex || 0]
		})

		for (let [baseWidth, flex] of widthAndFlexArray) {
			totalBaseWidth += baseWidth
			totalFlex += flex
		}

		if (totalFlex === 0) {
			totalFlex = this.columns.length
			addFlexToEveryColumn = true
		}

		let widthPerFlex = (totalWidth - totalBaseWidth) / totalFlex

		let widths = widthAndFlexArray.map(([baseWidth, flex]) => {
			if (addFlexToEveryColumn) {
				flex = 1
			}

			return flex * widthPerFlex + baseWidth
		})

		this.columnWidths = widths
		this.setColumnWidths(widths)
	}

	private setColumnWidths(widths: number[]) {
		let totalWidth = sum(widths)
		let percentSum = 0
		
		for (let index = 0; index < widths.length; index++) {
			let percent = index === widths.length - 1
				? 1 - percentSum
				: toDecimal(widths[index] / totalWidth, 4)

			;(this.refs.colgroup.children[index] as HTMLElement).style.width = percent * 100 + '%'
			;(this.refs.columns.children[index] as HTMLElement).style.width = percent * 100 + '%'
			percentSum += percent
		}
	}

	onStartResize(e: MouseEvent, index: number) {
		let startX = e.clientX

		let onMouseMove = (e: MouseEvent) => {
			e.preventDefault()
			this.resizeColumnByMovementX(e.clientX - startX, index)
		}

		let onMouseUp = () => {
			if (this.resizingColumnWidths) {
				this.columnWidths = this.resizingColumnWidths
				this.resizingColumnWidths = null
			}
			
			for (let i = 0; i < this.columns.length; i++) {
				this.columns[i].width = this.columnWidths![i]
			}

			off(document, 'mousemove', onMouseMove as (e: Event) => void)
			this.resizeColumnByMovementX(e.clientX - startX, index)
			cursorMask.remove()
		}

		let cursorMask = render('<div class="grid-resizing-mask" />', this).firstElementChild as HTMLElement
		document.body.append(cursorMask)

		on(document, 'mousemove', onMouseMove as (e: Event) => void)
		once(document, 'mouseup', onMouseUp)
	}

	resizeColumnByMovementX(movementX: number, index: number) {
		let widths = [...this.columnWidths!]
		let needShrink = Math.abs(movementX)
		let moveLeft = movementX < 0
		let expandIndex = moveLeft ? index + 1 : index
		let firstShrinkIndex = moveLeft ? index : index + 1

		// When move to left, we reduce the width of current and previous columns until the `minWidth`,
		// then we add the reduced width to next column.

		// When move to right, we reduce the width of next columns until the `minWidth`,
		// then we add the reduced width to current column.
		for (let i = firstShrinkIndex; (moveLeft ? i >= 0 : i < this.columns.length) && needShrink > 0; moveLeft ? i-- : i++) {
			let width = widths[i]
			let minWidth = this.columns![i].minWidth || this.minWidth
			let shrink = needShrink

			if (width - shrink < minWidth) {
				shrink = width - minWidth
			}

			widths[i] -= shrink
			widths[expandIndex] += shrink	// index <= column count - 2
			needShrink -= shrink
		}

		this.resizingColumnWidths = widths
		this.setColumnWidths(widths)
	}
}