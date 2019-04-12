import {css, define, Component, html, on, off, renderComplete, renderAndUpdate} from "flit"
import {getAlignDirection, watchUntil, onceMouseLeaveAll, align} from "ff"
import {theme} from "./theme"


@define('f-popover')
export class Popover extends Component {

	static style() {
		let {lineHeight} = theme

		return css`
		:host{
			display: inline-block;
		}

		.layer{
			padding: 0 ${lineHeight / 2}px;
		}

		.header{
			display: flex;
			height: ${lineHeight + 2}px;
			line-height: ${lineHeight}px;
			border-bottom: 2px solid #333;
		}

		.title{
			flex: 1;
			min-width: 0;
			padding: 0 ${lineHeight / 2}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.content{
			padding: ${lineHeight / 4}px 0;
		}
		`
	}

	opened: boolean = false
	transition: string = 'fade'
	trangle: boolean = true
	alignPosition: string = 't'
	alignMargin: number | number[] = 3
	trigger: 'hover' | 'click' | 'mouseenter' = 'hover'
	title: string = ''

	private unwatch: (() => void) = () => undefined

	renderLayer() {
		let renderFn = () => {
			let contentInLayer = html`
			${
				this.title ? html`
				<div class="header" :show=${this.title}>
					<div class="title">${this.title}</div>
				</div>` : ''
			}
				<div class="content"><slot name="content" /></div>
			`

			// Why render `layer` to body?
			// It's very common that the `el` is covered or clipped,
			// which will cause the `layer` is not fully visible.

			// Warning:
			// The template `contentInLayer` can't pass into `layer-inner` as an argument,
			// it will cause the template was parsed in `layer-inner` context.
			return html`
			<f-layer-inner
				class="layer"
				:ref="layer"
				:herizontal=${this.isHerizontal()}
				:opened=${this.opened}
				:transition=${this.transition}
				:trangle=${this.trangle}
				:target=${this}
			>
				${contentInLayer}
			</f-layer-inner>`

		}

		document.body.append(renderAndUpdate.call(this, renderFn))
	}

	private isHerizontal() {
		let direction = getAlignDirection(this.alignPosition)
		return direction === 'l' || direction === 'r'
	}

	onCreated () {
		if (this.trigger === 'hover') {
			on(this.el, 'mouseenter', this.show, this)
		}
		else {
			on(this.el, this.trigger, this.show, this)
		}
		
		if (this.opened) {
			this.unwatch = watchUntil(this.el, 'inview', this.show.bind(this))
		}
	}

	async show() {
		if (this.opened) {
			return
		}

		this.opened = true

		if (!this.refs.layer) {
			this.renderLayer()
		}

		document.body.append(this.refs.layer)
		await renderComplete()

		if (this.trigger === 'hover') {
			onceMouseLeaveAll([this.el, this.refs.layer], this.hide.bind(this))
		}
		else {
			on(document, 'mousedown', this.onDocMouseDown, this)
		}

		this.unwatch = watchUntil(this.el, 'outview', this.hide.bind(this))
	}

	align(trangle: HTMLElement | undefined) {
		align(this.refs.layer, this.el, this.alignPosition, {margin: this.alignMargin, canShrinkInY: true, trangle})
	}

	onDocMouseDown(e: Event) {
		let target = e.target as HTMLElement

		if (!this.el.contains(target) && !this.refs.layer!.contains(target)) {
			off(document, 'mousedown', this.onDocMouseDown, this)
			this.hide()
		}
	}

	hide() {
		this.opened = false
		this.unwatch()
	}

	toggleOpened() {
		if (this.opened) {
			this.hide()
		}
		else {
			this.show()
		}
	}
}
