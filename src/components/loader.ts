import {define, Component, css, html} from '@pucelle/flit'
import {theme} from '../style/theme'


export type LoaderSize = 'small' | 'medium' | 'large'


@define('f-loader')
export class Loader<E = any> extends Component<E> {

	static sizes: {[key in LoaderSize]: number} = {
		small: 18,
		medium: 28,
		large: 48,
	}

	static strokeWidths: {[key in LoaderSize]: number} = {
		small: 3,
		medium: 4,
		large: 5,
	}

	static style() {
		let {mainColor, backgroundColor} = theme

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
			color: ${mainColor};
		}

		.as-cover{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 10;
			background: ${backgroundColor.alpha(0.9)};
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
		}

		svg{
			margin: auto;
		}

		path{
			stroke: currentColor;
			fill: none;
			stroke-linecap: square;
		}

		.bg{
			stroke-opacity: 0.3;
		}
		`
	}

	size: LoaderSize = 'medium'
	asCover: boolean = false

	protected render() {
		let strokeWidth = this.getStrokeWidth()
		let halfWidth = strokeWidth / 2
		let size = Loader.sizes[this.size]
		let d = `M${halfWidth} ${halfWidth} H${size - halfWidth} V${size - halfWidth} H${halfWidth}Z`
		let dashArray = `${size - strokeWidth} ${(size - strokeWidth) * 3}`

		return html`
		<template
			:class="size-${this.size}"
			:class.as-cover=${this.asCover}
			:style.width.px=${size}
			:style.height.px=${size}
			:style.animation="loader-snake-${this.size} 2s linear infinite"
		>
			<svg viewBox="0 0 ${size} ${size}" width=${size} height=${size}>
				<path class="bg" d=${d} style="stroke-width: ${strokeWidth}" />
				<path :ref="snake" d=${d} style="stroke-width: ${strokeWidth}; stroke-dasharray: ${dashArray};" />
			</svg>
		</template>
		`
	}

	protected getStrokeWidth() {
		return Loader.strokeWidths[this.size]
	}

	protected onReady() {
		let strokeWidth = this.getStrokeWidth()
		let size = Loader.sizes[this.size]

		this.refs.snake.animate([
			{
				strokeDashoffset: 0,
			},
			{
				strokeDashoffset: - (size - strokeWidth) * 4,
			}
		], 
		{
			duration: 1500,
			iterations: Infinity
		})
	}
}
