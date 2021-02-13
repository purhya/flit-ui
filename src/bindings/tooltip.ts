import {getMainAlignDirection, ensureWindowLoaded, AlignOptions} from '@pucelle/ff'
import {html, defineBinding, BindingResult, TemplateResult} from '@pucelle/flit'
import {PopupBinding, PopupOptions} from './popup'
import {TooltipType} from '../components/tooltip'


export interface TooltipOptions extends PopupOptions{

	/** Tooltip type, `default | prompt | error`. */
	type?: TooltipType
}


const defaultTooltipOptions: TooltipOptions = {
	key: 'tooltip',
	alignPosition: 'r',
	alignMargin: 3,
	showDelay: 0,
	hideDelay: 200,
	triangle: true,
	fixTriangle: false,
	type: 'default',
}


/**
 * A `:tooltip` binding can help to show a short text message beside it's trigger element.
 * 
 * `:tooltip="message"`
 * `:tooltip=${message}`
 */
export class TooltipBinding extends PopupBinding {

	protected title: string | TemplateResult = ''

	update(title: string | TemplateResult | any, options: TooltipOptions = {}) {
		this.title = title

		if (options.type && ['prompt', 'error'].includes(options.type) && options.key === undefined) {
			options.key = ''
		}

		super.update(this.getRenderFn.bind(this) as any, this.getPopupOptions(options))
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
		return {...defaultTooltipOptions, ...options}
	}

	protected isHerizontal() {
		let direction = getMainAlignDirection(this.options.get('alignPosition'))
		return direction === 'l' || direction === 'r'
	}

	showPopupLater() {
		// Not popup if no `title` specified.
		if (!this.title) {
			return
		}
		
		super.showPopupLater()
	}

	protected bindTrigger() {
		if (this.shouldAlwaysKeepVisible()) {
			// If not wait window loaded, page scrolling position may be not determinated yet.
			// So element may be aligned to a wrong position.
			ensureWindowLoaded().then(() => {
				this.showPopupLater()
			})
		}
		else {
			super.bindTrigger()
		}
	}

	/** Whether the tooltip should always visible. */
	protected shouldAlwaysKeepVisible() {
		return ['prompt', 'error'].includes(this.getOption<any>('type'))
	}

	protected bindLeaveEvents() {
		if (!this.shouldAlwaysKeepVisible()) {
			super.bindLeaveEvents()
		}
	}

	protected onNotInViewport() {
		if (!this.shouldAlwaysKeepVisible()) {
			super.onNotInViewport()
		}
	}

	protected getAlignOptions() {
		let triangle = this.popup!.refs.triangle

		return {
			margin: this.getOption('alignMargin'),
			stickToEdges: false,
			canShrinkInY: true,
			triangle,
			fixTriangle: this.getOption('fixTriangle'), 
		} as AlignOptions
	}
}


/**
 * tooltip binding can help to show a short text message.
 * 
 * `tooltip(title, {alignPosition, alignMargin, ...})`
 */
export const tooltip = defineBinding('tooltip', TooltipBinding) as (title: string | TemplateResult, options?: TooltipOptions) => BindingResult