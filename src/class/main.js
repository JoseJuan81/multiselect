import { find, equality } from 'functionallibrary';

class Selector {
	constructor(prop) {
		this.prop = prop;
		this.selected = [];
	}

	clearSelection() {
		this.selected = [];
		return this.selected;
	}

	isSelected(item) {
		return Boolean(find(equality(item), this.selected));
	}
}

export default Selector;
