import { find, equality, map, setNewProperty } from 'functionallibrary';

var Selector = function Selector(prop) {
	this.prop = prop;
	this.selected = [];
};

Selector.prototype.clearSelection = function clearSelection () {
	this.selected = [];
	return this.selected;
};

Selector.prototype.isSelected = function isSelected (item) {
	return Boolean(find(equality(item), this.selected));
};

var MultiSelectorOfObjects = /*@__PURE__*/(function (Selector) {
	function MultiSelectorOfObjects () {
		Selector.apply(this, arguments);
	}

	if ( Selector ) MultiSelectorOfObjects.__proto__ = Selector;
	MultiSelectorOfObjects.prototype = Object.create( Selector && Selector.prototype );
	MultiSelectorOfObjects.prototype.constructor = MultiSelectorOfObjects;

	MultiSelectorOfObjects.prototype.addItem = function addItem (item) {
		return this.selected.concat(item);
	};

	MultiSelectorOfObjects.prototype.addOrRemoveEveryThing = function addOrRemoveEveryThing (flagAll, options) {
		this.selected = flagAll ? map(setNewProperty('isSelected', true), options) : [];
		return this.selected;
	};

	MultiSelectorOfObjects.prototype.removeItem = function removeItem (item) {
		var this$1 = this;

		return this.selected.filter(function (itemSelected) { return itemSelected[this$1.prop] !== item[this$1.prop]; });
	};

	MultiSelectorOfObjects.prototype.selection = function selection (item) {
		var newItem = setNewProperty('isSelected', !item.isSelected)(item);
		this.selected = newItem.isSelected ? this.addItem(newItem) : this.removeItem(newItem);
		return this.selected;
	};

	MultiSelectorOfObjects.prototype.isSelected = function isSelected (item) {
		return Boolean(find(equality(this.prop, item[this.prop]), this.selected));
	};

	return MultiSelectorOfObjects;
}(Selector));

var MultiSelectorOfNonObjects = /*@__PURE__*/(function (Selector) {
	function MultiSelectorOfNonObjects () {
		Selector.apply(this, arguments);
	}

	if ( Selector ) MultiSelectorOfNonObjects.__proto__ = Selector;
	MultiSelectorOfNonObjects.prototype = Object.create( Selector && Selector.prototype );
	MultiSelectorOfNonObjects.prototype.constructor = MultiSelectorOfNonObjects;

	MultiSelectorOfNonObjects.prototype.addItem = function addItem (item) {
		return this.selected.concat(item);
	};

	MultiSelectorOfNonObjects.prototype.addOrRemoveEveryThing = function addOrRemoveEveryThing (flagAll, options) {
		this.selected = flagAll ? [].concat( options ) : [];
		return this.selected;
	};

	MultiSelectorOfNonObjects.prototype.removeItem = function removeItem (item) {
		return this.selected.filter(function (itemSelected) { return itemSelected !== item; });
	};

	MultiSelectorOfNonObjects.prototype.selection = function selection (item) {
		var exist = find(equality(item), this.selected);
		this.selected = exist ? this.removeItem(item) : this.addItem(item);
		return this.selected;
	};

	return MultiSelectorOfNonObjects;
}(Selector));

var SimpleSelectorOfObjects = /*@__PURE__*/(function (Selector) {
	function SimpleSelectorOfObjects () {
		Selector.apply(this, arguments);
	}

	if ( Selector ) SimpleSelectorOfObjects.__proto__ = Selector;
	SimpleSelectorOfObjects.prototype = Object.create( Selector && Selector.prototype );
	SimpleSelectorOfObjects.prototype.constructor = SimpleSelectorOfObjects;

	SimpleSelectorOfObjects.prototype.selection = function selection (item) {
		var newItem = setNewProperty('isSelected', !item.isSelected)(item);
		this.selected = newItem.isSelected ? [newItem] : [];
		return this.selected;
	};

	SimpleSelectorOfObjects.prototype.isSelected = function isSelected (item) {
		return Boolean(find(equality(this.prop, item[this.prop]), this.selected));
	};

	return SimpleSelectorOfObjects;
}(Selector));

var SimpleSelectorOfNonObjects = /*@__PURE__*/(function (Selector) {
	function SimpleSelectorOfNonObjects () {
		Selector.apply(this, arguments);
	}

	if ( Selector ) SimpleSelectorOfNonObjects.__proto__ = Selector;
	SimpleSelectorOfNonObjects.prototype = Object.create( Selector && Selector.prototype );
	SimpleSelectorOfNonObjects.prototype.constructor = SimpleSelectorOfNonObjects;

	SimpleSelectorOfNonObjects.prototype.selection = function selection (item) {
		this.selected = this.selected[0] === item ? [] : [item];
		return this.selected;
	};

	return SimpleSelectorOfNonObjects;
}(Selector));

function classInstance(multiselect, item, prop) {
	if (multiselect) {
		return typeof item === 'object'
			? new MultiSelectorOfObjects(prop)
			: new MultiSelectorOfNonObjects();
	}
	return typeof item === 'object'
		? new SimpleSelectorOfObjects(prop)
		: new SimpleSelectorOfNonObjects();
}

var MenuLocation = function MenuLocation(pageHeight, multiselectNode, multiselectMenuNode) {
	var totalChildren = multiselectMenuNode.children.length;
	var n = totalChildren <= 3 ? totalChildren : 4;
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
	var offsetHeight = multiselectNode.offsetHeight;
	var offsetTop = multiselectNode.offsetTop;
	this.page = {
		height: {
			total: pageHeight,
			remain: pageHeight - (offsetTop + offsetHeight + 20),
		},
	};
	this.select = {
		position: multiselectNode.getBoundingClientRect(),
	};
};

var prototypeAccessors = { menuTop: { configurable: true },menuHeight: { configurable: true },remainHeight: { configurable: true } };

prototypeAccessors.menuTop.get = function () {
	return this.remainHeight.top > this.remainHeight.bottom;
};

prototypeAccessors.menuHeight.get = function () {
	var ref = this.remainHeight;
		var top = ref.top;
		var bottom = ref.bottom;
	var avaliableHeight = this.menuTop ? top : bottom;
	var nChildren = Math.floor(avaliableHeight / this.menu.height.item);
	var height = nChildren * this.menu.height.item;
	var maxHeightByItems = this.menu.height.initial;
	return maxHeightByItems > height ? (height + "px") : (maxHeightByItems + "px");
};

prototypeAccessors.remainHeight.get = function () {
	return {
		bottom: this.page.height.total - this.select.position.bottom,
		top: this.select.position.top,
	};
};

Object.defineProperties( MenuLocation.prototype, prototypeAccessors );

//

function mounted() {
	var self = this;
	document.addEventListener('click', function () {
		if (self.showMenu) {
			self.hideMenu();
		}
	});
}

function hideMenu() {
	this.showMenu = false;
}

function toogleMenu() {
	var this$1 = this;

	this.showMenu = !this.showMenu;
	if (this.showMenu) {
		this.$refs.input.focus();
		this.$nextTick(function () {
			this$1.checkPageBottom();
			this$1.setHoverIndex(0);
		});
	}
}

function checkPageBottom() {
	var pageHeight = window.innerHeight;
	var multiselectContainer = this.$refs.multiselect;
	var multiselectMenu = this.$refs['multiselect-menu'];
	this.menuLocation = new MenuLocation(pageHeight, multiselectContainer, multiselectMenu);
	multiselectMenu.style.height = this.menuLocation.menuHeight;
	if (this.menuLocation.menuTop) {
		multiselectMenu.style.bottom = '105%';
	} else {
		multiselectMenu.style.top = '100%';
	}
}

function optionComputed() {
	var sample = this.options[0];
	var typeObject = typeof sample === 'object';
	if (typeObject) {
		return this.objectsInOptions;
	}
	return this.noObjectsInOptions;
}

function noObjectsInOptions() {
	return this.options;
}

function objectsInOptions() {
	if (this.multiselect) {
		return this.value && this.value.length ? this.selectingOptions : this.options;
	}
	return this.value ? this.selectingOptions : this.options;
}

function selectingOptions() {
	var this$1 = this;

	return map(
		setNewProperty(
			'isSelected',
			function (o) { return Boolean(
				find(
					equality(
						this$1.prop, o[this$1.prop]
					),
					this$1.value
				)
			); }
		),
		this.options
	);
}

function addOrRemove(item) {
	this.selected = this.SelectorInstance.selection(item);
	this.emitInputEvent();
}

function clearAction() {
	this.selected = this.SelectorInstance.clearSelection();
	this.emitInputEvent();
}

function emitInputEvent() {
	this.$emit('input', [].concat( this.selected ));
}

function onSelectAll() {
	this.allFlag = !this.allFlag;
	this.selected = this.SelectorInstance.addOrRemoveEveryThing(this.allFlag, this.optionComputed);
	this.emitInputEvent();
}

function allIsSelected() {
	return this.selected.length === this.options.length;
}

function itemSelected(item) {
	return this.SelectorInstance.isSelected(item);
}

function multiselect(newVal) {
	this.SelectorInstance = classInstance(newVal, this.options[0], this.prop);
}

function setHoverIndex(index) {
	this.hoverIndex = index;
}

function updateHoverIndex(k) {
	var last = this.options.length;
	var newIndex = this.hoverIndex + k;
	newIndex = newIndex < 0 ? last - 1 : newIndex;
	this.hoverIndex = newIndex % last;
	this.menuLocation.menu.children[this.hoverIndex].scrollIntoView({
		behavior: 'smooth',
	});
}

function selectingItem() {
	var currentItem = this.optionComputed[this.hoverIndex];
	this.addOrRemove(currentItem);
}

function closeMenu() {
	this.showMenu = false;
}

function data() {
	return {
		allFlag: false,
		hoverIndex: null,
		menuLocation: null,
		SelectorInstance: classInstance(this.multiselect, this.options[0], this.prop),
		selected: [],
		showMenu: false,
	};
}

var script = {
	name: 'multiselect-dl',
	computed: {
		allIsSelected: allIsSelected,
		objectsInOptions: objectsInOptions,
		optionComputed: optionComputed,
		noObjectsInOptions: noObjectsInOptions,
		selectingOptions: selectingOptions,
	},
	data: data,
	methods: {
		addOrRemove: addOrRemove,
		clearAction: clearAction,
		closeMenu: closeMenu,
		checkPageBottom: checkPageBottom,
		emitInputEvent: emitInputEvent,
		hideMenu: hideMenu,
		itemSelected: itemSelected,
		onSelectAll: onSelectAll,
		selectingItem: selectingItem,
		setHoverIndex: setHoverIndex,
		toogleMenu: toogleMenu,
		updateHoverIndex: updateHoverIndex,
	},
	mounted: mounted,
	props: {
		clearable: {
			default: false,
			type: Boolean,
		},
		menuMaxHeight: {
			default: 'auto',
			type: String,
		},
		minHeight: {
			default: '0.5rem',
			type: String,
		},
		multiselect: {
			default: false,
			type: Boolean,
		},
		selectAll: {
			default: false,
			type: Boolean,
		},
		options: {
			default: function () { return []; },
			type: Array,
		},
		prop: {
			default: '',
			type: String,
		},
		transitionName: {
			default: '',
			type: String,
		},
		transitionMode: {
			default: 'out-in',
			type: String,
		},
		value: null,
	},
	watch: {
		multiselect: multiselect,
	},
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      ref: "multiselect",
      staticClass: "dl-main-container",
      style: "min-height:" + _vm.minHeight + ";",
      on: {
        click: function($event) {
          $event.stopPropagation();
          return _vm.toogleMenu($event)
        }
      }
    },
    [
      _c("div", { staticClass: "dl-select-container" }, [
        _c(
          "div",
          { staticClass: "dl-items-container", attrs: { "data-cy": "tags" } },
          [
            _c("input", {
              ref: "input",
              staticClass: "dl-hidden-input",
              attrs: { type: "text" },
              on: {
                keydown: [
                  function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                    ) {
                      return null
                    }
                    return _vm.selectingItem($event)
                  },
                  function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "down", 40, $event.key, [
                        "Down",
                        "ArrowDown"
                      ])
                    ) {
                      return null
                    }
                    return _vm.updateHoverIndex(1)
                  },
                  function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "up", 38, $event.key, [
                        "Up",
                        "ArrowUp"
                      ])
                    ) {
                      return null
                    }
                    return _vm.updateHoverIndex(-1)
                  },
                  function($event) {
                    if (
                      !$event.type.indexOf("key") &&
                      _vm._k($event.keyCode, "esc", 27, $event.key, [
                        "Esc",
                        "Escape"
                      ])
                    ) {
                      return null
                    }
                    return _vm.closeMenu($event)
                  }
                ]
              }
            }),
            _vm._v(" "),
            _vm._l(_vm.value, function(tag, index) {
              return _c(
                "span",
                { key: index, staticClass: "dl-item" },
                [_vm._t("tag", null, { tag: tag, removeIt: _vm.addOrRemove })],
                2
              )
            })
          ],
          2
        ),
        _vm._v(" "),
        _c("div", { staticClass: "dl-activator-icons-container" }, [
          _c("div", { staticClass: "dl-activator-icons" }, [
            _vm.clearable
              ? _c(
                  "div",
                  {
                    attrs: { "data-cy": "clearable" },
                    on: {
                      click: function($event) {
                        $event.stopPropagation();
                        return _vm.clearAction($event)
                      }
                    }
                  },
                  [_vm._t("clear-icon")],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "dl-icon-menu",
                style:
                  "transform:rotateZ(" +
                  (_vm.showMenu ? "180deg" : "0deg") +
                  ")"
              },
              [_vm._t("menu-activator", null, { showMenu: _vm.showMenu })],
              2
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: _vm.transitionName, mode: _vm.transitionMode } },
        [
          _vm.showMenu
            ? _c("div", [
                _c(
                  "ul",
                  {
                    ref: "multiselect-menu",
                    staticClass: "dl-multi-select-menu",
                    style: "max-height:" + _vm.menuMaxHeight,
                    attrs: { "data-cy": "multiselect-menu" }
                  },
                  [
                    _vm.selectAll
                      ? _c(
                          "li",
                          {
                            staticClass: "dl-menu-item-wrapper",
                            attrs: { "data-cy": "selectAll" },
                            on: {
                              click: function($event) {
                                $event.stopPropagation();
                                return _vm.onSelectAll($event)
                              }
                            }
                          },
                          [
                            _vm._t("select-all-items", null, {
                              isSelected: _vm.allIsSelected
                            })
                          ],
                          2
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._l(_vm.optionComputed, function(option, indexO) {
                      return _c(
                        "li",
                        {
                          key: indexO,
                          staticClass: "dl-menu-item-wrapper",
                          on: {
                            click: function($event) {
                              $event.stopPropagation();
                              return _vm.addOrRemove(option)
                            }
                          }
                        },
                        [
                          _vm._t("menu", null, {
                            menuItem: option,
                            isHovered: indexO === _vm.hoverIndex,
                            indexItem: indexO,
                            selected: _vm.itemSelected(option)
                          })
                        ],
                        2
                      )
                    })
                  ],
                  2
                )
              ])
            : _vm._e()
        ]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-11282312_0", { source: ".dl-main-container {\n  position: relative;\n}\n.dl-select-container {\n  display: flex;\n}\n.dl-select-container .dl-items-container {\n  display: flex;\n  flex: 1 1 auto;\n}\n.dl-select-container .dl-activator-icons-container {\n  display: flex;\n  justify-self: flex-end;\n}\n.dl-select-container .dl-activator-icons-container .dl-activator-icons {\n  align-items: center;\n  display: flex;\n}\n.dl-icon-menu {\n  cursor: pointer;\n  max-width: fit-content;\n  transform-origin: center;\n  transition: transform 0.175s linear;\n}\n.dl-multi-select-menu {\n  background-color: white;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  display: block;\n  left: 0;\n  margin: 0.25rem 0 0;\n  min-width: 10rem;\n  overflow: auto;\n  padding: 0.5rem 0;\n  position: absolute;\n  transition: display 1s ease-in;\n  text-align: center;\n  list-style: none;\n  z-index: 99;\n}\n\n/*# sourceMappingURL=multiselect-dl.vue.map */", map: {"version":3,"sources":["/Users/frontend/Documents/JJ/dl-components/my-components/multiselect-dl/src/components/multiselect-dl.vue","multiselect-dl.vue"],"names":[],"mappings":"AAiSA;EACA,kBAAA;AChSA;ADmSA;EACA,aAAA;AChSA;ADkSA;EACA,aAAA;EACA,cAAA;AChSA;ADmSA;EACA,aAAA;EACA,sBAAA;ACjSA;ADkSA;EACA,mBAAA;EACA,aAAA;AChSA;ADoSA;EACA,eAAA;EACA,sBAAA;EACA,wBAAA;EACA,mCAAA;ACjSA;ADoSA;EACA,uBAAA;EACA,mFAAA;EACA,cAAA;EACA,OAAA;EACA,mBAAA;EACA,gBAAA;EACA,cAAA;EACA,iBAAA;EACA,kBAAA;EACA,8BAAA;EACA,kBAAA;EACA,gBAAA;EACA,WAAA;ACjSA;;AAEA,6CAA6C","file":"multiselect-dl.vue","sourcesContent":["<template>\n\t<div\n\t\tclass=\"dl-main-container\"\n\t\tref=\"multiselect\"\n\t\t:style=\"`min-height:${minHeight};`\"\n\t\t@click.stop=\"toogleMenu\"\n\t>\n\t\t<div class=\"dl-select-container\">\n\t\t\t<div\n\t\t\t\tdata-cy=\"tags\"\n\t\t\t\tclass=\"dl-items-container\"\n\t\t\t>\n\t\t\t\t<input type=\"text\" ref=\"input\" class=\"dl-hidden-input\"\n\t\t\t\t\t@keydown.enter=\"selectingItem\"\n\t\t\t\t\t@keydown.down=\"updateHoverIndex(1)\"\n\t\t\t\t\t@keydown.up=\"updateHoverIndex(-1)\"\n\t\t\t\t\t@keydown.esc=\"closeMenu\"\n\t\t\t\t>\n\t\t\t\t<span\n\t\t\t\t\tclass=\"dl-item\"\n\t\t\t\t\tv-for=\"(tag, index) in value\"\n\t\t\t\t\t:key=\"index\"\n\t\t\t\t>\n\t\t\t\t\t<slot name=\"tag\" :tag=\"tag\" :removeIt=\"addOrRemove\"></slot>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class=\"dl-activator-icons-container\">\n\t\t\t\t<div class=\"dl-activator-icons\">\n\t\t\t\t\t<div data-cy=\"clearable\" @click.stop=\"clearAction\" v-if=\"clearable\">\n\t\t\t\t\t\t<slot name=\"clear-icon\"></slot>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"dl-icon-menu\" :style=\"`transform:rotateZ(${showMenu ? '180deg' : '0deg'})`\">\n\t\t\t\t\t\t<slot name=\"menu-activator\" :show-menu=\"showMenu\"></slot>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<transition :name=\"transitionName\" :mode=\"transitionMode\">\n\t\t\t<div v-if=\"showMenu\">\n\t\t\t\t<ul\n\t\t\t\t\tdata-cy=\"multiselect-menu\"\n\t\t\t\t\tref=\"multiselect-menu\"\n\t\t\t\t\tclass=\"dl-multi-select-menu\"\n\t\t\t\t\t:style=\"`max-height:${menuMaxHeight}`\"\n\t\t\t\t>\n\t\t\t\t\t<li\n\t\t\t\t\t\tv-if=\"selectAll\"\n\t\t\t\t\t\tdata-cy=\"selectAll\"\n\t\t\t\t\t\tclass=\"dl-menu-item-wrapper\"\n\t\t\t\t\t\t@click.stop=\"onSelectAll\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<slot name=\"select-all-items\" :is-selected=\"allIsSelected\"></slot>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li\n\t\t\t\t\t\tv-for=\"(option, indexO) in optionComputed\"\n\t\t\t\t\t\t:key=\"indexO\"\n\t\t\t\t\t\tclass=\"dl-menu-item-wrapper\"\n\t\t\t\t\t\t@click.stop=\"addOrRemove(option)\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<slot\n\t\t\t\t\t\t\tname=\"menu\"\n\t\t\t\t\t\t\t:menu-item=\"option\"\n\t\t\t\t\t\t\t:is-hovered=\"indexO === hoverIndex\"\n\t\t\t\t\t\t\t:index-item=\"indexO\"\n\t\t\t\t\t\t\t:selected=\"itemSelected(option)\"></slot>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</transition>\n\t</div>\n</template>\n\n<script>\nimport {\n\tequality, find, map, setNewProperty,\n} from 'functionallibrary';\nimport InstanceSelection from '../class';\nimport MenuLocation from '../class/menuLocation';\n\nfunction mounted() {\n\tconst self = this;\n\tdocument.addEventListener('click', () => {\n\t\tif (self.showMenu) {\n\t\t\tself.hideMenu();\n\t\t}\n\t});\n}\n\nfunction hideMenu() {\n\tthis.showMenu = false;\n}\n\nfunction toogleMenu() {\n\tthis.showMenu = !this.showMenu;\n\tif (this.showMenu) {\n\t\tthis.$refs.input.focus();\n\t\tthis.$nextTick(() => {\n\t\t\tthis.checkPageBottom();\n\t\t\tthis.setHoverIndex(0);\n\t\t});\n\t}\n}\n\nfunction checkPageBottom() {\n\tconst pageHeight = window.innerHeight;\n\tconst multiselectContainer = this.$refs.multiselect;\n\tconst multiselectMenu = this.$refs['multiselect-menu'];\n\tthis.menuLocation = new MenuLocation(pageHeight, multiselectContainer, multiselectMenu);\n\tmultiselectMenu.style.height = this.menuLocation.menuHeight;\n\tif (this.menuLocation.menuTop) {\n\t\tmultiselectMenu.style.bottom = '105%';\n\t} else {\n\t\tmultiselectMenu.style.top = '100%';\n\t}\n}\n\nfunction optionComputed() {\n\tconst sample = this.options[0];\n\tconst typeObject = typeof sample === 'object';\n\tif (typeObject) {\n\t\treturn this.objectsInOptions;\n\t}\n\treturn this.noObjectsInOptions;\n}\n\nfunction noObjectsInOptions() {\n\treturn this.options;\n}\n\nfunction objectsInOptions() {\n\tif (this.multiselect) {\n\t\treturn this.value && this.value.length ? this.selectingOptions : this.options;\n\t}\n\treturn this.value ? this.selectingOptions : this.options;\n}\n\nfunction selectingOptions() {\n\treturn map(\n\t\tsetNewProperty(\n\t\t\t'isSelected',\n\t\t\to => Boolean(\n\t\t\t\tfind(\n\t\t\t\t\tequality(\n\t\t\t\t\t\tthis.prop, o[this.prop],\n\t\t\t\t\t),\n\t\t\t\t\tthis.value,\n\t\t\t\t),\n\t\t\t),\n\t\t),\n\t\tthis.options,\n\t);\n}\n\nfunction addOrRemove(item) {\n\tthis.selected = this.SelectorInstance.selection(item);\n\tthis.emitInputEvent();\n}\n\nfunction clearAction() {\n\tthis.selected = this.SelectorInstance.clearSelection();\n\tthis.emitInputEvent();\n}\n\nfunction emitInputEvent() {\n\tthis.$emit('input', [...this.selected]);\n}\n\nfunction onSelectAll() {\n\tthis.allFlag = !this.allFlag;\n\tthis.selected = this.SelectorInstance.addOrRemoveEveryThing(this.allFlag, this.optionComputed);\n\tthis.emitInputEvent();\n}\n\nfunction allIsSelected() {\n\treturn this.selected.length === this.options.length;\n}\n\nfunction itemSelected(item) {\n\treturn this.SelectorInstance.isSelected(item);\n}\n\nfunction multiselect(newVal) {\n\tthis.SelectorInstance = InstanceSelection(newVal, this.options[0], this.prop);\n}\n\nfunction setHoverIndex(index) {\n\tthis.hoverIndex = index;\n}\n\nfunction updateHoverIndex(k) {\n\tconst last = this.options.length;\n\tlet newIndex = this.hoverIndex + k;\n\tnewIndex = newIndex < 0 ? last - 1 : newIndex;\n\tthis.hoverIndex = newIndex % last;\n\tthis.menuLocation.menu.children[this.hoverIndex].scrollIntoView({\n\t\tbehavior: 'smooth',\n\t});\n}\n\nfunction selectingItem() {\n\tconst currentItem = this.optionComputed[this.hoverIndex];\n\tthis.addOrRemove(currentItem);\n}\n\nfunction closeMenu() {\n\tthis.showMenu = false;\n}\n\nfunction data() {\n\treturn {\n\t\tallFlag: false,\n\t\thoverIndex: null,\n\t\tmenuLocation: null,\n\t\tSelectorInstance: InstanceSelection(this.multiselect, this.options[0], this.prop),\n\t\tselected: [],\n\t\tshowMenu: false,\n\t};\n}\n\nexport default {\n\tname: 'multiselect-dl',\n\tcomputed: {\n\t\tallIsSelected,\n\t\tobjectsInOptions,\n\t\toptionComputed,\n\t\tnoObjectsInOptions,\n\t\tselectingOptions,\n\t},\n\tdata,\n\tmethods: {\n\t\taddOrRemove,\n\t\tclearAction,\n\t\tcloseMenu,\n\t\tcheckPageBottom,\n\t\temitInputEvent,\n\t\thideMenu,\n\t\titemSelected,\n\t\tonSelectAll,\n\t\tselectingItem,\n\t\tsetHoverIndex,\n\t\ttoogleMenu,\n\t\tupdateHoverIndex,\n\t},\n\tmounted,\n\tprops: {\n\t\tclearable: {\n\t\t\tdefault: false,\n\t\t\ttype: Boolean,\n\t\t},\n\t\tmenuMaxHeight: {\n\t\t\tdefault: 'auto',\n\t\t\ttype: String,\n\t\t},\n\t\tminHeight: {\n\t\t\tdefault: '0.5rem',\n\t\t\ttype: String,\n\t\t},\n\t\tmultiselect: {\n\t\t\tdefault: false,\n\t\t\ttype: Boolean,\n\t\t},\n\t\tselectAll: {\n\t\t\tdefault: false,\n\t\t\ttype: Boolean,\n\t\t},\n\t\toptions: {\n\t\t\tdefault: () => [],\n\t\t\ttype: Array,\n\t\t},\n\t\tprop: {\n\t\t\tdefault: '',\n\t\t\ttype: String,\n\t\t},\n\t\ttransitionName: {\n\t\t\tdefault: '',\n\t\t\ttype: String,\n\t\t},\n\t\ttransitionMode: {\n\t\t\tdefault: 'out-in',\n\t\t\ttype: String,\n\t\t},\n\t\tvalue: null,\n\t},\n\twatch: {\n\t\tmultiselect,\n\t},\n};\n</script>\n<style lang=\"scss\">\n.dl-main-container {\n\tposition: relative;\n}\n\n.dl-select-container {\n\tdisplay: flex;\n\n\t.dl-items-container {\n\t\tdisplay: flex;\n\t\tflex: 1 1 auto;\n\t}\n\n\t.dl-activator-icons-container {\n\t\tdisplay: flex;\n\t\tjustify-self: flex-end;\n\t\t.dl-activator-icons {\n\t\t\talign-items: center;\n\t\t\tdisplay: flex;\n\t\t}\n\t}\n}\n.dl-icon-menu {\n\tcursor: pointer;\n\tmax-width: fit-content;\n\ttransform-origin: center;\n\ttransition: transform 0.175s linear;\n}\n\n.dl-multi-select-menu {\n\tbackground-color: white;\n\tbox-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n\tdisplay: block;\n\tleft: 0;\n\tmargin: 0.25rem 0 0;\n\tmin-width: 10rem;\n\toverflow: auto;\n\tpadding: 0.5rem 0;\n\tposition: absolute;\n\ttransition: display 1s ease-in;\n\ttext-align: center;\n\tlist-style: none;\n\tz-index: 99;\n}\n</style>\n",".dl-main-container {\n  position: relative;\n}\n\n.dl-select-container {\n  display: flex;\n}\n.dl-select-container .dl-items-container {\n  display: flex;\n  flex: 1 1 auto;\n}\n.dl-select-container .dl-activator-icons-container {\n  display: flex;\n  justify-self: flex-end;\n}\n.dl-select-container .dl-activator-icons-container .dl-activator-icons {\n  align-items: center;\n  display: flex;\n}\n\n.dl-icon-menu {\n  cursor: pointer;\n  max-width: fit-content;\n  transform-origin: center;\n  transition: transform 0.175s linear;\n}\n\n.dl-multi-select-menu {\n  background-color: white;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  display: block;\n  left: 0;\n  margin: 0.25rem 0 0;\n  min-width: 10rem;\n  overflow: auto;\n  padding: 0.5rem 0;\n  position: absolute;\n  transition: display 1s ease-in;\n  text-align: center;\n  list-style: none;\n  z-index: 99;\n}\n\n/*# sourceMappingURL=multiselect-dl.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

var install = function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component(__vue_component__.name, __vue_component__);
};

__vue_component__.install = install;

var plugin = {
	install: install,
};

var GlobalVue = null;

if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin);
}

export default __vue_component__;
