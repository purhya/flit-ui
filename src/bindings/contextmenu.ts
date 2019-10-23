import {defineBinding, Context, on, off, renderComplete, Transition, Binding, once, BindingResult, renderComponent} from '@pucelle/flit'
import {alignToEvent, watchLayout, MouseLeave} from '@pucelle/ff'
import {RenderFn} from './popup'
import {ContextMenu} from '../components/contextmenu'


export class ContextMenuBinding implements Binding<[RenderFn]> {

	protected el: HTMLElement
	protected context: Context
	protected renderFn!: RenderFn
	protected popup: ContextMenu | null = null
	protected unwatchRect: (() => void) | null = null
	protected unkeepEl: (() => void) | null = null

	constructor(el: Element, context: Context) {
		this.el = el as HTMLElement
		this.context = context
		on(this.el, 'contextmenu.prevent', this.showMenu, this)
	}

	async update(renderFn: RenderFn) {
		this.renderFn = renderFn
	}

	protected async showMenu(e: Event) {
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

	protected renderPopup(): ContextMenu  {
		if (!this.popup) {
			this.popup = renderComponent(this.renderFn, this.context).component as ContextMenu
		}

		return this.popup!
	}

	protected onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (this.popup && !this.popup.el.contains(target)) {
			this.hideContextMenu()
		}
	}

	protected hideContextMenu() {
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

	protected onElRectChanged() {
		this.hideContextMenu()
	}

	remove() {
		off(this.el, 'contextmenu', this.showMenu, this)
	}
}


/** 
 * Popup a contextmenu when right click binded element.
 * @param renderFn Should returns a `<f-contextmenu>` result.
 */
export const contextmenu = defineBinding('contextmenu', ContextMenuBinding) as (renderFn: RenderFn) => BindingResult