import {css, define, html} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Popup} from './popup'


// Compare to `<popup>`, it can set title.
@define('f-popover')
export class Popover<E = any> extends Popup<E> {

	static style() {
		let {adjustByLineHeight: lh} = theme

		return css`
		:host{
			padding: 0 ${lh(14)}px;
		}

		.header{
			line-height: ${lh(28)}px;
			padding: 5px 0;
			border-bottom: 2px solid #333;
		}

		.title{
			flex: 1;
			min-width: 0;
			padding: 0 ${lh(14)}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.content{
			padding: ${lh(8)}px 0;
		}
		`.extends(super.style())
	}

	title: string = ''

	protected renderLayer() {
		return html`
		<f-popup>	
		${
			this.title ? html`
			<div class="header">
				<div class="title">${this.title}</div>
			</div>` : ''
		}
			<div class="content"><slot name="content" /></div>
		</f-popup>
		`.extends(super.render())
	}
}
