import {css, define, html, off, defineBinding, on, render, cache, Binding, BindingResult} from 'flit'
import {theme} from '../style/theme'
import {Popup} from '../components/popup'
import {Layer} from '../components/layer'


@define('f-tooltip-layer')
export class TooltipLayer extends Layer {

	static style() {
		let {lh, layerBorderRadius} = theme
		
		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1100;
			max-width: ${lh(220)}px;
			padding: ${lh(4)}px ${lh(8)}px;
			line-height: ${lh(22)}px;
			background: #333;
			color: #fff;
			border-radius: ${layerBorderRadius / 2}px;
			opacity: 0.9;
			pointer-events: none;
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
export class Tooltip<Events = any> extends Popup<Events> {

	title: string = ''

	protected renderLayer() {
		return html`
		<f-tooltip-layer
			:ref="layer"
			.popup=${this}
			.herizontal=${this.isHerizontal()}
			.trangle=${this.trangle}
		>
			${this.title}
		</f-layer>
	`}
}


export class GlobalTooltip extends Tooltip {

	keepVisible: boolean = false

	// When `keepVisible = true`, keep visible until `keepVisible = false`.
	protected mouseLeaved: boolean = false

	// Can't update `el` since it uses dynamic `el`
	// Otherwise, `onRendered` and `alignLayer` will not be called.
	update() {}

	setEl(el: HTMLElement) {
		if (this.el !== el) {
			off(this.el, 'mouseenter', this.showLayerLater, this)
			this.el = el
		}
	}

	async setTitleAndOptions(title: string, options: TooltipOptions = {}) {
		this.title = title
		Object.assign(this, defaultTooltipOptions, options)

		// When no need to keep `layer` visible.
		if (!this.keepVisible && this.mouseLeaved) {
			this.mouseLeaved = false
			this.hideLayerLater()
		}

		// When `title` changed, do aligning.
		else if (this.opened) {
			await this.showLayer()
		}
	}

	showLayerLater() {
		super.showLayerLater()
		this.mouseLeaved = false
	}

	async showLayer() {
		// Can't render `<layer>` in current `el` since it's dynamic and blongs to another component.
		if (!this.refs.layer) {
			let fragment = render(() => {
				return cache(this.opened ? (this.renderLayer()) : '', this.transition)
			}, this)
			
			// Must append to document, or it will not be linked.
			document.body.append(fragment)
		}

		await super.showLayer()
		this.alignLayer()
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
	alignPosition?: string
	alignMargin?: number | number[]
	showDelay?: number
	hideDelay?: number
	keepVisible?: boolean
}

export let defaultTooltipOptions: Required<TooltipOptions> = {
	alignPosition: 't',
	alignMargin: 3,
	showDelay: 0,
	hideDelay: 200,
	keepVisible: false
}


/**
 * `:tooltip="..."`
 * `tooltip(title: string, {alignPosition: ..., ...})`
 */
class TooltipBinding implements Binding<[string, TooltipOptions | undefined]> {

	private el: HTMLElement
	private title: string = ''
	private options!: TooltipOptions

	constructor(el: Element) {
		this.el = el as HTMLElement
		on(this.el, 'mouseenter', this.showTooltipLayer, this)
	}

	async update(title: string, options?: TooltipOptions) {
		this.title = title
		this.options = options || {}

		// Update options when the title are showing at current el.
		if (globalTooltip && globalTooltip.el === this.el && this.hasTitle()) {
			globalTooltip.setTitleAndOptions(title, options)
		}
	}

	private hasTitle() {
		return this.title !== null && this.title !== undefined && this.title
	}

	private async showTooltipLayer() {
		if (this.hasTitle()) {
			let tooltip = await getGlobalTooltip(this.el)
			tooltip.setTitleAndOptions(this.title, this.options!)

			if (!tooltip.opened) {
				tooltip.showLayerLater()
			}
		}
	}

	remove() {
		off(this.el, 'mouseenter', this.showTooltipLayer, this)
	}
}

export const tooltip = defineBinding('tooltip', TooltipBinding) as (title: string, options?: TooltipOptions) => BindingResult