import {define, Component, html, css, on, off, getClosestComponent} from '@pucelle/flit'
import {theme} from '../style/theme'
import {removeWhere, orderBy} from '@pucelle/ff'


export interface CheckboxEvents {
	change: (checked: boolean) => void
}

@define('f-checkbox')
export class Checkbox<E = any> extends Component<E & CheckboxEvents> {

	static style() {
		let {mainColor, focusBlurRadius, adjustByLineHeight: lh} = theme

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
			margin-right: ${lh(6)}px;
			border-radius: 4px;
		}

		.indeterminate, .checked{
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
	indeterminate: boolean = false

	// Used to compare with `checkboxGroup.value`
	value: any = null

	protected checkboxGroup: CheckboxGroup | null = null

	protected render() {
		let iconType = this.checked ? 'checkbox-checked' : this.indeterminate ? 'checkbox-indeterminate' : 'checkbox-unchecked'

		return html`
			<template
				tabindex="0"
				:class.checked=${this.checked}
				:class.indeterminate=${this.indeterminate}
				@@click=${this.onClick}
				@@focus=${this.onFocus}
				@@blur=${this.onBlur}
			>
				<f-icon class="icon" .type=${iconType} />
				<div class="label">
					<slot />
				</div>
			</template>
		`
	}

	protected onCreated() {
		let group = getClosestComponent(this.el, CheckboxGroup)
		if (group) {
			this.checkboxGroup = group
			this.checked = this.checkboxGroup.value === this.value
			this.checkboxGroup.register(this)
		}
	}

	protected onClick() {
		this.checked = !this.checked
		this.indeterminate = false
		this.emit('change', this.checked)
	}

	protected onFocus() {
		on(document, 'keydown.enter', this.onEnter, this)
	}

	protected onEnter(e: Event) {
		e.preventDefault()
		this.onClick()
	}

	protected onBlur() {
		off(document, 'keydown', this.onEnter, this)
	}
}


interface CheckboxGroupEvents {
	change: (value: any[]) => void
}

@define('f-checkboxgroup')
export class CheckboxGroup<Events = any> extends Component<Events & CheckboxGroupEvents> {

	value: unknown[] = []
	ordered: boolean = false

	protected checkboxs: Checkbox[] = []

	register(checkbox: Checkbox) {
		this.checkboxs.push(checkbox)
		checkbox.on('change', this.onCheckboxChange.bind(this, checkbox))
	}

	protected onCheckboxChange(checkbox: Checkbox) {
		if (checkbox.checked) {
			this.value.push(checkbox.value)
		}
		else {
			removeWhere(this.value, value => value == checkbox.value)
		}

		if (this.ordered) {
			let values = this.checkboxs.map(checkbox => checkbox.value)
			orderBy(this.value as any[], item => values.findIndex(value => value == item))
		}

		this.emit('change', this.value)
	}
}
