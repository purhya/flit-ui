import * as ff from 'ff'
(window as any).ff = ff
import * as flit from 'flit'
(window as any).flit = flit
import * as fui from '../src'
(window as any).fui = fui

import {html, renderAndWatch, renderComponent, define, liveAsyncRepeat, repeat, observe} from 'flit'
import {Modal, message, notification, Select, theme, ThemeOptions, Store, contextmenu, draggable, droppable} from '../src'
import {remove} from 'ff'


let treeData = {
	children: [
		{
			icon: 'user',
			text: 'User A',
			path: '/'
		},
		{
			icon: 'user',
			text: 'User B',
			path: '/',
			children: [
				{
					icon: 'folder',
					text: 'Folder A',
					path: '/'
				},
				{
					icon: 'folder',
					text: 'Folder B',
					path: '/',
				},
			]
		},
	]
}


let leftData = observe([1, 2, 3])
let rightData = observe([4, 5, 6])


function renderContextMenu(index: number) {
	return html`
		<f-menu>
			<f-menuitem>Line: ${index}</f-menuitem>
		</f-menu>
	`
}


define('f-theme-select', class ThemeSelect extends Select {

	value = 'light'

	data: [string, string][] = [
		['light', 'light'],
		['dark' , 'dark' ],
	]	

	renderOptionDisplay(_color: string, name: string) {
		return ff.capitalize(name)
	}

	onReady() {
		super.onReady()

		this.on('change', (value: string) => {
			theme.changeTheme(value)
		})
	}
})


define('f-main-color-select', class MainColorSelect extends Select {

	value = '#0077cf'

	data: [string, string][] = [
		['#48c7c7', 'cyan'    ],
		['#3988e5', 'blue'    ],
		['#0077cf', 'darkblue'],
		['#4eb2ea', 'skyblue' ],
		['#be66cc', 'purple'  ],
		['#ff6666', 'red'     ],
		['#ff8095', 'pink'    ],
		['#d65c5c', 'brown'   ],
		['#f67d51', 'orange'  ],
		['#15af78', 'green'   ],
		['#888888', 'grey'    ],
	]	

	renderOptionStyle(color: string) {
		return 'color: ' + color
	}

	renderOptionDisplay(_color: string, name: string) {
		return ff.capitalize(name)
	}

	onReady() {
		super.onReady()

		this.on('change', (value: unknown) => {
			theme.set('mainColor', value as string)
		})
	}
})


define('f-size-select', class SizeSelect extends Select<'small' | 'medium' | 'large'> {

	value: 'small' | 'medium' | 'large' = 'medium'

	data: ['small' | 'medium' | 'large', string][] = [
		['small', 'Small'],
		['medium', 'Medium'],
		['large', 'Large'],
	]

	themeOptions: {[key in 'small' | 'medium' | 'large']: Partial<ThemeOptions>} = {
		'small': {
			fontSize: 12,
			lineHeight: 24,
			borderRadius: 12
		},
		'medium': {
			fontSize: 14,
			lineHeight: 30,
			borderRadius: 15
		},
		'large': {
			fontSize: 16,
			lineHeight: 40,
			borderRadius: 20
		}
	}

	onReady() {
		super.onReady()

		this.on('change', (type: 'small' | 'medium' | 'large') => {
			let options = this.themeOptions[type]
			for (let key of Object.keys(options)) {
				theme.set(key as keyof ThemeOptions, options[key as keyof ThemeOptions])
			}
		})
	}
})


define('f-font-size-select', class FontSizeSelect extends Select<number> {

	value: number = 14
	data: [number, string][] = [11, 12, 13, 14, 16, 18].map(v => [v, v + 'px']) as [number, string][]

	onReady() {
		super.onReady()

		this.on('change', (value: number) => {
			theme.set('fontSize', value)
		})
	}
})


define('f-line-height-select', class LineHeightSelect extends Select<number> {

	value: number = 30
	data: [number, string][] = [24, 26, 28, 30, 32, 36, 40].map(v => [v, v + 'px']) as [number, string][]

	onReady() {
		super.onReady()

		this.on('change', (value: number) => {
			theme.set('lineHeight', value)
		})
	}
})


define('f-border-radius-select', class BorderRadiusSelect extends Select<number> {

	value: number = 15
	data: [number, string][] = [0, 3, 5, 8, 12, 15, 20].map(v => [v, v + 'px']) as [number, string][]

	onReady() {
		super.onReady()

		this.on('change', (value: number) => {
			theme.set('borderRadius', value)
		})
	}
})


function range(start: number, end: number) {
	let data: number[] = []
	for (let i = start; i <= end; i++) {
		data.push(i)
	}
	return data
}


let modal: Modal

async function openModal() {
	if (!modal) {
		modal = renderComponent(html`
			<f-modal .title="Modal Title">
				<div slot="body">Win Body</div>
				<button slot="foot" @click="${hideModal}">OK</button>
			</f-modal>
		`) as Modal
	}

	modal.show()
}

function hideModal() {
	modal.hide()
}


let {fragment} = renderAndWatch(() => {
	let {lineHeight} = theme

	return html`

	<section class="theme">
		<div><span>Theme:</span><f-theme-select style="width: ${lineHeight * 5}px;" /></div>
		<div><span>Size:</span><f-size-select style="width: ${lineHeight * 5}px;" /></div>
		<div><span>Font Size:</span><f-font-size-select .value=${theme.fontSize} style="width: ${lineHeight * 5}px;" /></div>
		<div><span>Line Height:</span><f-line-height-select .value=${theme.lineHeight} style="width: ${lineHeight * 5}px;" /></div>
		<div><span>Border Radius:</span><f-border-radius-select .value=${theme.borderRadius} style="width: ${lineHeight * 5}px;" /></div>
		<div>
			<span>Main color:</span>
			<f-main-color-select style="width: ${lineHeight * 5}px;" />
		</div>
	</section>

	<section class="buttons">
		<button filled><f-icon-loading></f-icon-loading><span>Loading button</span></button>
		<button><f-icon type="user"></f-icon><span>Normal button</span></button>
		<button filled><f-icon type="user"></f-icon><span>Primary button</span></button>
		<button borderless><f-icon type="user"></f-icon><span>Borderless button</span></button>
		<button filled><span>Icon in right</span><f-icon type="right"></f-icon></button>
		<button disabled><f-icon type="user"></f-icon><span>Disabled icon</span></button>
		<button round filled><f-icon type="user"></f-icon></button>
	</section>

	<section>
		<f-buttongroup>
			<button filled><f-icon type="user"></f-icon><span>Button</span></button>
			<button><f-icon type="user"></f-icon><span>Button</span></button>
		</f-buttongroup>

		<f-buttongroup>
			<button round filled><f-icon type="user"></f-icon></button>
			<button round><f-icon type="user"></f-icon></button>
		</f-buttongroup>
	</section>

	<section>
		<input type="text">
		<textarea></textarea>
	</section>

	<section>
		<f-radiogroup value="b" :tooltip="Radio Group" style="display: inline-block; width:200px;">
			<f-radio value="a">Radio A</f-radio>
			<f-radio value="b">Radio B</f-radio>
		</f-radiogroup>
	</section>

	<section>
		<f-checkboxgroup style="width:150px;" .value=${['3']}>
			<f-checkbox value="1">Checkbox 1</f-checkbox>
			<f-checkbox value="2">Checkbox 2</f-checkbox>
			<f-checkbox value="3">Checkbox 3</f-checkbox>
			<f-checkbox indeterminate value="4">Checkbox 4</f-checkbox>
		</f-checkboxgroup>
	</section>

	<section>
		<f-switch></f-switch><span style="margin-left: 6px;">Switch</span>
	</section>

	<section>
		<f-slider value="50"></f-slider>
		<f-slider vertical value="50"></f-slider>
	</section>

	<section>
		<f-popover .title="Here is the popover title">
			<button>Popover</button>
			<div slot="content">Here is the popover content</div>
		</f-popover>
	</section>

	<section>
		<f-menu selectable style="width: 200px;">
			<f-menuitem icon="user">User A</f-menuitem>
			<f-menuitem icon="user">User B</f-menuitem>
			<f-submenu>
				<f-menuitem icon="folder">Folder A</f-menuitem>
				<f-menuitem icon="folder">Folder B</f-menuitem>
				<f-submenu>
					<f-menuitem>Item A</f-menuitem>
					<f-menuitem>Item B</f-menuitem>
				</f-submenu>
			</f-submenu>
		</f-menu>
	</section>

	<section>
		<f-dropdown icon="">
			<button><span>Dropdown</span><f-icon type="down" /></button>
			<f-menu slot="content">
				<f-menuitem icon="user">User A</f-menuitem>
				<f-submenu>
					<f-menuitem>Item A</f-menuitem>
					<f-menuitem>Item B</f-menuitem>
				</f-submenu>
				<f-menuitem icon="user">User B</f-menuitem>
				<f-submenu>
					<f-menuitem icon="folder">Folder A</f-menuitem>
					<f-menuitem icon="folder">Folder B</f-menuitem>
					<f-menuitem icon="folder">Folder C</f-menuitem>
					<f-menuitem icon="folder">Folder D</f-menuitem>
					<f-menuitem icon="folder">Folder E</f-menuitem>
					<f-menuitem icon="folder">Folder F</f-menuitem>
					<f-submenu>
						<f-menuitem>Item A</f-menuitem>
						<f-menuitem>Item B</f-menuitem>
					</f-submenu>
				</f-submenu>	
			</f-menu>
		</f-dropdown>
	</section>

	<section>
		<f-select .data=${range(1, 10).map(v => [v, v])} .value=${1} style="width: ${lineHeight * 4}px" />
		<f-select searchable .data=${range(1, 10).map(v => [v, v])} .value=${1} style="width: ${lineHeight * 4}px" />
		<f-select multiple .data=${range(1, 100).map(v => [v, v])} .value=${[50, 51]} style="width: ${lineHeight * 4}px" />
	</section>

	<section>
		<button @click="${openModal}">Open Modal</button>
	</section>

	<section>
		<button @click="${() => message.info('This is a info message.')}">Open Info Message</button>
		<button @click="${() => message.success('This is a success message.')}">Open Success Message</button>
		<button @click="${() => message.alert('This is an alert message.')}">Open Alert Message</button>
		<button @click="${() => message.confirm('This is a confirm message.')}">Open Confirm Message</button>
		<button @click="${() => message.prompt('This is a prompt message.')}">Open Prompt Message</button>
		<button @click="${() => message.success('This is a success message.', {title: 'Message title'})}">Open Message with title</button>
	</section>

	<section>
		<button @click=${() => notification.success('This is a success notify')}>Show Success Notification</button>
		<button @click=${() => notification.alert('This is an alert notify')}>Show Alert Notification</button>
		<button @click=${() => notification.info('This is an info notify')}>Show Info Notification</button>
		<button @click=${() => notification.success('This is notify with title specified', {title: 'The notification title'})}>Show Notification with title</button>
	</section>

	<section>
		<f-tree style="width: 200px;" selectable .data=${treeData} />
	</section>

	<section style="height: 200px; overflow: auto; background: ${theme.backgroundColor.darken(3)};">
		<div style="overflow: hidden;">
		${liveAsyncRepeat(
			{
				//data: range(1, 1000),
				dataCount: 1000,
				dataGetter: async (start: number, count: number) => {
					await ff.sleep(500)
					return range(start, start + count - 1)
				},
				pageSize: 10,
				ref: (dir) => {
					(window as any).dir = dir
				}
			},
			(item: number | null, index: number) => html`
				<div class="row" style="height: 31px;" :style.background=${theme.backgroundColor}  ${contextmenu(() => renderContextMenu(item))}>
					<div>Index: ${index}</div>
					<div>Value: ${item === null ? '--' : item}</div>
				</div>`
			)
		}
		</div>
	</section>

	<section>
		<f-grid
			resizable
			live
			group-size="10"
			.store=${new Store({
				data: range(1, 1000).map(n => ({id: n, value: n})),
				key: 'id',
			})}
			.columns=${[
				{
					title: 'Index',
					render: (_item: {id: number, value: number}, index: number) => {
						return index
					}
				},
				{
					title: 'ID',
					orderable: true,
					render: (item: {id: number, value: number}) => {
						return item.id
					}
				},
				{
					title: 'Value',
					orderable: true,
					render: (item: {id: number, value: number}) => {
						return item.value
					}
				}
			]}
		/>
	</section>

	<section>
		<div style="display: inline-flex; height: 120px; padding: 10px 0 10px 10px; background: ${theme.darkenInLightMode(theme.backgroundColor, 5)}; line-height: 100px; font-size: 60px; text-align: center;"
			${droppable((value: number, index: number) => {
				remove(leftData, value)
				remove(rightData, value)

				if (index === -1) {
					leftData.push(value)
				}
				else {
					leftData.splice(index, 0, value)
				}
			})}
		>
			${repeat(leftData, (data: number, index: number) => html`
				<div style="width: 100px; margin-right: 10px;" :style.background=${theme.darkenInLightMode(theme.backgroundColor, 15)} ${draggable(data, index)}>${data}</div>
			`)}
		</div>
		<br>
		<div style="display: inline-flex; height: 120px; padding: 10px 0 10px 10px; background: ${theme.darkenInLightMode(theme.backgroundColor, 5)}; line-height: 100px; font-size: 60px; text-align: center;"
			${droppable((value: number, index: number) => {
				remove(leftData, value)
				remove(rightData, value)

				if (index === -1) {
					rightData.push(value)
				}
				else {
					rightData.splice(index, 0, value)
				}
			})}
		>
			${repeat(rightData, (data: number, index: number) => html`
				<div style="width: 100px; margin-right: 10px;" :style.background=${theme.darkenInLightMode(theme.backgroundColor, 15)} ${draggable(data, index)}>${data}</div>
			`)}
		</div>
	</section>
	
	<section style="display: flex;">
		<div style="width: 120px; padding: 10px 10px 0; background: ${theme.darkenInLightMode(theme.backgroundColor, 5)}; line-height: 100px; font-size: 60px; text-align: center;"
			${droppable((value: number, index: number) => {
				remove(leftData, value)
				remove(rightData, value)

				if (index === -1) {
					leftData.push(value)
				}
				else {
					leftData.splice(index, 0, value)
				}
			})}
		>
			${repeat(leftData, (data: number, index: number) => html`
				<div style="margin-bottom: 10px;" :style.background=${theme.darkenInLightMode(theme.backgroundColor, 15)} ${draggable(data, index)}>${data}</div>
			`)}
		</div>

		<div style="width: 120px; padding: 10px 10px 0; background: ${theme.darkenInLightMode(theme.backgroundColor, 5)}; line-height: 100px; font-size: 60px; text-align: center;"
			${droppable((value: number, index: number) => {
				remove(leftData, value)
				remove(rightData, value)

				if (index === -1) {
					rightData.push(value)
				}
				else {
					rightData.splice(index, 0, value)
				}
			})}
		>
			${repeat(rightData, (data: number, index: number) => html`
				<div style="margin-bottom: 10px;" :style.background=${theme.darkenInLightMode(theme.backgroundColor, 15)} ${draggable(data, index)}>${data}</div>
			`)}
		</div>
	</section>
`})

document.body.append(fragment)
