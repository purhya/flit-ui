import {defineBinding, on, off, renderComplete, define, css, Transition} from 'flit'
import {Layer} from './layer'
import {alignToEvent} from 'ff'
import {theme} from './theme'


interface ContextMenuBindOptions {
	contextmenu: ContextMenu
	data: unknown
}

interface ContextMenuEvents {
	select: (data: unknown) => void
}


@define('f-contextmenu')
export class ContextMenu<Data = unknown, Events = any> extends Layer<Events & ContextMenuEvents> {

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
	data: Data | null = null
}


defineBinding('contextmenu', class ContextMenuBinding {

	private el: HTMLElement
	private contextMenu!: ContextMenu
	private data: unknown | null = null

	constructor(el: Element, value: unknown) {
		this.el = el as HTMLElement
		this.update(value as ContextMenuBindOptions)
		on(this.el, 'contextmenu', this.showMenuInLayer as (e: Event) => void, this)
	}

	async update(value: ContextMenuBindOptions) {
		this.contextMenu = value.contextmenu
		this.data = value.data
	}

	private async showMenuInLayer(e: Event) {
		this.contextMenu.data = this.data
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