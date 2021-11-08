import {define, Component, css} from '@pucelle/flit'


/** `<f-buttongroup>` can contains several `<button>` elements as a button group. */
@define('f-buttongroup')
export class ButtonGroup<E = {}> extends Component<E> {

	static style() {
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
			}

			&:hover{
				position: relative;
				z-index: 1;
			}
		}
		`
	}
}