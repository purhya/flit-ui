import {css, define, html, Component, repeat, TemplateResult, getRenderedAsComponent, render} from '@pucelle/flit'
import {theme} from '../style/theme'
import {remove, Timeout} from '@pucelle/ff'
import {Color} from '../style/color'
import {appendTo} from '../utils/element'


export interface NotificationOptions {

	/** Notification id, if same with an existed item, will replace it. */
	id?: number

	/** Notification type, `info, warning, error, success`. */
	type?: NotificationType

	/** Notification title. */
	title?: string

	/** Notification message. */
	message?: string | TemplateResult

	/** A data list to show below message. */
	list?: string[]

	/** Additional action buttons. */
	actions?: NotificationAction[]

	/** Hide notification after millseconds. Default value is `5000`. */
	hideDelay?: number
}

/** Notification type. */
export type NotificationType = 'info' | 'warning' | 'error' | 'success'

export interface NotificationAction {

	/** Button text. */
	text: string

	/** Action button becomes primary if set this to true. */
	primary?: boolean

	/** Call after clicked the action button. */
	handler?: () => void
}

interface NotificationItem extends NotificationOptions {

	/** Notification id. */
	id: number

	/** Whether mouse hover. */
	hover: boolean

	/** Timeout to hide current notification. */
	timeout: Timeout | null
}


/** `<f-notification>` helps to show a notification list to notify some info. */
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
			z-index: 1100;	// Higher than tooltip, dialog, ...
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

	protected seed: number = 1
	protected items: NotificationItem[] = []
	
	/** Where to append notification list. */
	appendTo: string | HTMLElement | null = 'body'

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
	
	protected onClickActionButton(action: NotificationAction, item: NotificationItem) {
		if (action.handler) {
			action.handler()
		}

		this.hide(item.id)
	}

	protected onMouseEnter(item: NotificationItem) {
		item.hover = true
	}

	protected onMouseLeave(item: NotificationItem) {
		item.hover = false

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

	/** Shows a notification and returns it's list. */
	show(options: NotificationOptions): number {
		if (options.id) {
			let item = this.items.find(v => v.id === options.id)
			if (item) {
				Object.assign(item, options)
				this.hideLater(item)
				
				return options.id
			}
		}

		let item = {
			id: this.seed++,
			...options,
			hover: false,
			timeout: null,
		}
				
		this.items.unshift(item)
		this.hideLater(item)

		if (this.items.length === 1 && this.appendTo) {
			appendTo(this.el, this.appendTo)
		}

		return item.id
	}

	protected hideLater(item: NotificationItem) {
		if (item.timeout) {
			item.timeout.cancel()
		}

		item.timeout = new Timeout(() => {
			item.timeout = null

			if (!item.hover) {
				this.hide(item.id)
			}
		}, item.hideDelay || 5000)
	}

	/** Hide notification by it's id. */
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

	/** Hide all notifications. */
	hideAll() {
		this.items = []

		if (this.items.length === 0) {
			this.el.remove()
		}
	}
}


/** Class to manage a notification list. */
export class QuickNotification {

	protected noti: Notification | null = null

	/** Returns a unique notification instance, all notification calls will share a unique notification item. */
	unique() {
		return new UniqueNotification(this)
	}

	protected showNotification(options: NotificationOptions): number {
		if (!this.noti) {
			this.noti = getRenderedAsComponent(render(html`<f-notification />`)) as Notification
		}

		return this.noti!.show(options)
	}

	/** Shows info type notification, returns it's id. */
	info(message: string | TemplateResult, options: NotificationOptions = {}): number {
		options.type = 'info'
		options.message = message

		return this.showNotification(options)
	}

	/** Shows warn type notification, returns it's id. */
	warn(message: string | TemplateResult, options: NotificationOptions = {}): number {
		options.type = 'warning'
		options.message = message

		return this.showNotification(options)
	}

	/** Shows error type notification, returns it's id. */
	error(message: string | TemplateResult, options: NotificationOptions = {}): number {
		options.type = 'error'
		options.message = message

		return this.showNotification(options)
	}

	/** Shows success type notification, returns it's id. */
	success(message: string | TemplateResult, options: NotificationOptions = {}): number {
		options.type = 'success'
		options.message = message

		return this.showNotification(options)
	}

	/** Hide notification by it's id. */
	hide(id: number) {
		return this.noti!.hide(id)
	}

	/** Hide all notifications. */
	hideAll() {
		this.noti!.hideAll()
	}
}


/** All notification calls will share a unique notification item. */
export class UniqueNotification {

	protected readonly raw: QuickNotification
	protected id: number | null = null

	constructor(raw: QuickNotification) {
		this.raw = raw
	}

	protected overwriteNotificationId(options: NotificationOptions) {
		if (this.id) {
			options.id = this.id
		}
	}
	
	/** Shows info type notification, returns it's id. */
	info(message: string | TemplateResult, options: NotificationOptions = {}): number {
		this.overwriteNotificationId(options)
		return this.id = this.raw.info(message, options)
	}

	/** Shows warn type notification, returns it's id. */
	warn(message: string | TemplateResult, options: NotificationOptions = {}): number {
		this.overwriteNotificationId(options)
		return this.id = this.raw.warn(message, options)
	}

	/** Shows error type notification, returns it's id. */
	error(message: string | TemplateResult, options: NotificationOptions = {}): number {
		this.overwriteNotificationId(options)
		return this.id = this.raw.error(message, options)
	}

	/** Shows success type notification, returns it's id. */
	success(message: string | TemplateResult, options: NotificationOptions = {}): number {
		this.overwriteNotificationId(options)
		return this.id = this.raw.success(message, options)
	}

	/** Hide current notification. */
	hide() {
		if (this.id) {
			return this.raw.hide(this.id)
		}
		else {
			return false
		}
	}
}

/** A quick global API to show notifications. */
export const notification = new QuickNotification()