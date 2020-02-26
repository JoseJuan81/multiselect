import { equality, find } from 'functionallibrary';
import Selector from './main';

class MultiSelectorOfNonObjects extends Selector {
	addItem(item) {
		return this.selected.concat(item);
	}

	addOrRemoveEveryThing(flagAll, options) {
		this.selected = flagAll ? [...options] : [];
		return this.selected;
	}

	removeItem(item) {
		return this.selected.filter(itemSelected => itemSelected !== item);
	}

	selection(item) {
		const exist = find(equality(item), this.selected);
		this.selected = exist ? this.removeItem(item) : this.addItem(item);
		return this.selected;
	}
}

export default MultiSelectorOfNonObjects;
