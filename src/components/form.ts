import {define, Component, css} from '@pucelle/flit'
import {Input, Textarea} from './input'


/** `<f-form>` can contain `<f-input>` or `<f-textarea>` and check their valid state in bundle. */
@define('f-form')
export class Form<E = {}> extends Component<E> {

	static style() {
		return css`
		:host{
			display: block;
		}
		`
	}

	/** All child `<f-input>` or `<f-textarea>`. */
	readonly inputs: (Input | Textarea)[] = []

	/** Whether all input or textare are valid. */
	valid: boolean = true

	/** Register a child `<f-input>` or `<f-textarea>`. */
	register(this: Form, input: Input | Textarea) {
		this.inputs.push(input)
		this.valid = this.valid && input.valid !== false
		input.on('change', this.onInputChange, this)
	}

	protected onInputChange(_value: string | number, valid: boolean | null) {
		if (valid !== this.valid) {
			if (valid) {
				this.valid = this.inputs.every(input => input.valid)
			}
			else {
				this.valid = false
			}
		}
	}

	/** Validate all child inputs or textareas. */
	validate() {
		for (let input of this.inputs) {
			input.setTouched(true)
		}
	}

	/** Reset valid state for all child inputs or textareas. */
	reset() {
		for (let input of this.inputs) {
			input.setTouched(false)
		}
	}
}