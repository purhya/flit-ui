import {Component, css, define, html, TemplateResult, liveRepeat, repeat, onRenderComplete, off, render, on, once, liveAsyncRepeat, LiveRepeatDirective, LiveAsyncRepeatDirective, DirectiveResult, TransitionOptions} from 'flit'
import {theme} from '../style/theme'
import {Store} from '../store/store'
import {getScrollbarWidth, watch, Order, getNumeric, sum, repeatTimes} from 'ff'
import {AsyncStore} from '../store/async-store'


interface GridEvents<Item> {
	rendered: (data: Item[], index: number) => void
}

export type RowRenderer<Item extends object> = (this: Grid<Item>, item: Item | null, index: number) => TemplateResult


export interface Column<Item = any> {
	title: string
	width?: number
	flex?: number | string

	/** Must be specified as string when using `liveStore`. */
	orderBy?: ((item: Item) => string | number) | string

	/** If specified as `true`, will using desc ordering firstly, then asc ordering */
	descFirst?: boolean

	/**Returns cell content or `<td>...</td>`. */
	render?: (item: Item, index: number) => TemplateResult | string | number
}


@define('f-grid')
export class Grid<Item extends object, Events = any> extends Component<GridEvents<Item> & Events> {

	static style() {
		let {fs, lh, mainColor, textColor, backgroundColor} = theme

		return css`
		:host{
			display: flex;
			flex-direction: column;
			height: 200px;
		}

		.head{
			padding-right: 10px;	// Same with defined scrollbar width.
			border-bottom: 1px solid ${theme.highlight(backgroundColor, 15)};
			color: ${theme.mode === 'light' ? textColor.darken(30) : textColor.lighten(30)};
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
			padding: 0 ${lh(8)}px;

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
			width: ${lh(20)}px;
			display: none;
			flex: none;
			margin-right: ${lh(-5)}px;

			&.current{
				display: flex;
			}
		}

		.resizer{
			position: relative;
			z-index: 1;
			width: 17px;
			margin-left: auto;
			margin-right: ${lh(-16)}px;
			cursor: e-resize;

			&::before{
				content: '';
				position: absolute;
				left: 8px;
				top: 6px;
				bottom: 6px;
				width: 1px;
				background: ${theme.highlight(backgroundColor, 15)};
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
			padding: 0 ${lh(8)}px;
			border-bottom: 1px solid ${theme.highlight(backgroundColor, 7.5)};
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			cursor: default;
		}

		f-checkbox{
			max-width: 100%;
			height: 100%;

			f-icon{
				margin-right: ${lh(10)}px;
			}
		}

		.resizing-mask{
			position: fixed;
			z-index: 9999;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			cursor: ew-resize;
		}
		`
	}

	static properties = ['resizable', 'live']

	resizable: boolean = false
	live: boolean = false
	pageSize: number = 50
	columns!: Column<Item>[]
	store!: Store<Item> | AsyncStore<Item>
	minColumnWidth: number = 64
	transition: TransitionOptions | undefined

	protected orderedColumnIndex: number = -1
	protected orderDirection: 'asc' | 'desc' | '' = ''
	protected unwatchSize: (() => void) | null = null
	protected columnWidths: number[] | null = null
	protected resizingColumnWidths: number[] | null = null
	protected columnResized: boolean = false
	protected repeatDir: LiveRepeatDirective<Item> | LiveAsyncRepeatDirective<Item> | null = null

	render(): TemplateResult {
		return html`
		<div class="head" :ref="head">
			<div class="columns" :ref="columns">
				${this.renderColumns()}
			</div>
		</div>

		<div class="body">
			<table class="rows">
				<colgroup :ref="colgroup">
					${this.columns.map(() => html`<col />`)}
				</colgroup>
				${this.renderRows()}
			</table>
		</div>
		`
	}

	protected renderColumns() {
		return this.columns.map((column, index) => {
			return html`
			<div class="column" @click=${(e: MouseEvent) => this.doOrdering(e, index)}>
				<div class="column-left">
					<div class="column-title">${column.title}</div>
					${column.orderBy ? html`
						<div class="order" :class.current=${this.orderedColumnIndex === index && this.orderDirection !== ''}>
							<f-icon .type=${this.getOrderIcon(index)} />
						</div>`
					: ''}
				</div>

				${this.resizable && index < this.columns.length - 1 ? html`
					<div class="resizer" @mousedown=${(e: MouseEvent) => this.onStartResize(e, index)} />`
				: ''}
			</div>`
		})
	}

	protected renderRows(): DirectiveResult {
		if (this.store instanceof AsyncStore) {
			return liveAsyncRepeat(
				{
					key: this.store.key,
					dataCount: this.store.dataCount.bind(this.store),
					dataGetter: this.store.dataGetter.bind(this.store) as any,
					pageSize: this.pageSize,
					averageItemHeight: theme.lineHeight + 1,
					ref: (dir) => this.setRepeatDirective(dir as any),
					onrendered: this.onRendered.bind(this) as any
				},
				this.renderRow.bind(this as any) as any,
				this.transition
			)
		}
		else if (this.live) {
			return liveRepeat(
				{
					data: this.store.currentData,
					pageSize: this.pageSize,
					averageItemHeight: theme.lineHeight + 1,
					ref: (dir) => this.setRepeatDirective(dir),
					onrendered: this.onRendered.bind(this)
				},
				this.renderRow.bind(this as any),
				this.transition
			)
		}
		else {
			return repeat(
				this.store.currentData,
				this.renderRow.bind(this as any),
				this.transition
			)
		}
	}

	protected renderRow(this: Grid<Item>, item: Item | null, index: number) {
		let tds = this.columns.map((column) => {
			let result = item && column.render ? column.render(item, index) : ''
			return html`<td>${result}</td>`
		})

		return html`<tr>${tds}</tr>`
	}

	protected setRepeatDirective(dir: LiveRepeatDirective<Item> | LiveAsyncRepeatDirective<Item>) {
		this.repeatDir = dir

		if (this.store instanceof AsyncStore) {
			this.store.setRepeatDirective(dir as LiveAsyncRepeatDirective<Item>)
		}
	}

	protected onRendered(data: Item[], index: number) {
		this.emit('rendered', data, index)
	}

	protected getOrderIcon(index: number): string {
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

	onCreated() {
		if (this.store instanceof AsyncStore) {
			for (let column of this.columns) {
				if (column.orderBy && typeof column.orderBy !== 'string') {
					throw new Error(`"orderBy" in "columns" configuration must be string type when using "liveStore"`)
				}
			}
		}
	}

	onReady() {
		onRenderComplete(() => {
			this.refs.head.style.paddingRight = getScrollbarWidth() + 'px'
			this.updatColumnWidths()
		})
	}

	onConnected () {
		this.unwatchSize = watch(this.el, 'size', () => this.updatColumnWidths())
	}

	onDisconnected() {
		if (this.unwatchSize) {
			this.unwatchSize()
			this.unwatchSize = null
		}
	}


	// Order part
	protected doOrdering(e: MouseEvent, index: number) {
		if ((e.target as HTMLElement).closest(this.scopeClassName('.resizer'))) {
			return
		}

		let canOrder = this.columns[index].orderBy
		if (!canOrder) {
			return
		}

		let direction: 'asc' | 'desc' | '' = ''
		let descFirst = this.columns[index].descFirst

		if (index === this.orderedColumnIndex) {
			if (descFirst) {
				direction = this.orderDirection === '' ? 'desc' : this.orderDirection === 'desc' ? 'asc' : ''
			}
			else {
				direction = this.orderDirection === '' ? 'asc' : this.orderDirection === 'asc' ? 'desc' : ''
			}
		}
		else {
			direction = descFirst ? 'desc' : 'asc'
		}

		if (direction === '') {
			this.store.clearOrder()
		}
		else if (this.store instanceof AsyncStore) {
			let column = this.columns[index]
			this.store.setOrder(column.orderBy as string, direction)
		}
		else {
			let column = this.columns[index]
			let order = new Order([(column.orderBy || column.render) as (item: Item) => string | number, direction])
			this.store.setOrder(order)
		}

		this.orderedColumnIndex = index
		this.orderDirection = direction
	}


	// Resizing part
	protected updatColumnWidths() {
		let clientWidth = this.refs.head.clientWidth - getNumeric(this.refs.head, 'paddingLeft') - getNumeric(this.refs.head, 'paddingRight')

		let widthAndFlexArray = this.columns.map(({flex, width}, index) => {
			let baseWidthInColumnConfig = Math.max(width || 0, this.minColumnWidth)

			// If column resized, we use the column width percentage to calculate new column width.
			let baseWidth = this.columnResized ? this.columnWidths![index] : baseWidthInColumnConfig
			let extendFlex = 0
			let shrinkFlex = 0

			if (typeof flex === 'string') {
				let flexs = flex.split(/\s+/).map(Number)
				extendFlex = flexs[0] >= 0 ? flexs[0] : 0
				shrinkFlex = flexs[1] >= 0 ? flexs[1] : extendFlex
			}
			else if (typeof flex === 'number' && flex >= 0) {
				extendFlex = shrinkFlex = flex
			}

			return [baseWidth, extendFlex, shrinkFlex]
		}) as [number, number, number][]
		
		let widths = columnWidthCalculator(widthAndFlexArray, clientWidth, this.minColumnWidth)
		this.columnWidths = widths
		this.setColumnWidths(widths)
	}

	protected setColumnWidths(widths: number[]) {
		let totalWidth = sum(widths)
		
		for (let index = 0; index < widths.length; index++) {
			let percent = widths[index] / totalWidth
			;(this.refs.colgroup.children[index] as HTMLElement).style.width = percent * 100 + '%'
			;(this.refs.columns.children[index] as HTMLElement).style.width = percent * 100 + '%'
		}
	}

	protected onStartResize(e: MouseEvent, index: number) {
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

			off(document, 'mousemove', onMouseMove as (e: Event) => void)
			cursorMask.remove()
			this.columnResized = true
		}

		let cursorMask = render(html`<div class="resizing-mask" />`, this).firstElementChild as HTMLElement
		document.body.append(cursorMask)

		on(document, 'mousemove', onMouseMove as (e: Event) => void)
		once(document, 'mouseup', onMouseUp)
	}

	protected resizeColumnByMovementX(movementX: number, index: number) {
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
			let shrink = needShrink

			if (width - shrink < this.minColumnWidth) {
				shrink = width - this.minColumnWidth
			}

			widths[i] -= shrink
			widths[expandIndex] += shrink	// index <= column count - 2
			needShrink -= shrink
		}

		this.resizingColumnWidths = widths
		this.setColumnWidths(widths)
	}

	setStartIndex(index: number) {
		if (this.repeatDir) {
			this.repeatDir.setStartIndex(index)
		}
	}

	scrollToViewIndex(index: number) {
		if (this.repeatDir) {
			this.repeatDir.scrollToViewIndex(index)
		}
	}
}


/**
	Calculate column widths from `{width, minWidth, flex}` values in column config.
	The algorithm is nearly same with the flex layout,
	except that the total column widths will always equal the available client width,
	and no column width should less than `minColumnWidth`.
*/
function columnWidthCalculator(widthAndFlexArray: [number, number, number][], clientWidth: number, minColumnWidth: number): number[] {
	// Not enough space for even `minColumnWidth`, then average `clientWidth` to each column.
	if (clientWidth < minColumnWidth * widthAndFlexArray.length) {
		return repeatTimes(clientWidth / widthAndFlexArray.length, widthAndFlexArray.length)
	}

	let totalBaseWidth = 0
	let totalExtendFlex = 0
	let totalShrinkFlex = 0
	let widths = repeatTimes(minColumnWidth, widthAndFlexArray.length)
	let excludedIndexSet: Set<number> = new Set()

	for (let [baseWidth, extendFlex, shrinkFlex] of widthAndFlexArray) {
		totalBaseWidth += baseWidth
		totalExtendFlex += extendFlex
		totalShrinkFlex += shrinkFlex
	}

	// If no `flex` set for any column, set `flex` to `1` for all the columns.
	if (totalExtendFlex === 0) {
		totalExtendFlex = widthAndFlexArray.length
		widthAndFlexArray.forEach(a => a[1] = 1)
	}

	if (totalShrinkFlex === 0) {
		totalShrinkFlex = widthAndFlexArray.length
		widthAndFlexArray.forEach(a => a[2] = 1)
	}

	while (true) {
		let totalFlex = clientWidth >= totalBaseWidth ? totalExtendFlex : totalShrinkFlex
		let widthPerFlex = (clientWidth - totalBaseWidth) / totalFlex
		let moreColumnExcluded = false

		for (let index = 0; index < widthAndFlexArray.length; index++) {
			if (excludedIndexSet.has(index)) {
				continue
			}

			let [baseWidth, extendFlex, shrinkFlex] = widthAndFlexArray[index]
			let flex = widthPerFlex >= 0 ? extendFlex : shrinkFlex
			let width = flex * widthPerFlex + baseWidth

			if (width < minColumnWidth) {
				clientWidth -= minColumnWidth
				totalBaseWidth -= minColumnWidth
				totalExtendFlex -= flex
				excludedIndexSet.add(index)
				moreColumnExcluded = true
			}
			else {
				widths[index] = width
			}
		}

		if (!moreColumnExcluded) {
			break
		}
	}

	return widths
}