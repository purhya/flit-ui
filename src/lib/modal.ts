import {css, define, html, on, renderComplete, off, Component, appendTo, show} from 'flit'
import {theme} from './theme'
import {debounce, align} from 'ff'


@define('f-modal')
export class Modal<Events = any> extends Component<Events> {

	static style() {
		let {mainColor, textColor, layerBorderRadius, shadowBlurRadius, lh} = theme

		return css`
		:host{
			position: fixed;
			display: flex;
			flex-direction: column;
			z-index: 1000;	// Same with layer
			border-radius: ${layerBorderRadius}px;
			box-shadow: 0 0 ${shadowBlurRadius}px rgba(0, 0, 0, 0.2);
			background: #fff;
			max-width: 100%;
			max-height: 100%;
			padding: 0 ${lh(15)}px;
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

		.top{
			display: flex;
			height: ${lh(40) + 2}px;
			line-height: ${lh(40)}px;
			border-bottom: 2px solid ${textColor};
		}

		.head{
			flex: 1;
			min-width: 0;
			padding: 0 ${lh(15)}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.actions{
			display: flex;
			margin-right: -10px;

			button{
				all: unset;
				border: none;
				margin: auto 0;
				display: flex;
				width: ${lh(30)}px;
				height: ${lh(30)}px;
				cursor: pointer;
				color: #333;
				transition: color 0.2s ease-out;

				f-icon{
					margin: auto;
				}
				
				&:hover{
					svg{
						stroke-width: 1.5;
					}
				}

				&:focus{
					color: ${mainColor};
					box-shadow: none;

					svg{
						stroke-width: 1.5;
					}
				}

				&:active{
					transform: translateY(1px);
				}
			}
		}

		.body{
			flex: 1;
			min-height: 0;
			position: relative;
		}

		.foot{
			flex: none;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 16px 0;

			button:nth-child(n+2){
				margin-left: 4px;
			}

			button:nth-last-child(n+2){
				margin-right: 4px;
			}

			button[align=left]{
				margin-right: auto;
			}

			button[align=right]{
				margin-left: auto;
			}

			button[align=center]{
				margin-left: auto;
				margin-right: auto;
			}
		}
	`}

	static properties: ['mask', 'title']

	mask: boolean = true
	title: string = ''
	opened: boolean = false
	transition: string = 'fade'
	appendTo: string | HTMLElement | null = 'body'

	//extensions may make win wrapped by a mask, so we need a win el
	protected render() {
		return html`
		<template
			tabindex="0"
			${show(this.opened, {transition: this.transition, enterAtStart: true, onend: this.onTransitionEnd})}
		>
		${this.mask ? html`
			<div class="mask"
				:ref="mask"
				${show(this.opened, {transition: this.transition, enterAtStart: true})}
			/>` : ''
		}
			<div class="top">
				<div class="head" :ref="head">
					${this.title}
				</div>
				<div class="actions">
					<button tabindex="0" @click=${this.hide}>
						<f-icon type="close" />
					</button>
				</div>
			</div>
			<div class="body"><slot name="body" /></div>
			<div class="foot"><slot name="foot" /></div>
		</template>
	`}

	protected onTransitionEnd(type: string, finish: boolean) {
		if (type === 'leave' && finish) {
			if (this.mask) {
				this.refs.mask.remove()
			}
			this.el.remove()
		}
	}

	protected onReady() {
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

	async show() {
		this.opened = true

		if (this.appendTo) {
			appendTo(this.el, this.appendTo)
		}
		
		await renderComplete()
		
		if (this.mask && this.refs.mask && this.el.previousElementSibling !== this.refs.mask) {
			this.el.before(this.refs.mask)
		}

		this.toCenter()

		if (this.el.tabIndex === 0) {
			this.el.focus()
		}
	}

	toCenter() {
		align(this.el, document.documentElement, 'c')
	}

	hide() {
		this.opened = false
	}

	toggleOpened() {
		this.opened ? this.hide() : this.show()
	}
}