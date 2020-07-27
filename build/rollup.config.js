import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import buble from '@rollup/plugin-buble';

const vuePluginOptions = {
	css: true,
	compileTemplate: true,
};

if (process.env.SSR) {
	vuePluginOptions.template = { optimizeSSR: true };
}

export default {
	input: 'src/index.js',
	external: ['functionallibrary'],
	output: {
		name: 'MultiSelect',
		exports: 'named',
		globals: {
			functionallibrary: 'functionallibrary',
		},
	},
	plugins: [
		commonjs(),
		vue(vuePluginOptions),
		buble(),
	],
};
