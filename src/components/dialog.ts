import {css, define, html, renderComponent, renderComplete, show, Component, TemplateResult, appendTo, on, off} from '@pucelle/flit'
import {theme} from '../style/theme'
import {align, debounce} from '@pucelle/ff'


export interface DialogOptions {
	icon?: string
	title?: string
	message?: string | TemplateResult
	actions?: DialogAction[]
	list?: string[]
}

export interface DialogAction {
	/** Used at Dialog to know which action button clicked */
	value?: string

	/** Button text. */
	text: string

	/** Button of action becomes primary if set this to true. */
	primary?: boolean

	/** Button of third action will be put left, only one third action is allowed. */
	third?: boolean

	/** To process after clicked the action button. */
	handler?: () => void
}

interface DialogItem {
	options: DialogOptions
	resolve: (value: string | undefined) => void
}


@define('f-dialog')
export class Dialog<E = any> extends Component<E> {
	
	static style() {
		let {textColor, adjust, adjustFontSize, popupBorderRadius, popupShadowBlurRadius, popupShadowColor, popupBackgroundColor} = theme

		return css`
		:host{
			z-index: 1100;	// Higher that modal, popup, tooltip
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
		`
	}

	appendTo: string | Element | null = 'body'

	protected options: DialogOptions | null = null

	/** Also as a marker to know if current options are expired. */
	protected resolve: ((value: string | undefined) => void) | null = null

	protected stack: DialogItem[] = []
	protected opened: boolean = true

	protected render() {
		let options = this.options
		if (!options) {
			return ''
		}

		return html`
		<template
			tabindex="0"
			${show(this.opened, {transition: 'fade', enterAtStart: true, onend: this.onTransitionEnd})}
		>

			<div class="mask"
				:ref="mask"
				${show(this.opened, {transition: 'fade', enterAtStart: true})}
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

	onClickActionButton(action: DialogAction) {
		if (this.resolve) {
			this.resolve(action.value)
			this.resolve = null
		}

		if (this.stack.length > 0) {
			let item = this.stack.shift()!
			this.assignOptions(item.options, item.resolve)
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

		on(window, 'resize', debounce(this.onWindowResize, 200).wrapped, this)
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

	show() {
		this.opened = true

		if (this.appendTo) {
			appendTo(this.el, this.appendTo)
		}
	}

	hide() {
		this.opened = false
	}

	protected assignOptions(options: DialogOptions, resolve: (value: string | undefined) => void) {
		this.options = options
		this.resolve = resolve
	}

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
			this.assignOptions(options, resolve!)
			this.show()
		}

		return promise 
	}
}


export class QuickDialog {

	protected dialogComponent: Dialog | null = null

	protected actionLabels: {[key: string]: string} = {
		ok: 'OK',
		cancel: 'Cancel',
		yes: 'Yes',
		no: 'No'
	}

	protected addOptions(options: DialogOptions) {
		if (!this.dialogComponent) {
			this.dialogComponent = renderComponent(html`<f-dialog />`).component as Dialog
		}

		return this.dialogComponent.addOptions(options)
	}

	setLabels(labels: {[key: string]: string}) {
		Object.assign(this.actionLabels, labels)
	}
	
	/** Show default type dialog or add it to dialog stack. */
	show(message: string | TemplateResult, options: DialogOptions = {}): Promise<string | undefined> {
		return this.addOptions(Object.assign({
			message,
			actions: [{value: 'ok', text: this.actionLabels.ok}],
		}, options))
	}

	/** Show confirm type dialog or add it to dialog stack. */
	confirm(message: string | TemplateResult, options: DialogOptions = {}): Promise<string | undefined> {
		return this.addOptions(Object.assign({
			icon: 'confirm',
			message,
			actions: [
				{value: 'cancel', text: this.actionLabels.cancel},
				{value: 'ok', text: this.actionLabels.ok, primary: true},
			],
		}, options))
	}
}


export const dialog = new QuickDialog()