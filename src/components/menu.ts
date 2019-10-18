import {css, define, html} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Popup} from './popup'
import {PopupOptions} from '../bindings/popup'


// Compare to `<popover>`, it can set title too,but contains a List.
@define('f-menu')
export class Menu<E = any> extends Popup<E> {

	static style() {
		let {adjustByLineHeight: lh, adjustByFontSize: fs, textColor} = theme

		return css`
		:host{
			padding: ${lh(8)}px ${lh(16)}px;
			min-width: ${lh(160)}px;
			max-width: ${lh(400)}px;
		}

		.trangle{
			left: ${lh(15)}px;
		}

		.header{
			display: flex;
			line-height: ${lh(22)}px;
			height: ${lh(28)}px;
			font-size: ${fs(13)}px;
			padding-bottom: ${lh(6)}px;
			border-bottom: 1px solid ${textColor.alpha(0.8)};
		}

		.title{
			flex: 1;
			min-width: 0;
			padding: 0 ${lh(16)}px 0 0;
			font-weight: bold;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		:host .option__f-list{
			&:last-child{
				border-bottom: none;
			}
		}
		`.extends(super.style())
	}

	title: string = ''

	defaultPopupOptions: PopupOptions = {
		// `trigger` not work here because when handle it, current component is not created.
		trigger: 'click',
		alignPosition: 'bc',
		fixTrangle: true,
	}

	protected render() {
		return html`
		<f-popup>	
			${this.renderHead()}
			<slot />
		</f-popup>
		`.extends(super.render())
	}

	protected renderHead() {
		if (this.title) {
			return html`
			<div class="header">
				<div class="title">${this.title}</div>
			</div>
			`
		}

		return ''
	}
}
