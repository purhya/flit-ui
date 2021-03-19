import {css, define, html, renderComplete, show, Component, TemplateResult, on, off, render, getRenderedAsComponent, getComponentAsync} from '@pucelle/flit'
import {theme} from '../style/theme'
import {align} from '@pucelle/ff'
import {appendTo} from '../utils/element'
import {translations} from '../translations/translations'
import {Input} from './input'


export interface DialogOptions {

	/** Dialog icon in left side. */
	icon?: string

	/** Dialog title. */
	title?: string

	/** Dialog message. */
	message?: string | TemplateResult

	/** Dialog actions. */
	actions?: DialogAction[]

	/** Dialog list. */
	list?: string[]

	/** Returns `true` to interrupt action. */
	interruptAction?: (button: string) => boolean
}

export interface DialogAction {

	/** Indicates current action and to know which action button clicked. */
	value?: string

	/** Button text. */
	text: string

	/** Button of action becomes primary if set to `true`. */
	primary?: boolean

	/** Button of third action will be put left, only one third action is allowed. */
	third?: boolean

	/** Calls after clicked the action button. */
	handler?: () => void
}

interface DialogItem {

	/** Current dialog options. */
	options: DialogOptions

	/** Resolved after any action button clicked. */
	resolve: (value: string | undefined) => void
}

export interface PromptDialogOptions extends DialogOptions {

	/** Prompt input placeholder. */
	placeholder?: string

	/** Default input value. */
	defaultValue?: string | number

	/** Input type, same with `<input type=...>`. */
	inputType?: 'text' | 'password'

	/** To validate current value, returns an error message or `null` if passes. */
	validator?: (value: string) => string | undefined
}


/** `<f-dialog>` shows critical content and in a overlay modal, you must interact with it before continue. */
@define('f-dialog')
export class Dialog<E = any> extends Component<E> {
	
	static style() {
		let {textColor, adjust, adjustFontSize, popupBorderRadius, popupShadowBlurRadius, popupShadowColor, popupBackgroundColor} = theme

		return css`
		:host{
			z-index: 1000;
			width: ${adjust(360)}px;
			position: fixed;
			border-radius: ${popupBorderRadius}px;
			box-shadow: 0 0 ${popupShadowBlurRadius}px ${popupShadowColor};
			background: ${popupBackgroundColor};
			max-width: 96%;
			max-height: 96%;
			padding: ${adjust(8)}px ${adjust(16)}px ${adjust(16)}px;
		}

		.mask{
			position: fixed;
			z-index: 1000;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
		}

		.header{
			display: flex;
			line-height: ${adjust(22)}px;
			height: ${adjust(28) + 1}px;
			font-size: ${adjustFontSize(13)}px;
			padding-bottom: ${adjust(6)}px;
			border-bottom: 1px solid ${textColor.alpha(0.8)};
		}

		.title{
			flex: 1;
			min-width: 0;
			padding: 0 ${adjust(16)}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.content{
			display: flex;
			margin-top: ${adjust(8)}px;
		}

		.icon{
			padding-right: ${adjust(12)}px;
		}

		.message{
			flex: 1;
			min-width: 0;
			line-height: ${adjust(20)}px;
			padding: ${adjust(4)}px 0;
		}

		.list{
			margin: ${adjust(8)}px 0;
			line-height: ${adjust(20)}px;
			list-style-type: square;
			padding-left: ${adjust(28)}px;
		}

		.actions{
			display: flex;
			justify-content: flex-end;
			margin-top: ${adjust(16)}px;

			button{
				margin-left: ${adjust(8)}px;
			}

			.third{
				margin-left: 0;
				margin-right: auto;
			}
		}

		.input{
			margin-top: ${adjust(8)}px;
			margin-bottom: ${adjust(22)}px;
			width: 100%;
		}
		`
	}

	/** Options for current dialog. */
	protected currentOptions: DialogOptions | null = null

	/** Also as a marker to know if current options are expired. */
	protected resolve: ((value: string | undefined) => void) | null = null

	/** Dialog stack, will show one by one. */
	protected stack: DialogItem[] = []

	/** Whether any dialog opened. */
	protected opened: boolean = true

	/** Where to append current dialog. */
	appendTo: string | Element | null = 'body'

	protected render() {
		let options = this.currentOptions
		if (!options) {
			return ''
		}

		return html`
			<template
				tabindex="0"
				${show(this.opened, {name: 'fade', enterAtStart: true, onend: this.onTransitionEnd})}
			>
				<div class="mask"
					:ref="mask"
					${show(this.opened, {name: 'fade', enterAtStart: true})}
				/>

				${options.title ? html`
					<div class="header">
						<div class="title">
							${options.title}
						</div>
					</div>
				` : ''}

				<div class="content">

					${options.icon ? html`<div class="icon">
						<f-icon .type="${options.icon}" />
					</div>` : ''}

					<div class="message">
						${options.message}
					</div>

					${options.list && options.list.length > 0 ? html`
						<ul class="list">
							${options.list.map(text => html`<li>${text}</li>`)}
						</ul>
					`: ''}
				</div>

				${this.renderActions(options.actions)}
			</template>
		`
	}

	protected renderActions(actions: DialogAction[] | undefined) {
		if (actions && actions.length > 0) {
			let results = actions.map(action => html`
				<button class="action"
					?primary=${action.primary}
					:class.third=${action.third}
					@click=${() => this.onClickActionButton(action)}>
					${action.text}
				</button>
			`)
	
			return html`<div class="actions">${results}</div>`
		}
	
		return ''
	}

	protected onClickActionButton(action: DialogAction) {
		// Interrupted.
		if (this.currentOptions?.interruptAction?.(action.value ?? '')) {
			return
		}

		if (this.resolve) {
			this.resolve(action.value)
			this.resolve = null
		}

		if (this.stack.length > 0) {
			let item = this.stack.shift()!
			this.applyOptions(item.options, item.resolve)
		}
		else {
			this.hide()
		}
	}

	protected onTransitionEnd(type: string, finish: boolean) {
		if (type === 'leave' && finish) {
			if (this.refs.mask) {
				this.refs.mask.remove()
			}
			this.el.remove()
		}
		else if (type === 'enter') {
			let input = this.el.querySelector('input')
			if (input) {
				input.focus()
			}
		}
	}

	protected async onConnected() {
		await renderComplete()
		
		if (this.refs.mask && this.el.previousElementSibling !== this.refs.mask) {
			this.el.before(this.refs.mask)
		}

		this.toCenter()

		if (this.el.tabIndex === 0) {
			this.el.focus()
		}

		on(window, 'resize', this.onWindowResize, this)
	}

	protected onDisconnected() {
		off(window, 'resize', this.onWindowResize, this)
	}

	protected onWindowResize() {
		if (this.opened) {
			this.toCenter()
		}
	}

	protected toCenter() {
		align(this.el, document.documentElement, 'c')
	}

	/** Apply options as current options. */
	protected applyOptions(options: DialogOptions, resolve: (value: string | undefined) => void) {
		this.currentOptions = options
		this.resolve = resolve
	}

	/** Add an option to stack. */
	async addOptions(options: DialogOptions): Promise<string | undefined> {
		let resolve: (value: string | undefined) => void

		let promise = new Promise(scopedResolve => {
			resolve = scopedResolve
		}) as Promise<string | undefined>

		if (this.resolve) {
			this.stack.push({
				options,
				resolve: resolve!,
			})
		}
		else {
			this.applyOptions(options, resolve!)
			this.show()
		}

		return promise 
	}

	/** Show current dialog. */
	show() {
		this.opened = true

		if (this.appendTo) {
			appendTo(this.el, this.appendTo)
		}
	}

	/** Hide current dialog. */
	hide() {
		this.opened = false
	}

	/** Trigger specified action manually. */
	triggerAction(value: string) {
		if (!this.currentOptions || !this.currentOptions.actions) {
			return
		}

		let action = this.currentOptions.actions.find(action => action.value === value)
		if (action) {
			this.onClickActionButton(action)
		}
	}
}


export class QuickDialog {

	protected dialogComponent: Dialog | null = null

	protected addOptions(options: DialogOptions) {
		if (!this.dialogComponent) {
			this.dialogComponent = getRenderedAsComponent(render(html`<f-dialog />`)) as Dialog
		}

		return this.dialogComponent.addOptions(options)
	}

	/** Show default type dialog or add it to dialog stack. */
	show(message: string | TemplateResult, options: DialogOptions = {}): Promise<string | undefined> {
		return this.addOptions({
			message,
			actions: [{value: 'ok', text: translations.get('ok')}],
			...options,
		})
	}

	/** Show confirm type dialog or add it to dialog stack. */
	confirm(message: string | TemplateResult, options: DialogOptions = {}): Promise<string | undefined> {
		return this.addOptions({
			icon: 'confirm',
			message,
			actions: [
				{value: 'cancel', text: translations.get('cancel')},
				{value: 'ok', text: translations.get('ok'), primary: true},
			],
			... options,
		})
	}

	/** Show prompt type dialog or add it to dialog stack. */
	async prompt(message: string | TemplateResult, options: PromptDialogOptions = {}): Promise<string | undefined> {
		let value = options.defaultValue ? String(options.defaultValue) : ''
		let input: Input
		let originalInterruptAction = options.interruptAction

		let messageWithInput = html`
			${message}
			<f-input class="input" 
				.placeholder=${options.placeholder}
				.validator=${options.validator}
				.type=${options.inputType || 'text'}
				.value=${value}
				:ref=${async (i: HTMLElement) => input = await getComponentAsync(i) as Input}
				@@input=${(v: string) => value = v}
				@keydown.enter=${() => this.dialogComponent!.triggerAction('ok')}
			/>
		`

		let btn = await this.addOptions({
			message: messageWithInput,
			actions: [
				{value: 'cancel', text: translations.get('cancel')},
				{value: 'ok', text: translations.get('ok'), primary: true},
			],
			...options,
			interruptAction: (button: string) => {
				return originalInterruptAction?.(button) || button === 'ok' && input.valid === false
			},
		})

		if (btn === 'ok') {
			return value
		}

		return undefined
	}
}


/** A quick global API to show dialogs. */
export const dialog = new QuickDialog()