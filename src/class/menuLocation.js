
class MenuLocation {
	constructor(pageHeight, multiselectNode, multiselectMenuNode) {
		const totalChildren = multiselectMenuNode.children.length;
		const n = totalChildren <= 3 ? totalChildren : 4;
		this.menu = {
			children: multiselectMenuNode.children,
			height: {
				initial: multiselectMenuNode.offsetHeight,
				item: multiselectMenuNode.children[0].offsetHeight,
				min: multiselectMenuNode.children[0].offsetHeight * n,
			},
			node: multiselectMenuNode,
			position: multiselectMenuNode.getBoundingClientRect(),
		};
		const { offsetHeight, offsetTop } = multiselectNode;
		this.page = {
			height: {
				total: pageHeight,
				remain: pageHeight - (offsetTop + offsetHeight + 20),
			},
		};
		this.select = {
			position: multiselectNode.getBoundingClientRect(),
		};
	}

	get menuTop() {
		return this.remainHeight.top > this.remainHeight.bottom;
	}

	get menuHeight() {
		const { top, bottom } = this.remainHeight;
		const avaliableHeight = this.menuTop ? top : bottom;
		const nChildren = Math.floor(avaliableHeight / this.menu.height.item);
		const height = nChildren * this.menu.height.item;
		const maxHeightByItems = this.menu.height.initial;
		return maxHeightByItems > height ? `${height}px` : `${maxHeightByItems}px`;
	}

	get remainHeight() {
		return {
			bottom: this.page.height.total - this.select.position.bottom,
			top: this.select.position.top,
		};
	}
}

export default MenuLocation;
