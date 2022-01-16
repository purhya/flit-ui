import {MouseLeave} from '@pucelle/ff'
import {Template} from '@pucelle/flit'
import {Popup} from '../../components/popup'
import type {PopupBinding} from '../popup'


export namespace SharedPopups {

	/** Cache shared popup components with their `key` option. */
	const PopupCache: Map<string, {template: Template, popup: Popup}[]> = new Map()

	/** Cache shared popup components that in use, and used by which binding. */
	const PopupsUsedBy: Map<Popup, PopupBinding> = new Map()


	/** Get a shared popup component by key. */
	export function getCache(key: string): {template: Template, popup: Popup} | null {
		let caches = PopupCache.get(key)

		if (caches) {
			// We want to match template result here.
			// Then we found:
			// Popup1 -> Popup2.
			// Popup3 reuse Popup1.
			// Popup2 still appears and follows Popup3 for a little while, then disappear.
			// This is not what we want.

			for (let i = caches.length - 1; i >= 0; i--) {
				let cache = caches[i]
				let popup = cache.popup

				// If current popup is in use, not reuse it.
				if (!MouseLeave.checkLocked(popup.el)) {
					return cache
				}
			}
		}

		return null
	}

	/** Get a shared popup component by key. */
	export function addCache(key: string, cache: {template: Template, popup: Popup}) {
		let caches = PopupCache.get(key)
		if (!caches) {
			caches = []
			PopupCache.set(key, caches)
		}

		caches.push(cache)
	}

	/** Delete a shared popup component after it was hide. */
	export function deleteCache(key: string, popup: Popup) {
		let caches = PopupCache.get(key)
		if (caches) {
			caches = caches.filter(cache => cache.popup !== popup)
			PopupCache.set(key, caches)
		}

		PopupsUsedBy.delete(popup)
	}

	/** Is cache with the specified key is being used by any binding. */
	export function isKeyInUse(key: string): boolean {
		let cache = getCache(key)
		return cache ? PopupsUsedBy.has(cache.popup) : false
	}

	/** Check which binding is using the specified popup. */
	export function getPopupUser(popup: Popup): PopupBinding | undefined {
		return PopupsUsedBy.get(popup)
	}

	/** Set user for a popup. */
	export function setPopupUser(popup: Popup, binding: PopupBinding) {
		return PopupsUsedBy.set(popup, binding)
	}
}

