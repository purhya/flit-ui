import {css, define, html, renderComponent, renderComplete} from 'flit'
import {theme} from './theme'
import {Modal} from './modal'


export type MessageType = 'info' | 'success' | 'alert' | 'confirm' | 'prompt'

export interface MessageOptions {
	type?: MessageType
	title?: string
	content?: string
	buttons?: {[key: string]: string}
	list?: string[]
	wide?: boolean
	inputValue?: string
	inputValidator?: ((value: string) => string)
	resolve?: (value: string | [string, string]) => void
}


@define('f-message-modal')
export class MessageModal extends Modal {
	
	static style() {
		let {mainColor, infoColor, lh, successColor, errorColor, warningColor, fs: fpx} = theme

		return css`
		${super.style()}

		:host{
			z-index: 1200;	// Higher that modal & layer - 1000, and tooltip - 1100
			width: 350px;
	
			&.wide, &.has-title{
				width: 500px;
			}
		}

		.body{
			display: flex;
			padding: ${lh(15)}px 0 0 0;
			line-height: ${lh(24)}px;
			min-height: ${lh(24)}px;
		}

		.left{}

		.icon{
			margin: 0 8px auto 0;
			stroke-width: 0.666px;

			svg{
				width: ${lh(30)}px;
				height: ${lh(30)}px;
			}
		}

		.right{
			flex: 1;
		}

		.text{
			padding-top: 4px;
			min-width: 0;
			word-wrap: break-word;

			a{
				text-decoration: underline;

				&:hover{
					color: ${mainColor.darken(10)};
				}
			}
		}

		.field{
			margin-top: 10px;
		}

		.input{
			width: 100%;
		}

		.error-text{
			color: ${errorColor};
			margin-top: 3px;
			font-size: ${fpx(12)};
		}

		.list{
			margin-top: 5px;
			overflow-y: auto;
			max-height: ${lh(240)}px;
		}

		.icon-alert{
			color: ${errorColor};
		}

		.icon-info{
			color: ${infoColor};
		}

		.icon-success{
			color: ${successColor};
		}

		.icon-confirm{
			color: ${warningColor};
		}
	`}
	
	movable: boolean =false

	protected options: MessageOptions | null = null
	protected stack: MessageOptions[] = []
	protected isTouched: boolean = false
	protected inputErrorText: string = ''

	constructor(el: HTMLElement) {
		super(el)
	}

	protected render() {
		let options = this.options! || {}

		return html`
		<template 
			tabindex="0"	
			:class.has-title=${options.title}
			:class.wide=${!!options.wide}
			:show=${{when: this.opened, transition: this.transition, enterAtStart: true, onend: this.onTransitionEnd}}
		>
		${this.mask ? html`
			<div class="mask"
				:ref="mask"
				:show=${{when: this.opened, transition: this.transition, enterAtStart: true}}
			/>` : ''
		}
		${
			options.title ? html`
			<div class="top head">${options.title}</whead>
			` : ''
		}
			<div class="body">
				<div class="left">
					${options.type !== 'prompt' ? html`<f-icon :class="icon icon-${options.type}" :type="${options.type}" />` : ''}
				</div>
				<div class="right">
					<div class="text" :html=${options.content} />
				${
					options.type === 'prompt' ? html`
					<div class="field">
						<input class="input" type="text"
							:ref="input"
							:class.touched=${this.isTouched}
							:model="options.inputValue"
							@keydown.enter=${this.onMouseEnter}
						>
						<div class="error-text">${this.inputErrorText}</div>
					</div>
					` : ''
				}
				</div>
			</div>

			<div class="foot">
			${
				options.buttons ? Object.entries(options.buttons).map(([key, text]) => {
					return html`
					<button
						?filled=${key === 'ok'}
						@click=${() => this.onClickButton(key)}
						:disabled=${options.type === 'prompt' && key === 'ok' && !options.inputValue}
					>
						${text}
					</button>
				`}) : ''
			}
			</div>
		</template>
	`}

	protected onMouseEnter() {
		this.onClickButton('ok')
	}

	protected onClickButton(btn: string) {
		let {type, inputValidator, inputValue, resolve} = this.options!
		let input = this.refs.input as HTMLInputElement | null

		if (btn === 'ok' && type === 'prompt' && input && !input.validity.valid) {
			input.checkValidity()
			this.isTouched = true

			if (inputValidator) {
				this.inputErrorText = inputValidator(inputValue || '')
			}
			return
		}

		if (type === 'prompt') {
			this.isTouched = false
			this.inputErrorText = ''

			let value = btn === 'ok' && inputValue ? inputValue : ''
			resolve!([btn, value])
		}
		else {
			resolve!(btn)
		}

		if (this.stack.length > 0) {
			this.showMessage(this.stack.shift()!)
		}
		else {
			this.hide()
		}
	}

	async showMessage(options: MessageOptions): Promise<string | [string, string]> {
		let {list} = options

		if (list) {
			options.content = options.content || ''
			options.content += '<div class="list">' + list.map(html => '<div>' + html.replace(/</g, '&lt;') + '</div>').join('') + '</div>'
		}

		let promise = new Promise((resolve) => {
			options.resolve = resolve
		}) as Promise<string | [string, string]>

		this.options = options
		this.show()

		if (options.type === 'prompt') {
			await renderComplete()
			this.refs.input.focus()
			;(this.refs.input as HTMLInputElement).select()
		}

		return promise 
	}
}


export class Message {

	protected modal: MessageModal | null = null

	protected showMessage(options: MessageOptions) {
		if (!this.modal) {
			this.modal = renderComponent(html`<f-message-modal />`) as MessageModal
		}

		return this.modal.showMessage(options)
	}
	
	/** Show info type message. */
	info(content: string, options: MessageOptions = {}) {
		return this.showMessage(Object.assign({
			type: 'info',
			content,
			buttons: {ok: 'OK'},
		}, options) as MessageOptions) as Promise<string>
	}

	/** Show success type message. */
	success(content: string, options: MessageOptions = {}) {
		return this.showMessage(Object.assign({
			type: 'success',
			content,
			buttons: {ok: 'OK'},
		}, options) as MessageOptions) as Promise<string>
	}

	/** Show alert type message. */
	alert(content: string, options: MessageOptions = {}) {
		return this.showMessage(Object.assign({
			type: 'alert',
			content,
			buttons: {ok: 'OK'},
		}, options) as MessageOptions) as Promise<string>
	}

	/** Show confirm type message. */
	confirm(content: string, options: MessageOptions = {}) {
		return this.showMessage(Object.assign({
			type: 'confirm',
			content,
			buttons: {cancel: 'Cancel', ok: 'Yes'},
		}, options) as MessageOptions) as Promise<string>
	}

	/** Show prompt type message. */
	prompt(content: string, options: MessageOptions = {}) {
		return this.showMessage(Object.assign({
			type: 'prompt',
			content,
			
			inputValue: '',
			buttons: {cancel: 'Cancel', ok: 'OK'},
		}, options) as MessageOptions) as Promise<[string, string]>
	}
}


export const message = new Message()