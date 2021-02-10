/**
 * Append a fragment or element into target element or selector.
 * Returns the first element in the fragment.
 * It's a helper function to use like `appendTo(render(...), document.body)`.
 * @param el The fragment to append.
 * @param target The target element to append to.
 */
export function appendTo(el: DocumentFragment | Element, target: Element | string): Element | null {
	let firstElement = el.firstElementChild as Element

	if (typeof target === 'string') {
		let targetEl = document.querySelector(target)
		if (targetEl && targetEl.lastElementChild !== el) {
			targetEl.append(el)
		}
	}
	else if (target && target.lastElementChild !== el) {
		target.append(el)
	}

	return firstElement
}
