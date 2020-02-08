<template>
	<div
		class="relative"
		:style="`min-height:${minHeight};`"
		@click.stop="toogleMenu"
	>
		<div class="flex w-full items-center justify-between">
			<div
				data-cy="tags"
				class="flex flex-initial flex-wrap">
				<span
					class="tag flex items-center"
					v-for="(tag, index) in uniqueSelected"
					:key="index"
				>
					<slot name="tag" :tag="tag" :removeIt="addOrRemove"></slot>
				</span>
			</div>
			<div class="flex flex-auto justify-end">
				<div class="flex items-center">
					<div data-cy="clearable" @click.stop="clearAction" v-if="clearable">
						<slot name="close-icon"></slot>
					</div>
					<div class="icon-menu" :style="`transform:rotateZ(${showMenu ? '180deg' : '0deg'})`">
						<slot name="icon" :show-menu="showMenu"></slot>
					</div>
				</div>
			</div>
		</div>
		<transition :name="transitionName" :mode="transitionMode">
			<ul
				v-if="showMenu"
				data-cy="multiselect-menu"
				class="multi-select-menu"
				:style="`max-height:${menuMaxHeight}`"
			>
				<li
					v-for="(option, indexO) in optionComputed"
					:key="indexO"
					:class="{ 'menu-list': itemDivider }"
					@click.stop="addOrRemove(option)"
				>
					<slot name="menu" :menu-item="option"></slot>
				</li>
			</ul>
		</transition>
	</div>
</template>

<script>
function mounted() {
	const self = this;
	document.addEventListener('click', () => {
		if (self.showMenu) {
			self.hideMenu();
		}
	});
}

function hideMenu() {
	this.showMenu = false;
}

function toogleMenu() {
	this.showMenu = !this.showMenu;
}

function optionComputed() {
	return this.options;
}

function addOrRemove(item) {
	const newItem = item;
	newItem.isSelected = !item.isSelected;
	if (newItem.isSelected) {
		this.selected.add(newItem);
	} else {
		this.selected.delete(newItem);
	}
	this.uniqueSelected = [...this.selected];
	this.$emit('input', this.uniqueSelected);
}

function clearAction() {
	this.uniqueSelected.forEach(this.addOrRemove);
}

function data() {
	return {
		count: 0,
		selected: new Set(),
		showMenu: false,
		uniqueSelected: [],
	};
}

export default {
	name: 'multi-select',
	computed: {
		optionComputed,
	},
	data,
	methods: {
		addOrRemove,
		clearAction,
		hideMenu,
		toogleMenu,
	},
	mounted,
	props: {
		clearable: {
			default: false,
			type: Boolean,
		},
		itemDivider: {
			default: false,
			type: Boolean,
		},
		menuMaxHeight: {
			default: 'auto',
			type: String,
		},
		minHeight: {
			default: '2.5rem',
			type: String,
		},
		options: {
			default: () => [],
			type: Array,
		},
		transitionName: {
			default: '',
			type: String,
		},
		transitionMode: {
			default: 'out-in',
			type: String,
		},
	},
};
</script>
<style lang="scss" scoped>
.relative {
	position: relative;
}
.w-full {
	width: 100%;
}
.flex-initial {
	flex: 0 1 auto;
}
.flex-wrap {
	flex-wrap: wrap;
}
.flex-auto {
	flex: 1 1 auto;
}
.text-right {
	text-align: right;
}
.icon-menu {
	cursor: pointer;
	max-width: fit-content;
	transform-origin: center;
	transition: transform 0.175s linear;
}
</style>
