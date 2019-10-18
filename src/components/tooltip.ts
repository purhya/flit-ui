import {css, define, html} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Popup} from '../components/popup'


export type TooltipType = 'default' | 'prompt' | 'error'


@define('f-tooltip')
export class Tooltip<E = any> extends Popup<E> {

	static style() {
		let {adjustByLineHeight: lh, adjustByFontSize: fs, backgroundColor, textColor, errorColor} = theme
		
		return css`
		:host{
			display: flex;
			font-size: ${fs(13)}px;
			max-width: ${lh(220)}px;
			padding: ${lh(4)}px ${lh(8)}px;
			line-height: ${lh(20)}px;
			pointer-events: none;
		}

		.text{
			flex: 1;
			min-width: 0;
		}

		.close{
			display: flex;
			width: ${lh(28)}px;
			height: ${lh(28)}px;
			margin-top: ${lh(-4)}px;
			margin-bottom: ${lh(-4)}px;
			margin-right: ${lh(-8)}px;
			cursor: pointer;

			&:active{
				transform: translateY(1px);
			}

			f-icon{
				margin: auto;
			}
		}
		
		.default{
			background: ${backgroundColor.highlight(5)};

			.trangle{
				border-bottom-color: ${backgroundColor.highlight(5)};

				&-herizontal{
					border-right-color: ${backgroundColor.highlight(5)};
					border-bottom-color: transparent;
				}
			}
		}

		.prompt{
			background: ${textColor.highlight(30)};
			color: ${backgroundColor};
			pointer-events: auto;

			.trangle{
				border-bottom-color: ${textColor.highlight(30)};

				&-herizontal{
					border-right-color: ${textColor.highlight(30)};
					border-bottom-color: transparent;
				}
			}
		}

		.error{
			background: ${errorColor};
			color: #fff;

			.trangle{
				border-bottom-color: ${errorColor.highlight(5)};

				&-herizontal{
					border-right-color: ${errorColor.highlight(5)};
					border-bottom-color: transparent;
				}
			}
		}
		`.extends(super.style())
	}

	type: TooltipType = 'default'

	protected render() {
		return html`
		<template :class=${this.type}>
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

