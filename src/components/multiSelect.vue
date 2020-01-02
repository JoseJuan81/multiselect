<template>
	<div
		class="relative"
		:style="`min-height:${minHeight};`"
		@click.stop="toogleMenu"
		ref="multiselect"
	>
		<div class="flex w-full items-center">
			<div class="flex flex-initial flex-wrap">
				<span
					class="tag flex items-center"
					v-for="(tag, index) in uniqueSelected"
					:key="index"
				>
					<slot name="tag" :tag="tag"></slot>
				</span>
			</div>
			<div class="flex-auto text-right">
				<slot name="icon" :show-menu="showMenu"></slot>
			</div>
		</div>
		<transition :name="transitionName" :mode="transitionMode">
			<ul
				v-if="showMenu"
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
		hideMenu,
		toogleMenu,
	},
	mounted,
	props: {
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
.tag {
	margin: 0.25rem;
	padding: 0.25rem 1rem;
	white-space: nowrap;
}
.flex-auto {
	flex: 1 1 auto;
}
.text-right {
	text-align: right;
}
</style>
