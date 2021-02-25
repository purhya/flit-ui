import {Component, css, define, html, TemplateResult, liveRepeat, repeat, onRenderComplete, LiveRepeatDirective, DirectiveResult, renderComplete, refDirective, Directive, ContextualTransitionOptions, observeGetting, liveAsyncRepeat, LiveAsyncRepeatDirective} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Store} from '../store/store'
import {getScrollbarWidth, watchLayout, scrollToTop, scrollToView, locateFirstVisibleIndex} from '@pucelle/ff'
import {ColumnWidthResizer} from './helpers/column-width-resizer'
import {RemoteStore} from '../store/remote-store'


interface TableEvents<T> {

	/** After column order changed. */
	orderChange: (columnName: string, orderDirection: 'asc' | 'desc' | '') => void

	/** After column width resized. */
	columnResize: (columnWidths: number[]) => void

	/** Triggers after live data updated in live mode. */
	liveDataUpdated: (data: T[], index: number, scrollDirection: 'up' | 'down') => void

	/** Triggers after live data rendered in live mode. */
	liveDataRendered: (data: T[], index: number, scrollDirection: 'up' | 'down') => void
}


export interface TableColumn<T = any> {

	/** 
	 * Give name to each column can help to remember last ordered columns, and restore it from storage.
	 * If not provided, uses `orderBy` instead.
	 */
	name?: string

	/** Column title. */
	title: string

	/** Column basis width. */
	width?: number

	/** 
	 * Column flex width, just like flex grow and shrink.
	 * Can be a number, or a pair of number values `[extendFlex, shrinkFlex]`.
	 */
	flex?: number | number[]

	/** 
	 * Returns the value used for ordering, must be specified as a string type key when using `RemoteStore`.
	 * Implies column is not orderable if not configured.
	 */
	orderBy?: ((item: T) => string | number) | string

	/** If specified as `true`, will using `desc` ordering as default. */
	descFirst?: boolean

	/** Returns cell text content string or html`<td>...</td>`. */
	render?: (this: Table<T>, item: T, index: number) => TemplateResult | string | number

	/** 
	 * Specifies cell content alignment.
	 * Note if you choose to overwrite `renderRow`, this option gona not work any more,
	 * you must specify `text-align` for cells manually.
	 */
	align?: 'left' | 'right' | 'center'
}


/** 
 * `<f-table>` works just like a `<table>`, it provides data view and per row or per column operation.
 * `store` provides data service and also data filtering and data ordering.
 * `columns` can config data column mode for table view.
 */
@define('f-table')
export class Table<T = any, E = any, S extends Store<T> | RemoteStore<T> = any> extends Component<TableEvents<T> & E> {

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
			border-bottom-color: #888;
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
			margin-right: ${adjust(-17)}px;
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

		.table{
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

	/** 
	 * If `true`, will only render the rows that in viewport.
	 * Default value is `false`.
	 * Implies to be `true` when uses `RemoteStore`.
	 */
	live: boolean = false

	/**
	 * Item count in one page that should be rendered each time.
	 * Works only when `live` is `true`.
	 * Default value is `50`, set it smaller if don't need to render so much.
	 * Suggested to be large enough to cover table height, but not covers more than 2x of table height.
	 * Otherwise it should provide more than 120px scrolling buffer height more than table height.
	 */
	renderCount: number = 50

	/** If what you are rendering is very complex and can't complete in one animation frame, set this to `true`. */
	preRendering: boolean = false

	/** 
	 * Whether each column is resizeable.
	 * Default value is `false`.
	 */
	resizable: boolean = false

	/** Store to cache data. */
	store!: S

	/** Column configuration, you must set this! */
	columns!: TableColumn<T>[]

	/** Minimum column width in pixels. */
	minColumnWidth: number = 64

	/** Transition for each row after created or removed. */
	transition: ContextualTransitionOptions | undefined = undefined

	/** Column name to indicate which column is in order. */
	protected orderName: string | null = null

	/** Current column order direction. */
	protected orderDirection: 'asc' | 'desc' | '' = ''

	/** Repeat directive inside, only available when `live`. */
	protected repeatDir: LiveRepeatDirective<T> | LiveAsyncRepeatDirective<T> | null = null

	/** Resize column widths when `resizable` is `true`. */
	protected resizer: ColumnWidthResizer | null = null

	refs!: {
		/** Head container. */
		head: HTMLTableSectionElement

		/** Column container inside head. */
		columnContainer: HTMLElement

		/** Table element. */
		table: HTMLTableElement

		/** Colgroup inside table. */
		colgroup: HTMLTableColElement
	}

	protected onCreated() {
		this.store.on('dataChange', this.onStoreDataChange, this)
	}

	protected onStoreDataChange() {
		if (this.repeatDir instanceof LiveAsyncRepeatDirective) {
			this.repeatDir.reload()
		}
	}

	render(): TemplateResult {
		return html`
		<div class="head" :ref="head">
			<div class="columns" :ref="columnContainer">
				${this.renderColumns()}
			</div>
		</div>

		<div class="body">
			<table class="table" :ref="table">
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

	protected renderColumns(): TemplateResult[] {
		return this.columns.map((column, index) => {
			let orderName = column.name || String(column.orderBy)
			let isOrdered = this.orderName === orderName
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
							<f-icon .type=${this.getOrderDirectionIcon(orderName)} />
						</div>`
					: ''}
				</div>

				${this.resizable && index < this.columns.length - 1 ? html`
					<div class="resizer" @mousedown=${(e: MouseEvent) => this.resizer?.onStartResize(e, index)} />`
				: ''}
			</div>`
		})
	}

	protected renderRows(): DirectiveResult {
		if (this.store instanceof RemoteStore) {
			return refDirective(liveAsyncRepeat(
				this.store.getLiveAsyncRepeatDirectiveOptions(),
				this.renderRow.bind(this),
				{
					renderCount: this.renderCount,
					preRendering: this.preRendering,
				},
				this.transition,
			), this.refDirective.bind(this))
		}
		else if (this.live) {
			return refDirective(liveRepeat(
				(this.store as Store).currentData,
				this.renderRow.bind(this),
				{
					renderCount: this.renderCount,
					preRendering: this.preRendering,
				},
				this.transition
			), this.refDirective.bind(this))
		}
		else {
			return repeat(
				(this.store as Store).currentData,
				this.renderRow.bind(this),
				this.transition
			)
		}
	}

	/** 
	 * How to render each row.
	 * You should define a new component and overwrite this method if want to do more customized rendering.
	 */
	renderRow(item: T | null, index: number) {
		let tds = this.columns.map((column) => {
			let result = item && column.render ? column.render.call(this, item, index) : '\xa0'
			return html`<td :style.text-align=${column.align || ''}>${result}</td>`
		})

		return html`<tr>${tds}</tr>`
	}

	/** Reference repeat directive, only for once. */
	protected refDirective(dir: Directive) {
		this.repeatDir = dir as LiveRepeatDirective<T>
		this.repeatDir.on('liveDataUpdated', this.onLiveDataUpdated, this)
		this.repeatDir.on('liveDataRendered', this.onLiveDataRendered, this)
	}

	/** Triggers `liveDataUpdated` event. */
	protected onLiveDataUpdated(data: T[], index: number, scrollDirection: 'up' | 'down') {
		this.emit('liveDataUpdated', data, index, scrollDirection)
	}

	/** Triggers `liveDataRendered` event. */
	protected onLiveDataRendered(data: T[], index: number, scrollDirection: 'up' | 'down') {
		this.emit('liveDataRendered', data, index, scrollDirection)
	}

	/** Get order icon to indicate order direction. */
	protected getOrderDirectionIcon(orderName: string): string {
		if (orderName === this.orderName) {
			if (this.orderDirection === 'asc') {
				return 'order-asc'
			}
			else if (this.orderDirection === 'desc') {
				return 'order-desc'
			}
		}

		return 'order-default'
	}

	/** Do column ordering for column with specified index. */
	protected doOrdering(e: MouseEvent, index: number) {
		// Clicked column resizer.
		if ((e.target as HTMLElement).closest(this.scopeClassName('.resizer'))) {
			return
		}

		let columns = this.columns
		let column = columns[index]

		// Column is not orderable.
		let canOrder = column.orderBy
		if (!canOrder) {
			return
		}

		let direction: 'asc' | 'desc' | '' = ''
		let descFirst = column.descFirst
		let orderName = column.name || String(column.orderBy)

		if (orderName === this.orderName) {
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

		let columnName = column.name || (typeof column.orderBy === 'string' ? column.orderBy : null)
		this.setOrder(columnName, direction)
	}

	onReady() {
		if (this.resizable) {
			this.resizer = new ColumnWidthResizer(
				this.refs.head,
				this.refs.columnContainer,
				this.refs.colgroup,
				this.columns,
				this.minColumnWidth,
				this.scopeClassName('resizing-mask')
			)

			this.watch(() => observeGetting(this, 'columns'), async (columns: TableColumn[]) => {
				this.resizer?.setColumns(columns)
	
				// Here we need it render new `<col>`s.
				await renderComplete()
				this.resizer?.updatColumnWidthsPrecisely()
			})
			
			onRenderComplete(() => {
				this.resizer?.updatColumnWidthsPrecisely()
			})
		}
	}

	onConnected() {
		onRenderComplete(() => {
			let unwatchSize = watchLayout(this.el, 'size', () => this.resizer?.updatColumnWidthsPrecisely())
			this.once('disconnected', unwatchSize)
		})
	}

	/** Order specified column by column name. */
	setOrder(columnName: string | null, direction: 'asc' | 'desc' | '' = '') {
		this.orderName = columnName
		this.orderDirection = direction

		let column = this.columns?.find(col => col.name === columnName)
		if (column) {
			this.applyOrder(column, direction)
		} 
		else {
			this.watchOnce(() => this.columns, columns => {
				let column = columns.find(col => col.name === columnName)
				if (column) {
					this.applyOrder(column, direction)
				}
			})
		}
	}

	/** Clear column order. */
	clearOrder() {
		this.orderName = null
		this.orderDirection = ''
		this.store.setOrder(null)
	}

	/** Order specified column with specified direction by column name. */
	protected applyOrder(column: TableColumn, direction: 'asc' | 'desc' | '' = '') {
		if (direction === '') {
			this.store.setOrder(null)
		}
		else {
			this.store.setOrder(column.orderBy as any, direction)
		}

		this.emit('orderChange', this.orderName, direction)
	}

	/** Column name to indicate which column is in order. */
	getOrderName(): string | null {
		return this.orderName
	}

	/** Current column order direction. */
	getOrderDirection(): '' | 'asc' | 'desc' {
		return this.orderDirection
	}

	/** Get start index of live data in live mode, otherwise returns `0`. */
	getStartIndex() {
		return this.repeatDir?.getStartIndex() ?? 0
	}

	/** Get end index of live data in live mode, otherwise returns data length. */
	getEndIndex() {
		return this.repeatDir?.getEndIndex() ?? (this.store as Store).fullData.length
	}

	/** Set `startIndex`, and the item in this index will be at the top start position of the viewport. */
	setStartIndex(index: number) {
		if (!this.__updated) {
			this.once('updated', () => {
				this.setStartIndex(index)
			})
		}
		else if (this.repeatDir) {
			this.repeatDir.setStartIndex(index)
		}
		else {
			index = Math.min(index, (this.store as Store).fullData.length - 1)
			let row = this.refs.table.rows[index]
			if (row) {
				scrollToTop(row)
			}
		}
	}

	/** Adjust `startIndex` and scroll position to make item in the specified index becomes visible if it's not. */
	scrollToViewIndex(index: number) {
		if (!this.__updated) {
			this.once('updated', () => {
				this.setStartIndex(index)
			})
		}
		else if (this.repeatDir) {
			this.repeatDir.scrollToViewIndex(index)
		}
		else {
			index = Math.min(index, (this.store as Store).fullData.length - 1)
			let row = this.refs.table.rows[index]
			if (row) {
				scrollToView(row)
			}
		}
	}

	/** 
	 * Get the first visible index of element.
	 * Must after first time rendered.
	 */
	getFirstVisibleIndex() {
		if (this.repeatDir) {
			return this.repeatDir.getFirstVisibleIndex()
		}
		else {
			return locateFirstVisibleIndex(this.refs.table, this.refs.table.rows)
		}
	}
	
	/** Get currently rendered data item at specified index. */
	getRenderedItem(index: number): T | null {
		let isRendered = index >= this.getStartIndex() && index < this.getEndIndex()
		if (isRendered) {
			if (this.store instanceof RemoteStore) {
				return this.store.getImmediateData(index, index + 1)[0]
			}
			else {
				return (this.store as Store).currentData[index]
			}
		}
		else {
			return null
		}
	}

	/** 
	 * Get rendered row at specified index.
	 * Please makesure rendering is completed.
	 */
	getRenderedRow(index: number): HTMLTableRowElement | null {
		return this.refs.table.rows[index - this.getStartIndex()] || null
	}
}
