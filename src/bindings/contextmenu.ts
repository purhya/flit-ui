import {defineBinding, Context, on, off, renderComplete, define, css, Transition, Binding, once, BindingResult, renderComponent, html} from '@pucelle/flit'
import {alignToEvent, watchLayout, MouseLeave} from '@pucelle/ff'
import {theme} from '../style/theme'
import {Popup} from '../components/popup'
import {RenderFn} from './popup'


@define('f-contextmenu')
class ContextMenu<E = any> extends Popup<E> {

	static style() {
		let {adjust} = theme
		
		return css`
		${super.style()}
		:host{
			position: fixed;
			border-radius: 0;
			
			.option__f-list{
				padding: 0 ${adjust(2)}px;
			}
		}
		`.extends(super.style())
	}

	trangle: boolean = false
}


class ContextMenuBinding implements Binding<[RenderFn]> {

	private el: HTMLElement
	private context: Context
	private renderFn!: RenderFn
	private popup: ContextMenu | null = null
	private unwatchRect: (() => void) | null = null
	private unkeepEl: (() => void) | null = null

	constructor(el: Element, context: Context) {
		this.el = el as HTMLElement
		this.context = context
		on(this.el, 'contextmenu.prevent', this.showMenu, this)
	}

	async update(renderFn: RenderFn) {
		this.renderFn = renderFn
	}

	private async showMenu(e: Event) {
		let popup = this.renderPopup()
		popup.applyAppendTo()

		await renderComplete()
		alignToEvent(popup.el, e as MouseEvent)
		popup.el.focus()
		this.unkeepEl = MouseLeave.keep(this.el)

		new Transition(popup.el, 'fade').enter()
		on(document, 'mousedown', this.onDocMouseDown, this)
		once(popup.el, 'click', this.hideContextMenu, this)

		this.unwatchRect = watchLayout(this.el, 'rect', this.onElRectChanged.bind(this))
	}

	private renderPopup(): ContextMenu  {
		if (!this.popup) {
			this.popup = renderComponent(html`
				<f-contextmenu>
					${this.renderFn()}
				</f-contextmenu>
			`, this.context).component as ContextMenu
		}

		return this.popup!
	}

	private onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (this.popup && !this.popup.el.contains(target)) {
			this.hideContextMenu()
		}
	}

	private hideContextMenu() {
		if (this.popup) {
			off(document, 'mousedown', this.onDocMouseDown, this)
			off(this.popup.el, 'click', this.hideContextMenu, this)

			new Transition(this.popup.el, 'fade').leave().then((finish: boolean) => {
				if (finish) {
					this.popup!.el.remove()
					this.popup = null
				}
			})
		}

		if (this.unkeepEl) {
			this.unkeepEl()
			this.unkeepEl = null
		}

		if (this.unwatchRect) {
			this.unwatchRect()
			this.unwatchRect = null
		}
	}

	private onElRectChanged() {
		this.hideContextMenu()
	}

	remove() {
		off(this.el, 'contextmenu', this.showMenu, this)
	}
}

export const contextmenu = defineBinding('contextmenu', ContextMenuBinding) as (renderFn: RenderFn) => BindingResult