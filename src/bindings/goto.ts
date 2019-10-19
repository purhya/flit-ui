import {defineBinding, Binding, on, getClosestComponent} from '@pucelle/flit'
import {Router} from '../components/router'


defineBinding('goto', class GotoBinding implements Binding<[string]>{
	
	el: HTMLElement
	value: string = ''
	router: Router | null = null

	constructor(el: Element) {
		this.el = el as HTMLElement
		on(this.el, 'click', this.onClick, this)
	}

	update(value: string) {
		this.value = value
	}

	private onClick() {
		this.ensureRouter()
		this.router!.goto(this.value)
	}

	private ensureRouter() {
		if (!this.router) {
			this.router = getClosestComponent(this.el.parentElement!, Router)
			
			if (!this.router) {
				throw new Error(`":goto" must be contained in a extended component of "<f-router>"`)
			}
		}
	}

	remove() {}
})
