import {css, define, Component, html, repeat} from '@pucelle/flit'
import {theme} from '../style/theme'
import {add, remove} from '@pucelle/ff'


export interface ListItem<T> {
	value: T
	text: string | number
	style?: string
	icon?: string
	children?: ListItem<T>[]
	toggleActive?: boolean
}

export interface ListEvents<T> {
	select: (selected: T[]) => void
	navigate: (navigated: T) => void
	click: (clicked: T) => void
}


@define('f-list')
export class List<T, E = any> extends Component<E & ListEvents<T>> {

	static style() {
		let {mainColor, adjustByLineHeight: lh, borderColor} = theme

		return css`
		:host{
			display: block;
		}
		
		.option{
			position: relative;
			display: flex;
			padding: ${lh(3)}px 0;
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
					top: ${lh(3)}px;
					bottom: ${lh(3)}px;
					right: 0;
					width: 1px;
					background: ${mainColor.alpha(0.5)};
				}
			}
		}

		.icon{
			margin-right: 8px;
		}

		.text{
			flex: 1;
			min-width: 0;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.selected-icon{
			margin: 0 ${lh(6)}px;
		}
		`
	}

	mode: 'selection' | 'navigation' = 'selection'
	selectable: boolean = true
	multipleSelect: boolean = false
	data: Iterable<ListItem<T>> = []
	selected: T[] = []
	active: T | null = null

	protected render() {
		let options = repeat(this.data, item => this.renderOption(item))

		return html`
			${options}
		`
	}

	protected renderOption(item: ListItem<T>) {
		let isNavigationMode = this.mode === 'navigation'

		let className = isNavigationMode
			? this.active === item.value ? 'active' : ''
			: this.isSelected(item) ? 'selected' : ''

		return html`
		<div
			class="option"
			style="${item.style || ''}"
			class=${className}
			@click.prevent=${() => this.onClickOption(item)}
		>
			${item.icon !== undefined ? html`<f-icon class="icon" .type=${item.icon} />` : ''}
	
			<div class="text">
				${item.text}
			</div>

			${className === 'selected' ? html`<f-icon class="selected-icon" .type="checked" />` : ''}
		</div>
		`
	}

	protected isSelected(item: ListItem<T>) {
		return this.selected.includes(item.value)
	}

	protected onClickOption(item: ListItem<T>) {
		if (this.mode === 'navigation') {
			this.active = item.value
			this.emit('navigate', item.value)
		}
		else if (this.selectable) {
			if (this.multipleSelect) {
				if (this.selected.includes(item.value)) {
					remove(this.selected, item.value)
				}
				else {
					add(this.selected, item.value)
				}
			}
			else {
				this.selected = [item.value]
			}

			this.emit('select', this.selected)
		}
		else {
			this.emit('click', item.value)
		}
	}
}