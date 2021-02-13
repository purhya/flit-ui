import {define, Component, css} from '@pucelle/flit'
import {theme} from '../style/theme'


/** `<f-buttongroup>` can contains several `<button>` elements as a button group. */
@define('f-buttongroup')
export class ButtonGroup<E = any> extends Component<E> {

	static style() {
		let {textColor, backgroundColor} = theme

		return css`
		:host{
			display: inline-flex;
			vertical-align: top;
		}

		button{
			&:nth-child(n+2){
				margin-left: -1px;
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
	
			&:nth-last-child(n+2){
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
	
			&[primary]{
				position: relative;
				z-index: 1;
				background: ${textColor};
				border-color: ${textColor};
				color: ${backgroundColor};
			}

			&:hover{
				position: relative;
				z-index: 1;
			}
		}
		`
	}
}