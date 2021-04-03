interface TreeDataItem<T = any> {
	value?: T
	children?: TreeDataItem<T>[]
	opened?: boolean
}


export namespace TreeDataNavigator {

	export function moveArrowUp<I extends TreeDataItem>(data: I[], indices: number[]): number[] {
		if (data.length === 0) {
			return []
		}

		if (indices.length === 0) {
			indices = [0]
		}

		if (correctIndices(data, indices)) {
			return indices
		}

		// Moves to parent node.
		if (indices[indices.length - 1] <= 0) {
			indices.pop()
			
			// Move to bottom most if reaches top edge
			if (indices.length === 0) {
				while (true) {
					let childData = getChildDataByIndices(data, indices)
					if (childData && childData.length > 0) {
						indices.push(childData.length - 1)
					}
					else {
						break
					}
				}
			}
		}

		// Moves to last available position deep inside previous node.
		else {
			indices[indices.length - 1]--

			while (true) {
				let childData = getChildDataByIndices(data, indices)
				if (childData && childData.length > 0) {
					indices.push(childData.length - 1)
				}
				else {
					break
				}
			}
		}

		return indices
	}


	export function moveArrowDown<I extends TreeDataItem>(data: I[], indices: number[]): number[] {
		if (data.length === 0) {
			return []
		}

		if (indices.length === 0) {
			return [0]
		}

		if (correctIndices(data, indices)) {
			return indices
		}

		// Moves to first child node.
		if ((getChildDataByIndices(data, indices)?.length || 0) > 0) {
			indices.push(0)
		}

		// Moves to next siblings and may be next sibling of parent node.
		else {
			while (indices.length > 0) {
				if (indices[indices.length - 1] < getSiblingsByIndices(data, indices)!.length - 1) {
					indices[indices.length - 1]++
					break
				}
				else {
					indices.pop()
				}
			}

			//Have at least one node in top level, or it will be handled inside `correctIndices`.
			if (indices.length === 0) {
				indices = [0]
			}
		}

		return indices
	}


	export function moveArrowLeft<I extends TreeDataItem>(data: I[], indices: number[]): number[] {
		if (data.length === 0 || indices.length === 0) {
			return []
		}

		if (indices.length > 0) {
			indices.pop()
		}

		correctIndices(data, indices)

		return indices
	}


	export function moveArrowRight<I extends TreeDataItem>(data: I[], indices: number[]): number[] {
		if (data.length === 0 || indices.length === 0) {
			return []
		}
		
		indices.push(0)
		correctIndices(data, indices)

		return indices
	}


	/** Returns whether corrected it. */
	export function correctIndices<I extends TreeDataItem>(data: I[], indices: number[]): boolean {
		let corrected = false

		// No siblings, move to previous in parent siblings.
		// Happens after data changed much.
		while (indices.length > 0) {
			let siblings = getSiblingsByIndices(data, indices)

			if (siblings) {
				let lastIndex = indices[indices.length - 1]
				if (lastIndex >= siblings.length) {
					indices[indices.length - 1] = siblings.length - 1
					corrected = true
				}
				
				break
			}
			else {
				indices.pop()
				corrected = true
			}
		}

		return corrected
	}


	export function getItemByIndices<I extends TreeDataItem>(data: I[], indices: number[]): I | undefined {
		if (!indices) {
			return undefined
		}

		let value: I | undefined = undefined
		let childData: I[] | null = data

		for (let index of indices) {
			if (!childData) {
				value = undefined
				break
			}

			if (index >= 0 && index < childData.length) {
				value = childData[index]
				childData = value.opened ? (value.children as I[] | undefined) || null : null
			}
		}

		return value
	}


	function getSiblingsByIndices<I extends TreeDataItem>(data: I[], indices: number[]) {
		if (indices.length === 1) {
			return data
		}

		let value = getItemByIndices(data, indices.slice(0, -1))
		if (value?.opened && value?.children) {
			return value?.children
		}

		return null
	}


	function getChildDataByIndices<I extends TreeDataItem>(data: I[], indices: number[]) {
		if (indices.length === 0) {
			return data
		}

		let value = getItemByIndices(data, indices)
		if (value?.opened) {
			return value?.children
		}

		return null
	}
}