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
	equality, find, isEmpty, map, setNewProperty,
} from 'functionallibrary';

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

function addOrRemove(item, flag) {
	const typeObject = typeof item === 'object';
	if (typeObject) {
		this.addOrRemoveObjects(item, flag);
	} else {
		this.addOrRemoveNoObjects(item, flag);
	}
}

function addOrRemoveNoObjects(item, flag) {
	this.currentOption = item;
	if (this.multiselect) {
		this.addOrRemoveInNoObjectMultiselect();
	} else {
		this.addOrRemoveInNoObjectSelect(flag);
	}
}

function addOrRemoveInNoObjectSelect(flagAdd) {
	if (isEmpty(this.value)) {
		this.selected = [];
	}
	if (this.value[0] === this.currentOption) {
		this.currentOption = '';
	}
	this.selected = typeof flagAdd === 'undefined' ? [this.currentOption] : [];
	this.$emit('input', [...this.selected]);
}

function addOrRemoveObjects(item, flag) {
	this.currentOption = { ...item };
	this.currentOption.isSelected = typeof flag === 'undefined' ? !item.isSelected : flag;
	if (this.multiselect) {
		this.addOrRemoveInMultiselect();
	} else {
		this.addOrRemoveInSingleSelect();
	}
}

function addOrRemoveInSingleSelect() {
	if (this.value && this.value.length > 0) {
		this.selected = [];
	}
	this.selected = this.currentOption.isSelected ? this.selected.concat(this.currentOption) : [];
	this.$emit('input', [...this.selected]);
}
function addOrRemoveInMultiselect() {
	if (this.currentOption.isSelected) {
		this.selected = this.selected.concat(this.currentOption);
	} else {
		this.selected = this.selected.filter(f => f[this.prop] !== this.currentOption[this.prop]);
	}
	this.$emit('input', [...this.selected]);
	this.allIsSelectedAction();
}

function clearAction() {
	this.value.forEach(u => this.addOrRemove(u, false));
}

function onSelectAll() {
	if (this.value.length > 0) {
		this.clearAction();
	}
	this.allFlag = !this.allFlag;
	this.optionComputed.forEach(u => this.addOrRemove(u, this.allFlag));
}

function allIsSelectedAction() {
	this.allIsSelected = this.selected.length === this.options.length;
}

function itemSelected(item) {
	if (!this.multiselect && this.selected[0] === item) {
		return Boolean(find(equality(item), this.optionComputed));
	}
	return false;
}

function data() {
	return {
		allFlag: false,
		allIsSelected: false,
		currentOption: {},
		selected: [],
		showMenu: false,
	};
}

export default {
	name: 'multi-select',
	computed: {
		objectsInOptions,
		optionComputed,
		noObjectsInOptions,
		selectingOptions,
	},
	data,
	methods: {
		addOrRemove,
		addOrRemoveInNoObjectSelect,
		addOrRemoveInMultiselect,
		addOrRemoveInSingleSelect,
		addOrRemoveNoObjects,
		addOrRemoveObjects,
		allIsSelectedAction,
		clearAction,
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
