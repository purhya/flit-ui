import {css, html, renderComplete, define, TemplateResult} from '@pucelle/flit'
import {theme} from '../style/theme'
import {scrollToTop, getScrollDirection} from '@pucelle/ff'
import {Dropdown} from './dropdown'
import {ListItem} from './list'


export interface SelectEvents<T> {
	change: (value: T | T[]) => void
}


@define('f-select')
export class Select<T = any, E = any> extends Dropdown<E & SelectEvents<T>> {
	
	static style() {
		let {mainColor, adjust, borderColor, popupShadowBlurRadius, backgroundColor, popupShadowColor} = theme

		return css`
		:host{
			display: inline-flex;
			vertical-align: top;
			width: ${adjust(200)}px;
			height: ${adjust(28)}px;
			background: ${backgroundColor.toMiddle(5)};
			line-height: ${adjust(28)}px;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;
			box-shadow: inset 0 -1px 0 0 ${borderColor};

			&:hover, &.opened{
				box-shadow: inset 0 -1px 0 0 ${mainColor};

				.icon{
					color: ${mainColor};
				}
			}

			&.not-inputable input{
				cursor: pointer;
			}
		}

		.down-icon{
			margin-left: auto;
			margin-right: 4px;
		}
	
		.display, .input{
			flex: 1;
			min-width: 0;
			padding: 0 0 0 ${adjust(8)}px;
			height: ${adjust(28)}px;
			border: none;
			background: transparent;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			box-shadow: none;

			&:focus{
				box-shadow: none;
			}
		}

		.placeholder{
			opacity: 0.5;
		}
	
		.popup{
			padding: 0;
			border-radius: 0;
			filter: none;
			box-shadow: 0 1px ${popupShadowBlurRadius}px ${popupShadowColor};
		}
	
		.list .option__f-list{
			padding-left: ${adjust(8)}px;
			border-bottom: none;
		}

		.selected-icon{
			margin-right: -4px;
		}
		`.extends(super.style())
	}

	trigger: 'click' | 'contextmenu' = 'click'
	trangle: boolean = false
	alignMargin: number | number[] = 0
	data: Iterable<ListItem<T>> = []
	value: T | T[] | null = null
	multiple: boolean = false
	searchable: boolean = false
	ordered: boolean = false
	placeholder: string = ''

	protected inputed: string = ''
	protected editing: boolean = false

	protected render() {
		return html`
		<template :class.not-inputable=${!this.searchable}>
			${this.renderDisplayOrInput()}
		</template>
		`.extends(super.render())
	}

	protected renderDisplayOrInput(): TemplateResult | string | number {
		if (this.editing) {
			return html`
			<input type="text"
				class="input"
				:ref="input"
				.value=${this.inputed}
				.placeholder=${this.placeholder}
				?readonly=${!this.editing}
				@click=${this.onClick}
				@input=${this.onInput}
			>
			`
		}
		else {
			let text = this.renderCurrentDisplay()

			return html`
			<div
				class="input"
				:class.placeholder=${!text}
				@click=${this.onClick}
			>
				${text || this.placeholder}
			</div>
			`
		}
	}

	protected renderPopup() {
		let data = this.getOptionData()

		return html`
		<f-popup
			class="popup"
			:ref="popup"
			.trangle="false"
		>
			<f-list class="list"
				.type="selection"
				.selectable
				.data=${data}
				.multipleSelect=${this.multiple}
				.selected=${this.multiple ? this.value : [this.value]}
				@select=${this.select}
			/>
		</f-popup>
		`
	}

	protected renderCurrentDisplay(): string | number | TemplateResult {
		if (this.multiple) {
			let displays: (string | number)[] = []

			for (let {value, text} of this.data) {
				if ((this.value! as T[]).includes(value!)) {
					// Here may render `<>` tags as value into `input` element
					displays.push(text.toString())
				}
			}

			return displays.join('; ')
		}
		else {
			for (let {value, text} of this.data) {
				if (this.value === value) {
					return text
				}
			}

			return ''
		}
	}

	protected getOptionData(): Iterable<ListItem<T>> {
		if (this.searchable && this.inputed) {
			let lowerSearchWord = this.inputed.toLowerCase()
			let filteredData: ListItem<T>[] = []

			for (let item of this.data) {
				if (String(item.value).includes(lowerSearchWord)) {
					filteredData.push(item)
				}
			}

			return filteredData
		}
		else {
			return this.data
		}
	}
	
	protected onCreated() {
		this.initValue()
		this.initEditing()
	}

	protected initValue() {
		if (this.multiple && !Array.isArray(this.value)) {
			this.value = []
		}
	}

	protected initEditing() {
		if (this.searchable) {
			this.watch(() => this.opened, (opened) => {
				if (!opened && this.editing) {
					this.endEditing()
				}
			})
		}
	}

	protected onClick() {
		if (this.searchable && !this.editing) {
			this.startEditing()
		}
	}

	protected select(values: T[]) {
		if (this.multiple) {
			this.value = values
		}
		else {
			this.value = values[0]
			this.hidePopup()
		}
		
		this.emit('change', this.value!)
	}

	protected async startEditing() {
		this.editing = true
		this.inputed = ''

		await renderComplete()
		this.refs.input.focus()
	}

	protected endEditing() {
		this.editing = false
	}

	async onPopupOpened() {
		await renderComplete()

		if (this.editing && this.refs.input) {
			this.refs.input.focus()
		}

		// We should not ref popup el by `:ref`, or it will can't be released.
		if (this.popupBinding && this.popupBinding.popup) {
			let popupEl = this.popupBinding.popup.el
			popupEl.style.minWidth = String(this.el.offsetWidth) + 'px'

			let el = popupEl.querySelector(this.scopeClassName('.selected')) as HTMLElement | null
			if (el && getScrollDirection(this.refs.list) === 'y') {
				scrollToTop(el)
			}
		}
	}

	protected onInput() {
		this.inputed = (this.refs.input as HTMLInputElement).value
		this.showPopup()
	}
}
