import {define, Component, css} from '@pucelle/flit'
import {Input, Textarea} from './input'


interface FormEvents {
	change: (value: string) => void
}


@define('f-form')
export class Form<E = any> extends Component<FormEvents & E> {

	static style() {
		return css`
		:host{
			display: block;
		}
		`
	}

	valid: boolean = true
	inputs: (Input | Textarea)[] = []

	register(input: Input | Textarea) {
		this.inputs.push(input)
		this.valid = this.valid && input.valid !== false
		input.on('change', this.onInputChange, this)
	}

	protected onInputChange(_value: string, valid: boolean) {
		if (valid !== this.valid) {
			if (valid) {
				this.valid = this.inputs.every(input => input.valid)
			}
			else {
				this.valid = false
			}
		}
	}

	validate() {
		for (let input of this.inputs) {
			input.setTouched(true)
		}
	}

	reset() {
		for (let input of this.inputs) {
			input.setTouched(false)
		}
	}
}