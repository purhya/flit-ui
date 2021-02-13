import {defineBinding, Binding, on, getClosestComponentOfType} from '@pucelle/flit'
import {Router} from '../components/router'


/** 
 * A `:goto` binding will goto a target hre after clicking binded element.
 * 
 * `:goto="relativeURL"`
 * `:goto=${relativeURL}`
 */
@defineBinding('goto')
export class GotoBinding implements Binding<string>{
	
	protected readonly el: HTMLElement
	protected router: Router | null = null

	value: string = ''

	constructor(el: Element) {
		this.el = el as HTMLElement
		on(this.el, 'click', this.onClick, this)
	}

	update(value: string) {
		this.value = value
	}

	protected onClick() {
		this.ensureRouter()
		this.router!.goto(this.value)
	}

	protected ensureRouter() {
		if (!this.router) {
			this.router = getClosestComponentOfType(this.el.parentElement!, Router)
			
			if (!this.router) {
				throw new Error(`":goto" must be contained in a extended component of "Router"`)
			}
		}
	}

	remove() {}
}
