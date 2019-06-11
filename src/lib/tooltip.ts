import {css, define, html, off, defineBinding, on, renderAndWatch, cache, Binding} from 'flit'
import {theme} from './theme'
import {Popup} from './popup'
import {Layer} from './layer'


@define('f-tooltip-layer')
export class TooltipLayer extends Layer {

	static style() {
		let {lh, layerRadius} = theme
		
		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1100;
			max-width: ${lh(220)}px;
			padding: ${lh(4)}px ${lh(8)}px;
			line-height: ${lh(24)}px;
			background: #333;
			color: #fff;
			border-radius: ${layerRadius / 2}px;
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
			.trangle=${this.hasTrangle}
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

	async setOptions(options: TooltipOptions) {
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
			let {fragment} = renderAndWatch(() => {
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
	keepVisible: false
}


defineBinding('tooltip', class TooltipBinding implements Binding {

	protected el: HTMLElement
	protected options!: TooltipOptions

	constructor(el: Element, value: unknown) {
		this.el = el as HTMLElement
		on(this.el, 'mouseenter', this.showTooltipLayer, this)
		this.update(value as any)
	}

	async update(value: TooltipOptions | string) {
		if (typeof value === 'object') {
			this.options = value
		}
		else {
			this.options = {title: value}
		}

		// Update options when the title are showing at current el.
		if (globalTooltip && globalTooltip.el === this.el && this.hasTitle()) {
			globalTooltip.setOptions(this.options)
		}
	}

	protected hasTitle() {
		let title = this.options!.title
		return title !== null && title !== undefined && String(title)
	}

	protected async showTooltipLayer() {
		if (this.hasTitle()) {
			let tooltip = await getGlobalTooltip(this.el)
			tooltip.setOptions(this.options!)

			if (!tooltip.opened) {
				tooltip.showLayerLater()
			}
		}
	}
})