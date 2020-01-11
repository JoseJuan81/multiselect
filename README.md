# Multiselect
<img src="https://travis-ci.org/JoseJuan81/multiselect.svg?branch=dev">

> **multiselect** is a `vue` component used to select multiple options at the same time.
> This component only has basic and general style and the user can style it the way he or she wants, that's why this component can be used in any vue project.
> Multiselect comes with a optional `Tag` component that can be used in the ***tag*** slot.


## Install
```code
npm install --save multiselect
```
## Global Use
in your `main.js`
```js
import Vue from 'vue';
import { Multiselect, Tag } from 'multiselect';

Vue.use(Multiselect);
Vue.use(Tag);
```
## Local Use
in your `.vue` file
```js
<script>
import { Multiselect, Tag } from 'multiselect';
export default {
	name: 'component-name',
	components: {
		Multiselect,
		Tag,
	},
}
...
</script>
```