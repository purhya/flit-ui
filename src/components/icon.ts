import {define, Component, html, css} from '@pucelle/flit'
import {SVGIconMap} from '../icons/svg-icons'
import {subMatches, animateInterpolatedValue} from '@pucelle/ff'
import {theme} from '../style/theme'


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

	type: string = ''
	
	protected render() {
		let code = SVGIconMap.get(this.type)
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

	type: string = 'loading'
	loading: boolean = false
	playing: boolean = false

	onCreated() {
		this.watchImmediately(() => this.loading, (value) => {
			if (value && !this.playing) {
				this.play()
				this.playing = true
			}
		})
	}

	private play() {
		let fn = (value: number) => {
			this.el.style.transform = 'rotate(' + value + 'deg)'
		}

		// Playing web animation will cause it becomes fuzzy.
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