import {css, define, html, Component, repeat, TemplateResult, getRenderedAsComponent, render} from '@pucelle/flit'
import {theme} from '../style/theme'
import {remove, Timeout, timeout} from '@pucelle/ff'
import {Color} from '../style/color'


export type NotificationType = 'info' | 'warning' | 'error' | 'success'

export interface NotificationOptions {
	id?: number
	type?: NotificationType
	title?: string
	message?: string | TemplateResult
	list?: string[]
	actions?: NotificationAction[]
	hideDelay?: number
}

export interface NotificationAction {
	/** Used at Dialog to know which action button clicked */
	value?: string

	/** Button text. */
	text: string

	/** Button of action becomes primary if set this to true. */
	primary?: boolean

	/** To process after clicked the action button. */
	handler?: () => void
}

interface NotificationItem extends NotificationOptions {
	id: number
	entered: boolean
	timeout: Timeout | null
}


@define('f-notification')
export class Notification<E = any> extends Component<E> {
	static style() {
		let {infoColor, adjust, successColor, errorColor, warningColor, popupBorderRadius, popupShadowBlurRadius, adjustFontSize, backgroundColor, textColor, popupShadowColor} = theme
		
		let types = [
			['info', infoColor],
			['warning', warningColor],
			['error', errorColor],
			['success', successColor]
		] as [NotificationType, Color][]

		return css`
		:host{
			position: fixed;
			right: ${adjust(12)}px;
			bottom: ${adjust(12)}px;
			min-width: ${adjust(280)}px;
			max-width: ${adjust(480)}px;
			z-index: 1200;	// Higher than message
			font-size: ${adjustFontSize(13)}px;
		}

		.item{
			position: relative;
			display: flex;
			margin-top: ${adjust(12)}px;
			background: ${backgroundColor};
			box-shadow: 0 0 ${popupShadowBlurRadius}px ${popupShadowColor};
			cursor: pointer;
			overflow: hidden;
			border-radius: ${popupBorderRadius}px;
		}

		.stripe{
			width: 4px;
		}

		.left{
			padding: ${adjust(16)}px ${adjust(14)}px ${adjust(16)}px ${adjust(16)}px;
		}

		.type-icon{
			display: block;
			width: ${adjust(20)}px;
			height: ${adjust(20)}px;

			svg{
				width: ${adjust(20)}px;
				height: ${adjust(20)}px;
			}
		}

		.content{
			flex: 1;
			min-width: 0;
			padding: ${adjust(16)}px ${adjust(16)}px ${adjust(8)}px 0;
		}

		.close{
			display: flex;
			width: ${adjust(28)}px;
			height: ${adjust(28)}px;
			color: ${textColor};

			f-icon{
				margin: auto;
			}

			&:hover{
				color: ${textColor.toMiddle(10)};
			}

			&:active{
				transform: translateY(1px);
			}
		}

		.title{
			font-weight: bold;
			line-height: ${adjust(20)}px;
			margin-bottom: ${adjust(4)}px;
		}

		.message{
			flex: 1;
			min-width: 0;
			line-height: ${adjust(20)}px;
			margin-bottom: ${adjust(4)}px;
			text-align: left;
			word-wrap: break-word;

			a{
				font-weight: bold;
			}
		}

		.list{
			margin: ${adjust(8)}px 0;
			line-height: ${adjust(20)}px;
			list-style-type: square;
			padding-left: ${adjust(28)}px;
		}

		.actions{
			margin-top: ${adjust(8)}px;
		}

		.action{
			margin-right: ${adjust(6)}px;
			height: ${adjust(22)}px;
			line-height: ${20}px;
			padding: 0 ${adjust(8)}px;
		}

		${types.map(([type, color]) => css`
			.type-${type}{
				&:hover{
					background: ${color.mix(backgroundColor, 95)};
				}

				.stripe{
					background: ${color};
				}
			}
		`)}
		
		`
	}
	
	hideDelay: number = 10000
	appendTo: string | HTMLElement | null = 'body'

	protected seed: number = 1
	protected items: NotificationItem[] = []

	protected render() {
		return repeat(this.items, (item) => 
			html`<div class="item"
				:class="type-${item.type}"
				@mouseenter=${() => this.onMouseEnter(item)}
				@mouseleave=${() => this.onMouseLeave(item)}
			>
				<div class="stripe" />

				<div class="left">
					<f-icon class="type-icon" .type=${item.type} />
				</div>

				<div class="content">
					${item.title ? html`<div class="title">${item.title}</div>` : ''}

					<div class="message">${item.message}</div>
					
					${item.list && item.list.length > 0 ? html`
						<ul class="list">
							${item.list.map(text => html`<li>${text}</li>`)}
						</ul>
					`: ''}

					${this.renderActions(item)}
				</div>

				<div class="close" @click=${() => this.onClickClose(item)}>
					<f-icon .type="close" />
				</div>
			</div>`
		, {name: 'fade', enterAtStart: true, onend: this.onTransitionEnd})
	}

	protected renderActions(item: NotificationItem) {
		let actions = item.actions

		if (actions && actions.length > 0) {
			let results = actions.map(action => html`
				<button class="action"
					?primary=${action.primary}
					@click=${() => this.onClickActionButton(action, item)}>
					${action.text}
				</button>
			`)
	
			return html`<div class="actions">${results}</div>`
		}
	
		return ''
	}
	
	protected async onClickActionButton(action: NotificationAction, item: NotificationItem) {
		if (action.handler) {
			action.handler()
		}

		this.hide(item.id)
	}

	protected onMouseEnter(item: NotificationItem) {
		item.entered = true
	}

	protected onMouseLeave(item: NotificationItem) {
		item.entered = false

		if (!item.timeout) {
			this.hideLater(item)
		}
	}

	protected onClickClose(item: NotificationItem) {
		this.hide(item.id)
	}

	protected onTransitionEnd(type: string) {
		if (type === 'leave' && this.items.length === 0) {
			this.el.remove()
		}
	}

	show(options: NotificationOptions): number {
		if (options.id) {
			let item = this.items.find(v => v.id === options.id)
			if (item) {
				delete item.hideDelay
				Object.assign(item, options)
				this.hideLater(item)
				return options.id
			}
		}

		let item = Object.assign({
			id: this.seed++,
			entered: false,
			timeout: null
		}, options)
		
		this.items.unshift(item)
		this.hideLater(item)

		if (this.items.length === 1) {
			document.body.append(this.el)
		}

		return item.id
	}

	protected hideLater(item: NotificationItem) {
		if (item.timeout) {
			item.timeout.cancel()
		}

		item.timeout = timeout(() => {
			item.timeout = null

			if (!item.entered) {
				this.hide(item.id)
			}
		}, item.hideDelay || this.hideDelay)
	}

	hide(id: number): boolean {
		let item = this.items.find(v => v.id === id)
		if (item) {
			remove(this.items, item)
			return true
		}
		else {
			return false
		}
	}

	hideAll() {
		this.items = []

		if (this.items.length === 0) {
			this.el.remove()
		}
	}
}


export class QuickNotification {

	protected noti: Notification | null = null

	unique() {
		return new UniqueNotification(this)
	}

	protected showNotification(options: NotificationOptions): number {
		if (!this.noti) {
			this.noti = getRenderedAsComponent(render(html`<f-notification />`)) as Notification
		}

		return this.noti!.show(options)
	}

	info(message: string | TemplateResult, options: NotificationOptions = {}): number {
		options.type = 'info'
		options.message = message

		return this.showNotification(options)
	}

	warn(message: string | TemplateResult, options: NotificationOptions = {}): number {
		options.type = 'warning'
		options.message = message

		return this.showNotification(options)
	}

	error(message: string | TemplateResult, options: NotificationOptions = {}): number {
		options.type = 'error'
		options.message = message

		return this.showNotification(options)
	}

	success(message: string | TemplateResult, options: NotificationOptions = {}): number {
		options.type = 'success'
		options.message = message

		return this.showNotification(options)
	}

	hide(id: number) {
		return this.noti!.hide(id)
	}

	hideAll() {
		return this.noti!.hideAll()
	}
}


export class UniqueNotification {

	raw: QuickNotification
	id: number | null = null

	constructor(raw: QuickNotification) {
		this.raw = raw
	}

	protected overwriteNotificationId(options: NotificationOptions) {
		if (this.id) {
			options.id = this.id
		}
	}

	info(message: string | TemplateResult, options: NotificationOptions = {}): number {
		this.overwriteNotificationId(options)
		return this.id = this.raw.info(message, options)
	}

	warn(message: string | TemplateResult, options: NotificationOptions = {}): number {
		this.overwriteNotificationId(options)
		return this.id = this.raw.warn(message, options)
	}

	error(message: string | TemplateResult, options: NotificationOptions = {}): number {
		this.overwriteNotificationId(options)
		return this.id = this.raw.error(message, options)
	}

	success(message: string | TemplateResult, options: NotificationOptions = {}): number {
		this.overwriteNotificationId(options)
		return this.id = this.raw.success(message, options)
	}

	hide() {
		if (this.id) {
			return this.raw.hide(this.id)
		}
		else {
			return false
		}
	}
}

export const notification = new QuickNotification()