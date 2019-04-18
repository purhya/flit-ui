import {define, Component, html, css, off, once, svg} from 'flit'
import {theme} from './theme'


export interface RadioEvents {
	change: (checked: boolean) => void
}

@define('f-radio')
export class Radio extends Component<RadioEvents> {

	static style() {
		let {mainColor, lineHeight} = theme

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
					box-shadow: 0 0 3px ${mainColor};
				}
			}
		}

		.icon{
			border-radius: 50%;
			border: 1px solid currentColor;
			margin-right: ${lineHeight / 5 - 1}px;
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
	`}

	static properties = ['checked', 'value']

	checked: boolean = false
	radioGroup: RadioGroup | null = null

	// Used to compare with `RadioGroup.value`
	value: any = null

	render() {
		let {lineHeight} = theme
		let size = Math.round(16 / 30 * lineHeight)

		return html`
			<template
				tabindex="0"
				:class.checked=${this.checked}
				@click=${this.onClick}
				@focus=${this.onFocus}
				@blur=${this.onBlur}
			>
				<svg class="icon" viewBox="0 0 14 14" style="width: ${size}px; height: ${size}px;">
					${this.checked? svg`<circle style="fill:currentColor;stroke:none;" cx="7" cy="7" r="4" />` : ''}
				</svg>
				<div class="label">
					<slot></slot>
				</div>
			</template>
		`
	}

	onCreated() {
		let groupEl = this.el.closest('f-radio-group') as HTMLElement
		if (groupEl) {
			this.radioGroup = Component.get(groupEl) as RadioGroup
			this.checked = this.radioGroup.value == this.value
			this.radioGroup.register(this)
		}
	}

	onClick() {
		if (!this.checked) {
			this.checked = true
			this.emit('change', true)
		}
	}

	onFocus() {
		if (!this.checked) {
			once(document, 'keydown.enter', this.onEnter, this)
		}
	}

	onEnter() {
		this.onClick()
	}

	onBlur() {
		if (!this.checked) {
			off(document, 'keydown', this.onEnter, this)
		}
	}
}


@define('f-radio-group')
export class RadioGroup extends Component<{change: (value: (string | number)[]) => void}> {

	static properties = ['value']

	value: any = null
	radios: Radio[] = []

	register(radio: Radio) {
		this.radios.push(radio)
		radio.on('change', this.onRadioChange.bind(this, radio))
	}

	onRadioChange(changedRadio: Radio) {
		for (let radio of this.radios) {
			if (radio !== changedRadio) {
				radio.checked = false
			}
		}

		this.value = changedRadio.value
		this.emit('change', this.value)
	}
}
