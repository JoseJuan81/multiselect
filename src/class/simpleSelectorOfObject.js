import { setNewProperty } from 'functionallibrary';
import Selector from './main';

class SimpleSelectorOfObjects extends Selector {
	selection(item) {
		const newItem = setNewProperty('isSelected', !item.isSelected)(item);
		this.selected = newItem.isSelected ? [newItem] : [];
		return this.selected;
	}
}

export default SimpleSelectorOfObjects;
