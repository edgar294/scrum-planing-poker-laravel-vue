(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_PokerRoom_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PokerRoom.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PokerRoom.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************/
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['issueId'],
  data: function data() {
    return {
      user: {},
      issue: {
        users: {}
      },
      alertConfig: {
        title: '12',
        body: '12',
        type: 'success',
        countdown: 0
      }
    };
  },
  methods: {
    // Fetch the info of the is passe by props
    // and setup it in the var issue of data
    fetchIssueInfo: function fetchIssueInfo() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var vm, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vm = _this;
                _context.prev = 1;
                _context.next = 4;
                return axios.get('/issue/' + vm.issueId);

              case 4:
                response = _context.sent;

                if (response.data.success) {
                  vm.issue = response.data.issue;
                } else {
                  alert('Something went wrong fetching the issue info');
                  vm.$router.go(-1);
                }

                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                alert('Something went wrong fetching the issue info');
                vm.$router.go(-1);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }))();
    }
  },
  created: function created() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      var vm;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              vm = _this2;
              _context2.next = 3;
              return vm.fetchIssueInfo();

            case 3:
              // whe suscribe to the envents of the event bus
              vm.$eventBus.$on('show-alert', function (data) {
                vm.showAlert(data.title, data.body, data.type);
              });
              vm.$eventBus.$on('issue-changed', function (issue) {
                vm.issue.status = issue.status;
              });
              vm.$eventBus.$on('add-user-to-issue', function (user) {
                vm.issue.users.push(user);
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  mounted: function mounted() {
    // Recover the user of the store and save it a local var
    var vm = this;
    vm.user = this.$store.state.user;
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    // Desuscribe of all the channels
    Echo.leave('IssueChannel.' + this.issueId);
    Echo.leave('RoomChannel.' + this.issueId);
    next();
  }
});

/***/ }),

/***/ "./resources/js/views/PokerRoom.vue":
/*!******************************************!*\
  !*** ./resources/js/views/PokerRoom.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PokerRoom_vue_vue_type_template_id_65d8e465___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PokerRoom.vue?vue&type=template&id=65d8e465& */ "./resources/js/views/PokerRoom.vue?vue&type=template&id=65d8e465&");
/* harmony import */ var _PokerRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PokerRoom.vue?vue&type=script&lang=js& */ "./resources/js/views/PokerRoom.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _PokerRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _PokerRoom_vue_vue_type_template_id_65d8e465___WEBPACK_IMPORTED_MODULE_0__.render,
  _PokerRoom_vue_vue_type_template_id_65d8e465___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/PokerRoom.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/PokerRoom.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/views/PokerRoom.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PokerRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PokerRoom.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PokerRoom.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PokerRoom_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/views/PokerRoom.vue?vue&type=template&id=65d8e465&":
/*!*************************************************************************!*\
  !*** ./resources/js/views/PokerRoom.vue?vue&type=template&id=65d8e465& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PokerRoom_vue_vue_type_template_id_65d8e465___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PokerRoom_vue_vue_type_template_id_65d8e465___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PokerRoom_vue_vue_type_template_id_65d8e465___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PokerRoom.vue?vue&type=template&id=65d8e465& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PokerRoom.vue?vue&type=template&id=65d8e465&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PokerRoom.vue?vue&type=template&id=65d8e465&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/PokerRoom.vue?vue&type=template&id=65d8e465& ***!
  \****************************************************************************************************************************************************************************************************************/
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
  return _c(
    "div",
    { staticClass: "container row" },
    [
      _c(
        "div",
        { staticClass: "row col-12" },
        [
          _c(
            "b-alert",
            {
              attrs: {
                show: "",
                variant: _vm.alertConfig.type,
                show: _vm.alertConfig.countdown
              }
            },
            [
              _c("h4", { staticClass: "alert-heading" }, [
                _vm._v(_vm._s(_vm.alertConfig.title))
              ]),
              _vm._v(" "),
              _c("hr"),
              _vm._v(" "),
              _c("p", [_vm._v(_vm._s(_vm.alertConfig.body))])
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("game-table", { attrs: { issue: _vm.issue, user: _vm.user } }),
      _vm._v(" "),
      _c("game-stats", { attrs: { issue: _vm.issue, user: _vm.user } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);