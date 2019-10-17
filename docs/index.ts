import * as ff from '@pucelle/ff'
import * as flit from '@pucelle/flit'
import * as fui from '../src'

;(window as any).ff = ff
;(window as any).flit = flit
;(window as any).fui = fui


import {html, renderComponent, define, liveAsyncRepeat, repeat, observe} from '@pucelle/flit'
import {Modal, message, notification, Select, theme, Store, contextmenu, draggable, droppable} from '../src'


define('flit-preview', class extends flit.Component {
	render() {
		let {lineHeight} = theme

		return html`
		<div class="wrapper">
			<section class="theme">
				<h2>Theme</h2>

				<f-row style="margin: 8px 0;">
					<f-col .span="4">Mode</f-col>
					<f-col .span="20">
						<f-radiogroup .value="light" @change=${(name: string) => theme.changeTheme(name)}>
							<f-radio .value="light" style="margin-right: 20px;">Light</f-radio>
							<f-radio .value="dark" style="margin-right: 20px;">Dark</f-radio>
						</f-radiogroup>
					</f-col>
				</f-row>

				<f-row style="margin: 8px 0;">
					<f-col .span="4">Size</f-col>
					<f-col .span="20">
						<f-radiogroup .value="medium" @change=${(name: string) => theme.changeTheme(name)}>
							<f-radio .value="small" style="margin-right: 20px;">Small</f-radio>
							<f-radio .value="medium" style="margin-right: 20px;">Medium</f-radio>
							<f-radio .value="large" style="margin-right: 20px;">Large</f-radio>
							<f-radio .value="touch" style="margin-right: 20px;">Touch</f-radio>
						</f-radiogroup>
					</f-col>
				</f-row>

				<f-row style="margin: 8px 0;">
					<f-col .span="4">Main color</f-col>
					<f-col .span="20">
						<f-main-color-select style="width: ${lineHeight * 5}px;" />
					</f-col>
				</f-row>
			</section>


			<h2>Basic Elements</h2>

			<section class="basic">
				<h3>Buttons</h3>
				<f-row style="margin: 8px 0;">
					<f-col .span="4">
						<header>Primary</header>
						<button style="margin: 8px 0;" primary>Button Text</button><br>
						<button style="margin: 8px 0;" primary><f-icon .type="love" /><span>Button Text</span></button><br>
						<button style="margin: 8px 0;" primary><f-icon .type="love" /></button><br>
					</f-col>
					<f-col .span="4">
						<header>Normal</header>
						<button style="margin: 8px 0;">Button Text</button><br>
						<button style="margin: 8px 0;"><span>Button Text</span><f-icon .type="right" /></button><br>
						<button style="margin: 8px 0;"><f-icon .type="love" /></button><br>
					</f-col>
					<f-col .span="4">
						<header>Flat</header>
						<button style="margin: 8px 0;" flat>Button Text</button><br>
						<button style="margin: 8px 0;" flat><f-icon .type="love" /><span>Button Text</span></button><br>
					</f-col>
				</f-row>
			</section>

			<section>
				<h3>Links</h3>
				<f-row style="margin: 8px 0;">
					<f-col .span="4">
						<header>Primary</header>
						<a href="javascript:void" primary>Link Text</a>
					</f-col>
					<f-col .span="4">
						<header>Normal</header>
						<a href="javascript:void">Link Text</a>
					</f-col>
				</f-row>
			</section>

			<section>
				<h3>Labels</h3>
				<f-row style="margin: 8px 0;">
					<f-col .span="4">
						<header>Normal</header>
						<label>First Name</label>
					</f-col>
					<f-col .span="4">
						<header>Required</header>
						<label required>Email</label>
					</f-col>
					<f-col .span="4">
						<header>With Info</header>
						<label>
							Last Name
							<f-icon .type="tips" tooltip="Tips about this field" />
						</label>
					</f-col>
				</f-row>
			</section>


			<h2>Components</h2>

			<section>
				<h3>Button Group</h3>

				<f-buttongroup style="margin: 8px 0;">
					<button primary>One</button>
					<button>Two</button>
					<button>Three</button>
				</f-buttongroup><br>

				<f-buttongroup style="margin: 8px 0;">
					<button primary><f-icon .type="love" /></button>
					<button><f-icon .type="love" /></button>
					<button><f-icon .type="love" /></button>
				</f-buttongroup><br>
			</section>

			<section>
				<h3>Inputs</h3>

				<f-row style="margin: 8px 0 16px 0;" .gutter="24">
					<f-col .span="6">
						<label>With Label</label><br>
						<f-input .type="text" style="width: 100%;" />
					</f-col>
					<f-col .span="6">
						<label>&nbsp;</label><br>
						<f-input .type="text" style="width: 100%;" .placeholder="With Placeholder" />
					</f-col>
					<f-col .span="6">
						<label>&nbsp;</label><br>
						<f-input .type="text" style="width: 100%;" .touched .valid=${true} .placeholder="Valid Input" />
					</f-col>
					<f-col .span="6">
						<label>&nbsp;</label><br>
						<f-input .type="text" style="width: 100%;" .touched .valid=${false} .placeholder="Invalid Input" .error="Error Message" />
					</f-col>
				</f-row>
			</section>

			<section>
				<f-row style="margin: 8px 0;" .gutter="24">
					<f-col .span="6">
						<h3>Checkboxes</h3>
						<f-checkboxgroup>
							<f-checkbox .value="1">Unchecked</f-checkbox><br>
							<f-checkbox .value="2" .checked>Checked</f-checkbox><br>
							<f-checkbox .value="3" .indeterminate>Indeterminate</f-checkbox><br>
						</f-checkboxgroup>
					</f-col>

					<f-col .span="6">
						<h3>Radios</h3>
						<f-radiogroup .value="2">
							<f-radio .value="1">Radio Off</f-radio><br>
							<f-radio .value="2" .checked>Radio On</f-radio><br>
						</f-radiogroup>
					</f-col>

					<f-col .span="6">
						<h3>Switchs</h3>
						<f-switch style="margin-right: 8px;" />Switch Off<br>
						<f-switch style="margin-right: 8px;" .checked />Switch On<br>
					</f-col>

					<f-col .span="6">
						<h3>Tags</h3>
						<f-tag .closable>Closable Tag</f-tag><br>
						<f-tag>Normal Tag</f-tag><br>
					</f-col>
				</f-row>
			</section>

			<section>
				<h3>Form</h3>

				<f-form>
					<f-row style="margin: 8px 0;" .gutter="24">
						<f-col .span="12">
							<label required>Name</label><br>
							<f-input style="width: 100%;" />
						</f-col>
					</f-row>

					<f-row style="margin: 8px 0;" .gutter="24">
						<f-col .span="6">
							<label>Country</label><br>
							<f-input style="width: 100%;" />
						</f-col>

						<f-col .span="6">
							<label>City</label><br>
							<f-select style="width: 100%;" />
						</f-col>
					</f-row>

					<f-row style="margin: 8px 0;" .gutter="24">
						<f-col .span="12">
							<label>Address</label><br>
							<f-input style="width: 100%;" />
						</f-col>
					</f-row>

					<f-row style="margin: 8px 0;" .gutter="24">
						<f-col .span="12">
							<label>About</label><br>
							<f-textarea style="width: 100%;" />
						</f-col>
					</f-row>

					<f-row style="margin: 16px 0 10px;" .gutter="24">
						<f-col .span="12" style="text-align: right;">
							<button primary>Save</button>
						</f-col>
					</f-row>
				</f-form>
			</section>

			<section>
				<h3>Select</h3>
				
				<f-row style="margin: 8px 0;" .gutter="24">
					<f-col .span="6">
						<header>Single Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .data=${range(1, 10).map(v => [v, 'Option ' + v])} .value=${1}  />
					</f-col>

					<f-col .span="6">
						<header>Multiple Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .multiple .data=${range(1, 10).map(v => [v, 'Option ' + v])} .value=${[1, 2]} />
					</f-col>

					<f-col .span="6">
						<header>Searchable Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .searchable .data=${range(1, 10).map(v => [v, 'Option ' + v])} .value=${[1, 2]} />
					</f-col>
				</f-row>
			</section>

			<section>
				<h3>Search Field</h3>
				
				<f-row style="margin: 16px 0 16px 0;" .gutter="24">
					<f-col .span="6">
						<f-search style="width: 100%; margin-bottom: 8px;" />
					</f-col>
				</f-row>
			</section>

			<section>
				<h3>Progress Bar</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<f-progress style="width: 100%;" .value="0" />
						<f-progress style="width: 100%;" .value="0.5" />
					</f-col>
				</f-row>
			</section>

			<section>
				<h3>Slider</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<f-slider style="width: 100%;" .value="0" />
					</f-col>
				</f-row>
			</section>

			<f-loader .size="small" />
			<f-loader />
			<f-loader .size="large" />

			<!-- <section>
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
					<button><span>Dropdown</span><f-icon .type="down" /></button>
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

			<section style="height: 200px; overflow: auto; position: relative; background: ${theme.backgroundColor.darken(3)};">
				<div style="overflow: hidden; position: absolute; ">
				${liveAsyncRepeat(
					{
						//data: range(1, 1000),
						dataCount: 1000,
						dataGetter: async (start: number, count: number) => {
							await ff.sleep(500)
							return range(start, start + count - 1)
						},
						pageSize: 10,
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
						data: range(1, 50).map(n => ({id: n, value: n})),
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
				<div style="display: inline-flex; height: 120px; padding: 8px 0 10px 10px; background: ${theme.backgroundColor.highlight(5)}; line-height: 100px; font-size: 60px; text-align: center;"
					${droppable((value: number, index: number) => {
						ff.remove(leftData, value)
						ff.remove(rightData, value)

						if (index === -1) {
							leftData.push(value)
						}
						else {
							leftData.splice(index, 0, value)
						}
					})}
				>
					${repeat(leftData, (data: number, index: number) => html`
						<div style="width: 100px; margin-right: 10px;" :style.background=${theme.backgroundColor.highlight(15)} ${draggable(data, index)}>${data}</div>
					`)}
				</div>
				<br>
				<div style="display: inline-flex; height: 120px; padding: 8px 0 10px 10px; background: ${theme.backgroundColor.highlight(5)}; line-height: 100px; font-size: 60px; text-align: center;"
					${droppable((value: number, index: number) => {
						ff.remove(leftData, value)
						ff.remove(rightData, value)

						if (index === -1) {
							rightData.push(value)
						}
						else {
							rightData.splice(index, 0, value)
						}
					})}
				>
					${repeat(rightData, (data: number, index: number) => html`
						<div style="width: 100px; margin-right: 10px;" :style.background=${theme.backgroundColor.highlight(15)} ${draggable(data, index)}>${data}</div>
					`)}
				</div>
			</section>
			
			<section style="display: flex;">
				<div style="width: 120px; padding: 10px 8px 0; background: ${theme.backgroundColor.highlight(5)}; line-height: 100px; font-size: 60px; text-align: center;"
					${droppable((value: number, index: number) => {
						ff.remove(leftData, value)
						ff.remove(rightData, value)

						if (index === -1) {
							leftData.push(value)
						}
						else {
							leftData.splice(index, 0, value)
						}
					})}
				>
					${repeat(leftData, (data: number, index: number) => html`
						<div style="margin-bottom: 10px;" :style.background=${theme.backgroundColor.highlight(15)} ${draggable(data, index)}>${data}</div>
					`)}
				</div>

				<div style="width: 120px; padding: 10px 8px 0; background: ${theme.backgroundColor.highlight(5)}; line-height: 100px; font-size: 60px; text-align: center;"
					${droppable((value: number, index: number) => {
						ff.remove(leftData, value)
						ff.remove(rightData, value)

						if (index === -1) {
							rightData.push(value)
						}
						else {
							rightData.splice(index, 0, value)
						}
					})}
				>
					${repeat(rightData, (data: number, index: number) => html`
						<div style="margin-bottom: 10px;" :style.background=${theme.backgroundColor.highlight(15)} ${draggable(data, index)}>${data}</div>
					`)}
				</div>
			</section> -->
		</div>
	`}
})




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


function renderContextMenu(index: number | null) {
	return html`
		<f-menu>
			<f-menuitem>Line: ${index}</f-menuitem>
		</f-menu>
	`
}


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

	render() {
		return html`<f-select style="color: ${this.value}" />`.extends(super.render())
	}

	onReady() {
		super.onReady()

		this.on('change', (value: unknown) => {
			theme.set('mainColor', value as string)
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
		`).component as Modal
	}

	modal.show()
}

function hideModal() {
	modal.hide()
}
