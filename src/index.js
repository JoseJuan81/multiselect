import MultiSelectDl from './components/multiselect-dl.vue';

const install = function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component(MultiSelectDl.name, MultiSelectDl);
};

MultiSelectDl.install = install;

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

export default MultiSelectDl;
