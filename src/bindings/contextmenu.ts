import {defineBinding, on, off, renderComplete, define, css, Transition, Binding, once, BindingResult} from 'flit'
import {Layer} from '../components/layer'
import {alignToEvent} from 'ff'
import {theme} from '../style/theme'


@define('f-contextmenu')
export class ContextMenu<Item = unknown, Events = any> extends Layer<Events> {

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
	currentData: Item | null = null
}


class ContextMenuBinding<Item> implements Binding<[ContextMenu<Item>, Item]> {

	private el: HTMLElement
	private contextMenu!: ContextMenu
	private data: Item | null = null

	constructor(el: Element) {
		this.el = el as HTMLElement
		on(this.el, 'contextmenu.prevent', this.showMenuInLayer, this)
	}

	async update(contextmenu: ContextMenu<Item>, data: Item) {
		if (!contextmenu) {
			throw new Error(`The first argument "contextmenu" of ":contextmenu" binding must be provided`)
		}

		this.contextMenu = contextmenu
		this.data = data
	}

	private async showMenuInLayer(e: Event) {
		this.contextMenu.currentData = this.data
		this.contextMenu.applyAppendTo()
		await renderComplete()

		alignToEvent(this.contextMenu.el, e as MouseEvent)
		this.contextMenu.el.focus()

		new Transition(this.contextMenu.el, 'fade').enter()
		on(document, 'mousedown', this.onDocMouseDown, this)
		once(this.contextMenu.el, 'click', this.hideContextMenu, this)
	}

	private onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (this.contextMenu && !this.contextMenu.el.contains(target)) {
			this.hideContextMenu()
		}
	}

	private hideContextMenu() {
		off(document, 'mousedown', this.onDocMouseDown, this)
		off(this.contextMenu.el, 'click', this.hideContextMenu, this)

		new Transition(this.contextMenu!.el, 'fade').leave().then((finish: boolean) => {
			if (finish) {
				this.contextMenu.el.remove()
			}
		})
	}

	remove() {
		off(this.el, 'contextmenu.prevent', this.showMenuInLayer, this)
	}
}

export const contextmenu = defineBinding('contextmenu', ContextMenuBinding) as <Item>(contextMenu: ContextMenu<Item>, data: Item) => BindingResult