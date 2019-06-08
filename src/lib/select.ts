import {css, html, renderComplete, cache, repeat, define} from 'flit'
import {theme} from './theme'
import {Popup} from './popup'
import {Color} from './color'
import {remove, scrollToView, scrollToTop} from 'ff'


export interface SelectEvents<T> {
	change: (value: T) => void
}


@define('f-select')
export class Select<T extends unknown = unknown, Events = any> extends Popup<Events & SelectEvents<T>> {
	
	static style() {
		let {mainColor, lh, textColor} = theme

		return css`
		:host{
			display: inline-flex;
			vertical-align: top;
			border-bottom: 1px solid ${textColor.lighten(30)};
			width: 150px;
			height: ${lh(30)}px;
			background: #e5e5e5;
			line-height: ${lh(30)}px;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;

			&:hover, &.opened{
				border-color: ${mainColor};

				.icon{
					color: ${mainColor};
				}
			}

			&.not-inputable input{
				cursor: inherit;
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
			height: ${lh(30)}px;
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
	
		.layer{
			border-radius: 0;
			filter: none;
			box-shadow: 0 0 6px ${new Color('#000').alpha(0.2)};
		}
	
		.list{
			overflow-y: auto;
			max-height: 100%;
		}

		.item{
			display: flex;
			padding: 0 8px;
			cursor: pointer;

			&:not(:last-child){
				box-shadow: inset 0 -1px 0 0 #fff;	// Add a white line as spliter for adjacent selected items.
			}

			&.hover{
				background: #eee;

				&.selected{
					background: ${mainColor.alpha(0.15)};
				}
			}

			&.selected{
				color: ${mainColor};
				background: ${mainColor.alpha(0.1)};
			}
		}

		.text{
			flex: 1;
			min-width: 0;
		}

		.selected-icon{
			margin-right: -4px;
		}
	`}

	static properties = ['trigger', 'icon', 'value', 'multiple', 'searchable', 'ordered']

	trigger: 'hover' | 'click' | 'focus' | 'contextmenu' = 'click'
	alignPosition: string = 'b'
	alignMargin: number | number[] = 0
	hasTrangle: boolean = false

	icon: string = 'down'
	data: Iterable<[T, string | number]> = []
	value: T | null = null
	multiple: boolean = false
	searchable: boolean = false
	ordered: boolean = false

	protected inputed: string = ''
	protected editing: boolean = false
	protected hoverAt: T | null = null

	protected render() {
		return html`
		<template
			:class.opened=${this.opened}
			:class.not-inputable=${!this.searchable}
		>
			<input type="text"
				class="input"
				:ref="input"
				.value=${this.editing ? this.inputed : this.renderCurrentDisplay()}
				?readonly=${!this.editing}
				@click=${this.onClick}
				@input=${this.onInput}
			>
			${this.icon && !this.editing ? html`<f-icon class="icon" .type="${this.icon}" />` : ''}
			${cache(this.opened ? this.renderLayer() : '', {transition: this.transition, enterAtStart: true})}
		</template>
	`}

	protected renderLayer() {
		let data = this.getMaySuggestedData()
		let listPart = repeat(data, ([key, display]) => this.renderOption(key, display))

		return html`
		<f-layer
			class="layer"
			:ref="layer"
			.popup=${this}
			.herizontal=${false}
			.trangle=${false}
		>
			<ul class="list">
			${listPart}
			</ul>
		</f-layer>
	`}

	protected renderOption(key: T, display: string | number) {
		let selected = this.isSelected(key)

		return html`
		<li
			class="item"
			:class.selected=${selected}
			:class.hover=${this.hoverAt !== null && this.hoverAt === key}
			@click.prevent=${() => this.select(key)}
			@mouseenter=${() => this.onMouseEnter(key)}
			style=${this.renderOptionStyle(key)}
		>
			<span class="text">${this.renderOptionDisplay(key, display)}</span>
			${selected ? html`<f-icon class="selected-icon" type="selected" />` : ''}
		</li>
	`}

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

	// Used to render like color select
	protected renderOptionStyle(_key: T) {
		return ''
	}

	protected renderOptionDisplay(_key: T, display: string | number): string | number {
		return display
	}

	protected getMaySuggestedData(): Iterable<[T, string | number]> {
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
			this.hideLayer()
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

	async showLayer() {
		this.hoverAt = null
		await super.showLayer()

		if (this.editing && this.refs.input) {
			this.refs.input.focus()
		}

		let el = this.refs.layer.querySelector(this.scopeClassName('.selected')) as HTMLElement | null
		if (el) {
			scrollToTop(el)
		}
	}

	protected async alignLayer() {
		this.refs.layer.style.minWidth = String(this.el.offsetWidth) + 'px'
		await super.alignLayer()
	}

	protected onInput() {
		this.inputed = (this.refs.input as HTMLInputElement).value
		this.showLayer()
	}

	protected async onKeyDown(e: KeyboardEvent) {
		let keys = [...this.getMaySuggestedData()].map(([key]) => key)
		let moved = false

		if (keys.length === 0 && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
			return
		}

		if (e.key === 'Enter') {
			e.preventDefault()

			if (this.opened) {
				if (this.hoverAt !== null) {
					this.select(this.hoverAt)
				}
				else {
					this.hideLayer()
				}
			}
			else {
				this.showLayer()
			}
		}
		else if (e.key === 'ArrowUp') {
			e.preventDefault()

			if (!this.opened) {
				this.showLayer()
			}
			else if (this.multiple && this.hoverAt === null) {
				this.hoverAt = keys[keys.length - 1]
			}
			else {
				if (this.hoverAt === null) {
					this.hoverAt = this.value as T
				}

				let lastIndex = keys.findIndex(key => key === this.hoverAt)
				let newIndex = Math.max(0, lastIndex - 1)
				this.hoverAt = keys[newIndex]
				moved = true
			}
		}
		else if (e.key === 'ArrowDown') {
			e.preventDefault()

			if (!this.opened) {
				this.showLayer()
			}
			else if (this.multiple && this.hoverAt === null) {
				this.hoverAt = keys[0]
			}
			else {
				if (this.hoverAt === null) {
					this.hoverAt = this.value as T
				}

				let lastIndex = keys.findIndex(key => key === this.hoverAt)
				let newIndex = Math.min(keys.length - 1, lastIndex + 1)
				this.hoverAt = keys[newIndex]
				moved = true
			}
		}
		else if (e.key === 'Escape') {
			e.preventDefault()
			this.inputed = ''
			this.hideLayer()
		}

		if (moved) {
			await renderComplete()
			let el = this.refs.layer.querySelector(this.scopeClassName('.hover')) as HTMLElement | null
			if (el) {
				scrollToView(el, theme.lh(30))
			}
		}
	}

	protected onMouseEnter(key: T) {
		this.hoverAt = key

		if (document.activeElement !== this.refs.input) {
			this.refs.input.focus()
		}
	}
}
