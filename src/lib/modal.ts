import {css, define, html, on, renderComplete, off, Component, TemplateResult} from "flit"
import {theme} from "./theme"
import {debounce, setDraggable, align} from "ff"
import {appendTo} from "flit/out/lib/render"


@define('f-modal')
export class Modal extends Component {

	static style() {
		let {mainColor, textColor, lineHeight, layerRadius} = theme

		return css`
		:host{
			position: fixed;
			display: flex;
			flex-direction: column;
			z-index: 1000;	// Same with layer
			border-radius: ${layerRadius}px;
			box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
			background: #fff;
			max-width: 100%;
			max-height: 100%;
			padding: 0 16px;
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
			height: ${lineHeight * 1.3 + 2}px;
			line-height: ${lineHeight * 1.3}px;
			border-bottom: 2px solid ${textColor};
		}

		.head{
			flex: 1;
			min-width: 0;
			padding: 0 ${lineHeight / 2}px 0 0;
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
				width: ${lineHeight}px;
				height: ${lineHeight}px;
				cursor: pointer;
				color: #5e5e5e;
				transition: color 0.2s ease-out;

				f-icon{
					margin: auto;
				}
				
				&:hover{
					color: #000;
				}

				&:focus{
					color: ${mainColor};
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

	opened: boolean = false
	movable: boolean = false
	mask: boolean = true
	transition: string = 'fade'
	title: string = ''
	appendTo: string | HTMLElement | null = 'body'

	//extensions may make win wrapped by a mask, so we need a win el
	render(): TemplateResult | string | null {
		return html`
		<template
			tabindex="0"
			:show=${{when: this.opened, transition: {name: this.transition, callback: this.onTransitionEnd.bind(this)}}}
		>
		${this.mask ? html`
			<div class="mask"
				:ref="mask"
				:show=${{when: this.opened, transition: this.transition}}
			/>` : ''
		}
			<div class="top">
				<div class="head" :ref="head" :style.cursor=${this.movable ? 'move' : ''}">
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

	onTransitionEnd(type: string, finish: boolean) {
		if (type === 'leave' && finish) {
			if (this.mask) {
				this.refs.mask.remove()
			}
			this.el.remove()
		}
	}

	onReady() {
		if (this.movable && this.refs.head) {
			setDraggable(this.el, this.refs.head)
		}

		on(window, 'resize', debounce(this.onWindowResize, 200).wrapped, this)
	}

	onDisconnected() {
		off(window, 'resize', this.onWindowResize, this)
	}

	onWindowResize() {
		if (this.opened) {
			this.toCenter()
		}
	}

	async show() {
		this.opened = true

		if (this.appendTo) {
			appendTo(this.el, this.appendTo)
		}
		
		if (this.mask && this.refs.mask && this.el.previousElementSibling !== this.refs.mask) {
			this.el.before(this.refs.mask)
		}

		await renderComplete()
		this.toCenter()
		this.el.focus()
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