import {toPower} from '@pucelle/ff'


/** Class to process colors. */
export class Color {

	/** 
	 * Color from rgba values.
	 * RGBA values are betweens 0~1.
	 */
	static fromRGBA(r: number, g: number, b: number, a: number): Color {
		r = Math.max(Math.min(r, 1), 0)
		g = Math.max(Math.min(g, 1), 0)
		b = Math.max(Math.min(b, 1), 0)
		a = Math.max(Math.min(a, 1), 0)

		if (a === 1) {
			return new Color(
				'#'
				+ (Math.round(255 * r)).toString(16).padStart(2, '0')
				+ (Math.round(255 * g)).toString(16).padStart(2, '0')
				+ (Math.round(255 * b)).toString(16).padStart(2, '0')
			)
		}
		else {
			return new Color(
				'rgba('
				+ (Math.round(255 * r)).toString() + ', '
				+ (Math.round(255 * g)).toString() + ', '
				+ (Math.round(255 * b)).toString() + ', '
				+ toPower(a, -2) + ')'
			)
		}
	}

	/** 
	 * Color from rgb values.
	 * RGBA values are betweens 0~1.
	 */
	static fromRGB(r: number, g: number, b: number): Color {
		return Color.fromRGBA(r, g, b, 1)
	}

	/** Current css color values. */
	private readonly value: string

	/** `value` is a css color values. */
	constructor(value: string) {
		this.value = value.trim()
	}

	toString() {
		return this.value
	}

	/** Get [r, g, b, a] values, all betweens 0 ~ 1. */
	getRGBA(): [number, number, number, number] {
		if (/^#[0-9a-fA-F]{3,8}$/.test(this.value)) {
			return [...this.parseNormalColor(this.value), 1] as [number, number, number, number]
		}

		let match = this.value.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i)
		if (match) {
			return [
				Number(match[1]) / 255,
				Number(match[2]) / 255,
				Number(match[3]) / 255,
				1
			]
		}

		match = this.value.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)$/i)
		if (match) {
			return [
				Number(match[1]) / 255,
				Number(match[2]) / 255,
				Number(match[3]) / 255,
				Number(match[4]),
			]
		}

		match = this.value.match(/^rgba\(\s*(#[0-9a-fA-F]{3,6})\s*,\s*([\d.]+)\s*\)$/i)
		if (match) {
			return [...this.parseNormalColor(match[1]), Number(match[2])] as [number, number, number, number]
		}

		throw new Error(`"${this.value}" is not a valid RGB color`)
	}

	/** Get [r, g, b] values, all betweens 0 ~ 1. */
	getRGB(): [number, number, number] {
		return this.getRGBA().slice(0, 3) as [number, number, number]
	}

	private parseNormalColor(color: string): [number, number, number] {
		if (color.length === 4) {
			return [
				parseInt(color[1], 16) * 17 / 255,
				parseInt(color[2], 16) * 17 / 255,
				parseInt(color[3], 16) * 17 / 255
			]
		}
		else {
			return [
				parseInt(color.slice(1, 3), 16) / 255,
				parseInt(color.slice(3, 5), 16) / 255,
				parseInt(color.slice(5, 7), 16) / 255
			]
		}
	}

	/** Darken current color with percentage value betweens 0-100. */
	darken(percentage: number): Color {
		return this.lighten(-percentage)
	}

	/** Lighten current color with percentage value betweens 0-100. */
	lighten(percentage: number): Color {
		let [r, g, b, a] = this.getRGBA()
		let p = percentage / 100

		r += p
		g += p
		b += p

		return Color.fromRGBA(r, g, b, a)
	}

	/** Move color to middle color, darken if is a light color, otherwise lighten. */
	toMiddle(percentage: number) {
		if (this.getLightness() < 0.5) {
			return this.lighten(percentage)
		}
		else {
			return this.darken(percentage)
		}
	}

	/** Returns lightness value of current color, betweens 0 ~ 1. */
	getLightness() {
		let [r, g, b] = this.getRGBA()
		return r * 0.299 + g * 0.587 + b * 0.114
	}

	/** Returns average rgb value of current color, betweens 0 ~ 1. */
	getAverage() {
		let [r, g, b] = this.getRGBA()
		return (r + g + b) / 3
	}

	/** 
	 * Change alpha channel of current color and returns a new color.
	 * alpha value `a` is betweens 0-1.
	 */
	alpha(a: number): Color {
		let [r, g, b] = this.getRGBA()
		return Color.fromRGBA(r, g, b, a)
	}

	/** Mix with another color in percentage value betweens 0-100. */
	mix(color: string | Color, percentage: number): Color {
		let [r, g, b, a] = this.getRGBA()

		if (typeof color === 'string') {
			color = new Color(color)
		}
		let [r2, g2, b2, a2] = color.getRGBA()

		let p = percentage / 100

		r = r * (1 - p) + r2 * p
		g = g * (1 - p) + g2 * p
		b = b * (1 - p) + b2 * p
		a = a * (1 - p) + a2 * p

		return Color.fromRGBA(r, g, b, a)
	}
}
