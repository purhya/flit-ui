import {define, Component, TemplateResult, on, off, defineBinding, Binding, getClosestComponent} from 'flit'


type RouteParams = {[key: string]: string}

export type RouteRenderResult = (match: RouteMatch) => (string | TemplateResult)

export interface RouteMatch {
	params: RouteParams
	captures: string[]
}

export interface RouteOptions {
	title?: string
	redirect?: string
}

export interface RouterEvents {
	goto: (path: string) => void
}


@define('f-router')
export class Router extends Component<RouterEvents> {

	prefix: string = ''
	path: string = ''

	protected onCreated() {
		this.path = this.getPathFromUri(location.href)
		on(window, 'popstate', this.onStateChange as (e: Event) => void, this)
	}

	private getPathFromUri(uri: string): string {
		let path = this.removeProtocolAndHost(uri)

		if (this.prefix && path.startsWith(this.prefix)) {
			path = path.slice(this.prefix.length)
		}

		if (!path) {
			path = '/'
		}

		return path
	}

	private removeProtocolAndHost(uri: string) {
		return uri.replace(/^(\w+:)?\/\/[^\/]+/, '')
	}

	protected onDisconnected() {
		off(window, 'popstate', this.onStateChange as (e: Event) => void, this)
	}

	private onStateChange(e: PopStateEvent) {
		if (e.state) {
			this.redirectTo(e.state.url)
		}
	}

	route(routePath: string | RegExp, renderFn: RouteRenderResult, options: RouteOptions = {}): TemplateResult | string {
		if (this.isMatch(routePath)) {
			if (options.title) {
				document.title = options.title
			}

			if (options.redirect) {
				this.redirectTo(options.redirect)
				return ''
			}
			else {
				let params = this.matchPath(routePath)

				let match: RouteMatch = {
					params: params ? params.params : {},
					captures: params ? params.captures : []
				}

				return renderFn(match)
			}
		}
		else {
			return ''
		}
	}

	isMatch(routePath: string | RegExp): boolean {
		return PathParser.isMatch(this.path, routePath)
	}

	matchPath(routePath: string | RegExp) {
		return PathParser.matchPath(this.path, routePath)
	}

	goto(path: string) {
		this.path = path
		let uri = this.getURIFromPath(path)
		history.replaceState({uri}, '', uri)
	}

	redirectTo(path: string) {
		this.path = path
		let uri = this.getURIFromPath(path)
		history.replaceState({uri}, '', uri)
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

			let params: {[key: string]: string} = {}
			if (keys) {
				for (let i = 0; i < keys.length; i++) {
					let key = keys[i]
					params[key] = m[i]
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


defineBinding('goto', class GotoBinding implements Binding<[string]>{
	
	el: HTMLElement
	value: string = ''
	router: Router | null = null

	constructor(el: Element) {
		this.el = el as HTMLElement
		on(this.el, 'click', this.onClick, this)
	}

	update(value: string) {
		this.value = value
	}

	private onClick() {
		this.ensureRouter()
		this.router!.goto(this.value)
	}

	private ensureRouter() {
		if (!this.router) {
			this.router = getClosestComponent(this.el.parentElement!, Router)
			
			if (!this.router) {
				throw new Error(`":goto" must be contained in a extended component of "<f-router>"`)
			}
		}
	}

	remove() {}
})
