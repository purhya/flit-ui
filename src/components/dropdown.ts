import {css, define, html, Component, refBinding} from '@pucelle/flit'
import {theme} from '../style/theme'
import {RenderFn, popup, PopupBinding} from '../bindings/popup'


/** Normally work with a menu. */
@define('f-dropdown')
export class Dropdown<E = any> extends Component<E> {

	static style() {
		let {mainColor} = theme

		return css`
		:host{
			display: inline-flex;
		}

		.opened{
			color: ${mainColor};
		}

		.down-icon{
			margin-right: 6px;
		}

		.popup{
			padding: 5px 0;
		}

		.list{
			overflow-y: auto;
			max-height: 100%;
		}
		`
	}

	opened: boolean = false
	renderContent!: RenderFn

	trigger: 'hover' | 'click' | 'focus' | 'contextmenu' = 'click'
	trangle: boolean = true
	alignPosition: string = 'b'
	alignMargin: number | number[] = 3
	transition: string = 'fade'
	showDelay: number = 100
	hideDelay: number = 100

	protected popupBinding: PopupBinding | null = null

	protected render() {
		let {trigger, trangle, alignPosition, alignMargin, transition, showDelay, hideDelay} = this
		let onOpenedChanged = this.setOpened.bind(this)
		
		let toPopup = refBinding(
			popup(() => this.renderPopupContent(), {trigger, trangle, alignPosition, alignMargin, transition, showDelay, hideDelay, onOpenedChanged}),
			(v: any) => {this.popupBinding = v}
		)
		
		return html`
		<template :class.opened=${this.opened} ${toPopup}>
			<slot />
			<f-icon class="down-icon" .type="down" />
		</template>
		`
	}

	protected renderPopupContent() {
		let content = this.renderContent()

		return html`
		<f-popup
			class="popup"
			.trangle=${this.trangle}
		>
			<div class="list">
				${content}
			</div>
		</f-popup>
		`
	}

	protected setOpened(opened: boolean) {
		this.opened = opened

		if (opened) {
			this.onPopupOpened()
		}
	}

	protected onPopupOpened() {}

	protected async showPopup() {
		if (this.popupBinding) {
			await this.popupBinding.showPopupLater()
		}
	}

	protected hidePopup() {
		if (this.popupBinding) {
			this.popupBinding.hidePopupLater()
		}
	}
}