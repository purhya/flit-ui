import {define, Component, css, getComponent} from '@pucelle/flit'


/** 
 * Note these components only used to align, not for responsive layout.
 * Will extend later when needed.
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

	columnCount: number = 24
	gutter: number = 0
	justify: 'start' | 'end' = 'start'

	protected cols: ColLayout[] = []

	protected onUpdated() {
		this.el.style.justifyContent = this.justify === 'start' ? '' : this.justify === 'end' ? 'flex-end' : this.justify
	}

	register(col: ColLayout) {
		this.cols.push(col)
	}

	getLeftColCount(col: ColLayout) {
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

	isFirstCol(col: ColLayout) {
		return col === this.cols[0]
	}
}


@define('f-col')
export class ColLayout extends Component {

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
		let leftColCount = this.row.getLeftColCount(this)
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