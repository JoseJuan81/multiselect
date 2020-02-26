import Selector from './main';

class SimpleSelectorOfNonObjects extends Selector {
	selection(item) {
		this.selected = this.selected[0] === item ? [] : [item];
		return this.selected;
	}
}

export default SimpleSelectorOfNonObjects;
