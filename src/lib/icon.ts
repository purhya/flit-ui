import {define, Component, html, css} from 'flit'
import {svgSymbols} from '../../icons/svg-symbol'
import {subMatches, animateByFunction} from 'ff'
import {theme} from './theme'


@define('f-icon')
export class Icon extends Component {

	static style = css`
	:host{
		display: inline-block;
		stroke: currentColor;
		fill: none;
		margin: auto;
		vertical-align: top;
	}
	`

	static properties = ['type']

	type: string = ''
	
	render() {
		let svgCode = (svgSymbols as any)[this.type]
		if (!svgCode) {
			return ''
		}

		let [viewBox, inner] = subMatches(svgCode, /<svg viewBox="(.+?)">([\s\S]+?)<\/svg>/) as string[]
		let [,, w, h] = viewBox.split(' ')
		let rate = theme.lineHeight / 30
		let width = Math.round(Number(w) * rate)
		let height = Math.round(Number(h) * rate)

		return html`
		<template
			:style=${{width, height}}
		>
			<svg
				viewBox=${viewBox}
				:html=${inner}
			></svg>
		</template>
		`
	}
}


@define('f-icon-loading')
export class IconLoading extends Icon {

	static properties = ['type']

	static style = css`
	:host{
		display: inline-block;
		stroke: currentColor;
		fill: none;
		margin: auto;
		vertical-align: top;
		position: relative;
	}`

	type: string = 'loading'
	loading: boolean = false
	playing: boolean = false

	onCreated() {
		this.watchImmediately('loading', (value) => {
			if (value && !this.playing) {
				this.play()
				this.playing = true
			}
		})
	}

	play() {
		let fn = (value: number) => {
			this.el.style.transform = 'rotate(' + value + 'deg)'
		}

		// Playing web animation will cause it becomes fuzzy.
		animateByFunction(fn, 0, 360, 1000, 'linear').promise.then(() => {
			if (this.loading) {
				this.play()
			}
			else {
				this.playing = false
			}
		})
	}
}