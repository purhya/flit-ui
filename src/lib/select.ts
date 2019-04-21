import {css, define, html, renderComplete, cache, repeat} from 'flit'
import {theme} from './theme'
import {Popup} from './popup'
import {Color} from './color'
import {remove, scrollToView, scrollToTop} from 'ff'


export interface SelectEvents<T = unknown> {
	change: (value: T | T[]) => void
}

@define('f-select')
export class Select<T = unknown> extends Popup<SelectEvents<T>> {
	
	static style() {
		let {mainColor, lpx, textColor} = theme

		return css`
		:host{
			display: inline-flex;
			vertical-align: top;
			border-bottom: 1px solid ${textColor.lighten(30)};
			width: 150px;
			height: ${lpx(30)}px;
			background: #e5e5e5;
			line-height: ${lpx(30)}px;
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
			padding: 0 0 0 ${lpx(8)}px;
			height: ${lpx(30)}px;
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
			box-shadow: inset 0 -1px 0 0 #fff;	// Add a white line as spliter for adjacent selected items.
			cursor: pointer;
			
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
	value: T | T[] | null = null
	multiple: boolean = false
	searchable: boolean = false
	ordered: boolean = false

	private inputed: string = ''
	private editing: boolean = false
	private hoverAt: T | null = null

	render() {
		let layerPart = cache(this.opened ? this.renderLayer() : '', this.transition)

		let inputPart = html`
			<input type="text"
				class="input"
				:ref="input"
				.value=${this.editing ? this.inputed : this.getDisplay()}
				?readonly=${!this.editing}
				@click=${this.onClick}
				@input=${this.onInput}
			>
		`

		return html`
		<template
			:class.opened=${this.opened}
			:class.not-inputable=${!this.searchable}
		>
			${inputPart}
			${this.icon && !this.editing ? html`<f-icon class="icon" :type="${this.icon}" />` : ''}
			${layerPart}
		</template>
	`}

	renderLayer() {
		let data = this.getMaySuggestedData()

		let listPart = repeat(data, ([key, display]) => this.renderOption(key, display))

		return html`
		<f-layer
			class="layer"
			:ref="layer"
			:popup=${this}
			:herizontal=${false}
			:trangle=${false}
		>
			<ul class="list">
			${listPart}
			</ul>
		</f-layer>
	`}

	renderOption(key: T, display: string | number) {
		let selected = this.isSelected(key)

		return html`
		<li
			class="item"
			:class.selected=${selected}
			:class.hover=${this.hoverAt !== null && this.hoverAt === key}
			@click.prevent=${() => this.select(key)}
			@mouseenter=${() => this.onMouseEnter(key)}
		>
			<span class="text">${display}</span>
			${selected ? html`<f-icon class="selected-icon" type="selected" />` : ''}
		</li>
	`}

	getDisplay(): string {
		if (this.multiple) {
			let displays: string[] = []

			for (let [key, display] of this.data) {
				if ((this.value as T[]).includes(key)) {
					displays.push(String(display))
				}
			}

			return displays.join('; ')
		}
		else {
			for (let [key, display] of this.data) {
				if (this.value === key) {
					return String(display)
				}
			}

			return ''
		}
	}

	getMaySuggestedData(): Iterable<[T, string | number]> {
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

	isSelected(key: T) {
		if (this.multiple) {
			return (this.value as T[]).includes(key)
		}
		else {
			return this.value === key
		}
	}
	
	onCreated() {
		super.onCreated()

		if (this.multiple && !Array.isArray(this.value)) {
			if (this.value === null || this.value === undefined) {
				this.value = []
			}
			else {
				this.value = [this.value as unknown as T]
			}
		}

		if (this.searchable) {
			this.watch(() => this.opened, (opened) => {
				if (!opened && this.editing) {
					this.endEditing()
				}
			})
		}
	}

	async onUpdated() {
		if (this.refs.layer) {
			this.refs.layer.style.minWidth = String(this.el.offsetWidth) + 'px'
		}

		await super.onUpdated()
	}

	onClick() {
		if (this.searchable && !this.editing) {
			this.startEditing()
		}
	}

	select(key: T) {
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

	private async startEditing() {
		this.editing = true
		this.inputed = ''

		await renderComplete()
		this.refs.input.focus()
	}

	private endEditing() {
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

	onInput() {
		this.inputed = (this.refs.input as HTMLInputElement).value
		this.showLayer()
	}

	async onKeyDown(e: KeyboardEvent) {
		let keys = [...this.getMaySuggestedData()].map(([key]) => key)
		let moved = false

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
			if (keys.length === 0) {
				return
			}

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
			if (keys.length === 0) {
				return
			}

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
				scrollToView(el, theme.lpx(30))
			}
		}
	}

	onMouseEnter(key: T) {
		this.hoverAt = key

		if (document.activeElement !== this.refs.input) {
			this.refs.input.focus()
		}
	}
}