// import {define, Component, html, css} from 'flit'
// import {theme} from './theme'


// @define('f-radio')
// export class Radio extends Component {

// 	static properties = ['checked']

// 	static style() {
// 		let {mainColor} = theme

// 		return css`
// 			f-radio{
// 				display: inline-flex;
// 				vertical-align: top;
// 				align-items: center;
// 				cursor: pointer;
// 			}

// 			f-icon{
// 				margin-right: 6px;
// 			}
		
// 			label{
// 				flex: 1;
// 				white-space: nowrap;
// 				overflow: hidden;
// 				text-overflow: ellipsis;
// 			}
		
// 			f-radio:hover, .radio-checked{
// 				color: ${mainColor};
// 			}
// 		`
// 	}

// 	checked: boolean = false
// 	radioGroup: RadioGroup | null = null

// 	// Used to compare with `RadioGroup.value`
// 	value: any = null

// 	render() {
// 		return html`
// 			<radio class="radio" :class.radio-checked="checked" @click.stop="onClick">
// 				<icon :prop.type=${this.checked ? 'radio-checked' : 'radio-unchecked'}></icon>
// 				<label>
// 					<slot></slot>
// 				</label>
// 		`
// 	}

// 	onCreated () {
// 		this.watchImmediately('checked', (value) => {
// 			this.el.classList.toggle('radio-checked__f-radio')
// 		})

// 		let groupEl = this.el.closest('f-radio-group') as HTMLElement
// 		if (groupEl) {
// 			this.radioGroup = Component.get(groupEl) as RadioGroup
// 			this.checked = this.radioGroup.value == this.value
// 			this.radioGroup.register(this)
// 		}
// 	}

// 	onClick () {
// 		// if (e.defaultPrevented) {
// 		// 	return
// 		// }

// 		// var newChecked = this.checked = !this.checked

// 		// if (newChecked) {
// 		// 	this.emit('change', true)
// 		// }
// 	}
// }


// @define('f-radio-group')
// export class RadioGroup extends Component {
// 	value: any = null

// 	template: `
// 		<radio-group class="radio-group">
// 			<slot></slot>
// 		</radio-group>
// 	`

// 	onCreated () {
// 		this.radios = []
// 	}


// 	register (radio: Radio) {
// 		this.radios.push(radio)
// 		radio.on('change', this.onRadioChange.bind(this, radio))
// 	}


// 	onRadioChange (changedRadio) {
// 		for (let radio of this.radios) {
// 			if (radio !== changedRadio) {
// 				radio.checked = false
// 			}
// 		}

// 		this.value = changedRadio.value
// 		this.emit('change', this.value)
// 	}
// }
