(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23d4c33a"],{"1f75":function(e,r,t){"use strict";var n=t("1da1"),a=(t("96cf"),t("d3b7"),t("6062"),t("3ca3"),t("ddb0"),t("caad"),t("2532"),t("99af"),t("25f0"),t("cee4")),o=t("2295"),c=t("5530"),s=(t("a9e3"),t("b680"),t("159b"),t("3ef4")),u=t("e466"),i=t("2ef0"),l=t.n(i),d=25,f=function(e){var r=1e3*Number((e.length/d).toFixed(3));return r<3e3?3e3:r>8e3?8e3:r},p=function(e){var r=!e||Object(i["isString"])(e)||Object(i["isFunction"])(e)?{message:e}:e;return r},b=function(e){var r=p(e),t=r.message,n=r.duration,a=r.showClose,o=r.type,u=n||t&&f(t)||void 0,i=a||"error"===o;return Object(s["a"])(Object(c["a"])(Object(c["a"])({},e),{},{duration:u,showClose:i}))};u["d"].forEach((function(e){b[e]=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=p(r);return b(Object(c["a"])(Object(c["a"])({},t),{},{type:e}))}}));var g=b,m=t("323e"),v=t.n(m),O=(t("a5d8"),t("afbc")),h=t("0613"),E=t("2fc2"),w="BAD_TOKEN",R="TOKEN_TIME_OUT",j="BAD_USERNAME_OR_PWD",_=t("88c3");v.a.configure({showSpinner:!1,trickleSpeed:200});var k=new Set,T=function(){return k=new Set};Object.assign(a["a"].defaults,{baseURL:E["b"],timeout:2e4}),a["a"].interceptors.request.use((function(e){var r=h["a"].state.user;e.headers={Authorization:"Bearer "+r.token};var t=new AbortController;return e.signal=t.signal,e.controller=t,h["a"].commit("ADD_ABORT_CONTROLLER",t),e}),(function(e){Promise.reject(e)})),a["a"].interceptors.request.use(function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r.doNotTriggerProgress){e.next=4;break}return h["a"].state.request_queue||v.a.start(),e.next=4,h["a"].dispatch("SET_REQ_CHANGE",!0);case 4:return e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}());var C=function(e,r){return 401===e&&[w,R].includes(r.code)},N=function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.text();case 3:return t=e.sent,e.abrupt("return",JSON.parse(t));case 7:return e.prev=7,e.t0=e["catch"](0),e.abrupt("return",{});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(r){return e.apply(this,arguments)}}();function x(){return A.apply(this,arguments)}function A(){return A=Object(n["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,h["a"].dispatch("SET_REQ_CHANGE",!1);case 2:r=h["a"].state.request_queue,r>0?v.a.inc():v.a.done();case 4:case"end":return e.stop()}}),e)}))),A.apply(this,arguments)}a["a"].interceptors.response.use((function(e){if(e.config.doNotTriggerProgress||x(),e.data instanceof Blob)return e;var r=e.config.controller;return h["a"].commit("REMOVE_ABORT_CONTROLLER",r),e.data||e.status}),function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(r){var t,n,a,c,s,u,i,d,f,p,b;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r.config.doNotTriggerProgress||x(),!r.response){e.next=20;break}if(!(r.response.data instanceof Blob)){e.next=6;break}return e.next=5,N(r.response.data);case 5:r.response.data=e.sent;case 6:if(t=r.response,n=t.data,a=t.status,k.has(a)){e.next=18;break}if(k.add(a),s=401===a&&h["a"].state.afterCurrentUserPwdChanged,!C(a,n)){e.next=15;break}return s?h["a"].commit("SET_AFTER_CURRENT_USER_PWD_CHANGED",!1):o["a"].error(_["a"].global.t("Base.tokenExpiredMsg")),Object(O["c"])(),window.setTimeout(T,1e3),e.abrupt("return",Promise.reject(r));case 15:u=(null===(c=r.config)||void 0===c?void 0:c.errorsHandleCustom)&&Array.isArray(r.config.errorsHandleCustom)&&r.config.errorsHandleCustom.includes(a),u||((null===n||void 0===n?void 0:n.code)===j?o["a"].error(_["a"].global.t("Base.namePwdError")):null!==n&&void 0!==n&&n.code||null!==n&&void 0!==n&&n.message?g.error("".concat(a," ").concat(null!==(i=null===n||void 0===n?void 0:n.code)&&void 0!==i?i:"",": ").concat(null!==(d=null===n||void 0===n||null===(f=n.message)||void 0===f?void 0:f.toString())&&void 0!==d?d:"")):g.error(a+" Network error")),401===a&&Object(O["c"])();case 18:e.next=24;break;case 20:if(p=r.code===E["F"]&&r.config.handleTimeoutSelf,"ERR_CANCELED"!==r.code||"canceled"!==r.message){e.next=23;break}return e.abrupt("return");case 23:k.has(0)||(p||g.error(_["a"].global.t("Base.networkError")),k.add(0));case 24:return 0===h["a"].state.request_queue&&(k=new Set),l.a.throttle(T,2e3,{trailing:!1}),b=r.config.controller,h["a"].commit("REMOVE_ABORT_CONTROLLER",b),e.abrupt("return",Promise.reject(r));case 29:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}());r["a"]=a["a"]},"9ee5":function(e,r,t){"use strict";t.d(r,"a",(function(){return n}));var n=(e,r)=>{const t=e.__vccOpts||e;for(const[n,a]of r)t[n]=a;return t}},be20:function(e,r,t){"use strict";t("c8c3")},c8c3:function(e,r,t){},fc54:function(e,r,t){"use strict";var n=t("5530"),a=t("7a23"),o={class:"pre-with-ellipsis"},c={class:"placeholder"},s=Object(a["defineComponent"])({name:"PreWithEllipsis"}),u=Object(a["defineComponent"])(Object(n["a"])(Object(n["a"])({},s),{},{setup:function(e){return function(e,r){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",o,[Object(a["createElementVNode"])("p",c,[Object(a["renderSlot"])(e.$slots,"default")]),Object(a["createElementVNode"])("pre",null,[Object(a["renderSlot"])(e.$slots,"default")])])}}}));t("be20");const i=u;r["a"]=i}}]);