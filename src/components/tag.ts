import {define, Component, html, css} from '@pucelle/flit'
import {theme} from '../style/theme'


export interface TagEvents {

	/** Triggers after closed tag. */
	close: (value: string | number | null) => void
}


/** `<f-tag>` used to give a label to an item. */
@define('f-tag')
export class Tag<E = any> extends Component<E & TagEvents> {

	static style() {
		let {borderColor, borderRadius, adjust, adjustFontSize} = theme

		return css`
		:host{
			display: inline-flex;
			border: 1px solid ${borderColor};
			border-radius: ${borderRadius}px;
			font-size: ${adjustFontSize(13)}px;
			line-height: ${adjust(18)}px;
			height: ${adjust(20)}px;
			padding: 0 ${adjust(6)}px 0 ${adjust(6)}px;
			cursor: pointer;

			&:hover{
				opacity: 0.9;
			}

			&:active{
				opacity: 0.8;
			}
		}
	
		.icon{
			position: relative;
			top: -1px;
			margin-left: ${adjust(4)}px;
			margin-right: ${adjust(-4)}px;
			display: inline-flex;

			f-icon{
				margin: auto;
			}
		}
		`
	}

	/** Unique value to identify current tag. */
	value: string | number | null = null

	/** 
	 * Whether current tag closeable.
	 * Not tag element were not removed automatically,
	 * you must capture close event and update rendered result.
	 */
	closable: boolean = false

	protected render() {
		return html`
			<slot />
			${this.closable ? html`<div class="icon" @click=${this.close}><f-icon .type="close" /></div>` : ''}
		`
	}

	protected close () {
		this.emit('close', this.value)
	}
}
