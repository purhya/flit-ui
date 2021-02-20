import {css, define, Component, html, repeat, DirectiveResult, TemplateResult, toggle} from '@pucelle/flit'
import {theme} from '../style/theme'
import {add, remove} from '@pucelle/ff'
import {tooltip} from '../bindings/tooltip'


export interface ListItem<T = any> {

	/** Unique value to identify current item. */
	value?: T

	/** List item content, can be a template result. */
	text: string | TemplateResult

	/** 
	 * Text for searching, especially when `text` is a `TemplateResult` and can't do searching.
	 * Should be in lowercase type.
	 */
	searchText?: string

	/** Shows as tooltip content when mouse hover. */
	tip?: string | TemplateResult

	/** List item icon type. */
	icon?: string

	/** To render subsection list. */
	children?: ListItem<T>[]

	/** Whether current list is opened. */
	opened?: boolean
}

interface ListEvents<T> {

	/** Triggers after selected items changed. */
	select: (selected: T[]) => void

	/** Triggers after nagivated item changed. */
	navigate: (navigated: T) => void

	/** Triggers after clicking list item. */
	click: (clicked: T) => void
}


/** 
 * `<f-list>` will render data items to a list,
 * and provide single or multiple selection.
 * It shouldn't include too many levels, since it doesn't have overflow setting like `f-tree`.
 */
@define('f-list')
export class List<T, E = any> extends Component<E & ListEvents<T>> {

	static style() {
		let {mainColor, adjust, borderColor, adjustFontSize} = theme

		return css`
		:host{
			display: block;
			border-bottom: 1px solid ${borderColor.alpha(0.4)};
		}
		
		.option{
			position: relative;
			display: flex;
			padding-top: ${adjust(2)}px;
			padding-bottom: ${adjust(2)}px;
			cursor: pointer;
			border-top: 1px solid ${borderColor.alpha(0.4)};

			&:first-child{
				border-top: none;
			}

			&:hover{
				color: ${mainColor};
			}

			&.selected{
				color: ${mainColor};
			}

			&.active{
				color: ${mainColor};

				&::after{
					content: '';
					position: absolute;
					top: ${adjust(3)}px;
					bottom: ${adjust(3)}px;
					right: 0;
					width: 2px;
					background: ${mainColor.alpha(0.8)};
				}
			}
		}

		.toggle{
			display: flex;
			width: ${adjust(22)}px;
			opacity: 0.7;
		}

		.icon{
			display: flex;
			width: ${adjust(22)}px;
		}

		.text{
			flex: 1;
			min-width: 0;
			padding-right: 4px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.selected-icon{
			margin: 0 ${adjust(6)}px;
		}

		.subsection{
			padding-left: ${adjust(22)}px;
			padding-bottom: ${adjust(4)}px;
			overflow: hidden;
			font-size: ${adjustFontSize(13)}px;

			.option{
				padding-top: 0;
				padding-bottom: 0;
				border-top: none;
				line-height: ${adjust(26)}px;
			}

			.subsection{
				padding-top: 0;
			}

			.subsection:not(:last-child){
				padding-bottom: ${adjust(3)}px;
				margin-bottom: ${adjust(3)}px;
				border-bottom: 1px solid ${borderColor.alpha(0.4)};
			}

			.subsection:last-child{
				padding-bottom: 0;
				margin-bottom: 0;
			}
		}
		`
	}

	/** List type:
	 * `selection`: provide single item or multiple items selection with a checkbox icon.
	 * `navigation`: provide single item navigation with a vertical line icon.
	 * Default value is `selection`.
	 */
	type: 'selection' | 'navigation' = 'selection'

	/** 
	 * Whether each items selectable, only for type `selection`.
	 * Default value is `false`.
	 */
	selectable: boolean = false

	/** 
	 * Whether can select multiple items, only for type `selection`.
	 * Default value is `false`.
	 */
	multipleSelect: boolean = false

	/** Input data list. */
	data: ListItem<T>[] = []

	/** Indicates current select values. */
	selected: T[] = []

	/** 
	 * Unique active value for `navigation` type.
	 * If this value set when initializing, will make the associated item visible.
	 * Otherwise you can call `ensureActiveItemVisible()` to do same thing.
	 */
	active: T | null = null

	protected onCreated() {
		if (this.active) {
			this.ensureActiveItemVisible()
		}
	}

	protected render() {
		return html`${this.renderOptions(this.data)}`
	}

	protected renderOptions(items: ListItem<T>[]): DirectiveResult {
		let siblingsHaveIcon = items.some(item => item.icon)
		let siblingsHaveChildren = items.some(item => item.children)
		let options = repeat(items, item => this.renderOption(item, siblingsHaveIcon, siblingsHaveChildren))

		return options
	}

	protected renderOption(item: ListItem<T>, siblingsHaveIcon: boolean, siblingsHaveChildren: boolean) {
		let subsection = item.children && item.opened ? html`
			<div class="subsection">${this.renderOptions(item.children)}</div>
		` : null

		let tip = item.tip ? tooltip(item.tip) : null

		return html`
		<div
			class="option"
			:class=${this.renderClassName(item)}
			@click.prevent=${() => this.onClickOption(item)}
			${tip}

		>
			${item.children ? html`
				<div class='toggle' @click.stop=${() => this.toggleOpened(item)}>
					<f-icon .type=${item.opened ? 'triangle-down' : 'triangle-right'} />
				</div>
			` : siblingsHaveChildren ? html`
				<div class='toggle' />
			` : ''}

			${siblingsHaveIcon ? html`
				<div class='icon'>
					<f-icon .type=${item.icon} />
				</div>
			` : ''}
	
			<div class="text">
				${item.text}
			</div>

			${this.isSelected(item) ? html`<f-icon class="selected-icon" .type="checked" />` : ''}
		</div>

		${toggle(subsection, {properties: ['height', 'marginBottom', 'paddingBottom', 'opacity']})}
		`
	}

	protected renderClassName(item: ListItem<T>) {
		if (this.type === 'navigation') {
			if (this.active === item.value) {
				return 'active'
			}
		}
		else {
			if (this.isSelected(item)) {
				return 'selected'
			}
		}
		
		return ''
	}

	protected isSelected(item: ListItem<T>) {
		return this.selected.includes(item.value!)
	}

	protected onClickOption(item: ListItem<T>) {
		if (this.type === 'navigation') {
			this.active = item.value!
			this.emit('navigate', item.value)
		}
		else if (this.selectable) {
			if (this.multipleSelect) {
				if (this.selected.includes(item.value!)) {
					remove(this.selected, item.value)
				}
				else {
					add(this.selected, item.value)
				}
			}
			else {
				this.selected = [item.value!]
			}

			this.emit('select', this.selected)
		}
		else {
			this.emit('click', item.value)
		}
	}

	protected toggleOpened(item: ListItem<T>) {
		if (item.children) {
			item.opened = !item.opened
		}
	}

	/** Open sub list recursively to make sure active item becomes visible. */
	ensureActiveItemVisible() {
		if (this.active) {
			this.ensureActiveItemVisibleRecursively(this.data)
		}
	}

	private ensureActiveItemVisibleRecursively(items: ListItem<T>[]) {
		return items.some(item => {
			if (item.value === this.active) {
				return true
			}

			if (item.children) {
				let hasActiveChildItem = this.ensureActiveItemVisibleRecursively(item.children)
				if (hasActiveChildItem) {
					item.opened = true
				}
			}

			return item.opened
		})
	}
}