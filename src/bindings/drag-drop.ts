import {defineBinding, Binding, on, once, off} from "@pucelle/flit"
import {getStyleAsNumber, animateTo, getRect, stopAnimation, Rect} from "@pucelle/ff"
import {theme} from "../style/theme"


export interface DraggableOptions {
	name?: string
}

export interface DroppableOptions<T> {
	name?: string
	onenter?: DropHandler<T>
	onleave?: DropHandler<T>
}

type DropHandler<T> = (data: T, index: number) => void
type Draggable = DraggableBinding<any>
type Droppable = DroppableBinding<any>


class DraggableBinding<T> implements Binding<[T, number, DraggableOptions | undefined]> {

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

	private onMouseDown(e: MouseEvent) {
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

	private onMouseEnter() {
		manager.enterDraggable(this)
	}

	remove() {
		off(this.el, 'mousedown', this.onMouseDown as any, this)
		off(this.el, 'mouseenter', this.onMouseEnter, this)
	}
}

export const draggable = defineBinding('draggable', DraggableBinding) as (data: any, index: number, options?: DraggableOptions) => void



class DroppableBinding<Item> implements Binding<[DropHandler<Item>, DroppableOptions<Item>]> {
	
	el: HTMLElement
	name: string = ''
	direction: 'x' | 'y' | null = null

	private onenter: DropHandler<Item> | null = null
	private onleave: DropHandler<Item> | null = null
	private ondrop!: DropHandler<Item>

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

	private onMouseEnter() {
		manager.enterDroppable(this)
		once(this.el, 'mouseleave', this.onMouseLeave as any, this)
	}

	emitEnter(dragging: Draggable) {
		this.updateDirection()

		if (this.onenter) {
			this.onenter(dragging.data as Item, dragging.index)
		}
	}

	private updateDirection() {
		if (!this.direction) {
			let style = getComputedStyle(this.el)

			if (style.overflowX === 'auto' || style.overflowX === 'scroll') {
				this.direction = 'x'
			}
			else if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
				this.direction = 'y'
			}
			else if (style.display!.includes('flex') && style.flexDirection!.includes('row')) {
				this.direction = 'x'
			}
			else if (style.display!.includes('flex') && style.flexDirection!.includes('column')) {
				this.direction = 'y'
			}
			else {
				this.direction = 'y'
			}
		}
	}

	private onMouseLeave() {
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

	private dragging: Draggable | null = null
	private mover: Mover | null = null

	// May mouse enter in some drop areas, and start dragging,
	// then we need to check which drop area should trigger enter.
	private enteringDrops: Set<Droppable> = new Set()
	private activeDrop: Droppable | null = null
	
	startDragging(drag: Draggable) {
		this.dragging = drag
		let activeDrop: Droppable | undefined

		for (let drop of this.enteringDrops) {
			// May element has been removed
			if (!document.contains(drop.el)) {
				this.enteringDrops.delete(drop)
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

	private canSwapWith(drag: Draggable) {
		return this.dragging && this.dragging.name === drag.name && this.dragging !== drag
	}

	enterDroppable(drop: Droppable) {
		this.enteringDrops.add(drop)

		if (this.canDropTo(drop)) {
			drop.emitEnter(this.dragging!)
			this.activeDrop = drop
			this.mover!.onEnterDroppable(drop)
		}
	}

	private canDropTo(drop: Droppable) {
		return this.dragging && this.dragging.name === drop.name
	}

	leaveDroppable(drop: Droppable) {
		this.enteringDrops.delete(drop)

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

	private dragging: Draggable
	private el: HTMLElement
	private elStyleText: string = ''
	private width: number
	private height: number
	private translate: [number, number] = [0, 0]

	private draggedTo: Draggable | null = null
	private draggedToRect: Rect | null = null
	private draggedToIndex: number = -1
	private movedElements: Set<HTMLElement> = new Set()

	private startDropArea: Droppable
	private dropArea: Droppable | null = null
	private placeholder: HTMLElement | null = null

	constructor(drag: Draggable, drop: Droppable) {
		this.dragging = drag
		this.el = drag.el
		this.startDropArea = this.dropArea = drop

		this.width = this.el.offsetWidth + Math.max(getStyleAsNumber(this.el, 'marginLeft'), getStyleAsNumber(this.el, 'marginRight'))
		this.height = this.el.offsetHeight + Math.max(getStyleAsNumber(this.el, 'marginTop'), getStyleAsNumber(this.el, 'marginBottom'))

		this.setStartDraggingStyle()
		this.giveSpaceForDraggingElement(drop, false)
	}

	private setStartDraggingStyle() {
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
		this.el.style.boxShadow = `1px 1px ${theme.layerShadowBlurRadius}px #888`
		this.el.style.pointerEvents = 'none'
		;(this.el.style as any).willChange = 'transform'
	}

	private moveSiblingsToGiveSpace(playAnimation: boolean) {
		let transform = this.getTranslateStyle(this.startDropArea, 1)
		for (let el of this.getSiblingsAfter(this.el as HTMLElement)) {
			if (playAnimation) {
				animateTo(el, {transform})
			}
			else {
				el.style.transform = transform
			}
			this.movedElements.add(el)
		}
	}

	private getSiblingsFrom(fromEl: HTMLElement | null): HTMLElement[] {
		if (!fromEl) {
			return []
		}
		
		let els: HTMLElement[] = []
		for (let el = fromEl as HTMLElement; el; el = el.nextElementSibling as HTMLElement) {
			els.push(el)
		}
		return els
	}

	private getSiblingsAfter(afterEl: HTMLElement): HTMLElement[] {
		return this.getSiblingsFrom(afterEl.nextElementSibling as HTMLElement | null)
	}

	onEnterDroppable(drop: Droppable) {
		this.giveSpaceForDraggingElement(drop, true)
		this.dropArea = drop
	}
	
	giveSpaceForDraggingElement(drop: Droppable, playAnimation: boolean) {
		let isDraggingInStartArea = this.startDropArea === drop

		if (isDraggingInStartArea) {
			let transform = this.getTranslateStyle(drop, 1)
			for (let el of this.getSiblingsAfter(this.el as HTMLElement)) {
				if (playAnimation) {
					animateTo(el, {transform})
				}
				else {
					el.style.transform = transform
				}
				this.movedElements.add(el)
			}
		}

		this.placeholder = document.createElement('div')
		this.placeholder.style.visibility = 'hidden'

		if (drop.direction === 'x') {
			this.placeholder.style.width = this.width + 'px'
		}
		else {
			this.placeholder.style.height = this.height + 'px'
		}

		drop.el.append(this.placeholder)
	}

	private getTranslateStyle(drop: Droppable, moveDirection: -1 | 1) {
		let movePx = drop.direction === 'x' ? this.width : this.height
		return `translate${drop.direction!.toUpperCase()}(${moveDirection * movePx}px)`
	}

	onLeaveDroppable(drop: Droppable) {
		if (drop !== this.dropArea) {
			return
		}

		this.restoreMovedElements(true)
		this.dropArea = null
		this.draggedTo = null
		this.draggedToRect = null
		this.draggedToIndex = -1
	}

	private restoreMovedElements(playAnimation: boolean) {
		for (let el of this.movedElements) {
			if (playAnimation) {
				animateTo(el, {transform: ''})
			}
			else {
				el.style.transform = ''
				stopAnimation(el)
			}
		}

		this.movedElements = new Set()

		if (this.placeholder) {
			this.placeholder.remove()
			this.placeholder = null
		}
	}

	onEnterDraggable(drag: Draggable) {
		if (!this.dropArea) {
			return
		}

		let willMoveElements: Set<HTMLElement> = new Set()
		for (let el of this.getSiblingsFrom(drag.el)) {
			if (el !== this.el) {
				willMoveElements.add(el)
			}
		}

		// When the dragged into element has been moved, dragged into it again means that it's movement will be restored.
		if (this.movedElements.has(drag.el)) {
			willMoveElements.delete(drag.el)
		}

		let transform = this.getTranslateStyle(this.dropArea, 1)
		for (let el of this.movedElements) {
			if (!willMoveElements.has(el)) {
				animateTo(el, {transform: ''})
			}
		}

		// Each element either move down compare to it's original position, or keep position.
		for (let el of willMoveElements) {
			if (!this.movedElements.has(el)) {
				animateTo(el, {transform})
			}
		}

		this.draggedToIndex = this.generateDraggedToIndex(drag, willMoveElements.has(drag.el))
		this.movedElements = willMoveElements
		this.draggedTo = drag
		this.draggedToRect = getRect(drag.el)
	}

	// Assume we have:
	//	 group 1: 1 2 3
	//   group 2: 4 5 6
	private generateDraggedToIndex(drag: Draggable, beenMoved: boolean): number {
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
		return !!(this.draggedTo || this.dropArea && this.startDropArea !== this.dropArea)
	}

	getSwapIndex(): number {
		return this.draggedToIndex
	}

	async playEndDraggingAnimation() {
		if (this.willSwapElements()) {
			await this.animateDraggingElementToDropArea()
			this.el.style.transform = ''
			this.clearDraggingStyle()
			this.restoreMovedElements(false)
		}
		else {
			// When moved dragging element outside
			if (this.dropArea !== this.startDropArea) {
				this.moveSiblingsToGiveSpace(true)
			}

			await animateTo(this.el, {transform: ''})
			this.clearDraggingStyle()
			this.restoreMovedElements(false)
		}
	}

	private async animateDraggingElementToDropArea() {
		let fromRect = getRect(this.el)
		let toRect = this.draggedToRect || getRect(this.placeholder!)
		let x = toRect.left - fromRect.left + this.translate[0]
		let y = toRect.top - fromRect.top + this.translate[1]
		let transform = `translate(${x}px, ${y}px)`

		await animateTo(this.el, {transform})
	}

	private clearDraggingStyle() {
		document.body.style.cursor = ''
		document.body.style.userSelect = ''

		this.el.style.cssText = this.elStyleText
	}
}