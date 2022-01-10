import * as ff from '@pucelle/ff'
import * as flit from '@pucelle/flit'
import * as flitUI from '../src'
import {html, Component, define, repeat, observe, getComponent, getRenderedAsComponent, render, getComponentAsync} from '@pucelle/flit'
import {dialog, notification, theme, Store, draggable, droppable, popup, tooltip, Modal, TableColumn, Select, RemoteStore, Popover, Form, Input} from '../src/index'


declare global {
    interface Window {
		ff: typeof ff
		flit: typeof flit
		flitUI: typeof flitUI
	}
}


window.ff = ff
window.flit = flit
window.flitUI = flitUI


define('flit-preview', class extends Component {

	checkboxValue: string[] = ['2']
	checkboxInterminated = true
	switch1On = true
	switch2On = false
	tagClosed = false
	leftData = observe([1, 2, 3])
	rightData = observe([4, 5, 6])

	refComponents: {
		form: Form
	}

	render() {
		let {lineHeight} = theme

		return html`
		<div class="wrapper">
			<section class="theme">
				<h2>Theme</h2>

				<f-row style="margin: 8px 0;">
					<f-col .span="4">Mode</f-col>
					<f-col .span="20">
						<f-radiogroup .value="light" @@change=${(name: string) => theme.assignTheme(name)}>
							<f-radio .value="light" style="margin-right: 20px;">Light</f-radio>
							<f-radio .value="dark" style="margin-right: 20px;">Dark</f-radio>
						</f-radiogroup>
					</f-col>
				</f-row>

				<f-row style="margin: 8px 0;">
					<f-col .span="4">Size</f-col>
					<f-col .span="20">
						<f-radiogroup .value="medium" @@change=${(name: string) => theme.assignTheme(name)}>
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
							<f-icon .type="tips" :tooltip="Tips to show guide" />
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
				<f-row style="margin: 8px 0;" .gutter="24">
					<f-col .span="6">
						<h3>Checkboxes</h3>
						<f-checkboxgroup .value=${this.checkboxValue}>
							<f-checkbox .value="1">${this.checkboxValue.includes('1') ? 'Checked' : 'Unchecked'}</f-checkbox><br>
							<f-checkbox .value="2">${this.checkboxValue.includes('2') ? 'Checked' : 'Unchecked'}</f-checkbox><br>
							<f-checkbox .value="3" .indeterminate=${this.checkboxInterminated} @@change=${() => this.checkboxInterminated = false}>${
								this.checkboxInterminated ? 'Indeterminate' : this.checkboxValue.includes('3') ? 'Checked' : 'Unchecked'
							}</f-checkbox><br>
						</f-checkboxgroup>
					</f-col>

					<f-col .span="6">
						<h3>Radios</h3>
						<f-radiogroup .value="1">
							<f-radio .value="1">Radio 1</f-radio><br>
							<f-radio .value="2">Radio 2</f-radio><br>
						</f-radiogroup>
					</f-col>

					<f-col .span="6">
						<h3>Switchs</h3>
						<f-switch style="margin-right: 8px;" :model="switch1On" />Switch 1 ${this.switch1On ? 'On' : 'Off'}<br>
						<f-switch style="margin-right: 8px;" :model="switch2On" />Switch 2 ${this.switch2On ? 'On' : 'Off'}<br>
					</f-col>

					<f-col .span="6">
						<h3>Tags</h3>
						<f-tag>Normal Tag</f-tag><br>
						<f-tag .closable :hide=${this.tagClosed} @@close=${() => this.tagClosed = true}>Closable Tag</f-tag><br>
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Inputs</h3>

				<f-row style="margin: 8px 0 16px 0;" .gutter="24">
					<f-col .span="6">
						<label>Text Input</label><br>
						<f-input .type="text" style="width: 100%;" />
					</f-col>
					<f-col .span="6">
						<label>With Placeholder</label><br>
						<f-input .type="text" style="width: 100%;" .placeholder="With Placeholder" />
					</f-col>
					</f-col>
				</f-row>

				<f-row style="margin: 8px 0 16px 0;" .gutter="24">
					<f-col .span="6">
						<label>Valid Input</label><br>
						<f-input .type="text" style="width: 100%;" .touched .valid=${true} .placeholder="Valid Input" />
					</f-col>
					<f-col .span="6">
						<label>Invalid Input</label><br>
						<f-input .type="text" style="width: 100%;" .touched .valid=${false} .placeholder="Invalid Input" .error="Error Message" />
					</f-col>
					<f-col .span="6">
						<label>Error message in tooltip</label><br>
						<f-input .type="text" style="width: 100%;" .errorInTooltip .touched .valid=${false} .placeholder="Invalid Input" .error="Error Message" />
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Form</h3>

				<f-form :refComponent="form">
					<f-row style="margin: 8px 0 24px 0;" .gutter="24">
						<f-col .span="12">
							<label required>Name</label><br>
							<f-input style="width: 100%;" .validator=${(value: string) => {
								if (value.length === 0) {
									return `The name field is required!`
								}
								else if (value.length < 10) {
									return `The name field should have at least 10 characters!`
								}
							}} />
						</f-col>
					</f-row>

					<f-row style="margin: 8px 0;" .gutter="24">
						<f-col .span="6">
							<label>Country</label><br>
							<f-select style="width: 100%;" .searchable .data=${[{value: '1', text: 'Country 1'}, {value: '2', text: 'Country 2'}]} />
						</f-col>

						<f-col .span="6">
							<label>City</label><br>
							<f-select style="width: 100%;" .searchable .data=${[{value: '1', text: 'City 1'}, {value: '2', text: 'City 2'}]} />
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
							<button primary @click=${() => this.refComponents.form.validate()}>Save</button>
						</f-col>
					</f-row>
				</f-form>
			</section>


			<section>
				<h3>Selects</h3>
				
				<f-row style="margin: 8px 0;" .gutter="24">
					<f-col .span="6">
						<header>Single Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .data=${range(1, 11).map(value => ({value, text: 'Option ' + value}))} .value=${1}  />
					</f-col>

					<f-col .span="6">
						<header>Multiple Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .multipleSelect .data=${range(1, 11).map(value => ({value, text: 'Option ' + value}))} .value=${[1, 2]} />
					</f-col>

					<f-col .span="6">
						<header>Searchable Select</header>
						<f-select style="width: 100%; margin: 8px 0;" .searchable .data=${range(1, 11).map(value => ({value, text: 'Option ' + value}))} .value=${1} />
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
				<h3>Progress Bars</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<f-progress style="width: 100%;" .value="0" />
						<f-progress style="width: 100%;" .value="0.5" />
						<f-progress style="width: 100%;" .value="1" />
					</f-col>
				</f-row>
			</section>

			<section>
				<h3>Sliders</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<f-slider style="width: 100%;" .value="0" />
						<f-slider style="height: 100px; margin-top: 20px;" .value="50" .vertical />
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Loaders</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="4">
						<header style="margin-bottom: 8px;">Small</header>
						<f-loader .size="small" .speed="0.7" />
					</f-col>

					<f-col .span="4">
						<header style="margin-bottom: 8px;">Medium</header>
						<f-loader .size="medium" .speed="0.6" />
					</f-col>

					<f-col .span="4">
						<header style="margin-bottom: 8px;">Large</header>
						<f-loader .size="large" .speed="0.5" />
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Lists</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Selection type</header>
						<f-list .data=${range(1, 6).map(value => ({value, text: 'Option ' + value}))} />
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Single Selection</header>
						<f-list .data=${range(1, 6).map(value => ({value, text: 'Option ' + value}))} .selectable .selected=${[2]} />
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Multiple Selection</header>
						<f-list .data=${range(1, 6).map(value => ({value, text: 'Option ' + value}))} .selectable .multipleSelect .selected=${[1, 2]} />
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Navigation Type</header>
						<f-list .data=${range(1, 6).map(value => ({value, text: 'Option ' + value}))} .type="navigation" .active=${1} />
					</f-col>
				</f-row>

				<f-row style="margin: 32px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Icon</header>
						<f-list .data=${range(1, 6).map(value => ({value, text: 'Option ' + value, icon: 'love'}))} />
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Subsection</header>
						<f-list .type="navigation" .data=${[
							{value: 1, text: 'User A', children:
								[
									{value: 11, text: 'Folder 1', children: [
										{value: 111, text: 'Item 1'},
										{value: 112, text: 'Item 2'},
									]},
									{value: 12, text: 'Folder 2', children: [
										{value: 121, text: 'Item 1'},
										{value: 122, text: 'Item 2'},
									]}
								]
							},
							{value: 2, text: 'User B', opened: true, children:
								[
									{value: 21, text: 'Folder 1', children: [
										{value: 211, text: 'Item 1'},
										{value: 212, text: 'Item 2'},
									]},
									{value: 22, text: 'Folder 2', children: [
										{value: 221, text: 'Item 1'},
										{value: 222, text: 'Item 2'},
									]}
								]
							},
						]} />
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Navigations</h3>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<f-navigation
							.active=${111}
							.title="Navigation Menu"
							.data=${[
								{value: 1, text: 'User A', children:
									[
										{value: 11, text: 'Folder 1', children: [
											{value: 111, text: 'Item 1'},
											{value: 112, text: 'Item 2'},
										]},
										{value: 12, text: 'Folder 2', children: [
											{value: 121, text: 'Item 1'},
											{value: 122, text: 'Item 2'},
										]}
									]
								},
								{value: 2, text: 'User B', opened: true, children:
									[
										{value: 21, text: 'Folder 1', children: [
											{value: 211, text: 'Item 1'},
											{value: 212, text: 'Item 2'},
										]},
										{value: 22, text: 'Folder 2', children: [
											{value: 221, text: 'Item 1'},
											{value: 222, text: 'Item 2'},
										]}
									]
								},
							]}
						/>
					</f-col>

				</f-row>

			</section>


			<section>
				<h3>Popovers</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Default</header>
						<button ${
							popup(
								() => html`
								<f-popover .title="Popover title">
									This is Popover content.
								</f-popover>
								`,
								{trigger: 'click'}
							)
						}>Click to Open Popover</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Close Button</header>
						<button ${
							popup(
								() => html`
								<f-popover .title="Popover title" .closable>
									This is Popover content.
								</f-popover>
								`,
								{trigger: 'click'}
							)
						}>Click to Open Popover</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">No Title</header>
						<button ${
							popup(
								() => html`
								<f-popover>
									This is Popover content.
								</f-popover>
								`,
								{trigger: 'click'}
							)
						}>Click to Open Popover</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With actions</header>
						<button ${
							popup(
								() => html`
								<f-popover
									:ref="popupWithActions"
									.title="Popover title" 
								>
									This is Popover content.
									<button :slot="action" @click=${() => (getComponent(this.refElements.popupWithActions as HTMLElement) as Popover).close()}>Cancel</button>
									<button :slot="action" primary @click=${() => (getComponent(this.refElements.popupWithActions as HTMLElement) as Popover).close()}>Save</button>
								</f-popover>
								`,
								{trigger: 'click'}
							)
						}>Click to Open Popover</button>
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Menus</h3>
				
				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<button ${
							popup(
								() => html`
								<f-menu>
									<f-list .data=${range(1, 6).map(value => ({value, text: 'Option ' + value}))} />
								</f-menu>
								`,
								{trigger: 'click'}
							)
						}>
							<span>Click to Open Menu</span>
							<f-icon .type="down" />
						</button>
					</f-col>

					<f-col .span="6">
						<button ${
							popup(
								() => html`
								<f-menu .title="Menu title">
									<f-list .data=${range(1, 6).map(value => ({value, text: 'Option ' + value}))} .selectable .selected=${[1]} />
								</f-menu>
								`,
								{trigger: 'click'}
							)
						}>
							<span>Menu with Title</span>
							<f-icon .type="down" />
						</button>
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Tooltips</h3>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Default</header>
						<button ${
							tooltip('Tooltip text', {type: 'default'})
						}>Hover for Tooltip</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Prompt</header>
						<button ${
							tooltip('Add some items to your list by clicking this button.', {type: 'prompt'})
						}>Add Items</button>
					</f-col>
				</f-row>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Error</header>
						<button primary disabled ${
							tooltip('You can\'t submit, try resolve all mistakes then this tooltip will disappear.', {type: 'error'})
						}>Submit</button>
					</f-col>
				</f-row>
			</section>


			<section>
				<h3>Notifications</h3>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Info</header>
						<button @click=${
							() => notification.info('Info notification content', {title: 'Info Notification'})
						}>
							Show Info Notification
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Warn</header>
						<button @click=${
							() => notification.warn('Warning notification content', {title: 'Warning Notification'})
						}>
							Show Warn Notification
						</button>
					</f-col>
					
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Error</header>
						<button @click=${
							() => notification.error('Error notification content', {title: 'Error Notification'})
						}>
							Show Error Notification
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Success</header>
						<button @click=${
							() => notification.success('Success notification content', {title: 'Success Notification'})
						}>
							Show Success Notification
						</button>
					</f-col>
				</f-row>

				<f-row style="margin: 32px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Without Title</header>
						<button @click=${
							() => notification.success('Success notification content', {
								title: 'Success Notification',
							})
						}>
							Show Notification with title
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With List</header>
						<button @click=${
							() => notification.warn('Warning notification content', {
								title: 'Warning Notification',
								list: ['List Item 1', 'List Item 2']
							})
						}>
							Show Notification with List
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Actions</header>
						<button @click=${
							() => notification.error('Error notification content', {
								title: 'Error Notification',
								actions: [{text: 'Try Again'}]
							})
						}>
							Show Notification with Actions
						</button>
					</f-col>

				</f-row>
			</section>


			<section>
				<h3>Dialogs</h3>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Default</header>
						<button @click=${
							() => dialog.show('This is dialog message.')
						}>
							Open Default Dialog
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Title</header>
						<button @click=${
							() => dialog.show('This is dialog message.', {title: 'Dialog Title'})
						}>
							Open Dialog with Title
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Confirm</header>
						<button @click=${
							() => dialog.confirm('Are you sure you want to delete these items?', {title: 'Dialog Title'})
						}>
							Open Confirm Dialog
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">Prompt</header>
						<button @click=${
							() => dialog.prompt('Please input the name of your account:', {
								title: 'Dialog Title',
								placeholder: 'Name of your account',
								validator: (value: string) => {if (!value) {return 'Name is required'} else {return null}}
							})
						}>
							Open Prompt Dialog
						</button>
					</f-col>
				</f-row>
				
				<f-row style="margin: 32px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Third action</header>
						<button @click=${
							() => dialog.confirm('You have unsaved data, are you sure you want to save your changes?', {
								title: 'Dialog Title',
								actions: [
									{text: 'Don\'t Save', third: true},
									{text: 'Cancel'},
									{text: 'Save', primary: true},
								]
							})
						}>
							Open Dialog with Third Action
						</button>
					</f-col>
					
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Customize</header>
						<button @click=${
							() => {
								let input: Input

								dialog.show(
									html`
										Please input the name of your account:
										<f-input style="margin-top: 8px; width: 100%;"
											.placeholder="Name of your account"
											.validator=${(v: string) => v ? '' : 'Name field is required'}
											.errorInTooltip
											:ref=${async (el: HTMLElement) => input = await getComponentAsync(el) as Input}
										/>
										<f-checkbox .checked style="margin-top: 8px;">Remember Me</f-checkbox>
									`,
									{
										title: 'Dialog Title',
										interruptAction: () => !input.valid
									}
								)
							}
						}>
							Open Custom Dialog
						</button>
					</f-col>
				</f-row>

			</section>


			<section>
				<h3>Modals</h3>

				<f-row style="margin: 16px 0 8px 0;" .gutter="24">
					<f-col .span="6">
						<header style="margin-bottom: 8px;">Default</header>

						<button @click="${() => {
							let modal = getRenderedAsComponent(render(html`
								<f-modal style="width: ${theme.adjust(360)}px;" .title="Modal Title">
									This is modal content
								</f-modal>
							`)) as Modal

							modal.show()
						}}">
							Open Modal
						</button>
					</f-col>

					<f-col .span="6">
						<header style="margin-bottom: 8px;">With Actions</header>

						<button @click="${() => {
							let modal = getRenderedAsComponent(render(html`
								<f-modal style="width: ${theme.adjust(360)}px;" .title="Modal Title">
									This is modal content
									<button :slot="action" @click=${() => modal.hide()}>Cancel</button>
									<button :slot="action" primary @click=${() => modal.hide()}>Save</button>
								</f-modal>
							`)) as Modal

							modal.show()
						}}">
							Open Modal with Actions
						</button>
					</f-col>
				</f-row>

			</section>


			<section>
				<h3>Table</h3>

				<f-table
					.resizable
					.store=${new Store({
						data: range(1, 101).map(n => ({id: n, value: Math.round(Math.random() * 100)})),
						key: 'id',
					})}
					.columns=${[
						{
							title: 'Index',
							render: (_item: {id: number, value: number}, index: number) => {
								return index
							},
						},
						{
							title: 'ID',
							orderBy: 'id',
							render: (item) => item.id,
						},
						{
							title: 'Name',
							render: (item) => `Name ${item.id}`,
						},
						{
							title: 'Random Value',
							orderBy: 'value',
							render: (item) => item.value,
							align: 'right',
						}
					] as TableColumn[]}
				/>
			</section>

			
			<section>
				<h3>Table in Live Rendering Mode</h3>

				<f-table
					style="height: 204px;"
					.resizable
					.live
					.renderCount="20"
					.store=${new Store({
						data: range(1, 1001).map(n => ({id: n, value: Math.round(Math.random() * 100)})),
						key: 'id',
					})}
					.columns=${[
						{
							title: 'Index',
							render: (_item: {id: number, value: number}, index: number) => {
								return index
							},
						},
						{
							title: 'ID',
							orderBy: 'id',
							render: (item) => item.id,
						},
						{
							title: 'Name',
							render: (item) => `Name ${item.id}`,
						},
						{
							title: 'Random Value',
							orderBy: 'value',
							render: (item) => item.value,
							align: 'right',
						}
					] as TableColumn[]}
				/>
			</section>

			
			<section>
				<h3>Table with Remote Data</h3>

				<f-table
					.resizable
					.renderCount="20"
					.store=${new ExampleRemoteStore()}
					.columns=${[
						{
							title: 'Index',
							render: (_item: {id: number, value: number}, index: number) => {
								return index
							},
						},
						{
							title: 'ID',
							orderBy: 'id',
							render: (item) => item?.id ?? '--',
						},
						{
							title: 'Name',
							render: (item) => item ? `Name ${item.id}` : '--',
						},
						{
							title: 'Random Value',
							orderBy: 'value',
							render: (item) => item?.value ?? '--',
							align: 'right',
						}
					] as TableColumn[]}
				/>
			</section>


			<section>
				<h3>Drag & Drop</h3>

				<div style="display: inline-flex; padding: 4px; background: ${theme.backgroundColor.toMiddle(5)}; line-height: 100px; font-size: 60px; text-align: center; height: 116px;"
					${droppable((value: number, index: number) => {
						ff.remove(this.leftData, value)
						ff.remove(this.rightData, value)

						if (index === -1) {
							this.leftData.push(value)
						}
						else {
							this.leftData.splice(index, 0, value)
						}
					})}
				>
					${repeat(this.leftData, (data: number, index: number) => html`
						<div style="width: 100px; margin: 4px;"
							:style.background=${theme.backgroundColor.toMiddle(15).toString()}
							${draggable(data, index)}
						>${data}</div>
					`)}
				</div>
				<br>

				<div style="display: inline-flex; padding: 4px; margin-top: -8px; background: ${theme.backgroundColor.toMiddle(5)}; line-height: 100px; font-size: 60px; text-align: center; height: 116px;"
					${droppable((value: number, index: number) => {
						ff.remove(this.leftData, value)
						ff.remove(this.rightData, value)

						if (index === -1) {
							this.rightData.push(value)
						}
						else {
							this.rightData.splice(index, 0, value)
						}
					})}
				>
					${repeat(this.rightData, (data: number, index: number) => html`
						<div style="width: 100px; margin: 4px;"
							:style.background=${theme.backgroundColor.toMiddle(15).toString()}
							${draggable(data, index)}
						>${data}</div>
					`)}
				</div>
			</section>


			<section>
				<h3>Resizer</h3>

				<div style="position: relative; display: inline-flex; justify-content: center; line-height: 100px; font-size: 14px; text-align: center; width: 200px; height: 100px;"
					:style.background=${theme.backgroundColor.toMiddle(5).toString()}
				>
					Resizer on the Right
					<f-resizer .position="right" .min=${200} .max=${600} style="background: ${theme.backgroundColor.toMiddle(15)}"></f-resizer>
				</div>
				<br>
			</section>

		</div>
	`}
})



define('f-main-color-select', class extends Select<string> {

	value = '#3a6cf6'

	data = [
		{value: '#3a6cf6', text: html`<div style="color: #3a6cf6;">Blue</div>`},
		{value: '#48c7c7', text: html`<div style="color: #48c7c7;">Cyan</div>`},
		{value: '#0077cf', text: html`<div style="color: #0077cf;">Darkblue</div>`},
		{value: '#4eb2ea', text: html`<div style="color: #4eb2ea;">Skyblue</div>`},
		{value: '#be66cc', text: html`<div style="color: #be66cc;">Purple</div>`},
		{value: '#ff6666', text: html`<div style="color: #ff6666;">Red</div>`},
		{value: '#ff8095', text: html`<div style="color: #ff8095;">Pink</div>`},
		{value: '#d65c5c', text: html`<div style="color: #d65c5c;">Brown</div>`},
		{value: '#f67d51', text: html`<div style="color: #f67d51;">Orange</div>`},
		{value: '#15af78', text: html`<div style="color: #15af78;">Green</div>`},
		{value: '#888888', text: html`<div style="color: #888888;">Grey</div>`},
		{value: '#000000', text: html`<div style="color: #000000;">Black</div>`},
	]

	onReady() {
		super.onReady()

		this.on('change', (value: string | string[]) => {
			theme.set('mainColor', String(value))
		})
	}
})


function range(start: number, end: number) {
	let data: number[] = []
	for (let i = start; i < end; i++) {
		data.push(i)
	}
	return data
}


class ExampleRemoteStore extends RemoteStore {

	protected key = 'id'
	
	constructor() {
		super({
			pageSize: 20,
			preloadPageCount: 0,
		})
	}

	protected dataCount() {
		return 1000
	}

	async dataGetter(start: number, end: number) {
		await ff.sleep(500)
		return range(start, end).map(v => ({id: v + 1, value: Math.round(Math.random() * 100)}))
	}
}