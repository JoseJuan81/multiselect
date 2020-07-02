class MenuLocation {
	constructor(pageHeight, multiselectNode, multiselectMenuNode) {
		this.pageHeight = pageHeight;
		this.multiselect = multiselectNode;
		this.menu = multiselectMenuNode;
		this.menuInitHeight = this.menu.offsetHeight;
		this.menuItemHeight = multiselectMenuNode.children[0].offsetHeight;
		this.menuMinHeight = this.menuItemHeight * 4;
		this.remainHeight = this.pageHeight - (this.multiselectOffsetTop + this.multiselectHeight + 20);
	}

	get multiselectOffsetTop() {
		return this.multiselect.offsetTop;
	}

	get multiselectHeight() {
		return this.multiselect.offsetHeight;
	}

	get menuTop() {
		const lessThanMinHeight = this.remainHeight <= this.menuMinHeight;
		const lessThanInitHeight = this.remainHeight <= this.menuInitHeight;
		return lessThanMinHeight && lessThanInitHeight;
	}

	get menuHeight() {
		if (this.menuTop) {
			return 'auto';
		}
		if (this.menuInitHeight < this.remainHeight) {
			return this.menuInitHeight;
		}
		return `${this.menuMinHeight}px`;
	}
}

export default MenuLocation;
