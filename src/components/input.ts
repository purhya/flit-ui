import {define, Component, css, html, getClosestComponent} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Form} from './form'


interface InputEvents {
	change: (value: string, valid: boolean) => void
}


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
			background: ${backgroundColor.toMiddle(5)};
			box-shadow: inset 0 -1px 0 0 ${borderColor};
		}

		input, textarea{
			width: 100%;
			font-size: ${adjustFontSize(13)}px;
			border: none;
			background: none;
			
			&:focus{
				box-shadow: 0 0 ${focusBlurRadius}px ${mainColor.alpha(0.5)};
			}
		}

		input{
			height: ${adjust(28)}px;
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
			margin-bottom: -${adjust(28)}px;
			font-size: ${adjustFontSize(13)}px;
			color: ${errorColor};
		}
		`
	}

	type: string = 'text'
	touched: boolean = false
	valid: boolean = true
	placeholder: string = ''
	value: string = ''
	validator: ((value: string | number) => string) | null = null
	error: string = ''

	protected onCreated() {
		if (this.validator) {
			this.error = this.validator(this.value)
			this.valid = !this.error
		}

		let form = getClosestComponent(this.el, Form)
		if (form) {
			form.register(this)
		}
	}

	protected render() {
		return html`
		<template
			:class.valid=${this.touched && this.valid === true}
			:class.invalid=${this.touched && this.valid === false}
		>
			<input type=${this.type}
				placeholder=${this.placeholder}
				.value=${this.value}
				:ref="input"
				@blur=${this.onBlur}
				@change=${(e: InputEvent) => this.onChange(e)}
			/>
			${this.touched && this.valid === true ? html`<f-icon class="valid-icon" .type="checked" />` : ''}
			${this.touched && this.error ? html`<div class="error">${this.error}</div>` : ''}
		</template>
		`
	}

	protected onBlur() {
		this.touched = true
	}

	protected onChange(e: InputEvent) {
		let input = e.target as HTMLInputElement
		let value = this.value = input.value

		if (this.validator) {
			this.error = this.validator(value)
			this.valid = !this.error
		}

		this.emit('change', value, this.valid)
	}

	setTouched(touched: boolean) {
		this.touched = touched
	}
}



@define('f-textarea')
export class Textarea extends Input {

	protected render() {
		return html`
		<textarea
			placeholder=${this.placeholder}
			.value=${this.value}
			:ref="input"
			:class.valid=${this.touched && this.valid === true}
			:class.invalid=${this.touched && this.valid === false}
			@focus=${this.onBlur}
			@change=${(e: InputEvent) => this.onChange(e)}
		/>
		`
	}
}
