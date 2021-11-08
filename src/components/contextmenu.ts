import {define, css} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Popup} from '../components/popup'


/** `<f-contextmenu>` is used for render a context menu after right clicking. */
@define('f-contextmenu')
export class ContextMenu<E = {}> extends Popup<E> {

	static style() {
		let {adjust} = theme
		
		return css`
		${super.style()}
		:host{
			position: fixed;
			border-radius: 0;
			
			.option__f-list{
				padding: ${adjust(2)}px ${adjust(8)}px;
			}

			f-list{
				border-bottom: none;
			}
		}
		`.extends(super.style())
	}

	triangle: boolean = false
}
