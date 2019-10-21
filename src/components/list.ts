import {css, define, Component, html, repeat, DirectiveResult, play, TemplateResult} from '@pucelle/flit'
import {theme} from '../style/theme'
import {add, remove} from '@pucelle/ff'


export interface ListItem<T = any> {
	value?: T

	/** Should not set background-color if is a TemplateResult. */
	text: string | number | TemplateResult

	icon?: string

	/** To render subsection. */
	children?: ListItem<T>[]

	/** Note that the List component will change this property just in this object. */
	opened?: boolean
}

export interface ListEvents<T> {
	select: (selected: T[]) => void
	navigate: (navigated: T) => void
	click: (clicked: T) => void
}


/** List shouldn't have many levels, it doesn't have overflow setting like Tree. */
@define('f-list')
export class List<T, E = any> extends Component<E & ListEvents<T>> {

	static style() {
		let {mainColor, adjust, borderColor} = theme

		return css`
		:host{
			display: block;
		}
		
		.option{
			position: relative;
			display: flex;
			padding-top: ${adjust(2)}px;
			padding-bottom: ${adjust(2)}px;
			cursor: pointer;
			border-bottom: 1px solid ${borderColor.alpha(0.4)};

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
					width: 1px;
					background: ${mainColor.alpha(0.5)};
				}
			}
		}

		.toggle{
			display: flex;
			width: ${adjust(23)}px;
			opacity: 0.6;
		}

		.icon{
			display: flex;
			width: ${adjust(23)}px;
		}

		.text{
			flex: 1;
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.selected-icon{
			margin: 0 ${adjust(6)}px;
		}

		.subsection{
			padding-left: ${adjust(23)}px;
			overflow: hidden;
		}
		`
	}

	type: 'selection' | 'navigation' = 'selection'
	selectable: boolean = false
	multipleSelect: boolean = false
	data: ListItem<T>[] = []
	selected: T[] = []
	active: T | null = null

	protected render() {
		return this.renderDataOrChildren(this.data)
	}

	protected renderDataOrChildren(items: ListItem<T>[]): DirectiveResult {
		let hasIcon = items.some(item => item.icon)
		let hasChildren = items.some(item => item.children)
		let options = repeat(items, item => this.renderOption(item, hasIcon, hasChildren))

		return options
	}

	protected renderOption(item: ListItem<T>, hasIcon: boolean, hasChildren: boolean) {
		let subsection = item.children && item.opened ? html`
			<div class="subsection">${this.renderDataOrChildren(item.children)}</div>
		` : null

		return html`
		<div
			class="option"
			:class=${this.renderClassName(item)}
			@click.prevent=${() => this.onClickOption(item)}
		>
			${hasChildren ? html`
				<div class='toggle' @click=${() => this.toggle(item)}>
					<f-icon .type=${item.opened ? 'trangle-down' : 'trangle-right'} />
				</div>
			` : ''}

			${hasIcon ? html`
				<div class='icon'>
					<f-icon .type=${item.icon} />
				</div>
			` : ''}
	
			<div class="text">
				${item.text}
			</div>

			${this.isSelected(item) ? html`<f-icon class="selected-icon" .type="checked" />` : ''}
		</div>

		${play(subsection, {transition: {properties: ['height', 'opacity']}})}
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

	protected toggle(item: ListItem<T>) {
		if (item.children) {
			item.opened = !item.opened
		}
	}
}