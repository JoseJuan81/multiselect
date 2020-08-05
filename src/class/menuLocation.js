
class MenuLocation {
	constructor(pageHeight, multiselectNode, multiselectMenuNode) {
		const totalChildren = multiselectMenuNode.children.length;
		const n = totalChildren <= 3 ? totalChildren : 4;
		const firstChildren = multiselectMenuNode.children[0];
		this.menu = {
			children: multiselectMenuNode.children,
			height: {
				initial: multiselectMenuNode.offsetHeight,
				item: firstChildren && firstChildren.offsetHeight,
				min: firstChildren && (firstChildren.offsetHeight * n),
			},
			node: multiselectMenuNode,
			position: multiselectMenuNode.getBoundingClientRect(),
			width: multiselectMenuNode.getBoundingClientRect().width,
		};
		const { offsetHeight, offsetTop } = multiselectNode;
		this.page = {
			height: {
				total: pageHeight,
				remain: pageHeight - (offsetTop + offsetHeight + 20),
			},
		};
		this.select = {
			node: multiselectNode,
			position: multiselectNode.getBoundingClientRect(),
		};
	}

	get menuTop() {
		return this.remainHeight.top > this.remainHeight.bottom;
	}

	get menuHeight() {
		return `${this.menuHeightCalculated()}px`;
	}

	get menuWidth() {
		return `${this.menu.width}px`;
	}

	get remainHeight() {
		return {
			bottom: this.page.height.total - this.select.position.bottom,
			top: this.select.position.top,
		};
	}

	get menuLeftPos() {
		const left = this.select.node.offsetLeft;
		return `${left}px`;
	}

	get menuTopPos() {
		const top = this.select.node.offsetTop;
		if (this.menuTop) {
			return `${top - this.menuHeightCalculated()}px`;
		}
		const selectHeight = this.select.node.offsetHeight;
		return `${top + selectHeight}px`;
	}

	menuHeightCalculated() {
		const { top, bottom } = this.remainHeight;
		const { item: menuItemHeight, initial: maxHeightByItems } = this.menu.height;
		const avaliableHeight = this.menuTop ? top : bottom;
		const nChildren = Math.floor(avaliableHeight / menuItemHeight);
		const height = nChildren * menuItemHeight;
		return maxHeightByItems > height ? height : maxHeightByItems;
	}

	viewItemInPage(index) {
		const { offsetTop } = this.menu.children[index];
		this.menu.node.scrollTo({
			top: offsetTop,
			behavior: 'smooth',
		});
	}
}

export default MenuLocation;
