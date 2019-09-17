import {css, define, html, off, defineBinding, on, render, cache, Binding, BindingResult} from 'flit'
import {theme} from '../style/theme'
import {Popup} from '../components/popup'
import {Layer} from '../components/layer'


export interface TooltipOptions {
	alignPosition?: string
	alignMargin?: number | number[]
	showDelay?: number
	hideDelay?: number
}


@define('f-tooltip-layer')
export class TooltipLayer extends Layer {

	static style() {
		let {lh, layerBorderRadius, textColor, backgroundColor} = theme
		
		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1100;
			max-width: ${lh(220)}px;
			padding: ${lh(4)}px ${lh(8)}px;
			line-height: ${lh(22)}px;
			background: ${textColor};
			color: ${backgroundColor};
			border-radius: ${layerBorderRadius / 2}px;
			opacity: 0.9;
			pointer-events: none;
		}

		.trangle{
			position: absolute;
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 7px solid ${textColor};
			top: -7px;

			&-herizontal{
				border-top: 6px solid transparent;
				border-bottom: 6px solid transparent;
				border-right: 7px solid ${textColor};
				border-left: 0;
				top: auto;
				left: -7px;
			}
		}
		`
	}
}


@define('f-tooltip')
export class Tooltip<Events = any> extends Popup<Events> {

	protected title: string = ''

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
		`
	}
}


export class GlobalTooltip extends Tooltip {

	protected keepVisible: boolean = false
	protected locked: boolean = false

	// Can't update `el` since it uses dynamic `el`
	// Otherwise, `onRendered` and `alignLayer` will not be called.
	update() {}

	setEl(el: HTMLElement) {
		if (this.locked) {
			return
		}
		
		if (this.el !== el) {
			off(this.el, 'mouseenter', this.showLayerLater, this)
			this.el = el

			// `el` changed, must unwatch, will watch later by `showLayer`
			this.unwatchEl()
		}
	}

	async setTitleAndOptions(title: string, options: TooltipOptions = {}) {
		if (this.locked) {
			return
		}

		this.setTitle(title)
		Object.assign(this, defaultTooltipOptions, options)

		// When `title` changed, do aligning.
		if (this.opened) {
			await this.showLayer()
		}
	}

	async setTitle(title: string) {
		this.title = title
	}

	async showLayer() {
		// Can't render `<layer>` in current `el` since it's dynamic and blongs to another component.
		if (!this.refs.layer) {
			let {fragment} = render(() => {
				return cache(this.opened ? (this.renderLayer()) : '', this.transition)
			}, this)
			
			// Must append to document, or it will not be linked.
			document.body.append(fragment)
		}

		await super.showLayer()
		this.alignLayer()
	}

	hideLayerLater() {
		if (this.locked) {
			return
		}

		super.hideLayerLater()
	}

	protected onMouseLeave() {
		if (!this.keepVisible) {
			super.onMouseLeave()
		}
	}

	protected shouldHideWhenElLayerChanged() {
		return !this.keepVisible && super.shouldHideWhenElLayerChanged()
	}

	setKeepVisible(keep: boolean) {
		if (this.locked) {
			return
		}

		this.keepVisible = keep
	}

	lock() {
		this.locked = true
	}

	unlock() {
		this.locked = false
	}
}


let globalTooltip: GlobalTooltip | null = null
export async function getGlobalTooltip(el: HTMLElement): Promise<GlobalTooltip> {
	if (!globalTooltip) {
		globalTooltip = new GlobalTooltip(el)
	}
	else {
		globalTooltip.setEl(el)
	}

	return globalTooltip
}


export let defaultTooltipOptions: Required<TooltipOptions> = {
	alignPosition: 't',
	alignMargin: 3,
	showDelay: 0,
	hideDelay: 200,
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
			tooltip.showLayerLater()
		}
	}

	remove() {
		off(this.el, 'mouseenter', this.showTooltipLayer, this)
	}
}

export const tooltip = defineBinding('tooltip', TooltipBinding) as (title: string, options?: TooltipOptions) => BindingResult