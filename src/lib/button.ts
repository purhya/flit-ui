import {define, Component, css} from 'flit'
import {theme} from './theme'


@define('f-button-group')
export class ButtonGroup extends Component {

	static style() {
		let {lineHeight} = theme

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
				padding-left: ${lineHeight / 3}px;
			}
	
			&:nth-last-child(n+2){
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				padding-right: ${lineHeight / 3 + 1}px;
			}
	
			&[filled]{
				position: relative;
				z-index: 1;
			}

			&[round]{
				width: auto;
				padding: 0 ${lineHeight / 5}px;

				&:first-child{
					padding-left: ${lineHeight / 5 + 3}px;
				}
		
				&:last-child{
					padding-right: ${lineHeight / 5 + 3}px;
				}
			}
		}
		`
	}
}