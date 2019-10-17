import {defineBinding, Context, on, off, renderComplete, define, css, Transition, Binding, once, BindingResult, TemplateResult, DirectiveResult, renderComponent, html} from '@pucelle/flit'
import {alignToEvent, watchLayout, MouseLeave} from '@pucelle/ff'
import {theme} from '../style/theme'
import {Popup} from '../components/popup'

export type MenuRenderFn = () => TemplateResult | DirectiveResult


@define('f-contextmenu-layer')
class ContextMenuLayer<E = any> extends Popup<E> {

	static style() {
		let {adjustByLineHeight: lh} = theme
		
		return css`
		${super.style()}
		:host{
			position: fixed;
			border-radius: 0;
			
			f-menuitem{
				padding: 0 ${lh(2)}px;
			}
		}
		`
	}

	trangle: boolean = false
}


class ContextMenuBinding implements Binding<[MenuRenderFn]> {

	private el: HTMLElement
	private context: Context
	private renderFn!: MenuRenderFn
	private layer: ContextMenuLayer | null = null
	private unwatchRect: (() => void) | null = null
	private unlockOuterMouseLeave: (() => void) | null = null

	constructor(el: Element, context: Context) {
		this.el = el as HTMLElement
		this.context = context
		on(this.el, 'contextmenu.prevent', this.showMenuInLayer, this)
	}

	async update(renderFn: MenuRenderFn) {
		this.renderFn = renderFn
	}

	private async showMenuInLayer(e: Event) {
		let layer = this.renderLayer()

		layer.applyAppendTo()
		await renderComplete()

		alignToEvent(layer.el, e as MouseEvent)
		layer.el.focus()
		this.unlockOuterMouseLeave = MouseLeave.keep(this.el)

		new Transition(layer.el, 'fade').enter()
		on(document, 'mousedown', this.onDocMouseDown, this)
		once(layer.el, 'click', this.hideContextMenu, this)

		this.unwatchRect = watchLayout(this.el, 'rect', this.onLayerRectChanged.bind(this))
	}

	private renderLayer(): ContextMenuLayer  {
		if (!this.layer) {
			this.layer = renderComponent(html`
				<f-contextmenu-layer>
					${this.renderFn()}
				</f-contextmenu-layer>
			`, this.context).component as ContextMenuLayer
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
					this.layer = null
				}
			})
		}

		if (this.unlockOuterMouseLeave) {
			this.unlockOuterMouseLeave()
		}

		if (this.unwatchRect) {
			this.unwatchRect()
			this.unwatchRect = null
		}
	}

	private onLayerRectChanged() {
		this.hideContextMenu()
	}

	remove() {
		off(this.el, 'contextmenu', this.showMenuInLayer, this)
	}
}

export const contextmenu = defineBinding('contextmenu', ContextMenuBinding) as (renderFn: MenuRenderFn) => BindingResult