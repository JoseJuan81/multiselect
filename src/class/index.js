import MultiSelectorOfObjects from './multiSelectorOfObjects';
import MultiSelectorOfNonObjects from './multiSelectorOfNonObject';
import SimpleSelectorOfObjects from './simpleSelectorOfObject';
import SimpleSelectorOfNonObjects from './simpleSelectorOfNonObject';

export default function classInstance(multiselect, item, prop) {
	if (multiselect) {
		return typeof item === 'object'
			? new MultiSelectorOfObjects(prop)
			: new MultiSelectorOfNonObjects();
	}
	return typeof item === 'object'
		? new SimpleSelectorOfObjects(prop)
		: new SimpleSelectorOfNonObjects();
}
