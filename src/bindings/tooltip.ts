import {html, defineBinding, BindingResult, TemplateResult} from '@pucelle/flit'
import {PopupBinding, PopupOptions} from './popup'
import {getMainAlignDirection, assignIf, ensureWindowLoaded, AlignPosition} from '@pucelle/ff'
import {TooltipType} from '../components/tooltip'


export interface TooltipOptions {
	name?: string
	alignTo?: (trigger: Element) => Element
	alignPosition?: AlignPosition
	alignMargin?: number | number[]
	showDelay?: number
	hideDelay?: number
	type?: TooltipType
}


const defaultTooltipOptions: TooltipOptions = {
	name: 'tooltip',
	alignPosition: 'r',
	alignMargin: 3,
	showDelay: 0,
	hideDelay: 200,
	type: 'default',
}


/**
 * `:tooltip="..."`
 * `tooltip(title, {alignPosition: ..., ...})`
 */
export class TooltipBinding extends PopupBinding<string | TemplateResult> {

	protected title: string | TemplateResult = ''

	update(title: string | TemplateResult, options: TooltipOptions = {}) {
		this.title = title

		if (options.type && ['prompt', 'error'].includes(options.type) && options.name === undefined) {
			options.name = ''
		}

		super.update(this.getRenderFn.bind(this) as any, this.getPopupOptions(options))
	}

	async showPopupLater() {
		// Not popup if no `title` specified.
		if (!this.title) {
			return
		}
		
		await super.showPopupLater()
	}

	protected bindTrigger() {
		if (this.shouldAlwaysKeepVisible()) {
			// If not, page scrolling position may be not determinated yet.
			// So element may be aligned to a wrong position.
			ensureWindowLoaded().then(() => {
				this.showPopupLater()
			})
		}
		else {
			super.bindTrigger()
		}
	}

	protected shouldAlwaysKeepVisible() {
		return ['prompt', 'error'].includes(this.getOption<any>('type'))
	}

	protected bindLeave() {
		if (this.getOption<any>('type') !== 'prompt') {
			super.bindLeave()
		}
	}

	protected onNotInViewport() {
		if (!this.shouldAlwaysKeepVisible()) {
			super.onNotInViewport()
		}
	}

	protected getRenderFn() {
		return html`
			<f-tooltip
				.herizontal=${this.isHerizontal()}
				.type=${this.getOption<any>('type')}
			>
				${this.title}
			</f-tooltip>
		`
	}

	protected getPopupOptions(options: PopupOptions = {}) {
		return assignIf(options, defaultTooltipOptions)
	}

	protected isHerizontal() {
		let direction = getMainAlignDirection(this.options.get('alignPosition'))
		return direction === 'l' || direction === 'r'
	}
}

export const tooltip = defineBinding('tooltip', TooltipBinding) as (title: string | TemplateResult, options?: TooltipOptions) => BindingResult