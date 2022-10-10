import {define, css, on} from '@pucelle/flit'
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

	protected onReady(): void {
		super.onReady()

		// Avoid mousedown event at a contextmenu broadcast and cause parent popup hidden. 
		on(this.el, 'mousedown.stop', () => {}, this)
	}
}
