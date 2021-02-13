import {define, Component, html, css} from '@pucelle/flit'
import {icons} from '../icons/icons'
import {subMatches, animateInterpolatedValue} from '@pucelle/ff'
import {theme} from '../style/theme'


/** `<f-icon type>` will show a specified type svg icon. */
@define('f-icon')
export class Icon<Events = any> extends Component<Events> {

	static style = css`
	:host{
		display: inline-flex;
		stroke: currentColor;
		fill: none;
		margin: auto 0;
		vertical-align: middle;

		svg{
			margin: auto;
		}
	}
	`

	/** 
	 * Icon type.
	 * You may extend icons by `icons.add(...)`.
	 */
	type: string = ''
	
	protected render() {
		let code = icons.get(this.type)
		if (!code) {
			return ''
		}

		let [viewBox, inner] = subMatches(code, /<svg viewBox="(.+?)">([\s\S]+?)<\/svg>/)[0]
		let [,, w, h] = viewBox.split(' ')
		let width = theme.adjust(Number(w))
		let height = theme.adjust(Number(h))

		return html`
		<template>
			<svg
				viewBox=${viewBox}
				width=${width}
				height=${height}
				:html=${inner}
			></svg>
		</template>
		`
	}
}


/** 
 * `<f-icon-loading>` will show a specified type svg icon,
 * and make it keep ratate when it's `loading` state is `true`.
 */
@define('f-icon-loading')
export class IconLoading extends Icon {

	static style = css`
	:host{
		display: inline-flex;
		stroke: currentColor;
		fill: none;
		margin: auto 0;
		vertical-align: top;
		position: relative;
	}`

	/** Loading icon type. Default value is `loading`. */
	type: string = 'refresh'

	/** Whether in loading state. */
	loading: boolean = false

	/** 
	 * Whether is playing animation.
	 * May keep playing for a little while after stop loading.
	 */
	playing: boolean = false

	protected onCreated() {
		this.watchImmediately(() => this.loading, (value) => {
			if (value && !this.playing) {
				this.play()
				this.playing = true
			}
		})
	}

	private play() {
		let fn = (value: number) => {
			this.el.style.transform = `rotate(${value}deg)`
		}

		// Playing web animation will cause svg icon becomes fuzzy.
		animateInterpolatedValue(fn, 0, 360, 1000, 'linear').promise.then(() => {
			if (this.loading) {
				this.play()
			}
			else {
				this.playing = false
			}
		})
	}
}