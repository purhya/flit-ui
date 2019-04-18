import {css, define, html, on, renderComplete, cache, repeat, off, Component} from "flit"
import {theme} from "./theme"
import {Popup} from "./popup"
import {Color} from "./color"
import {remove, scrollToView, scrollToTop} from "ff"


@define('f-model')
class Model extends Component {

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

			> div{
				display: flex;
				width: 32px;
				cursor: pointer;
				color: #5e5e5e;
				transition: color 0.2s ease-out;
				
				&:hover{
					color: #333;
				}

				&:active .icon{
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

			> :nth-child(n+2){
				margin-left: 4px;
			}

			> :nth-last-child(n+2){
				margin-right: 4px;
			}

			> [align=left]{
				margin-right: auto;
			}

			> [align=right]{
				margin-left: auto;
			}

			> [align=center]{
				margin-left: auto;
				margin-right: auto;
			}
		}
	`}

	opened: boolean = false
	movable: boolean = false
	mask: boolean = true

	//win may zoom out and collapse to a button
	transition: 'fade',

	//extensions may make win wrapped by a mask, so we need a win el
	template: {
		main: `
			<win class="win" f-show="opened" f-transition="{{transition}}" @leaved="onLeaved">
				{mask}
				{top}
				{body}
				{foot}
			</win>
		`,

		mask:  `<div class="win-mask" f-if="mask" f-show="opened" f-transition="{{transition}}" :class="maskClass" f-ref="mask"></div>`,
		top: `<div class="win-top">{head}{actions}</div>`,

		actions: `<div class="win-actions" f-ref="actions">{close}</div>`,
		close: `<div class="win-close" @click="hide" f-ref="close"><icon type="close"></icon></div>`,

		head:  `<slot name="whead" class="win-head" f-ref="head" :style.cursor="movable ? 'move' : ''"></slot>`,
		body:  `<slot name="wbody" class="win-body" f-ref="body"></slot>`,
		foot:  `<slot name="wfoot" class="win-foot" f-ref="foot"></slot>`,
	},

	//if appendTo is a getter, it will can't be overwrite easily with "=" by child
	appendTo () {
		return document.body
	},


	onReady () {
		if (this.movable && this.refs.head) {
			this.el.setMovable(this.el)
		}

		if (this.opened) {
			this.show()
		}

		window.on('resize', ff.debounce(this.onWindowResize, 200), this)
	},


	onLeaved () {
		if (this.destroyAfterHide) {
			this.destroy()
		}
	},


	onDestroy () {
		window.off('resize', this.onWindowResize, this)
	},


	show () {
		if (this.mask) {
			this.el.before(this.refs.mask)
			this.refs.mask.setCSS('z-index', this.el.getCSS('z-index'))
		}

		if (this.opened) {
			this.toCenter()
		}
		else {
			this.el.show()
			this.toCenter()
			this.el.hide()

			this.opened = true

			FF.nextTick(() => {
				this.emit('show')
			})
		}
	},


	hide () {
		this.opened = false
		this.emit('hide')
	},


	toCenter () {
		this.el.alignTo(document.html, 'c')
	},


	toggle () {
		this.hidden ? this.show() : this.hide()
	},


	onWindowResize () {
		if (this.opened) {
			this.toCenter()
		}
	},
})