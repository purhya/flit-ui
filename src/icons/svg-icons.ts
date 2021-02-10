///<reference types="@pucelle/webpack-svg-loader" />


import checkboxChecked from './checkbox-checked.svg'
import checkboxIndeterminate from './checkbox-indeterminate.svg'
import checkboxUnchecked from './checkbox-unchecked.svg'
import checked from './checked.svg'
import close from './close.svg'
import confirm from './confirm.svg'
import down from './down.svg'
import error from './error.svg'
import info from './info.svg'
import love from './love.svg'
import orderAsc from './order-asc.svg'
import orderDefault from './order-default.svg'
import orderDesc from './order-desc.svg'
import radioChecked from './radio-checked.svg'
import radioUnchecked from './radio-unchecked.svg'
import right from './right.svg'
import search from './search.svg'
import success from './success.svg'
import tips from './tips.svg'
import triangleDown from './triangle-down.svg'
import triangleRight from './triangle-right.svg'
import warning from './warning.svg'


/** Map of `id -> code`. */
export const SVGIconMap: Map<string, string> = new Map([
	checkboxChecked,
	checkboxIndeterminate,
	checkboxUnchecked,
	checked,
	close,
	confirm,
	down,
	error,
	info,
	love,
	orderAsc,
	orderDefault,
	orderDesc,
	radioChecked,
	radioUnchecked,
	right,
	search,
	success,
	tips,
	triangleDown,
	triangleRight,
	warning,
].map(({id, code}) => [id, code]))