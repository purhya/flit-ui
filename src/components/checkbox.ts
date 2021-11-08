import {define, Component, html, css, on, off, getClosestComponentOfType} from '@pucelle/flit'
import {theme} from '../style/theme'
import {add, removeWhere} from '@pucelle/ff'


interface CheckboxGroupEvents {

	/** After any of child checkbox changed, get all values of checked checkbox as parameter and trigger this event. */
	change: (value: any[]) => void
}


/** `<f-checkboxgroup>` can contains several `<f-checkbox>` as child. */
@define('f-checkboxgroup')
export class CheckboxGroup<Events = {}> extends Component<Events & CheckboxGroupEvents> {

	/** All child `<f-checkbox>`. */
	readonly checkboxs: Checkbox[] = []

	/** All values of checked child checkboxs. */
	value: unknown[] = []

	/** Retister a child checkbox. */
	register(checkbox: Checkbox) {
		this.checkboxs.push(checkbox)
		checkbox.on('change', this.onCheckboxChange.bind(this, checkbox))
	}

	protected onCheckboxChange(this: CheckboxGroup, checkbox: Checkbox) {
		if (checkbox.checked) {
			add(this.value, checkbox.value)
		}
		else {
			removeWhere(this.value, value => value == checkbox.value)
		}

		this.emit('change', this.value)
	}
}


interface CheckboxEvents {

	/** Triggers change event after checkbox get checked or unchecked. */
	change: (checked: boolean) => void
}

/** `<f-checkbox>` just like `<input type=checkbox>`, you can click to check or uncheck one checkbox in a checkbox group. */
@define('f-checkbox')
export class Checkbox<E = {}> extends Component<E & CheckboxEvents> {

	static style() {
		let {mainColor, focusBlurRadius, adjust} = theme

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
			margin-right: ${adjust(7)}px;
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

	protected checkboxGroup: CheckboxGroup | null = null

	/** Whether the checkbox was checked. */
	checked: boolean = false

	/** Whether the checkbox in indeterminate state, than means, not determined checked or unchecked. */
	indeterminate: boolean = false

	/** If having a parent `<f-checkboxgroup>`, the `value` property will be assign to it after current checkbox checked. */
	value: any = null

	protected onCreated() {
		let group = getClosestComponentOfType(this.el, CheckboxGroup)
		if (group) {
			this.checkboxGroup = group
			this.checked = this.checkboxGroup.value.includes(this.value)
			this.checkboxGroup.register(this)
		}
	}

	protected render() {
		let iconType = this.checked ? 'checkbox-checked' : this.indeterminate ? 'checkbox-indeterminate' : 'checkbox-unchecked'

		return html`
			<template
				tabindex="0"
				:class.checked=${this.checked}
				:class.indeterminate=${this.indeterminate}
				@click=${this.onClick}
				@focus=${this.onFocus}
				@blur=${this.onBlur}
			>
				<f-icon class="icon" .type=${iconType} />
				<div class="label">
					<slot />
				</div>
			</template>
		`
	}

	protected onClick() {
		this.toggleChecked()
	}

	protected toggleChecked(this: Checkbox) {
		this.checked = !this.checked
		this.indeterminate = false
		this.emit('change', this.checked)
	}

	protected onFocus() {
		on(document, 'keydown.enter', this.onEnter, this)
	}

	protected onEnter(e: Event) {
		e.preventDefault()
		this.toggleChecked()
	}

	protected onBlur() {
		off(document, 'keydown', this.onEnter, this)
	}
}

