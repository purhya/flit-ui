import {css, define, html} from "flit"
import {theme} from "./theme"
import {Popup} from "./popup"


// Compare to `<popup>`, it can set title.
@define('f-popover')
export class Popover extends Popup {

	static style() {
		let {lineHeight} = theme

		return css`
		:host{
			display: inline-block;
		}

		.layer{
			padding: 0 ${lineHeight / 2}px;
		}

		.header{
			line-height: ${lineHeight}px;
			padding: 5px 0;
			border-bottom: 2px solid #333;
		}

		.title{
			flex: 1;
			min-width: 0;
			padding: 0 ${lineHeight / 2}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.content{
			padding: ${lineHeight / 4}px 0;
		}
	`}

	title: string = ''

	renderLayer() {
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
				:popup=${this}
				:herizontal=${this.isHerizontal()}
				:trangle=${this.hasTrangle}
			>
				${content}
			</f-layer>
		`
	}
}
