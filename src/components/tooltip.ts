import {css, define, html} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Popup} from '../components/popup'
import {Color} from '../style/color'


export type TooltipType = 'default' | 'prompt' | 'error'


@define('f-tooltip')
export class Tooltip<E = any> extends Popup<E> {

	static style() {
		let {adjust, adjustFontSize, backgroundColor, textColor, errorColor} = theme

		let types = [
			['default', backgroundColor.toMiddle(5)],
			['prompt', textColor.toMiddle(30)],
			['error', errorColor.toMiddle(5)]
		] as [TooltipType, Color][]

		return css`
		:host{
			display: flex;
			font-size: ${adjustFontSize(13)}px;
			max-width: ${adjust(220)}px;
			padding: ${adjust(4)}px ${adjust(8)}px;
			line-height: ${adjust(20)}px;
			pointer-events: none;
		}

		.text{
			flex: 1;
			min-width: 0;
		}

		.close{
			display: flex;
			width: ${adjust(28)}px;
			height: ${adjust(28)}px;
			margin-top: ${adjust(-4)}px;
			margin-bottom: ${adjust(-4)}px;
			margin-right: ${adjust(-8)}px;
			cursor: pointer;

			&:active{
				transform: translateY(1px);
			}

			f-icon{
				margin: auto;
			}
		}

		${types.map(([type, color]) => {
			let textColor = color.getLightness() > 0.5 ? '#000' : '#fff'

			return css`
			.type-${type}{
				background: ${color};
				color: ${textColor};

				.trangle{
					border-bottom-color: ${color};

					&-herizontal{
						border-right-color: ${color};
						border-bottom-color: transparent;
					}
				}
			}
			`
		})}

		.type-prompt{
			pointer-events: auto;
		}

		`.extends(super.style())
	}

	type: TooltipType = 'default'

	protected render() {
		return html`
		<template class="type-${this.type}">
			<div class="text">
				<slot />
			</div>

			${this.type === 'prompt' ? html`
				<div class="close" @click=${this.close}>
					<f-icon .type="close" />
				</div>
			` : ''}
		</template>
		`.extends(super.render())
	}
}

