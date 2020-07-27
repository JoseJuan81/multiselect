'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var functionallibrary = require('functionallibrary');

var Selector = function Selector(prop) {
	this.prop = prop;
	this.selected = [];
};

Selector.prototype.clearSelection = function clearSelection () {
	this.selected = [];
	return this.selected;
};

Selector.prototype.isSelected = function isSelected (item) {
	return Boolean(functionallibrary.find(functionallibrary.equality(item), this.selected));
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
		this.selected = flagAll ? functionallibrary.map(functionallibrary.setNewProperty('isSelected', true), options) : [];
		return this.selected;
	};

	MultiSelectorOfObjects.prototype.removeItem = function removeItem (item) {
		var this$1 = this;

		return this.selected.filter(function (itemSelected) { return itemSelected[this$1.prop] !== item[this$1.prop]; });
	};

	MultiSelectorOfObjects.prototype.selection = function selection (item) {
		var newItem = functionallibrary.setNewProperty('isSelected', !item.isSelected)(item);
		this.selected = newItem.isSelected ? this.addItem(newItem) : this.removeItem(newItem);
		return this.selected;
	};

	MultiSelectorOfObjects.prototype.isSelected = function isSelected (item) {
		return Boolean(functionallibrary.find(functionallibrary.equality(this.prop, item[this.prop]), this.selected));
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
		var exist = functionallibrary.find(functionallibrary.equality(item), this.selected);
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
		var newItem = functionallibrary.setNewProperty('isSelected', !item.isSelected)(item);
		this.selected = newItem.isSelected ? [newItem] : [];
		return this.selected;
	};

	SimpleSelectorOfObjects.prototype.isSelected = function isSelected (item) {
		return Boolean(functionallibrary.find(functionallibrary.equality(this.prop, item[this.prop]), this.selected));
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
	this.pageHeight = pageHeight;
	this.multiselect = multiselectNode;
	this.menu = multiselectMenuNode;
	this.menuInitHeight = this.menu.offsetHeight;
	this.menuItemHeight = multiselectMenuNode.children[0].offsetHeight;
	this.menuMinHeight = this.menuItemHeight * 4;
	this.remainHeight = this.pageHeight - (this.multiselectOffsetTop + this.multiselectHeight + 20);
};

var prototypeAccessors = { multiselectOffsetTop: { configurable: true },multiselectHeight: { configurable: true },menuTop: { configurable: true },menuHeight: { configurable: true } };

prototypeAccessors.multiselectOffsetTop.get = function () {
	return this.multiselect.offsetTop;
};

prototypeAccessors.multiselectHeight.get = function () {
	return this.multiselect.offsetHeight;
};

prototypeAccessors.menuTop.get = function () {
	var lessThanMinHeight = this.remainHeight <= this.menuMinHeight;
	var lessThanInitHeight = this.remainHeight <= this.menuInitHeight;
	return lessThanMinHeight && lessThanInitHeight;
};

prototypeAccessors.menuHeight.get = function () {
	if (this.menuTop) {
		return 'auto';
	}
	if (this.menuInitHeight < this.remainHeight) {
		return this.menuInitHeight;
	}
	return ((this.menuMinHeight) + "px");
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
	var menuLocation = new MenuLocation(pageHeight, multiselectContainer, multiselectMenu);
	multiselectMenu.style.height = menuLocation.menuHeight;
	if (menuLocation.menuTop) {
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

	return functionallibrary.map(
		functionallibrary.setNewProperty(
			'isSelected',
			function (o) { return Boolean(
				functionallibrary.find(
					functionallibrary.equality(
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

function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        { return function () { }; }
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: function () { return context._renderStyles(context._styles); }
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return function (id, style) { return addStyle(id, style, context); };
}
function addStyle(id, css, context) {
    var group = process.env.NODE_ENV === 'production' ? css.media || 'default' : id;
    var style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        var code = css.source;
        if (process.env.NODE_ENV !== 'production' && css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    Buffer.from(unescape(encodeURIComponent(JSON.stringify(css.map)))).toString('base64') +
                    ' */';
        }
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    var css = '';
    for (var key in styles) {
        var style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
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
      staticClass: "relative",
      style: "min-height:" + _vm.minHeight + ";",
      on: {
        click: function($event) {
          $event.stopPropagation();
          return _vm.toogleMenu($event)
        }
      }
    },
    [
      _vm._ssrNode(
        '<div class="flex-display w-full items-center justify-between">',
        "</div>",
        [
          _vm._ssrNode(
            '<div data-cy="tags" class="flex-display flex-initial flex-wrap">',
            "</div>",
            [
              _vm._ssrNode('<input type="text" class="hidden-input"> '),
              _vm._l(_vm.value, function(tag, index) {
                return _vm._ssrNode(
                  '<span class="flex-display items-center">',
                  "</span>",
                  [
                    _vm._t("tag", null, { tag: tag, removeIt: _vm.addOrRemove })
                  ],
                  2
                )
              })
            ],
            2
          ),
          _vm._ssrNode(" "),
          _vm._ssrNode(
            '<div class="flex-display flex-auto justify-end">',
            "</div>",
            [
              _vm._ssrNode(
                '<div class="flex-display items-center">',
                "</div>",
                [
                  _vm.clearable
                    ? _vm._ssrNode(
                        '<div data-cy="clearable">',
                        "</div>",
                        [_vm._t("close-icon")],
                        2
                      )
                    : _vm._e(),
                  _vm._ssrNode(" "),
                  _vm._ssrNode(
                    '<div class="icon-menu"' +
                      _vm._ssrStyle(
                        null,
                        "transform:rotateZ(" +
                          (_vm.showMenu ? "180deg" : "0deg") +
                          ")",
                        null
                      ) +
                      ">",
                    "</div>",
                    [_vm._t("icon", null, { showMenu: _vm.showMenu })],
                    2
                  )
                ],
                2
              )
            ]
          )
        ],
        2
      ),
      _vm._ssrNode(" "),
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
                    staticClass: "multi-select-menu",
                    style: "max-height:" + _vm.menuMaxHeight,
                    attrs: { "data-cy": "multiselect-menu" }
                  },
                  [
                    _vm.selectAll
                      ? _c(
                          "li",
                          {
                            staticClass: "menu-list",
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
                          staticClass: "menu-list",
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
    2
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-594baad3_0", { source: ".relative[data-v-594baad3] {\n  position: relative;\n}\n.w-full[data-v-594baad3] {\n  width: 100%;\n}\n.flex-display[data-v-594baad3] {\n  display: flex;\n}\n.flex-initial[data-v-594baad3] {\n  flex: 0 1 auto;\n}\n.flex-wrap[data-v-594baad3] {\n  flex-wrap: wrap;\n}\n.flex-auto[data-v-594baad3] {\n  flex: 1 1 auto;\n}\n.items-center[data-v-594baad3] {\n  align-items: center;\n}\n.justify-between[data-v-594baad3] {\n  justify-content: space-between;\n}\n.text-right[data-v-594baad3] {\n  text-align: right;\n}\n.icon-menu[data-v-594baad3] {\n  cursor: pointer;\n  max-width: fit-content;\n  transform-origin: center;\n  transition: transform 0.175s linear;\n}\n.multi-select-menu[data-v-594baad3] {\n  background-color: white;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  display: block;\n  left: 0;\n  margin: 0.25rem 0 0;\n  min-width: 10rem;\n  overflow: auto;\n  padding: 0.5rem 0;\n  position: absolute;\n  transition: display 1s ease-in;\n  text-align: center;\n  list-style: none;\n  z-index: 99;\n}\n.hidden-input[data-v-594baad3] {\n  border: 0;\n  margin: 0;\n  padding: 0;\n  width: 0;\n}\n\n/*# sourceMappingURL=multiselect-dl.vue.map */", map: {"version":3,"sources":["/Users/frontend/Documents/JJ/dl-components/my-components/multiselect-dl/src/components/multiselect-dl.vue","multiselect-dl.vue"],"names":[],"mappings":"AA6RA;EACA,kBAAA;AC5RA;AD8RA;EACA,WAAA;AC3RA;AD6RA;EACA,aAAA;AC1RA;AD4RA;EACA,cAAA;ACzRA;AD2RA;EACA,eAAA;ACxRA;AD0RA;EACA,cAAA;ACvRA;ADyRA;EACA,mBAAA;ACtRA;ADwRA;EACA,8BAAA;ACrRA;ADuRA;EACA,iBAAA;ACpRA;ADsRA;EACA,eAAA;EACA,sBAAA;EACA,wBAAA;EACA,mCAAA;ACnRA;ADsRA;EACA,uBAAA;EACA,mFAAA;EACA,cAAA;EACA,OAAA;EACA,mBAAA;EACA,gBAAA;EACA,cAAA;EACA,iBAAA;EACA,kBAAA;EACA,8BAAA;EACA,kBAAA;EACA,gBAAA;EACA,WAAA;ACnRA;ADsRA;EACA,SAAA;EACA,SAAA;EACA,UAAA;EACA,QAAA;ACnRA;;AAEA,6CAA6C","file":"multiselect-dl.vue","sourcesContent":["<template>\n\t<div\n\t\tclass=\"relative\"\n\t\tref=\"multiselect\"\n\t\t:style=\"`min-height:${minHeight};`\"\n\t\t@click.stop=\"toogleMenu\"\n\t>\n\t\t<div class=\"flex-display w-full items-center justify-between\">\n\t\t\t<div\n\t\t\t\tdata-cy=\"tags\"\n\t\t\t\tclass=\"flex-display flex-initial flex-wrap\"\n\t\t\t>\n\t\t\t\t<input type=\"text\" ref=\"input\" class=\"hidden-input\"\n\t\t\t\t\t@keydown.enter=\"selectingItem\"\n\t\t\t\t\t@keydown.down=\"updateHoverIndex(1)\"\n\t\t\t\t\t@keydown.up=\"updateHoverIndex(-1)\"\n\t\t\t\t\t@keydown.esc=\"closeMenu\"\n\t\t\t\t>\n\t\t\t\t<span\n\t\t\t\t\tclass=\"flex-display items-center\"\n\t\t\t\t\tv-for=\"(tag, index) in value\"\n\t\t\t\t\t:key=\"index\"\n\t\t\t\t>\n\t\t\t\t\t<slot name=\"tag\" :tag=\"tag\" :removeIt=\"addOrRemove\"></slot>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div class=\"flex-display flex-auto justify-end\">\n\t\t\t\t<div class=\"flex-display items-center\">\n\t\t\t\t\t<div data-cy=\"clearable\" @click.stop=\"clearAction\" v-if=\"clearable\">\n\t\t\t\t\t\t<slot name=\"close-icon\"></slot>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"icon-menu\" :style=\"`transform:rotateZ(${showMenu ? '180deg' : '0deg'})`\">\n\t\t\t\t\t\t<slot name=\"icon\" :show-menu=\"showMenu\"></slot>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<transition :name=\"transitionName\" :mode=\"transitionMode\">\n\t\t\t<div v-if=\"showMenu\">\n\t\t\t\t<ul\n\t\t\t\t\tdata-cy=\"multiselect-menu\"\n\t\t\t\t\tref=\"multiselect-menu\"\n\t\t\t\t\tclass=\"multi-select-menu\"\n\t\t\t\t\t:style=\"`max-height:${menuMaxHeight}`\"\n\t\t\t\t>\n\t\t\t\t\t<li\n\t\t\t\t\t\tv-if=\"selectAll\"\n\t\t\t\t\t\tdata-cy=\"selectAll\"\n\t\t\t\t\t\tclass=\"menu-list\"\n\t\t\t\t\t\t@click.stop=\"onSelectAll\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<slot name=\"select-all-items\" :is-selected=\"allIsSelected\"></slot>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li\n\t\t\t\t\t\tv-for=\"(option, indexO) in optionComputed\"\n\t\t\t\t\t\t:key=\"indexO\"\n\t\t\t\t\t\tclass=\"menu-list\"\n\t\t\t\t\t\t@click.stop=\"addOrRemove(option)\"\n\t\t\t\t\t>\n\t\t\t\t\t\t<slot\n\t\t\t\t\t\t\tname=\"menu\"\n\t\t\t\t\t\t\t:menu-item=\"option\"\n\t\t\t\t\t\t\t:is-hovered=\"indexO === hoverIndex\"\n\t\t\t\t\t\t\t:index-item=\"indexO\"\n\t\t\t\t\t\t\t:selected=\"itemSelected(option)\"></slot>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</transition>\n\t</div>\n</template>\n\n<script>\nimport {\n\tequality, find, map, setNewProperty,\n} from 'functionallibrary';\nimport InstanceSelection from '../class';\nimport MenuLocation from '../class/menuLocation';\n\nfunction mounted() {\n\tconst self = this;\n\tdocument.addEventListener('click', () => {\n\t\tif (self.showMenu) {\n\t\t\tself.hideMenu();\n\t\t}\n\t});\n}\n\nfunction hideMenu() {\n\tthis.showMenu = false;\n}\n\nfunction toogleMenu() {\n\tthis.showMenu = !this.showMenu;\n\tif (this.showMenu) {\n\t\tthis.$refs.input.focus();\n\t\tthis.$nextTick(() => {\n\t\t\tthis.checkPageBottom();\n\t\t\tthis.setHoverIndex(0);\n\t\t});\n\t}\n}\n\nfunction checkPageBottom() {\n\tconst pageHeight = window.innerHeight;\n\tconst multiselectContainer = this.$refs.multiselect;\n\tconst multiselectMenu = this.$refs['multiselect-menu'];\n\tconst menuLocation = new MenuLocation(pageHeight, multiselectContainer, multiselectMenu);\n\tmultiselectMenu.style.height = menuLocation.menuHeight;\n\tif (menuLocation.menuTop) {\n\t\tmultiselectMenu.style.bottom = '105%';\n\t} else {\n\t\tmultiselectMenu.style.top = '100%';\n\t}\n}\n\nfunction optionComputed() {\n\tconst sample = this.options[0];\n\tconst typeObject = typeof sample === 'object';\n\tif (typeObject) {\n\t\treturn this.objectsInOptions;\n\t}\n\treturn this.noObjectsInOptions;\n}\n\nfunction noObjectsInOptions() {\n\treturn this.options;\n}\n\nfunction objectsInOptions() {\n\tif (this.multiselect) {\n\t\treturn this.value && this.value.length ? this.selectingOptions : this.options;\n\t}\n\treturn this.value ? this.selectingOptions : this.options;\n}\n\nfunction selectingOptions() {\n\treturn map(\n\t\tsetNewProperty(\n\t\t\t'isSelected',\n\t\t\to => Boolean(\n\t\t\t\tfind(\n\t\t\t\t\tequality(\n\t\t\t\t\t\tthis.prop, o[this.prop],\n\t\t\t\t\t),\n\t\t\t\t\tthis.value,\n\t\t\t\t),\n\t\t\t),\n\t\t),\n\t\tthis.options,\n\t);\n}\n\nfunction addOrRemove(item) {\n\tthis.selected = this.SelectorInstance.selection(item);\n\tthis.emitInputEvent();\n}\n\nfunction clearAction() {\n\tthis.selected = this.SelectorInstance.clearSelection();\n\tthis.emitInputEvent();\n}\n\nfunction emitInputEvent() {\n\tthis.$emit('input', [...this.selected]);\n}\n\nfunction onSelectAll() {\n\tthis.allFlag = !this.allFlag;\n\tthis.selected = this.SelectorInstance.addOrRemoveEveryThing(this.allFlag, this.optionComputed);\n\tthis.emitInputEvent();\n}\n\nfunction allIsSelected() {\n\treturn this.selected.length === this.options.length;\n}\n\nfunction itemSelected(item) {\n\treturn this.SelectorInstance.isSelected(item);\n}\n\nfunction multiselect(newVal) {\n\tthis.SelectorInstance = InstanceSelection(newVal, this.options[0], this.prop);\n}\n\nfunction setHoverIndex(index) {\n\tthis.hoverIndex = index;\n}\n\nfunction updateHoverIndex(k) {\n\tconst last = this.options.length;\n\tlet newIndex = this.hoverIndex + k;\n\tnewIndex = newIndex < 0 ? last - 1 : newIndex;\n\tthis.hoverIndex = newIndex % last;\n}\n\nfunction selectingItem() {\n\tconst currentItem = this.optionComputed[this.hoverIndex];\n\tthis.addOrRemove(currentItem);\n}\n\nfunction closeMenu() {\n\tthis.showMenu = false;\n}\n\nfunction data() {\n\treturn {\n\t\tallFlag: false,\n\t\thoverIndex: null,\n\t\tSelectorInstance: InstanceSelection(this.multiselect, this.options[0], this.prop),\n\t\tselected: [],\n\t\tshowMenu: false,\n\t};\n}\n\nexport default {\n\tname: 'multiselect-dl',\n\tcomputed: {\n\t\tallIsSelected,\n\t\tobjectsInOptions,\n\t\toptionComputed,\n\t\tnoObjectsInOptions,\n\t\tselectingOptions,\n\t},\n\tdata,\n\tmethods: {\n\t\taddOrRemove,\n\t\tclearAction,\n\t\tcloseMenu,\n\t\tcheckPageBottom,\n\t\temitInputEvent,\n\t\thideMenu,\n\t\titemSelected,\n\t\tonSelectAll,\n\t\tselectingItem,\n\t\tsetHoverIndex,\n\t\ttoogleMenu,\n\t\tupdateHoverIndex,\n\t},\n\tmounted,\n\tprops: {\n\t\tclearable: {\n\t\t\tdefault: false,\n\t\t\ttype: Boolean,\n\t\t},\n\t\tmenuMaxHeight: {\n\t\t\tdefault: 'auto',\n\t\t\ttype: String,\n\t\t},\n\t\tminHeight: {\n\t\t\tdefault: '0.5rem',\n\t\t\ttype: String,\n\t\t},\n\t\tmultiselect: {\n\t\t\tdefault: false,\n\t\t\ttype: Boolean,\n\t\t},\n\t\tselectAll: {\n\t\t\tdefault: false,\n\t\t\ttype: Boolean,\n\t\t},\n\t\toptions: {\n\t\t\tdefault: () => [],\n\t\t\ttype: Array,\n\t\t},\n\t\tprop: {\n\t\t\tdefault: '',\n\t\t\ttype: String,\n\t\t},\n\t\ttransitionName: {\n\t\t\tdefault: '',\n\t\t\ttype: String,\n\t\t},\n\t\ttransitionMode: {\n\t\t\tdefault: 'out-in',\n\t\t\ttype: String,\n\t\t},\n\t\tvalue: null,\n\t},\n\twatch: {\n\t\tmultiselect,\n\t},\n};\n</script>\n<style lang=\"scss\" scoped>\n.relative {\n\tposition: relative;\n}\n.w-full {\n\twidth: 100%;\n}\n.flex-display {\n\tdisplay: flex;\n}\n.flex-initial {\n\tflex: 0 1 auto;\n}\n.flex-wrap {\n\tflex-wrap: wrap;\n}\n.flex-auto {\n\tflex: 1 1 auto;\n}\n.items-center {\n\talign-items: center;\n}\n.justify-between {\n\tjustify-content: space-between;\n}\n.text-right {\n\ttext-align: right;\n}\n.icon-menu {\n\tcursor: pointer;\n\tmax-width: fit-content;\n\ttransform-origin: center;\n\ttransition: transform 0.175s linear;\n}\n\n.multi-select-menu {\n\tbackground-color: white;\n\tbox-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n\tdisplay: block;\n\tleft: 0;\n\tmargin: 0.25rem 0 0;\n\tmin-width: 10rem;\n\toverflow: auto;\n\tpadding: 0.5rem 0;\n\tposition: absolute;\n\ttransition: display 1s ease-in;\n\ttext-align: center;\n\tlist-style: none;\n\tz-index: 99;\n}\n\n.hidden-input {\n\tborder: 0;\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 0;\n}\n</style>\n",".relative {\n  position: relative;\n}\n\n.w-full {\n  width: 100%;\n}\n\n.flex-display {\n  display: flex;\n}\n\n.flex-initial {\n  flex: 0 1 auto;\n}\n\n.flex-wrap {\n  flex-wrap: wrap;\n}\n\n.flex-auto {\n  flex: 1 1 auto;\n}\n\n.items-center {\n  align-items: center;\n}\n\n.justify-between {\n  justify-content: space-between;\n}\n\n.text-right {\n  text-align: right;\n}\n\n.icon-menu {\n  cursor: pointer;\n  max-width: fit-content;\n  transform-origin: center;\n  transition: transform 0.175s linear;\n}\n\n.multi-select-menu {\n  background-color: white;\n  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n  display: block;\n  left: 0;\n  margin: 0.25rem 0 0;\n  min-width: 10rem;\n  overflow: auto;\n  padding: 0.5rem 0;\n  position: absolute;\n  transition: display 1s ease-in;\n  text-align: center;\n  list-style: none;\n  z-index: 99;\n}\n\n.hidden-input {\n  border: 0;\n  margin: 0;\n  padding: 0;\n  width: 0;\n}\n\n/*# sourceMappingURL=multiselect-dl.vue.map */"]}, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-594baad3";
  /* module identifier */
  var __vue_module_identifier__ = "data-v-594baad3";
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    createInjectorSSR,
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

exports.default = __vue_component__;
