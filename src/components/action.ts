import {html} from '@pucelle/flit'
import {orderBy} from '@pucelle/ff'


export interface Action {
	/** Used at Dialog to know which action button clicked */
	value?: string

	/** Button text. */
	text: string

	/** Button of action becomes primary if set this to true. */
	primary?: boolean

	/** Button of third action will be put left, only one third action is allowed. */
	third?: boolean

	/** 
	 * Returns if handle it successfully, will hide popover if returns is not `false`. 
	 * Note that for notification, dialog, will always hide after clicked action button.
	 */
	handler?: () => boolean | void | Promise<boolean | void>
}

export interface ContextHasActions {
	onActionHandled(action: Action, success: boolean, others?: any): void
}


export function renderActions(context: ContextHasActions, actions: Action[] | null | undefined, others?: any) {
	if (actions && actions.length > 0) {
		actions = orderBy([...actions], action => action.third ? 0 : 1)

		let results = actions.map(action => html`
			<button class="action"
				?primary=${action.primary}
				style="${action.third ? 'margin-left: 0; margin-right: auto;' : ''}"
				@click=${() => handleActionClicking(context, action, others)}>
				${action.text}
			</button>
		`)

		return html`<div class="actions">${results}</div>`
	}

	return ''
}


async function handleActionClicking(context: ContextHasActions, action: Action, others?: any) {
	let failed = action.handler && await action.handler() === false
	context.onActionHandled(action, !failed, others)
}