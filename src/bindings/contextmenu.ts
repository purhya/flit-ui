import {defineBinding, Context, on, off, renderComplete, define, css, Transition, Binding, once, BindingResult, TemplateResult, DirectiveResult, renderComponent, html} from 'flit'
import {Layer} from '../components/layer'
import {alignToEvent} from 'ff'
import {theme} from '../style/theme'

export type MenuRenderFn = () => TemplateResult | DirectiveResult


@define('f-contextmenu-layer')
export class ContextMenuLayer<Events = any> extends Layer<Events> {

	static style() {
		let {lh} = theme
		
		return css`
		${super.style()}
		:host{
			position: fixed;
			
			f-menuitem{
				padding: 0 ${lh(2)}px;
			}
		}
	`}

	trangle: boolean = false
}


class ContextMenuBinding implements Binding<[MenuRenderFn]> {

	private el: HTMLElement
	private context: Context
	private renderFn!: MenuRenderFn
	private layer: ContextMenuLayer | null = null

	constructor(el: Element, context: Context) {
		this.el = el as HTMLElement
		this.context = context
		on(this.el, 'contextmenu.prevent', this.showMenuInLayer, this)
	}

	async update(renderFn: MenuRenderFn) {
		this.renderFn = renderFn
	}

	private async showMenuInLayer(e: Event) {
		let layer = this.ensureLayer()

		layer.applyAppendTo()
		await renderComplete()

		alignToEvent(layer.el, e as MouseEvent)
		layer.el.focus()

		new Transition(layer.el, 'fade').enter()
		on(document, 'mousedown', this.onDocMouseDown, this)
		once(layer.el, 'click', this.hideContextMenu, this)
	}

	private ensureLayer(): ContextMenuLayer  {
		if (!this.layer) {
			this.layer = renderComponent(html`
				<f-contextmenu-layer>
					${this.renderFn()}
				</f-contextmenu-layer>
			`, this.context) as ContextMenuLayer
		}

		return this.layer!
	}

	private onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (this.layer && !this.layer.el.contains(target)) {
			this.hideContextMenu()
		}
	}

	private hideContextMenu() {
		if (this.layer) {
			off(document, 'mousedown', this.onDocMouseDown, this)
			off(this.layer.el, 'click', this.hideContextMenu, this)

			new Transition(this.layer.el, 'fade').leave().then((finish: boolean) => {
				if (finish) {
					this.layer!.el.remove()
				}
			})
		}
	}

	remove() {
		off(this.el, 'contextmenu', this.showMenuInLayer, this)
	}
}

export const contextmenu = defineBinding('contextmenu', ContextMenuBinding) as (renderFn: MenuRenderFn) => BindingResult