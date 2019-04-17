// import {css, define, html, on, renderInContext, renderComplete} from "flit"
// import {theme} from "./theme"
// import {Popup} from "./popup"


// @define('f-select')
// class Select extends Popup {
	
// 	static style = () => {
// 		let {mainColor, lineHeight, textColor} = theme

// 		return css`
// 		:host{
// 			display: inline-flex;
// 			vertical-align: top;
// 			border: 1px solid ${textColor.lighten(20)};
// 			height: ${lineHeight}px;
// 			line-height: ${lineHeight - 2}px;
// 			justify-content: space-between;
// 			align-items: center;

// 			&:hover, &.open{
// 				border-color: $main-color;
// 			}

// 			&:focus{
// 				box-shadow: 0 0 3px ${mainColor};
// 			}
// 		}

// 		.inputable{
// 			border: none;
// 			line-height: ${lineHeight}px;
// 			border-bottom: 1px solid grey;
// 			background: #e5e5e5;
// 		}
	
// 		.icon{
// 			margin-left: auto;
// 			margin-right: 4px;
// 		}
	
// 		.input{
// 			flex: 1;
// 			min-width: 0;
// 			padding: 0 0 0 8px;
// 			height: 30px;
// 			border: none;
// 			background: transparent;
// 		}
	
// 		.display{
// 			flex: 1;
// 			min-width: 0;
// 			padding: 0 0 0 8px;
// 			white-space: nowrap;
// 			overflow: hidden;
// 			text-overflow: ellipsis;
// 			cursor: pointer;
// 		}
	
// 		.layer{
// 			border-radius: 0;
// 			filter: none;
// 			box-shadow: 0 2px 10px rgba(#000, 0.2);
// 		}
	
// 		.list{
// 			overflow-y: auto;
// 			max-height: 100%;
// 		}

// 		.item{
// 			display: flex;
// 			padding: 0 8px;
// 			cursor: pointer;
			
// 			&:hover{
// 				color: $main-color;
// 				background: $main-color-opacity-5;
// 			}
// 		}

// 		.text{
// 			min-width: 0;
// 		}

// 		.icon-selected{
// 			margin-right: -4px;
// 		}
// 	`}

// 	template: `
// 		<picker class="picker" :class.open="open">
// 			<input type="text" class="picker-input" f-if="suggest" f-show="editing" f-model="suggestedValue" @input="onInput" @blur="onBlur" @keydown.enter="onKeyEnter" f-ref="input">
// 			<div class="picker-display" f-show="!editing">
// 				<slot>{{getCurrentDisplay()}}</slot>
// 			</div>
// 			<icon :type="icon" f-if="icon" f-hide="editing"></icon>

// 			<layer class="picker-layer" :open="open" :class="layerClass" trangle="false" f-ref="layer">
// 				<ul class="menu picker-menu" :class="menuClass">
// 					<li f-for="key, item in getFilteredOptions()"
// 						:class.active="isSelected(item, key)"
// 						@click="select(item, key)"
// 					>
// 						<span>{{getDisplay(item, key)}}</span>
// 						<icon type="selected" f-if="isSelected(item, key)"></icon>
// 					</li>
// 				</ul>
// 			</layer>
// 		</picker>
// 	`,
	
// 	icon: 'down',

// 	event: 'click',

// 	margin: '0',

// 	key: '',

// 	display: '',

// 	value: null,

// 	options: null,

// 	suggest: false,

// 	suggestedValue: '',

// 	layerClass: '',

// 	menuClass: '',


// 	//inner properties
// 	editing: false,

// 	onReady () {
// 		if (this.suggest) {
// 			this.el.on('click', this.onClickEl, this)

// 			this.watch('open', (value) => {
// 				if (!value) {
// 					this.cancelEditing()
// 				}
// 			})
// 		}
// 	},


// 	onClickEl (e) {
// 		this.editing = true
// 		this.suggestedValue = ''

// 		FF.nextTick(() => {
// 			this.refs.input.focus()
// 		})
// 	},


// 	cancelEditing () {
// 		this.editing = false
// 	},


// 	getKey (item, key) {
// 		let {options} = this
// 		let prop = this.key

// 		if (typeof prop === 'function') {
// 			return prop(item, key)
// 		}
// 		else if (prop) {
// 			return item[prop]
// 		}
// 		else if (Array.isArray(options)) {
// 			return item
// 		}
// 		else {
// 			return key
// 		}
// 	},


// 	getDisplay (item, key) {
// 		let prop = this.display
// 		let display

// 		if (typeof prop === 'function') {
// 			return prop(item, key)
// 		}
// 		else if (prop) {
// 			display = item[prop]
// 		}
// 		else {
// 			display = item
// 		}

// 		return display
// 	},


// 	getCurrentDisplay () {
// 		let value = this.value
// 		let item = this.getItemFromValue(value)
// 		let display

// 		if (item) {
// 			display = this.getDisplay(item, value)
// 		}
// 		else {
// 			display = ''
// 		}

// 		return display
// 	},


// 	getItemFromValue (value) {
// 		let {options} = this
// 		let item

// 		if (Array.isArray(options)) {
// 			item = options.find((item, key) => {
// 				return this.getKey(item, key) == value
// 			})
// 		}
// 		else {
// 			for (let key in options) {
// 				if (this.getKey(options[key], key) == value) {
// 					item = options[key]
// 					break
// 				}
// 			}
// 		}

// 		return item
// 	},


// 	getFilteredOptions () {
// 		let {options} = this

// 		if (this.suggest && this.suggestedValue) {
// 			let lowerSearch = this.suggestedValue.toLowerCase()

// 			return this.filter(options, (item, key) => {
// 				return this.isMatchSuggestedValue(item, key, lowerSearch)
// 			})
// 		}
// 		else {
// 			return options
// 		}
// 	},


// 	isMatchSuggestedValue (item, key, lowerSearch) {
// 		return String(this.getDisplay(item, key)).toLowerCase().includes(lowerSearch)
// 	},


// 	filter (value, fn) {
// 		if (Array.isArray(value)) {
// 			return value.filter(fn)
// 		}
// 		else {
// 			let filterred = {}

// 			for (let key in value) {
// 				if (fn(value[key], key)) {
// 					filterred[key] = value[key]
// 				}
// 			}

// 			return filterred
// 		}
// 	},


// 	isSelected (item, key) {
// 		return this.getKey(item, key) == this.value
// 	},


// 	select (item, key) {
// 		this.hideLayer()

// 		let value = this.getKey(item, key)
// 		if (value !== this.value) {
// 			this.value = value
// 			this.editing = false
// 			this.emit('change', value)
// 		}

// 		this.emit('select', value)
// 	},


// 	showLayer () {
// 		let {el} = this
// 		let {layer} = this.refs

// 		if (!this.open) {
// 			layer.el.setCSS('min-width', el.offsetWidth)
// 		}

// 		if (this.refs.input) {
// 			this.refs.input.focus()
// 		}
		
// 		super.showLayer()
// 	},


// 	onInput () {
// 		this.showLayer()
// 	},


// 	onBlur () {
// 		this.editing = false
// 	},


// 	onKeyEnter () {},
// })



// FF.registerComponent('multi-picker', 'picker', {

// 	template: `
// 		<multi-picker class="picker multi-picker" :class.open="open">
// 			<input type="text" class="picker-input" f-if="suggest" f-model="suggestedValue" @input="onInput" @keydown.enter="onKeyEnter" f-ref="input">
// 			<div class="picker-display" f-else>
// 				<slot>{{getCurrentDisplay()}}</slot>
// 			</div>
// 			<icon :type="icon" f-if="icon"></icon>

// 			<layer class="picker-layer multi-picker-layer" :open="open" :class="layerClass" trangle="false" f-ref="layer">
// 				<ul class="menu picker-menu multi-picker-menu" :class="menuClass" f-ref="menu">
// 					<li f-for="key, item in getFilteredOptions()"
// 						:class.active="isSelected(item, key)"
// 						@click="toggleSelect(item, key)"
// 					>
// 						<span>{{getDisplay(item, key)}}</span>
// 						<icon type="selected" f-if="isSelected(item, key)"></icon>
// 					</li>
// 				</ul>
// 			</div>
// 		</multi-picker>
// 	`,

// 	//if is true, items in value will be sorted
// 	order: false,


// 	onCreated () {
// 		if (!this.value) {
// 			this.value = []
// 		}
// 	},


// 	getCurrentDisplay () {
// 		let displays = this.value.map((value) => {
// 			let item = this.getItemFromValue(value)
// 			let display = this.getDisplay(item, value)

// 			return display
// 		})

// 		return displays.join('; ')
// 	},


// 	isSelected (item, key) {
// 		let {value} = this
// 		let valueItem = this.getKey(item, key)
// 		let valueIndex = value.findIndex(v => v == valueItem)

// 		return valueIndex > -1
// 	},


// 	toggleSelect (item, key) {
// 		let {value, options} = this
// 		let valueItem = this.getKey(item, key)

// 		if (this.isSelected(item, key)) {
// 			value.removeWhere(v => v == valueItem)
// 		}
// 		else {
// 			value.push(valueItem)

// 			if (this.order) {
// 				value.orderBy(value => this.getIndexByValue(value))
// 			}
// 		}
		
// 		this.emit('change', this.value)
// 	},


// 	getIndexByValue (value) {
// 		let {options} = this
// 		let index = -1

// 		if (Array.isArray(options)) {
// 			index = options.findIndex((item, key) => {
// 				return this.getKey(item, key) == value
// 			})
// 		}
// 		else {
// 			for (let key in options) {
// 				index++
// 				if (this.getKey(options[key], key) == value) {
// 					break
// 				}
// 			}
// 		}

// 		return index
// 	},
// })
