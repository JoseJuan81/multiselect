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
					class="flex items-center"
					v-for="(tag, index) in value"
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
					v-if="selectAll"
					data-cy="selectAll"
					:class="{ 'menu-list': itemDivider }"
					@click.stop="onSelectAll"
				>
					<slot name="select-all-items" :is-selected="allIsSelected"></slot>
				</li>
				<li
					v-for="(option, indexO) in optionComputed"
					:key="indexO"
					:class="{ 'menu-list': itemDivider }"
					@click.stop="addOrRemove(option)"
				>
					<slot name="menu" :menu-item="option" :selected="itemSelected(option)"></slot>
				</li>
			</ul>
		</transition>
	</div>
</template>

<script>
import {
	equality, find, map, setNewProperty,
} from 'functionallibrary';
import InstanceSelection from '@/class';

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
	const sample = this.options[0];
	const typeObject = typeof sample === 'object';
	if (typeObject) {
		return this.objectsInOptions;
	}
	return this.noObjectsInOptions;
}

function noObjectsInOptions() {
	return this.options;
}

function objectsInOptions() {
	if (this.multiselect) {
		return this.value && this.value.length ? this.selectingOptions : this.options;
	}
	return this.value ? this.selectingOptions : this.options;
}

function selectingOptions() {
	return map(
		setNewProperty('isSelected', o => Boolean(find(equality(this.prop, o[this.prop]), this.value))),
		this.options,
	);
}

function addOrRemove(item) {
	this.selected = this.SelectorInstance.selection(item);
	this.emitInputEvent();
}

function clearAction() {
	this.selected = this.SelectorInstance.clearSelection();
	this.emitInputEvent();
}

function emitInputEvent() {
	this.$emit('input', [...this.selected]);
}

function onSelectAll() {
	this.allFlag = !this.allFlag;
	this.selected = this.SelectorInstance.addOrRemoveEveryThing(this.allFlag, this.optionComputed);
	this.emitInputEvent();
}

function allIsSelected() {
	return this.selected.length === this.options.length;
}

function itemSelected(item) {
	return this.SelectorInstance.isSelected(item);
}

function multiselect(newVal) {
	this.SelectorInstance = InstanceSelection(newVal, this.options[0], this.prop);
}

function data() {
	return {
		allFlag: false,
		SelectorInstance: InstanceSelection(this.multiselect, this.options[0], this.prop),
		selected: [],
		showMenu: false,
	};
}

export default {
	name: 'multi-select',
	computed: {
		allIsSelected,
		objectsInOptions,
		optionComputed,
		noObjectsInOptions,
		selectingOptions,
	},
	data,
	methods: {
		addOrRemove,
		clearAction,
		emitInputEvent,
		hideMenu,
		itemSelected,
		onSelectAll,
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
		multiselect: {
			default: false,
			type: Boolean,
		},
		selectAll: {
			default: false,
			type: Boolean,
		},
		options: {
			default: () => [],
			type: Array,
		},
		prop: {
			default: '',
			type: String,
		},
		transitionName: {
			default: '',
			type: String,
		},
		transitionMode: {
			default: 'out-in',
			type: String,
		},
		value: null,
	},
	watch: {
		multiselect,
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
