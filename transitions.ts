

// /*Transitions*/
// FF.registerTransition('goto', {

// 	target: null,

// 	enter (fn) {
// 		let {el} = this
// 		let transform = this.getTransform()

// 		if (transform) {
// 			dom.animateFrom(
// 				el,
// 				{transform},
// 				this.duration,
// 				this.easing
// 			)
// 			.then(fn)
// 		}
// 		else {
// 			dom.animateFrom(
// 				el,
// 				{opacity: 0}
// 			)
// 			.then(fn)
// 		}

// 		return function () {
// 			el.stopAnimation()
// 		}
// 	},

// 	leave (fn) {
// 		let {el} = this
// 		let transform = this.getTransform()

// 		if (transform) {
// 			dom.animateTo(
// 				el,
// 				{transform},
// 				this.duration,
// 				this.easing
// 			)
// 			.then(fn)
// 		}
// 		else {
// 			dom.animateTo(
// 				el,
// 				{opacity: 0}
// 			)
// 			.then(fn)
// 		}

// 		return function () {
// 			el.stopAnimation()
// 		}
// 	},

// 	getTransform () {
// 		let {el, target} = this
// 		let toEl = typeof target === 'function' ? target() : typeof target === 'string' ? document.querySelector(target) : target

// 		if (!toEl) {
// 			return ''
// 		}

// 		let elBox = dom.getBox(el)
// 		let toBox = dom.getBox(toEl)

// 		let scaleX = (toBox.width  / elBox.width ).toMaxFixed(3)
// 		let scaleY = (toBox.height / elBox.height).toMaxFixed(3)
// 		let translateX = Math.round((toBox.left + toBox.width  / 2) - (elBox.left + elBox.width  / 2))
// 		let translateY = Math.round((toBox.top  + toBox.height / 2) - (elBox.top  + elBox.height / 2))
// 		let transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`

// 		return transform
// 	},
// })
