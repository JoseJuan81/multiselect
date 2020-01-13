import MultiSelect from './components/multiSelect.vue';
import Tag from './components/tag.vue';

export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('MultiSelect', MultiSelect);
	Vue.component('Tag', Tag);
}

const plugin = {
	install,
};

let GlobalVue = null;

if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin);
}

export { MultiSelect };
export { Tag };
export default MultiSelect;
