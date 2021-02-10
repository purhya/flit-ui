import {define, Component, TemplateResult, on, off} from '@pucelle/flit'


export type RouteRenderResult = (match: RouteMatch) => (string | TemplateResult)

export interface RouteMatch {
	params: RouteParams
	captures: string[]
}

export type RouteParams = Record<string, string>

export interface RouteOptions {
	title?: string
}

export interface RouterEvents {
	goto: (path: string) => void
}


@define('f-router')
export class Router<E = any> extends Component<RouterEvents & E> {

	prefix: string = ''
	path: string = ''

	protected onCreated() {
		this.path = this.getPathFromUri(location.href)
		on(window, 'popstate', this.onStateChange as (e: Event) => void, this)
	}

	getPathFromUri(uri: string): string {
		let path = new URL(uri).pathname

		if (this.prefix && path.startsWith(this.prefix)) {
			path = path.slice(this.prefix.length)
		}

		if (!path) {
			path = '/'
		}

		return path
	}

	protected onDisconnected() {
		off(window, 'popstate', this.onStateChange as (e: Event) => void, this)
	}

	private onStateChange(e: PopStateEvent) {
		if (e.state) {
			this.redirectTo(e.state.path)
		}
	}

	route(routePath: string | RegExp, renderFn: RouteRenderResult, options: RouteOptions = {}): TemplateResult | string {
		if (this.isMatch(routePath)) {
			if (options.title) {
				document.title = options.title
			}

			let params = this.match(routePath)

			let match: RouteMatch = {
				params: params?.params || {},
				captures: params?.captures || []
			}

			return renderFn(match)
		}
		else {
			return ''
		}
	}

	isMatch(routePath: string | RegExp): boolean {
		return PathParser.isMatch(this.path, routePath)
	}

	match(routePath: string | RegExp) {
		return PathParser.matchPath(this.path, routePath)
	}

	goto(path: string) {
		this.path = path
		let uri = this.getURIFromPath(path)
		history.pushState({path}, '', uri)
	}

	redirectTo(path: string) {
		this.path = path
		let uri = this.getURIFromPath(path)
		history.replaceState({path}, '', uri)
	}

	private getURIFromPath(path: string): string {
		if (!path) {
			path = '/'
		}

		if (this.prefix) {
			path = this.prefix + path
		}

		return path
	}
}


namespace PathParser {
	const pathParsedResultMap: Map<string, {re: RegExp, keys: string[]}> = new Map()

	export function isMatch(path: string, routePath: string | RegExp): boolean {
		let re: RegExp

		if (typeof routePath === 'string') {
			re = ensureParsedResult(routePath).re
		}
		else {
			re = routePath
		}

		return re.test(path)
	}

	function ensureParsedResult(routePath: string): {re: RegExp, keys: string[]} {
		if (pathParsedResultMap.has(routePath)) {
			return pathParsedResultMap.get(routePath)!
		}
		else {
			return parsePath(routePath)
		}
	}

	export function matchPath(path: string, routePath: string | RegExp) {
		let params: RouteParams = {}
		let captures: string[] = []

		if (typeof routePath === 'string') {
			let {re, keys} = ensureParsedResult(routePath)
			let m = path.match(re)
			if (!m) {
				return null
			}

			if (keys) {
				for (let i = 0; i < keys.length; i++) {
					let key = keys[i]
					params[key] = m[i + 1]
				}
			}
		}
		else {
			let m = path.match(routePath)
			if (!m) {
				return null
			}

			captures = [...m]
		}

		return {
			params,
			captures
		}
	}

	function parsePath(routePath: string): {re: RegExp, keys: string[]} {
		let keys: string[] = []

		let re = new RegExp(
			routePath
			.replace(/\./g, '\\.')
			.replace(/\*/g, '.*?')
			.replace(/(\/?):(\w+)/g, function (_m0, slash, property) {
				if (property) {
					(keys as string[]).push(property)
				}
				return slash + '?([\\w-]*?)'
			})
			.replace(/^/, '^')
			.replace(/$/, '$'),
		'i')
		
		let parsed = {re, keys}
		pathParsedResultMap.set(routePath, parsed)

		return parsed
	}
}
