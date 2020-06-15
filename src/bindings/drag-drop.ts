import {defineBinding, Binding, on, once, off} from "@pucelle/flit"
import {getStyleAsNumber, animateTo, getRect, stopAnimation, Rect, getStyle, isPlayingAnimation} from "@pucelle/ff"
import {theme} from "../style/theme"


export interface DraggableOptions {
	name?: string
}

export interface DroppableOptions<T> {
	name?: string
	onenter?: DropHandler<T>
	onleave?: DropHandler<T>
}

export type DropHandler<T> = (data: T, index: number) => void

type Draggable = DraggableBinding<any>
type Droppable = DroppableBinding<any>


export class DraggableBinding<T> implements Binding<[T, number, DraggableOptions | undefined]> {

	el: HTMLElement
	name: string = ''
	data: unknown | null = null
	index: number = -1

	constructor(el: Element) {
		this.el = el as HTMLElement

		// To avoid image dragging handled be HTML5 drag & drop
		this.el.setAttribute('draggable', 'false')
		this.el.style.cursor = 'grab'

		on(this.el, 'mousedown', this.onMouseDown as any, this)
		on(this.el, 'mouseenter', this.onMouseEnter, this)
	}

	update(data: T, index: number, options?: DraggableOptions) {
		this.data = data
		this.index = index

		if (options) {
			Object.assign(this, options)
		}
	}

	protected onMouseDown(e: MouseEvent) {
		e.preventDefault()

		let isDragging = false
		let startX = e.clientX
		let startY = e.clientY

		let onMouseMove = (e: MouseEvent) => {
			if (!isDragging && (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5)) {
				isDragging = true
				manager.startDragging(this)
			}
			
			if (isDragging) {
				let moveX = e.clientX - startX
				let moveY = e.clientY - startY
				manager.translateDragging(moveX, moveY)
			}
		}

		let onMouseUp = async () => {
			off(document, 'mousemove', onMouseMove as any)
			manager.endDragging()
		}

		on(document, 'mousemove', onMouseMove as any)
		once(document, 'mouseup', onMouseUp as any)
	}

	protected onMouseEnter() {
		manager.enterDraggable(this)
	}

	remove() {
		off(this.el, 'mousedown', this.onMouseDown as any, this)
		off(this.el, 'mouseenter', this.onMouseEnter, this)
	}
}

export const draggable = defineBinding('draggable', DraggableBinding) as (data: any, index: number, options?: DraggableOptions) => void



export class DroppableBinding<Item> implements Binding<[DropHandler<Item>, DroppableOptions<Item>]> {
	
	el: HTMLElement
	name: string = ''

	protected onenter: DropHandler<Item> | null = null
	protected onleave: DropHandler<Item> | null = null
	protected ondrop!: DropHandler<Item>

	constructor(el: Element) {
		this.el = el as HTMLElement
		on(this.el, 'mouseenter', this.onMouseEnter as any, this)
	}

	update(ondrop: DropHandler<Item>, options?: DroppableOptions<Item>) {
		this.ondrop = ondrop

		if (options) {
			Object.assign(this, options)
		}
	}

	protected onMouseEnter() {
		manager.enterDroppable(this)
		once(this.el, 'mouseleave', this.onMouseLeave as any, this)
	}

	emitEnter(dragging: Draggable) {
		if (this.onenter) {
			this.onenter(dragging.data as Item, dragging.index)
		}
	}

	protected onMouseLeave() {
		manager.leaveDroppable(this)
	}

	emitLeave(dragging: Draggable) {
		if (this.onleave) {
			this.onleave(dragging.data as Item, dragging.index)
		}
	}

	emitDrop(dragging: Draggable, index: number) {
		if (this.ondrop) {
			this.ondrop(dragging.data as Item, index)
		}
	}

	remove() {
		off(this.el, 'mouseenter', this.onMouseEnter as any, this)
	}
}

export const droppable = defineBinding('droppable', DroppableBinding) as <Item>(ondrop: DropHandler<Item>, options?: DroppableOptions<Item>) => void


// Used to:
//   When start dragging, check it's related drop area.
//   When dragging element enters another draggable element, relate them and adjust position using `mover`.
//   When dragging element enters one drop area, give additional space for it.
//   When dragging element leaves one drop area, remove space that belongs to it.
class DragDropRelationshipManager {

	protected dragging: Draggable | null = null
	protected mover: Mover | null = null

	// May mouse enter in some drop areas, and start dragging,
	// then we need to check which drop area should trigger enter.
	protected canEnterDrops: Set<Droppable> = new Set()
	protected activeDrop: Droppable | null = null
	
	startDragging(drag: Draggable) {
		this.dragging = drag
		let activeDrop: Droppable | undefined

		for (let drop of this.canEnterDrops) {
			// May element has been removed
			if (!document.contains(drop.el)) {
				this.canEnterDrops.delete(drop)
			}

			else if (drop.name === name) {
				activeDrop = drop
				break
			}
		}

		if (!activeDrop) {
			throw new Error(`Element with ":draggable" must be contained in a ":droppable" elemenet`)
		}

		activeDrop.emitEnter(this.dragging!)	// will also update direction
		this.activeDrop = activeDrop
		this.mover = new Mover(this.dragging!, activeDrop)
	}

	translateDragging(x: number, y: number) {
		if (this.mover) {
			this.mover.translateDraggingElement(x, y)
		}
	}

	enterDraggable(drag: Draggable) {
		if (this.canSwapWith(drag) && this.mover) {
			this.mover.onEnterDraggable(drag)
		}
	}

	protected canSwapWith(drag: Draggable) {
		return this.dragging && this.dragging.name === drag.name && this.dragging !== drag
	}

	enterDroppable(drop: Droppable) {
		this.canEnterDrops.add(drop)

		if (this.canDropTo(drop)) {
			drop.emitEnter(this.dragging!)
			this.activeDrop = drop
			this.mover!.onEnterDroppable(drop)
		}
	}

	protected canDropTo(drop: Droppable) {
		return this.dragging && this.dragging.name === drop.name
	}

	leaveDroppable(drop: Droppable) {
		this.canEnterDrops.delete(drop)

		if (this.activeDrop === drop) {
			drop.emitLeave(this.dragging!)
			this.activeDrop = null
			this.mover!.onLeaveDroppable(drop)
		}
	}

	endDragging() {
		let mover = this.mover!
		let dragging = this.dragging!
		let activeDrop = this.activeDrop!

		if (mover) {
			mover.playEndDraggingAnimation().then(() => {
				if (mover.willSwapElements()) {
					activeDrop.emitDrop(dragging, mover.getSwapIndex())
				}
			})
		}
		
		this.dragging = null
		this.mover = null
		this.activeDrop = null
	}
}

const manager = new DragDropRelationshipManager()



// To handle dragging movements, includes:
// 1. When moved out of the droppable it's inside: All elements below moved up
// 2. When moved in a new droppable: Add a padding as space to contain
// 3. When moved between silbings: Moving items betweens them up or down, include the mouse enter sibling.
// 4. When moved into a already moved sibling: Fallback movements that not betweens them, include the mouse enter sibling.

class Mover {

	protected dragging: Draggable

	/** Dragging element. */
	protected el: HTMLElement

	/** Elements align direction */
	protected direction: 'x' | 'y' = 'y'

	/** Keeps orignal style of el before starting dragging. */
	protected elStyleText: string = ''

	/** `true` means after this.el moved, followed elements will shrink and take it's place. */
	protected autoLayout: boolean
	
	protected width: number
	protected height: number
	protected translate: [number, number] = [0, 0]

	protected dragTo: Draggable | null = null
	protected dragToRect: Rect | null = null
	protected dragToIndex: number = -1

	/** Elements that were moved to right, compare to their auto layout position. */
	protected movedElements: Set<HTMLElement> = new Set()

	/** Elements that were actually translated. */
	protected translatedElements: Set<HTMLElement> = new Set()

	protected startDropArea: Droppable
	protected dropArea: Droppable | null = null
	protected placeholder: HTMLElement | null = null

	constructor(drag: Draggable, drop: Droppable) {
		this.dragging = drag
		this.el = drag.el
		this.startDropArea = this.dropArea = drop

		this.autoLayout = getStyle(this.el, 'position') !== 'absolute'

		let marginLeft = getStyleAsNumber(this.el, 'marginLeft')
		let marginRight = getStyleAsNumber(this.el, 'marginRight')
		let marginTop = getStyleAsNumber(this.el, 'marginTop')
		let marginBottom = getStyleAsNumber(this.el, 'marginBottom')

		this.width = this.el.offsetWidth + (Math.abs(marginLeft) > Math.abs(marginRight) ? marginLeft : marginRight)
		this.height = this.el.offsetHeight + (Math.abs(marginTop) > Math.abs(marginBottom) ? marginTop : marginBottom)

		this.initializeDirection()
		this.setStartDraggingStyle()
		this.giveSpaceForDraggingElement(drop, false)
	}

	protected initializeDirection() {
		if (this.el.nextElementSibling || this.el.previousElementSibling) {
			let nextRect = getRect(this.el.nextElementSibling || this.el.previousElementSibling!)
			let currRect = getRect(this.el)

			if (Math.abs(nextRect.left - currRect.left) > Math.abs(nextRect.top - currRect.top)) {
				this.direction = 'x'
			}
			else {
				this.direction = 'y'
			}
		}
	}

	protected setStartDraggingStyle() {
		let rect = getRect(this.el)

		document.body.style.cursor = 'grabbing'
		document.body.style.userSelect = 'none'

		this.elStyleText = this.el.style.cssText
		this.el.style.position = 'fixed'
		this.el.style.zIndex = '9999'
		this.el.style.width = rect.width + 'px'
		this.el.style.height = rect.height + 'px'
		this.el.style.left = rect.left + 'px'
		this.el.style.top = rect.top + 'px'
		this.el.style.boxShadow = `0 0 ${theme.popupShadowBlurRadius}px #888`
		this.el.style.pointerEvents = 'none'
		this.el.style.opacity = '1'
		;(this.el.style as any).willChange = 'transform'
	}

	protected getSiblingsAfter(fromEl: HTMLElement): HTMLElement[] {
		let els: HTMLElement[] = []

		for (let el = fromEl.nextElementSibling as HTMLElement; el; el = el.nextElementSibling as HTMLElement) {
			els.push(el)
		}

		return els
	}

	onEnterDroppable(drop: Droppable) {
		this.giveSpaceForDraggingElement(drop, true)
		this.dropArea = drop
	}
	
	giveSpaceForDraggingElement(drop: Droppable, playAnimation: boolean) {
		let isDraggingInStartArea = this.startDropArea === drop
		if (isDraggingInStartArea) {
			for (let el of this.getSiblingsAfter(this.el as HTMLElement)) {
				this.moveElement(el, 1, playAnimation)
			}
		}

		this.placeholder = document.createElement('div')
		this.placeholder.style.visibility = 'hidden'

		if (this.direction === 'x') {
			this.placeholder.style.width = this.width + 'px'
		}
		else {
			this.placeholder.style.height = this.height + 'px'
		}

		drop.el.append(this.placeholder)
	}

	/** 
	 * Move element based on a move direction.
	 * The `moveDirection` argument considers `autoLayout` always true,
	 * So we should fix it inside.
	 */
	protected moveElement(el: HTMLElement, moveDirection: 1 | 0, playAnimation: boolean) {
		if (el === this.el) {
			return
		}

		let movePx = this.direction === 'x' ? this.width : this.height
		let translateDirection = moveDirection

		// in not in `autoLayout` mode, element will not affect the position of it's followed sibling elements,
		// So we make `moveDirection` -= 1 to balance.
		if (!this.autoLayout && this.el.compareDocumentPosition(el) === el.DOCUMENT_POSITION_FOLLOWING) {
			translateDirection -= 1
		}

		let transform = translateDirection !== 0
			? `translate${this.direction!.toUpperCase()}(${translateDirection * movePx}px)`
			: ''

		if (playAnimation) {
			animateTo(el, {transform})
		}
		else {
			el.style.transform = transform
		}

		if (moveDirection) {
			this.movedElements.add(el)
		}
		else {
			this.movedElements.delete(el)
		}

		if (translateDirection) {
			this.translatedElements.add(el)
		}
		else {
			this.translatedElements.delete(el)
		}
	}

	onEnterDraggable(dragTo: Draggable) {
		if (!this.dropArea) {
			return
		}

		// Sometimes element trigger enter event twice when playing animation,
		// Which will cause element accidentaly restore it's position.
		// We should avoid it be do this.
		if (isPlayingAnimation(dragTo.el)) {
			return
		}

		let willMoveElements = new Set([dragTo.el, ...this.getSiblingsAfter(dragTo.el)])
		willMoveElements.delete(this.el)

		// When the dragged into element has been moved, dragged into it again means that it's movement will be restored.
		if (this.movedElements.has(dragTo.el)) {
			willMoveElements.delete(dragTo.el)
		}

		for (let el of this.movedElements) {
			if (!willMoveElements.has(el)) {
				this.moveElement(el, 0, true)
			}
		}

		// Each element either moves right or down, or keep position.
		for (let el of willMoveElements) {
			if (!this.movedElements.has(el)) {
				this.moveElement(el, 1, true)
			}
		}

		this.dragToIndex = this.generateDraggedToIndex(dragTo, willMoveElements.has(dragTo.el))
		this.dragTo = dragTo
		this.dragToRect = getRect(dragTo.el)
	}

	// Assume we have:
	//	 group 1: 1 2 3
	//   group 2: 4 5 6
	protected generateDraggedToIndex(drag: Draggable, beenMoved: boolean): number {
		let isInSameDropArea = this.startDropArea === this.dropArea
		let index = drag.index

		if (isInSameDropArea) {
			// Drag 1 into 3
			if (index > this.dragging.index) {
				if (beenMoved) {
					return index - 1	// 2 [1] 3, reutnrs index of 3 - 1
				}
				else {
					return index	// 2 3 [1], returns index of 3
				}
			}

			// Drag 3 into 1
			else {
				if (beenMoved) {
					return index	// [3] 1 2, reutnrs index of 1
				}
				else {
					return index + 1	// 1 [3] 2, returns index of 1 + 1
				}
			}
		}

		// Drag 1 into 4
		else {
			if (beenMoved) {
				return index	// [1] 4 5 6, returns index of 4
			}
			else {
				return index + 1	// 4 [1] 5 6, returns index of 4 + 1
			}
		}
	}

	translateDraggingElement(x: number, y: number) {
		this.translate = [x, y]
		this.el.style.transform = `translate(${x}px, ${y}px)`
	}

	willSwapElements(): boolean {
		return !!(this.dragTo || this.dropArea && this.startDropArea !== this.dropArea)
	}

	getSwapIndex(): number {
		return this.dragToIndex
	}

	onLeaveDroppable(drop: Droppable) {
		if (drop !== this.dropArea) {
			return
		}

		for (let el of this.movedElements) {
			this.moveElement(el, 0, true)
		}

		this.dropArea = null
		this.dragTo = null
		this.dragToRect = null
		this.dragToIndex = -1
	}

	async playEndDraggingAnimation() {
		if (this.willSwapElements()) {
			await this.animateDraggingElementToDropArea()
			this.el.style.transform = ''
		}
		else {
			// When moved dragging element outside
			if (this.dropArea !== this.startDropArea) {
				this.moveSiblingsToGiveSpace(true)
			}

			await animateTo(this.el, {transform: ''})
		}

		this.restoreMovedElements(false)
		this.clearDraggingStyle()
	}

	protected async animateDraggingElementToDropArea() {
		let fromRect = getRect(this.el)
		let toRect = this.dragToRect || getRect(this.placeholder!)

		let x = toRect.left - fromRect.left + this.translate[0]
		let y = toRect.top - fromRect.top + this.translate[1]

		if (this.direction === 'x') {
			// Move from left to right, align at right.
			if (this.dragging.index < this.dragToIndex) {
				x = toRect.right - fromRect.right + this.translate[0]
			}
		}
		else {
			// Move from top to bottom, align at bottom.
			if (this.dragging.index < this.dragToIndex) {
				y = toRect.bottom - fromRect.bottom + this.translate[1]
			}
		}

		let transform = `translate(${x}px, ${y}px)`

		await animateTo(this.el, {transform})
	}

	protected moveSiblingsToGiveSpace(playAnimation: boolean) {
		for (let el of this.getSiblingsAfter(this.el)) {
			this.moveElement(el, 1, playAnimation)
		}
	}

	protected restoreMovedElements(playAnimation: boolean) {
		for (let el of this.translatedElements) {
			if (playAnimation) {
				animateTo(el, {transform: ''})
			}
			else {
				stopAnimation(el)
				el.style.transform = ''
			}
		}

		this.movedElements = new Set()
		this.translatedElements = new Set()

		if (this.placeholder) {
			this.placeholder.remove()
			this.placeholder = null
		}
	}

	protected clearDraggingStyle() {
		document.body.style.cursor = ''
		document.body.style.userSelect = ''

		this.el.style.cssText = this.elStyleText
	}
}