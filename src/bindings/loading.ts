import {define, defineBinding, Binding, TransitionOptions, css, Transition, Component, render, html} from "flit"


@define('loading-cover')
export class LoadingCover extends Component {
	static style() {
		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 10;
			background: rgba(#fff, 0.8);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
		}
		`
	}
}


export interface LoadingOptions {
	transition?: TransitionOptions
}

class LoadingBinging implements Binding<[boolean, LoadingOptions]> {

	private el: Element
	private value: boolean = false
	private transition: TransitionOptions = 'fade'
	private cover: HTMLElement | null = null

	constructor(el: Element) {
		this.el = el
	}

	update(value: boolean, options?: LoadingOptions) {
		this.value = value
		this.transition = options && options.transition ? options.transition : 'fade'

		if (this.value) {
			if (this.cover) {
				if (this.transition) {
					new Transition(this.cover, this.transition).leave().then(finish => {
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
				this.cover = render(html`<f-loading-cover />`).fragment.firstElementChild as HTMLElement
				this.el.append(this.cover)
			}
			
			if (this.transition) {
				new Transition(this.cover, this.transition).enter()
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
