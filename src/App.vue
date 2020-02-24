<template>
	<div id="app">
		<div>
			<h4>Multiselector de objetos</h4>
			<div class="flex justify-center">
				<MultiSelect
					clearable
					item-divider
					select-all
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
		<div>
			<h4>Selector simple de objetos</h4>
			<div class="flex justify-center">
				<MultiSelect
					clearable
					item-divider
					prop="id"
					data-cy="simple-multiselect-container"
					class="multi-select-container flex items-center justify-between"
					transition-name="vertical"
					:options="options"
					v-model="oneSelection"
				>
					<template v-slot:tag="{ tag }">
						<span>{{tag.name}}</span>
					</template>
					<template v-slot:icon>
						<div class="menu-icon">&#9757;</div>
					</template>
					<template v-slot:close-icon>
						<span  class="icon-clear">&#9747;</span>
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
		<div>
			<h4>Selector simple con string</h4>
			<div class="flex justify-center">
				<MultiSelect
					clearable
					item-divider
					data-cy="string-simple-multiselect-container"
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
		</div>
	</div>
</template>

<script>
import MultiSelect from './components/multiSelect.vue';
import Tag from './components/tag.vue';

function data() {
	return {
		oneSelection: null,
		options: [
			{ id: 1, name: 'Juan' },
			{ id: 2, name: 'Noah' },
			{ id: 3, name: 'Churry' },
			{ id: 4, name: 'Kaki' },
			{ id: 5, name: 'Pepito' },
		],
		optionsSelected: [],
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
</script>

<style lang="scss">
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

.flex {
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

	.multi-select-menu {
		background-color: white;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
		display: block;
		left: 0;
		margin: 0.25rem 0 0;
		min-width: 10rem;
		overflow: auto;
		padding: 0.5rem 0;
		position: absolute;
		transition: display 1s ease-in;
		text-align: center;
		list-style: none;
		top: 100%;
		z-index: 99;

		.menu-list {
			border-bottom: 1px solid #ddddc7;
			cursor: pointer;
		}
		.menu-list:hover {
			background-color: #efecea;
		}
		.menu-list:last-child {
			border: none;
		}
	}

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
	display: flex;
	justify-content: center;
	padding: 0.75rem 1.25rem;
}
.menu-item-selected,
.selected-icon {
	color: #4dd599;
}
.vertical-enter-active, .vertical-leave-active {
  transition: opacity 1.5s;
}
.vertical-enter, .vertical-leave-to {
  opacity: 0;
  transform: translate3d(20px, 30px, 40px);
}
.selected-icon {
	left: 0;
	margin-left: 10px;
	position: absolute;
}
</style>
