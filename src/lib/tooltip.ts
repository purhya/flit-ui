import {css, define, Component, html, off, once, defineBinding, on, render, renderComplete, updateComponents, renderAndFollowInContext} from "flit"
import {timeout, Timeout, align, getAlignDirection} from "ff"
import {theme} from './theme'
import {Layer, Popup} from "./popup"


@define('f-tooltip-layer')
export class TooltipLayer extends Layer {

	static style() {
		let {lineHeight, borderRadius} = theme
		
		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1100;
			max-width: 220px;
			padding: 4px 8px;
			line-height: ${lineHeight * 0.8}px;
			pointer-events: none;
			background: #333;
			color: #fff;
			border-radius: ${borderRadius}px;
		}

		.trangle{
			position: absolute;
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 7px solid #333;
			top: -7px;

			&-herizontal{
				border-top: 6px solid transparent;
				border-bottom: 6px solid transparent;
				border-right: 7px solid #333;
				border-left: 0;
				top: auto;
				left: -7px;
			}
		}
	`}
}


@define('f-tooltip')
export class Tooltip extends Popup {

	alignMargin: number | number[] = 3
	title: string = ''

	renderLayer() {
		return html`
		<f-tooltip-layer
			:ref="layer"
			:herizontal=${this.isHerizontal()}
			:trangle=${this.hasTrangle}
			:appendTo=${this.appendLayerTo}
			:title=${this.title}
			@rendered=${this.alignLayer}
		>
			${this.title}
		</f-layer>
	`}
}


export class GlobalTooltip extends Tooltip {

	keepVisible: boolean = false

	//When `keepVisible = true`, keep visible until `keepVisible = false`
	private mouseLeaved: boolean = false

	// Can't update `el` since it uses dynamic `el`.
	update() {}

	setEl(el: HTMLElement) {
		if (this.el !== el) {
			off(this.el, 'mouseenter', this.showLayerLater, this)
			this.el = el
		}
	}

	setOptions(options: TooltipOptions) {
		Object.assign(this, defaultTooltipOptions, options)

		if (!this.keepVisible && this.mouseLeaved) {
			this.mouseLeaved = false
			this.hideLayerLater()
		}
	}

	showLayerLater() {
		super.showLayerLater()
		this.mouseLeaved = false
	}

	async showLayer() {
		// Can't render a `<layer>` in current `el` since it's dynamic.
		if (!this.refs.layer) {
			renderAndFollowInContext(this, () => {
				return this.renderLayer()
			})
		}

		await super.showLayer()
	}

	hideLayerLater() {
		if (this.keepVisible) {
			this.mouseLeaved = true
		}
		else {
			super.hideLayerLater()
		}
	}
}


let globalTooltip: GlobalTooltip | null = null
async function getGlobalTooltip(el: HTMLElement): Promise<GlobalTooltip> {
	if (!globalTooltip) {
		globalTooltip = new GlobalTooltip(el)
	}
	else {
		globalTooltip.setEl(el)
	}

	return globalTooltip
}


export interface TooltipOptions {
	title: string
	alignPosition?: string
	alignMargin?: number | number[]
	showDelay?: number
	hideDelay?: number
	keepVisible?: boolean
}

export let defaultTooltipOptions: Required<TooltipOptions> = {
	title: '',
	alignPosition: 't',
	alignMargin: 3,
	showDelay: 0,
	hideDelay: 200,
	keepVisible: true
}


defineBinding('tooltip', class TooltipBinding {

	private el: HTMLElement
	private options: TooltipOptions | null = null
	private timeout: Timeout | null = null

	constructor(el: HTMLElement, value: unknown) {
		this.el = el
		this.update(value as any)

		on(this.el, 'mouseenter', this.showTooltipLayer, this)
	}

	async update(value: TooltipOptions | string) {
		if (typeof value === 'object') {
			this.options = value
		}
		else {
			this.options = {title: value}
		}

		// Update options when the title are showing at current el
		if (globalTooltip && globalTooltip.el === this.el) {
			globalTooltip.setOptions(this.options)
		}
	}

	private async showTooltipLayer() {
		let tooltip = await getGlobalTooltip(this.el)
		if (tooltip.opened) {
			tooltip.showLayer()
		}
		else {
			tooltip.showLayerLater()
		}
	}
})