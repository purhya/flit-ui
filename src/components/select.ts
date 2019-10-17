import {css, html, renderComplete, repeat, define, TemplateResult} from '@pucelle/flit'
import {theme} from '../style/theme'
import {remove, scrollToTop, getScrollDirection} from '@pucelle/ff'
import {Dropdown} from './dropdown'


export interface SelectEvents<T> {
	change: (value: T) => void
}


@define('f-select')
export class Select<T extends unknown = unknown, E = any> extends Dropdown<E & SelectEvents<T>> {
	
	static style() {
		let {mainColor, lineHeight, adjustByLineHeight: lh, borderColor, layerShadowBlurRadius, backgroundColor, layerBackgroundColor, layerShadowColor} = theme

		return css`
		:host{
			display: inline-flex;
			vertical-align: top;
			width: 150px;
			height: ${lineHeight}px;
			background: ${backgroundColor.highlight(5)};
			line-height: ${lineHeight}px;
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

		.icon{
			margin-left: auto;
			margin-right: 4px;
		}
	
		.input{
			flex: 1;
			min-width: 0;
			padding: 0 0 0 ${lh(8)}px;
			height: ${lineHeight}px;
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
	
		.popup{
			padding: 0;
			border-radius: 0;
			filter: none;
			box-shadow: 0 1px ${layerShadowBlurRadius}px ${layerShadowColor};
		}
	
		.option{
			display: flex;
			padding: 0 8px;
			cursor: pointer;

			&:not(:last-child){
				box-shadow: inset 0 -1px 0 0 ${layerBackgroundColor};	// Add a white line as spliter for adjacent selected items.
			}

			&:hover{
				background: ${layerBackgroundColor.highlight(5)};

				&.selected{
					background: ${mainColor.alpha(0.15)};
				}
			}

			&.selected{
				color: ${mainColor};
				background: ${mainColor.alpha(0.1)};
			}
		}

		.option-content{
			flex: 1;
			min-width: 0;
		}

		.selected-icon{
			margin-right: -4px;
		}
		`.extends(super.style())
	}

	trigger: 'click' | 'contextmenu' = 'click'
	trangle: boolean = false
	alignMargin: number | number[] = 0
	data: Iterable<[T, string | number]> = []
	value: T | null = null
	multiple: boolean = false
	searchable: boolean = false
	ordered: boolean = false
	placeholder: string = ''

	protected inputed: string = ''
	protected editing: boolean = false

	protected render() {
		return html`
		<template :class.not-inputable=${!this.searchable}>
			${this.renderInput()}
		</template>
		`.extends(super.render())
	}

	protected renderInput(): TemplateResult | string | number {
		return html`
		<input type="text"
			class="input"
			:ref="input"
			.value=${this.editing ? this.inputed : this.renderCurrentDisplay()}
			.placeholder=${this.placeholder}
			?readonly=${!this.editing}
			@click=${this.onClick}
			@input=${this.onInput}
		>
		`
	}

	protected renderPopupContent() {
		let data = this.getOptionData()
		let list = repeat(data, ([key, display]) => this.renderOption(key, display))

		return html`
		<f-popup
			class="popup"
			:ref="popup"
			.trangle="false"
		>
			<ul class="list" :ref="list">
				${list}
			</ul>
		</f-popup>
		`
	}

	protected renderOption(key: T, display: string | number) {
		let selected = this.isSelected(key)

		return html`
		<li
			class="option"
			:class.selected=${selected}
			@click.prevent=${() => this.select(key)}
			style=${this.renderOptionStyle(key)}
		>
			<div class="option-content">
				${this.renderOptionContent(key, display)}
			</div>
			${selected ? html`<f-icon class="selected-icon" .type="checked" />` : ''}
		</li>
		`
	}

	// Used to render like color select
	protected renderOptionStyle(_key: T) {
		return ''
	}

	protected renderCurrentDisplay(): string | number {
		if (this.multiple) {
			let displays: (string | number)[] = []

			for (let [key, display] of this.data) {
				if ((this.value as any[]).includes(key)) {
					displays.push(this.renderOptionDisplay(key, display))
				}
			}

			return displays.join('; ')
		}
		else {
			for (let [key, display] of this.data) {
				if (this.value == key) {
					return this.renderOptionDisplay(key, display)
				}
			}

			return ''
		}
	}

	protected renderOptionDisplay(_key: T, display: string | number): string | number {
		return display
	}

	protected renderOptionContent(key: T, display: string | number): TemplateResult | string | number {
		return this.renderOptionDisplay(key, display)
	}

	protected getOptionData(): Iterable<[T, string | number]> {
		if (this.searchable && this.inputed) {
			let lowerSearchWord = this.inputed.toLowerCase()
			let filteredData: [T, string | number][] = []

			for (let item of this.data) {
				if (String(item[1]).includes(lowerSearchWord)) {
					filteredData.push(item)
				}
			}

			return filteredData
		}
		else {
			return this.data
		}
	}

	protected isSelected(key: T) {
		if (this.multiple) {
			return (this.value as T[]).includes(key)
		}
		else {
			return this.value == key
		}
	}
	
	protected onCreated() {
		this.initValue()
		this.initEditing()
	}

	protected initValue() {
		if (this.multiple && !Array.isArray(this.value)) {
			if (this.value === null || this.value === undefined) {
				this.value = [] as T
			}
			else {
				this.value = [this.value] as T
			}
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

	protected select(key: T) {
		if (this.multiple) {
			if ((this.value as T[]).includes(key)) {
				remove(this.value as T[], key)
			}
			else {
				(this.value as T[]).push(key)
				
				if (this.ordered) {
					let keys = [...this.data].map(([key]) => key)
					;(this.value as T[]).sort((key1, key2) => {
						return keys.indexOf(key1) - keys.indexOf(key2)
					})
				}
			}
		}
		else {
			this.value = key
			this.hidePopup()
		}
		
		this.emit('change', this.value as T)
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
