import {define, Component, html, css} from '@pucelle/flit'
import {theme} from '../style/theme'


export interface TagEvents {
	close: () => void
}


@define('f-tag')
export class Tag<E = any> extends Component<E & TagEvents> {

	static style() {
		let {borderColor, borderRadius, adjustByLineHeight: lh, adjustByFontSize: fs} = theme

		return css`
		:host{
			display: inline-flex;
			border: 1px solid ${borderColor};
			border-radius: ${borderRadius}px;
			font-size: ${fs(13)}px;
			line-height: ${lh(18)}px;
			height: ${lh(20)}px;
			padding: 0 ${lh(6)}px 0 ${lh(6)}px;
			cursor: pointer;

			&:hover{
				opacity: 0.9;
			}

			&:active{
				opacity: 0.8;
			}
		}
	
		.icon{
			margin-left: ${lh(4)}px;
			display: inline-flex;

			f-icon{
				margin: auto;
			}
		}
		`
	}

	closable: boolean = false

	protected render() {
		return html`
			<slot />
			${this.closable ? html`<div class="icon" @@click=${this.close}><f-icon .type="close" /></div>` : ''}
		`
	}

	protected close () {
		this.emit('close')
	}
}
