import {define, Component, html, css, off, once, getClosestComponentOfType} from '@pucelle/flit'
import {theme} from '../style/theme'


interface RadioGroupEvents {

	/** 
	 * If a child `<f-radio>` was checked and have `value` property specified,
	 * it will trigger change event with the radio value as parameter.
	 */
	change: (value: any) => void
}


/** `<f-radiogroup>` can contain several `<f-radio>` elements as it's child radios. */
@define('f-radiogroup')
export class RadioGroup extends Component<RadioGroupEvents> {
	
	/** All child `<f-checkbox>`. */
	readonly radios: Radio[] = []

	/** Current value, child radio which have same value will be checked. */
	value: any = null

	/** Retister a child radio. */
	register(radio: Radio) {
		this.radios.push(radio)
		radio.on('change', this.onRadioChange.bind(this, radio))
	}

	protected onRadioChange(changedRadio: Radio) {
		for (let radio of this.radios) {
			if (radio !== changedRadio) {
				radio.checked = false
			}
		}

		this.value = changedRadio.value
		this.emit('change', this.value)
	}
}


interface RadioEvents {

	/** Triggers change event only when a radio checked. */
	change: (checked: boolean) => void
}

/** `<f-radio>` just like `<input type=radio>`, you can click to check one radio in a radio group. */
@define('f-radio')
export class Radio<E = {}> extends Component<E & RadioEvents> {

	static style() {
		let {mainColor, adjust, focusBlurRadius} = theme

		return css`
		:host{
			display: inline-flex;
			vertical-align: top;
			align-items: center;
			cursor: pointer;

			&:hover{
				color: ${mainColor};
			}

			&:focus{
				color: ${mainColor};

				.icon{
					box-shadow: 0 0 ${focusBlurRadius}px ${mainColor};
				}
			}
		}

		.icon{
			position: relative;
			top: -2px;
			border-radius: 50%;
			margin-right: ${adjust(6)}px;
		}

		.checked{
			color: ${mainColor};
		}
	
		.label{
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		`
	}

	protected radioGroup: RadioGroup | null = null

	/** Whether the radio was checked. */
	checked: boolean = false

	/** If having a parent `<f-radiogroup>`, the `value` property will be assign to it after current ratio checked. */
	value: any = null

	protected onCreated() {
		let group = getClosestComponentOfType(this.el, RadioGroup)
		if (group) {
			this.radioGroup = group
			this.checked = this.radioGroup.value == this.value
			this.radioGroup.register(this)
		}
	}

	protected render() {
		return html`
			<template
				tabindex="0"
				:class.checked=${this.checked}
				@click=${this.onClick}
				@focus=${this.onFocus}
			>
				<f-icon class="icon" .type=${this.checked ? 'radio-checked' : 'radio-unchecked'} />
				<div class="label">
					<slot />
				</div>
			</template>
		`
	}

	protected onClick(this: Radio) {
		if (!this.checked) {
			this.checked = true
			this.emit('change', true)
		}
	}

	protected onFocus() {
		if (!this.checked) {
			once(this.el, 'blur', this.onBlur, this)
			once(document, 'keydown.enter', this.onEnter, this)
		}
	}

	protected onBlur() {
		off(document, 'keydown', this.onEnter, this)
	}

	protected onEnter() {
		this.onClick()
	}
}
