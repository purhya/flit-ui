import {defineBinding, on, off, renderComplete, define, css, Transition, Binding} from 'flit'
import {Layer} from './layer'
import {alignToEvent} from 'ff'
import {theme} from './theme'


export interface ContextMenuBindingOptions {
	contextmenu: ContextMenu
	data: unknown
}


@define('f-contextmenu')
export class ContextMenu<Data = unknown, Events = any> extends Layer<Events> {

	static style() {
		let {lh} = theme
		
		return css`
		${super.style()}
		:host{
			f-menuitem{
				padding: 0 ${lh(2)}px;
			}
		}
	`}

	trangle: boolean = false
	currentData: Data | null = null
}


defineBinding('contextmenu', class ContextMenuBinding implements Binding {

	private el: HTMLElement
	private contextMenu!: ContextMenu
	private data: unknown | null = null

	constructor(el: Element, value: unknown) {
		this.el = el as HTMLElement
		this.update(value as ContextMenuBindingOptions)
		on(this.el, 'contextmenu', this.showMenuInLayer as (e: Event) => void, this)
	}

	async update(value: ContextMenuBindingOptions) {
		this.contextMenu = value.contextmenu
		this.data = value.data
	}

	private async showMenuInLayer(e: Event) {
		this.contextMenu.currentData = this.data
		this.contextMenu.applyAppendTo()
		await renderComplete()

		alignToEvent(this.contextMenu.el, e as MouseEvent)
		this.contextMenu.el.focus()

		new Transition(this.contextMenu.el, 'fade').enter()
		on(document, 'mousedown', this.onDocMouseDown, this)
	}

	private onDocMouseDown(e: Event) {
		let target = e.target as Element

		if (this.contextMenu && !this.contextMenu.el.contains(target)) {
			off(document, 'mousedown', this.onDocMouseDown, this)
			this.hideContextMenu()
		}
	}

	private hideContextMenu() {
		new Transition(this.contextMenu!.el, 'fade').leave().then((finish: boolean) => {
			if (finish) {
				this.contextMenu.el.remove()
			}
		})
	}
})