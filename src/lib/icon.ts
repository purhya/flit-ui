import {define, Component, html, css} from 'flit'
import {svgSymbols} from '../icons/svg-symbol'
import {subMatches, animateByFunction, toPower} from 'ff'
import {theme} from './theme'


@define('f-icon')
export class Icon extends Component {

	static style = css`
	:host{
		display: inline-flex;
		stroke: currentColor;
		fill: none;
		margin: auto 0;
		vertical-align: top;

		svg{
			margin: auto;
		}
	}
	`

	static properties = ['type']

	type: string = ''
	
	protected render() {
		let svgCode = (svgSymbols as any)[this.type]
		if (!svgCode) {
			return ''
		}

		let [viewBox, inner] = subMatches(svgCode, /<svg viewBox="(.+?)">([\s\S]+?)<\/svg>/)[0]
		let [,, w, h] = viewBox.split(' ')
		let width = theme.lh(Number(w))
		let height = theme.lh(Number(h))
		let strokeWidth = Math.max(1, toPower(20 / width, -2))

		return html`
		<template>
			<svg
				viewBox=${viewBox}
				width=${width}
				height=${height}
				stroke-width=${strokeWidth}
				:html=${inner}
			/>
		</template>
		`
	}
}


@define('f-icon-loading')
export class IconLoading extends Icon {

	static properties = ['type']

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