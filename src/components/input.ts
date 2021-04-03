import {define, Component, css, html, getClosestComponentOfType} from '@pucelle/flit'
import {tooltip} from '../bindings/tooltip'
import {theme} from '../style/theme'
import {Form} from './form'


interface InputEvents {

	/** Triggers after input every new characters. */
	input: (value: string | number) => void

	/** Triggers after value changed. */
	change: (value: string | number, valid: boolean) => void
}


/** 
 * `<f-input>` works just like a `<input type="text">`,
 * you can also set validator to validate it's value, or set customized error message.
 */
@define('f-input')
export class Input<E = any> extends Component<InputEvents & E> {

	static style() {
		let {adjust, adjustFontSize, errorColor, borderColor, backgroundColor, mainColor, successColor, focusBlurRadius} = theme

		return css`
		:host{
			display: inline-block;
			vertical-align: top;
			position: relative;
			width: ${adjust(200)}px;
			height: ${adjust(28)}px;
			background: ${backgroundColor.toMiddle(5)};
			box-shadow: inset 0 -1px 0 0 ${borderColor};
		}

		input, textarea{
			width: 100%;
			height: 100%;
			border: none;
			background: none;
			
			&:focus{
				box-shadow: 0 0 ${focusBlurRadius}px ${mainColor.alpha(0.5)};
			}
		}

		input{
			height: 100%;
			padding: 0 0 0 ${adjust(8)}px;
		}

		textarea{
			line-height: ${adjust(20)}px;
			padding: ${adjust(4)}px ${adjust(8)}px;
		}

		.valid{
			box-shadow: inset 0 -1px 0 0 ${successColor};

			input, textarea{
				padding-right: ${adjust(28)}px;

				&:focus{
					box-shadow: 0 0 ${focusBlurRadius}px ${successColor.alpha(0.5)};
				}
			}
		}

		.invalid{
			box-shadow: inset 0 -1px 0 0 ${errorColor};

			input, textarea{
				padding-right: ${adjust(28)}px;

				&:focus{
					box-shadow: 0 0 ${focusBlurRadius}px ${errorColor.alpha(0.5)};
				}
			}
		}

		.valid-icon{
			position: absolute;
			top: 0;
			bottom: 0;
			right: 6px;
			color: ${successColor};
		}

		.error{
			position: absolute;
			left: 0;
			top: 100%;
			font-size: ${adjustFontSize(13)}px;
			line-height: ${adjust(22)}px;
			color: ${errorColor};
		}
		`
	}

	/** When in composition inputting. */
	protected inCompositionInputting: boolean = false

	readonly refs!: {
		input: HTMLInputElement
	}

	/** Input type, same with `<input type=...>`. */
	type: 'text' | 'password' = 'text'

	/** Whether input was touched, error messages only appear after touched. */
	touched: boolean = false

	/** Whether current input is valid, be `null` if not validated yet. */
	valid: boolean | null = null

	/** Placeholder when input is empty. */
	placeholder: string = ''

	/** Current value. */
	value: string = ''

	/** To validate current value, returns an error message or `null` if passes. */
	validator: ((value: string) => string) | null = null

	/** Custom error message. */
	error: string = ''

	/** Whether show error on a tooltip, so it doesn't need to leave a space for error message. */
	errorInTooltip: boolean = false

	protected onCreated() {
		this.validate()

		let form = getClosestComponentOfType(this.el, Form)
		if (form) {
			form.register(this)
		}
	}

	protected render() {
		let errorTip = this.errorInTooltip && this.error && this.touched
			? tooltip(this.error, {type: 'error'})
			: null

		return html`
			<template
				:class.valid=${this.touched && this.valid}
				:class.invalid=${this.touched && this.valid === false}
			>
				<input type=${this.type}
					.placeholder=${this.placeholder || ''}
					.value=${this.value}
					:ref="input"
					${errorTip}
					@blur=${this.onBlur}
					@compositionstart=${this.onCompositionStart}
					@compositionend=${this.onCompositionEnd}
					@input=${this.onInput}
					@change=${this.onChange}
				/>
				${this.touched && this.valid ? html`<f-icon class="valid-icon" .type="checked" />` : ''}
				${this.touched && this.error && !this.errorInTooltip ? html`<div class="error">${this.error}</div>` : ''}
			</template>
		`
	}

	protected onBlur() {
		this.touched = true

		// Validate after change event is not enough.
		// We clear error message after input,
		// So may still not valid even though not changed.
		this.validate()
	}

	protected onCompositionStart() {
		this.inCompositionInputting = true
	}

	protected onCompositionEnd() {
		this.inCompositionInputting = false
		this.onInput()
	}

	protected onInput() {
		if (this.inCompositionInputting) {
			return
		}

		let value = this.refs.input.value

		if (this.validator) {
			this.valid = null
			this.error = ''
		}

		this.emit('input', value)
	}

	protected onChange() {
		let input = this.refs.input
		let value = this.value = input.value

		this.validate()
		this.emit('change', value, this.valid)
	}

	protected validate() {
		if (this.validator) {
			this.error = this.validator(this.value)
			this.valid = !this.error
		}
	}

	/** Set `touched` property. */
	setTouched(touched: boolean) {
		this.touched = touched
	}
}


/** 
 * `<f-textarea>` works just like a `<textarea>`,
 * you can also set validator to validate it's value, or set customized error message.
 */
@define('f-textarea')
export class Textarea extends Input {

	static style() {
		return css`
		:host{
			height: auto;
		}
		`.extends(super.style())
	}

	protected render() {
		return html`
			<textarea
				placeholder=${this.placeholder}
				.value=${this.value}
				:ref="input"
				:class.valid=${this.touched && this.valid === true}
				:class.invalid=${this.touched && this.valid === false}
				@focus=${this.onBlur}
				@input=${this.onInput}
				@change=${this.onChange}
			/>
		`
	}
}
