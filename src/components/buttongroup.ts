import {define, Component, css} from 'flit'
import {theme} from '../style/theme'


@define('f-buttongroup')
export class ButtonGroup<Events = any> extends Component<Events> {

	static style() {
		let {lh} = theme

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
				padding-left: ${lh(10)}px;
			}
	
			&:nth-last-child(n+2){
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				padding-right: ${lh(11)}px;
			}
	
			&[filled]{
				position: relative;
				z-index: 1;
			}

			&[round]{
				width: auto;
				padding: 0 ${lh(6)}px;

				&:first-child{
					padding-left: ${lh(8)}px;
				}
		
				&:last-child{
					padding-right: ${lh(8)}px;
				}
			}
		}
	`}
}