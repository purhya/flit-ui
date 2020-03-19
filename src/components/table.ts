import {Component, css, define, html, TemplateResult, liveRepeat, repeat, onRenderComplete, off, render, on, once, liveAsyncRepeat, LiveRepeatDirective, LiveAsyncRepeatDirective, DirectiveResult, observeGetter, renderComplete, refDirective, Directive} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Store} from '../store/store'
import {getScrollbarWidth, watchLayout, Order, getStyleAsNumber, sum, repeatTimes, scrollToTop, scrollToView} from '@pucelle/ff'
import {AsyncStore} from '../store/async-store'
import {DirectiveTransitionOptions} from '@pucelle/flit/out/libs/directive-transition'


interface GridEvents<Item> {
	livedataupdated: (data: Item[], index: number) => void
	orderchanged: (name: string, direction: 'asc' | 'desc' | '') => void
}

export type RowRenderer<T extends object> = (this: Table<T>, item: T | null, index: number) => TemplateResult


export interface Column<T = any> {
	/** 
	 * If you want to remember last ordered columns after columns changed,
	 * or want to restore last ordered column from storage,
	 * You should set name.
	 */
	name?: string

	title: string
	width?: number
	flex?: number | string

	/** Must be specified as string when using `liveStore`. */
	orderBy?: ((item: T) => string | number) | string

	/** If specified as `true`, will using desc ordering firstly, then asc ordering */
	descFirst?: boolean

	/** Returns cell content or `<td>...</td>`. */
	render?: (item: T, index: number) => TemplateResult | string | number

	/** If you choose to overwrite `renderRow`, you must specify `text-align` for cells. */
	align?: 'left' | 'right' | 'center'
}


@define('f-table')
export class Table<T extends object, E = any> extends Component<GridEvents<T> & E> {
	static style() {
		let {adjustFontSize, adjust, mainColor, textColor, backgroundColor} = theme
		let scrollbarWidth = getScrollbarWidth()

		return css`
		:host{
			display: flex;
			flex-direction: column;
			height: 200px;
		}

		.head{
			padding-right: ${scrollbarWidth}px;	// Same with defined scrollbar width.
			color: ${textColor.toMiddle(20)};
			font-size: ${adjustFontSize(13)}px;
			font-weight: bold;
			user-select: none;
		}

		.columns{
			display: flex;
		}

		.column{
			position: relative;
			display: flex;
			align-items: stretch;
			padding: 0 ${adjust(8)}px;
			border-bottom: 1px solid ${backgroundColor.toMiddle(20)};

			&:last-child{
				flex: 1;
				min-width: 0;
				padding-right: ${scrollbarWidth}px;
				margin-right: -${scrollbarWidth}px;
			}
		}

		.column-left{
			display: flex;
			flex: 1;
			max-width: 100%;

			&:hover .order{
				visibility: visible;
			}
		}

		.column-title{
			flex: 0 1 auto;
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.column-ordered{
			border-bottom-color: ${backgroundColor.toMiddle(40)};
		}

		.resizable .column-title{
			flex: 1;
		}

		.order{
			width: ${adjust(16)}px;
			display: flex;
			flex: none;
			margin-right: ${adjust(-8)}px;	// Gives 16 - 8 = 8px as cell padding-right.
			visibility: hidden;

			f-icon{
				margin: auto;
			}

			&.current{
				visibility: visible;
			}
		}

		.resizer{
			position: relative;
			z-index: 1;
			width: 17px;
			margin-left: auto;
			margin-right: ${adjust(-16)}px;
			cursor: e-resize;

			&::before{
				content: '';
				position: absolute;
				left: 8px;
				top: 6px;
				bottom: 6px;
				width: 1px;
				background: ${backgroundColor.toMiddle(20)};
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
			position: relative;
			border-bottom: 1px solid ${backgroundColor.toMiddle(13)};
		}

		.rows{
			table-layout: fixed;
			position: absolute;
			width: 100%;
		}

		tr{
			&:hover{
				background: ${mainColor.alpha(0.05)};
			}

			&.selected{
				background: ${mainColor.alpha(0.1)};
			}

			&:last-child td{
				border-bottom-color: transparent;
			}
		}

		td{
			vertical-align: middle;
			padding: ${adjust(3)}px ${adjust(8)}px;
			border-bottom: 1px solid ${backgroundColor.toMiddle(13)};
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			cursor: default;
		}

		f-checkbox{
			max-width: 100%;
			height: 100%;

			f-icon{
				margin-right: ${adjust(10)}px;
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


	/** If `true`, will only render the rows that in viewport. */
	live: boolean = false

	/** 
	 * Works only when `live` is `true`
	 * You can understand this as how many items to render.
	 */
	pageSize: number = 50

	/** The index of the first item to be visible, to reflect last scrolling position. */
	startIndex: number = 0

	/** If what you rendered is very complex and can't complete in an animation frame, set this to true. */
	preRendering: boolean = false

	resizable: boolean = false
	columns!: Column<T>[]
	minColumnWidth: number = 64
	store!: Store<T> | AsyncStore<T>
	transition: DirectiveTransitionOptions | undefined
	orderedColumnName: string | null = null
	orderDirection: 'asc' | 'desc' | '' = ''

	protected orderedColumnIndex: number = -1
	protected columnWidths: number[] | null = null
	protected resizingColumnWidths: number[] | null = null
	protected columnResized: boolean = false
	protected cachedTotalWidth: number = 0
	protected repeatDir: LiveRepeatDirective<T> | LiveAsyncRepeatDirective<T> | null = null

	render(): TemplateResult {
		return html`
		<div class="head" :ref="head">
			<div class="columns" :ref="columns">
				${this.renderColumns()}
			</div>
		</div>

		<div class="body">
			<table class="rows" :ref="table">
				<colgroup :ref="colgroup">
					${this.columns.map(column => html`
						<col :style.text-align=${column.align || ''} />
					`)}
				</colgroup>
				${this.renderRows()}
			</table>
		</div>
		`
	}

	protected renderColumns() {
		return this.columns.map((column, index) => {
			let isOrdered = this.orderedColumnIndex === index
			let flexAlign = column.align === 'right' ? 'flex-end' : column.align === 'center' ? 'center' : ''

			return html`
			<div class="column"
				:class.column-ordered=${isOrdered}
				@click=${(e: MouseEvent) => this.doOrdering(e, index)}
			>
				<div class="column-left" :style.justify-content=${flexAlign}>
					<div class="column-title">${column.title}</div>
					${column.orderBy ? html`
						<div class="order" :class.current=${isOrdered && this.orderDirection !== ''}>
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
			return refDirective(liveAsyncRepeat(
				{
					key: this.store.key,
					pageSize: this.pageSize,
					startIndex: this.startIndex,
					preRendering: this.preRendering,
					dataCount: this.store.dataCount.bind(this.store),
					dataGetter: this.store.dataGetter.bind(this.store) as any,
					onUpdated: this.onRepeatDataUpdated.bind(this) as any
				},
				this.renderRow.bind(this as any) as any,
				this.transition
			), this.setRepeatDirective.bind(this))
		}
		else if (this.live) {
			return refDirective(liveRepeat(
				{
					pageSize: this.pageSize,
					startIndex: this.startIndex,
					preRendering: this.preRendering,
					data: this.store.currentData,
					onUpdated: this.onRepeatDataUpdated.bind(this)
				},
				this.renderRow.bind(this as any),
				this.transition
			), this.setRepeatDirective.bind(this))
		}
		else {
			return repeat(
				this.store.currentData,
				this.renderRow.bind(this as any),
				this.transition
			)
		}
	}

	/** 
	 * Although you can specify this method,
	 * I would suggest to define a sub class and overwrite `renderRow`.
	 */
	renderRow(item: T | null, index: number) {
		let tds = this.columns.map((column) => {
			let result = item && column.render ? column.render(item, index) : '\xa0'
			return html`<td :style.text-align=${column.align || ''}>${result}</td>`
		})

		return html`<tr>${tds}</tr>`
	}

	protected setRepeatDirective(dir: Directive) {
		this.repeatDir = dir as LiveRepeatDirective<T> | LiveAsyncRepeatDirective<T>

		if (this.store instanceof AsyncStore) {
			this.store.setRepeatDirective(dir as LiveAsyncRepeatDirective<T>)
		}
	}

	protected onRepeatDataUpdated(data: T[], index: number) {
		this.emit('livedataupdated', data, index)
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

		this.restoreOrderedColumn()
	}

	onReady() {
		onRenderComplete(() => {
			this.updatColumnWidths()
		})
	}

	onConnected() {
		this.watch(() => observeGetter(this, 'columns'), async () => {
			this.restoreOrderedColumn()

			// Here we need it render new `<col>`s.
			await renderComplete()
			this.updatColumnWidthsRoughly()
		})

		onRenderComplete(() => {
			let unwatchSize = watchLayout(this.el, 'size', () => this.updatColumnWidths())
			this.once('disconnected', unwatchSize)
		})
	}

	// Order part
	protected doOrdering(e: MouseEvent, index: number) {
		if ((e.target as HTMLElement).closest(this.scopeClassName('.resizer'))) {
			return
		}

		let columns = this.columns
		let column = columns[index]
		let canOrder = column.orderBy
		if (!canOrder) {
			return
		}

		let direction: 'asc' | 'desc' | '' = ''
		let descFirst = column.descFirst

		if (index === this.orderedColumnIndex) {
			if (descFirst) {
				direction = this.orderDirection === '' ? 'desc' : this.orderDirection === 'desc' ? 'asc' : 'desc'
			}
			else {
				direction = this.orderDirection === '' ? 'asc' : this.orderDirection === 'asc' ? 'desc' : 'asc'
			}
		}
		else {
			direction = descFirst ? 'desc' : 'asc'
		}

		
		this.orderedColumnName = column.name || (typeof column.orderBy === 'string' ? column.orderBy : null) || null
		this.orderedColumnIndex = index
		this.orderDirection = direction

		this.orderStore()

		if (this.orderedColumnName) {
			this.emit('orderchanged', this.orderedColumnName, direction)
		}
	}

	private orderStore() {
		if (this.orderDirection === '') {
			this.store.clearOrder()
		}
		else if (this.store instanceof AsyncStore) {
			let column = this.columns[this.orderedColumnIndex]
			this.store.setOrder(column.orderBy as string, this.orderDirection)
		}
		else {
			let column = this.columns[this.orderedColumnIndex]
			let order = new Order([(column.orderBy || column.render) as (item: T) => string | number, this.orderDirection])
			this.store.setOrder(order)
		}
	}

	orderByColumn(name: string, direction: 'asc' | 'desc' | '' = '') {
		if (this.orderedColumnName === name) {
			return
		}

		let columns = this.columns
		let index = -1

		for (let i = 0; i < columns.length; i++) {
			if (columns[i].name === name) {
				index = i
				break
			}
		}

		if (index > -1) {
			let column = columns[index]
			this.orderedColumnName = column.name || (typeof column.orderBy === 'string' ? column.orderBy : null) || null
			this.orderedColumnIndex = index
			this.orderDirection = direction

			this.orderStore()

			if (this.orderedColumnName) {
				this.emit('orderchanged', this.orderedColumnName, direction)
			}
		}
	}

	private restoreOrderedColumn() {
		let oldOrderedColumnIndex = this.orderedColumnIndex

		if (this.orderedColumnName) {
			let columnIndex = this.columns.findIndex(column => column.name === this.orderedColumnName || column.orderBy === this.orderedColumnName)
			if (columnIndex > -1) {
				this.orderedColumnIndex = columnIndex
				if (oldOrderedColumnIndex === -1) {
					this.orderStore()
				}
				return
			}
		}
		
		this.orderedColumnIndex = -1
		this.orderDirection = ''
	}

	// Resizing part
	protected updatColumnWidths() {
		let totalWidth = this.refs.head.clientWidth - getStyleAsNumber(this.refs.head, 'paddingLeft') - getStyleAsNumber(this.refs.head, 'paddingRight')
		this.cachedTotalWidth = totalWidth
		this.updatColumnWidthsWithTotalWidth(totalWidth)
	}

	// Used to adjust column widths after columns changed.
	// Many elements will be relayout after columns changed, 
	// And `updatColumnWidths` will cause force relayout.
	protected updatColumnWidthsRoughly() {
		this.updatColumnWidthsWithTotalWidth(this.cachedTotalWidth)
	}

	protected updatColumnWidthsWithTotalWidth(totalWidth: number) {
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
		
		let widths = columnWidthCalculator(widthAndFlexArray, totalWidth, this.minColumnWidth)
		this.columnWidths = widths
		this.setColumnWidths(widths)
	}

	protected setColumnWidths(widths: number[]) {
		let totalWidth = sum(widths)
		
		for (let index = 0; index < widths.length; index++) {
			let isLastColumn = index === widths.length - 1
			let percent = widths[index] / totalWidth
			let col = this.refs.colgroup.children[index] as HTMLElement

			col.style.width = percent * 100 + '%'

			if (!isLastColumn) {
				let col = this.refs.columns.children[index] as HTMLElement
				col.style.width = percent * 100 + '%'
			}
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

		let cursorMask = render(html`<div class="resizing-mask" />`, this).fragment.firstElementChild as HTMLElement
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
		let isLive = this.live || this.store instanceof AsyncStore

		if (this.repeatDir) {
			this.repeatDir.setStartIndex(index)
		}
		else if (!isLive) {
			index = Math.min(index, (this.store as Store<T>).data.length - 1)
			let row = (this.refs.table as HTMLTableElement).rows[index]
			if (row) {
				scrollToTop(row)
			}
		}
	}

	scrollToViewIndex(index: number) {
		let isLive = this.live || this.store instanceof AsyncStore

		if (this.repeatDir) {
			this.repeatDir.scrollToViewIndex(index)
		}
		else if (!isLive) {
			index = Math.min(index, (this.store as Store<T>).data.length - 1)
			let row = (this.refs.table as HTMLTableElement).rows[index]
			if (row) {
				scrollToView(row)
			}
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