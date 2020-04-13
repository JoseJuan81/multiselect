import { map, setNewProperty } from 'functionallibrary';
import Selector from './main';

class MultiSelectorOfObjects extends Selector {
	addItem(item) {
		return this.selected.concat(item);
	}

	addOrRemoveEveryThing(flagAll, options) {
		this.selected = flagAll ? map(setNewProperty('isSelected', true), options) : [];
		return this.selected;
	}

	removeItem(item) {
		return this.selected.filter(itemSelected => itemSelected[this.prop] !== item[this.prop]);
	}

	selection(item) {
		const newItem = setNewProperty('isSelected', !item.isSelected)(item);
		this.selected = newItem.isSelected ? this.addItem(newItem) : this.removeItem(newItem);
		return this.selected;
	}
}

export default MultiSelectorOfObjects;
