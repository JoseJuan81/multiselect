# Multiselect-dl
<img src="https://travis-ci.org/JoseJuan81/multiselect.svg?branch=dev">
<img alt="GitHub" src="https://img.shields.io/github/license/josejuan81/multiselect">
<img alt="npm" src="https://img.shields.io/npm/dm/multiselect-db">

> **multiselect** is a `vue` component used to select multiple options at the same time.
> This component only has basic and general style and the users can style it the way they want, that's why this component can be used in any vue project.

## Install
```code
npm install --save multiselect-dl
```
## Global Use
in your `main.js`
```js
import Vue from 'vue';
import { install } from 'multiselect-dl';

Vue.use(install);
```
> The global way includes the `Tag` component.
## Local Use
in your `.vue` file
```js
<script>
import MultiSelect from 'multiselect-dl';
export default {
	name: 'component-name',
	components: {
		MultiSelect,
	},
}
...
</script>
```
## How to use

### Props
name | value | comments
---- | ----- | ------
clearable | boolean | hide or show the "x" red button. Clear all selected items from input.
item-divider | boolean | hide or show line to divide items in menu
menuMaxHeight | string | menu max height. Default `auto`.
minHeight | string | menu min height. Default `0.5rem`.
multiselect | boolean | If It's `true` multi selections is available but It's `false` only simple selection is available
selectAll | boolean | It works in multi selections and with `select-all-items` slot. This prop select / unselect all items in menu items 
options | array | options to show in menu items
prop | string | object's prop. This is required when you use objects and its value It has to be unique (index).
transitionName | string | The name of the `vue-transition`.
transitionMode | string | The name of the `vue-transition` mode (`out-in` / `in-out`). Default `out-in`.

### Slots
name | Description
-----| ------
tag | `slot` for item selected in the input. props = { tag }. Tag is a selected item and can be one or more.
close-icon | `slot` for icon to clear selected items
icon | `slot` for icon to activate menu
menu | `slot` for menu (menu items). props = { menuItem, selected, menuIndex }

## Multiselector
<img src="https://japi-static.s3.amazonaws.com/japi-sales-error/Captura-de-pantalla-2020-02-27-a-la%28s%29-15.14.33.png">

```html
<div>
	<h4>Multiselector</h4>
	<div class="flex justify-center">
		<MultiSelect
			clearable
			select-all
			item-divider
			multiselect
			prop="id"
			data-cy="multiselect-container"
			class="multi-select-container flex items-center justify-between"
			transition-name="vertical"
			:options="options"
			v-model="optionsSelected"
		>
			<template v-slot:tag="{ tag, removeIt }">
				<Tag @click.stop="removeIt(tag)">{{tag.name}}</Tag>
			</template>
			<template v-slot:icon>
				<div class="menu-icon">&#9757;</div>
			</template>
			<template v-slot:close-icon>
				<span  class="icon-clear">&#9747;</span>
			</template>
			<template v-slot:select-all-items="{ isSelected }">
				<div
					:class="[
						'menu-item',
						{ 'menu-item-selected': isSelected },
					]"
				>
					<div
						v-show="isSelected"
						:class="{ 'selected-icon': isSelected }"
					>&#9829;</div>
					<span class="menu-item-name">Todos</span>
				</div>
			</template>
			<template v-slot:menu="{ menuItem }">
				<div
					:class="[
						'menu-item',
						{ 'menu-item-selected': menuItem.isSelected },
					]"
				>
					<div
						v-show="menuItem.isSelected"
						:class="{ 'selected-icon': menuItem.isSelected }"
					>&#9829;</div>
					<span class="menu-item-name">{{menuItem.name}}</span>
				</div>
			</template>
		</MultiSelect>
	</div>
</div>
```
```js
import MultiSelect from './components/multiSelect.vue';
import Tag from './components/tag.vue';

function data() {
	return {
		options: [
			{ id: 1, name: 'Juan' },
			{ id: 2, name: 'Noah' },
			{ id: 3, name: 'Churry' },
			{ id: 4, name: 'Kaki' },
			{ id: 5, name: 'Pepito' },
		],
		optionsSelected: [],
	};
}
export default {
	name: 'app',
	components: {
		MultiSelect,
		Tag,
	},
	data,
};
```
```scss
body {
	margin: 0;
}
#app {
	background-color:#efecea;
	display: flex;
	flex-direction: column;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	height: 100vh;
	justify-content: space-evenly;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
h4 {
	margin: 0;
}

.flex-display {
	display: flex;
}
.items-center {
	align-items: center;
}
.justify-between {
	justify-content: space-between;
}
.justify-end {
	justify-content: flex-end;
}
.justify-center {
	justify-content: center;
}
.multi-select-container {
	background-color: white;
	border: 1px solid #ddddc7;
	border-radius: 0.5rem;
	padding: 0.5rem;
	width: 45%;

	.icon-clear {
		align-items: center;
		background-color: white;
		border: 1px solid;
		border-radius: 50%;
		color: red;
		cursor: pointer;
		display: flex;
		font-size: 13px;
		height: 13px;
		justify-content: center;
		margin-right: 5px;
		width: 13px;
	}

	.icon-clear:hover {
		background-color: red;
		border-color: red;
		color: white;
		font-weight: bold;
	}
}

.menu-item {
	border-bottom: 1px solid brown;
	display: flex;
	justify-content: center;
	padding: 0.75rem 1.25rem;
}
.menu-item:hover {
	background-color: aqua;
}
.menu-item-selected,
.selected-icon {
	color: #4dd599;
}
.vertical-enter-active, .vertical-leave-active {
  transition: opacity 250ms;
}
.vertical-enter, .vertical-leave-to {
  opacity: 0;
}
.selected-icon {
	left: 0;
	margin-left: 10px;
	position: absolute;
}
```

## Simple Selector

<img src="https://japi-static.s3.amazonaws.com/japi-sales-error/Captura-de-pantalla-2020-02-27-a-la%28s%29-18.01.16.png">

```html
<h4>Selector simple con string</h4>
<div class="flex justify-center">
	<MultiSelect
		clearable
		item-divider
		data-cy="string-simple-container"
		class="multi-select-container flex items-center justify-between"
		transition-name="vertical"
		:options="stringOptions"
		v-model="stringSelection"
	>
		<template v-slot:tag="{ tag }">
			<span>{{tag}}</span>
		</template>
		<template v-slot:icon>
			<div class="menu-icon">&#9757;</div>
		</template>
		<template v-slot:close-icon>
			<span  class="icon-clear">&#9747;</span>
		</template>
		<template v-slot:menu="{ menuItem, selected }">
			<div
				:class="[
					'menu-item',
					{ 'menu-item-selected': selected },
				]"
			>
				<div
					v-show="selected"
					:class="{ 'selected-icon': selected }"
				>&#9829;</div>
				<span class="menu-item-name">{{menuItem}}</span>
			</div>
		</template>
	</MultiSelect>
</div>
```
```js
import MultiSelect from './components/multiSelect.vue';
import Tag from './components/tag.vue';

function data() {
	return {
		stringOptions: ['Rojo', 'Azul', 'Verde', 'Morado', 'Blanco', 'Negro', 'Amarillo'],
		stringSelection: '',
	};
}

export default {
	name: 'app',
	components: {
		MultiSelect,
		Tag,
	},
	data,
};
```