import {css, define, html} from 'flit'
import {theme} from '../style/theme'
import {Popup} from './popup'


// Compare to `<popup>`, it can set title.
@define('f-popover')
export class Popover<Events = any> extends Popup<Events> {

	static style() {
		let {lh, mainColor} = theme

		return css`
		:host{
			display: inline-block;
		}

		.opened{
			color: ${mainColor};
		}

		.layer{
			padding: 0 ${lh(15)}px;
		}

		.header{
			line-height: ${lh(30)}px;
			padding: 5px 0;
			border-bottom: 2px solid #333;
		}

		.title{
			flex: 1;
			min-width: 0;
			padding: 0 ${lh(15)}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.content{
			padding: ${lh(8)}px 0;
		}
		`
	}

	static properties = [...Popup.properties, 'title']

	title: string = ''

	protected renderLayer() {
		let content = html`
		${
			this.title ? html`
			<div class="header">
				<div class="title">${this.title}</div>
			</div>` : ''
		}
			<div class="content"><slot name="content" /></div>
		`

		return html`
			<f-layer
				class="layer"
				:ref="layer"
				.popup=${this}
				.herizontal=${this.isHerizontal()}
				.trangle=${this.trangle}
			>
				${content}
			</f-layer>
		`
	}
}
