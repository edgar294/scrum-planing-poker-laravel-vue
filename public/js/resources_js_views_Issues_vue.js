(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Issues_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Issues.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Issues.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      isBusy: true,
      bussyMessage: 'Loading...',
      fields: [{
        key: 'id',
        label: 'Number',
        sortable: true
      }, {
        key: 'name',
        label: 'Name',
        sortable: false
      }, {
        key: 'status',
        label: 'Status',
        sortable: true
      }, {
        key: 'options',
        label: 'Join',
        variant: 'success'
      }, {
        key: 'show_details',
        label: 'Joined',
        variant: 'success'
      }],
      issues: []
    };
  },
  methods: {
    getVote: function getVote(vote, issueStatus) {
      if (issueStatus === 'reveal') {
        if (vote === null) {
          return 'User has not voted';
        } else {
          return vote.value;
        }
      } else {
        return 'Secret';
      }
    },
    fetchIssues: function fetchIssues() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var vm, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vm = _this;
                vm.isBusy = true;
                _context.next = 4;
                return axios.get('/get/issues');

              case 4:
                res = _context.sent;
                vm.issues = res.data;
                vm.isBusy = false;

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    JoinInRoom: function JoinInRoom(id) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var _vm, response;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _vm = _this2;
                _vm.bussyMessage = 'Joining...';
                _vm.isBusy = true;
                _context2.next = 6;
                return axios.post('/issue/join', {
                  issue: id
                });

              case 6:
                response = _context2.sent;
                if (response.data.success) _vm.$router.push({
                  name: 'poker-room',
                  params: {
                    issueId: id
                  }
                });else alert('something went wrong: ' + response.data.error);
                _vm.isBusy = false;
                _context2.next = 15;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                alert('something went wrong: ' + _context2.t0);
                vm.isBusy = false;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }))();
    },
    variantVote: function variantVote(vote, issueStatus) {
      if (issueStatus == 'reveal') {
        if (vote === null) {
          return 'danger';
        } else if (vote.value >= 0) {
          return 'success';
        } else {
          return 'warning';
        }
      } else {
        return 'dark';
      }
    },
    test: function test() {
      console.log('example');
    }
  },
  created: function created() {
    var vm = this;
    vm.$eventBus.$on('issue-registered', function (issue) {
      vm.issues.push(issue);
    });
  },
  mounted: function mounted() {
    var vm = this;
    vm.fetchIssues();
  }
});

/***/ }),

/***/ "./resources/js/views/Issues.vue":
/*!***************************************!*\
  !*** ./resources/js/views/Issues.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Issues_vue_vue_type_template_id_0d903f99___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Issues.vue?vue&type=template&id=0d903f99& */ "./resources/js/views/Issues.vue?vue&type=template&id=0d903f99&");
/* harmony import */ var _Issues_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Issues.vue?vue&type=script&lang=js& */ "./resources/js/views/Issues.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _Issues_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _Issues_vue_vue_type_template_id_0d903f99___WEBPACK_IMPORTED_MODULE_0__.render,
  _Issues_vue_vue_type_template_id_0d903f99___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Issues.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Issues.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ./resources/js/views/Issues.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Issues_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Issues.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Issues.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Issues_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/views/Issues.vue?vue&type=template&id=0d903f99&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Issues.vue?vue&type=template&id=0d903f99& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Issues_vue_vue_type_template_id_0d903f99___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Issues_vue_vue_type_template_id_0d903f99___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Issues_vue_vue_type_template_id_0d903f99___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Issues.vue?vue&type=template&id=0d903f99& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Issues.vue?vue&type=template&id=0d903f99&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Issues.vue?vue&type=template&id=0d903f99&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Issues.vue?vue&type=template&id=0d903f99& ***!
  \*************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container row" }, [
    _c("div", { staticClass: "col-12 col-md-8" }, [
      _c("div", { staticClass: "card card-default" }, [
        _vm._m(0),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "card-body" },
          [
            _c("register-issue"),
            _vm._v(" "),
            _c("b-table", {
              attrs: {
                striped: "",
                hover: "",
                items: _vm.issues,
                fields: _vm.fields,
                busy: _vm.isBusy
              },
              scopedSlots: _vm._u([
                {
                  key: "table-busy",
                  fn: function() {
                    return [
                      _c(
                        "div",
                        { staticClass: "text-center text-danger my-2" },
                        [
                          _c("b-spinner", { staticClass: "align-middle" }),
                          _vm._v(" "),
                          _c("strong", [_vm._v(_vm._s(_vm.bussyMessage))])
                        ],
                        1
                      )
                    ]
                  },
                  proxy: true
                },
                {
                  key: "cell(id)",
                  fn: function(data) {
                    return [
                      _vm._v(
                        "\n                        #" +
                          _vm._s(data.index + 1) +
                          "\n                    "
                      )
                    ]
                  }
                },
                {
                  key: "cell(options)",
                  fn: function(data) {
                    return [
                      _c(
                        "b-button",
                        {
                          attrs: { variant: "success" },
                          on: {
                            click: function($event) {
                              return _vm.JoinInRoom(data.item.id)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n                            Join!\n                        "
                          )
                        ]
                      )
                    ]
                  }
                },
                {
                  key: "cell(show_details)",
                  fn: function(row) {
                    return [
                      _c(
                        "b-button",
                        {
                          staticClass: "mr-2",
                          attrs: { size: "sm" },
                          on: { click: row.toggleDetails }
                        },
                        [
                          _vm._v(
                            "\n                            " +
                              _vm._s(row.detailsShowing ? "Hide" : "Show") +
                              " Users\n                        "
                          )
                        ]
                      )
                    ]
                  }
                },
                {
                  key: "row-details",
                  fn: function(row) {
                    return [
                      _c("b-table", {
                        attrs: {
                          striped: "",
                          hover: "",
                          items: row.item.users,
                          fields: ["name", "vote"],
                          "table-variant": "primary"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "cell(vote)",
                              fn: function(data) {
                                return [
                                  _c(
                                    "b-badge",
                                    {
                                      attrs: {
                                        variant: _vm.variantVote(
                                          data.item.vote,
                                          row.item.status
                                        )
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(
                                            _vm.getVote(
                                              data.item.vote,
                                              row.item.status
                                            )
                                          ) +
                                          "\n                                "
                                      )
                                    ]
                                  )
                                ]
                              }
                            }
                          ],
                          null,
                          true
                        )
                      })
                    ]
                  }
                }
              ])
            })
          ],
          1
        )
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-12 col-md-4" }, [
      _c(
        "div",
        { staticClass: "card card-default" },
        [_vm._m(1), _vm._v(" "), _c("public-chat")],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header text-center" }, [
      _c("h1", [_vm._v("♠ Issue List ♠")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "card-header text-center" }, [
      _c("h1", [_vm._v("♠ Global Chat ♠")])
    ])
  }
]
render._withStripped = true



/***/ })

}]);