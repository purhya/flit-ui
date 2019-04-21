import {define, Component, css} from 'flit'
import {theme} from './theme'


@define('f-buttongroup')
export class ButtonGroup extends Component {

	static style() {
		let {lpx} = theme

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
				padding-left: ${lpx(10)}px;
			}
	
			&:nth-last-child(n+2){
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
				padding-right: ${lpx(11)}px;
			}
	
			&[filled]{
				position: relative;
				z-index: 1;
			}

			&[round]{
				width: auto;
				padding: 0 ${lpx(6)}px;

				&:first-child{
					padding-left: ${lpx(8)}px;
				}
		
				&:last-child{
					padding-right: ${lpx(8)}px;
				}
			}
		}
	`}
}