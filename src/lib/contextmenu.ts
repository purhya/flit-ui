import {html, defineBinding, on, renderComponent, off} from 'flit'
import {Layer} from './layer'
import {Menu} from './menu'
import {alignToEvent} from 'ff';


export interface ContextMenuItem {
	id: number | string
	title: string
	icon: string
}


defineBinding('contextmenu', class ContextMenuBinding {

	private el: HTMLElement
	private menu!: Menu
	private layer: Layer | null = null

	constructor(el: Element, menu: unknown) {
		this.el = el as HTMLElement
		this.update(menu as Menu)
		on(this.el, 'contextmenu', this.showMenuInLayer as (e: Event) => void, this)
	}

	async update(menu: Menu) {
		this.menu = menu
	}

	private showMenuInLayer(e: Event) {
		let layer = renderComponent(html`<f-layer/>`) as Layer
		layer.el.append(this.menu.el)
		document.body.append(layer.el)

		alignToEvent(layer.el, e as MouseEvent)
		on(document, 'mousedown', this.onDocMouseDown, this)
	}

	private onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (this.layer && !this.layer.el.contains(target)) {
			off(document, 'mousedown', this.onDocMouseDown, this)
			this.hideLayer()
		}
	}

	private hideLayer() {
		this.layer!.el.remove()
		this.layer = null
		this.menu.el.remove()
	}
})