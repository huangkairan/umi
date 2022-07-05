(function(){"use strict";var e={980:function(e){var t=Object.prototype.hasOwnProperty;var n=Object.prototype.toString;var r=Object.defineProperty;var o=Object.getOwnPropertyDescriptor;var i=function isArray(e){if(typeof Array.isArray==="function"){return Array.isArray(e)}return n.call(e)==="[object Array]"};var u=function isPlainObject(e){if(!e||n.call(e)!=="[object Object]"){return false}var r=t.call(e,"constructor");var o=e.constructor&&e.constructor.prototype&&t.call(e.constructor.prototype,"isPrototypeOf");if(e.constructor&&!r&&!o){return false}var i;for(i in e){}return typeof i==="undefined"||t.call(e,i)};var a=function setProperty(e,t){if(r&&t.name==="__proto__"){r(e,t.name,{enumerable:true,configurable:true,value:t.newValue,writable:true})}else{e[t.name]=t.newValue}};var c=function getProperty(e,n){if(n==="__proto__"){if(!t.call(e,n)){return void 0}else if(o){return o(e,n).value}}return e[n]};e.exports=function extend(){var e,t,n,r,o,f;var l=arguments[0];var s=1;var p=arguments.length;var y=false;if(typeof l==="boolean"){y=l;l=arguments[1]||{};s=2}if(l==null||typeof l!=="object"&&typeof l!=="function"){l={}}for(;s<p;++s){e=arguments[s];if(e!=null){for(t in e){n=c(l,t);r=c(e,t);if(l!==r){if(y&&r&&(u(r)||(o=i(r)))){if(o){o=false;f=n&&i(n)?n:[]}else{f=n&&u(n)?n:{}}a(l,{name:t,newValue:extend(y,f,r)})}else if(typeof r!=="undefined"){a(l,{name:t,newValue:r})}}}}}return l}}};var t={};function __nccwpck_require__(n){var r=t[n];if(r!==undefined){return r.exports}var o=t[n]={exports:{}};var i=true;try{e[n](o,o.exports,__nccwpck_require__);i=false}finally{if(i)delete t[n]}return o.exports}!function(){__nccwpck_require__.d=function(e,t){for(var n in t){if(__nccwpck_require__.o(t,n)&&!__nccwpck_require__.o(e,n)){Object.defineProperty(e,n,{enumerable:true,get:t[n]})}}}}();!function(){__nccwpck_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}();!function(){__nccwpck_require__.r=function(e){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(e,"__esModule",{value:true})}}();if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n={};!function(){__nccwpck_require__.r(n);__nccwpck_require__.d(n,{default:function(){return rehypeAutolinkHeadings}});var e=__nccwpck_require__(980);var t={}.hasOwnProperty;function hasProperty(e,n){var r=n&&e&&typeof e==="object"&&e.type==="element"&&e.properties&&t.call(e.properties,n)&&e.properties[n];return r!==null&&r!==undefined&&r!==false}function headingRank(e){var t=e&&e.type==="element"&&e.tagName.toLowerCase()||"";var n=t.length===2&&t.charCodeAt(0)===104?t.charCodeAt(1):0;return n>48&&n<55?n-48:null}const isElement=function(e,t,n,r,o){const i=convertElement(t);if(n!==undefined&&n!==null&&(typeof n!=="number"||n<0||n===Number.POSITIVE_INFINITY)){throw new Error("Expected positive finite index for child node")}if(r!==undefined&&r!==null&&(!r.type||!r.children)){throw new Error("Expected parent node")}if(!e||!e.type||typeof e.type!=="string"){return false}if((r===undefined||r===null)!==(n===undefined||n===null)){throw new Error("Expected both parent and index")}return i.call(o,e,n,r)};const convertElement=function(e){if(e===undefined||e===null){return hast_util_is_element_element}if(typeof e==="string"){return tagNameFactory(e)}if(typeof e==="object"){return anyFactory(e)}if(typeof e==="function"){return castFactory(e)}throw new Error("Expected function, string, or array as test")};function anyFactory(e){const t=[];let n=-1;while(++n<e.length){t[n]=convertElement(e[n])}return castFactory(any);function any(...e){let n=-1;while(++n<t.length){if(t[n].call(this,...e)){return true}}return false}}function tagNameFactory(e){return tagName;function tagName(t){return hast_util_is_element_element(t)&&t.tagName===e}}function castFactory(e){return assertion;function assertion(t,...n){return hast_util_is_element_element(t)&&Boolean(e.call(this,t,...n))}}function hast_util_is_element_element(e){return Boolean(e&&typeof e==="object"&&e.type==="element"&&typeof e.tagName==="string")}const r=function is(e,t,n,r,o){const i=convert(t);if(n!==undefined&&n!==null&&(typeof n!=="number"||n<0||n===Number.POSITIVE_INFINITY)){throw new Error("Expected positive finite index")}if(r!==undefined&&r!==null&&(!is(r)||!r.children)){throw new Error("Expected parent node")}if((r===undefined||r===null)!==(n===undefined||n===null)){throw new Error("Expected both parent and index")}return e&&e.type&&typeof e.type==="string"?Boolean(i.call(o,e,n,r)):false};const convert=function(e){if(e===undefined||e===null){return ok}if(typeof e==="string"){return typeFactory(e)}if(typeof e==="object"){return Array.isArray(e)?unist_util_is_anyFactory(e):propsFactory(e)}if(typeof e==="function"){return unist_util_is_castFactory(e)}throw new Error("Expected function, string, or object as test")};function unist_util_is_anyFactory(e){const t=[];let n=-1;while(++n<e.length){t[n]=convert(e[n])}return unist_util_is_castFactory(any);function any(...e){let n=-1;while(++n<t.length){if(t[n].call(this,...e))return true}return false}}function propsFactory(e){return unist_util_is_castFactory(all);function all(t){let n;for(n in e){if(t[n]!==e[n])return false}return true}}function typeFactory(e){return unist_util_is_castFactory(type);function type(t){return t&&t.type===e}}function unist_util_is_castFactory(e){return assertion;function assertion(...t){return Boolean(e.call(this,...t))}}function ok(){return true}function color(e){return"[33m"+e+"[39m"}const o=true;const i="skip";const u=false;const visitParents=function(e,t,n,r){if(typeof t==="function"&&typeof n!=="function"){r=n;n=t;t=null}const o=convert(t);const a=r?-1:1;factory(e,null,[])();function factory(e,c,f){const l=typeof e==="object"&&e!==null?e:{};let s;if(typeof l.type==="string"){s=typeof l.tagName==="string"?l.tagName:typeof l.name==="string"?l.name:undefined;Object.defineProperty(visit,"name",{value:"node ("+color(l.type+(s?"<"+s+">":""))+")"})}return visit;function visit(){let l=[];let s;let p;let y;if(!t||o(e,c,f[f.length-1]||null)){l=toResult(n(e,f));if(l[0]===u){return l}}if(e.children&&l[0]!==i){p=(r?e.children.length:-1)+a;y=f.concat(e);while(p>-1&&p<e.children.length){s=factory(e.children[p],p,y)();if(s[0]===u){return s}p=typeof s[1]==="number"?s[1]:p+a}}return l}}};function toResult(e){if(Array.isArray(e)){return e}if(typeof e==="number"){return[o,e]}return[e]}const visit=function(e,t,n,r){if(typeof t==="function"&&typeof n!=="function"){r=n;n=t;t=null}visitParents(e,t,overload,r);function overload(e,t){const r=t[t.length-1];return n(e,r?r.children.indexOf(e):null,r)}};const a={type:"element",tagName:"span",properties:{className:["icon","icon-link"]},children:[]};function rehypeAutolinkHeadings(t={}){let n=t.properties;const r=t.behaviour||t.behavior||"prepend";const o=t.content||a;const u=t.group;const c=convertElement(t.test);let f;if(r==="wrap"){f=wrap}else if(r==="before"||r==="after"){f=around}else{if(!n){n={ariaHidden:"true",tabIndex:-1}}f=inject}return e=>{visit(e,"element",((e,t,n)=>{if(headingRank(e)&&hasProperty(e,"id")&&c(e,t,n)){return f(e,t,n)}}))};function inject(t){t.children[r==="prepend"?"unshift":"push"](create(t,e(true,{},n),toChildren(o,t)));return[i]}function around(t,a,c){if(typeof a!=="number"||!c)return;const f=create(t,e(true,{},n),toChildren(o,t));let l=r==="before"?[f,t]:[t,f];if(u){const e=toNode(u,t);if(e&&!Array.isArray(e)&&e.type==="element"){e.children=l;l=[e]}}c.children.splice(a,1,...l);return[i,a+l.length]}function wrap(t){t.children=[create(t,e(true,{},n),t.children)];return[i]}function toChildren(e,t){const n=toNode(e,t);return Array.isArray(n)?n:[n]}function toNode(t,n){if(typeof t==="function")return t(n);return e(true,Array.isArray(t)?[]:{},t)}function create(e,t,n){return{type:"element",tagName:"a",properties:Object.assign({},t,{href:"#"+(e.properties||{}).id}),children:n}}}}();module.exports=n})();