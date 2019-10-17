import {define, Component, css, html} from '@pucelle/flit'
import {theme} from '../style/theme'


@define('f-loader')
export class Loader<E = any> extends Component<E> {

	static sizes = {
		small: 16,
		medium: 24,
		large: 40,
	}

	static style() {
		let {mainColor} = theme

		return css`
		:host{
			display: block;
			width: 18px;
			height: 18px;
			color: ${mainColor};
		}

		path{
			stroke: currentColor;
			fill: none;
			stroke-linecap: square;
			stroke-width: 3;
		}

		.bg{
			stroke-opacity: 0.3;
		}

		${Object.entries(Loader.sizes).map(([name, size]) => css`
		.size-${name}{
			.snake{
				stroke-dasharray: ${size} ${size * 3};
			}
		}

		@keyframes loader-snake-${name}{
			0%{
				stroke-dashoffset: 0;
			}

			100%{
				stroke-dashoffset: -${size * 4};
			}
		}
		`)}
		`
	}

	size: 'small' | 'medium' | 'large' = 'medium'
	protected round: number = 0

	protected render() {
		let size = Loader.sizes[this.size]
		let d = `M1.5 1.5 H${size - 1.5} V${size - 1.5} H1.5Z`

		return html`
		<template
			:class="size-${this.size}"
			:style.animation="loader-snake-${this.size} 2s linear infinite"
		>
			<svg viewBox="0 0 ${size} ${size}" width=${size} height=${size}>
				<path class="bg" d=${d} />
				<path class="snake" d=${d} />
			</svg>
		<template
		`
	}
}
