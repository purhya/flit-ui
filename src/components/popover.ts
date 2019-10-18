import {css, define, html} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Popup} from './popup'
import {PopupOptions} from '../bindings/popup'


export interface PopoverAction {
	value: string
	text: string
	primary?: boolean

	// Returns if handle it successfully, will hide popover if returns is not `false`.
	handler?: () => boolean | void | Promise<boolean | void>
}


// Compare to `<popup>`, it can set title and actions.
@define('f-popover')
export class Popover<E = any> extends Popup<E> {

	static style() {
		let {adjustByLineHeight: lh, adjustByFontSize: fs, textColor} = theme

		return css`
		:host{
			padding: ${lh(8)}px ${lh(16)}px;
			min-width: ${lh(240)}px;
			max-width: ${lh(400)}px;
		}

		.trangle{
			left: ${lh(12)}px;
		}

		.header{
			display: flex;
			line-height: ${lh(22)}px;
			height: ${lh(28)}px;
			font-size: ${fs(13)}px;
			padding-bottom: ${lh(6)}px;
			border-bottom: 1px solid ${textColor.alpha(0.8)};
			margin-bottom: ${lh(8)}px;
		}

		.title{
			flex: 1;
			min-width: 0;
			padding: 0 ${lh(16)}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.close{
			display: flex;
			width: ${lh(28)}px;
			height: ${lh(28)}px;
			margin-top: -${lh(-6)}px;
			margin-right: ${lh(-9)}px;
			cursor: pointer;

			&:active{
				transform: translateY(1px);
			}

			f-icon{
				margin: auto;
			}
		}

		.actions{
			margin-left: ${lh(15)}px;
		}

		.action{
			margin-left: ${lh(6)}px;
			height: ${lh(22)}px;
			line-height: ${20}px;
			padding: 0 ${lh(8)}px;
		}

		.content{}
		`.extends(super.style())
	}

	title: string = ''
	closable: boolean = false
	actions: PopoverAction[] | null = null

	defaultPopupOptions: PopupOptions = {
		// `trigger` not work here because when handle it, current component is not created.
		trigger: 'click',
		alignPosition: 'bc',
		fixTrangle: true,
	}

	protected render() {
		return html`
		<f-popup>	
			${this.renderHead()}
			<div class="content"><slot /></div>
		</f-popup>
		`.extends(super.render())
	}

	protected renderHead() {
		if (this.title) {
			let shouldRenderClose = this.closable && (!this.actions || this.actions.length === 0)

			return html`
			<div class="header">
				<div class="title">${this.title}</div>
				${this.renderActions()}

				${shouldRenderClose ? html`
					<div class="close" @click=${this.close}>
						<f-icon .type="close" />
					</div>
				` : ''}
			</div>
			`
		}

		return ''
	}

	protected renderActions() {
		if (this.actions && this.actions.length > 0) {
			let actions = this.actions.map(action => html`
				<button class="action" @click=${() => this.onClickAction(action)} ?primary=${action.primary}>
					${action.text}
				</button>
			`)

			return html`<div class="actions">${actions}</div>`
		}

		return ''
	}

	protected async onClickAction(action: PopoverAction) {
		let failed = action.handler && await action.handler() === false
		if (!failed) {
			this.close()
		}
	}
}
