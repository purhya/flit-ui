import {define, Component, getComponent, html, css, svg, on, off} from 'flit'
import {theme} from './theme'
import {removeWhere, orderBy} from 'ff'


export interface CheckboxEvents {
	change: (checked: boolean) => void
}

@define('f-checkbox')
export class Checkbox extends Component<CheckboxEvents> {

	static style() {
		let {mainColor, lh} = theme

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
			width: ${lh(15)}px;
			height: ${lh(15)}px;
			border: 1px solid currentColor;
			border-radius: 2px;
			margin-right: ${lh(5)}px;
		}

		.indeterminate, .checked{
			color: ${mainColor};
			
			.icon{
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
				@click=${this.onClick}
				@focus=${this.onFocus}
				@blur=${this.onBlur}
			>
				<svg class="icon" viewBox="0 0 13 13">
					${svgInner}
				</svg>

				<div class="label">
					<slot></slot>
				</div>
			</template>
		`
	}

	onCreated() {
		let groupEl = this.el.closest('f-checkboxgroup') as HTMLElement
		if (groupEl) {
			this.checkboxGroup = getComponent(groupEl) as CheckboxGroup
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
		on(document, 'keydown.enter', this.onEnter, this)
	}

	onEnter(e: Event) {
		e.preventDefault()
		this.onClick()
	}

	onBlur() {
		off(document, 'keydown', this.onEnter, this)
	}
}


@define('f-checkboxgroup')
export class CheckboxGroup extends Component<{change: (value: string | number) => void}> {

	static properties = ['value', 'ordered']

	value: any[] = []
	ordered: boolean = false
	checkboxs: Checkbox[] = []

	register(checkbox: Checkbox) {
		this.checkboxs.push(checkbox)
		checkbox.on('change', this.onCheckboxChange.bind(this, checkbox))
	}

	onCheckboxChange(checkbox: Checkbox) {
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
