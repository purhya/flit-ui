import {css, define, html, on, untilRenderComplete, off, Component, show} from '@pucelle/flit'
import {theme} from '../style/theme'
import {align, watchLayout} from '@pucelle/ff'
import {appendTo} from '../utils/element'


/** 
 * `<f-modal>` shows content and help to complete a child task in a popup modal.
 * 
 * `:slot="action"` - Add action buttons and show them at head.
 */
@define('f-modal')
export class Modal<E = any> extends Component<E> {

	static style() {
		let {adjustFontSize, textColor, popupBorderRadius, popupShadowBlurRadius, popupBackgroundColor, popupShadowColor, adjust} = theme

		return css`
		:host{
			position: fixed;
			display: flex;
			flex-direction: column;
			z-index: 1000;	// Same with popup
			border-radius: ${popupBorderRadius}px;
			box-shadow: 0 0 ${popupShadowBlurRadius}px ${popupShadowColor};
			background: ${popupBackgroundColor};
			max-width: 100%;
			max-height: 100%;
			padding: ${adjust(8)}px ${adjust(16)}px;
			overflow: hidden;
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
			flex: none;
			height: ${adjust(34) + 1}px;
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
			margin-top: 0;
			margin-right: ${adjust(-7)}px;
			cursor: pointer;

			&:active{
				transform: translateY(1px);
			}

			f-icon{
				margin: auto;
			}

			svg{
				width: ${adjust(20)}px;
				height: ${adjust(20)}px;

				line{
					stroke-width: 0.75 !important;
				}
			}
		}

		@media (max-width: 768px) {
			.close{
				svg{
					width: ${adjust(28)}px;
					height: ${adjust(28)}px;

					line{
						stroke-width: 0.54 !important;
					}
				}
			}
		}

		.actions{
			margin-left: ${adjust(16)}px;

			button{
				margin-left: ${adjust(8)}px;
			}
		}

		.content{
			flex: 1;
			min-height: 0;
			display: flex;
			flex-direction: column;
			overflow-y: auto;
			margin-right: ${adjust(-16)}px;
			padding-right: ${adjust(16)}px;
		}
	`}
	
	slots!: {
		/** As action buttons. */
		action: HTMLElement[]
	}

	/** Modal title. */
	title: string = ''

	/** Whether modal opened. */
	opened: boolean = true

	/** Where to append current dialog. */
	appendTo: string | HTMLElement | null = 'body'

	protected render() {
		let shouldRenderClose = !this.slots.action

		return html`
			<template
				tabindex="0"
				${show(this.opened, {name: 'fade', enterAtStart: true, onend: this.onTransitionEnd})}
			>
				<div class="mask"
					:ref="mask"
					${show(this.opened, {name: 'fade', enterAtStart: true})}
				/>

				<div class="header">
					<div class="title">${this.title}</div>

					<div class="actions" :show=${this.slots.action}>
						<slot name="action" />
					</div>

					${shouldRenderClose ? html`
						<div class="close" @click=${this.hide}>
							<f-icon .type="close" />
						</div>
					` : ''}
				</div>

				<div class="content">
					<slot />
				</div>
			</template>
		`
	}

	protected onTransitionEnd(type: string, finish: boolean) {
		if (type === 'leave' && finish) {
			this.el.remove()
			this.onTransitionLeaveEnd()
		}
	}

	protected onTransitionLeaveEnd() {}

	protected onConnected() {
		untilRenderComplete().then(() => {
			if (this.refs.mask && this.el.previousElementSibling !== this.refs.mask) {
				this.el.before(this.refs.mask)
			}

			this.align()
			on(window, 'resize', this.onWindowResize, this)

			let unwatch = watchLayout(this.el, 'size', () => this.align())
			this.once('disconnected', unwatch)
		})
	}

	protected onDisconnected() {
		if (this.refs.mask) {
			this.refs.mask.remove()
		}
		
		off(window, 'resize', this.onWindowResize, this)
	}

	protected onWindowResize() {
		if (this.opened) {
			this.align()
		}
	}

	protected align() {
		align(this.el, document.documentElement, 'c')
	}

	/**
	 * To show the modal, you may `renderComponent` and then call `show()` or append to `body`.
	 * If you want render modal as a child element  and append into document automatically,
	 * just call `show` in `onConnected`.
	 */ 
	show() {
		this.opened = true

		if (this.appendTo) {
			appendTo(this.el, this.appendTo)
		}
	}

	hide() {
		this.opened = false
	}
}