import {define, Component, css, html, once, on} from '@pucelle/flit'
import {theme} from '../style/theme'


interface SearchEvents {

	/** Triggers after search value changed. */
	change: (value: string) => void
}


/** 
 * `<f-search>` can be inputted text to do searching.
 * Now only a input, will extend to list suggestted local or remote data in future.
 */
@define('f-search')
export class Search<E = {}> extends Component<SearchEvents & E> {

	static style() {
		let {adjust, borderColor, borderRadius, mainColor, focusBlurRadius, lineHeight, fieldBackgroundColor} = theme

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
			position: relative;
		}

		input{
			width: 100%;
			border: none;
			background: ${fieldBackgroundColor};
			height: ${adjust(28)}px;
			padding: 0 ${adjust(lineHeight - 2)}px 0 ${adjust(lineHeight - 2)}px;
			line-height: ${lineHeight - 2}px;
			border: 1px solid ${borderColor};
			border-radius: ${borderRadius}px;
			
			&:focus{
				border-color: ${mainColor};
				box-shadow: 0 0 ${focusBlurRadius}px ${mainColor.alpha(0.5)};
			}
		}

		.search-icon{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 8px;
			color: ${borderColor.toMiddle(10)};
		}

		.clear{
			display: flex;
			position: absolute;
			width: ${adjust(28)}px;
			top: 0;
			bottom: 0;
			right: 0px;
			color: ${borderColor.toMiddle(10)};
			cursor: pointer;

			&:hover{
				color: ${mainColor};
			}

			&:active{
				transform: translateY(1px);
			}
		}

		.close-icon{
			margin: auto;
		}
		`
	}

	refElements!: {

		/** Search input element. */
		input: HTMLInputElement
	}

	/** Whether search input get focus. */
	protected focused: boolean = false

	/** When in composition inputting. */
	protected inCompositionInputting: boolean = false

	/** 
	 * Whether update value after change event.
	 * If is `false`, update value after input event.
	 */
	readonly lazy: boolean = true

	/** Search input placeholder. */
	placeholder: string = ''

	/** Current inputted value. */
	value: string = ''

	protected render() {
		return html`
			<f-icon class="search-icon" .type="search" />

			<input type="text"
				placeholder=${this.placeholder}
				.value=${this.value}
				:refElement="input"
				@focus=${this.onFocus}
			/>

			${
				this.value
				? html`
					<div class="clear" @click.stop=${this.clear}>
						<f-icon class="close-icon" .type="close" />
					</div>`
				: ''
			}
		`
	}

	protected onReady() {
		if (this.lazy) {
			on(this.refElements.input, 'change', this.onChange, this)
		}
		else {
			on(this.refElements.input, 'compositionstart', this.onCompositionStart, this)
			on(this.refElements.input, 'compositionend', this.onCompositionEnd, this)
			on(this.refElements.input, 'input', this.onInput, this)
		}
	}

	protected onFocus() {
		this.focused = true
		once(this.refElements.input, 'blur', () => this.focused = false)
	}

	protected onChange() {
		this.updateValue()
	}

	protected onCompositionStart() {
		this.inCompositionInputting = true
	}

	protected onCompositionEnd() {
		this.inCompositionInputting = false
		this.onInput()
	}

	protected onInput() {
		this.updateValue()
	}

	protected updateValue(this: Search) {
		if (this.inCompositionInputting) {
			return
		}

		this.value = this.refElements.input.value
		this.emit('change', this.value)
	}

	protected clear(this: Search) {
		this.value = ''
		this.emit('change', '')
	}
}