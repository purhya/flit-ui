import {define, Component, html, css, getEasing} from 'flit'
import {theme} from './theme'


@define('f-radio')
export class Radio extends Component<{change: (checked: true) => void}> {

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

			&:active:not(.checked) .dot{
				transform: scale(0.5);
			}
		}

		svg{
			margin-right: ${lineHeight / 5 - 1}px;
		}

		.dot{
			transition: transform 0.2s ${getEasing('ease-out-cubic')};
			transform-origin: center;
			transform: scale(0);
		}

		.checked{
			color: ${mainColor};

			.dot{
				transform: none;
			}
		}
	
		.label{
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		`
	}

	static properties = ['checked', 'value']

	checked: boolean = false
	radioGroup: RadioGroup | null = null

	// Used to compare with `RadioGroup.value`
	value: any = null

	render() {
		let {lineHeight} = theme
		let size = 20 / 30 * lineHeight

		return html`
		<template :class.checked=${this.checked} @@click.stop=${this.onClick}>
			<svg viewBox="0 0 20 20" style="width: ${size}px; height: ${size}px;">
				<circle style="fill:none;stroke:currentColor;" cx="10" cy="10" r="7.5"></circle>
				<circle style="fill:currentColor;stroke:none;" cx="10" cy="10" r="4" class="dot"></circle>
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
