// import {css, define, Component, html, render} from "flit"
// import {Popup} from "./popup"
// import {theme} from "./theme"


// @define('f-menu')
// export class Menu extends Popup {

// 	static style() {
// 		return css`
// 		:host{
// 			display: inline-flex;
// 			position: relative;
// 			cursor: pointer;

// 			&:hover, &.opened{
// 				color: $main-color;
// 			}

// 			&:hover, &.opened{
// 				button{
// 					border-color: $main-color;
// 				}
// 			}

// 			.icon-down{
// 				margin-right: 0;
// 			}

// 			button .icon-down{
// 				margin-right: -6px;
// 			}
// 		}

// 	`}

// 	static properties = ['selectable', 'dir-selectable']

// 	alignPosition: string = 'b'

// 	render() {
// 		return html`
// 		<template class="dropdown" :class.opened=${this.opened}>
// 			<slot></slot>
// 			<icon :type="icon" f-if="icon"></icon>
// 			<layer class="menu-layer dropdown-layer" :open="open" f-ref="layer">
// 				<slot name="menu" f-ref="menu" class="dropdown-menu"></slot>
// 			</layer>
// 		</dropdown>
// 	`}
// }