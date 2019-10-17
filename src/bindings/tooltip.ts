import {css, define, html, defineBinding, BindingResult} from '@pucelle/flit'
import {theme} from '../style/theme'
import {Popup} from '../components/popup'
import {PopupBinding, PopupOptions} from './popup'
import {getMainAlignDirection, assignIf} from '@pucelle/ff'
import {Color} from '../style/color'


export interface TooltipOptions {
	name?: string
	backgroundColor?: string
	alignTo?: () => Element
	alignPosition?: string
	alignMargin?: number | number[]
	showDelay?: number
	hideDelay?: number
}


const defaultTooltipOptions: TooltipOptions = {
	name: 'tooltip',
	alignPosition: 't',
	alignMargin: 3,
	showDelay: 0,
	hideDelay: 200,
}


@define('f-tooltip')
export class Tooltip extends Popup {

	static style() {
		let {adjustByLineHeight: lh, layerBorderRadius, textColor, backgroundColor, layerShadowBlurRadius, layerShadowColor} = theme
		
		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1100;
			max-width: ${lh(220)}px;
			padding: ${lh(4)}px ${lh(8)}px;
			line-height: ${lh(20)}px;
			background: ${backgroundColor.highlight(5)};
			color: ${textColor};
			border-radius: ${layerBorderRadius}px;
			filter: drop-shadow(0 0 ${layerShadowBlurRadius / 2}px ${layerShadowColor});	// 3px nearly equals 6px in box-shadow.
			pointer-events: none;
		}

		.trangle{
			position: absolute;
			border-left: 5px solid transparent;
			border-right: 5px solid transparent;
			border-bottom: 7px solid ${backgroundColor.highlight(5)};
			top: -7px;

			&-herizontal{
				border-top: 5px solid transparent;
				border-bottom: 5px solid transparent;
				border-right: 7px solid ${backgroundColor.highlight(5)};
				border-left: 0;
				top: auto;
				left: -7px;
			}
		}`
	}

	backgroundColor: string = ''

	protected render() {
		let backgroundColor = this.backgroundColor ? new Color(this.backgroundColor) : null
		let textColor = backgroundColor ? backgroundColor.getLightness() < 0.5 ? '#fff' : '#000' : ''
		
		return html`
		<template
			:style.background-color=${this.backgroundColor}
			:style.color=${textColor}
		>
			${this.trangle ? html`
				<div class="trangle" :ref="trangle"
					:class.trangle-herizontal=${this.herizontal}
					:style.border-color=${this.backgroundColor}
				/>
			` : ''}
		`
	}
}


/**
 * `:tooltip="..."`
 * `tooltip(title, {alignPosition: ..., ...})`
 */
export class TooltipBinding extends PopupBinding<string> {

	protected title: string = ''

	update(title: string, options?: TooltipOptions) {
		this.title = title
		super.update(this.getRenderFn.bind(this) as any, this.getPopupOptions(options))
	}

	protected getRenderFn() {
		return html`
			<f-tooltip
				.herizontal=${this.isHerizontal()}
				.backgroundColor=${this.getBackgroundColor()}
			>
				${this.title}
			</f-tooltip>
		`
	}

	protected getBackgroundColor(options?: TooltipOptions) {
		if (options && options.backgroundColor) {
			return options.backgroundColor
		}

		return ''
	}

	protected getPopupOptions(options: PopupOptions = {}) {
		assignIf(options, defaultTooltipOptions)
		return options
	}

	protected isHerizontal() {
		let direction = getMainAlignDirection(this.getOption('alignPosition')!)
		return direction === 'l' || direction === 'r'
	}
}

export const tooltip = defineBinding('tooltip', TooltipBinding) as (title: string, options?: TooltipOptions) => BindingResult