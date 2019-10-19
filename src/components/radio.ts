import {define, Component, html, css, off, once, getClosestComponent} from '@pucelle/flit'
import {theme} from '../style/theme'


export interface RadioEvents {
	change: (checked: boolean) => void
}

@define('f-radio')
export class Radio<E = any> extends Component<E & RadioEvents> {

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

	checked: boolean = false
	radioGroup: RadioGroup | null = null

	// Used to compare with `RadioGroup.value`
	value: any = null

	protected render() {
		return html`
			<template
				tabindex="0"
				:class.checked=${this.checked}
				@@click=${this.onClick}
				@@focus=${this.onFocus}
			>
				<f-icon class="icon" .type=${this.checked ? 'radio-checked' : 'radio-unchecked'} />
				<div class="label">
					<slot />
				</div>
			</template>
		`
	}

	protected onCreated() {
		let group = getClosestComponent(this.el, RadioGroup)
		if (group) {
			this.radioGroup = group
			this.checked = this.radioGroup.value == this.value
			this.radioGroup.register(this)
		}
	}

	protected onClick() {
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


// Not `radio-group` because we want to correspond with `radiogroup` with `https://www.w3.org/TR/wai-aria-practices-1.2/`.
@define('f-radiogroup')
export class RadioGroup extends Component<{change: (value: (string | number)[]) => void}> {

	value: any = null
	
	protected radios: Radio[] = []

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
