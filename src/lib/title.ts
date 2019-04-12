import {css, define, Component, html, off, once, defineBinding, on, render, renderComplete} from "flit"
import {timeout, Timeout, align, getAlignDirection} from "ff"
import {theme} from './theme'


export interface TitleOptions {
	title: string
	alignPosition?: string
	alignMargin?: number | number[]
	showDelay?: number
	hideDelay?: number
	leaveToHide?: boolean
}

export let defaultTitleOptions: Required<TitleOptions> = {
	title: '',
	alignPosition: 't',
	alignMargin: 3,
	showDelay: 0,
	hideDelay: 200,
	leaveToHide: true
}

function getOption<P extends keyof TitleOptions>(option: TitleOptions | null, property: P): Required<TitleOptions>[P] {
	if (option && option[property] !== undefined) {
		return option[property]!
	}
	else {
		return defaultTitleOptions[property]
	}
}


@define('f-title-layer')
export class TitleLayer extends Component {

	static style() {
		let {lineHeight, borderRadius} = theme
		
		return css`
		:host{
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1100;
			max-width: 220px;
			padding: 4px 8px;
			line-height: ${lineHeight * 0.8}px;
			pointer-events: none;
			background: #333;
			color: #fff;
			border-radius: ${borderRadius}px;
		}

		.trangle{
			position: absolute;
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 7px solid #333;
			top: -7px;

			&-herizontal{
				border-top: 6px solid transparent;
				border-bottom: 6px solid transparent;
				border-right: 7px solid #333;
				border-left: 0;
				top: auto;
				left: -7px;
			}
		}
		`
	}

	opened: boolean = false
	options: TitleOptions | null = null
	target: HTMLElement | null = null

	private timeout: Timeout | null = null
	private mouseLeaved: boolean = false

	render() {
		return html`
		<template :show=${{when: this.opened, transition: 'fade'}}>
			<div class="trangle"
				:ref="trangle"
				:class.trangle-herizontal=${this.isHerizontal()}
			/>
			<div class="title">${this.options ? this.options.title : ''}</div>
		</template>`
	}

	onRendered() {
		if (this.opened) {
			this.align()
		}
	}

	private isHerizontal() {
		let direction = getAlignDirection(getOption(this.options, 'alignPosition'))
		return direction === 'l' || direction === 'r'
	}

	// May be called when el is not changed but title changed.
	set(target: HTMLElement, options: TitleOptions) {
		if (this.target && this.target !== target) {
			this.unbindLastTarget()
		}
		
		this.target = target
		this.options = options

		if (getOption(this.options, 'leaveToHide') && this.mouseLeaved) {
			this.mouseLeaved = false
			this.hideLater()
		}
	}

	private unbindLastTarget() {
		off(this.target!, 'mouseleave', this.onMouseLeave, this)
	}

	show() {
		if (this.timeout) {
			this.timeout.cancel()
		}

		this.opened = true
		this.mouseLeaved = false
		once(this.target!, 'mouseleave', this.onMouseLeave, this)
	}

	private align() {
		let alignPosition = getOption(this.options, 'alignPosition')
		let alignMargin = getOption(this.options, 'alignMargin')

		align(this.el, this.target!, alignPosition, {margin: alignMargin, trangle: this.refs.trangle})
	}

	private onMouseLeave() {
		if (getOption(this.options, 'leaveToHide')) {
			this.hideLater()
		}
		else {
			this.mouseLeaved = true
		}
	}

	private hideLater() {
		if (this.timeout) {
			this.timeout.cancel()
		}

		let hideDelay = getOption(this.options, 'hideDelay')

		// When user mouse over fom one to another, we need to show title for the second item immediately.
		// So have we need a timeout during which the layer is not truly hide.
		this.timeout = timeout(this.hide.bind(this), hideDelay)
	}

	hide() {
		if (this.timeout) {
			this.timeout.cancel()
		}

		this.opened = false
		off(this.target!, 'mouseleave', this.hideLater, this)
	}
}

let titleLayer: TitleLayer | null = null
async function getTitleLayer(): Promise<TitleLayer> {
	if (!titleLayer) {
		let fragment = render('<f-title-layer />')
		let layerEl = fragment.firstElementChild as HTMLElement
		document.body.append(fragment)
		titleLayer = await Component.getAsync(layerEl) as TitleLayer
		await renderComplete()
	}

	return titleLayer
}


defineBinding('title', class TitleBinding {

	private el: HTMLElement
	private options: TitleOptions | null = null
	private timeout: Timeout | null = null

	constructor(el: HTMLElement, value: unknown) {
		this.el = el
		this.update(value as any)
		on(this.el, 'mouseenter', this.onMouseEnter, this)
	}

	async update (value: TitleOptions | string) {
		if (typeof value === 'object') {
			this.options = value
		}
		else {
			this.options = {title: value}
		}

		// update target when the title works for current binding and showing.
		if (titleLayer && titleLayer.target === this.el) {
			titleLayer.set(this.el, this.options)
		}
	}

	private async onMouseEnter() {
		let titleLayer = await getTitleLayer()
		if (titleLayer.opened) {
			this.show()
		}
		else {
			this.showLater()
		}
	}

	private async show() {
		let titleLayer = await getTitleLayer()
		titleLayer.set(this.el, this.options!)
		titleLayer.show()
	}

	private showLater() {
		if (this.timeout) {
			this.timeout.cancel()
		}

		let showDelay = getOption(this.options, 'showDelay')
		this.timeout = timeout(this.show.bind(this), showDelay)
		once(this.el, 'mouseleave', this.onMouseLeave, this)
	}

	private onMouseLeave () {
		if (this.timeout) {
			this.timeout.cancel()
		}
	}
})