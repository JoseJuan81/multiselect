import { equality, find, setNewProperty } from 'functionallibrary';
import Selector from './main';

class SimpleSelectorOfObjects extends Selector {
	selection(item) {
		const newItem = setNewProperty('isSelected', !item.isSelected)(item);
		this.selected = newItem.isSelected ? [newItem] : [];
		return this.selected;
	}

	isSelected(item) {
		return Boolean(find(equality(this.prop, item[this.prop]), this.selected));
	}
}

export default SimpleSelectorOfObjects;
