<template>
	<div id="app" class="flex justify-center">
		<MultiSelect
			class="multi-select-container flex items-center justify-between"
			item-divider
			transition-name="vertical"
			:options="options"
			v-model="optionsSelected"
		>
			<template v-slot:tag="{ tag }">
				<Tag>{{tag.name}}</Tag>
			</template>
			<template v-slot:icon="{ showMenu }">
				<!-- <font-awesome-icon
					icon="chevron-down"
					:class="[
						'px-2 icon',
						{ 'icon-animation': showMenu },
					]"
				/> -->
			</template>
			<template v-slot:menu="{ menuItem }">
				<div
					:class="[
						'menu-item',
						{ 'menu-item-selected': menuItem.isSelected },
					]"
				>
					<span>{{menuItem.name}}</span>
				</div>
			</template>
		</MultiSelect>
	</div>
</template>

<script>
import MultiSelect from './components/multiSelect.vue';
import Tag from './components/tag.vue';

function data() {
	return {
		options: [
			{ id: 1, name: 'Juan' },
			{ id: 2, name: 'Noah' },
			{ id: 3, name: 'Churry' },
			{ id: 4, name: 'Kaki' },
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
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
.justify-center {
	justify-content: center;
}
.multi-select-container {
	background-color: white;
	border: 1px solid #ddddc7;
	border-radius: 0.5rem;
	padding: 0.5rem;
	width: 35%;

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
	.tag {
		background-color: #c6cbef;
		border-radius: 5px;
		border: 1px solid #494ca2;
		color: #494ca2;
	}
}

.menu-item {
	padding: 0.75rem 1.25rem;
}
.menu-item-selected {
	color: #4dd599;
}
.vertical-enter-active, .vertical-leave-active {
  transition: opacity 1.5s;
}
.vertical-enter, .vertical-leave-to {
  opacity: 0;
  transform: translate3d(20px, 30px, 40px);
}
</style>
