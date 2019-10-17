import {define, Component, css, html, once} from '@pucelle/flit'
import {theme} from '../style/theme'


interface SearchEvents {
	change: (value: string) => void
}


/** Now only a input, will extend to list suggestted local or remote data in future. */
@define('f-search')
export class Search<E = any> extends Component<SearchEvents & E> {

	static style() {
		let {adjustByLineHeight: lh, lineHeight, borderColor, borderRadius, mainColor, focusBlurRadius} = theme

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
			position: relative;
		}

		input{
			width: 100%;
			border: none;
			background: none;
			height: ${lineHeight}px;
			padding: 0 ${lh(26)}px 0 ${lh(26)}px;
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
			color: ${borderColor.highlight(10)};
		}

		.clear{
			display: flex;
			position: absolute;
			width: ${lh(28)}px;
			top: 0;
			bottom: 0;
			right: 0px;
			color: ${borderColor.highlight(10)};
			cursor: pointer;

			&:hover{
				color: ${mainColor};
			}
		}

		.close-icon{
			margin: auto;
		}
		`
	}

	placeholder: string = ''
	value: string = ''

	protected focused: boolean = false

	protected render() {
		return html`
			<f-icon class="search-icon" .type="search" />

			<input type="text"
				placeholder=${this.placeholder}
				.value=${this.value}
				:ref="input"
				@focus=${this.onFocus}
				@change=${(e: InputEvent) => this.onChange(e)}
			/>

			${this.value && !this.focused ? html`
			<div class="clear" @click=${this.clear}>
				<f-icon class="close-icon" .type="close" />
			</div>` : ''}
		`
	}

	protected onFocus() {
		this.focused = true
		once(this.refs.input, 'blur', () => this.focused = false)
	}

	protected onChange(e: InputEvent) {
		let input = e.target as HTMLInputElement
		let value = this.value = input.value

		this.emit('change', value)
	}

	protected clear() {
		this.value = ''
		this.emit('change', '')
	}
}