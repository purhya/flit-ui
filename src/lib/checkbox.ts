import {define, Component, html, css, svg, on, off} from 'flit'
import {theme} from './theme'
import {removeWhere, orderBy} from 'ff'


@define('f-checkbox')
export class Checkbox extends Component<{change: (checked: boolean) => void}> {

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

				svg{
					box-shadow: 0 0 3px ${mainColor};
				}
			}
		}

		svg{
			width: ${lineHeight / 2}px;
			height: ${lineHeight / 2}px;
			border: 1px solid currentColor;
			border-radius: 2px;
			margin-right: ${lineHeight / 5 - 1}px;
		}

		.indeterminate, .checked{
			color: ${mainColor};
			
			svg{
				background: ${mainColor};
			}
		}

		.label{
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	`}

	static properties = ['checked', 'indeterminate', 'value']

	checked: boolean = false
	indeterminate: boolean = false
	checkboxGroup: CheckboxGroup | null = null

	// Used to compare with `checkboxGroup.value`
	value: any = null

	render() {
		let svgInner: any = ''
		if (this.checked) {
			svgInner = svg`<polyline style="fill:none;stroke:#FFFFFF;stroke-linecap:round;stroke-linejoin:round;" points="1.5,7 5.7,10.5 10.5,1.5"/>`
		}
		else if (this.indeterminate) {
			svgInner = svg`<line style="fill:none;stroke:#FFFFFF;" x1="2" y1="6.5" x2="11" y2="6.5"/>`
		}

		return html`
			<template
				tabindex="0"
				:class.checked=${this.checked}
				:class.indeterminate=${this.indeterminate}
				@@click=${this.onClick}
				@@focus=${this.onFocus}
				@@blur=${this.onBlur}
			>
				<svg viewBox="0 0 13 13">
					${svgInner}
				</svg>

				<div class="label">
					<slot></slot>
				</div>
			</template>
		`
	}

	onCreated() {
		let groupEl = this.el.closest('f-checkbox-group') as HTMLElement
		if (groupEl) {
			this.checkboxGroup = Component.get(groupEl) as CheckboxGroup
			this.checked = this.checkboxGroup.value == this.value
			this.checkboxGroup.register(this)
		}
	}

	onClick() {
		this.checked = !this.checked
		this.indeterminate = false
		this.emit('change', this.checked)
	}

	onFocus() {
		on(document, 'keydown.enter', this.onClick, this)
	}

	onBlur() {
		off(document, 'keydown', this.onClick, this)
	}
}


@define('f-checkbox-group')
export class CheckboxGroup extends Component<{change: (value: string | number) => void}> {

	static properties = ['value', 'ordered']

	value: any[] = []
	ordered: boolean = false
	checkboxs: Checkbox[] = []

	register (checkbox: Checkbox) {
		this.checkboxs.push(checkbox)
		checkbox.on('change', this.onCheckboxChange.bind(this, checkbox))
	}

	onCheckboxChange (checkbox: Checkbox) {
		if (checkbox.checked) {
			this.value.push(checkbox.value)
		}
		else {
			removeWhere(this.value, value => value == checkbox.value)
		}

		if (this.ordered) {
			let values = this.checkboxs.map(checkbox => checkbox.value)
			orderBy(this.value, item => values.findIndex(value => value == item))
		}

		this.emit('change', this.value)
	}
}
