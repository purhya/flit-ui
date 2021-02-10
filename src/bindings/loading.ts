import {defineBinding, Binding, TransitionOptions, Transition, render, html, UpdatableOptions} from '@pucelle/flit'
import {LoaderSize} from '../components/loader'


export interface LoadingOptions {
	size?: LoaderSize
	transition?: TransitionOptions
}


const defaultLoadingOptions: LoadingOptions = {
	size: 'medium',
	transition: {name: 'fade'},
}


export class LoadingBinging implements Binding<boolean> {

	protected el: Element
	protected value: boolean = false
	protected options: UpdatableOptions<LoadingOptions> = new UpdatableOptions(defaultLoadingOptions)
	protected cover: HTMLElement | null = null

	constructor(el: Element) {
		this.el = el
	}

	update(value: boolean, options?: LoadingOptions) {
		this.value = value
		this.options.update(options)

		let transition = this.options.get('transition')

		if (this.value) {
			if (this.cover) {
				if (transition) {
					new Transition(this.cover, transition).leave().then(finish => {
						if (finish) {
							this.cover!.remove()
							this.cover = null
						}
					})
				}
				else {
					this.cover!.remove()
					this.cover = null
				}
			}
		}
		else {
			if (!this.cover) {
				this.cover = render(html`<f-loader .size=${this.options.get('size')} .asCover />`).getFirstElement() as HTMLElement
				this.el.append(this.cover)
			}
			
			if (transition) {
				new Transition(this.cover, transition).enter()
			}
		}
	}

	remove() {
		if (this.cover) {
			this.cover.remove()
		}
	}
}

export const loading = defineBinding('loading', LoadingBinging) as (value: boolean, options?: LoadingOptions) => void
