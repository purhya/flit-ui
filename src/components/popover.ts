import {css, define, html} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Popup} from './popup'
import {PopupOptions} from '../bindings/popup'


/** 
 * `<f-popover>` shows content message in a popup beside it's trigger element.
 * 
 * `:slot=action` - Add action buttons and show them at head.
 */
@define('f-popover')
export class Popover<E = any> extends Popup<E> {

	static style() {
		let {adjust, adjustFontSize, textColor} = theme

		return css`
		:host{
			padding: ${adjust(8)}px ${adjust(16)}px;
			min-width: ${adjust(240)}px;
			max-width: ${adjust(400)}px;
		}

		.triangle{
			left: ${adjust(12)}px;
		}

		.header{
			display: flex;
			line-height: ${adjust(22)}px;
			height: ${adjust(28) + 1}px;
			font-size: ${adjustFontSize(13)}px;
			padding-bottom: ${adjust(6)}px;
			border-bottom: 1px solid ${textColor.alpha(0.8)};
			margin-bottom: ${adjust(8)}px;
		}

		.title{
			flex: 1;
			min-width: 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.close{
			display: flex;
			width: ${adjust(28)}px;
			height: ${adjust(28)}px;
			margin-top: ${adjust(-6)}px;
			margin-right: ${adjust(-9)}px;
			cursor: pointer;

			&:active{
				transform: translateY(1px);
			}

			f-icon{
				margin: auto;
			}
		}

		.actions{
			margin-left: ${adjust(15)}px;

			button{
				margin-left: ${adjust(6)}px;
				height: ${adjust(22)}px;
				line-height: ${20}px;
				padding: 0 ${adjust(8)}px;
			}
		}

		.content{
			line-height: ${adjust(20)}px;
			padding: ${adjust(4)}px 0;
		}
		`.extends(super.style())
	}

	slots!: {
		/** As action buttons. */
		action: HTMLElement[]
	}

	/** Popover title. */
	title: string = ''

	/** Whether shows a close icon to quickly close current popover. */
	closable: boolean = false

	defaultPopupOptions: PopupOptions = {
		// `trigger` not work here because when need to handle trigger, current component is not created.
		alignPosition: 'bc',
		fixTriangle: true,
	}

	protected render() {
		return html`
			<template>	
				${this.renderHead()}
				<div class="content"><slot /></div>
			</template>
		`.extends(super.render())
	}

	protected renderHead() {
		if (this.title) {
			let shouldRenderClose = this.closable && !this.slots.action
			
			return html`
			<div class="header">
				<div class="title">${this.title}</div>

				<div class="actions" :show=${this.slots.action}>
					<slot name="action" />
				</div>

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
}
