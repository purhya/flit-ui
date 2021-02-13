import {define, Component, css, getComponent} from '@pucelle/flit'


/** 
 * `<f-row>` used to do grid layout, can contain several `<f-col>`.
 * If available width changes, count of `<f-col>` in one line may be adjusted.
 */
@define('f-row')
export class RowLayout extends Component {

	static style() {
		return css`
		:host{
			display: flex;
			flex-wrap: wrap;
		}
		`
	}

	protected readonly cols: ColLayout[] = []

	/** Column count in one line. */
	columnCount: number = 24

	/** Gutter betweens columns in pixels. */
	gutter: number = 0

	/** Column alignment starts from. */
	justify: 'start' | 'end' = 'start'

	protected onReady() {
		this.watchImmediately(() => this.justify, (justify) => {
			this.el.style.justifyContent = justify === 'start' ? '' : justify === 'end' ? 'flex-end' : justify
		})
	}

	/** Register child `<f-col>`. */
	register(col: ColLayout) {
		this.cols.push(col)
	}
	
	/** Returns whether `col` is the first column. */
	isFirstCol(col: ColLayout) {
		return col === this.cols[0]
	}

	/** Get column count in left. */
	getLeftColumnCount(col: ColLayout) {
		let {columnCount} = this
		let count = 0

		for (let c of this.cols) {
			if (c === col) {
				break
			}

			let span = Math.min(c.span, columnCount)
			let offset = c.offset % columnCount

			count += span + offset
		}

		return count
	}
}


/** `<f-col>` will be contained inside a `<f-row>` to do grid layout. */
@define('f-col')
export class ColLayout extends Component {

	/** Column span, default value is  */
	span: number = 1
	offset: number = 0
	row!: RowLayout

	protected onCreated() {
		let row = getComponent(this.el.parentElement!) as RowLayout
		if (!(row instanceof RowLayout)) {
			throw new Error(`"<f-col>" must be included in a "<f-row>"`)
		}

		row.register(this)
		this.row = row
	}

	protected onUpdated() {
		this.el.style.marginLeft = this.getMarginLeft()
		this.el.style.width = this.getWidth()
	}

	protected getMarginLeft() {
		let leftColCount = this.row.getLeftColumnCount(this)
		let {columnCount, gutter} = this.row
		let offset = this.offset % columnCount
		let isFirstCol = (leftColCount + offset) % columnCount === 0

		if (offset > 0) {
			return (offset / gutter) * 100 + '%'
		}
		else {
			return isFirstCol ? '0' : gutter + 'px'
		}
	}

	protected getWidth() {
		let {gutter, columnCount} = this.row
		let span = Math.min(this.span, columnCount)
		let percent = span / columnCount
		let gutterPXs = gutter * (span - 1 - (columnCount - 1) * percent)

		return `calc(${percent * 100}% - ${-gutterPXs}px)`
	}
}