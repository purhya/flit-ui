import {html, defineBinding, BindingResult} from '@pucelle/flit'
import {PopupBinding, PopupOptions} from './popup'
import {getMainAlignDirection, assignIf} from '@pucelle/ff'
import {TooltipType} from '../components/tooltip'


export interface TooltipOptions {
	name?: string
	alignTo?: () => Element
	alignPosition?: string
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
export class TooltipBinding extends PopupBinding<string> {

	protected title: string = ''

	update(title: string, options: TooltipOptions = {}) {
		this.title = title

		if (options.type && ['prompt', 'error'].includes(options.type) && options.name === undefined) {
			options.name = ''
		}

		super.update(this.getRenderFn.bind(this) as any, this.getPopupOptions(options))
	}

	protected bindTrigger() {
		if (['prompt', 'error'].includes(this.getOption<any>('type'))) {
			this.showPopupLater()
		}
		else {
			super.bindTrigger()
		}
	}

	protected bindLeave() {
		if (this.getOption<any>('type') !== 'prompt') {
			super.bindLeave()
		}
	}

	protected shouldHideWhenElLayerChanged(): boolean {
		if (['prompt', 'error'].includes(this.getOption<any>('type'))) {
			return false
		}

		return super.shouldHideWhenElLayerChanged()
	}

	protected onNotInViewport() {}

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

export const tooltip = defineBinding('tooltip', TooltipBinding) as (title: string, options?: TooltipOptions) => BindingResult