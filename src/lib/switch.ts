import {define, Component, html, css, getEasing} from 'flit'
import {theme} from './theme'


@define('f-switch')
export class Switch extends Component<{change: (value: boolean) => void}> {

	static style() {
		let {mainColor, lineHeight} = theme

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
			width: ${lineHeight * 1.333}px;
			height: ${lineHeight * 0.8}px;
			border-radius: ${lineHeight * 0.4}px;
			padding: 2px;
			margin: ${lineHeight * 0.1}px 0;
			transition: all 0.2s ${getEasing('ease-out-cubic')};
			cursor: pointer;
			background: #ccc;

			&:active{
				background: ${mainColor.mix('#ccc', 66)};
			}
		}
	
		.ball{
			width: ${lineHeight * 0.8 - 4}px;
			height: ${lineHeight * 0.8 - 4}px;
			background: #fff;
			border-radius: 50%;
			transition: all 0.2s ${getEasing('ease-out-cubic')};
		}
	
		.on{		
			background: ${mainColor};

			&:active{
				background: ${mainColor.mix('#ccc', 33)};
			}
		}
	
		.on .ball{
			margin-left: calc(100% - ${lineHeight * 0.8 - 4}px);
		}
		`
	}

	render() {
		return html`
		<template :class.on=${this.value} @@click.stop=${this.onClick}>
			<div class="ball"></div>
		</template>
		`
	}

	value: boolean = false

	onClick () {
		this.value = !this.value
		this.emit('change', this.value)
	}
}
