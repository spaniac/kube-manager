var MD=Object.defineProperty;var bw=e=>{throw TypeError(e)};var DD=(e,t,n)=>t in e?MD(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var jm=(e,t,n)=>DD(e,typeof t!="symbol"?t+"":t,n),Sm=(e,t,n)=>t.has(e)||bw("Cannot "+n);var E=(e,t,n)=>(Sm(e,t,"read from private field"),n?n.call(e):t.get(e)),pe=(e,t,n)=>t.has(e)?bw("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),X=(e,t,n,r)=>(Sm(e,t,"write to private field"),r?r.call(e,n):t.set(e,n),n),ke=(e,t,n)=>(Sm(e,t,"access private method"),n);var id=(e,t,n,r)=>({set _(i){X(e,t,i,n)},get _(){return E(e,t,r)}});function zD(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const i in r)if(i!=="default"&&!(i in e)){const a=Object.getOwnPropertyDescriptor(r,i);a&&Object.defineProperty(e,i,a.get?a:{enumerable:!0,get:()=>r[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();function Qi(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var WC={exports:{}},Vp={},HC={exports:{}},Ee={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yu=Symbol.for("react.element"),ID=Symbol.for("react.portal"),$D=Symbol.for("react.fragment"),LD=Symbol.for("react.strict_mode"),FD=Symbol.for("react.profiler"),UD=Symbol.for("react.provider"),BD=Symbol.for("react.context"),WD=Symbol.for("react.forward_ref"),HD=Symbol.for("react.suspense"),KD=Symbol.for("react.memo"),VD=Symbol.for("react.lazy"),ww=Symbol.iterator;function ZD(e){return e===null||typeof e!="object"?null:(e=ww&&e[ww]||e["@@iterator"],typeof e=="function"?e:null)}var KC={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},VC=Object.assign,ZC={};function yl(e,t,n){this.props=e,this.context=t,this.refs=ZC,this.updater=n||KC}yl.prototype.isReactComponent={};yl.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};yl.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function qC(){}qC.prototype=yl.prototype;function Xy(e,t,n){this.props=e,this.context=t,this.refs=ZC,this.updater=n||KC}var Jy=Xy.prototype=new qC;Jy.constructor=Xy;VC(Jy,yl.prototype);Jy.isPureReactComponent=!0;var jw=Array.isArray,YC=Object.prototype.hasOwnProperty,ex={current:null},GC={key:!0,ref:!0,__self:!0,__source:!0};function QC(e,t,n){var r,i={},a=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(a=""+t.key),t)YC.call(t,r)&&!GC.hasOwnProperty(r)&&(i[r]=t[r]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var l=Array(s),c=0;c<s;c++)l[c]=arguments[c+2];i.children=l}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)i[r]===void 0&&(i[r]=s[r]);return{$$typeof:yu,type:e,key:a,ref:o,props:i,_owner:ex.current}}function qD(e,t){return{$$typeof:yu,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function tx(e){return typeof e=="object"&&e!==null&&e.$$typeof===yu}function YD(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Sw=/\/+/g;function km(e,t){return typeof e=="object"&&e!==null&&e.key!=null?YD(""+e.key):t.toString(36)}function Vd(e,t,n,r,i){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(a){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case yu:case ID:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+km(o,0):r,jw(i)?(n="",e!=null&&(n=e.replace(Sw,"$&/")+"/"),Vd(i,t,n,"",function(c){return c})):i!=null&&(tx(i)&&(i=qD(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(Sw,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",jw(e))for(var s=0;s<e.length;s++){a=e[s];var l=r+km(a,s);o+=Vd(a,t,n,l,i)}else if(l=ZD(e),typeof l=="function")for(e=l.call(e),s=0;!(a=e.next()).done;)a=a.value,l=r+km(a,s++),o+=Vd(a,t,n,l,i);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function ad(e,t,n){if(e==null)return e;var r=[],i=0;return Vd(e,r,"","",function(a){return t.call(n,a,i++)}),r}function GD(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var kn={current:null},Zd={transition:null},QD={ReactCurrentDispatcher:kn,ReactCurrentBatchConfig:Zd,ReactCurrentOwner:ex};function XC(){throw Error("act(...) is not supported in production builds of React.")}Ee.Children={map:ad,forEach:function(e,t,n){ad(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ad(e,function(){t++}),t},toArray:function(e){return ad(e,function(t){return t})||[]},only:function(e){if(!tx(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ee.Component=yl;Ee.Fragment=$D;Ee.Profiler=FD;Ee.PureComponent=Xy;Ee.StrictMode=LD;Ee.Suspense=HD;Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=QD;Ee.act=XC;Ee.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=VC({},e.props),i=e.key,a=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,o=ex.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(l in t)YC.call(t,l)&&!GC.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&s!==void 0?s[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){s=Array(l);for(var c=0;c<l;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:yu,type:e.type,key:i,ref:a,props:r,_owner:o}};Ee.createContext=function(e){return e={$$typeof:BD,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:UD,_context:e},e.Consumer=e};Ee.createElement=QC;Ee.createFactory=function(e){var t=QC.bind(null,e);return t.type=e,t};Ee.createRef=function(){return{current:null}};Ee.forwardRef=function(e){return{$$typeof:WD,render:e}};Ee.isValidElement=tx;Ee.lazy=function(e){return{$$typeof:VD,_payload:{_status:-1,_result:e},_init:GD}};Ee.memo=function(e,t){return{$$typeof:KD,type:e,compare:t===void 0?null:t}};Ee.startTransition=function(e){var t=Zd.transition;Zd.transition={};try{e()}finally{Zd.transition=t}};Ee.unstable_act=XC;Ee.useCallback=function(e,t){return kn.current.useCallback(e,t)};Ee.useContext=function(e){return kn.current.useContext(e)};Ee.useDebugValue=function(){};Ee.useDeferredValue=function(e){return kn.current.useDeferredValue(e)};Ee.useEffect=function(e,t){return kn.current.useEffect(e,t)};Ee.useId=function(){return kn.current.useId()};Ee.useImperativeHandle=function(e,t,n){return kn.current.useImperativeHandle(e,t,n)};Ee.useInsertionEffect=function(e,t){return kn.current.useInsertionEffect(e,t)};Ee.useLayoutEffect=function(e,t){return kn.current.useLayoutEffect(e,t)};Ee.useMemo=function(e,t){return kn.current.useMemo(e,t)};Ee.useReducer=function(e,t,n){return kn.current.useReducer(e,t,n)};Ee.useRef=function(e){return kn.current.useRef(e)};Ee.useState=function(e){return kn.current.useState(e)};Ee.useSyncExternalStore=function(e,t,n){return kn.current.useSyncExternalStore(e,t,n)};Ee.useTransition=function(){return kn.current.useTransition()};Ee.version="18.3.1";HC.exports=Ee;var v=HC.exports;const Zp=Qi(v),JC=zD({__proto__:null,default:Zp},[v]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var XD=v,JD=Symbol.for("react.element"),ez=Symbol.for("react.fragment"),tz=Object.prototype.hasOwnProperty,nz=XD.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,rz={key:!0,ref:!0,__self:!0,__source:!0};function eO(e,t,n){var r,i={},a=null,o=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)tz.call(t,r)&&!rz.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:JD,type:e,key:a,ref:o,props:i,_owner:nz.current}}Vp.Fragment=ez;Vp.jsx=eO;Vp.jsxs=eO;WC.exports=Vp;var u=WC.exports,Mg={},tO={exports:{}},er={},nO={exports:{}},rO={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t($,B){var L=$.length;$.push(B);e:for(;0<L;){var Y=L-1>>>1,re=$[Y];if(0<i(re,B))$[Y]=B,$[L]=re,L=Y;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var B=$[0],L=$.pop();if(L!==B){$[0]=L;e:for(var Y=0,re=$.length,Oe=re>>>1;Y<Oe;){var we=2*(Y+1)-1,ie=$[we],We=we+1,Xe=$[We];if(0>i(ie,L))We<re&&0>i(Xe,ie)?($[Y]=Xe,$[We]=L,Y=We):($[Y]=ie,$[we]=L,Y=we);else if(We<re&&0>i(Xe,L))$[Y]=Xe,$[We]=L,Y=We;else break e}}return B}function i($,B){var L=$.sortIndex-B.sortIndex;return L!==0?L:$.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var l=[],c=[],d=1,f=null,p=3,h=!1,m=!1,y=!1,g=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,b=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function w($){for(var B=n(c);B!==null;){if(B.callback===null)r(c);else if(B.startTime<=$)r(c),B.sortIndex=B.expirationTime,t(l,B);else break;B=n(c)}}function j($){if(y=!1,w($),!m)if(n(l)!==null)m=!0,Q(k);else{var B=n(c);B!==null&&te(j,B.startTime-$)}}function k($,B){m=!1,y&&(y=!1,x(C),C=-1),h=!0;var L=p;try{for(w(B),f=n(l);f!==null&&(!(f.expirationTime>B)||$&&!M());){var Y=f.callback;if(typeof Y=="function"){f.callback=null,p=f.priorityLevel;var re=Y(f.expirationTime<=B);B=e.unstable_now(),typeof re=="function"?f.callback=re:f===n(l)&&r(l),w(B)}else r(l);f=n(l)}if(f!==null)var Oe=!0;else{var we=n(c);we!==null&&te(j,we.startTime-B),Oe=!1}return Oe}finally{f=null,p=L,h=!1}}var P=!1,S=null,C=-1,N=5,_=-1;function M(){return!(e.unstable_now()-_<N)}function R(){if(S!==null){var $=e.unstable_now();_=$;var B=!0;try{B=S(!0,$)}finally{B?G():(P=!1,S=null)}}else P=!1}var G;if(typeof b=="function")G=function(){b(R)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,ee=V.port2;V.port1.onmessage=R,G=function(){ee.postMessage(null)}}else G=function(){g(R,0)};function Q($){S=$,P||(P=!0,G())}function te($,B){C=g(function(){$(e.unstable_now())},B)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function($){$.callback=null},e.unstable_continueExecution=function(){m||h||(m=!0,Q(k))},e.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):N=0<$?Math.floor(1e3/$):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function($){switch(p){case 1:case 2:case 3:var B=3;break;default:B=p}var L=p;p=B;try{return $()}finally{p=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function($,B){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var L=p;p=$;try{return B()}finally{p=L}},e.unstable_scheduleCallback=function($,B,L){var Y=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?Y+L:Y):L=Y,$){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=L+re,$={id:d++,callback:B,priorityLevel:$,startTime:L,expirationTime:re,sortIndex:-1},L>Y?($.sortIndex=L,t(c,$),n(l)===null&&$===n(c)&&(y?(x(C),C=-1):y=!0,te(j,L-Y))):($.sortIndex=re,t(l,$),m||h||(m=!0,Q(k))),$},e.unstable_shouldYield=M,e.unstable_wrapCallback=function($){var B=p;return function(){var L=p;p=B;try{return $.apply(this,arguments)}finally{p=L}}}})(rO);nO.exports=rO;var iz=nO.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var az=v,Xn=iz;function Z(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var iO=new Set,Ec={};function rs(e,t){nl(e,t),nl(e+"Capture",t)}function nl(e,t){for(Ec[e]=t,e=0;e<t.length;e++)iO.add(t[e])}var Fi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Dg=Object.prototype.hasOwnProperty,oz=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,kw={},Pw={};function sz(e){return Dg.call(Pw,e)?!0:Dg.call(kw,e)?!1:oz.test(e)?Pw[e]=!0:(kw[e]=!0,!1)}function lz(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function cz(e,t,n,r){if(t===null||typeof t>"u"||lz(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Pn(e,t,n,r,i,a,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=o}var Xt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Xt[e]=new Pn(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Xt[t]=new Pn(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Xt[e]=new Pn(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Xt[e]=new Pn(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Xt[e]=new Pn(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Xt[e]=new Pn(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Xt[e]=new Pn(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Xt[e]=new Pn(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Xt[e]=new Pn(e,5,!1,e.toLowerCase(),null,!1,!1)});var nx=/[\-:]([a-z])/g;function rx(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(nx,rx);Xt[t]=new Pn(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(nx,rx);Xt[t]=new Pn(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(nx,rx);Xt[t]=new Pn(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Xt[e]=new Pn(e,1,!1,e.toLowerCase(),null,!1,!1)});Xt.xlinkHref=new Pn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Xt[e]=new Pn(e,1,!1,e.toLowerCase(),null,!0,!0)});function ix(e,t,n,r){var i=Xt.hasOwnProperty(t)?Xt[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(cz(t,n,i,r)&&(n=null),r||i===null?sz(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Xi=az.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,od=Symbol.for("react.element"),vs=Symbol.for("react.portal"),ys=Symbol.for("react.fragment"),ax=Symbol.for("react.strict_mode"),zg=Symbol.for("react.profiler"),aO=Symbol.for("react.provider"),oO=Symbol.for("react.context"),ox=Symbol.for("react.forward_ref"),Ig=Symbol.for("react.suspense"),$g=Symbol.for("react.suspense_list"),sx=Symbol.for("react.memo"),ua=Symbol.for("react.lazy"),sO=Symbol.for("react.offscreen"),Cw=Symbol.iterator;function Ll(e){return e===null||typeof e!="object"?null:(e=Cw&&e[Cw]||e["@@iterator"],typeof e=="function"?e:null)}var lt=Object.assign,Pm;function oc(e){if(Pm===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Pm=t&&t[1]||""}return`
`+Pm+e}var Cm=!1;function Om(e,t){if(!e||Cm)return"";Cm=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),a=r.stack.split(`
`),o=i.length-1,s=a.length-1;1<=o&&0<=s&&i[o]!==a[s];)s--;for(;1<=o&&0<=s;o--,s--)if(i[o]!==a[s]){if(o!==1||s!==1)do if(o--,s--,0>s||i[o]!==a[s]){var l=`
`+i[o].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=o&&0<=s);break}}}finally{Cm=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?oc(e):""}function uz(e){switch(e.tag){case 5:return oc(e.type);case 16:return oc("Lazy");case 13:return oc("Suspense");case 19:return oc("SuspenseList");case 0:case 2:case 15:return e=Om(e.type,!1),e;case 11:return e=Om(e.type.render,!1),e;case 1:return e=Om(e.type,!0),e;default:return""}}function Lg(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ys:return"Fragment";case vs:return"Portal";case zg:return"Profiler";case ax:return"StrictMode";case Ig:return"Suspense";case $g:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case oO:return(e.displayName||"Context")+".Consumer";case aO:return(e._context.displayName||"Context")+".Provider";case ox:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case sx:return t=e.displayName||null,t!==null?t:Lg(e.type)||"Memo";case ua:t=e._payload,e=e._init;try{return Lg(e(t))}catch{}}return null}function dz(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Lg(t);case 8:return t===ax?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Wa(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function lO(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function fz(e){var t=lO(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,a.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function sd(e){e._valueTracker||(e._valueTracker=fz(e))}function cO(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=lO(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function xf(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Fg(e,t){var n=t.checked;return lt({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Ow(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Wa(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function uO(e,t){t=t.checked,t!=null&&ix(e,"checked",t,!1)}function Ug(e,t){uO(e,t);var n=Wa(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Bg(e,t.type,n):t.hasOwnProperty("defaultValue")&&Bg(e,t.type,Wa(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ew(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Bg(e,t,n){(t!=="number"||xf(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var sc=Array.isArray;function Ms(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Wa(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Wg(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(Z(91));return lt({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Nw(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(Z(92));if(sc(n)){if(1<n.length)throw Error(Z(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Wa(n)}}function dO(e,t){var n=Wa(t.value),r=Wa(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function _w(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function fO(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Hg(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?fO(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ld,pO=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ld=ld||document.createElement("div"),ld.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ld.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Nc(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var vc={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},pz=["Webkit","ms","Moz","O"];Object.keys(vc).forEach(function(e){pz.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),vc[t]=vc[e]})});function hO(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||vc.hasOwnProperty(e)&&vc[e]?(""+t).trim():t+"px"}function mO(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=hO(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var hz=lt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Kg(e,t){if(t){if(hz[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(Z(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(Z(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(Z(61))}if(t.style!=null&&typeof t.style!="object")throw Error(Z(62))}}function Vg(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Zg=null;function lx(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var qg=null,Ds=null,zs=null;function Aw(e){if(e=wu(e)){if(typeof qg!="function")throw Error(Z(280));var t=e.stateNode;t&&(t=Xp(t),qg(e.stateNode,e.type,t))}}function gO(e){Ds?zs?zs.push(e):zs=[e]:Ds=e}function vO(){if(Ds){var e=Ds,t=zs;if(zs=Ds=null,Aw(e),t)for(e=0;e<t.length;e++)Aw(t[e])}}function yO(e,t){return e(t)}function xO(){}var Em=!1;function bO(e,t,n){if(Em)return e(t,n);Em=!0;try{return yO(e,t,n)}finally{Em=!1,(Ds!==null||zs!==null)&&(xO(),vO())}}function _c(e,t){var n=e.stateNode;if(n===null)return null;var r=Xp(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(Z(231,t,typeof n));return n}var Yg=!1;if(Fi)try{var Fl={};Object.defineProperty(Fl,"passive",{get:function(){Yg=!0}}),window.addEventListener("test",Fl,Fl),window.removeEventListener("test",Fl,Fl)}catch{Yg=!1}function mz(e,t,n,r,i,a,o,s,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(d){this.onError(d)}}var yc=!1,bf=null,wf=!1,Gg=null,gz={onError:function(e){yc=!0,bf=e}};function vz(e,t,n,r,i,a,o,s,l){yc=!1,bf=null,mz.apply(gz,arguments)}function yz(e,t,n,r,i,a,o,s,l){if(vz.apply(this,arguments),yc){if(yc){var c=bf;yc=!1,bf=null}else throw Error(Z(198));wf||(wf=!0,Gg=c)}}function is(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function wO(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Tw(e){if(is(e)!==e)throw Error(Z(188))}function xz(e){var t=e.alternate;if(!t){if(t=is(e),t===null)throw Error(Z(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return Tw(i),e;if(a===r)return Tw(i),t;a=a.sibling}throw Error(Z(188))}if(n.return!==r.return)n=i,r=a;else{for(var o=!1,s=i.child;s;){if(s===n){o=!0,n=i,r=a;break}if(s===r){o=!0,r=i,n=a;break}s=s.sibling}if(!o){for(s=a.child;s;){if(s===n){o=!0,n=a,r=i;break}if(s===r){o=!0,r=a,n=i;break}s=s.sibling}if(!o)throw Error(Z(189))}}if(n.alternate!==r)throw Error(Z(190))}if(n.tag!==3)throw Error(Z(188));return n.stateNode.current===n?e:t}function jO(e){return e=xz(e),e!==null?SO(e):null}function SO(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=SO(e);if(t!==null)return t;e=e.sibling}return null}var kO=Xn.unstable_scheduleCallback,Rw=Xn.unstable_cancelCallback,bz=Xn.unstable_shouldYield,wz=Xn.unstable_requestPaint,bt=Xn.unstable_now,jz=Xn.unstable_getCurrentPriorityLevel,cx=Xn.unstable_ImmediatePriority,PO=Xn.unstable_UserBlockingPriority,jf=Xn.unstable_NormalPriority,Sz=Xn.unstable_LowPriority,CO=Xn.unstable_IdlePriority,qp=null,ai=null;function kz(e){if(ai&&typeof ai.onCommitFiberRoot=="function")try{ai.onCommitFiberRoot(qp,e,void 0,(e.current.flags&128)===128)}catch{}}var Ir=Math.clz32?Math.clz32:Oz,Pz=Math.log,Cz=Math.LN2;function Oz(e){return e>>>=0,e===0?32:31-(Pz(e)/Cz|0)|0}var cd=64,ud=4194304;function lc(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Sf(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes,o=n&268435455;if(o!==0){var s=o&~i;s!==0?r=lc(s):(a&=o,a!==0&&(r=lc(a)))}else o=n&~i,o!==0?r=lc(o):a!==0&&(r=lc(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,a=t&-t,i>=a||i===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ir(t),i=1<<n,r|=e[n],t&=~i;return r}function Ez(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Nz(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var o=31-Ir(a),s=1<<o,l=i[o];l===-1?(!(s&n)||s&r)&&(i[o]=Ez(s,t)):l<=t&&(e.expiredLanes|=s),a&=~s}}function Qg(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function OO(){var e=cd;return cd<<=1,!(cd&4194240)&&(cd=64),e}function Nm(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function xu(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ir(t),e[t]=n}function _z(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Ir(n),a=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~a}}function ux(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ir(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var Be=0;function EO(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var NO,dx,_O,AO,TO,Xg=!1,dd=[],Ta=null,Ra=null,Ma=null,Ac=new Map,Tc=new Map,ha=[],Az="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Mw(e,t){switch(e){case"focusin":case"focusout":Ta=null;break;case"dragenter":case"dragleave":Ra=null;break;case"mouseover":case"mouseout":Ma=null;break;case"pointerover":case"pointerout":Ac.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Tc.delete(t.pointerId)}}function Ul(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=wu(t),t!==null&&dx(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Tz(e,t,n,r,i){switch(t){case"focusin":return Ta=Ul(Ta,e,t,n,r,i),!0;case"dragenter":return Ra=Ul(Ra,e,t,n,r,i),!0;case"mouseover":return Ma=Ul(Ma,e,t,n,r,i),!0;case"pointerover":var a=i.pointerId;return Ac.set(a,Ul(Ac.get(a)||null,e,t,n,r,i)),!0;case"gotpointercapture":return a=i.pointerId,Tc.set(a,Ul(Tc.get(a)||null,e,t,n,r,i)),!0}return!1}function RO(e){var t=vo(e.target);if(t!==null){var n=is(t);if(n!==null){if(t=n.tag,t===13){if(t=wO(n),t!==null){e.blockedOn=t,TO(e.priority,function(){_O(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function qd(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Jg(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Zg=r,n.target.dispatchEvent(r),Zg=null}else return t=wu(n),t!==null&&dx(t),e.blockedOn=n,!1;t.shift()}return!0}function Dw(e,t,n){qd(e)&&n.delete(t)}function Rz(){Xg=!1,Ta!==null&&qd(Ta)&&(Ta=null),Ra!==null&&qd(Ra)&&(Ra=null),Ma!==null&&qd(Ma)&&(Ma=null),Ac.forEach(Dw),Tc.forEach(Dw)}function Bl(e,t){e.blockedOn===t&&(e.blockedOn=null,Xg||(Xg=!0,Xn.unstable_scheduleCallback(Xn.unstable_NormalPriority,Rz)))}function Rc(e){function t(i){return Bl(i,e)}if(0<dd.length){Bl(dd[0],e);for(var n=1;n<dd.length;n++){var r=dd[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Ta!==null&&Bl(Ta,e),Ra!==null&&Bl(Ra,e),Ma!==null&&Bl(Ma,e),Ac.forEach(t),Tc.forEach(t),n=0;n<ha.length;n++)r=ha[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<ha.length&&(n=ha[0],n.blockedOn===null);)RO(n),n.blockedOn===null&&ha.shift()}var Is=Xi.ReactCurrentBatchConfig,kf=!0;function Mz(e,t,n,r){var i=Be,a=Is.transition;Is.transition=null;try{Be=1,fx(e,t,n,r)}finally{Be=i,Is.transition=a}}function Dz(e,t,n,r){var i=Be,a=Is.transition;Is.transition=null;try{Be=4,fx(e,t,n,r)}finally{Be=i,Is.transition=a}}function fx(e,t,n,r){if(kf){var i=Jg(e,t,n,r);if(i===null)Lm(e,t,r,Pf,n),Mw(e,r);else if(Tz(i,e,t,n,r))r.stopPropagation();else if(Mw(e,r),t&4&&-1<Az.indexOf(e)){for(;i!==null;){var a=wu(i);if(a!==null&&NO(a),a=Jg(e,t,n,r),a===null&&Lm(e,t,r,Pf,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Lm(e,t,r,null,n)}}var Pf=null;function Jg(e,t,n,r){if(Pf=null,e=lx(r),e=vo(e),e!==null)if(t=is(e),t===null)e=null;else if(n=t.tag,n===13){if(e=wO(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Pf=e,null}function MO(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(jz()){case cx:return 1;case PO:return 4;case jf:case Sz:return 16;case CO:return 536870912;default:return 16}default:return 16}}var Ea=null,px=null,Yd=null;function DO(){if(Yd)return Yd;var e,t=px,n=t.length,r,i="value"in Ea?Ea.value:Ea.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Yd=i.slice(e,1<r?1-r:void 0)}function Gd(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function fd(){return!0}function zw(){return!1}function tr(e){function t(n,r,i,a,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=a,this.target=o,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?fd:zw,this.isPropagationStopped=zw,this}return lt(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=fd)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=fd)},persist:function(){},isPersistent:fd}),t}var xl={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},hx=tr(xl),bu=lt({},xl,{view:0,detail:0}),zz=tr(bu),_m,Am,Wl,Yp=lt({},bu,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mx,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Wl&&(Wl&&e.type==="mousemove"?(_m=e.screenX-Wl.screenX,Am=e.screenY-Wl.screenY):Am=_m=0,Wl=e),_m)},movementY:function(e){return"movementY"in e?e.movementY:Am}}),Iw=tr(Yp),Iz=lt({},Yp,{dataTransfer:0}),$z=tr(Iz),Lz=lt({},bu,{relatedTarget:0}),Tm=tr(Lz),Fz=lt({},xl,{animationName:0,elapsedTime:0,pseudoElement:0}),Uz=tr(Fz),Bz=lt({},xl,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Wz=tr(Bz),Hz=lt({},xl,{data:0}),$w=tr(Hz),Kz={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Vz={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Zz={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function qz(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Zz[e])?!!t[e]:!1}function mx(){return qz}var Yz=lt({},bu,{key:function(e){if(e.key){var t=Kz[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Gd(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Vz[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mx,charCode:function(e){return e.type==="keypress"?Gd(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Gd(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Gz=tr(Yz),Qz=lt({},Yp,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Lw=tr(Qz),Xz=lt({},bu,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mx}),Jz=tr(Xz),eI=lt({},xl,{propertyName:0,elapsedTime:0,pseudoElement:0}),tI=tr(eI),nI=lt({},Yp,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),rI=tr(nI),iI=[9,13,27,32],gx=Fi&&"CompositionEvent"in window,xc=null;Fi&&"documentMode"in document&&(xc=document.documentMode);var aI=Fi&&"TextEvent"in window&&!xc,zO=Fi&&(!gx||xc&&8<xc&&11>=xc),Fw=" ",Uw=!1;function IO(e,t){switch(e){case"keyup":return iI.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $O(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var xs=!1;function oI(e,t){switch(e){case"compositionend":return $O(t);case"keypress":return t.which!==32?null:(Uw=!0,Fw);case"textInput":return e=t.data,e===Fw&&Uw?null:e;default:return null}}function sI(e,t){if(xs)return e==="compositionend"||!gx&&IO(e,t)?(e=DO(),Yd=px=Ea=null,xs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return zO&&t.locale!=="ko"?null:t.data;default:return null}}var lI={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bw(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!lI[e.type]:t==="textarea"}function LO(e,t,n,r){gO(r),t=Cf(t,"onChange"),0<t.length&&(n=new hx("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var bc=null,Mc=null;function cI(e){GO(e,0)}function Gp(e){var t=js(e);if(cO(t))return e}function uI(e,t){if(e==="change")return t}var FO=!1;if(Fi){var Rm;if(Fi){var Mm="oninput"in document;if(!Mm){var Ww=document.createElement("div");Ww.setAttribute("oninput","return;"),Mm=typeof Ww.oninput=="function"}Rm=Mm}else Rm=!1;FO=Rm&&(!document.documentMode||9<document.documentMode)}function Hw(){bc&&(bc.detachEvent("onpropertychange",UO),Mc=bc=null)}function UO(e){if(e.propertyName==="value"&&Gp(Mc)){var t=[];LO(t,Mc,e,lx(e)),bO(cI,t)}}function dI(e,t,n){e==="focusin"?(Hw(),bc=t,Mc=n,bc.attachEvent("onpropertychange",UO)):e==="focusout"&&Hw()}function fI(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Gp(Mc)}function pI(e,t){if(e==="click")return Gp(t)}function hI(e,t){if(e==="input"||e==="change")return Gp(t)}function mI(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Fr=typeof Object.is=="function"?Object.is:mI;function Dc(e,t){if(Fr(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Dg.call(t,i)||!Fr(e[i],t[i]))return!1}return!0}function Kw(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Vw(e,t){var n=Kw(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Kw(n)}}function BO(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?BO(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function WO(){for(var e=window,t=xf();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=xf(e.document)}return t}function vx(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function gI(e){var t=WO(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&BO(n.ownerDocument.documentElement,n)){if(r!==null&&vx(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(r.start,i);r=r.end===void 0?a:Math.min(r.end,i),!e.extend&&a>r&&(i=r,r=a,a=i),i=Vw(n,a);var o=Vw(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var vI=Fi&&"documentMode"in document&&11>=document.documentMode,bs=null,ev=null,wc=null,tv=!1;function Zw(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;tv||bs==null||bs!==xf(r)||(r=bs,"selectionStart"in r&&vx(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),wc&&Dc(wc,r)||(wc=r,r=Cf(ev,"onSelect"),0<r.length&&(t=new hx("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=bs)))}function pd(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var ws={animationend:pd("Animation","AnimationEnd"),animationiteration:pd("Animation","AnimationIteration"),animationstart:pd("Animation","AnimationStart"),transitionend:pd("Transition","TransitionEnd")},Dm={},HO={};Fi&&(HO=document.createElement("div").style,"AnimationEvent"in window||(delete ws.animationend.animation,delete ws.animationiteration.animation,delete ws.animationstart.animation),"TransitionEvent"in window||delete ws.transitionend.transition);function Qp(e){if(Dm[e])return Dm[e];if(!ws[e])return e;var t=ws[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in HO)return Dm[e]=t[n];return e}var KO=Qp("animationend"),VO=Qp("animationiteration"),ZO=Qp("animationstart"),qO=Qp("transitionend"),YO=new Map,qw="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Ya(e,t){YO.set(e,t),rs(t,[e])}for(var zm=0;zm<qw.length;zm++){var Im=qw[zm],yI=Im.toLowerCase(),xI=Im[0].toUpperCase()+Im.slice(1);Ya(yI,"on"+xI)}Ya(KO,"onAnimationEnd");Ya(VO,"onAnimationIteration");Ya(ZO,"onAnimationStart");Ya("dblclick","onDoubleClick");Ya("focusin","onFocus");Ya("focusout","onBlur");Ya(qO,"onTransitionEnd");nl("onMouseEnter",["mouseout","mouseover"]);nl("onMouseLeave",["mouseout","mouseover"]);nl("onPointerEnter",["pointerout","pointerover"]);nl("onPointerLeave",["pointerout","pointerover"]);rs("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));rs("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));rs("onBeforeInput",["compositionend","keypress","textInput","paste"]);rs("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));rs("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));rs("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var cc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bI=new Set("cancel close invalid load scroll toggle".split(" ").concat(cc));function Yw(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,yz(r,t,void 0,e),e.currentTarget=null}function GO(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],l=s.instance,c=s.currentTarget;if(s=s.listener,l!==a&&i.isPropagationStopped())break e;Yw(i,s,c),a=l}else for(o=0;o<r.length;o++){if(s=r[o],l=s.instance,c=s.currentTarget,s=s.listener,l!==a&&i.isPropagationStopped())break e;Yw(i,s,c),a=l}}}if(wf)throw e=Gg,wf=!1,Gg=null,e}function Ye(e,t){var n=t[ov];n===void 0&&(n=t[ov]=new Set);var r=e+"__bubble";n.has(r)||(QO(t,e,2,!1),n.add(r))}function $m(e,t,n){var r=0;t&&(r|=4),QO(n,e,r,t)}var hd="_reactListening"+Math.random().toString(36).slice(2);function zc(e){if(!e[hd]){e[hd]=!0,iO.forEach(function(n){n!=="selectionchange"&&(bI.has(n)||$m(n,!1,e),$m(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[hd]||(t[hd]=!0,$m("selectionchange",!1,t))}}function QO(e,t,n,r){switch(MO(t)){case 1:var i=Mz;break;case 4:i=Dz;break;default:i=fx}n=i.bind(null,t,n,e),i=void 0,!Yg||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Lm(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;o=o.return}for(;s!==null;){if(o=vo(s),o===null)return;if(l=o.tag,l===5||l===6){r=a=o;continue e}s=s.parentNode}}r=r.return}bO(function(){var c=a,d=lx(n),f=[];e:{var p=YO.get(e);if(p!==void 0){var h=hx,m=e;switch(e){case"keypress":if(Gd(n)===0)break e;case"keydown":case"keyup":h=Gz;break;case"focusin":m="focus",h=Tm;break;case"focusout":m="blur",h=Tm;break;case"beforeblur":case"afterblur":h=Tm;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=Iw;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=$z;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=Jz;break;case KO:case VO:case ZO:h=Uz;break;case qO:h=tI;break;case"scroll":h=zz;break;case"wheel":h=rI;break;case"copy":case"cut":case"paste":h=Wz;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=Lw}var y=(t&4)!==0,g=!y&&e==="scroll",x=y?p!==null?p+"Capture":null:p;y=[];for(var b=c,w;b!==null;){w=b;var j=w.stateNode;if(w.tag===5&&j!==null&&(w=j,x!==null&&(j=_c(b,x),j!=null&&y.push(Ic(b,j,w)))),g)break;b=b.return}0<y.length&&(p=new h(p,m,null,n,d),f.push({event:p,listeners:y}))}}if(!(t&7)){e:{if(p=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",p&&n!==Zg&&(m=n.relatedTarget||n.fromElement)&&(vo(m)||m[Ui]))break e;if((h||p)&&(p=d.window===d?d:(p=d.ownerDocument)?p.defaultView||p.parentWindow:window,h?(m=n.relatedTarget||n.toElement,h=c,m=m?vo(m):null,m!==null&&(g=is(m),m!==g||m.tag!==5&&m.tag!==6)&&(m=null)):(h=null,m=c),h!==m)){if(y=Iw,j="onMouseLeave",x="onMouseEnter",b="mouse",(e==="pointerout"||e==="pointerover")&&(y=Lw,j="onPointerLeave",x="onPointerEnter",b="pointer"),g=h==null?p:js(h),w=m==null?p:js(m),p=new y(j,b+"leave",h,n,d),p.target=g,p.relatedTarget=w,j=null,vo(d)===c&&(y=new y(x,b+"enter",m,n,d),y.target=w,y.relatedTarget=g,j=y),g=j,h&&m)t:{for(y=h,x=m,b=0,w=y;w;w=us(w))b++;for(w=0,j=x;j;j=us(j))w++;for(;0<b-w;)y=us(y),b--;for(;0<w-b;)x=us(x),w--;for(;b--;){if(y===x||x!==null&&y===x.alternate)break t;y=us(y),x=us(x)}y=null}else y=null;h!==null&&Gw(f,p,h,y,!1),m!==null&&g!==null&&Gw(f,g,m,y,!0)}}e:{if(p=c?js(c):window,h=p.nodeName&&p.nodeName.toLowerCase(),h==="select"||h==="input"&&p.type==="file")var k=uI;else if(Bw(p))if(FO)k=hI;else{k=fI;var P=dI}else(h=p.nodeName)&&h.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(k=pI);if(k&&(k=k(e,c))){LO(f,k,n,d);break e}P&&P(e,p,c),e==="focusout"&&(P=p._wrapperState)&&P.controlled&&p.type==="number"&&Bg(p,"number",p.value)}switch(P=c?js(c):window,e){case"focusin":(Bw(P)||P.contentEditable==="true")&&(bs=P,ev=c,wc=null);break;case"focusout":wc=ev=bs=null;break;case"mousedown":tv=!0;break;case"contextmenu":case"mouseup":case"dragend":tv=!1,Zw(f,n,d);break;case"selectionchange":if(vI)break;case"keydown":case"keyup":Zw(f,n,d)}var S;if(gx)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else xs?IO(e,n)&&(C="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(zO&&n.locale!=="ko"&&(xs||C!=="onCompositionStart"?C==="onCompositionEnd"&&xs&&(S=DO()):(Ea=d,px="value"in Ea?Ea.value:Ea.textContent,xs=!0)),P=Cf(c,C),0<P.length&&(C=new $w(C,e,null,n,d),f.push({event:C,listeners:P}),S?C.data=S:(S=$O(n),S!==null&&(C.data=S)))),(S=aI?oI(e,n):sI(e,n))&&(c=Cf(c,"onBeforeInput"),0<c.length&&(d=new $w("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:c}),d.data=S))}GO(f,t)})}function Ic(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Cf(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=_c(e,n),a!=null&&r.unshift(Ic(e,a,i)),a=_c(e,t),a!=null&&r.push(Ic(e,a,i))),e=e.return}return r}function us(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Gw(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,l=s.alternate,c=s.stateNode;if(l!==null&&l===r)break;s.tag===5&&c!==null&&(s=c,i?(l=_c(n,a),l!=null&&o.unshift(Ic(n,l,s))):i||(l=_c(n,a),l!=null&&o.push(Ic(n,l,s)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var wI=/\r\n?/g,jI=/\u0000|\uFFFD/g;function Qw(e){return(typeof e=="string"?e:""+e).replace(wI,`
`).replace(jI,"")}function md(e,t,n){if(t=Qw(t),Qw(e)!==t&&n)throw Error(Z(425))}function Of(){}var nv=null,rv=null;function iv(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var av=typeof setTimeout=="function"?setTimeout:void 0,SI=typeof clearTimeout=="function"?clearTimeout:void 0,Xw=typeof Promise=="function"?Promise:void 0,kI=typeof queueMicrotask=="function"?queueMicrotask:typeof Xw<"u"?function(e){return Xw.resolve(null).then(e).catch(PI)}:av;function PI(e){setTimeout(function(){throw e})}function Fm(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Rc(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Rc(t)}function Da(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Jw(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var bl=Math.random().toString(36).slice(2),ni="__reactFiber$"+bl,$c="__reactProps$"+bl,Ui="__reactContainer$"+bl,ov="__reactEvents$"+bl,CI="__reactListeners$"+bl,OI="__reactHandles$"+bl;function vo(e){var t=e[ni];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ui]||n[ni]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Jw(e);e!==null;){if(n=e[ni])return n;e=Jw(e)}return t}e=n,n=e.parentNode}return null}function wu(e){return e=e[ni]||e[Ui],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function js(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(Z(33))}function Xp(e){return e[$c]||null}var sv=[],Ss=-1;function Ga(e){return{current:e}}function Qe(e){0>Ss||(e.current=sv[Ss],sv[Ss]=null,Ss--)}function qe(e,t){Ss++,sv[Ss]=e.current,e.current=t}var Ha={},dn=Ga(Ha),zn=Ga(!1),Bo=Ha;function rl(e,t){var n=e.type.contextTypes;if(!n)return Ha;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in n)i[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function In(e){return e=e.childContextTypes,e!=null}function Ef(){Qe(zn),Qe(dn)}function e1(e,t,n){if(dn.current!==Ha)throw Error(Z(168));qe(dn,t),qe(zn,n)}function XO(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(Z(108,dz(e)||"Unknown",i));return lt({},n,r)}function Nf(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ha,Bo=dn.current,qe(dn,e),qe(zn,zn.current),!0}function t1(e,t,n){var r=e.stateNode;if(!r)throw Error(Z(169));n?(e=XO(e,t,Bo),r.__reactInternalMemoizedMergedChildContext=e,Qe(zn),Qe(dn),qe(dn,e)):Qe(zn),qe(zn,n)}var Pi=null,Jp=!1,Um=!1;function JO(e){Pi===null?Pi=[e]:Pi.push(e)}function EI(e){Jp=!0,JO(e)}function Qa(){if(!Um&&Pi!==null){Um=!0;var e=0,t=Be;try{var n=Pi;for(Be=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Pi=null,Jp=!1}catch(i){throw Pi!==null&&(Pi=Pi.slice(e+1)),kO(cx,Qa),i}finally{Be=t,Um=!1}}return null}var ks=[],Ps=0,_f=null,Af=0,fr=[],pr=0,Wo=null,Ti=1,Ri="";function fo(e,t){ks[Ps++]=Af,ks[Ps++]=_f,_f=e,Af=t}function eE(e,t,n){fr[pr++]=Ti,fr[pr++]=Ri,fr[pr++]=Wo,Wo=e;var r=Ti;e=Ri;var i=32-Ir(r)-1;r&=~(1<<i),n+=1;var a=32-Ir(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ti=1<<32-Ir(t)+i|n<<i|r,Ri=a+e}else Ti=1<<a|n<<i|r,Ri=e}function yx(e){e.return!==null&&(fo(e,1),eE(e,1,0))}function xx(e){for(;e===_f;)_f=ks[--Ps],ks[Ps]=null,Af=ks[--Ps],ks[Ps]=null;for(;e===Wo;)Wo=fr[--pr],fr[pr]=null,Ri=fr[--pr],fr[pr]=null,Ti=fr[--pr],fr[pr]=null}var Gn=null,qn=null,et=!1,Rr=null;function tE(e,t){var n=mr(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function n1(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Gn=e,qn=Da(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Gn=e,qn=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Wo!==null?{id:Ti,overflow:Ri}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=mr(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Gn=e,qn=null,!0):!1;default:return!1}}function lv(e){return(e.mode&1)!==0&&(e.flags&128)===0}function cv(e){if(et){var t=qn;if(t){var n=t;if(!n1(e,t)){if(lv(e))throw Error(Z(418));t=Da(n.nextSibling);var r=Gn;t&&n1(e,t)?tE(r,n):(e.flags=e.flags&-4097|2,et=!1,Gn=e)}}else{if(lv(e))throw Error(Z(418));e.flags=e.flags&-4097|2,et=!1,Gn=e}}}function r1(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Gn=e}function gd(e){if(e!==Gn)return!1;if(!et)return r1(e),et=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!iv(e.type,e.memoizedProps)),t&&(t=qn)){if(lv(e))throw nE(),Error(Z(418));for(;t;)tE(e,t),t=Da(t.nextSibling)}if(r1(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(Z(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){qn=Da(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}qn=null}}else qn=Gn?Da(e.stateNode.nextSibling):null;return!0}function nE(){for(var e=qn;e;)e=Da(e.nextSibling)}function il(){qn=Gn=null,et=!1}function bx(e){Rr===null?Rr=[e]:Rr.push(e)}var NI=Xi.ReactCurrentBatchConfig;function Hl(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(Z(309));var r=n.stateNode}if(!r)throw Error(Z(147,e));var i=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(o){var s=i.refs;o===null?delete s[a]:s[a]=o},t._stringRef=a,t)}if(typeof e!="string")throw Error(Z(284));if(!n._owner)throw Error(Z(290,e))}return e}function vd(e,t){throw e=Object.prototype.toString.call(t),Error(Z(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function i1(e){var t=e._init;return t(e._payload)}function rE(e){function t(x,b){if(e){var w=x.deletions;w===null?(x.deletions=[b],x.flags|=16):w.push(b)}}function n(x,b){if(!e)return null;for(;b!==null;)t(x,b),b=b.sibling;return null}function r(x,b){for(x=new Map;b!==null;)b.key!==null?x.set(b.key,b):x.set(b.index,b),b=b.sibling;return x}function i(x,b){return x=La(x,b),x.index=0,x.sibling=null,x}function a(x,b,w){return x.index=w,e?(w=x.alternate,w!==null?(w=w.index,w<b?(x.flags|=2,b):w):(x.flags|=2,b)):(x.flags|=1048576,b)}function o(x){return e&&x.alternate===null&&(x.flags|=2),x}function s(x,b,w,j){return b===null||b.tag!==6?(b=qm(w,x.mode,j),b.return=x,b):(b=i(b,w),b.return=x,b)}function l(x,b,w,j){var k=w.type;return k===ys?d(x,b,w.props.children,j,w.key):b!==null&&(b.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===ua&&i1(k)===b.type)?(j=i(b,w.props),j.ref=Hl(x,b,w),j.return=x,j):(j=rf(w.type,w.key,w.props,null,x.mode,j),j.ref=Hl(x,b,w),j.return=x,j)}function c(x,b,w,j){return b===null||b.tag!==4||b.stateNode.containerInfo!==w.containerInfo||b.stateNode.implementation!==w.implementation?(b=Ym(w,x.mode,j),b.return=x,b):(b=i(b,w.children||[]),b.return=x,b)}function d(x,b,w,j,k){return b===null||b.tag!==7?(b=Io(w,x.mode,j,k),b.return=x,b):(b=i(b,w),b.return=x,b)}function f(x,b,w){if(typeof b=="string"&&b!==""||typeof b=="number")return b=qm(""+b,x.mode,w),b.return=x,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case od:return w=rf(b.type,b.key,b.props,null,x.mode,w),w.ref=Hl(x,null,b),w.return=x,w;case vs:return b=Ym(b,x.mode,w),b.return=x,b;case ua:var j=b._init;return f(x,j(b._payload),w)}if(sc(b)||Ll(b))return b=Io(b,x.mode,w,null),b.return=x,b;vd(x,b)}return null}function p(x,b,w,j){var k=b!==null?b.key:null;if(typeof w=="string"&&w!==""||typeof w=="number")return k!==null?null:s(x,b,""+w,j);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case od:return w.key===k?l(x,b,w,j):null;case vs:return w.key===k?c(x,b,w,j):null;case ua:return k=w._init,p(x,b,k(w._payload),j)}if(sc(w)||Ll(w))return k!==null?null:d(x,b,w,j,null);vd(x,w)}return null}function h(x,b,w,j,k){if(typeof j=="string"&&j!==""||typeof j=="number")return x=x.get(w)||null,s(b,x,""+j,k);if(typeof j=="object"&&j!==null){switch(j.$$typeof){case od:return x=x.get(j.key===null?w:j.key)||null,l(b,x,j,k);case vs:return x=x.get(j.key===null?w:j.key)||null,c(b,x,j,k);case ua:var P=j._init;return h(x,b,w,P(j._payload),k)}if(sc(j)||Ll(j))return x=x.get(w)||null,d(b,x,j,k,null);vd(b,j)}return null}function m(x,b,w,j){for(var k=null,P=null,S=b,C=b=0,N=null;S!==null&&C<w.length;C++){S.index>C?(N=S,S=null):N=S.sibling;var _=p(x,S,w[C],j);if(_===null){S===null&&(S=N);break}e&&S&&_.alternate===null&&t(x,S),b=a(_,b,C),P===null?k=_:P.sibling=_,P=_,S=N}if(C===w.length)return n(x,S),et&&fo(x,C),k;if(S===null){for(;C<w.length;C++)S=f(x,w[C],j),S!==null&&(b=a(S,b,C),P===null?k=S:P.sibling=S,P=S);return et&&fo(x,C),k}for(S=r(x,S);C<w.length;C++)N=h(S,x,C,w[C],j),N!==null&&(e&&N.alternate!==null&&S.delete(N.key===null?C:N.key),b=a(N,b,C),P===null?k=N:P.sibling=N,P=N);return e&&S.forEach(function(M){return t(x,M)}),et&&fo(x,C),k}function y(x,b,w,j){var k=Ll(w);if(typeof k!="function")throw Error(Z(150));if(w=k.call(w),w==null)throw Error(Z(151));for(var P=k=null,S=b,C=b=0,N=null,_=w.next();S!==null&&!_.done;C++,_=w.next()){S.index>C?(N=S,S=null):N=S.sibling;var M=p(x,S,_.value,j);if(M===null){S===null&&(S=N);break}e&&S&&M.alternate===null&&t(x,S),b=a(M,b,C),P===null?k=M:P.sibling=M,P=M,S=N}if(_.done)return n(x,S),et&&fo(x,C),k;if(S===null){for(;!_.done;C++,_=w.next())_=f(x,_.value,j),_!==null&&(b=a(_,b,C),P===null?k=_:P.sibling=_,P=_);return et&&fo(x,C),k}for(S=r(x,S);!_.done;C++,_=w.next())_=h(S,x,C,_.value,j),_!==null&&(e&&_.alternate!==null&&S.delete(_.key===null?C:_.key),b=a(_,b,C),P===null?k=_:P.sibling=_,P=_);return e&&S.forEach(function(R){return t(x,R)}),et&&fo(x,C),k}function g(x,b,w,j){if(typeof w=="object"&&w!==null&&w.type===ys&&w.key===null&&(w=w.props.children),typeof w=="object"&&w!==null){switch(w.$$typeof){case od:e:{for(var k=w.key,P=b;P!==null;){if(P.key===k){if(k=w.type,k===ys){if(P.tag===7){n(x,P.sibling),b=i(P,w.props.children),b.return=x,x=b;break e}}else if(P.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===ua&&i1(k)===P.type){n(x,P.sibling),b=i(P,w.props),b.ref=Hl(x,P,w),b.return=x,x=b;break e}n(x,P);break}else t(x,P);P=P.sibling}w.type===ys?(b=Io(w.props.children,x.mode,j,w.key),b.return=x,x=b):(j=rf(w.type,w.key,w.props,null,x.mode,j),j.ref=Hl(x,b,w),j.return=x,x=j)}return o(x);case vs:e:{for(P=w.key;b!==null;){if(b.key===P)if(b.tag===4&&b.stateNode.containerInfo===w.containerInfo&&b.stateNode.implementation===w.implementation){n(x,b.sibling),b=i(b,w.children||[]),b.return=x,x=b;break e}else{n(x,b);break}else t(x,b);b=b.sibling}b=Ym(w,x.mode,j),b.return=x,x=b}return o(x);case ua:return P=w._init,g(x,b,P(w._payload),j)}if(sc(w))return m(x,b,w,j);if(Ll(w))return y(x,b,w,j);vd(x,w)}return typeof w=="string"&&w!==""||typeof w=="number"?(w=""+w,b!==null&&b.tag===6?(n(x,b.sibling),b=i(b,w),b.return=x,x=b):(n(x,b),b=qm(w,x.mode,j),b.return=x,x=b),o(x)):n(x,b)}return g}var al=rE(!0),iE=rE(!1),Tf=Ga(null),Rf=null,Cs=null,wx=null;function jx(){wx=Cs=Rf=null}function Sx(e){var t=Tf.current;Qe(Tf),e._currentValue=t}function uv(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function $s(e,t){Rf=e,wx=Cs=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Tn=!0),e.firstContext=null)}function xr(e){var t=e._currentValue;if(wx!==e)if(e={context:e,memoizedValue:t,next:null},Cs===null){if(Rf===null)throw Error(Z(308));Cs=e,Rf.dependencies={lanes:0,firstContext:e}}else Cs=Cs.next=e;return t}var yo=null;function kx(e){yo===null?yo=[e]:yo.push(e)}function aE(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,kx(t)):(n.next=i.next,i.next=n),t.interleaved=n,Bi(e,r)}function Bi(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var da=!1;function Px(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function oE(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function zi(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function za(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,De&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Bi(e,n)}return i=r.interleaved,i===null?(t.next=t,kx(r)):(t.next=i.next,i.next=t),r.interleaved=t,Bi(e,n)}function Qd(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ux(e,n)}}function a1(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Mf(e,t,n,r){var i=e.updateQueue;da=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var l=s,c=l.next;l.next=null,o===null?a=c:o.next=c,o=l;var d=e.alternate;d!==null&&(d=d.updateQueue,s=d.lastBaseUpdate,s!==o&&(s===null?d.firstBaseUpdate=c:s.next=c,d.lastBaseUpdate=l))}if(a!==null){var f=i.baseState;o=0,d=c=l=null,s=a;do{var p=s.lane,h=s.eventTime;if((r&p)===p){d!==null&&(d=d.next={eventTime:h,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var m=e,y=s;switch(p=t,h=n,y.tag){case 1:if(m=y.payload,typeof m=="function"){f=m.call(h,f,p);break e}f=m;break e;case 3:m.flags=m.flags&-65537|128;case 0:if(m=y.payload,p=typeof m=="function"?m.call(h,f,p):m,p==null)break e;f=lt({},f,p);break e;case 2:da=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[s]:p.push(s))}else h={eventTime:h,lane:p,tag:s.tag,payload:s.payload,callback:s.callback,next:null},d===null?(c=d=h,l=f):d=d.next=h,o|=p;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(d===null&&(l=f),i.baseState=l,i.firstBaseUpdate=c,i.lastBaseUpdate=d,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);Ko|=o,e.lanes=o,e.memoizedState=f}}function o1(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(Z(191,i));i.call(r)}}}var ju={},oi=Ga(ju),Lc=Ga(ju),Fc=Ga(ju);function xo(e){if(e===ju)throw Error(Z(174));return e}function Cx(e,t){switch(qe(Fc,t),qe(Lc,e),qe(oi,ju),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Hg(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Hg(t,e)}Qe(oi),qe(oi,t)}function ol(){Qe(oi),Qe(Lc),Qe(Fc)}function sE(e){xo(Fc.current);var t=xo(oi.current),n=Hg(t,e.type);t!==n&&(qe(Lc,e),qe(oi,n))}function Ox(e){Lc.current===e&&(Qe(oi),Qe(Lc))}var ot=Ga(0);function Df(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bm=[];function Ex(){for(var e=0;e<Bm.length;e++)Bm[e]._workInProgressVersionPrimary=null;Bm.length=0}var Xd=Xi.ReactCurrentDispatcher,Wm=Xi.ReactCurrentBatchConfig,Ho=0,st=null,Et=null,Lt=null,zf=!1,jc=!1,Uc=0,_I=0;function nn(){throw Error(Z(321))}function Nx(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Fr(e[n],t[n]))return!1;return!0}function _x(e,t,n,r,i,a){if(Ho=a,st=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Xd.current=e===null||e.memoizedState===null?MI:DI,e=n(r,i),jc){a=0;do{if(jc=!1,Uc=0,25<=a)throw Error(Z(301));a+=1,Lt=Et=null,t.updateQueue=null,Xd.current=zI,e=n(r,i)}while(jc)}if(Xd.current=If,t=Et!==null&&Et.next!==null,Ho=0,Lt=Et=st=null,zf=!1,t)throw Error(Z(300));return e}function Ax(){var e=Uc!==0;return Uc=0,e}function Qr(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Lt===null?st.memoizedState=Lt=e:Lt=Lt.next=e,Lt}function br(){if(Et===null){var e=st.alternate;e=e!==null?e.memoizedState:null}else e=Et.next;var t=Lt===null?st.memoizedState:Lt.next;if(t!==null)Lt=t,Et=e;else{if(e===null)throw Error(Z(310));Et=e,e={memoizedState:Et.memoizedState,baseState:Et.baseState,baseQueue:Et.baseQueue,queue:Et.queue,next:null},Lt===null?st.memoizedState=Lt=e:Lt=Lt.next=e}return Lt}function Bc(e,t){return typeof t=="function"?t(e):t}function Hm(e){var t=br(),n=t.queue;if(n===null)throw Error(Z(311));n.lastRenderedReducer=e;var r=Et,i=r.baseQueue,a=n.pending;if(a!==null){if(i!==null){var o=i.next;i.next=a.next,a.next=o}r.baseQueue=i=a,n.pending=null}if(i!==null){a=i.next,r=r.baseState;var s=o=null,l=null,c=a;do{var d=c.lane;if((Ho&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var f={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(s=l=f,o=r):l=l.next=f,st.lanes|=d,Ko|=d}c=c.next}while(c!==null&&c!==a);l===null?o=r:l.next=s,Fr(r,t.memoizedState)||(Tn=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do a=i.lane,st.lanes|=a,Ko|=a,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Km(e){var t=br(),n=t.queue;if(n===null)throw Error(Z(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do a=e(a,o.action),o=o.next;while(o!==i);Fr(a,t.memoizedState)||(Tn=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function lE(){}function cE(e,t){var n=st,r=br(),i=t(),a=!Fr(r.memoizedState,i);if(a&&(r.memoizedState=i,Tn=!0),r=r.queue,Tx(fE.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||Lt!==null&&Lt.memoizedState.tag&1){if(n.flags|=2048,Wc(9,dE.bind(null,n,r,i,t),void 0,null),Ft===null)throw Error(Z(349));Ho&30||uE(n,t,i)}return i}function uE(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=st.updateQueue,t===null?(t={lastEffect:null,stores:null},st.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function dE(e,t,n,r){t.value=n,t.getSnapshot=r,pE(t)&&hE(e)}function fE(e,t,n){return n(function(){pE(t)&&hE(e)})}function pE(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Fr(e,n)}catch{return!0}}function hE(e){var t=Bi(e,1);t!==null&&$r(t,e,1,-1)}function s1(e){var t=Qr();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Bc,lastRenderedState:e},t.queue=e,e=e.dispatch=RI.bind(null,st,e),[t.memoizedState,e]}function Wc(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=st.updateQueue,t===null?(t={lastEffect:null,stores:null},st.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function mE(){return br().memoizedState}function Jd(e,t,n,r){var i=Qr();st.flags|=e,i.memoizedState=Wc(1|t,n,void 0,r===void 0?null:r)}function eh(e,t,n,r){var i=br();r=r===void 0?null:r;var a=void 0;if(Et!==null){var o=Et.memoizedState;if(a=o.destroy,r!==null&&Nx(r,o.deps)){i.memoizedState=Wc(t,n,a,r);return}}st.flags|=e,i.memoizedState=Wc(1|t,n,a,r)}function l1(e,t){return Jd(8390656,8,e,t)}function Tx(e,t){return eh(2048,8,e,t)}function gE(e,t){return eh(4,2,e,t)}function vE(e,t){return eh(4,4,e,t)}function yE(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function xE(e,t,n){return n=n!=null?n.concat([e]):null,eh(4,4,yE.bind(null,t,e),n)}function Rx(){}function bE(e,t){var n=br();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Nx(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function wE(e,t){var n=br();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Nx(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function jE(e,t,n){return Ho&21?(Fr(n,t)||(n=OO(),st.lanes|=n,Ko|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Tn=!0),e.memoizedState=n)}function AI(e,t){var n=Be;Be=n!==0&&4>n?n:4,e(!0);var r=Wm.transition;Wm.transition={};try{e(!1),t()}finally{Be=n,Wm.transition=r}}function SE(){return br().memoizedState}function TI(e,t,n){var r=$a(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},kE(e))PE(t,n);else if(n=aE(e,t,n,r),n!==null){var i=wn();$r(n,e,r,i),CE(n,t,r)}}function RI(e,t,n){var r=$a(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(kE(e))PE(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Fr(s,o)){var l=t.interleaved;l===null?(i.next=i,kx(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}n=aE(e,t,i,r),n!==null&&(i=wn(),$r(n,e,r,i),CE(n,t,r))}}function kE(e){var t=e.alternate;return e===st||t!==null&&t===st}function PE(e,t){jc=zf=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function CE(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ux(e,n)}}var If={readContext:xr,useCallback:nn,useContext:nn,useEffect:nn,useImperativeHandle:nn,useInsertionEffect:nn,useLayoutEffect:nn,useMemo:nn,useReducer:nn,useRef:nn,useState:nn,useDebugValue:nn,useDeferredValue:nn,useTransition:nn,useMutableSource:nn,useSyncExternalStore:nn,useId:nn,unstable_isNewReconciler:!1},MI={readContext:xr,useCallback:function(e,t){return Qr().memoizedState=[e,t===void 0?null:t],e},useContext:xr,useEffect:l1,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Jd(4194308,4,yE.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Jd(4194308,4,e,t)},useInsertionEffect:function(e,t){return Jd(4,2,e,t)},useMemo:function(e,t){var n=Qr();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Qr();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=TI.bind(null,st,e),[r.memoizedState,e]},useRef:function(e){var t=Qr();return e={current:e},t.memoizedState=e},useState:s1,useDebugValue:Rx,useDeferredValue:function(e){return Qr().memoizedState=e},useTransition:function(){var e=s1(!1),t=e[0];return e=AI.bind(null,e[1]),Qr().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=st,i=Qr();if(et){if(n===void 0)throw Error(Z(407));n=n()}else{if(n=t(),Ft===null)throw Error(Z(349));Ho&30||uE(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,l1(fE.bind(null,r,a,e),[e]),r.flags|=2048,Wc(9,dE.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=Qr(),t=Ft.identifierPrefix;if(et){var n=Ri,r=Ti;n=(r&~(1<<32-Ir(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Uc++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=_I++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},DI={readContext:xr,useCallback:bE,useContext:xr,useEffect:Tx,useImperativeHandle:xE,useInsertionEffect:gE,useLayoutEffect:vE,useMemo:wE,useReducer:Hm,useRef:mE,useState:function(){return Hm(Bc)},useDebugValue:Rx,useDeferredValue:function(e){var t=br();return jE(t,Et.memoizedState,e)},useTransition:function(){var e=Hm(Bc)[0],t=br().memoizedState;return[e,t]},useMutableSource:lE,useSyncExternalStore:cE,useId:SE,unstable_isNewReconciler:!1},zI={readContext:xr,useCallback:bE,useContext:xr,useEffect:Tx,useImperativeHandle:xE,useInsertionEffect:gE,useLayoutEffect:vE,useMemo:wE,useReducer:Km,useRef:mE,useState:function(){return Km(Bc)},useDebugValue:Rx,useDeferredValue:function(e){var t=br();return Et===null?t.memoizedState=e:jE(t,Et.memoizedState,e)},useTransition:function(){var e=Km(Bc)[0],t=br().memoizedState;return[e,t]},useMutableSource:lE,useSyncExternalStore:cE,useId:SE,unstable_isNewReconciler:!1};function Nr(e,t){if(e&&e.defaultProps){t=lt({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function dv(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:lt({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var th={isMounted:function(e){return(e=e._reactInternals)?is(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=wn(),i=$a(e),a=zi(r,i);a.payload=t,n!=null&&(a.callback=n),t=za(e,a,i),t!==null&&($r(t,e,i,r),Qd(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=wn(),i=$a(e),a=zi(r,i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=za(e,a,i),t!==null&&($r(t,e,i,r),Qd(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=wn(),r=$a(e),i=zi(n,r);i.tag=2,t!=null&&(i.callback=t),t=za(e,i,r),t!==null&&($r(t,e,r,n),Qd(t,e,r))}};function c1(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Dc(n,r)||!Dc(i,a):!0}function OE(e,t,n){var r=!1,i=Ha,a=t.contextType;return typeof a=="object"&&a!==null?a=xr(a):(i=In(t)?Bo:dn.current,r=t.contextTypes,a=(r=r!=null)?rl(e,i):Ha),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=th,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function u1(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&th.enqueueReplaceState(t,t.state,null)}function fv(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},Px(e);var a=t.contextType;typeof a=="object"&&a!==null?i.context=xr(a):(a=In(t)?Bo:dn.current,i.context=rl(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(dv(e,t,a,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&th.enqueueReplaceState(i,i.state,null),Mf(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function sl(e,t){try{var n="",r=t;do n+=uz(r),r=r.return;while(r);var i=n}catch(a){i=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:i,digest:null}}function Vm(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function pv(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var II=typeof WeakMap=="function"?WeakMap:Map;function EE(e,t,n){n=zi(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Lf||(Lf=!0,Sv=r),pv(e,t)},n}function NE(e,t,n){n=zi(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){pv(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){pv(e,t),typeof r!="function"&&(Ia===null?Ia=new Set([this]):Ia.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function d1(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new II;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=QI.bind(null,e,t,n),t.then(e,e))}function f1(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function p1(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=zi(-1,1),t.tag=2,za(n,t,1))),n.lanes|=1),e)}var $I=Xi.ReactCurrentOwner,Tn=!1;function vn(e,t,n,r){t.child=e===null?iE(t,null,n,r):al(t,e.child,n,r)}function h1(e,t,n,r,i){n=n.render;var a=t.ref;return $s(t,i),r=_x(e,t,n,r,a,i),n=Ax(),e!==null&&!Tn?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Wi(e,t,i)):(et&&n&&yx(t),t.flags|=1,vn(e,t,r,i),t.child)}function m1(e,t,n,r,i){if(e===null){var a=n.type;return typeof a=="function"&&!Ux(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,_E(e,t,a,r,i)):(e=rf(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&i)){var o=a.memoizedProps;if(n=n.compare,n=n!==null?n:Dc,n(o,r)&&e.ref===t.ref)return Wi(e,t,i)}return t.flags|=1,e=La(a,r),e.ref=t.ref,e.return=t,t.child=e}function _E(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Dc(a,r)&&e.ref===t.ref)if(Tn=!1,t.pendingProps=r=a,(e.lanes&i)!==0)e.flags&131072&&(Tn=!0);else return t.lanes=e.lanes,Wi(e,t,i)}return hv(e,t,n,r,i)}function AE(e,t,n){var r=t.pendingProps,i=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},qe(Es,Kn),Kn|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,qe(Es,Kn),Kn|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,qe(Es,Kn),Kn|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,qe(Es,Kn),Kn|=r;return vn(e,t,i,n),t.child}function TE(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function hv(e,t,n,r,i){var a=In(n)?Bo:dn.current;return a=rl(t,a),$s(t,i),n=_x(e,t,n,r,a,i),r=Ax(),e!==null&&!Tn?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Wi(e,t,i)):(et&&r&&yx(t),t.flags|=1,vn(e,t,n,i),t.child)}function g1(e,t,n,r,i){if(In(n)){var a=!0;Nf(t)}else a=!1;if($s(t,i),t.stateNode===null)ef(e,t),OE(t,n,r),fv(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,s=t.memoizedProps;o.props=s;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=xr(c):(c=In(n)?Bo:dn.current,c=rl(t,c));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==r||l!==c)&&u1(t,o,r,c),da=!1;var p=t.memoizedState;o.state=p,Mf(t,r,o,i),l=t.memoizedState,s!==r||p!==l||zn.current||da?(typeof d=="function"&&(dv(t,n,d,r),l=t.memoizedState),(s=da||c1(t,n,s,r,p,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),o.props=r,o.state=l,o.context=c,r=s):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,oE(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:Nr(t.type,s),o.props=c,f=t.pendingProps,p=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=xr(l):(l=In(n)?Bo:dn.current,l=rl(t,l));var h=n.getDerivedStateFromProps;(d=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(s!==f||p!==l)&&u1(t,o,r,l),da=!1,p=t.memoizedState,o.state=p,Mf(t,r,o,i);var m=t.memoizedState;s!==f||p!==m||zn.current||da?(typeof h=="function"&&(dv(t,n,h,r),m=t.memoizedState),(c=da||c1(t,n,c,r,p,m,l)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,m,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,m,l)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=m),o.props=r,o.state=m,o.context=l,r=c):(typeof o.componentDidUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&p===e.memoizedState||(t.flags|=1024),r=!1)}return mv(e,t,n,r,a,i)}function mv(e,t,n,r,i,a){TE(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&t1(t,n,!1),Wi(e,t,a);r=t.stateNode,$I.current=t;var s=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=al(t,e.child,null,a),t.child=al(t,null,s,a)):vn(e,t,s,a),t.memoizedState=r.state,i&&t1(t,n,!0),t.child}function RE(e){var t=e.stateNode;t.pendingContext?e1(e,t.pendingContext,t.pendingContext!==t.context):t.context&&e1(e,t.context,!1),Cx(e,t.containerInfo)}function v1(e,t,n,r,i){return il(),bx(i),t.flags|=256,vn(e,t,n,r),t.child}var gv={dehydrated:null,treeContext:null,retryLane:0};function vv(e){return{baseLanes:e,cachePool:null,transitions:null}}function ME(e,t,n){var r=t.pendingProps,i=ot.current,a=!1,o=(t.flags&128)!==0,s;if((s=o)||(s=e!==null&&e.memoizedState===null?!1:(i&2)!==0),s?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),qe(ot,i&1),e===null)return cv(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,a?(r=t.mode,a=t.child,o={mode:"hidden",children:o},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=o):a=ih(o,r,0,null),e=Io(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=vv(n),t.memoizedState=gv,e):Mx(t,o));if(i=e.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return LI(e,t,o,r,s,i,n);if(a){a=r.fallback,o=t.mode,i=e.child,s=i.sibling;var l={mode:"hidden",children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=La(i,l),r.subtreeFlags=i.subtreeFlags&14680064),s!==null?a=La(s,a):(a=Io(a,o,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,o=e.child.memoizedState,o=o===null?vv(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},a.memoizedState=o,a.childLanes=e.childLanes&~n,t.memoizedState=gv,r}return a=e.child,e=a.sibling,r=La(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Mx(e,t){return t=ih({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function yd(e,t,n,r){return r!==null&&bx(r),al(t,e.child,null,n),e=Mx(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function LI(e,t,n,r,i,a,o){if(n)return t.flags&256?(t.flags&=-257,r=Vm(Error(Z(422))),yd(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,i=t.mode,r=ih({mode:"visible",children:r.children},i,0,null),a=Io(a,i,o,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&al(t,e.child,null,o),t.child.memoizedState=vv(o),t.memoizedState=gv,a);if(!(t.mode&1))return yd(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var s=r.dgst;return r=s,a=Error(Z(419)),r=Vm(a,r,void 0),yd(e,t,o,r)}if(s=(o&e.childLanes)!==0,Tn||s){if(r=Ft,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==a.retryLane&&(a.retryLane=i,Bi(e,i),$r(r,e,i,-1))}return Fx(),r=Vm(Error(Z(421))),yd(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=XI.bind(null,e),i._reactRetry=t,null):(e=a.treeContext,qn=Da(i.nextSibling),Gn=t,et=!0,Rr=null,e!==null&&(fr[pr++]=Ti,fr[pr++]=Ri,fr[pr++]=Wo,Ti=e.id,Ri=e.overflow,Wo=t),t=Mx(t,r.children),t.flags|=4096,t)}function y1(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),uv(e.return,t,n)}function Zm(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function DE(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(vn(e,t,r.children,n),r=ot.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&y1(e,n,t);else if(e.tag===19)y1(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(qe(ot,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Df(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Zm(t,!1,i,n,a);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Df(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Zm(t,!0,n,null,a);break;case"together":Zm(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function ef(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Wi(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ko|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(Z(153));if(t.child!==null){for(e=t.child,n=La(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=La(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function FI(e,t,n){switch(t.tag){case 3:RE(t),il();break;case 5:sE(t);break;case 1:In(t.type)&&Nf(t);break;case 4:Cx(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;qe(Tf,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(qe(ot,ot.current&1),t.flags|=128,null):n&t.child.childLanes?ME(e,t,n):(qe(ot,ot.current&1),e=Wi(e,t,n),e!==null?e.sibling:null);qe(ot,ot.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return DE(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),qe(ot,ot.current),r)break;return null;case 22:case 23:return t.lanes=0,AE(e,t,n)}return Wi(e,t,n)}var zE,yv,IE,$E;zE=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};yv=function(){};IE=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,xo(oi.current);var a=null;switch(n){case"input":i=Fg(e,i),r=Fg(e,r),a=[];break;case"select":i=lt({},i,{value:void 0}),r=lt({},r,{value:void 0}),a=[];break;case"textarea":i=Wg(e,i),r=Wg(e,r),a=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Of)}Kg(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var s=i[c];for(o in s)s.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ec.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in r){var l=r[c];if(s=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&l!==s&&(l!=null||s!=null))if(c==="style")if(s){for(o in s)!s.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&s[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(a||(a=[]),a.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,s=s?s.__html:void 0,l!=null&&s!==l&&(a=a||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(a=a||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ec.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Ye("scroll",e),a||s===l||(a=[])):(a=a||[]).push(c,l))}n&&(a=a||[]).push("style",n);var c=a;(t.updateQueue=c)&&(t.flags|=4)}};$E=function(e,t,n,r){n!==r&&(t.flags|=4)};function Kl(e,t){if(!et)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function rn(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function UI(e,t,n){var r=t.pendingProps;switch(xx(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return rn(t),null;case 1:return In(t.type)&&Ef(),rn(t),null;case 3:return r=t.stateNode,ol(),Qe(zn),Qe(dn),Ex(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(gd(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Rr!==null&&(Cv(Rr),Rr=null))),yv(e,t),rn(t),null;case 5:Ox(t);var i=xo(Fc.current);if(n=t.type,e!==null&&t.stateNode!=null)IE(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(Z(166));return rn(t),null}if(e=xo(oi.current),gd(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[ni]=t,r[$c]=a,e=(t.mode&1)!==0,n){case"dialog":Ye("cancel",r),Ye("close",r);break;case"iframe":case"object":case"embed":Ye("load",r);break;case"video":case"audio":for(i=0;i<cc.length;i++)Ye(cc[i],r);break;case"source":Ye("error",r);break;case"img":case"image":case"link":Ye("error",r),Ye("load",r);break;case"details":Ye("toggle",r);break;case"input":Ow(r,a),Ye("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},Ye("invalid",r);break;case"textarea":Nw(r,a),Ye("invalid",r)}Kg(n,a),i=null;for(var o in a)if(a.hasOwnProperty(o)){var s=a[o];o==="children"?typeof s=="string"?r.textContent!==s&&(a.suppressHydrationWarning!==!0&&md(r.textContent,s,e),i=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&md(r.textContent,s,e),i=["children",""+s]):Ec.hasOwnProperty(o)&&s!=null&&o==="onScroll"&&Ye("scroll",r)}switch(n){case"input":sd(r),Ew(r,a,!0);break;case"textarea":sd(r),_w(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Of)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=fO(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[ni]=t,e[$c]=r,zE(e,t,!1,!1),t.stateNode=e;e:{switch(o=Vg(n,r),n){case"dialog":Ye("cancel",e),Ye("close",e),i=r;break;case"iframe":case"object":case"embed":Ye("load",e),i=r;break;case"video":case"audio":for(i=0;i<cc.length;i++)Ye(cc[i],e);i=r;break;case"source":Ye("error",e),i=r;break;case"img":case"image":case"link":Ye("error",e),Ye("load",e),i=r;break;case"details":Ye("toggle",e),i=r;break;case"input":Ow(e,r),i=Fg(e,r),Ye("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=lt({},r,{value:void 0}),Ye("invalid",e);break;case"textarea":Nw(e,r),i=Wg(e,r),Ye("invalid",e);break;default:i=r}Kg(n,i),s=i;for(a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="style"?mO(e,l):a==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&pO(e,l)):a==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Nc(e,l):typeof l=="number"&&Nc(e,""+l):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(Ec.hasOwnProperty(a)?l!=null&&a==="onScroll"&&Ye("scroll",e):l!=null&&ix(e,a,l,o))}switch(n){case"input":sd(e),Ew(e,r,!1);break;case"textarea":sd(e),_w(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Wa(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Ms(e,!!r.multiple,a,!1):r.defaultValue!=null&&Ms(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Of)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return rn(t),null;case 6:if(e&&t.stateNode!=null)$E(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(Z(166));if(n=xo(Fc.current),xo(oi.current),gd(t)){if(r=t.stateNode,n=t.memoizedProps,r[ni]=t,(a=r.nodeValue!==n)&&(e=Gn,e!==null))switch(e.tag){case 3:md(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&md(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[ni]=t,t.stateNode=r}return rn(t),null;case 13:if(Qe(ot),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(et&&qn!==null&&t.mode&1&&!(t.flags&128))nE(),il(),t.flags|=98560,a=!1;else if(a=gd(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(Z(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(Z(317));a[ni]=t}else il(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;rn(t),a=!1}else Rr!==null&&(Cv(Rr),Rr=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||ot.current&1?At===0&&(At=3):Fx())),t.updateQueue!==null&&(t.flags|=4),rn(t),null);case 4:return ol(),yv(e,t),e===null&&zc(t.stateNode.containerInfo),rn(t),null;case 10:return Sx(t.type._context),rn(t),null;case 17:return In(t.type)&&Ef(),rn(t),null;case 19:if(Qe(ot),a=t.memoizedState,a===null)return rn(t),null;if(r=(t.flags&128)!==0,o=a.rendering,o===null)if(r)Kl(a,!1);else{if(At!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Df(e),o!==null){for(t.flags|=128,Kl(a,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,o=a.alternate,o===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=o.childLanes,a.lanes=o.lanes,a.child=o.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=o.memoizedProps,a.memoizedState=o.memoizedState,a.updateQueue=o.updateQueue,a.type=o.type,e=o.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return qe(ot,ot.current&1|2),t.child}e=e.sibling}a.tail!==null&&bt()>ll&&(t.flags|=128,r=!0,Kl(a,!1),t.lanes=4194304)}else{if(!r)if(e=Df(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Kl(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!et)return rn(t),null}else 2*bt()-a.renderingStartTime>ll&&n!==1073741824&&(t.flags|=128,r=!0,Kl(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(n=a.last,n!==null?n.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=bt(),t.sibling=null,n=ot.current,qe(ot,r?n&1|2:n&1),t):(rn(t),null);case 22:case 23:return Lx(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Kn&1073741824&&(rn(t),t.subtreeFlags&6&&(t.flags|=8192)):rn(t),null;case 24:return null;case 25:return null}throw Error(Z(156,t.tag))}function BI(e,t){switch(xx(t),t.tag){case 1:return In(t.type)&&Ef(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ol(),Qe(zn),Qe(dn),Ex(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ox(t),null;case 13:if(Qe(ot),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(Z(340));il()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Qe(ot),null;case 4:return ol(),null;case 10:return Sx(t.type._context),null;case 22:case 23:return Lx(),null;case 24:return null;default:return null}}var xd=!1,ln=!1,WI=typeof WeakSet=="function"?WeakSet:Set,ae=null;function Os(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){gt(e,t,r)}else n.current=null}function xv(e,t,n){try{n()}catch(r){gt(e,t,r)}}var x1=!1;function HI(e,t){if(nv=kf,e=WO(),vx(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var o=0,s=-1,l=-1,c=0,d=0,f=e,p=null;t:for(;;){for(var h;f!==n||i!==0&&f.nodeType!==3||(s=o+i),f!==a||r!==0&&f.nodeType!==3||(l=o+r),f.nodeType===3&&(o+=f.nodeValue.length),(h=f.firstChild)!==null;)p=f,f=h;for(;;){if(f===e)break t;if(p===n&&++c===i&&(s=o),p===a&&++d===r&&(l=o),(h=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=h}n=s===-1||l===-1?null:{start:s,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(rv={focusedElem:e,selectionRange:n},kf=!1,ae=t;ae!==null;)if(t=ae,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ae=e;else for(;ae!==null;){t=ae;try{var m=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(m!==null){var y=m.memoizedProps,g=m.memoizedState,x=t.stateNode,b=x.getSnapshotBeforeUpdate(t.elementType===t.type?y:Nr(t.type,y),g);x.__reactInternalSnapshotBeforeUpdate=b}break;case 3:var w=t.stateNode.containerInfo;w.nodeType===1?w.textContent="":w.nodeType===9&&w.documentElement&&w.removeChild(w.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(Z(163))}}catch(j){gt(t,t.return,j)}if(e=t.sibling,e!==null){e.return=t.return,ae=e;break}ae=t.return}return m=x1,x1=!1,m}function Sc(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&xv(t,n,a)}i=i.next}while(i!==r)}}function nh(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function bv(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function LE(e){var t=e.alternate;t!==null&&(e.alternate=null,LE(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[ni],delete t[$c],delete t[ov],delete t[CI],delete t[OI])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function FE(e){return e.tag===5||e.tag===3||e.tag===4}function b1(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||FE(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function wv(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Of));else if(r!==4&&(e=e.child,e!==null))for(wv(e,t,n),e=e.sibling;e!==null;)wv(e,t,n),e=e.sibling}function jv(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(jv(e,t,n),e=e.sibling;e!==null;)jv(e,t,n),e=e.sibling}var Vt=null,Tr=!1;function la(e,t,n){for(n=n.child;n!==null;)UE(e,t,n),n=n.sibling}function UE(e,t,n){if(ai&&typeof ai.onCommitFiberUnmount=="function")try{ai.onCommitFiberUnmount(qp,n)}catch{}switch(n.tag){case 5:ln||Os(n,t);case 6:var r=Vt,i=Tr;Vt=null,la(e,t,n),Vt=r,Tr=i,Vt!==null&&(Tr?(e=Vt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Vt.removeChild(n.stateNode));break;case 18:Vt!==null&&(Tr?(e=Vt,n=n.stateNode,e.nodeType===8?Fm(e.parentNode,n):e.nodeType===1&&Fm(e,n),Rc(e)):Fm(Vt,n.stateNode));break;case 4:r=Vt,i=Tr,Vt=n.stateNode.containerInfo,Tr=!0,la(e,t,n),Vt=r,Tr=i;break;case 0:case 11:case 14:case 15:if(!ln&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var a=i,o=a.destroy;a=a.tag,o!==void 0&&(a&2||a&4)&&xv(n,t,o),i=i.next}while(i!==r)}la(e,t,n);break;case 1:if(!ln&&(Os(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){gt(n,t,s)}la(e,t,n);break;case 21:la(e,t,n);break;case 22:n.mode&1?(ln=(r=ln)||n.memoizedState!==null,la(e,t,n),ln=r):la(e,t,n);break;default:la(e,t,n)}}function w1(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new WI),t.forEach(function(r){var i=JI.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Er(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var a=e,o=t,s=o;e:for(;s!==null;){switch(s.tag){case 5:Vt=s.stateNode,Tr=!1;break e;case 3:Vt=s.stateNode.containerInfo,Tr=!0;break e;case 4:Vt=s.stateNode.containerInfo,Tr=!0;break e}s=s.return}if(Vt===null)throw Error(Z(160));UE(a,o,i),Vt=null,Tr=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(c){gt(i,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)BE(t,e),t=t.sibling}function BE(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Er(t,e),Vr(e),r&4){try{Sc(3,e,e.return),nh(3,e)}catch(y){gt(e,e.return,y)}try{Sc(5,e,e.return)}catch(y){gt(e,e.return,y)}}break;case 1:Er(t,e),Vr(e),r&512&&n!==null&&Os(n,n.return);break;case 5:if(Er(t,e),Vr(e),r&512&&n!==null&&Os(n,n.return),e.flags&32){var i=e.stateNode;try{Nc(i,"")}catch(y){gt(e,e.return,y)}}if(r&4&&(i=e.stateNode,i!=null)){var a=e.memoizedProps,o=n!==null?n.memoizedProps:a,s=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&uO(i,a),Vg(s,o);var c=Vg(s,a);for(o=0;o<l.length;o+=2){var d=l[o],f=l[o+1];d==="style"?mO(i,f):d==="dangerouslySetInnerHTML"?pO(i,f):d==="children"?Nc(i,f):ix(i,d,f,c)}switch(s){case"input":Ug(i,a);break;case"textarea":dO(i,a);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!a.multiple;var h=a.value;h!=null?Ms(i,!!a.multiple,h,!1):p!==!!a.multiple&&(a.defaultValue!=null?Ms(i,!!a.multiple,a.defaultValue,!0):Ms(i,!!a.multiple,a.multiple?[]:"",!1))}i[$c]=a}catch(y){gt(e,e.return,y)}}break;case 6:if(Er(t,e),Vr(e),r&4){if(e.stateNode===null)throw Error(Z(162));i=e.stateNode,a=e.memoizedProps;try{i.nodeValue=a}catch(y){gt(e,e.return,y)}}break;case 3:if(Er(t,e),Vr(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Rc(t.containerInfo)}catch(y){gt(e,e.return,y)}break;case 4:Er(t,e),Vr(e);break;case 13:Er(t,e),Vr(e),i=e.child,i.flags&8192&&(a=i.memoizedState!==null,i.stateNode.isHidden=a,!a||i.alternate!==null&&i.alternate.memoizedState!==null||(Ix=bt())),r&4&&w1(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(ln=(c=ln)||d,Er(t,e),ln=c):Er(t,e),Vr(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!d&&e.mode&1)for(ae=e,d=e.child;d!==null;){for(f=ae=d;ae!==null;){switch(p=ae,h=p.child,p.tag){case 0:case 11:case 14:case 15:Sc(4,p,p.return);break;case 1:Os(p,p.return);var m=p.stateNode;if(typeof m.componentWillUnmount=="function"){r=p,n=p.return;try{t=r,m.props=t.memoizedProps,m.state=t.memoizedState,m.componentWillUnmount()}catch(y){gt(r,n,y)}}break;case 5:Os(p,p.return);break;case 22:if(p.memoizedState!==null){S1(f);continue}}h!==null?(h.return=p,ae=h):S1(f)}d=d.sibling}e:for(d=null,f=e;;){if(f.tag===5){if(d===null){d=f;try{i=f.stateNode,c?(a=i.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,s.style.display=hO("display",o))}catch(y){gt(e,e.return,y)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(y){gt(e,e.return,y)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Er(t,e),Vr(e),r&4&&w1(e);break;case 21:break;default:Er(t,e),Vr(e)}}function Vr(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(FE(n)){var r=n;break e}n=n.return}throw Error(Z(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Nc(i,""),r.flags&=-33);var a=b1(e);jv(e,a,i);break;case 3:case 4:var o=r.stateNode.containerInfo,s=b1(e);wv(e,s,o);break;default:throw Error(Z(161))}}catch(l){gt(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function KI(e,t,n){ae=e,WE(e)}function WE(e,t,n){for(var r=(e.mode&1)!==0;ae!==null;){var i=ae,a=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||xd;if(!o){var s=i.alternate,l=s!==null&&s.memoizedState!==null||ln;s=xd;var c=ln;if(xd=o,(ln=l)&&!c)for(ae=i;ae!==null;)o=ae,l=o.child,o.tag===22&&o.memoizedState!==null?k1(i):l!==null?(l.return=o,ae=l):k1(i);for(;a!==null;)ae=a,WE(a),a=a.sibling;ae=i,xd=s,ln=c}j1(e)}else i.subtreeFlags&8772&&a!==null?(a.return=i,ae=a):j1(e)}}function j1(e){for(;ae!==null;){var t=ae;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ln||nh(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ln)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:Nr(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&o1(t,a,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}o1(t,o,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&Rc(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(Z(163))}ln||t.flags&512&&bv(t)}catch(p){gt(t,t.return,p)}}if(t===e){ae=null;break}if(n=t.sibling,n!==null){n.return=t.return,ae=n;break}ae=t.return}}function S1(e){for(;ae!==null;){var t=ae;if(t===e){ae=null;break}var n=t.sibling;if(n!==null){n.return=t.return,ae=n;break}ae=t.return}}function k1(e){for(;ae!==null;){var t=ae;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{nh(4,t)}catch(l){gt(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(l){gt(t,i,l)}}var a=t.return;try{bv(t)}catch(l){gt(t,a,l)}break;case 5:var o=t.return;try{bv(t)}catch(l){gt(t,o,l)}}}catch(l){gt(t,t.return,l)}if(t===e){ae=null;break}var s=t.sibling;if(s!==null){s.return=t.return,ae=s;break}ae=t.return}}var VI=Math.ceil,$f=Xi.ReactCurrentDispatcher,Dx=Xi.ReactCurrentOwner,yr=Xi.ReactCurrentBatchConfig,De=0,Ft=null,St=null,Gt=0,Kn=0,Es=Ga(0),At=0,Hc=null,Ko=0,rh=0,zx=0,kc=null,_n=null,Ix=0,ll=1/0,ki=null,Lf=!1,Sv=null,Ia=null,bd=!1,Na=null,Ff=0,Pc=0,kv=null,tf=-1,nf=0;function wn(){return De&6?bt():tf!==-1?tf:tf=bt()}function $a(e){return e.mode&1?De&2&&Gt!==0?Gt&-Gt:NI.transition!==null?(nf===0&&(nf=OO()),nf):(e=Be,e!==0||(e=window.event,e=e===void 0?16:MO(e.type)),e):1}function $r(e,t,n,r){if(50<Pc)throw Pc=0,kv=null,Error(Z(185));xu(e,n,r),(!(De&2)||e!==Ft)&&(e===Ft&&(!(De&2)&&(rh|=n),At===4&&ma(e,Gt)),$n(e,r),n===1&&De===0&&!(t.mode&1)&&(ll=bt()+500,Jp&&Qa()))}function $n(e,t){var n=e.callbackNode;Nz(e,t);var r=Sf(e,e===Ft?Gt:0);if(r===0)n!==null&&Rw(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Rw(n),t===1)e.tag===0?EI(P1.bind(null,e)):JO(P1.bind(null,e)),kI(function(){!(De&6)&&Qa()}),n=null;else{switch(EO(r)){case 1:n=cx;break;case 4:n=PO;break;case 16:n=jf;break;case 536870912:n=CO;break;default:n=jf}n=QE(n,HE.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function HE(e,t){if(tf=-1,nf=0,De&6)throw Error(Z(327));var n=e.callbackNode;if(Ls()&&e.callbackNode!==n)return null;var r=Sf(e,e===Ft?Gt:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Uf(e,r);else{t=r;var i=De;De|=2;var a=VE();(Ft!==e||Gt!==t)&&(ki=null,ll=bt()+500,zo(e,t));do try{YI();break}catch(s){KE(e,s)}while(!0);jx(),$f.current=a,De=i,St!==null?t=0:(Ft=null,Gt=0,t=At)}if(t!==0){if(t===2&&(i=Qg(e),i!==0&&(r=i,t=Pv(e,i))),t===1)throw n=Hc,zo(e,0),ma(e,r),$n(e,bt()),n;if(t===6)ma(e,r);else{if(i=e.current.alternate,!(r&30)&&!ZI(i)&&(t=Uf(e,r),t===2&&(a=Qg(e),a!==0&&(r=a,t=Pv(e,a))),t===1))throw n=Hc,zo(e,0),ma(e,r),$n(e,bt()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(Z(345));case 2:po(e,_n,ki);break;case 3:if(ma(e,r),(r&130023424)===r&&(t=Ix+500-bt(),10<t)){if(Sf(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){wn(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=av(po.bind(null,e,_n,ki),t);break}po(e,_n,ki);break;case 4:if(ma(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-Ir(r);a=1<<o,o=t[o],o>i&&(i=o),r&=~a}if(r=i,r=bt()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*VI(r/1960))-r,10<r){e.timeoutHandle=av(po.bind(null,e,_n,ki),r);break}po(e,_n,ki);break;case 5:po(e,_n,ki);break;default:throw Error(Z(329))}}}return $n(e,bt()),e.callbackNode===n?HE.bind(null,e):null}function Pv(e,t){var n=kc;return e.current.memoizedState.isDehydrated&&(zo(e,t).flags|=256),e=Uf(e,t),e!==2&&(t=_n,_n=n,t!==null&&Cv(t)),e}function Cv(e){_n===null?_n=e:_n.push.apply(_n,e)}function ZI(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Fr(a(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ma(e,t){for(t&=~zx,t&=~rh,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ir(t),r=1<<n;e[n]=-1,t&=~r}}function P1(e){if(De&6)throw Error(Z(327));Ls();var t=Sf(e,0);if(!(t&1))return $n(e,bt()),null;var n=Uf(e,t);if(e.tag!==0&&n===2){var r=Qg(e);r!==0&&(t=r,n=Pv(e,r))}if(n===1)throw n=Hc,zo(e,0),ma(e,t),$n(e,bt()),n;if(n===6)throw Error(Z(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,po(e,_n,ki),$n(e,bt()),null}function $x(e,t){var n=De;De|=1;try{return e(t)}finally{De=n,De===0&&(ll=bt()+500,Jp&&Qa())}}function Vo(e){Na!==null&&Na.tag===0&&!(De&6)&&Ls();var t=De;De|=1;var n=yr.transition,r=Be;try{if(yr.transition=null,Be=1,e)return e()}finally{Be=r,yr.transition=n,De=t,!(De&6)&&Qa()}}function Lx(){Kn=Es.current,Qe(Es)}function zo(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,SI(n)),St!==null)for(n=St.return;n!==null;){var r=n;switch(xx(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ef();break;case 3:ol(),Qe(zn),Qe(dn),Ex();break;case 5:Ox(r);break;case 4:ol();break;case 13:Qe(ot);break;case 19:Qe(ot);break;case 10:Sx(r.type._context);break;case 22:case 23:Lx()}n=n.return}if(Ft=e,St=e=La(e.current,null),Gt=Kn=t,At=0,Hc=null,zx=rh=Ko=0,_n=kc=null,yo!==null){for(t=0;t<yo.length;t++)if(n=yo[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,a=n.pending;if(a!==null){var o=a.next;a.next=i,r.next=o}n.pending=r}yo=null}return e}function KE(e,t){do{var n=St;try{if(jx(),Xd.current=If,zf){for(var r=st.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}zf=!1}if(Ho=0,Lt=Et=st=null,jc=!1,Uc=0,Dx.current=null,n===null||n.return===null){At=1,Hc=t,St=null;break}e:{var a=e,o=n.return,s=n,l=t;if(t=Gt,s.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=s,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var p=d.alternate;p?(d.updateQueue=p.updateQueue,d.memoizedState=p.memoizedState,d.lanes=p.lanes):(d.updateQueue=null,d.memoizedState=null)}var h=f1(o);if(h!==null){h.flags&=-257,p1(h,o,s,a,t),h.mode&1&&d1(a,c,t),t=h,l=c;var m=t.updateQueue;if(m===null){var y=new Set;y.add(l),t.updateQueue=y}else m.add(l);break e}else{if(!(t&1)){d1(a,c,t),Fx();break e}l=Error(Z(426))}}else if(et&&s.mode&1){var g=f1(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),p1(g,o,s,a,t),bx(sl(l,s));break e}}a=l=sl(l,s),At!==4&&(At=2),kc===null?kc=[a]:kc.push(a),a=o;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var x=EE(a,l,t);a1(a,x);break e;case 1:s=l;var b=a.type,w=a.stateNode;if(!(a.flags&128)&&(typeof b.getDerivedStateFromError=="function"||w!==null&&typeof w.componentDidCatch=="function"&&(Ia===null||!Ia.has(w)))){a.flags|=65536,t&=-t,a.lanes|=t;var j=NE(a,s,t);a1(a,j);break e}}a=a.return}while(a!==null)}qE(n)}catch(k){t=k,St===n&&n!==null&&(St=n=n.return);continue}break}while(!0)}function VE(){var e=$f.current;return $f.current=If,e===null?If:e}function Fx(){(At===0||At===3||At===2)&&(At=4),Ft===null||!(Ko&268435455)&&!(rh&268435455)||ma(Ft,Gt)}function Uf(e,t){var n=De;De|=2;var r=VE();(Ft!==e||Gt!==t)&&(ki=null,zo(e,t));do try{qI();break}catch(i){KE(e,i)}while(!0);if(jx(),De=n,$f.current=r,St!==null)throw Error(Z(261));return Ft=null,Gt=0,At}function qI(){for(;St!==null;)ZE(St)}function YI(){for(;St!==null&&!bz();)ZE(St)}function ZE(e){var t=GE(e.alternate,e,Kn);e.memoizedProps=e.pendingProps,t===null?qE(e):St=t,Dx.current=null}function qE(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=BI(n,t),n!==null){n.flags&=32767,St=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{At=6,St=null;return}}else if(n=UI(n,t,Kn),n!==null){St=n;return}if(t=t.sibling,t!==null){St=t;return}St=t=e}while(t!==null);At===0&&(At=5)}function po(e,t,n){var r=Be,i=yr.transition;try{yr.transition=null,Be=1,GI(e,t,n,r)}finally{yr.transition=i,Be=r}return null}function GI(e,t,n,r){do Ls();while(Na!==null);if(De&6)throw Error(Z(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(Z(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(_z(e,a),e===Ft&&(St=Ft=null,Gt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||bd||(bd=!0,QE(jf,function(){return Ls(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=yr.transition,yr.transition=null;var o=Be;Be=1;var s=De;De|=4,Dx.current=null,HI(e,n),BE(n,e),gI(rv),kf=!!nv,rv=nv=null,e.current=n,KI(n),wz(),De=s,Be=o,yr.transition=a}else e.current=n;if(bd&&(bd=!1,Na=e,Ff=i),a=e.pendingLanes,a===0&&(Ia=null),kz(n.stateNode),$n(e,bt()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Lf)throw Lf=!1,e=Sv,Sv=null,e;return Ff&1&&e.tag!==0&&Ls(),a=e.pendingLanes,a&1?e===kv?Pc++:(Pc=0,kv=e):Pc=0,Qa(),null}function Ls(){if(Na!==null){var e=EO(Ff),t=yr.transition,n=Be;try{if(yr.transition=null,Be=16>e?16:e,Na===null)var r=!1;else{if(e=Na,Na=null,Ff=0,De&6)throw Error(Z(331));var i=De;for(De|=4,ae=e.current;ae!==null;){var a=ae,o=a.child;if(ae.flags&16){var s=a.deletions;if(s!==null){for(var l=0;l<s.length;l++){var c=s[l];for(ae=c;ae!==null;){var d=ae;switch(d.tag){case 0:case 11:case 15:Sc(8,d,a)}var f=d.child;if(f!==null)f.return=d,ae=f;else for(;ae!==null;){d=ae;var p=d.sibling,h=d.return;if(LE(d),d===c){ae=null;break}if(p!==null){p.return=h,ae=p;break}ae=h}}}var m=a.alternate;if(m!==null){var y=m.child;if(y!==null){m.child=null;do{var g=y.sibling;y.sibling=null,y=g}while(y!==null)}}ae=a}}if(a.subtreeFlags&2064&&o!==null)o.return=a,ae=o;else e:for(;ae!==null;){if(a=ae,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Sc(9,a,a.return)}var x=a.sibling;if(x!==null){x.return=a.return,ae=x;break e}ae=a.return}}var b=e.current;for(ae=b;ae!==null;){o=ae;var w=o.child;if(o.subtreeFlags&2064&&w!==null)w.return=o,ae=w;else e:for(o=b;ae!==null;){if(s=ae,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:nh(9,s)}}catch(k){gt(s,s.return,k)}if(s===o){ae=null;break e}var j=s.sibling;if(j!==null){j.return=s.return,ae=j;break e}ae=s.return}}if(De=i,Qa(),ai&&typeof ai.onPostCommitFiberRoot=="function")try{ai.onPostCommitFiberRoot(qp,e)}catch{}r=!0}return r}finally{Be=n,yr.transition=t}}return!1}function C1(e,t,n){t=sl(n,t),t=EE(e,t,1),e=za(e,t,1),t=wn(),e!==null&&(xu(e,1,t),$n(e,t))}function gt(e,t,n){if(e.tag===3)C1(e,e,n);else for(;t!==null;){if(t.tag===3){C1(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ia===null||!Ia.has(r))){e=sl(n,e),e=NE(t,e,1),t=za(t,e,1),e=wn(),t!==null&&(xu(t,1,e),$n(t,e));break}}t=t.return}}function QI(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=wn(),e.pingedLanes|=e.suspendedLanes&n,Ft===e&&(Gt&n)===n&&(At===4||At===3&&(Gt&130023424)===Gt&&500>bt()-Ix?zo(e,0):zx|=n),$n(e,t)}function YE(e,t){t===0&&(e.mode&1?(t=ud,ud<<=1,!(ud&130023424)&&(ud=4194304)):t=1);var n=wn();e=Bi(e,t),e!==null&&(xu(e,t,n),$n(e,n))}function XI(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),YE(e,n)}function JI(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(Z(314))}r!==null&&r.delete(t),YE(e,n)}var GE;GE=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||zn.current)Tn=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Tn=!1,FI(e,t,n);Tn=!!(e.flags&131072)}else Tn=!1,et&&t.flags&1048576&&eE(t,Af,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;ef(e,t),e=t.pendingProps;var i=rl(t,dn.current);$s(t,n),i=_x(null,t,r,e,i,n);var a=Ax();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,In(r)?(a=!0,Nf(t)):a=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Px(t),i.updater=th,t.stateNode=i,i._reactInternals=t,fv(t,r,e,n),t=mv(null,t,r,!0,a,n)):(t.tag=0,et&&a&&yx(t),vn(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(ef(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=t$(r),e=Nr(r,e),i){case 0:t=hv(null,t,r,e,n);break e;case 1:t=g1(null,t,r,e,n);break e;case 11:t=h1(null,t,r,e,n);break e;case 14:t=m1(null,t,r,Nr(r.type,e),n);break e}throw Error(Z(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nr(r,i),hv(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nr(r,i),g1(e,t,r,i,n);case 3:e:{if(RE(t),e===null)throw Error(Z(387));r=t.pendingProps,a=t.memoizedState,i=a.element,oE(e,t),Mf(t,r,null,n);var o=t.memoizedState;if(r=o.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){i=sl(Error(Z(423)),t),t=v1(e,t,r,n,i);break e}else if(r!==i){i=sl(Error(Z(424)),t),t=v1(e,t,r,n,i);break e}else for(qn=Da(t.stateNode.containerInfo.firstChild),Gn=t,et=!0,Rr=null,n=iE(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(il(),r===i){t=Wi(e,t,n);break e}vn(e,t,r,n)}t=t.child}return t;case 5:return sE(t),e===null&&cv(t),r=t.type,i=t.pendingProps,a=e!==null?e.memoizedProps:null,o=i.children,iv(r,i)?o=null:a!==null&&iv(r,a)&&(t.flags|=32),TE(e,t),vn(e,t,o,n),t.child;case 6:return e===null&&cv(t),null;case 13:return ME(e,t,n);case 4:return Cx(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=al(t,null,r,n):vn(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nr(r,i),h1(e,t,r,i,n);case 7:return vn(e,t,t.pendingProps,n),t.child;case 8:return vn(e,t,t.pendingProps.children,n),t.child;case 12:return vn(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,a=t.memoizedProps,o=i.value,qe(Tf,r._currentValue),r._currentValue=o,a!==null)if(Fr(a.value,o)){if(a.children===i.children&&!zn.current){t=Wi(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){o=a.child;for(var l=s.firstContext;l!==null;){if(l.context===r){if(a.tag===1){l=zi(-1,n&-n),l.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),uv(a.return,n,t),s.lanes|=n;break}l=l.next}}else if(a.tag===10)o=a.type===t.type?null:a.child;else if(a.tag===18){if(o=a.return,o===null)throw Error(Z(341));o.lanes|=n,s=o.alternate,s!==null&&(s.lanes|=n),uv(o,n,t),o=a.sibling}else o=a.child;if(o!==null)o.return=a;else for(o=a;o!==null;){if(o===t){o=null;break}if(a=o.sibling,a!==null){a.return=o.return,o=a;break}o=o.return}a=o}vn(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,$s(t,n),i=xr(i),r=r(i),t.flags|=1,vn(e,t,r,n),t.child;case 14:return r=t.type,i=Nr(r,t.pendingProps),i=Nr(r.type,i),m1(e,t,r,i,n);case 15:return _E(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:Nr(r,i),ef(e,t),t.tag=1,In(r)?(e=!0,Nf(t)):e=!1,$s(t,n),OE(t,r,i),fv(t,r,i,n),mv(null,t,r,!0,e,n);case 19:return DE(e,t,n);case 22:return AE(e,t,n)}throw Error(Z(156,t.tag))};function QE(e,t){return kO(e,t)}function e$(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function mr(e,t,n,r){return new e$(e,t,n,r)}function Ux(e){return e=e.prototype,!(!e||!e.isReactComponent)}function t$(e){if(typeof e=="function")return Ux(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ox)return 11;if(e===sx)return 14}return 2}function La(e,t){var n=e.alternate;return n===null?(n=mr(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function rf(e,t,n,r,i,a){var o=2;if(r=e,typeof e=="function")Ux(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case ys:return Io(n.children,i,a,t);case ax:o=8,i|=8;break;case zg:return e=mr(12,n,t,i|2),e.elementType=zg,e.lanes=a,e;case Ig:return e=mr(13,n,t,i),e.elementType=Ig,e.lanes=a,e;case $g:return e=mr(19,n,t,i),e.elementType=$g,e.lanes=a,e;case sO:return ih(n,i,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case aO:o=10;break e;case oO:o=9;break e;case ox:o=11;break e;case sx:o=14;break e;case ua:o=16,r=null;break e}throw Error(Z(130,e==null?e:typeof e,""))}return t=mr(o,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function Io(e,t,n,r){return e=mr(7,e,r,t),e.lanes=n,e}function ih(e,t,n,r){return e=mr(22,e,r,t),e.elementType=sO,e.lanes=n,e.stateNode={isHidden:!1},e}function qm(e,t,n){return e=mr(6,e,null,t),e.lanes=n,e}function Ym(e,t,n){return t=mr(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function n$(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Nm(0),this.expirationTimes=Nm(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Nm(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Bx(e,t,n,r,i,a,o,s,l){return e=new n$(e,t,n,s,l),t===1?(t=1,a===!0&&(t|=8)):t=0,a=mr(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Px(a),e}function r$(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:vs,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function XE(e){if(!e)return Ha;e=e._reactInternals;e:{if(is(e)!==e||e.tag!==1)throw Error(Z(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(In(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(Z(171))}if(e.tag===1){var n=e.type;if(In(n))return XO(e,n,t)}return t}function JE(e,t,n,r,i,a,o,s,l){return e=Bx(n,r,!0,e,i,a,o,s,l),e.context=XE(null),n=e.current,r=wn(),i=$a(n),a=zi(r,i),a.callback=t??null,za(n,a,i),e.current.lanes=i,xu(e,i,r),$n(e,r),e}function ah(e,t,n,r){var i=t.current,a=wn(),o=$a(i);return n=XE(n),t.context===null?t.context=n:t.pendingContext=n,t=zi(a,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=za(i,t,o),e!==null&&($r(e,i,o,a),Qd(e,i,o)),o}function Bf(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function O1(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Wx(e,t){O1(e,t),(e=e.alternate)&&O1(e,t)}function i$(){return null}var eN=typeof reportError=="function"?reportError:function(e){console.error(e)};function Hx(e){this._internalRoot=e}oh.prototype.render=Hx.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(Z(409));ah(e,t,null,null)};oh.prototype.unmount=Hx.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Vo(function(){ah(null,e,null,null)}),t[Ui]=null}};function oh(e){this._internalRoot=e}oh.prototype.unstable_scheduleHydration=function(e){if(e){var t=AO();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ha.length&&t!==0&&t<ha[n].priority;n++);ha.splice(n,0,e),n===0&&RO(e)}};function Kx(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function sh(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function E1(){}function a$(e,t,n,r,i){if(i){if(typeof r=="function"){var a=r;r=function(){var c=Bf(o);a.call(c)}}var o=JE(t,r,e,0,null,!1,!1,"",E1);return e._reactRootContainer=o,e[Ui]=o.current,zc(e.nodeType===8?e.parentNode:e),Vo(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var s=r;r=function(){var c=Bf(l);s.call(c)}}var l=Bx(e,0,!1,null,null,!1,!1,"",E1);return e._reactRootContainer=l,e[Ui]=l.current,zc(e.nodeType===8?e.parentNode:e),Vo(function(){ah(t,l,n,r)}),l}function lh(e,t,n,r,i){var a=n._reactRootContainer;if(a){var o=a;if(typeof i=="function"){var s=i;i=function(){var l=Bf(o);s.call(l)}}ah(t,o,e,i)}else o=a$(n,t,e,i,r);return Bf(o)}NO=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=lc(t.pendingLanes);n!==0&&(ux(t,n|1),$n(t,bt()),!(De&6)&&(ll=bt()+500,Qa()))}break;case 13:Vo(function(){var r=Bi(e,1);if(r!==null){var i=wn();$r(r,e,1,i)}}),Wx(e,1)}};dx=function(e){if(e.tag===13){var t=Bi(e,134217728);if(t!==null){var n=wn();$r(t,e,134217728,n)}Wx(e,134217728)}};_O=function(e){if(e.tag===13){var t=$a(e),n=Bi(e,t);if(n!==null){var r=wn();$r(n,e,t,r)}Wx(e,t)}};AO=function(){return Be};TO=function(e,t){var n=Be;try{return Be=e,t()}finally{Be=n}};qg=function(e,t,n){switch(t){case"input":if(Ug(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Xp(r);if(!i)throw Error(Z(90));cO(r),Ug(r,i)}}}break;case"textarea":dO(e,n);break;case"select":t=n.value,t!=null&&Ms(e,!!n.multiple,t,!1)}};yO=$x;xO=Vo;var o$={usingClientEntryPoint:!1,Events:[wu,js,Xp,gO,vO,$x]},Vl={findFiberByHostInstance:vo,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},s$={bundleType:Vl.bundleType,version:Vl.version,rendererPackageName:Vl.rendererPackageName,rendererConfig:Vl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Xi.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=jO(e),e===null?null:e.stateNode},findFiberByHostInstance:Vl.findFiberByHostInstance||i$,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var wd=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!wd.isDisabled&&wd.supportsFiber)try{qp=wd.inject(s$),ai=wd}catch{}}er.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=o$;er.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Kx(t))throw Error(Z(200));return r$(e,t,null,n)};er.createRoot=function(e,t){if(!Kx(e))throw Error(Z(299));var n=!1,r="",i=eN;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Bx(e,1,!1,null,null,n,!1,r,i),e[Ui]=t.current,zc(e.nodeType===8?e.parentNode:e),new Hx(t)};er.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(Z(188)):(e=Object.keys(e).join(","),Error(Z(268,e)));return e=jO(t),e=e===null?null:e.stateNode,e};er.flushSync=function(e){return Vo(e)};er.hydrate=function(e,t,n){if(!sh(t))throw Error(Z(200));return lh(null,e,t,!0,n)};er.hydrateRoot=function(e,t,n){if(!Kx(e))throw Error(Z(405));var r=n!=null&&n.hydratedSources||null,i=!1,a="",o=eN;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=JE(t,null,e,1,n??null,i,!1,a,o),e[Ui]=t.current,zc(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new oh(t)};er.render=function(e,t,n){if(!sh(t))throw Error(Z(200));return lh(null,e,t,!1,n)};er.unmountComponentAtNode=function(e){if(!sh(e))throw Error(Z(40));return e._reactRootContainer?(Vo(function(){lh(null,null,e,!1,function(){e._reactRootContainer=null,e[Ui]=null})}),!0):!1};er.unstable_batchedUpdates=$x;er.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!sh(n))throw Error(Z(200));if(e==null||e._reactInternals===void 0)throw Error(Z(38));return lh(e,t,n,!1,r)};er.version="18.3.1-next-f1338f8080-20240426";function tN(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(tN)}catch(e){console.error(e)}}tN(),tO.exports=er;var Su=tO.exports,N1=Su;Mg.createRoot=N1.createRoot,Mg.hydrateRoot=N1.hydrateRoot;var wl=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},l$={setTimeout:(e,t)=>setTimeout(e,t),clearTimeout:e=>clearTimeout(e),setInterval:(e,t)=>setInterval(e,t),clearInterval:e=>clearInterval(e)},xa,Qy,TC,c$=(TC=class{constructor(){pe(this,xa,l$);pe(this,Qy,!1)}setTimeoutProvider(e){X(this,xa,e)}setTimeout(e,t){return E(this,xa).setTimeout(e,t)}clearTimeout(e){E(this,xa).clearTimeout(e)}setInterval(e,t){return E(this,xa).setInterval(e,t)}clearInterval(e){E(this,xa).clearInterval(e)}},xa=new WeakMap,Qy=new WeakMap,TC),bo=new c$;function u$(e){setTimeout(e,0)}var Zo=typeof window>"u"||"Deno"in globalThis;function yn(){}function d$(e,t){return typeof e=="function"?e(t):e}function Ov(e){return typeof e=="number"&&e>=0&&e!==1/0}function nN(e,t){return Math.max(e+(t||0)-Date.now(),0)}function Fa(e,t){return typeof e=="function"?e(t):e}function dr(e,t){return typeof e=="function"?e(t):e}function _1(e,t){const{type:n="all",exact:r,fetchStatus:i,predicate:a,queryKey:o,stale:s}=e;if(o){if(r){if(t.queryHash!==Vx(o,t.options))return!1}else if(!Kc(t.queryKey,o))return!1}if(n!=="all"){const l=t.isActive();if(n==="active"&&!l||n==="inactive"&&l)return!1}return!(typeof s=="boolean"&&t.isStale()!==s||i&&i!==t.state.fetchStatus||a&&!a(t))}function A1(e,t){const{exact:n,status:r,predicate:i,mutationKey:a}=e;if(a){if(!t.options.mutationKey)return!1;if(n){if(qo(t.options.mutationKey)!==qo(a))return!1}else if(!Kc(t.options.mutationKey,a))return!1}return!(r&&t.state.status!==r||i&&!i(t))}function Vx(e,t){return((t==null?void 0:t.queryKeyHashFn)||qo)(e)}function qo(e){return JSON.stringify(e,(t,n)=>Ev(n)?Object.keys(n).sort().reduce((r,i)=>(r[i]=n[i],r),{}):n)}function Kc(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?Object.keys(t).every(n=>Kc(e[n],t[n])):!1}var f$=Object.prototype.hasOwnProperty;function rN(e,t,n=0){if(e===t)return e;if(n>500)return t;const r=T1(e)&&T1(t);if(!r&&!(Ev(e)&&Ev(t)))return t;const a=(r?e:Object.keys(e)).length,o=r?t:Object.keys(t),s=o.length,l=r?new Array(s):{};let c=0;for(let d=0;d<s;d++){const f=r?d:o[d],p=e[f],h=t[f];if(p===h){l[f]=p,(r?d<a:f$.call(e,f))&&c++;continue}if(p===null||h===null||typeof p!="object"||typeof h!="object"){l[f]=h;continue}const m=rN(p,h,n+1);l[f]=m,m===p&&c++}return a===s&&c===a?e:l}function Wf(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(e[n]!==t[n])return!1;return!0}function T1(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function Ev(e){if(!R1(e))return!1;const t=e.constructor;if(t===void 0)return!0;const n=t.prototype;return!(!R1(n)||!n.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function R1(e){return Object.prototype.toString.call(e)==="[object Object]"}function p$(e){return new Promise(t=>{bo.setTimeout(t,e)})}function Nv(e,t,n){return typeof n.structuralSharing=="function"?n.structuralSharing(e,t):n.structuralSharing!==!1?rN(e,t):t}function h$(e,t,n=0){const r=[...e,t];return n&&r.length>n?r.slice(1):r}function m$(e,t,n=0){const r=[t,...e];return n&&r.length>n?r.slice(0,-1):r}var Zx=Symbol();function iN(e,t){return!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===Zx?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}function qx(e,t){return typeof e=="function"?e(...t):!!e}function g$(e,t,n){let r=!1,i;return Object.defineProperty(e,"signal",{enumerable:!0,get:()=>(i??(i=t()),r||(r=!0,i.aborted?n():i.addEventListener("abort",n,{once:!0})),i)}),e}var Oo,ba,Hs,RC,v$=(RC=class extends wl{constructor(){super();pe(this,Oo);pe(this,ba);pe(this,Hs);X(this,Hs,t=>{if(!Zo&&window.addEventListener){const n=()=>t();return window.addEventListener("visibilitychange",n,!1),()=>{window.removeEventListener("visibilitychange",n)}}})}onSubscribe(){E(this,ba)||this.setEventListener(E(this,Hs))}onUnsubscribe(){var t;this.hasListeners()||((t=E(this,ba))==null||t.call(this),X(this,ba,void 0))}setEventListener(t){var n;X(this,Hs,t),(n=E(this,ba))==null||n.call(this),X(this,ba,t(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(t){E(this,Oo)!==t&&(X(this,Oo,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(n=>{n(t)})}isFocused(){var t;return typeof E(this,Oo)=="boolean"?E(this,Oo):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},Oo=new WeakMap,ba=new WeakMap,Hs=new WeakMap,RC),Yx=new v$;function _v(){let e,t;const n=new Promise((i,a)=>{e=i,t=a});n.status="pending",n.catch(()=>{});function r(i){Object.assign(n,i),delete n.resolve,delete n.reject}return n.resolve=i=>{r({status:"fulfilled",value:i}),e(i)},n.reject=i=>{r({status:"rejected",reason:i}),t(i)},n}var y$=u$;function x$(){let e=[],t=0,n=s=>{s()},r=s=>{s()},i=y$;const a=s=>{t?e.push(s):i(()=>{n(s)})},o=()=>{const s=e;e=[],s.length&&i(()=>{r(()=>{s.forEach(l=>{n(l)})})})};return{batch:s=>{let l;t++;try{l=s()}finally{t--,t||o()}return l},batchCalls:s=>(...l)=>{a(()=>{s(...l)})},schedule:a,setNotifyFunction:s=>{n=s},setBatchNotifyFunction:s=>{r=s},setScheduler:s=>{i=s}}}var _t=x$(),Ks,wa,Vs,MC,b$=(MC=class extends wl{constructor(){super();pe(this,Ks,!0);pe(this,wa);pe(this,Vs);X(this,Vs,t=>{if(!Zo&&window.addEventListener){const n=()=>t(!0),r=()=>t(!1);return window.addEventListener("online",n,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",r)}}})}onSubscribe(){E(this,wa)||this.setEventListener(E(this,Vs))}onUnsubscribe(){var t;this.hasListeners()||((t=E(this,wa))==null||t.call(this),X(this,wa,void 0))}setEventListener(t){var n;X(this,Vs,t),(n=E(this,wa))==null||n.call(this),X(this,wa,t(this.setOnline.bind(this)))}setOnline(t){E(this,Ks)!==t&&(X(this,Ks,t),this.listeners.forEach(r=>{r(t)}))}isOnline(){return E(this,Ks)}},Ks=new WeakMap,wa=new WeakMap,Vs=new WeakMap,MC),Hf=new b$;function w$(e){return Math.min(1e3*2**e,3e4)}function aN(e){return(e??"online")==="online"?Hf.isOnline():!0}var Av=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function oN(e){let t=!1,n=0,r;const i=_v(),a=()=>i.status!=="pending",o=y=>{var g;if(!a()){const x=new Av(y);p(x),(g=e.onCancel)==null||g.call(e,x)}},s=()=>{t=!0},l=()=>{t=!1},c=()=>Yx.isFocused()&&(e.networkMode==="always"||Hf.isOnline())&&e.canRun(),d=()=>aN(e.networkMode)&&e.canRun(),f=y=>{a()||(r==null||r(),i.resolve(y))},p=y=>{a()||(r==null||r(),i.reject(y))},h=()=>new Promise(y=>{var g;r=x=>{(a()||c())&&y(x)},(g=e.onPause)==null||g.call(e)}).then(()=>{var y;r=void 0,a()||(y=e.onContinue)==null||y.call(e)}),m=()=>{if(a())return;let y;const g=n===0?e.initialPromise:void 0;try{y=g??e.fn()}catch(x){y=Promise.reject(x)}Promise.resolve(y).then(f).catch(x=>{var P;if(a())return;const b=e.retry??(Zo?0:3),w=e.retryDelay??w$,j=typeof w=="function"?w(n,x):w,k=b===!0||typeof b=="number"&&n<b||typeof b=="function"&&b(n,x);if(t||!k){p(x);return}n++,(P=e.onFail)==null||P.call(e,n,x),p$(j).then(()=>c()?void 0:h()).then(()=>{t?p(x):m()})})};return{promise:i,status:()=>i.status,cancel:o,continue:()=>(r==null||r(),i),cancelRetry:s,continueRetry:l,canStart:d,start:()=>(d()?m():h().then(m),i)}}var Eo,DC,sN=(DC=class{constructor(){pe(this,Eo)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),Ov(this.gcTime)&&X(this,Eo,bo.setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(Zo?1/0:5*60*1e3))}clearGcTimeout(){E(this,Eo)&&(bo.clearTimeout(E(this,Eo)),X(this,Eo,void 0))}},Eo=new WeakMap,DC),No,Zs,cr,_o,It,pu,Ao,_r,ji,zC,j$=(zC=class extends sN{constructor(t){super();pe(this,_r);pe(this,No);pe(this,Zs);pe(this,cr);pe(this,_o);pe(this,It);pe(this,pu);pe(this,Ao);X(this,Ao,!1),X(this,pu,t.defaultOptions),this.setOptions(t.options),this.observers=[],X(this,_o,t.client),X(this,cr,E(this,_o).getQueryCache()),this.queryKey=t.queryKey,this.queryHash=t.queryHash,X(this,No,D1(this.options)),this.state=t.state??E(this,No),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=E(this,It))==null?void 0:t.promise}setOptions(t){if(this.options={...E(this,pu),...t},this.updateGcTime(this.options.gcTime),this.state&&this.state.data===void 0){const n=D1(this.options);n.data!==void 0&&(this.setState(M1(n.data,n.dataUpdatedAt)),X(this,No,n))}}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&E(this,cr).remove(this)}setData(t,n){const r=Nv(this.state.data,t,this.options);return ke(this,_r,ji).call(this,{data:r,type:"success",dataUpdatedAt:n==null?void 0:n.updatedAt,manual:n==null?void 0:n.manual}),r}setState(t,n){ke(this,_r,ji).call(this,{type:"setState",state:t,setStateOptions:n})}cancel(t){var r,i;const n=(r=E(this,It))==null?void 0:r.promise;return(i=E(this,It))==null||i.cancel(t),n?n.then(yn).catch(yn):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(E(this,No))}isActive(){return this.observers.some(t=>dr(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Zx||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStatic(){return this.getObserversCount()>0?this.observers.some(t=>Fa(t.options.staleTime,this)==="static"):!1}isStale(){return this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0||this.state.isInvalidated}isStaleByTime(t=0){return this.state.data===void 0?!0:t==="static"?!1:this.state.isInvalidated?!0:!nN(this.state.dataUpdatedAt,t)}onFocus(){var n;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(n=E(this,It))==null||n.continue()}onOnline(){var n;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(n=E(this,It))==null||n.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),E(this,cr).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(n=>n!==t),this.observers.length||(E(this,It)&&(E(this,Ao)?E(this,It).cancel({revert:!0}):E(this,It).cancelRetry()),this.scheduleGc()),E(this,cr).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||ke(this,_r,ji).call(this,{type:"invalidate"})}async fetch(t,n){var l,c,d,f,p,h,m,y,g,x,b,w;if(this.state.fetchStatus!=="idle"&&((l=E(this,It))==null?void 0:l.status())!=="rejected"){if(this.state.data!==void 0&&(n!=null&&n.cancelRefetch))this.cancel({silent:!0});else if(E(this,It))return E(this,It).continueRetry(),E(this,It).promise}if(t&&this.setOptions(t),!this.options.queryFn){const j=this.observers.find(k=>k.options.queryFn);j&&this.setOptions(j.options)}const r=new AbortController,i=j=>{Object.defineProperty(j,"signal",{enumerable:!0,get:()=>(X(this,Ao,!0),r.signal)})},a=()=>{const j=iN(this.options,n),P=(()=>{const S={client:E(this,_o),queryKey:this.queryKey,meta:this.meta};return i(S),S})();return X(this,Ao,!1),this.options.persister?this.options.persister(j,P,this):j(P)},s=(()=>{const j={fetchOptions:n,options:this.options,queryKey:this.queryKey,client:E(this,_o),state:this.state,fetchFn:a};return i(j),j})();(c=this.options.behavior)==null||c.onFetch(s,this),X(this,Zs,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((d=s.fetchOptions)==null?void 0:d.meta))&&ke(this,_r,ji).call(this,{type:"fetch",meta:(f=s.fetchOptions)==null?void 0:f.meta}),X(this,It,oN({initialPromise:n==null?void 0:n.initialPromise,fn:s.fetchFn,onCancel:j=>{j instanceof Av&&j.revert&&this.setState({...E(this,Zs),fetchStatus:"idle"}),r.abort()},onFail:(j,k)=>{ke(this,_r,ji).call(this,{type:"failed",failureCount:j,error:k})},onPause:()=>{ke(this,_r,ji).call(this,{type:"pause"})},onContinue:()=>{ke(this,_r,ji).call(this,{type:"continue"})},retry:s.options.retry,retryDelay:s.options.retryDelay,networkMode:s.options.networkMode,canRun:()=>!0}));try{const j=await E(this,It).start();if(j===void 0)throw new Error(`${this.queryHash} data is undefined`);return this.setData(j),(h=(p=E(this,cr).config).onSuccess)==null||h.call(p,j,this),(y=(m=E(this,cr).config).onSettled)==null||y.call(m,j,this.state.error,this),j}catch(j){if(j instanceof Av){if(j.silent)return E(this,It).promise;if(j.revert){if(this.state.data===void 0)throw j;return this.state.data}}throw ke(this,_r,ji).call(this,{type:"error",error:j}),(x=(g=E(this,cr).config).onError)==null||x.call(g,j,this),(w=(b=E(this,cr).config).onSettled)==null||w.call(b,this.state.data,j,this),j}finally{this.scheduleGc()}}},No=new WeakMap,Zs=new WeakMap,cr=new WeakMap,_o=new WeakMap,It=new WeakMap,pu=new WeakMap,Ao=new WeakMap,_r=new WeakSet,ji=function(t){const n=r=>{switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...lN(r.data,this.options),fetchMeta:t.meta??null};case"success":const i={...r,...M1(t.data,t.dataUpdatedAt),dataUpdateCount:r.dataUpdateCount+1,...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};return X(this,Zs,t.manual?i:void 0),i;case"error":const a=t.error;return{...r,error:a,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:a,fetchStatus:"idle",status:"error",isInvalidated:!0};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=n(this.state),_t.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),E(this,cr).notify({query:this,type:"updated",action:t})})},zC);function lN(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:aN(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function M1(e,t){return{data:e,dataUpdatedAt:t??Date.now(),error:null,isInvalidated:!1,status:"success"}}function D1(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,n=t!==void 0,r=n?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:n?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"pending",fetchStatus:"idle"}}var En,_e,hu,gn,To,qs,Oi,ja,mu,Ys,Gs,Ro,Mo,Sa,Qs,$e,uc,Tv,Rv,Mv,Dv,zv,Iv,$v,cN,IC,S$=(IC=class extends wl{constructor(t,n){super();pe(this,$e);pe(this,En);pe(this,_e);pe(this,hu);pe(this,gn);pe(this,To);pe(this,qs);pe(this,Oi);pe(this,ja);pe(this,mu);pe(this,Ys);pe(this,Gs);pe(this,Ro);pe(this,Mo);pe(this,Sa);pe(this,Qs,new Set);this.options=n,X(this,En,t),X(this,ja,null),X(this,Oi,_v()),this.bindMethods(),this.setOptions(n)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(E(this,_e).addObserver(this),z1(E(this,_e),this.options)?ke(this,$e,uc).call(this):this.updateResult(),ke(this,$e,Dv).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return Lv(E(this,_e),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return Lv(E(this,_e),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,ke(this,$e,zv).call(this),ke(this,$e,Iv).call(this),E(this,_e).removeObserver(this)}setOptions(t){const n=this.options,r=E(this,_e);if(this.options=E(this,En).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof dr(this.options.enabled,E(this,_e))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");ke(this,$e,$v).call(this),E(this,_e).setOptions(this.options),n._defaulted&&!Wf(this.options,n)&&E(this,En).getQueryCache().notify({type:"observerOptionsUpdated",query:E(this,_e),observer:this});const i=this.hasListeners();i&&I1(E(this,_e),r,this.options,n)&&ke(this,$e,uc).call(this),this.updateResult(),i&&(E(this,_e)!==r||dr(this.options.enabled,E(this,_e))!==dr(n.enabled,E(this,_e))||Fa(this.options.staleTime,E(this,_e))!==Fa(n.staleTime,E(this,_e)))&&ke(this,$e,Tv).call(this);const a=ke(this,$e,Rv).call(this);i&&(E(this,_e)!==r||dr(this.options.enabled,E(this,_e))!==dr(n.enabled,E(this,_e))||a!==E(this,Sa))&&ke(this,$e,Mv).call(this,a)}getOptimisticResult(t){const n=E(this,En).getQueryCache().build(E(this,En),t),r=this.createResult(n,t);return P$(this,r)&&(X(this,gn,r),X(this,qs,this.options),X(this,To,E(this,_e).state)),r}getCurrentResult(){return E(this,gn)}trackResult(t,n){return new Proxy(t,{get:(r,i)=>(this.trackProp(i),n==null||n(i),i==="promise"&&(this.trackProp("data"),!this.options.experimental_prefetchInRender&&E(this,Oi).status==="pending"&&E(this,Oi).reject(new Error("experimental_prefetchInRender feature flag is not enabled"))),Reflect.get(r,i))})}trackProp(t){E(this,Qs).add(t)}getCurrentQuery(){return E(this,_e)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const n=E(this,En).defaultQueryOptions(t),r=E(this,En).getQueryCache().build(E(this,En),n);return r.fetch().then(()=>this.createResult(r,n))}fetch(t){return ke(this,$e,uc).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),E(this,gn)))}createResult(t,n){var N;const r=E(this,_e),i=this.options,a=E(this,gn),o=E(this,To),s=E(this,qs),c=t!==r?t.state:E(this,hu),{state:d}=t;let f={...d},p=!1,h;if(n._optimisticResults){const _=this.hasListeners(),M=!_&&z1(t,n),R=_&&I1(t,r,n,i);(M||R)&&(f={...f,...lN(d.data,t.options)}),n._optimisticResults==="isRestoring"&&(f.fetchStatus="idle")}let{error:m,errorUpdatedAt:y,status:g}=f;h=f.data;let x=!1;if(n.placeholderData!==void 0&&h===void 0&&g==="pending"){let _;a!=null&&a.isPlaceholderData&&n.placeholderData===(s==null?void 0:s.placeholderData)?(_=a.data,x=!0):_=typeof n.placeholderData=="function"?n.placeholderData((N=E(this,Gs))==null?void 0:N.state.data,E(this,Gs)):n.placeholderData,_!==void 0&&(g="success",h=Nv(a==null?void 0:a.data,_,n),p=!0)}if(n.select&&h!==void 0&&!x)if(a&&h===(o==null?void 0:o.data)&&n.select===E(this,mu))h=E(this,Ys);else try{X(this,mu,n.select),h=n.select(h),h=Nv(a==null?void 0:a.data,h,n),X(this,Ys,h),X(this,ja,null)}catch(_){X(this,ja,_)}E(this,ja)&&(m=E(this,ja),h=E(this,Ys),y=Date.now(),g="error");const b=f.fetchStatus==="fetching",w=g==="pending",j=g==="error",k=w&&b,P=h!==void 0,C={status:g,fetchStatus:f.fetchStatus,isPending:w,isSuccess:g==="success",isError:j,isInitialLoading:k,isLoading:k,data:h,dataUpdatedAt:f.dataUpdatedAt,error:m,errorUpdatedAt:y,failureCount:f.fetchFailureCount,failureReason:f.fetchFailureReason,errorUpdateCount:f.errorUpdateCount,isFetched:f.dataUpdateCount>0||f.errorUpdateCount>0,isFetchedAfterMount:f.dataUpdateCount>c.dataUpdateCount||f.errorUpdateCount>c.errorUpdateCount,isFetching:b,isRefetching:b&&!w,isLoadingError:j&&!P,isPaused:f.fetchStatus==="paused",isPlaceholderData:p,isRefetchError:j&&P,isStale:Gx(t,n),refetch:this.refetch,promise:E(this,Oi),isEnabled:dr(n.enabled,t)!==!1};if(this.options.experimental_prefetchInRender){const _=C.data!==void 0,M=C.status==="error"&&!_,R=ee=>{M?ee.reject(C.error):_&&ee.resolve(C.data)},G=()=>{const ee=X(this,Oi,C.promise=_v());R(ee)},V=E(this,Oi);switch(V.status){case"pending":t.queryHash===r.queryHash&&R(V);break;case"fulfilled":(M||C.data!==V.value)&&G();break;case"rejected":(!M||C.error!==V.reason)&&G();break}}return C}updateResult(){const t=E(this,gn),n=this.createResult(E(this,_e),this.options);if(X(this,To,E(this,_e).state),X(this,qs,this.options),E(this,To).data!==void 0&&X(this,Gs,E(this,_e)),Wf(n,t))return;X(this,gn,n);const r=()=>{if(!t)return!0;const{notifyOnChangeProps:i}=this.options,a=typeof i=="function"?i():i;if(a==="all"||!a&&!E(this,Qs).size)return!0;const o=new Set(a??E(this,Qs));return this.options.throwOnError&&o.add("error"),Object.keys(E(this,gn)).some(s=>{const l=s;return E(this,gn)[l]!==t[l]&&o.has(l)})};ke(this,$e,cN).call(this,{listeners:r()})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&ke(this,$e,Dv).call(this)}},En=new WeakMap,_e=new WeakMap,hu=new WeakMap,gn=new WeakMap,To=new WeakMap,qs=new WeakMap,Oi=new WeakMap,ja=new WeakMap,mu=new WeakMap,Ys=new WeakMap,Gs=new WeakMap,Ro=new WeakMap,Mo=new WeakMap,Sa=new WeakMap,Qs=new WeakMap,$e=new WeakSet,uc=function(t){ke(this,$e,$v).call(this);let n=E(this,_e).fetch(this.options,t);return t!=null&&t.throwOnError||(n=n.catch(yn)),n},Tv=function(){ke(this,$e,zv).call(this);const t=Fa(this.options.staleTime,E(this,_e));if(Zo||E(this,gn).isStale||!Ov(t))return;const r=nN(E(this,gn).dataUpdatedAt,t)+1;X(this,Ro,bo.setTimeout(()=>{E(this,gn).isStale||this.updateResult()},r))},Rv=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(E(this,_e)):this.options.refetchInterval)??!1},Mv=function(t){ke(this,$e,Iv).call(this),X(this,Sa,t),!(Zo||dr(this.options.enabled,E(this,_e))===!1||!Ov(E(this,Sa))||E(this,Sa)===0)&&X(this,Mo,bo.setInterval(()=>{(this.options.refetchIntervalInBackground||Yx.isFocused())&&ke(this,$e,uc).call(this)},E(this,Sa)))},Dv=function(){ke(this,$e,Tv).call(this),ke(this,$e,Mv).call(this,ke(this,$e,Rv).call(this))},zv=function(){E(this,Ro)&&(bo.clearTimeout(E(this,Ro)),X(this,Ro,void 0))},Iv=function(){E(this,Mo)&&(bo.clearInterval(E(this,Mo)),X(this,Mo,void 0))},$v=function(){const t=E(this,En).getQueryCache().build(E(this,En),this.options);if(t===E(this,_e))return;const n=E(this,_e);X(this,_e,t),X(this,hu,t.state),this.hasListeners()&&(n==null||n.removeObserver(this),t.addObserver(this))},cN=function(t){_t.batch(()=>{t.listeners&&this.listeners.forEach(n=>{n(E(this,gn))}),E(this,En).getQueryCache().notify({query:E(this,_e),type:"observerResultsUpdated"})})},IC);function k$(e,t){return dr(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&t.retryOnMount===!1)}function z1(e,t){return k$(e,t)||e.state.data!==void 0&&Lv(e,t,t.refetchOnMount)}function Lv(e,t,n){if(dr(t.enabled,e)!==!1&&Fa(t.staleTime,e)!=="static"){const r=typeof n=="function"?n(e):n;return r==="always"||r!==!1&&Gx(e,t)}return!1}function I1(e,t,n,r){return(e!==t||dr(r.enabled,e)===!1)&&(!n.suspense||e.state.status!=="error")&&Gx(e,n)}function Gx(e,t){return dr(t.enabled,e)!==!1&&e.isStaleByTime(Fa(t.staleTime,e))}function P$(e,t){return!Wf(e.getCurrentResult(),t)}function $1(e){return{onFetch:(t,n)=>{var d,f,p,h,m;const r=t.options,i=(p=(f=(d=t.fetchOptions)==null?void 0:d.meta)==null?void 0:f.fetchMore)==null?void 0:p.direction,a=((h=t.state.data)==null?void 0:h.pages)||[],o=((m=t.state.data)==null?void 0:m.pageParams)||[];let s={pages:[],pageParams:[]},l=0;const c=async()=>{let y=!1;const g=w=>{g$(w,()=>t.signal,()=>y=!0)},x=iN(t.options,t.fetchOptions),b=async(w,j,k)=>{if(y)return Promise.reject();if(j==null&&w.pages.length)return Promise.resolve(w);const S=(()=>{const M={client:t.client,queryKey:t.queryKey,pageParam:j,direction:k?"backward":"forward",meta:t.options.meta};return g(M),M})(),C=await x(S),{maxPages:N}=t.options,_=k?m$:h$;return{pages:_(w.pages,C,N),pageParams:_(w.pageParams,j,N)}};if(i&&a.length){const w=i==="backward",j=w?C$:L1,k={pages:a,pageParams:o},P=j(r,k);s=await b(k,P,w)}else{const w=e??a.length;do{const j=l===0?o[0]??r.initialPageParam:L1(r,s);if(l>0&&j==null)break;s=await b(s,j),l++}while(l<w)}return s};t.options.persister?t.fetchFn=()=>{var y,g;return(g=(y=t.options).persister)==null?void 0:g.call(y,c,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},n)}:t.fetchFn=c}}}function L1(e,{pages:t,pageParams:n}){const r=t.length-1;return t.length>0?e.getNextPageParam(t[r],t,n[r],n):void 0}function C$(e,{pages:t,pageParams:n}){var r;return t.length>0?(r=e.getPreviousPageParam)==null?void 0:r.call(e,t[0],t,n[0],n):void 0}var gu,Xr,an,Do,Jr,ca,$C,O$=($C=class extends sN{constructor(t){super();pe(this,Jr);pe(this,gu);pe(this,Xr);pe(this,an);pe(this,Do);X(this,gu,t.client),this.mutationId=t.mutationId,X(this,an,t.mutationCache),X(this,Xr,[]),this.state=t.state||uN(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){E(this,Xr).includes(t)||(E(this,Xr).push(t),this.clearGcTimeout(),E(this,an).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){X(this,Xr,E(this,Xr).filter(n=>n!==t)),this.scheduleGc(),E(this,an).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){E(this,Xr).length||(this.state.status==="pending"?this.scheduleGc():E(this,an).remove(this))}continue(){var t;return((t=E(this,Do))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var o,s,l,c,d,f,p,h,m,y,g,x,b,w,j,k,P,S;const n=()=>{ke(this,Jr,ca).call(this,{type:"continue"})},r={client:E(this,gu),meta:this.options.meta,mutationKey:this.options.mutationKey};X(this,Do,oN({fn:()=>this.options.mutationFn?this.options.mutationFn(t,r):Promise.reject(new Error("No mutationFn found")),onFail:(C,N)=>{ke(this,Jr,ca).call(this,{type:"failed",failureCount:C,error:N})},onPause:()=>{ke(this,Jr,ca).call(this,{type:"pause"})},onContinue:n,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>E(this,an).canRun(this)}));const i=this.state.status==="pending",a=!E(this,Do).canStart();try{if(i)n();else{ke(this,Jr,ca).call(this,{type:"pending",variables:t,isPaused:a}),E(this,an).config.onMutate&&await E(this,an).config.onMutate(t,this,r);const N=await((s=(o=this.options).onMutate)==null?void 0:s.call(o,t,r));N!==this.state.context&&ke(this,Jr,ca).call(this,{type:"pending",context:N,variables:t,isPaused:a})}const C=await E(this,Do).start();return await((c=(l=E(this,an).config).onSuccess)==null?void 0:c.call(l,C,t,this.state.context,this,r)),await((f=(d=this.options).onSuccess)==null?void 0:f.call(d,C,t,this.state.context,r)),await((h=(p=E(this,an).config).onSettled)==null?void 0:h.call(p,C,null,this.state.variables,this.state.context,this,r)),await((y=(m=this.options).onSettled)==null?void 0:y.call(m,C,null,t,this.state.context,r)),ke(this,Jr,ca).call(this,{type:"success",data:C}),C}catch(C){try{await((x=(g=E(this,an).config).onError)==null?void 0:x.call(g,C,t,this.state.context,this,r))}catch(N){Promise.reject(N)}try{await((w=(b=this.options).onError)==null?void 0:w.call(b,C,t,this.state.context,r))}catch(N){Promise.reject(N)}try{await((k=(j=E(this,an).config).onSettled)==null?void 0:k.call(j,void 0,C,this.state.variables,this.state.context,this,r))}catch(N){Promise.reject(N)}try{await((S=(P=this.options).onSettled)==null?void 0:S.call(P,void 0,C,t,this.state.context,r))}catch(N){Promise.reject(N)}throw ke(this,Jr,ca).call(this,{type:"error",error:C}),C}finally{E(this,an).runNext(this)}}},gu=new WeakMap,Xr=new WeakMap,an=new WeakMap,Do=new WeakMap,Jr=new WeakSet,ca=function(t){const n=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=n(this.state),_t.batch(()=>{E(this,Xr).forEach(r=>{r.onMutationUpdate(t)}),E(this,an).notify({mutation:this,type:"updated",action:t})})},$C);function uN(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var Ei,Ar,vu,LC,E$=(LC=class extends wl{constructor(t={}){super();pe(this,Ei);pe(this,Ar);pe(this,vu);this.config=t,X(this,Ei,new Set),X(this,Ar,new Map),X(this,vu,0)}build(t,n,r){const i=new O$({client:t,mutationCache:this,mutationId:++id(this,vu)._,options:t.defaultMutationOptions(n),state:r});return this.add(i),i}add(t){E(this,Ei).add(t);const n=jd(t);if(typeof n=="string"){const r=E(this,Ar).get(n);r?r.push(t):E(this,Ar).set(n,[t])}this.notify({type:"added",mutation:t})}remove(t){if(E(this,Ei).delete(t)){const n=jd(t);if(typeof n=="string"){const r=E(this,Ar).get(n);if(r)if(r.length>1){const i=r.indexOf(t);i!==-1&&r.splice(i,1)}else r[0]===t&&E(this,Ar).delete(n)}}this.notify({type:"removed",mutation:t})}canRun(t){const n=jd(t);if(typeof n=="string"){const r=E(this,Ar).get(n),i=r==null?void 0:r.find(a=>a.state.status==="pending");return!i||i===t}else return!0}runNext(t){var r;const n=jd(t);if(typeof n=="string"){const i=(r=E(this,Ar).get(n))==null?void 0:r.find(a=>a!==t&&a.state.isPaused);return(i==null?void 0:i.continue())??Promise.resolve()}else return Promise.resolve()}clear(){_t.batch(()=>{E(this,Ei).forEach(t=>{this.notify({type:"removed",mutation:t})}),E(this,Ei).clear(),E(this,Ar).clear()})}getAll(){return Array.from(E(this,Ei))}find(t){const n={exact:!0,...t};return this.getAll().find(r=>A1(n,r))}findAll(t={}){return this.getAll().filter(n=>A1(t,n))}notify(t){_t.batch(()=>{this.listeners.forEach(n=>{n(t)})})}resumePausedMutations(){const t=this.getAll().filter(n=>n.state.isPaused);return _t.batch(()=>Promise.all(t.map(n=>n.continue().catch(yn))))}},Ei=new WeakMap,Ar=new WeakMap,vu=new WeakMap,LC);function jd(e){var t;return(t=e.options.scope)==null?void 0:t.id}var Ni,ka,Nn,_i,Li,af,Fv,FC,N$=(FC=class extends wl{constructor(n,r){super();pe(this,Li);pe(this,Ni);pe(this,ka);pe(this,Nn);pe(this,_i);X(this,Ni,n),this.setOptions(r),this.bindMethods(),ke(this,Li,af).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(n){var i;const r=this.options;this.options=E(this,Ni).defaultMutationOptions(n),Wf(this.options,r)||E(this,Ni).getMutationCache().notify({type:"observerOptionsUpdated",mutation:E(this,Nn),observer:this}),r!=null&&r.mutationKey&&this.options.mutationKey&&qo(r.mutationKey)!==qo(this.options.mutationKey)?this.reset():((i=E(this,Nn))==null?void 0:i.state.status)==="pending"&&E(this,Nn).setOptions(this.options)}onUnsubscribe(){var n;this.hasListeners()||(n=E(this,Nn))==null||n.removeObserver(this)}onMutationUpdate(n){ke(this,Li,af).call(this),ke(this,Li,Fv).call(this,n)}getCurrentResult(){return E(this,ka)}reset(){var n;(n=E(this,Nn))==null||n.removeObserver(this),X(this,Nn,void 0),ke(this,Li,af).call(this),ke(this,Li,Fv).call(this)}mutate(n,r){var i;return X(this,_i,r),(i=E(this,Nn))==null||i.removeObserver(this),X(this,Nn,E(this,Ni).getMutationCache().build(E(this,Ni),this.options)),E(this,Nn).addObserver(this),E(this,Nn).execute(n)}},Ni=new WeakMap,ka=new WeakMap,Nn=new WeakMap,_i=new WeakMap,Li=new WeakSet,af=function(){var r;const n=((r=E(this,Nn))==null?void 0:r.state)??uN();X(this,ka,{...n,isPending:n.status==="pending",isSuccess:n.status==="success",isError:n.status==="error",isIdle:n.status==="idle",mutate:this.mutate,reset:this.reset})},Fv=function(n){_t.batch(()=>{var r,i,a,o,s,l,c,d;if(E(this,_i)&&this.hasListeners()){const f=E(this,ka).variables,p=E(this,ka).context,h={client:E(this,Ni),meta:this.options.meta,mutationKey:this.options.mutationKey};if((n==null?void 0:n.type)==="success"){try{(i=(r=E(this,_i)).onSuccess)==null||i.call(r,n.data,f,p,h)}catch(m){Promise.reject(m)}try{(o=(a=E(this,_i)).onSettled)==null||o.call(a,n.data,null,f,p,h)}catch(m){Promise.reject(m)}}else if((n==null?void 0:n.type)==="error"){try{(l=(s=E(this,_i)).onError)==null||l.call(s,n.error,f,p,h)}catch(m){Promise.reject(m)}try{(d=(c=E(this,_i)).onSettled)==null||d.call(c,void 0,n.error,f,p,h)}catch(m){Promise.reject(m)}}}this.listeners.forEach(f=>{f(E(this,ka))})})},FC),ei,UC,_$=(UC=class extends wl{constructor(t={}){super();pe(this,ei);this.config=t,X(this,ei,new Map)}build(t,n,r){const i=n.queryKey,a=n.queryHash??Vx(i,n);let o=this.get(a);return o||(o=new j$({client:t,queryKey:i,queryHash:a,options:t.defaultQueryOptions(n),state:r,defaultOptions:t.getQueryDefaults(i)}),this.add(o)),o}add(t){E(this,ei).has(t.queryHash)||(E(this,ei).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const n=E(this,ei).get(t.queryHash);n&&(t.destroy(),n===t&&E(this,ei).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){_t.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return E(this,ei).get(t)}getAll(){return[...E(this,ei).values()]}find(t){const n={exact:!0,...t};return this.getAll().find(r=>_1(n,r))}findAll(t={}){const n=this.getAll();return Object.keys(t).length>0?n.filter(r=>_1(t,r)):n}notify(t){_t.batch(()=>{this.listeners.forEach(n=>{n(t)})})}onFocus(){_t.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){_t.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},ei=new WeakMap,UC),pt,Pa,Ca,Xs,Js,Oa,el,tl,BC,A$=(BC=class{constructor(e={}){pe(this,pt);pe(this,Pa);pe(this,Ca);pe(this,Xs);pe(this,Js);pe(this,Oa);pe(this,el);pe(this,tl);X(this,pt,e.queryCache||new _$),X(this,Pa,e.mutationCache||new E$),X(this,Ca,e.defaultOptions||{}),X(this,Xs,new Map),X(this,Js,new Map),X(this,Oa,0)}mount(){id(this,Oa)._++,E(this,Oa)===1&&(X(this,el,Yx.subscribe(async e=>{e&&(await this.resumePausedMutations(),E(this,pt).onFocus())})),X(this,tl,Hf.subscribe(async e=>{e&&(await this.resumePausedMutations(),E(this,pt).onOnline())})))}unmount(){var e,t;id(this,Oa)._--,E(this,Oa)===0&&((e=E(this,el))==null||e.call(this),X(this,el,void 0),(t=E(this,tl))==null||t.call(this),X(this,tl,void 0))}isFetching(e){return E(this,pt).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return E(this,Pa).findAll({...e,status:"pending"}).length}getQueryData(e){var n;const t=this.defaultQueryOptions({queryKey:e});return(n=E(this,pt).get(t.queryHash))==null?void 0:n.state.data}ensureQueryData(e){const t=this.defaultQueryOptions(e),n=E(this,pt).build(this,t),r=n.state.data;return r===void 0?this.fetchQuery(e):(e.revalidateIfStale&&n.isStaleByTime(Fa(t.staleTime,n))&&this.prefetchQuery(t),Promise.resolve(r))}getQueriesData(e){return E(this,pt).findAll(e).map(({queryKey:t,state:n})=>{const r=n.data;return[t,r]})}setQueryData(e,t,n){const r=this.defaultQueryOptions({queryKey:e}),i=E(this,pt).get(r.queryHash),a=i==null?void 0:i.state.data,o=d$(t,a);if(o!==void 0)return E(this,pt).build(this,r).setData(o,{...n,manual:!0})}setQueriesData(e,t,n){return _t.batch(()=>E(this,pt).findAll(e).map(({queryKey:r})=>[r,this.setQueryData(r,t,n)]))}getQueryState(e){var n;const t=this.defaultQueryOptions({queryKey:e});return(n=E(this,pt).get(t.queryHash))==null?void 0:n.state}removeQueries(e){const t=E(this,pt);_t.batch(()=>{t.findAll(e).forEach(n=>{t.remove(n)})})}resetQueries(e,t){const n=E(this,pt);return _t.batch(()=>(n.findAll(e).forEach(r=>{r.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){const n={revert:!0,...t},r=_t.batch(()=>E(this,pt).findAll(e).map(i=>i.cancel(n)));return Promise.all(r).then(yn).catch(yn)}invalidateQueries(e,t={}){return _t.batch(()=>(E(this,pt).findAll(e).forEach(n=>{n.invalidate()}),(e==null?void 0:e.refetchType)==="none"?Promise.resolve():this.refetchQueries({...e,type:(e==null?void 0:e.refetchType)??(e==null?void 0:e.type)??"active"},t)))}refetchQueries(e,t={}){const n={...t,cancelRefetch:t.cancelRefetch??!0},r=_t.batch(()=>E(this,pt).findAll(e).filter(i=>!i.isDisabled()&&!i.isStatic()).map(i=>{let a=i.fetch(void 0,n);return n.throwOnError||(a=a.catch(yn)),i.state.fetchStatus==="paused"?Promise.resolve():a}));return Promise.all(r).then(yn)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const n=E(this,pt).build(this,t);return n.isStaleByTime(Fa(t.staleTime,n))?n.fetch(t):Promise.resolve(n.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(yn).catch(yn)}fetchInfiniteQuery(e){return e.behavior=$1(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(yn).catch(yn)}ensureInfiniteQueryData(e){return e.behavior=$1(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return Hf.isOnline()?E(this,Pa).resumePausedMutations():Promise.resolve()}getQueryCache(){return E(this,pt)}getMutationCache(){return E(this,Pa)}getDefaultOptions(){return E(this,Ca)}setDefaultOptions(e){X(this,Ca,e)}setQueryDefaults(e,t){E(this,Xs).set(qo(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...E(this,Xs).values()],n={};return t.forEach(r=>{Kc(e,r.queryKey)&&Object.assign(n,r.defaultOptions)}),n}setMutationDefaults(e,t){E(this,Js).set(qo(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...E(this,Js).values()],n={};return t.forEach(r=>{Kc(e,r.mutationKey)&&Object.assign(n,r.defaultOptions)}),n}defaultQueryOptions(e){if(e._defaulted)return e;const t={...E(this,Ca).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=Vx(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===Zx&&(t.enabled=!1),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...E(this,Ca).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){E(this,pt).clear(),E(this,Pa).clear()}},pt=new WeakMap,Pa=new WeakMap,Ca=new WeakMap,Xs=new WeakMap,Js=new WeakMap,Oa=new WeakMap,el=new WeakMap,tl=new WeakMap,BC),dN=v.createContext(void 0),Qx=e=>{const t=v.useContext(dN);if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},T$=({client:e,children:t})=>(v.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),u.jsx(dN.Provider,{value:e,children:t})),fN=v.createContext(!1),R$=()=>v.useContext(fN);fN.Provider;function M$(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var D$=v.createContext(M$()),z$=()=>v.useContext(D$),I$=(e,t,n)=>{const r=n!=null&&n.state.error&&typeof e.throwOnError=="function"?qx(e.throwOnError,[n.state.error,n]):e.throwOnError;(e.suspense||e.experimental_prefetchInRender||r)&&(t.isReset()||(e.retryOnMount=!1))},$$=e=>{v.useEffect(()=>{e.clearReset()},[e])},L$=({result:e,errorResetBoundary:t,throwOnError:n,query:r,suspense:i})=>e.isError&&!t.isReset()&&!e.isFetching&&r&&(i&&e.data===void 0||qx(n,[e.error,r])),F$=e=>{if(e.suspense){const n=i=>i==="static"?i:Math.max(i??1e3,1e3),r=e.staleTime;e.staleTime=typeof r=="function"?(...i)=>n(r(...i)):n(r),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3))}},U$=(e,t)=>e.isLoading&&e.isFetching&&!t,B$=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,F1=(e,t,n)=>t.fetchOptimistic(e).catch(()=>{n.clearReset()});function W$(e,t,n){var p,h,m,y;const r=R$(),i=z$(),a=Qx(),o=a.defaultQueryOptions(e);(h=(p=a.getDefaultOptions().queries)==null?void 0:p._experimental_beforeQuery)==null||h.call(p,o);const s=a.getQueryCache().get(o.queryHash);o._optimisticResults=r?"isRestoring":"optimistic",F$(o),I$(o,i,s),$$(i);const l=!a.getQueryCache().get(o.queryHash),[c]=v.useState(()=>new t(a,o)),d=c.getOptimisticResult(o),f=!r&&e.subscribed!==!1;if(v.useSyncExternalStore(v.useCallback(g=>{const x=f?c.subscribe(_t.batchCalls(g)):yn;return c.updateResult(),x},[c,f]),()=>c.getCurrentResult(),()=>c.getCurrentResult()),v.useEffect(()=>{c.setOptions(o)},[o,c]),B$(o,d))throw F1(o,c,i);if(L$({result:d,errorResetBoundary:i,throwOnError:o.throwOnError,query:s,suspense:o.suspense}))throw d.error;if((y=(m=a.getDefaultOptions().queries)==null?void 0:m._experimental_afterQuery)==null||y.call(m,o,d),o.experimental_prefetchInRender&&!Zo&&U$(d,r)){const g=l?F1(o,c,i):s==null?void 0:s.promise;g==null||g.catch(yn).finally(()=>{c.updateResult()})}return o.notifyOnChangeProps?d:c.trackResult(d)}function H$(e,t){return W$(e,S$)}function K$(e,t){const n=Qx(),[r]=v.useState(()=>new N$(n,e));v.useEffect(()=>{r.setOptions(e)},[r,e]);const i=v.useSyncExternalStore(v.useCallback(o=>r.subscribe(_t.batchCalls(o)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),a=v.useCallback((o,s)=>{r.mutate(o,s).catch(yn)},[r]);if(i.error&&qx(r.options.throwOnError,[i.error]))throw i.error;return{...i,mutate:a,mutateAsync:i.mutate}}/**
 * react-router v7.13.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var pN=e=>{throw TypeError(e)},V$=(e,t,n)=>t.has(e)||pN("Cannot "+n),Gm=(e,t,n)=>(V$(e,t,"read from private field"),n?n.call(e):t.get(e)),Z$=(e,t,n)=>t.has(e)?pN("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n),U1="popstate";function q$(e={}){function t(r,i){let{pathname:a,search:o,hash:s}=r.location;return Vc("",{pathname:a,search:o,hash:s},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:ci(i)}return G$(t,n,null,e)}function Pe(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function wt(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function Y$(){return Math.random().toString(36).substring(2,10)}function B1(e,t){return{usr:e.state,key:e.key,idx:t}}function Vc(e,t,n=null,r){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof t=="string"?Xa(t):t,state:n,key:t&&t.key||r||Y$()}}function ci({pathname:e="/",search:t="",hash:n=""}){return t&&t!=="?"&&(e+=t.charAt(0)==="?"?t:"?"+t),n&&n!=="#"&&(e+=n.charAt(0)==="#"?n:"#"+n),e}function Xa(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substring(n),e=e.substring(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substring(r),e=e.substring(0,r)),e&&(t.pathname=e)}return t}function G$(e,t,n,r={}){let{window:i=document.defaultView,v5Compat:a=!1}=r,o=i.history,s="POP",l=null,c=d();c==null&&(c=0,o.replaceState({...o.state,idx:c},""));function d(){return(o.state||{idx:null}).idx}function f(){s="POP";let g=d(),x=g==null?null:g-c;c=g,l&&l({action:s,location:y.location,delta:x})}function p(g,x){s="PUSH";let b=Vc(y.location,g,x);c=d()+1;let w=B1(b,c),j=y.createHref(b);try{o.pushState(w,"",j)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;i.location.assign(j)}a&&l&&l({action:s,location:y.location,delta:1})}function h(g,x){s="REPLACE";let b=Vc(y.location,g,x);c=d();let w=B1(b,c),j=y.createHref(b);o.replaceState(w,"",j),a&&l&&l({action:s,location:y.location,delta:0})}function m(g){return hN(g)}let y={get action(){return s},get location(){return e(i,o)},listen(g){if(l)throw new Error("A history only accepts one active listener");return i.addEventListener(U1,f),l=g,()=>{i.removeEventListener(U1,f),l=null}},createHref(g){return t(i,g)},createURL:m,encodeLocation(g){let x=m(g);return{pathname:x.pathname,search:x.search,hash:x.hash}},push:p,replace:h,go(g){return o.go(g)}};return y}function hN(e,t=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),Pe(n,"No window.location.(origin|href) available to create URL");let r=typeof e=="string"?e:ci(e);return r=r.replace(/ $/,"%20"),!t&&r.startsWith("//")&&(r=n+r),new URL(r,n)}var dc,W1=class{constructor(e){if(Z$(this,dc,new Map),e)for(let[t,n]of e)this.set(t,n)}get(e){if(Gm(this,dc).has(e))return Gm(this,dc).get(e);if(e.defaultValue!==void 0)return e.defaultValue;throw new Error("No value found for context")}set(e,t){Gm(this,dc).set(e,t)}};dc=new WeakMap;var Q$=new Set(["lazy","caseSensitive","path","id","index","children"]);function X$(e){return Q$.has(e)}var J$=new Set(["lazy","caseSensitive","path","id","index","middleware","children"]);function eL(e){return J$.has(e)}function tL(e){return e.index===!0}function Zc(e,t,n=[],r={},i=!1){return e.map((a,o)=>{let s=[...n,String(o)],l=typeof a.id=="string"?a.id:s.join("-");if(Pe(a.index!==!0||!a.children,"Cannot specify children on an index route"),Pe(i||!r[l],`Found a route id collision on id "${l}".  Route id's must be globally unique within Data Router usages`),tL(a)){let c={...a,id:l};return r[l]=H1(c,t(c)),c}else{let c={...a,id:l,children:void 0};return r[l]=H1(c,t(c)),a.children&&(c.children=Zc(a.children,t,s,r,i)),c}})}function H1(e,t){return Object.assign(e,{...t,...typeof t.lazy=="object"&&t.lazy!=null?{lazy:{...e.lazy,...t.lazy}}:{}})}function ga(e,t,n="/"){return fc(e,t,n,!1)}function fc(e,t,n,r){let i=typeof t=="string"?Xa(t):t,a=wr(i.pathname||"/",n);if(a==null)return null;let o=mN(e);rL(o);let s=null;for(let l=0;s==null&&l<o.length;++l){let c=hL(a);s=fL(o[l],c,r)}return s}function nL(e,t){let{route:n,pathname:r,params:i}=e;return{id:n.id,pathname:r,params:i,data:t[n.id],loaderData:t[n.id],handle:n.handle}}function mN(e,t=[],n=[],r="",i=!1){let a=(o,s,l=i,c)=>{let d={relativePath:c===void 0?o.path||"":c,caseSensitive:o.caseSensitive===!0,childrenIndex:s,route:o};if(d.relativePath.startsWith("/")){if(!d.relativePath.startsWith(r)&&l)return;Pe(d.relativePath.startsWith(r),`Absolute route path "${d.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),d.relativePath=d.relativePath.slice(r.length)}let f=si([r,d.relativePath]),p=n.concat(d);o.children&&o.children.length>0&&(Pe(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${f}".`),mN(o.children,t,p,f,l)),!(o.path==null&&!o.index)&&t.push({path:f,score:uL(f,o.index),routesMeta:p})};return e.forEach((o,s)=>{var l;if(o.path===""||!((l=o.path)!=null&&l.includes("?")))a(o,s);else for(let c of gN(o.path))a(o,s,!0,c)}),t}function gN(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,i=n.endsWith("?"),a=n.replace(/\?$/,"");if(r.length===0)return i?[a,""]:[a];let o=gN(r.join("/")),s=[];return s.push(...o.map(l=>l===""?a:[a,l].join("/"))),i&&s.push(...o),s.map(l=>e.startsWith("/")&&l===""?"/":l)}function rL(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:dL(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var iL=/^:[\w-]+$/,aL=3,oL=2,sL=1,lL=10,cL=-2,K1=e=>e==="*";function uL(e,t){let n=e.split("/"),r=n.length;return n.some(K1)&&(r+=cL),t&&(r+=oL),n.filter(i=>!K1(i)).reduce((i,a)=>i+(iL.test(a)?aL:a===""?sL:lL),r)}function dL(e,t){return e.length===t.length&&e.slice(0,-1).every((r,i)=>r===t[i])?e[e.length-1]-t[t.length-1]:0}function fL(e,t,n=!1){let{routesMeta:r}=e,i={},a="/",o=[];for(let s=0;s<r.length;++s){let l=r[s],c=s===r.length-1,d=a==="/"?t:t.slice(a.length)||"/",f=Kf({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},d),p=l.route;if(!f&&c&&n&&!r[r.length-1].route.index&&(f=Kf({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},d)),!f)return null;Object.assign(i,f.params),o.push({params:i,pathname:si([a,f.pathname]),pathnameBase:vL(si([a,f.pathnameBase])),route:p}),f.pathnameBase!=="/"&&(a=si([a,f.pathnameBase]))}return o}function Kf(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=pL(e.path,e.caseSensitive,e.end),i=t.match(n);if(!i)return null;let a=i[0],o=a.replace(/(.)\/+$/,"$1"),s=i.slice(1);return{params:r.reduce((c,{paramName:d,isOptional:f},p)=>{if(d==="*"){let m=s[p]||"";o=a.slice(0,a.length-m.length).replace(/(.)\/+$/,"$1")}const h=s[p];return f&&!h?c[d]=void 0:c[d]=(h||"").replace(/%2F/g,"/"),c},{}),pathname:a,pathnameBase:o,pattern:e}}function pL(e,t=!1,n=!0){wt(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let r=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,s,l)=>(r.push({paramName:s,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(r.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,t?void 0:"i"),r]}function hL(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return wt(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`),e}}function wr(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function mL({basename:e,pathname:t}){return t==="/"?e:si([e,t])}var vN=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Xx=e=>vN.test(e);function gL(e,t="/"){let{pathname:n,search:r="",hash:i=""}=typeof e=="string"?Xa(e):e,a;return n?(n=n.replace(/\/\/+/g,"/"),n.startsWith("/")?a=V1(n.substring(1),"/"):a=V1(n,t)):a=t,{pathname:a,search:yL(r),hash:xL(i)}}function V1(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function Qm(e,t,n,r){return`Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function yN(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function ch(e){let t=yN(e);return t.map((n,r)=>r===t.length-1?n.pathname:n.pathnameBase)}function uh(e,t,n,r=!1){let i;typeof e=="string"?i=Xa(e):(i={...e},Pe(!i.pathname||!i.pathname.includes("?"),Qm("?","pathname","search",i)),Pe(!i.pathname||!i.pathname.includes("#"),Qm("#","pathname","hash",i)),Pe(!i.search||!i.search.includes("#"),Qm("#","search","hash",i)));let a=e===""||i.pathname==="",o=a?"/":i.pathname,s;if(o==null)s=n;else{let f=t.length-1;if(!r&&o.startsWith("..")){let p=o.split("/");for(;p[0]==="..";)p.shift(),f-=1;i.pathname=p.join("/")}s=f>=0?t[f]:"/"}let l=gL(i,s),c=o&&o!=="/"&&o.endsWith("/"),d=(a||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||d)&&(l.pathname+="/"),l}var si=e=>e.join("/").replace(/\/\/+/g,"/"),vL=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),yL=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,xL=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,ku=class{constructor(e,t,n,r=!1){this.status=e,this.statusText=t||"",this.internal=r,n instanceof Error?(this.data=n.toString(),this.error=n):this.data=n}};function qc(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}function Pu(e){return e.map(t=>t.route.path).filter(Boolean).join("/").replace(/\/\/*/g,"/")||"/"}var xN=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";function bN(e,t){let n=e;if(typeof n!="string"||!vN.test(n))return{absoluteURL:void 0,isExternal:!1,to:n};let r=n,i=!1;if(xN)try{let a=new URL(window.location.href),o=n.startsWith("//")?new URL(a.protocol+n):new URL(n),s=wr(o.pathname,t);o.origin===a.origin&&s!=null?n=s+o.search+o.hash:i=!0}catch{wt(!1,`<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}return{absoluteURL:r,isExternal:i,to:n}}var _a=Symbol("Uninstrumented");function bL(e,t){let n={lazy:[],"lazy.loader":[],"lazy.action":[],"lazy.middleware":[],middleware:[],loader:[],action:[]};e.forEach(i=>i({id:t.id,index:t.index,path:t.path,instrument(a){let o=Object.keys(n);for(let s of o)a[s]&&n[s].push(a[s])}}));let r={};if(typeof t.lazy=="function"&&n.lazy.length>0){let i=Ns(n.lazy,t.lazy,()=>{});i&&(r.lazy=i)}if(typeof t.lazy=="object"){let i=t.lazy;["middleware","loader","action"].forEach(a=>{let o=i[a],s=n[`lazy.${a}`];if(typeof o=="function"&&s.length>0){let l=Ns(s,o,()=>{});l&&(r.lazy=Object.assign(r.lazy||{},{[a]:l}))}})}return["loader","action"].forEach(i=>{let a=t[i];if(typeof a=="function"&&n[i].length>0){let o=a[_a]??a,s=Ns(n[i],o,(...l)=>Z1(l[0]));s&&(i==="loader"&&o.hydrate===!0&&(s.hydrate=!0),s[_a]=o,r[i]=s)}}),t.middleware&&t.middleware.length>0&&n.middleware.length>0&&(r.middleware=t.middleware.map(i=>{let a=i[_a]??i,o=Ns(n.middleware,a,(...s)=>Z1(s[0]));return o?(o[_a]=a,o):i})),r}function wL(e,t){let n={navigate:[],fetch:[]};if(t.forEach(r=>r({instrument(i){let a=Object.keys(i);for(let o of a)i[o]&&n[o].push(i[o])}})),n.navigate.length>0){let r=e.navigate[_a]??e.navigate,i=Ns(n.navigate,r,(...a)=>{let[o,s]=a;return{to:typeof o=="number"||typeof o=="string"?o:o?ci(o):".",...q1(e,s??{})}});i&&(i[_a]=r,e.navigate=i)}if(n.fetch.length>0){let r=e.fetch[_a]??e.fetch,i=Ns(n.fetch,r,(...a)=>{let[o,,s,l]=a;return{href:s??".",fetcherKey:o,...q1(e,l??{})}});i&&(i[_a]=r,e.fetch=i)}return e}function Ns(e,t,n){return e.length===0?null:async(...r)=>{let i=await wN(e,n(...r),()=>t(...r),e.length-1);if(i.type==="error")throw i.value;return i.value}}async function wN(e,t,n,r){let i=e[r],a;if(i){let o,s=async()=>(o?console.error("You cannot call instrumented handlers more than once"):o=wN(e,t,n,r-1),a=await o,Pe(a,"Expected a result"),a.type==="error"&&a.value instanceof Error?{status:"error",error:a.value}:{status:"success",error:void 0});try{await i(s,t)}catch(l){console.error("An instrumentation function threw an error:",l)}o||await s(),await o}else try{a={type:"success",value:await n()}}catch(o){a={type:"error",value:o}}return a||{type:"error",value:new Error("No result assigned in instrumentation chain.")}}function Z1(e){let{request:t,context:n,params:r,unstable_pattern:i}=e;return{request:jL(t),params:{...r},unstable_pattern:i,context:SL(n)}}function q1(e,t){return{currentUrl:ci(e.state.location),..."formMethod"in t?{formMethod:t.formMethod}:{},..."formEncType"in t?{formEncType:t.formEncType}:{},..."formData"in t?{formData:t.formData}:{},..."body"in t?{body:t.body}:{}}}function jL(e){return{method:e.method,url:e.url,headers:{get:(...t)=>e.headers.get(...t)}}}function SL(e){if(PL(e)){let t={...e};return Object.freeze(t),t}else return{get:t=>e.get(t)}}var kL=Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function PL(e){if(e===null||typeof e!="object")return!1;const t=Object.getPrototypeOf(e);return t===Object.prototype||t===null||Object.getOwnPropertyNames(t).sort().join("\0")===kL}var jN=["POST","PUT","PATCH","DELETE"],CL=new Set(jN),OL=["GET",...jN],EL=new Set(OL),SN=new Set([301,302,303,307,308]),NL=new Set([307,308]),Xm={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},_L={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},Zl={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},AL=e=>({hasErrorBoundary:!!e.hasErrorBoundary}),kN="remix-router-transitions",PN=Symbol("ResetLoaderData");function TL(e){const t=e.window?e.window:typeof window<"u"?window:void 0,n=typeof t<"u"&&typeof t.document<"u"&&typeof t.document.createElement<"u";Pe(e.routes.length>0,"You must provide a non-empty routes array to createRouter");let r=e.hydrationRouteProperties||[],i=e.mapRouteProperties||AL,a=i;if(e.unstable_instrumentations){let O=e.unstable_instrumentations;a=T=>({...i(T),...bL(O.map(D=>D.route).filter(Boolean),T)})}let o={},s=Zc(e.routes,a,void 0,o),l,c=e.basename||"/";c.startsWith("/")||(c=`/${c}`);let d=e.dataStrategy||IL,f={...e.future},p=null,h=new Set,m=null,y=null,g=null,x=e.hydrationData!=null,b=ga(s,e.history.location,c),w=!1,j=null,k;if(b==null&&!e.patchRoutesOnNavigation){let O=ur(404,{pathname:e.history.location.pathname}),{matches:T,route:D}=Sd(s);k=!0,b=T,j={[D.id]:O}}else if(b&&!e.hydrationData&&Ju(b,s,e.history.location.pathname).active&&(b=null),b)if(b.some(O=>O.route.lazy))k=!1;else if(!b.some(O=>Jx(O.route)))k=!0;else{let O=e.hydrationData?e.hydrationData.loaderData:null,T=e.hydrationData?e.hydrationData.errors:null;if(T){let D=b.findIndex(K=>T[K.route.id]!==void 0);k=b.slice(0,D+1).every(K=>!Bv(K.route,O,T))}else k=b.every(D=>!Bv(D.route,O,T))}else{k=!1,b=[];let O=Ju(null,s,e.history.location.pathname);O.active&&O.matches&&(w=!0,b=O.matches)}let P,S={historyAction:e.history.action,location:e.history.location,matches:b,initialized:k,navigation:Xm,restoreScrollPosition:e.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:e.hydrationData&&e.hydrationData.loaderData||{},actionData:e.hydrationData&&e.hydrationData.actionData||null,errors:e.hydrationData&&e.hydrationData.errors||j,fetchers:new Map,blockers:new Map},C="POP",N=null,_=!1,M,R=!1,G=new Map,V=null,ee=!1,Q=!1,te=new Set,$=new Map,B=0,L=-1,Y=new Map,re=new Set,Oe=new Map,we=new Map,ie=new Set,We=new Map,Xe,Or=null;function H(){if(p=e.history.listen(({action:O,location:T,delta:D})=>{if(Xe){Xe(),Xe=void 0;return}wt(We.size===0||D!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let K=mw({currentLocation:S.location,nextLocation:T,historyAction:O});if(K&&D!=null){let q=new Promise(de=>{Xe=de});e.history.go(D*-1),Xu(K,{state:"blocked",location:T,proceed(){Xu(K,{state:"proceeding",proceed:void 0,reset:void 0,location:T}),q.then(()=>e.history.go(D))},reset(){let de=new Map(S.blockers);de.set(K,Zl),U({blockers:de})}}),N==null||N.resolve(),N=null;return}return xt(O,T)}),n){t4(t,G);let O=()=>n4(t,G);t.addEventListener("pagehide",O),V=()=>t.removeEventListener("pagehide",O)}return S.initialized||xt("POP",S.location,{initialHydration:!0}),P}function Ce(){p&&p(),V&&V(),h.clear(),M&&M.abort(),S.fetchers.forEach((O,T)=>xm(T)),S.blockers.forEach((O,T)=>hw(T))}function Te(O){return h.add(O),()=>h.delete(O)}function U(O,T={}){O.matches&&(O.matches=O.matches.map(q=>{let de=o[q.route.id],xe=q.route;return xe.element!==de.element||xe.errorElement!==de.errorElement||xe.hydrateFallbackElement!==de.hydrateFallbackElement?{...q,route:de}:q})),S={...S,...O};let D=[],K=[];S.fetchers.forEach((q,de)=>{q.state==="idle"&&(ie.has(de)?D.push(de):K.push(de))}),ie.forEach(q=>{!S.fetchers.has(q)&&!$.has(q)&&D.push(q)}),[...h].forEach(q=>q(S,{deletedFetchers:D,newErrors:O.errors??null,viewTransitionOpts:T.viewTransitionOpts,flushSync:T.flushSync===!0})),D.forEach(q=>xm(q)),K.forEach(q=>S.fetchers.delete(q))}function yt(O,T,{flushSync:D}={}){var je,fe;let K=S.actionData!=null&&S.navigation.formMethod!=null&&sn(S.navigation.formMethod)&&S.navigation.state==="loading"&&((je=O.state)==null?void 0:je._isRedirect)!==!0,q;T.actionData?Object.keys(T.actionData).length>0?q=T.actionData:q=null:K?q=S.actionData:q=null;let de=T.loaderData?ij(S.loaderData,T.loaderData,T.matches||[],T.errors):S.loaderData,xe=S.blockers;xe.size>0&&(xe=new Map(xe),xe.forEach((Se,Re)=>xe.set(Re,Zl)));let se=ee?!1:vw(O,T.matches||S.matches),le=_===!0||S.navigation.formMethod!=null&&sn(S.navigation.formMethod)&&((fe=O.state)==null?void 0:fe._isRedirect)!==!0;l&&(s=l,l=void 0),ee||C==="POP"||(C==="PUSH"?e.history.push(O,O.state):C==="REPLACE"&&e.history.replace(O,O.state));let me;if(C==="POP"){let Se=G.get(S.location.pathname);Se&&Se.has(O.pathname)?me={currentLocation:S.location,nextLocation:O}:G.has(O.pathname)&&(me={currentLocation:O,nextLocation:S.location})}else if(R){let Se=G.get(S.location.pathname);Se?Se.add(O.pathname):(Se=new Set([O.pathname]),G.set(S.location.pathname,Se)),me={currentLocation:S.location,nextLocation:O}}U({...T,actionData:q,loaderData:de,historyAction:C,location:O,initialized:!0,navigation:Xm,revalidation:"idle",restoreScrollPosition:se,preventScrollReset:le,blockers:xe},{viewTransitionOpts:me,flushSync:D===!0}),C="POP",_=!1,R=!1,ee=!1,Q=!1,N==null||N.resolve(),N=null,Or==null||Or.resolve(),Or=null}async function Le(O,T){if(N==null||N.resolve(),N=null,typeof O=="number"){N||(N=lj());let Re=N.promise;return e.history.go(O),Re}let D=Uv(S.location,S.matches,c,O,T==null?void 0:T.fromRouteId,T==null?void 0:T.relative),{path:K,submission:q,error:de}=Y1(!1,D,T),xe=S.location,se=Vc(S.location,K,T&&T.state);se={...se,...e.history.encodeLocation(se)};let le=T&&T.replace!=null?T.replace:void 0,me="PUSH";le===!0?me="REPLACE":le===!1||q!=null&&sn(q.formMethod)&&q.formAction===S.location.pathname+S.location.search&&(me="REPLACE");let je=T&&"preventScrollReset"in T?T.preventScrollReset===!0:void 0,fe=(T&&T.flushSync)===!0,Se=mw({currentLocation:xe,nextLocation:se,historyAction:me});if(Se){Xu(Se,{state:"blocked",location:se,proceed(){Xu(Se,{state:"proceeding",proceed:void 0,reset:void 0,location:se}),Le(O,T)},reset(){let Re=new Map(S.blockers);Re.set(Se,Zl),U({blockers:Re})}});return}await xt(me,se,{submission:q,pendingError:de,preventScrollReset:je,replace:T&&T.replace,enableViewTransition:T&&T.viewTransition,flushSync:fe,callSiteDefaultShouldRevalidate:T&&T.unstable_defaultShouldRevalidate})}function pn(){Or||(Or=lj()),ym(),U({revalidation:"loading"});let O=Or.promise;return S.navigation.state==="submitting"?O:S.navigation.state==="idle"?(xt(S.historyAction,S.location,{startUninterruptedRevalidation:!0}),O):(xt(C||S.historyAction,S.navigation.location,{overrideNavigation:S.navigation,enableViewTransition:R===!0}),O)}async function xt(O,T,D){M&&M.abort(),M=null,C=O,ee=(D&&D.startUninterruptedRevalidation)===!0,_D(S.location,S.matches),_=(D&&D.preventScrollReset)===!0,R=(D&&D.enableViewTransition)===!0;let K=l||s,q=D&&D.overrideNavigation,de=D!=null&&D.initialHydration&&S.matches&&S.matches.length>0&&!w?S.matches:ga(K,T,c),xe=(D&&D.flushSync)===!0;if(de&&S.initialized&&!Q&&KL(S.location,T)&&!(D&&D.submission&&sn(D.submission.formMethod))){yt(T,{matches:de},{flushSync:xe});return}let se=Ju(de,K,T.pathname);if(se.active&&se.matches&&(de=se.matches),!de){let{error:Mt,notFoundMatches:hn,route:He}=bm(T.pathname);yt(T,{matches:hn,loaderData:{},errors:{[He.id]:Mt}},{flushSync:xe});return}M=new AbortController;let le=ms(e.history,T,M.signal,D&&D.submission),me=e.getContext?await e.getContext():new W1,je;if(D&&D.pendingError)je=[va(de).route.id,{type:"error",error:D.pendingError}];else if(D&&D.submission&&sn(D.submission.formMethod)){let Mt=await yi(le,T,D.submission,de,me,se.active,D&&D.initialHydration===!0,{replace:D.replace,flushSync:xe});if(Mt.shortCircuited)return;if(Mt.pendingActionResult){let[hn,He]=Mt.pendingActionResult;if(Vn(He)&&qc(He.error)&&He.error.status===404){M=null,yt(T,{matches:Mt.matches,loaderData:{},errors:{[hn]:He.error}});return}}de=Mt.matches||de,je=Mt.pendingActionResult,q=Jm(T,D.submission),xe=!1,se.active=!1,le=ms(e.history,le.url,le.signal)}let{shortCircuited:fe,matches:Se,loaderData:Re,errors:Ht}=await Qu(le,T,de,me,se.active,q,D&&D.submission,D&&D.fetcherSubmission,D&&D.replace,D&&D.initialHydration===!0,xe,je,D&&D.callSiteDefaultShouldRevalidate);fe||(M=null,yt(T,{matches:Se||de,...aj(je),loaderData:Re,errors:Ht}))}async function yi(O,T,D,K,q,de,xe,se={}){ym();let le=JL(T,D);if(U({navigation:le},{flushSync:se.flushSync===!0}),de){let fe=await ed(K,T.pathname,O.signal);if(fe.type==="aborted")return{shortCircuited:!0};if(fe.type==="error"){if(fe.partialMatches.length===0){let{matches:Re,route:Ht}=Sd(s);return{matches:Re,pendingActionResult:[Ht.id,{type:"error",error:fe.error}]}}let Se=va(fe.partialMatches).route.id;return{matches:fe.partialMatches,pendingActionResult:[Se,{type:"error",error:fe.error}]}}else if(fe.matches)K=fe.matches;else{let{notFoundMatches:Se,error:Re,route:Ht}=bm(T.pathname);return{matches:Se,pendingActionResult:[Ht.id,{type:"error",error:Re}]}}}let me,je=of(K,T);if(!je.route.action&&!je.route.lazy)me={type:"error",error:ur(405,{method:O.method,pathname:T.pathname,routeId:je.route.id})};else{let fe=Fs(a,o,O,K,je,xe?[]:r,q),Se=await zl(O,fe,q,null);if(me=Se[je.route.id],!me){for(let Re of K)if(Se[Re.route.id]){me=Se[Re.route.id];break}}if(O.signal.aborted)return{shortCircuited:!0}}if(wo(me)){let fe;return se&&se.replace!=null?fe=se.replace:fe=tj(me.response.headers.get("Location"),new URL(O.url),c,e.history)===S.location.pathname+S.location.search,await oo(O,me,!0,{submission:D,replace:fe}),{shortCircuited:!0}}if(Vn(me)){let fe=va(K,je.route.id);return(se&&se.replace)!==!0&&(C="PUSH"),{matches:K,pendingActionResult:[fe.route.id,me,je.route.id]}}return{matches:K,pendingActionResult:[je.route.id,me]}}async function Qu(O,T,D,K,q,de,xe,se,le,me,je,fe,Se){let Re=de||Jm(T,xe),Ht=xe||se||sj(Re),Mt=!ee&&!me;if(q){if(Mt){let tn=lw(fe);U({navigation:Re,...tn!==void 0?{actionData:tn}:{}},{flushSync:je})}let Me=await ed(D,T.pathname,O.signal);if(Me.type==="aborted")return{shortCircuited:!0};if(Me.type==="error"){if(Me.partialMatches.length===0){let{matches:cs,route:co}=Sd(s);return{matches:cs,loaderData:{},errors:{[co.id]:Me.error}}}let tn=va(Me.partialMatches).route.id;return{matches:Me.partialMatches,loaderData:{},errors:{[tn]:Me.error}}}else if(Me.matches)D=Me.matches;else{let{error:tn,notFoundMatches:cs,route:co}=bm(T.pathname);return{matches:cs,loaderData:{},errors:{[co.id]:tn}}}}let hn=l||s,{dsMatches:He,revalidatingFetchers:rr}=G1(O,K,a,o,e.history,S,D,Ht,T,me?[]:r,me===!0,Q,te,ie,Oe,re,hn,c,e.patchRoutesOnNavigation!=null,fe,Se);if(L=++B,!e.dataStrategy&&!He.some(Me=>Me.shouldLoad)&&!He.some(Me=>Me.route.middleware&&Me.route.middleware.length>0)&&rr.length===0){let Me=fw();return yt(T,{matches:D,loaderData:{},errors:fe&&Vn(fe[1])?{[fe[0]]:fe[1].error}:null,...aj(fe),...Me?{fetchers:new Map(S.fetchers)}:{}},{flushSync:je}),{shortCircuited:!0}}if(Mt){let Me={};if(!q){Me.navigation=Re;let tn=lw(fe);tn!==void 0&&(Me.actionData=tn)}rr.length>0&&(Me.fetchers=jD(rr)),U(Me,{flushSync:je})}rr.forEach(Me=>{wi(Me.key),Me.controller&&$.set(Me.key,Me.controller)});let so=()=>rr.forEach(Me=>wi(Me.key));M&&M.signal.addEventListener("abort",so);let{loaderResults:Il,fetcherResults:sa}=await cw(He,rr,O,K);if(O.signal.aborted)return{shortCircuited:!0};M&&M.signal.removeEventListener("abort",so),rr.forEach(Me=>$.delete(Me.key));let Kr=kd(Il);if(Kr)return await oo(O,Kr.result,!0,{replace:le}),{shortCircuited:!0};if(Kr=kd(sa),Kr)return re.add(Kr.key),await oo(O,Kr.result,!0,{replace:le}),{shortCircuited:!0};let{loaderData:wm,errors:$l}=rj(S,D,Il,fe,rr,sa);me&&S.errors&&($l={...S.errors,...$l});let lo=fw(),td=pw(L),nd=lo||td||rr.length>0;return{matches:D,loaderData:wm,errors:$l,...nd?{fetchers:new Map(S.fetchers)}:{}}}function lw(O){if(O&&!Vn(O[1]))return{[O[0]]:O[1].data};if(S.actionData)return Object.keys(S.actionData).length===0?null:S.actionData}function jD(O){return O.forEach(T=>{let D=S.fetchers.get(T.key),K=ql(void 0,D?D.data:void 0);S.fetchers.set(T.key,K)}),new Map(S.fetchers)}async function SD(O,T,D,K){wi(O);let q=(K&&K.flushSync)===!0,de=l||s,xe=Uv(S.location,S.matches,c,D,T,K==null?void 0:K.relative),se=ga(de,xe,c),le=Ju(se,de,xe);if(le.active&&le.matches&&(se=le.matches),!se){bi(O,T,ur(404,{pathname:xe}),{flushSync:q});return}let{path:me,submission:je,error:fe}=Y1(!0,xe,K);if(fe){bi(O,T,fe,{flushSync:q});return}let Se=e.getContext?await e.getContext():new W1,Re=(K&&K.preventScrollReset)===!0;if(je&&sn(je.formMethod)){await kD(O,T,me,se,Se,le.active,q,Re,je,K&&K.unstable_defaultShouldRevalidate);return}Oe.set(O,{routeId:T,path:me}),await PD(O,T,me,se,Se,le.active,q,Re,je)}async function kD(O,T,D,K,q,de,xe,se,le,me){ym(),Oe.delete(O);let je=S.fetchers.get(O);xi(O,e4(le,je),{flushSync:xe});let fe=new AbortController,Se=ms(e.history,D,fe.signal,le);if(de){let ft=await ed(K,new URL(Se.url).pathname,Se.signal,O);if(ft.type==="aborted")return;if(ft.type==="error"){bi(O,T,ft.error,{flushSync:xe});return}else if(ft.matches)K=ft.matches;else{bi(O,T,ur(404,{pathname:D}),{flushSync:xe});return}}let Re=of(K,D);if(!Re.route.action&&!Re.route.lazy){let ft=ur(405,{method:le.formMethod,pathname:D,routeId:T});bi(O,T,ft,{flushSync:xe});return}$.set(O,fe);let Ht=B,Mt=Fs(a,o,Se,K,Re,r,q),hn=await zl(Se,Mt,q,O),He=hn[Re.route.id];if(!He){for(let ft of Mt)if(hn[ft.route.id]){He=hn[ft.route.id];break}}if(Se.signal.aborted){$.get(O)===fe&&$.delete(O);return}if(ie.has(O)){if(wo(He)||Vn(He)){xi(O,Si(void 0));return}}else{if(wo(He))if($.delete(O),L>Ht){xi(O,Si(void 0));return}else return re.add(O),xi(O,ql(le)),oo(Se,He,!1,{fetcherSubmission:le,preventScrollReset:se});if(Vn(He)){bi(O,T,He.error);return}}let rr=S.navigation.location||S.location,so=ms(e.history,rr,fe.signal),Il=l||s,sa=S.navigation.state!=="idle"?ga(Il,S.navigation.location,c):S.matches;Pe(sa,"Didn't find any matches after fetcher action");let Kr=++B;Y.set(O,Kr);let wm=ql(le,He.data);S.fetchers.set(O,wm);let{dsMatches:$l,revalidatingFetchers:lo}=G1(so,q,a,o,e.history,S,sa,le,rr,r,!1,Q,te,ie,Oe,re,Il,c,e.patchRoutesOnNavigation!=null,[Re.route.id,He],me);lo.filter(ft=>ft.key!==O).forEach(ft=>{let rd=ft.key,xw=S.fetchers.get(rd),RD=ql(void 0,xw?xw.data:void 0);S.fetchers.set(rd,RD),wi(rd),ft.controller&&$.set(rd,ft.controller)}),U({fetchers:new Map(S.fetchers)});let td=()=>lo.forEach(ft=>wi(ft.key));fe.signal.addEventListener("abort",td);let{loaderResults:nd,fetcherResults:Me}=await cw($l,lo,so,q);if(fe.signal.aborted)return;if(fe.signal.removeEventListener("abort",td),Y.delete(O),$.delete(O),lo.forEach(ft=>$.delete(ft.key)),S.fetchers.has(O)){let ft=Si(He.data);S.fetchers.set(O,ft)}let tn=kd(nd);if(tn)return oo(so,tn.result,!1,{preventScrollReset:se});if(tn=kd(Me),tn)return re.add(tn.key),oo(so,tn.result,!1,{preventScrollReset:se});let{loaderData:cs,errors:co}=rj(S,sa,nd,void 0,lo,Me);pw(Kr),S.navigation.state==="loading"&&Kr>L?(Pe(C,"Expected pending action"),M&&M.abort(),yt(S.navigation.location,{matches:sa,loaderData:cs,errors:co,fetchers:new Map(S.fetchers)})):(U({errors:co,loaderData:ij(S.loaderData,cs,sa,co),fetchers:new Map(S.fetchers)}),Q=!1)}async function PD(O,T,D,K,q,de,xe,se,le){let me=S.fetchers.get(O);xi(O,ql(le,me?me.data:void 0),{flushSync:xe});let je=new AbortController,fe=ms(e.history,D,je.signal);if(de){let He=await ed(K,new URL(fe.url).pathname,fe.signal,O);if(He.type==="aborted")return;if(He.type==="error"){bi(O,T,He.error,{flushSync:xe});return}else if(He.matches)K=He.matches;else{bi(O,T,ur(404,{pathname:D}),{flushSync:xe});return}}let Se=of(K,D);$.set(O,je);let Re=B,Ht=Fs(a,o,fe,K,Se,r,q),hn=(await zl(fe,Ht,q,O))[Se.route.id];if($.get(O)===je&&$.delete(O),!fe.signal.aborted){if(ie.has(O)){xi(O,Si(void 0));return}if(wo(hn))if(L>Re){xi(O,Si(void 0));return}else{re.add(O),await oo(fe,hn,!1,{preventScrollReset:se});return}if(Vn(hn)){bi(O,T,hn.error);return}xi(O,Si(hn.data))}}async function oo(O,T,D,{submission:K,fetcherSubmission:q,preventScrollReset:de,replace:xe}={}){D||(N==null||N.resolve(),N=null),T.response.headers.has("X-Remix-Revalidate")&&(Q=!0);let se=T.response.headers.get("Location");Pe(se,"Expected a Location header on the redirect Response"),se=tj(se,new URL(O.url),c,e.history);let le=Vc(S.location,se,{_isRedirect:!0});if(n){let Ht=!1;if(T.response.headers.has("X-Remix-Reload-Document"))Ht=!0;else if(Xx(se)){const Mt=hN(se,!0);Ht=Mt.origin!==t.location.origin||wr(Mt.pathname,c)==null}if(Ht){xe?t.location.replace(se):t.location.assign(se);return}}M=null;let me=xe===!0||T.response.headers.has("X-Remix-Replace")?"REPLACE":"PUSH",{formMethod:je,formAction:fe,formEncType:Se}=S.navigation;!K&&!q&&je&&fe&&Se&&(K=sj(S.navigation));let Re=K||q;if(NL.has(T.response.status)&&Re&&sn(Re.formMethod))await xt(me,le,{submission:{...Re,formAction:se},preventScrollReset:de||_,enableViewTransition:D?R:void 0});else{let Ht=Jm(le,K);await xt(me,le,{overrideNavigation:Ht,fetcherSubmission:q,preventScrollReset:de||_,enableViewTransition:D?R:void 0})}}async function zl(O,T,D,K){var xe;let q,de={};try{q=await LL(d,O,T,K,D,!1)}catch(se){return T.filter(le=>le.shouldLoad).forEach(le=>{de[le.route.id]={type:"error",error:se}}),de}if(O.signal.aborted)return de;if(!sn(O.method))for(let se of T){if(((xe=q[se.route.id])==null?void 0:xe.type)==="error")break;!q.hasOwnProperty(se.route.id)&&!S.loaderData.hasOwnProperty(se.route.id)&&(!S.errors||!S.errors.hasOwnProperty(se.route.id))&&se.shouldCallHandler()&&(q[se.route.id]={type:"error",result:new Error(`No result returned from dataStrategy for route ${se.route.id}`)})}for(let[se,le]of Object.entries(q))if(YL(le)){let me=le.result;de[se]={type:"redirect",response:WL(me,O,se,T,c)}}else de[se]=await BL(le);return de}async function cw(O,T,D,K){let q=zl(D,O,K,null),de=Promise.all(T.map(async le=>{if(le.matches&&le.match&&le.request&&le.controller){let je=(await zl(le.request,le.matches,K,le.key))[le.match.route.id];return{[le.key]:je}}else return Promise.resolve({[le.key]:{type:"error",error:ur(404,{pathname:le.path})}})})),xe=await q,se=(await de).reduce((le,me)=>Object.assign(le,me),{});return{loaderResults:xe,fetcherResults:se}}function ym(){Q=!0,Oe.forEach((O,T)=>{$.has(T)&&te.add(T),wi(T)})}function xi(O,T,D={}){S.fetchers.set(O,T),U({fetchers:new Map(S.fetchers)},{flushSync:(D&&D.flushSync)===!0})}function bi(O,T,D,K={}){let q=va(S.matches,T);xm(O),U({errors:{[q.route.id]:D},fetchers:new Map(S.fetchers)},{flushSync:(K&&K.flushSync)===!0})}function uw(O){return we.set(O,(we.get(O)||0)+1),ie.has(O)&&ie.delete(O),S.fetchers.get(O)||_L}function CD(O,T){wi(O,T==null?void 0:T.reason),xi(O,Si(null))}function xm(O){let T=S.fetchers.get(O);$.has(O)&&!(T&&T.state==="loading"&&Y.has(O))&&wi(O),Oe.delete(O),Y.delete(O),re.delete(O),ie.delete(O),te.delete(O),S.fetchers.delete(O)}function OD(O){let T=(we.get(O)||0)-1;T<=0?(we.delete(O),ie.add(O)):we.set(O,T),U({fetchers:new Map(S.fetchers)})}function wi(O,T){let D=$.get(O);D&&(D.abort(T),$.delete(O))}function dw(O){for(let T of O){let D=uw(T),K=Si(D.data);S.fetchers.set(T,K)}}function fw(){let O=[],T=!1;for(let D of re){let K=S.fetchers.get(D);Pe(K,`Expected fetcher: ${D}`),K.state==="loading"&&(re.delete(D),O.push(D),T=!0)}return dw(O),T}function pw(O){let T=[];for(let[D,K]of Y)if(K<O){let q=S.fetchers.get(D);Pe(q,`Expected fetcher: ${D}`),q.state==="loading"&&(wi(D),Y.delete(D),T.push(D))}return dw(T),T.length>0}function ED(O,T){let D=S.blockers.get(O)||Zl;return We.get(O)!==T&&We.set(O,T),D}function hw(O){S.blockers.delete(O),We.delete(O)}function Xu(O,T){let D=S.blockers.get(O)||Zl;Pe(D.state==="unblocked"&&T.state==="blocked"||D.state==="blocked"&&T.state==="blocked"||D.state==="blocked"&&T.state==="proceeding"||D.state==="blocked"&&T.state==="unblocked"||D.state==="proceeding"&&T.state==="unblocked",`Invalid blocker state transition: ${D.state} -> ${T.state}`);let K=new Map(S.blockers);K.set(O,T),U({blockers:K})}function mw({currentLocation:O,nextLocation:T,historyAction:D}){if(We.size===0)return;We.size>1&&wt(!1,"A router only supports one blocker at a time");let K=Array.from(We.entries()),[q,de]=K[K.length-1],xe=S.blockers.get(q);if(!(xe&&xe.state==="proceeding")&&de({currentLocation:O,nextLocation:T,historyAction:D}))return q}function bm(O){let T=ur(404,{pathname:O}),D=l||s,{matches:K,route:q}=Sd(D);return{notFoundMatches:K,route:q,error:T}}function ND(O,T,D){if(m=O,g=T,y=D||null,!x&&S.navigation===Xm){x=!0;let K=vw(S.location,S.matches);K!=null&&U({restoreScrollPosition:K})}return()=>{m=null,g=null,y=null}}function gw(O,T){return y&&y(O,T.map(K=>nL(K,S.loaderData)))||O.key}function _D(O,T){if(m&&g){let D=gw(O,T);m[D]=g()}}function vw(O,T){if(m){let D=gw(O,T),K=m[D];if(typeof K=="number")return K}return null}function Ju(O,T,D){if(e.patchRoutesOnNavigation)if(O){if(Object.keys(O[0].params).length>0)return{active:!0,matches:fc(T,D,c,!0)}}else return{active:!0,matches:fc(T,D,c,!0)||[]};return{active:!1,matches:null}}async function ed(O,T,D,K){if(!e.patchRoutesOnNavigation)return{type:"success",matches:O};let q=O;for(;;){let de=l==null,xe=l||s,se=o;try{await e.patchRoutesOnNavigation({signal:D,path:T,matches:q,fetcherKey:K,patch:(je,fe)=>{D.aborted||Q1(je,fe,xe,se,a,!1)}})}catch(je){return{type:"error",error:je,partialMatches:q}}finally{de&&!D.aborted&&(s=[...s])}if(D.aborted)return{type:"aborted"};let le=ga(xe,T,c),me=null;if(le){if(Object.keys(le[0].params).length===0)return{type:"success",matches:le};if(me=fc(xe,T,c,!0),!(me&&q.length<me.length&&yw(q,me.slice(0,q.length))))return{type:"success",matches:le}}if(me||(me=fc(xe,T,c,!0)),!me||yw(q,me))return{type:"success",matches:null};q=me}}function yw(O,T){return O.length===T.length&&O.every((D,K)=>D.route.id===T[K].route.id)}function AD(O){o={},l=Zc(O,a,void 0,o)}function TD(O,T,D=!1){let K=l==null;Q1(O,T,l||s,o,a,D),K&&(s=[...s],U({}))}return P={get basename(){return c},get future(){return f},get state(){return S},get routes(){return s},get window(){return t},initialize:H,subscribe:Te,enableScrollRestoration:ND,navigate:Le,fetch:SD,revalidate:pn,createHref:O=>e.history.createHref(O),encodeLocation:O=>e.history.encodeLocation(O),getFetcher:uw,resetFetcher:CD,deleteFetcher:OD,dispose:Ce,getBlocker:ED,deleteBlocker:hw,patchRoutes:TD,_internalFetchControllers:$,_internalSetRoutes:AD,_internalSetStateDoNotUseOrYouWillBreakYourApp(O){U(O)}},e.unstable_instrumentations&&(P=wL(P,e.unstable_instrumentations.map(O=>O.router).filter(Boolean))),P}function RL(e){return e!=null&&("formData"in e&&e.formData!=null||"body"in e&&e.body!==void 0)}function Uv(e,t,n,r,i,a){let o,s;if(i){o=[];for(let c of t)if(o.push(c),c.route.id===i){s=c;break}}else o=t,s=t[t.length-1];let l=uh(r||".",ch(o),wr(e.pathname,n)||e.pathname,a==="path");if(r==null&&(l.search=e.search,l.hash=e.hash),(r==null||r===""||r===".")&&s){let c=t0(l.search);if(s.route.index&&!c)l.search=l.search?l.search.replace(/^\?/,"?index&"):"?index";else if(!s.route.index&&c){let d=new URLSearchParams(l.search),f=d.getAll("index");d.delete("index"),f.filter(h=>h).forEach(h=>d.append("index",h));let p=d.toString();l.search=p?`?${p}`:""}}return n!=="/"&&(l.pathname=mL({basename:n,pathname:l.pathname})),ci(l)}function Y1(e,t,n){if(!n||!RL(n))return{path:t};if(n.formMethod&&!XL(n.formMethod))return{path:t,error:ur(405,{method:n.formMethod})};let r=()=>({path:t,error:ur(400,{type:"invalid-body"})}),a=(n.formMethod||"get").toUpperCase(),o=AN(t);if(n.body!==void 0){if(n.formEncType==="text/plain"){if(!sn(a))return r();let f=typeof n.body=="string"?n.body:n.body instanceof FormData||n.body instanceof URLSearchParams?Array.from(n.body.entries()).reduce((p,[h,m])=>`${p}${h}=${m}
`,""):String(n.body);return{path:t,submission:{formMethod:a,formAction:o,formEncType:n.formEncType,formData:void 0,json:void 0,text:f}}}else if(n.formEncType==="application/json"){if(!sn(a))return r();try{let f=typeof n.body=="string"?JSON.parse(n.body):n.body;return{path:t,submission:{formMethod:a,formAction:o,formEncType:n.formEncType,formData:void 0,json:f,text:void 0}}}catch{return r()}}}Pe(typeof FormData=="function","FormData is not available in this environment");let s,l;if(n.formData)s=Hv(n.formData),l=n.formData;else if(n.body instanceof FormData)s=Hv(n.body),l=n.body;else if(n.body instanceof URLSearchParams)s=n.body,l=nj(s);else if(n.body==null)s=new URLSearchParams,l=new FormData;else try{s=new URLSearchParams(n.body),l=nj(s)}catch{return r()}let c={formMethod:a,formAction:o,formEncType:n&&n.formEncType||"application/x-www-form-urlencoded",formData:l,json:void 0,text:void 0};if(sn(c.formMethod))return{path:t,submission:c};let d=Xa(t);return e&&d.search&&t0(d.search)&&s.append("index",""),d.search=`?${s}`,{path:ci(d),submission:c}}function G1(e,t,n,r,i,a,o,s,l,c,d,f,p,h,m,y,g,x,b,w,j){var ee;let k=w?Vn(w[1])?w[1].error:w[1].data:void 0,P=i.createURL(a.location),S=i.createURL(l),C;if(d&&a.errors){let Q=Object.keys(a.errors)[0];C=o.findIndex(te=>te.route.id===Q)}else if(w&&Vn(w[1])){let Q=w[0];C=o.findIndex(te=>te.route.id===Q)-1}let N=w?w[1].statusCode:void 0,_=N&&N>=400,M={currentUrl:P,currentParams:((ee=a.matches[0])==null?void 0:ee.params)||{},nextUrl:S,nextParams:o[0].params,...s,actionResult:k,actionStatus:N},R=Pu(o),G=o.map((Q,te)=>{let{route:$}=Q,B=null;if(C!=null&&te>C?B=!1:$.lazy?B=!0:Jx($)?d?B=Bv($,a.loaderData,a.errors):ML(a.loaderData,a.matches[te],Q)&&(B=!0):B=!1,B!==null)return Wv(n,r,e,R,Q,c,t,B);let L=!1;typeof j=="boolean"?L=j:_?L=!1:(f||P.pathname+P.search===S.pathname+S.search||P.search!==S.search||DL(a.matches[te],Q))&&(L=!0);let Y={...M,defaultShouldRevalidate:L},re=Cc(Q,Y);return Wv(n,r,e,R,Q,c,t,re,Y,j)}),V=[];return m.forEach((Q,te)=>{if(d||!o.some(ie=>ie.route.id===Q.routeId)||h.has(te))return;let $=a.fetchers.get(te),B=$&&$.state!=="idle"&&$.data===void 0,L=ga(g,Q.path,x);if(!L){if(b&&B)return;V.push({key:te,routeId:Q.routeId,path:Q.path,matches:null,match:null,request:null,controller:null});return}if(y.has(te))return;let Y=of(L,Q.path),re=new AbortController,Oe=ms(i,Q.path,re.signal),we=null;if(p.has(te))p.delete(te),we=Fs(n,r,Oe,L,Y,c,t);else if(B)f&&(we=Fs(n,r,Oe,L,Y,c,t));else{let ie;typeof j=="boolean"?ie=j:_?ie=!1:ie=f;let We={...M,defaultShouldRevalidate:ie};Cc(Y,We)&&(we=Fs(n,r,Oe,L,Y,c,t,We))}we&&V.push({key:te,routeId:Q.routeId,path:Q.path,matches:we,match:Y,request:Oe,controller:re})}),{dsMatches:G,revalidatingFetchers:V}}function Jx(e){return e.loader!=null||e.middleware!=null&&e.middleware.length>0}function Bv(e,t,n){if(e.lazy)return!0;if(!Jx(e))return!1;let r=t!=null&&e.id in t,i=n!=null&&n[e.id]!==void 0;return!r&&i?!1:typeof e.loader=="function"&&e.loader.hydrate===!0?!0:!r&&!i}function ML(e,t,n){let r=!t||n.route.id!==t.route.id,i=!e.hasOwnProperty(n.route.id);return r||i}function DL(e,t){let n=e.route.path;return e.pathname!==t.pathname||n!=null&&n.endsWith("*")&&e.params["*"]!==t.params["*"]}function Cc(e,t){if(e.route.shouldRevalidate){let n=e.route.shouldRevalidate(t);if(typeof n=="boolean")return n}return t.defaultShouldRevalidate}function Q1(e,t,n,r,i,a){let o;if(e){let c=r[e];Pe(c,`No route found to patch children into: routeId = ${e}`),c.children||(c.children=[]),o=c.children}else o=n;let s=[],l=[];if(t.forEach(c=>{let d=o.find(f=>CN(c,f));d?l.push({existingRoute:d,newRoute:c}):s.push(c)}),s.length>0){let c=Zc(s,i,[e||"_","patch",String((o==null?void 0:o.length)||"0")],r);o.push(...c)}if(a&&l.length>0)for(let c=0;c<l.length;c++){let{existingRoute:d,newRoute:f}=l[c],p=d,[h]=Zc([f],i,[],{},!0);Object.assign(p,{element:h.element?h.element:p.element,errorElement:h.errorElement?h.errorElement:p.errorElement,hydrateFallbackElement:h.hydrateFallbackElement?h.hydrateFallbackElement:p.hydrateFallbackElement})}}function CN(e,t){return"id"in e&&"id"in t&&e.id===t.id?!0:e.index===t.index&&e.path===t.path&&e.caseSensitive===t.caseSensitive?(!e.children||e.children.length===0)&&(!t.children||t.children.length===0)?!0:e.children.every((n,r)=>{var i;return(i=t.children)==null?void 0:i.some(a=>CN(n,a))}):!1}var X1=new WeakMap,ON=({key:e,route:t,manifest:n,mapRouteProperties:r})=>{let i=n[t.id];if(Pe(i,"No route found in manifest"),!i.lazy||typeof i.lazy!="object")return;let a=i.lazy[e];if(!a)return;let o=X1.get(i);o||(o={},X1.set(i,o));let s=o[e];if(s)return s;let l=(async()=>{let c=X$(e),f=i[e]!==void 0&&e!=="hasErrorBoundary";if(c)wt(!c,"Route property "+e+" is not a supported lazy route property. This property will be ignored."),o[e]=Promise.resolve();else if(f)wt(!1,`Route "${i.id}" has a static property "${e}" defined. The lazy property will be ignored.`);else{let p=await a();p!=null&&(Object.assign(i,{[e]:p}),Object.assign(i,r(i)))}typeof i.lazy=="object"&&(i.lazy[e]=void 0,Object.values(i.lazy).every(p=>p===void 0)&&(i.lazy=void 0))})();return o[e]=l,l},J1=new WeakMap;function zL(e,t,n,r,i){let a=n[e.id];if(Pe(a,"No route found in manifest"),!e.lazy)return{lazyRoutePromise:void 0,lazyHandlerPromise:void 0};if(typeof e.lazy=="function"){let d=J1.get(a);if(d)return{lazyRoutePromise:d,lazyHandlerPromise:d};let f=(async()=>{Pe(typeof e.lazy=="function","No lazy route function found");let p=await e.lazy(),h={};for(let m in p){let y=p[m];if(y===void 0)continue;let g=eL(m),b=a[m]!==void 0&&m!=="hasErrorBoundary";g?wt(!g,"Route property "+m+" is not a supported property to be returned from a lazy route function. This property will be ignored."):b?wt(!b,`Route "${a.id}" has a static property "${m}" defined but its lazy function is also returning a value for this property. The lazy route property "${m}" will be ignored.`):h[m]=y}Object.assign(a,h),Object.assign(a,{...r(a),lazy:void 0})})();return J1.set(a,f),f.catch(()=>{}),{lazyRoutePromise:f,lazyHandlerPromise:f}}let o=Object.keys(e.lazy),s=[],l;for(let d of o){if(i&&i.includes(d))continue;let f=ON({key:d,route:e,manifest:n,mapRouteProperties:r});f&&(s.push(f),d===t&&(l=f))}let c=s.length>0?Promise.all(s).then(()=>{}):void 0;return c==null||c.catch(()=>{}),l==null||l.catch(()=>{}),{lazyRoutePromise:c,lazyHandlerPromise:l}}async function ej(e){let t=e.matches.filter(i=>i.shouldLoad),n={};return(await Promise.all(t.map(i=>i.resolve()))).forEach((i,a)=>{n[t[a].route.id]=i}),n}async function IL(e){return e.matches.some(t=>t.route.middleware)?EN(e,()=>ej(e)):ej(e)}function EN(e,t){return $L(e,t,r=>{if(QL(r))throw r;return r},ZL,n);function n(r,i,a){if(a)return Promise.resolve(Object.assign(a.value,{[i]:{type:"error",result:r}}));{let{matches:o}=e,s=Math.min(Math.max(o.findIndex(c=>c.route.id===i),0),Math.max(o.findIndex(c=>c.shouldCallHandler()),0)),l=va(o,o[s].route.id).route.id;return Promise.resolve({[l]:{type:"error",result:r}})}}}async function $L(e,t,n,r,i){let{matches:a,request:o,params:s,context:l,unstable_pattern:c}=e,d=a.flatMap(p=>p.route.middleware?p.route.middleware.map(h=>[p.route.id,h]):[]);return await NN({request:o,params:s,context:l,unstable_pattern:c},d,t,n,r,i)}async function NN(e,t,n,r,i,a,o=0){let{request:s}=e;if(s.signal.aborted)throw s.signal.reason??new Error(`Request aborted: ${s.method} ${s.url}`);let l=t[o];if(!l)return await n();let[c,d]=l,f,p=async()=>{if(f)throw new Error("You may only call `next()` once per middleware");try{return f={value:await NN(e,t,n,r,i,a,o+1)},f.value}catch(h){return f={value:await a(h,c,f)},f.value}};try{let h=await d(e,p),m=h!=null?r(h):void 0;return i(m)?m:f?m??f.value:(f={value:await p()},f.value)}catch(h){return await a(h,c,f)}}function _N(e,t,n,r,i){let a=ON({key:"middleware",route:r.route,manifest:t,mapRouteProperties:e}),o=zL(r.route,sn(n.method)?"action":"loader",t,e,i);return{middleware:a,route:o.lazyRoutePromise,handler:o.lazyHandlerPromise}}function Wv(e,t,n,r,i,a,o,s,l=null,c){let d=!1,f=_N(e,t,n,i,a);return{...i,_lazyPromises:f,shouldLoad:s,shouldRevalidateArgs:l,shouldCallHandler(p){return d=!0,l?typeof c=="boolean"?Cc(i,{...l,defaultShouldRevalidate:c}):typeof p=="boolean"?Cc(i,{...l,defaultShouldRevalidate:p}):Cc(i,l):s},resolve(p){let{lazy:h,loader:m,middleware:y}=i.route,g=d||s||p&&!sn(n.method)&&(h||m),x=y&&y.length>0&&!m&&!h;return g&&(sn(n.method)||!x)?FL({request:n,unstable_pattern:r,match:i,lazyHandlerPromise:f==null?void 0:f.handler,lazyRoutePromise:f==null?void 0:f.route,handlerOverride:p,scopedContext:o}):Promise.resolve({type:"data",result:void 0})}}}function Fs(e,t,n,r,i,a,o,s=null){return r.map(l=>l.route.id!==i.route.id?{...l,shouldLoad:!1,shouldRevalidateArgs:s,shouldCallHandler:()=>!1,_lazyPromises:_N(e,t,n,l,a),resolve:()=>Promise.resolve({type:"data",result:void 0})}:Wv(e,t,n,Pu(r),l,a,o,!0,s))}async function LL(e,t,n,r,i,a){n.some(c=>{var d;return(d=c._lazyPromises)==null?void 0:d.middleware})&&await Promise.all(n.map(c=>{var d;return(d=c._lazyPromises)==null?void 0:d.middleware}));let o={request:t,unstable_pattern:Pu(n),params:n[0].params,context:i,matches:n},l=await e({...o,fetcherKey:r,runClientMiddleware:c=>{let d=o;return EN(d,()=>c({...d,fetcherKey:r,runClientMiddleware:()=>{throw new Error("Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler")}}))}});try{await Promise.all(n.flatMap(c=>{var d,f;return[(d=c._lazyPromises)==null?void 0:d.handler,(f=c._lazyPromises)==null?void 0:f.route]}))}catch{}return l}async function FL({request:e,unstable_pattern:t,match:n,lazyHandlerPromise:r,lazyRoutePromise:i,handlerOverride:a,scopedContext:o}){let s,l,c=sn(e.method),d=c?"action":"loader",f=p=>{let h,m=new Promise((x,b)=>h=b);l=()=>h(),e.signal.addEventListener("abort",l);let y=x=>typeof p!="function"?Promise.reject(new Error(`You cannot call the handler for a route which defines a boolean "${d}" [routeId: ${n.route.id}]`)):p({request:e,unstable_pattern:t,params:n.params,context:o},...x!==void 0?[x]:[]),g=(async()=>{try{return{type:"data",result:await(a?a(b=>y(b)):y())}}catch(x){return{type:"error",result:x}}})();return Promise.race([g,m])};try{let p=c?n.route.action:n.route.loader;if(r||i)if(p){let h,[m]=await Promise.all([f(p).catch(y=>{h=y}),r,i]);if(h!==void 0)throw h;s=m}else{await r;let h=c?n.route.action:n.route.loader;if(h)[s]=await Promise.all([f(h),i]);else if(d==="action"){let m=new URL(e.url),y=m.pathname+m.search;throw ur(405,{method:e.method,pathname:y,routeId:n.route.id})}else return{type:"data",result:void 0}}else if(p)s=await f(p);else{let h=new URL(e.url),m=h.pathname+h.search;throw ur(404,{pathname:m})}}catch(p){return{type:"error",result:p}}finally{l&&e.signal.removeEventListener("abort",l)}return s}async function UL(e){let t=e.headers.get("Content-Type");return t&&/\bapplication\/json\b/.test(t)?e.body==null?null:e.json():e.text()}async function BL(e){var r,i,a,o,s;let{result:t,type:n}=e;if(e0(t)){let l;try{l=await UL(t)}catch(c){return{type:"error",error:c}}return n==="error"?{type:"error",error:new ku(t.status,t.statusText,l),statusCode:t.status,headers:t.headers}:{type:"data",data:l,statusCode:t.status,headers:t.headers}}return n==="error"?oj(t)?t.data instanceof Error?{type:"error",error:t.data,statusCode:(r=t.init)==null?void 0:r.status,headers:(i=t.init)!=null&&i.headers?new Headers(t.init.headers):void 0}:{type:"error",error:VL(t),statusCode:qc(t)?t.status:void 0,headers:(a=t.init)!=null&&a.headers?new Headers(t.init.headers):void 0}:{type:"error",error:t,statusCode:qc(t)?t.status:void 0}:oj(t)?{type:"data",data:t.data,statusCode:(o=t.init)==null?void 0:o.status,headers:(s=t.init)!=null&&s.headers?new Headers(t.init.headers):void 0}:{type:"data",data:t}}function WL(e,t,n,r,i){let a=e.headers.get("Location");if(Pe(a,"Redirects returned/thrown from loaders/actions must have a Location header"),!Xx(a)){let o=r.slice(0,r.findIndex(s=>s.route.id===n)+1);a=Uv(new URL(t.url),o,i,a),e.headers.set("Location",a)}return e}function tj(e,t,n,r){let i=["about:","blob:","chrome:","chrome-untrusted:","content:","data:","devtools:","file:","filesystem:","javascript:"];if(Xx(e)){let a=e,o=a.startsWith("//")?new URL(t.protocol+a):new URL(a);if(i.includes(o.protocol))throw new Error("Invalid redirect location");let s=wr(o.pathname,n)!=null;if(o.origin===t.origin&&s)return o.pathname+o.search+o.hash}try{let a=r.createURL(e);if(i.includes(a.protocol))throw new Error("Invalid redirect location")}catch{}return e}function ms(e,t,n,r){let i=e.createURL(AN(t)).toString(),a={signal:n};if(r&&sn(r.formMethod)){let{formMethod:o,formEncType:s}=r;a.method=o.toUpperCase(),s==="application/json"?(a.headers=new Headers({"Content-Type":s}),a.body=JSON.stringify(r.json)):s==="text/plain"?a.body=r.text:s==="application/x-www-form-urlencoded"&&r.formData?a.body=Hv(r.formData):a.body=r.formData}return new Request(i,a)}function Hv(e){let t=new URLSearchParams;for(let[n,r]of e.entries())t.append(n,typeof r=="string"?r:r.name);return t}function nj(e){let t=new FormData;for(let[n,r]of e.entries())t.append(n,r);return t}function HL(e,t,n,r=!1,i=!1){let a={},o=null,s,l=!1,c={},d=n&&Vn(n[1])?n[1].error:void 0;return e.forEach(f=>{if(!(f.route.id in t))return;let p=f.route.id,h=t[p];if(Pe(!wo(h),"Cannot handle redirect results in processLoaderData"),Vn(h)){let m=h.error;if(d!==void 0&&(m=d,d=void 0),o=o||{},i)o[p]=m;else{let y=va(e,p);o[y.route.id]==null&&(o[y.route.id]=m)}r||(a[p]=PN),l||(l=!0,s=qc(h.error)?h.error.status:500),h.headers&&(c[p]=h.headers)}else a[p]=h.data,h.statusCode&&h.statusCode!==200&&!l&&(s=h.statusCode),h.headers&&(c[p]=h.headers)}),d!==void 0&&n&&(o={[n[0]]:d},n[2]&&(a[n[2]]=void 0)),{loaderData:a,errors:o,statusCode:s||200,loaderHeaders:c}}function rj(e,t,n,r,i,a){let{loaderData:o,errors:s}=HL(t,n,r);return i.filter(l=>!l.matches||l.matches.some(c=>c.shouldLoad)).forEach(l=>{let{key:c,match:d,controller:f}=l;if(f&&f.signal.aborted)return;let p=a[c];if(Pe(p,"Did not find corresponding fetcher result"),Vn(p)){let h=va(e.matches,d==null?void 0:d.route.id);s&&s[h.route.id]||(s={...s,[h.route.id]:p.error}),e.fetchers.delete(c)}else if(wo(p))Pe(!1,"Unhandled fetcher revalidation redirect");else{let h=Si(p.data);e.fetchers.set(c,h)}}),{loaderData:o,errors:s}}function ij(e,t,n,r){let i=Object.entries(t).filter(([,a])=>a!==PN).reduce((a,[o,s])=>(a[o]=s,a),{});for(let a of n){let o=a.route.id;if(!t.hasOwnProperty(o)&&e.hasOwnProperty(o)&&a.route.loader&&(i[o]=e[o]),r&&r.hasOwnProperty(o))break}return i}function aj(e){return e?Vn(e[1])?{actionData:{}}:{actionData:{[e[0]]:e[1].data}}:{}}function va(e,t){return(t?e.slice(0,e.findIndex(r=>r.route.id===t)+1):[...e]).reverse().find(r=>r.route.hasErrorBoundary===!0)||e[0]}function Sd(e){let t=e.length===1?e[0]:e.find(n=>n.index||!n.path||n.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:t}],route:t}}function ur(e,{pathname:t,routeId:n,method:r,type:i,message:a}={}){let o="Unknown Server Error",s="Unknown @remix-run/router error";return e===400?(o="Bad Request",r&&t&&n?s=`You made a ${r} request to "${t}" but did not provide a \`loader\` for route "${n}", so there is no way to handle the request.`:i==="invalid-body"&&(s="Unable to encode submission body")):e===403?(o="Forbidden",s=`Route "${n}" does not match URL "${t}"`):e===404?(o="Not Found",s=`No route matches URL "${t}"`):e===405&&(o="Method Not Allowed",r&&t&&n?s=`You made a ${r.toUpperCase()} request to "${t}" but did not provide an \`action\` for route "${n}", so there is no way to handle the request.`:r&&(s=`Invalid request method "${r.toUpperCase()}"`)),new ku(e||500,o,new Error(s),!0)}function kd(e){let t=Object.entries(e);for(let n=t.length-1;n>=0;n--){let[r,i]=t[n];if(wo(i))return{key:r,result:i}}}function AN(e){let t=typeof e=="string"?Xa(e):e;return ci({...t,hash:""})}function KL(e,t){return e.pathname!==t.pathname||e.search!==t.search?!1:e.hash===""?t.hash!=="":e.hash===t.hash?!0:t.hash!==""}function VL(e){var t,n;return new ku(((t=e.init)==null?void 0:t.status)??500,((n=e.init)==null?void 0:n.statusText)??"Internal Server Error",e.data)}function ZL(e){return e!=null&&typeof e=="object"&&Object.entries(e).every(([t,n])=>typeof t=="string"&&qL(n))}function qL(e){return e!=null&&typeof e=="object"&&"type"in e&&"result"in e&&(e.type==="data"||e.type==="error")}function YL(e){return e0(e.result)&&SN.has(e.result.status)}function Vn(e){return e.type==="error"}function wo(e){return(e&&e.type)==="redirect"}function oj(e){return typeof e=="object"&&e!=null&&"type"in e&&"data"in e&&"init"in e&&e.type==="DataWithResponseInit"}function e0(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.headers=="object"&&typeof e.body<"u"}function GL(e){return SN.has(e)}function QL(e){return e0(e)&&GL(e.status)&&e.headers.has("Location")}function XL(e){return EL.has(e.toUpperCase())}function sn(e){return CL.has(e.toUpperCase())}function t0(e){return new URLSearchParams(e).getAll("index").some(t=>t==="")}function of(e,t){let n=typeof t=="string"?Xa(t).search:t.search;if(e[e.length-1].route.index&&t0(n||""))return e[e.length-1];let r=yN(e);return r[r.length-1]}function sj(e){let{formMethod:t,formAction:n,formEncType:r,text:i,formData:a,json:o}=e;if(!(!t||!n||!r)){if(i!=null)return{formMethod:t,formAction:n,formEncType:r,formData:void 0,json:void 0,text:i};if(a!=null)return{formMethod:t,formAction:n,formEncType:r,formData:a,json:void 0,text:void 0};if(o!==void 0)return{formMethod:t,formAction:n,formEncType:r,formData:void 0,json:o,text:void 0}}}function Jm(e,t){return t?{state:"loading",location:e,formMethod:t.formMethod,formAction:t.formAction,formEncType:t.formEncType,formData:t.formData,json:t.json,text:t.text}:{state:"loading",location:e,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function JL(e,t){return{state:"submitting",location:e,formMethod:t.formMethod,formAction:t.formAction,formEncType:t.formEncType,formData:t.formData,json:t.json,text:t.text}}function ql(e,t){return e?{state:"loading",formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text,data:t}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:t}}function e4(e,t){return{state:"submitting",formMethod:e.formMethod,formAction:e.formAction,formEncType:e.formEncType,formData:e.formData,json:e.json,text:e.text,data:t?t.data:void 0}}function Si(e){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:e}}function t4(e,t){try{let n=e.sessionStorage.getItem(kN);if(n){let r=JSON.parse(n);for(let[i,a]of Object.entries(r||{}))a&&Array.isArray(a)&&t.set(i,new Set(a||[]))}}catch{}}function n4(e,t){if(t.size>0){let n={};for(let[r,i]of t)n[r]=[...i];try{e.sessionStorage.setItem(kN,JSON.stringify(n))}catch(r){wt(!1,`Failed to save applied view transitions in sessionStorage (${r}).`)}}}function lj(){let e,t,n=new Promise((r,i)=>{e=async a=>{r(a);try{await n}catch{}},t=async a=>{i(a);try{await n}catch{}}});return{promise:n,resolve:e,reject:t}}var as=v.createContext(null);as.displayName="DataRouter";var Cu=v.createContext(null);Cu.displayName="DataRouterState";var TN=v.createContext(!1);function r4(){return v.useContext(TN)}var n0=v.createContext({isTransitioning:!1});n0.displayName="ViewTransition";var RN=v.createContext(new Map);RN.displayName="Fetchers";var i4=v.createContext(null);i4.displayName="Await";var nr=v.createContext(null);nr.displayName="Navigation";var dh=v.createContext(null);dh.displayName="Location";var kr=v.createContext({outlet:null,matches:[],isDataRoute:!1});kr.displayName="Route";var r0=v.createContext(null);r0.displayName="RouteError";var MN="REACT_ROUTER_ERROR",a4="REDIRECT",o4="ROUTE_ERROR_RESPONSE";function s4(e){if(e.startsWith(`${MN}:${a4}:{`))try{let t=JSON.parse(e.slice(28));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.location=="string"&&typeof t.reloadDocument=="boolean"&&typeof t.replace=="boolean")return t}catch{}}function l4(e){if(e.startsWith(`${MN}:${o4}:{`))try{let t=JSON.parse(e.slice(40));if(typeof t=="object"&&t&&typeof t.status=="number"&&typeof t.statusText=="string")return new ku(t.status,t.statusText,t.data)}catch{}}function c4(e,{relative:t}={}){Pe(jl(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=v.useContext(nr),{hash:i,pathname:a,search:o}=Ou(e,{relative:t}),s=a;return n!=="/"&&(s=a==="/"?n:si([n,a])),r.createHref({pathname:s,search:o,hash:i})}function jl(){return v.useContext(dh)!=null}function hi(){return Pe(jl(),"useLocation() may be used only in the context of a <Router> component."),v.useContext(dh).location}var DN="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function zN(e){v.useContext(nr).static||v.useLayoutEffect(e)}function ct(){let{isDataRoute:e}=v.useContext(kr);return e?k4():u4()}function u4(){Pe(jl(),"useNavigate() may be used only in the context of a <Router> component.");let e=v.useContext(as),{basename:t,navigator:n}=v.useContext(nr),{matches:r}=v.useContext(kr),{pathname:i}=hi(),a=JSON.stringify(ch(r)),o=v.useRef(!1);return zN(()=>{o.current=!0}),v.useCallback((l,c={})=>{if(wt(o.current,DN),!o.current)return;if(typeof l=="number"){n.go(l);return}let d=uh(l,JSON.parse(a),i,c.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:si([t,d.pathname])),(c.replace?n.replace:n.push)(d,c.state,c)},[t,n,a,i,e])}var d4=v.createContext(null);function f4(e){let t=v.useContext(kr).outlet;return v.useMemo(()=>t&&v.createElement(d4.Provider,{value:e},t),[t,e])}function Br(){let{matches:e}=v.useContext(kr),t=e[e.length-1];return t?t.params:{}}function Ou(e,{relative:t}={}){let{matches:n}=v.useContext(kr),{pathname:r}=hi(),i=JSON.stringify(ch(n));return v.useMemo(()=>uh(e,JSON.parse(i),r,t==="path"),[e,i,r,t])}function p4(e,t,n,r,i){Pe(jl(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:a}=v.useContext(nr),{matches:o}=v.useContext(kr),s=o[o.length-1],l=s?s.params:{},c=s?s.pathname:"/",d=s?s.pathnameBase:"/",f=s&&s.route;{let b=f&&f.path||"";$N(c,!f||b.endsWith("*")||b.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${b}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${b}"> to <Route path="${b==="/"?"*":`${b}/*`}">.`)}let p=hi(),h;h=p;let m=h.pathname||"/",y=m;if(d!=="/"){let b=d.replace(/^\//,"").split("/");y="/"+m.replace(/^\//,"").split("/").slice(b.length).join("/")}let g=ga(e,{pathname:y});return wt(f||g!=null,`No routes matched location "${h.pathname}${h.search}${h.hash}" `),wt(g==null||g[g.length-1].route.element!==void 0||g[g.length-1].route.Component!==void 0||g[g.length-1].route.lazy!==void 0,`Matched leaf route at location "${h.pathname}${h.search}${h.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`),y4(g&&g.map(b=>Object.assign({},b,{params:Object.assign({},l,b.params),pathname:si([d,a.encodeLocation?a.encodeLocation(b.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:b.pathname]),pathnameBase:b.pathnameBase==="/"?d:si([d,a.encodeLocation?a.encodeLocation(b.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:b.pathnameBase])})),o,n,r,i)}function h4(){let e=S4(),t=qc(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,r="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:r},a={padding:"2px 4px",backgroundColor:r},o=null;return console.error("Error handled by React Router default ErrorBoundary:",e),o=v.createElement(v.Fragment,null,v.createElement("p",null,"💿 Hey developer 👋"),v.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",v.createElement("code",{style:a},"ErrorBoundary")," or"," ",v.createElement("code",{style:a},"errorElement")," prop on your route.")),v.createElement(v.Fragment,null,v.createElement("h2",null,"Unexpected Application Error!"),v.createElement("h3",{style:{fontStyle:"italic"}},t),n?v.createElement("pre",{style:i},n):null,o)}var m4=v.createElement(h4,null),IN=class extends v.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,t){return t.location!==e.location||t.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:t.error,location:t.location,revalidation:e.revalidation||t.revalidation}}componentDidCatch(e,t){this.props.onError?this.props.onError(e,t):console.error("React Router caught the following error during render",e)}render(){let e=this.state.error;if(this.context&&typeof e=="object"&&e&&"digest"in e&&typeof e.digest=="string"){const n=l4(e.digest);n&&(e=n)}let t=e!==void 0?v.createElement(kr.Provider,{value:this.props.routeContext},v.createElement(r0.Provider,{value:e,children:this.props.component})):this.props.children;return this.context?v.createElement(g4,{error:e},t):t}};IN.contextType=TN;var eg=new WeakMap;function g4({children:e,error:t}){let{basename:n}=v.useContext(nr);if(typeof t=="object"&&t&&"digest"in t&&typeof t.digest=="string"){let r=s4(t.digest);if(r){let i=eg.get(t);if(i)throw i;let a=bN(r.location,n);if(xN&&!eg.get(t))if(a.isExternal||r.reloadDocument)window.location.href=a.absoluteURL||a.to;else{const o=Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(a.to,{replace:r.replace}));throw eg.set(t,o),o}return v.createElement("meta",{httpEquiv:"refresh",content:`0;url=${a.absoluteURL||a.to}`})}}return e}function v4({routeContext:e,match:t,children:n}){let r=v.useContext(as);return r&&r.static&&r.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=t.route.id),v.createElement(kr.Provider,{value:e},n)}function y4(e,t=[],n=null,r=null,i=null){if(e==null){if(!n)return null;if(n.errors)e=n.matches;else if(t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let a=e,o=n==null?void 0:n.errors;if(o!=null){let d=a.findIndex(f=>f.route.id&&(o==null?void 0:o[f.route.id])!==void 0);Pe(d>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),a=a.slice(0,Math.min(a.length,d+1))}let s=!1,l=-1;if(n)for(let d=0;d<a.length;d++){let f=a[d];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(l=d),f.route.id){let{loaderData:p,errors:h}=n,m=f.route.loader&&!p.hasOwnProperty(f.route.id)&&(!h||h[f.route.id]===void 0);if(f.route.lazy||m){s=!0,l>=0?a=a.slice(0,l+1):a=[a[0]];break}}}let c=n&&r?(d,f)=>{var p,h;r(d,{location:n.location,params:((h=(p=n.matches)==null?void 0:p[0])==null?void 0:h.params)??{},unstable_pattern:Pu(n.matches),errorInfo:f})}:void 0;return a.reduceRight((d,f,p)=>{let h,m=!1,y=null,g=null;n&&(h=o&&f.route.id?o[f.route.id]:void 0,y=f.route.errorElement||m4,s&&(l<0&&p===0?($N("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),m=!0,g=null):l===p&&(m=!0,g=f.route.hydrateFallbackElement||null)));let x=t.concat(a.slice(0,p+1)),b=()=>{let w;return h?w=y:m?w=g:f.route.Component?w=v.createElement(f.route.Component,null):f.route.element?w=f.route.element:w=d,v.createElement(v4,{match:f,routeContext:{outlet:d,matches:x,isDataRoute:n!=null},children:w})};return n&&(f.route.ErrorBoundary||f.route.errorElement||p===0)?v.createElement(IN,{location:n.location,revalidation:n.revalidation,component:y,error:h,children:b(),routeContext:{outlet:null,matches:x,isDataRoute:!0},onError:c}):b()},null)}function i0(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function x4(e){let t=v.useContext(as);return Pe(t,i0(e)),t}function b4(e){let t=v.useContext(Cu);return Pe(t,i0(e)),t}function w4(e){let t=v.useContext(kr);return Pe(t,i0(e)),t}function a0(e){let t=w4(e),n=t.matches[t.matches.length-1];return Pe(n.route.id,`${e} can only be used on routes that contain a unique "id"`),n.route.id}function j4(){return a0("useRouteId")}function S4(){var r;let e=v.useContext(r0),t=b4("useRouteError"),n=a0("useRouteError");return e!==void 0?e:(r=t.errors)==null?void 0:r[n]}function k4(){let{router:e}=x4("useNavigate"),t=a0("useNavigate"),n=v.useRef(!1);return zN(()=>{n.current=!0}),v.useCallback(async(i,a={})=>{wt(n.current,DN),n.current&&(typeof i=="number"?await e.navigate(i):await e.navigate(i,{fromRouteId:t,...a}))},[e,t])}var cj={};function $N(e,t,n){!t&&!cj[e]&&(cj[e]=!0,wt(!1,n))}var uj={};function dj(e,t){!e&&!uj[t]&&(uj[t]=!0,console.warn(t))}var P4="useOptimistic",fj=JC[P4],C4=()=>{};function O4(e){return fj?fj(e):[e,C4]}function E4(e){let t={hasErrorBoundary:e.hasErrorBoundary||e.ErrorBoundary!=null||e.errorElement!=null};return e.Component&&(e.element&&wt(!1,"You should not include both `Component` and `element` on your route - `Component` will be used."),Object.assign(t,{element:v.createElement(e.Component),Component:void 0})),e.HydrateFallback&&(e.hydrateFallbackElement&&wt(!1,"You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."),Object.assign(t,{hydrateFallbackElement:v.createElement(e.HydrateFallback),HydrateFallback:void 0})),e.ErrorBoundary&&(e.errorElement&&wt(!1,"You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."),Object.assign(t,{errorElement:v.createElement(e.ErrorBoundary),ErrorBoundary:void 0})),t}var N4=["HydrateFallback","hydrateFallbackElement"],_4=class{constructor(){this.status="pending",this.promise=new Promise((e,t)=>{this.resolve=n=>{this.status==="pending"&&(this.status="resolved",e(n))},this.reject=n=>{this.status==="pending"&&(this.status="rejected",t(n))}})}};function A4({router:e,flushSync:t,onError:n,unstable_useTransitions:r}){r=r4()||r;let[a,o]=v.useState(e.state),[s,l]=O4(a),[c,d]=v.useState(),[f,p]=v.useState({isTransitioning:!1}),[h,m]=v.useState(),[y,g]=v.useState(),[x,b]=v.useState(),w=v.useRef(new Map),j=v.useCallback((C,{deletedFetchers:N,newErrors:_,flushSync:M,viewTransitionOpts:R})=>{_&&n&&Object.values(_).forEach(V=>{var ee;return n(V,{location:C.location,params:((ee=C.matches[0])==null?void 0:ee.params)??{},unstable_pattern:Pu(C.matches)})}),C.fetchers.forEach((V,ee)=>{V.data!==void 0&&w.current.set(ee,V.data)}),N.forEach(V=>w.current.delete(V)),dj(M===!1||t!=null,'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.');let G=e.window!=null&&e.window.document!=null&&typeof e.window.document.startViewTransition=="function";if(dj(R==null||G,"You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."),!R||!G){t&&M?t(()=>o(C)):r===!1?o(C):v.startTransition(()=>{r===!0&&l(V=>pj(V,C)),o(C)});return}if(t&&M){t(()=>{y&&(h==null||h.resolve(),y.skipTransition()),p({isTransitioning:!0,flushSync:!0,currentLocation:R.currentLocation,nextLocation:R.nextLocation})});let V=e.window.document.startViewTransition(()=>{t(()=>o(C))});V.finished.finally(()=>{t(()=>{m(void 0),g(void 0),d(void 0),p({isTransitioning:!1})})}),t(()=>g(V));return}y?(h==null||h.resolve(),y.skipTransition(),b({state:C,currentLocation:R.currentLocation,nextLocation:R.nextLocation})):(d(C),p({isTransitioning:!0,flushSync:!1,currentLocation:R.currentLocation,nextLocation:R.nextLocation}))},[e.window,t,y,h,r,l,n]);v.useLayoutEffect(()=>e.subscribe(j),[e,j]),v.useEffect(()=>{f.isTransitioning&&!f.flushSync&&m(new _4)},[f]),v.useEffect(()=>{if(h&&c&&e.window){let C=c,N=h.promise,_=e.window.document.startViewTransition(async()=>{r===!1?o(C):v.startTransition(()=>{r===!0&&l(M=>pj(M,C)),o(C)}),await N});_.finished.finally(()=>{m(void 0),g(void 0),d(void 0),p({isTransitioning:!1})}),g(_)}},[c,h,e.window,r,l]),v.useEffect(()=>{h&&c&&s.location.key===c.location.key&&h.resolve()},[h,y,s.location,c]),v.useEffect(()=>{!f.isTransitioning&&x&&(d(x.state),p({isTransitioning:!0,flushSync:!1,currentLocation:x.currentLocation,nextLocation:x.nextLocation}),b(void 0))},[f.isTransitioning,x]);let k=v.useMemo(()=>({createHref:e.createHref,encodeLocation:e.encodeLocation,go:C=>e.navigate(C),push:(C,N,_)=>e.navigate(C,{state:N,preventScrollReset:_==null?void 0:_.preventScrollReset}),replace:(C,N,_)=>e.navigate(C,{replace:!0,state:N,preventScrollReset:_==null?void 0:_.preventScrollReset})}),[e]),P=e.basename||"/",S=v.useMemo(()=>({router:e,navigator:k,static:!1,basename:P,onError:n}),[e,k,P,n]);return v.createElement(v.Fragment,null,v.createElement(as.Provider,{value:S},v.createElement(Cu.Provider,{value:s},v.createElement(RN.Provider,{value:w.current},v.createElement(n0.Provider,{value:f},v.createElement(D4,{basename:P,location:s.location,navigationType:s.historyAction,navigator:k,unstable_useTransitions:r},v.createElement(T4,{routes:e.routes,future:e.future,state:s,onError:n})))))),null)}function pj(e,t){return{...e,navigation:t.navigation.state!=="idle"?t.navigation:e.navigation,revalidation:t.revalidation!=="idle"?t.revalidation:e.revalidation,actionData:t.navigation.state!=="submitting"?t.actionData:e.actionData,fetchers:t.fetchers}}var T4=v.memo(R4);function R4({routes:e,future:t,state:n,onError:r}){return p4(e,void 0,n,r,t)}function M4({to:e,replace:t,state:n,relative:r}){Pe(jl(),"<Navigate> may be used only in the context of a <Router> component.");let{static:i}=v.useContext(nr);wt(!i,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:a}=v.useContext(kr),{pathname:o}=hi(),s=ct(),l=uh(e,ch(a),o,r==="path"),c=JSON.stringify(l);return v.useEffect(()=>{s(JSON.parse(c),{replace:t,state:n,relative:r})},[s,c,r,t,n]),null}function LN(e){return f4(e.context)}function D4({basename:e="/",children:t=null,location:n,navigationType:r="POP",navigator:i,static:a=!1,unstable_useTransitions:o}){Pe(!jl(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let s=e.replace(/^\/*/,"/"),l=v.useMemo(()=>({basename:s,navigator:i,static:a,unstable_useTransitions:o,future:{}}),[s,i,a,o]);typeof n=="string"&&(n=Xa(n));let{pathname:c="/",search:d="",hash:f="",state:p=null,key:h="default"}=n,m=v.useMemo(()=>{let y=wr(c,s);return y==null?null:{location:{pathname:y,search:d,hash:f,state:p,key:h},navigationType:r}},[s,c,d,f,p,h,r]);return wt(m!=null,`<Router basename="${s}"> is not able to match the URL "${c}${d}${f}" because it does not start with the basename, so the <Router> won't render anything.`),m==null?null:v.createElement(nr.Provider,{value:l},v.createElement(dh.Provider,{children:t,value:m}))}var sf="get",lf="application/x-www-form-urlencoded";function fh(e){return typeof HTMLElement<"u"&&e instanceof HTMLElement}function z4(e){return fh(e)&&e.tagName.toLowerCase()==="button"}function I4(e){return fh(e)&&e.tagName.toLowerCase()==="form"}function $4(e){return fh(e)&&e.tagName.toLowerCase()==="input"}function L4(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function F4(e,t){return e.button===0&&(!t||t==="_self")&&!L4(e)}var Pd=null;function U4(){if(Pd===null)try{new FormData(document.createElement("form"),0),Pd=!1}catch{Pd=!0}return Pd}var B4=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function tg(e){return e!=null&&!B4.has(e)?(wt(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${lf}"`),null):e}function W4(e,t){let n,r,i,a,o;if(I4(e)){let s=e.getAttribute("action");r=s?wr(s,t):null,n=e.getAttribute("method")||sf,i=tg(e.getAttribute("enctype"))||lf,a=new FormData(e)}else if(z4(e)||$4(e)&&(e.type==="submit"||e.type==="image")){let s=e.form;if(s==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let l=e.getAttribute("formaction")||s.getAttribute("action");if(r=l?wr(l,t):null,n=e.getAttribute("formmethod")||s.getAttribute("method")||sf,i=tg(e.getAttribute("formenctype"))||tg(s.getAttribute("enctype"))||lf,a=new FormData(s,e),!U4()){let{name:c,type:d,value:f}=e;if(d==="image"){let p=c?`${c}.`:"";a.append(`${p}x`,"0"),a.append(`${p}y`,"0")}else c&&a.append(c,f)}}else{if(fh(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=sf,r=null,i=lf,o=e}return a&&i==="text/plain"&&(o=a,a=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:a,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function o0(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function H4(e,t,n,r){let i=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return n?i.pathname.endsWith("/")?i.pathname=`${i.pathname}_.${r}`:i.pathname=`${i.pathname}.${r}`:i.pathname==="/"?i.pathname=`_root.${r}`:t&&wr(i.pathname,t)==="/"?i.pathname=`${t.replace(/\/$/,"")}/_root.${r}`:i.pathname=`${i.pathname.replace(/\/$/,"")}.${r}`,i}async function K4(e,t){if(e.id in t)return t[e.id];try{let n=await import(e.module);return t[e.id]=n,n}catch(n){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function V4(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function Z4(e,t,n){let r=await Promise.all(e.map(async i=>{let a=t.routes[i.route.id];if(a){let o=await K4(a,n);return o.links?o.links():[]}return[]}));return Q4(r.flat(1).filter(V4).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function hj(e,t,n,r,i,a){let o=(l,c)=>n[c]?l.route.id!==n[c].route.id:!0,s=(l,c)=>{var d;return n[c].pathname!==l.pathname||((d=n[c].route.path)==null?void 0:d.endsWith("*"))&&n[c].params["*"]!==l.params["*"]};return a==="assets"?t.filter((l,c)=>o(l,c)||s(l,c)):a==="data"?t.filter((l,c)=>{var f;let d=r.routes[l.route.id];if(!d||!d.hasLoader)return!1;if(o(l,c)||s(l,c))return!0;if(l.route.shouldRevalidate){let p=l.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:((f=n[0])==null?void 0:f.params)||{},nextUrl:new URL(e,window.origin),nextParams:l.params,defaultShouldRevalidate:!0});if(typeof p=="boolean")return p}return!0}):[]}function q4(e,t,{includeHydrateFallback:n}={}){return Y4(e.map(r=>{let i=t.routes[r.route.id];if(!i)return[];let a=[i.module];return i.clientActionModule&&(a=a.concat(i.clientActionModule)),i.clientLoaderModule&&(a=a.concat(i.clientLoaderModule)),n&&i.hydrateFallbackModule&&(a=a.concat(i.hydrateFallbackModule)),i.imports&&(a=a.concat(i.imports)),a}).flat(1))}function Y4(e){return[...new Set(e)]}function G4(e){let t={},n=Object.keys(e).sort();for(let r of n)t[r]=e[r];return t}function Q4(e,t){let n=new Set;return new Set(t),e.reduce((r,i)=>{let a=JSON.stringify(G4(i));return n.has(a)||(n.add(a),r.push({key:a,link:i})),r},[])}function FN(){let e=v.useContext(as);return o0(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function X4(){let e=v.useContext(Cu);return o0(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var s0=v.createContext(void 0);s0.displayName="FrameworkContext";function UN(){let e=v.useContext(s0);return o0(e,"You must render this element inside a <HydratedRouter> element"),e}function J4(e,t){let n=v.useContext(s0),[r,i]=v.useState(!1),[a,o]=v.useState(!1),{onFocus:s,onBlur:l,onMouseEnter:c,onMouseLeave:d,onTouchStart:f}=t,p=v.useRef(null);v.useEffect(()=>{if(e==="render"&&o(!0),e==="viewport"){let y=x=>{x.forEach(b=>{o(b.isIntersecting)})},g=new IntersectionObserver(y,{threshold:.5});return p.current&&g.observe(p.current),()=>{g.disconnect()}}},[e]),v.useEffect(()=>{if(r){let y=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(y)}}},[r]);let h=()=>{i(!0)},m=()=>{i(!1),o(!1)};return n?e!=="intent"?[a,p,{}]:[a,p,{onFocus:Yl(s,h),onBlur:Yl(l,m),onMouseEnter:Yl(c,h),onMouseLeave:Yl(d,m),onTouchStart:Yl(f,h)}]:[!1,p,{}]}function Yl(e,t){return n=>{e&&e(n),n.defaultPrevented||t(n)}}function e6({page:e,...t}){let{router:n}=FN(),r=v.useMemo(()=>ga(n.routes,e,n.basename),[n.routes,e,n.basename]);return r?v.createElement(n6,{page:e,matches:r,...t}):null}function t6(e){let{manifest:t,routeModules:n}=UN(),[r,i]=v.useState([]);return v.useEffect(()=>{let a=!1;return Z4(e,t,n).then(o=>{a||i(o)}),()=>{a=!0}},[e,t,n]),r}function n6({page:e,matches:t,...n}){let r=hi(),{future:i,manifest:a,routeModules:o}=UN(),{basename:s}=FN(),{loaderData:l,matches:c}=X4(),d=v.useMemo(()=>hj(e,t,c,a,r,"data"),[e,t,c,a,r]),f=v.useMemo(()=>hj(e,t,c,a,r,"assets"),[e,t,c,a,r]),p=v.useMemo(()=>{if(e===r.pathname+r.search+r.hash)return[];let y=new Set,g=!1;if(t.forEach(b=>{var j;let w=a.routes[b.route.id];!w||!w.hasLoader||(!d.some(k=>k.route.id===b.route.id)&&b.route.id in l&&((j=o[b.route.id])!=null&&j.shouldRevalidate)||w.hasClientLoader?g=!0:y.add(b.route.id))}),y.size===0)return[];let x=H4(e,s,i.unstable_trailingSlashAwareDataRequests,"data");return g&&y.size>0&&x.searchParams.set("_routes",t.filter(b=>y.has(b.route.id)).map(b=>b.route.id).join(",")),[x.pathname+x.search]},[s,i.unstable_trailingSlashAwareDataRequests,l,r,a,d,t,e,o]),h=v.useMemo(()=>q4(f,a),[f,a]),m=t6(f);return v.createElement(v.Fragment,null,p.map(y=>v.createElement("link",{key:y,rel:"prefetch",as:"fetch",href:y,...n})),h.map(y=>v.createElement("link",{key:y,rel:"modulepreload",href:y,...n})),m.map(({key:y,link:g})=>v.createElement("link",{key:y,nonce:n.nonce,...g,crossOrigin:g.crossOrigin??n.crossOrigin})))}function r6(...e){return t=>{e.forEach(n=>{typeof n=="function"?n(t):n!=null&&(n.current=t)})}}var i6=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{i6&&(window.__reactRouterVersion="7.13.0")}catch{}function a6(e,t){return TL({basename:t==null?void 0:t.basename,getContext:t==null?void 0:t.getContext,future:t==null?void 0:t.future,history:q$({window:t==null?void 0:t.window}),hydrationData:o6(),routes:e,mapRouteProperties:E4,hydrationRouteProperties:N4,dataStrategy:t==null?void 0:t.dataStrategy,patchRoutesOnNavigation:t==null?void 0:t.patchRoutesOnNavigation,window:t==null?void 0:t.window,unstable_instrumentations:t==null?void 0:t.unstable_instrumentations}).initialize()}function o6(){let e=window==null?void 0:window.__staticRouterHydrationData;return e&&e.errors&&(e={...e,errors:s6(e.errors)}),e}function s6(e){if(!e)return null;let t=Object.entries(e),n={};for(let[r,i]of t)if(i&&i.__type==="RouteErrorResponse")n[r]=new ku(i.status,i.statusText,i.data,i.internal===!0);else if(i&&i.__type==="Error"){if(i.__subType){let a=window[i.__subType];if(typeof a=="function")try{let o=new a(i.message);o.stack="",n[r]=o}catch{}}if(n[r]==null){let a=new Error(i.message);a.stack="",n[r]=a}}else n[r]=i;return n}var BN=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,sr=v.forwardRef(function({onClick:t,discover:n="render",prefetch:r="none",relative:i,reloadDocument:a,replace:o,state:s,target:l,to:c,preventScrollReset:d,viewTransition:f,unstable_defaultShouldRevalidate:p,...h},m){let{basename:y,unstable_useTransitions:g}=v.useContext(nr),x=typeof c=="string"&&BN.test(c),b=bN(c,y);c=b.to;let w=c4(c,{relative:i}),[j,k,P]=J4(r,h),S=d6(c,{replace:o,state:s,target:l,preventScrollReset:d,relative:i,viewTransition:f,unstable_defaultShouldRevalidate:p,unstable_useTransitions:g});function C(_){t&&t(_),_.defaultPrevented||S(_)}let N=v.createElement("a",{...h,...P,href:b.absoluteURL||w,onClick:b.isExternal||a?t:C,ref:r6(m,k),target:l,"data-discover":!x&&n==="render"?"true":void 0});return j&&!x?v.createElement(v.Fragment,null,N,v.createElement(e6,{page:w})):N});sr.displayName="Link";var l6=v.forwardRef(function({"aria-current":t="page",caseSensitive:n=!1,className:r="",end:i=!1,style:a,to:o,viewTransition:s,children:l,...c},d){let f=Ou(o,{relative:c.relative}),p=hi(),h=v.useContext(Cu),{navigator:m,basename:y}=v.useContext(nr),g=h!=null&&g6(f)&&s===!0,x=m.encodeLocation?m.encodeLocation(f).pathname:f.pathname,b=p.pathname,w=h&&h.navigation&&h.navigation.location?h.navigation.location.pathname:null;n||(b=b.toLowerCase(),w=w?w.toLowerCase():null,x=x.toLowerCase()),w&&y&&(w=wr(w,y)||w);const j=x!=="/"&&x.endsWith("/")?x.length-1:x.length;let k=b===x||!i&&b.startsWith(x)&&b.charAt(j)==="/",P=w!=null&&(w===x||!i&&w.startsWith(x)&&w.charAt(x.length)==="/"),S={isActive:k,isPending:P,isTransitioning:g},C=k?t:void 0,N;typeof r=="function"?N=r(S):N=[r,k?"active":null,P?"pending":null,g?"transitioning":null].filter(Boolean).join(" ");let _=typeof a=="function"?a(S):a;return v.createElement(sr,{...c,"aria-current":C,className:N,ref:d,style:_,to:o,viewTransition:s},typeof l=="function"?l(S):l)});l6.displayName="NavLink";var c6=v.forwardRef(({discover:e="render",fetcherKey:t,navigate:n,reloadDocument:r,replace:i,state:a,method:o=sf,action:s,onSubmit:l,relative:c,preventScrollReset:d,viewTransition:f,unstable_defaultShouldRevalidate:p,...h},m)=>{let{unstable_useTransitions:y}=v.useContext(nr),g=h6(),x=m6(s,{relative:c}),b=o.toLowerCase()==="get"?"get":"post",w=typeof s=="string"&&BN.test(s),j=k=>{if(l&&l(k),k.defaultPrevented)return;k.preventDefault();let P=k.nativeEvent.submitter,S=(P==null?void 0:P.getAttribute("formmethod"))||o,C=()=>g(P||k.currentTarget,{fetcherKey:t,method:S,navigate:n,replace:i,state:a,relative:c,preventScrollReset:d,viewTransition:f,unstable_defaultShouldRevalidate:p});y&&n!==!1?v.startTransition(()=>C()):C()};return v.createElement("form",{ref:m,method:b,action:x,onSubmit:r?l:j,...h,"data-discover":!w&&e==="render"?"true":void 0})});c6.displayName="Form";function u6(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function WN(e){let t=v.useContext(as);return Pe(t,u6(e)),t}function d6(e,{target:t,replace:n,state:r,preventScrollReset:i,relative:a,viewTransition:o,unstable_defaultShouldRevalidate:s,unstable_useTransitions:l}={}){let c=ct(),d=hi(),f=Ou(e,{relative:a});return v.useCallback(p=>{if(F4(p,t)){p.preventDefault();let h=n!==void 0?n:ci(d)===ci(f),m=()=>c(e,{replace:h,state:r,preventScrollReset:i,relative:a,viewTransition:o,unstable_defaultShouldRevalidate:s});l?v.startTransition(()=>m()):m()}},[d,c,f,n,r,t,e,i,a,o,s,l])}var f6=0,p6=()=>`__${String(++f6)}__`;function h6(){let{router:e}=WN("useSubmit"),{basename:t}=v.useContext(nr),n=j4(),r=e.fetch,i=e.navigate;return v.useCallback(async(a,o={})=>{let{action:s,method:l,encType:c,formData:d,body:f}=W4(a,t);if(o.navigate===!1){let p=o.fetcherKey||p6();await r(p,n,o.action||s,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:d,body:f,formMethod:o.method||l,formEncType:o.encType||c,flushSync:o.flushSync})}else await i(o.action||s,{unstable_defaultShouldRevalidate:o.unstable_defaultShouldRevalidate,preventScrollReset:o.preventScrollReset,formData:d,body:f,formMethod:o.method||l,formEncType:o.encType||c,replace:o.replace,state:o.state,fromRouteId:n,flushSync:o.flushSync,viewTransition:o.viewTransition})},[r,i,t,n])}function m6(e,{relative:t}={}){let{basename:n}=v.useContext(nr),r=v.useContext(kr);Pe(r,"useFormAction must be used inside a RouteContext");let[i]=r.matches.slice(-1),a={...Ou(e||".",{relative:t})},o=hi();if(e==null){a.search=o.search;let s=new URLSearchParams(a.search),l=s.getAll("index");if(l.some(d=>d==="")){s.delete("index"),l.filter(f=>f).forEach(f=>s.append("index",f));let d=s.toString();a.search=d?`?${d}`:""}}return(!e||e===".")&&i.route.index&&(a.search=a.search?a.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(a.pathname=a.pathname==="/"?n:si([n,a.pathname])),ci(a)}function g6(e,{relative:t}={}){let n=v.useContext(n0);Pe(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=WN("useViewTransitionState"),i=Ou(e,{relative:t});if(!n.isTransitioning)return!1;let a=wr(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=wr(n.nextLocation.pathname,r)||n.nextLocation.pathname;return Kf(i.pathname,o)!=null||Kf(i.pathname,a)!=null}function v6(e){return v.createElement(A4,{flushSync:Su.flushSync,...e})}function HN(e,t){return function(){return e.apply(t,arguments)}}const{toString:y6}=Object.prototype,{getPrototypeOf:l0}=Object,{iterator:ph,toStringTag:KN}=Symbol,hh=(e=>t=>{const n=y6.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),Wr=e=>(e=e.toLowerCase(),t=>hh(t)===e),mh=e=>t=>typeof t===e,{isArray:Sl}=Array,cl=mh("undefined");function Eu(e){return e!==null&&!cl(e)&&e.constructor!==null&&!cl(e.constructor)&&Ln(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const VN=Wr("ArrayBuffer");function x6(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&VN(e.buffer),t}const b6=mh("string"),Ln=mh("function"),ZN=mh("number"),Nu=e=>e!==null&&typeof e=="object",w6=e=>e===!0||e===!1,cf=e=>{if(hh(e)!=="object")return!1;const t=l0(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(KN in e)&&!(ph in e)},j6=e=>{if(!Nu(e)||Eu(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},S6=Wr("Date"),k6=Wr("File"),P6=Wr("Blob"),C6=Wr("FileList"),O6=e=>Nu(e)&&Ln(e.pipe),E6=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||Ln(e.append)&&((t=hh(e))==="formdata"||t==="object"&&Ln(e.toString)&&e.toString()==="[object FormData]"))},N6=Wr("URLSearchParams"),[_6,A6,T6,R6]=["ReadableStream","Request","Response","Headers"].map(Wr),M6=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function _u(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,i;if(typeof e!="object"&&(e=[e]),Sl(e))for(r=0,i=e.length;r<i;r++)t.call(null,e[r],r,e);else{if(Eu(e))return;const a=n?Object.getOwnPropertyNames(e):Object.keys(e),o=a.length;let s;for(r=0;r<o;r++)s=a[r],t.call(null,e[s],s,e)}}function qN(e,t){if(Eu(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,i;for(;r-- >0;)if(i=n[r],t===i.toLowerCase())return i;return null}const jo=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,YN=e=>!cl(e)&&e!==jo;function Kv(){const{caseless:e,skipUndefined:t}=YN(this)&&this||{},n={},r=(i,a)=>{const o=e&&qN(n,a)||a;cf(n[o])&&cf(i)?n[o]=Kv(n[o],i):cf(i)?n[o]=Kv({},i):Sl(i)?n[o]=i.slice():(!t||!cl(i))&&(n[o]=i)};for(let i=0,a=arguments.length;i<a;i++)arguments[i]&&_u(arguments[i],r);return n}const D6=(e,t,n,{allOwnKeys:r}={})=>(_u(t,(i,a)=>{n&&Ln(i)?Object.defineProperty(e,a,{value:HN(i,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,a,{value:i,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),z6=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),I6=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},$6=(e,t,n,r)=>{let i,a,o;const s={};if(t=t||{},e==null)return t;do{for(i=Object.getOwnPropertyNames(e),a=i.length;a-- >0;)o=i[a],(!r||r(o,e,t))&&!s[o]&&(t[o]=e[o],s[o]=!0);e=n!==!1&&l0(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},L6=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},F6=e=>{if(!e)return null;if(Sl(e))return e;let t=e.length;if(!ZN(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},U6=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&l0(Uint8Array)),B6=(e,t)=>{const r=(e&&e[ph]).call(e);let i;for(;(i=r.next())&&!i.done;){const a=i.value;t.call(e,a[0],a[1])}},W6=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},H6=Wr("HTMLFormElement"),K6=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,i){return r.toUpperCase()+i}),mj=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),V6=Wr("RegExp"),GN=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};_u(n,(i,a)=>{let o;(o=t(i,a,e))!==!1&&(r[a]=o||i)}),Object.defineProperties(e,r)},Z6=e=>{GN(e,(t,n)=>{if(Ln(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(Ln(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},q6=(e,t)=>{const n={},r=i=>{i.forEach(a=>{n[a]=!0})};return Sl(e)?r(e):r(String(e).split(t)),n},Y6=()=>{},G6=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Q6(e){return!!(e&&Ln(e.append)&&e[KN]==="FormData"&&e[ph])}const X6=e=>{const t=new Array(10),n=(r,i)=>{if(Nu(r)){if(t.indexOf(r)>=0)return;if(Eu(r))return r;if(!("toJSON"in r)){t[i]=r;const a=Sl(r)?[]:{};return _u(r,(o,s)=>{const l=n(o,i+1);!cl(l)&&(a[s]=l)}),t[i]=void 0,a}}return r};return n(e,0)},J6=Wr("AsyncFunction"),e3=e=>e&&(Nu(e)||Ln(e))&&Ln(e.then)&&Ln(e.catch),QN=((e,t)=>e?setImmediate:t?((n,r)=>(jo.addEventListener("message",({source:i,data:a})=>{i===jo&&a===n&&r.length&&r.shift()()},!1),i=>{r.push(i),jo.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",Ln(jo.postMessage)),t3=typeof queueMicrotask<"u"?queueMicrotask.bind(jo):typeof process<"u"&&process.nextTick||QN,n3=e=>e!=null&&Ln(e[ph]),z={isArray:Sl,isArrayBuffer:VN,isBuffer:Eu,isFormData:E6,isArrayBufferView:x6,isString:b6,isNumber:ZN,isBoolean:w6,isObject:Nu,isPlainObject:cf,isEmptyObject:j6,isReadableStream:_6,isRequest:A6,isResponse:T6,isHeaders:R6,isUndefined:cl,isDate:S6,isFile:k6,isBlob:P6,isRegExp:V6,isFunction:Ln,isStream:O6,isURLSearchParams:N6,isTypedArray:U6,isFileList:C6,forEach:_u,merge:Kv,extend:D6,trim:M6,stripBOM:z6,inherits:I6,toFlatObject:$6,kindOf:hh,kindOfTest:Wr,endsWith:L6,toArray:F6,forEachEntry:B6,matchAll:W6,isHTMLForm:H6,hasOwnProperty:mj,hasOwnProp:mj,reduceDescriptors:GN,freezeMethods:Z6,toObjectSet:q6,toCamelCase:K6,noop:Y6,toFiniteNumber:G6,findKey:qN,global:jo,isContextDefined:YN,isSpecCompliantForm:Q6,toJSONObject:X6,isAsyncFn:J6,isThenable:e3,setImmediate:QN,asap:t3,isIterable:n3};let be=class XN extends Error{static from(t,n,r,i,a,o){const s=new XN(t.message,n||t.code,r,i,a);return s.cause=t,s.name=t.name,o&&Object.assign(s,o),s}constructor(t,n,r,i,a){super(t),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),r&&(this.config=r),i&&(this.request=i),a&&(this.response=a,this.status=a.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:z.toJSONObject(this.config),code:this.code,status:this.status}}};be.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";be.ERR_BAD_OPTION="ERR_BAD_OPTION";be.ECONNABORTED="ECONNABORTED";be.ETIMEDOUT="ETIMEDOUT";be.ERR_NETWORK="ERR_NETWORK";be.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";be.ERR_DEPRECATED="ERR_DEPRECATED";be.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";be.ERR_BAD_REQUEST="ERR_BAD_REQUEST";be.ERR_CANCELED="ERR_CANCELED";be.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";be.ERR_INVALID_URL="ERR_INVALID_URL";const r3=null;function Vv(e){return z.isPlainObject(e)||z.isArray(e)}function JN(e){return z.endsWith(e,"[]")?e.slice(0,-2):e}function gj(e,t,n){return e?e.concat(t).map(function(i,a){return i=JN(i),!n&&a?"["+i+"]":i}).join(n?".":""):t}function i3(e){return z.isArray(e)&&!e.some(Vv)}const a3=z.toFlatObject(z,{},null,function(t){return/^is[A-Z]/.test(t)});function gh(e,t,n){if(!z.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=z.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(y,g){return!z.isUndefined(g[y])});const r=n.metaTokens,i=n.visitor||d,a=n.dots,o=n.indexes,l=(n.Blob||typeof Blob<"u"&&Blob)&&z.isSpecCompliantForm(t);if(!z.isFunction(i))throw new TypeError("visitor must be a function");function c(m){if(m===null)return"";if(z.isDate(m))return m.toISOString();if(z.isBoolean(m))return m.toString();if(!l&&z.isBlob(m))throw new be("Blob is not supported. Use a Buffer instead.");return z.isArrayBuffer(m)||z.isTypedArray(m)?l&&typeof Blob=="function"?new Blob([m]):Buffer.from(m):m}function d(m,y,g){let x=m;if(m&&!g&&typeof m=="object"){if(z.endsWith(y,"{}"))y=r?y:y.slice(0,-2),m=JSON.stringify(m);else if(z.isArray(m)&&i3(m)||(z.isFileList(m)||z.endsWith(y,"[]"))&&(x=z.toArray(m)))return y=JN(y),x.forEach(function(w,j){!(z.isUndefined(w)||w===null)&&t.append(o===!0?gj([y],j,a):o===null?y:y+"[]",c(w))}),!1}return Vv(m)?!0:(t.append(gj(g,y,a),c(m)),!1)}const f=[],p=Object.assign(a3,{defaultVisitor:d,convertValue:c,isVisitable:Vv});function h(m,y){if(!z.isUndefined(m)){if(f.indexOf(m)!==-1)throw Error("Circular reference detected in "+y.join("."));f.push(m),z.forEach(m,function(x,b){(!(z.isUndefined(x)||x===null)&&i.call(t,x,z.isString(b)?b.trim():b,y,p))===!0&&h(x,y?y.concat(b):[b])}),f.pop()}}if(!z.isObject(e))throw new TypeError("data must be an object");return h(e),t}function vj(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function c0(e,t){this._pairs=[],e&&gh(e,this,t)}const e_=c0.prototype;e_.append=function(t,n){this._pairs.push([t,n])};e_.toString=function(t){const n=t?function(r){return t.call(this,r,vj)}:vj;return this._pairs.map(function(i){return n(i[0])+"="+n(i[1])},"").join("&")};function o3(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function t_(e,t,n){if(!t)return e;const r=n&&n.encode||o3,i=z.isFunction(n)?{serialize:n}:n,a=i&&i.serialize;let o;if(a?o=a(t,i):o=z.isURLSearchParams(t)?t.toString():new c0(t,i).toString(r),o){const s=e.indexOf("#");s!==-1&&(e=e.slice(0,s)),e+=(e.indexOf("?")===-1?"?":"&")+o}return e}class yj{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){z.forEach(this.handlers,function(r){r!==null&&t(r)})}}const n_={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},s3=typeof URLSearchParams<"u"?URLSearchParams:c0,l3=typeof FormData<"u"?FormData:null,c3=typeof Blob<"u"?Blob:null,u3={isBrowser:!0,classes:{URLSearchParams:s3,FormData:l3,Blob:c3},protocols:["http","https","file","blob","url","data"]},u0=typeof window<"u"&&typeof document<"u",Zv=typeof navigator=="object"&&navigator||void 0,d3=u0&&(!Zv||["ReactNative","NativeScript","NS"].indexOf(Zv.product)<0),f3=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",p3=u0&&window.location.href||"http://localhost",h3=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:u0,hasStandardBrowserEnv:d3,hasStandardBrowserWebWorkerEnv:f3,navigator:Zv,origin:p3},Symbol.toStringTag,{value:"Module"})),un={...h3,...u3};function m3(e,t){return gh(e,new un.classes.URLSearchParams,{visitor:function(n,r,i,a){return un.isNode&&z.isBuffer(n)?(this.append(r,n.toString("base64")),!1):a.defaultVisitor.apply(this,arguments)},...t})}function g3(e){return z.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function v3(e){const t={},n=Object.keys(e);let r;const i=n.length;let a;for(r=0;r<i;r++)a=n[r],t[a]=e[a];return t}function r_(e){function t(n,r,i,a){let o=n[a++];if(o==="__proto__")return!0;const s=Number.isFinite(+o),l=a>=n.length;return o=!o&&z.isArray(i)?i.length:o,l?(z.hasOwnProp(i,o)?i[o]=[i[o],r]:i[o]=r,!s):((!i[o]||!z.isObject(i[o]))&&(i[o]=[]),t(n,r,i[o],a)&&z.isArray(i[o])&&(i[o]=v3(i[o])),!s)}if(z.isFormData(e)&&z.isFunction(e.entries)){const n={};return z.forEachEntry(e,(r,i)=>{t(g3(r),i,n,0)}),n}return null}function y3(e,t,n){if(z.isString(e))try{return(t||JSON.parse)(e),z.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const Au={transitional:n_,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",i=r.indexOf("application/json")>-1,a=z.isObject(t);if(a&&z.isHTMLForm(t)&&(t=new FormData(t)),z.isFormData(t))return i?JSON.stringify(r_(t)):t;if(z.isArrayBuffer(t)||z.isBuffer(t)||z.isStream(t)||z.isFile(t)||z.isBlob(t)||z.isReadableStream(t))return t;if(z.isArrayBufferView(t))return t.buffer;if(z.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let s;if(a){if(r.indexOf("application/x-www-form-urlencoded")>-1)return m3(t,this.formSerializer).toString();if((s=z.isFileList(t))||r.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return gh(s?{"files[]":t}:t,l&&new l,this.formSerializer)}}return a||i?(n.setContentType("application/json",!1),y3(t)):t}],transformResponse:[function(t){const n=this.transitional||Au.transitional,r=n&&n.forcedJSONParsing,i=this.responseType==="json";if(z.isResponse(t)||z.isReadableStream(t))return t;if(t&&z.isString(t)&&(r&&!this.responseType||i)){const o=!(n&&n.silentJSONParsing)&&i;try{return JSON.parse(t,this.parseReviver)}catch(s){if(o)throw s.name==="SyntaxError"?be.from(s,be.ERR_BAD_RESPONSE,this,null,this.response):s}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:un.classes.FormData,Blob:un.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};z.forEach(["delete","get","head","post","put","patch"],e=>{Au.headers[e]={}});const x3=z.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),b3=e=>{const t={};let n,r,i;return e&&e.split(`
`).forEach(function(o){i=o.indexOf(":"),n=o.substring(0,i).trim().toLowerCase(),r=o.substring(i+1).trim(),!(!n||t[n]&&x3[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},xj=Symbol("internals");function Gl(e){return e&&String(e).trim().toLowerCase()}function uf(e){return e===!1||e==null?e:z.isArray(e)?e.map(uf):String(e)}function w3(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const j3=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function ng(e,t,n,r,i){if(z.isFunction(r))return r.call(this,t,n);if(i&&(t=n),!!z.isString(t)){if(z.isString(r))return t.indexOf(r)!==-1;if(z.isRegExp(r))return r.test(t)}}function S3(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function k3(e,t){const n=z.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(i,a,o){return this[r].call(this,t,i,a,o)},configurable:!0})})}let Fn=class{constructor(t){t&&this.set(t)}set(t,n,r){const i=this;function a(s,l,c){const d=Gl(l);if(!d)throw new Error("header name must be a non-empty string");const f=z.findKey(i,d);(!f||i[f]===void 0||c===!0||c===void 0&&i[f]!==!1)&&(i[f||l]=uf(s))}const o=(s,l)=>z.forEach(s,(c,d)=>a(c,d,l));if(z.isPlainObject(t)||t instanceof this.constructor)o(t,n);else if(z.isString(t)&&(t=t.trim())&&!j3(t))o(b3(t),n);else if(z.isObject(t)&&z.isIterable(t)){let s={},l,c;for(const d of t){if(!z.isArray(d))throw TypeError("Object iterator must return a key-value pair");s[c=d[0]]=(l=s[c])?z.isArray(l)?[...l,d[1]]:[l,d[1]]:d[1]}o(s,n)}else t!=null&&a(n,t,r);return this}get(t,n){if(t=Gl(t),t){const r=z.findKey(this,t);if(r){const i=this[r];if(!n)return i;if(n===!0)return w3(i);if(z.isFunction(n))return n.call(this,i,r);if(z.isRegExp(n))return n.exec(i);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=Gl(t),t){const r=z.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||ng(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let i=!1;function a(o){if(o=Gl(o),o){const s=z.findKey(r,o);s&&(!n||ng(r,r[s],s,n))&&(delete r[s],i=!0)}}return z.isArray(t)?t.forEach(a):a(t),i}clear(t){const n=Object.keys(this);let r=n.length,i=!1;for(;r--;){const a=n[r];(!t||ng(this,this[a],a,t,!0))&&(delete this[a],i=!0)}return i}normalize(t){const n=this,r={};return z.forEach(this,(i,a)=>{const o=z.findKey(r,a);if(o){n[o]=uf(i),delete n[a];return}const s=t?S3(a):String(a).trim();s!==a&&delete n[a],n[s]=uf(i),r[s]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return z.forEach(this,(r,i)=>{r!=null&&r!==!1&&(n[i]=t&&z.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(i=>r.set(i)),r}static accessor(t){const r=(this[xj]=this[xj]={accessors:{}}).accessors,i=this.prototype;function a(o){const s=Gl(o);r[s]||(k3(i,o),r[s]=!0)}return z.isArray(t)?t.forEach(a):a(t),this}};Fn.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);z.reduceDescriptors(Fn.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});z.freezeMethods(Fn);function rg(e,t){const n=this||Au,r=t||n,i=Fn.from(r.headers);let a=r.data;return z.forEach(e,function(s){a=s.call(n,a,i.normalize(),t?t.status:void 0)}),i.normalize(),a}function i_(e){return!!(e&&e.__CANCEL__)}let Tu=class extends be{constructor(t,n,r){super(t??"canceled",be.ERR_CANCELED,n,r),this.name="CanceledError",this.__CANCEL__=!0}};function a_(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new be("Request failed with status code "+n.status,[be.ERR_BAD_REQUEST,be.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function P3(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function C3(e,t){e=e||10;const n=new Array(e),r=new Array(e);let i=0,a=0,o;return t=t!==void 0?t:1e3,function(l){const c=Date.now(),d=r[a];o||(o=c),n[i]=l,r[i]=c;let f=a,p=0;for(;f!==i;)p+=n[f++],f=f%e;if(i=(i+1)%e,i===a&&(a=(a+1)%e),c-o<t)return;const h=d&&c-d;return h?Math.round(p*1e3/h):void 0}}function O3(e,t){let n=0,r=1e3/t,i,a;const o=(c,d=Date.now())=>{n=d,i=null,a&&(clearTimeout(a),a=null),e(...c)};return[(...c)=>{const d=Date.now(),f=d-n;f>=r?o(c,d):(i=c,a||(a=setTimeout(()=>{a=null,o(i)},r-f)))},()=>i&&o(i)]}const Vf=(e,t,n=3)=>{let r=0;const i=C3(50,250);return O3(a=>{const o=a.loaded,s=a.lengthComputable?a.total:void 0,l=o-r,c=i(l),d=o<=s;r=o;const f={loaded:o,total:s,progress:s?o/s:void 0,bytes:l,rate:c||void 0,estimated:c&&s&&d?(s-o)/c:void 0,event:a,lengthComputable:s!=null,[t?"download":"upload"]:!0};e(f)},n)},bj=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},wj=e=>(...t)=>z.asap(()=>e(...t)),E3=un.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,un.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(un.origin),un.navigator&&/(msie|trident)/i.test(un.navigator.userAgent)):()=>!0,N3=un.hasStandardBrowserEnv?{write(e,t,n,r,i,a,o){if(typeof document>"u")return;const s=[`${e}=${encodeURIComponent(t)}`];z.isNumber(n)&&s.push(`expires=${new Date(n).toUTCString()}`),z.isString(r)&&s.push(`path=${r}`),z.isString(i)&&s.push(`domain=${i}`),a===!0&&s.push("secure"),z.isString(o)&&s.push(`SameSite=${o}`),document.cookie=s.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function _3(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function A3(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function o_(e,t,n){let r=!_3(t);return e&&(r||n==!1)?A3(e,t):t}const jj=e=>e instanceof Fn?{...e}:e;function Yo(e,t){t=t||{};const n={};function r(c,d,f,p){return z.isPlainObject(c)&&z.isPlainObject(d)?z.merge.call({caseless:p},c,d):z.isPlainObject(d)?z.merge({},d):z.isArray(d)?d.slice():d}function i(c,d,f,p){if(z.isUndefined(d)){if(!z.isUndefined(c))return r(void 0,c,f,p)}else return r(c,d,f,p)}function a(c,d){if(!z.isUndefined(d))return r(void 0,d)}function o(c,d){if(z.isUndefined(d)){if(!z.isUndefined(c))return r(void 0,c)}else return r(void 0,d)}function s(c,d,f){if(f in t)return r(c,d);if(f in e)return r(void 0,c)}const l={url:a,method:a,data:a,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:s,headers:(c,d,f)=>i(jj(c),jj(d),f,!0)};return z.forEach(Object.keys({...e,...t}),function(d){const f=l[d]||i,p=f(e[d],t[d],d);z.isUndefined(p)&&f!==s||(n[d]=p)}),n}const s_=e=>{const t=Yo({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:i,xsrfCookieName:a,headers:o,auth:s}=t;if(t.headers=o=Fn.from(o),t.url=t_(o_(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),s&&o.set("Authorization","Basic "+btoa((s.username||"")+":"+(s.password?unescape(encodeURIComponent(s.password)):""))),z.isFormData(n)){if(un.hasStandardBrowserEnv||un.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if(z.isFunction(n.getHeaders)){const l=n.getHeaders(),c=["content-type","content-length"];Object.entries(l).forEach(([d,f])=>{c.includes(d.toLowerCase())&&o.set(d,f)})}}if(un.hasStandardBrowserEnv&&(r&&z.isFunction(r)&&(r=r(t)),r||r!==!1&&E3(t.url))){const l=i&&a&&N3.read(a);l&&o.set(i,l)}return t},T3=typeof XMLHttpRequest<"u",R3=T3&&function(e){return new Promise(function(n,r){const i=s_(e);let a=i.data;const o=Fn.from(i.headers).normalize();let{responseType:s,onUploadProgress:l,onDownloadProgress:c}=i,d,f,p,h,m;function y(){h&&h(),m&&m(),i.cancelToken&&i.cancelToken.unsubscribe(d),i.signal&&i.signal.removeEventListener("abort",d)}let g=new XMLHttpRequest;g.open(i.method.toUpperCase(),i.url,!0),g.timeout=i.timeout;function x(){if(!g)return;const w=Fn.from("getAllResponseHeaders"in g&&g.getAllResponseHeaders()),k={data:!s||s==="text"||s==="json"?g.responseText:g.response,status:g.status,statusText:g.statusText,headers:w,config:e,request:g};a_(function(S){n(S),y()},function(S){r(S),y()},k),g=null}"onloadend"in g?g.onloadend=x:g.onreadystatechange=function(){!g||g.readyState!==4||g.status===0&&!(g.responseURL&&g.responseURL.indexOf("file:")===0)||setTimeout(x)},g.onabort=function(){g&&(r(new be("Request aborted",be.ECONNABORTED,e,g)),g=null)},g.onerror=function(j){const k=j&&j.message?j.message:"Network Error",P=new be(k,be.ERR_NETWORK,e,g);P.event=j||null,r(P),g=null},g.ontimeout=function(){let j=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded";const k=i.transitional||n_;i.timeoutErrorMessage&&(j=i.timeoutErrorMessage),r(new be(j,k.clarifyTimeoutError?be.ETIMEDOUT:be.ECONNABORTED,e,g)),g=null},a===void 0&&o.setContentType(null),"setRequestHeader"in g&&z.forEach(o.toJSON(),function(j,k){g.setRequestHeader(k,j)}),z.isUndefined(i.withCredentials)||(g.withCredentials=!!i.withCredentials),s&&s!=="json"&&(g.responseType=i.responseType),c&&([p,m]=Vf(c,!0),g.addEventListener("progress",p)),l&&g.upload&&([f,h]=Vf(l),g.upload.addEventListener("progress",f),g.upload.addEventListener("loadend",h)),(i.cancelToken||i.signal)&&(d=w=>{g&&(r(!w||w.type?new Tu(null,e,g):w),g.abort(),g=null)},i.cancelToken&&i.cancelToken.subscribe(d),i.signal&&(i.signal.aborted?d():i.signal.addEventListener("abort",d)));const b=P3(i.url);if(b&&un.protocols.indexOf(b)===-1){r(new be("Unsupported protocol "+b+":",be.ERR_BAD_REQUEST,e));return}g.send(a||null)})},M3=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,i;const a=function(c){if(!i){i=!0,s();const d=c instanceof Error?c:this.reason;r.abort(d instanceof be?d:new Tu(d instanceof Error?d.message:d))}};let o=t&&setTimeout(()=>{o=null,a(new be(`timeout of ${t}ms exceeded`,be.ETIMEDOUT))},t);const s=()=>{e&&(o&&clearTimeout(o),o=null,e.forEach(c=>{c.unsubscribe?c.unsubscribe(a):c.removeEventListener("abort",a)}),e=null)};e.forEach(c=>c.addEventListener("abort",a));const{signal:l}=r;return l.unsubscribe=()=>z.asap(s),l}},D3=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,i;for(;r<n;)i=r+t,yield e.slice(r,i),r=i},z3=async function*(e,t){for await(const n of I3(e))yield*D3(n,t)},I3=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},Sj=(e,t,n,r)=>{const i=z3(e,t);let a=0,o,s=l=>{o||(o=!0,r&&r(l))};return new ReadableStream({async pull(l){try{const{done:c,value:d}=await i.next();if(c){s(),l.close();return}let f=d.byteLength;if(n){let p=a+=f;n(p)}l.enqueue(new Uint8Array(d))}catch(c){throw s(c),c}},cancel(l){return s(l),i.return()}},{highWaterMark:2})},kj=64*1024,{isFunction:Cd}=z,$3=(({Request:e,Response:t})=>({Request:e,Response:t}))(z.global),{ReadableStream:Pj,TextEncoder:Cj}=z.global,Oj=(e,...t)=>{try{return!!e(...t)}catch{return!1}},L3=e=>{e=z.merge.call({skipUndefined:!0},$3,e);const{fetch:t,Request:n,Response:r}=e,i=t?Cd(t):typeof fetch=="function",a=Cd(n),o=Cd(r);if(!i)return!1;const s=i&&Cd(Pj),l=i&&(typeof Cj=="function"?(m=>y=>m.encode(y))(new Cj):async m=>new Uint8Array(await new n(m).arrayBuffer())),c=a&&s&&Oj(()=>{let m=!1;const y=new n(un.origin,{body:new Pj,method:"POST",get duplex(){return m=!0,"half"}}).headers.has("Content-Type");return m&&!y}),d=o&&s&&Oj(()=>z.isReadableStream(new r("").body)),f={stream:d&&(m=>m.body)};i&&["text","arrayBuffer","blob","formData","stream"].forEach(m=>{!f[m]&&(f[m]=(y,g)=>{let x=y&&y[m];if(x)return x.call(y);throw new be(`Response type '${m}' is not supported`,be.ERR_NOT_SUPPORT,g)})});const p=async m=>{if(m==null)return 0;if(z.isBlob(m))return m.size;if(z.isSpecCompliantForm(m))return(await new n(un.origin,{method:"POST",body:m}).arrayBuffer()).byteLength;if(z.isArrayBufferView(m)||z.isArrayBuffer(m))return m.byteLength;if(z.isURLSearchParams(m)&&(m=m+""),z.isString(m))return(await l(m)).byteLength},h=async(m,y)=>{const g=z.toFiniteNumber(m.getContentLength());return g??p(y)};return async m=>{let{url:y,method:g,data:x,signal:b,cancelToken:w,timeout:j,onDownloadProgress:k,onUploadProgress:P,responseType:S,headers:C,withCredentials:N="same-origin",fetchOptions:_}=s_(m),M=t||fetch;S=S?(S+"").toLowerCase():"text";let R=M3([b,w&&w.toAbortSignal()],j),G=null;const V=R&&R.unsubscribe&&(()=>{R.unsubscribe()});let ee;try{if(P&&c&&g!=="get"&&g!=="head"&&(ee=await h(C,x))!==0){let Y=new n(y,{method:"POST",body:x,duplex:"half"}),re;if(z.isFormData(x)&&(re=Y.headers.get("content-type"))&&C.setContentType(re),Y.body){const[Oe,we]=bj(ee,Vf(wj(P)));x=Sj(Y.body,kj,Oe,we)}}z.isString(N)||(N=N?"include":"omit");const Q=a&&"credentials"in n.prototype,te={..._,signal:R,method:g.toUpperCase(),headers:C.normalize().toJSON(),body:x,duplex:"half",credentials:Q?N:void 0};G=a&&new n(y,te);let $=await(a?M(G,_):M(y,te));const B=d&&(S==="stream"||S==="response");if(d&&(k||B&&V)){const Y={};["status","statusText","headers"].forEach(ie=>{Y[ie]=$[ie]});const re=z.toFiniteNumber($.headers.get("content-length")),[Oe,we]=k&&bj(re,Vf(wj(k),!0))||[];$=new r(Sj($.body,kj,Oe,()=>{we&&we(),V&&V()}),Y)}S=S||"text";let L=await f[z.findKey(f,S)||"text"]($,m);return!B&&V&&V(),await new Promise((Y,re)=>{a_(Y,re,{data:L,headers:Fn.from($.headers),status:$.status,statusText:$.statusText,config:m,request:G})})}catch(Q){throw V&&V(),Q&&Q.name==="TypeError"&&/Load failed|fetch/i.test(Q.message)?Object.assign(new be("Network Error",be.ERR_NETWORK,m,G),{cause:Q.cause||Q}):be.from(Q,Q&&Q.code,m,G)}}},F3=new Map,l_=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:i}=t,a=[r,i,n];let o=a.length,s=o,l,c,d=F3;for(;s--;)l=a[s],c=d.get(l),c===void 0&&d.set(l,c=s?new Map:L3(t)),d=c;return c};l_();const d0={http:r3,xhr:R3,fetch:{get:l_}};z.forEach(d0,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Ej=e=>`- ${e}`,U3=e=>z.isFunction(e)||e===null||e===!1;function B3(e,t){e=z.isArray(e)?e:[e];const{length:n}=e;let r,i;const a={};for(let o=0;o<n;o++){r=e[o];let s;if(i=r,!U3(r)&&(i=d0[(s=String(r)).toLowerCase()],i===void 0))throw new be(`Unknown adapter '${s}'`);if(i&&(z.isFunction(i)||(i=i.get(t))))break;a[s||"#"+o]=i}if(!i){const o=Object.entries(a).map(([l,c])=>`adapter ${l} `+(c===!1?"is not supported by the environment":"is not available in the build"));let s=n?o.length>1?`since :
`+o.map(Ej).join(`
`):" "+Ej(o[0]):"as no adapter specified";throw new be("There is no suitable adapter to dispatch the request "+s,"ERR_NOT_SUPPORT")}return i}const c_={getAdapter:B3,adapters:d0};function ig(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new Tu(null,e)}function Nj(e){return ig(e),e.headers=Fn.from(e.headers),e.data=rg.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),c_.getAdapter(e.adapter||Au.adapter,e)(e).then(function(r){return ig(e),r.data=rg.call(e,e.transformResponse,r),r.headers=Fn.from(r.headers),r},function(r){return i_(r)||(ig(e),r&&r.response&&(r.response.data=rg.call(e,e.transformResponse,r.response),r.response.headers=Fn.from(r.response.headers))),Promise.reject(r)})}const u_="1.13.4",vh={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{vh[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const _j={};vh.transitional=function(t,n,r){function i(a,o){return"[Axios v"+u_+"] Transitional option '"+a+"'"+o+(r?". "+r:"")}return(a,o,s)=>{if(t===!1)throw new be(i(o," has been removed"+(n?" in "+n:"")),be.ERR_DEPRECATED);return n&&!_j[o]&&(_j[o]=!0,console.warn(i(o," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(a,o,s):!0}};vh.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function W3(e,t,n){if(typeof e!="object")throw new be("options must be an object",be.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let i=r.length;for(;i-- >0;){const a=r[i],o=t[a];if(o){const s=e[a],l=s===void 0||o(s,a,e);if(l!==!0)throw new be("option "+a+" must be "+l,be.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new be("Unknown option "+a,be.ERR_BAD_OPTION)}}const df={assertOptions:W3,validators:vh},Zr=df.validators;let $o=class{constructor(t){this.defaults=t||{},this.interceptors={request:new yj,response:new yj}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let i={};Error.captureStackTrace?Error.captureStackTrace(i):i=new Error;const a=i.stack?i.stack.replace(/^.+\n/,""):"";try{r.stack?a&&!String(r.stack).endsWith(a.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+a):r.stack=a}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=Yo(this.defaults,n);const{transitional:r,paramsSerializer:i,headers:a}=n;r!==void 0&&df.assertOptions(r,{silentJSONParsing:Zr.transitional(Zr.boolean),forcedJSONParsing:Zr.transitional(Zr.boolean),clarifyTimeoutError:Zr.transitional(Zr.boolean)},!1),i!=null&&(z.isFunction(i)?n.paramsSerializer={serialize:i}:df.assertOptions(i,{encode:Zr.function,serialize:Zr.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),df.assertOptions(n,{baseUrl:Zr.spelling("baseURL"),withXsrfToken:Zr.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=a&&z.merge(a.common,a[n.method]);a&&z.forEach(["delete","get","head","post","put","patch","common"],m=>{delete a[m]}),n.headers=Fn.concat(o,a);const s=[];let l=!0;this.interceptors.request.forEach(function(y){typeof y.runWhen=="function"&&y.runWhen(n)===!1||(l=l&&y.synchronous,s.unshift(y.fulfilled,y.rejected))});const c=[];this.interceptors.response.forEach(function(y){c.push(y.fulfilled,y.rejected)});let d,f=0,p;if(!l){const m=[Nj.bind(this),void 0];for(m.unshift(...s),m.push(...c),p=m.length,d=Promise.resolve(n);f<p;)d=d.then(m[f++],m[f++]);return d}p=s.length;let h=n;for(;f<p;){const m=s[f++],y=s[f++];try{h=m(h)}catch(g){y.call(this,g);break}}try{d=Nj.call(this,h)}catch(m){return Promise.reject(m)}for(f=0,p=c.length;f<p;)d=d.then(c[f++],c[f++]);return d}getUri(t){t=Yo(this.defaults,t);const n=o_(t.baseURL,t.url,t.allowAbsoluteUrls);return t_(n,t.params,t.paramsSerializer)}};z.forEach(["delete","get","head","options"],function(t){$o.prototype[t]=function(n,r){return this.request(Yo(r||{},{method:t,url:n,data:(r||{}).data}))}});z.forEach(["post","put","patch"],function(t){function n(r){return function(a,o,s){return this.request(Yo(s||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:a,data:o}))}}$o.prototype[t]=n(),$o.prototype[t+"Form"]=n(!0)});let H3=class d_{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(a){n=a});const r=this;this.promise.then(i=>{if(!r._listeners)return;let a=r._listeners.length;for(;a-- >0;)r._listeners[a](i);r._listeners=null}),this.promise.then=i=>{let a;const o=new Promise(s=>{r.subscribe(s),a=s}).then(i);return o.cancel=function(){r.unsubscribe(a)},o},t(function(a,o,s){r.reason||(r.reason=new Tu(a,o,s),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new d_(function(i){t=i}),cancel:t}}};function K3(e){return function(n){return e.apply(null,n)}}function V3(e){return z.isObject(e)&&e.isAxiosError===!0}const qv={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(qv).forEach(([e,t])=>{qv[t]=e});function f_(e){const t=new $o(e),n=HN($o.prototype.request,t);return z.extend(n,$o.prototype,t,{allOwnKeys:!0}),z.extend(n,t,null,{allOwnKeys:!0}),n.create=function(i){return f_(Yo(e,i))},n}const vt=f_(Au);vt.Axios=$o;vt.CanceledError=Tu;vt.CancelToken=H3;vt.isCancel=i_;vt.VERSION=u_;vt.toFormData=gh;vt.AxiosError=be;vt.Cancel=vt.CanceledError;vt.all=function(t){return Promise.all(t)};vt.spread=K3;vt.isAxiosError=V3;vt.mergeConfig=Yo;vt.AxiosHeaders=Fn;vt.formToJSON=e=>r_(z.isHTMLForm(e)?new FormData(e):e);vt.getAdapter=c_.getAdapter;vt.HttpStatusCode=qv;vt.default=vt;const{Axios:poe,AxiosError:hoe,CanceledError:moe,isCancel:goe,CancelToken:voe,VERSION:yoe,all:xoe,Cancel:boe,isAxiosError:woe,spread:joe,toFormData:Soe,AxiosHeaders:koe,HttpStatusCode:Poe,formToJSON:Coe,getAdapter:Ooe,mergeConfig:Eoe}=vt,ce=vt.create({baseURL:"",headers:{"Content-Type":"application/json"}});ce.interceptors.request.use(e=>{const t=localStorage.getItem("access_token");return t&&(e.headers.Authorization=`Bearer ${t}`),e},e=>Promise.reject(e));ce.interceptors.response.use(e=>e,async e=>{var n;const t=e.config;if(((n=e.response)==null?void 0:n.status)===401&&!t._retry){t._retry=!0;try{const r=localStorage.getItem("refresh_token");if(r){const i=await vt.post("/api/auth/refresh",{refreshToken:r}),{access_token:a}=i.data;return localStorage.setItem("access_token",a),t.headers.Authorization=`Bearer ${a}`,ce(t)}}catch(r){return localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),window.location.href="/login",Promise.reject(r)}}return Promise.reject(e)});const p_=v.createContext(null);function Z3({children:e}){const[t,n]=v.useState({user:null,accessToken:null,refreshToken:null,isAuthenticated:!1,isLoading:!1}),r=Qx(),i=()=>{localStorage.removeItem("access_token"),localStorage.removeItem("refresh_token"),localStorage.removeItem("user"),n({user:null,accessToken:null,refreshToken:null,isAuthenticated:!1,isLoading:!1}),r.clear()},s={...t,login:async l=>{n(c=>({...c,isLoading:!0}));try{const c=await ce.post("/auth/login",l),{access_token:d,refresh_token:f}=c.data;localStorage.setItem("access_token",d),localStorage.setItem("refresh_token",f);const p={id:"temp",email:l.code||"unknown",name:l.code||"unknown",roles:["VIEWER"],permissions:[]};localStorage.setItem("user",JSON.stringify(p)),n({user:p,accessToken:d,refreshToken:f,isAuthenticated:!0,isLoading:!1})}catch(c){throw n(d=>({...d,isLoading:!1})),c}},logout:i,refreshAccessToken:async()=>{const l=localStorage.getItem("refresh_token");if(!l){i();return}try{const c=await ce.post("/auth/refresh",{refreshToken:l}),{access_token:d,refresh_token:f}=c.data;localStorage.setItem("access_token",d),localStorage.setItem("refresh_token",f);const p=localStorage.getItem("user"),h=p?JSON.parse(p):null;n({user:h,accessToken:d,refreshToken:f,isAuthenticated:!!h,isLoading:!1})}catch(c){throw i(),c}},hasPermission:(l,c,d)=>{if(!t.user)return!1;if(t.user.roles.includes("ADMIN"))return!0;const f=t.user.permissions.find(p=>p.resourceType===l);return!f||!f.permissions.includes(c)?!1:d&&f.namespaces?f.namespaces.includes(d):!0}};return u.jsx(p_.Provider,{value:s,children:e})}function yh(){const e=v.useContext(p_);if(!e)throw new Error("useAuth must be used within AuthProvider");return e}class q3 extends v.Component{constructor(t){super(t),this.state={hasError:!1}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}componentDidCatch(t,n){var r,i;console.error("ErrorBoundary caught an error:",t,n),(i=(r=this.props).onError)==null||i.call(r,t,n)}render(){return this.state.hasError?this.props.fallback||u.jsxs("div",{className:"error-boundary",children:[u.jsx("h1",{children:"Something went wrong"}),u.jsx("p",{children:"An unexpected error occurred"}),u.jsx("button",{onClick:()=>window.location.reload(),className:"error-boundary-button",type:"button",children:"Reload Page"})]}):this.props.children}}const h_=Zp.createContext(null),Y3=5e3;function G3({children:e}){const[t,n]=v.useState([]),r=a=>{const o=Date.now();n(s=>[...s,{...a,id:o}])},i=a=>{n(o=>o.filter(s=>s.id!==a))};return v.useEffect(()=>{t.forEach(a=>{const o=setTimeout(()=>{i(a.id)},a.duration||Y3);return()=>clearTimeout(o)})},[t]),u.jsxs(h_.Provider,{value:{showToast:r},children:[e,u.jsx("div",{className:"toast-container",children:t.map(a=>u.jsxs("div",{className:`toast toast-${a.type}`,onClick:()=>{var o;(o=a.onClose)==null||o.call(a),i(a.id)},children:[u.jsx("span",{className:"toast-icon",children:Q3(a.type)}),u.jsx("span",{className:"toast-message",children:a.message}),u.jsx("button",{className:"toast-close",onClick:()=>i(a.id),type:"button",children:"×"})]},a.id))})]})}function Ct(){const e=Zp.useContext(h_);if(!e)throw new Error("useToast must be used within ToastProvider");return e}function Q3(e){return{success:"✓",error:"✕",info:"ℹ",warning:"⚠"}[e]}function X3(){const{user:e,logout:t}=yh(),n=()=>{t()};return u.jsxs("div",{className:"app-layout",children:[u.jsxs("header",{className:"app-header",children:[u.jsx(sr,{to:"/",className:"logo",children:"K8s Manager"}),u.jsxs("nav",{className:"app-nav",children:[u.jsx(sr,{to:"/",children:"Home"}),u.jsx(sr,{to:"/cluster",children:"Cluster"}),u.jsx(sr,{to:"/namespaces",children:"Namespaces"}),e&&u.jsx(sr,{to:"/profile",children:"Profile"})]}),e&&u.jsxs("div",{className:"user-menu",children:[u.jsx("div",{className:"user-avatar",children:e.name.charAt(0).toUpperCase()}),u.jsx("button",{onClick:n,className:"logout-button",type:"button",children:"Logout"})]})]}),u.jsx("aside",{className:"app-sidebar",children:u.jsx("nav",{className:"sidebar-nav",children:u.jsxs("ul",{children:[u.jsx("li",{children:u.jsx(sr,{to:"/cluster",children:"Cluster Overview"})}),u.jsx("li",{children:u.jsx(sr,{to:"/cluster/nodes",children:"Nodes"})}),u.jsx("li",{children:u.jsx(sr,{to:"/cluster/events",children:"Events"})}),u.jsx("li",{children:u.jsx(sr,{to:"/namespaces",children:"Namespaces"})}),u.jsx("li",{children:u.jsx(sr,{to:"/workloads",children:"Workloads"})})]})})}),u.jsx("main",{className:"app-content",children:u.jsx(LN,{})})]})}function J3({children:e}){const{isAuthenticated:t,isLoading:n}=yh(),r=hi();return n?u.jsxs("div",{className:"loading-container",children:[u.jsx("div",{className:"loading-spinner"}),u.jsx("p",{children:"Loading..."})]}):t?e?u.jsx(u.Fragment,{children:e}):u.jsx(LN,{}):u.jsx(M4,{to:"/login",state:{from:r},replace:!0})}const eF=[{id:"keycloak",name:"Keycloak",icon:"🔑",color:"#3380cc"},{id:"google",name:"Google",icon:"🔴",color:"#db4437"},{id:"github",name:"GitHub",icon:"🐙",color:"#333"}];function tF(){var d,f;const e=ct(),t=hi(),{login:n,isAuthenticated:r,isLoading:i}=yh(),[a,o]=v.useState(null),[s,l]=v.useState(!1);if(!i&&r){const p=((f=(d=t.state)==null?void 0:d.from)==null?void 0:f.pathname)||"/";e(p,{replace:!0})}const c=async p=>{var h,m;o(null),l(!0);try{const y=`${window.location.origin}${t.pathname}`,g=`${p}_${Date.now()}`;await n({provider:p,code:g,redirectUri:y});const x=((m=(h=t.state)==null?void 0:h.from)==null?void 0:m.pathname)||"/";e(x,{replace:!0})}catch(y){o("Authentication failed. Please try again."),console.error("Login error:",y)}finally{l(!1)}};return i?u.jsxs("div",{className:"login-page loading",children:[u.jsx("div",{className:"loading-spinner"}),u.jsx("p",{children:"Loading..."})]}):u.jsxs("div",{className:"login-page",children:[u.jsxs("div",{className:"login-container",children:[u.jsxs("div",{className:"login-header",children:[u.jsx("h1",{children:"K8s Manager"}),u.jsx("p",{children:"Sign in to access your Kubernetes dashboard"})]}),u.jsx("div",{className:"login-providers",children:eF.map(p=>u.jsxs("button",{className:"provider-button",onClick:()=>c(p.id),disabled:s,style:{"--provider-color":p.color},type:"button",children:[u.jsx("span",{className:"provider-icon",children:p.icon}),u.jsxs("span",{className:"provider-name",children:["Sign in with ",p.name]})]},p.id))}),a&&u.jsx("div",{className:"login-error",children:u.jsx("p",{children:a})}),u.jsxs("div",{className:"login-footer",children:[u.jsx("p",{className:"remember-me",children:u.jsxs("label",{children:[u.jsx("input",{type:"checkbox",name:"remember"}),"Remember me"]})}),u.jsx("p",{className:"login-help",children:"Need help? Contact your administrator"})]})]}),u.jsx("style",{children:`
        .login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .login-page.loading {
          flex-direction: column;
        }

        .login-container {
          background: white;
          padding: 48px 40px;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          max-width: 400px;
          width: 100%;
        }

        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .login-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #333;
        }

        .login-header p {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .login-providers {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .provider-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 14px 20px;
          border: 2px solid var(--provider-color, #333);
          border-radius: 6px;
          background: white;
          color: var(--provider-color, #333);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .provider-button:hover:not(:disabled) {
          background: var(--provider-color, #333);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .provider-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .provider-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .provider-icon {
          font-size: 20px;
        }

        .provider-name {
          flex: 1;
        }

        .login-error {
          padding: 12px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        .login-error p {
          margin: 0;
          font-size: 14px;
          color: #b91c1c;
        }

        .login-footer {
          text-align: center;
        }

        .remember-me {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
        }

        .remember-me label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .login-help {
          font-size: 13px;
          color: #999;
          margin: 0;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `})]})}function nF(){return u.jsxs("div",{className:"dashboard",children:[u.jsx("h1",{children:"Dashboard"}),u.jsx("p",{children:"Welcome to K8s Manager"})]})}function F(e,t,n){function r(s,l){if(s._zod||Object.defineProperty(s,"_zod",{value:{def:l,constr:o,traits:new Set},enumerable:!1}),s._zod.traits.has(e))return;s._zod.traits.add(e),t(s,l);const c=o.prototype,d=Object.keys(c);for(let f=0;f<d.length;f++){const p=d[f];p in s||(s[p]=c[p].bind(s))}}const i=(n==null?void 0:n.Parent)??Object;class a extends i{}Object.defineProperty(a,"name",{value:e});function o(s){var l;const c=n!=null&&n.Parent?new a:this;r(c,s),(l=c._zod).deferred??(l.deferred=[]);for(const d of c._zod.deferred)d();return c}return Object.defineProperty(o,"init",{value:r}),Object.defineProperty(o,Symbol.hasInstance,{value:s=>{var l,c;return n!=null&&n.Parent&&s instanceof n.Parent?!0:(c=(l=s==null?void 0:s._zod)==null?void 0:l.traits)==null?void 0:c.has(e)}}),Object.defineProperty(o,"name",{value:e}),o}class Us extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}class m_ extends Error{constructor(t){super(`Encountered unidirectional transform during encode: ${t}`),this.name="ZodEncodeError"}}const g_={};function Ka(e){return g_}function v_(e){const t=Object.values(e).filter(r=>typeof r=="number");return Object.entries(e).filter(([r,i])=>t.indexOf(+r)===-1).map(([r,i])=>i)}function Yv(e,t){return typeof t=="bigint"?t.toString():t}function f0(e){return{get value(){{const t=e();return Object.defineProperty(this,"value",{value:t}),t}}}}function p0(e){return e==null}function h0(e){const t=e.startsWith("^")?1:0,n=e.endsWith("$")?e.length-1:e.length;return e.slice(t,n)}function rF(e,t){const n=(e.toString().split(".")[1]||"").length,r=t.toString();let i=(r.split(".")[1]||"").length;if(i===0&&/\d?e-\d?/.test(r)){const l=r.match(/\d?e-(\d?)/);l!=null&&l[1]&&(i=Number.parseInt(l[1]))}const a=n>i?n:i,o=Number.parseInt(e.toFixed(a).replace(".","")),s=Number.parseInt(t.toFixed(a).replace(".",""));return o%s/10**a}const Aj=Symbol("evaluating");function Ue(e,t,n){let r;Object.defineProperty(e,t,{get(){if(r!==Aj)return r===void 0&&(r=Aj,r=n()),r},set(i){Object.defineProperty(e,t,{value:i})},configurable:!0})}function os(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function Ja(...e){const t={};for(const n of e){const r=Object.getOwnPropertyDescriptors(n);Object.assign(t,r)}return Object.defineProperties({},t)}function Tj(e){return JSON.stringify(e)}function iF(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}const y_="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function Zf(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const aF=f0(()=>{var e;if(typeof navigator<"u"&&((e=navigator==null?void 0:navigator.userAgent)!=null&&e.includes("Cloudflare")))return!1;try{const t=Function;return new t(""),!0}catch{return!1}});function ul(e){if(Zf(e)===!1)return!1;const t=e.constructor;if(t===void 0||typeof t!="function")return!0;const n=t.prototype;return!(Zf(n)===!1||Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)}function x_(e){return ul(e)?{...e}:Array.isArray(e)?[...e]:e}const oF=new Set(["string","number","symbol"]);function xh(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function eo(e,t,n){const r=new e._zod.constr(t??e._zod.def);return(!t||n!=null&&n.parent)&&(r._zod.parent=e),r}function he(e){const t=e;if(!t)return{};if(typeof t=="string")return{error:()=>t};if((t==null?void 0:t.message)!==void 0){if((t==null?void 0:t.error)!==void 0)throw new Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error=="string"?{...t,error:()=>t.error}:t}function sF(e){return Object.keys(e).filter(t=>e[t]._zod.optin==="optional"&&e[t]._zod.optout==="optional")}const lF={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function cF(e,t){const n=e._zod.def,r=n.checks;if(r&&r.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");const a=Ja(e._zod.def,{get shape(){const o={};for(const s in t){if(!(s in n.shape))throw new Error(`Unrecognized key: "${s}"`);t[s]&&(o[s]=n.shape[s])}return os(this,"shape",o),o},checks:[]});return eo(e,a)}function uF(e,t){const n=e._zod.def,r=n.checks;if(r&&r.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");const a=Ja(e._zod.def,{get shape(){const o={...e._zod.def.shape};for(const s in t){if(!(s in n.shape))throw new Error(`Unrecognized key: "${s}"`);t[s]&&delete o[s]}return os(this,"shape",o),o},checks:[]});return eo(e,a)}function dF(e,t){if(!ul(t))throw new Error("Invalid input to extend: expected a plain object");const n=e._zod.def.checks;if(n&&n.length>0){const a=e._zod.def.shape;for(const o in t)if(Object.getOwnPropertyDescriptor(a,o)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}const i=Ja(e._zod.def,{get shape(){const a={...e._zod.def.shape,...t};return os(this,"shape",a),a}});return eo(e,i)}function fF(e,t){if(!ul(t))throw new Error("Invalid input to safeExtend: expected a plain object");const n=Ja(e._zod.def,{get shape(){const r={...e._zod.def.shape,...t};return os(this,"shape",r),r}});return eo(e,n)}function pF(e,t){const n=Ja(e._zod.def,{get shape(){const r={...e._zod.def.shape,...t._zod.def.shape};return os(this,"shape",r),r},get catchall(){return t._zod.def.catchall},checks:[]});return eo(e,n)}function hF(e,t,n){const i=t._zod.def.checks;if(i&&i.length>0)throw new Error(".partial() cannot be used on object schemas containing refinements");const o=Ja(t._zod.def,{get shape(){const s=t._zod.def.shape,l={...s};if(n)for(const c in n){if(!(c in s))throw new Error(`Unrecognized key: "${c}"`);n[c]&&(l[c]=e?new e({type:"optional",innerType:s[c]}):s[c])}else for(const c in s)l[c]=e?new e({type:"optional",innerType:s[c]}):s[c];return os(this,"shape",l),l},checks:[]});return eo(t,o)}function mF(e,t,n){const r=Ja(t._zod.def,{get shape(){const i=t._zod.def.shape,a={...i};if(n)for(const o in n){if(!(o in a))throw new Error(`Unrecognized key: "${o}"`);n[o]&&(a[o]=new e({type:"nonoptional",innerType:i[o]}))}else for(const o in i)a[o]=new e({type:"nonoptional",innerType:i[o]});return os(this,"shape",a),a}});return eo(t,r)}function _s(e,t=0){var n;if(e.aborted===!0)return!0;for(let r=t;r<e.issues.length;r++)if(((n=e.issues[r])==null?void 0:n.continue)!==!0)return!0;return!1}function As(e,t){return t.map(n=>{var r;return(r=n).path??(r.path=[]),n.path.unshift(e),n})}function Od(e){return typeof e=="string"?e:e==null?void 0:e.message}function Va(e,t,n){var i,a,o,s,l,c;const r={...e,path:e.path??[]};if(!e.message){const d=Od((o=(a=(i=e.inst)==null?void 0:i._zod.def)==null?void 0:a.error)==null?void 0:o.call(a,e))??Od((s=t==null?void 0:t.error)==null?void 0:s.call(t,e))??Od((l=n.customError)==null?void 0:l.call(n,e))??Od((c=n.localeError)==null?void 0:c.call(n,e))??"Invalid input";r.message=d}return delete r.inst,delete r.continue,t!=null&&t.reportInput||delete r.input,r}function m0(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function Yc(...e){const[t,n,r]=e;return typeof t=="string"?{message:t,code:"custom",input:n,inst:r}:{...t}}const b_=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,Yv,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},w_=F("$ZodError",b_),j_=F("$ZodError",b_,{Parent:Error});function gF(e,t=n=>n.message){const n={},r=[];for(const i of e.issues)i.path.length>0?(n[i.path[0]]=n[i.path[0]]||[],n[i.path[0]].push(t(i))):r.push(t(i));return{formErrors:r,fieldErrors:n}}function vF(e,t=n=>n.message){const n={_errors:[]},r=i=>{for(const a of i.issues)if(a.code==="invalid_union"&&a.errors.length)a.errors.map(o=>r({issues:o}));else if(a.code==="invalid_key")r({issues:a.issues});else if(a.code==="invalid_element")r({issues:a.issues});else if(a.path.length===0)n._errors.push(t(a));else{let o=n,s=0;for(;s<a.path.length;){const l=a.path[s];s===a.path.length-1?(o[l]=o[l]||{_errors:[]},o[l]._errors.push(t(a))):o[l]=o[l]||{_errors:[]},o=o[l],s++}}};return r(e),n}const g0=e=>(t,n,r,i)=>{const a=r?Object.assign(r,{async:!1}):{async:!1},o=t._zod.run({value:n,issues:[]},a);if(o instanceof Promise)throw new Us;if(o.issues.length){const s=new((i==null?void 0:i.Err)??e)(o.issues.map(l=>Va(l,a,Ka())));throw y_(s,i==null?void 0:i.callee),s}return o.value},v0=e=>async(t,n,r,i)=>{const a=r?Object.assign(r,{async:!0}):{async:!0};let o=t._zod.run({value:n,issues:[]},a);if(o instanceof Promise&&(o=await o),o.issues.length){const s=new((i==null?void 0:i.Err)??e)(o.issues.map(l=>Va(l,a,Ka())));throw y_(s,i==null?void 0:i.callee),s}return o.value},bh=e=>(t,n,r)=>{const i=r?{...r,async:!1}:{async:!1},a=t._zod.run({value:n,issues:[]},i);if(a instanceof Promise)throw new Us;return a.issues.length?{success:!1,error:new(e??w_)(a.issues.map(o=>Va(o,i,Ka())))}:{success:!0,data:a.value}},yF=bh(j_),wh=e=>async(t,n,r)=>{const i=r?Object.assign(r,{async:!0}):{async:!0};let a=t._zod.run({value:n,issues:[]},i);return a instanceof Promise&&(a=await a),a.issues.length?{success:!1,error:new e(a.issues.map(o=>Va(o,i,Ka())))}:{success:!0,data:a.value}},xF=wh(j_),bF=e=>(t,n,r)=>{const i=r?Object.assign(r,{direction:"backward"}):{direction:"backward"};return g0(e)(t,n,i)},wF=e=>(t,n,r)=>g0(e)(t,n,r),jF=e=>async(t,n,r)=>{const i=r?Object.assign(r,{direction:"backward"}):{direction:"backward"};return v0(e)(t,n,i)},SF=e=>async(t,n,r)=>v0(e)(t,n,r),kF=e=>(t,n,r)=>{const i=r?Object.assign(r,{direction:"backward"}):{direction:"backward"};return bh(e)(t,n,i)},PF=e=>(t,n,r)=>bh(e)(t,n,r),CF=e=>async(t,n,r)=>{const i=r?Object.assign(r,{direction:"backward"}):{direction:"backward"};return wh(e)(t,n,i)},OF=e=>async(t,n,r)=>wh(e)(t,n,r),EF=/^[cC][^\s-]{8,}$/,NF=/^[0-9a-z]+$/,_F=/^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,AF=/^[0-9a-vA-V]{20}$/,TF=/^[A-Za-z0-9]{27}$/,RF=/^[a-zA-Z0-9_-]{21}$/,MF=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,DF=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Rj=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,zF=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,IF="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";function $F(){return new RegExp(IF,"u")}const LF=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,FF=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,UF=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,BF=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,WF=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,S_=/^[A-Za-z0-9_-]*$/,HF=/^\+[1-9]\d{6,14}$/,k_="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",KF=new RegExp(`^${k_}$`);function P_(e){const t="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${t}`:e.precision===0?`${t}:[0-5]\\d`:`${t}:[0-5]\\d\\.\\d{${e.precision}}`:`${t}(?::[0-5]\\d(?:\\.\\d+)?)?`}function VF(e){return new RegExp(`^${P_(e)}$`)}function ZF(e){const t=P_({precision:e.precision}),n=["Z"];e.local&&n.push(""),e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");const r=`${t}(?:${n.join("|")})`;return new RegExp(`^${k_}T(?:${r})$`)}const qF=e=>{const t=e?`[\\s\\S]{${(e==null?void 0:e.minimum)??0},${(e==null?void 0:e.maximum)??""}}`:"[\\s\\S]*";return new RegExp(`^${t}$`)},YF=/^-?\d+$/,C_=/^-?\d+(?:\.\d+)?$/,GF=/^(?:true|false)$/i,QF=/^undefined$/i,XF=/^[^A-Z]*$/,JF=/^[^a-z]*$/,Un=F("$ZodCheck",(e,t)=>{var n;e._zod??(e._zod={}),e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])}),O_={number:"number",bigint:"bigint",object:"date"},E_=F("$ZodCheckLessThan",(e,t)=>{Un.init(e,t);const n=O_[typeof t.value];e._zod.onattach.push(r=>{const i=r._zod.bag,a=(t.inclusive?i.maximum:i.exclusiveMaximum)??Number.POSITIVE_INFINITY;t.value<a&&(t.inclusive?i.maximum=t.value:i.exclusiveMaximum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value<=t.value:r.value<t.value)||r.issues.push({origin:n,code:"too_big",maximum:typeof t.value=="object"?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),N_=F("$ZodCheckGreaterThan",(e,t)=>{Un.init(e,t);const n=O_[typeof t.value];e._zod.onattach.push(r=>{const i=r._zod.bag,a=(t.inclusive?i.minimum:i.exclusiveMinimum)??Number.NEGATIVE_INFINITY;t.value>a&&(t.inclusive?i.minimum=t.value:i.exclusiveMinimum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value>=t.value:r.value>t.value)||r.issues.push({origin:n,code:"too_small",minimum:typeof t.value=="object"?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),e8=F("$ZodCheckMultipleOf",(e,t)=>{Un.init(e,t),e._zod.onattach.push(n=>{var r;(r=n._zod.bag).multipleOf??(r.multipleOf=t.value)}),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof n.value=="bigint"?n.value%t.value===BigInt(0):rF(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:"not_multiple_of",divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),t8=F("$ZodCheckNumberFormat",(e,t)=>{var o;Un.init(e,t),t.format=t.format||"float64";const n=(o=t.format)==null?void 0:o.includes("int"),r=n?"int":"number",[i,a]=lF[t.format];e._zod.onattach.push(s=>{const l=s._zod.bag;l.format=t.format,l.minimum=i,l.maximum=a,n&&(l.pattern=YF)}),e._zod.check=s=>{const l=s.value;if(n){if(!Number.isInteger(l)){s.issues.push({expected:r,format:t.format,code:"invalid_type",continue:!1,input:l,inst:e});return}if(!Number.isSafeInteger(l)){l>0?s.issues.push({input:l,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!t.abort}):s.issues.push({input:l,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!t.abort});return}}l<i&&s.issues.push({origin:"number",input:l,code:"too_small",minimum:i,inclusive:!0,inst:e,continue:!t.abort}),l>a&&s.issues.push({origin:"number",input:l,code:"too_big",maximum:a,inclusive:!0,inst:e,continue:!t.abort})}}),n8=F("$ZodCheckMaxLength",(e,t)=>{var n;Un.init(e,t),(n=e._zod.def).when??(n.when=r=>{const i=r.value;return!p0(i)&&i.length!==void 0}),e._zod.onattach.push(r=>{const i=r._zod.bag.maximum??Number.POSITIVE_INFINITY;t.maximum<i&&(r._zod.bag.maximum=t.maximum)}),e._zod.check=r=>{const i=r.value;if(i.length<=t.maximum)return;const o=m0(i);r.issues.push({origin:o,code:"too_big",maximum:t.maximum,inclusive:!0,input:i,inst:e,continue:!t.abort})}}),r8=F("$ZodCheckMinLength",(e,t)=>{var n;Un.init(e,t),(n=e._zod.def).when??(n.when=r=>{const i=r.value;return!p0(i)&&i.length!==void 0}),e._zod.onattach.push(r=>{const i=r._zod.bag.minimum??Number.NEGATIVE_INFINITY;t.minimum>i&&(r._zod.bag.minimum=t.minimum)}),e._zod.check=r=>{const i=r.value;if(i.length>=t.minimum)return;const o=m0(i);r.issues.push({origin:o,code:"too_small",minimum:t.minimum,inclusive:!0,input:i,inst:e,continue:!t.abort})}}),i8=F("$ZodCheckLengthEquals",(e,t)=>{var n;Un.init(e,t),(n=e._zod.def).when??(n.when=r=>{const i=r.value;return!p0(i)&&i.length!==void 0}),e._zod.onattach.push(r=>{const i=r._zod.bag;i.minimum=t.length,i.maximum=t.length,i.length=t.length}),e._zod.check=r=>{const i=r.value,a=i.length;if(a===t.length)return;const o=m0(i),s=a>t.length;r.issues.push({origin:o,...s?{code:"too_big",maximum:t.length}:{code:"too_small",minimum:t.length},inclusive:!0,exact:!0,input:r.value,inst:e,continue:!t.abort})}}),jh=F("$ZodCheckStringFormat",(e,t)=>{var n,r;Un.init(e,t),e._zod.onattach.push(i=>{const a=i._zod.bag;a.format=t.format,t.pattern&&(a.patterns??(a.patterns=new Set),a.patterns.add(t.pattern))}),t.pattern?(n=e._zod).check??(n.check=i=>{t.pattern.lastIndex=0,!t.pattern.test(i.value)&&i.issues.push({origin:"string",code:"invalid_format",format:t.format,input:i.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})}):(r=e._zod).check??(r.check=()=>{})}),a8=F("$ZodCheckRegex",(e,t)=>{jh.init(e,t),e._zod.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:"string",code:"invalid_format",format:"regex",input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),o8=F("$ZodCheckLowerCase",(e,t)=>{t.pattern??(t.pattern=XF),jh.init(e,t)}),s8=F("$ZodCheckUpperCase",(e,t)=>{t.pattern??(t.pattern=JF),jh.init(e,t)}),l8=F("$ZodCheckIncludes",(e,t)=>{Un.init(e,t);const n=xh(t.includes),r=new RegExp(typeof t.position=="number"?`^.{${t.position}}${n}`:n);t.pattern=r,e._zod.onattach.push(i=>{const a=i._zod.bag;a.patterns??(a.patterns=new Set),a.patterns.add(r)}),e._zod.check=i=>{i.value.includes(t.includes,t.position)||i.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:t.includes,input:i.value,inst:e,continue:!t.abort})}}),c8=F("$ZodCheckStartsWith",(e,t)=>{Un.init(e,t);const n=new RegExp(`^${xh(t.prefix)}.*`);t.pattern??(t.pattern=n),e._zod.onattach.push(r=>{const i=r._zod.bag;i.patterns??(i.patterns=new Set),i.patterns.add(n)}),e._zod.check=r=>{r.value.startsWith(t.prefix)||r.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:t.prefix,input:r.value,inst:e,continue:!t.abort})}}),u8=F("$ZodCheckEndsWith",(e,t)=>{Un.init(e,t);const n=new RegExp(`.*${xh(t.suffix)}$`);t.pattern??(t.pattern=n),e._zod.onattach.push(r=>{const i=r._zod.bag;i.patterns??(i.patterns=new Set),i.patterns.add(n)}),e._zod.check=r=>{r.value.endsWith(t.suffix)||r.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:t.suffix,input:r.value,inst:e,continue:!t.abort})}}),d8=F("$ZodCheckOverwrite",(e,t)=>{Un.init(e,t),e._zod.check=n=>{n.value=t.tx(n.value)}});class f8{constructor(t=[]){this.content=[],this.indent=0,this&&(this.args=t)}indented(t){this.indent+=1,t(this),this.indent-=1}write(t){if(typeof t=="function"){t(this,{execution:"sync"}),t(this,{execution:"async"});return}const r=t.split(`
`).filter(o=>o),i=Math.min(...r.map(o=>o.length-o.trimStart().length)),a=r.map(o=>o.slice(i)).map(o=>" ".repeat(this.indent*2)+o);for(const o of a)this.content.push(o)}compile(){const t=Function,n=this==null?void 0:this.args,i=[...((this==null?void 0:this.content)??[""]).map(a=>`  ${a}`)];return new t(...n,i.join(`
`))}}const p8={major:4,minor:3,patch:6},rt=F("$ZodType",(e,t)=>{var i;var n;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=p8;const r=[...e._zod.def.checks??[]];e._zod.traits.has("$ZodCheck")&&r.unshift(e);for(const a of r)for(const o of a._zod.onattach)o(e);if(r.length===0)(n=e._zod).deferred??(n.deferred=[]),(i=e._zod.deferred)==null||i.push(()=>{e._zod.run=e._zod.parse});else{const a=(s,l,c)=>{let d=_s(s),f;for(const p of l){if(p._zod.def.when){if(!p._zod.def.when(s))continue}else if(d)continue;const h=s.issues.length,m=p._zod.check(s);if(m instanceof Promise&&(c==null?void 0:c.async)===!1)throw new Us;if(f||m instanceof Promise)f=(f??Promise.resolve()).then(async()=>{await m,s.issues.length!==h&&(d||(d=_s(s,h)))});else{if(s.issues.length===h)continue;d||(d=_s(s,h))}}return f?f.then(()=>s):s},o=(s,l,c)=>{if(_s(s))return s.aborted=!0,s;const d=a(l,r,c);if(d instanceof Promise){if(c.async===!1)throw new Us;return d.then(f=>e._zod.parse(f,c))}return e._zod.parse(d,c)};e._zod.run=(s,l)=>{if(l.skipChecks)return e._zod.parse(s,l);if(l.direction==="backward"){const d=e._zod.parse({value:s.value,issues:[]},{...l,skipChecks:!0});return d instanceof Promise?d.then(f=>o(f,s,l)):o(d,s,l)}const c=e._zod.parse(s,l);if(c instanceof Promise){if(l.async===!1)throw new Us;return c.then(d=>a(d,r,l))}return a(c,r,l)}}Ue(e,"~standard",()=>({validate:a=>{var o;try{const s=yF(e,a);return s.success?{value:s.data}:{issues:(o=s.error)==null?void 0:o.issues}}catch{return xF(e,a).then(l=>{var c;return l.success?{value:l.data}:{issues:(c=l.error)==null?void 0:c.issues}})}},vendor:"zod",version:1}))}),y0=F("$ZodString",(e,t)=>{var n;rt.init(e,t),e._zod.pattern=[...((n=e==null?void 0:e._zod.bag)==null?void 0:n.patterns)??[]].pop()??qF(e._zod.bag),e._zod.parse=(r,i)=>{if(t.coerce)try{r.value=String(r.value)}catch{}return typeof r.value=="string"||r.issues.push({expected:"string",code:"invalid_type",input:r.value,inst:e}),r}}),it=F("$ZodStringFormat",(e,t)=>{jh.init(e,t),y0.init(e,t)}),h8=F("$ZodGUID",(e,t)=>{t.pattern??(t.pattern=DF),it.init(e,t)}),m8=F("$ZodUUID",(e,t)=>{if(t.version){const r={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(r===void 0)throw new Error(`Invalid UUID version: "${t.version}"`);t.pattern??(t.pattern=Rj(r))}else t.pattern??(t.pattern=Rj());it.init(e,t)}),g8=F("$ZodEmail",(e,t)=>{t.pattern??(t.pattern=zF),it.init(e,t)}),v8=F("$ZodURL",(e,t)=>{it.init(e,t),e._zod.check=n=>{try{const r=n.value.trim(),i=new URL(r);t.hostname&&(t.hostname.lastIndex=0,t.hostname.test(i.hostname)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:t.hostname.source,input:n.value,inst:e,continue:!t.abort})),t.protocol&&(t.protocol.lastIndex=0,t.protocol.test(i.protocol.endsWith(":")?i.protocol.slice(0,-1):i.protocol)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort})),t.normalize?n.value=i.href:n.value=r;return}catch{n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort})}}}),y8=F("$ZodEmoji",(e,t)=>{t.pattern??(t.pattern=$F()),it.init(e,t)}),x8=F("$ZodNanoID",(e,t)=>{t.pattern??(t.pattern=RF),it.init(e,t)}),b8=F("$ZodCUID",(e,t)=>{t.pattern??(t.pattern=EF),it.init(e,t)}),w8=F("$ZodCUID2",(e,t)=>{t.pattern??(t.pattern=NF),it.init(e,t)}),j8=F("$ZodULID",(e,t)=>{t.pattern??(t.pattern=_F),it.init(e,t)}),S8=F("$ZodXID",(e,t)=>{t.pattern??(t.pattern=AF),it.init(e,t)}),k8=F("$ZodKSUID",(e,t)=>{t.pattern??(t.pattern=TF),it.init(e,t)}),P8=F("$ZodISODateTime",(e,t)=>{t.pattern??(t.pattern=ZF(t)),it.init(e,t)}),C8=F("$ZodISODate",(e,t)=>{t.pattern??(t.pattern=KF),it.init(e,t)}),O8=F("$ZodISOTime",(e,t)=>{t.pattern??(t.pattern=VF(t)),it.init(e,t)}),E8=F("$ZodISODuration",(e,t)=>{t.pattern??(t.pattern=MF),it.init(e,t)}),N8=F("$ZodIPv4",(e,t)=>{t.pattern??(t.pattern=LF),it.init(e,t),e._zod.bag.format="ipv4"}),_8=F("$ZodIPv6",(e,t)=>{t.pattern??(t.pattern=FF),it.init(e,t),e._zod.bag.format="ipv6",e._zod.check=n=>{try{new URL(`http://[${n.value}]`)}catch{n.issues.push({code:"invalid_format",format:"ipv6",input:n.value,inst:e,continue:!t.abort})}}}),A8=F("$ZodCIDRv4",(e,t)=>{t.pattern??(t.pattern=UF),it.init(e,t)}),T8=F("$ZodCIDRv6",(e,t)=>{t.pattern??(t.pattern=BF),it.init(e,t),e._zod.check=n=>{const r=n.value.split("/");try{if(r.length!==2)throw new Error;const[i,a]=r;if(!a)throw new Error;const o=Number(a);if(`${o}`!==a)throw new Error;if(o<0||o>128)throw new Error;new URL(`http://[${i}]`)}catch{n.issues.push({code:"invalid_format",format:"cidrv6",input:n.value,inst:e,continue:!t.abort})}}});function __(e){if(e==="")return!0;if(e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}const R8=F("$ZodBase64",(e,t)=>{t.pattern??(t.pattern=WF),it.init(e,t),e._zod.bag.contentEncoding="base64",e._zod.check=n=>{__(n.value)||n.issues.push({code:"invalid_format",format:"base64",input:n.value,inst:e,continue:!t.abort})}});function M8(e){if(!S_.test(e))return!1;const t=e.replace(/[-_]/g,r=>r==="-"?"+":"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return __(n)}const D8=F("$ZodBase64URL",(e,t)=>{t.pattern??(t.pattern=S_),it.init(e,t),e._zod.bag.contentEncoding="base64url",e._zod.check=n=>{M8(n.value)||n.issues.push({code:"invalid_format",format:"base64url",input:n.value,inst:e,continue:!t.abort})}}),z8=F("$ZodE164",(e,t)=>{t.pattern??(t.pattern=HF),it.init(e,t)});function I8(e,t=null){try{const n=e.split(".");if(n.length!==3)return!1;const[r]=n;if(!r)return!1;const i=JSON.parse(atob(r));return!("typ"in i&&(i==null?void 0:i.typ)!=="JWT"||!i.alg||t&&(!("alg"in i)||i.alg!==t))}catch{return!1}}const $8=F("$ZodJWT",(e,t)=>{it.init(e,t),e._zod.check=n=>{I8(n.value,t.alg)||n.issues.push({code:"invalid_format",format:"jwt",input:n.value,inst:e,continue:!t.abort})}}),A_=F("$ZodNumber",(e,t)=>{rt.init(e,t),e._zod.pattern=e._zod.bag.pattern??C_,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}const i=n.value;if(typeof i=="number"&&!Number.isNaN(i)&&Number.isFinite(i))return n;const a=typeof i=="number"?Number.isNaN(i)?"NaN":Number.isFinite(i)?void 0:"Infinity":void 0;return n.issues.push({expected:"number",code:"invalid_type",input:i,inst:e,...a?{received:a}:{}}),n}}),L8=F("$ZodNumberFormat",(e,t)=>{t8.init(e,t),A_.init(e,t)}),F8=F("$ZodBoolean",(e,t)=>{rt.init(e,t),e._zod.pattern=GF,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=!!n.value}catch{}const i=n.value;return typeof i=="boolean"||n.issues.push({expected:"boolean",code:"invalid_type",input:i,inst:e}),n}}),U8=F("$ZodUndefined",(e,t)=>{rt.init(e,t),e._zod.pattern=QF,e._zod.values=new Set([void 0]),e._zod.optin="optional",e._zod.optout="optional",e._zod.parse=(n,r)=>{const i=n.value;return typeof i>"u"||n.issues.push({expected:"undefined",code:"invalid_type",input:i,inst:e}),n}}),B8=F("$ZodAny",(e,t)=>{rt.init(e,t),e._zod.parse=n=>n}),W8=F("$ZodUnknown",(e,t)=>{rt.init(e,t),e._zod.parse=n=>n}),H8=F("$ZodNever",(e,t)=>{rt.init(e,t),e._zod.parse=(n,r)=>(n.issues.push({expected:"never",code:"invalid_type",input:n.value,inst:e}),n)});function Mj(e,t,n){e.issues.length&&t.issues.push(...As(n,e.issues)),t.value[n]=e.value}const K8=F("$ZodArray",(e,t)=>{rt.init(e,t),e._zod.parse=(n,r)=>{const i=n.value;if(!Array.isArray(i))return n.issues.push({expected:"array",code:"invalid_type",input:i,inst:e}),n;n.value=Array(i.length);const a=[];for(let o=0;o<i.length;o++){const s=i[o],l=t.element._zod.run({value:s,issues:[]},r);l instanceof Promise?a.push(l.then(c=>Mj(c,n,o))):Mj(l,n,o)}return a.length?Promise.all(a).then(()=>n):n}});function qf(e,t,n,r,i){if(e.issues.length){if(i&&!(n in r))return;t.issues.push(...As(n,e.issues))}e.value===void 0?n in r&&(t.value[n]=void 0):t.value[n]=e.value}function T_(e){var r,i,a,o;const t=Object.keys(e.shape);for(const s of t)if(!((o=(a=(i=(r=e.shape)==null?void 0:r[s])==null?void 0:i._zod)==null?void 0:a.traits)!=null&&o.has("$ZodType")))throw new Error(`Invalid element at key "${s}": expected a Zod schema`);const n=sF(e.shape);return{...e,keys:t,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(n)}}function R_(e,t,n,r,i,a){const o=[],s=i.keySet,l=i.catchall._zod,c=l.def.type,d=l.optout==="optional";for(const f in t){if(s.has(f))continue;if(c==="never"){o.push(f);continue}const p=l.run({value:t[f],issues:[]},r);p instanceof Promise?e.push(p.then(h=>qf(h,n,f,t,d))):qf(p,n,f,t,d)}return o.length&&n.issues.push({code:"unrecognized_keys",keys:o,input:t,inst:a}),e.length?Promise.all(e).then(()=>n):n}const V8=F("$ZodObject",(e,t)=>{rt.init(e,t);const n=Object.getOwnPropertyDescriptor(t,"shape");if(!(n!=null&&n.get)){const s=t.shape;Object.defineProperty(t,"shape",{get:()=>{const l={...s};return Object.defineProperty(t,"shape",{value:l}),l}})}const r=f0(()=>T_(t));Ue(e._zod,"propValues",()=>{const s=t.shape,l={};for(const c in s){const d=s[c]._zod;if(d.values){l[c]??(l[c]=new Set);for(const f of d.values)l[c].add(f)}}return l});const i=Zf,a=t.catchall;let o;e._zod.parse=(s,l)=>{o??(o=r.value);const c=s.value;if(!i(c))return s.issues.push({expected:"object",code:"invalid_type",input:c,inst:e}),s;s.value={};const d=[],f=o.shape;for(const p of o.keys){const h=f[p],m=h._zod.optout==="optional",y=h._zod.run({value:c[p],issues:[]},l);y instanceof Promise?d.push(y.then(g=>qf(g,s,p,c,m))):qf(y,s,p,c,m)}return a?R_(d,c,s,l,r.value,e):d.length?Promise.all(d).then(()=>s):s}}),Z8=F("$ZodObjectJIT",(e,t)=>{V8.init(e,t);const n=e._zod.parse,r=f0(()=>T_(t)),i=p=>{var w;const h=new f8(["shape","payload","ctx"]),m=r.value,y=j=>{const k=Tj(j);return`shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`};h.write("const input = payload.value;");const g=Object.create(null);let x=0;for(const j of m.keys)g[j]=`key_${x++}`;h.write("const newResult = {};");for(const j of m.keys){const k=g[j],P=Tj(j),S=p[j],C=((w=S==null?void 0:S._zod)==null?void 0:w.optout)==="optional";h.write(`const ${k} = ${y(j)};`),C?h.write(`
        if (${k}.issues.length) {
          if (${P} in input) {
            payload.issues = payload.issues.concat(${k}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${P}, ...iss.path] : [${P}]
            })));
          }
        }
        
        if (${k}.value === undefined) {
          if (${P} in input) {
            newResult[${P}] = undefined;
          }
        } else {
          newResult[${P}] = ${k}.value;
        }
        
      `):h.write(`
        if (${k}.issues.length) {
          payload.issues = payload.issues.concat(${k}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${P}, ...iss.path] : [${P}]
          })));
        }
        
        if (${k}.value === undefined) {
          if (${P} in input) {
            newResult[${P}] = undefined;
          }
        } else {
          newResult[${P}] = ${k}.value;
        }
        
      `)}h.write("payload.value = newResult;"),h.write("return payload;");const b=h.compile();return(j,k)=>b(p,j,k)};let a;const o=Zf,s=!g_.jitless,c=s&&aF.value,d=t.catchall;let f;e._zod.parse=(p,h)=>{f??(f=r.value);const m=p.value;return o(m)?s&&c&&(h==null?void 0:h.async)===!1&&h.jitless!==!0?(a||(a=i(t.shape)),p=a(p,h),d?R_([],m,p,h,f,e):p):n(p,h):(p.issues.push({expected:"object",code:"invalid_type",input:m,inst:e}),p)}});function Dj(e,t,n,r){for(const a of e)if(a.issues.length===0)return t.value=a.value,t;const i=e.filter(a=>!_s(a));return i.length===1?(t.value=i[0].value,i[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:n,errors:e.map(a=>a.issues.map(o=>Va(o,r,Ka())))}),t)}const q8=F("$ZodUnion",(e,t)=>{rt.init(e,t),Ue(e._zod,"optin",()=>t.options.some(i=>i._zod.optin==="optional")?"optional":void 0),Ue(e._zod,"optout",()=>t.options.some(i=>i._zod.optout==="optional")?"optional":void 0),Ue(e._zod,"values",()=>{if(t.options.every(i=>i._zod.values))return new Set(t.options.flatMap(i=>Array.from(i._zod.values)))}),Ue(e._zod,"pattern",()=>{if(t.options.every(i=>i._zod.pattern)){const i=t.options.map(a=>a._zod.pattern);return new RegExp(`^(${i.map(a=>h0(a.source)).join("|")})$`)}});const n=t.options.length===1,r=t.options[0]._zod.run;e._zod.parse=(i,a)=>{if(n)return r(i,a);let o=!1;const s=[];for(const l of t.options){const c=l._zod.run({value:i.value,issues:[]},a);if(c instanceof Promise)s.push(c),o=!0;else{if(c.issues.length===0)return c;s.push(c)}}return o?Promise.all(s).then(l=>Dj(l,i,e,a)):Dj(s,i,e,a)}}),Y8=F("$ZodIntersection",(e,t)=>{rt.init(e,t),e._zod.parse=(n,r)=>{const i=n.value,a=t.left._zod.run({value:i,issues:[]},r),o=t.right._zod.run({value:i,issues:[]},r);return a instanceof Promise||o instanceof Promise?Promise.all([a,o]).then(([l,c])=>zj(n,l,c)):zj(n,a,o)}});function Gv(e,t){if(e===t)return{valid:!0,data:e};if(e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(ul(e)&&ul(t)){const n=Object.keys(t),r=Object.keys(e).filter(a=>n.indexOf(a)!==-1),i={...e,...t};for(const a of r){const o=Gv(e[a],t[a]);if(!o.valid)return{valid:!1,mergeErrorPath:[a,...o.mergeErrorPath]};i[a]=o.data}return{valid:!0,data:i}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};const n=[];for(let r=0;r<e.length;r++){const i=e[r],a=t[r],o=Gv(i,a);if(!o.valid)return{valid:!1,mergeErrorPath:[r,...o.mergeErrorPath]};n.push(o.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function zj(e,t,n){const r=new Map;let i;for(const s of t.issues)if(s.code==="unrecognized_keys"){i??(i=s);for(const l of s.keys)r.has(l)||r.set(l,{}),r.get(l).l=!0}else e.issues.push(s);for(const s of n.issues)if(s.code==="unrecognized_keys")for(const l of s.keys)r.has(l)||r.set(l,{}),r.get(l).r=!0;else e.issues.push(s);const a=[...r].filter(([,s])=>s.l&&s.r).map(([s])=>s);if(a.length&&i&&e.issues.push({...i,keys:a}),_s(e))return e;const o=Gv(t.value,n.value);if(!o.valid)throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);return e.value=o.data,e}const G8=F("$ZodRecord",(e,t)=>{rt.init(e,t),e._zod.parse=(n,r)=>{const i=n.value;if(!ul(i))return n.issues.push({expected:"record",code:"invalid_type",input:i,inst:e}),n;const a=[],o=t.keyType._zod.values;if(o){n.value={};const s=new Set;for(const c of o)if(typeof c=="string"||typeof c=="number"||typeof c=="symbol"){s.add(typeof c=="number"?c.toString():c);const d=t.valueType._zod.run({value:i[c],issues:[]},r);d instanceof Promise?a.push(d.then(f=>{f.issues.length&&n.issues.push(...As(c,f.issues)),n.value[c]=f.value})):(d.issues.length&&n.issues.push(...As(c,d.issues)),n.value[c]=d.value)}let l;for(const c in i)s.has(c)||(l=l??[],l.push(c));l&&l.length>0&&n.issues.push({code:"unrecognized_keys",input:i,inst:e,keys:l})}else{n.value={};for(const s of Reflect.ownKeys(i)){if(s==="__proto__")continue;let l=t.keyType._zod.run({value:s,issues:[]},r);if(l instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof s=="string"&&C_.test(s)&&l.issues.length){const f=t.keyType._zod.run({value:Number(s),issues:[]},r);if(f instanceof Promise)throw new Error("Async schemas not supported in object keys currently");f.issues.length===0&&(l=f)}if(l.issues.length){t.mode==="loose"?n.value[s]=i[s]:n.issues.push({code:"invalid_key",origin:"record",issues:l.issues.map(f=>Va(f,r,Ka())),input:s,path:[s],inst:e});continue}const d=t.valueType._zod.run({value:i[s],issues:[]},r);d instanceof Promise?a.push(d.then(f=>{f.issues.length&&n.issues.push(...As(s,f.issues)),n.value[l.value]=f.value})):(d.issues.length&&n.issues.push(...As(s,d.issues)),n.value[l.value]=d.value)}}return a.length?Promise.all(a).then(()=>n):n}}),Q8=F("$ZodEnum",(e,t)=>{rt.init(e,t);const n=v_(t.entries),r=new Set(n);e._zod.values=r,e._zod.pattern=new RegExp(`^(${n.filter(i=>oF.has(typeof i)).map(i=>typeof i=="string"?xh(i):i.toString()).join("|")})$`),e._zod.parse=(i,a)=>{const o=i.value;return r.has(o)||i.issues.push({code:"invalid_value",values:n,input:o,inst:e}),i}}),X8=F("$ZodTransform",(e,t)=>{rt.init(e,t),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new m_(e.constructor.name);const i=t.transform(n.value,n);if(r.async)return(i instanceof Promise?i:Promise.resolve(i)).then(o=>(n.value=o,n));if(i instanceof Promise)throw new Us;return n.value=i,n}});function Ij(e,t){return e.issues.length&&t===void 0?{issues:[],value:void 0}:e}const M_=F("$ZodOptional",(e,t)=>{rt.init(e,t),e._zod.optin="optional",e._zod.optout="optional",Ue(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),Ue(e._zod,"pattern",()=>{const n=t.innerType._zod.pattern;return n?new RegExp(`^(${h0(n.source)})?$`):void 0}),e._zod.parse=(n,r)=>{if(t.innerType._zod.optin==="optional"){const i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(a=>Ij(a,n.value)):Ij(i,n.value)}return n.value===void 0?n:t.innerType._zod.run(n,r)}}),J8=F("$ZodExactOptional",(e,t)=>{M_.init(e,t),Ue(e._zod,"values",()=>t.innerType._zod.values),Ue(e._zod,"pattern",()=>t.innerType._zod.pattern),e._zod.parse=(n,r)=>t.innerType._zod.run(n,r)}),eU=F("$ZodNullable",(e,t)=>{rt.init(e,t),Ue(e._zod,"optin",()=>t.innerType._zod.optin),Ue(e._zod,"optout",()=>t.innerType._zod.optout),Ue(e._zod,"pattern",()=>{const n=t.innerType._zod.pattern;return n?new RegExp(`^(${h0(n.source)}|null)$`):void 0}),Ue(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,null]):void 0),e._zod.parse=(n,r)=>n.value===null?n:t.innerType._zod.run(n,r)}),tU=F("$ZodDefault",(e,t)=>{rt.init(e,t),e._zod.optin="optional",Ue(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);if(n.value===void 0)return n.value=t.defaultValue,n;const i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(a=>$j(a,t)):$j(i,t)}});function $j(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}const nU=F("$ZodPrefault",(e,t)=>{rt.init(e,t),e._zod.optin="optional",Ue(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,r)=>(r.direction==="backward"||n.value===void 0&&(n.value=t.defaultValue),t.innerType._zod.run(n,r))}),rU=F("$ZodNonOptional",(e,t)=>{rt.init(e,t),Ue(e._zod,"values",()=>{const n=t.innerType._zod.values;return n?new Set([...n].filter(r=>r!==void 0)):void 0}),e._zod.parse=(n,r)=>{const i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(a=>Lj(a,e)):Lj(i,e)}});function Lj(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:t}),e}const iU=F("$ZodCatch",(e,t)=>{rt.init(e,t),Ue(e._zod,"optin",()=>t.innerType._zod.optin),Ue(e._zod,"optout",()=>t.innerType._zod.optout),Ue(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);const i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(a=>(n.value=a.value,a.issues.length&&(n.value=t.catchValue({...n,error:{issues:a.issues.map(o=>Va(o,r,Ka()))},input:n.value}),n.issues=[]),n)):(n.value=i.value,i.issues.length&&(n.value=t.catchValue({...n,error:{issues:i.issues.map(a=>Va(a,r,Ka()))},input:n.value}),n.issues=[]),n)}}),aU=F("$ZodPipe",(e,t)=>{rt.init(e,t),Ue(e._zod,"values",()=>t.in._zod.values),Ue(e._zod,"optin",()=>t.in._zod.optin),Ue(e._zod,"optout",()=>t.out._zod.optout),Ue(e._zod,"propValues",()=>t.in._zod.propValues),e._zod.parse=(n,r)=>{if(r.direction==="backward"){const a=t.out._zod.run(n,r);return a instanceof Promise?a.then(o=>Ed(o,t.in,r)):Ed(a,t.in,r)}const i=t.in._zod.run(n,r);return i instanceof Promise?i.then(a=>Ed(a,t.out,r)):Ed(i,t.out,r)}});function Ed(e,t,n){return e.issues.length?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues},n)}const oU=F("$ZodReadonly",(e,t)=>{rt.init(e,t),Ue(e._zod,"propValues",()=>t.innerType._zod.propValues),Ue(e._zod,"values",()=>t.innerType._zod.values),Ue(e._zod,"optin",()=>{var n,r;return(r=(n=t.innerType)==null?void 0:n._zod)==null?void 0:r.optin}),Ue(e._zod,"optout",()=>{var n,r;return(r=(n=t.innerType)==null?void 0:n._zod)==null?void 0:r.optout}),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);const i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(Fj):Fj(i)}});function Fj(e){return e.value=Object.freeze(e.value),e}const sU=F("$ZodCustom",(e,t)=>{Un.init(e,t),rt.init(e,t),e._zod.parse=(n,r)=>n,e._zod.check=n=>{const r=n.value,i=t.fn(r);if(i instanceof Promise)return i.then(a=>Uj(a,n,r,e));Uj(i,n,r,e)}});function Uj(e,t,n,r){if(!e){const i={code:"custom",input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};r._zod.def.params&&(i.params=r._zod.def.params),t.issues.push(Yc(i))}}var Bj;class lU{constructor(){this._map=new WeakMap,this._idmap=new Map}add(t,...n){const r=n[0];return this._map.set(t,r),r&&typeof r=="object"&&"id"in r&&this._idmap.set(r.id,t),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(t){const n=this._map.get(t);return n&&typeof n=="object"&&"id"in n&&this._idmap.delete(n.id),this._map.delete(t),this}get(t){const n=t._zod.parent;if(n){const r={...this.get(n)??{}};delete r.id;const i={...r,...this._map.get(t)};return Object.keys(i).length?i:void 0}return this._map.get(t)}has(t){return this._map.has(t)}}function cU(){return new lU}(Bj=globalThis).__zod_globalRegistry??(Bj.__zod_globalRegistry=cU());const pc=globalThis.__zod_globalRegistry;function uU(e,t){return new e({type:"string",...he(t)})}function dU(e,t){return new e({type:"string",format:"email",check:"string_format",abort:!1,...he(t)})}function Wj(e,t){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...he(t)})}function fU(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...he(t)})}function pU(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...he(t)})}function hU(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...he(t)})}function mU(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...he(t)})}function gU(e,t){return new e({type:"string",format:"url",check:"string_format",abort:!1,...he(t)})}function vU(e,t){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...he(t)})}function yU(e,t){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...he(t)})}function xU(e,t){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...he(t)})}function bU(e,t){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...he(t)})}function wU(e,t){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...he(t)})}function jU(e,t){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...he(t)})}function SU(e,t){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...he(t)})}function kU(e,t){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...he(t)})}function PU(e,t){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...he(t)})}function CU(e,t){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...he(t)})}function OU(e,t){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...he(t)})}function EU(e,t){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...he(t)})}function NU(e,t){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...he(t)})}function _U(e,t){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...he(t)})}function AU(e,t){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...he(t)})}function TU(e,t){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...he(t)})}function RU(e,t){return new e({type:"string",format:"date",check:"string_format",...he(t)})}function MU(e,t){return new e({type:"string",format:"time",check:"string_format",precision:null,...he(t)})}function DU(e,t){return new e({type:"string",format:"duration",check:"string_format",...he(t)})}function zU(e,t){return new e({type:"number",checks:[],...he(t)})}function IU(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...he(t)})}function $U(e,t){return new e({type:"boolean",...he(t)})}function LU(e,t){return new e({type:"undefined",...he(t)})}function FU(e){return new e({type:"any"})}function UU(e){return new e({type:"unknown"})}function BU(e,t){return new e({type:"never",...he(t)})}function Hj(e,t){return new E_({check:"less_than",...he(t),value:e,inclusive:!1})}function ag(e,t){return new E_({check:"less_than",...he(t),value:e,inclusive:!0})}function Kj(e,t){return new N_({check:"greater_than",...he(t),value:e,inclusive:!1})}function og(e,t){return new N_({check:"greater_than",...he(t),value:e,inclusive:!0})}function Vj(e,t){return new e8({check:"multiple_of",...he(t),value:e})}function D_(e,t){return new n8({check:"max_length",...he(t),maximum:e})}function Yf(e,t){return new r8({check:"min_length",...he(t),minimum:e})}function z_(e,t){return new i8({check:"length_equals",...he(t),length:e})}function WU(e,t){return new a8({check:"string_format",format:"regex",...he(t),pattern:e})}function HU(e){return new o8({check:"string_format",format:"lowercase",...he(e)})}function KU(e){return new s8({check:"string_format",format:"uppercase",...he(e)})}function VU(e,t){return new l8({check:"string_format",format:"includes",...he(t),includes:e})}function ZU(e,t){return new c8({check:"string_format",format:"starts_with",...he(t),prefix:e})}function qU(e,t){return new u8({check:"string_format",format:"ends_with",...he(t),suffix:e})}function kl(e){return new d8({check:"overwrite",tx:e})}function YU(e){return kl(t=>t.normalize(e))}function GU(){return kl(e=>e.trim())}function QU(){return kl(e=>e.toLowerCase())}function XU(){return kl(e=>e.toUpperCase())}function JU(){return kl(e=>iF(e))}function e5(e,t,n){return new e({type:"array",element:t,...he(n)})}function t5(e,t,n){return new e({type:"custom",check:"custom",fn:t,...he(n)})}function n5(e){const t=r5(n=>(n.addIssue=r=>{if(typeof r=="string")n.issues.push(Yc(r,n.value,t._zod.def));else{const i=r;i.fatal&&(i.continue=!1),i.code??(i.code="custom"),i.input??(i.input=n.value),i.inst??(i.inst=t),i.continue??(i.continue=!t._zod.def.abort),n.issues.push(Yc(i))}},e(n.value,n)));return t}function r5(e,t){const n=new Un({check:"custom",...he(t)});return n._zod.check=e,n}function I_(e){let t=(e==null?void 0:e.target)??"draft-2020-12";return t==="draft-4"&&(t="draft-04"),t==="draft-7"&&(t="draft-07"),{processors:e.processors??{},metadataRegistry:(e==null?void 0:e.metadata)??pc,target:t,unrepresentable:(e==null?void 0:e.unrepresentable)??"throw",override:(e==null?void 0:e.override)??(()=>{}),io:(e==null?void 0:e.io)??"output",counter:0,seen:new Map,cycles:(e==null?void 0:e.cycles)??"ref",reused:(e==null?void 0:e.reused)??"inline",external:(e==null?void 0:e.external)??void 0}}function kt(e,t,n={path:[],schemaPath:[]}){var d,f;var r;const i=e._zod.def,a=t.seen.get(e);if(a)return a.count++,n.schemaPath.includes(e)&&(a.cycle=n.path),a.schema;const o={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,o);const s=(f=(d=e._zod).toJSONSchema)==null?void 0:f.call(d);if(s)o.schema=s;else{const p={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,o.schema,p);else{const m=o.schema,y=t.processors[i.type];if(!y)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);y(e,t,m,p)}const h=e._zod.parent;h&&(o.ref||(o.ref=h),kt(h,t,p),t.seen.get(h).isParent=!0)}const l=t.metadataRegistry.get(e);return l&&Object.assign(o.schema,l),t.io==="input"&&mn(e)&&(delete o.schema.examples,delete o.schema.default),t.io==="input"&&o.schema._prefault&&((r=o.schema).default??(r.default=o.schema._prefault)),delete o.schema._prefault,t.seen.get(e).schema}function $_(e,t){var o,s,l,c;const n=e.seen.get(t);if(!n)throw new Error("Unprocessed schema. This is a bug in Zod.");const r=new Map;for(const d of e.seen.entries()){const f=(o=e.metadataRegistry.get(d[0]))==null?void 0:o.id;if(f){const p=r.get(f);if(p&&p!==d[0])throw new Error(`Duplicate schema id "${f}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(f,d[0])}}const i=d=>{var y;const f=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){const g=(y=e.external.registry.get(d[0]))==null?void 0:y.id,x=e.external.uri??(w=>w);if(g)return{ref:x(g)};const b=d[1].defId??d[1].schema.id??`schema${e.counter++}`;return d[1].defId=b,{defId:b,ref:`${x("__shared")}#/${f}/${b}`}}if(d[1]===n)return{ref:"#"};const h=`#/${f}/`,m=d[1].schema.id??`__schema${e.counter++}`;return{defId:m,ref:h+m}},a=d=>{if(d[1].schema.$ref)return;const f=d[1],{ref:p,defId:h}=i(d);f.def={...f.schema},h&&(f.defId=h);const m=f.schema;for(const y in m)delete m[y];m.$ref=p};if(e.cycles==="throw")for(const d of e.seen.entries()){const f=d[1];if(f.cycle)throw new Error(`Cycle detected: #/${(s=f.cycle)==null?void 0:s.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(const d of e.seen.entries()){const f=d[1];if(t===d[0]){a(d);continue}if(e.external){const h=(l=e.external.registry.get(d[0]))==null?void 0:l.id;if(t!==d[0]&&h){a(d);continue}}if((c=e.metadataRegistry.get(d[0]))==null?void 0:c.id){a(d);continue}if(f.cycle){a(d);continue}if(f.count>1&&e.reused==="ref"){a(d);continue}}}function L_(e,t){var o,s,l;const n=e.seen.get(t);if(!n)throw new Error("Unprocessed schema. This is a bug in Zod.");const r=c=>{const d=e.seen.get(c);if(d.ref===null)return;const f=d.def??d.schema,p={...f},h=d.ref;if(d.ref=null,h){r(h);const y=e.seen.get(h),g=y.schema;if(g.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(f.allOf=f.allOf??[],f.allOf.push(g)):Object.assign(f,g),Object.assign(f,p),c._zod.parent===h)for(const b in f)b==="$ref"||b==="allOf"||b in p||delete f[b];if(g.$ref&&y.def)for(const b in f)b==="$ref"||b==="allOf"||b in y.def&&JSON.stringify(f[b])===JSON.stringify(y.def[b])&&delete f[b]}const m=c._zod.parent;if(m&&m!==h){r(m);const y=e.seen.get(m);if(y!=null&&y.schema.$ref&&(f.$ref=y.schema.$ref,y.def))for(const g in f)g==="$ref"||g==="allOf"||g in y.def&&JSON.stringify(f[g])===JSON.stringify(y.def[g])&&delete f[g]}e.override({zodSchema:c,jsonSchema:f,path:d.path??[]})};for(const c of[...e.seen.entries()].reverse())r(c[0]);const i={};if(e.target==="draft-2020-12"?i.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?i.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?i.$schema="http://json-schema.org/draft-04/schema#":e.target,(o=e.external)!=null&&o.uri){const c=(s=e.external.registry.get(t))==null?void 0:s.id;if(!c)throw new Error("Schema is missing an `id` property");i.$id=e.external.uri(c)}Object.assign(i,n.def??n.schema);const a=((l=e.external)==null?void 0:l.defs)??{};for(const c of e.seen.entries()){const d=c[1];d.def&&d.defId&&(a[d.defId]=d.def)}e.external||Object.keys(a).length>0&&(e.target==="draft-2020-12"?i.$defs=a:i.definitions=a);try{const c=JSON.parse(JSON.stringify(i));return Object.defineProperty(c,"~standard",{value:{...t["~standard"],jsonSchema:{input:Gf(t,"input",e.processors),output:Gf(t,"output",e.processors)}},enumerable:!1,writable:!1}),c}catch{throw new Error("Error converting schema to JSON.")}}function mn(e,t){const n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);const r=e._zod.def;if(r.type==="transform")return!0;if(r.type==="array")return mn(r.element,n);if(r.type==="set")return mn(r.valueType,n);if(r.type==="lazy")return mn(r.getter(),n);if(r.type==="promise"||r.type==="optional"||r.type==="nonoptional"||r.type==="nullable"||r.type==="readonly"||r.type==="default"||r.type==="prefault")return mn(r.innerType,n);if(r.type==="intersection")return mn(r.left,n)||mn(r.right,n);if(r.type==="record"||r.type==="map")return mn(r.keyType,n)||mn(r.valueType,n);if(r.type==="pipe")return mn(r.in,n)||mn(r.out,n);if(r.type==="object"){for(const i in r.shape)if(mn(r.shape[i],n))return!0;return!1}if(r.type==="union"){for(const i of r.options)if(mn(i,n))return!0;return!1}if(r.type==="tuple"){for(const i of r.items)if(mn(i,n))return!0;return!!(r.rest&&mn(r.rest,n))}return!1}const i5=(e,t={})=>n=>{const r=I_({...n,processors:t});return kt(e,r),$_(r,e),L_(r,e)},Gf=(e,t,n={})=>r=>{const{libraryOptions:i,target:a}=r??{},o=I_({...i??{},target:a,io:t,processors:n});return kt(e,o),$_(o,e),L_(o,e)},a5={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},o5=(e,t,n,r)=>{const i=n;i.type="string";const{minimum:a,maximum:o,format:s,patterns:l,contentEncoding:c}=e._zod.bag;if(typeof a=="number"&&(i.minLength=a),typeof o=="number"&&(i.maxLength=o),s&&(i.format=a5[s]??s,i.format===""&&delete i.format,s==="time"&&delete i.format),c&&(i.contentEncoding=c),l&&l.size>0){const d=[...l];d.length===1?i.pattern=d[0].source:d.length>1&&(i.allOf=[...d.map(f=>({...t.target==="draft-07"||t.target==="draft-04"||t.target==="openapi-3.0"?{type:"string"}:{},pattern:f.source}))])}},s5=(e,t,n,r)=>{const i=n,{minimum:a,maximum:o,format:s,multipleOf:l,exclusiveMaximum:c,exclusiveMinimum:d}=e._zod.bag;typeof s=="string"&&s.includes("int")?i.type="integer":i.type="number",typeof d=="number"&&(t.target==="draft-04"||t.target==="openapi-3.0"?(i.minimum=d,i.exclusiveMinimum=!0):i.exclusiveMinimum=d),typeof a=="number"&&(i.minimum=a,typeof d=="number"&&t.target!=="draft-04"&&(d>=a?delete i.minimum:delete i.exclusiveMinimum)),typeof c=="number"&&(t.target==="draft-04"||t.target==="openapi-3.0"?(i.maximum=c,i.exclusiveMaximum=!0):i.exclusiveMaximum=c),typeof o=="number"&&(i.maximum=o,typeof c=="number"&&t.target!=="draft-04"&&(c<=o?delete i.maximum:delete i.exclusiveMaximum)),typeof l=="number"&&(i.multipleOf=l)},l5=(e,t,n,r)=>{n.type="boolean"},c5=(e,t,n,r)=>{if(t.unrepresentable==="throw")throw new Error("Undefined cannot be represented in JSON Schema")},u5=(e,t,n,r)=>{n.not={}},d5=(e,t,n,r)=>{},f5=(e,t,n,r)=>{},p5=(e,t,n,r)=>{const i=e._zod.def,a=v_(i.entries);a.every(o=>typeof o=="number")&&(n.type="number"),a.every(o=>typeof o=="string")&&(n.type="string"),n.enum=a},h5=(e,t,n,r)=>{if(t.unrepresentable==="throw")throw new Error("Custom types cannot be represented in JSON Schema")},m5=(e,t,n,r)=>{if(t.unrepresentable==="throw")throw new Error("Transforms cannot be represented in JSON Schema")},g5=(e,t,n,r)=>{const i=n,a=e._zod.def,{minimum:o,maximum:s}=e._zod.bag;typeof o=="number"&&(i.minItems=o),typeof s=="number"&&(i.maxItems=s),i.type="array",i.items=kt(a.element,t,{...r,path:[...r.path,"items"]})},v5=(e,t,n,r)=>{var c;const i=n,a=e._zod.def;i.type="object",i.properties={};const o=a.shape;for(const d in o)i.properties[d]=kt(o[d],t,{...r,path:[...r.path,"properties",d]});const s=new Set(Object.keys(o)),l=new Set([...s].filter(d=>{const f=a.shape[d]._zod;return t.io==="input"?f.optin===void 0:f.optout===void 0}));l.size>0&&(i.required=Array.from(l)),((c=a.catchall)==null?void 0:c._zod.def.type)==="never"?i.additionalProperties=!1:a.catchall?a.catchall&&(i.additionalProperties=kt(a.catchall,t,{...r,path:[...r.path,"additionalProperties"]})):t.io==="output"&&(i.additionalProperties=!1)},y5=(e,t,n,r)=>{const i=e._zod.def,a=i.inclusive===!1,o=i.options.map((s,l)=>kt(s,t,{...r,path:[...r.path,a?"oneOf":"anyOf",l]}));a?n.oneOf=o:n.anyOf=o},x5=(e,t,n,r)=>{const i=e._zod.def,a=kt(i.left,t,{...r,path:[...r.path,"allOf",0]}),o=kt(i.right,t,{...r,path:[...r.path,"allOf",1]}),s=c=>"allOf"in c&&Object.keys(c).length===1,l=[...s(a)?a.allOf:[a],...s(o)?o.allOf:[o]];n.allOf=l},b5=(e,t,n,r)=>{const i=n,a=e._zod.def;i.type="object";const o=a.keyType,s=o._zod.bag,l=s==null?void 0:s.patterns;if(a.mode==="loose"&&l&&l.size>0){const d=kt(a.valueType,t,{...r,path:[...r.path,"patternProperties","*"]});i.patternProperties={};for(const f of l)i.patternProperties[f.source]=d}else(t.target==="draft-07"||t.target==="draft-2020-12")&&(i.propertyNames=kt(a.keyType,t,{...r,path:[...r.path,"propertyNames"]})),i.additionalProperties=kt(a.valueType,t,{...r,path:[...r.path,"additionalProperties"]});const c=o._zod.values;if(c){const d=[...c].filter(f=>typeof f=="string"||typeof f=="number");d.length>0&&(i.required=d)}},w5=(e,t,n,r)=>{const i=e._zod.def,a=kt(i.innerType,t,r),o=t.seen.get(e);t.target==="openapi-3.0"?(o.ref=i.innerType,n.nullable=!0):n.anyOf=[a,{type:"null"}]},j5=(e,t,n,r)=>{const i=e._zod.def;kt(i.innerType,t,r);const a=t.seen.get(e);a.ref=i.innerType},S5=(e,t,n,r)=>{const i=e._zod.def;kt(i.innerType,t,r);const a=t.seen.get(e);a.ref=i.innerType,n.default=JSON.parse(JSON.stringify(i.defaultValue))},k5=(e,t,n,r)=>{const i=e._zod.def;kt(i.innerType,t,r);const a=t.seen.get(e);a.ref=i.innerType,t.io==="input"&&(n._prefault=JSON.parse(JSON.stringify(i.defaultValue)))},P5=(e,t,n,r)=>{const i=e._zod.def;kt(i.innerType,t,r);const a=t.seen.get(e);a.ref=i.innerType;let o;try{o=i.catchValue(void 0)}catch{throw new Error("Dynamic catch values are not supported in JSON Schema")}n.default=o},C5=(e,t,n,r)=>{const i=e._zod.def,a=t.io==="input"?i.in._zod.def.type==="transform"?i.out:i.in:i.out;kt(a,t,r);const o=t.seen.get(e);o.ref=a},O5=(e,t,n,r)=>{const i=e._zod.def;kt(i.innerType,t,r);const a=t.seen.get(e);a.ref=i.innerType,n.readOnly=!0},F_=(e,t,n,r)=>{const i=e._zod.def;kt(i.innerType,t,r);const a=t.seen.get(e);a.ref=i.innerType},E5=F("ZodISODateTime",(e,t)=>{P8.init(e,t),ut.init(e,t)});function N5(e){return TU(E5,e)}const _5=F("ZodISODate",(e,t)=>{C8.init(e,t),ut.init(e,t)});function A5(e){return RU(_5,e)}const T5=F("ZodISOTime",(e,t)=>{O8.init(e,t),ut.init(e,t)});function R5(e){return MU(T5,e)}const M5=F("ZodISODuration",(e,t)=>{E8.init(e,t),ut.init(e,t)});function D5(e){return DU(M5,e)}const U_=(e,t)=>{w_.init(e,t),e.name="ZodError",Object.defineProperties(e,{format:{value:n=>vF(e,n)},flatten:{value:n=>gF(e,n)},addIssue:{value:n=>{e.issues.push(n),e.message=JSON.stringify(e.issues,Yv,2)}},addIssues:{value:n=>{e.issues.push(...n),e.message=JSON.stringify(e.issues,Yv,2)}},isEmpty:{get(){return e.issues.length===0}}})},z5=F("ZodError",U_),Pr=F("ZodError",U_,{Parent:Error}),I5=g0(Pr),$5=v0(Pr),L5=bh(Pr),F5=wh(Pr),U5=bF(Pr),B5=wF(Pr),W5=jF(Pr),H5=SF(Pr),K5=kF(Pr),V5=PF(Pr),Z5=CF(Pr),q5=OF(Pr),at=F("ZodType",(e,t)=>(rt.init(e,t),Object.assign(e["~standard"],{jsonSchema:{input:Gf(e,"input"),output:Gf(e,"output")}}),e.toJSONSchema=i5(e,{}),e.def=t,e.type=t.type,Object.defineProperty(e,"_def",{value:t}),e.check=(...n)=>e.clone(Ja(t,{checks:[...t.checks??[],...n.map(r=>typeof r=="function"?{_zod:{check:r,def:{check:"custom"},onattach:[]}}:r)]}),{parent:!0}),e.with=e.check,e.clone=(n,r)=>eo(e,n,r),e.brand=()=>e,e.register=(n,r)=>(n.add(e,r),e),e.parse=(n,r)=>I5(e,n,r,{callee:e.parse}),e.safeParse=(n,r)=>L5(e,n,r),e.parseAsync=async(n,r)=>$5(e,n,r,{callee:e.parseAsync}),e.safeParseAsync=async(n,r)=>F5(e,n,r),e.spa=e.safeParseAsync,e.encode=(n,r)=>U5(e,n,r),e.decode=(n,r)=>B5(e,n,r),e.encodeAsync=async(n,r)=>W5(e,n,r),e.decodeAsync=async(n,r)=>H5(e,n,r),e.safeEncode=(n,r)=>K5(e,n,r),e.safeDecode=(n,r)=>V5(e,n,r),e.safeEncodeAsync=async(n,r)=>Z5(e,n,r),e.safeDecodeAsync=async(n,r)=>q5(e,n,r),e.refine=(n,r)=>e.check(WB(n,r)),e.superRefine=n=>e.check(HB(n)),e.overwrite=n=>e.check(kl(n)),e.optional=()=>Gj(e),e.exactOptional=()=>_B(e),e.nullable=()=>Qj(e),e.nullish=()=>Gj(Qj(e)),e.nonoptional=n=>zB(e,n),e.array=()=>jt(e),e.or=n=>SB([e,n]),e.and=n=>PB(e,n),e.transform=n=>Xj(e,EB(n)),e.default=n=>RB(e,n),e.prefault=n=>DB(e,n),e.catch=n=>$B(e,n),e.pipe=n=>Xj(e,n),e.readonly=()=>UB(e),e.describe=n=>{const r=e.clone();return pc.add(r,{description:n}),r},Object.defineProperty(e,"description",{get(){var n;return(n=pc.get(e))==null?void 0:n.description},configurable:!0}),e.meta=(...n)=>{if(n.length===0)return pc.get(e);const r=e.clone();return pc.add(r,n[0]),r},e.isOptional=()=>e.safeParse(void 0).success,e.isNullable=()=>e.safeParse(null).success,e.apply=n=>n(e),e)),B_=F("_ZodString",(e,t)=>{y0.init(e,t),at.init(e,t),e._zod.processJSONSchema=(r,i,a)=>o5(e,r,i);const n=e._zod.bag;e.format=n.format??null,e.minLength=n.minimum??null,e.maxLength=n.maximum??null,e.regex=(...r)=>e.check(WU(...r)),e.includes=(...r)=>e.check(VU(...r)),e.startsWith=(...r)=>e.check(ZU(...r)),e.endsWith=(...r)=>e.check(qU(...r)),e.min=(...r)=>e.check(Yf(...r)),e.max=(...r)=>e.check(D_(...r)),e.length=(...r)=>e.check(z_(...r)),e.nonempty=(...r)=>e.check(Yf(1,...r)),e.lowercase=r=>e.check(HU(r)),e.uppercase=r=>e.check(KU(r)),e.trim=()=>e.check(GU()),e.normalize=(...r)=>e.check(YU(...r)),e.toLowerCase=()=>e.check(QU()),e.toUpperCase=()=>e.check(XU()),e.slugify=()=>e.check(JU())}),Y5=F("ZodString",(e,t)=>{y0.init(e,t),B_.init(e,t),e.email=n=>e.check(dU(G5,n)),e.url=n=>e.check(gU(Q5,n)),e.jwt=n=>e.check(AU(fB,n)),e.emoji=n=>e.check(vU(X5,n)),e.guid=n=>e.check(Wj(Zj,n)),e.uuid=n=>e.check(fU(Nd,n)),e.uuidv4=n=>e.check(pU(Nd,n)),e.uuidv6=n=>e.check(hU(Nd,n)),e.uuidv7=n=>e.check(mU(Nd,n)),e.nanoid=n=>e.check(yU(J5,n)),e.guid=n=>e.check(Wj(Zj,n)),e.cuid=n=>e.check(xU(eB,n)),e.cuid2=n=>e.check(bU(tB,n)),e.ulid=n=>e.check(wU(nB,n)),e.base64=n=>e.check(EU(cB,n)),e.base64url=n=>e.check(NU(uB,n)),e.xid=n=>e.check(jU(rB,n)),e.ksuid=n=>e.check(SU(iB,n)),e.ipv4=n=>e.check(kU(aB,n)),e.ipv6=n=>e.check(PU(oB,n)),e.cidrv4=n=>e.check(CU(sB,n)),e.cidrv6=n=>e.check(OU(lB,n)),e.e164=n=>e.check(_U(dB,n)),e.datetime=n=>e.check(N5(n)),e.date=n=>e.check(A5(n)),e.time=n=>e.check(R5(n)),e.duration=n=>e.check(D5(n))});function A(e){return uU(Y5,e)}const ut=F("ZodStringFormat",(e,t)=>{it.init(e,t),B_.init(e,t)}),G5=F("ZodEmail",(e,t)=>{g8.init(e,t),ut.init(e,t)}),Zj=F("ZodGUID",(e,t)=>{h8.init(e,t),ut.init(e,t)}),Nd=F("ZodUUID",(e,t)=>{m8.init(e,t),ut.init(e,t)}),Q5=F("ZodURL",(e,t)=>{v8.init(e,t),ut.init(e,t)}),X5=F("ZodEmoji",(e,t)=>{y8.init(e,t),ut.init(e,t)}),J5=F("ZodNanoID",(e,t)=>{x8.init(e,t),ut.init(e,t)}),eB=F("ZodCUID",(e,t)=>{b8.init(e,t),ut.init(e,t)}),tB=F("ZodCUID2",(e,t)=>{w8.init(e,t),ut.init(e,t)}),nB=F("ZodULID",(e,t)=>{j8.init(e,t),ut.init(e,t)}),rB=F("ZodXID",(e,t)=>{S8.init(e,t),ut.init(e,t)}),iB=F("ZodKSUID",(e,t)=>{k8.init(e,t),ut.init(e,t)}),aB=F("ZodIPv4",(e,t)=>{N8.init(e,t),ut.init(e,t)}),oB=F("ZodIPv6",(e,t)=>{_8.init(e,t),ut.init(e,t)}),sB=F("ZodCIDRv4",(e,t)=>{A8.init(e,t),ut.init(e,t)}),lB=F("ZodCIDRv6",(e,t)=>{T8.init(e,t),ut.init(e,t)}),cB=F("ZodBase64",(e,t)=>{R8.init(e,t),ut.init(e,t)}),uB=F("ZodBase64URL",(e,t)=>{D8.init(e,t),ut.init(e,t)}),dB=F("ZodE164",(e,t)=>{z8.init(e,t),ut.init(e,t)}),fB=F("ZodJWT",(e,t)=>{$8.init(e,t),ut.init(e,t)}),W_=F("ZodNumber",(e,t)=>{A_.init(e,t),at.init(e,t),e._zod.processJSONSchema=(r,i,a)=>s5(e,r,i),e.gt=(r,i)=>e.check(Kj(r,i)),e.gte=(r,i)=>e.check(og(r,i)),e.min=(r,i)=>e.check(og(r,i)),e.lt=(r,i)=>e.check(Hj(r,i)),e.lte=(r,i)=>e.check(ag(r,i)),e.max=(r,i)=>e.check(ag(r,i)),e.int=r=>e.check(qj(r)),e.safe=r=>e.check(qj(r)),e.positive=r=>e.check(Kj(0,r)),e.nonnegative=r=>e.check(og(0,r)),e.negative=r=>e.check(Hj(0,r)),e.nonpositive=r=>e.check(ag(0,r)),e.multipleOf=(r,i)=>e.check(Vj(r,i)),e.step=(r,i)=>e.check(Vj(r,i)),e.finite=()=>e;const n=e._zod.bag;e.minValue=Math.max(n.minimum??Number.NEGATIVE_INFINITY,n.exclusiveMinimum??Number.NEGATIVE_INFINITY)??null,e.maxValue=Math.min(n.maximum??Number.POSITIVE_INFINITY,n.exclusiveMaximum??Number.POSITIVE_INFINITY)??null,e.isInt=(n.format??"").includes("int")||Number.isSafeInteger(n.multipleOf??.5),e.isFinite=!0,e.format=n.format??null});function ne(e){return zU(W_,e)}const pB=F("ZodNumberFormat",(e,t)=>{L8.init(e,t),W_.init(e,t)});function qj(e){return IU(pB,e)}const hB=F("ZodBoolean",(e,t)=>{F8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>l5(e,n,r)});function to(e){return $U(hB,e)}const mB=F("ZodUndefined",(e,t)=>{U8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>c5(e,n)});function mi(e){return LU(mB,e)}const gB=F("ZodAny",(e,t)=>{B8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>d5()});function Qf(){return FU(gB)}const vB=F("ZodUnknown",(e,t)=>{W8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>f5()});function Yj(){return UU(vB)}const yB=F("ZodNever",(e,t)=>{H8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>u5(e,n,r)});function xB(e){return BU(yB,e)}const bB=F("ZodArray",(e,t)=>{K8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>g5(e,n,r,i),e.element=t.element,e.min=(n,r)=>e.check(Yf(n,r)),e.nonempty=n=>e.check(Yf(1,n)),e.max=(n,r)=>e.check(D_(n,r)),e.length=(n,r)=>e.check(z_(n,r)),e.unwrap=()=>e.element});function jt(e,t){return e5(bB,e,t)}const wB=F("ZodObject",(e,t)=>{Z8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>v5(e,n,r,i),Ue(e,"shape",()=>t.shape),e.keyof=()=>Sh(Object.keys(e._zod.def.shape)),e.catchall=n=>e.clone({...e._zod.def,catchall:n}),e.passthrough=()=>e.clone({...e._zod.def,catchall:Yj()}),e.loose=()=>e.clone({...e._zod.def,catchall:Yj()}),e.strict=()=>e.clone({...e._zod.def,catchall:xB()}),e.strip=()=>e.clone({...e._zod.def,catchall:void 0}),e.extend=n=>dF(e,n),e.safeExtend=n=>fF(e,n),e.merge=n=>pF(e,n),e.pick=n=>cF(e,n),e.omit=n=>uF(e,n),e.partial=(...n)=>hF(H_,e,n[0]),e.required=(...n)=>mF(K_,e,n[0])});function J(e,t){const n={type:"object",shape:e??{},...he(t)};return new wB(n)}const jB=F("ZodUnion",(e,t)=>{q8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>y5(e,n,r,i),e.options=t.options});function SB(e,t){return new jB({type:"union",options:e,...he(t)})}const kB=F("ZodIntersection",(e,t)=>{Y8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>x5(e,n,r,i)});function PB(e,t){return new kB({type:"intersection",left:e,right:t})}const CB=F("ZodRecord",(e,t)=>{G8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>b5(e,n,r,i),e.keyType=t.keyType,e.valueType=t.valueType});function Rn(e,t,n){return new CB({type:"record",keyType:e,valueType:t,...he(n)})}const Qv=F("ZodEnum",(e,t)=>{Q8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(r,i,a)=>p5(e,r,i),e.enum=t.entries,e.options=Object.values(t.entries);const n=new Set(Object.keys(t.entries));e.extract=(r,i)=>{const a={};for(const o of r)if(n.has(o))a[o]=t.entries[o];else throw new Error(`Key ${o} not found in enum`);return new Qv({...t,checks:[],...he(i),entries:a})},e.exclude=(r,i)=>{const a={...t.entries};for(const o of r)if(n.has(o))delete a[o];else throw new Error(`Key ${o} not found in enum`);return new Qv({...t,checks:[],...he(i),entries:a})}});function Sh(e,t){const n=Array.isArray(e)?Object.fromEntries(e.map(r=>[r,r])):e;return new Qv({type:"enum",entries:n,...he(t)})}const OB=F("ZodTransform",(e,t)=>{X8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>m5(e,n),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new m_(e.constructor.name);n.addIssue=a=>{if(typeof a=="string")n.issues.push(Yc(a,n.value,t));else{const o=a;o.fatal&&(o.continue=!1),o.code??(o.code="custom"),o.input??(o.input=n.value),o.inst??(o.inst=e),n.issues.push(Yc(o))}};const i=t.transform(n.value,n);return i instanceof Promise?i.then(a=>(n.value=a,n)):(n.value=i,n)}});function EB(e){return new OB({type:"transform",transform:e})}const H_=F("ZodOptional",(e,t)=>{M_.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>F_(e,n,r,i),e.unwrap=()=>e._zod.def.innerType});function Gj(e){return new H_({type:"optional",innerType:e})}const NB=F("ZodExactOptional",(e,t)=>{J8.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>F_(e,n,r,i),e.unwrap=()=>e._zod.def.innerType});function _B(e){return new NB({type:"optional",innerType:e})}const AB=F("ZodNullable",(e,t)=>{eU.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>w5(e,n,r,i),e.unwrap=()=>e._zod.def.innerType});function Qj(e){return new AB({type:"nullable",innerType:e})}const TB=F("ZodDefault",(e,t)=>{tU.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>S5(e,n,r,i),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function RB(e,t){return new TB({type:"default",innerType:e,get defaultValue(){return typeof t=="function"?t():x_(t)}})}const MB=F("ZodPrefault",(e,t)=>{nU.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>k5(e,n,r,i),e.unwrap=()=>e._zod.def.innerType});function DB(e,t){return new MB({type:"prefault",innerType:e,get defaultValue(){return typeof t=="function"?t():x_(t)}})}const K_=F("ZodNonOptional",(e,t)=>{rU.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>j5(e,n,r,i),e.unwrap=()=>e._zod.def.innerType});function zB(e,t){return new K_({type:"nonoptional",innerType:e,...he(t)})}const IB=F("ZodCatch",(e,t)=>{iU.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>P5(e,n,r,i),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function $B(e,t){return new IB({type:"catch",innerType:e,catchValue:typeof t=="function"?t:()=>t})}const LB=F("ZodPipe",(e,t)=>{aU.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>C5(e,n,r,i),e.in=t.in,e.out=t.out});function Xj(e,t){return new LB({type:"pipe",in:e,out:t})}const FB=F("ZodReadonly",(e,t)=>{oU.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>O5(e,n,r,i),e.unwrap=()=>e._zod.def.innerType});function UB(e){return new FB({type:"readonly",innerType:e})}const BB=F("ZodCustom",(e,t)=>{sU.init(e,t),at.init(e,t),e._zod.processJSONSchema=(n,r,i)=>h5(e,n)});function WB(e,t={}){return t5(BB,e,t)}function HB(e){return n5(e)}const Xv=e=>J({success:to(),data:e.optional(),error:J({type:A().optional(),title:A().optional(),detail:A().optional(),instance:A().optional(),status:ne(),errorCode:A().optional()}).optional(),message:A().optional(),status:ne().optional()}),gi=e=>J({kind:A(),apiVersion:A(),items:jt(e),metadata:J({resourceVersion:ne(),continueToken:A().optional(),remainingItemCount:ne().optional()}).optional()});J({name:A(),namespace:A().optional(),uid:A().optional(),resourceVersion:A().optional(),creationTimestamp:ne().optional(),labels:Rn(A(),A()).optional(),annotations:Rn(A(),A()).optional()});const V_=J({name:A(),image:A(),ready:to(),restartCount:ne(),state:A().optional()}),KB=J({type:A(),status:A(),reason:A().optional(),message:A().optional(),lastTransitionTime:ne().optional()}),Z_=J({name:A(),namespace:A(),status:A(),phase:A().optional(),nodeName:A().optional(),podIP:A().optional(),startTime:A().optional(),containers:jt(V_),conditions:jt(KB)}),q_=J({name:A(),namespace:A(),replicas:ne(),readyReplicas:ne(),availableReplicas:ne(),updatedReplicas:ne(),strategy:A().optional(),selector:A().optional(),template:J({labels:Rn(A(),A()).optional(),containers:jt(V_)}).optional()}),VB=J({name:A().optional(),protocol:A(),port:ne(),targetPort:ne().optional()}),ZB=J({ip:A(),ports:jt(ne()),ready:to()}),qB=J({name:A(),namespace:A(),type:A(),clusterIPs:jt(A()),ports:jt(VB),selector:A().optional(),endpoints:jt(ZB)}),kh=J({name:A(),status:A(),creationTimestamp:ne(),labels:Rn(A(),A()).optional(),annotations:Rn(A(),A()).optional()}),YB=J({name:A(),namespace:A(),creationTimestamp:ne(),data:Rn(A(),A()).optional(),binaryData:Rn(A(),Rn(A(),A())).optional(),labels:Rn(A(),A()).optional()}),GB=J({name:A(),namespace:A(),type:A(),creationTimestamp:ne(),data:Rn(A(),A()).optional(),labels:Rn(A(),A()).optional(),immutable:to().optional()}),QB=J({name:A(),namespace:A(),replicas:ne(),readyReplicas:ne(),currentReplicas:ne(),selector:A().optional()}),XB=J({name:A(),namespace:A(),selector:A().optional(),replicas:ne(),readyReplicas:ne(),availableReplicas:ne()}),JB=J({name:A(),namespace:A(),status:A(),startTime:A().optional(),completionTime:A().optional(),active:ne(),succeeded:ne(),failed:ne()}),e7=J({name:A(),namespace:A(),schedule:A(),suspend:A().optional(),lastSchedule:A().optional(),nextSchedule:A().optional(),active:A().optional(),succeeded:ne(),failed:ne()}),t7=J({timestamp:ne(),message:A(),severity:A().optional()}),n7=J({podName:A(),namespace:A(),containerName:A(),entries:jt(t7),hasMore:to()});J({type:A(),reason:A(),message:A(),lastTimestamp:ne().optional(),count:ne(),source:A().optional()});const r7=J({timestamp:ne(),value:ne()}),i7=J({average:ne(),min:ne(),max:ne(),count:ne()});J({data:jt(r7),summary:i7});J({name:A(),kind:A(),namespace:A().optional(),yaml:A()});J({valid:to(),errors:jt(J({path:A(),message:A(),code:A().optional()})),warnings:jt(J({path:A(),message:A(),code:A().optional()}))});const a7=J({name:A(),version:A(),platform:A(),nodesCount:ne(),podsCount:ne(),namespacesCount:ne()}),sg=J({cpu:A(),memory:A(),pods:A().optional()}),o7=J({type:A(),status:A(),reason:A().optional(),message:A().optional(),lastTransitionTime:ne().optional()}),Y_=J({name:A(),status:A(),roles:jt(A()),capacity:sg,allocatable:sg,allocated:sg,conditions:jt(o7),creationTimestamp:ne(),labels:Rn(A(),A()).optional()});J({replicas:ne().min(0)});J({image:A()});J({revision:A().optional()});J({cpuRequest:A().optional(),cpuLimit:A().optional(),memoryRequest:A().optional(),memoryLimit:A().optional()});J({envVars:Rn(A(),A())});J({strategy:Sh(["RollingUpdate","Recreate"]),maxUnavailable:A().optional(),maxSurge:A().optional()});J({newName:A(),targetNamespace:A()});J({metric:A(),threshold:ne(),operator:Sh(["gt","lt","eq"]),duration:A().optional()});J({id:A(),name:A(),severity:Sh(["critical","warning","info"]),message:A(),resourceType:A(),resourceName:A(),namespace:A(),triggeredAt:ne(),resolvedAt:ne().optional()});J({query:A(),start:ne().optional(),end:ne().optional(),step:A().optional()});J({sessionId:A(),namespace:A(),podName:A(),container:A()});J({rows:ne().min(1),columns:ne().min(1)});J({command:A()});J({id:ne(),email:A().email(),name:A(),avatarUrl:A().optional(),createdAt:ne(),lastLoginAt:ne().optional(),roles:jt(A())});J({id:ne(),userId:ne(),ipAddress:A(),userAgent:A(),createdAt:ne(),lastActivityAt:ne(),expiresAt:ne(),active:to()});function ye(e,t){var r,i,a,o,s;const n=Xv(t).safeParse(e);if(!n.success||!n.data)throw new Error(((a=(i=(r=n.error)==null?void 0:r.issues)==null?void 0:i[0])==null?void 0:a.message)||"API request failed");if(n.data.success===!1)throw new Error(((o=n.data.error)==null?void 0:o.detail)||((s=n.data.error)==null?void 0:s.title)||n.data.message||"API request failed");try{return t.parse(n.data.data)}catch(l){throw l instanceof z5?new Error(l.issues.map(c=>c.message).join(", ")):l}}function s7(e){var n;if(e instanceof Error){const r=e;if((n=r.response)!=null&&n.data){const i=Xv(Qf()).safeParse(r.response.data);if(i.success&&i.data.error){const a=i.data.error;return new Error(a.detail||a.title||i.data.message||"Unknown error")}}return e}const t=Xv(Qf()).safeParse(e);return!t.success||!t.data?new Error("An unexpected error occurred"):t.data.error?new Error(t.data.error.detail||t.data.error.title||t.data.message||"Unknown error"):new Error(t.data.message||"An unexpected error occurred")}function no(e){const t=new URLSearchParams;return e.page!==void 0&&t.set("page",e.page.toString()),e.limit!==void 0&&t.set("limit",e.limit.toString()),e.sortBy&&t.set("sortBy",e.sortBy),e.sortOrder&&t.set("sortOrder",e.sortOrder),t.toString()}function Ae(e,t,n){return H$({queryKey:e,queryFn:t,...n})}function Ne(e,t){return K$({mutationFn:e,onError:(n,r,i,a)=>{var s;const o=s7(n);console.error("Mutation error:",o),(s=t==null?void 0:t.onError)==null||s.call(t,n,r,i,a)},...t})}async function l7(){const e=await ce.get("/api/v1/cluster");return ye(e.data,a7)??{name:"unknown",version:"",platform:"",nodesCount:0,podsCount:0,namespacesCount:0}}async function c7(){const e=await ce.get("/api/v1/cluster/health");return ye(e.data,J({healthy:to(),message:A()}))??{healthy:!1,message:"Unknown status"}}async function x0(){const e=await ce.get("/api/v1/cluster/metrics");return ye(e.data,J({cpuUsage:ne(),memoryUsage:ne(),podsCount:ne(),nodesCount:ne()}))??{cpuUsage:0,memoryUsage:0,podsCount:0,nodesCount:0}}async function u7(e){const t=new URLSearchParams;e!=null&&e.severity&&t.set("severity",e.severity),e!=null&&e.limit&&t.set("limit",e.limit.toString());const n=await ce.get(`/api/v1/cluster/events?${t.toString()}`);return ye(n.data,jt(Qf()))??[]}async function G_(){const e=await ce.get("/api/v1/cluster/nodes");return ye(e.data,jt(Y_))??[]}async function d7(e){const t=await ce.get(`/api/v1/cluster/nodes/${e}`);return ye(t.data,Y_)??{}}async function f7(e){const t=await ce.post(`/api/v1/cluster/nodes/${e}/cordon`);ye(t.data,mi())}async function p7(e){const t=await ce.post(`/api/v1/cluster/nodes/${e}/uncordon`);ye(t.data,mi())}async function h7(e,t){const n=t?`?timeout=${t}`:"",r=await ce.post(`/api/v1/cluster/nodes/${e}/drain${n}`);ye(r.data,mi())}const m7={Running:"#10b981",Succeeded:"#10b981",Failed:"#ef4444",Pending:"#f59e0b",Unknown:"#6b7280",Terminating:"#ef4444",Completed:"#10b981",Error:"#ef4444",CrashLoopBackOff:"#dc2626",ImagePullBackOff:"#f59e0b"};function tt({status:e,label:t,size:n="md",className:r=""}){const i=m7[e]||"#6b7280",a=`badge badge-${n} ${r}`;return u.jsx("span",{className:a,style:{backgroundColor:i},children:t||e})}function qt({size:e="md"}){return u.jsx("div",{className:`spinner spinner-${e}`,children:u.jsx("div",{className:"spinner-circle"})})}function b0({message:e}){return u.jsxs("div",{className:"loading-container",children:[u.jsx(qt,{}),e&&u.jsx("p",{className:"loading-message",children:e})]})}function g7(){const{data:e,isLoading:t}=Ae(["cluster"],l7),{data:n,isLoading:r}=Ae(["cluster","health"],c7),{data:i,isLoading:a}=Ae(["cluster","metrics"],x0);return t||r||a?u.jsx(b0,{message:"Loading cluster overview..."}):u.jsxs("div",{className:"cluster-overview",children:[u.jsxs("div",{className:"overview-header",children:[u.jsx("h1",{children:"Cluster Overview"}),u.jsxs("div",{className:"cluster-info",children:[u.jsxs("div",{className:"info-item",children:[u.jsx("span",{className:"info-label",children:"Name"}),u.jsx("span",{className:"info-value",children:e==null?void 0:e.name})]}),u.jsxs("div",{className:"info-item",children:[u.jsx("span",{className:"info-label",children:"Version"}),u.jsx("span",{className:"info-value",children:e==null?void 0:e.version})]}),u.jsxs("div",{className:"info-item",children:[u.jsx("span",{className:"info-label",children:"Platform"}),u.jsx("span",{className:"info-value",children:e==null?void 0:e.platform})]})]})]}),u.jsxs("div",{className:"overview-grid",children:[u.jsxs("div",{className:"overview-card",children:[u.jsx("h2",{children:"Cluster Health"}),u.jsxs("div",{className:"health-status",children:[u.jsx(tt,{status:n!=null&&n.healthy?"Running":"Failed"}),u.jsx("p",{className:"health-message",children:n==null?void 0:n.message})]})]}),u.jsxs("div",{className:"overview-card metrics-card",children:[u.jsx("h2",{children:"Resource Usage"}),u.jsxs("div",{className:"metrics-grid",children:[u.jsxs("div",{className:"metric-item",children:[u.jsx("span",{className:"metric-label",children:"CPU Usage"}),u.jsxs("span",{className:"metric-value",children:[(i==null?void 0:i.cpuUsage)||0,"%"]})]}),u.jsxs("div",{className:"metric-item",children:[u.jsx("span",{className:"metric-label",children:"Memory Usage"}),u.jsxs("span",{className:"metric-value",children:[(i==null?void 0:i.memoryUsage)||0,"%"]})]}),u.jsxs("div",{className:"metric-item",children:[u.jsx("span",{className:"metric-label",children:"Pods"}),u.jsx("span",{className:"metric-value",children:(e==null?void 0:e.podsCount)||0})]}),u.jsxs("div",{className:"metric-item",children:[u.jsx("span",{className:"metric-label",children:"Nodes"}),u.jsx("span",{className:"metric-value",children:(e==null?void 0:e.nodesCount)||0})]})]})]}),u.jsxs("div",{className:"overview-card summary-card",children:[u.jsx("h2",{children:"Summary"}),u.jsxs("div",{className:"summary-grid",children:[u.jsxs("div",{className:"summary-item",children:[u.jsx("span",{className:"summary-value",children:(e==null?void 0:e.nodesCount)||0}),u.jsx("span",{className:"summary-label",children:"Nodes"})]}),u.jsxs("div",{className:"summary-item",children:[u.jsx("span",{className:"summary-value",children:(e==null?void 0:e.podsCount)||0}),u.jsx("span",{className:"summary-label",children:"Pods"})]}),u.jsxs("div",{className:"summary-item",children:[u.jsx("span",{className:"summary-value",children:(e==null?void 0:e.namespacesCount)||0}),u.jsx("span",{className:"summary-label",children:"Namespaces"})]})]})]})]}),u.jsx("style",{children:`
        .cluster-overview {
          padding: 32px;
        }

        .overview-header {
          margin-bottom: 32px;
        }

        .overview-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 24px 0;
          color: #111827;
        }

        .cluster-info {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-label {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
        }

        .info-value {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .overview-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .overview-card h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #111827;
        }

        .health-status {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .health-message {
          font-size: 15px;
          color: #374151;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .metric-label {
          font-size: 13px;
          color: #6b7280;
        }

        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .summary-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
        }

        .summary-value {
          font-size: 32px;
          font-weight: 700;
          color: white;
        }

        .summary-label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }
      `})]})}const ge=v.forwardRef(({label:e,error:t,helperText:n,fullWidth:r=!1,className:i="",...a},o)=>{const s=`input ${t?"input-error":""} ${r?"input-full-width":""} ${i}`;return u.jsxs("div",{className:"input-wrapper",children:[e&&u.jsx("label",{className:"input-label",children:e}),u.jsx("input",{ref:o,className:s,...a}),(t||n)&&u.jsxs("div",{className:"input-footer",children:[t&&u.jsx("span",{className:"input-error-text",children:t}),n&&!t&&u.jsx("span",{className:"input-helper-text",children:n})]})]})});ge.displayName="Input";function Cn({data:e,columns:t,onSort:n,onRowClick:r,defaultSort:i,loading:a=!1,emptyMessage:o="No data available"}){const[s,l]=v.useState(i||(t[0]?{key:t[0].key,order:"asc"}:void 0)),c=v.useMemo(()=>!s||!s.key||!n?e:[...e].sort((p,h)=>{const m=p[s.key],y=h[s.key],g=m??"",x=y??"";let b=0;return typeof g=="string"&&typeof x=="string"?b=g.localeCompare(x):typeof g=="number"&&typeof x=="number"?b=g-x:typeof g=="boolean"&&typeof x=="boolean"?b=g===x?0:g?1:-1:b=String(g).localeCompare(String(x)),s.order==="asc"?b:-b}),[e,s,n]),d=p=>{if(!n)return;const h=s&&s.key===p&&s.order==="asc"?"desc":"asc";l({key:p,order:h}),n(p,h)},f=(p,h)=>{const m=p[h.key];return h.render?h.render(m,p):m!=null?String(m):""};return u.jsx("div",{className:"table-container",children:u.jsxs("table",{className:"table",children:[u.jsx("thead",{children:u.jsx("tr",{children:t.map(p=>u.jsxs("th",{onClick:()=>d(p.key),className:p.sortable?"table-header table-header-sortable":"table-header",children:[p.header,p.sortable&&s&&s.key===p.key&&u.jsx("span",{className:"sort-indicator",children:s.order==="asc"?"↑":"↓"})]},String(p.key)))})}),u.jsx("tbody",{children:a?u.jsx("tr",{children:u.jsx("td",{colSpan:t.length,className:"table-loading",children:u.jsx("div",{className:"table-spinner"})})}):c.length===0?u.jsx("tr",{children:u.jsx("td",{colSpan:t.length,className:"table-empty",children:o})}):c.map((p,h)=>u.jsx("tr",{onClick:()=>r==null?void 0:r(p),className:r?"table-row table-row-clickable":"table-row",children:t.map(m=>u.jsx("td",{children:f(p,m)},String(m.key)))},h))})]})})}function Bn(){return u.jsx("style",{children:`
      .table-container {
        overflow-x: auto;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        background: white;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
      }

      .table-header {
        background: #f9fafb;
        font-size: 13px;
        font-weight: 600;
        color: #374151;
        text-align: left;
        padding: 12px 16px;
        border-bottom: 2px solid #e5e7eb;
        white-space: nowrap;
      }

      .table-header-sortable {
        cursor: pointer;
        user-select: none;
        transition: background 0.2s;
      }

      .table-header-sortable:hover {
        background: #f3f4f6;
      }

      .sort-indicator {
        margin-left: 8px;
        font-size: 12px;
        color: #6b7280;
      }

      .table-row {
        border-bottom: 1px solid #e5e7eb;
        transition: background 0.2s;
      }

      .table-row:hover {
        background: #f9fafb;
      }

      .table-row-clickable {
        cursor: pointer;
      }

      .table-row td {
        padding: 12px 16px;
        font-size: 14px;
        color: #374151;
      }

      .table-loading,
      .table-empty {
        padding: 48px;
        text-align: center;
        color: #6b7280;
      }

      .table-spinner {
        width: 32px;
        height: 32px;
        margin: 0 auto;
        border: 3px solid #e5e7eb;
        border-top-color: #3b82f6;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `})}function v7(){const[e,t]=v.useState("all"),[n,r]=v.useState(50),{data:i,isLoading:a}=Ae(["cluster","events",e,n],()=>u7({severity:e==="all"?void 0:e,limit:n})),o=i||[],s=e==="all"?o:o.filter(d=>d.type===e),l=[{key:"type",header:"Severity",sortable:!0,render:d=>u.jsx(tt,{status:d})},{key:"lastTimestamp",header:"Time",sortable:!0,render:d=>new Date(d*1e3).toLocaleString()},{key:"count",header:"Count",sortable:!0},{key:"reason",header:"Reason",sortable:!0},{key:"message",header:"Message",sortable:!0,render:d=>u.jsx("div",{className:"event-message",title:d,children:d})},{key:"source",header:"Source",sortable:!0}],c={all:o.length||0,Normal:o.filter(d=>d.type==="Normal").length||0,Warning:o.filter(d=>d.type==="Warning").length||0,Error:o.filter(d=>d.type==="Error").length||0};return u.jsxs("div",{className:"cluster-events",children:[u.jsxs("div",{className:"events-header",children:[u.jsx("h1",{children:"Cluster Events"}),u.jsxs("div",{className:"events-filters",children:[u.jsx("div",{className:"severity-tabs",children:["all","Normal","Warning","Error"].map(d=>u.jsxs("button",{className:`severity-tab ${e===d?"active":""}`,onClick:()=>t(d),children:[d.charAt(0).toUpperCase()+d.slice(1),u.jsx("span",{className:"count-badge",children:c[d]})]},d))}),u.jsx(ge,{type:"number",label:"Limit",value:n.toString(),onChange:d=>r(Number(d.target.value)),min:1,max:500,style:{width:"120px"}})]})]}),u.jsx(Bn,{}),u.jsx(Cn,{data:s,columns:l,loading:a,emptyMessage:"No events found",defaultSort:{key:"lastTimestamp",order:"desc"}}),u.jsx("style",{children:`
        .cluster-events {
          padding: 32px;
        }

        .events-header {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 24px;
        }

        .events-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }

        .events-filters {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }

        .severity-tabs {
          display: flex;
          gap: 4px;
        }

        .severity-tab {
          padding: 10px 20px;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s;
        }

        .severity-tab:hover {
          background: #f9fafb;
        }

        .severity-tab.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .count-badge {
          margin-left: 8px;
          padding: 2px 8px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          font-size: 12px;
        }

        .event-message {
          max-width: 400px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `})]})}function y7(){const{data:e,isLoading:t}=Ae(["cluster","metrics"],x0),{data:n,isLoading:r}=Ae(["nodes"],G_);if(t||r)return u.jsx(b0,{message:"Loading cluster resources..."});const i=(n==null?void 0:n.reduce((c,d)=>c+parseFloat(d.capacity.cpu),0))||0,a=(n==null?void 0:n.reduce((c,d)=>{const f=d.capacity.memory,p=parseFloat(f.replace(/[^\d.]/g,"")),m=f.replace(/[\d.]/g,"")==="Gi"?p*1024**3:p*1024**2;return c+m},0))||0,o=(n==null?void 0:n.reduce((c,d)=>c+parseInt(d.capacity.pods||"0"),0))||0,s=c=>{const d=c/1073741824;return d>=1?`${d.toFixed(2)}Gi`:`${(c/1024**2).toFixed(2)}Mi`},l={cpu:{used:(e==null?void 0:e.cpuUsage)||0,capacity:i},memory:{used:(e==null?void 0:e.memoryUsage)||0,capacity:a},pods:{used:(e==null?void 0:e.podsCount)||0,capacity:o}};return u.jsxs("div",{className:"cluster-resources",children:[u.jsx("h1",{children:"Cluster Resources"}),u.jsx("div",{className:"resources-grid",children:Object.entries(l).map(([c,d])=>u.jsx(x7,{title:c.charAt(0).toUpperCase()+c.slice(1),used:d.used,capacity:c==="pods"?d.capacity:d.capacity*(c==="memory"?1:d.used/100),unit:c==="memory"?"bytes":c==="pods"?"count":"cores",formatMemory:s},c))}),u.jsxs("div",{className:"node-resources-section",children:[u.jsx("h2",{children:"Node Resources"}),u.jsx("div",{className:"node-resources-grid",children:n==null?void 0:n.map(c=>u.jsx(b7,{node:c,formatMemory:s},c.name))})]}),u.jsx("style",{children:`
        .cluster-resources {
          padding: 32px;
        }

        .cluster-resources h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 32px 0;
          color: #111827;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .node-resources-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .node-resources-section h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 24px 0;
          color: #111827;
        }

        .node-resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
      `})]})}function x7({title:e,used:t,capacity:n,unit:r,formatMemory:i}){const a=n>0?t/n*100:0,o=r==="bytes"&&i?i(t):t,s=r==="bytes"&&i?i(n):n,l=r==="bytes"?"":r,c=d=>d>=90?"#ef4444":d>=70?"#f59e0b":"#10b981";return u.jsxs("div",{className:"resource-card",children:[u.jsx("h3",{className:"resource-title",children:e}),u.jsxs("div",{className:"resource-usage",children:[u.jsx("div",{className:"usage-bar",children:u.jsx("div",{className:"usage-fill",style:{width:`${a}%`,backgroundColor:c(a)}})}),u.jsxs("div",{className:"usage-text",children:[u.jsxs("span",{className:"usage-value",children:[o," ",l]}),u.jsxs("span",{className:"usage-capacity",children:["of ",s," ",l]})]})]}),u.jsxs("div",{className:"usage-percentage",children:[a.toFixed(1),"%"]}),u.jsx("style",{children:`
        .resource-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .resource-title {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 20px 0;
          color: #111827;
        }

        .resource-usage {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .usage-bar {
          height: 12px;
          background: #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
        }

        .usage-fill {
          height: 100%;
          border-radius: 6px;
          transition: width 0.3s ease;
        }

        .usage-text {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #6b7280;
        }

        .usage-value {
          font-weight: 600;
          color: #111827;
        }

        .usage-capacity {
          color: #9ca3af;
        }

        .usage-percentage {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
        }
      `})]})}function b7({node:e,formatMemory:t}){const n=parseFloat(e.capacity.cpu),r=parseFloat(e.allocated.cpu),i=e.capacity.memory,a=parseFloat(i.replace(/[^\d.]/g,"")),s=i.replace(/[\d.]/g,"")==="Gi"?a*1024**3:a*1024**2,l=e.allocated.memory,c=parseFloat(l.replace(/[^\d.]/g,"")),f=l.replace(/[\d.]/g,"")==="Gi"?c*1024**3:c*1024**2;return u.jsxs("div",{className:"node-resource-card",children:[u.jsx("div",{className:"node-name",children:e.name}),u.jsxs("div",{className:"node-metrics",children:[u.jsx(Jj,{label:"CPU",used:r,capacity:n,unit:"cores"}),u.jsx(Jj,{label:"Memory",used:f,capacity:s,unit:"",formatValue:t})]}),u.jsx("style",{children:`
        .node-resource-card {
          background: #f9fafb;
          border-radius: 8px;
          padding: 16px;
        }

        .node-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 12px;
        }

        .node-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      `})]})}function Jj({label:e,used:t,capacity:n,unit:r,formatValue:i}){const a=n>0?t/n*100:0,o=i?i(t):t.toFixed(2),s=i?i(n):n.toFixed(2),l=i?"":r;return u.jsxs("div",{className:"metric-bar",children:[u.jsxs("div",{className:"metric-header",children:[u.jsx("span",{className:"metric-label",children:e}),u.jsxs("span",{className:"metric-value",children:[o," ",l]})]}),u.jsx("div",{className:"metric-progress",children:u.jsx("div",{className:"metric-fill",style:{width:`${a}%`}})}),u.jsxs("div",{className:"metric-capacity",children:["Capacity: ",s," ",l]}),u.jsx("style",{children:`
        .metric-bar {
          font-size: 12px;
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .metric-label {
          color: #6b7280;
        }

        .metric-value {
          font-weight: 600;
          color: #111827;
        }

        .metric-progress {
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          margin-bottom: 4px;
        }

        .metric-fill {
          height: 100%;
          background: #3b82f6;
          border-radius: 3px;
        }

        .metric-capacity {
          color: #9ca3af;
        }
      `})]})}function Jv({value:e,onChange:t,options:n,placeholder:r="Select...",disabled:i=!1,label:a,error:o,fullWidth:s=!1}){const[l,c]=v.useState(!1),d=v.useRef(null),f=n.find(y=>y.value===e);v.useEffect(()=>{const y=g=>{d.current&&!d.current.contains(g.target)&&c(!1)};return document.addEventListener("click",y),()=>document.removeEventListener("click",y)},[d]);const p=()=>{i||c(!l)},h=y=>{y.key==="Escape"&&c(!1)},m=`select ${o?"select-error":""} ${s?"select-full-width":""} ${l?"select-open":""}`;return u.jsxs("div",{className:"select-wrapper",children:[a&&u.jsx("label",{className:"select-label",children:a}),u.jsxs("div",{ref:d,className:m,onClick:p,onKeyDown:h,tabIndex:0,role:"combobox","aria-expanded":l,children:[u.jsxs("div",{className:"select-value",children:[f?f.label:r,u.jsx("span",{className:"select-arrow",children:"▼"})]}),l&&u.jsx("div",{className:"select-dropdown",role:"listbox",children:n.map(y=>u.jsx("div",{className:`select-option ${y.value===e?"select-option-selected":""}`,onClick:g=>{g.stopPropagation(),t(y.value),c(!1)},role:"option","aria-selected":y.value===e,children:y.label},y.value))})]}),o&&u.jsx("span",{className:"select-error-text",children:o})]})}function Q_(e){var t,n,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=Q_(e[t]))&&(r&&(r+=" "),r+=n)}else for(n in e)e[n]&&(r&&(r+=" "),r+=n);return r}function Ke(){for(var e,t,n=0,r="",i=arguments.length;n<i;n++)(e=arguments[n])&&(t=Q_(e))&&(r&&(r+=" "),r+=t);return r}var w7=["dangerouslySetInnerHTML","onCopy","onCopyCapture","onCut","onCutCapture","onPaste","onPasteCapture","onCompositionEnd","onCompositionEndCapture","onCompositionStart","onCompositionStartCapture","onCompositionUpdate","onCompositionUpdateCapture","onFocus","onFocusCapture","onBlur","onBlurCapture","onChange","onChangeCapture","onBeforeInput","onBeforeInputCapture","onInput","onInputCapture","onReset","onResetCapture","onSubmit","onSubmitCapture","onInvalid","onInvalidCapture","onLoad","onLoadCapture","onError","onErrorCapture","onKeyDown","onKeyDownCapture","onKeyPress","onKeyPressCapture","onKeyUp","onKeyUpCapture","onAbort","onAbortCapture","onCanPlay","onCanPlayCapture","onCanPlayThrough","onCanPlayThroughCapture","onDurationChange","onDurationChangeCapture","onEmptied","onEmptiedCapture","onEncrypted","onEncryptedCapture","onEnded","onEndedCapture","onLoadedData","onLoadedDataCapture","onLoadedMetadata","onLoadedMetadataCapture","onLoadStart","onLoadStartCapture","onPause","onPauseCapture","onPlay","onPlayCapture","onPlaying","onPlayingCapture","onProgress","onProgressCapture","onRateChange","onRateChangeCapture","onSeeked","onSeekedCapture","onSeeking","onSeekingCapture","onStalled","onStalledCapture","onSuspend","onSuspendCapture","onTimeUpdate","onTimeUpdateCapture","onVolumeChange","onVolumeChangeCapture","onWaiting","onWaitingCapture","onAuxClick","onAuxClickCapture","onClick","onClickCapture","onContextMenu","onContextMenuCapture","onDoubleClick","onDoubleClickCapture","onDrag","onDragCapture","onDragEnd","onDragEndCapture","onDragEnter","onDragEnterCapture","onDragExit","onDragExitCapture","onDragLeave","onDragLeaveCapture","onDragOver","onDragOverCapture","onDragStart","onDragStartCapture","onDrop","onDropCapture","onMouseDown","onMouseDownCapture","onMouseEnter","onMouseLeave","onMouseMove","onMouseMoveCapture","onMouseOut","onMouseOutCapture","onMouseOver","onMouseOverCapture","onMouseUp","onMouseUpCapture","onSelect","onSelectCapture","onTouchCancel","onTouchCancelCapture","onTouchEnd","onTouchEndCapture","onTouchMove","onTouchMoveCapture","onTouchStart","onTouchStartCapture","onPointerDown","onPointerDownCapture","onPointerMove","onPointerMoveCapture","onPointerUp","onPointerUpCapture","onPointerCancel","onPointerCancelCapture","onPointerEnter","onPointerEnterCapture","onPointerLeave","onPointerLeaveCapture","onPointerOver","onPointerOverCapture","onPointerOut","onPointerOutCapture","onGotPointerCapture","onGotPointerCaptureCapture","onLostPointerCapture","onLostPointerCaptureCapture","onScroll","onScrollCapture","onWheel","onWheelCapture","onAnimationStart","onAnimationStartCapture","onAnimationEnd","onAnimationEndCapture","onAnimationIteration","onAnimationIterationCapture","onTransitionEnd","onTransitionEndCapture"];function w0(e){if(typeof e!="string")return!1;var t=w7;return t.includes(e)}var j7=["aria-activedescendant","aria-atomic","aria-autocomplete","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colspan","aria-controls","aria-current","aria-describedby","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-modal","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext","className","color","height","id","lang","max","media","method","min","name","style","target","width","role","tabIndex","accentHeight","accumulate","additive","alignmentBaseline","allowReorder","alphabetic","amplitude","arabicForm","ascent","attributeName","attributeType","autoReverse","azimuth","baseFrequency","baselineShift","baseProfile","bbox","begin","bias","by","calcMode","capHeight","clip","clipPath","clipPathUnits","clipRule","colorInterpolation","colorInterpolationFilters","colorProfile","colorRendering","contentScriptType","contentStyleType","cursor","cx","cy","d","decelerate","descent","diffuseConstant","direction","display","divisor","dominantBaseline","dur","dx","dy","edgeMode","elevation","enableBackground","end","exponent","externalResourcesRequired","fill","fillOpacity","fillRule","filter","filterRes","filterUnits","floodColor","floodOpacity","focusable","fontFamily","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontWeight","format","from","fx","fy","g1","g2","glyphName","glyphOrientationHorizontal","glyphOrientationVertical","glyphRef","gradientTransform","gradientUnits","hanging","horizAdvX","horizOriginX","href","ideographic","imageRendering","in2","in","intercept","k1","k2","k3","k4","k","kernelMatrix","kernelUnitLength","kerning","keyPoints","keySplines","keyTimes","lengthAdjust","letterSpacing","lightingColor","limitingConeAngle","local","markerEnd","markerHeight","markerMid","markerStart","markerUnits","markerWidth","mask","maskContentUnits","maskUnits","mathematical","mode","numOctaves","offset","opacity","operator","order","orient","orientation","origin","overflow","overlinePosition","overlineThickness","paintOrder","panose1","pathLength","patternContentUnits","patternTransform","patternUnits","pointerEvents","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","r","radius","refX","refY","renderingIntent","repeatCount","repeatDur","requiredExtensions","requiredFeatures","restart","result","rotate","rx","ry","seed","shapeRendering","slope","spacing","specularConstant","specularExponent","speed","spreadMethod","startOffset","stdDeviation","stemh","stemv","stitchTiles","stopColor","stopOpacity","strikethroughPosition","strikethroughThickness","string","stroke","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeWidth","surfaceScale","systemLanguage","tableValues","targetX","targetY","textAnchor","textDecoration","textLength","textRendering","to","transform","u1","u2","underlinePosition","underlineThickness","unicode","unicodeBidi","unicodeRange","unitsPerEm","vAlphabetic","values","vectorEffect","version","vertAdvY","vertOriginX","vertOriginY","vHanging","vIdeographic","viewTarget","visibility","vMathematical","widths","wordSpacing","writingMode","x1","x2","x","xChannelSelector","xHeight","xlinkActuate","xlinkArcrole","xlinkHref","xlinkRole","xlinkShow","xlinkTitle","xlinkType","xmlBase","xmlLang","xmlns","xmlnsXlink","xmlSpace","y1","y2","y","yChannelSelector","z","zoomAndPan","ref","key","angle"],S7=new Set(j7);function X_(e){return typeof e!="string"?!1:S7.has(e)}function J_(e){return typeof e=="string"&&e.startsWith("data-")}function ui(e){if(typeof e!="object"||e===null)return{};var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(X_(n)||J_(n))&&(t[n]=e[n]);return t}function Ph(e){if(e==null)return null;if(v.isValidElement(e)&&typeof e.props=="object"&&e.props!==null){var t=e.props;return ui(t)}return typeof e=="object"&&!Array.isArray(e)?ui(e):null}function jn(e){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(X_(n)||J_(n)||w0(n))&&(t[n]=e[n]);return t}function k7(e){return e==null?null:v.isValidElement(e)?jn(e.props):typeof e=="object"&&!Array.isArray(e)?jn(e):null}var P7=["children","width","height","viewBox","className","style","title","desc"];function ey(){return ey=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ey.apply(null,arguments)}function C7(e,t){if(e==null)return{};var n,r,i=O7(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function O7(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var j0=v.forwardRef((e,t)=>{var{children:n,width:r,height:i,viewBox:a,className:o,style:s,title:l,desc:c}=e,d=C7(e,P7),f=a||{width:r,height:i,x:0,y:0},p=Ke("recharts-surface",o);return v.createElement("svg",ey({},jn(d),{className:p,width:r,height:i,style:s,viewBox:"".concat(f.x," ").concat(f.y," ").concat(f.width," ").concat(f.height),ref:t}),v.createElement("title",null,l),v.createElement("desc",null,c),n)}),E7=["children","className"];function ty(){return ty=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ty.apply(null,arguments)}function N7(e,t){if(e==null)return{};var n,r,i=_7(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function _7(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var Za=v.forwardRef((e,t)=>{var{children:n,className:r}=e,i=N7(e,E7),a=Ke("recharts-layer",r);return v.createElement("g",ty({className:a},jn(i),{ref:t}),n)}),e2=v.createContext(null),A7=()=>v.useContext(e2);function Ze(e){return function(){return e}}const t2=Math.cos,Xf=Math.sin,Hr=Math.sqrt,Jf=Math.PI,Ch=2*Jf,ny=Math.PI,ry=2*ny,ho=1e-6,T7=ry-ho;function n2(e){this._+=e[0];for(let t=1,n=e.length;t<n;++t)this._+=arguments[t]+e[t]}function R7(e){let t=Math.floor(e);if(!(t>=0))throw new Error(`invalid digits: ${e}`);if(t>15)return n2;const n=10**t;return function(r){this._+=r[0];for(let i=1,a=r.length;i<a;++i)this._+=Math.round(arguments[i]*n)/n+r[i]}}class M7{constructor(t){this._x0=this._y0=this._x1=this._y1=null,this._="",this._append=t==null?n2:R7(t)}moveTo(t,n){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+n}`}closePath(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._append`Z`)}lineTo(t,n){this._append`L${this._x1=+t},${this._y1=+n}`}quadraticCurveTo(t,n,r,i){this._append`Q${+t},${+n},${this._x1=+r},${this._y1=+i}`}bezierCurveTo(t,n,r,i,a,o){this._append`C${+t},${+n},${+r},${+i},${this._x1=+a},${this._y1=+o}`}arcTo(t,n,r,i,a){if(t=+t,n=+n,r=+r,i=+i,a=+a,a<0)throw new Error(`negative radius: ${a}`);let o=this._x1,s=this._y1,l=r-t,c=i-n,d=o-t,f=s-n,p=d*d+f*f;if(this._x1===null)this._append`M${this._x1=t},${this._y1=n}`;else if(p>ho)if(!(Math.abs(f*l-c*d)>ho)||!a)this._append`L${this._x1=t},${this._y1=n}`;else{let h=r-o,m=i-s,y=l*l+c*c,g=h*h+m*m,x=Math.sqrt(y),b=Math.sqrt(p),w=a*Math.tan((ny-Math.acos((y+p-g)/(2*x*b)))/2),j=w/b,k=w/x;Math.abs(j-1)>ho&&this._append`L${t+j*d},${n+j*f}`,this._append`A${a},${a},0,0,${+(f*h>d*m)},${this._x1=t+k*l},${this._y1=n+k*c}`}}arc(t,n,r,i,a,o){if(t=+t,n=+n,r=+r,o=!!o,r<0)throw new Error(`negative radius: ${r}`);let s=r*Math.cos(i),l=r*Math.sin(i),c=t+s,d=n+l,f=1^o,p=o?i-a:a-i;this._x1===null?this._append`M${c},${d}`:(Math.abs(this._x1-c)>ho||Math.abs(this._y1-d)>ho)&&this._append`L${c},${d}`,r&&(p<0&&(p=p%ry+ry),p>T7?this._append`A${r},${r},0,1,${f},${t-s},${n-l}A${r},${r},0,1,${f},${this._x1=c},${this._y1=d}`:p>ho&&this._append`A${r},${r},0,${+(p>=ny)},${f},${this._x1=t+r*Math.cos(a)},${this._y1=n+r*Math.sin(a)}`)}rect(t,n,r,i){this._append`M${this._x0=this._x1=+t},${this._y0=this._y1=+n}h${r=+r}v${+i}h${-r}Z`}toString(){return this._}}function S0(e){let t=3;return e.digits=function(n){if(!arguments.length)return t;if(n==null)t=null;else{const r=Math.floor(n);if(!(r>=0))throw new RangeError(`invalid digits: ${n}`);t=r}return e},()=>new M7(t)}function k0(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function r2(e){this._context=e}r2.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;default:this._context.lineTo(e,t);break}}};function Oh(e){return new r2(e)}function i2(e){return e[0]}function a2(e){return e[1]}function o2(e,t){var n=Ze(!0),r=null,i=Oh,a=null,o=S0(s);e=typeof e=="function"?e:e===void 0?i2:Ze(e),t=typeof t=="function"?t:t===void 0?a2:Ze(t);function s(l){var c,d=(l=k0(l)).length,f,p=!1,h;for(r==null&&(a=i(h=o())),c=0;c<=d;++c)!(c<d&&n(f=l[c],c,l))===p&&((p=!p)?a.lineStart():a.lineEnd()),p&&a.point(+e(f,c,l),+t(f,c,l));if(h)return a=null,h+""||null}return s.x=function(l){return arguments.length?(e=typeof l=="function"?l:Ze(+l),s):e},s.y=function(l){return arguments.length?(t=typeof l=="function"?l:Ze(+l),s):t},s.defined=function(l){return arguments.length?(n=typeof l=="function"?l:Ze(!!l),s):n},s.curve=function(l){return arguments.length?(i=l,r!=null&&(a=i(r)),s):i},s.context=function(l){return arguments.length?(l==null?r=a=null:a=i(r=l),s):r},s}function _d(e,t,n){var r=null,i=Ze(!0),a=null,o=Oh,s=null,l=S0(c);e=typeof e=="function"?e:e===void 0?i2:Ze(+e),t=typeof t=="function"?t:Ze(t===void 0?0:+t),n=typeof n=="function"?n:n===void 0?a2:Ze(+n);function c(f){var p,h,m,y=(f=k0(f)).length,g,x=!1,b,w=new Array(y),j=new Array(y);for(a==null&&(s=o(b=l())),p=0;p<=y;++p){if(!(p<y&&i(g=f[p],p,f))===x)if(x=!x)h=p,s.areaStart(),s.lineStart();else{for(s.lineEnd(),s.lineStart(),m=p-1;m>=h;--m)s.point(w[m],j[m]);s.lineEnd(),s.areaEnd()}x&&(w[p]=+e(g,p,f),j[p]=+t(g,p,f),s.point(r?+r(g,p,f):w[p],n?+n(g,p,f):j[p]))}if(b)return s=null,b+""||null}function d(){return o2().defined(i).curve(o).context(a)}return c.x=function(f){return arguments.length?(e=typeof f=="function"?f:Ze(+f),r=null,c):e},c.x0=function(f){return arguments.length?(e=typeof f=="function"?f:Ze(+f),c):e},c.x1=function(f){return arguments.length?(r=f==null?null:typeof f=="function"?f:Ze(+f),c):r},c.y=function(f){return arguments.length?(t=typeof f=="function"?f:Ze(+f),n=null,c):t},c.y0=function(f){return arguments.length?(t=typeof f=="function"?f:Ze(+f),c):t},c.y1=function(f){return arguments.length?(n=f==null?null:typeof f=="function"?f:Ze(+f),c):n},c.lineX0=c.lineY0=function(){return d().x(e).y(t)},c.lineY1=function(){return d().x(e).y(n)},c.lineX1=function(){return d().x(r).y(t)},c.defined=function(f){return arguments.length?(i=typeof f=="function"?f:Ze(!!f),c):i},c.curve=function(f){return arguments.length?(o=f,a!=null&&(s=o(a)),c):o},c.context=function(f){return arguments.length?(f==null?a=s=null:s=o(a=f),c):a},c}class s2{constructor(t,n){this._context=t,this._x=n}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(t,n){switch(t=+t,n=+n,this._point){case 0:{this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+t)/2,this._y0,this._x0,n,t,n):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+n)/2,t,this._y0,t,n);break}}this._x0=t,this._y0=n}}function D7(e){return new s2(e,!0)}function z7(e){return new s2(e,!1)}const P0={draw(e,t){const n=Hr(t/Jf);e.moveTo(n,0),e.arc(0,0,n,0,Ch)}},I7={draw(e,t){const n=Hr(t/5)/2;e.moveTo(-3*n,-n),e.lineTo(-n,-n),e.lineTo(-n,-3*n),e.lineTo(n,-3*n),e.lineTo(n,-n),e.lineTo(3*n,-n),e.lineTo(3*n,n),e.lineTo(n,n),e.lineTo(n,3*n),e.lineTo(-n,3*n),e.lineTo(-n,n),e.lineTo(-3*n,n),e.closePath()}},l2=Hr(1/3),$7=l2*2,L7={draw(e,t){const n=Hr(t/$7),r=n*l2;e.moveTo(0,-n),e.lineTo(r,0),e.lineTo(0,n),e.lineTo(-r,0),e.closePath()}},F7={draw(e,t){const n=Hr(t),r=-n/2;e.rect(r,r,n,n)}},U7=.8908130915292852,c2=Xf(Jf/10)/Xf(7*Jf/10),B7=Xf(Ch/10)*c2,W7=-t2(Ch/10)*c2,H7={draw(e,t){const n=Hr(t*U7),r=B7*n,i=W7*n;e.moveTo(0,-n),e.lineTo(r,i);for(let a=1;a<5;++a){const o=Ch*a/5,s=t2(o),l=Xf(o);e.lineTo(l*n,-s*n),e.lineTo(s*r-l*i,l*r+s*i)}e.closePath()}},lg=Hr(3),K7={draw(e,t){const n=-Hr(t/(lg*3));e.moveTo(0,n*2),e.lineTo(-lg*n,-n),e.lineTo(lg*n,-n),e.closePath()}},ir=-.5,ar=Hr(3)/2,iy=1/Hr(12),V7=(iy/2+1)*3,Z7={draw(e,t){const n=Hr(t/V7),r=n/2,i=n*iy,a=r,o=n*iy+n,s=-a,l=o;e.moveTo(r,i),e.lineTo(a,o),e.lineTo(s,l),e.lineTo(ir*r-ar*i,ar*r+ir*i),e.lineTo(ir*a-ar*o,ar*a+ir*o),e.lineTo(ir*s-ar*l,ar*s+ir*l),e.lineTo(ir*r+ar*i,ir*i-ar*r),e.lineTo(ir*a+ar*o,ir*o-ar*a),e.lineTo(ir*s+ar*l,ir*l-ar*s),e.closePath()}};function q7(e,t){let n=null,r=S0(i);e=typeof e=="function"?e:Ze(e||P0),t=typeof t=="function"?t:Ze(t===void 0?64:+t);function i(){let a;if(n||(n=a=r()),e.apply(this,arguments).draw(n,+t.apply(this,arguments)),a)return n=null,a+""||null}return i.type=function(a){return arguments.length?(e=typeof a=="function"?a:Ze(a),i):e},i.size=function(a){return arguments.length?(t=typeof a=="function"?a:Ze(+a),i):t},i.context=function(a){return arguments.length?(n=a??null,i):n},i}function ep(){}function tp(e,t,n){e._context.bezierCurveTo((2*e._x0+e._x1)/3,(2*e._y0+e._y1)/3,(e._x0+2*e._x1)/3,(e._y0+2*e._y1)/3,(e._x0+4*e._x1+t)/6,(e._y0+4*e._y1+n)/6)}function u2(e){this._context=e}u2.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:tp(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:tp(this,e,t);break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t}};function Y7(e){return new u2(e)}function d2(e){this._context=e}d2.prototype={areaStart:ep,areaEnd:ep,lineStart:function(){this._x0=this._x1=this._x2=this._x3=this._x4=this._y0=this._y1=this._y2=this._y3=this._y4=NaN,this._point=0},lineEnd:function(){switch(this._point){case 1:{this._context.moveTo(this._x2,this._y2),this._context.closePath();break}case 2:{this._context.moveTo((this._x2+2*this._x3)/3,(this._y2+2*this._y3)/3),this._context.lineTo((this._x3+2*this._x2)/3,(this._y3+2*this._y2)/3),this._context.closePath();break}case 3:{this.point(this._x2,this._y2),this.point(this._x3,this._y3),this.point(this._x4,this._y4);break}}},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._x2=e,this._y2=t;break;case 1:this._point=2,this._x3=e,this._y3=t;break;case 2:this._point=3,this._x4=e,this._y4=t,this._context.moveTo((this._x0+4*this._x1+e)/6,(this._y0+4*this._y1+t)/6);break;default:tp(this,e,t);break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t}};function G7(e){return new d2(e)}function f2(e){this._context=e}f2.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===3)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1;break;case 1:this._point=2;break;case 2:this._point=3;var n=(this._x0+4*this._x1+e)/6,r=(this._y0+4*this._y1+t)/6;this._line?this._context.lineTo(n,r):this._context.moveTo(n,r);break;case 3:this._point=4;default:tp(this,e,t);break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t}};function Q7(e){return new f2(e)}function p2(e){this._context=e}p2.prototype={areaStart:ep,areaEnd:ep,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(e,t){e=+e,t=+t,this._point?this._context.lineTo(e,t):(this._point=1,this._context.moveTo(e,t))}};function X7(e){return new p2(e)}function eS(e){return e<0?-1:1}function tS(e,t,n){var r=e._x1-e._x0,i=t-e._x1,a=(e._y1-e._y0)/(r||i<0&&-0),o=(n-e._y1)/(i||r<0&&-0),s=(a*i+o*r)/(r+i);return(eS(a)+eS(o))*Math.min(Math.abs(a),Math.abs(o),.5*Math.abs(s))||0}function nS(e,t){var n=e._x1-e._x0;return n?(3*(e._y1-e._y0)/n-t)/2:t}function cg(e,t,n){var r=e._x0,i=e._y0,a=e._x1,o=e._y1,s=(a-r)/3;e._context.bezierCurveTo(r+s,i+s*t,a-s,o-s*n,a,o)}function np(e){this._context=e}np.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:cg(this,this._t0,nS(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){var n=NaN;if(e=+e,t=+t,!(e===this._x1&&t===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;break;case 2:this._point=3,cg(this,nS(this,n=tS(this,e,t)),n);break;default:cg(this,this._t0,n=tS(this,e,t));break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t,this._t0=n}}};function h2(e){this._context=new m2(e)}(h2.prototype=Object.create(np.prototype)).point=function(e,t){np.prototype.point.call(this,t,e)};function m2(e){this._context=e}m2.prototype={moveTo:function(e,t){this._context.moveTo(t,e)},closePath:function(){this._context.closePath()},lineTo:function(e,t){this._context.lineTo(t,e)},bezierCurveTo:function(e,t,n,r,i,a){this._context.bezierCurveTo(t,e,r,n,a,i)}};function J7(e){return new np(e)}function eW(e){return new h2(e)}function g2(e){this._context=e}g2.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var e=this._x,t=this._y,n=e.length;if(n)if(this._line?this._context.lineTo(e[0],t[0]):this._context.moveTo(e[0],t[0]),n===2)this._context.lineTo(e[1],t[1]);else for(var r=rS(e),i=rS(t),a=0,o=1;o<n;++a,++o)this._context.bezierCurveTo(r[0][a],i[0][a],r[1][a],i[1][a],e[o],t[o]);(this._line||this._line!==0&&n===1)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(e,t){this._x.push(+e),this._y.push(+t)}};function rS(e){var t,n=e.length-1,r,i=new Array(n),a=new Array(n),o=new Array(n);for(i[0]=0,a[0]=2,o[0]=e[0]+2*e[1],t=1;t<n-1;++t)i[t]=1,a[t]=4,o[t]=4*e[t]+2*e[t+1];for(i[n-1]=2,a[n-1]=7,o[n-1]=8*e[n-1]+e[n],t=1;t<n;++t)r=i[t]/a[t-1],a[t]-=r,o[t]-=r*o[t-1];for(i[n-1]=o[n-1]/a[n-1],t=n-2;t>=0;--t)i[t]=(o[t]-i[t+1])/a[t];for(a[n-1]=(e[n]+i[n-1])/2,t=0;t<n-1;++t)a[t]=2*e[t+1]-i[t+1];return[i,a]}function tW(e){return new g2(e)}function Eh(e,t){this._context=e,this._t=t}Eh.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&this._point===2&&this._context.lineTo(this._x,this._y),(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;default:{if(this._t<=0)this._context.lineTo(this._x,t),this._context.lineTo(e,t);else{var n=this._x*(1-this._t)+e*this._t;this._context.lineTo(n,this._y),this._context.lineTo(n,t)}break}}this._x=e,this._y=t}};function nW(e){return new Eh(e,.5)}function rW(e){return new Eh(e,0)}function iW(e){return new Eh(e,1)}function Go(e,t){if((o=e.length)>1)for(var n=1,r,i,a=e[t[0]],o,s=a.length;n<o;++n)for(i=a,a=e[t[n]],r=0;r<s;++r)a[r][1]+=a[r][0]=isNaN(i[r][1])?i[r][0]:i[r][1]}function ay(e){for(var t=e.length,n=new Array(t);--t>=0;)n[t]=t;return n}function aW(e,t){return e[t]}function oW(e){const t=[];return t.key=e,t}function sW(){var e=Ze([]),t=ay,n=Go,r=aW;function i(a){var o=Array.from(e.apply(this,arguments),oW),s,l=o.length,c=-1,d;for(const f of a)for(s=0,++c;s<l;++s)(o[s][c]=[0,+r(f,o[s].key,c,a)]).data=f;for(s=0,d=k0(t(o));s<l;++s)o[d[s]].index=s;return n(o,d),o}return i.keys=function(a){return arguments.length?(e=typeof a=="function"?a:Ze(Array.from(a)),i):e},i.value=function(a){return arguments.length?(r=typeof a=="function"?a:Ze(+a),i):r},i.order=function(a){return arguments.length?(t=a==null?ay:typeof a=="function"?a:Ze(Array.from(a)),i):t},i.offset=function(a){return arguments.length?(n=a??Go,i):n},i}function lW(e,t){if((r=e.length)>0){for(var n,r,i=0,a=e[0].length,o;i<a;++i){for(o=n=0;n<r;++n)o+=e[n][i][1]||0;if(o)for(n=0;n<r;++n)e[n][i][1]/=o}Go(e,t)}}function cW(e,t){if((i=e.length)>0){for(var n=0,r=e[t[0]],i,a=r.length;n<a;++n){for(var o=0,s=0;o<i;++o)s+=e[o][n][1]||0;r[n][1]+=r[n][0]=-s/2}Go(e,t)}}function uW(e,t){if(!(!((o=e.length)>0)||!((a=(i=e[t[0]]).length)>0))){for(var n=0,r=1,i,a,o;r<a;++r){for(var s=0,l=0,c=0;s<o;++s){for(var d=e[t[s]],f=d[r][1]||0,p=d[r-1][1]||0,h=(f-p)/2,m=0;m<s;++m){var y=e[t[m]],g=y[r][1]||0,x=y[r-1][1]||0;h+=g-x}l+=f,c+=h*f}i[r-1][1]+=i[r-1][0]=n,l&&(n-=c/l)}i[r-1][1]+=i[r-1][0]=n,Go(e,t)}}var Nh={},v2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return n==="__proto__"}e.isUnsafeProperty=t})(v2);var C0={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){switch(typeof n){case"number":case"symbol":return!1;case"string":return n.includes(".")||n.includes("[")||n.includes("]")}}e.isDeepKey=t})(C0);var _h={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){var r;return typeof n=="string"||typeof n=="symbol"?n:Object.is((r=n==null?void 0:n.valueOf)==null?void 0:r.call(n),-0)?"-0":String(n)}e.toKey=t})(_h);var Ah={},y2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){if(n==null)return"";if(typeof n=="string")return n;if(Array.isArray(n))return n.map(t).join(",");const r=String(n);return r==="0"&&Object.is(Number(n),-0)?"-0":r}e.toString=t})(y2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=y2,n=_h;function r(i){if(Array.isArray(i))return i.map(n.toKey);if(typeof i=="symbol")return[i];i=t.toString(i);const a=[],o=i.length;if(o===0)return a;let s=0,l="",c="",d=!1;for(i.charCodeAt(0)===46&&(a.push(""),s++);s<o;){const f=i[s];c?f==="\\"&&s+1<o?(s++,l+=i[s]):f===c?c="":l+=f:d?f==='"'||f==="'"?c=f:f==="]"?(d=!1,a.push(l),l=""):l+=f:f==="["?(d=!0,l&&(a.push(l),l="")):f==="."?l&&(a.push(l),l=""):l+=f,s++}return l&&a.push(l),a}e.toPath=r})(Ah);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=v2,n=C0,r=_h,i=Ah;function a(s,l,c){if(s==null)return c;switch(typeof l){case"string":{if(t.isUnsafeProperty(l))return c;const d=s[l];return d===void 0?n.isDeepKey(l)?a(s,i.toPath(l),c):c:d}case"number":case"symbol":{typeof l=="number"&&(l=r.toKey(l));const d=s[l];return d===void 0?c:d}default:{if(Array.isArray(l))return o(s,l,c);if(Object.is(l==null?void 0:l.valueOf(),-0)?l="-0":l=String(l),t.isUnsafeProperty(l))return c;const d=s[l];return d===void 0?c:d}}}function o(s,l,c){if(l.length===0)return c;let d=s;for(let f=0;f<l.length;f++){if(d==null||t.isUnsafeProperty(l[f]))return c;d=d[l[f]]}return d===void 0?c:d}e.get=a})(Nh);var dW=Nh.get;const Th=Qi(dW);var fW=4;function Aa(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:fW,n=10**t,r=Math.round(e*n)/n;return Object.is(r,-0)?0:r}function mt(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return e.reduce((i,a,o)=>{var s=n[o-1];return typeof s=="string"?i+s+a:s!==void 0?i+Aa(s)+a:i+a},"")}var gr=e=>e===0?0:e>0?1:-1,Hi=e=>typeof e=="number"&&e!=+e,Qo=e=>typeof e=="string"&&e.indexOf("%")===e.length-1,ue=e=>(typeof e=="number"||e instanceof Number)&&!Hi(e),di=e=>ue(e)||typeof e=="string",pW=0,Gc=e=>{var t=++pW;return"".concat(e||"").concat(t)},qa=function(t,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,i=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(!ue(t)&&typeof t!="string")return r;var a;if(Qo(t)){if(n==null)return r;var o=t.indexOf("%");a=n*parseFloat(t.slice(0,o))/100}else a=+t;return Hi(a)&&(a=r),i&&n!=null&&a>n&&(a=n),a},x2=e=>{if(!Array.isArray(e))return!1;for(var t=e.length,n={},r=0;r<t;r++)if(!n[String(e[r])])n[String(e[r])]=!0;else return!0;return!1};function An(e,t,n){return ue(e)&&ue(t)?Aa(e+n*(t-e)):t}function b2(e,t,n){if(!(!e||!e.length))return e.find(r=>r&&(typeof t=="function"?t(r):Th(r,t))===n)}var Jt=e=>e===null||typeof e>"u",Ru=e=>Jt(e)?e:"".concat(e.charAt(0).toUpperCase()).concat(e.slice(1));function Mn(e){return e!=null}function Pl(){}var hW=["type","size","sizeType"];function oy(){return oy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},oy.apply(null,arguments)}function iS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function aS(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?iS(Object(n),!0).forEach(function(r){mW(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):iS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function mW(e,t,n){return(t=gW(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function gW(e){var t=vW(e,"string");return typeof t=="symbol"?t:t+""}function vW(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function yW(e,t){if(e==null)return{};var n,r,i=xW(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function xW(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var w2={symbolCircle:P0,symbolCross:I7,symbolDiamond:L7,symbolSquare:F7,symbolStar:H7,symbolTriangle:K7,symbolWye:Z7},bW=Math.PI/180,wW=e=>{var t="symbol".concat(Ru(e));return w2[t]||P0},jW=(e,t,n)=>{if(t==="area")return e;switch(n){case"cross":return 5*e*e/9;case"diamond":return .5*e*e/Math.sqrt(3);case"square":return e*e;case"star":{var r=18*bW;return 1.25*e*e*(Math.tan(r)-Math.tan(r*2)*Math.tan(r)**2)}case"triangle":return Math.sqrt(3)*e*e/4;case"wye":return(21-10*Math.sqrt(3))*e*e/8;default:return Math.PI*e*e/4}},SW=(e,t)=>{w2["symbol".concat(Ru(e))]=t},O0=e=>{var{type:t="circle",size:n=64,sizeType:r="area"}=e,i=yW(e,hW),a=aS(aS({},i),{},{type:t,size:n,sizeType:r}),o="circle";typeof t=="string"&&(o=t);var s=()=>{var p=wW(o),h=q7().type(p).size(jW(n,r,o)),m=h();if(m!==null)return m},{className:l,cx:c,cy:d}=a,f=jn(a);return ue(c)&&ue(d)&&ue(n)?v.createElement("path",oy({},f,{className:Ke("recharts-symbols",l),transform:"translate(".concat(c,", ").concat(d,")"),d:s()})):null};O0.registerSymbol=SW;var j2=e=>"radius"in e&&"startAngle"in e&&"endAngle"in e,E0=(e,t)=>{if(!e||typeof e=="function"||typeof e=="boolean")return null;var n=e;if(v.isValidElement(e)&&(n=e.props),typeof n!="object"&&typeof n!="function")return null;var r={};return Object.keys(n).forEach(i=>{w0(i)&&(r[i]=a=>n[i](n,a))}),r},kW=(e,t,n)=>r=>(e(t,n,r),null),S2=(e,t,n)=>{if(e===null||typeof e!="object"&&typeof e!="function")return null;var r=null;return Object.keys(e).forEach(i=>{var a=e[i];w0(i)&&typeof a=="function"&&(r||(r={}),r[i]=kW(a,t,n))}),r};function oS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function PW(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?oS(Object(n),!0).forEach(function(r){CW(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):oS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function CW(e,t,n){return(t=OW(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function OW(e){var t=EW(e,"string");return typeof t=="symbol"?t:t+""}function EW(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function fn(e,t){var n=PW({},e),r=t,i=Object.keys(t),a=i.reduce((o,s)=>(o[s]===void 0&&r[s]!==void 0&&(o[s]=r[s]),o),n);return a}function rp(){return rp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},rp.apply(null,arguments)}function sS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function NW(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?sS(Object(n),!0).forEach(function(r){_W(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):sS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function _W(e,t,n){return(t=AW(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function AW(e){var t=TW(e,"string");return typeof t=="symbol"?t:t+""}function TW(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var lr=32,RW={align:"center",iconSize:14,inactiveColor:"#ccc",layout:"horizontal",verticalAlign:"middle"};function MW(e){var{data:t,iconType:n,inactiveColor:r}=e,i=lr/2,a=lr/6,o=lr/3,s=t.inactive?r:t.color,l=n??t.type;if(l==="none")return null;if(l==="plainline"){var c;return v.createElement("line",{strokeWidth:4,fill:"none",stroke:s,strokeDasharray:(c=t.payload)===null||c===void 0?void 0:c.strokeDasharray,x1:0,y1:i,x2:lr,y2:i,className:"recharts-legend-icon"})}if(l==="line")return v.createElement("path",{strokeWidth:4,fill:"none",stroke:s,d:"M0,".concat(i,"h").concat(o,`
            A`).concat(a,",").concat(a,",0,1,1,").concat(2*o,",").concat(i,`
            H`).concat(lr,"M").concat(2*o,",").concat(i,`
            A`).concat(a,",").concat(a,",0,1,1,").concat(o,",").concat(i),className:"recharts-legend-icon"});if(l==="rect")return v.createElement("path",{stroke:"none",fill:s,d:"M0,".concat(lr/8,"h").concat(lr,"v").concat(lr*3/4,"h").concat(-lr,"z"),className:"recharts-legend-icon"});if(v.isValidElement(t.legendIcon)){var d=NW({},t);return delete d.legendIcon,v.cloneElement(t.legendIcon,d)}return v.createElement(O0,{fill:s,cx:i,cy:i,size:lr,sizeType:"diameter",type:l})}function DW(e){var{payload:t,iconSize:n,layout:r,formatter:i,inactiveColor:a,iconType:o}=e,s={x:0,y:0,width:lr,height:lr},l={display:r==="horizontal"?"inline-block":"block",marginRight:10},c={display:"inline-block",verticalAlign:"middle",marginRight:4};return t.map((d,f)=>{var p=d.formatter||i,h=Ke({"recharts-legend-item":!0,["legend-item-".concat(f)]:!0,inactive:d.inactive});if(d.type==="none")return null;var m=d.inactive?a:d.color,y=p?p(d.value,d,f):d.value;return v.createElement("li",rp({className:h,style:l,key:"legend-item-".concat(f)},S2(e,d,f)),v.createElement(j0,{width:n,height:n,viewBox:s,style:c,"aria-label":"".concat(y," legend icon")},v.createElement(MW,{data:d,iconType:o,inactiveColor:a})),v.createElement("span",{className:"recharts-legend-item-text",style:{color:m}},y))})}var zW=e=>{var t=fn(e,RW),{payload:n,layout:r,align:i}=t;if(!n||!n.length)return null;var a={padding:0,margin:0,textAlign:r==="horizontal"?i:"left"};return v.createElement("ul",{className:"recharts-default-legend",style:a},v.createElement(DW,rp({},t,{payload:n})))},k2={},P2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n,r){const i=new Map;for(let a=0;a<n.length;a++){const o=n[a],s=r(o,a,n);i.has(s)||i.set(s,o)}return Array.from(i.values())}e.uniqBy=t})(P2);var C2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n,r){return function(...i){return n.apply(this,i.slice(0,r))}}e.ary=t})(C2);var N0={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return n}e.identity=t})(N0);var O2={},Rh={},E2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return Number.isSafeInteger(n)&&n>=0}e.isLength=t})(E2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=E2;function n(r){return r!=null&&typeof r!="function"&&t.isLength(r.length)}e.isArrayLike=n})(Rh);var N2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return typeof n=="object"&&n!==null}e.isObjectLike=t})(N2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=Rh,n=N2;function r(i){return n.isObjectLike(i)&&t.isArrayLike(i)}e.isArrayLikeObject=r})(O2);var _2={},A2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=Nh;function n(r){return function(i){return t.get(i,r)}}e.property=n})(A2);var T2={},_0={},R2={},A0={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return n!==null&&(typeof n=="object"||typeof n=="function")}e.isObject=t})(A0);var T0={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return n==null||typeof n!="object"&&typeof n!="function"}e.isPrimitive=t})(T0);var R0={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n,r){return n===r||Number.isNaN(n)&&Number.isNaN(r)}e.isEqualsSameValueZero=t})(R0);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=A0,n=T0,r=R0;function i(d,f,p){return typeof p!="function"?i(d,f,()=>{}):a(d,f,function h(m,y,g,x,b,w){const j=p(m,y,g,x,b,w);return j!==void 0?!!j:a(m,y,h,w)},new Map)}function a(d,f,p,h){if(f===d)return!0;switch(typeof f){case"object":return o(d,f,p,h);case"function":return Object.keys(f).length>0?a(d,{...f},p,h):r.isEqualsSameValueZero(d,f);default:return t.isObject(d)?typeof f=="string"?f==="":!0:r.isEqualsSameValueZero(d,f)}}function o(d,f,p,h){if(f==null)return!0;if(Array.isArray(f))return l(d,f,p,h);if(f instanceof Map)return s(d,f,p,h);if(f instanceof Set)return c(d,f,p,h);const m=Object.keys(f);if(d==null||n.isPrimitive(d))return m.length===0;if(m.length===0)return!0;if(h!=null&&h.has(f))return h.get(f)===d;h==null||h.set(f,d);try{for(let y=0;y<m.length;y++){const g=m[y];if(!n.isPrimitive(d)&&!(g in d)||f[g]===void 0&&d[g]!==void 0||f[g]===null&&d[g]!==null||!p(d[g],f[g],g,d,f,h))return!1}return!0}finally{h==null||h.delete(f)}}function s(d,f,p,h){if(f.size===0)return!0;if(!(d instanceof Map))return!1;for(const[m,y]of f.entries()){const g=d.get(m);if(p(g,y,m,d,f,h)===!1)return!1}return!0}function l(d,f,p,h){if(f.length===0)return!0;if(!Array.isArray(d))return!1;const m=new Set;for(let y=0;y<f.length;y++){const g=f[y];let x=!1;for(let b=0;b<d.length;b++){if(m.has(b))continue;const w=d[b];let j=!1;if(p(w,g,y,d,f,h)&&(j=!0),j){m.add(b),x=!0;break}}if(!x)return!1}return!0}function c(d,f,p,h){return f.size===0?!0:d instanceof Set?l([...d],[...f],p,h):!1}e.isMatchWith=i,e.isSetMatch=c})(R2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=R2;function n(r,i){return t.isMatchWith(r,i,()=>{})}e.isMatch=n})(_0);var M2={},M0={},D2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return Object.getOwnPropertySymbols(n).filter(r=>Object.prototype.propertyIsEnumerable.call(n,r))}e.getSymbols=t})(D2);var Mh={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return n==null?n===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(n)}e.getTag=t})(Mh);var D0={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t="[object RegExp]",n="[object String]",r="[object Number]",i="[object Boolean]",a="[object Arguments]",o="[object Symbol]",s="[object Date]",l="[object Map]",c="[object Set]",d="[object Array]",f="[object Function]",p="[object ArrayBuffer]",h="[object Object]",m="[object Error]",y="[object DataView]",g="[object Uint8Array]",x="[object Uint8ClampedArray]",b="[object Uint16Array]",w="[object Uint32Array]",j="[object BigUint64Array]",k="[object Int8Array]",P="[object Int16Array]",S="[object Int32Array]",C="[object BigInt64Array]",N="[object Float32Array]",_="[object Float64Array]";e.argumentsTag=a,e.arrayBufferTag=p,e.arrayTag=d,e.bigInt64ArrayTag=C,e.bigUint64ArrayTag=j,e.booleanTag=i,e.dataViewTag=y,e.dateTag=s,e.errorTag=m,e.float32ArrayTag=N,e.float64ArrayTag=_,e.functionTag=f,e.int16ArrayTag=P,e.int32ArrayTag=S,e.int8ArrayTag=k,e.mapTag=l,e.numberTag=r,e.objectTag=h,e.regexpTag=t,e.setTag=c,e.stringTag=n,e.symbolTag=o,e.uint16ArrayTag=b,e.uint32ArrayTag=w,e.uint8ArrayTag=g,e.uint8ClampedArrayTag=x})(D0);var z2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}e.isTypedArray=t})(z2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=D2,n=Mh,r=D0,i=T0,a=z2;function o(d,f){return s(d,void 0,d,new Map,f)}function s(d,f,p,h=new Map,m=void 0){const y=m==null?void 0:m(d,f,p,h);if(y!==void 0)return y;if(i.isPrimitive(d))return d;if(h.has(d))return h.get(d);if(Array.isArray(d)){const g=new Array(d.length);h.set(d,g);for(let x=0;x<d.length;x++)g[x]=s(d[x],x,p,h,m);return Object.hasOwn(d,"index")&&(g.index=d.index),Object.hasOwn(d,"input")&&(g.input=d.input),g}if(d instanceof Date)return new Date(d.getTime());if(d instanceof RegExp){const g=new RegExp(d.source,d.flags);return g.lastIndex=d.lastIndex,g}if(d instanceof Map){const g=new Map;h.set(d,g);for(const[x,b]of d)g.set(x,s(b,x,p,h,m));return g}if(d instanceof Set){const g=new Set;h.set(d,g);for(const x of d)g.add(s(x,void 0,p,h,m));return g}if(typeof Buffer<"u"&&Buffer.isBuffer(d))return d.subarray();if(a.isTypedArray(d)){const g=new(Object.getPrototypeOf(d)).constructor(d.length);h.set(d,g);for(let x=0;x<d.length;x++)g[x]=s(d[x],x,p,h,m);return g}if(d instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&d instanceof SharedArrayBuffer)return d.slice(0);if(d instanceof DataView){const g=new DataView(d.buffer.slice(0),d.byteOffset,d.byteLength);return h.set(d,g),l(g,d,p,h,m),g}if(typeof File<"u"&&d instanceof File){const g=new File([d],d.name,{type:d.type});return h.set(d,g),l(g,d,p,h,m),g}if(typeof Blob<"u"&&d instanceof Blob){const g=new Blob([d],{type:d.type});return h.set(d,g),l(g,d,p,h,m),g}if(d instanceof Error){const g=new d.constructor;return h.set(d,g),g.message=d.message,g.name=d.name,g.stack=d.stack,g.cause=d.cause,l(g,d,p,h,m),g}if(d instanceof Boolean){const g=new Boolean(d.valueOf());return h.set(d,g),l(g,d,p,h,m),g}if(d instanceof Number){const g=new Number(d.valueOf());return h.set(d,g),l(g,d,p,h,m),g}if(d instanceof String){const g=new String(d.valueOf());return h.set(d,g),l(g,d,p,h,m),g}if(typeof d=="object"&&c(d)){const g=Object.create(Object.getPrototypeOf(d));return h.set(d,g),l(g,d,p,h,m),g}return d}function l(d,f,p=d,h,m){const y=[...Object.keys(f),...t.getSymbols(f)];for(let g=0;g<y.length;g++){const x=y[g],b=Object.getOwnPropertyDescriptor(d,x);(b==null||b.writable)&&(d[x]=s(f[x],x,p,h,m))}}function c(d){switch(n.getTag(d)){case r.argumentsTag:case r.arrayTag:case r.arrayBufferTag:case r.dataViewTag:case r.booleanTag:case r.dateTag:case r.float32ArrayTag:case r.float64ArrayTag:case r.int8ArrayTag:case r.int16ArrayTag:case r.int32ArrayTag:case r.mapTag:case r.numberTag:case r.objectTag:case r.regexpTag:case r.setTag:case r.stringTag:case r.symbolTag:case r.uint8ArrayTag:case r.uint8ClampedArrayTag:case r.uint16ArrayTag:case r.uint32ArrayTag:return!0;default:return!1}}e.cloneDeepWith=o,e.cloneDeepWithImpl=s,e.copyProperties=l})(M0);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=M0;function n(r){return t.cloneDeepWithImpl(r,void 0,r,new Map,void 0)}e.cloneDeep=n})(M2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=_0,n=M2;function r(i){return i=n.cloneDeep(i),a=>t.isMatch(a,i)}e.matches=r})(T2);var I2={},$2={},L2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=M0,n=Mh,r=D0;function i(a,o){return t.cloneDeepWith(a,(s,l,c,d)=>{const f=o==null?void 0:o(s,l,c,d);if(f!==void 0)return f;if(typeof a=="object"){if(n.getTag(a)===r.objectTag&&typeof a.constructor!="function"){const p={};return d.set(a,p),t.copyProperties(p,a,c,d),p}switch(Object.prototype.toString.call(a)){case r.numberTag:case r.stringTag:case r.booleanTag:{const p=new a.constructor(a==null?void 0:a.valueOf());return t.copyProperties(p,a),p}case r.argumentsTag:{const p={};return t.copyProperties(p,a),p.length=a.length,p[Symbol.iterator]=a[Symbol.iterator],p}default:return}}})}e.cloneDeepWith=i})(L2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=L2;function n(r){return t.cloneDeepWith(r)}e.cloneDeep=n})($2);var F2={},z0={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=/^(?:0|[1-9]\d*)$/;function n(r,i=Number.MAX_SAFE_INTEGER){switch(typeof r){case"number":return Number.isInteger(r)&&r>=0&&r<i;case"symbol":return!1;case"string":return t.test(r)}}e.isIndex=n})(z0);var U2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=Mh;function n(r){return r!==null&&typeof r=="object"&&t.getTag(r)==="[object Arguments]"}e.isArguments=n})(U2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=C0,n=z0,r=U2,i=Ah;function a(o,s){let l;if(Array.isArray(s)?l=s:typeof s=="string"&&t.isDeepKey(s)&&(o==null?void 0:o[s])==null?l=i.toPath(s):l=[s],l.length===0)return!1;let c=o;for(let d=0;d<l.length;d++){const f=l[d];if((c==null||!Object.hasOwn(c,f))&&!((Array.isArray(c)||r.isArguments(c))&&n.isIndex(f)&&f<c.length))return!1;c=c[f]}return!0}e.has=a})(F2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=_0,n=_h,r=$2,i=Nh,a=F2;function o(s,l){switch(typeof s){case"object":{Object.is(s==null?void 0:s.valueOf(),-0)&&(s="-0");break}case"number":{s=n.toKey(s);break}}return l=r.cloneDeep(l),function(c){const d=i.get(c,s);return d===void 0?a.has(c,s):l===void 0?d===void 0:t.isMatch(d,l)}}e.matchesProperty=o})(I2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=N0,n=A2,r=T2,i=I2;function a(o){if(o==null)return t.identity;switch(typeof o){case"function":return o;case"object":return Array.isArray(o)&&o.length===2?i.matchesProperty(o[0],o[1]):r.matches(o);case"string":case"symbol":case"number":return n.property(o)}}e.iteratee=a})(_2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=P2,n=C2,r=N0,i=O2,a=_2;function o(s,l=r.identity){return i.isArrayLikeObject(s)?t.uniqBy(Array.from(s),n.ary(a.iteratee(l),1)):[]}e.uniqBy=o})(k2);var IW=k2.uniqBy;const lS=Qi(IW);function B2(e,t,n){return t===!0?lS(e,n):typeof t=="function"?lS(e,t):e}var W2={exports:{}},H2={},K2={exports:{}},V2={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dl=v;function $W(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var LW=typeof Object.is=="function"?Object.is:$W,FW=dl.useState,UW=dl.useEffect,BW=dl.useLayoutEffect,WW=dl.useDebugValue;function HW(e,t){var n=t(),r=FW({inst:{value:n,getSnapshot:t}}),i=r[0].inst,a=r[1];return BW(function(){i.value=n,i.getSnapshot=t,ug(i)&&a({inst:i})},[e,n,t]),UW(function(){return ug(i)&&a({inst:i}),e(function(){ug(i)&&a({inst:i})})},[e]),WW(n),n}function ug(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!LW(e,n)}catch{return!0}}function KW(e,t){return t()}var VW=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?KW:HW;V2.useSyncExternalStore=dl.useSyncExternalStore!==void 0?dl.useSyncExternalStore:VW;K2.exports=V2;var ZW=K2.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Dh=v,qW=ZW;function YW(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var GW=typeof Object.is=="function"?Object.is:YW,QW=qW.useSyncExternalStore,XW=Dh.useRef,JW=Dh.useEffect,e9=Dh.useMemo,t9=Dh.useDebugValue;H2.useSyncExternalStoreWithSelector=function(e,t,n,r,i){var a=XW(null);if(a.current===null){var o={hasValue:!1,value:null};a.current=o}else o=a.current;a=e9(function(){function l(h){if(!c){if(c=!0,d=h,h=r(h),i!==void 0&&o.hasValue){var m=o.value;if(i(m,h))return f=m}return f=h}if(m=f,GW(d,h))return m;var y=r(h);return i!==void 0&&i(m,y)?(d=h,m):(d=h,f=y)}var c=!1,d,f,p=n===void 0?null:n;return[function(){return l(t())},p===null?void 0:function(){return l(p())}]},[t,n,r,i]);var s=QW(e,a[0],a[1]);return JW(function(){o.hasValue=!0,o.value=s},[s]),t9(s),s};W2.exports=H2;var n9=W2.exports,I0=v.createContext(null),r9=e=>e,Ot=()=>{var e=v.useContext(I0);return e?e.store.dispatch:r9},ff=()=>{},i9=()=>ff,a9=(e,t)=>e===t;function ve(e){var t=v.useContext(I0),n=v.useMemo(()=>t?r=>{if(r!=null)return e(r)}:ff,[t,e]);return n9.useSyncExternalStoreWithSelector(t?t.subscription.addNestedSub:i9,t?t.store.getState:ff,t?t.store.getState:ff,n,a9)}function o9(e,t=`expected a function, instead received ${typeof e}`){if(typeof e!="function")throw new TypeError(t)}function s9(e,t=`expected an object, instead received ${typeof e}`){if(typeof e!="object")throw new TypeError(t)}function l9(e,t="expected all items to be functions, instead received the following types: "){if(!e.every(n=>typeof n=="function")){const n=e.map(r=>typeof r=="function"?`function ${r.name||"unnamed"}()`:typeof r).join(", ");throw new TypeError(`${t}[${n}]`)}}var cS=e=>Array.isArray(e)?e:[e];function c9(e){const t=Array.isArray(e[0])?e[0]:e;return l9(t,"createSelector expects all input-selectors to be functions, but received the following types: "),t}function u9(e,t){const n=[],{length:r}=e;for(let i=0;i<r;i++)n.push(e[i].apply(null,t));return n}var d9=class{constructor(e){this.value=e}deref(){return this.value}},f9=typeof WeakRef<"u"?WeakRef:d9,p9=0,uS=1;function Ad(){return{s:p9,v:void 0,o:null,p:null}}function Z2(e,t={}){let n=Ad();const{resultEqualityCheck:r}=t;let i,a=0;function o(){var f;let s=n;const{length:l}=arguments;for(let p=0,h=l;p<h;p++){const m=arguments[p];if(typeof m=="function"||typeof m=="object"&&m!==null){let y=s.o;y===null&&(s.o=y=new WeakMap);const g=y.get(m);g===void 0?(s=Ad(),y.set(m,s)):s=g}else{let y=s.p;y===null&&(s.p=y=new Map);const g=y.get(m);g===void 0?(s=Ad(),y.set(m,s)):s=g}}const c=s;let d;if(s.s===uS)d=s.v;else if(d=e.apply(null,arguments),a++,r){const p=((f=i==null?void 0:i.deref)==null?void 0:f.call(i))??i;p!=null&&r(p,d)&&(d=p,a!==0&&a--),i=typeof d=="object"&&d!==null||typeof d=="function"?new f9(d):d}return c.s=uS,c.v=d,d}return o.clearCache=()=>{n=Ad(),o.resetResultsCount()},o.resultsCount=()=>a,o.resetResultsCount=()=>{a=0},o}function h9(e,...t){const n=typeof e=="function"?{memoize:e,memoizeOptions:t}:e,r=(...i)=>{let a=0,o=0,s,l={},c=i.pop();typeof c=="object"&&(l=c,c=i.pop()),o9(c,`createSelector expects an output function after the inputs, but received: [${typeof c}]`);const d={...n,...l},{memoize:f,memoizeOptions:p=[],argsMemoize:h=Z2,argsMemoizeOptions:m=[]}=d,y=cS(p),g=cS(m),x=c9(i),b=f(function(){return a++,c.apply(null,arguments)},...y),w=h(function(){o++;const k=u9(x,arguments);return s=b.apply(null,k),s},...g);return Object.assign(w,{resultFunc:c,memoizedResultFunc:b,dependencies:x,dependencyRecomputations:()=>o,resetDependencyRecomputations:()=>{o=0},lastResult:()=>s,recomputations:()=>a,resetRecomputations:()=>{a=0},memoize:f,argsMemoize:h})};return Object.assign(r,{withTypes:()=>r}),r}var I=h9(Z2),m9=Object.assign((e,t=I)=>{s9(e,`createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`);const n=Object.keys(e),r=n.map(a=>e[a]);return t(r,(...a)=>a.reduce((o,s,l)=>(o[n[l]]=s,o),{}))},{withTypes:()=>m9}),q2={},Y2={},G2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(r){return typeof r=="symbol"?1:r===null?2:r===void 0?3:r!==r?4:0}const n=(r,i,a)=>{if(r!==i){const o=t(r),s=t(i);if(o===s&&o===0){if(r<i)return a==="desc"?1:-1;if(r>i)return a==="desc"?-1:1}return a==="desc"?s-o:o-s}return 0};e.compareValues=n})(G2);var Q2={},$0={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return typeof n=="symbol"||n instanceof Symbol}e.isSymbol=t})($0);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=$0,n=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,r=/^\w*$/;function i(a,o){return Array.isArray(a)?!1:typeof a=="number"||typeof a=="boolean"||a==null||t.isSymbol(a)?!0:typeof a=="string"&&(r.test(a)||!n.test(a))||o!=null&&Object.hasOwn(o,a)}e.isKey=i})(Q2);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=G2,n=Q2,r=Ah;function i(a,o,s,l){if(a==null)return[];s=l?void 0:s,Array.isArray(a)||(a=Object.values(a)),Array.isArray(o)||(o=o==null?[null]:[o]),o.length===0&&(o=[null]),Array.isArray(s)||(s=s==null?[]:[s]),s=s.map(h=>String(h));const c=(h,m)=>{let y=h;for(let g=0;g<m.length&&y!=null;++g)y=y[m[g]];return y},d=(h,m)=>m==null||h==null?m:typeof h=="object"&&"key"in h?Object.hasOwn(m,h.key)?m[h.key]:c(m,h.path):typeof h=="function"?h(m):Array.isArray(h)?c(m,h):typeof m=="object"?m[h]:m,f=o.map(h=>(Array.isArray(h)&&h.length===1&&(h=h[0]),h==null||typeof h=="function"||Array.isArray(h)||n.isKey(h)?h:{key:h,path:r.toPath(h)}));return a.map(h=>({original:h,criteria:f.map(m=>d(m,h))})).slice().sort((h,m)=>{for(let y=0;y<f.length;y++){const g=t.compareValues(h.criteria[y],m.criteria[y],s[y]);if(g!==0)return g}return 0}).map(h=>h.original)}e.orderBy=i})(Y2);var X2={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n,r=1){const i=[],a=Math.floor(r),o=(s,l)=>{for(let c=0;c<s.length;c++){const d=s[c];Array.isArray(d)&&l<a?o(d,l+1):i.push(d)}};return o(n,0),i}e.flatten=t})(X2);var L0={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=z0,n=Rh,r=A0,i=R0;function a(o,s,l){return r.isObject(l)&&(typeof s=="number"&&n.isArrayLike(l)&&t.isIndex(s)&&s<l.length||typeof s=="string"&&s in l)?i.isEqualsSameValueZero(l[s],o):!1}e.isIterateeCall=a})(L0);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=Y2,n=X2,r=L0;function i(a,...o){const s=o.length;return s>1&&r.isIterateeCall(a,o[0],o[1])?o=[]:s>2&&r.isIterateeCall(o[0],o[1],o[2])&&(o=[o[0]]),t.orderBy(a,n.flatten(o),["asc"])}e.sortBy=i})(q2);var g9=q2.sortBy;const zh=Qi(g9);var J2=e=>e.legend.settings,v9=e=>e.legend.size,y9=e=>e.legend.payload,x9=I([y9,J2],(e,t)=>{var{itemSorter:n}=t,r=e.flat(1);return n?zh(r,n):r});function b9(){return ve(x9)}var Td=1;function eA(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],[t,n]=v.useState({height:0,left:0,top:0,width:0}),r=v.useCallback(i=>{if(i!=null){var a=i.getBoundingClientRect(),o={height:a.height,left:a.left,top:a.top,width:a.width};(Math.abs(o.height-t.height)>Td||Math.abs(o.left-t.left)>Td||Math.abs(o.top-t.top)>Td||Math.abs(o.width-t.width)>Td)&&n({height:o.height,left:o.left,top:o.top,width:o.width})}},[t.width,t.height,t.top,t.left,...e]);return[t,r]}function Kt(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var w9=typeof Symbol=="function"&&Symbol.observable||"@@observable",dS=w9,dg=()=>Math.random().toString(36).substring(7).split("").join("."),j9={INIT:`@@redux/INIT${dg()}`,REPLACE:`@@redux/REPLACE${dg()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${dg()}`},ip=j9;function F0(e){if(typeof e!="object"||e===null)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function tA(e,t,n){if(typeof e!="function")throw new Error(Kt(2));if(typeof t=="function"&&typeof n=="function"||typeof n=="function"&&typeof arguments[3]=="function")throw new Error(Kt(0));if(typeof t=="function"&&typeof n>"u"&&(n=t,t=void 0),typeof n<"u"){if(typeof n!="function")throw new Error(Kt(1));return n(tA)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,l=!1;function c(){o===a&&(o=new Map,a.forEach((g,x)=>{o.set(x,g)}))}function d(){if(l)throw new Error(Kt(3));return i}function f(g){if(typeof g!="function")throw new Error(Kt(4));if(l)throw new Error(Kt(5));let x=!0;c();const b=s++;return o.set(b,g),function(){if(x){if(l)throw new Error(Kt(6));x=!1,c(),o.delete(b),a=null}}}function p(g){if(!F0(g))throw new Error(Kt(7));if(typeof g.type>"u")throw new Error(Kt(8));if(typeof g.type!="string")throw new Error(Kt(17));if(l)throw new Error(Kt(9));try{l=!0,i=r(i,g)}finally{l=!1}return(a=o).forEach(b=>{b()}),g}function h(g){if(typeof g!="function")throw new Error(Kt(10));r=g,p({type:ip.REPLACE})}function m(){const g=f;return{subscribe(x){if(typeof x!="object"||x===null)throw new Error(Kt(11));function b(){const j=x;j.next&&j.next(d())}return b(),{unsubscribe:g(b)}},[dS](){return this}}}return p({type:ip.INIT}),{dispatch:p,subscribe:f,getState:d,replaceReducer:h,[dS]:m}}function S9(e){Object.keys(e).forEach(t=>{const n=e[t];if(typeof n(void 0,{type:ip.INIT})>"u")throw new Error(Kt(12));if(typeof n(void 0,{type:ip.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(Kt(13))})}function nA(e){const t=Object.keys(e),n={};for(let a=0;a<t.length;a++){const o=t[a];typeof e[o]=="function"&&(n[o]=e[o])}const r=Object.keys(n);let i;try{S9(n)}catch(a){i=a}return function(o={},s){if(i)throw i;let l=!1;const c={};for(let d=0;d<r.length;d++){const f=r[d],p=n[f],h=o[f],m=p(h,s);if(typeof m>"u")throw s&&s.type,new Error(Kt(14));c[f]=m,l=l||m!==h}return l=l||r.length!==Object.keys(o).length,l?c:o}}function ap(...e){return e.length===0?t=>t:e.length===1?e[0]:e.reduce((t,n)=>(...r)=>t(n(...r)))}function k9(...e){return t=>(n,r)=>{const i=t(n,r);let a=()=>{throw new Error(Kt(15))};const o={getState:i.getState,dispatch:(l,...c)=>a(l,...c)},s=e.map(l=>l(o));return a=ap(...s)(i.dispatch),{...i,dispatch:a}}}function rA(e){return F0(e)&&"type"in e&&typeof e.type=="string"}var iA=Symbol.for("immer-nothing"),fS=Symbol.for("immer-draftable"),Sn=Symbol.for("immer-state");function Mr(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var Yn=Object,fl=Yn.getPrototypeOf,op="constructor",Ih="prototype",sy="configurable",sp="enumerable",pf="writable",Qc="value",Ki=e=>!!e&&!!e[Sn];function Ur(e){var t;return e?aA(e)||Lh(e)||!!e[fS]||!!((t=e[op])!=null&&t[fS])||Fh(e)||Uh(e):!1}var P9=Yn[Ih][op].toString(),pS=new WeakMap;function aA(e){if(!e||!U0(e))return!1;const t=fl(e);if(t===null||t===Yn[Ih])return!0;const n=Yn.hasOwnProperty.call(t,op)&&t[op];if(n===Object)return!0;if(!gs(n))return!1;let r=pS.get(n);return r===void 0&&(r=Function.toString.call(n),pS.set(n,r)),r===P9}function $h(e,t,n=!0){Mu(e)===0?(n?Reflect.ownKeys(e):Yn.keys(e)).forEach(i=>{t(i,e[i],e)}):e.forEach((r,i)=>t(i,r,e))}function Mu(e){const t=e[Sn];return t?t.type_:Lh(e)?1:Fh(e)?2:Uh(e)?3:0}var hS=(e,t,n=Mu(e))=>n===2?e.has(t):Yn[Ih].hasOwnProperty.call(e,t),ly=(e,t,n=Mu(e))=>n===2?e.get(t):e[t],lp=(e,t,n,r=Mu(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function C9(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}var Lh=Array.isArray,Fh=e=>e instanceof Map,Uh=e=>e instanceof Set,U0=e=>typeof e=="object",gs=e=>typeof e=="function",fg=e=>typeof e=="boolean";function O9(e){const t=+e;return Number.isInteger(t)&&String(t)===e}var Ci=e=>e.copy_||e.base_,B0=e=>e.modified_?e.copy_:e.base_;function cy(e,t){if(Fh(e))return new Map(e);if(Uh(e))return new Set(e);if(Lh(e))return Array[Ih].slice.call(e);const n=aA(e);if(t===!0||t==="class_only"&&!n){const r=Yn.getOwnPropertyDescriptors(e);delete r[Sn];let i=Reflect.ownKeys(r);for(let a=0;a<i.length;a++){const o=i[a],s=r[o];s[pf]===!1&&(s[pf]=!0,s[sy]=!0),(s.get||s.set)&&(r[o]={[sy]:!0,[pf]:!0,[sp]:s[sp],[Qc]:e[o]})}return Yn.create(fl(e),r)}else{const r=fl(e);if(r!==null&&n)return{...e};const i=Yn.create(r);return Yn.assign(i,e)}}function W0(e,t=!1){return Bh(e)||Ki(e)||!Ur(e)||(Mu(e)>1&&Yn.defineProperties(e,{set:Rd,add:Rd,clear:Rd,delete:Rd}),Yn.freeze(e),t&&$h(e,(n,r)=>{W0(r,!0)},!1)),e}function E9(){Mr(2)}var Rd={[Qc]:E9};function Bh(e){return e===null||!U0(e)?!0:Yn.isFrozen(e)}var cp="MapSet",uy="Patches",mS="ArrayMethods",oA={};function Xo(e){const t=oA[e];return t||Mr(0,e),t}var gS=e=>!!oA[e],Xc,sA=()=>Xc,N9=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:gS(cp)?Xo(cp):void 0,arrayMethodsPlugin_:gS(mS)?Xo(mS):void 0});function vS(e,t){t&&(e.patchPlugin_=Xo(uy),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function dy(e){fy(e),e.drafts_.forEach(_9),e.drafts_=null}function fy(e){e===Xc&&(Xc=e.parent_)}var yS=e=>Xc=N9(Xc,e);function _9(e){const t=e[Sn];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function xS(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];if(e!==void 0&&e!==n){n[Sn].modified_&&(dy(t),Mr(4)),Ur(e)&&(e=bS(t,e));const{patchPlugin_:i}=t;i&&i.generateReplacementPatches_(n[Sn].base_,e,t)}else e=bS(t,n);return A9(t,e,!0),dy(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==iA?e:void 0}function bS(e,t){if(Bh(t))return t;const n=t[Sn];if(!n)return up(t,e.handledSet_,e);if(!Wh(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){const{callbacks_:r}=n;if(r)for(;r.length>0;)r.pop()(e);uA(n,e)}return n.copy_}function A9(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&W0(t,n)}function lA(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Wh=(e,t)=>e.scope_===t,T9=[];function cA(e,t,n,r){const i=Ci(e),a=e.type_;if(r!==void 0&&ly(i,r,a)===t){lp(i,r,n,a);return}if(!e.draftLocations_){const s=e.draftLocations_=new Map;$h(i,(l,c)=>{if(Ki(c)){const d=s.get(c)||[];d.push(l),s.set(c,d)}})}const o=e.draftLocations_.get(t)??T9;for(const s of o)lp(i,s,n,a)}function R9(e,t,n){e.callbacks_.push(function(i){var s;const a=t;if(!a||!Wh(a,i))return;(s=i.mapSetPlugin_)==null||s.fixSetContents(a);const o=B0(a);cA(e,a.draft_??a,o,n),uA(a,i)})}function uA(e,t){var r;if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(((r=e.assigned_)==null?void 0:r.size)??0)>0)){const{patchPlugin_:i}=t;if(i){const a=i.getPath(e);a&&i.generatePatches_(e,a,t)}lA(e)}}function M9(e,t,n){const{scope_:r}=e;if(Ki(n)){const i=n[Sn];Wh(i,r)&&i.callbacks_.push(function(){hf(e);const o=B0(i);cA(e,n,o,t)})}else Ur(n)&&e.callbacks_.push(function(){const a=Ci(e);e.type_===3?a.has(n)&&up(n,r.handledSet_,r):ly(a,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&up(ly(e.copy_,t,e.type_),r.handledSet_,r)})}function up(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||Ki(e)||t.has(e)||!Ur(e)||Bh(e)||(t.add(e),$h(e,(r,i)=>{if(Ki(i)){const a=i[Sn];if(Wh(a,n)){const o=B0(a);lp(e,r,o,e.type_),lA(a)}}else Ur(i)&&up(i,t,n)})),e}function D9(e,t){const n=Lh(e),r={type_:n?1:0,scope_:t?t.scope_:sA(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0};let i=r,a=dp;n&&(i=[r],a=Jc);const{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var dp={get(e,t){if(t===Sn)return e;let n=e.scope_.arrayMethodsPlugin_;const r=e.type_===1&&typeof t=="string";if(r&&n!=null&&n.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);const i=Ci(e);if(!hS(i,t,e.type_))return z9(e,i,t);const a=i[t];if(e.finalized_||!Ur(a)||r&&e.operationMethod&&(n!=null&&n.isMutatingArrayMethod(e.operationMethod))&&O9(t))return a;if(a===pg(e.base_,t)){hf(e);const o=e.type_===1?+t:t,s=hy(e.scope_,a,e,o);return e.copy_[o]=s}return a},has(e,t){return t in Ci(e)},ownKeys(e){return Reflect.ownKeys(Ci(e))},set(e,t,n){const r=dA(Ci(e),t);if(r!=null&&r.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){const i=pg(Ci(e),t),a=i==null?void 0:i[Sn];if(a&&a.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(C9(n,i)&&(n!==void 0||hS(e.base_,t,e.type_)))return!0;hf(e),py(e)}return e.copy_[t]===n&&(n!==void 0||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_.set(t,!0),M9(e,t,n)),!0},deleteProperty(e,t){return hf(e),pg(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),py(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const n=Ci(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[pf]:!0,[sy]:e.type_!==1||t!=="length",[sp]:r[sp],[Qc]:n[t]}},defineProperty(){Mr(11)},getPrototypeOf(e){return fl(e.base_)},setPrototypeOf(){Mr(12)}},Jc={};for(let e in dp){let t=dp[e];Jc[e]=function(){const n=arguments;return n[0]=n[0][0],t.apply(this,n)}}Jc.deleteProperty=function(e,t){return Jc.set.call(this,e,t,void 0)};Jc.set=function(e,t,n){return dp.set.call(this,e[0],t,n,e[0])};function pg(e,t){const n=e[Sn];return(n?Ci(n):e)[t]}function z9(e,t,n){var i;const r=dA(t,n);return r?Qc in r?r[Qc]:(i=r.get)==null?void 0:i.call(e.draft_):void 0}function dA(e,t){if(!(t in e))return;let n=fl(e);for(;n;){const r=Object.getOwnPropertyDescriptor(n,t);if(r)return r;n=fl(n)}}function py(e){e.modified_||(e.modified_=!0,e.parent_&&py(e.parent_))}function hf(e){e.copy_||(e.assigned_=new Map,e.copy_=cy(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var I9=class{constructor(t){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(n,r,i)=>{if(gs(n)&&!gs(r)){const o=r;r=n;const s=this;return function(c=o,...d){return s.produce(c,f=>r.call(this,f,...d))}}gs(r)||Mr(6),i!==void 0&&!gs(i)&&Mr(7);let a;if(Ur(n)){const o=yS(this),s=hy(o,n,void 0);let l=!0;try{a=r(s),l=!1}finally{l?dy(o):fy(o)}return vS(o,i),xS(a,o)}else if(!n||!U0(n)){if(a=r(n),a===void 0&&(a=n),a===iA&&(a=void 0),this.autoFreeze_&&W0(a,!0),i){const o=[],s=[];Xo(uy).generateReplacementPatches_(n,a,{patches_:o,inversePatches_:s}),i(o,s)}return a}else Mr(1,n)},this.produceWithPatches=(n,r)=>{if(gs(n))return(s,...l)=>this.produceWithPatches(s,c=>n(c,...l));let i,a;return[this.produce(n,r,(s,l)=>{i=s,a=l}),i,a]},fg(t==null?void 0:t.autoFreeze)&&this.setAutoFreeze(t.autoFreeze),fg(t==null?void 0:t.useStrictShallowCopy)&&this.setUseStrictShallowCopy(t.useStrictShallowCopy),fg(t==null?void 0:t.useStrictIteration)&&this.setUseStrictIteration(t.useStrictIteration)}createDraft(t){Ur(t)||Mr(8),Ki(t)&&(t=Lr(t));const n=yS(this),r=hy(n,t,void 0);return r[Sn].isManual_=!0,fy(n),r}finishDraft(t,n){const r=t&&t[Sn];(!r||!r.isManual_)&&Mr(9);const{scope_:i}=r;return vS(i,n),xS(void 0,i)}setAutoFreeze(t){this.autoFreeze_=t}setUseStrictShallowCopy(t){this.useStrictShallowCopy_=t}setUseStrictIteration(t){this.useStrictIteration_=t}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(t,n){let r;for(r=n.length-1;r>=0;r--){const a=n[r];if(a.path.length===0&&a.op==="replace"){t=a.value;break}}r>-1&&(n=n.slice(r+1));const i=Xo(uy).applyPatches_;return Ki(t)?i(t,n):this.produce(t,a=>i(a,n))}};function hy(e,t,n,r){const[i,a]=Fh(t)?Xo(cp).proxyMap_(t,n):Uh(t)?Xo(cp).proxySet_(t,n):D9(t,n);return((n==null?void 0:n.scope_)??sA()).drafts_.push(i),a.callbacks_=(n==null?void 0:n.callbacks_)??[],a.key_=r,n&&r!==void 0?R9(n,a,r):a.callbacks_.push(function(l){var d;(d=l.mapSetPlugin_)==null||d.fixSetContents(a);const{patchPlugin_:c}=l;a.modified_&&c&&c.generatePatches_(a,[],l)}),i}function Lr(e){return Ki(e)||Mr(10,e),fA(e)}function fA(e){if(!Ur(e)||Bh(e))return e;const t=e[Sn];let n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=cy(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=cy(e,!0);return $h(n,(i,a)=>{lp(n,i,fA(a))},r),t&&(t.finalized_=!1),n}var $9=new I9,pA=$9.produce;function hA(e){return({dispatch:n,getState:r})=>i=>a=>typeof a=="function"?a(n,r,e):i(a)}var L9=hA(),F9=hA,U9=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?ap:ap.apply(null,arguments)};function jr(e,t){function n(...r){if(t){let i=t(...r);if(!i)throw new Error(Qn(0));return{type:e,payload:i.payload,..."meta"in i&&{meta:i.meta},..."error"in i&&{error:i.error}}}return{type:e,payload:r[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=r=>rA(r)&&r.type===e,n}var mA=class hc extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,hc.prototype)}static get[Symbol.species](){return hc}concat(...t){return super.concat.apply(this,t)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new hc(...t[0].concat(this)):new hc(...t.concat(this))}};function wS(e){return Ur(e)?pA(e,()=>{}):e}function Md(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function B9(e){return typeof e=="boolean"}var W9=()=>function(t){const{thunk:n=!0,immutableCheck:r=!0,serializableCheck:i=!0,actionCreatorCheck:a=!0}=t??{};let o=new mA;return n&&(B9(n)?o.push(L9):o.push(F9(n.extraArgument))),o},gA="RTK_autoBatch",Je=()=>e=>({payload:e,meta:{[gA]:!0}}),jS=e=>t=>{setTimeout(t,e)},vA=(e={type:"raf"})=>t=>(...n)=>{const r=t(...n);let i=!0,a=!1,o=!1;const s=new Set,l=e.type==="tick"?queueMicrotask:e.type==="raf"?typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame:jS(10):e.type==="callback"?e.queueNotification:jS(e.timeout),c=()=>{o=!1,a&&(a=!1,s.forEach(d=>d()))};return Object.assign({},r,{subscribe(d){const f=()=>i&&d(),p=r.subscribe(f);return s.add(d),()=>{p(),s.delete(d)}},dispatch(d){var f;try{return i=!((f=d==null?void 0:d.meta)!=null&&f[gA]),a=!i,a&&(o||(o=!0,l(c))),r.dispatch(d)}finally{i=!0}}})},H9=e=>function(n){const{autoBatch:r=!0}=n??{};let i=new mA(e);return r&&i.push(vA(typeof r=="object"?r:void 0)),i};function K9(e){const t=W9(),{reducer:n=void 0,middleware:r,devTools:i=!0,preloadedState:a=void 0,enhancers:o=void 0}=e||{};let s;if(typeof n=="function")s=n;else if(F0(n))s=nA(n);else throw new Error(Qn(1));let l;typeof r=="function"?l=r(t):l=t();let c=ap;i&&(c=U9({trace:!1,...typeof i=="object"&&i}));const d=k9(...l),f=H9(d);let p=typeof o=="function"?o(f):f();const h=c(...p);return tA(s,a,h)}function yA(e){const t={},n=[];let r;const i={addCase(a,o){const s=typeof a=="string"?a:a.type;if(!s)throw new Error(Qn(28));if(s in t)throw new Error(Qn(29));return t[s]=o,i},addAsyncThunk(a,o){return o.pending&&(t[a.pending.type]=o.pending),o.rejected&&(t[a.rejected.type]=o.rejected),o.fulfilled&&(t[a.fulfilled.type]=o.fulfilled),o.settled&&n.push({matcher:a.settled,reducer:o.settled}),i},addMatcher(a,o){return n.push({matcher:a,reducer:o}),i},addDefaultCase(a){return r=a,i}};return e(i),[t,n,r]}function V9(e){return typeof e=="function"}function Z9(e,t){let[n,r,i]=yA(t),a;if(V9(e))a=()=>wS(e());else{const s=wS(e);a=()=>s}function o(s=a(),l){let c=[n[l.type],...r.filter(({matcher:d})=>d(l)).map(({reducer:d})=>d)];return c.filter(d=>!!d).length===0&&(c=[i]),c.reduce((d,f)=>{if(f)if(Ki(d)){const h=f(d,l);return h===void 0?d:h}else{if(Ur(d))return pA(d,p=>f(p,l));{const p=f(d,l);if(p===void 0){if(d===null)return d;throw Error("A case reducer on a non-draftable value must not return undefined")}return p}}return d},s)}return o.getInitialState=a,o}var q9="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",Y9=(e=21)=>{let t="",n=e;for(;n--;)t+=q9[Math.random()*64|0];return t},G9=Symbol.for("rtk-slice-createasyncthunk");function Q9(e,t){return`${e}/${t}`}function X9({creators:e}={}){var n;const t=(n=e==null?void 0:e.asyncThunk)==null?void 0:n[G9];return function(i){const{name:a,reducerPath:o=a}=i;if(!a)throw new Error(Qn(11));const s=(typeof i.reducers=="function"?i.reducers(eH()):i.reducers)||{},l=Object.keys(s),c={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},d={addCase(j,k){const P=typeof j=="string"?j:j.type;if(!P)throw new Error(Qn(12));if(P in c.sliceCaseReducersByType)throw new Error(Qn(13));return c.sliceCaseReducersByType[P]=k,d},addMatcher(j,k){return c.sliceMatchers.push({matcher:j,reducer:k}),d},exposeAction(j,k){return c.actionCreators[j]=k,d},exposeCaseReducer(j,k){return c.sliceCaseReducersByName[j]=k,d}};l.forEach(j=>{const k=s[j],P={reducerName:j,type:Q9(a,j),createNotation:typeof i.reducers=="function"};nH(k)?iH(P,k,d,t):tH(P,k,d)});function f(){const[j={},k=[],P=void 0]=typeof i.extraReducers=="function"?yA(i.extraReducers):[i.extraReducers],S={...j,...c.sliceCaseReducersByType};return Z9(i.initialState,C=>{for(let N in S)C.addCase(N,S[N]);for(let N of c.sliceMatchers)C.addMatcher(N.matcher,N.reducer);for(let N of k)C.addMatcher(N.matcher,N.reducer);P&&C.addDefaultCase(P)})}const p=j=>j,h=new Map,m=new WeakMap;let y;function g(j,k){return y||(y=f()),y(j,k)}function x(){return y||(y=f()),y.getInitialState()}function b(j,k=!1){function P(C){let N=C[j];return typeof N>"u"&&k&&(N=Md(m,P,x)),N}function S(C=p){const N=Md(h,k,()=>new WeakMap);return Md(N,C,()=>{const _={};for(const[M,R]of Object.entries(i.selectors??{}))_[M]=J9(R,C,()=>Md(m,C,x),k);return _})}return{reducerPath:j,getSelectors:S,get selectors(){return S(P)},selectSlice:P}}const w={name:a,reducer:g,actions:c.actionCreators,caseReducers:c.sliceCaseReducersByName,getInitialState:x,...b(o),injectInto(j,{reducerPath:k,...P}={}){const S=k??o;return j.inject({reducerPath:S,reducer:g},P),{...w,...b(S,!0)}}};return w}}function J9(e,t,n,r){function i(a,...o){let s=t(a);return typeof s>"u"&&r&&(s=n()),e(s,...o)}return i.unwrapped=e,i}var Wn=X9();function eH(){function e(t,n){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...n}}return e.withTypes=()=>e,{reducer(t){return Object.assign({[t.name](...n){return t(...n)}}[t.name],{_reducerDefinitionType:"reducer"})},preparedReducer(t,n){return{_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:n}},asyncThunk:e}}function tH({type:e,reducerName:t,createNotation:n},r,i){let a,o;if("reducer"in r){if(n&&!rH(r))throw new Error(Qn(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?jr(e,o):jr(e))}function nH(e){return e._reducerDefinitionType==="asyncThunk"}function rH(e){return e._reducerDefinitionType==="reducerWithPrepare"}function iH({type:e,reducerName:t},n,r,i){if(!i)throw new Error(Qn(18));const{payloadCreator:a,fulfilled:o,pending:s,rejected:l,settled:c,options:d}=n,f=i(e,a,d);r.exposeAction(t,f),o&&r.addCase(f.fulfilled,o),s&&r.addCase(f.pending,s),l&&r.addCase(f.rejected,l),c&&r.addMatcher(f.settled,c),r.exposeCaseReducer(t,{fulfilled:o||Dd,pending:s||Dd,rejected:l||Dd,settled:c||Dd})}function Dd(){}var aH="task",xA="listener",bA="completed",H0="cancelled",oH=`task-${H0}`,sH=`task-${bA}`,my=`${xA}-${H0}`,lH=`${xA}-${bA}`,Hh=class{constructor(e){jm(this,"name","TaskAbortError");jm(this,"message");this.code=e,this.message=`${aH} ${H0} (reason: ${e})`}},K0=(e,t)=>{if(typeof e!="function")throw new TypeError(Qn(32))},fp=()=>{},wA=(e,t=fp)=>(e.catch(t),e),jA=(e,t)=>(e.addEventListener("abort",t,{once:!0}),()=>e.removeEventListener("abort",t)),Lo=e=>{if(e.aborted)throw new Hh(e.reason)};function SA(e,t){let n=fp;return new Promise((r,i)=>{const a=()=>i(new Hh(e.reason));if(e.aborted){a();return}n=jA(e,a),t.finally(()=>n()).then(r,i)}).finally(()=>{n=fp})}var cH=async(e,t)=>{try{return await Promise.resolve(),{status:"ok",value:await e()}}catch(n){return{status:n instanceof Hh?"cancelled":"rejected",error:n}}finally{t==null||t()}},pp=e=>t=>wA(SA(e,t).then(n=>(Lo(e),n))),kA=e=>{const t=pp(e);return n=>t(new Promise(r=>setTimeout(r,n)))},{assign:Bs}=Object,SS={},Kh="listenerMiddleware",uH=(e,t)=>{const n=r=>jA(e,()=>r.abort(e.reason));return(r,i)=>{K0(r);const a=new AbortController;n(a);const o=cH(async()=>{Lo(e),Lo(a.signal);const s=await r({pause:pp(a.signal),delay:kA(a.signal),signal:a.signal});return Lo(a.signal),s},()=>a.abort(sH));return i!=null&&i.autoJoin&&t.push(o.catch(fp)),{result:pp(e)(o),cancel(){a.abort(oH)}}}},dH=(e,t)=>{const n=async(r,i)=>{Lo(t);let a=()=>{};const s=[new Promise((l,c)=>{let d=e({predicate:r,effect:(f,p)=>{p.unsubscribe(),l([f,p.getState(),p.getOriginalState()])}});a=()=>{d(),c()}})];i!=null&&s.push(new Promise(l=>setTimeout(l,i,null)));try{const l=await SA(t,Promise.race(s));return Lo(t),l}finally{a()}};return(r,i)=>wA(n(r,i))},PA=e=>{let{type:t,actionCreator:n,matcher:r,predicate:i,effect:a}=e;if(t)i=jr(t).match;else if(n)t=n.type,i=n.match;else if(r)i=r;else if(!i)throw new Error(Qn(21));return K0(a),{predicate:i,type:t,effect:a}},CA=Bs(e=>{const{type:t,predicate:n,effect:r}=PA(e);return{id:Y9(),effect:r,type:t,predicate:n,pending:new Set,unsubscribe:()=>{throw new Error(Qn(22))}}},{withTypes:()=>CA}),kS=(e,t)=>{const{type:n,effect:r,predicate:i}=PA(t);return Array.from(e.values()).find(a=>(typeof n=="string"?a.type===n:a.predicate===i)&&a.effect===r)},gy=e=>{e.pending.forEach(t=>{t.abort(my)})},fH=(e,t)=>()=>{for(const n of t.keys())gy(n);e.clear()},PS=(e,t,n)=>{try{e(t,n)}catch(r){setTimeout(()=>{throw r},0)}},OA=Bs(jr(`${Kh}/add`),{withTypes:()=>OA}),pH=jr(`${Kh}/removeAll`),EA=Bs(jr(`${Kh}/remove`),{withTypes:()=>EA}),hH=(...e)=>{console.error(`${Kh}/error`,...e)},Du=(e={})=>{const t=new Map,n=new Map,r=h=>{const m=n.get(h)??0;n.set(h,m+1)},i=h=>{const m=n.get(h)??1;m===1?n.delete(h):n.set(h,m-1)},{extra:a,onError:o=hH}=e;K0(o);const s=h=>(h.unsubscribe=()=>t.delete(h.id),t.set(h.id,h),m=>{h.unsubscribe(),m!=null&&m.cancelActive&&gy(h)}),l=h=>{const m=kS(t,h)??CA(h);return s(m)};Bs(l,{withTypes:()=>l});const c=h=>{const m=kS(t,h);return m&&(m.unsubscribe(),h.cancelActive&&gy(m)),!!m};Bs(c,{withTypes:()=>c});const d=async(h,m,y,g)=>{const x=new AbortController,b=dH(l,x.signal),w=[];try{h.pending.add(x),r(h),await Promise.resolve(h.effect(m,Bs({},y,{getOriginalState:g,condition:(j,k)=>b(j,k).then(Boolean),take:b,delay:kA(x.signal),pause:pp(x.signal),extra:a,signal:x.signal,fork:uH(x.signal,w),unsubscribe:h.unsubscribe,subscribe:()=>{t.set(h.id,h)},cancelActiveListeners:()=>{h.pending.forEach((j,k,P)=>{j!==x&&(j.abort(my),P.delete(j))})},cancel:()=>{x.abort(my),h.pending.delete(x)},throwIfCancelled:()=>{Lo(x.signal)}})))}catch(j){j instanceof Hh||PS(o,j,{raisedBy:"effect"})}finally{await Promise.all(w),x.abort(lH),i(h),h.pending.delete(x)}},f=fH(t,n);return{middleware:h=>m=>y=>{if(!rA(y))return m(y);if(OA.match(y))return l(y.payload);if(pH.match(y)){f();return}if(EA.match(y))return c(y.payload);let g=h.getState();const x=()=>{if(g===SS)throw new Error(Qn(23));return g};let b;try{if(b=m(y),t.size>0){const w=h.getState(),j=Array.from(t.values());for(const k of j){let P=!1;try{P=k.predicate(y,w,g)}catch(S){P=!1,PS(o,S,{raisedBy:"predicate"})}P&&d(k,y,h,x)}}}finally{g=SS}return b},startListening:l,stopListening:c,clearListeners:f}};function Qn(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var mH={layoutType:"horizontal",width:0,height:0,margin:{top:5,right:5,bottom:5,left:5},scale:1},NA=Wn({name:"chartLayout",initialState:mH,reducers:{setLayout(e,t){e.layoutType=t.payload},setChartSize(e,t){e.width=t.payload.width,e.height=t.payload.height},setMargin(e,t){var n,r,i,a;e.margin.top=(n=t.payload.top)!==null&&n!==void 0?n:0,e.margin.right=(r=t.payload.right)!==null&&r!==void 0?r:0,e.margin.bottom=(i=t.payload.bottom)!==null&&i!==void 0?i:0,e.margin.left=(a=t.payload.left)!==null&&a!==void 0?a:0},setScale(e,t){e.scale=t.payload}}}),{setMargin:gH,setLayout:vH,setChartSize:yH,setScale:xH}=NA.actions,bH=NA.reducer;function _A(e,t,n){return Array.isArray(e)&&e&&t+n!==0?e.slice(t,n+1):e}function ze(e){return Number.isFinite(e)}function fi(e){return typeof e=="number"&&e>0&&Number.isFinite(e)}function CS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Ts(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?CS(Object(n),!0).forEach(function(r){wH(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):CS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function wH(e,t,n){return(t=jH(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function jH(e){var t=SH(e,"string");return typeof t=="symbol"?t:t+""}function SH(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Qt(e,t,n){return Jt(e)||Jt(t)?n:di(t)?Th(e,t,n):typeof t=="function"?t(e):n}var kH=(e,t,n)=>{if(t&&n){var{width:r,height:i}=n,{align:a,verticalAlign:o,layout:s}=t;if((s==="vertical"||s==="horizontal"&&o==="middle")&&a!=="center"&&ue(e[a]))return Ts(Ts({},e),{},{[a]:e[a]+(r||0)});if((s==="horizontal"||s==="vertical"&&a==="center")&&o!=="middle"&&ue(e[o]))return Ts(Ts({},e),{},{[o]:e[o]+(i||0)})}return e},Ji=(e,t)=>e==="horizontal"&&t==="xAxis"||e==="vertical"&&t==="yAxis"||e==="centric"&&t==="angleAxis"||e==="radial"&&t==="radiusAxis",AA=(e,t,n,r)=>{if(r)return e.map(s=>s.coordinate);var i,a,o=e.map(s=>(s.coordinate===t&&(i=!0),s.coordinate===n&&(a=!0),s.coordinate));return i||o.push(t),a||o.push(n),o},TA=(e,t,n)=>{if(!e)return null;var{duplicateDomain:r,type:i,range:a,scale:o,realScaleType:s,isCategorical:l,categoricalDomain:c,tickCount:d,ticks:f,niceTicks:p,axisType:h}=e;if(!o)return null;var m=s==="scaleBand"&&o.bandwidth?o.bandwidth()/2:2,y=i==="category"&&o.bandwidth?o.bandwidth()/m:0;if(y=h==="angleAxis"&&a&&a.length>=2?gr(a[0]-a[1])*2*y:y,f||p){var g=(f||p||[]).map((x,b)=>{var w=r?r.indexOf(x):x,j=o.map(w);return ze(j)?{coordinate:j+y,value:x,offset:y,index:b}:null}).filter(Mn);return g}return l&&c?c.map((x,b)=>{var w=o.map(x);return ze(w)?{coordinate:w+y,value:x,index:b,offset:y}:null}).filter(Mn):o.ticks&&d!=null?o.ticks(d).map((x,b)=>{var w=o.map(x);return ze(w)?{coordinate:w+y,value:x,index:b,offset:y}:null}).filter(Mn):o.domain().map((x,b)=>{var w=o.map(x);return ze(w)?{coordinate:w+y,value:r?r[x]:x,index:b,offset:y}:null}).filter(Mn)},PH=e=>{var t,n=e.length;if(!(n<=0)){var r=(t=e[0])===null||t===void 0?void 0:t.length;if(!(r==null||r<=0))for(var i=0;i<r;++i)for(var a=0,o=0,s=0;s<n;++s){var l=e[s],c=l==null?void 0:l[i];if(c!=null){var d=c[1],f=c[0],p=Hi(d)?f:d;p>=0?(c[0]=a,a+=p,c[1]=a):(c[0]=o,o+=p,c[1]=o)}}}},CH=e=>{var t,n=e.length;if(!(n<=0)){var r=(t=e[0])===null||t===void 0?void 0:t.length;if(!(r==null||r<=0))for(var i=0;i<r;++i)for(var a=0,o=0;o<n;++o){var s=e[o],l=s==null?void 0:s[i];if(l!=null){var c=Hi(l[1])?l[0]:l[1];c>=0?(l[0]=a,a+=c,l[1]=a):(l[0]=0,l[1]=0)}}}},OH={sign:PH,expand:lW,none:Go,silhouette:cW,wiggle:uW,positive:CH},EH=(e,t,n)=>{var r,i=(r=OH[n])!==null&&r!==void 0?r:Go,a=sW().keys(t).value((s,l)=>Number(Qt(s,l,0))).order(ay).offset(i),o=a(e);return o.forEach((s,l)=>{s.forEach((c,d)=>{var f=Qt(e[d],t[l],0);Array.isArray(f)&&f.length===2&&ue(f[0])&&ue(f[1])&&(c[0]=f[0],c[1]=f[1])})}),o};function OS(e){var{axis:t,ticks:n,bandSize:r,entry:i,index:a,dataKey:o}=e;if(t.type==="category"){if(!t.allowDuplicatedCategory&&t.dataKey&&!Jt(i[t.dataKey])){var s=b2(n,"value",i[t.dataKey]);if(s)return s.coordinate+r/2}return n!=null&&n[a]?n[a].coordinate+r/2:null}var l=Qt(i,Jt(o)?t.dataKey:o),c=t.scale.map(l);return ue(c)?c:null}var NH=e=>{var t=e.flat(2).filter(ue);return[Math.min(...t),Math.max(...t)]},_H=e=>[e[0]===1/0?0:e[0],e[1]===-1/0?0:e[1]],AH=(e,t,n)=>{if(e!=null)return _H(Object.keys(e).reduce((r,i)=>{var a=e[i];if(!a)return r;var{stackedData:o}=a,s=o.reduce((l,c)=>{var d=_A(c,t,n),f=NH(d);return!ze(f[0])||!ze(f[1])?l:[Math.min(l[0],f[0]),Math.max(l[1],f[1])]},[1/0,-1/0]);return[Math.min(s[0],r[0]),Math.max(s[1],r[1])]},[1/0,-1/0]))},ES=/^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,NS=/^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/,hp=(e,t,n)=>{if(e&&e.scale&&e.scale.bandwidth){var r=e.scale.bandwidth();if(!n||r>0)return r}if(e&&t&&t.length>=2){for(var i=zh(t,d=>d.coordinate),a=1/0,o=1,s=i.length;o<s;o++){var l=i[o],c=i[o-1];a=Math.min(((l==null?void 0:l.coordinate)||0)-((c==null?void 0:c.coordinate)||0),a)}return a===1/0?0:a}return n?void 0:0};function _S(e){var{tooltipEntrySettings:t,dataKey:n,payload:r,value:i,name:a}=e;return Ts(Ts({},t),{},{dataKey:n,payload:r,value:i,name:a})}function RA(e,t){if(e)return String(e);if(typeof t=="string")return t}var TH=(e,t)=>{if(t==="horizontal")return e.chartX;if(t==="vertical")return e.chartY},RH=(e,t)=>t==="centric"?e.angle:e.radius,ea=e=>e.layout.width,ta=e=>e.layout.height,MH=e=>e.layout.scale,MA=e=>e.layout.margin,Vh=I(e=>e.cartesianAxis.xAxis,e=>Object.values(e)),Zh=I(e=>e.cartesianAxis.yAxis,e=>Object.values(e)),DH="data-recharts-item-index",zH="data-recharts-item-id",zu=60;function AS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function zd(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?AS(Object(n),!0).forEach(function(r){IH(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):AS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function IH(e,t,n){return(t=$H(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function $H(e){var t=LH(e,"string");return typeof t=="symbol"?t:t+""}function LH(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var FH=e=>e.brush.height;function UH(e){var t=Zh(e);return t.reduce((n,r)=>{if(r.orientation==="left"&&!r.mirror&&!r.hide){var i=typeof r.width=="number"?r.width:zu;return n+i}return n},0)}function BH(e){var t=Zh(e);return t.reduce((n,r)=>{if(r.orientation==="right"&&!r.mirror&&!r.hide){var i=typeof r.width=="number"?r.width:zu;return n+i}return n},0)}function WH(e){var t=Vh(e);return t.reduce((n,r)=>r.orientation==="top"&&!r.mirror&&!r.hide?n+r.height:n,0)}function HH(e){var t=Vh(e);return t.reduce((n,r)=>r.orientation==="bottom"&&!r.mirror&&!r.hide?n+r.height:n,0)}var en=I([ea,ta,MA,FH,UH,BH,WH,HH,J2,v9],(e,t,n,r,i,a,o,s,l,c)=>{var d={left:(n.left||0)+i,right:(n.right||0)+a},f={top:(n.top||0)+o,bottom:(n.bottom||0)+s},p=zd(zd({},f),d),h=p.bottom;p.bottom+=r,p=kH(p,l,c);var m=e-p.left-p.right,y=t-p.top-p.bottom;return zd(zd({brushBottom:h},p),{},{width:Math.max(m,0),height:Math.max(y,0)})}),KH=I(en,e=>({x:e.left,y:e.top,width:e.width,height:e.height})),DA=I(ea,ta,(e,t)=>({x:0,y:0,width:e,height:t})),VH=v.createContext(null),Hn=()=>v.useContext(VH)!=null,qh=e=>e.brush,Yh=I([qh,en,MA],(e,t,n)=>({height:e.height,x:ue(e.x)?e.x:t.left,y:ue(e.y)?e.y:t.top+t.height+t.brushBottom-((n==null?void 0:n.bottom)||0),width:ue(e.width)?e.width:t.width})),zA={},IA={},$A={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n,r,{signal:i,edges:a}={}){let o,s=null;const l=a!=null&&a.includes("leading"),c=a==null||a.includes("trailing"),d=()=>{s!==null&&(n.apply(o,s),o=void 0,s=null)},f=()=>{c&&d(),y()};let p=null;const h=()=>{p!=null&&clearTimeout(p),p=setTimeout(()=>{p=null,f()},r)},m=()=>{p!==null&&(clearTimeout(p),p=null)},y=()=>{m(),o=void 0,s=null},g=()=>{d()},x=function(...b){if(i!=null&&i.aborted)return;o=this,s=b;const w=p==null;h(),l&&w&&d()};return x.schedule=h,x.cancel=y,x.flush=g,i==null||i.addEventListener("abort",y,{once:!0}),x}e.debounce=t})($A);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=$A;function n(r,i=0,a={}){typeof a!="object"&&(a={});const{leading:o=!1,trailing:s=!0,maxWait:l}=a,c=Array(2);o&&(c[0]="leading"),s&&(c[1]="trailing");let d,f=null;const p=t.debounce(function(...y){d=r.apply(this,y),f=null},i,{edges:c}),h=function(...y){return l!=null&&(f===null&&(f=Date.now()),Date.now()-f>=l)?(d=r.apply(this,y),f=Date.now(),p.cancel(),p.schedule(),d):(p.apply(this,y),d)},m=()=>(p.flush(),d);return h.cancel=p.cancel,h.flush=m,h}e.debounce=n})(IA);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=IA;function n(r,i=0,a={}){const{leading:o=!0,trailing:s=!0}=a;return t.debounce(r,i,{leading:o,maxWait:i,trailing:s})}e.throttle=n})(zA);var ZH=zA.throttle;const qH=Qi(ZH);var mp=function(t,n){for(var r=arguments.length,i=new Array(r>2?r-2:0),a=2;a<r;a++)i[a-2]=arguments[a];if(typeof console<"u"&&console.warn&&(n===void 0&&console.warn("LogUtils requires an error message argument"),!t))if(n===void 0)console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var o=0;console.warn(n.replace(/%s/g,()=>i[o++]))}},ri={width:"100%",height:"100%",debounce:0,minWidth:0,initialDimension:{width:-1,height:-1}},LA=(e,t,n)=>{var{width:r=ri.width,height:i=ri.height,aspect:a,maxHeight:o}=n,s=Qo(r)?e:Number(r),l=Qo(i)?t:Number(i);return a&&a>0&&(s?l=s/a:l&&(s=l*a),o&&l!=null&&l>o&&(l=o)),{calculatedWidth:s,calculatedHeight:l}},YH={width:0,height:0,overflow:"visible"},GH={width:0,overflowX:"visible"},QH={height:0,overflowY:"visible"},XH={},JH=e=>{var{width:t,height:n}=e,r=Qo(t),i=Qo(n);return r&&i?YH:r?GH:i?QH:XH};function eK(e){var{width:t,height:n,aspect:r}=e,i=t,a=n;return i===void 0&&a===void 0?(i=ri.width,a=ri.height):i===void 0?i=r&&r>0?void 0:ri.width:a===void 0&&(a=r&&r>0?void 0:ri.height),{width:i,height:a}}function vy(){return vy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},vy.apply(null,arguments)}function TS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function RS(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?TS(Object(n),!0).forEach(function(r){tK(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):TS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function tK(e,t,n){return(t=nK(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function nK(e){var t=rK(e,"string");return typeof t=="symbol"?t:t+""}function rK(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var FA=v.createContext(ri.initialDimension);function iK(e){return fi(e.width)&&fi(e.height)}function UA(e){var{children:t,width:n,height:r}=e,i=v.useMemo(()=>({width:n,height:r}),[n,r]);return iK(i)?v.createElement(FA.Provider,{value:i},t):null}var V0=()=>v.useContext(FA),aK=v.forwardRef((e,t)=>{var{aspect:n,initialDimension:r=ri.initialDimension,width:i,height:a,minWidth:o=ri.minWidth,minHeight:s,maxHeight:l,children:c,debounce:d=ri.debounce,id:f,className:p,onResize:h,style:m={}}=e,y=v.useRef(null),g=v.useRef();g.current=h,v.useImperativeHandle(t,()=>y.current);var[x,b]=v.useState({containerWidth:r.width,containerHeight:r.height}),w=v.useCallback((C,N)=>{b(_=>{var M=Math.round(C),R=Math.round(N);return _.containerWidth===M&&_.containerHeight===R?_:{containerWidth:M,containerHeight:R}})},[]);v.useEffect(()=>{if(y.current==null||typeof ResizeObserver>"u")return Pl;var C=R=>{var G,V=R[0];if(V!=null){var{width:ee,height:Q}=V.contentRect;w(ee,Q),(G=g.current)===null||G===void 0||G.call(g,ee,Q)}};d>0&&(C=qH(C,d,{trailing:!0,leading:!1}));var N=new ResizeObserver(C),{width:_,height:M}=y.current.getBoundingClientRect();return w(_,M),N.observe(y.current),()=>{N.disconnect()}},[w,d]);var{containerWidth:j,containerHeight:k}=x;mp(!n||n>0,"The aspect(%s) must be greater than zero.",n);var{calculatedWidth:P,calculatedHeight:S}=LA(j,k,{width:i,height:a,aspect:n,maxHeight:l});return mp(P!=null&&P>0||S!=null&&S>0,`The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`,P,S,i,a,o,s,n),v.createElement("div",{id:f?"".concat(f):void 0,className:Ke("recharts-responsive-container",p),style:RS(RS({},m),{},{width:i,height:a,minWidth:o,minHeight:s,maxHeight:l}),ref:y},v.createElement("div",{style:JH({width:i,height:a})},v.createElement(UA,{width:P,height:S},c)))}),oK=v.forwardRef((e,t)=>{var n=V0();if(fi(n.width)&&fi(n.height))return e.children;var{width:r,height:i}=eK({width:e.width,height:e.height,aspect:e.aspect}),{calculatedWidth:a,calculatedHeight:o}=LA(void 0,void 0,{width:r,height:i,aspect:e.aspect,maxHeight:e.maxHeight});return ue(a)&&ue(o)?v.createElement(UA,{width:a,height:o},e.children):v.createElement(aK,vy({},e,{width:r,height:i,ref:t}))});function Z0(e){if(e)return{x:e.x,y:e.y,upperWidth:"upperWidth"in e?e.upperWidth:e.width,lowerWidth:"lowerWidth"in e?e.lowerWidth:e.width,width:e.width,height:e.height}}var Gh=()=>{var e,t=Hn(),n=ve(KH),r=ve(Yh),i=(e=ve(qh))===null||e===void 0?void 0:e.padding;return!t||!r||!i?n:{width:r.width-i.left-i.right,height:r.height-i.top-i.bottom,x:i.left,y:i.top}},sK={top:0,bottom:0,left:0,right:0,width:0,height:0,brushBottom:0},BA=()=>{var e;return(e=ve(en))!==null&&e!==void 0?e:sK},q0=()=>ve(ea),Y0=()=>ve(ta),lK=()=>ve(e=>e.layout.margin),dt=e=>e.layout.layoutType,Cl=()=>ve(dt),WA=()=>{var e=Cl();if(e==="horizontal"||e==="vertical")return e},HA=e=>{var t=e.layout.layoutType;if(t==="centric"||t==="radial")return t},cK=()=>{var e=Cl();return e!==void 0},Iu=e=>{var t=Ot(),n=Hn(),{width:r,height:i}=e,a=V0(),o=r,s=i;return a&&(o=a.width>0?a.width:r,s=a.height>0?a.height:i),v.useEffect(()=>{!n&&fi(o)&&fi(s)&&t(yH({width:o,height:s}))},[t,n,o,s]),null},KA=Symbol.for("immer-nothing"),MS=Symbol.for("immer-draftable"),Jn=Symbol.for("immer-state");function Dr(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var eu=Object.getPrototypeOf;function pl(e){return!!e&&!!e[Jn]}function Jo(e){var t;return e?VA(e)||Array.isArray(e)||!!e[MS]||!!((t=e.constructor)!=null&&t[MS])||$u(e)||Xh(e):!1}var uK=Object.prototype.constructor.toString(),DS=new WeakMap;function VA(e){if(!e||typeof e!="object")return!1;const t=Object.getPrototypeOf(e);if(t===null||t===Object.prototype)return!0;const n=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;if(n===Object)return!0;if(typeof n!="function")return!1;let r=DS.get(n);return r===void 0&&(r=Function.toString.call(n),DS.set(n,r)),r===uK}function gp(e,t,n=!0){Qh(e)===0?(n?Reflect.ownKeys(e):Object.keys(e)).forEach(i=>{t(i,e[i],e)}):e.forEach((r,i)=>t(i,r,e))}function Qh(e){const t=e[Jn];return t?t.type_:Array.isArray(e)?1:$u(e)?2:Xh(e)?3:0}function yy(e,t){return Qh(e)===2?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function ZA(e,t,n){const r=Qh(e);r===2?e.set(t,n):r===3?e.add(n):e[t]=n}function dK(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}function $u(e){return e instanceof Map}function Xh(e){return e instanceof Set}function mo(e){return e.copy_||e.base_}function xy(e,t){if($u(e))return new Map(e);if(Xh(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);const n=VA(e);if(t===!0||t==="class_only"&&!n){const r=Object.getOwnPropertyDescriptors(e);delete r[Jn];let i=Reflect.ownKeys(r);for(let a=0;a<i.length;a++){const o=i[a],s=r[o];s.writable===!1&&(s.writable=!0,s.configurable=!0),(s.get||s.set)&&(r[o]={configurable:!0,writable:!0,enumerable:s.enumerable,value:e[o]})}return Object.create(eu(e),r)}else{const r=eu(e);if(r!==null&&n)return{...e};const i=Object.create(r);return Object.assign(i,e)}}function G0(e,t=!1){return Jh(e)||pl(e)||!Jo(e)||(Qh(e)>1&&Object.defineProperties(e,{set:Id,add:Id,clear:Id,delete:Id}),Object.freeze(e),t&&Object.values(e).forEach(n=>G0(n,!0))),e}function fK(){Dr(2)}var Id={value:fK};function Jh(e){return e===null||typeof e!="object"?!0:Object.isFrozen(e)}var pK={};function es(e){const t=pK[e];return t||Dr(0,e),t}var tu;function qA(){return tu}function hK(e,t){return{drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function zS(e,t){t&&(es("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function by(e){wy(e),e.drafts_.forEach(mK),e.drafts_=null}function wy(e){e===tu&&(tu=e.parent_)}function IS(e){return tu=hK(tu,e)}function mK(e){const t=e[Jn];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function $S(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];return e!==void 0&&e!==n?(n[Jn].modified_&&(by(t),Dr(4)),Jo(e)&&(e=vp(t,e),t.parent_||yp(t,e)),t.patches_&&es("Patches").generateReplacementPatches_(n[Jn].base_,e,t.patches_,t.inversePatches_)):e=vp(t,n,[]),by(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==KA?e:void 0}function vp(e,t,n){if(Jh(t))return t;const r=e.immer_.shouldUseStrictIteration(),i=t[Jn];if(!i)return gp(t,(a,o)=>LS(e,i,t,a,o,n),r),t;if(i.scope_!==e)return t;if(!i.modified_)return yp(e,i.base_,!0),i.base_;if(!i.finalized_){i.finalized_=!0,i.scope_.unfinalizedDrafts_--;const a=i.copy_;let o=a,s=!1;i.type_===3&&(o=new Set(a),a.clear(),s=!0),gp(o,(l,c)=>LS(e,i,a,l,c,n,s),r),yp(e,a,!1),n&&e.patches_&&es("Patches").generatePatches_(i,n,e.patches_,e.inversePatches_)}return i.copy_}function LS(e,t,n,r,i,a,o){if(i==null||typeof i!="object"&&!o)return;const s=Jh(i);if(!(s&&!o)){if(pl(i)){const l=a&&t&&t.type_!==3&&!yy(t.assigned_,r)?a.concat(r):void 0,c=vp(e,i,l);if(ZA(n,r,c),pl(c))e.canAutoFreeze_=!1;else return}else o&&n.add(i);if(Jo(i)&&!s){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1||t&&t.base_&&t.base_[r]===i&&s)return;vp(e,i),(!t||!t.scope_.parent_)&&typeof r!="symbol"&&($u(n)?n.has(r):Object.prototype.propertyIsEnumerable.call(n,r))&&yp(e,i)}}}function yp(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&G0(t,n)}function gK(e,t){const n=Array.isArray(e),r={type_:n?1:0,scope_:t?t.scope_:qA(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let i=r,a=Q0;n&&(i=[r],a=nu);const{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,s}var Q0={get(e,t){if(t===Jn)return e;const n=mo(e);if(!yy(n,t))return vK(e,n,t);const r=n[t];return e.finalized_||!Jo(r)?r:r===hg(e.base_,t)?(mg(e),e.copy_[t]=Sy(r,e)):r},has(e,t){return t in mo(e)},ownKeys(e){return Reflect.ownKeys(mo(e))},set(e,t,n){const r=YA(mo(e),t);if(r!=null&&r.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){const i=hg(mo(e),t),a=i==null?void 0:i[Jn];if(a&&a.base_===n)return e.copy_[t]=n,e.assigned_[t]=!1,!0;if(dK(n,i)&&(n!==void 0||yy(e.base_,t)))return!0;mg(e),jy(e)}return e.copy_[t]===n&&(n!==void 0||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_[t]=!0),!0},deleteProperty(e,t){return hg(e.base_,t)!==void 0||t in e.base_?(e.assigned_[t]=!1,mg(e),jy(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const n=mo(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{writable:!0,configurable:e.type_!==1||t!=="length",enumerable:r.enumerable,value:n[t]}},defineProperty(){Dr(11)},getPrototypeOf(e){return eu(e.base_)},setPrototypeOf(){Dr(12)}},nu={};gp(Q0,(e,t)=>{nu[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}});nu.deleteProperty=function(e,t){return nu.set.call(this,e,t,void 0)};nu.set=function(e,t,n){return Q0.set.call(this,e[0],t,n,e[0])};function hg(e,t){const n=e[Jn];return(n?mo(n):e)[t]}function vK(e,t,n){var i;const r=YA(t,n);return r?"value"in r?r.value:(i=r.get)==null?void 0:i.call(e.draft_):void 0}function YA(e,t){if(!(t in e))return;let n=eu(e);for(;n;){const r=Object.getOwnPropertyDescriptor(n,t);if(r)return r;n=eu(n)}}function jy(e){e.modified_||(e.modified_=!0,e.parent_&&jy(e.parent_))}function mg(e){e.copy_||(e.copy_=xy(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var yK=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!0,this.produce=(t,n,r)=>{if(typeof t=="function"&&typeof n!="function"){const a=n;n=t;const o=this;return function(l=a,...c){return o.produce(l,d=>n.call(this,d,...c))}}typeof n!="function"&&Dr(6),r!==void 0&&typeof r!="function"&&Dr(7);let i;if(Jo(t)){const a=IS(this),o=Sy(t,void 0);let s=!0;try{i=n(o),s=!1}finally{s?by(a):wy(a)}return zS(a,r),$S(i,a)}else if(!t||typeof t!="object"){if(i=n(t),i===void 0&&(i=t),i===KA&&(i=void 0),this.autoFreeze_&&G0(i,!0),r){const a=[],o=[];es("Patches").generateReplacementPatches_(t,i,a,o),r(a,o)}return i}else Dr(1,t)},this.produceWithPatches=(t,n)=>{if(typeof t=="function")return(o,...s)=>this.produceWithPatches(o,l=>t(l,...s));let r,i;return[this.produce(t,n,(o,s)=>{r=o,i=s}),r,i]},typeof(e==null?void 0:e.autoFreeze)=="boolean"&&this.setAutoFreeze(e.autoFreeze),typeof(e==null?void 0:e.useStrictShallowCopy)=="boolean"&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),typeof(e==null?void 0:e.useStrictIteration)=="boolean"&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){Jo(e)||Dr(8),pl(e)&&(e=xK(e));const t=IS(this),n=Sy(e,void 0);return n[Jn].isManual_=!0,wy(t),n}finishDraft(e,t){const n=e&&e[Jn];(!n||!n.isManual_)&&Dr(9);const{scope_:r}=n;return zS(r,t),$S(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){const i=t[n];if(i.path.length===0&&i.op==="replace"){e=i.value;break}}n>-1&&(t=t.slice(n+1));const r=es("Patches").applyPatches_;return pl(e)?r(e,t):this.produce(e,i=>r(i,t))}};function Sy(e,t){const n=$u(e)?es("MapSet").proxyMap_(e,t):Xh(e)?es("MapSet").proxySet_(e,t):gK(e,t);return(t?t.scope_:qA()).drafts_.push(n),n}function xK(e){return pl(e)||Dr(10,e),GA(e)}function GA(e){if(!Jo(e)||Jh(e))return e;const t=e[Jn];let n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=xy(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=xy(e,!0);return gp(n,(i,a)=>{ZA(n,i,GA(a))},r),t&&(t.finalized_=!1),n}var bK=new yK;bK.produce;var wK={settings:{layout:"horizontal",align:"center",verticalAlign:"middle",itemSorter:"value"},size:{width:0,height:0},payload:[]},QA=Wn({name:"legend",initialState:wK,reducers:{setLegendSize(e,t){e.size.width=t.payload.width,e.size.height=t.payload.height},setLegendSettings(e,t){e.settings.align=t.payload.align,e.settings.layout=t.payload.layout,e.settings.verticalAlign=t.payload.verticalAlign,e.settings.itemSorter=t.payload.itemSorter},addLegendPayload:{reducer(e,t){e.payload.push(t.payload)},prepare:Je()},replaceLegendPayload:{reducer(e,t){var{prev:n,next:r}=t.payload,i=Lr(e).payload.indexOf(n);i>-1&&(e.payload[i]=r)},prepare:Je()},removeLegendPayload:{reducer(e,t){var n=Lr(e).payload.indexOf(t.payload);n>-1&&e.payload.splice(n,1)},prepare:Je()}}}),{setLegendSize:FS,setLegendSettings:jK,addLegendPayload:SK,replaceLegendPayload:kK,removeLegendPayload:PK}=QA.actions,CK=QA.reducer,OK=["contextPayload"];function ky(){return ky=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ky.apply(null,arguments)}function US(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function hl(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?US(Object(n),!0).forEach(function(r){EK(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):US(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function EK(e,t,n){return(t=NK(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function NK(e){var t=_K(e,"string");return typeof t=="symbol"?t:t+""}function _K(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function AK(e,t){if(e==null)return{};var n,r,i=TK(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function TK(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function RK(e){return e.value}function MK(e){var{contextPayload:t}=e,n=AK(e,OK),r=B2(t,e.payloadUniqBy,RK),i=hl(hl({},n),{},{payload:r});return v.isValidElement(e.content)?v.cloneElement(e.content,i):typeof e.content=="function"?v.createElement(e.content,i):v.createElement(zW,i)}function DK(e,t,n,r,i,a){var{layout:o,align:s,verticalAlign:l}=t,c,d;return(!e||(e.left===void 0||e.left===null)&&(e.right===void 0||e.right===null))&&(s==="center"&&o==="vertical"?c={left:((r||0)-a.width)/2}:c=s==="right"?{right:n&&n.right||0}:{left:n&&n.left||0}),(!e||(e.top===void 0||e.top===null)&&(e.bottom===void 0||e.bottom===null))&&(l==="middle"?d={top:((i||0)-a.height)/2}:d=l==="bottom"?{bottom:n&&n.bottom||0}:{top:n&&n.top||0}),hl(hl({},c),d)}function zK(e){var t=Ot();return v.useEffect(()=>{t(jK(e))},[t,e]),null}function IK(e){var t=Ot();return v.useEffect(()=>(t(FS(e)),()=>{t(FS({width:0,height:0}))}),[t,e]),null}function $K(e,t,n,r){return e==="vertical"&&t!=null?{height:t}:e==="horizontal"?{width:n||r}:null}var LK={align:"center",iconSize:14,inactiveColor:"#ccc",itemSorter:"value",layout:"horizontal",verticalAlign:"bottom"};function XA(e){var t=fn(e,LK),n=b9(),r=A7(),i=lK(),{width:a,height:o,wrapperStyle:s,portal:l}=t,[c,d]=eA([n]),f=q0(),p=Y0();if(f==null||p==null)return null;var h=f-((i==null?void 0:i.left)||0)-((i==null?void 0:i.right)||0),m=$K(t.layout,o,a,h),y=l?s:hl(hl({position:"absolute",width:(m==null?void 0:m.width)||a||"auto",height:(m==null?void 0:m.height)||o||"auto"},DK(s,t,i,f,p,c)),s),g=l??r;if(g==null||n==null)return null;var x=v.createElement("div",{className:"recharts-legend-wrapper",style:y,ref:d},v.createElement(zK,{layout:t.layout,align:t.align,verticalAlign:t.verticalAlign,itemSorter:t.itemSorter}),!l&&v.createElement(IK,{width:c.width,height:c.height}),v.createElement(MK,ky({},t,m,{margin:i,chartWidth:f,chartHeight:p,contextPayload:n})));return Su.createPortal(x,g)}XA.displayName="Legend";function Py(){return Py=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Py.apply(null,arguments)}function BS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Ql(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?BS(Object(n),!0).forEach(function(r){FK(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):BS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function FK(e,t,n){return(t=UK(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function UK(e){var t=BK(e,"string");return typeof t=="symbol"?t:t+""}function BK(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function WK(e){return Array.isArray(e)&&di(e[0])&&di(e[1])?e.join(" ~ "):e}var ds={separator:" : ",contentStyle:{margin:0,padding:10,backgroundColor:"#fff",border:"1px solid #ccc",whiteSpace:"nowrap"},itemStyle:{display:"block",paddingTop:4,paddingBottom:4,color:"#000"},labelStyle:{},accessibilityLayer:!1},HK=e=>{var{separator:t=ds.separator,contentStyle:n,itemStyle:r,labelStyle:i=ds.labelStyle,payload:a,formatter:o,itemSorter:s,wrapperClassName:l,labelClassName:c,label:d,labelFormatter:f,accessibilityLayer:p=ds.accessibilityLayer}=e,h=()=>{if(a&&a.length){var k={padding:0,margin:0},P=(s?zh(a,s):a).map((S,C)=>{if(S.type==="none")return null;var N=S.formatter||o||WK,{value:_,name:M}=S,R=_,G=M;if(N){var V=N(_,M,S,C,a);if(Array.isArray(V))[R,G]=V;else if(V!=null)R=V;else return null}var ee=Ql(Ql({},ds.itemStyle),{},{color:S.color||ds.itemStyle.color},r);return v.createElement("li",{className:"recharts-tooltip-item",key:"tooltip-item-".concat(C),style:ee},di(G)?v.createElement("span",{className:"recharts-tooltip-item-name"},G):null,di(G)?v.createElement("span",{className:"recharts-tooltip-item-separator"},t):null,v.createElement("span",{className:"recharts-tooltip-item-value"},R),v.createElement("span",{className:"recharts-tooltip-item-unit"},S.unit||""))});return v.createElement("ul",{className:"recharts-tooltip-item-list",style:k},P)}return null},m=Ql(Ql({},ds.contentStyle),n),y=Ql({margin:0},i),g=!Jt(d),x=g?d:"",b=Ke("recharts-default-tooltip",l),w=Ke("recharts-tooltip-label",c);g&&f&&a!==void 0&&a!==null&&(x=f(d,a));var j=p?{role:"status","aria-live":"assertive"}:{};return v.createElement("div",Py({className:b,style:m},j),v.createElement("p",{className:w,style:y},v.isValidElement(x)?x:"".concat(x)),h())},Xl="recharts-tooltip-wrapper",KK={visibility:"hidden"};function VK(e){var{coordinate:t,translateX:n,translateY:r}=e;return Ke(Xl,{["".concat(Xl,"-right")]:ue(n)&&t&&ue(t.x)&&n>=t.x,["".concat(Xl,"-left")]:ue(n)&&t&&ue(t.x)&&n<t.x,["".concat(Xl,"-bottom")]:ue(r)&&t&&ue(t.y)&&r>=t.y,["".concat(Xl,"-top")]:ue(r)&&t&&ue(t.y)&&r<t.y})}function WS(e){var{allowEscapeViewBox:t,coordinate:n,key:r,offset:i,position:a,reverseDirection:o,tooltipDimension:s,viewBox:l,viewBoxDimension:c}=e;if(a&&ue(a[r]))return a[r];var d=n[r]-s-(i>0?i:0),f=n[r]+i;if(t[r])return o[r]?d:f;var p=l[r];if(p==null)return 0;if(o[r]){var h=d,m=p;return h<m?Math.max(f,p):Math.max(d,p)}if(c==null)return 0;var y=f+s,g=p+c;return y>g?Math.max(d,p):Math.max(f,p)}function ZK(e){var{translateX:t,translateY:n,useTranslate3d:r}=e;return{transform:r?"translate3d(".concat(t,"px, ").concat(n,"px, 0)"):"translate(".concat(t,"px, ").concat(n,"px)")}}function qK(e){var{allowEscapeViewBox:t,coordinate:n,offsetTop:r,offsetLeft:i,position:a,reverseDirection:o,tooltipBox:s,useTranslate3d:l,viewBox:c}=e,d,f,p;return s.height>0&&s.width>0&&n?(f=WS({allowEscapeViewBox:t,coordinate:n,key:"x",offset:i,position:a,reverseDirection:o,tooltipDimension:s.width,viewBox:c,viewBoxDimension:c.width}),p=WS({allowEscapeViewBox:t,coordinate:n,key:"y",offset:r,position:a,reverseDirection:o,tooltipDimension:s.height,viewBox:c,viewBoxDimension:c.height}),d=ZK({translateX:f,translateY:p,useTranslate3d:l})):d=KK,{cssProperties:d,cssClasses:VK({translateX:f,translateY:p,coordinate:n})}}function HS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function $d(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?HS(Object(n),!0).forEach(function(r){Cy(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):HS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Cy(e,t,n){return(t=YK(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function YK(e){var t=GK(e,"string");return typeof t=="symbol"?t:t+""}function GK(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}class QK extends v.PureComponent{constructor(){super(...arguments),Cy(this,"state",{dismissed:!1,dismissedAtCoordinate:{x:0,y:0}}),Cy(this,"handleKeyDown",t=>{if(t.key==="Escape"){var n,r,i,a;this.setState({dismissed:!0,dismissedAtCoordinate:{x:(n=(r=this.props.coordinate)===null||r===void 0?void 0:r.x)!==null&&n!==void 0?n:0,y:(i=(a=this.props.coordinate)===null||a===void 0?void 0:a.y)!==null&&i!==void 0?i:0}})}})}componentDidMount(){document.addEventListener("keydown",this.handleKeyDown)}componentWillUnmount(){document.removeEventListener("keydown",this.handleKeyDown)}componentDidUpdate(){var t,n;this.state.dismissed&&(((t=this.props.coordinate)===null||t===void 0?void 0:t.x)!==this.state.dismissedAtCoordinate.x||((n=this.props.coordinate)===null||n===void 0?void 0:n.y)!==this.state.dismissedAtCoordinate.y)&&(this.state.dismissed=!1)}render(){var{active:t,allowEscapeViewBox:n,animationDuration:r,animationEasing:i,children:a,coordinate:o,hasPayload:s,isAnimationActive:l,offset:c,position:d,reverseDirection:f,useTranslate3d:p,viewBox:h,wrapperStyle:m,lastBoundingBox:y,innerRef:g,hasPortalFromProps:x}=this.props,b=typeof c=="number"?c:c.x,w=typeof c=="number"?c:c.y,{cssClasses:j,cssProperties:k}=qK({allowEscapeViewBox:n,coordinate:o,offsetLeft:b,offsetTop:w,position:d,reverseDirection:f,tooltipBox:{height:y.height,width:y.width},useTranslate3d:p,viewBox:h}),P=x?{}:$d($d({transition:l&&t?"transform ".concat(r,"ms ").concat(i):void 0},k),{},{pointerEvents:"none",visibility:!this.state.dismissed&&t&&s?"visible":"hidden",position:"absolute",top:0,left:0}),S=$d($d({},P),{},{visibility:!this.state.dismissed&&t&&s?"visible":"hidden"},m);return v.createElement("div",{xmlns:"http://www.w3.org/1999/xhtml",tabIndex:-1,className:j,style:S,ref:g},a)}}var JA=()=>{var e;return(e=ve(t=>t.rootProps.accessibilityLayer))!==null&&e!==void 0?e:!0};function Oy(){return Oy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Oy.apply(null,arguments)}function KS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function VS(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?KS(Object(n),!0).forEach(function(r){XK(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):KS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function XK(e,t,n){return(t=JK(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function JK(e){var t=eV(e,"string");return typeof t=="symbol"?t:t+""}function eV(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var ZS={curveBasisClosed:G7,curveBasisOpen:Q7,curveBasis:Y7,curveBumpX:D7,curveBumpY:z7,curveLinearClosed:X7,curveLinear:Oh,curveMonotoneX:J7,curveMonotoneY:eW,curveNatural:tW,curveStep:nW,curveStepAfter:iW,curveStepBefore:rW},xp=e=>ze(e.x)&&ze(e.y),qS=e=>e.base!=null&&xp(e.base)&&xp(e),Jl=e=>e.x,ec=e=>e.y,tV=(e,t)=>{if(typeof e=="function")return e;var n="curve".concat(Ru(e));if((n==="curveMonotone"||n==="curveBump")&&t){var r=ZS["".concat(n).concat(t==="vertical"?"Y":"X")];if(r)return r}return ZS[n]||Oh},YS={connectNulls:!1,type:"linear"},nV=e=>{var{type:t=YS.type,points:n=[],baseLine:r,layout:i,connectNulls:a=YS.connectNulls}=e,o=tV(t,i),s=a?n.filter(xp):n;if(Array.isArray(r)){var l,c=n.map((m,y)=>VS(VS({},m),{},{base:r[y]}));i==="vertical"?l=_d().y(ec).x1(Jl).x0(m=>m.base.x):l=_d().x(Jl).y1(ec).y0(m=>m.base.y);var d=l.defined(qS).curve(o),f=a?c.filter(qS):c;return d(f)}var p;i==="vertical"&&ue(r)?p=_d().y(ec).x1(Jl).x0(r):ue(r)?p=_d().x(Jl).y1(ec).y0(r):p=o2().x(Jl).y(ec);var h=p.defined(xp).curve(o);return h(s)},eT=e=>{var{className:t,points:n,path:r,pathRef:i}=e,a=Cl();if((!n||!n.length)&&!r)return null;var o={type:e.type,points:e.points,baseLine:e.baseLine,layout:e.layout||a,connectNulls:e.connectNulls},s=n&&n.length?nV(o):r;return v.createElement("path",Oy({},ui(e),E0(e),{className:Ke("recharts-curve",t),d:s===null?void 0:s,ref:i}))},rV=["x","y","top","left","width","height","className"];function Ey(){return Ey=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ey.apply(null,arguments)}function GS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function iV(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?GS(Object(n),!0).forEach(function(r){aV(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):GS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function aV(e,t,n){return(t=oV(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function oV(e){var t=sV(e,"string");return typeof t=="symbol"?t:t+""}function sV(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function lV(e,t){if(e==null)return{};var n,r,i=cV(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function cV(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var uV=(e,t,n,r,i,a)=>"M".concat(e,",").concat(i,"v").concat(r,"M").concat(a,",").concat(t,"h").concat(n),dV=e=>{var{x:t=0,y:n=0,top:r=0,left:i=0,width:a=0,height:o=0,className:s}=e,l=lV(e,rV),c=iV({x:t,y:n,top:r,left:i,width:a,height:o},l);return!ue(t)||!ue(n)||!ue(a)||!ue(o)||!ue(r)||!ue(i)?null:v.createElement("path",Ey({},jn(c),{className:Ke("recharts-cross",s),d:uV(t,n,a,o,r,i)}))};function fV(e,t,n,r){var i=r/2;return{stroke:"none",fill:"#ccc",x:e==="horizontal"?t.x-i:n.left+.5,y:e==="horizontal"?n.top+.5:t.y-i,width:e==="horizontal"?r:n.width-1,height:e==="horizontal"?n.height-1:r}}function QS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function XS(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?QS(Object(n),!0).forEach(function(r){pV(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):QS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function pV(e,t,n){return(t=hV(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function hV(e){var t=mV(e,"string");return typeof t=="symbol"?t:t+""}function mV(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var gV=e=>e.replace(/([A-Z])/g,t=>"-".concat(t.toLowerCase())),tT=(e,t,n)=>e.map(r=>"".concat(gV(r)," ").concat(t,"ms ").concat(n)).join(","),vV=(e,t)=>[Object.keys(e),Object.keys(t)].reduce((n,r)=>n.filter(i=>r.includes(i))),ru=(e,t)=>Object.keys(t).reduce((n,r)=>XS(XS({},n),{},{[r]:e(r,t[r])}),{});function JS(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Nt(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?JS(Object(n),!0).forEach(function(r){yV(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):JS(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function yV(e,t,n){return(t=xV(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function xV(e){var t=bV(e,"string");return typeof t=="symbol"?t:t+""}function bV(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var bp=(e,t,n)=>e+(t-e)*n,Ny=e=>{var{from:t,to:n}=e;return t!==n},nT=(e,t,n)=>{var r=ru((i,a)=>{if(Ny(a)){var[o,s]=e(a.from,a.to,a.velocity);return Nt(Nt({},a),{},{from:o,velocity:s})}return a},t);return n<1?ru((i,a)=>Ny(a)&&r[i]!=null?Nt(Nt({},a),{},{velocity:bp(a.velocity,r[i].velocity,n),from:bp(a.from,r[i].from,n)}):a,t):nT(e,r,n-1)};function wV(e,t,n,r,i,a){var o,s=r.reduce((p,h)=>Nt(Nt({},p),{},{[h]:{from:e[h],velocity:0,to:t[h]}}),{}),l=()=>ru((p,h)=>h.from,s),c=()=>!Object.values(s).filter(Ny).length,d=null,f=p=>{o||(o=p);var h=p-o,m=h/n.dt;s=nT(n,s,m),i(Nt(Nt(Nt({},e),t),l())),o=p,c()||(d=a.setTimeout(f))};return()=>(d=a.setTimeout(f),()=>{var p;(p=d)===null||p===void 0||p()})}function jV(e,t,n,r,i,a,o){var s=null,l=i.reduce((f,p)=>{var h=e[p],m=t[p];return h==null||m==null?f:Nt(Nt({},f),{},{[p]:[h,m]})},{}),c,d=f=>{c||(c=f);var p=(f-c)/r,h=ru((y,g)=>bp(...g,n(p)),l);if(a(Nt(Nt(Nt({},e),t),h)),p<1)s=o.setTimeout(d);else{var m=ru((y,g)=>bp(...g,n(1)),l);a(Nt(Nt(Nt({},e),t),m))}};return()=>(s=o.setTimeout(d),()=>{var f;(f=s)===null||f===void 0||f()})}const SV=(e,t,n,r,i,a)=>{var o=vV(e,t);return n==null?()=>(i(Nt(Nt({},e),t)),()=>{}):n.isStepper===!0?wV(e,t,n,o,i,a):jV(e,t,n,r,o,i,a)};var wp=1e-4,rT=(e,t)=>[0,3*e,3*t-6*e,3*e-3*t+1],iT=(e,t)=>e.map((n,r)=>n*t**r).reduce((n,r)=>n+r),ek=(e,t)=>n=>{var r=rT(e,t);return iT(r,n)},kV=(e,t)=>n=>{var r=rT(e,t),i=[...r.map((a,o)=>a*o).slice(1),0];return iT(i,n)},PV=e=>{var t,n=e.split("(");if(n.length!==2||n[0]!=="cubic-bezier")return null;var r=(t=n[1])===null||t===void 0||(t=t.split(")")[0])===null||t===void 0?void 0:t.split(",");if(r==null||r.length!==4)return null;var i=r.map(a=>parseFloat(a));return[i[0],i[1],i[2],i[3]]},CV=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(n.length===1)switch(n[0]){case"linear":return[0,0,1,1];case"ease":return[.25,.1,.25,1];case"ease-in":return[.42,0,1,1];case"ease-out":return[.42,0,.58,1];case"ease-in-out":return[0,0,.58,1];default:{var i=PV(n[0]);if(i)return i}}return n.length===4?n:[0,0,1,1]},OV=(e,t,n,r)=>{var i=ek(e,n),a=ek(t,r),o=kV(e,n),s=c=>c>1?1:c<0?0:c,l=c=>{for(var d=c>1?1:c,f=d,p=0;p<8;++p){var h=i(f)-d,m=o(f);if(Math.abs(h-d)<wp||m<wp)return a(f);f=s(f-h/m)}return a(f)};return l.isStepper=!1,l},tk=function(){return OV(...CV(...arguments))},EV=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},{stiff:n=100,damping:r=8,dt:i=17}=t,a=(o,s,l)=>{var c=-(o-s)*n,d=l*r,f=l+(c-d)*i/1e3,p=l*i/1e3+o;return Math.abs(p-s)<wp&&Math.abs(f)<wp?[s,0]:[p,f]};return a.isStepper=!0,a.dt=i,a},NV=e=>{if(typeof e=="string")switch(e){case"ease":case"ease-in-out":case"ease-out":case"ease-in":case"linear":return tk(e);case"spring":return EV();default:if(e.split("(")[0]==="cubic-bezier")return tk(e)}return typeof e=="function"?e:null};function _V(e){var t,n=()=>null,r=!1,i=null,a=o=>{if(!r){if(Array.isArray(o)){if(!o.length)return;var s=o,[l,...c]=s;if(typeof l=="number"){i=e.setTimeout(a.bind(null,c),l);return}a(l),i=e.setTimeout(a.bind(null,c));return}typeof o=="string"&&(t=o,n(t)),typeof o=="object"&&(t=o,n(t)),typeof o=="function"&&o()}};return{stop:()=>{r=!0},start:o=>{r=!1,i&&(i(),i=null),a(o)},subscribe:o=>(n=o,()=>{n=()=>null}),getTimeoutController:()=>e}}class AV{setTimeout(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,r=performance.now(),i=null,a=o=>{o-r>=n?t(o):typeof requestAnimationFrame=="function"&&(i=requestAnimationFrame(a))};return i=requestAnimationFrame(a),()=>{i!=null&&cancelAnimationFrame(i)}}}function TV(){return _V(new AV)}var RV=v.createContext(TV);function MV(e,t){var n=v.useContext(RV);return v.useMemo(()=>t??n(e),[e,t,n])}var DV=()=>!(typeof window<"u"&&window.document&&window.document.createElement&&window.setTimeout),em={isSsr:DV()},zV={begin:0,duration:1e3,easing:"ease",isActive:!0,canBegin:!0,onAnimationEnd:()=>{},onAnimationStart:()=>{}},nk={t:0},gg={t:1};function X0(e){var t=fn(e,zV),{isActive:n,canBegin:r,duration:i,easing:a,begin:o,onAnimationEnd:s,onAnimationStart:l,children:c}=t,d=n==="auto"?!em.isSsr:n,f=MV(t.animationId,t.animationManager),[p,h]=v.useState(d?nk:gg),m=v.useRef(null);return v.useEffect(()=>{d||h(gg)},[d]),v.useEffect(()=>{if(!d||!r)return Pl;var y=SV(nk,gg,NV(a),i,h,f.getTimeoutController()),g=()=>{m.current=y()};return f.start([l,o,g,i,s]),()=>{f.stop(),m.current&&m.current(),s()}},[d,r,i,a,o,l,s,f]),c(p.t)}function J0(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"animation-",n=v.useRef(Gc(t)),r=v.useRef(e);return r.current!==e&&(n.current=Gc(t),r.current=e),n.current}var IV=["radius"],$V=["radius"],rk,ik,ak,ok,sk,lk,ck,uk,dk,fk;function pk(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function hk(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?pk(Object(n),!0).forEach(function(r){LV(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):pk(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function LV(e,t,n){return(t=FV(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function FV(e){var t=UV(e,"string");return typeof t=="symbol"?t:t+""}function UV(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function jp(){return jp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},jp.apply(null,arguments)}function mk(e,t){if(e==null)return{};var n,r,i=BV(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function BV(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function qr(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var gk=(e,t,n,r,i)=>{var a=Aa(n),o=Aa(r),s=Math.min(Math.abs(a)/2,Math.abs(o)/2),l=o>=0?1:-1,c=a>=0?1:-1,d=o>=0&&a>=0||o<0&&a<0?1:0,f;if(s>0&&Array.isArray(i)){for(var p=[0,0,0,0],h=0,m=4;h<m;h++){var y,g=(y=i[h])!==null&&y!==void 0?y:0;p[h]=g>s?s:g}f=mt(rk||(rk=qr(["M",",",""])),e,t+l*p[0]),p[0]>0&&(f+=mt(ik||(ik=qr(["A ",",",",0,0,",",",",",""])),p[0],p[0],d,e+c*p[0],t)),f+=mt(ak||(ak=qr(["L ",",",""])),e+n-c*p[1],t),p[1]>0&&(f+=mt(ok||(ok=qr(["A ",",",",0,0,",`,
        `,",",""])),p[1],p[1],d,e+n,t+l*p[1])),f+=mt(sk||(sk=qr(["L ",",",""])),e+n,t+r-l*p[2]),p[2]>0&&(f+=mt(lk||(lk=qr(["A ",",",",0,0,",`,
        `,",",""])),p[2],p[2],d,e+n-c*p[2],t+r)),f+=mt(ck||(ck=qr(["L ",",",""])),e+c*p[3],t+r),p[3]>0&&(f+=mt(uk||(uk=qr(["A ",",",",0,0,",`,
        `,",",""])),p[3],p[3],d,e,t+r-l*p[3])),f+="Z"}else if(s>0&&i===+i&&i>0){var x=Math.min(s,i);f=mt(dk||(dk=qr(["M ",",",`
            A `,",",",0,0,",",",",",`
            L `,",",`
            A `,",",",0,0,",",",",",`
            L `,",",`
            A `,",",",0,0,",",",",",`
            L `,",",`
            A `,",",",0,0,",",",","," Z"])),e,t+l*x,x,x,d,e+c*x,t,e+n-c*x,t,x,x,d,e+n,t+l*x,e+n,t+r-l*x,x,x,d,e+n-c*x,t+r,e+c*x,t+r,x,x,d,e,t+r-l*x)}else f=mt(fk||(fk=qr(["M ",","," h "," v "," h "," Z"])),e,t,n,r,-n);return f},vk={x:0,y:0,width:0,height:0,radius:0,isAnimationActive:!1,isUpdateAnimationActive:!1,animationBegin:0,animationDuration:1500,animationEasing:"ease"},aT=e=>{var t=fn(e,vk),n=v.useRef(null),[r,i]=v.useState(-1);v.useEffect(()=>{if(n.current&&n.current.getTotalLength)try{var te=n.current.getTotalLength();te&&i(te)}catch{}},[]);var{x:a,y:o,width:s,height:l,radius:c,className:d}=t,{animationEasing:f,animationDuration:p,animationBegin:h,isAnimationActive:m,isUpdateAnimationActive:y}=t,g=v.useRef(s),x=v.useRef(l),b=v.useRef(a),w=v.useRef(o),j=v.useMemo(()=>({x:a,y:o,width:s,height:l,radius:c}),[a,o,s,l,c]),k=J0(j,"rectangle-");if(a!==+a||o!==+o||s!==+s||l!==+l||s===0||l===0)return null;var P=Ke("recharts-rectangle",d);if(!y){var S=jn(t),{radius:C}=S,N=mk(S,IV);return v.createElement("path",jp({},N,{x:Aa(a),y:Aa(o),width:Aa(s),height:Aa(l),radius:typeof c=="number"?c:void 0,className:P,d:gk(a,o,s,l,c)}))}var _=g.current,M=x.current,R=b.current,G=w.current,V="0px ".concat(r===-1?1:r,"px"),ee="".concat(r,"px 0px"),Q=tT(["strokeDasharray"],p,typeof f=="string"?f:vk.animationEasing);return v.createElement(X0,{animationId:k,key:k,canBegin:r>0,duration:p,easing:f,isActive:y,begin:h},te=>{var $=An(_,s,te),B=An(M,l,te),L=An(R,a,te),Y=An(G,o,te);n.current&&(g.current=$,x.current=B,b.current=L,w.current=Y);var re;m?te>0?re={transition:Q,strokeDasharray:ee}:re={strokeDasharray:V}:re={strokeDasharray:ee};var Oe=jn(t),{radius:we}=Oe,ie=mk(Oe,$V);return v.createElement("path",jp({},ie,{radius:typeof c=="number"?c:void 0,className:P,d:gk(L,Y,$,B,c),ref:n,style:hk(hk({},re),t.style)}))})};function yk(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function xk(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?yk(Object(n),!0).forEach(function(r){WV(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):yk(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function WV(e,t,n){return(t=HV(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function HV(e){var t=KV(e,"string");return typeof t=="symbol"?t:t+""}function KV(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Sp=Math.PI/180,VV=e=>e*180/Math.PI,Yt=(e,t,n,r)=>({x:e+Math.cos(-Sp*r)*n,y:t+Math.sin(-Sp*r)*n}),ZV=function(t,n){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{top:0,right:0,bottom:0,left:0};return Math.min(Math.abs(t-(r.left||0)-(r.right||0)),Math.abs(n-(r.top||0)-(r.bottom||0)))/2},qV=(e,t)=>{var{x:n,y:r}=e,{x:i,y:a}=t;return Math.sqrt((n-i)**2+(r-a)**2)},YV=(e,t)=>{var{x:n,y:r}=e,{cx:i,cy:a}=t,o=qV({x:n,y:r},{x:i,y:a});if(o<=0)return{radius:o,angle:0};var s=(n-i)/o,l=Math.acos(s);return r>a&&(l=2*Math.PI-l),{radius:o,angle:VV(l),angleInRadian:l}},GV=e=>{var{startAngle:t,endAngle:n}=e,r=Math.floor(t/360),i=Math.floor(n/360),a=Math.min(r,i);return{startAngle:t-a*360,endAngle:n-a*360}},QV=(e,t)=>{var{startAngle:n,endAngle:r}=t,i=Math.floor(n/360),a=Math.floor(r/360),o=Math.min(i,a);return e+o*360},XV=(e,t)=>{var{chartX:n,chartY:r}=e,{radius:i,angle:a}=YV({x:n,y:r},t),{innerRadius:o,outerRadius:s}=t;if(i<o||i>s||i===0)return null;var{startAngle:l,endAngle:c}=GV(t),d=a,f;if(l<=c){for(;d>c;)d-=360;for(;d<l;)d+=360;f=d>=l&&d<=c}else{for(;d>l;)d-=360;for(;d<c;)d+=360;f=d>=c&&d<=l}return f?xk(xk({},t),{},{radius:i,angle:QV(d,t)}):null};function oT(e){var{cx:t,cy:n,radius:r,startAngle:i,endAngle:a}=e,o=Yt(t,n,r,i),s=Yt(t,n,r,a);return{points:[o,s],cx:t,cy:n,radius:r,startAngle:i,endAngle:a}}var bk,wk,jk,Sk,kk,Pk,Ck;function _y(){return _y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_y.apply(null,arguments)}function So(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var JV=(e,t)=>{var n=gr(t-e),r=Math.min(Math.abs(t-e),359.999);return n*r},Ld=e=>{var{cx:t,cy:n,radius:r,angle:i,sign:a,isExternal:o,cornerRadius:s,cornerIsExternal:l}=e,c=s*(o?1:-1)+r,d=Math.asin(s/c)/Sp,f=l?i:i+a*d,p=Yt(t,n,c,f),h=Yt(t,n,r,f),m=l?i-a*d:i,y=Yt(t,n,c*Math.cos(d*Sp),m);return{center:p,circleTangency:h,lineTangency:y,theta:d}},sT=e=>{var{cx:t,cy:n,innerRadius:r,outerRadius:i,startAngle:a,endAngle:o}=e,s=JV(a,o),l=a+s,c=Yt(t,n,i,a),d=Yt(t,n,i,l),f=mt(bk||(bk=So(["M ",",",`
    A `,",",`,0,
    `,",",`,
    `,",",`
  `])),c.x,c.y,i,i,+(Math.abs(s)>180),+(a>l),d.x,d.y);if(r>0){var p=Yt(t,n,r,a),h=Yt(t,n,r,l);f+=mt(wk||(wk=So(["L ",",",`
            A `,",",`,0,
            `,",",`,
            `,","," Z"])),h.x,h.y,r,r,+(Math.abs(s)>180),+(a<=l),p.x,p.y)}else f+=mt(jk||(jk=So(["L ",","," Z"])),t,n);return f},eZ=e=>{var{cx:t,cy:n,innerRadius:r,outerRadius:i,cornerRadius:a,forceCornerRadius:o,cornerIsExternal:s,startAngle:l,endAngle:c}=e,d=gr(c-l),{circleTangency:f,lineTangency:p,theta:h}=Ld({cx:t,cy:n,radius:i,angle:l,sign:d,cornerRadius:a,cornerIsExternal:s}),{circleTangency:m,lineTangency:y,theta:g}=Ld({cx:t,cy:n,radius:i,angle:c,sign:-d,cornerRadius:a,cornerIsExternal:s}),x=s?Math.abs(l-c):Math.abs(l-c)-h-g;if(x<0)return o?mt(Sk||(Sk=So(["M ",",",`
        a`,",",",0,0,1,",`,0
        a`,",",",0,0,1,",`,0
      `])),p.x,p.y,a,a,a*2,a,a,-a*2):sT({cx:t,cy:n,innerRadius:r,outerRadius:i,startAngle:l,endAngle:c});var b=mt(kk||(kk=So(["M ",",",`
    A`,",",",0,0,",",",",",`
    A`,",",",0,",",",",",",",`
    A`,",",",0,0,",",",",",`
  `])),p.x,p.y,a,a,+(d<0),f.x,f.y,i,i,+(x>180),+(d<0),m.x,m.y,a,a,+(d<0),y.x,y.y);if(r>0){var{circleTangency:w,lineTangency:j,theta:k}=Ld({cx:t,cy:n,radius:r,angle:l,sign:d,isExternal:!0,cornerRadius:a,cornerIsExternal:s}),{circleTangency:P,lineTangency:S,theta:C}=Ld({cx:t,cy:n,radius:r,angle:c,sign:-d,isExternal:!0,cornerRadius:a,cornerIsExternal:s}),N=s?Math.abs(l-c):Math.abs(l-c)-k-C;if(N<0&&a===0)return"".concat(b,"L").concat(t,",").concat(n,"Z");b+=mt(Pk||(Pk=So(["L",",",`
      A`,",",",0,0,",",",",",`
      A`,",",",0,",",",",",",",`
      A`,",",",0,0,",",",",","Z"])),S.x,S.y,a,a,+(d<0),P.x,P.y,r,r,+(N>180),+(d>0),w.x,w.y,a,a,+(d<0),j.x,j.y)}else b+=mt(Ck||(Ck=So(["L",",","Z"])),t,n);return b},tZ={cx:0,cy:0,innerRadius:0,outerRadius:0,startAngle:0,endAngle:0,cornerRadius:0,forceCornerRadius:!1,cornerIsExternal:!1},lT=e=>{var t=fn(e,tZ),{cx:n,cy:r,innerRadius:i,outerRadius:a,cornerRadius:o,forceCornerRadius:s,cornerIsExternal:l,startAngle:c,endAngle:d,className:f}=t;if(a<i||c===d)return null;var p=Ke("recharts-sector",f),h=a-i,m=qa(o,h,0,!0),y;return m>0&&Math.abs(c-d)<360?y=eZ({cx:n,cy:r,innerRadius:i,outerRadius:a,cornerRadius:Math.min(m,h/2),forceCornerRadius:s,cornerIsExternal:l,startAngle:c,endAngle:d}):y=sT({cx:n,cy:r,innerRadius:i,outerRadius:a,startAngle:c,endAngle:d}),v.createElement("path",_y({},jn(t),{className:p,d:y}))};function nZ(e,t,n){if(e==="horizontal")return[{x:t.x,y:n.top},{x:t.x,y:n.top+n.height}];if(e==="vertical")return[{x:n.left,y:t.y},{x:n.left+n.width,y:t.y}];if(j2(t)){if(e==="centric"){var{cx:r,cy:i,innerRadius:a,outerRadius:o,angle:s}=t,l=Yt(r,i,a,s),c=Yt(r,i,o,s);return[{x:l.x,y:l.y},{x:c.x,y:c.y}]}return oT(t)}}var cT={},uT={},dT={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=$0;function n(r){return t.isSymbol(r)?NaN:Number(r)}e.toNumber=n})(dT);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=dT;function n(r){return r?(r=t.toNumber(r),r===1/0||r===-1/0?(r<0?-1:1)*Number.MAX_VALUE:r===r?r:0):r===0?r:0}e.toFinite=n})(uT);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=L0,n=uT;function r(i,a,o){o&&typeof o!="number"&&t.isIterateeCall(i,a,o)&&(a=o=void 0),i=n.toFinite(i),a===void 0?(a=i,i=0):a=n.toFinite(a),o=o===void 0?i<a?1:-1:n.toFinite(o);const s=Math.max(Math.ceil((a-i)/(o||1)),0),l=new Array(s);for(let c=0;c<s;c++)l[c]=i,i+=o;return l}e.range=r})(cT);var rZ=cT.range;const fT=Qi(rZ);function Ua(e,t){return e==null||t==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function iZ(e,t){return e==null||t==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function eb(e){let t,n,r;e.length!==2?(t=Ua,n=(s,l)=>Ua(e(s),l),r=(s,l)=>e(s)-l):(t=e===Ua||e===iZ?e:aZ,n=e,r=e);function i(s,l,c=0,d=s.length){if(c<d){if(t(l,l)!==0)return d;do{const f=c+d>>>1;n(s[f],l)<0?c=f+1:d=f}while(c<d)}return c}function a(s,l,c=0,d=s.length){if(c<d){if(t(l,l)!==0)return d;do{const f=c+d>>>1;n(s[f],l)<=0?c=f+1:d=f}while(c<d)}return c}function o(s,l,c=0,d=s.length){const f=i(s,l,c,d-1);return f>c&&r(s[f-1],l)>-r(s[f],l)?f-1:f}return{left:i,center:o,right:a}}function aZ(){return 0}function pT(e){return e===null?NaN:+e}function*oZ(e,t){for(let n of e)n!=null&&(n=+n)>=n&&(yield n)}const sZ=eb(Ua),Lu=sZ.right;eb(pT).center;class Ok extends Map{constructor(t,n=uZ){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:n}}),t!=null)for(const[r,i]of t)this.set(r,i)}get(t){return super.get(Ek(this,t))}has(t){return super.has(Ek(this,t))}set(t,n){return super.set(lZ(this,t),n)}delete(t){return super.delete(cZ(this,t))}}function Ek({_intern:e,_key:t},n){const r=t(n);return e.has(r)?e.get(r):n}function lZ({_intern:e,_key:t},n){const r=t(n);return e.has(r)?e.get(r):(e.set(r,n),n)}function cZ({_intern:e,_key:t},n){const r=t(n);return e.has(r)&&(n=e.get(r),e.delete(r)),n}function uZ(e){return e!==null&&typeof e=="object"?e.valueOf():e}function dZ(e=Ua){if(e===Ua)return hT;if(typeof e!="function")throw new TypeError("compare is not a function");return(t,n)=>{const r=e(t,n);return r||r===0?r:(e(n,n)===0)-(e(t,t)===0)}}function hT(e,t){return(e==null||!(e>=e))-(t==null||!(t>=t))||(e<t?-1:e>t?1:0)}const fZ=Math.sqrt(50),pZ=Math.sqrt(10),hZ=Math.sqrt(2);function kp(e,t,n){const r=(t-e)/Math.max(0,n),i=Math.floor(Math.log10(r)),a=r/Math.pow(10,i),o=a>=fZ?10:a>=pZ?5:a>=hZ?2:1;let s,l,c;return i<0?(c=Math.pow(10,-i)/o,s=Math.round(e*c),l=Math.round(t*c),s/c<e&&++s,l/c>t&&--l,c=-c):(c=Math.pow(10,i)*o,s=Math.round(e/c),l=Math.round(t/c),s*c<e&&++s,l*c>t&&--l),l<s&&.5<=n&&n<2?kp(e,t,n*2):[s,l,c]}function Ay(e,t,n){if(t=+t,e=+e,n=+n,!(n>0))return[];if(e===t)return[e];const r=t<e,[i,a,o]=r?kp(t,e,n):kp(e,t,n);if(!(a>=i))return[];const s=a-i+1,l=new Array(s);if(r)if(o<0)for(let c=0;c<s;++c)l[c]=(a-c)/-o;else for(let c=0;c<s;++c)l[c]=(a-c)*o;else if(o<0)for(let c=0;c<s;++c)l[c]=(i+c)/-o;else for(let c=0;c<s;++c)l[c]=(i+c)*o;return l}function Ty(e,t,n){return t=+t,e=+e,n=+n,kp(e,t,n)[2]}function Ry(e,t,n){t=+t,e=+e,n=+n;const r=t<e,i=r?Ty(t,e,n):Ty(e,t,n);return(r?-1:1)*(i<0?1/-i:i)}function Nk(e,t){let n;for(const r of e)r!=null&&(n<r||n===void 0&&r>=r)&&(n=r);return n}function _k(e,t){let n;for(const r of e)r!=null&&(n>r||n===void 0&&r>=r)&&(n=r);return n}function mT(e,t,n=0,r=1/0,i){if(t=Math.floor(t),n=Math.floor(Math.max(0,n)),r=Math.floor(Math.min(e.length-1,r)),!(n<=t&&t<=r))return e;for(i=i===void 0?hT:dZ(i);r>n;){if(r-n>600){const l=r-n+1,c=t-n+1,d=Math.log(l),f=.5*Math.exp(2*d/3),p=.5*Math.sqrt(d*f*(l-f)/l)*(c-l/2<0?-1:1),h=Math.max(n,Math.floor(t-c*f/l+p)),m=Math.min(r,Math.floor(t+(l-c)*f/l+p));mT(e,t,h,m,i)}const a=e[t];let o=n,s=r;for(tc(e,n,t),i(e[r],a)>0&&tc(e,n,r);o<s;){for(tc(e,o,s),++o,--s;i(e[o],a)<0;)++o;for(;i(e[s],a)>0;)--s}i(e[n],a)===0?tc(e,n,s):(++s,tc(e,s,r)),s<=t&&(n=s+1),t<=s&&(r=s-1)}return e}function tc(e,t,n){const r=e[t];e[t]=e[n],e[n]=r}function mZ(e,t,n){if(e=Float64Array.from(oZ(e)),!(!(r=e.length)||isNaN(t=+t))){if(t<=0||r<2)return _k(e);if(t>=1)return Nk(e);var r,i=(r-1)*t,a=Math.floor(i),o=Nk(mT(e,a).subarray(0,a+1)),s=_k(e.subarray(a+1));return o+(s-o)*(i-a)}}function gZ(e,t,n=pT){if(!(!(r=e.length)||isNaN(t=+t))){if(t<=0||r<2)return+n(e[0],0,e);if(t>=1)return+n(e[r-1],r-1,e);var r,i=(r-1)*t,a=Math.floor(i),o=+n(e[a],a,e),s=+n(e[a+1],a+1,e);return o+(s-o)*(i-a)}}function vZ(e,t,n){e=+e,t=+t,n=(i=arguments.length)<2?(t=e,e=0,1):i<3?1:+n;for(var r=-1,i=Math.max(0,Math.ceil((t-e)/n))|0,a=new Array(i);++r<i;)a[r]=e+r*n;return a}function Cr(e,t){switch(arguments.length){case 0:break;case 1:this.range(e);break;default:this.range(t).domain(e);break}return this}function na(e,t){switch(arguments.length){case 0:break;case 1:{typeof e=="function"?this.interpolator(e):this.range(e);break}default:{this.domain(e),typeof t=="function"?this.interpolator(t):this.range(t);break}}return this}const My=Symbol("implicit");function tb(){var e=new Ok,t=[],n=[],r=My;function i(a){let o=e.get(a);if(o===void 0){if(r!==My)return r;e.set(a,o=t.push(a)-1)}return n[o%n.length]}return i.domain=function(a){if(!arguments.length)return t.slice();t=[],e=new Ok;for(const o of a)e.has(o)||e.set(o,t.push(o)-1);return i},i.range=function(a){return arguments.length?(n=Array.from(a),i):n.slice()},i.unknown=function(a){return arguments.length?(r=a,i):r},i.copy=function(){return tb(t,n).unknown(r)},Cr.apply(i,arguments),i}function nb(){var e=tb().unknown(void 0),t=e.domain,n=e.range,r=0,i=1,a,o,s=!1,l=0,c=0,d=.5;delete e.unknown;function f(){var p=t().length,h=i<r,m=h?i:r,y=h?r:i;a=(y-m)/Math.max(1,p-l+c*2),s&&(a=Math.floor(a)),m+=(y-m-a*(p-l))*d,o=a*(1-l),s&&(m=Math.round(m),o=Math.round(o));var g=vZ(p).map(function(x){return m+a*x});return n(h?g.reverse():g)}return e.domain=function(p){return arguments.length?(t(p),f()):t()},e.range=function(p){return arguments.length?([r,i]=p,r=+r,i=+i,f()):[r,i]},e.rangeRound=function(p){return[r,i]=p,r=+r,i=+i,s=!0,f()},e.bandwidth=function(){return o},e.step=function(){return a},e.round=function(p){return arguments.length?(s=!!p,f()):s},e.padding=function(p){return arguments.length?(l=Math.min(1,c=+p),f()):l},e.paddingInner=function(p){return arguments.length?(l=Math.min(1,p),f()):l},e.paddingOuter=function(p){return arguments.length?(c=+p,f()):c},e.align=function(p){return arguments.length?(d=Math.max(0,Math.min(1,p)),f()):d},e.copy=function(){return nb(t(),[r,i]).round(s).paddingInner(l).paddingOuter(c).align(d)},Cr.apply(f(),arguments)}function gT(e){var t=e.copy;return e.padding=e.paddingOuter,delete e.paddingInner,delete e.paddingOuter,e.copy=function(){return gT(t())},e}function yZ(){return gT(nb.apply(null,arguments).paddingInner(1))}function rb(e,t,n){e.prototype=t.prototype=n,n.constructor=e}function vT(e,t){var n=Object.create(e.prototype);for(var r in t)n[r]=t[r];return n}function Fu(){}var iu=.7,Pp=1/iu,Ws="\\s*([+-]?\\d+)\\s*",au="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",li="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",xZ=/^#([0-9a-f]{3,8})$/,bZ=new RegExp(`^rgb\\(${Ws},${Ws},${Ws}\\)$`),wZ=new RegExp(`^rgb\\(${li},${li},${li}\\)$`),jZ=new RegExp(`^rgba\\(${Ws},${Ws},${Ws},${au}\\)$`),SZ=new RegExp(`^rgba\\(${li},${li},${li},${au}\\)$`),kZ=new RegExp(`^hsl\\(${au},${li},${li}\\)$`),PZ=new RegExp(`^hsla\\(${au},${li},${li},${au}\\)$`),Ak={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};rb(Fu,ou,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Tk,formatHex:Tk,formatHex8:CZ,formatHsl:OZ,formatRgb:Rk,toString:Rk});function Tk(){return this.rgb().formatHex()}function CZ(){return this.rgb().formatHex8()}function OZ(){return yT(this).formatHsl()}function Rk(){return this.rgb().formatRgb()}function ou(e){var t,n;return e=(e+"").trim().toLowerCase(),(t=xZ.exec(e))?(n=t[1].length,t=parseInt(t[1],16),n===6?Mk(t):n===3?new Dn(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):n===8?Fd(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):n===4?Fd(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=bZ.exec(e))?new Dn(t[1],t[2],t[3],1):(t=wZ.exec(e))?new Dn(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=jZ.exec(e))?Fd(t[1],t[2],t[3],t[4]):(t=SZ.exec(e))?Fd(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=kZ.exec(e))?Ik(t[1],t[2]/100,t[3]/100,1):(t=PZ.exec(e))?Ik(t[1],t[2]/100,t[3]/100,t[4]):Ak.hasOwnProperty(e)?Mk(Ak[e]):e==="transparent"?new Dn(NaN,NaN,NaN,0):null}function Mk(e){return new Dn(e>>16&255,e>>8&255,e&255,1)}function Fd(e,t,n,r){return r<=0&&(e=t=n=NaN),new Dn(e,t,n,r)}function EZ(e){return e instanceof Fu||(e=ou(e)),e?(e=e.rgb(),new Dn(e.r,e.g,e.b,e.opacity)):new Dn}function Dy(e,t,n,r){return arguments.length===1?EZ(e):new Dn(e,t,n,r??1)}function Dn(e,t,n,r){this.r=+e,this.g=+t,this.b=+n,this.opacity=+r}rb(Dn,Dy,vT(Fu,{brighter(e){return e=e==null?Pp:Math.pow(Pp,e),new Dn(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?iu:Math.pow(iu,e),new Dn(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Dn(Fo(this.r),Fo(this.g),Fo(this.b),Cp(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Dk,formatHex:Dk,formatHex8:NZ,formatRgb:zk,toString:zk}));function Dk(){return`#${ko(this.r)}${ko(this.g)}${ko(this.b)}`}function NZ(){return`#${ko(this.r)}${ko(this.g)}${ko(this.b)}${ko((isNaN(this.opacity)?1:this.opacity)*255)}`}function zk(){const e=Cp(this.opacity);return`${e===1?"rgb(":"rgba("}${Fo(this.r)}, ${Fo(this.g)}, ${Fo(this.b)}${e===1?")":`, ${e})`}`}function Cp(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Fo(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function ko(e){return e=Fo(e),(e<16?"0":"")+e.toString(16)}function Ik(e,t,n,r){return r<=0?e=t=n=NaN:n<=0||n>=1?e=t=NaN:t<=0&&(e=NaN),new zr(e,t,n,r)}function yT(e){if(e instanceof zr)return new zr(e.h,e.s,e.l,e.opacity);if(e instanceof Fu||(e=ou(e)),!e)return new zr;if(e instanceof zr)return e;e=e.rgb();var t=e.r/255,n=e.g/255,r=e.b/255,i=Math.min(t,n,r),a=Math.max(t,n,r),o=NaN,s=a-i,l=(a+i)/2;return s?(t===a?o=(n-r)/s+(n<r)*6:n===a?o=(r-t)/s+2:o=(t-n)/s+4,s/=l<.5?a+i:2-a-i,o*=60):s=l>0&&l<1?0:o,new zr(o,s,l,e.opacity)}function _Z(e,t,n,r){return arguments.length===1?yT(e):new zr(e,t,n,r??1)}function zr(e,t,n,r){this.h=+e,this.s=+t,this.l=+n,this.opacity=+r}rb(zr,_Z,vT(Fu,{brighter(e){return e=e==null?Pp:Math.pow(Pp,e),new zr(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?iu:Math.pow(iu,e),new zr(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,n=this.l,r=n+(n<.5?n:1-n)*t,i=2*n-r;return new Dn(vg(e>=240?e-240:e+120,i,r),vg(e,i,r),vg(e<120?e+240:e-120,i,r),this.opacity)},clamp(){return new zr($k(this.h),Ud(this.s),Ud(this.l),Cp(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=Cp(this.opacity);return`${e===1?"hsl(":"hsla("}${$k(this.h)}, ${Ud(this.s)*100}%, ${Ud(this.l)*100}%${e===1?")":`, ${e})`}`}}));function $k(e){return e=(e||0)%360,e<0?e+360:e}function Ud(e){return Math.max(0,Math.min(1,e||0))}function vg(e,t,n){return(e<60?t+(n-t)*e/60:e<180?n:e<240?t+(n-t)*(240-e)/60:t)*255}const ib=e=>()=>e;function AZ(e,t){return function(n){return e+n*t}}function TZ(e,t,n){return e=Math.pow(e,n),t=Math.pow(t,n)-e,n=1/n,function(r){return Math.pow(e+r*t,n)}}function RZ(e){return(e=+e)==1?xT:function(t,n){return n-t?TZ(t,n,e):ib(isNaN(t)?n:t)}}function xT(e,t){var n=t-e;return n?AZ(e,n):ib(isNaN(e)?t:e)}const Lk=function e(t){var n=RZ(t);function r(i,a){var o=n((i=Dy(i)).r,(a=Dy(a)).r),s=n(i.g,a.g),l=n(i.b,a.b),c=xT(i.opacity,a.opacity);return function(d){return i.r=o(d),i.g=s(d),i.b=l(d),i.opacity=c(d),i+""}}return r.gamma=e,r}(1);function MZ(e,t){t||(t=[]);var n=e?Math.min(t.length,e.length):0,r=t.slice(),i;return function(a){for(i=0;i<n;++i)r[i]=e[i]*(1-a)+t[i]*a;return r}}function DZ(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function zZ(e,t){var n=t?t.length:0,r=e?Math.min(n,e.length):0,i=new Array(r),a=new Array(n),o;for(o=0;o<r;++o)i[o]=Ol(e[o],t[o]);for(;o<n;++o)a[o]=t[o];return function(s){for(o=0;o<r;++o)a[o]=i[o](s);return a}}function IZ(e,t){var n=new Date;return e=+e,t=+t,function(r){return n.setTime(e*(1-r)+t*r),n}}function Op(e,t){return e=+e,t=+t,function(n){return e*(1-n)+t*n}}function $Z(e,t){var n={},r={},i;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(i in t)i in e?n[i]=Ol(e[i],t[i]):r[i]=t[i];return function(a){for(i in n)r[i]=n[i](a);return r}}var zy=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,yg=new RegExp(zy.source,"g");function LZ(e){return function(){return e}}function FZ(e){return function(t){return e(t)+""}}function UZ(e,t){var n=zy.lastIndex=yg.lastIndex=0,r,i,a,o=-1,s=[],l=[];for(e=e+"",t=t+"";(r=zy.exec(e))&&(i=yg.exec(t));)(a=i.index)>n&&(a=t.slice(n,a),s[o]?s[o]+=a:s[++o]=a),(r=r[0])===(i=i[0])?s[o]?s[o]+=i:s[++o]=i:(s[++o]=null,l.push({i:o,x:Op(r,i)})),n=yg.lastIndex;return n<t.length&&(a=t.slice(n),s[o]?s[o]+=a:s[++o]=a),s.length<2?l[0]?FZ(l[0].x):LZ(t):(t=l.length,function(c){for(var d=0,f;d<t;++d)s[(f=l[d]).i]=f.x(c);return s.join("")})}function Ol(e,t){var n=typeof t,r;return t==null||n==="boolean"?ib(t):(n==="number"?Op:n==="string"?(r=ou(t))?(t=r,Lk):UZ:t instanceof ou?Lk:t instanceof Date?IZ:DZ(t)?MZ:Array.isArray(t)?zZ:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?$Z:Op)(e,t)}function ab(e,t){return e=+e,t=+t,function(n){return Math.round(e*(1-n)+t*n)}}function BZ(e,t){t===void 0&&(t=e,e=Ol);for(var n=0,r=t.length-1,i=t[0],a=new Array(r<0?0:r);n<r;)a[n]=e(i,i=t[++n]);return function(o){var s=Math.max(0,Math.min(r-1,Math.floor(o*=r)));return a[s](o-s)}}function WZ(e){return function(){return e}}function Ep(e){return+e}var Fk=[0,1];function xn(e){return e}function Iy(e,t){return(t-=e=+e)?function(n){return(n-e)/t}:WZ(isNaN(t)?NaN:.5)}function HZ(e,t){var n;return e>t&&(n=e,e=t,t=n),function(r){return Math.max(e,Math.min(t,r))}}function KZ(e,t,n){var r=e[0],i=e[1],a=t[0],o=t[1];return i<r?(r=Iy(i,r),a=n(o,a)):(r=Iy(r,i),a=n(a,o)),function(s){return a(r(s))}}function VZ(e,t,n){var r=Math.min(e.length,t.length)-1,i=new Array(r),a=new Array(r),o=-1;for(e[r]<e[0]&&(e=e.slice().reverse(),t=t.slice().reverse());++o<r;)i[o]=Iy(e[o],e[o+1]),a[o]=n(t[o],t[o+1]);return function(s){var l=Lu(e,s,1,r)-1;return a[l](i[l](s))}}function Uu(e,t){return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown())}function tm(){var e=Fk,t=Fk,n=Ol,r,i,a,o=xn,s,l,c;function d(){var p=Math.min(e.length,t.length);return o!==xn&&(o=HZ(e[0],e[p-1])),s=p>2?VZ:KZ,l=c=null,f}function f(p){return p==null||isNaN(p=+p)?a:(l||(l=s(e.map(r),t,n)))(r(o(p)))}return f.invert=function(p){return o(i((c||(c=s(t,e.map(r),Op)))(p)))},f.domain=function(p){return arguments.length?(e=Array.from(p,Ep),d()):e.slice()},f.range=function(p){return arguments.length?(t=Array.from(p),d()):t.slice()},f.rangeRound=function(p){return t=Array.from(p),n=ab,d()},f.clamp=function(p){return arguments.length?(o=p?!0:xn,d()):o!==xn},f.interpolate=function(p){return arguments.length?(n=p,d()):n},f.unknown=function(p){return arguments.length?(a=p,f):a},function(p,h){return r=p,i=h,d()}}function ob(){return tm()(xn,xn)}function ZZ(e){return Math.abs(e=Math.round(e))>=1e21?e.toLocaleString("en").replace(/,/g,""):e.toString(10)}function Np(e,t){if(!isFinite(e)||e===0)return null;var n=(e=t?e.toExponential(t-1):e.toExponential()).indexOf("e"),r=e.slice(0,n);return[r.length>1?r[0]+r.slice(2):r,+e.slice(n+1)]}function ml(e){return e=Np(Math.abs(e)),e?e[1]:NaN}function qZ(e,t){return function(n,r){for(var i=n.length,a=[],o=0,s=e[0],l=0;i>0&&s>0&&(l+s+1>r&&(s=Math.max(1,r-l)),a.push(n.substring(i-=s,i+s)),!((l+=s+1)>r));)s=e[o=(o+1)%e.length];return a.reverse().join(t)}}function YZ(e){return function(t){return t.replace(/[0-9]/g,function(n){return e[+n]})}}var GZ=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function su(e){if(!(t=GZ.exec(e)))throw new Error("invalid format: "+e);var t;return new sb({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}su.prototype=sb.prototype;function sb(e){this.fill=e.fill===void 0?" ":e.fill+"",this.align=e.align===void 0?">":e.align+"",this.sign=e.sign===void 0?"-":e.sign+"",this.symbol=e.symbol===void 0?"":e.symbol+"",this.zero=!!e.zero,this.width=e.width===void 0?void 0:+e.width,this.comma=!!e.comma,this.precision=e.precision===void 0?void 0:+e.precision,this.trim=!!e.trim,this.type=e.type===void 0?"":e.type+""}sb.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function QZ(e){e:for(var t=e.length,n=1,r=-1,i;n<t;++n)switch(e[n]){case".":r=i=n;break;case"0":r===0&&(r=n),i=n;break;default:if(!+e[n])break e;r>0&&(r=0);break}return r>0?e.slice(0,r)+e.slice(i+1):e}var _p;function XZ(e,t){var n=Np(e,t);if(!n)return _p=void 0,e.toPrecision(t);var r=n[0],i=n[1],a=i-(_p=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,o=r.length;return a===o?r:a>o?r+new Array(a-o+1).join("0"):a>0?r.slice(0,a)+"."+r.slice(a):"0."+new Array(1-a).join("0")+Np(e,Math.max(0,t+a-1))[0]}function Uk(e,t){var n=Np(e,t);if(!n)return e+"";var r=n[0],i=n[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}const Bk={"%":(e,t)=>(e*100).toFixed(t),b:e=>Math.round(e).toString(2),c:e=>e+"",d:ZZ,e:(e,t)=>e.toExponential(t),f:(e,t)=>e.toFixed(t),g:(e,t)=>e.toPrecision(t),o:e=>Math.round(e).toString(8),p:(e,t)=>Uk(e*100,t),r:Uk,s:XZ,X:e=>Math.round(e).toString(16).toUpperCase(),x:e=>Math.round(e).toString(16)};function Wk(e){return e}var Hk=Array.prototype.map,Kk=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function JZ(e){var t=e.grouping===void 0||e.thousands===void 0?Wk:qZ(Hk.call(e.grouping,Number),e.thousands+""),n=e.currency===void 0?"":e.currency[0]+"",r=e.currency===void 0?"":e.currency[1]+"",i=e.decimal===void 0?".":e.decimal+"",a=e.numerals===void 0?Wk:YZ(Hk.call(e.numerals,String)),o=e.percent===void 0?"%":e.percent+"",s=e.minus===void 0?"−":e.minus+"",l=e.nan===void 0?"NaN":e.nan+"";function c(f,p){f=su(f);var h=f.fill,m=f.align,y=f.sign,g=f.symbol,x=f.zero,b=f.width,w=f.comma,j=f.precision,k=f.trim,P=f.type;P==="n"?(w=!0,P="g"):Bk[P]||(j===void 0&&(j=12),k=!0,P="g"),(x||h==="0"&&m==="=")&&(x=!0,h="0",m="=");var S=(p&&p.prefix!==void 0?p.prefix:"")+(g==="$"?n:g==="#"&&/[boxX]/.test(P)?"0"+P.toLowerCase():""),C=(g==="$"?r:/[%p]/.test(P)?o:"")+(p&&p.suffix!==void 0?p.suffix:""),N=Bk[P],_=/[defgprs%]/.test(P);j=j===void 0?6:/[gprs]/.test(P)?Math.max(1,Math.min(21,j)):Math.max(0,Math.min(20,j));function M(R){var G=S,V=C,ee,Q,te;if(P==="c")V=N(R)+V,R="";else{R=+R;var $=R<0||1/R<0;if(R=isNaN(R)?l:N(Math.abs(R),j),k&&(R=QZ(R)),$&&+R==0&&y!=="+"&&($=!1),G=($?y==="("?y:s:y==="-"||y==="("?"":y)+G,V=(P==="s"&&!isNaN(R)&&_p!==void 0?Kk[8+_p/3]:"")+V+($&&y==="("?")":""),_){for(ee=-1,Q=R.length;++ee<Q;)if(te=R.charCodeAt(ee),48>te||te>57){V=(te===46?i+R.slice(ee+1):R.slice(ee))+V,R=R.slice(0,ee);break}}}w&&!x&&(R=t(R,1/0));var B=G.length+R.length+V.length,L=B<b?new Array(b-B+1).join(h):"";switch(w&&x&&(R=t(L+R,L.length?b-V.length:1/0),L=""),m){case"<":R=G+R+V+L;break;case"=":R=G+L+R+V;break;case"^":R=L.slice(0,B=L.length>>1)+G+R+V+L.slice(B);break;default:R=L+G+R+V;break}return a(R)}return M.toString=function(){return f+""},M}function d(f,p){var h=Math.max(-8,Math.min(8,Math.floor(ml(p)/3)))*3,m=Math.pow(10,-h),y=c((f=su(f),f.type="f",f),{suffix:Kk[8+h/3]});return function(g){return y(m*g)}}return{format:c,formatPrefix:d}}var Bd,lb,bT;eq({thousands:",",grouping:[3],currency:["$",""]});function eq(e){return Bd=JZ(e),lb=Bd.format,bT=Bd.formatPrefix,Bd}function tq(e){return Math.max(0,-ml(Math.abs(e)))}function nq(e,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(ml(t)/3)))*3-ml(Math.abs(e)))}function rq(e,t){return e=Math.abs(e),t=Math.abs(t)-e,Math.max(0,ml(t)-ml(e))+1}function wT(e,t,n,r){var i=Ry(e,t,n),a;switch(r=su(r??",f"),r.type){case"s":{var o=Math.max(Math.abs(e),Math.abs(t));return r.precision==null&&!isNaN(a=nq(i,o))&&(r.precision=a),bT(r,o)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(a=rq(i,Math.max(Math.abs(e),Math.abs(t))))&&(r.precision=a-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(a=tq(i))&&(r.precision=a-(r.type==="%")*2);break}}return lb(r)}function ro(e){var t=e.domain;return e.ticks=function(n){var r=t();return Ay(r[0],r[r.length-1],n??10)},e.tickFormat=function(n,r){var i=t();return wT(i[0],i[i.length-1],n??10,r)},e.nice=function(n){n==null&&(n=10);var r=t(),i=0,a=r.length-1,o=r[i],s=r[a],l,c,d=10;for(s<o&&(c=o,o=s,s=c,c=i,i=a,a=c);d-- >0;){if(c=Ty(o,s,n),c===l)return r[i]=o,r[a]=s,t(r);if(c>0)o=Math.floor(o/c)*c,s=Math.ceil(s/c)*c;else if(c<0)o=Math.ceil(o*c)/c,s=Math.floor(s*c)/c;else break;l=c}return e},e}function jT(){var e=ob();return e.copy=function(){return Uu(e,jT())},Cr.apply(e,arguments),ro(e)}function ST(e){var t;function n(r){return r==null||isNaN(r=+r)?t:r}return n.invert=n,n.domain=n.range=function(r){return arguments.length?(e=Array.from(r,Ep),n):e.slice()},n.unknown=function(r){return arguments.length?(t=r,n):t},n.copy=function(){return ST(e).unknown(t)},e=arguments.length?Array.from(e,Ep):[0,1],ro(n)}function kT(e,t){e=e.slice();var n=0,r=e.length-1,i=e[n],a=e[r],o;return a<i&&(o=n,n=r,r=o,o=i,i=a,a=o),e[n]=t.floor(i),e[r]=t.ceil(a),e}function Vk(e){return Math.log(e)}function Zk(e){return Math.exp(e)}function iq(e){return-Math.log(-e)}function aq(e){return-Math.exp(-e)}function oq(e){return isFinite(e)?+("1e"+e):e<0?0:e}function sq(e){return e===10?oq:e===Math.E?Math.exp:t=>Math.pow(e,t)}function lq(e){return e===Math.E?Math.log:e===10&&Math.log10||e===2&&Math.log2||(e=Math.log(e),t=>Math.log(t)/e)}function qk(e){return(t,n)=>-e(-t,n)}function cb(e){const t=e(Vk,Zk),n=t.domain;let r=10,i,a;function o(){return i=lq(r),a=sq(r),n()[0]<0?(i=qk(i),a=qk(a),e(iq,aq)):e(Vk,Zk),t}return t.base=function(s){return arguments.length?(r=+s,o()):r},t.domain=function(s){return arguments.length?(n(s),o()):n()},t.ticks=s=>{const l=n();let c=l[0],d=l[l.length-1];const f=d<c;f&&([c,d]=[d,c]);let p=i(c),h=i(d),m,y;const g=s==null?10:+s;let x=[];if(!(r%1)&&h-p<g){if(p=Math.floor(p),h=Math.ceil(h),c>0){for(;p<=h;++p)for(m=1;m<r;++m)if(y=p<0?m/a(-p):m*a(p),!(y<c)){if(y>d)break;x.push(y)}}else for(;p<=h;++p)for(m=r-1;m>=1;--m)if(y=p>0?m/a(-p):m*a(p),!(y<c)){if(y>d)break;x.push(y)}x.length*2<g&&(x=Ay(c,d,g))}else x=Ay(p,h,Math.min(h-p,g)).map(a);return f?x.reverse():x},t.tickFormat=(s,l)=>{if(s==null&&(s=10),l==null&&(l=r===10?"s":","),typeof l!="function"&&(!(r%1)&&(l=su(l)).precision==null&&(l.trim=!0),l=lb(l)),s===1/0)return l;const c=Math.max(1,r*s/t.ticks().length);return d=>{let f=d/a(Math.round(i(d)));return f*r<r-.5&&(f*=r),f<=c?l(d):""}},t.nice=()=>n(kT(n(),{floor:s=>a(Math.floor(i(s))),ceil:s=>a(Math.ceil(i(s)))})),t}function PT(){const e=cb(tm()).domain([1,10]);return e.copy=()=>Uu(e,PT()).base(e.base()),Cr.apply(e,arguments),e}function Yk(e){return function(t){return Math.sign(t)*Math.log1p(Math.abs(t/e))}}function Gk(e){return function(t){return Math.sign(t)*Math.expm1(Math.abs(t))*e}}function ub(e){var t=1,n=e(Yk(t),Gk(t));return n.constant=function(r){return arguments.length?e(Yk(t=+r),Gk(t)):t},ro(n)}function CT(){var e=ub(tm());return e.copy=function(){return Uu(e,CT()).constant(e.constant())},Cr.apply(e,arguments)}function Qk(e){return function(t){return t<0?-Math.pow(-t,e):Math.pow(t,e)}}function cq(e){return e<0?-Math.sqrt(-e):Math.sqrt(e)}function uq(e){return e<0?-e*e:e*e}function db(e){var t=e(xn,xn),n=1;function r(){return n===1?e(xn,xn):n===.5?e(cq,uq):e(Qk(n),Qk(1/n))}return t.exponent=function(i){return arguments.length?(n=+i,r()):n},ro(t)}function fb(){var e=db(tm());return e.copy=function(){return Uu(e,fb()).exponent(e.exponent())},Cr.apply(e,arguments),e}function dq(){return fb.apply(null,arguments).exponent(.5)}function Xk(e){return Math.sign(e)*e*e}function fq(e){return Math.sign(e)*Math.sqrt(Math.abs(e))}function OT(){var e=ob(),t=[0,1],n=!1,r;function i(a){var o=fq(e(a));return isNaN(o)?r:n?Math.round(o):o}return i.invert=function(a){return e.invert(Xk(a))},i.domain=function(a){return arguments.length?(e.domain(a),i):e.domain()},i.range=function(a){return arguments.length?(e.range((t=Array.from(a,Ep)).map(Xk)),i):t.slice()},i.rangeRound=function(a){return i.range(a).round(!0)},i.round=function(a){return arguments.length?(n=!!a,i):n},i.clamp=function(a){return arguments.length?(e.clamp(a),i):e.clamp()},i.unknown=function(a){return arguments.length?(r=a,i):r},i.copy=function(){return OT(e.domain(),t).round(n).clamp(e.clamp()).unknown(r)},Cr.apply(i,arguments),ro(i)}function ET(){var e=[],t=[],n=[],r;function i(){var o=0,s=Math.max(1,t.length);for(n=new Array(s-1);++o<s;)n[o-1]=gZ(e,o/s);return a}function a(o){return o==null||isNaN(o=+o)?r:t[Lu(n,o)]}return a.invertExtent=function(o){var s=t.indexOf(o);return s<0?[NaN,NaN]:[s>0?n[s-1]:e[0],s<n.length?n[s]:e[e.length-1]]},a.domain=function(o){if(!arguments.length)return e.slice();e=[];for(let s of o)s!=null&&!isNaN(s=+s)&&e.push(s);return e.sort(Ua),i()},a.range=function(o){return arguments.length?(t=Array.from(o),i()):t.slice()},a.unknown=function(o){return arguments.length?(r=o,a):r},a.quantiles=function(){return n.slice()},a.copy=function(){return ET().domain(e).range(t).unknown(r)},Cr.apply(a,arguments)}function NT(){var e=0,t=1,n=1,r=[.5],i=[0,1],a;function o(l){return l!=null&&l<=l?i[Lu(r,l,0,n)]:a}function s(){var l=-1;for(r=new Array(n);++l<n;)r[l]=((l+1)*t-(l-n)*e)/(n+1);return o}return o.domain=function(l){return arguments.length?([e,t]=l,e=+e,t=+t,s()):[e,t]},o.range=function(l){return arguments.length?(n=(i=Array.from(l)).length-1,s()):i.slice()},o.invertExtent=function(l){var c=i.indexOf(l);return c<0?[NaN,NaN]:c<1?[e,r[0]]:c>=n?[r[n-1],t]:[r[c-1],r[c]]},o.unknown=function(l){return arguments.length&&(a=l),o},o.thresholds=function(){return r.slice()},o.copy=function(){return NT().domain([e,t]).range(i).unknown(a)},Cr.apply(ro(o),arguments)}function _T(){var e=[.5],t=[0,1],n,r=1;function i(a){return a!=null&&a<=a?t[Lu(e,a,0,r)]:n}return i.domain=function(a){return arguments.length?(e=Array.from(a),r=Math.min(e.length,t.length-1),i):e.slice()},i.range=function(a){return arguments.length?(t=Array.from(a),r=Math.min(e.length,t.length-1),i):t.slice()},i.invertExtent=function(a){var o=t.indexOf(a);return[e[o-1],e[o]]},i.unknown=function(a){return arguments.length?(n=a,i):n},i.copy=function(){return _T().domain(e).range(t).unknown(n)},Cr.apply(i,arguments)}const xg=new Date,bg=new Date;function Tt(e,t,n,r){function i(a){return e(a=arguments.length===0?new Date:new Date(+a)),a}return i.floor=a=>(e(a=new Date(+a)),a),i.ceil=a=>(e(a=new Date(a-1)),t(a,1),e(a),a),i.round=a=>{const o=i(a),s=i.ceil(a);return a-o<s-a?o:s},i.offset=(a,o)=>(t(a=new Date(+a),o==null?1:Math.floor(o)),a),i.range=(a,o,s)=>{const l=[];if(a=i.ceil(a),s=s==null?1:Math.floor(s),!(a<o)||!(s>0))return l;let c;do l.push(c=new Date(+a)),t(a,s),e(a);while(c<a&&a<o);return l},i.filter=a=>Tt(o=>{if(o>=o)for(;e(o),!a(o);)o.setTime(o-1)},(o,s)=>{if(o>=o)if(s<0)for(;++s<=0;)for(;t(o,-1),!a(o););else for(;--s>=0;)for(;t(o,1),!a(o););}),n&&(i.count=(a,o)=>(xg.setTime(+a),bg.setTime(+o),e(xg),e(bg),Math.floor(n(xg,bg))),i.every=a=>(a=Math.floor(a),!isFinite(a)||!(a>0)?null:a>1?i.filter(r?o=>r(o)%a===0:o=>i.count(0,o)%a===0):i)),i}const Ap=Tt(()=>{},(e,t)=>{e.setTime(+e+t)},(e,t)=>t-e);Ap.every=e=>(e=Math.floor(e),!isFinite(e)||!(e>0)?null:e>1?Tt(t=>{t.setTime(Math.floor(t/e)*e)},(t,n)=>{t.setTime(+t+n*e)},(t,n)=>(n-t)/e):Ap);Ap.range;const Mi=1e3,vr=Mi*60,Di=vr*60,Vi=Di*24,pb=Vi*7,Jk=Vi*30,wg=Vi*365,Po=Tt(e=>{e.setTime(e-e.getMilliseconds())},(e,t)=>{e.setTime(+e+t*Mi)},(e,t)=>(t-e)/Mi,e=>e.getUTCSeconds());Po.range;const hb=Tt(e=>{e.setTime(e-e.getMilliseconds()-e.getSeconds()*Mi)},(e,t)=>{e.setTime(+e+t*vr)},(e,t)=>(t-e)/vr,e=>e.getMinutes());hb.range;const mb=Tt(e=>{e.setUTCSeconds(0,0)},(e,t)=>{e.setTime(+e+t*vr)},(e,t)=>(t-e)/vr,e=>e.getUTCMinutes());mb.range;const gb=Tt(e=>{e.setTime(e-e.getMilliseconds()-e.getSeconds()*Mi-e.getMinutes()*vr)},(e,t)=>{e.setTime(+e+t*Di)},(e,t)=>(t-e)/Di,e=>e.getHours());gb.range;const vb=Tt(e=>{e.setUTCMinutes(0,0,0)},(e,t)=>{e.setTime(+e+t*Di)},(e,t)=>(t-e)/Di,e=>e.getUTCHours());vb.range;const Bu=Tt(e=>e.setHours(0,0,0,0),(e,t)=>e.setDate(e.getDate()+t),(e,t)=>(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*vr)/Vi,e=>e.getDate()-1);Bu.range;const nm=Tt(e=>{e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCDate(e.getUTCDate()+t)},(e,t)=>(t-e)/Vi,e=>e.getUTCDate()-1);nm.range;const AT=Tt(e=>{e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCDate(e.getUTCDate()+t)},(e,t)=>(t-e)/Vi,e=>Math.floor(e/Vi));AT.range;function ss(e){return Tt(t=>{t.setDate(t.getDate()-(t.getDay()+7-e)%7),t.setHours(0,0,0,0)},(t,n)=>{t.setDate(t.getDate()+n*7)},(t,n)=>(n-t-(n.getTimezoneOffset()-t.getTimezoneOffset())*vr)/pb)}const rm=ss(0),Tp=ss(1),pq=ss(2),hq=ss(3),gl=ss(4),mq=ss(5),gq=ss(6);rm.range;Tp.range;pq.range;hq.range;gl.range;mq.range;gq.range;function ls(e){return Tt(t=>{t.setUTCDate(t.getUTCDate()-(t.getUTCDay()+7-e)%7),t.setUTCHours(0,0,0,0)},(t,n)=>{t.setUTCDate(t.getUTCDate()+n*7)},(t,n)=>(n-t)/pb)}const im=ls(0),Rp=ls(1),vq=ls(2),yq=ls(3),vl=ls(4),xq=ls(5),bq=ls(6);im.range;Rp.range;vq.range;yq.range;vl.range;xq.range;bq.range;const yb=Tt(e=>{e.setDate(1),e.setHours(0,0,0,0)},(e,t)=>{e.setMonth(e.getMonth()+t)},(e,t)=>t.getMonth()-e.getMonth()+(t.getFullYear()-e.getFullYear())*12,e=>e.getMonth());yb.range;const xb=Tt(e=>{e.setUTCDate(1),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCMonth(e.getUTCMonth()+t)},(e,t)=>t.getUTCMonth()-e.getUTCMonth()+(t.getUTCFullYear()-e.getUTCFullYear())*12,e=>e.getUTCMonth());xb.range;const Zi=Tt(e=>{e.setMonth(0,1),e.setHours(0,0,0,0)},(e,t)=>{e.setFullYear(e.getFullYear()+t)},(e,t)=>t.getFullYear()-e.getFullYear(),e=>e.getFullYear());Zi.every=e=>!isFinite(e=Math.floor(e))||!(e>0)?null:Tt(t=>{t.setFullYear(Math.floor(t.getFullYear()/e)*e),t.setMonth(0,1),t.setHours(0,0,0,0)},(t,n)=>{t.setFullYear(t.getFullYear()+n*e)});Zi.range;const qi=Tt(e=>{e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,t)=>{e.setUTCFullYear(e.getUTCFullYear()+t)},(e,t)=>t.getUTCFullYear()-e.getUTCFullYear(),e=>e.getUTCFullYear());qi.every=e=>!isFinite(e=Math.floor(e))||!(e>0)?null:Tt(t=>{t.setUTCFullYear(Math.floor(t.getUTCFullYear()/e)*e),t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},(t,n)=>{t.setUTCFullYear(t.getUTCFullYear()+n*e)});qi.range;function TT(e,t,n,r,i,a){const o=[[Po,1,Mi],[Po,5,5*Mi],[Po,15,15*Mi],[Po,30,30*Mi],[a,1,vr],[a,5,5*vr],[a,15,15*vr],[a,30,30*vr],[i,1,Di],[i,3,3*Di],[i,6,6*Di],[i,12,12*Di],[r,1,Vi],[r,2,2*Vi],[n,1,pb],[t,1,Jk],[t,3,3*Jk],[e,1,wg]];function s(c,d,f){const p=d<c;p&&([c,d]=[d,c]);const h=f&&typeof f.range=="function"?f:l(c,d,f),m=h?h.range(c,+d+1):[];return p?m.reverse():m}function l(c,d,f){const p=Math.abs(d-c)/f,h=eb(([,,g])=>g).right(o,p);if(h===o.length)return e.every(Ry(c/wg,d/wg,f));if(h===0)return Ap.every(Math.max(Ry(c,d,f),1));const[m,y]=o[p/o[h-1][2]<o[h][2]/p?h-1:h];return m.every(y)}return[s,l]}const[wq,jq]=TT(qi,xb,im,AT,vb,mb),[Sq,kq]=TT(Zi,yb,rm,Bu,gb,hb);function jg(e){if(0<=e.y&&e.y<100){var t=new Date(-1,e.m,e.d,e.H,e.M,e.S,e.L);return t.setFullYear(e.y),t}return new Date(e.y,e.m,e.d,e.H,e.M,e.S,e.L)}function Sg(e){if(0<=e.y&&e.y<100){var t=new Date(Date.UTC(-1,e.m,e.d,e.H,e.M,e.S,e.L));return t.setUTCFullYear(e.y),t}return new Date(Date.UTC(e.y,e.m,e.d,e.H,e.M,e.S,e.L))}function nc(e,t,n){return{y:e,m:t,d:n,H:0,M:0,S:0,L:0}}function Pq(e){var t=e.dateTime,n=e.date,r=e.time,i=e.periods,a=e.days,o=e.shortDays,s=e.months,l=e.shortMonths,c=rc(i),d=ic(i),f=rc(a),p=ic(a),h=rc(o),m=ic(o),y=rc(s),g=ic(s),x=rc(l),b=ic(l),w={a:te,A:$,b:B,B:L,c:null,d:aP,e:aP,f:qq,g:iY,G:oY,H:Kq,I:Vq,j:Zq,L:RT,m:Yq,M:Gq,p:Y,q:re,Q:lP,s:cP,S:Qq,u:Xq,U:Jq,V:eY,w:tY,W:nY,x:null,X:null,y:rY,Y:aY,Z:sY,"%":sP},j={a:Oe,A:we,b:ie,B:We,c:null,d:oP,e:oP,f:dY,g:wY,G:SY,H:lY,I:cY,j:uY,L:DT,m:fY,M:pY,p:Xe,q:Or,Q:lP,s:cP,S:hY,u:mY,U:gY,V:vY,w:yY,W:xY,x:null,X:null,y:bY,Y:jY,Z:kY,"%":sP},k={a:_,A:M,b:R,B:G,c:V,d:rP,e:rP,f:Uq,g:nP,G:tP,H:iP,I:iP,j:Iq,L:Fq,m:zq,M:$q,p:N,q:Dq,Q:Wq,s:Hq,S:Lq,u:_q,U:Aq,V:Tq,w:Nq,W:Rq,x:ee,X:Q,y:nP,Y:tP,Z:Mq,"%":Bq};w.x=P(n,w),w.X=P(r,w),w.c=P(t,w),j.x=P(n,j),j.X=P(r,j),j.c=P(t,j);function P(H,Ce){return function(Te){var U=[],yt=-1,Le=0,pn=H.length,xt,yi,Qu;for(Te instanceof Date||(Te=new Date(+Te));++yt<pn;)H.charCodeAt(yt)===37&&(U.push(H.slice(Le,yt)),(yi=eP[xt=H.charAt(++yt)])!=null?xt=H.charAt(++yt):yi=xt==="e"?" ":"0",(Qu=Ce[xt])&&(xt=Qu(Te,yi)),U.push(xt),Le=yt+1);return U.push(H.slice(Le,yt)),U.join("")}}function S(H,Ce){return function(Te){var U=nc(1900,void 0,1),yt=C(U,H,Te+="",0),Le,pn;if(yt!=Te.length)return null;if("Q"in U)return new Date(U.Q);if("s"in U)return new Date(U.s*1e3+("L"in U?U.L:0));if(Ce&&!("Z"in U)&&(U.Z=0),"p"in U&&(U.H=U.H%12+U.p*12),U.m===void 0&&(U.m="q"in U?U.q:0),"V"in U){if(U.V<1||U.V>53)return null;"w"in U||(U.w=1),"Z"in U?(Le=Sg(nc(U.y,0,1)),pn=Le.getUTCDay(),Le=pn>4||pn===0?Rp.ceil(Le):Rp(Le),Le=nm.offset(Le,(U.V-1)*7),U.y=Le.getUTCFullYear(),U.m=Le.getUTCMonth(),U.d=Le.getUTCDate()+(U.w+6)%7):(Le=jg(nc(U.y,0,1)),pn=Le.getDay(),Le=pn>4||pn===0?Tp.ceil(Le):Tp(Le),Le=Bu.offset(Le,(U.V-1)*7),U.y=Le.getFullYear(),U.m=Le.getMonth(),U.d=Le.getDate()+(U.w+6)%7)}else("W"in U||"U"in U)&&("w"in U||(U.w="u"in U?U.u%7:"W"in U?1:0),pn="Z"in U?Sg(nc(U.y,0,1)).getUTCDay():jg(nc(U.y,0,1)).getDay(),U.m=0,U.d="W"in U?(U.w+6)%7+U.W*7-(pn+5)%7:U.w+U.U*7-(pn+6)%7);return"Z"in U?(U.H+=U.Z/100|0,U.M+=U.Z%100,Sg(U)):jg(U)}}function C(H,Ce,Te,U){for(var yt=0,Le=Ce.length,pn=Te.length,xt,yi;yt<Le;){if(U>=pn)return-1;if(xt=Ce.charCodeAt(yt++),xt===37){if(xt=Ce.charAt(yt++),yi=k[xt in eP?Ce.charAt(yt++):xt],!yi||(U=yi(H,Te,U))<0)return-1}else if(xt!=Te.charCodeAt(U++))return-1}return U}function N(H,Ce,Te){var U=c.exec(Ce.slice(Te));return U?(H.p=d.get(U[0].toLowerCase()),Te+U[0].length):-1}function _(H,Ce,Te){var U=h.exec(Ce.slice(Te));return U?(H.w=m.get(U[0].toLowerCase()),Te+U[0].length):-1}function M(H,Ce,Te){var U=f.exec(Ce.slice(Te));return U?(H.w=p.get(U[0].toLowerCase()),Te+U[0].length):-1}function R(H,Ce,Te){var U=x.exec(Ce.slice(Te));return U?(H.m=b.get(U[0].toLowerCase()),Te+U[0].length):-1}function G(H,Ce,Te){var U=y.exec(Ce.slice(Te));return U?(H.m=g.get(U[0].toLowerCase()),Te+U[0].length):-1}function V(H,Ce,Te){return C(H,t,Ce,Te)}function ee(H,Ce,Te){return C(H,n,Ce,Te)}function Q(H,Ce,Te){return C(H,r,Ce,Te)}function te(H){return o[H.getDay()]}function $(H){return a[H.getDay()]}function B(H){return l[H.getMonth()]}function L(H){return s[H.getMonth()]}function Y(H){return i[+(H.getHours()>=12)]}function re(H){return 1+~~(H.getMonth()/3)}function Oe(H){return o[H.getUTCDay()]}function we(H){return a[H.getUTCDay()]}function ie(H){return l[H.getUTCMonth()]}function We(H){return s[H.getUTCMonth()]}function Xe(H){return i[+(H.getUTCHours()>=12)]}function Or(H){return 1+~~(H.getUTCMonth()/3)}return{format:function(H){var Ce=P(H+="",w);return Ce.toString=function(){return H},Ce},parse:function(H){var Ce=S(H+="",!1);return Ce.toString=function(){return H},Ce},utcFormat:function(H){var Ce=P(H+="",j);return Ce.toString=function(){return H},Ce},utcParse:function(H){var Ce=S(H+="",!0);return Ce.toString=function(){return H},Ce}}}var eP={"-":"",_:" ",0:"0"},Ut=/^\s*\d+/,Cq=/^%/,Oq=/[\\^$*+?|[\]().{}]/g;function Ie(e,t,n){var r=e<0?"-":"",i=(r?-e:e)+"",a=i.length;return r+(a<n?new Array(n-a+1).join(t)+i:i)}function Eq(e){return e.replace(Oq,"\\$&")}function rc(e){return new RegExp("^(?:"+e.map(Eq).join("|")+")","i")}function ic(e){return new Map(e.map((t,n)=>[t.toLowerCase(),n]))}function Nq(e,t,n){var r=Ut.exec(t.slice(n,n+1));return r?(e.w=+r[0],n+r[0].length):-1}function _q(e,t,n){var r=Ut.exec(t.slice(n,n+1));return r?(e.u=+r[0],n+r[0].length):-1}function Aq(e,t,n){var r=Ut.exec(t.slice(n,n+2));return r?(e.U=+r[0],n+r[0].length):-1}function Tq(e,t,n){var r=Ut.exec(t.slice(n,n+2));return r?(e.V=+r[0],n+r[0].length):-1}function Rq(e,t,n){var r=Ut.exec(t.slice(n,n+2));return r?(e.W=+r[0],n+r[0].length):-1}function tP(e,t,n){var r=Ut.exec(t.slice(n,n+4));return r?(e.y=+r[0],n+r[0].length):-1}function nP(e,t,n){var r=Ut.exec(t.slice(n,n+2));return r?(e.y=+r[0]+(+r[0]>68?1900:2e3),n+r[0].length):-1}function Mq(e,t,n){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n,n+6));return r?(e.Z=r[1]?0:-(r[2]+(r[3]||"00")),n+r[0].length):-1}function Dq(e,t,n){var r=Ut.exec(t.slice(n,n+1));return r?(e.q=r[0]*3-3,n+r[0].length):-1}function zq(e,t,n){var r=Ut.exec(t.slice(n,n+2));return r?(e.m=r[0]-1,n+r[0].length):-1}function rP(e,t,n){var r=Ut.exec(t.slice(n,n+2));return r?(e.d=+r[0],n+r[0].length):-1}function Iq(e,t,n){var r=Ut.exec(t.slice(n,n+3));return r?(e.m=0,e.d=+r[0],n+r[0].length):-1}function iP(e,t,n){var r=Ut.exec(t.slice(n,n+2));return r?(e.H=+r[0],n+r[0].length):-1}function $q(e,t,n){var r=Ut.exec(t.slice(n,n+2));return r?(e.M=+r[0],n+r[0].length):-1}function Lq(e,t,n){var r=Ut.exec(t.slice(n,n+2));return r?(e.S=+r[0],n+r[0].length):-1}function Fq(e,t,n){var r=Ut.exec(t.slice(n,n+3));return r?(e.L=+r[0],n+r[0].length):-1}function Uq(e,t,n){var r=Ut.exec(t.slice(n,n+6));return r?(e.L=Math.floor(r[0]/1e3),n+r[0].length):-1}function Bq(e,t,n){var r=Cq.exec(t.slice(n,n+1));return r?n+r[0].length:-1}function Wq(e,t,n){var r=Ut.exec(t.slice(n));return r?(e.Q=+r[0],n+r[0].length):-1}function Hq(e,t,n){var r=Ut.exec(t.slice(n));return r?(e.s=+r[0],n+r[0].length):-1}function aP(e,t){return Ie(e.getDate(),t,2)}function Kq(e,t){return Ie(e.getHours(),t,2)}function Vq(e,t){return Ie(e.getHours()%12||12,t,2)}function Zq(e,t){return Ie(1+Bu.count(Zi(e),e),t,3)}function RT(e,t){return Ie(e.getMilliseconds(),t,3)}function qq(e,t){return RT(e,t)+"000"}function Yq(e,t){return Ie(e.getMonth()+1,t,2)}function Gq(e,t){return Ie(e.getMinutes(),t,2)}function Qq(e,t){return Ie(e.getSeconds(),t,2)}function Xq(e){var t=e.getDay();return t===0?7:t}function Jq(e,t){return Ie(rm.count(Zi(e)-1,e),t,2)}function MT(e){var t=e.getDay();return t>=4||t===0?gl(e):gl.ceil(e)}function eY(e,t){return e=MT(e),Ie(gl.count(Zi(e),e)+(Zi(e).getDay()===4),t,2)}function tY(e){return e.getDay()}function nY(e,t){return Ie(Tp.count(Zi(e)-1,e),t,2)}function rY(e,t){return Ie(e.getFullYear()%100,t,2)}function iY(e,t){return e=MT(e),Ie(e.getFullYear()%100,t,2)}function aY(e,t){return Ie(e.getFullYear()%1e4,t,4)}function oY(e,t){var n=e.getDay();return e=n>=4||n===0?gl(e):gl.ceil(e),Ie(e.getFullYear()%1e4,t,4)}function sY(e){var t=e.getTimezoneOffset();return(t>0?"-":(t*=-1,"+"))+Ie(t/60|0,"0",2)+Ie(t%60,"0",2)}function oP(e,t){return Ie(e.getUTCDate(),t,2)}function lY(e,t){return Ie(e.getUTCHours(),t,2)}function cY(e,t){return Ie(e.getUTCHours()%12||12,t,2)}function uY(e,t){return Ie(1+nm.count(qi(e),e),t,3)}function DT(e,t){return Ie(e.getUTCMilliseconds(),t,3)}function dY(e,t){return DT(e,t)+"000"}function fY(e,t){return Ie(e.getUTCMonth()+1,t,2)}function pY(e,t){return Ie(e.getUTCMinutes(),t,2)}function hY(e,t){return Ie(e.getUTCSeconds(),t,2)}function mY(e){var t=e.getUTCDay();return t===0?7:t}function gY(e,t){return Ie(im.count(qi(e)-1,e),t,2)}function zT(e){var t=e.getUTCDay();return t>=4||t===0?vl(e):vl.ceil(e)}function vY(e,t){return e=zT(e),Ie(vl.count(qi(e),e)+(qi(e).getUTCDay()===4),t,2)}function yY(e){return e.getUTCDay()}function xY(e,t){return Ie(Rp.count(qi(e)-1,e),t,2)}function bY(e,t){return Ie(e.getUTCFullYear()%100,t,2)}function wY(e,t){return e=zT(e),Ie(e.getUTCFullYear()%100,t,2)}function jY(e,t){return Ie(e.getUTCFullYear()%1e4,t,4)}function SY(e,t){var n=e.getUTCDay();return e=n>=4||n===0?vl(e):vl.ceil(e),Ie(e.getUTCFullYear()%1e4,t,4)}function kY(){return"+0000"}function sP(){return"%"}function lP(e){return+e}function cP(e){return Math.floor(+e/1e3)}var fs,IT,$T;PY({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function PY(e){return fs=Pq(e),IT=fs.format,fs.parse,$T=fs.utcFormat,fs.utcParse,fs}function CY(e){return new Date(e)}function OY(e){return e instanceof Date?+e:+new Date(+e)}function bb(e,t,n,r,i,a,o,s,l,c){var d=ob(),f=d.invert,p=d.domain,h=c(".%L"),m=c(":%S"),y=c("%I:%M"),g=c("%I %p"),x=c("%a %d"),b=c("%b %d"),w=c("%B"),j=c("%Y");function k(P){return(l(P)<P?h:s(P)<P?m:o(P)<P?y:a(P)<P?g:r(P)<P?i(P)<P?x:b:n(P)<P?w:j)(P)}return d.invert=function(P){return new Date(f(P))},d.domain=function(P){return arguments.length?p(Array.from(P,OY)):p().map(CY)},d.ticks=function(P){var S=p();return e(S[0],S[S.length-1],P??10)},d.tickFormat=function(P,S){return S==null?k:c(S)},d.nice=function(P){var S=p();return(!P||typeof P.range!="function")&&(P=t(S[0],S[S.length-1],P??10)),P?p(kT(S,P)):d},d.copy=function(){return Uu(d,bb(e,t,n,r,i,a,o,s,l,c))},d}function EY(){return Cr.apply(bb(Sq,kq,Zi,yb,rm,Bu,gb,hb,Po,IT).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}function NY(){return Cr.apply(bb(wq,jq,qi,xb,im,nm,vb,mb,Po,$T).domain([Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)]),arguments)}function am(){var e=0,t=1,n,r,i,a,o=xn,s=!1,l;function c(f){return f==null||isNaN(f=+f)?l:o(i===0?.5:(f=(a(f)-n)*i,s?Math.max(0,Math.min(1,f)):f))}c.domain=function(f){return arguments.length?([e,t]=f,n=a(e=+e),r=a(t=+t),i=n===r?0:1/(r-n),c):[e,t]},c.clamp=function(f){return arguments.length?(s=!!f,c):s},c.interpolator=function(f){return arguments.length?(o=f,c):o};function d(f){return function(p){var h,m;return arguments.length?([h,m]=p,o=f(h,m),c):[o(0),o(1)]}}return c.range=d(Ol),c.rangeRound=d(ab),c.unknown=function(f){return arguments.length?(l=f,c):l},function(f){return a=f,n=f(e),r=f(t),i=n===r?0:1/(r-n),c}}function io(e,t){return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown())}function LT(){var e=ro(am()(xn));return e.copy=function(){return io(e,LT())},na.apply(e,arguments)}function FT(){var e=cb(am()).domain([1,10]);return e.copy=function(){return io(e,FT()).base(e.base())},na.apply(e,arguments)}function UT(){var e=ub(am());return e.copy=function(){return io(e,UT()).constant(e.constant())},na.apply(e,arguments)}function wb(){var e=db(am());return e.copy=function(){return io(e,wb()).exponent(e.exponent())},na.apply(e,arguments)}function _Y(){return wb.apply(null,arguments).exponent(.5)}function BT(){var e=[],t=xn;function n(r){if(r!=null&&!isNaN(r=+r))return t((Lu(e,r,1)-1)/(e.length-1))}return n.domain=function(r){if(!arguments.length)return e.slice();e=[];for(let i of r)i!=null&&!isNaN(i=+i)&&e.push(i);return e.sort(Ua),n},n.interpolator=function(r){return arguments.length?(t=r,n):t},n.range=function(){return e.map((r,i)=>t(i/(e.length-1)))},n.quantiles=function(r){return Array.from({length:r+1},(i,a)=>mZ(e,a/r))},n.copy=function(){return BT(t).domain(e)},na.apply(n,arguments)}function om(){var e=0,t=.5,n=1,r=1,i,a,o,s,l,c=xn,d,f=!1,p;function h(y){return isNaN(y=+y)?p:(y=.5+((y=+d(y))-a)*(r*y<r*a?s:l),c(f?Math.max(0,Math.min(1,y)):y))}h.domain=function(y){return arguments.length?([e,t,n]=y,i=d(e=+e),a=d(t=+t),o=d(n=+n),s=i===a?0:.5/(a-i),l=a===o?0:.5/(o-a),r=a<i?-1:1,h):[e,t,n]},h.clamp=function(y){return arguments.length?(f=!!y,h):f},h.interpolator=function(y){return arguments.length?(c=y,h):c};function m(y){return function(g){var x,b,w;return arguments.length?([x,b,w]=g,c=BZ(y,[x,b,w]),h):[c(0),c(.5),c(1)]}}return h.range=m(Ol),h.rangeRound=m(ab),h.unknown=function(y){return arguments.length?(p=y,h):p},function(y){return d=y,i=y(e),a=y(t),o=y(n),s=i===a?0:.5/(a-i),l=a===o?0:.5/(o-a),r=a<i?-1:1,h}}function WT(){var e=ro(om()(xn));return e.copy=function(){return io(e,WT())},na.apply(e,arguments)}function HT(){var e=cb(om()).domain([.1,1,10]);return e.copy=function(){return io(e,HT()).base(e.base())},na.apply(e,arguments)}function KT(){var e=ub(om());return e.copy=function(){return io(e,KT()).constant(e.constant())},na.apply(e,arguments)}function jb(){var e=db(om());return e.copy=function(){return io(e,jb()).exponent(e.exponent())},na.apply(e,arguments)}function AY(){return jb.apply(null,arguments).exponent(.5)}const mc=Object.freeze(Object.defineProperty({__proto__:null,scaleBand:nb,scaleDiverging:WT,scaleDivergingLog:HT,scaleDivergingPow:jb,scaleDivergingSqrt:AY,scaleDivergingSymlog:KT,scaleIdentity:ST,scaleImplicit:My,scaleLinear:jT,scaleLog:PT,scaleOrdinal:tb,scalePoint:yZ,scalePow:fb,scaleQuantile:ET,scaleQuantize:NT,scaleRadial:OT,scaleSequential:LT,scaleSequentialLog:FT,scaleSequentialPow:wb,scaleSequentialQuantile:BT,scaleSequentialSqrt:_Y,scaleSequentialSymlog:UT,scaleSqrt:dq,scaleSymlog:CT,scaleThreshold:_T,scaleTime:EY,scaleUtc:NY,tickFormat:wT},Symbol.toStringTag,{value:"Module"}));var ao=e=>e.chartData,TY=I([ao],e=>{var t=e.chartData!=null?e.chartData.length-1:0;return{chartData:e.chartData,computedData:e.computedData,dataEndIndex:t,dataStartIndex:0}}),Sb=(e,t,n,r)=>r?TY(e):ao(e);function Yi(e){if(Array.isArray(e)&&e.length===2){var[t,n]=e;if(ze(t)&&ze(n))return!0}return!1}function uP(e,t,n){return n?e:[Math.min(e[0],t[0]),Math.max(e[1],t[1])]}function VT(e,t){if(t&&typeof e!="function"&&Array.isArray(e)&&e.length===2){var[n,r]=e,i,a;if(ze(n))i=n;else if(typeof n=="function")return;if(ze(r))a=r;else if(typeof r=="function")return;var o=[i,a];if(Yi(o))return o}}function RY(e,t,n){if(!(!n&&t==null)){if(typeof e=="function"&&t!=null)try{var r=e(t,n);if(Yi(r))return uP(r,t,n)}catch{}if(Array.isArray(e)&&e.length===2){var[i,a]=e,o,s;if(i==="auto")t!=null&&(o=Math.min(...t));else if(ue(i))o=i;else if(typeof i=="function")try{t!=null&&(o=i(t==null?void 0:t[0]))}catch{}else if(typeof i=="string"&&ES.test(i)){var l=ES.exec(i);if(l==null||l[1]==null||t==null)o=void 0;else{var c=+l[1];o=t[0]-c}}else o=t==null?void 0:t[0];if(a==="auto")t!=null&&(s=Math.max(...t));else if(ue(a))s=a;else if(typeof a=="function")try{t!=null&&(s=a(t==null?void 0:t[1]))}catch{}else if(typeof a=="string"&&NS.test(a)){var d=NS.exec(a);if(d==null||d[1]==null||t==null)s=void 0;else{var f=+d[1];s=t[1]+f}}else s=t==null?void 0:t[1];var p=[o,s];if(Yi(p))return t==null?p:uP(p,t,n)}}}var El=1e9,MY={precision:20,rounding:4,toExpNeg:-7,toExpPos:21,LN10:"2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"},Pb,nt=!0,Sr="[DecimalError] ",Uo=Sr+"Invalid argument: ",kb=Sr+"Exponent out of range: ",Nl=Math.floor,go=Math.pow,DY=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,Zn,$t=1e7,Ge=7,ZT=9007199254740991,Mp=Nl(ZT/Ge),oe={};oe.absoluteValue=oe.abs=function(){var e=new this.constructor(this);return e.s&&(e.s=1),e};oe.comparedTo=oe.cmp=function(e){var t,n,r,i,a=this;if(e=new a.constructor(e),a.s!==e.s)return a.s||-e.s;if(a.e!==e.e)return a.e>e.e^a.s<0?1:-1;for(r=a.d.length,i=e.d.length,t=0,n=r<i?r:i;t<n;++t)if(a.d[t]!==e.d[t])return a.d[t]>e.d[t]^a.s<0?1:-1;return r===i?0:r>i^a.s<0?1:-1};oe.decimalPlaces=oe.dp=function(){var e=this,t=e.d.length-1,n=(t-e.e)*Ge;if(t=e.d[t],t)for(;t%10==0;t/=10)n--;return n<0?0:n};oe.dividedBy=oe.div=function(e){return Ii(this,new this.constructor(e))};oe.dividedToIntegerBy=oe.idiv=function(e){var t=this,n=t.constructor;return Ve(Ii(t,new n(e),0,1),n.precision)};oe.equals=oe.eq=function(e){return!this.cmp(e)};oe.exponent=function(){return Pt(this)};oe.greaterThan=oe.gt=function(e){return this.cmp(e)>0};oe.greaterThanOrEqualTo=oe.gte=function(e){return this.cmp(e)>=0};oe.isInteger=oe.isint=function(){return this.e>this.d.length-2};oe.isNegative=oe.isneg=function(){return this.s<0};oe.isPositive=oe.ispos=function(){return this.s>0};oe.isZero=function(){return this.s===0};oe.lessThan=oe.lt=function(e){return this.cmp(e)<0};oe.lessThanOrEqualTo=oe.lte=function(e){return this.cmp(e)<1};oe.logarithm=oe.log=function(e){var t,n=this,r=n.constructor,i=r.precision,a=i+5;if(e===void 0)e=new r(10);else if(e=new r(e),e.s<1||e.eq(Zn))throw Error(Sr+"NaN");if(n.s<1)throw Error(Sr+(n.s?"NaN":"-Infinity"));return n.eq(Zn)?new r(0):(nt=!1,t=Ii(lu(n,a),lu(e,a),a),nt=!0,Ve(t,i))};oe.minus=oe.sub=function(e){var t=this;return e=new t.constructor(e),t.s==e.s?GT(t,e):qT(t,(e.s=-e.s,e))};oe.modulo=oe.mod=function(e){var t,n=this,r=n.constructor,i=r.precision;if(e=new r(e),!e.s)throw Error(Sr+"NaN");return n.s?(nt=!1,t=Ii(n,e,0,1).times(e),nt=!0,n.minus(t)):Ve(new r(n),i)};oe.naturalExponential=oe.exp=function(){return YT(this)};oe.naturalLogarithm=oe.ln=function(){return lu(this)};oe.negated=oe.neg=function(){var e=new this.constructor(this);return e.s=-e.s||0,e};oe.plus=oe.add=function(e){var t=this;return e=new t.constructor(e),t.s==e.s?qT(t,e):GT(t,(e.s=-e.s,e))};oe.precision=oe.sd=function(e){var t,n,r,i=this;if(e!==void 0&&e!==!!e&&e!==1&&e!==0)throw Error(Uo+e);if(t=Pt(i)+1,r=i.d.length-1,n=r*Ge+1,r=i.d[r],r){for(;r%10==0;r/=10)n--;for(r=i.d[0];r>=10;r/=10)n++}return e&&t>n?t:n};oe.squareRoot=oe.sqrt=function(){var e,t,n,r,i,a,o,s=this,l=s.constructor;if(s.s<1){if(!s.s)return new l(0);throw Error(Sr+"NaN")}for(e=Pt(s),nt=!1,i=Math.sqrt(+s),i==0||i==1/0?(t=ii(s.d),(t.length+e)%2==0&&(t+="0"),i=Math.sqrt(t),e=Nl((e+1)/2)-(e<0||e%2),i==1/0?t="5e"+e:(t=i.toExponential(),t=t.slice(0,t.indexOf("e")+1)+e),r=new l(t)):r=new l(i.toString()),n=l.precision,i=o=n+3;;)if(a=r,r=a.plus(Ii(s,a,o+2)).times(.5),ii(a.d).slice(0,o)===(t=ii(r.d)).slice(0,o)){if(t=t.slice(o-3,o+1),i==o&&t=="4999"){if(Ve(a,n+1,0),a.times(a).eq(s)){r=a;break}}else if(t!="9999")break;o+=4}return nt=!0,Ve(r,n)};oe.times=oe.mul=function(e){var t,n,r,i,a,o,s,l,c,d=this,f=d.constructor,p=d.d,h=(e=new f(e)).d;if(!d.s||!e.s)return new f(0);for(e.s*=d.s,n=d.e+e.e,l=p.length,c=h.length,l<c&&(a=p,p=h,h=a,o=l,l=c,c=o),a=[],o=l+c,r=o;r--;)a.push(0);for(r=c;--r>=0;){for(t=0,i=l+r;i>r;)s=a[i]+h[r]*p[i-r-1]+t,a[i--]=s%$t|0,t=s/$t|0;a[i]=(a[i]+t)%$t|0}for(;!a[--o];)a.pop();return t?++n:a.shift(),e.d=a,e.e=n,nt?Ve(e,f.precision):e};oe.toDecimalPlaces=oe.todp=function(e,t){var n=this,r=n.constructor;return n=new r(n),e===void 0?n:(pi(e,0,El),t===void 0?t=r.rounding:pi(t,0,8),Ve(n,e+Pt(n)+1,t))};oe.toExponential=function(e,t){var n,r=this,i=r.constructor;return e===void 0?n=ts(r,!0):(pi(e,0,El),t===void 0?t=i.rounding:pi(t,0,8),r=Ve(new i(r),e+1,t),n=ts(r,!0,e+1)),n};oe.toFixed=function(e,t){var n,r,i=this,a=i.constructor;return e===void 0?ts(i):(pi(e,0,El),t===void 0?t=a.rounding:pi(t,0,8),r=Ve(new a(i),e+Pt(i)+1,t),n=ts(r.abs(),!1,e+Pt(r)+1),i.isneg()&&!i.isZero()?"-"+n:n)};oe.toInteger=oe.toint=function(){var e=this,t=e.constructor;return Ve(new t(e),Pt(e)+1,t.rounding)};oe.toNumber=function(){return+this};oe.toPower=oe.pow=function(e){var t,n,r,i,a,o,s=this,l=s.constructor,c=12,d=+(e=new l(e));if(!e.s)return new l(Zn);if(s=new l(s),!s.s){if(e.s<1)throw Error(Sr+"Infinity");return s}if(s.eq(Zn))return s;if(r=l.precision,e.eq(Zn))return Ve(s,r);if(t=e.e,n=e.d.length-1,o=t>=n,a=s.s,o){if((n=d<0?-d:d)<=ZT){for(i=new l(Zn),t=Math.ceil(r/Ge+4),nt=!1;n%2&&(i=i.times(s),fP(i.d,t)),n=Nl(n/2),n!==0;)s=s.times(s),fP(s.d,t);return nt=!0,e.s<0?new l(Zn).div(i):Ve(i,r)}}else if(a<0)throw Error(Sr+"NaN");return a=a<0&&e.d[Math.max(t,n)]&1?-1:1,s.s=1,nt=!1,i=e.times(lu(s,r+c)),nt=!0,i=YT(i),i.s=a,i};oe.toPrecision=function(e,t){var n,r,i=this,a=i.constructor;return e===void 0?(n=Pt(i),r=ts(i,n<=a.toExpNeg||n>=a.toExpPos)):(pi(e,1,El),t===void 0?t=a.rounding:pi(t,0,8),i=Ve(new a(i),e,t),n=Pt(i),r=ts(i,e<=n||n<=a.toExpNeg,e)),r};oe.toSignificantDigits=oe.tosd=function(e,t){var n=this,r=n.constructor;return e===void 0?(e=r.precision,t=r.rounding):(pi(e,1,El),t===void 0?t=r.rounding:pi(t,0,8)),Ve(new r(n),e,t)};oe.toString=oe.valueOf=oe.val=oe.toJSON=oe[Symbol.for("nodejs.util.inspect.custom")]=function(){var e=this,t=Pt(e),n=e.constructor;return ts(e,t<=n.toExpNeg||t>=n.toExpPos)};function qT(e,t){var n,r,i,a,o,s,l,c,d=e.constructor,f=d.precision;if(!e.s||!t.s)return t.s||(t=new d(e)),nt?Ve(t,f):t;if(l=e.d,c=t.d,o=e.e,i=t.e,l=l.slice(),a=o-i,a){for(a<0?(r=l,a=-a,s=c.length):(r=c,i=o,s=l.length),o=Math.ceil(f/Ge),s=o>s?o+1:s+1,a>s&&(a=s,r.length=1),r.reverse();a--;)r.push(0);r.reverse()}for(s=l.length,a=c.length,s-a<0&&(a=s,r=c,c=l,l=r),n=0;a;)n=(l[--a]=l[a]+c[a]+n)/$t|0,l[a]%=$t;for(n&&(l.unshift(n),++i),s=l.length;l[--s]==0;)l.pop();return t.d=l,t.e=i,nt?Ve(t,f):t}function pi(e,t,n){if(e!==~~e||e<t||e>n)throw Error(Uo+e)}function ii(e){var t,n,r,i=e.length-1,a="",o=e[0];if(i>0){for(a+=o,t=1;t<i;t++)r=e[t]+"",n=Ge-r.length,n&&(a+=fa(n)),a+=r;o=e[t],r=o+"",n=Ge-r.length,n&&(a+=fa(n))}else if(o===0)return"0";for(;o%10===0;)o/=10;return a+o}var Ii=function(){function e(r,i){var a,o=0,s=r.length;for(r=r.slice();s--;)a=r[s]*i+o,r[s]=a%$t|0,o=a/$t|0;return o&&r.unshift(o),r}function t(r,i,a,o){var s,l;if(a!=o)l=a>o?1:-1;else for(s=l=0;s<a;s++)if(r[s]!=i[s]){l=r[s]>i[s]?1:-1;break}return l}function n(r,i,a){for(var o=0;a--;)r[a]-=o,o=r[a]<i[a]?1:0,r[a]=o*$t+r[a]-i[a];for(;!r[0]&&r.length>1;)r.shift()}return function(r,i,a,o){var s,l,c,d,f,p,h,m,y,g,x,b,w,j,k,P,S,C,N=r.constructor,_=r.s==i.s?1:-1,M=r.d,R=i.d;if(!r.s)return new N(r);if(!i.s)throw Error(Sr+"Division by zero");for(l=r.e-i.e,S=R.length,k=M.length,h=new N(_),m=h.d=[],c=0;R[c]==(M[c]||0);)++c;if(R[c]>(M[c]||0)&&--l,a==null?b=a=N.precision:o?b=a+(Pt(r)-Pt(i))+1:b=a,b<0)return new N(0);if(b=b/Ge+2|0,c=0,S==1)for(d=0,R=R[0],b++;(c<k||d)&&b--;c++)w=d*$t+(M[c]||0),m[c]=w/R|0,d=w%R|0;else{for(d=$t/(R[0]+1)|0,d>1&&(R=e(R,d),M=e(M,d),S=R.length,k=M.length),j=S,y=M.slice(0,S),g=y.length;g<S;)y[g++]=0;C=R.slice(),C.unshift(0),P=R[0],R[1]>=$t/2&&++P;do d=0,s=t(R,y,S,g),s<0?(x=y[0],S!=g&&(x=x*$t+(y[1]||0)),d=x/P|0,d>1?(d>=$t&&(d=$t-1),f=e(R,d),p=f.length,g=y.length,s=t(f,y,p,g),s==1&&(d--,n(f,S<p?C:R,p))):(d==0&&(s=d=1),f=R.slice()),p=f.length,p<g&&f.unshift(0),n(y,f,g),s==-1&&(g=y.length,s=t(R,y,S,g),s<1&&(d++,n(y,S<g?C:R,g))),g=y.length):s===0&&(d++,y=[0]),m[c++]=d,s&&y[0]?y[g++]=M[j]||0:(y=[M[j]],g=1);while((j++<k||y[0]!==void 0)&&b--)}return m[0]||m.shift(),h.e=l,Ve(h,o?a+Pt(h)+1:a)}}();function YT(e,t){var n,r,i,a,o,s,l=0,c=0,d=e.constructor,f=d.precision;if(Pt(e)>16)throw Error(kb+Pt(e));if(!e.s)return new d(Zn);for(nt=!1,s=f,o=new d(.03125);e.abs().gte(.1);)e=e.times(o),c+=5;for(r=Math.log(go(2,c))/Math.LN10*2+5|0,s+=r,n=i=a=new d(Zn),d.precision=s;;){if(i=Ve(i.times(e),s),n=n.times(++l),o=a.plus(Ii(i,n,s)),ii(o.d).slice(0,s)===ii(a.d).slice(0,s)){for(;c--;)a=Ve(a.times(a),s);return d.precision=f,t==null?(nt=!0,Ve(a,f)):a}a=o}}function Pt(e){for(var t=e.e*Ge,n=e.d[0];n>=10;n/=10)t++;return t}function kg(e,t,n){if(t>e.LN10.sd())throw nt=!0,n&&(e.precision=n),Error(Sr+"LN10 precision limit exceeded");return Ve(new e(e.LN10),t)}function fa(e){for(var t="";e--;)t+="0";return t}function lu(e,t){var n,r,i,a,o,s,l,c,d,f=1,p=10,h=e,m=h.d,y=h.constructor,g=y.precision;if(h.s<1)throw Error(Sr+(h.s?"NaN":"-Infinity"));if(h.eq(Zn))return new y(0);if(t==null?(nt=!1,c=g):c=t,h.eq(10))return t==null&&(nt=!0),kg(y,c);if(c+=p,y.precision=c,n=ii(m),r=n.charAt(0),a=Pt(h),Math.abs(a)<15e14){for(;r<7&&r!=1||r==1&&n.charAt(1)>3;)h=h.times(e),n=ii(h.d),r=n.charAt(0),f++;a=Pt(h),r>1?(h=new y("0."+n),a++):h=new y(r+"."+n.slice(1))}else return l=kg(y,c+2,g).times(a+""),h=lu(new y(r+"."+n.slice(1)),c-p).plus(l),y.precision=g,t==null?(nt=!0,Ve(h,g)):h;for(s=o=h=Ii(h.minus(Zn),h.plus(Zn),c),d=Ve(h.times(h),c),i=3;;){if(o=Ve(o.times(d),c),l=s.plus(Ii(o,new y(i),c)),ii(l.d).slice(0,c)===ii(s.d).slice(0,c))return s=s.times(2),a!==0&&(s=s.plus(kg(y,c+2,g).times(a+""))),s=Ii(s,new y(f),c),y.precision=g,t==null?(nt=!0,Ve(s,g)):s;s=l,i+=2}}function dP(e,t){var n,r,i;for((n=t.indexOf("."))>-1&&(t=t.replace(".","")),(r=t.search(/e/i))>0?(n<0&&(n=r),n+=+t.slice(r+1),t=t.substring(0,r)):n<0&&(n=t.length),r=0;t.charCodeAt(r)===48;)++r;for(i=t.length;t.charCodeAt(i-1)===48;)--i;if(t=t.slice(r,i),t){if(i-=r,n=n-r-1,e.e=Nl(n/Ge),e.d=[],r=(n+1)%Ge,n<0&&(r+=Ge),r<i){for(r&&e.d.push(+t.slice(0,r)),i-=Ge;r<i;)e.d.push(+t.slice(r,r+=Ge));t=t.slice(r),r=Ge-t.length}else r-=i;for(;r--;)t+="0";if(e.d.push(+t),nt&&(e.e>Mp||e.e<-Mp))throw Error(kb+n)}else e.s=0,e.e=0,e.d=[0];return e}function Ve(e,t,n){var r,i,a,o,s,l,c,d,f=e.d;for(o=1,a=f[0];a>=10;a/=10)o++;if(r=t-o,r<0)r+=Ge,i=t,c=f[d=0];else{if(d=Math.ceil((r+1)/Ge),a=f.length,d>=a)return e;for(c=a=f[d],o=1;a>=10;a/=10)o++;r%=Ge,i=r-Ge+o}if(n!==void 0&&(a=go(10,o-i-1),s=c/a%10|0,l=t<0||f[d+1]!==void 0||c%a,l=n<4?(s||l)&&(n==0||n==(e.s<0?3:2)):s>5||s==5&&(n==4||l||n==6&&(r>0?i>0?c/go(10,o-i):0:f[d-1])%10&1||n==(e.s<0?8:7))),t<1||!f[0])return l?(a=Pt(e),f.length=1,t=t-a-1,f[0]=go(10,(Ge-t%Ge)%Ge),e.e=Nl(-t/Ge)||0):(f.length=1,f[0]=e.e=e.s=0),e;if(r==0?(f.length=d,a=1,d--):(f.length=d+1,a=go(10,Ge-r),f[d]=i>0?(c/go(10,o-i)%go(10,i)|0)*a:0),l)for(;;)if(d==0){(f[0]+=a)==$t&&(f[0]=1,++e.e);break}else{if(f[d]+=a,f[d]!=$t)break;f[d--]=0,a=1}for(r=f.length;f[--r]===0;)f.pop();if(nt&&(e.e>Mp||e.e<-Mp))throw Error(kb+Pt(e));return e}function GT(e,t){var n,r,i,a,o,s,l,c,d,f,p=e.constructor,h=p.precision;if(!e.s||!t.s)return t.s?t.s=-t.s:t=new p(e),nt?Ve(t,h):t;if(l=e.d,f=t.d,r=t.e,c=e.e,l=l.slice(),o=c-r,o){for(d=o<0,d?(n=l,o=-o,s=f.length):(n=f,r=c,s=l.length),i=Math.max(Math.ceil(h/Ge),s)+2,o>i&&(o=i,n.length=1),n.reverse(),i=o;i--;)n.push(0);n.reverse()}else{for(i=l.length,s=f.length,d=i<s,d&&(s=i),i=0;i<s;i++)if(l[i]!=f[i]){d=l[i]<f[i];break}o=0}for(d&&(n=l,l=f,f=n,t.s=-t.s),s=l.length,i=f.length-s;i>0;--i)l[s++]=0;for(i=f.length;i>o;){if(l[--i]<f[i]){for(a=i;a&&l[--a]===0;)l[a]=$t-1;--l[a],l[i]+=$t}l[i]-=f[i]}for(;l[--s]===0;)l.pop();for(;l[0]===0;l.shift())--r;return l[0]?(t.d=l,t.e=r,nt?Ve(t,h):t):new p(0)}function ts(e,t,n){var r,i=Pt(e),a=ii(e.d),o=a.length;return t?(n&&(r=n-o)>0?a=a.charAt(0)+"."+a.slice(1)+fa(r):o>1&&(a=a.charAt(0)+"."+a.slice(1)),a=a+(i<0?"e":"e+")+i):i<0?(a="0."+fa(-i-1)+a,n&&(r=n-o)>0&&(a+=fa(r))):i>=o?(a+=fa(i+1-o),n&&(r=n-i-1)>0&&(a=a+"."+fa(r))):((r=i+1)<o&&(a=a.slice(0,r)+"."+a.slice(r)),n&&(r=n-o)>0&&(i+1===o&&(a+="."),a+=fa(r))),e.s<0?"-"+a:a}function fP(e,t){if(e.length>t)return e.length=t,!0}function QT(e){var t,n,r;function i(a){var o=this;if(!(o instanceof i))return new i(a);if(o.constructor=i,a instanceof i){o.s=a.s,o.e=a.e,o.d=(a=a.d)?a.slice():a;return}if(typeof a=="number"){if(a*0!==0)throw Error(Uo+a);if(a>0)o.s=1;else if(a<0)a=-a,o.s=-1;else{o.s=0,o.e=0,o.d=[0];return}if(a===~~a&&a<1e7){o.e=0,o.d=[a];return}return dP(o,a.toString())}else if(typeof a!="string")throw Error(Uo+a);if(a.charCodeAt(0)===45?(a=a.slice(1),o.s=-1):o.s=1,DY.test(a))dP(o,a);else throw Error(Uo+a)}if(i.prototype=oe,i.ROUND_UP=0,i.ROUND_DOWN=1,i.ROUND_CEIL=2,i.ROUND_FLOOR=3,i.ROUND_HALF_UP=4,i.ROUND_HALF_DOWN=5,i.ROUND_HALF_EVEN=6,i.ROUND_HALF_CEIL=7,i.ROUND_HALF_FLOOR=8,i.clone=QT,i.config=i.set=zY,e===void 0&&(e={}),e)for(r=["precision","rounding","toExpNeg","toExpPos","LN10"],t=0;t<r.length;)e.hasOwnProperty(n=r[t++])||(e[n]=this[n]);return i.config(e),i}function zY(e){if(!e||typeof e!="object")throw Error(Sr+"Object expected");var t,n,r,i=["precision",1,El,"rounding",0,8,"toExpNeg",-1/0,0,"toExpPos",0,1/0];for(t=0;t<i.length;t+=3)if((r=e[n=i[t]])!==void 0)if(Nl(r)===r&&r>=i[t+1]&&r<=i[t+2])this[n]=r;else throw Error(Uo+n+": "+r);if((r=e[n="LN10"])!==void 0)if(r==Math.LN10)this[n]=new this(r);else throw Error(Uo+n+": "+r);return this}var Pb=QT(MY);Zn=new Pb(1);const Fe=Pb;function XT(e){var t;return e===0?t=1:t=Math.floor(new Fe(e).abs().log(10).toNumber())+1,t}function JT(e,t,n){for(var r=new Fe(e),i=0,a=[];r.lt(t)&&i<1e5;)a.push(r.toNumber()),r=r.add(n),i++;return a}var eR=e=>{var[t,n]=e,[r,i]=[t,n];return t>n&&([r,i]=[n,t]),[r,i]},tR=(e,t,n)=>{if(e.lte(0))return new Fe(0);var r=XT(e.toNumber()),i=new Fe(10).pow(r),a=e.div(i),o=r!==1?.05:.1,s=new Fe(Math.ceil(a.div(o).toNumber())).add(n).mul(o),l=s.mul(i);return t?new Fe(l.toNumber()):new Fe(Math.ceil(l.toNumber()))},IY=(e,t,n)=>{var r=new Fe(1),i=new Fe(e);if(!i.isint()&&n){var a=Math.abs(e);a<1?(r=new Fe(10).pow(XT(e)-1),i=new Fe(Math.floor(i.div(r).toNumber())).mul(r)):a>1&&(i=new Fe(Math.floor(e)))}else e===0?i=new Fe(Math.floor((t-1)/2)):n||(i=new Fe(Math.floor(e)));for(var o=Math.floor((t-1)/2),s=[],l=0;l<t;l++)s.push(i.add(new Fe(l-o).mul(r)).toNumber());return s},nR=function(t,n,r,i){var a=arguments.length>4&&arguments[4]!==void 0?arguments[4]:0;if(!Number.isFinite((n-t)/(r-1)))return{step:new Fe(0),tickMin:new Fe(0),tickMax:new Fe(0)};var o=tR(new Fe(n).sub(t).div(r-1),i,a),s;t<=0&&n>=0?s=new Fe(0):(s=new Fe(t).add(n).div(2),s=s.sub(new Fe(s).mod(o)));var l=Math.ceil(s.sub(t).div(o).toNumber()),c=Math.ceil(new Fe(n).sub(s).div(o).toNumber()),d=l+c+1;return d>r?nR(t,n,r,i,a+1):(d<r&&(c=n>0?c+(r-d):c,l=n>0?l:l+(r-d)),{step:o,tickMin:s.sub(new Fe(l).mul(o)),tickMax:s.add(new Fe(c).mul(o))})},$Y=function(t){var[n,r]=t,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:6,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,o=Math.max(i,2),[s,l]=eR([n,r]);if(s===-1/0||l===1/0){var c=l===1/0?[s,...Array(i-1).fill(1/0)]:[...Array(i-1).fill(-1/0),l];return n>r?c.reverse():c}if(s===l)return IY(s,i,a);var{step:d,tickMin:f,tickMax:p}=nR(s,l,o,a,0),h=JT(f,p.add(new Fe(.1).mul(d)),d);return n>r?h.reverse():h},LY=function(t,n){var[r,i]=t,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0,[o,s]=eR([r,i]);if(o===-1/0||s===1/0)return[r,i];if(o===s)return[o];var l=Math.max(n,2),c=tR(new Fe(s).sub(o).div(l-1),a,0),d=[...JT(new Fe(o),new Fe(s),c),s];return a===!1&&(d=d.map(f=>Math.round(f))),r>i?d.reverse():d},FY=e=>e.rootProps.barCategoryGap,sm=e=>e.rootProps.stackOffset,rR=e=>e.rootProps.reverseStackOrder,Cb=e=>e.options.chartName,Ob=e=>e.rootProps.syncId,iR=e=>e.rootProps.syncMethod,Eb=e=>e.options.eventEmitter,bn={grid:-100,barBackground:-50,area:100,cursorRectangle:200,bar:300,line:400,axis:500,scatter:600,activeBar:1e3,cursorLine:1100,activeDot:1200,label:2e3},uo={allowDecimals:!1,allowDataOverflow:!1,angleAxisId:0,reversed:!1,scale:"auto",tick:!0,type:"auto"},Yr={allowDataOverflow:!1,allowDecimals:!1,allowDuplicatedCategory:!0,includeHidden:!1,radiusAxisId:0,reversed:!1,scale:"auto",tick:!0,tickCount:5,type:"auto"},lm=(e,t)=>{if(!(!e||!t))return e!=null&&e.reversed?[t[1],t[0]]:t};function cm(e,t,n){if(n!=="auto")return n;if(e!=null)return Ji(e,t)?"category":"number"}function pP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Dp(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?pP(Object(n),!0).forEach(function(r){UY(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):pP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function UY(e,t,n){return(t=BY(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function BY(e){var t=WY(e,"string");return typeof t=="symbol"?t:t+""}function WY(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var hP={allowDataOverflow:uo.allowDataOverflow,allowDecimals:uo.allowDecimals,allowDuplicatedCategory:!1,dataKey:void 0,domain:void 0,id:uo.angleAxisId,includeHidden:!1,name:void 0,reversed:uo.reversed,scale:uo.scale,tick:uo.tick,tickCount:void 0,ticks:void 0,type:uo.type,unit:void 0},mP={allowDataOverflow:Yr.allowDataOverflow,allowDecimals:Yr.allowDecimals,allowDuplicatedCategory:Yr.allowDuplicatedCategory,dataKey:void 0,domain:void 0,id:Yr.radiusAxisId,includeHidden:Yr.includeHidden,name:void 0,reversed:Yr.reversed,scale:Yr.scale,tick:Yr.tick,tickCount:Yr.tickCount,ticks:void 0,type:Yr.type,unit:void 0},HY=(e,t)=>{if(t!=null)return e.polarAxis.angleAxis[t]},Nb=I([HY,HA],(e,t)=>{var n;if(e!=null)return e;var r=(n=cm(t,"angleAxis",hP.type))!==null&&n!==void 0?n:"category";return Dp(Dp({},hP),{},{type:r})}),KY=(e,t)=>e.polarAxis.radiusAxis[t],_b=I([KY,HA],(e,t)=>{var n;if(e!=null)return e;var r=(n=cm(t,"radiusAxis",mP.type))!==null&&n!==void 0?n:"category";return Dp(Dp({},mP),{},{type:r})}),um=e=>e.polarOptions,Ab=I([ea,ta,en],ZV),aR=I([um,Ab],(e,t)=>{if(e!=null)return qa(e.innerRadius,t,0)}),oR=I([um,Ab],(e,t)=>{if(e!=null)return qa(e.outerRadius,t,t*.8)}),VY=e=>{if(e==null)return[0,0];var{startAngle:t,endAngle:n}=e;return[t,n]},sR=I([um],VY);I([Nb,sR],lm);var lR=I([Ab,aR,oR],(e,t,n)=>{if(!(e==null||t==null||n==null))return[t,n]});I([_b,lR],lm);var cR=I([dt,um,aR,oR,ea,ta],(e,t,n,r,i,a)=>{if(!(e!=="centric"&&e!=="radial"||t==null||n==null||r==null)){var{cx:o,cy:s,startAngle:l,endAngle:c}=t;return{cx:qa(o,i,i/2),cy:qa(s,a,a/2),innerRadius:n,outerRadius:r,startAngle:l,endAngle:c,clockWise:!1}}}),Bt=(e,t)=>t,dm=(e,t,n)=>n;function uR(e){return e==null?void 0:e.id}function dR(e,t,n){var{chartData:r=[]}=t,{allowDuplicatedCategory:i,dataKey:a}=n,o=new Map;return e.forEach(s=>{var l,c=(l=s.data)!==null&&l!==void 0?l:r;if(!(c==null||c.length===0)){var d=uR(s);c.forEach((f,p)=>{var h=a==null||i?p:String(Qt(f,a,null)),m=Qt(f,s.dataKey,0),y;o.has(h)?y=o.get(h):y={},Object.assign(y,{[d]:m}),o.set(h,y)})}}),Array.from(o.values())}function Tb(e){return"stackId"in e&&e.stackId!=null&&e.dataKey!=null}var fm=(e,t)=>e===t?!0:e==null||t==null?!1:e[0]===t[0]&&e[1]===t[1];function pm(e,t){return Array.isArray(e)&&Array.isArray(t)&&e.length===0&&t.length===0?!0:e===t}function ZY(e,t){if(e.length===t.length){for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}return!1}var Wt=e=>{var t=dt(e);return t==="horizontal"?"xAxis":t==="vertical"?"yAxis":t==="centric"?"angleAxis":"radiusAxis"},_l=e=>e.tooltip.settings.axisId;function qY(e){if(e in mc)return mc[e]();var t="scale".concat(Ru(e));if(t in mc)return mc[t]()}function gP(e){var t=e.ticks,n=e.bandwidth,r=e.range(),i=[Math.min(...r),Math.max(...r)];return{domain:()=>e.domain(),range:function(a){function o(){return a.apply(this,arguments)}return o.toString=function(){return a.toString()},o}(()=>i),rangeMin:()=>i[0],rangeMax:()=>i[1],isInRange(a){var o=i[0],s=i[1];return o<=s?a>=o&&a<=s:a>=s&&a<=o},bandwidth:n?()=>n.call(e):void 0,ticks:t?a=>t.call(e,a):void 0,map:(a,o)=>{var s=e(a);if(s!=null){if(e.bandwidth&&o!==null&&o!==void 0&&o.position){var l=e.bandwidth();switch(o.position){case"middle":s+=l/2;break;case"end":s+=l;break}}return s}}}}function vP(e,t,n){if(typeof e=="function")return gP(e.copy().domain(t).range(n));if(e!=null){var r=qY(e);if(r!=null)return r.domain(t).range(n),gP(r)}}var YY=(e,t)=>{if(t!=null)switch(e){case"linear":{if(!Yi(t)){for(var n,r,i=0;i<t.length;i++){var a=t[i];ze(a)&&((n===void 0||a<n)&&(n=a),(r===void 0||a>r)&&(r=a))}return n!==void 0&&r!==void 0?[n,r]:void 0}return t}default:return t}};function yP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function zp(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?yP(Object(n),!0).forEach(function(r){GY(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):yP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function GY(e,t,n){return(t=QY(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function QY(e){var t=XY(e,"string");return typeof t=="symbol"?t:t+""}function XY(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var $y=[0,"auto"],Dt={allowDataOverflow:!1,allowDecimals:!0,allowDuplicatedCategory:!0,angle:0,dataKey:void 0,domain:void 0,height:30,hide:!0,id:0,includeHidden:!1,interval:"preserveEnd",minTickGap:5,mirror:!1,name:void 0,orientation:"bottom",padding:{left:0,right:0},reversed:!1,scale:"auto",tick:!0,tickCount:5,tickFormatter:void 0,ticks:void 0,type:"category",unit:void 0},fR=(e,t)=>e.cartesianAxis.xAxis[t],ra=(e,t)=>{var n=fR(e,t);return n??Dt},zt={allowDataOverflow:!1,allowDecimals:!0,allowDuplicatedCategory:!0,angle:0,dataKey:void 0,domain:$y,hide:!0,id:0,includeHidden:!1,interval:"preserveEnd",minTickGap:5,mirror:!1,name:void 0,orientation:"left",padding:{top:0,bottom:0},reversed:!1,scale:"auto",tick:!0,tickCount:5,tickFormatter:void 0,ticks:void 0,type:"number",unit:void 0,width:zu},pR=(e,t)=>e.cartesianAxis.yAxis[t],ia=(e,t)=>{var n=pR(e,t);return n??zt},JY={domain:[0,"auto"],includeHidden:!1,reversed:!1,allowDataOverflow:!1,allowDuplicatedCategory:!1,dataKey:void 0,id:0,name:"",range:[64,64],scale:"auto",type:"number",unit:""},Rb=(e,t)=>{var n=e.cartesianAxis.zAxis[t];return n??JY},On=(e,t,n)=>{switch(t){case"xAxis":return ra(e,n);case"yAxis":return ia(e,n);case"zAxis":return Rb(e,n);case"angleAxis":return Nb(e,n);case"radiusAxis":return _b(e,n);default:throw new Error("Unexpected axis type: ".concat(t))}},eG=(e,t,n)=>{switch(t){case"xAxis":return ra(e,n);case"yAxis":return ia(e,n);default:throw new Error("Unexpected axis type: ".concat(t))}},Wu=(e,t,n)=>{switch(t){case"xAxis":return ra(e,n);case"yAxis":return ia(e,n);case"angleAxis":return Nb(e,n);case"radiusAxis":return _b(e,n);default:throw new Error("Unexpected axis type: ".concat(t))}},hR=e=>e.graphicalItems.cartesianItems.some(t=>t.type==="bar")||e.graphicalItems.polarItems.some(t=>t.type==="radialBar");function mR(e,t){return n=>{switch(e){case"xAxis":return"xAxisId"in n&&n.xAxisId===t;case"yAxis":return"yAxisId"in n&&n.yAxisId===t;case"zAxis":return"zAxisId"in n&&n.zAxisId===t;case"angleAxis":return"angleAxisId"in n&&n.angleAxisId===t;case"radiusAxis":return"radiusAxisId"in n&&n.radiusAxisId===t;default:return!1}}}var gR=e=>e.graphicalItems.cartesianItems,tG=I([Bt,dm],mR),vR=(e,t,n)=>e.filter(n).filter(r=>(t==null?void 0:t.includeHidden)===!0?!0:!r.hide),Hu=I([gR,On,tG],vR,{memoizeOptions:{resultEqualityCheck:pm}}),yR=I([Hu],e=>e.filter(t=>t.type==="area"||t.type==="bar").filter(Tb)),xR=e=>e.filter(t=>!("stackId"in t)||t.stackId===void 0),nG=I([Hu],xR),bR=e=>e.map(t=>t.data).filter(Boolean).flat(1),rG=I([Hu],bR,{memoizeOptions:{resultEqualityCheck:pm}}),wR=(e,t)=>{var{chartData:n=[],dataStartIndex:r,dataEndIndex:i}=t;return e.length>0?e:n.slice(r,i+1)},Mb=I([rG,Sb],wR),jR=(e,t,n)=>(t==null?void 0:t.dataKey)!=null?e.map(r=>({value:Qt(r,t.dataKey)})):n.length>0?n.map(r=>r.dataKey).flatMap(r=>e.map(i=>({value:Qt(i,r)}))):e.map(r=>({value:r})),hm=I([Mb,On,Hu],jR);function SR(e,t){switch(e){case"xAxis":return t.direction==="x";case"yAxis":return t.direction==="y";default:return!1}}function mf(e){if(di(e)||e instanceof Date){var t=Number(e);if(ze(t))return t}}function xP(e){if(Array.isArray(e)){var t=[mf(e[0]),mf(e[1])];return Yi(t)?t:void 0}var n=mf(e);if(n!=null)return[n,n]}function Gi(e){return e.map(mf).filter(Mn)}function iG(e,t,n){return!n||typeof t!="number"||Hi(t)?[]:n.length?Gi(n.flatMap(r=>{var i=Qt(e,r.dataKey),a,o;if(Array.isArray(i)?[a,o]=i:a=o=i,!(!ze(a)||!ze(o)))return[t-a,t+o]})):[]}var Rt=e=>{var t=Wt(e),n=_l(e);return Wu(e,t,n)},Ku=I([Rt],e=>e==null?void 0:e.dataKey),aG=I([yR,Sb,Rt],dR),kR=(e,t,n,r)=>{var i={},a=t.reduce((o,s)=>{if(s.stackId==null)return o;var l=o[s.stackId];return l==null&&(l=[]),l.push(s),o[s.stackId]=l,o},i);return Object.fromEntries(Object.entries(a).map(o=>{var[s,l]=o,c=r?[...l].reverse():l,d=c.map(uR);return[s,{stackedData:EH(e,d,n),graphicalItems:c}]}))},oG=I([aG,yR,sm,rR],kR),PR=(e,t,n,r)=>{var{dataStartIndex:i,dataEndIndex:a}=t;if(r==null&&n!=="zAxis"){var o=AH(e,i,a);if(!(o!=null&&o[0]===0&&o[1]===0))return o}},sG=I([On],e=>e.allowDataOverflow),Db=e=>{var t;if(e==null||!("domain"in e))return $y;if(e.domain!=null)return e.domain;if("ticks"in e&&e.ticks!=null){if(e.type==="number"){var n=Gi(e.ticks);return[Math.min(...n),Math.max(...n)]}if(e.type==="category")return e.ticks.map(String)}return(t=e==null?void 0:e.domain)!==null&&t!==void 0?t:$y},CR=I([On],Db),OR=I([CR,sG],VT),lG=I([oG,ao,Bt,OR],PR,{memoizeOptions:{resultEqualityCheck:fm}}),zb=e=>e.errorBars,cG=(e,t,n)=>e.flatMap(r=>t[r.id]).filter(Boolean).filter(r=>SR(n,r)),Ip=function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];var i=n.filter(Boolean);if(i.length!==0){var a=i.flat(),o=Math.min(...a),s=Math.max(...a);return[o,s]}},ER=(e,t,n,r,i)=>{var a,o;if(n.length>0&&e.forEach(s=>{n.forEach(l=>{var c,d,f=(c=r[l.id])===null||c===void 0?void 0:c.filter(x=>SR(i,x)),p=Qt(s,(d=t.dataKey)!==null&&d!==void 0?d:l.dataKey),h=iG(s,p,f);if(h.length>=2){var m=Math.min(...h),y=Math.max(...h);(a==null||m<a)&&(a=m),(o==null||y>o)&&(o=y)}var g=xP(p);g!=null&&(a=a==null?g[0]:Math.min(a,g[0]),o=o==null?g[1]:Math.max(o,g[1]))})}),(t==null?void 0:t.dataKey)!=null&&e.forEach(s=>{var l=xP(Qt(s,t.dataKey));l!=null&&(a=a==null?l[0]:Math.min(a,l[0]),o=o==null?l[1]:Math.max(o,l[1]))}),ze(a)&&ze(o))return[a,o]},uG=I([Mb,On,nG,zb,Bt],ER,{memoizeOptions:{resultEqualityCheck:fm}});function dG(e){var{value:t}=e;if(di(t)||t instanceof Date)return t}var fG=(e,t,n)=>{var r=e.map(dG).filter(i=>i!=null);return n&&(t.dataKey==null||t.allowDuplicatedCategory&&x2(r))?fT(0,e.length):t.allowDuplicatedCategory?r:Array.from(new Set(r))},NR=e=>e.referenceElements.dots,Al=(e,t,n)=>e.filter(r=>r.ifOverflow==="extendDomain").filter(r=>t==="xAxis"?r.xAxisId===n:r.yAxisId===n),pG=I([NR,Bt,dm],Al),_R=e=>e.referenceElements.areas,hG=I([_R,Bt,dm],Al),AR=e=>e.referenceElements.lines,mG=I([AR,Bt,dm],Al),TR=(e,t)=>{if(e!=null){var n=Gi(e.map(r=>t==="xAxis"?r.x:r.y));if(n.length!==0)return[Math.min(...n),Math.max(...n)]}},gG=I(pG,Bt,TR),RR=(e,t)=>{if(e!=null){var n=Gi(e.flatMap(r=>[t==="xAxis"?r.x1:r.y1,t==="xAxis"?r.x2:r.y2]));if(n.length!==0)return[Math.min(...n),Math.max(...n)]}},vG=I([hG,Bt],RR);function yG(e){var t;if(e.x!=null)return Gi([e.x]);var n=(t=e.segment)===null||t===void 0?void 0:t.map(r=>r.x);return n==null||n.length===0?[]:Gi(n)}function xG(e){var t;if(e.y!=null)return Gi([e.y]);var n=(t=e.segment)===null||t===void 0?void 0:t.map(r=>r.y);return n==null||n.length===0?[]:Gi(n)}var MR=(e,t)=>{if(e!=null){var n=e.flatMap(r=>t==="xAxis"?yG(r):xG(r));if(n.length!==0)return[Math.min(...n),Math.max(...n)]}},bG=I([mG,Bt],MR),wG=I(gG,bG,vG,(e,t,n)=>Ip(e,n,t)),DR=(e,t,n,r,i,a,o,s)=>{if(n!=null)return n;var l=o==="vertical"&&s==="xAxis"||o==="horizontal"&&s==="yAxis",c=l?Ip(r,a,i):Ip(a,i);return RY(t,c,e.allowDataOverflow)},jG=I([On,CR,OR,lG,uG,wG,dt,Bt],DR,{memoizeOptions:{resultEqualityCheck:fm}}),SG=[0,1],zR=(e,t,n,r,i,a,o)=>{if(!((e==null||n==null||n.length===0)&&o===void 0)){var{dataKey:s,type:l}=e,c=Ji(t,a);if(c&&s==null){var d;return fT(0,(d=n==null?void 0:n.length)!==null&&d!==void 0?d:0)}return l==="category"?fG(r,e,c):i==="expand"?SG:o}},Ib=I([On,dt,Mb,hm,sm,Bt,jG],zR);function kG(e){return e in mc}var IR=(e,t,n)=>{if(e!=null){var{scale:r,type:i}=e;if(r==="auto")return i==="category"&&n&&(n.indexOf("LineChart")>=0||n.indexOf("AreaChart")>=0||n.indexOf("ComposedChart")>=0&&!t)?"point":i==="category"?"band":"linear";if(typeof r=="string"){var a="scale".concat(Ru(r));return kG(a)?a:"point"}}},Tl=I([On,hR,Cb],IR);function $b(e,t,n,r){if(!(n==null||r==null))return typeof e.scale=="function"?vP(e.scale,n,r):vP(t,n,r)}var $R=(e,t,n)=>{var r=Db(t);if(!(n!=="auto"&&n!=="linear")){if(t!=null&&t.tickCount&&Array.isArray(r)&&(r[0]==="auto"||r[1]==="auto")&&Yi(e))return $Y(e,t.tickCount,t.allowDecimals);if(t!=null&&t.tickCount&&t.type==="number"&&Yi(e))return LY(e,t.tickCount,t.allowDecimals)}},Lb=I([Ib,Wu,Tl],$R),LR=(e,t,n,r)=>{if(r!=="angleAxis"&&(e==null?void 0:e.type)==="number"&&Yi(t)&&Array.isArray(n)&&n.length>0){var i,a,o=t[0],s=(i=n[0])!==null&&i!==void 0?i:0,l=t[1],c=(a=n[n.length-1])!==null&&a!==void 0?a:0;return[Math.min(o,s),Math.max(l,c)]}return t},PG=I([On,Ib,Lb,Bt],LR),CG=I(hm,On,(e,t)=>{if(!(!t||t.type!=="number")){var n=1/0,r=Array.from(Gi(e.map(f=>f.value))).sort((f,p)=>f-p),i=r[0],a=r[r.length-1];if(i==null||a==null)return 1/0;var o=a-i;if(o===0)return 1/0;for(var s=0;s<r.length-1;s++){var l=r[s],c=r[s+1];if(!(l==null||c==null)){var d=c-l;n=Math.min(n,d)}}return n/o}}),FR=I(CG,dt,FY,en,(e,t,n,r,i)=>i,(e,t,n,r,i)=>{if(!ze(e))return 0;var a=t==="vertical"?r.height:r.width;if(i==="gap")return e*a/2;if(i==="no-gap"){var o=qa(n,e*a),s=e*a/2;return s-o-(s-o)/a*o}return 0}),OG=(e,t,n)=>{var r=ra(e,t);return r==null||typeof r.padding!="string"?0:FR(e,"xAxis",t,n,r.padding)},EG=(e,t,n)=>{var r=ia(e,t);return r==null||typeof r.padding!="string"?0:FR(e,"yAxis",t,n,r.padding)},NG=I(ra,OG,(e,t)=>{var n,r;if(e==null)return{left:0,right:0};var{padding:i}=e;return typeof i=="string"?{left:t,right:t}:{left:((n=i.left)!==null&&n!==void 0?n:0)+t,right:((r=i.right)!==null&&r!==void 0?r:0)+t}}),_G=I(ia,EG,(e,t)=>{var n,r;if(e==null)return{top:0,bottom:0};var{padding:i}=e;return typeof i=="string"?{top:t,bottom:t}:{top:((n=i.top)!==null&&n!==void 0?n:0)+t,bottom:((r=i.bottom)!==null&&r!==void 0?r:0)+t}}),AG=I([en,NG,Yh,qh,(e,t,n)=>n],(e,t,n,r,i)=>{var{padding:a}=r;return i?[a.left,n.width-a.right]:[e.left+t.left,e.left+e.width-t.right]}),TG=I([en,dt,_G,Yh,qh,(e,t,n)=>n],(e,t,n,r,i,a)=>{var{padding:o}=i;return a?[r.height-o.bottom,o.top]:t==="horizontal"?[e.top+e.height-n.bottom,e.top+n.top]:[e.top+n.top,e.top+e.height-n.bottom]}),Vu=(e,t,n,r)=>{var i;switch(t){case"xAxis":return AG(e,n,r);case"yAxis":return TG(e,n,r);case"zAxis":return(i=Rb(e,n))===null||i===void 0?void 0:i.range;case"angleAxis":return sR(e);case"radiusAxis":return lR(e,n);default:return}},UR=I([On,Vu],lm),RG=I([Tl,PG],YY),mm=I([On,Tl,RG,UR],$b);I([Hu,zb,Bt],cG);function BR(e,t){return e.id<t.id?-1:e.id>t.id?1:0}var gm=(e,t)=>t,vm=(e,t,n)=>n,MG=I(Vh,gm,vm,(e,t,n)=>e.filter(r=>r.orientation===t).filter(r=>r.mirror===n).sort(BR)),DG=I(Zh,gm,vm,(e,t,n)=>e.filter(r=>r.orientation===t).filter(r=>r.mirror===n).sort(BR)),WR=(e,t)=>({width:e.width,height:t.height}),zG=(e,t)=>{var n=typeof t.width=="number"?t.width:zu;return{width:n,height:e.height}},IG=I(en,ra,WR),$G=(e,t,n)=>{switch(t){case"top":return e.top;case"bottom":return n-e.bottom;default:return 0}},LG=(e,t,n)=>{switch(t){case"left":return e.left;case"right":return n-e.right;default:return 0}},FG=I(ta,en,MG,gm,vm,(e,t,n,r,i)=>{var a={},o;return n.forEach(s=>{var l=WR(t,s);o==null&&(o=$G(t,r,e));var c=r==="top"&&!i||r==="bottom"&&i;a[s.id]=o-Number(c)*l.height,o+=(c?-1:1)*l.height}),a}),UG=I(ea,en,DG,gm,vm,(e,t,n,r,i)=>{var a={},o;return n.forEach(s=>{var l=zG(t,s);o==null&&(o=LG(t,r,e));var c=r==="left"&&!i||r==="right"&&i;a[s.id]=o-Number(c)*l.width,o+=(c?-1:1)*l.width}),a}),BG=(e,t)=>{var n=ra(e,t);if(n!=null)return FG(e,n.orientation,n.mirror)},WG=I([en,ra,BG,(e,t)=>t],(e,t,n,r)=>{if(t!=null){var i=n==null?void 0:n[r];return i==null?{x:e.left,y:0}:{x:e.left,y:i}}}),HG=(e,t)=>{var n=ia(e,t);if(n!=null)return UG(e,n.orientation,n.mirror)},KG=I([en,ia,HG,(e,t)=>t],(e,t,n,r)=>{if(t!=null){var i=n==null?void 0:n[r];return i==null?{x:0,y:e.top}:{x:i,y:e.top}}}),VG=I(en,ia,(e,t)=>{var n=typeof t.width=="number"?t.width:zu;return{width:n,height:e.height}}),HR=(e,t,n,r)=>{if(n!=null){var{allowDuplicatedCategory:i,type:a,dataKey:o}=n,s=Ji(e,r),l=t.map(c=>c.value);if(o&&s&&a==="category"&&i&&x2(l))return l}},Fb=I([dt,hm,On,Bt],HR),KR=(e,t,n,r)=>{if(!(n==null||n.dataKey==null)){var{type:i,scale:a}=n,o=Ji(e,r);if(o&&(i==="number"||a!=="auto"))return t.map(s=>s.value)}},Ub=I([dt,hm,Wu,Bt],KR),bP=I([dt,eG,Tl,mm,Fb,Ub,Vu,Lb,Bt],(e,t,n,r,i,a,o,s,l)=>{if(t!=null){var c=Ji(e,l);return{angle:t.angle,interval:t.interval,minTickGap:t.minTickGap,orientation:t.orientation,tick:t.tick,tickCount:t.tickCount,tickFormatter:t.tickFormatter,ticks:t.ticks,type:t.type,unit:t.unit,axisType:l,categoricalDomain:a,duplicateDomain:i,isCategorical:c,niceTicks:s,range:o,realScaleType:n,scale:r}}}),ZG=(e,t,n,r,i,a,o,s,l)=>{if(!(t==null||r==null)){var c=Ji(e,l),{type:d,ticks:f,tickCount:p}=t,h=n==="scaleBand"&&typeof r.bandwidth=="function"?r.bandwidth()/2:2,m=d==="category"&&r.bandwidth?r.bandwidth()/h:0;m=l==="angleAxis"&&a!=null&&a.length>=2?gr(a[0]-a[1])*2*m:m;var y=f||i;return y?y.map((g,x)=>{var b=o?o.indexOf(g):g,w=r.map(b);return ze(w)?{index:x,coordinate:w+m,value:g,offset:m}:null}).filter(Mn):c&&s?s.map((g,x)=>{var b=r.map(g);return ze(b)?{coordinate:b+m,value:g,index:x,offset:m}:null}).filter(Mn):r.ticks?r.ticks(p).map((g,x)=>{var b=r.map(g);return ze(b)?{coordinate:b+m,value:g,index:x,offset:m}:null}).filter(Mn):r.domain().map((g,x)=>{var b=r.map(g);return ze(b)?{coordinate:b+m,value:o?o[g]:g,index:x,offset:m}:null}).filter(Mn)}},VR=I([dt,Wu,Tl,mm,Lb,Vu,Fb,Ub,Bt],ZG),qG=(e,t,n,r,i,a,o)=>{if(!(t==null||n==null||r==null||r[0]===r[1])){var s=Ji(e,o),{tickCount:l}=t,c=0;return c=o==="angleAxis"&&(r==null?void 0:r.length)>=2?gr(r[0]-r[1])*2*c:c,s&&a?a.map((d,f)=>{var p=n.map(d);return ze(p)?{coordinate:p+c,value:d,index:f,offset:c}:null}).filter(Mn):n.ticks?n.ticks(l).map((d,f)=>{var p=n.map(d);return ze(p)?{coordinate:p+c,value:d,index:f,offset:c}:null}).filter(Mn):n.domain().map((d,f)=>{var p=n.map(d);return ze(p)?{coordinate:p+c,value:i?i[d]:d,index:f,offset:c}:null}).filter(Mn)}},ZR=I([dt,Wu,mm,Vu,Fb,Ub,Bt],qG),qR=I(On,mm,(e,t)=>{if(!(e==null||t==null))return zp(zp({},e),{},{scale:t})}),YG=I([On,Tl,Ib,UR],$b);I((e,t,n)=>Rb(e,n),YG,(e,t)=>{if(!(e==null||t==null))return zp(zp({},e),{},{scale:t})});var GG=I([dt,Vh,Zh],(e,t,n)=>{switch(e){case"horizontal":return t.some(r=>r.reversed)?"right-to-left":"left-to-right";case"vertical":return n.some(r=>r.reversed)?"bottom-to-top":"top-to-bottom";case"centric":case"radial":return"left-to-right";default:return}}),YR=e=>e.options.defaultTooltipEventType,GR=e=>e.options.validateTooltipEventTypes;function QR(e,t,n){if(e==null)return t;var r=e?"axis":"item";return n==null?t:n.includes(r)?r:t}function Bb(e,t){var n=YR(e),r=GR(e);return QR(t,n,r)}function QG(e){return ve(t=>Bb(t,e))}var XR=(e,t)=>{var n,r=Number(t);if(!(Hi(r)||t==null))return r>=0?e==null||(n=e[r])===null||n===void 0?void 0:n.value:void 0},XG=e=>e.tooltip.settings,ya={active:!1,index:null,dataKey:void 0,graphicalItemId:void 0,coordinate:void 0},JG={itemInteraction:{click:ya,hover:ya},axisInteraction:{click:ya,hover:ya},keyboardInteraction:ya,syncInteraction:{active:!1,index:null,dataKey:void 0,label:void 0,coordinate:void 0,sourceViewBox:void 0,graphicalItemId:void 0},tooltipItemPayloads:[],settings:{shared:void 0,trigger:"hover",axisId:0,active:!1,defaultIndex:void 0}},JR=Wn({name:"tooltip",initialState:JG,reducers:{addTooltipEntrySettings:{reducer(e,t){e.tooltipItemPayloads.push(t.payload)},prepare:Je()},replaceTooltipEntrySettings:{reducer(e,t){var{prev:n,next:r}=t.payload,i=Lr(e).tooltipItemPayloads.indexOf(n);i>-1&&(e.tooltipItemPayloads[i]=r)},prepare:Je()},removeTooltipEntrySettings:{reducer(e,t){var n=Lr(e).tooltipItemPayloads.indexOf(t.payload);n>-1&&e.tooltipItemPayloads.splice(n,1)},prepare:Je()},setTooltipSettingsState(e,t){e.settings=t.payload},setActiveMouseOverItemIndex(e,t){e.syncInteraction.active=!1,e.keyboardInteraction.active=!1,e.itemInteraction.hover.active=!0,e.itemInteraction.hover.index=t.payload.activeIndex,e.itemInteraction.hover.dataKey=t.payload.activeDataKey,e.itemInteraction.hover.graphicalItemId=t.payload.activeGraphicalItemId,e.itemInteraction.hover.coordinate=t.payload.activeCoordinate},mouseLeaveChart(e){e.itemInteraction.hover.active=!1,e.axisInteraction.hover.active=!1},mouseLeaveItem(e){e.itemInteraction.hover.active=!1},setActiveClickItemIndex(e,t){e.syncInteraction.active=!1,e.itemInteraction.click.active=!0,e.keyboardInteraction.active=!1,e.itemInteraction.click.index=t.payload.activeIndex,e.itemInteraction.click.dataKey=t.payload.activeDataKey,e.itemInteraction.click.graphicalItemId=t.payload.activeGraphicalItemId,e.itemInteraction.click.coordinate=t.payload.activeCoordinate},setMouseOverAxisIndex(e,t){e.syncInteraction.active=!1,e.axisInteraction.hover.active=!0,e.keyboardInteraction.active=!1,e.axisInteraction.hover.index=t.payload.activeIndex,e.axisInteraction.hover.dataKey=t.payload.activeDataKey,e.axisInteraction.hover.coordinate=t.payload.activeCoordinate},setMouseClickAxisIndex(e,t){e.syncInteraction.active=!1,e.keyboardInteraction.active=!1,e.axisInteraction.click.active=!0,e.axisInteraction.click.index=t.payload.activeIndex,e.axisInteraction.click.dataKey=t.payload.activeDataKey,e.axisInteraction.click.coordinate=t.payload.activeCoordinate},setSyncInteraction(e,t){e.syncInteraction=t.payload},setKeyboardInteraction(e,t){e.keyboardInteraction.active=t.payload.active,e.keyboardInteraction.index=t.payload.activeIndex,e.keyboardInteraction.coordinate=t.payload.activeCoordinate}}}),{addTooltipEntrySettings:eQ,replaceTooltipEntrySettings:tQ,removeTooltipEntrySettings:nQ,setTooltipSettingsState:rQ,setActiveMouseOverItemIndex:iQ,mouseLeaveItem:_oe,mouseLeaveChart:eM,setActiveClickItemIndex:Aoe,setMouseOverAxisIndex:tM,setMouseClickAxisIndex:aQ,setSyncInteraction:Ly,setKeyboardInteraction:Fy}=JR.actions,oQ=JR.reducer;function wP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Wd(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?wP(Object(n),!0).forEach(function(r){sQ(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):wP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function sQ(e,t,n){return(t=lQ(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function lQ(e){var t=cQ(e,"string");return typeof t=="symbol"?t:t+""}function cQ(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function uQ(e,t,n){return t==="axis"?n==="click"?e.axisInteraction.click:e.axisInteraction.hover:n==="click"?e.itemInteraction.click:e.itemInteraction.hover}function dQ(e){return e.index!=null}var nM=(e,t,n,r)=>{if(t==null)return ya;var i=uQ(e,t,n);if(i==null)return ya;if(i.active)return i;if(e.keyboardInteraction.active)return e.keyboardInteraction;if(e.syncInteraction.active&&e.syncInteraction.index!=null)return e.syncInteraction;var a=e.settings.active===!0;if(dQ(i)){if(a)return Wd(Wd({},i),{},{active:!0})}else if(r!=null)return{active:!0,coordinate:void 0,dataKey:void 0,index:r,graphicalItemId:void 0};return Wd(Wd({},ya),{},{coordinate:i.coordinate})};function fQ(e){if(typeof e=="number")return Number.isFinite(e)?e:void 0;if(e instanceof Date){var t=e.valueOf();return Number.isFinite(t)?t:void 0}var n=Number(e);return Number.isFinite(n)?n:void 0}function pQ(e,t){var n=fQ(e),r=t[0],i=t[1];if(n===void 0)return!1;var a=Math.min(r,i),o=Math.max(r,i);return n>=a&&n<=o}function hQ(e,t,n){if(n==null||t==null)return!0;var r=Qt(e,t);return r==null||!Yi(n)?!0:pQ(r,n)}var Wb=(e,t,n,r)=>{var i=e==null?void 0:e.index;if(i==null)return null;var a=Number(i);if(!ze(a))return i;var o=0,s=1/0;t.length>0&&(s=t.length-1);var l=Math.max(o,Math.min(a,s)),c=t[l];return c==null||hQ(c,n,r)?String(l):null},rM=(e,t,n,r,i,a,o)=>{if(a!=null){var s=o[0],l=s==null?void 0:s.getPosition(a);if(l!=null)return l;var c=i==null?void 0:i[Number(a)];if(c)switch(n){case"horizontal":return{x:c.coordinate,y:(r.top+t)/2};default:return{x:(r.left+e)/2,y:c.coordinate}}}},iM=(e,t,n,r)=>{if(t==="axis")return e.tooltipItemPayloads;if(e.tooltipItemPayloads.length===0)return[];var i;if(n==="hover"?i=e.itemInteraction.hover.graphicalItemId:i=e.itemInteraction.click.graphicalItemId,i==null&&r!=null){var a=e.tooltipItemPayloads[0];return a!=null?[a]:[]}return e.tooltipItemPayloads.filter(o=>{var s;return((s=o.settings)===null||s===void 0?void 0:s.graphicalItemId)===i})},aM=e=>e.options.tooltipPayloadSearcher,Rl=e=>e.tooltip;function jP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function SP(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?jP(Object(n),!0).forEach(function(r){mQ(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):jP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function mQ(e,t,n){return(t=gQ(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function gQ(e){var t=vQ(e,"string");return typeof t=="symbol"?t:t+""}function vQ(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function yQ(e,t){return e??t}var oM=(e,t,n,r,i,a,o)=>{if(!(t==null||a==null)){var{chartData:s,computedData:l,dataStartIndex:c,dataEndIndex:d}=n,f=[];return e.reduce((p,h)=>{var m,{dataDefinedOnItem:y,settings:g}=h,x=yQ(y,s),b=Array.isArray(x)?_A(x,c,d):x,w=(m=g==null?void 0:g.dataKey)!==null&&m!==void 0?m:r,j=g==null?void 0:g.nameKey,k;if(r&&Array.isArray(b)&&!Array.isArray(b[0])&&o==="axis"?k=b2(b,r,i):k=a(b,t,l,j),Array.isArray(k))k.forEach(S=>{var C=SP(SP({},g),{},{name:S.name,unit:S.unit,color:void 0,fill:void 0});p.push(_S({tooltipEntrySettings:C,dataKey:S.dataKey,payload:S.payload,value:Qt(S.payload,S.dataKey),name:S.name}))});else{var P;p.push(_S({tooltipEntrySettings:g,dataKey:w,payload:k,value:Qt(k,w),name:(P=Qt(k,j))!==null&&P!==void 0?P:g==null?void 0:g.name}))}return p},f)}},Hb=I([Rt,hR,Cb],IR),xQ=I([e=>e.graphicalItems.cartesianItems,e=>e.graphicalItems.polarItems],(e,t)=>[...e,...t]),bQ=I([Wt,_l],mR),Ml=I([xQ,Rt,bQ],vR,{memoizeOptions:{resultEqualityCheck:pm}}),wQ=I([Ml],e=>e.filter(Tb)),jQ=I([Ml],bR,{memoizeOptions:{resultEqualityCheck:pm}}),Dl=I([jQ,ao],wR),SQ=I([wQ,ao,Rt],dR),Kb=I([Dl,Rt,Ml],jR),sM=I([Rt],Db),kQ=I([Rt],e=>e.allowDataOverflow),lM=I([sM,kQ],VT),PQ=I([Ml],e=>e.filter(Tb)),CQ=I([SQ,PQ,sm,rR],kR),OQ=I([CQ,ao,Wt,lM],PR),EQ=I([Ml],xR),NQ=I([Dl,Rt,EQ,zb,Wt],ER,{memoizeOptions:{resultEqualityCheck:fm}}),_Q=I([NR,Wt,_l],Al),AQ=I([_Q,Wt],TR),TQ=I([_R,Wt,_l],Al),RQ=I([TQ,Wt],RR),MQ=I([AR,Wt,_l],Al),DQ=I([MQ,Wt],MR),zQ=I([AQ,DQ,RQ],Ip),IQ=I([Rt,sM,lM,OQ,NQ,zQ,dt,Wt],DR),Zu=I([Rt,dt,Dl,Kb,sm,Wt,IQ],zR),$Q=I([Zu,Rt,Hb],$R),LQ=I([Rt,Zu,$Q,Wt],LR),cM=e=>{var t=Wt(e),n=_l(e),r=!1;return Vu(e,t,n,r)},uM=I([Rt,cM],lm),dM=I([Rt,Hb,LQ,uM],$b),FQ=I([dt,Kb,Rt,Wt],HR),UQ=I([dt,Kb,Rt,Wt],KR),BQ=(e,t,n,r,i,a,o,s)=>{if(t){var{type:l}=t,c=Ji(e,s);if(r){var d=n==="scaleBand"&&r.bandwidth?r.bandwidth()/2:2,f=l==="category"&&r.bandwidth?r.bandwidth()/d:0;return f=s==="angleAxis"&&i!=null&&(i==null?void 0:i.length)>=2?gr(i[0]-i[1])*2*f:f,c&&o?o.map((p,h)=>{var m=r.map(p);return ze(m)?{coordinate:m+f,value:p,index:h,offset:f}:null}).filter(Mn):r.domain().map((p,h)=>{var m=r.map(p);return ze(m)?{coordinate:m+f,value:a?a[p]:p,index:h,offset:f}:null}).filter(Mn)}}},aa=I([dt,Rt,Hb,dM,cM,FQ,UQ,Wt],BQ),Vb=I([YR,GR,XG],(e,t,n)=>QR(n.shared,e,t)),fM=e=>e.tooltip.settings.trigger,Zb=e=>e.tooltip.settings.defaultIndex,qu=I([Rl,Vb,fM,Zb],nM),cu=I([qu,Dl,Ku,Zu],Wb),pM=I([aa,cu],XR),WQ=I([qu],e=>{if(e)return e.dataKey});I([qu],e=>{if(e)return e.graphicalItemId});var hM=I([Rl,Vb,fM,Zb],iM),HQ=I([ea,ta,dt,en,aa,Zb,hM],rM),KQ=I([qu,HQ],(e,t)=>e!=null&&e.coordinate?e.coordinate:t),VQ=I([qu],e=>{var t;return(t=e==null?void 0:e.active)!==null&&t!==void 0?t:!1}),ZQ=I([hM,cu,ao,Ku,pM,aM,Vb],oM),qQ=I([ZQ],e=>{if(e!=null){var t=e.map(n=>n.payload).filter(n=>n!=null);return Array.from(new Set(t))}});function kP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function PP(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?kP(Object(n),!0).forEach(function(r){YQ(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):kP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function YQ(e,t,n){return(t=GQ(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function GQ(e){var t=QQ(e,"string");return typeof t=="symbol"?t:t+""}function QQ(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var XQ=()=>ve(Rt),JQ=()=>{var e=XQ(),t=ve(aa),n=ve(dM);return hp(!e||!n?void 0:PP(PP({},e),{},{scale:n}),t)};function CP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function ps(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?CP(Object(n),!0).forEach(function(r){eX(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):CP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function eX(e,t,n){return(t=tX(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function tX(e){var t=nX(e,"string");return typeof t=="symbol"?t:t+""}function nX(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var rX=(e,t,n,r)=>{var i=t.find(a=>a&&a.index===n);if(i){if(e==="horizontal")return{x:i.coordinate,y:r.chartY};if(e==="vertical")return{x:r.chartX,y:i.coordinate}}return{x:0,y:0}},iX=(e,t,n,r)=>{var i=t.find(c=>c&&c.index===n);if(i){if(e==="centric"){var a=i.coordinate,{radius:o}=r;return ps(ps(ps({},r),Yt(r.cx,r.cy,o,a)),{},{angle:a,radius:o})}var s=i.coordinate,{angle:l}=r;return ps(ps(ps({},r),Yt(r.cx,r.cy,s,l)),{},{angle:l,radius:s})}return{angle:0,clockWise:!1,cx:0,cy:0,endAngle:0,innerRadius:0,outerRadius:0,radius:0,startAngle:0,x:0,y:0}};function aX(e,t){var{chartX:n,chartY:r}=e;return n>=t.left&&n<=t.left+t.width&&r>=t.top&&r<=t.top+t.height}var mM=(e,t,n,r,i)=>{var a,o=(a=t==null?void 0:t.length)!==null&&a!==void 0?a:0;if(o<=1||e==null)return 0;if(r==="angleAxis"&&i!=null&&Math.abs(Math.abs(i[1]-i[0])-360)<=1e-6)for(var s=0;s<o;s++){var l,c,d,f,p,h=s>0?(l=n[s-1])===null||l===void 0?void 0:l.coordinate:(c=n[o-1])===null||c===void 0?void 0:c.coordinate,m=(d=n[s])===null||d===void 0?void 0:d.coordinate,y=s>=o-1?(f=n[0])===null||f===void 0?void 0:f.coordinate:(p=n[s+1])===null||p===void 0?void 0:p.coordinate,g=void 0;if(!(h==null||m==null||y==null))if(gr(m-h)!==gr(y-m)){var x=[];if(gr(y-m)===gr(i[1]-i[0])){g=y;var b=m+i[1]-i[0];x[0]=Math.min(b,(b+h)/2),x[1]=Math.max(b,(b+h)/2)}else{g=h;var w=y+i[1]-i[0];x[0]=Math.min(m,(w+m)/2),x[1]=Math.max(m,(w+m)/2)}var j=[Math.min(m,(g+m)/2),Math.max(m,(g+m)/2)];if(e>j[0]&&e<=j[1]||e>=x[0]&&e<=x[1]){var k;return(k=n[s])===null||k===void 0?void 0:k.index}}else{var P=Math.min(h,y),S=Math.max(h,y);if(e>(P+m)/2&&e<=(S+m)/2){var C;return(C=n[s])===null||C===void 0?void 0:C.index}}}else if(t)for(var N=0;N<o;N++){var _=t[N];if(_!=null){var M=t[N+1],R=t[N-1];if(N===0&&M!=null&&e<=(_.coordinate+M.coordinate)/2||N===o-1&&R!=null&&e>(_.coordinate+R.coordinate)/2||N>0&&N<o-1&&R!=null&&M!=null&&e>(_.coordinate+R.coordinate)/2&&e<=(_.coordinate+M.coordinate)/2)return _.index}}return-1},oX=()=>ve(Cb),qb=(e,t)=>t,gM=(e,t,n)=>n,Yb=(e,t,n,r)=>r,sX=I(aa,e=>zh(e,t=>t.coordinate)),Gb=I([Rl,qb,gM,Yb],nM),Qb=I([Gb,Dl,Ku,Zu],Wb),lX=(e,t,n)=>{if(t!=null){var r=Rl(e);return t==="axis"?n==="hover"?r.axisInteraction.hover.dataKey:r.axisInteraction.click.dataKey:n==="hover"?r.itemInteraction.hover.dataKey:r.itemInteraction.click.dataKey}},vM=I([Rl,qb,gM,Yb],iM),$p=I([ea,ta,dt,en,aa,Yb,vM],rM),cX=I([Gb,$p],(e,t)=>{var n;return(n=e.coordinate)!==null&&n!==void 0?n:t}),yM=I([aa,Qb],XR),uX=I([vM,Qb,ao,Ku,yM,aM,qb],oM),dX=I([Gb,Qb],(e,t)=>({isActive:e.active&&t!=null,activeIndex:t})),fX=(e,t,n,r,i,a,o)=>{if(!(!e||!n||!r||!i)&&aX(e,o)){var s=TH(e,t),l=mM(s,a,i,n,r),c=rX(t,i,l,e);return{activeIndex:String(l),activeCoordinate:c}}},pX=(e,t,n,r,i,a,o)=>{if(!(!e||!r||!i||!a||!n)){var s=XV(e,n);if(s){var l=RH(s,t),c=mM(l,o,a,r,i),d=iX(t,a,c,s);return{activeIndex:String(c),activeCoordinate:d}}}},hX=(e,t,n,r,i,a,o,s)=>{if(!(!e||!t||!r||!i||!a))return t==="horizontal"||t==="vertical"?fX(e,t,r,i,a,o,s):pX(e,t,n,r,i,a,o)},mX=I(e=>e.zIndex.zIndexMap,(e,t)=>t,(e,t,n)=>n,(e,t,n)=>{if(t!=null){var r=e[t];if(r!=null)return n?r.panoramaElement:r.element}}),gX=I(e=>e.zIndex.zIndexMap,e=>{var t=Object.keys(e).map(r=>parseInt(r,10)).concat(Object.values(bn)),n=Array.from(new Set(t));return n.sort((r,i)=>r-i)},{memoizeOptions:{resultEqualityCheck:ZY}});function OP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function EP(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?OP(Object(n),!0).forEach(function(r){vX(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):OP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function vX(e,t,n){return(t=yX(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function yX(e){var t=xX(e,"string");return typeof t=="symbol"?t:t+""}function xX(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var bX={},wX={zIndexMap:Object.values(bn).reduce((e,t)=>EP(EP({},e),{},{[t]:{element:void 0,panoramaElement:void 0,consumers:0}}),bX)},jX=new Set(Object.values(bn));function SX(e){return jX.has(e)}var xM=Wn({name:"zIndex",initialState:wX,reducers:{registerZIndexPortal:{reducer:(e,t)=>{var{zIndex:n}=t.payload;e.zIndexMap[n]?e.zIndexMap[n].consumers+=1:e.zIndexMap[n]={consumers:1,element:void 0,panoramaElement:void 0}},prepare:Je()},unregisterZIndexPortal:{reducer:(e,t)=>{var{zIndex:n}=t.payload;e.zIndexMap[n]&&(e.zIndexMap[n].consumers-=1,e.zIndexMap[n].consumers<=0&&!SX(n)&&delete e.zIndexMap[n])},prepare:Je()},registerZIndexPortalElement:{reducer:(e,t)=>{var{zIndex:n,element:r,isPanorama:i}=t.payload;e.zIndexMap[n]?i?e.zIndexMap[n].panoramaElement=r:e.zIndexMap[n].element=r:e.zIndexMap[n]={consumers:0,element:i?void 0:r,panoramaElement:i?r:void 0}},prepare:Je()},unregisterZIndexPortalElement:{reducer:(e,t)=>{var{zIndex:n}=t.payload;e.zIndexMap[n]&&(t.payload.isPanorama?e.zIndexMap[n].panoramaElement=void 0:e.zIndexMap[n].element=void 0)},prepare:Je()}}}),{registerZIndexPortal:kX,unregisterZIndexPortal:PX,registerZIndexPortalElement:CX,unregisterZIndexPortalElement:OX}=xM.actions,EX=xM.reducer;function oa(e){var{zIndex:t,children:n}=e,r=cK(),i=r&&t!==void 0&&t!==0,a=Hn(),o=Ot();v.useLayoutEffect(()=>i?(o(kX({zIndex:t})),()=>{o(PX({zIndex:t}))}):Pl,[o,t,i]);var s=ve(l=>mX(l,t,a));return i?s?Su.createPortal(n,s):null:n}function Uy(){return Uy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Uy.apply(null,arguments)}function NP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Hd(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?NP(Object(n),!0).forEach(function(r){NX(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):NP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function NX(e,t,n){return(t=_X(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _X(e){var t=AX(e,"string");return typeof t=="symbol"?t:t+""}function AX(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function TX(e){var{cursor:t,cursorComp:n,cursorProps:r}=e;return v.isValidElement(t)?v.cloneElement(t,r):v.createElement(n,r)}function RX(e){var t,{coordinate:n,payload:r,index:i,offset:a,tooltipAxisBandSize:o,layout:s,cursor:l,tooltipEventType:c,chartName:d}=e,f=n,p=r,h=i;if(!l||!f||d!=="ScatterChart"&&c!=="axis")return null;var m,y,g;if(d==="ScatterChart")m=f,y=dV,g=bn.cursorLine;else if(d==="BarChart")m=fV(s,f,a,o),y=aT,g=bn.cursorRectangle;else if(s==="radial"&&j2(f)){var{cx:x,cy:b,radius:w,startAngle:j,endAngle:k}=oT(f);m={cx:x,cy:b,startAngle:j,endAngle:k,innerRadius:w,outerRadius:w},y=lT,g=bn.cursorLine}else m={points:nZ(s,f,a)},y=eT,g=bn.cursorLine;var P=typeof l=="object"&&"className"in l?l.className:void 0,S=Hd(Hd(Hd(Hd({stroke:"#ccc",pointerEvents:"none"},a),m),Ph(l)),{},{payload:p,payloadIndex:h,className:Ke("recharts-tooltip-cursor",P)});return v.createElement(oa,{zIndex:(t=e.zIndex)!==null&&t!==void 0?t:g},v.createElement(TX,{cursor:l,cursorComp:y,cursorProps:S}))}function MX(e){var t=JQ(),n=BA(),r=Cl(),i=oX();return t==null||n==null||r==null||i==null?null:v.createElement(RX,Uy({},e,{offset:n,layout:r,tooltipAxisBandSize:t,chartName:i}))}var bM=v.createContext(null),DX=()=>v.useContext(bM),wM={exports:{}};(function(e){var t=Object.prototype.hasOwnProperty,n="~";function r(){}Object.create&&(r.prototype=Object.create(null),new r().__proto__||(n=!1));function i(l,c,d){this.fn=l,this.context=c,this.once=d||!1}function a(l,c,d,f,p){if(typeof d!="function")throw new TypeError("The listener must be a function");var h=new i(d,f||l,p),m=n?n+c:c;return l._events[m]?l._events[m].fn?l._events[m]=[l._events[m],h]:l._events[m].push(h):(l._events[m]=h,l._eventsCount++),l}function o(l,c){--l._eventsCount===0?l._events=new r:delete l._events[c]}function s(){this._events=new r,this._eventsCount=0}s.prototype.eventNames=function(){var c=[],d,f;if(this._eventsCount===0)return c;for(f in d=this._events)t.call(d,f)&&c.push(n?f.slice(1):f);return Object.getOwnPropertySymbols?c.concat(Object.getOwnPropertySymbols(d)):c},s.prototype.listeners=function(c){var d=n?n+c:c,f=this._events[d];if(!f)return[];if(f.fn)return[f.fn];for(var p=0,h=f.length,m=new Array(h);p<h;p++)m[p]=f[p].fn;return m},s.prototype.listenerCount=function(c){var d=n?n+c:c,f=this._events[d];return f?f.fn?1:f.length:0},s.prototype.emit=function(c,d,f,p,h,m){var y=n?n+c:c;if(!this._events[y])return!1;var g=this._events[y],x=arguments.length,b,w;if(g.fn){switch(g.once&&this.removeListener(c,g.fn,void 0,!0),x){case 1:return g.fn.call(g.context),!0;case 2:return g.fn.call(g.context,d),!0;case 3:return g.fn.call(g.context,d,f),!0;case 4:return g.fn.call(g.context,d,f,p),!0;case 5:return g.fn.call(g.context,d,f,p,h),!0;case 6:return g.fn.call(g.context,d,f,p,h,m),!0}for(w=1,b=new Array(x-1);w<x;w++)b[w-1]=arguments[w];g.fn.apply(g.context,b)}else{var j=g.length,k;for(w=0;w<j;w++)switch(g[w].once&&this.removeListener(c,g[w].fn,void 0,!0),x){case 1:g[w].fn.call(g[w].context);break;case 2:g[w].fn.call(g[w].context,d);break;case 3:g[w].fn.call(g[w].context,d,f);break;case 4:g[w].fn.call(g[w].context,d,f,p);break;default:if(!b)for(k=1,b=new Array(x-1);k<x;k++)b[k-1]=arguments[k];g[w].fn.apply(g[w].context,b)}}return!0},s.prototype.on=function(c,d,f){return a(this,c,d,f,!1)},s.prototype.once=function(c,d,f){return a(this,c,d,f,!0)},s.prototype.removeListener=function(c,d,f,p){var h=n?n+c:c;if(!this._events[h])return this;if(!d)return o(this,h),this;var m=this._events[h];if(m.fn)m.fn===d&&(!p||m.once)&&(!f||m.context===f)&&o(this,h);else{for(var y=0,g=[],x=m.length;y<x;y++)(m[y].fn!==d||p&&!m[y].once||f&&m[y].context!==f)&&g.push(m[y]);g.length?this._events[h]=g.length===1?g[0]:g:o(this,h)}return this},s.prototype.removeAllListeners=function(c){var d;return c?(d=n?n+c:c,this._events[d]&&o(this,d)):(this._events=new r,this._eventsCount=0),this},s.prototype.off=s.prototype.removeListener,s.prototype.addListener=s.prototype.on,s.prefixed=n,s.EventEmitter=s,e.exports=s})(wM);var zX=wM.exports;const IX=Qi(zX);var uu=new IX,By="recharts.syncEvent.tooltip",_P="recharts.syncEvent.brush",$X=(e,t)=>{if(t&&Array.isArray(e)){var n=Number.parseInt(t,10);if(!Hi(n))return e[n]}},LX={chartName:"",tooltipPayloadSearcher:()=>{},eventEmitter:void 0,defaultTooltipEventType:"axis"},jM=Wn({name:"options",initialState:LX,reducers:{createEventEmitter:e=>{e.eventEmitter==null&&(e.eventEmitter=Symbol("rechartsEventEmitter"))}}}),FX=jM.reducer,{createEventEmitter:UX}=jM.actions;function BX(e){return e.tooltip.syncInteraction}var WX={chartData:void 0,computedData:void 0,dataStartIndex:0,dataEndIndex:0},SM=Wn({name:"chartData",initialState:WX,reducers:{setChartData(e,t){if(e.chartData=t.payload,t.payload==null){e.dataStartIndex=0,e.dataEndIndex=0;return}t.payload.length>0&&e.dataEndIndex!==t.payload.length-1&&(e.dataEndIndex=t.payload.length-1)},setComputedData(e,t){e.computedData=t.payload},setDataStartEndIndexes(e,t){var{startIndex:n,endIndex:r}=t.payload;n!=null&&(e.dataStartIndex=n),r!=null&&(e.dataEndIndex=r)}}}),{setChartData:AP,setDataStartEndIndexes:HX,setComputedData:Toe}=SM.actions,KX=SM.reducer,VX=["x","y"];function TP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function hs(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?TP(Object(n),!0).forEach(function(r){ZX(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):TP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function ZX(e,t,n){return(t=qX(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function qX(e){var t=YX(e,"string");return typeof t=="symbol"?t:t+""}function YX(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function GX(e,t){if(e==null)return{};var n,r,i=QX(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function QX(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function XX(){var e=ve(Ob),t=ve(Eb),n=Ot(),r=ve(iR),i=ve(aa),a=Cl(),o=Gh(),s=ve(l=>l.rootProps.className);v.useEffect(()=>{if(e==null)return Pl;var l=(c,d,f)=>{if(t!==f&&e===c){if(r==="index"){var p;if(o&&d!==null&&d!==void 0&&(p=d.payload)!==null&&p!==void 0&&p.coordinate&&d.payload.sourceViewBox){var h=d.payload.coordinate,{x:m,y}=h,g=GX(h,VX),{x,y:b,width:w,height:j}=d.payload.sourceViewBox,k=hs(hs({},g),{},{x:o.x+(w?(m-x)/w:0)*o.width,y:o.y+(j?(y-b)/j:0)*o.height});n(hs(hs({},d),{},{payload:hs(hs({},d.payload),{},{coordinate:k})}))}else n(d);return}if(i!=null){var P;if(typeof r=="function"){var S={activeTooltipIndex:d.payload.index==null?void 0:Number(d.payload.index),isTooltipActive:d.payload.active,activeIndex:d.payload.index==null?void 0:Number(d.payload.index),activeLabel:d.payload.label,activeDataKey:d.payload.dataKey,activeCoordinate:d.payload.coordinate},C=r(i,S);P=i[C]}else r==="value"&&(P=i.find(Q=>String(Q.value)===d.payload.label));var{coordinate:N}=d.payload;if(P==null||d.payload.active===!1||N==null||o==null){n(Ly({active:!1,coordinate:void 0,dataKey:void 0,index:null,label:void 0,sourceViewBox:void 0,graphicalItemId:void 0}));return}var{x:_,y:M}=N,R=Math.min(_,o.x+o.width),G=Math.min(M,o.y+o.height),V={x:a==="horizontal"?P.coordinate:R,y:a==="horizontal"?G:P.coordinate},ee=Ly({active:d.payload.active,coordinate:V,dataKey:d.payload.dataKey,index:String(P.index),label:d.payload.label,sourceViewBox:d.payload.sourceViewBox,graphicalItemId:d.payload.graphicalItemId});n(ee)}}};return uu.on(By,l),()=>{uu.off(By,l)}},[s,n,t,e,r,i,a,o])}function JX(){var e=ve(Ob),t=ve(Eb),n=Ot();v.useEffect(()=>{if(e==null)return Pl;var r=(i,a,o)=>{t!==o&&e===i&&n(HX(a))};return uu.on(_P,r),()=>{uu.off(_P,r)}},[n,t,e])}function eJ(){var e=Ot();v.useEffect(()=>{e(UX())},[e]),XX(),JX()}function tJ(e,t,n,r,i,a){var o=ve(h=>lX(h,e,t)),s=ve(Eb),l=ve(Ob),c=ve(iR),d=ve(BX),f=d==null?void 0:d.active,p=Gh();v.useEffect(()=>{if(!f&&l!=null&&s!=null){var h=Ly({active:a,coordinate:n,dataKey:o,index:i,label:typeof r=="number"?String(r):r,sourceViewBox:p,graphicalItemId:void 0});uu.emit(By,l,h,s)}},[f,n,o,i,r,s,l,c,a,p])}function RP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function MP(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?RP(Object(n),!0).forEach(function(r){nJ(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):RP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function nJ(e,t,n){return(t=rJ(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function rJ(e){var t=iJ(e,"string");return typeof t=="symbol"?t:t+""}function iJ(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function aJ(e){return e.dataKey}function oJ(e,t){return v.isValidElement(e)?v.cloneElement(e,t):typeof e=="function"?v.createElement(e,t):v.createElement(HK,t)}var DP=[],sJ={allowEscapeViewBox:{x:!1,y:!1},animationDuration:400,animationEasing:"ease",axisId:0,contentStyle:{},cursor:!0,filterNull:!0,includeHidden:!1,isAnimationActive:"auto",itemSorter:"name",itemStyle:{},labelStyle:{},offset:10,reverseDirection:{x:!1,y:!1},separator:" : ",trigger:"hover",useTranslate3d:!1,wrapperStyle:{}};function lJ(e){var t,n,r=fn(e,sJ),{active:i,allowEscapeViewBox:a,animationDuration:o,animationEasing:s,content:l,filterNull:c,isAnimationActive:d,offset:f,payloadUniqBy:p,position:h,reverseDirection:m,useTranslate3d:y,wrapperStyle:g,cursor:x,shared:b,trigger:w,defaultIndex:j,portal:k,axisId:P}=r,S=Ot(),C=typeof j=="number"?String(j):j;v.useEffect(()=>{S(rQ({shared:b,trigger:w,axisId:P,active:i,defaultIndex:C}))},[S,b,w,P,i,C]);var N=Gh(),_=JA(),M=QG(b),{activeIndex:R,isActive:G}=(t=ve(Xe=>dX(Xe,M,w,C)))!==null&&t!==void 0?t:{},V=ve(Xe=>uX(Xe,M,w,C)),ee=ve(Xe=>yM(Xe,M,w,C)),Q=ve(Xe=>cX(Xe,M,w,C)),te=V,$=DX(),B=(n=i??G)!==null&&n!==void 0?n:!1,[L,Y]=eA([te,B]),re=M==="axis"?ee:void 0;tJ(M,w,Q,re,R,B);var Oe=k??$;if(Oe==null||N==null||M==null)return null;var we=te??DP;B||(we=DP),c&&we.length&&(we=B2(we.filter(Xe=>Xe.value!=null&&(Xe.hide!==!0||r.includeHidden)),p,aJ));var ie=we.length>0,We=v.createElement(QK,{allowEscapeViewBox:a,animationDuration:o,animationEasing:s,isAnimationActive:d,active:B,coordinate:Q,hasPayload:ie,offset:f,position:h,reverseDirection:m,useTranslate3d:y,viewBox:N,wrapperStyle:g,lastBoundingBox:L,innerRef:Y,hasPortalFromProps:!!k},oJ(l,MP(MP({},r),{},{payload:we,label:re,active:B,activeIndex:R,coordinate:Q,accessibilityLayer:_})));return v.createElement(v.Fragment,null,Su.createPortal(We,Oe),B&&v.createElement(MX,{cursor:x,tooltipEventType:M,coordinate:Q,payload:we,index:R}))}function cJ(e,t,n){return(t=uJ(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function uJ(e){var t=dJ(e,"string");return typeof t=="symbol"?t:t+""}function dJ(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}class fJ{constructor(t){cJ(this,"cache",new Map),this.maxSize=t}get(t){var n=this.cache.get(t);return n!==void 0&&(this.cache.delete(t),this.cache.set(t,n)),n}set(t,n){if(this.cache.has(t))this.cache.delete(t);else if(this.cache.size>=this.maxSize){var r=this.cache.keys().next().value;r!=null&&this.cache.delete(r)}this.cache.set(t,n)}clear(){this.cache.clear()}size(){return this.cache.size}}function zP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function pJ(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?zP(Object(n),!0).forEach(function(r){hJ(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):zP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function hJ(e,t,n){return(t=mJ(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function mJ(e){var t=gJ(e,"string");return typeof t=="symbol"?t:t+""}function gJ(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var vJ={cacheSize:2e3,enableCache:!0},kM=pJ({},vJ),IP=new fJ(kM.cacheSize),yJ={position:"absolute",top:"-20000px",left:0,padding:0,margin:0,border:"none",whiteSpace:"pre"},$P="recharts_measurement_span";function xJ(e,t){var n=t.fontSize||"",r=t.fontFamily||"",i=t.fontWeight||"",a=t.fontStyle||"",o=t.letterSpacing||"",s=t.textTransform||"";return"".concat(e,"|").concat(n,"|").concat(r,"|").concat(i,"|").concat(a,"|").concat(o,"|").concat(s)}var LP=(e,t)=>{try{var n=document.getElementById($P);n||(n=document.createElement("span"),n.setAttribute("id",$P),n.setAttribute("aria-hidden","true"),document.body.appendChild(n)),Object.assign(n.style,yJ,t),n.textContent="".concat(e);var r=n.getBoundingClientRect();return{width:r.width,height:r.height}}catch{return{width:0,height:0}}},Oc=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(t==null||em.isSsr)return{width:0,height:0};if(!kM.enableCache)return LP(t,n);var r=xJ(t,n),i=IP.get(r);if(i)return i;var a=LP(t,n);return IP.set(r,a),a},PM;function bJ(e,t,n){return(t=wJ(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function wJ(e){var t=jJ(e,"string");return typeof t=="symbol"?t:t+""}function jJ(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var FP=/(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,UP=/(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/,SJ=/^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/,kJ=/(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/,PJ={cm:96/2.54,mm:96/25.4,pt:96/72,pc:96/6,in:96,Q:96/(2.54*40),px:1},CJ=["cm","mm","pt","pc","in","Q","px"];function OJ(e){return CJ.includes(e)}var Rs="NaN";function EJ(e,t){return e*PJ[t]}class Zt{static parse(t){var n,[,r,i]=(n=kJ.exec(t))!==null&&n!==void 0?n:[];return r==null?Zt.NaN:new Zt(parseFloat(r),i??"")}constructor(t,n){this.num=t,this.unit=n,this.num=t,this.unit=n,Hi(t)&&(this.unit=""),n!==""&&!SJ.test(n)&&(this.num=NaN,this.unit=""),OJ(n)&&(this.num=EJ(t,n),this.unit="px")}add(t){return this.unit!==t.unit?new Zt(NaN,""):new Zt(this.num+t.num,this.unit)}subtract(t){return this.unit!==t.unit?new Zt(NaN,""):new Zt(this.num-t.num,this.unit)}multiply(t){return this.unit!==""&&t.unit!==""&&this.unit!==t.unit?new Zt(NaN,""):new Zt(this.num*t.num,this.unit||t.unit)}divide(t){return this.unit!==""&&t.unit!==""&&this.unit!==t.unit?new Zt(NaN,""):new Zt(this.num/t.num,this.unit||t.unit)}toString(){return"".concat(this.num).concat(this.unit)}isNaN(){return Hi(this.num)}}PM=Zt;bJ(Zt,"NaN",new PM(NaN,""));function CM(e){if(e==null||e.includes(Rs))return Rs;for(var t=e;t.includes("*")||t.includes("/");){var n,[,r,i,a]=(n=FP.exec(t))!==null&&n!==void 0?n:[],o=Zt.parse(r??""),s=Zt.parse(a??""),l=i==="*"?o.multiply(s):o.divide(s);if(l.isNaN())return Rs;t=t.replace(FP,l.toString())}for(;t.includes("+")||/.-\d+(?:\.\d+)?/.test(t);){var c,[,d,f,p]=(c=UP.exec(t))!==null&&c!==void 0?c:[],h=Zt.parse(d??""),m=Zt.parse(p??""),y=f==="+"?h.add(m):h.subtract(m);if(y.isNaN())return Rs;t=t.replace(UP,y.toString())}return t}var BP=/\(([^()]*)\)/;function NJ(e){for(var t=e,n;(n=BP.exec(t))!=null;){var[,r]=n;t=t.replace(BP,CM(r))}return t}function _J(e){var t=e.replace(/\s+/g,"");return t=NJ(t),t=CM(t),t}function AJ(e){try{return _J(e)}catch{return Rs}}function Pg(e){var t=AJ(e.slice(5,-1));return t===Rs?"":t}var TJ=["x","y","lineHeight","capHeight","fill","scaleToFit","textAnchor","verticalAnchor"],RJ=["dx","dy","angle","className","breakAll"];function Wy(){return Wy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Wy.apply(null,arguments)}function WP(e,t){if(e==null)return{};var n,r,i=MJ(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function MJ(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var OM=/[ \f\n\r\t\v\u2028\u2029]+/,EM=e=>{var{children:t,breakAll:n,style:r}=e;try{var i=[];Jt(t)||(n?i=t.toString().split(""):i=t.toString().split(OM));var a=i.map(s=>({word:s,width:Oc(s,r).width})),o=n?0:Oc(" ",r).width;return{wordsWithComputedWidth:a,spaceWidth:o}}catch{return null}};function DJ(e){return e==="start"||e==="middle"||e==="end"||e==="inherit"}var NM=(e,t,n,r)=>e.reduce((i,a)=>{var{word:o,width:s}=a,l=i[i.length-1];if(l&&s!=null&&(t==null||r||l.width+s+n<Number(t)))l.words.push(o),l.width+=s+n;else{var c={words:[o],width:s};i.push(c)}return i},[]),_M=e=>e.reduce((t,n)=>t.width>n.width?t:n),zJ="…",HP=(e,t,n,r,i,a,o,s)=>{var l=e.slice(0,t),c=EM({breakAll:n,style:r,children:l+zJ});if(!c)return[!1,[]];var d=NM(c.wordsWithComputedWidth,a,o,s),f=d.length>i||_M(d).width>Number(a);return[f,d]},IJ=(e,t,n,r,i)=>{var{maxLines:a,children:o,style:s,breakAll:l}=e,c=ue(a),d=String(o),f=NM(t,r,n,i);if(!c||i)return f;var p=f.length>a||_M(f).width>Number(r);if(!p)return f;for(var h=0,m=d.length-1,y=0,g;h<=m&&y<=d.length-1;){var x=Math.floor((h+m)/2),b=x-1,[w,j]=HP(d,b,l,s,a,r,n,i),[k]=HP(d,x,l,s,a,r,n,i);if(!w&&!k&&(h=x+1),w&&k&&(m=x-1),!w&&k){g=j;break}y++}return g||f},KP=e=>{var t=Jt(e)?[]:e.toString().split(OM);return[{words:t,width:void 0}]},$J=e=>{var{width:t,scaleToFit:n,children:r,style:i,breakAll:a,maxLines:o}=e;if((t||n)&&!em.isSsr){var s,l,c=EM({breakAll:a,children:r,style:i});if(c){var{wordsWithComputedWidth:d,spaceWidth:f}=c;s=d,l=f}else return KP(r);return IJ({breakAll:a,children:r,maxLines:o,style:i},s,l,t,!!n)}return KP(r)},AM="#808080",LJ={angle:0,breakAll:!1,capHeight:"0.71em",fill:AM,lineHeight:"1em",scaleToFit:!1,textAnchor:"start",verticalAnchor:"end",x:0,y:0},Xb=v.forwardRef((e,t)=>{var n=fn(e,LJ),{x:r,y:i,lineHeight:a,capHeight:o,fill:s,scaleToFit:l,textAnchor:c,verticalAnchor:d}=n,f=WP(n,TJ),p=v.useMemo(()=>$J({breakAll:f.breakAll,children:f.children,maxLines:f.maxLines,scaleToFit:l,style:f.style,width:f.width}),[f.breakAll,f.children,f.maxLines,l,f.style,f.width]),{dx:h,dy:m,angle:y,className:g,breakAll:x}=f,b=WP(f,RJ);if(!di(r)||!di(i)||p.length===0)return null;var w=Number(r)+(ue(h)?h:0),j=Number(i)+(ue(m)?m:0);if(!ze(w)||!ze(j))return null;var k;switch(d){case"start":k=Pg("calc(".concat(o,")"));break;case"middle":k=Pg("calc(".concat((p.length-1)/2," * -").concat(a," + (").concat(o," / 2))"));break;default:k=Pg("calc(".concat(p.length-1," * -").concat(a,")"));break}var P=[],S=p[0];if(l&&S!=null){var C=S.width,{width:N}=f;P.push("scale(".concat(ue(N)&&ue(C)?N/C:1,")"))}return y&&P.push("rotate(".concat(y,", ").concat(w,", ").concat(j,")")),P.length&&(b.transform=P.join(" ")),v.createElement("text",Wy({},jn(b),{ref:t,x:w,y:j,className:Ke("recharts-text",g),textAnchor:c,fill:s.includes("url")?AM:s}),p.map((_,M)=>{var R=_.words.join(x?"":" ");return v.createElement("tspan",{x:w,dy:M===0?k:a,key:"".concat(R,"-").concat(M)},R)}))});Xb.displayName="Text";function VP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Gr(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?VP(Object(n),!0).forEach(function(r){FJ(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):VP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function FJ(e,t,n){return(t=UJ(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function UJ(e){var t=BJ(e,"string");return typeof t=="symbol"?t:t+""}function BJ(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var WJ=e=>{var{viewBox:t,position:n,offset:r=0,parentViewBox:i}=e,{x:a,y:o,height:s,upperWidth:l,lowerWidth:c}=Z0(t),d=a,f=a+(l-c)/2,p=(d+f)/2,h=(l+c)/2,m=d+l/2,y=s>=0?1:-1,g=y*r,x=y>0?"end":"start",b=y>0?"start":"end",w=l>=0?1:-1,j=w*r,k=w>0?"end":"start",P=w>0?"start":"end",S=i;if(n==="top"){var C={x:d+l/2,y:o-g,horizontalAnchor:"middle",verticalAnchor:x};return S&&(C.height=Math.max(o-S.y,0),C.width=l),C}if(n==="bottom"){var N={x:f+c/2,y:o+s+g,horizontalAnchor:"middle",verticalAnchor:b};return S&&(N.height=Math.max(S.y+S.height-(o+s),0),N.width=c),N}if(n==="left"){var _={x:p-j,y:o+s/2,horizontalAnchor:k,verticalAnchor:"middle"};return S&&(_.width=Math.max(_.x-S.x,0),_.height=s),_}if(n==="right"){var M={x:p+h+j,y:o+s/2,horizontalAnchor:P,verticalAnchor:"middle"};return S&&(M.width=Math.max(S.x+S.width-M.x,0),M.height=s),M}var R=S?{width:h,height:s}:{};return n==="insideLeft"?Gr({x:p+j,y:o+s/2,horizontalAnchor:P,verticalAnchor:"middle"},R):n==="insideRight"?Gr({x:p+h-j,y:o+s/2,horizontalAnchor:k,verticalAnchor:"middle"},R):n==="insideTop"?Gr({x:d+l/2,y:o+g,horizontalAnchor:"middle",verticalAnchor:b},R):n==="insideBottom"?Gr({x:f+c/2,y:o+s-g,horizontalAnchor:"middle",verticalAnchor:x},R):n==="insideTopLeft"?Gr({x:d+j,y:o+g,horizontalAnchor:P,verticalAnchor:b},R):n==="insideTopRight"?Gr({x:d+l-j,y:o+g,horizontalAnchor:k,verticalAnchor:b},R):n==="insideBottomLeft"?Gr({x:f+j,y:o+s-g,horizontalAnchor:P,verticalAnchor:x},R):n==="insideBottomRight"?Gr({x:f+c-j,y:o+s-g,horizontalAnchor:k,verticalAnchor:x},R):n&&typeof n=="object"&&(ue(n.x)||Qo(n.x))&&(ue(n.y)||Qo(n.y))?Gr({x:a+qa(n.x,h),y:o+qa(n.y,s),horizontalAnchor:"end",verticalAnchor:"end"},R):Gr({x:m,y:o+s/2,horizontalAnchor:"middle",verticalAnchor:"middle"},R)},HJ=["labelRef"],KJ=["content"];function ZP(e,t){if(e==null)return{};var n,r,i=VJ(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function VJ(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function qP(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function gc(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?qP(Object(n),!0).forEach(function(r){ZJ(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):qP(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function ZJ(e,t,n){return(t=qJ(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function qJ(e){var t=YJ(e,"string");return typeof t=="symbol"?t:t+""}function YJ(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Ai(){return Ai=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ai.apply(null,arguments)}var TM=v.createContext(null),GJ=e=>{var{x:t,y:n,upperWidth:r,lowerWidth:i,width:a,height:o,children:s}=e,l=v.useMemo(()=>({x:t,y:n,upperWidth:r,lowerWidth:i,width:a,height:o}),[t,n,r,i,a,o]);return v.createElement(TM.Provider,{value:l},s)},RM=()=>{var e=v.useContext(TM),t=Gh();return e||(t?Z0(t):void 0)},QJ=v.createContext(null),XJ=()=>{var e=v.useContext(QJ),t=ve(cR);return e||t},JJ=e=>{var{value:t,formatter:n}=e,r=Jt(e.children)?t:e.children;return typeof n=="function"?n(r):r},Jb=e=>e!=null&&typeof e=="function",eee=(e,t)=>{var n=gr(t-e),r=Math.min(Math.abs(t-e),360);return n*r},tee=(e,t,n,r,i)=>{var{offset:a,className:o}=e,{cx:s,cy:l,innerRadius:c,outerRadius:d,startAngle:f,endAngle:p,clockWise:h}=i,m=(c+d)/2,y=eee(f,p),g=y>=0?1:-1,x,b;switch(t){case"insideStart":x=f+g*a,b=h;break;case"insideEnd":x=p-g*a,b=!h;break;case"end":x=p+g*a,b=h;break;default:throw new Error("Unsupported position ".concat(t))}b=y<=0?b:!b;var w=Yt(s,l,m,x),j=Yt(s,l,m,x+(b?1:-1)*359),k="M".concat(w.x,",").concat(w.y,`
    A`).concat(m,",").concat(m,",0,1,").concat(b?0:1,`,
    `).concat(j.x,",").concat(j.y),P=Jt(e.id)?Gc("recharts-radial-line-"):e.id;return v.createElement("text",Ai({},r,{dominantBaseline:"central",className:Ke("recharts-radial-bar-label",o)}),v.createElement("defs",null,v.createElement("path",{id:P,d:k})),v.createElement("textPath",{xlinkHref:"#".concat(P)},n))},nee=(e,t,n)=>{var{cx:r,cy:i,innerRadius:a,outerRadius:o,startAngle:s,endAngle:l}=e,c=(s+l)/2;if(n==="outside"){var{x:d,y:f}=Yt(r,i,o+t,c);return{x:d,y:f,textAnchor:d>=r?"start":"end",verticalAnchor:"middle"}}if(n==="center")return{x:r,y:i,textAnchor:"middle",verticalAnchor:"middle"};if(n==="centerTop")return{x:r,y:i,textAnchor:"middle",verticalAnchor:"start"};if(n==="centerBottom")return{x:r,y:i,textAnchor:"middle",verticalAnchor:"end"};var p=(a+o)/2,{x:h,y:m}=Yt(r,i,p,c);return{x:h,y:m,textAnchor:"middle",verticalAnchor:"middle"}},gf=e=>e!=null&&"cx"in e&&ue(e.cx),ree={angle:0,offset:5,zIndex:bn.label,position:"middle",textBreakAll:!1};function iee(e){if(!gf(e))return e;var{cx:t,cy:n,outerRadius:r}=e,i=r*2;return{x:t-r,y:n-r,width:i,upperWidth:i,lowerWidth:i,height:i}}function pa(e){var t=fn(e,ree),{viewBox:n,parentViewBox:r,position:i,value:a,children:o,content:s,className:l="",textBreakAll:c,labelRef:d}=t,f=XJ(),p=RM(),h=i==="center"?p:f??p,m,y,g;n==null?m=h:gf(n)?m=n:m=Z0(n);var x=iee(m);if(!m||Jt(a)&&Jt(o)&&!v.isValidElement(s)&&typeof s!="function")return null;var b=gc(gc({},t),{},{viewBox:m});if(v.isValidElement(s)){var{labelRef:w}=b,j=ZP(b,HJ);return v.cloneElement(s,j)}if(typeof s=="function"){var{content:k}=b,P=ZP(b,KJ);if(y=v.createElement(s,P),v.isValidElement(y))return y}else y=JJ(t);var S=jn(t);if(gf(m)){if(i==="insideStart"||i==="insideEnd"||i==="end")return tee(t,i,y,S,m);g=nee(m,t.offset,t.position)}else{if(!x)return null;var C=WJ({viewBox:x,position:i,offset:t.offset,parentViewBox:gf(r)?void 0:r});g=gc(gc({x:C.x,y:C.y,textAnchor:C.horizontalAnchor,verticalAnchor:C.verticalAnchor},C.width!==void 0?{width:C.width}:{}),C.height!==void 0?{height:C.height}:{})}return v.createElement(oa,{zIndex:t.zIndex},v.createElement(Xb,Ai({ref:d,className:Ke("recharts-label",l)},S,g,{textAnchor:DJ(S.textAnchor)?S.textAnchor:g.textAnchor,breakAll:c}),y))}pa.displayName="Label";var aee=(e,t,n)=>{if(!e)return null;var r={viewBox:t,labelRef:n};return e===!0?v.createElement(pa,Ai({key:"label-implicit"},r)):di(e)?v.createElement(pa,Ai({key:"label-implicit",value:e},r)):v.isValidElement(e)?e.type===pa?v.cloneElement(e,gc({key:"label-implicit"},r)):v.createElement(pa,Ai({key:"label-implicit",content:e},r)):Jb(e)?v.createElement(pa,Ai({key:"label-implicit",content:e},r)):e&&typeof e=="object"?v.createElement(pa,Ai({},e,{key:"label-implicit"},r)):null};function oee(e){var{label:t,labelRef:n}=e,r=RM();return aee(t,r,n)||null}var MM={},DM={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return n[n.length-1]}e.last=t})(DM);var zM={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){return Array.isArray(n)?n:Array.from(n)}e.toArray=t})(zM);(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});const t=DM,n=zM,r=Rh;function i(a){if(r.isArrayLike(a))return t.last(n.toArray(a))}e.last=i})(MM);var see=MM.last;const lee=Qi(see);var cee=["valueAccessor"],uee=["dataKey","clockWise","id","textBreakAll","zIndex"];function Lp(){return Lp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Lp.apply(null,arguments)}function YP(e,t){if(e==null)return{};var n,r,i=dee(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function dee(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var fee=e=>Array.isArray(e.value)?lee(e.value):e.value,IM=v.createContext(void 0),pee=IM.Provider,$M=v.createContext(void 0);$M.Provider;function hee(){return v.useContext(IM)}function mee(){return v.useContext($M)}function vf(e){var{valueAccessor:t=fee}=e,n=YP(e,cee),{dataKey:r,clockWise:i,id:a,textBreakAll:o,zIndex:s}=n,l=YP(n,uee),c=hee(),d=mee(),f=c||d;return!f||!f.length?null:v.createElement(oa,{zIndex:s??bn.label},v.createElement(Za,{className:"recharts-label-list"},f.map((p,h)=>{var m,y=Jt(r)?t(p,h):Qt(p.payload,r),g=Jt(a)?{}:{id:"".concat(a,"-").concat(h)};return v.createElement(pa,Lp({key:"label-".concat(h)},jn(p),l,g,{fill:(m=n.fill)!==null&&m!==void 0?m:p.fill,parentViewBox:p.parentViewBox,value:y,textBreakAll:o,viewBox:p.viewBox,index:h,zIndex:0}))})))}vf.displayName="LabelList";function gee(e){var{label:t}=e;return t?t===!0?v.createElement(vf,{key:"labelList-implicit"}):v.isValidElement(t)||Jb(t)?v.createElement(vf,{key:"labelList-implicit",content:t}):typeof t=="object"?v.createElement(vf,Lp({key:"labelList-implicit"},t,{type:String(t.type)})):null:null}function Hy(){return Hy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Hy.apply(null,arguments)}var LM=e=>{var{cx:t,cy:n,r,className:i}=e,a=Ke("recharts-dot",i);return ue(t)&&ue(n)&&ue(r)?v.createElement("circle",Hy({},ui(e),E0(e),{className:a,cx:t,cy:n,r})):null},vee={radiusAxis:{},angleAxis:{}},FM=Wn({name:"polarAxis",initialState:vee,reducers:{addRadiusAxis(e,t){e.radiusAxis[t.payload.id]=t.payload},removeRadiusAxis(e,t){delete e.radiusAxis[t.payload.id]},addAngleAxis(e,t){e.angleAxis[t.payload.id]=t.payload},removeAngleAxis(e,t){delete e.angleAxis[t.payload.id]}}}),{addRadiusAxis:Roe,removeRadiusAxis:Moe,addAngleAxis:Doe,removeAngleAxis:zoe}=FM.actions,yee=FM.reducer;function xee(e){return e&&typeof e=="object"&&"className"in e&&typeof e.className=="string"?e.className:""}var UM=e=>e&&typeof e=="object"&&"clipDot"in e?!!e.clipDot:!0,BM={};(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});function t(n){var i;if(typeof n!="object"||n==null)return!1;if(Object.getPrototypeOf(n)===null)return!0;if(Object.prototype.toString.call(n)!=="[object Object]"){const a=n[Symbol.toStringTag];return a==null||!((i=Object.getOwnPropertyDescriptor(n,Symbol.toStringTag))!=null&&i.writable)?!1:n.toString()===`[object ${a}]`}let r=n;for(;Object.getPrototypeOf(r)!==null;)r=Object.getPrototypeOf(r);return Object.getPrototypeOf(n)===r}e.isPlainObject=t})(BM);var bee=BM.isPlainObject;const wee=Qi(bee);var GP,QP,XP,JP,eC;function tC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function nC(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?tC(Object(n),!0).forEach(function(r){jee(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):tC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function jee(e,t,n){return(t=See(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function See(e){var t=kee(e,"string");return typeof t=="symbol"?t:t+""}function kee(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Fp(){return Fp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Fp.apply(null,arguments)}function ac(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}var rC=(e,t,n,r,i)=>{var a=n-r,o;return o=mt(GP||(GP=ac(["M ",",",""])),e,t),o+=mt(QP||(QP=ac(["L ",",",""])),e+n,t),o+=mt(XP||(XP=ac(["L ",",",""])),e+n-a/2,t+i),o+=mt(JP||(JP=ac(["L ",",",""])),e+n-a/2-r,t+i),o+=mt(eC||(eC=ac(["L ",","," Z"])),e,t),o},Pee={x:0,y:0,upperWidth:0,lowerWidth:0,height:0,isUpdateAnimationActive:!1,animationBegin:0,animationDuration:1500,animationEasing:"ease"},Cee=e=>{var t=fn(e,Pee),{x:n,y:r,upperWidth:i,lowerWidth:a,height:o,className:s}=t,{animationEasing:l,animationDuration:c,animationBegin:d,isUpdateAnimationActive:f}=t,p=v.useRef(null),[h,m]=v.useState(-1),y=v.useRef(i),g=v.useRef(a),x=v.useRef(o),b=v.useRef(n),w=v.useRef(r),j=J0(e,"trapezoid-");if(v.useEffect(()=>{if(p.current&&p.current.getTotalLength)try{var V=p.current.getTotalLength();V&&m(V)}catch{}},[]),n!==+n||r!==+r||i!==+i||a!==+a||o!==+o||i===0&&a===0||o===0)return null;var k=Ke("recharts-trapezoid",s);if(!f)return v.createElement("g",null,v.createElement("path",Fp({},jn(t),{className:k,d:rC(n,r,i,a,o)})));var P=y.current,S=g.current,C=x.current,N=b.current,_=w.current,M="0px ".concat(h===-1?1:h,"px"),R="".concat(h,"px 0px"),G=tT(["strokeDasharray"],c,l);return v.createElement(X0,{animationId:j,key:j,canBegin:h>0,duration:c,easing:l,isActive:f,begin:d},V=>{var ee=An(P,i,V),Q=An(S,a,V),te=An(C,o,V),$=An(N,n,V),B=An(_,r,V);p.current&&(y.current=ee,g.current=Q,x.current=te,b.current=$,w.current=B);var L=V>0?{transition:G,strokeDasharray:R}:{strokeDasharray:M};return v.createElement("path",Fp({},jn(t),{className:k,d:rC($,B,ee,Q,te),ref:p,style:nC(nC({},L),t.style)}))})},Oee=["option","shapeType","activeClassName"];function Eee(e,t){if(e==null)return{};var n,r,i=Nee(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Nee(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function iC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Up(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?iC(Object(n),!0).forEach(function(r){_ee(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):iC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function _ee(e,t,n){return(t=Aee(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Aee(e){var t=Tee(e,"string");return typeof t=="symbol"?t:t+""}function Tee(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Ree(e,t){return Up(Up({},t),e)}function Mee(e,t){return e==="symbols"}function aC(e){var{shapeType:t,elementProps:n}=e;switch(t){case"rectangle":return v.createElement(aT,n);case"trapezoid":return v.createElement(Cee,n);case"sector":return v.createElement(lT,n);case"symbols":if(Mee(t))return v.createElement(O0,n);break;case"curve":return v.createElement(eT,n);default:return null}}function Dee(e){return v.isValidElement(e)?e.props:e}function zee(e){var{option:t,shapeType:n,activeClassName:r="recharts-active-shape"}=e,i=Eee(e,Oee),a;if(v.isValidElement(t))a=v.cloneElement(t,Up(Up({},i),Dee(t)));else if(typeof t=="function")a=t(i,i.index);else if(wee(t)&&typeof t!="boolean"){var o=Ree(t,i);a=v.createElement(aC,{shapeType:n,elementProps:o})}else{var s=i;a=v.createElement(aC,{shapeType:n,elementProps:s})}return i.isActive?v.createElement(Za,{className:r},a):a}function Iee(e){var{tooltipEntrySettings:t}=e,n=Ot(),r=Hn(),i=v.useRef(null);return v.useLayoutEffect(()=>{r||(i.current===null?n(eQ(t)):i.current!==t&&n(tQ({prev:i.current,next:t})),i.current=t)},[t,n,r]),v.useLayoutEffect(()=>()=>{i.current&&(n(nQ(i.current)),i.current=null)},[n]),null}function $ee(e){var{legendPayload:t}=e,n=Ot(),r=Hn(),i=v.useRef(null);return v.useLayoutEffect(()=>{r||(i.current===null?n(SK(t)):i.current!==t&&n(kK({prev:i.current,next:t})),i.current=t)},[n,r,t]),v.useLayoutEffect(()=>()=>{i.current&&(n(PK(i.current)),i.current=null)},[n]),null}var Cg,Lee=()=>{var[e]=v.useState(()=>Gc("uid-"));return e},Fee=(Cg=JC.useId)!==null&&Cg!==void 0?Cg:Lee;function Uee(e,t){var n=Fee();return t||(e?"".concat(e,"-").concat(n):n)}var Bee=v.createContext(void 0),Wee=e=>{var{id:t,type:n,children:r}=e,i=Uee("recharts-".concat(n),t);return v.createElement(Bee.Provider,{value:i},r(i))},Hee={cartesianItems:[],polarItems:[]},WM=Wn({name:"graphicalItems",initialState:Hee,reducers:{addCartesianGraphicalItem:{reducer(e,t){e.cartesianItems.push(t.payload)},prepare:Je()},replaceCartesianGraphicalItem:{reducer(e,t){var{prev:n,next:r}=t.payload,i=Lr(e).cartesianItems.indexOf(n);i>-1&&(e.cartesianItems[i]=r)},prepare:Je()},removeCartesianGraphicalItem:{reducer(e,t){var n=Lr(e).cartesianItems.indexOf(t.payload);n>-1&&e.cartesianItems.splice(n,1)},prepare:Je()},addPolarGraphicalItem:{reducer(e,t){e.polarItems.push(t.payload)},prepare:Je()},removePolarGraphicalItem:{reducer(e,t){var n=Lr(e).polarItems.indexOf(t.payload);n>-1&&e.polarItems.splice(n,1)},prepare:Je()}}}),{addCartesianGraphicalItem:Kee,replaceCartesianGraphicalItem:Vee,removeCartesianGraphicalItem:Zee,addPolarGraphicalItem:Ioe,removePolarGraphicalItem:$oe}=WM.actions,qee=WM.reducer,Yee=e=>{var t=Ot(),n=v.useRef(null);return v.useLayoutEffect(()=>{n.current===null?t(Kee(e)):n.current!==e&&t(Vee({prev:n.current,next:e})),n.current=e},[t,e]),v.useLayoutEffect(()=>()=>{n.current&&(t(Zee(n.current)),n.current=null)},[t]),null},Gee=v.memo(Yee),Qee=["points"];function oC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Og(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?oC(Object(n),!0).forEach(function(r){Xee(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):oC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Xee(e,t,n){return(t=Jee(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Jee(e){var t=ete(e,"string");return typeof t=="symbol"?t:t+""}function ete(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Bp(){return Bp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Bp.apply(null,arguments)}function tte(e,t){if(e==null)return{};var n,r,i=nte(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function nte(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function rte(e){var{option:t,dotProps:n,className:r}=e;if(v.isValidElement(t))return v.cloneElement(t,n);if(typeof t=="function")return t(n);var i=Ke(r,typeof t!="boolean"?t.className:""),a=n??{},{points:o}=a,s=tte(a,Qee);return v.createElement(LM,Bp({},s,{className:i}))}function ite(e,t){return e==null?!1:t?!0:e.length===1}function ate(e){var{points:t,dot:n,className:r,dotClassName:i,dataKey:a,baseProps:o,needClip:s,clipPathId:l,zIndex:c=bn.scatter}=e;if(!ite(t,n))return null;var d=UM(n),f=k7(n),p=t.map((m,y)=>{var g,x,b=Og(Og(Og({r:3},o),f),{},{index:y,cx:(g=m.x)!==null&&g!==void 0?g:void 0,cy:(x=m.y)!==null&&x!==void 0?x:void 0,dataKey:a,value:m.value,payload:m.payload,points:t});return v.createElement(rte,{key:"dot-".concat(y),option:n,dotProps:b,className:i})}),h={};return s&&l!=null&&(h.clipPath="url(#clipPath-".concat(d?"":"dots-").concat(l,")")),v.createElement(oa,{zIndex:c},v.createElement(Za,Bp({className:r},h),p))}function sC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function lC(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?sC(Object(n),!0).forEach(function(r){ote(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):sC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function ote(e,t,n){return(t=ste(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ste(e){var t=lte(e,"string");return typeof t=="symbol"?t:t+""}function lte(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var cte={xAxis:{},yAxis:{},zAxis:{}},HM=Wn({name:"cartesianAxis",initialState:cte,reducers:{addXAxis:{reducer(e,t){e.xAxis[t.payload.id]=t.payload},prepare:Je()},replaceXAxis:{reducer(e,t){var{prev:n,next:r}=t.payload;e.xAxis[n.id]!==void 0&&(n.id!==r.id&&delete e.xAxis[n.id],e.xAxis[r.id]=r)},prepare:Je()},removeXAxis:{reducer(e,t){delete e.xAxis[t.payload.id]},prepare:Je()},addYAxis:{reducer(e,t){e.yAxis[t.payload.id]=t.payload},prepare:Je()},replaceYAxis:{reducer(e,t){var{prev:n,next:r}=t.payload;e.yAxis[n.id]!==void 0&&(n.id!==r.id&&delete e.yAxis[n.id],e.yAxis[r.id]=r)},prepare:Je()},removeYAxis:{reducer(e,t){delete e.yAxis[t.payload.id]},prepare:Je()},addZAxis:{reducer(e,t){e.zAxis[t.payload.id]=t.payload},prepare:Je()},replaceZAxis:{reducer(e,t){var{prev:n,next:r}=t.payload;e.zAxis[n.id]!==void 0&&(n.id!==r.id&&delete e.zAxis[n.id],e.zAxis[r.id]=r)},prepare:Je()},removeZAxis:{reducer(e,t){delete e.zAxis[t.payload.id]},prepare:Je()},updateYAxisWidth(e,t){var{id:n,width:r}=t.payload,i=e.yAxis[n];if(i){var a,o=i.widthHistory||[];if(o.length===3&&o[0]===o[2]&&r===o[1]&&r!==i.width&&Math.abs(r-((a=o[0])!==null&&a!==void 0?a:0))<=1)return;var s=[...o,r].slice(-3);e.yAxis[n]=lC(lC({},i),{},{width:r,widthHistory:s})}}}}),{addXAxis:ute,replaceXAxis:dte,removeXAxis:fte,addYAxis:pte,replaceYAxis:hte,removeYAxis:mte,addZAxis:Loe,replaceZAxis:Foe,removeZAxis:Uoe,updateYAxisWidth:gte}=HM.actions,vte=HM.reducer,yte=I([en],e=>({top:e.top,bottom:e.bottom,left:e.left,right:e.right})),xte=I([yte,ea,ta],(e,t,n)=>{if(!(!e||t==null||n==null))return{x:e.left,y:e.top,width:Math.max(0,t-e.left-e.right),height:Math.max(0,n-e.top-e.bottom)}}),ew=()=>ve(xte),bte=()=>ve(qQ);function cC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function Eg(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?cC(Object(n),!0).forEach(function(r){wte(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):cC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function wte(e,t,n){return(t=jte(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function jte(e){var t=Ste(e,"string");return typeof t=="symbol"?t:t+""}function Ste(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var kte=e=>{var{point:t,childIndex:n,mainColor:r,activeDot:i,dataKey:a,clipPath:o}=e;if(i===!1||t.x==null||t.y==null)return null;var s={index:n,dataKey:a,cx:t.x,cy:t.y,r:4,fill:r??"none",strokeWidth:2,stroke:"#fff",payload:t.payload,value:t.value},l=Eg(Eg(Eg({},s),Ph(i)),E0(i)),c;return v.isValidElement(i)?c=v.cloneElement(i,l):typeof i=="function"?c=i(l):c=v.createElement(LM,l),v.createElement(Za,{className:"recharts-active-dot",clipPath:o},c)};function Pte(e){var{points:t,mainColor:n,activeDot:r,itemDataKey:i,clipPath:a,zIndex:o=bn.activeDot}=e,s=ve(cu),l=bte();if(t==null||l==null)return null;var c=t.find(d=>l.includes(d.payload));return Jt(c)?null:v.createElement(oa,{zIndex:o},v.createElement(kte,{point:c,childIndex:Number(s),mainColor:n,dataKey:i,activeDot:r,clipPath:a}))}var Cte=e=>{var{chartData:t}=e,n=Ot(),r=Hn();return v.useEffect(()=>r?()=>{}:(n(AP(t)),()=>{n(AP(void 0))}),[t,n,r]),null},uC={x:0,y:0,width:0,height:0,padding:{top:0,right:0,bottom:0,left:0}},KM=Wn({name:"brush",initialState:uC,reducers:{setBrushSettings(e,t){return t.payload==null?uC:t.payload}}}),{setBrushSettings:Boe}=KM.actions,Ote=KM.reducer;function Ete(e){return(e%180+180)%180}var Nte=function(t){var{width:n,height:r}=t,i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,a=Ete(i),o=a*Math.PI/180,s=Math.atan(r/n),l=o>s&&o<Math.PI-s?r/Math.sin(o):n/Math.cos(o);return Math.abs(l)},_te={dots:[],areas:[],lines:[]},VM=Wn({name:"referenceElements",initialState:_te,reducers:{addDot:(e,t)=>{e.dots.push(t.payload)},removeDot:(e,t)=>{var n=Lr(e).dots.findIndex(r=>r===t.payload);n!==-1&&e.dots.splice(n,1)},addArea:(e,t)=>{e.areas.push(t.payload)},removeArea:(e,t)=>{var n=Lr(e).areas.findIndex(r=>r===t.payload);n!==-1&&e.areas.splice(n,1)},addLine:(e,t)=>{e.lines.push(t.payload)},removeLine:(e,t)=>{var n=Lr(e).lines.findIndex(r=>r===t.payload);n!==-1&&e.lines.splice(n,1)}}}),{addDot:Woe,removeDot:Hoe,addArea:Koe,removeArea:Voe,addLine:Zoe,removeLine:qoe}=VM.actions,Ate=VM.reducer,Tte=v.createContext(void 0),Rte=e=>{var{children:t}=e,[n]=v.useState("".concat(Gc("recharts"),"-clip")),r=ew();if(r==null)return null;var{x:i,y:a,width:o,height:s}=r;return v.createElement(Tte.Provider,{value:n},v.createElement("defs",null,v.createElement("clipPath",{id:n},v.createElement("rect",{x:i,y:a,height:s,width:o}))),t)};function ZM(e,t){if(t<1)return[];if(t===1)return e;for(var n=[],r=0;r<e.length;r+=t){var i=e[r];i!==void 0&&n.push(i)}return n}function Mte(e,t,n){var r={width:e.width+t.width,height:e.height+t.height};return Nte(r,n)}function Dte(e,t,n){var r=n==="width",{x:i,y:a,width:o,height:s}=e;return t===1?{start:r?i:a,end:r?i+o:a+s}:{start:r?i+o:a+s,end:r?i:a}}function du(e,t,n,r,i){if(e*t<e*r||e*t>e*i)return!1;var a=n();return e*(t-e*a/2-r)>=0&&e*(t+e*a/2-i)<=0}function zte(e,t){return ZM(e,t+1)}function Ite(e,t,n,r,i){for(var a=(r||[]).slice(),{start:o,end:s}=t,l=0,c=1,d=o,f=function(){var m=r==null?void 0:r[l];if(m===void 0)return{v:ZM(r,c)};var y=l,g,x=()=>(g===void 0&&(g=n(m,y)),g),b=m.coordinate,w=l===0||du(e,b,x,d,s);w||(l=0,d=o,c+=1),w&&(d=b+e*(x()/2+i),l+=c)},p;c<=a.length;)if(p=f(),p)return p.v;return[]}function $te(e,t,n,r,i){var a=(r||[]).slice(),o=a.length;if(o===0)return[];for(var{start:s,end:l}=t,c=1;c<=o;c++){for(var d=(o-1)%c,f=s,p=!0,h=function(){var j=r[y];if(j==null)return 0;var k=y,P,S=()=>(P===void 0&&(P=n(j,k)),P),C=j.coordinate,N=y===d||du(e,C,S,f,l);if(!N)return p=!1,1;N&&(f=C+e*(S()/2+i))},m,y=d;y<o&&(m=h(),!(m!==0&&m===1));y+=c);if(p){for(var g=[],x=d;x<o;x+=c){var b=r[x];b!=null&&g.push(b)}return g}}return[]}function dC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function on(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?dC(Object(n),!0).forEach(function(r){Lte(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):dC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Lte(e,t,n){return(t=Fte(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Fte(e){var t=Ute(e,"string");return typeof t=="symbol"?t:t+""}function Ute(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Bte(e,t,n,r,i){for(var a=(r||[]).slice(),o=a.length,{start:s}=t,{end:l}=t,c=function(p){var h=a[p];if(h==null)return 1;var m=h,y,g=()=>(y===void 0&&(y=n(h,p)),y);if(p===o-1){var x=e*(m.coordinate+e*g()/2-l);a[p]=m=on(on({},m),{},{tickCoord:x>0?m.coordinate-x*e:m.coordinate})}else a[p]=m=on(on({},m),{},{tickCoord:m.coordinate});if(m.tickCoord!=null){var b=du(e,m.tickCoord,g,s,l);b&&(l=m.tickCoord-e*(g()/2+i),a[p]=on(on({},m),{},{isShow:!0}))}},d=o-1;d>=0;d--)c(d);return a}function Wte(e,t,n,r,i,a){var o=(r||[]).slice(),s=o.length,{start:l,end:c}=t;if(a){var d=r[s-1];if(d!=null){var f=n(d,s-1),p=e*(d.coordinate+e*f/2-c);if(o[s-1]=d=on(on({},d),{},{tickCoord:p>0?d.coordinate-p*e:d.coordinate}),d.tickCoord!=null){var h=du(e,d.tickCoord,()=>f,l,c);h&&(c=d.tickCoord-e*(f/2+i),o[s-1]=on(on({},d),{},{isShow:!0}))}}}for(var m=a?s-1:s,y=function(b){var w=o[b];if(w==null)return 1;var j=w,k,P=()=>(k===void 0&&(k=n(w,b)),k);if(b===0){var S=e*(j.coordinate-e*P()/2-l);o[b]=j=on(on({},j),{},{tickCoord:S<0?j.coordinate-S*e:j.coordinate})}else o[b]=j=on(on({},j),{},{tickCoord:j.coordinate});if(j.tickCoord!=null){var C=du(e,j.tickCoord,P,l,c);C&&(l=j.tickCoord+e*(P()/2+i),o[b]=on(on({},j),{},{isShow:!0}))}},g=0;g<m;g++)y(g);return o}function tw(e,t,n){var{tick:r,ticks:i,viewBox:a,minTickGap:o,orientation:s,interval:l,tickFormatter:c,unit:d,angle:f}=e;if(!i||!i.length||!r)return[];if(ue(l)||em.isSsr){var p;return(p=zte(i,ue(l)?l:0))!==null&&p!==void 0?p:[]}var h=[],m=s==="top"||s==="bottom"?"width":"height",y=d&&m==="width"?Oc(d,{fontSize:t,letterSpacing:n}):{width:0,height:0},g=(k,P)=>{var S=typeof c=="function"?c(k.value,P):k.value;return m==="width"?Mte(Oc(S,{fontSize:t,letterSpacing:n}),y,f):Oc(S,{fontSize:t,letterSpacing:n})[m]},x=i[0],b=i[1],w=i.length>=2&&x!=null&&b!=null?gr(b.coordinate-x.coordinate):1,j=Dte(a,w,m);return l==="equidistantPreserveStart"?Ite(w,j,g,i,o):l==="equidistantPreserveEnd"?$te(w,j,g,i,o):(l==="preserveStart"||l==="preserveStartEnd"?h=Wte(w,j,g,i,o,l==="preserveStartEnd"):h=Bte(w,j,g,i,o),h.filter(k=>k.isShow))}var Hte=e=>{var{ticks:t,label:n,labelGapWithTick:r=5,tickSize:i=0,tickMargin:a=0}=e,o=0;if(t){Array.from(t).forEach(d=>{if(d){var f=d.getBoundingClientRect();f.width>o&&(o=f.width)}});var s=n?n.getBoundingClientRect().width:0,l=i+a,c=o+l+s+(n?r:0);return Math.round(c)}return 0},Kte=["axisLine","width","height","className","hide","ticks","axisType"];function Vte(e,t){if(e==null)return{};var n,r,i=Zte(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Zte(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function ns(){return ns=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ns.apply(null,arguments)}function fC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function ht(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?fC(Object(n),!0).forEach(function(r){qte(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):fC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function qte(e,t,n){return(t=Yte(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Yte(e){var t=Gte(e,"string");return typeof t=="symbol"?t:t+""}function Gte(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var $i={x:0,y:0,width:0,height:0,viewBox:{x:0,y:0,width:0,height:0},orientation:"bottom",ticks:[],stroke:"#666",tickLine:!0,axisLine:!0,tick:!0,mirror:!1,minTickGap:5,tickSize:6,tickMargin:2,interval:"preserveEnd",zIndex:bn.axis};function Qte(e){var{x:t,y:n,width:r,height:i,orientation:a,mirror:o,axisLine:s,otherSvgProps:l}=e;if(!s)return null;var c=ht(ht(ht({},l),ui(s)),{},{fill:"none"});if(a==="top"||a==="bottom"){var d=+(a==="top"&&!o||a==="bottom"&&o);c=ht(ht({},c),{},{x1:t,y1:n+d*i,x2:t+r,y2:n+d*i})}else{var f=+(a==="left"&&!o||a==="right"&&o);c=ht(ht({},c),{},{x1:t+f*r,y1:n,x2:t+f*r,y2:n+i})}return v.createElement("line",ns({},c,{className:Ke("recharts-cartesian-axis-line",Th(s,"className"))}))}function Xte(e,t,n,r,i,a,o,s,l){var c,d,f,p,h,m,y=s?-1:1,g=e.tickSize||o,x=ue(e.tickCoord)?e.tickCoord:e.coordinate;switch(a){case"top":c=d=e.coordinate,p=n+ +!s*i,f=p-y*g,m=f-y*l,h=x;break;case"left":f=p=e.coordinate,d=t+ +!s*r,c=d-y*g,h=c-y*l,m=x;break;case"right":f=p=e.coordinate,d=t+ +s*r,c=d+y*g,h=c+y*l,m=x;break;default:c=d=e.coordinate,p=n+ +s*i,f=p+y*g,m=f+y*l,h=x;break}return{line:{x1:c,y1:f,x2:d,y2:p},tick:{x:h,y:m}}}function Jte(e,t){switch(e){case"left":return t?"start":"end";case"right":return t?"end":"start";default:return"middle"}}function ene(e,t){switch(e){case"left":case"right":return"middle";case"top":return t?"start":"end";default:return t?"end":"start"}}function tne(e){var{option:t,tickProps:n,value:r}=e,i,a=Ke(n.className,"recharts-cartesian-axis-tick-value");if(v.isValidElement(t))i=v.cloneElement(t,ht(ht({},n),{},{className:a}));else if(typeof t=="function")i=t(ht(ht({},n),{},{className:a}));else{var o="recharts-cartesian-axis-tick-value";typeof t!="boolean"&&(o=Ke(o,xee(t))),i=v.createElement(Xb,ns({},n,{className:o}),r)}return i}var nne=v.forwardRef((e,t)=>{var{ticks:n=[],tick:r,tickLine:i,stroke:a,tickFormatter:o,unit:s,padding:l,tickTextProps:c,orientation:d,mirror:f,x:p,y:h,width:m,height:y,tickSize:g,tickMargin:x,fontSize:b,letterSpacing:w,getTicksConfig:j,events:k,axisType:P}=e,S=tw(ht(ht({},j),{},{ticks:n}),b,w),C=Jte(d,f),N=ene(d,f),_=ui(j),M=Ph(r),R={};typeof i=="object"&&(R=i);var G=ht(ht({},_),{},{fill:"none"},R),V=S.map(te=>ht({entry:te},Xte(te,p,h,m,y,d,g,f,x))),ee=V.map(te=>{var{entry:$,line:B}=te;return v.createElement(Za,{className:"recharts-cartesian-axis-tick",key:"tick-".concat($.value,"-").concat($.coordinate,"-").concat($.tickCoord)},i&&v.createElement("line",ns({},G,B,{className:Ke("recharts-cartesian-axis-tick-line",Th(i,"className"))})))}),Q=V.map((te,$)=>{var B,L,{entry:Y,tick:re}=te,Oe=ht(ht(ht(ht({verticalAnchor:N},_),{},{textAnchor:C,stroke:"none",fill:a},re),{},{index:$,payload:Y,visibleTicksCount:S.length,tickFormatter:o,padding:l},c),{},{angle:(B=(L=c==null?void 0:c.angle)!==null&&L!==void 0?L:_.angle)!==null&&B!==void 0?B:0}),we=ht(ht({},Oe),M);return v.createElement(Za,ns({className:"recharts-cartesian-axis-tick-label",key:"tick-label-".concat(Y.value,"-").concat(Y.coordinate,"-").concat(Y.tickCoord)},S2(k,Y,$)),r&&v.createElement(tne,{option:r,tickProps:we,value:"".concat(typeof o=="function"?o(Y.value,$):Y.value).concat(s||"")}))});return v.createElement("g",{className:"recharts-cartesian-axis-ticks recharts-".concat(P,"-ticks")},Q.length>0&&v.createElement(oa,{zIndex:bn.label},v.createElement("g",{className:"recharts-cartesian-axis-tick-labels recharts-".concat(P,"-tick-labels"),ref:t},Q)),ee.length>0&&v.createElement("g",{className:"recharts-cartesian-axis-tick-lines recharts-".concat(P,"-tick-lines")},ee))}),rne=v.forwardRef((e,t)=>{var{axisLine:n,width:r,height:i,className:a,hide:o,ticks:s,axisType:l}=e,c=Vte(e,Kte),[d,f]=v.useState(""),[p,h]=v.useState(""),m=v.useRef(null);v.useImperativeHandle(t,()=>({getCalculatedWidth:()=>{var g;return Hte({ticks:m.current,label:(g=e.labelRef)===null||g===void 0?void 0:g.current,labelGapWithTick:5,tickSize:e.tickSize,tickMargin:e.tickMargin})}}));var y=v.useCallback(g=>{if(g){var x=g.getElementsByClassName("recharts-cartesian-axis-tick-value");m.current=x;var b=x[0];if(b){var w=window.getComputedStyle(b),j=w.fontSize,k=w.letterSpacing;(j!==d||k!==p)&&(f(j),h(k))}}},[d,p]);return o||r!=null&&r<=0||i!=null&&i<=0?null:v.createElement(oa,{zIndex:e.zIndex},v.createElement(Za,{className:Ke("recharts-cartesian-axis",a)},v.createElement(Qte,{x:e.x,y:e.y,width:r,height:i,orientation:e.orientation,mirror:e.mirror,axisLine:n,otherSvgProps:ui(e)}),v.createElement(nne,{ref:y,axisType:l,events:c,fontSize:d,getTicksConfig:e,height:e.height,letterSpacing:p,mirror:e.mirror,orientation:e.orientation,padding:e.padding,stroke:e.stroke,tick:e.tick,tickFormatter:e.tickFormatter,tickLine:e.tickLine,tickMargin:e.tickMargin,tickSize:e.tickSize,tickTextProps:e.tickTextProps,ticks:s,unit:e.unit,width:e.width,x:e.x,y:e.y}),v.createElement(GJ,{x:e.x,y:e.y,width:e.width,height:e.height,lowerWidth:e.width,upperWidth:e.width},v.createElement(oee,{label:e.label,labelRef:e.labelRef}),e.children)))}),nw=v.forwardRef((e,t)=>{var n=fn(e,$i);return v.createElement(rne,ns({},n,{ref:t}))});nw.displayName="CartesianAxis";var ine=["x1","y1","x2","y2","key"],ane=["offset"],one=["xAxisId","yAxisId"],sne=["xAxisId","yAxisId"];function pC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function cn(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?pC(Object(n),!0).forEach(function(r){lne(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):pC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function lne(e,t,n){return(t=cne(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function cne(e){var t=une(e,"string");return typeof t=="symbol"?t:t+""}function une(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Co(){return Co=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Co.apply(null,arguments)}function Wp(e,t){if(e==null)return{};var n,r,i=dne(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function dne(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var fne=e=>{var{fill:t}=e;if(!t||t==="none")return null;var{fillOpacity:n,x:r,y:i,width:a,height:o,ry:s}=e;return v.createElement("rect",{x:r,y:i,ry:s,width:a,height:o,stroke:"none",fill:t,fillOpacity:n,className:"recharts-cartesian-grid-bg"})};function qM(e){var{option:t,lineItemProps:n}=e,r;if(v.isValidElement(t))r=v.cloneElement(t,n);else if(typeof t=="function")r=t(n);else{var i,{x1:a,y1:o,x2:s,y2:l,key:c}=n,d=Wp(n,ine),f=(i=ui(d))!==null&&i!==void 0?i:{},{offset:p}=f,h=Wp(f,ane);r=v.createElement("line",Co({},h,{x1:a,y1:o,x2:s,y2:l,fill:"none",key:c}))}return r}function pne(e){var{x:t,width:n,horizontal:r=!0,horizontalPoints:i}=e;if(!r||!i||!i.length)return null;var{xAxisId:a,yAxisId:o}=e,s=Wp(e,one),l=i.map((c,d)=>{var f=cn(cn({},s),{},{x1:t,y1:c,x2:t+n,y2:c,key:"line-".concat(d),index:d});return v.createElement(qM,{key:"line-".concat(d),option:r,lineItemProps:f})});return v.createElement("g",{className:"recharts-cartesian-grid-horizontal"},l)}function hne(e){var{y:t,height:n,vertical:r=!0,verticalPoints:i}=e;if(!r||!i||!i.length)return null;var{xAxisId:a,yAxisId:o}=e,s=Wp(e,sne),l=i.map((c,d)=>{var f=cn(cn({},s),{},{x1:c,y1:t,x2:c,y2:t+n,key:"line-".concat(d),index:d});return v.createElement(qM,{option:r,lineItemProps:f,key:"line-".concat(d)})});return v.createElement("g",{className:"recharts-cartesian-grid-vertical"},l)}function mne(e){var{horizontalFill:t,fillOpacity:n,x:r,y:i,width:a,height:o,horizontalPoints:s,horizontal:l=!0}=e;if(!l||!t||!t.length||s==null)return null;var c=s.map(f=>Math.round(f+i-i)).sort((f,p)=>f-p);i!==c[0]&&c.unshift(0);var d=c.map((f,p)=>{var h=c[p+1],m=h==null,y=m?i+o-f:h-f;if(y<=0)return null;var g=p%t.length;return v.createElement("rect",{key:"react-".concat(p),y:f,x:r,height:y,width:a,stroke:"none",fill:t[g],fillOpacity:n,className:"recharts-cartesian-grid-bg"})});return v.createElement("g",{className:"recharts-cartesian-gridstripes-horizontal"},d)}function gne(e){var{vertical:t=!0,verticalFill:n,fillOpacity:r,x:i,y:a,width:o,height:s,verticalPoints:l}=e;if(!t||!n||!n.length)return null;var c=l.map(f=>Math.round(f+i-i)).sort((f,p)=>f-p);i!==c[0]&&c.unshift(0);var d=c.map((f,p)=>{var h=c[p+1],m=h==null,y=m?i+o-f:h-f;if(y<=0)return null;var g=p%n.length;return v.createElement("rect",{key:"react-".concat(p),x:f,y:a,width:y,height:s,stroke:"none",fill:n[g],fillOpacity:r,className:"recharts-cartesian-grid-bg"})});return v.createElement("g",{className:"recharts-cartesian-gridstripes-vertical"},d)}var vne=(e,t)=>{var{xAxis:n,width:r,height:i,offset:a}=e;return AA(tw(cn(cn(cn({},$i),n),{},{ticks:TA(n),viewBox:{x:0,y:0,width:r,height:i}})),a.left,a.left+a.width,t)},yne=(e,t)=>{var{yAxis:n,width:r,height:i,offset:a}=e;return AA(tw(cn(cn(cn({},$i),n),{},{ticks:TA(n),viewBox:{x:0,y:0,width:r,height:i}})),a.top,a.top+a.height,t)},xne={horizontal:!0,vertical:!0,horizontalPoints:[],verticalPoints:[],stroke:"#ccc",fill:"none",verticalFill:[],horizontalFill:[],xAxisId:0,yAxisId:0,syncWithTicks:!1,zIndex:bn.grid};function YM(e){var t=q0(),n=Y0(),r=BA(),i=cn(cn({},fn(e,xne)),{},{x:ue(e.x)?e.x:r.left,y:ue(e.y)?e.y:r.top,width:ue(e.width)?e.width:r.width,height:ue(e.height)?e.height:r.height}),{xAxisId:a,yAxisId:o,x:s,y:l,width:c,height:d,syncWithTicks:f,horizontalValues:p,verticalValues:h}=i,m=Hn(),y=ve(N=>bP(N,"xAxis",a,m)),g=ve(N=>bP(N,"yAxis",o,m));if(!fi(c)||!fi(d)||!ue(s)||!ue(l))return null;var x=i.verticalCoordinatesGenerator||vne,b=i.horizontalCoordinatesGenerator||yne,{horizontalPoints:w,verticalPoints:j}=i;if((!w||!w.length)&&typeof b=="function"){var k=p&&p.length,P=b({yAxis:g?cn(cn({},g),{},{ticks:k?p:g.ticks}):void 0,width:t??c,height:n??d,offset:r},k?!0:f);mp(Array.isArray(P),"horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof P,"]")),Array.isArray(P)&&(w=P)}if((!j||!j.length)&&typeof x=="function"){var S=h&&h.length,C=x({xAxis:y?cn(cn({},y),{},{ticks:S?h:y.ticks}):void 0,width:t??c,height:n??d,offset:r},S?!0:f);mp(Array.isArray(C),"verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof C,"]")),Array.isArray(C)&&(j=C)}return v.createElement(oa,{zIndex:i.zIndex},v.createElement("g",{className:"recharts-cartesian-grid"},v.createElement(fne,{fill:i.fill,fillOpacity:i.fillOpacity,x:i.x,y:i.y,width:i.width,height:i.height,ry:i.ry}),v.createElement(mne,Co({},i,{horizontalPoints:w})),v.createElement(gne,Co({},i,{verticalPoints:j})),v.createElement(pne,Co({},i,{offset:r,horizontalPoints:w,xAxis:y,yAxis:g})),v.createElement(hne,Co({},i,{offset:r,verticalPoints:j,xAxis:y,yAxis:g}))))}YM.displayName="CartesianGrid";var bne={},GM=Wn({name:"errorBars",initialState:bne,reducers:{addErrorBar:(e,t)=>{var{itemId:n,errorBar:r}=t.payload;e[n]||(e[n]=[]),e[n].push(r)},replaceErrorBar:(e,t)=>{var{itemId:n,prev:r,next:i}=t.payload;e[n]&&(e[n]=e[n].map(a=>a.dataKey===r.dataKey&&a.direction===r.direction?i:a))},removeErrorBar:(e,t)=>{var{itemId:n,errorBar:r}=t.payload;e[n]&&(e[n]=e[n].filter(i=>i.dataKey!==r.dataKey||i.direction!==r.direction))}}}),{addErrorBar:Yoe,replaceErrorBar:Goe,removeErrorBar:Qoe}=GM.actions,wne=GM.reducer,jne=["children"];function Sne(e,t){if(e==null)return{};var n,r,i=kne(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function kne(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var Pne={data:[],xAxisId:"xAxis-0",yAxisId:"yAxis-0",dataPointFormatter:()=>({x:0,y:0,value:0}),errorBarOffset:0},Cne=v.createContext(Pne);function One(e){var{children:t}=e,n=Sne(e,jne);return v.createElement(Cne.Provider,{value:n},t)}function QM(e,t){var n,r,i=ve(c=>ra(c,e)),a=ve(c=>ia(c,t)),o=(n=i==null?void 0:i.allowDataOverflow)!==null&&n!==void 0?n:Dt.allowDataOverflow,s=(r=a==null?void 0:a.allowDataOverflow)!==null&&r!==void 0?r:zt.allowDataOverflow,l=o||s;return{needClip:l,needClipX:o,needClipY:s}}function Ene(e){var{xAxisId:t,yAxisId:n,clipPathId:r}=e,i=ew(),{needClipX:a,needClipY:o,needClip:s}=QM(t,n);if(!s||!i)return null;var{x:l,y:c,width:d,height:f}=i;return v.createElement("clipPath",{id:"clipPath-".concat(r)},v.createElement("rect",{x:a?l:l-d/2,y:o?c:c-f/2,width:a?d:d*2,height:o?f:f*2}))}var XM=(e,t,n,r)=>qR(e,"xAxis",t,r),JM=(e,t,n,r)=>ZR(e,"xAxis",t,r),eD=(e,t,n,r)=>qR(e,"yAxis",n,r),tD=(e,t,n,r)=>ZR(e,"yAxis",n,r),Nne=I([dt,XM,eD,JM,tD],(e,t,n,r,i)=>Ji(e,"xAxis")?hp(t,r,!1):hp(n,i,!1)),_ne=(e,t,n,r,i)=>i;function Ane(e){return e.type==="line"}var Tne=I([gR,_ne],(e,t)=>e.filter(Ane).find(n=>n.id===t)),Rne=I([dt,XM,eD,JM,tD,Tne,Nne,Sb],(e,t,n,r,i,a,o,s)=>{var{chartData:l,dataStartIndex:c,dataEndIndex:d}=s;if(!(a==null||t==null||n==null||r==null||i==null||r.length===0||i.length===0||o==null||e!=="horizontal"&&e!=="vertical")){var{dataKey:f,data:p}=a,h;if(p!=null&&p.length>0?h=p:h=l==null?void 0:l.slice(c,d+1),h!=null)return kre({layout:e,xAxis:t,yAxis:n,xAxisTicks:r,yAxisTicks:i,dataKey:f,bandSize:o,displayedData:h})}});function Mne(e){var t=Ph(e),n=3,r=2;if(t!=null){var{r:i,strokeWidth:a}=t,o=Number(i),s=Number(a);return(Number.isNaN(o)||o<0)&&(o=n),(Number.isNaN(s)||s<0)&&(s=r),{r:o,strokeWidth:s}}return{r:n,strokeWidth:r}}var Dne={};/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yu=v;function zne(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ine=typeof Object.is=="function"?Object.is:zne,$ne=Yu.useSyncExternalStore,Lne=Yu.useRef,Fne=Yu.useEffect,Une=Yu.useMemo,Bne=Yu.useDebugValue;Dne.useSyncExternalStoreWithSelector=function(e,t,n,r,i){var a=Lne(null);if(a.current===null){var o={hasValue:!1,value:null};a.current=o}else o=a.current;a=Une(function(){function l(h){if(!c){if(c=!0,d=h,h=r(h),i!==void 0&&o.hasValue){var m=o.value;if(i(m,h))return f=m}return f=h}if(m=f,Ine(d,h))return m;var y=r(h);return i!==void 0&&i(m,y)?(d=h,m):(d=h,f=y)}var c=!1,d,f,p=n===void 0?null:n;return[function(){return l(t())},p===null?void 0:function(){return l(p())}]},[t,n,r,i]);var s=$ne(e,a[0],a[1]);return Fne(function(){o.hasValue=!0,o.value=s},[s]),Bne(s),s};function Wne(e){e()}function Hne(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Wne(()=>{let n=e;for(;n;)n.callback(),n=n.next})},get(){const n=[];let r=e;for(;r;)n.push(r),r=r.next;return n},subscribe(n){let r=!0;const i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!r||e===null||(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var hC={notify(){},get:()=>[]};function Kne(e,t){let n,r=hC,i=0,a=!1;function o(y){d();const g=r.subscribe(y);let x=!1;return()=>{x||(x=!0,g(),f())}}function s(){r.notify()}function l(){m.onStateChange&&m.onStateChange()}function c(){return a}function d(){i++,n||(n=e.subscribe(l),r=Hne())}function f(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=hC)}function p(){a||(a=!0,d())}function h(){a&&(a=!1,f())}const m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:l,isSubscribed:c,trySubscribe:p,tryUnsubscribe:h,getListeners:()=>r};return m}var Vne=()=>typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",Zne=Vne(),qne=()=>typeof navigator<"u"&&navigator.product==="ReactNative",Yne=qne(),Gne=()=>Zne||Yne?v.useLayoutEffect:v.useEffect,Qne=Gne();function mC(e,t){return e===t?e!==0||t!==0||1/e===1/t:e!==e&&t!==t}function Xne(e,t){if(mC(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;const n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(!Object.prototype.hasOwnProperty.call(t,n[i])||!mC(e[n[i]],t[n[i]]))return!1;return!0}var Ng=Symbol.for("react-redux-context"),_g=typeof globalThis<"u"?globalThis:{};function Jne(){if(!v.createContext)return{};const e=_g[Ng]??(_g[Ng]=new Map);let t=e.get(v.createContext);return t||(t=v.createContext(null),e.set(v.createContext,t)),t}var ere=Jne();function tre(e){const{children:t,context:n,serverState:r,store:i}=e,a=v.useMemo(()=>{const l=Kne(i);return{store:i,subscription:l,getServerState:r?()=>r:void 0}},[i,r]),o=v.useMemo(()=>i.getState(),[i]);Qne(()=>{const{subscription:l}=a;return l.onStateChange=l.notifyNestedSubs,l.trySubscribe(),o!==i.getState()&&l.notifyNestedSubs(),()=>{l.tryUnsubscribe(),l.onStateChange=void 0}},[a,o]);const s=n||ere;return v.createElement(s.Provider,{value:a},t)}var nre=tre,rre=new Set(["axisLine","tickLine","activeBar","activeDot","activeLabel","activeShape","allowEscapeViewBox","background","cursor","dot","label","line","margin","padding","position","shape","style","tick","wrapperStyle","radius"]);function ire(e,t){return e==null&&t==null?!0:typeof e=="number"&&typeof t=="number"?e===t||e!==e&&t!==t:e===t}function rw(e,t){var n=new Set([...Object.keys(e),...Object.keys(t)]);for(var r of n)if(rre.has(r)){if(e[r]==null&&t[r]==null)continue;if(!Xne(e[r],t[r]))return!1}else if(!ire(e[r],t[r]))return!1;return!0}var are=["id"],ore=["type","layout","connectNulls","needClip","shape"],sre=["activeDot","animateNewValues","animationBegin","animationDuration","animationEasing","connectNulls","dot","hide","isAnimationActive","label","legendType","xAxisId","yAxisId","id"];function fu(){return fu=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},fu.apply(null,arguments)}function gC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function ti(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?gC(Object(n),!0).forEach(function(r){lre(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):gC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function lre(e,t,n){return(t=cre(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function cre(e){var t=ure(e,"string");return typeof t=="symbol"?t:t+""}function ure(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function iw(e,t){if(e==null)return{};var n,r,i=dre(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function dre(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var fre=e=>{var{dataKey:t,name:n,stroke:r,legendType:i,hide:a}=e;return[{inactive:a,dataKey:t,type:i,color:r,value:RA(n,t),payload:e}]},pre=v.memo(e=>{var{dataKey:t,data:n,stroke:r,strokeWidth:i,fill:a,name:o,hide:s,unit:l,tooltipType:c,id:d}=e,f={dataDefinedOnItem:n,getPosition:Pl,settings:{stroke:r,strokeWidth:i,fill:a,dataKey:t,nameKey:void 0,name:RA(o,t),hide:s,type:c,color:r,unit:l,graphicalItemId:d}};return v.createElement(Iee,{tooltipEntrySettings:f})}),nD=(e,t)=>"".concat(t,"px ").concat(e-t,"px");function hre(e,t){for(var n=e.length%2!==0?[...e,0]:e,r=[],i=0;i<t;++i)r=[...r,...n];return r}var mre=(e,t,n)=>{var r=n.reduce((h,m)=>h+m);if(!r)return nD(t,e);for(var i=Math.floor(e/r),a=e%r,o=t-e,s=[],l=0,c=0;l<n.length;c+=(d=n[l])!==null&&d!==void 0?d:0,++l){var d,f=n[l];if(f!=null&&c+f>a){s=[...n.slice(0,l),a-c];break}}var p=s.length%2===0?[0,o]:[o];return[...hre(n,i),...s,...p].map(h=>"".concat(h,"px")).join(", ")};function gre(e){var{clipPathId:t,points:n,props:r}=e,{dot:i,dataKey:a,needClip:o}=r,{id:s}=r,l=iw(r,are),c=ui(l);return v.createElement(ate,{points:n,dot:i,className:"recharts-line-dots",dotClassName:"recharts-line-dot",dataKey:a,baseProps:c,needClip:o,clipPathId:t})}function vre(e){var{showLabels:t,children:n,points:r}=e,i=v.useMemo(()=>r==null?void 0:r.map(a=>{var o,s,l={x:(o=a.x)!==null&&o!==void 0?o:0,y:(s=a.y)!==null&&s!==void 0?s:0,width:0,lowerWidth:0,upperWidth:0,height:0};return ti(ti({},l),{},{value:a.value,payload:a.payload,viewBox:l,parentViewBox:void 0,fill:void 0})}),[r]);return v.createElement(pee,{value:t?i:void 0},n)}function vC(e){var{clipPathId:t,pathRef:n,points:r,strokeDasharray:i,props:a}=e,{type:o,layout:s,connectNulls:l,needClip:c,shape:d}=a,f=iw(a,ore),p=ti(ti({},jn(f)),{},{fill:"none",className:"recharts-line-curve",clipPath:c?"url(#clipPath-".concat(t,")"):void 0,points:r,type:o,layout:s,connectNulls:l,strokeDasharray:i??a.strokeDasharray});return v.createElement(v.Fragment,null,(r==null?void 0:r.length)>1&&v.createElement(zee,fu({shapeType:"curve",option:d},p,{pathRef:n})),v.createElement(gre,{points:r,clipPathId:t,props:a}))}function yre(e){try{return e&&e.getTotalLength&&e.getTotalLength()||0}catch{return 0}}function xre(e){var{clipPathId:t,props:n,pathRef:r,previousPointsRef:i,longestAnimatedLengthRef:a}=e,{points:o,strokeDasharray:s,isAnimationActive:l,animationBegin:c,animationDuration:d,animationEasing:f,animateNewValues:p,width:h,height:m,onAnimationEnd:y,onAnimationStart:g}=n,x=i.current,b=J0(o,"recharts-line-"),w=v.useRef(b),[j,k]=v.useState(!1),P=!j,S=v.useCallback(()=>{typeof y=="function"&&y(),k(!1)},[y]),C=v.useCallback(()=>{typeof g=="function"&&g(),k(!0)},[g]),N=yre(r.current),_=v.useRef(0);w.current!==b&&(_.current=a.current,w.current=b);var M=_.current;return v.createElement(vre,{points:o,showLabels:P},n.children,v.createElement(X0,{animationId:b,begin:c,duration:d,isActive:l,easing:f,onAnimationEnd:S,onAnimationStart:C,key:b},R=>{var G=An(M,N+M,R),V=Math.min(G,N),ee;if(l)if(s){var Q="".concat(s).split(/[,\s]+/gim).map(B=>parseFloat(B));ee=mre(V,N,Q)}else ee=nD(N,V);else ee=s==null?void 0:String(s);if(R>0&&N>0&&(i.current=o,a.current=Math.max(a.current,V)),x){var te=x.length/o.length,$=R===1?o:o.map((B,L)=>{var Y=Math.floor(L*te);if(x[Y]){var re=x[Y];return ti(ti({},B),{},{x:An(re.x,B.x,R),y:An(re.y,B.y,R)})}return p?ti(ti({},B),{},{x:An(h*2,B.x,R),y:An(m/2,B.y,R)}):ti(ti({},B),{},{x:B.x,y:B.y})});return i.current=$,v.createElement(vC,{props:n,points:$,clipPathId:t,pathRef:r,strokeDasharray:ee})}return v.createElement(vC,{props:n,points:o,clipPathId:t,pathRef:r,strokeDasharray:ee})}),v.createElement(gee,{label:n.label}))}function bre(e){var{clipPathId:t,props:n}=e,r=v.useRef(null),i=v.useRef(0),a=v.useRef(null);return v.createElement(xre,{props:n,clipPathId:t,previousPointsRef:r,longestAnimatedLengthRef:i,pathRef:a})}var wre=(e,t)=>{var n,r;return{x:(n=e.x)!==null&&n!==void 0?n:void 0,y:(r=e.y)!==null&&r!==void 0?r:void 0,value:e.value,errorVal:Qt(e.payload,t)}};class jre extends v.Component{render(){var{hide:t,dot:n,points:r,className:i,xAxisId:a,yAxisId:o,top:s,left:l,width:c,height:d,id:f,needClip:p,zIndex:h}=this.props;if(t)return null;var m=Ke("recharts-line",i),y=f,{r:g,strokeWidth:x}=Mne(n),b=UM(n),w=g*2+x,j=p?"url(#clipPath-".concat(b?"":"dots-").concat(y,")"):void 0;return v.createElement(oa,{zIndex:h},v.createElement(Za,{className:m},p&&v.createElement("defs",null,v.createElement(Ene,{clipPathId:y,xAxisId:a,yAxisId:o}),!b&&v.createElement("clipPath",{id:"clipPath-dots-".concat(y)},v.createElement("rect",{x:l-w/2,y:s-w/2,width:c+w,height:d+w}))),v.createElement(One,{xAxisId:a,yAxisId:o,data:r,dataPointFormatter:wre,errorBarOffset:0},v.createElement(bre,{props:this.props,clipPathId:y}))),v.createElement(Pte,{activeDot:this.props.activeDot,points:r,mainColor:this.props.stroke,itemDataKey:this.props.dataKey,clipPath:j}))}}var rD={activeDot:!0,animateNewValues:!0,animationBegin:0,animationDuration:1500,animationEasing:"ease",connectNulls:!1,dot:!0,fill:"#fff",hide:!1,isAnimationActive:"auto",label:!1,legendType:"line",stroke:"#3182bd",strokeWidth:1,xAxisId:0,yAxisId:0,zIndex:bn.line,type:"linear"};function Sre(e){var t=fn(e,rD),{activeDot:n,animateNewValues:r,animationBegin:i,animationDuration:a,animationEasing:o,connectNulls:s,dot:l,hide:c,isAnimationActive:d,label:f,legendType:p,xAxisId:h,yAxisId:m,id:y}=t,g=iw(t,sre),{needClip:x}=QM(h,m),b=ew(),w=Cl(),j=Hn(),k=ve(_=>Rne(_,h,m,j,y));if(w!=="horizontal"&&w!=="vertical"||k==null||b==null)return null;var{height:P,width:S,x:C,y:N}=b;return v.createElement(jre,fu({},g,{id:y,connectNulls:s,dot:l,activeDot:n,animateNewValues:r,animationBegin:i,animationDuration:a,animationEasing:o,isAnimationActive:d,hide:c,label:f,legendType:p,xAxisId:h,yAxisId:m,points:k,layout:w,height:P,width:S,left:C,top:N,needClip:x}))}function kre(e){var{layout:t,xAxis:n,yAxis:r,xAxisTicks:i,yAxisTicks:a,dataKey:o,bandSize:s,displayedData:l}=e;return l.map((c,d)=>{var f=Qt(c,o);if(t==="horizontal"){var p=OS({axis:n,ticks:i,bandSize:s,entry:c,index:d}),h=Jt(f)?null:r.scale.map(f);return{x:p,y:h??null,value:f,payload:c}}var m=Jt(f)?null:n.scale.map(f),y=OS({axis:r,ticks:a,bandSize:s,entry:c,index:d});return m==null||y==null?null:{x:m,y,value:f,payload:c}}).filter(Boolean)}function Pre(e){var t=fn(e,rD),n=Hn();return v.createElement(Wee,{id:t.id,type:"line"},r=>v.createElement(v.Fragment,null,v.createElement($ee,{legendPayload:fre(t)}),v.createElement(pre,{dataKey:t.dataKey,data:t.data,stroke:t.stroke,strokeWidth:t.strokeWidth,fill:t.fill,name:t.name,hide:t.hide,unit:t.unit,tooltipType:t.tooltipType,id:r}),v.createElement(Gee,{type:"line",id:r,data:t.data,xAxisId:t.xAxisId,yAxisId:t.yAxisId,zAxisId:0,dataKey:t.dataKey,hide:t.hide,isPanorama:n}),v.createElement(Sre,fu({},t,{id:r}))))}var yf=v.memo(Pre,rw);yf.displayName="Line";var Cre=["domain","range"],Ore=["domain","range"];function yC(e,t){if(e==null)return{};var n,r,i=Ere(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Ere(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function xC(e,t){return e===t?!0:Array.isArray(e)&&e.length===2&&Array.isArray(t)&&t.length===2?e[0]===t[0]&&e[1]===t[1]:!1}function iD(e,t){if(e===t)return!0;var{domain:n,range:r}=e,i=yC(e,Cre),{domain:a,range:o}=t,s=yC(t,Ore);return!xC(n,a)||!xC(r,o)?!1:rw(i,s)}var Nre=["type"],_re=["dangerouslySetInnerHTML","ticks","scale"],Are=["id","scale"];function Ky(){return Ky=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ky.apply(null,arguments)}function bC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function wC(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?bC(Object(n),!0).forEach(function(r){Tre(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):bC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Tre(e,t,n){return(t=Rre(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Rre(e){var t=Mre(e,"string");return typeof t=="symbol"?t:t+""}function Mre(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Vy(e,t){if(e==null)return{};var n,r,i=Dre(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Dre(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function zre(e){var t=Ot(),n=v.useRef(null),r=WA(),{type:i}=e,a=Vy(e,Nre),o=cm(r,"xAxis",i),s=v.useMemo(()=>{if(o!=null)return wC(wC({},a),{},{type:o})},[a,o]);return v.useLayoutEffect(()=>{s!=null&&(n.current===null?t(ute(s)):n.current!==s&&t(dte({prev:n.current,next:s})),n.current=s)},[s,t]),v.useLayoutEffect(()=>()=>{n.current&&(t(fte(n.current)),n.current=null)},[t]),null}var Ire=e=>{var{xAxisId:t,className:n}=e,r=ve(DA),i=Hn(),a="xAxis",o=ve(x=>VR(x,a,t,i)),s=ve(x=>IG(x,t)),l=ve(x=>WG(x,t)),c=ve(x=>fR(x,t));if(s==null||l==null||c==null)return null;var{dangerouslySetInnerHTML:d,ticks:f,scale:p}=e,h=Vy(e,_re),{id:m,scale:y}=c,g=Vy(c,Are);return v.createElement(nw,Ky({},h,g,{x:l.x,y:l.y,width:s.width,height:s.height,className:Ke("recharts-".concat(a," ").concat(a),n),viewBox:r,ticks:o,axisType:a}))},$re={allowDataOverflow:Dt.allowDataOverflow,allowDecimals:Dt.allowDecimals,allowDuplicatedCategory:Dt.allowDuplicatedCategory,angle:Dt.angle,axisLine:$i.axisLine,height:Dt.height,hide:!1,includeHidden:Dt.includeHidden,interval:Dt.interval,label:!1,minTickGap:Dt.minTickGap,mirror:Dt.mirror,orientation:Dt.orientation,padding:Dt.padding,reversed:Dt.reversed,scale:Dt.scale,tick:Dt.tick,tickCount:Dt.tickCount,tickLine:$i.tickLine,tickSize:$i.tickSize,type:Dt.type,xAxisId:0},Lre=e=>{var t=fn(e,$re);return v.createElement(v.Fragment,null,v.createElement(zre,{allowDataOverflow:t.allowDataOverflow,allowDecimals:t.allowDecimals,allowDuplicatedCategory:t.allowDuplicatedCategory,angle:t.angle,dataKey:t.dataKey,domain:t.domain,height:t.height,hide:t.hide,id:t.xAxisId,includeHidden:t.includeHidden,interval:t.interval,minTickGap:t.minTickGap,mirror:t.mirror,name:t.name,orientation:t.orientation,padding:t.padding,reversed:t.reversed,scale:t.scale,tick:t.tick,tickCount:t.tickCount,tickFormatter:t.tickFormatter,ticks:t.ticks,type:t.type,unit:t.unit}),v.createElement(Ire,t))},aD=v.memo(Lre,iD);aD.displayName="XAxis";var Fre=["type"],Ure=["dangerouslySetInnerHTML","ticks","scale"],Bre=["id","scale"];function Zy(){return Zy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Zy.apply(null,arguments)}function jC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function SC(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?jC(Object(n),!0).forEach(function(r){Wre(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):jC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Wre(e,t,n){return(t=Hre(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Hre(e){var t=Kre(e,"string");return typeof t=="symbol"?t:t+""}function Kre(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function qy(e,t){if(e==null)return{};var n,r,i=Vre(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Vre(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function Zre(e){var t=Ot(),n=v.useRef(null),r=WA(),{type:i}=e,a=qy(e,Fre),o=cm(r,"yAxis",i),s=v.useMemo(()=>{if(o!=null)return SC(SC({},a),{},{type:o})},[o,a]);return v.useLayoutEffect(()=>{s!=null&&(n.current===null?t(pte(s)):n.current!==s&&t(hte({prev:n.current,next:s})),n.current=s)},[s,t]),v.useLayoutEffect(()=>()=>{n.current&&(t(mte(n.current)),n.current=null)},[t]),null}function qre(e){var{yAxisId:t,className:n,width:r,label:i}=e,a=v.useRef(null),o=v.useRef(null),s=ve(DA),l=Hn(),c=Ot(),d="yAxis",f=ve(P=>VG(P,t)),p=ve(P=>KG(P,t)),h=ve(P=>VR(P,d,t,l)),m=ve(P=>pR(P,t));if(v.useLayoutEffect(()=>{if(!(r!=="auto"||!f||Jb(i)||v.isValidElement(i)||m==null)){var P=a.current;if(P){var S=P.getCalculatedWidth();Math.round(f.width)!==Math.round(S)&&c(gte({id:t,width:S}))}}},[h,f,c,i,t,r,m]),f==null||p==null||m==null)return null;var{dangerouslySetInnerHTML:y,ticks:g,scale:x}=e,b=qy(e,Ure),{id:w,scale:j}=m,k=qy(m,Bre);return v.createElement(nw,Zy({},b,k,{ref:a,labelRef:o,x:p.x,y:p.y,tickTextProps:r==="auto"?{width:void 0}:{width:r},width:f.width,height:f.height,className:Ke("recharts-".concat(d," ").concat(d),n),viewBox:s,ticks:h,axisType:d}))}var Yre={allowDataOverflow:zt.allowDataOverflow,allowDecimals:zt.allowDecimals,allowDuplicatedCategory:zt.allowDuplicatedCategory,angle:zt.angle,axisLine:$i.axisLine,hide:!1,includeHidden:zt.includeHidden,interval:zt.interval,label:!1,minTickGap:zt.minTickGap,mirror:zt.mirror,orientation:zt.orientation,padding:zt.padding,reversed:zt.reversed,scale:zt.scale,tick:zt.tick,tickCount:zt.tickCount,tickLine:$i.tickLine,tickSize:$i.tickSize,type:zt.type,width:zt.width,yAxisId:0},Gre=e=>{var t=fn(e,Yre);return v.createElement(v.Fragment,null,v.createElement(Zre,{interval:t.interval,id:t.yAxisId,scale:t.scale,type:t.type,domain:t.domain,allowDataOverflow:t.allowDataOverflow,dataKey:t.dataKey,allowDuplicatedCategory:t.allowDuplicatedCategory,allowDecimals:t.allowDecimals,tickCount:t.tickCount,padding:t.padding,includeHidden:t.includeHidden,reversed:t.reversed,ticks:t.ticks,width:t.width,orientation:t.orientation,mirror:t.mirror,hide:t.hide,unit:t.unit,name:t.name,angle:t.angle,minTickGap:t.minTickGap,tick:t.tick,tickFormatter:t.tickFormatter}),v.createElement(qre,t))},oD=v.memo(Gre,iD);oD.displayName="YAxis";var Qre=(e,t)=>t,aw=I([Qre,dt,cR,Wt,uM,aa,sX,en],hX),ow=e=>{var t=e.currentTarget.getBoundingClientRect(),n=t.width/e.currentTarget.offsetWidth,r=t.height/e.currentTarget.offsetHeight;return{chartX:Math.round((e.clientX-t.left)/n),chartY:Math.round((e.clientY-t.top)/r)}},sD=jr("mouseClick"),lD=Du();lD.startListening({actionCreator:sD,effect:(e,t)=>{var n=e.payload,r=aw(t.getState(),ow(n));(r==null?void 0:r.activeIndex)!=null&&t.dispatch(aQ({activeIndex:r.activeIndex,activeDataKey:void 0,activeCoordinate:r.activeCoordinate}))}});var Yy=jr("mouseMove"),cD=Du(),Kd=null;cD.startListening({actionCreator:Yy,effect:(e,t)=>{var n=e.payload;Kd!==null&&cancelAnimationFrame(Kd);var r=ow(n);Kd=requestAnimationFrame(()=>{var i=t.getState(),a=Bb(i,i.tooltip.settings.shared);if(a==="axis"){var o=aw(i,r);(o==null?void 0:o.activeIndex)!=null?t.dispatch(tM({activeIndex:o.activeIndex,activeDataKey:void 0,activeCoordinate:o.activeCoordinate})):t.dispatch(eM())}Kd=null})}});function Xre(e,t){return t instanceof HTMLElement?"HTMLElement <".concat(t.tagName,' class="').concat(t.className,'">'):t===window?"global.window":e==="children"&&typeof t=="object"&&t!==null?"<<CHILDREN>>":t}var kC={accessibilityLayer:!0,barCategoryGap:"10%",barGap:4,barSize:void 0,className:void 0,maxBarSize:void 0,stackOffset:"none",syncId:void 0,syncMethod:"index",baseValue:void 0,reverseStackOrder:!1},uD=Wn({name:"rootProps",initialState:kC,reducers:{updateOptions:(e,t)=>{var n;e.accessibilityLayer=t.payload.accessibilityLayer,e.barCategoryGap=t.payload.barCategoryGap,e.barGap=(n=t.payload.barGap)!==null&&n!==void 0?n:kC.barGap,e.barSize=t.payload.barSize,e.maxBarSize=t.payload.maxBarSize,e.stackOffset=t.payload.stackOffset,e.syncId=t.payload.syncId,e.syncMethod=t.payload.syncMethod,e.className=t.payload.className,e.baseValue=t.payload.baseValue,e.reverseStackOrder=t.payload.reverseStackOrder}}}),Jre=uD.reducer,{updateOptions:eie}=uD.actions,tie=null,nie={updatePolarOptions:(e,t)=>t.payload},dD=Wn({name:"polarOptions",initialState:tie,reducers:nie}),{updatePolarOptions:Xoe}=dD.actions,rie=dD.reducer,fD=jr("keyDown"),pD=jr("focus"),sw=Du();sw.startListening({actionCreator:fD,effect:(e,t)=>{var n=t.getState(),r=n.rootProps.accessibilityLayer!==!1;if(r){var{keyboardInteraction:i}=n.tooltip,a=e.payload;if(!(a!=="ArrowRight"&&a!=="ArrowLeft"&&a!=="Enter")){var o=Wb(i,Dl(n),Ku(n),Zu(n)),s=o==null?-1:Number(o);if(!(!Number.isFinite(s)||s<0)){var l=aa(n);if(a==="Enter"){var c=$p(n,"axis","hover",String(i.index));t.dispatch(Fy({active:!i.active,activeIndex:i.index,activeCoordinate:c}));return}var d=GG(n),f=d==="left-to-right"?1:-1,p=a==="ArrowRight"?1:-1,h=s+p*f;if(!(l==null||h>=l.length||h<0)){var m=$p(n,"axis","hover",String(h));t.dispatch(Fy({active:!0,activeIndex:h.toString(),activeCoordinate:m}))}}}}}});sw.startListening({actionCreator:pD,effect:(e,t)=>{var n=t.getState(),r=n.rootProps.accessibilityLayer!==!1;if(r){var{keyboardInteraction:i}=n.tooltip;if(!i.active&&i.index==null){var a="0",o=$p(n,"axis","hover",String(a));t.dispatch(Fy({active:!0,activeIndex:a,activeCoordinate:o}))}}}});var or=jr("externalEvent"),hD=Du(),Ag=new Map;hD.startListening({actionCreator:or,effect:(e,t)=>{var{handler:n,reactEvent:r}=e.payload;if(n!=null){r.persist();var i=r.type,a=Ag.get(i);a!==void 0&&cancelAnimationFrame(a);var o=requestAnimationFrame(()=>{try{var s=t.getState(),l={activeCoordinate:KQ(s),activeDataKey:WQ(s),activeIndex:cu(s),activeLabel:pM(s),activeTooltipIndex:cu(s),isTooltipActive:VQ(s)};n(l,r)}finally{Ag.delete(i)}});Ag.set(i,o)}}});var iie=I([Rl],e=>e.tooltipItemPayloads),aie=I([iie,(e,t)=>t,(e,t,n)=>n],(e,t,n)=>{if(t!=null){var r=e.find(a=>a.settings.graphicalItemId===n);if(r!=null){var{getPosition:i}=r;if(i!=null)return i(t)}}}),mD=jr("touchMove"),gD=Du();gD.startListening({actionCreator:mD,effect:(e,t)=>{var n=e.payload;if(!(n.touches==null||n.touches.length===0)){var r=t.getState(),i=Bb(r,r.tooltip.settings.shared);if(i==="axis"){var a=n.touches[0];if(a==null)return;var o=aw(r,ow({clientX:a.clientX,clientY:a.clientY,currentTarget:n.currentTarget}));(o==null?void 0:o.activeIndex)!=null&&t.dispatch(tM({activeIndex:o.activeIndex,activeDataKey:void 0,activeCoordinate:o.activeCoordinate}))}else if(i==="item"){var s,l=n.touches[0];if(document.elementFromPoint==null||l==null)return;var c=document.elementFromPoint(l.clientX,l.clientY);if(!c||!c.getAttribute)return;var d=c.getAttribute(DH),f=(s=c.getAttribute(zH))!==null&&s!==void 0?s:void 0,p=Ml(r).find(y=>y.id===f);if(d==null||p==null||f==null)return;var{dataKey:h}=p,m=aie(r,d,f);t.dispatch(iQ({activeDataKey:h,activeIndex:d,activeCoordinate:m,activeGraphicalItemId:f}))}}}});var oie=nA({brush:Ote,cartesianAxis:vte,chartData:KX,errorBars:wne,graphicalItems:qee,layout:bH,legend:CK,options:FX,polarAxis:yee,polarOptions:rie,referenceElements:Ate,rootProps:Jre,tooltip:oQ,zIndex:EX}),sie=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"Chart";return K9({reducer:oie,preloadedState:t,middleware:r=>{var i;return r({serializableCheck:!1,immutableCheck:!["commonjs","es6","production"].includes((i="es6")!==null&&i!==void 0?i:"")}).concat([lD.middleware,cD.middleware,sw.middleware,hD.middleware,gD.middleware])},enhancers:r=>{var i=r;return typeof r=="function"&&(i=r()),i.concat(vA({type:"raf"}))},devTools:{serialize:{replacer:Xre},name:"recharts-".concat(n)}})};function lie(e){var{preloadedState:t,children:n,reduxStoreName:r}=e,i=Hn(),a=v.useRef(null);if(i)return n;a.current==null&&(a.current=sie(t,r));var o=I0;return v.createElement(nre,{context:o,store:a.current},n)}function cie(e){var{layout:t,margin:n}=e,r=Ot(),i=Hn();return v.useEffect(()=>{i||(r(vH(t)),r(gH(n)))},[r,i,t,n]),null}var uie=v.memo(cie,rw);function die(e){var t=Ot();return v.useEffect(()=>{t(eie(e))},[t,e]),null}function PC(e){var{zIndex:t,isPanorama:n}=e,r=v.useRef(null),i=Ot();return v.useLayoutEffect(()=>(r.current&&i(CX({zIndex:t,element:r.current,isPanorama:n})),()=>{i(OX({zIndex:t,isPanorama:n}))}),[i,t,n]),v.createElement("g",{tabIndex:-1,ref:r})}function CC(e){var{children:t,isPanorama:n}=e,r=ve(gX);if(!r||r.length===0)return t;var i=r.filter(o=>o<0),a=r.filter(o=>o>0);return v.createElement(v.Fragment,null,i.map(o=>v.createElement(PC,{key:o,zIndex:o,isPanorama:n})),t,a.map(o=>v.createElement(PC,{key:o,zIndex:o,isPanorama:n})))}var fie=["children"];function pie(e,t){if(e==null)return{};var n,r,i=hie(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function hie(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function Hp(){return Hp=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Hp.apply(null,arguments)}var mie={width:"100%",height:"100%",display:"block"},gie=v.forwardRef((e,t)=>{var n=q0(),r=Y0(),i=JA();if(!fi(n)||!fi(r))return null;var{children:a,otherAttributes:o,title:s,desc:l}=e,c,d;return o!=null&&(typeof o.tabIndex=="number"?c=o.tabIndex:c=i?0:void 0,typeof o.role=="string"?d=o.role:d=i?"application":void 0),v.createElement(j0,Hp({},o,{title:s,desc:l,role:d,tabIndex:c,width:n,height:r,style:mie,ref:t}),a)}),vie=e=>{var{children:t}=e,n=ve(Yh);if(!n)return null;var{width:r,height:i,y:a,x:o}=n;return v.createElement(j0,{width:r,height:i,x:o,y:a},t)},OC=v.forwardRef((e,t)=>{var{children:n}=e,r=pie(e,fie),i=Hn();return i?v.createElement(vie,null,v.createElement(CC,{isPanorama:!0},n)):v.createElement(gie,Hp({ref:t},r),v.createElement(CC,{isPanorama:!1},n))});function yie(){var e=Ot(),[t,n]=v.useState(null),r=ve(MH);return v.useEffect(()=>{if(t!=null){var i=t.getBoundingClientRect(),a=i.width/t.offsetWidth;ze(a)&&a!==r&&e(xH(a))}},[t,e,r]),n}function EC(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),n.push.apply(n,r)}return n}function xie(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?EC(Object(n),!0).forEach(function(r){bie(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):EC(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function bie(e,t,n){return(t=wie(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function wie(e){var t=jie(e,"string");return typeof t=="symbol"?t:t+""}function jie(e,t){if(typeof e!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function Ba(){return Ba=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ba.apply(null,arguments)}var Sie=()=>(eJ(),null);function Kp(e){if(typeof e=="number")return e;if(typeof e=="string"){var t=parseFloat(e);if(!Number.isNaN(t))return t}return 0}var kie=v.forwardRef((e,t)=>{var n,r,i=v.useRef(null),[a,o]=v.useState({containerWidth:Kp((n=e.style)===null||n===void 0?void 0:n.width),containerHeight:Kp((r=e.style)===null||r===void 0?void 0:r.height)}),s=v.useCallback((c,d)=>{o(f=>{var p=Math.round(c),h=Math.round(d);return f.containerWidth===p&&f.containerHeight===h?f:{containerWidth:p,containerHeight:h}})},[]),l=v.useCallback(c=>{if(typeof t=="function"&&t(c),c!=null&&typeof ResizeObserver<"u"){var{width:d,height:f}=c.getBoundingClientRect();s(d,f);var p=m=>{var y=m[0];if(y!=null){var{width:g,height:x}=y.contentRect;s(g,x)}},h=new ResizeObserver(p);h.observe(c),i.current=h}},[t,s]);return v.useEffect(()=>()=>{var c=i.current;c!=null&&c.disconnect()},[s]),v.createElement(v.Fragment,null,v.createElement(Iu,{width:a.containerWidth,height:a.containerHeight}),v.createElement("div",Ba({ref:l},e)))}),Pie=v.forwardRef((e,t)=>{var{width:n,height:r}=e,[i,a]=v.useState({containerWidth:Kp(n),containerHeight:Kp(r)}),o=v.useCallback((l,c)=>{a(d=>{var f=Math.round(l),p=Math.round(c);return d.containerWidth===f&&d.containerHeight===p?d:{containerWidth:f,containerHeight:p}})},[]),s=v.useCallback(l=>{if(typeof t=="function"&&t(l),l!=null){var{width:c,height:d}=l.getBoundingClientRect();o(c,d)}},[t,o]);return v.createElement(v.Fragment,null,v.createElement(Iu,{width:i.containerWidth,height:i.containerHeight}),v.createElement("div",Ba({ref:s},e)))}),Cie=v.forwardRef((e,t)=>{var{width:n,height:r}=e;return v.createElement(v.Fragment,null,v.createElement(Iu,{width:n,height:r}),v.createElement("div",Ba({ref:t},e)))}),Oie=v.forwardRef((e,t)=>{var{width:n,height:r}=e;return typeof n=="string"||typeof r=="string"?v.createElement(Pie,Ba({},e,{ref:t})):typeof n=="number"&&typeof r=="number"?v.createElement(Cie,Ba({},e,{width:n,height:r,ref:t})):v.createElement(v.Fragment,null,v.createElement(Iu,{width:n,height:r}),v.createElement("div",Ba({ref:t},e)))});function Eie(e){return e?kie:Oie}var Nie=v.forwardRef((e,t)=>{var{children:n,className:r,height:i,onClick:a,onContextMenu:o,onDoubleClick:s,onMouseDown:l,onMouseEnter:c,onMouseLeave:d,onMouseMove:f,onMouseUp:p,onTouchEnd:h,onTouchMove:m,onTouchStart:y,style:g,width:x,responsive:b,dispatchTouchEvents:w=!0}=e,j=v.useRef(null),k=Ot(),[P,S]=v.useState(null),[C,N]=v.useState(null),_=yie(),M=V0(),R=(M==null?void 0:M.width)>0?M.width:x,G=(M==null?void 0:M.height)>0?M.height:i,V=v.useCallback(H=>{_(H),typeof t=="function"&&t(H),S(H),N(H),H!=null&&(j.current=H)},[_,t,S,N]),ee=v.useCallback(H=>{k(sD(H)),k(or({handler:a,reactEvent:H}))},[k,a]),Q=v.useCallback(H=>{k(Yy(H)),k(or({handler:c,reactEvent:H}))},[k,c]),te=v.useCallback(H=>{k(eM()),k(or({handler:d,reactEvent:H}))},[k,d]),$=v.useCallback(H=>{k(Yy(H)),k(or({handler:f,reactEvent:H}))},[k,f]),B=v.useCallback(()=>{k(pD())},[k]),L=v.useCallback(H=>{k(fD(H.key))},[k]),Y=v.useCallback(H=>{k(or({handler:o,reactEvent:H}))},[k,o]),re=v.useCallback(H=>{k(or({handler:s,reactEvent:H}))},[k,s]),Oe=v.useCallback(H=>{k(or({handler:l,reactEvent:H}))},[k,l]),we=v.useCallback(H=>{k(or({handler:p,reactEvent:H}))},[k,p]),ie=v.useCallback(H=>{k(or({handler:y,reactEvent:H}))},[k,y]),We=v.useCallback(H=>{w&&k(mD(H)),k(or({handler:m,reactEvent:H}))},[k,w,m]),Xe=v.useCallback(H=>{k(or({handler:h,reactEvent:H}))},[k,h]),Or=Eie(b);return v.createElement(bM.Provider,{value:P},v.createElement(e2.Provider,{value:C},v.createElement(Or,{width:R??(g==null?void 0:g.width),height:G??(g==null?void 0:g.height),className:Ke("recharts-wrapper",r),style:xie({position:"relative",cursor:"default",width:R,height:G},g),onClick:ee,onContextMenu:Y,onDoubleClick:re,onFocus:B,onKeyDown:L,onMouseDown:Oe,onMouseEnter:Q,onMouseLeave:te,onMouseMove:$,onMouseUp:we,onTouchEnd:Xe,onTouchMove:We,onTouchStart:ie,ref:V},v.createElement(Sie,null),n)))}),_ie=["width","height","responsive","children","className","style","compact","title","desc"];function Aie(e,t){if(e==null)return{};var n,r,i=Tie(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)===-1&&{}.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function Tie(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}var Rie=v.forwardRef((e,t)=>{var{width:n,height:r,responsive:i,children:a,className:o,style:s,compact:l,title:c,desc:d}=e,f=Aie(e,_ie),p=ui(f);return l?v.createElement(v.Fragment,null,v.createElement(Iu,{width:n,height:r}),v.createElement(OC,{otherAttributes:p,title:c,desc:d},a)):v.createElement(Nie,{className:o,style:s,width:n,height:r,responsive:i??!1,onClick:e.onClick,onMouseLeave:e.onMouseLeave,onMouseEnter:e.onMouseEnter,onMouseMove:e.onMouseMove,onMouseDown:e.onMouseDown,onMouseUp:e.onMouseUp,onContextMenu:e.onContextMenu,onDoubleClick:e.onDoubleClick,onTouchStart:e.onTouchStart,onTouchMove:e.onTouchMove,onTouchEnd:e.onTouchEnd},v.createElement(OC,{otherAttributes:p,title:c,desc:d,ref:t},v.createElement(Rte,null,a)))});function Gy(){return Gy=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Gy.apply(null,arguments)}var Mie={top:5,right:5,bottom:5,left:5},Die={accessibilityLayer:!0,barCategoryGap:"10%",barGap:4,layout:"horizontal",margin:Mie,responsive:!1,reverseStackOrder:!1,stackOffset:"none",syncMethod:"index"},zie=v.forwardRef(function(t,n){var r,i=fn(t.categoricalChartProps,Die),{chartName:a,defaultTooltipEventType:o,validateTooltipEventTypes:s,tooltipPayloadSearcher:l,categoricalChartProps:c}=t,d={chartName:a,defaultTooltipEventType:o,validateTooltipEventTypes:s,tooltipPayloadSearcher:l,eventEmitter:void 0};return v.createElement(lie,{preloadedState:{options:d},reduxStoreName:(r=c.id)!==null&&r!==void 0?r:a},v.createElement(Cte,{chartData:c.data}),v.createElement(uie,{layout:i.layout,margin:i.margin}),v.createElement(die,{baseValue:i.baseValue,accessibilityLayer:i.accessibilityLayer,barCategoryGap:i.barCategoryGap,maxBarSize:i.maxBarSize,stackOffset:i.stackOffset,barGap:i.barGap,barSize:i.barSize,syncId:i.syncId,syncMethod:i.syncMethod,className:i.className,reverseStackOrder:i.reverseStackOrder}),v.createElement(Rie,Gy({},i,{ref:n})))}),Iie=["axis"],$ie=v.forwardRef((e,t)=>v.createElement(zie,{chartName:"LineChart",defaultTooltipEventType:"axis",validateTooltipEventTypes:Iie,tooltipPayloadSearcher:$X,categoricalChartProps:e,ref:t}));function Lie(){const[e,t]=v.useState("24h"),[n,r]=v.useState("cpu"),{data:i,isLoading:a}=Ae(["cluster","metrics"],x0),o=v.useMemo(()=>{const d=Fie(e),f=Uie(e);return Array.from({length:d},(p,h)=>{const m=Date.now()-(d-h)*f,y=n==="cpu"?50:n==="memory"?60:n==="network"?100:200,g=n==="cpu"?20:n==="memory"?15:n==="network"?30:50;return{timestamp:m,value:Math.round((y+(Math.random()-.5)*g)*100)/100,networkIn:n==="network"?Math.max(0,y+(Math.random()-.5)*g):void 0,networkOut:n==="network"?Math.max(0,y+(Math.random()+.5)*g*.8):void 0}})},[e,n]),s=o.map(d=>({time:new Date(d.timestamp).toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),value:d.value}));if(a)return u.jsx(qt,{size:"lg"});const l=()=>n==="cpu"||n==="memory"?"%":n==="network"?"MB/s":"count",c=()=>n==="cpu"?"#3b82f6":n==="memory"?"#10b981":"#f59e0b";return u.jsxs("div",{className:"cluster-metrics-history",children:[u.jsxs("div",{className:"metrics-header",children:[u.jsx("h1",{children:"Cluster Metrics History"}),u.jsxs("div",{className:"metrics-controls",children:[u.jsx(Jv,{label:"Time Range",value:e,onChange:d=>t(d),options:[{value:"1h",label:"Last 1 hour"},{value:"6h",label:"Last 6 hours"},{value:"24h",label:"Last 24 hours"},{value:"7d",label:"Last 7 days"},{value:"30d",label:"Last 30 days"}]}),u.jsx(Jv,{label:"Metric",value:n,onChange:d=>r(d),options:[{value:"cpu",label:"CPU Usage"},{value:"memory",label:"Memory Usage"},{value:"network",label:"Network I/O"},{value:"pods",label:"Pod Count"}]})]})]}),u.jsxs("div",{className:"metrics-summary",children:[u.jsx(Tg,{label:"Current",value:n==="cpu"?(i==null?void 0:i.cpuUsage)||0:n==="memory"?(i==null?void 0:i.memoryUsage)||0:n==="network"?0:(i==null?void 0:i.podsCount)||0,unit:n==="cpu"||n==="memory"?"%":n==="network"?"MB/s":"count"}),u.jsx(Tg,{label:"Average",value:o.reduce((d,f)=>d+f.value,0)/o.length,unit:l()}),u.jsx(Tg,{label:"Peak",value:Math.max(...o.map(d=>d.value)),unit:l()})]}),u.jsx("div",{className:"chart-container",children:u.jsx(oK,{width:"100%",height:400,children:u.jsxs($ie,{data:s,children:[u.jsx(YM,{strokeDasharray:"3 3",stroke:"#e5e7eb"}),u.jsx(aD,{dataKey:"time",stroke:"#6b7280",fontSize:12}),u.jsx(oD,{stroke:"#6b7280",fontSize:12,unit:l()}),u.jsx(lJ,{contentStyle:{backgroundColor:"#1f2937",borderRadius:"8px",border:"none",color:"#f3f4f6"},labelStyle:{color:"#f3f4f6"},formatter:d=>d!==void 0?`${d.toFixed(2)}${l()}`:""}),u.jsx(XA,{}),n==="network"?u.jsxs(u.Fragment,{children:[u.jsx(yf,{type:"monotone",dataKey:"networkIn",name:"Network In",stroke:"#9333ea",strokeWidth:2,dot:!1,activeDot:{r:4,fill:"#9333ea",stroke:"#9333ea"}}),u.jsx(yf,{type:"monotone",dataKey:"networkOut",name:"Network Out",stroke:"#ef4444",strokeWidth:2,dot:!1,activeDot:{r:4,fill:"#ef4444",stroke:"#ef4444"}})]}):u.jsx(yf,{type:"monotone",dataKey:"value",stroke:c(),strokeWidth:2,dot:!1,activeDot:{r:4,fill:c(),stroke:c()}})]})})}),u.jsxs("div",{className:"metrics-note",children:[u.jsx("strong",{children:"Note:"})," Historical metrics data is currently simulated. Real-time metrics history will be available once backend task 11.7 is complete."]}),u.jsx("style",{children:`
        .cluster-metrics-history {
          padding: 32px;
        }

        .metrics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .metrics-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }

        .metrics-controls {
          display: flex;
          gap: 16px;
        }

        .metrics-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .chart-container {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .metrics-note {
          margin-top: 16px;
          padding: 12px;
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          border-radius: 4px;
          color: #92400e;
          font-size: 14px;
        }
      `})]})}function Tg({label:e,value:t,unit:n}){return u.jsxs("div",{className:"metric-summary-card",children:[u.jsx("span",{className:"summary-label",children:e}),u.jsxs("span",{className:"summary-value",children:[t.toFixed(2),n]}),u.jsx("style",{children:`
        .metric-summary-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .summary-label {
          font-size: 13px;
          color: #6b7280;
          text-transform: uppercase;
        }

        .summary-value {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }
      `})]})}function Fie(e){switch(e){case"1h":return 60;case"6h":return 180;case"24h":return 720;case"7d":return 168;case"30d":return 720}}function Uie(e){switch(e){case"1h":return 60*1e3;case"6h":return 120*1e3;case"24h":return 120*1e3;case"7d":return 3600*1e3;case"30d":return 3600*1e3}}function Bie(){const e=ct(),{data:t,isLoading:n}=Ae(["nodes"],G_),[r,i]=v.useState(""),a=v.useMemo(()=>{if(!t)return[];if(!r.trim())return t;const l=r.toLowerCase();return t.filter(c=>c.name.toLowerCase().includes(l)||c.status.toLowerCase().includes(l)||c.roles.some(d=>d.toLowerCase().includes(l)))},[t,r]),o=l=>{e(`/cluster/nodes/${l.name}`)},s=[{key:"name",header:"Name",sortable:!0},{key:"status",header:"Status",sortable:!0,render:l=>u.jsx(tt,{status:l})},{key:"roles",header:"Roles",sortable:!0,render:l=>l.join(", ")||"-"},{key:"capacity",header:"CPU Capacity",sortable:!0,render:(l,c)=>{var d;return((d=c.capacity)==null?void 0:d.cpu)||"-"}},{key:"capacity",header:"Memory Capacity",sortable:!0,render:(l,c)=>{var d;return((d=c.capacity)==null?void 0:d.memory)||"-"}},{key:"allocated",header:"CPU Allocated",sortable:!0,render:(l,c)=>{var d;return((d=c.allocated)==null?void 0:d.cpu)||"-"}},{key:"allocated",header:"Memory Allocated",sortable:!0,render:(l,c)=>{var d;return((d=c.allocated)==null?void 0:d.memory)||"-"}},{key:"creationTimestamp",header:"Age",sortable:!0,render:l=>{const c=l,d=Math.floor(Date.now()/1e3-c)/86400;return d<1?"< 1d":d<30?`${Math.floor(d)}d`:`${Math.floor(d/30)}mo`}}];return u.jsxs("div",{className:"node-list",children:[u.jsxs("div",{className:"node-list-header",children:[u.jsx("h1",{children:"Nodes"}),u.jsx(ge,{placeholder:"Search by name, status, or roles...",value:r,onChange:l=>i(l.target.value),fullWidth:!0})]}),u.jsx(Bn,{}),u.jsx(Cn,{data:a,columns:s,loading:n,onRowClick:o,emptyMessage:"No nodes found",defaultSort:{key:"name",order:"asc"}}),u.jsx("style",{children:`
        .node-list {
          padding: 32px;
        }

        .node-list-header {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 24px;
        }

        .node-list-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          color: #111827;
        }
      `})]})}const W=v.forwardRef(({children:e,variant:t="primary",size:n="md",loading:r=!1,disabled:i,icon:a,iconPosition:o="left",className:s="",...l},c)=>{const d=`button button-${t} button-${n} ${r?"button-loading":""} ${s}`;return u.jsxs("button",{ref:c,className:d,disabled:i||r,...l,children:[a&&o==="left"&&u.jsx("span",{className:"button-icon",children:a}),r?u.jsx("span",{className:"button-spinner"}):e,a&&o==="right"&&u.jsx("span",{className:"button-icon",children:a})]})});W.displayName="Button";function hr({isOpen:e,onClose:t,title:n,children:r,size:i="md",showCloseButton:a=!0}){if(v.useEffect(()=>{e?document.body.style.overflow="hidden":document.body.style.overflow=""},[e]),!e)return null;const o=`modal modal-${i}`;return u.jsx("div",{className:o,children:u.jsx("div",{className:"modal-overlay",onClick:t,children:u.jsxs("div",{className:"modal-content",onClick:s=>s.stopPropagation(),children:[u.jsxs("div",{className:"modal-header",children:[u.jsx("h2",{children:n}),a&&u.jsx("button",{className:"modal-close",onClick:t,type:"button",children:"×"})]}),u.jsx("div",{className:"modal-body",children:r})]})})})}function Wie(){return u.jsx("style",{children:`
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 24px;
      }

      .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }

      .modal-content {
        position: relative;
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-height: calc(100vh - 48px);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .modal-sm {
        width: 100%;
        max-width: 400px;
      }

      .modal-md {
        width: 100%;
        max-width: 600px;
      }

      .modal-lg {
        width: 100%;
        max-width: 800px;
      }

      .modal-xl {
        width: 100%;
        max-width: 1200px;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px;
        border-bottom: 1px solid #e5e7eb;
      }

      .modal-header h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #111827;
      }

      .modal-close {
        background: transparent;
        border: none;
        font-size: 28px;
        color: #6b7280;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
      }

      .modal-close:hover {
        background: #f3f4f6;
      }

      .modal-body {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
      }
    `})}function vi({isOpen:e=!0,onClose:t,onCancel:n,onConfirm:r,title:i,message:a,confirmText:o="Confirm",cancelText:s="Cancel",type:l,variant:c,isLoading:d=!1}){const f=t||n||(()=>{}),p=l||c||"danger",h=()=>{r(),f()},m=`confirmation-dialog confirmation-dialog-${p}`;return u.jsx(hr,{isOpen:e,onClose:f,title:i,size:"sm",children:u.jsxs("div",{className:m,children:[u.jsx("p",{className:"confirmation-message",children:a}),u.jsxs("div",{className:"confirmation-actions",children:[u.jsx("button",{onClick:t,disabled:d,className:"confirmation-cancel",type:"button",children:s}),u.jsx("button",{onClick:h,disabled:d,className:"confirmation-confirm",type:"button",children:d?"Confirming...":o})]})]})})}function Hie(){var h;const{name:e}=Br(),t=ct(),[n,r]=v.useState(!1),{data:i,isLoading:a,error:o}=Ae(["node",e],()=>e?d7(e):Promise.reject("Node name is required")),s=Ne(({nodeName:m})=>e?f7(m):Promise.resolve(),{onSuccess:()=>{window.location.reload()}}),l=Ne(({nodeName:m})=>e?p7(m):Promise.resolve(),{onSuccess:()=>{window.location.reload()}}),c=Ne(({nodeName:m,timeoutSeconds:y})=>h7(m,y),{onSuccess:()=>{r(!1),window.location.reload()}});if(a)return u.jsx(b0,{message:`Loading node ${e}...`});if(o)return u.jsxs("div",{className:"node-details",children:[u.jsx("h1",{children:"Error Loading Node"}),u.jsx("p",{children:o instanceof Error?o.message:"Unknown error"}),u.jsx(W,{onClick:()=>t("/cluster/nodes"),children:"Back to Nodes"})]});if(!i)return u.jsxs("div",{className:"node-details",children:[u.jsx("h1",{children:"Node Not Found"}),u.jsx(W,{onClick:()=>t("/cluster/nodes"),children:"Back to Nodes"})]});const d=((h=i.labels)==null?void 0:h["node.kubernetes.io/unschedulable"])==="true",f=i.conditions.find(m=>m.type==="Ready"),p=(f==null?void 0:f.status)==="True";return u.jsxs("div",{className:"node-details",children:[u.jsx(Wie,{}),u.jsxs("div",{className:"node-details-header",children:[u.jsxs("div",{children:[u.jsx("h1",{children:i.name}),u.jsxs("div",{className:"node-meta",children:[u.jsx(tt,{status:p?"Running":"Failed"}),u.jsx("span",{className:"node-roles",children:i.roles.join(", ")||"No roles"})]})]}),u.jsxs("div",{className:"node-actions",children:[d?u.jsx(W,{variant:"primary",onClick:()=>l.mutate({nodeName:e||""}),disabled:l.isPending,children:l.isPending?"Uncordoning...":"Uncordon"}):u.jsx(W,{variant:"secondary",onClick:()=>s.mutate({nodeName:e||""}),disabled:s.isPending,children:s.isPending?"Cordoning...":"Cordon"}),u.jsx(W,{variant:"danger",onClick:()=>r(!0),disabled:d||c.isPending,children:c.isPending?"Draining...":"Drain"})]})]}),u.jsxs("div",{className:"node-details-content",children:[u.jsxs("div",{className:"node-details-section",children:[u.jsx("h2",{children:"Conditions"}),u.jsx("div",{className:"conditions-list",children:i.conditions.map((m,y)=>u.jsx(Kie,{condition:m},y))})]}),u.jsxs("div",{className:"node-details-section",children:[u.jsx("h2",{children:"Resources"}),u.jsxs("div",{className:"resources-grid",children:[u.jsx(Rg,{title:"CPU",capacity:i.capacity.cpu,allocatable:i.allocatable.cpu,allocated:i.allocated.cpu,unit:"cores"}),u.jsx(Rg,{title:"Memory",capacity:i.capacity.memory,allocatable:i.allocatable.memory,allocated:i.allocated.memory,unit:""}),u.jsx(Rg,{title:"Pods",capacity:i.capacity.pods||"-",allocatable:i.allocatable.pods||"-",allocated:"-",unit:""})]})]}),u.jsxs("div",{className:"node-details-section",children:[u.jsx("h2",{children:"Labels"}),u.jsx("div",{className:"labels-grid",children:i.labels?Object.entries(i.labels).map(([m,y])=>u.jsxs("div",{className:"label-item",children:[u.jsx("span",{className:"label-key",children:m}),u.jsx("span",{className:"label-value",children:y})]},m)):u.jsx("p",{className:"no-data",children:"No labels"})})]}),u.jsxs("div",{className:"node-details-section",children:[u.jsx("h2",{children:"Annotations"}),u.jsx("div",{className:"labels-grid",children:Object.keys(i.labels||{}).length===0?u.jsx("p",{className:"no-data",children:"No annotations"}):Object.entries(i.labels||{}).map(([m,y])=>u.jsxs("div",{className:"label-item",children:[u.jsx("span",{className:"label-key",children:m}),u.jsx("span",{className:"label-value",children:y})]},m))})]})]}),n&&u.jsx(vi,{title:"Drain Node?",message:`Are you sure you want to drain node ${i.name}? This will evict all pods from the node and mark it as unschedulable.`,onConfirm:()=>c.mutate({nodeName:i.name}),onCancel:()=>r(!1)}),u.jsx("style",{children:`
        .node-details {
          padding: 32px;
        }

        .node-details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .node-details-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 12px 0;
          color: #111827;
        }

        .node-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .node-roles {
          font-size: 14px;
          color: #6b7280;
        }

        .node-actions {
          display: flex;
          gap: 12px;
        }

        .node-details-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .node-details-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .node-details-section h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #111827;
        }

        .conditions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
        }

        .labels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 12px;
        }

        .label-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 8px;
          background: #f9fafb;
          border-radius: 6px;
          font-size: 13px;
        }

        .label-key {
          font-weight: 600;
          color: #374151;
          word-break: break-word;
        }

        .label-value {
          color: #6b7280;
          word-break: break-word;
        }

        .no-data {
          color: #9ca3af;
          font-style: italic;
          margin: 0;
        }
      `})]})}function Kie({condition:e}){const n=e.status==="True"?"#10b981":"#ef4444";return u.jsxs("div",{className:"condition-item",children:[u.jsxs("div",{className:"condition-header",children:[u.jsx("span",{className:"condition-type",children:e.type}),u.jsx("span",{className:"condition-status",style:{backgroundColor:n}})]}),u.jsxs("div",{className:"condition-details",children:[e.reason&&u.jsx("div",{className:"condition-reason",children:e.reason}),e.message&&u.jsx("div",{className:"condition-message",children:e.message}),e.lastTransitionTime&&u.jsx("div",{className:"condition-time",children:new Date(e.lastTransitionTime*1e3).toLocaleString()})]}),u.jsx("style",{children:`
        .condition-item {
          padding: 12px;
          background: #f9fafb;
          border-radius: 6px;
          border-left: 3px solid ${n};
        }

        .condition-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .condition-type {
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .condition-status {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .condition-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
        }

        .condition-reason {
          font-weight: 500;
          color: #374151;
        }

        .condition-message {
          color: #6b7280;
        }

        .condition-time {
          color: #9ca3af;
          font-size: 12px;
        }
      `})]})}function Rg({title:e,capacity:t,allocatable:n,allocated:r,unit:i}){return u.jsxs("div",{className:"resource-card",children:[u.jsx("h3",{className:"resource-title",children:e}),u.jsxs("div",{className:"resource-stats",children:[u.jsxs("div",{className:"stat",children:[u.jsx("span",{className:"stat-label",children:"Capacity"}),u.jsxs("span",{className:"stat-value",children:[t,i]})]}),u.jsxs("div",{className:"stat",children:[u.jsx("span",{className:"stat-label",children:"Allocatable"}),u.jsxs("span",{className:"stat-value",children:[n,i]})]}),u.jsxs("div",{className:"stat",children:[u.jsx("span",{className:"stat-label",children:"Allocated"}),u.jsxs("span",{className:"stat-value",children:[r,i]})]})]}),u.jsx("style",{children:`
        .resource-card {
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .resource-title {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 12px 0;
          color: #111827;
        }

        .resource-stats {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .stat-label {
          color: #6b7280;
        }

        .stat-value {
          font-weight: 600;
          color: #111827;
        }
      `})]})}async function Vie(e){let t=no(e||{});e!=null&&e.search&&(t+=`&search=${encodeURIComponent(e.search)}`);const n=await ce.get(`/api/v1/namespaces?${t}`);return ye(n.data,gi(kh))}async function vD(e){const t=await ce.get(`/api/v1/namespaces/${encodeURIComponent(e)}`);return ye(t.data,kh)}async function Zie(e){const t=await ce.post("/api/v1/namespaces",e);return ye(t.data,kh)}async function qie(e,t){const n=await ce.put(`/api/v1/namespaces/${encodeURIComponent(e)}`,t);return ye(n.data,kh)}async function yD(e){const t=await ce.delete(`/api/v1/namespaces/${encodeURIComponent(e)}`);return ye(t.data,J({message:A()}))}async function xD(e){const t=await ce.get(`/api/v1/namespaces/${encodeURIComponent(e)}/quota`);return ye(t.data,J({cpuUsed:A(),cpuHard:A(),memoryUsed:A(),memoryHard:A(),podsUsed:A(),podsHard:A()}))}async function Yie(e,t){const n=await ce.put(`/api/v1/namespaces/${encodeURIComponent(e)}/quota`,t);return ye(n.data,J({message:A()}))}function Gie(){const{showToast:e}=Ct(),[t,n]=v.useState({search:""}),[r,i]=v.useState({key:"name",order:"asc"}),[a,o]=v.useState(null),{data:s,isLoading:l,error:c,refetch:d}=Ae(["namespaces",t,r],()=>Vie({search:t.search||void 0,sortBy:r.key,sortOrder:r.order})),f=Ne(async g=>{await yD(g)},{onSuccess:()=>{e({message:"Namespace deleted successfully",type:"success"}),d(),o(null)}}),p=(g,x)=>{i({key:g,order:x})},h=g=>{window.location.href=`/namespaces/${g.name}`},m=async g=>{await f.mutateAsync(g.name)},y=[{key:"name",header:"Name",sortable:!0,render:(g,x)=>u.jsx("a",{href:`/namespaces/${x.name}`,className:"namespace-link",children:g})},{key:"status",header:"Status",sortable:!0,render:g=>u.jsx(tt,{status:g})},{key:"creationTimestamp",header:"Created",sortable:!0,render:g=>new Date(g).toLocaleString()},{key:"labels",header:"Labels",render:g=>{const x=g;if(!x||Object.keys(x).length===0)return"-";const b=Object.keys(x).slice(0,2);return u.jsxs("div",{className:"labels-cell",children:[b.map(w=>u.jsxs("span",{className:"label",children:[w,": ",x[w]]},w)),Object.keys(x).length>2&&u.jsx("span",{className:"label-more",children:"..."})]})}},{key:"actions",header:"Actions",render:(g,x)=>u.jsxs("div",{className:"actions-cell",children:[u.jsx(W,{size:"sm",onClick:b=>{b.stopPropagation(),window.location.href=`/namespaces/${x.name}/edit`},children:"Edit"}),u.jsx(W,{size:"sm",onClick:b=>{b.stopPropagation(),o(x)},children:"Delete"})]})}];return c?u.jsxs("div",{className:"error-message",children:["Error loading namespaces: ",c.message]}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"namespace-list",children:[u.jsxs("div",{className:"page-header",children:[u.jsx("h1",{children:"Namespaces"}),u.jsx(W,{onClick:()=>window.location.href="/namespaces/create",children:"Create Namespace"})]}),u.jsxs("div",{className:"filters-bar",children:[u.jsx(ge,{label:"Search",placeholder:"Search by name or label...",fullWidth:!0,value:t.search,onChange:g=>n({...t,search:g.target.value})}),u.jsx(W,{onClick:()=>n({search:""}),disabled:!t.search,children:"Clear"})]}),u.jsx(Cn,{data:(s==null?void 0:s.items)||[],columns:y,onSort:p,defaultSort:r,onRowClick:h,loading:l,emptyMessage:"No namespaces found matching your filters"}),a&&u.jsx(vi,{title:"Delete Namespace",message:`Are you sure you want to delete namespace "${a.name}"? This action cannot be undone.`,onConfirm:()=>m(a),onCancel:()=>o(null),confirmText:"Delete"})]}),u.jsx("style",{children:`
        .namespace-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .filters-bar {
          display: flex;
          gap: 12px;
          align-items: flex-end;
          margin-bottom: 20px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .filters-bar label {
          margin-bottom: 0;
        }

        .filters-bar .input {
          flex: 1;
        }

        .namespace-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .namespace-link:hover {
          text-decoration: underline;
        }

        .labels-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .label {
          display: inline-block;
          padding: 2px 8px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #1e40af;
        }

        .label-more {
          color: #6b7280;
          font-size: 11px;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `})]})}function Qie({labels:e,onChange:t}){const[n,r]=v.useState({key:"",value:""}),i=()=>{!n.key||!n.value||(t({...e,[n.key]:n.value}),r({key:"",value:""}))},a=o=>{const{[o]:s,...l}=e;t(l)};return u.jsxs("div",{className:"labels-editor",children:[u.jsx("div",{className:"labels-list",children:Object.entries(e).map(([o,s])=>u.jsxs("div",{className:"label-item",children:[u.jsxs("span",{className:"label-key",children:[o,":"]}),u.jsx("span",{className:"label-value",children:s}),u.jsx(W,{size:"sm",onClick:()=>a(o),children:"✕"})]},o))}),u.jsxs("div",{className:"add-label-row",children:[u.jsx(ge,{placeholder:"Key",value:n.key,onChange:o=>r({...n,key:o.target.value})}),u.jsx(ge,{placeholder:"Value",value:n.value,onChange:o=>r({...n,value:o.target.value})}),u.jsx(W,{size:"sm",onClick:i,disabled:!n.key||!n.value,children:"Add"})]})]})}function Xie({quota:e,onUpdate:t}){return u.jsxs("div",{className:"quota-editor",children:[u.jsx("h3",{children:"Resource Quota"}),u.jsxs("div",{className:"quota-grid",children:[u.jsxs("div",{className:"quota-item",children:[u.jsx("label",{children:"CPU"}),u.jsx(ge,{placeholder:"Limit (e.g., 4)",defaultValue:e.cpuHard,fullWidth:!0}),u.jsxs("div",{className:"quota-usage",children:[u.jsx("span",{className:"quota-used",children:e.cpuUsed}),u.jsx("span",{className:"quota-separator",children:"/"}),u.jsx("span",{className:"quota-hard",children:e.cpuHard||"∞"})]})]}),u.jsxs("div",{className:"quota-item",children:[u.jsx("label",{children:"Memory"}),u.jsx(ge,{placeholder:"Limit (e.g., 8Gi)",defaultValue:e.memoryHard,fullWidth:!0}),u.jsxs("div",{className:"quota-usage",children:[u.jsx("span",{className:"quota-used",children:e.memoryUsed}),u.jsx("span",{className:"quota-separator",children:"/"}),u.jsx("span",{className:"quota-hard",children:e.memoryHard||"∞"})]})]}),u.jsxs("div",{className:"quota-item",children:[u.jsx("label",{children:"Pods"}),u.jsx(ge,{placeholder:"Limit (e.g., 10)",defaultValue:e.podsHard,fullWidth:!0}),u.jsxs("div",{className:"quota-usage",children:[u.jsx("span",{className:"quota-used",children:e.podsUsed}),u.jsx("span",{className:"quota-separator",children:"/"}),u.jsx("span",{className:"quota-hard",children:e.podsHard||"∞"})]})]})]}),u.jsx(W,{onClick:()=>t(e),className:"save-quota-button",children:"Update Quota"})]})}function Jie(){const{name:e}=Br(),{showToast:t}=Ct(),[n,r]=v.useState(!1),[i,a]=v.useState({}),[o,s]=v.useState(null),{data:l,isLoading:c,error:d,refetch:f}=Ae(["namespace",e],()=>vD(e),{enabled:!!e}),{data:p,isLoading:h,refetch:m}=Ae(["namespace-quota",e],()=>xD(e),{enabled:!!e}),y=Ne(async S=>{await fetch(`/api/v1/namespaces/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({labels:i})})},{onSuccess:()=>{t({message:"Labels updated successfully",type:"success"}),r(!1),f()}}),g=Ne(async S=>{await fetch(`/api/v1/namespaces/${e}/quota`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(S)})},{onSuccess:()=>{t({message:"Quota updated successfully",type:"success"}),m()}}),x=Ne(async S=>{await yD(e)},{onSuccess:()=>{t({message:"Namespace deleted successfully",type:"success"}),window.location.href="/namespaces"}}),b=async()=>{await x.mutateAsync()},w=(S,C)=>{if(!C||C==="∞")return 0;const N=parseFloat(S),_=parseFloat(C);return N/_*100};if(c||h)return u.jsx("div",{className:"loading",children:"Loading namespace details..."});if(d)return u.jsxs("div",{className:"error",children:["Error loading namespace: ",d.message]});if(!l)return u.jsx("div",{className:"error",children:"Namespace not found"});const j=w((p==null?void 0:p.cpuUsed)||"0",(p==null?void 0:p.cpuHard)||"∞"),k=w((p==null?void 0:p.memoryUsed)||"0",(p==null?void 0:p.memoryHard)||"∞"),P=w((p==null?void 0:p.podsUsed)||"0",(p==null?void 0:p.podsHard)||"∞");return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"namespace-details",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("h1",{children:["Namespace: ",l.name]}),u.jsxs("div",{className:"header-actions",children:[u.jsx(W,{onClick:()=>window.location.href="/namespaces",children:"← Back"}),u.jsx(W,{onClick:()=>window.location.href=`/namespaces/${e}/edit`,children:"Edit Namespace"}),u.jsx(W,{onClick:()=>s(l),children:"Delete"})]})]}),u.jsxs("div",{className:"content-grid",children:[u.jsxs("div",{className:"info-section",children:[u.jsx("h2",{children:"Overview"}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Name:"}),u.jsx("span",{className:"info-value",children:l.name})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Status:"}),u.jsx(tt,{status:l.status})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Created:"}),u.jsx("span",{className:"info-value",children:l.creationTimestamp?new Date(l.creationTimestamp).toLocaleString():"N/A"})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"UID:"}),u.jsx("span",{className:"info-value mono",children:l.name||"N/A"})]})]}),u.jsxs("div",{className:"info-section",children:[u.jsx("h2",{children:"Labels & Annotations"}),n?u.jsxs(u.Fragment,{children:[u.jsx(Qie,{labels:i,onChange:a}),u.jsxs("div",{className:"editor-actions",children:[u.jsx(W,{onClick:()=>y.mutate(),disabled:y.isPending,children:"Save Labels"}),u.jsx(W,{onClick:()=>{a(l.labels||{}),r(!1)},children:"Cancel"})]})]}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Labels:"}),u.jsx("div",{className:"info-value",children:l.labels&&Object.keys(l.labels).length>0?u.jsx("div",{className:"labels-display",children:Object.entries(l.labels).map(([S,C])=>u.jsxs("span",{className:"label-tag",children:[S,"=",C]},S))}):u.jsx("span",{className:"info-value",children:"No labels"})})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Annotations:"}),u.jsx("div",{className:"info-value",children:l.annotations&&Object.keys(l.annotations).length>0?u.jsx("div",{className:"annotations-display",children:Object.entries(l.annotations).map(([S,C])=>u.jsxs("div",{className:"annotation-item",children:[u.jsxs("span",{className:"annotation-key",children:[S,":"]}),u.jsx("span",{className:"annotation-value",children:C})]},S))}):u.jsx("span",{className:"info-value",children:"No annotations"})})]}),u.jsx(W,{size:"sm",onClick:()=>{a(l.labels||{}),r(!0)},children:"Edit Labels/Annotations"})]})]}),p&&u.jsx(Xie,{quota:p,onUpdate:S=>g.mutate(S)})]}),p&&u.jsxs("div",{className:"usage-section",children:[u.jsx("h2",{children:"Resource Usage"}),u.jsxs("div",{className:"usage-bars",children:[u.jsxs("div",{className:"usage-item",children:[u.jsxs("div",{className:"usage-header",children:[u.jsx("span",{className:"usage-label",children:"CPU"}),u.jsxs("span",{className:"usage-percentage",children:[j.toFixed(1),"%"]})]}),u.jsx("div",{className:"usage-bar",children:u.jsx("div",{className:"usage-fill",style:{width:`${Math.min(j,100)}%`},"data-over":j>80?"true":"false"})})]}),u.jsxs("div",{className:"usage-item",children:[u.jsxs("div",{className:"usage-header",children:[u.jsx("span",{className:"usage-label",children:"Memory"}),u.jsxs("span",{className:"usage-percentage",children:[k.toFixed(1),"%"]})]}),u.jsx("div",{className:"usage-bar",children:u.jsx("div",{className:"usage-fill",style:{width:`${Math.min(k,100)}%`},"data-over":k>80?"true":"false"})})]}),u.jsxs("div",{className:"usage-item",children:[u.jsxs("div",{className:"usage-header",children:[u.jsx("span",{className:"usage-label",children:"Pods"}),u.jsxs("span",{className:"usage-percentage",children:[P.toFixed(1),"%"]})]}),u.jsx("div",{className:"usage-bar",children:u.jsx("div",{className:"usage-fill",style:{width:`${Math.min(P,100)}%`},"data-over":P>80?"true":"false"})})]})]})]}),o&&u.jsx(vi,{title:"Delete Namespace",message:`Are you sure you want to delete namespace "${o.name}"? This action cannot be undone and will delete all resources within the namespace.`,onConfirm:b,onCancel:()=>s(null),confirmText:"Delete"})]}),u.jsx("style",{children:`
        .namespace-details {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .header-actions {
          display: flex;
          gap: 8px;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .info-section {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .info-section h2 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .info-row {
          display: flex;
          margin-bottom: 12px;
        }

        .info-label {
          font-weight: 500;
          color: #6b7280;
          min-width: 120px;
        }

        .info-value {
          color: #374151;
        }

        .mono {
          font-family: 'Courier New', Courier, monospace;
          font-size: 13px;
        }

        .labels-display,
        .annotations-display {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .label-tag {
          display: inline-block;
          padding: 4px 8px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          color: #1e40af;
        }

        .annotation-item {
          font-size: 13px;
          color: #374151;
        }

        .annotation-key {
          font-weight: 500;
          color: #6b7280;
        }

        .annotation-value {
          margin-left: 4px;
        }

        .labels-editor {
          margin-bottom: 16px;
        }

        .labels-list {
          margin-bottom: 12px;
        }

        .label-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          background: #f9fafb;
          border-radius: 4px;
          margin-bottom: 4px;
        }

        .label-key {
          font-weight: 500;
          color: #1e40af;
        }

        .label-value {
          color: #374151;
        }

        .add-label-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .editor-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        .quota-editor {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .quota-editor h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .quota-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .quota-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .quota-item label {
          font-weight: 500;
          color: #6b7280;
          font-size: 14px;
        }

        .quota-usage {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
        }

        .quota-used {
          color: #374151;
          font-weight: 600;
        }

        .quota-separator {
          color: #9ca3af;
        }

        .quota-hard {
          color: #1e40af;
          font-weight: 600;
        }

        .save-quota-button {
          margin-top: 16px;
        }

        .usage-section {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .usage-section h2 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .usage-bars {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .usage-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .usage-header {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }

        .usage-label {
          font-weight: 500;
          color: #6b7280;
        }

        .usage-percentage {
          font-weight: 600;
        }

        .usage-percentage[data-over="true"] {
          color: #ef4444;
        }

        .usage-percentage:not([data-over="true"]) {
          color: #059669;
        }

        .usage-bar {
          height: 24px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }

        .usage-fill {
          height: 100%;
          background: #3b82f6;
          transition: width 0.3s ease;
        }

        .usage-fill[data-over="true"] {
          background: #ef4444;
        }

        .loading,
        .error {
          padding: 48px;
          text-align: center;
          font-size: 16px;
        }

        .error {
          color: #ef4444;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
        }
      `})]})}function eae(){const e=ct(),{showToast:t}=Ct(),[n,r]=v.useState({name:"",labels:{},annotations:{}}),[i,a]=v.useState({key:"",value:""}),[o,s]=v.useState({key:"",value:""}),l=Ne(async m=>await Zie({name:m.name,labels:m.labels,annotations:m.annotations}),{onSuccess:m=>{t({message:`Namespace "${m.name}" created successfully`,type:"success"}),e(`/namespaces/${m.name}`)}}),c=async m=>{if(m.preventDefault(),!n.name.trim()){t({message:"Namespace name is required",type:"error"});return}try{await l.mutateAsync(n)}catch(y){console.error("Failed to create namespace:",y)}},d=()=>{!i.key||!i.value||(r({...n,labels:{...n.labels,[i.key]:i.value}}),a({key:"",value:""}))},f=m=>{const{[m]:y,...g}=n.labels;r({...n,labels:g})},p=()=>{!o.key||!o.value||(r({...n,annotations:{...n.annotations,[o.key]:o.value}}),s({key:"",value:""}))},h=m=>{const{[m]:y,...g}=n.annotations;r({...n,annotations:g})};return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"create-namespace",children:[u.jsxs("div",{className:"page-header",children:[u.jsx("h1",{children:"Create Namespace"}),u.jsx(W,{variant:"secondary",onClick:()=>e(-1),children:"Cancel"})]}),u.jsxs("form",{onSubmit:c,className:"namespace-form",children:[u.jsxs("div",{className:"form-section",children:[u.jsx("h2",{children:"Basic Information"}),u.jsx("div",{className:"form-group",children:u.jsx(ge,{label:"Namespace Name",placeholder:"my-namespace",value:n.name,onChange:m=>r({...n,name:m.target.value}),error:l.isPending?"":void 0,helperText:"DNS-1123 subdomain label (lowercase alphanumeric, hyphens, periods, max 253 chars)",fullWidth:!0,required:!0})})]}),u.jsxs("div",{className:"form-section",children:[u.jsx("h2",{children:"Labels"}),u.jsx("div",{className:"labels-container",children:Object.entries(n.labels).map(([m,y])=>u.jsxs("div",{className:"label-row",children:[u.jsx(ge,{placeholder:"Key",value:m,onChange:g=>{const x={...n.labels};x[g.target.value]=y,delete x[m],r({...n,labels:x})}}),u.jsx(ge,{placeholder:"Value",value:y,onChange:g=>{r({...n,labels:{...n.labels,[m]:g.target.value}})}}),u.jsx(W,{variant:"danger",size:"sm",onClick:()=>f(m),children:"Remove"})]},m))}),u.jsxs("div",{className:"add-item-row",children:[u.jsx(ge,{placeholder:"Label key",value:i.key,onChange:m=>a({...i,key:m.target.value})}),u.jsx(ge,{placeholder:"Label value",value:i.value,onChange:m=>a({...i,value:m.target.value})}),u.jsx(W,{variant:"secondary",size:"sm",onClick:d,disabled:!i.key||!i.value,children:"Add Label"})]})]}),u.jsxs("div",{className:"form-section",children:[u.jsx("h2",{children:"Annotations"}),u.jsx("div",{className:"annotations-container",children:Object.entries(n.annotations).map(([m,y])=>u.jsxs("div",{className:"annotation-row",children:[u.jsx(ge,{placeholder:"Key",value:m,onChange:g=>{const x={...n.annotations};x[g.target.value]=y,delete x[m],r({...n,annotations:x})}}),u.jsx(ge,{placeholder:"Value",value:y,onChange:g=>{r({...n,annotations:{...n.annotations,[m]:g.target.value}})}}),u.jsx(W,{variant:"danger",size:"sm",onClick:()=>h(m),children:"Remove"})]},m))}),u.jsxs("div",{className:"add-item-row",children:[u.jsx(ge,{placeholder:"Annotation key",value:o.key,onChange:m=>s({...o,key:m.target.value})}),u.jsx(ge,{placeholder:"Annotation value",value:o.value,onChange:m=>s({...o,value:m.target.value})}),u.jsx(W,{variant:"secondary",size:"sm",onClick:p,disabled:!o.key||!o.value,children:"Add Annotation"})]})]}),u.jsxs("div",{className:"form-actions",children:[u.jsx(W,{variant:"secondary",type:"button",onClick:()=>e("/namespaces"),disabled:l.isPending,children:"Cancel"}),u.jsx(W,{variant:"primary",type:"submit",disabled:l.isPending,children:l.isPending?"Creating...":"Create Namespace"})]})]})]}),u.jsx("style",{children:`
        .create-namespace {
          padding: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .namespace-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-section {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .form-section h2 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .labels-container,
        .annotations-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .label-row,
        .annotation-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 8px;
          align-items: center;
        }

        .add-item-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 8px;
          padding-top: 8px;
          border-top: 1px solid #e5e7eb;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 24px;
        }

        @media (max-width: 768px) {
          .label-row,
          .annotation-row {
            grid-template-columns: 1fr;
          }

          .add-item-row {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function tae(){const{name:e}=Br(),{showToast:t}=Ct(),n=ct(),[r,i]=v.useState({labels:{},annotations:{}}),[a,o]=v.useState({key:"",value:""}),[s,l]=v.useState({key:"",value:""}),{data:c,isLoading:d,error:f,refetch:p}=Ae(["namespace",e],()=>vD(e),{enabled:!!e});v.useEffect(()=>{c&&i({labels:c.labels||{},annotations:c.annotations||{}})},[c]);const h=Ne(async w=>await qie(e,{labels:w.labels,annotations:w.annotations}),{onSuccess:()=>{t({message:"Namespace updated successfully",type:"success"}),p(),n(`/namespaces/${e}`)}}),m=async w=>{w.preventDefault();try{await h.mutateAsync(r)}catch(j){console.error("Failed to update namespace:",j)}},y=()=>{!a.key||!a.value||(i({...r,labels:{...r.labels,[a.key]:a.value}}),o({key:"",value:""}))},g=w=>{const{[w]:j,...k}=r.labels;i({...r,labels:k})},x=()=>{!s.key||!s.value||(i({...r,annotations:{...r.annotations,[s.key]:s.value}}),l({key:"",value:""}))},b=w=>{const{[w]:j,...k}=r.annotations;i({...r,annotations:k})};return d?u.jsx("div",{className:"loading",children:"Loading namespace..."}):f?u.jsxs("div",{className:"error",children:["Error loading namespace: ",f.message]}):c?u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"edit-namespace",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("h1",{children:["Edit Namespace: ",c.name]}),u.jsx(W,{variant:"secondary",onClick:()=>n(`/namespaces/${e}`),children:"← Back"})]}),u.jsxs("form",{onSubmit:m,className:"namespace-form",children:[u.jsxs("div",{className:"form-section",children:[u.jsx("h2",{children:"Labels"}),u.jsx("div",{className:"labels-container",children:Object.entries(r.labels).map(([w,j])=>u.jsxs("div",{className:"label-row",children:[u.jsx(ge,{placeholder:"Key",value:w,onChange:k=>{const P={...r.labels};P[k.target.value]=j,delete P[w],i({...r,labels:P})}}),u.jsx(ge,{placeholder:"Value",value:j,onChange:k=>{i({...r,labels:{...r.labels,[w]:k.target.value}})}}),u.jsx(W,{variant:"danger",size:"sm",onClick:()=>g(w),children:"Remove"})]},w))}),u.jsxs("div",{className:"add-item-row",children:[u.jsx(ge,{placeholder:"Label key",value:a.key,onChange:w=>o({...a,key:w.target.value})}),u.jsx(ge,{placeholder:"Label value",value:a.value,onChange:w=>o({...a,value:w.target.value})}),u.jsx(W,{variant:"secondary",size:"sm",onClick:y,disabled:!a.key||!a.value,children:"Add Label"})]})]}),u.jsxs("div",{className:"form-section",children:[u.jsx("h2",{children:"Annotations"}),u.jsx("div",{className:"annotations-container",children:Object.entries(r.annotations).map(([w,j])=>u.jsxs("div",{className:"annotation-row",children:[u.jsx(ge,{placeholder:"Key",value:w,onChange:k=>{const P={...r.annotations};P[k.target.value]=j,delete P[w],i({...r,annotations:P})}}),u.jsx(ge,{placeholder:"Value",value:j,onChange:k=>{i({...r,annotations:{...r.annotations,[w]:k.target.value}})}}),u.jsx(W,{variant:"danger",size:"sm",onClick:()=>b(w),children:"Remove"})]},w))}),u.jsxs("div",{className:"add-item-row",children:[u.jsx(ge,{placeholder:"Annotation key",value:s.key,onChange:w=>l({...s,key:w.target.value})}),u.jsx(ge,{placeholder:"Annotation value",value:s.value,onChange:w=>l({...s,value:w.target.value})}),u.jsx(W,{variant:"secondary",size:"sm",onClick:x,disabled:!s.key||!s.value,children:"Add Annotation"})]})]}),u.jsxs("div",{className:"form-actions",children:[u.jsx(W,{variant:"secondary",type:"button",onClick:()=>n(`/namespaces/${e}`),disabled:h.isPending,children:"Cancel"}),u.jsx(W,{variant:"primary",type:"submit",disabled:h.isPending,children:h.isPending?"Saving...":"Save Changes"})]})]})]}),u.jsx("style",{children:`
        .edit-namespace {
          padding: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .namespace-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-section {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .form-section h2 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .labels-container,
        .annotations-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .label-row,
        .annotation-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 8px;
          align-items: center;
        }

        .add-item-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 8px;
          padding-top: 8px;
          border-top: 1px solid #e5e7eb;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          padding-top: 24px;
        }

        .loading,
        .error {
          padding: 48px;
          text-align: center;
          font-size: 16px;
        }

        .error {
          color: #ef4444;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
        }

        @media (max-width: 768px) {
          .label-row,
          .annotation-row {
            grid-template-columns: 1fr;
          }

          .add-item-row {
            grid-template-columns: 1fr;
          }
        }
      `})]}):u.jsx("div",{className:"error",children:"Namespace not found"})}const NC=[{id:"default",name:"Default",description:"Standard namespace with basic resource limits"},{id:"development",name:"Development",description:"Namespace for development workloads"},{id:"staging",name:"Staging",description:"Namespace for staging and testing"},{id:"production",name:"Production",description:"Production namespace with strict quotas"}],nae=[{id:"admin",name:"Admin",description:"Full access to all resources in namespace"},{id:"developer",name:"Developer",description:"Deploy and manage workloads"},{id:"viewer",name:"Viewer",description:"Read-only access to resources"}];function rae(){const{name:e}=Br(),{showToast:t}=Ct(),n=ct(),[r,i]=v.useState({cpuHard:"",memoryHard:"",podsHard:"",cpuUsed:"",memoryUsed:"",podsUsed:""}),[a,o]=v.useState({locked:!1,lockedBy:"",lockedAt:null}),[s,l]=v.useState(""),[c,d]=v.useState([]),{data:f,isLoading:p,error:h,refetch:m}=Ae(["namespace-quota",e],()=>xD(e),{enabled:!!e});v.useEffect(()=>{f&&i({cpuHard:f.cpuHard||"",memoryHard:f.memoryHard||"",podsHard:f.podsHard||"",cpuUsed:f.cpuUsed||"",memoryUsed:f.memoryUsed||"",podsUsed:f.podsUsed||""})},[f]);const y=Ne(async S=>await Yie(e,S),{onSuccess:()=>{t({message:"Quota updated successfully",type:"success"}),m()}}),g=Ne(async S=>{const C=S?{"k8s-manager/locked":"true"}:{};await fetch(`/api/v1/namespaces/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({annotations:C})})},{onSuccess:()=>{t({message:a.locked?"Namespace unlocked":"Namespace locked",type:"success"}),m()}}),x=Ne(async S=>{if(!NC.find(_=>_.id===S))return;const N={"k8s-manager/template":S,"k8s-manager/template-applied-at":new Date().toISOString()};await fetch(`/api/v1/namespaces/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({annotations:N})})},{onSuccess:()=>{t({message:"Template applied successfully",type:"success"}),m()}}),b=Ne(async S=>{await fetch(`/api/v1/namespaces/${e}/roles`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({role:S})})},{onSuccess:()=>{t({message:"Role assigned successfully",type:"success"})}}),w=async S=>{S.preventDefault();try{await y.mutateAsync(r)}catch(C){console.error("Failed to update quotas:",C)}},j=()=>{const S=!a.locked;o({locked:S,lockedBy:S?"current-user":"",lockedAt:S?Date.now():null}),g.mutate(S)},k=()=>{x.mutate(s)},P=S=>{c.includes(S)?d(c.filter(C=>C!==S)):d([...c,S]),b.mutate(S)};return p?u.jsx("div",{className:"loading",children:"Loading namespace management..."}):h?u.jsxs("div",{className:"error",children:["Error loading namespace: ",h.message]}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"namespace-management",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("h1",{children:["Namespace Management: ",e]}),u.jsx("div",{className:"header-actions",children:u.jsx(W,{onClick:()=>n(`/namespaces/${e}`),children:"← Back"})})]}),u.jsxs("div",{className:"content-grid",children:[u.jsxs("div",{className:"management-section",children:[u.jsx("h2",{children:"Resource Quota"}),u.jsxs("form",{onSubmit:w,className:"quota-form",children:[u.jsxs("div",{className:"quota-item",children:[u.jsx("label",{children:"CPU Limit"}),u.jsx(ge,{placeholder:"e.g., 4 cores",value:r.cpuHard,onChange:S=>i({...r,cpuHard:S.target.value}),helperText:"CPU limit in cores",fullWidth:!0}),u.jsxs("div",{className:"current-value",children:["Current: ",u.jsx("strong",{children:(f==null?void 0:f.cpuUsed)||"0"})," cores"]})]}),u.jsxs("div",{className:"quota-item",children:[u.jsx("label",{children:"Memory Limit"}),u.jsx(ge,{placeholder:"e.g., 8Gi",value:r.memoryHard,onChange:S=>i({...r,memoryHard:S.target.value}),helperText:"Memory limit (e.g., 8Gi, 16Gi)",fullWidth:!0}),u.jsxs("div",{className:"current-value",children:["Current: ",u.jsx("strong",{children:(f==null?void 0:f.memoryUsed)||"0"})]})]}),u.jsxs("div",{className:"quota-item",children:[u.jsx("label",{children:"Pod Limit"}),u.jsx(ge,{placeholder:"e.g., 10 pods",value:r.podsHard,onChange:S=>i({...r,podsHard:S.target.value}),helperText:"Maximum number of pods",fullWidth:!0}),u.jsxs("div",{className:"current-value",children:["Current: ",u.jsx("strong",{children:(f==null?void 0:f.podsUsed)||"0"})," pods"]})]}),u.jsxs("div",{className:"form-actions",children:[u.jsx(W,{type:"button",onClick:()=>{f&&i({cpuHard:f.cpuHard||"",memoryHard:f.memoryHard||"",podsHard:f.podsHard||"",cpuUsed:f.cpuUsed||"",memoryUsed:f.memoryUsed||"",podsUsed:f.podsUsed||""})},children:"Reset"}),u.jsx(W,{type:"submit",disabled:y.isPending,children:y.isPending?"Updating...":"Update Quota"})]})]})]}),u.jsxs("div",{className:"management-section",children:[u.jsx("h2",{children:"Namespace Lock"}),u.jsxs("div",{className:"lock-status",children:[u.jsx("div",{className:"lock-info",children:a.locked?u.jsxs(u.Fragment,{children:[u.jsx(tt,{status:"Locked"}),a.lockedBy&&u.jsxs("span",{className:"locked-info",children:["by ",a.lockedBy,a.lockedAt&&` at ${new Date(a.lockedAt).toLocaleString()}`]})]}):u.jsx(tt,{status:"Unlocked"})}),u.jsx(W,{variant:a.locked?"secondary":"danger",onClick:j,disabled:g.isPending,children:a.locked?"Unlock Namespace":"Lock Namespace"})]}),u.jsx("p",{className:"lock-helper",children:a.locked?"Locked namespace prevents all modifications except by the locker":"Lock namespace to prevent modifications by others"})]}),u.jsxs("div",{className:"management-section",children:[u.jsx("h2",{children:"Role Assignment"}),u.jsx("div",{className:"roles-list",children:nae.map(S=>u.jsxs("div",{className:"role-item",children:[u.jsxs("div",{className:"role-info",children:[u.jsx("div",{className:"role-name",children:S.name}),u.jsx("div",{className:"role-desc",children:S.description})]}),u.jsx(W,{variant:c.includes(S.id)?"secondary":"primary",size:"sm",onClick:()=>P(S.id),disabled:b.isPending,children:c.includes(S.id)?"Revoke":"Assign"})]},S.id))})]}),u.jsxs("div",{className:"management-section",children:[u.jsx("h2",{children:"Namespace Templates"}),u.jsx("div",{className:"templates-grid",children:NC.map(S=>u.jsxs("div",{className:"template-card",children:[u.jsxs("div",{className:"template-info",children:[u.jsx("div",{className:"template-name",children:S.name}),u.jsx("div",{className:"template-desc",children:S.description})]}),u.jsx(W,{variant:s===S.id?"secondary":"primary",size:"sm",onClick:k,disabled:x.isPending,children:s===S.id?"Applied":"Apply"})]},S.id))})]})]})]}),u.jsx("style",{children:`
        .namespace-management {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .management-section {
          background: white;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .management-section h2 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .quota-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .quota-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .quota-item label {
          font-weight: 500;
          color: #6b7280;
          font-size: 14px;
        }

        .current-value {
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }

        .current-value strong {
          color: #111827;
        }

        .form-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
          padding-top: 16px;
        }

        .lock-status {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .lock-info {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .locked-info {
          color: #6b7280;
          font-size: 13px;
        }

        .lock-helper {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .roles-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .role-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
        }

        .role-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .role-name {
          font-weight: 600;
          color: #111827;
        }

        .role-desc {
          font-size: 13px;
          color: #6b7280;
        }

        .templates-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .template-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px;
          background: #f9fafb;
          border: 2px solid transparent;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .template-card:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
        }

        .template-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .template-name {
          font-weight: 600;
          color: #111827;
        }

        .template-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.4;
        }

        .loading,
        .error {
          padding: 48px;
          text-align: center;
          font-size: 16px;
        }

        .error {
          color: #ef4444;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
        }
      `})]})}function iae(){const{user:e,logout:t}=yh(),[n,r]=v.useState(null),[i,a]=v.useState(!1),[o,s]=v.useState({name:""}),[l,c]=v.useState(!1),[d,f]=v.useState(null);v.useEffect(()=>{e&&p()},[e]);const p=async()=>{try{const x=await ce.get("/auth/profile");r(x.data),s({name:x.data.name})}catch{f({type:"error",text:"Failed to load profile"})}},h=async x=>{x.preventDefault(),c(!0),f(null);try{await ce.put("/auth/profile",{name:o.name}),r(b=>b?{...b,name:o.name}:null),a(!1),f({type:"success",text:"Profile updated successfully"})}catch{f({type:"error",text:"Failed to update profile"})}finally{c(!1)}},m=()=>{t()},y=x=>x?new Date(x).toLocaleString():"Never",g=x=>{switch(x){case"ADMIN":return"#dc2626";case"DEVELOPER":return"#2563eb";case"VIEWER":return"#059669";default:return"#6b7280"}};return!e||!n?u.jsx("div",{className:"user-profile loading",children:u.jsx("div",{className:"loading-spinner"})}):u.jsxs("div",{className:"user-profile",children:[u.jsxs("div",{className:"profile-header",children:[u.jsx("div",{className:"profile-avatar",children:n.avatar?u.jsx("img",{src:n.avatar,alt:n.name}):u.jsx("div",{className:"avatar-placeholder",children:n.name.charAt(0).toUpperCase()})}),u.jsxs("div",{className:"profile-info",children:[u.jsx("h1",{children:n.name}),u.jsx("p",{className:"profile-email",children:n.email}),u.jsx("div",{className:"profile-roles",children:e.roles.map(x=>u.jsx("span",{className:"role-badge",style:{backgroundColor:g(x)},children:x},x))})]})]}),u.jsxs("div",{className:"profile-sections",children:[u.jsxs("section",{className:"profile-section",children:[u.jsx("h2",{children:"Account Information"}),u.jsxs("div",{className:"info-grid",children:[u.jsxs("div",{className:"info-item",children:[u.jsx("label",{children:"User ID"}),u.jsx("span",{children:n.id})]}),u.jsxs("div",{className:"info-item",children:[u.jsx("label",{children:"Email"}),u.jsx("span",{children:n.email})]}),u.jsxs("div",{className:"info-item",children:[u.jsx("label",{children:"Account Created"}),u.jsx("span",{children:y(n.createdAt)})]}),u.jsxs("div",{className:"info-item",children:[u.jsx("label",{children:"Last Login"}),u.jsx("span",{children:y(n.lastLoginAt)})]})]})]}),u.jsxs("section",{className:"profile-section",children:[u.jsxs("div",{className:"section-header",children:[u.jsx("h2",{children:"Display Name"}),!i&&u.jsx("button",{className:"edit-button",onClick:()=>a(!0),type:"button",children:"Edit"})]}),i?u.jsxs("form",{onSubmit:h,className:"edit-form",children:[u.jsx("input",{type:"text",value:o.name,onChange:x=>s({name:x.target.value}),placeholder:"Display Name",required:!0,disabled:l}),u.jsxs("div",{className:"form-actions",children:[u.jsx("button",{type:"button",onClick:()=>a(!1),disabled:l,className:"cancel-button",children:"Cancel"}),u.jsx("button",{type:"submit",disabled:l,className:"save-button",children:l?"Saving...":"Save"})]})]}):u.jsx("p",{className:"display-name",children:n.name})]}),u.jsxs("section",{className:"profile-section",children:[u.jsx("h2",{children:"Permissions"}),u.jsx("div",{className:"permissions-list",children:e.permissions.map((x,b)=>u.jsxs("div",{className:"permission-group",children:[u.jsx("h3",{children:x.resourceType}),u.jsx("div",{className:"permission-actions",children:x.permissions.map(w=>u.jsx("span",{className:"permission-tag",children:w},w))}),x.namespaces&&u.jsxs("div",{className:"permission-namespaces",children:[u.jsx("strong",{children:"Namespaces:"})," ",x.namespaces.join(", ")]})]},b))})]}),u.jsxs("section",{className:"profile-section danger-zone",children:[u.jsx("h2",{children:"Danger Zone"}),u.jsx("p",{className:"danger-warning",children:"These actions are irreversible. Please be certain."}),u.jsx("button",{onClick:m,className:"logout-button",type:"button",children:"Log Out"})]})]}),d&&u.jsx("div",{className:`message message-${d.type}`,children:d.text}),u.jsx("style",{children:`
        .user-profile {
          max-width: 900px;
          margin: 0 auto;
          padding: 32px;
        }

        .user-profile.loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5e7eb;
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 32px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .profile-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #e5e7eb;
          flex-shrink: 0;
        }

        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          font-weight: 700;
          color: #6b7280;
          background: #f3f4f6;
        }

        .profile-info {
          flex: 1;
        }

        .profile-info h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: #111827;
        }

        .profile-email {
          font-size: 15px;
          color: #6b7280;
          margin: 0 0 12px 0;
        }

        .profile-roles {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .role-badge {
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }

        .profile-sections {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .profile-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .profile-section h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: #111827;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-item label {
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
        }

        .info-item span {
          font-size: 15px;
          color: #111827;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .edit-button {
          padding: 6px 16px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .edit-button:hover {
          background: #2563eb;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .edit-form input {
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 15px;
        }

        .edit-form input:disabled {
          background: #f9fafb;
          cursor: not-allowed;
        }

        .form-actions {
          display: flex;
          gap: 12px;
        }

        .cancel-button,
        .save-button {
          padding: 8px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .cancel-button {
          background: #e5e7eb;
          color: #374151;
        }

        .cancel-button:hover:not(:disabled) {
          background: #d1d5db;
        }

        .save-button {
          background: #3b82f6;
          color: white;
        }

        .save-button:hover:not(:disabled) {
          background: #2563eb;
        }

        .cancel-button:disabled,
        .save-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .display-name {
          font-size: 15px;
          color: #374151;
        }

        .permissions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .permission-group {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .permission-group h3 {
          font-size: 15px;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #111827;
        }

        .permission-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .permission-tag {
          padding: 4px 10px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
        }

        .permission-namespaces {
          font-size: 13px;
          color: #6b7280;
        }

        .danger-zone {
          border: 2px solid #fecaca;
        }

        .danger-warning {
          color: #dc2626;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .logout-button {
          width: 100%;
          padding: 12px 20px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .logout-button:hover {
          background: #b91c1c;
        }

        .message {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 16px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          font-size: 14px;
          font-weight: 500;
          z-index: 1000;
        }

        .message-success {
          background: #10b981;
          color: white;
        }

        .message-error {
          background: #ef4444;
          color: white;
        }
      `})]})}async function aae(e){let t=no(e||{});e!=null&&e.namespace&&(t+=`&namespace=${encodeURIComponent(e.namespace)}`),e!=null&&e.search&&(t+=`&search=${encodeURIComponent(e.search)}`);const n=await ce.get(`/api/v1/pods?${t}`);return ye(n.data,gi(Z_))}async function oae(e,t){const n=await ce.get(`/api/v1/pods/${encodeURIComponent(e)}/${encodeURIComponent(t)}`);return ye(n.data,Z_)}async function sae(e,t){const n=await ce.delete(`/api/v1/pods/${encodeURIComponent(e)}/${encodeURIComponent(t)}`);ye(n.data,mi())}async function lae(e){const t=new URLSearchParams;e.container&&t.set("container",e.container),e.tailLines&&t.set("tailLines",e.tailLines.toString()),e.sinceSeconds&&t.set("sinceSeconds",e.sinceSeconds.toString()),e.follow&&t.set("follow","true");const n=await ce.get(`/api/v1/pods/${encodeURIComponent(e.namespace)}/${encodeURIComponent(e.podName)}/logs?${t.toString()}`);return ye(n.data,n7)}async function cae(e,t){const n=await ce.get(`/api/v1/pods/${encodeURIComponent(e)}/${encodeURIComponent(t)}/yaml`);return ye(n.data,J({name:A(),kind:A(),namespace:A().optional(),yaml:A()}))}async function uae(e,t){const n=await ce.get(`/api/v1/pods/${encodeURIComponent(e)}/${encodeURIComponent(t)}/events`);return ye(n.data,jt(Qf()))}function dae(){const e=ct(),{showToast:t}=Ct(),[n,r]=v.useState({search:"",namespace:"",status:""}),[i,a]=v.useState(null),[o,s]=v.useState({key:"name",order:"asc"}),{data:l,isLoading:c,error:d,refetch:f}=Ae(["pods",n,o],()=>aae({search:n.search||void 0,namespace:n.namespace||void 0})),p=Ne(async b=>{await sae(b.namespace,b.name)},{onSuccess:()=>{t({message:"Pod deleted successfully",type:"success"}),f(),a(null)}}),h=(b,w)=>{s({key:b,order:w})},m=b=>{e(`/pods/${b.namespace}/${b.name}`)},y=async b=>{await p.mutateAsync({namespace:b.namespace,name:b.name})},g=b=>{r(w=>({...w,...b}))},x=[{key:"name",header:"Name",sortable:!0,render:(b,w)=>u.jsx("a",{href:`/pods/${w.namespace}/${w.name}`,className:"resource-link",onClick:j=>{j.stopPropagation(),e(`/pods/${w.namespace}/${w.name}`)},children:u.jsx("span",{children:b})})},{key:"namespace",header:"Namespace",sortable:!0},{key:"status",header:"Status",sortable:!0,render:(b,w)=>typeof b=="string"?u.jsx(tt,{status:b}):u.jsx("span",{children:"-"})},{key:"nodeName",header:"Node",sortable:!0,render:(b,w)=>typeof b=="string"?u.jsx("span",{children:b||"-"}):u.jsx("span",{children:"-"})},{key:"podIP",header:"IP",sortable:!0,render:(b,w)=>typeof b=="string"?u.jsx("span",{children:b||"-"}):u.jsx("span",{children:"-"})},{key:"containers",header:"Containers",sortable:!0,render:(b,w)=>Array.isArray(b)&&u.jsx("div",{className:"containers-cell",children:b.map(j=>u.jsxs("span",{className:"container-badge",children:[j.name," ",j.ready?"✓":"✗"]},j.name))})},{key:"startTime",header:"Age",sortable:!0,render:(b,w)=>{if(typeof b!="string"||!b)return u.jsx("span",{children:"-"});const j=Math.floor((Date.now()-new Date(b).getTime())/1e3);return j<60?u.jsx("span",{children:`${j}s`}):j<3600?u.jsx("span",{children:`${Math.floor(j/60)}m`}):u.jsx("span",{children:`${Math.floor(j/3600)}h`})}},{key:"actions",header:"Actions",render:(b,w)=>u.jsxs("div",{className:"actions-cell",children:[u.jsx("button",{className:"action-button",onClick:j=>{j.stopPropagation(),e(`/pods/${w.namespace}/${w.name}`)},children:"View"}),u.jsx("button",{className:"action-button danger",onClick:j=>{j.stopPropagation(),a(w)},children:"Delete"})]})}];return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"pod-list",children:[u.jsx("div",{className:"page-header",children:u.jsx("h1",{children:"Pods"})}),u.jsxs("div",{className:"filters-bar",children:[u.jsx("input",{className:"search-input",placeholder:"Search by name...",value:n.search,onChange:b=>g({search:b.target.value})}),u.jsx("input",{className:"search-input",placeholder:"Filter by namespace...",value:n.namespace,onChange:b=>g({namespace:b.target.value})}),u.jsxs("select",{className:"filter-select",value:n.status,onChange:b=>g({status:b.target.value}),children:[u.jsx("option",{value:"",children:"All Statuses"}),u.jsx("option",{value:"Running",children:"Running"}),u.jsx("option",{value:"Pending",children:"Pending"}),u.jsx("option",{value:"Failed",children:"Failed"}),u.jsx("option",{value:"Succeeded",children:"Succeeded"})]}),u.jsx("button",{className:"clear-button",onClick:()=>g({search:"",namespace:"",status:""}),children:"Clear"})]}),u.jsx(Bn,{}),u.jsx(Cn,{data:(l==null?void 0:l.items)||[],columns:x,onSort:h,defaultSort:o,onRowClick:m,loading:c,emptyMessage:"No pods found matching your filters"}),i&&u.jsx(vi,{title:"Delete Pod",message:`Are you sure you want to delete pod "${i.name}" in namespace "${i.namespace}"? This action cannot be undone.`,onConfirm:()=>y(i),onCancel:()=>a(null),confirmText:"Delete",variant:"danger"})]}),u.jsx("style",{children:`
        .pod-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .filters-bar {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .search-input {
          flex: 1;
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          min-width: 200px;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
        }

        .filter-select {
          padding: 10px 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          min-width: 150px;
        }

        .filter-select:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .clear-button {
          padding: 10px 20px;
          background: #6b7280;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .clear-button:hover {
          background: #4b5563;
        }

        .resource-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .containers-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .container-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #1e40af;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-button {
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .action-button:hover {
          background: #2563eb;
        }

        .action-button.danger {
          background: #dc2626;
        }

        .action-button.danger:hover {
          background: #b91c1c;
        }
      `})]})}function fae(){const{namespace:e,name:t}=Br(),[n,r]=v.useState("overview"),[i,a]=v.useState(null),[o,s]=v.useState(!1),{data:l,isLoading:c,error:d}=Ae(["pod",e,t],()=>e&&t?oae(e,t):Promise.reject(new Error("Missing params"))),{data:f,isLoading:p}=Ae(["pod-logs",e,t,i],()=>e&&t&&i?lae({namespace:e,podName:t,container:i,tailLines:100}):Promise.reject(new Error("Missing params")),{enabled:n==="logs"&&!!i}),{data:h}=Ae(["pod-events",e,t],()=>e&&t?uae(e,t):Promise.reject(new Error("Missing params"))),{data:m}=Ae(["pod-yaml",e,t],()=>e&&t?cae(e,t):Promise.reject(new Error("Missing params")),{enabled:o});if(d)return u.jsx("div",{className:"pod-details",children:u.jsxs("div",{className:"error-message",children:["Error loading pod: ",d.message]})});if(c)return u.jsx("div",{className:"pod-details",children:u.jsx(qt,{})});if(!l)return u.jsx("div",{className:"pod-details",children:"Pod not found"});const y=[{key:"lastTimestamp",header:"Time",render:g=>u.jsx("span",{children:new Date(g*1e3).toLocaleString()})},{key:"type",header:"Type"},{key:"reason",header:"Reason"},{key:"message",header:"Message"}];return u.jsxs("div",{className:"pod-details",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsxs("h1",{children:["Pod: ",l.name]}),u.jsx("span",{className:"namespace-badge",children:l.namespace})]}),u.jsxs("div",{className:"header-actions",children:[u.jsx(tt,{status:l.status}),u.jsx(W,{variant:"secondary",onClick:()=>s(!0),children:"View YAML"})]})]}),u.jsx("div",{className:"tabs",children:["overview","containers","logs","events","yaml"].map(g=>u.jsx("button",{className:`tab ${n===g?"active":""}`,onClick:()=>r(g),children:g.charAt(0).toUpperCase()+g.slice(1)},g))}),u.jsxs("div",{className:"tab-content",children:[n==="overview"&&u.jsxs("div",{className:"overview-section",children:[u.jsxs("div",{className:"info-grid",children:[u.jsxs("div",{className:"info-card",children:[u.jsx("h3",{children:"Status"}),u.jsx(tt,{status:l.status})]}),u.jsxs("div",{className:"info-card",children:[u.jsx("h3",{children:"Node"}),u.jsx("p",{children:l.nodeName||"-"})]}),u.jsxs("div",{className:"info-card",children:[u.jsx("h3",{children:"IP Address"}),u.jsx("p",{children:l.podIP||"-"})]}),u.jsxs("div",{className:"info-card",children:[u.jsx("h3",{children:"Start Time"}),u.jsx("p",{children:l.startTime||"-"})]})]}),u.jsxs("div",{className:"conditions-section",children:[u.jsx("h3",{children:"Conditions"}),l.conditions.length>0?u.jsxs("table",{className:"conditions-table",children:[u.jsx("thead",{children:u.jsxs("tr",{children:[u.jsx("th",{children:"Type"}),u.jsx("th",{children:"Status"}),u.jsx("th",{children:"Reason"}),u.jsx("th",{children:"Message"})]})}),u.jsx("tbody",{children:l.conditions.map((g,x)=>u.jsxs("tr",{children:[u.jsx("td",{children:g.type}),u.jsx("td",{children:u.jsx(tt,{status:g.status==="True"?"Running":"Pending"})}),u.jsx("td",{children:g.reason||"-"}),u.jsx("td",{children:g.message||"-"})]},x))})]}):u.jsx("p",{children:"No conditions available"})]})]}),n==="containers"&&u.jsx("div",{className:"containers-section",children:l.containers.map(g=>u.jsxs("div",{className:"container-card",children:[u.jsxs("h3",{children:[g.name," ",u.jsx(tt,{status:g.ready?"Running":"Pending"})]}),u.jsxs("div",{className:"container-details",children:[u.jsxs("p",{children:[u.jsx("strong",{children:"Image:"})," ",g.image]}),u.jsxs("p",{children:[u.jsx("strong",{children:"Ready:"})," ",g.ready?"Yes":"No"]}),u.jsxs("p",{children:[u.jsx("strong",{children:"Restarts:"})," ",g.restartCount]}),u.jsxs("p",{children:[u.jsx("strong",{children:"State:"})," ",g.state||"-"]})]})]},g.name))}),n==="logs"&&u.jsxs("div",{className:"logs-section",children:[u.jsxs("div",{className:"logs-header",children:[u.jsx("h3",{children:"Logs"}),u.jsxs("select",{value:i||"",onChange:g=>a(g.target.value),className:"container-selector",children:[u.jsx("option",{value:"",children:"Select container..."}),l.containers.map(g=>u.jsx("option",{value:g.name,children:g.name},g.name))]})]}),p?u.jsx(qt,{}):f?u.jsx("pre",{className:"logs-content",children:f.entries.map(g=>g.message).join(`
`)}):u.jsx("p",{children:"Select a container to view logs"})]}),n==="events"&&u.jsxs("div",{className:"events-section",children:[u.jsx(Bn,{}),u.jsx(Cn,{data:h||[],columns:y,emptyMessage:"No events found"})]}),n==="yaml"&&u.jsx("div",{className:"yaml-section",children:m?u.jsx("pre",{className:"yaml-content",children:m.yaml}):u.jsx(qt,{})})]}),u.jsx(hr,{isOpen:o,onClose:()=>s(!1),title:`Pod YAML: ${l.name}`,size:"xl",children:m?u.jsx("pre",{className:"yaml-modal-content",children:m.yaml}):u.jsx(qt,{})}),u.jsx("style",{children:`
        .pod-details {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .namespace-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .tabs {
          display: flex;
          gap: 4px;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 24px;
        }

        .tab {
          padding: 12px 20px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab:hover {
          color: #374151;
          background: #f9fafb;
        }

        .tab.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
          background: #eff6ff;
        }

        .tab-content {
          min-height: 400px;
        }

        .overview-section, .containers-section, .logs-section, .events-section, .yaml-section {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .info-card {
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .info-card h3 {
          margin: 0 0 8px 0;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
        }

        .info-card p {
          margin: 0;
          font-size: 16px;
          font-weight: 500;
          color: #111827;
        }

        .conditions-section, .containers-section {
          margin-top: 24px;
        }

        .conditions-section h3, .containers-section h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .conditions-table {
          width: 100%;
          border-collapse: collapse;
        }

        .conditions-table th,
        .conditions-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .conditions-table th {
          background: #f9fafb;
          font-weight: 600;
          font-size: 13px;
          color: #374151;
        }

        .container-card {
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .container-card h3 {
          margin: 0 0 12px 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .container-details p {
          margin: 4px 0;
          font-size: 14px;
          color: #374151;
        }

        .logs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .container-selector {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          background: white;
          min-width: 200px;
        }

        .logs-content, .yaml-content {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.5;
          max-height: 500px;
          overflow-y: auto;
        }

        .yaml-modal-content {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.5;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `})]})}async function pae(e){let t=no(e||{});e!=null&&e.namespace&&(t+=`&namespace=${encodeURIComponent(e.namespace)}`),e!=null&&e.search&&(t+=`&search=${encodeURIComponent(e.search)}`);const n=await ce.get(`/api/v1/deployments?${t}`);return ye(n.data,gi(q_))}async function Gu(e,t){const n=await ce.get(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}`);return ye(n.data,q_)}async function bD(e,t,n){const r=await ce.put(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/scale`,{replicas:n});return ye(r.data,J({message:A()}))}async function wD(e,t){const n=await ce.post(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/restart`);return ye(n.data,J({message:A()}))}async function hae(e,t,n){const r=await ce.put(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/image`,{image:n});return ye(r.data,J({message:A()}))}async function mae(e,t){const n=await ce.delete(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}`);ye(n.data,mi())}async function gae(e,t){const n=await ce.get(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/yaml`);return ye(n.data,J({name:A(),kind:A(),namespace:A().optional(),yaml:A()}))}function vae(){const e=ct(),{showToast:t}=Ct(),[n,r]=v.useState({search:"",namespace:""}),[i,a]=v.useState(null),[o,s]=v.useState(null),[l,c]=v.useState(1),[d,f]=v.useState({key:"name",order:"asc"}),{data:p,isLoading:h,error:m,refetch:y}=Ae(["deployments",n,d],()=>pae({search:n.search||void 0,namespace:n.namespace||void 0})),g=Ne(async _=>{await mae(_.namespace,_.name)},{onSuccess:()=>{t({message:"Deployment deleted successfully",type:"success"}),y(),a(null)}}),x=Ne(async _=>{await bD(_.namespace,_.name,_.replicas)},{onSuccess:()=>{t({message:"Deployment scaled successfully",type:"success"}),y(),s(null)}}),b=Ne(async _=>{await wD(_.namespace,_.name)},{onSuccess:()=>{t({message:"Deployment restarted successfully",type:"success"}),y()}}),w=(_,M)=>{f({key:_,order:M})},j=_=>{e(`/deployments/${_.namespace}/${_.name}`)},k=async _=>{await g.mutateAsync({namespace:_.namespace,name:_.name})},P=async()=>{o&&await x.mutateAsync({namespace:o.namespace,name:o.name,replicas:l})},S=async _=>{await b.mutateAsync({namespace:_.namespace,name:_.name})},C=_=>{r(M=>({...M,..._}))},N=[{key:"name",header:"Name",sortable:!0,render:(_,M)=>u.jsx("a",{href:`/deployments/${M.namespace}/${M.name}`,className:"resource-link",onClick:R=>{R.stopPropagation(),e(`/deployments/${M.namespace}/${M.name}`)},children:_})},{key:"namespace",header:"Namespace",sortable:!0},{key:"replicas",header:"Replicas",sortable:!0,render:(_,M)=>u.jsx("span",{children:`${M.readyReplicas}/${M.replicas}`})},{key:"updatedReplicas",header:"Updated",sortable:!0},{key:"availableReplicas",header:"Available",sortable:!0},{key:"strategy",header:"Strategy",sortable:!0,render:_=>u.jsx("span",{children:_||"RollingUpdate"})},{key:"actions",header:"Actions",render:(_,M)=>u.jsxs("div",{className:"actions-cell",children:[u.jsx("button",{className:"action-button",onClick:R=>{R.stopPropagation(),S(M)},disabled:b.isPending,children:"Restart"}),u.jsx("button",{className:"action-button",onClick:R=>{R.stopPropagation(),s(M),c(M.replicas)},children:"Scale"}),u.jsx("button",{className:"action-button danger",onClick:R=>{R.stopPropagation(),a(M)},children:"Delete"})]})}];return m?u.jsx("div",{className:"deployment-list",children:u.jsxs("div",{className:"error-message",children:["Error loading deployments: ",m.message]})}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"deployment-list",children:[u.jsx("div",{className:"page-header",children:u.jsx("h1",{children:"Deployments"})}),u.jsxs("div",{className:"filters-bar",children:[u.jsx(ge,{label:"Search",placeholder:"Search by name...",fullWidth:!0,value:n.search,onChange:_=>C({search:_.target.value})}),u.jsx(ge,{label:"Namespace",placeholder:"Filter by namespace...",fullWidth:!0,value:n.namespace,onChange:_=>C({namespace:_.target.value})}),u.jsx(W,{variant:"secondary",onClick:()=>C({search:"",namespace:""}),children:"Clear"})]}),u.jsx(Bn,{}),u.jsx(Cn,{data:(p==null?void 0:p.items)||[],columns:N,onSort:w,defaultSort:d,onRowClick:j,loading:h,emptyMessage:"No deployments found matching your filters"}),i&&u.jsx(vi,{title:"Delete Deployment",message:`Are you sure you want to delete deployment "${i.name}" in namespace "${i.namespace}"? This action cannot be undone.`,onConfirm:()=>k(i),onCancel:()=>a(null),confirmText:"Delete",variant:"danger"}),o&&u.jsx(hr,{isOpen:!!o,onClose:()=>s(null),title:`Scale Deployment: ${o.name}`,size:"sm",children:u.jsxs("div",{className:"scale-modal",children:[u.jsx("label",{children:"Number of replicas:"}),u.jsx(ge,{type:"number",min:"0",value:l,onChange:_=>c(Number(_.target.value)),fullWidth:!0}),u.jsxs("div",{className:"modal-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>s(null),children:"Cancel"}),u.jsx(W,{variant:"primary",onClick:P,loading:x.isPending,children:"Scale"})]})]})})]}),u.jsx("style",{children:`
        .deployment-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .filters-bar {
          display: flex;
          gap: 12px;
          align-items: flex-end;
          margin-bottom: 20px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .filters-bar label {
          margin-bottom: 0;
        }

        .resource-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-button {
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .action-button:hover:not(:disabled) {
          background: #2563eb;
        }

        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .action-button.danger {
          background: #dc2626;
        }

        .action-button.danger:hover:not(:disabled) {
          background: #b91c1c;
        }

        .scale-modal {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .scale-modal label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `})]})}async function yae(e){const t=await ce.post("/api/v1/workloads",e);return ye(t.data,J({name:A(),kind:A(),namespace:A(),message:A()}))}async function xae(e,t){const n=await ce.post(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/pause`);return ye(n.data,J({message:A()}))}async function bae(e,t){const n=await ce.post(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/resume`);return ye(n.data,J({message:A()}))}async function wae(e,t,n){const r=await ce.put(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/strategy`,n);return ye(r.data,J({message:A()}))}async function jae(e,t){const n=await ce.get(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/revisions`);return ye(n.data,jt(J({revision:ne(),annotations:Rn(A(),A())})))}async function Sae(e,t,n){const r=await ce.post(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/rollback`,{revision:n});return ye(r.data,J({message:A()}))}async function kae(e,t,n,r){const i=await ce.put(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/containers/${encodeURIComponent(n)}/resources`,r);return ye(i.data,J({message:A()}))}async function Pae(e,t,n,r){const i=await ce.put(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/containers/${encodeURIComponent(n)}/env`,r);return ye(i.data,J({message:A()}))}async function Cae(e,t,n){const r=await ce.post(`/api/v1/deployments/${encodeURIComponent(e)}/${encodeURIComponent(t)}/clone`,n);return ye(r.data,J({message:A(),name:A(),namespace:A()}))}async function Oae(e){const t=new URLSearchParams;e!=null&&e.page&&t.append("page",e.page.toString()),e!=null&&e.limit&&t.append("limit",e.limit.toString()),e!=null&&e.namespace&&t.append("namespace",e.namespace),e!=null&&e.search&&t.append("search",e.search);const n=await ce.get(`/api/v1/jobs?${t.toString()}`);return ye(n.data,gi(JB))}async function Eae(e){const t=new URLSearchParams;e!=null&&e.page&&t.append("page",e.page.toString()),e!=null&&e.limit&&t.append("limit",e.limit.toString()),e!=null&&e.namespace&&t.append("namespace",e.namespace),e!=null&&e.search&&t.append("search",e.search);const n=await ce.get(`/api/v1/cronjobs?${t.toString()}`);return ye(n.data,gi(e7))}async function Nae(e){const t=new URLSearchParams;e!=null&&e.page&&t.append("page",e.page.toString()),e!=null&&e.limit&&t.append("limit",e.limit.toString()),e!=null&&e.namespace&&t.append("namespace",e.namespace);const n=await ce.get(`/api/v1/poddisruptionbudgets?${t.toString()}`);return ye(n.data,J({items:jt(J({name:A(),namespace:A(),minAvailable:ne(),maxUnavailable:ne(),currentHealthy:ne(),desiredHealthy:ne()})),total:ne()}))}async function _ae(e,t,n,r,i){const a=await ce.post("/api/v1/poddisruptionbudgets",{namespace:e,name:t,minAvailable:n,maxUnavailable:r,selector:i});return ye(a.data,J({message:A()}))}async function Aae(e,t){const n=await ce.delete(`/api/v1/poddisruptionbudgets/${encodeURIComponent(e)}/${encodeURIComponent(t)}`);return ye(n.data,J({message:A()}))}function Tae(){var re,Oe,we;const{namespace:e,name:t}=Br(),n=ct(),{showToast:r}=Ct(),[i,a]=v.useState("overview"),[o,s]=v.useState(!1),[l,c]=v.useState(!1),[d,f]=v.useState(!1),[p,h]=v.useState(!1),[m,y]=v.useState(1),[g,x]=v.useState(""),[b,w]=v.useState(!1),{data:j,isLoading:k,error:P,refetch:S}=Ae(["deployment",e,t],()=>e&&t?Gu(e,t):Promise.reject(new Error("Missing params"))),{data:C}=Ae(["deployment-yaml",e,t],()=>e&&t?gae(e,t):Promise.reject(new Error("Missing params")),{enabled:b}),N=Ne(async ie=>{e&&t&&await bD(e,t,ie)},{onSuccess:()=>{r({message:"Deployment scaled successfully",type:"success"}),S(),s(!1)}}),_=Ne(async()=>{if(!e||!t)return Promise.resolve();await wD(e,t)},{onSuccess:()=>{r({message:"Deployment restarted successfully",type:"success"}),S(),c(!1)}}),M=Ne(async ie=>{if(e&&t)await hae(e,t,ie);else return Promise.resolve()},{onSuccess:()=>{r({message:"Deployment image updated successfully",type:"success"}),S(),f(!1)}}),R=Ne(async ie=>{if(!e||!t)return Promise.resolve();await xae(e,t)},{onSuccess:()=>{r({message:"Deployment paused successfully",type:"success"}),S(),h(!1)},onError:ie=>{r({message:`Failed to pause deployment: ${ie.message}`,type:"error"})}}),G=Ne(async ie=>{if(!e||!t)return Promise.resolve();await bae(e,t)},{onSuccess:()=>{r({message:"Deployment resumed successfully",type:"success"}),S(),h(!1)},onError:ie=>{r({message:`Failed to resume deployment: ${ie.message}`,type:"error"})}});if(P)return u.jsx("div",{className:"deployment-details",children:u.jsxs("div",{className:"error-message",children:["Error loading deployment: ",P.message]})});if(k)return u.jsx("div",{className:"deployment-details",children:u.jsx(qt,{})});if(!j)return u.jsx("div",{className:"deployment-details",children:"Deployment not found"});const V=(re=j.template)!=null&&re.containers&&((Oe=j.template)==null?void 0:Oe.containers.length)>0?[{type:"Available",status:j.availableReplicas>0?"True":"False",reason:j.availableReplicas>0?"MinimumReplicasAvailable":"MinimumReplicasUnavailable"},{type:"Progressing",status:j.updatedReplicas===j.replicas?"True":"False",reason:"ReplicaSetUpdated"}]:[],ee=[{key:"type",header:"Type"},{key:"status",header:"Status",render:(ie,We)=>u.jsx(tt,{status:ie==="True"?"Running":"Pending"})},{key:"reason",header:"Reason"},{key:"message",header:"Message",render:(ie,We)=>u.jsx("span",{children:typeof ie=="string"?ie||"-":String(ie)})}],Q=()=>{y(j.replicas),s(!0)},te=()=>{c(!0)},$=()=>{var ie;(ie=j.template)!=null&&ie.containers[0]&&(x(j.template.containers[0].image),f(!0))},B=()=>{N.mutate(m)},L=()=>{_.mutate(void 0)},Y=()=>{M.mutate(g)};return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"deployment-details",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsxs("h1",{children:["Deployment: ",j.name]}),u.jsx("span",{className:"namespace-badge",children:j.namespace})]}),u.jsxs("div",{className:"header-actions",children:[u.jsx(W,{variant:"secondary",onClick:Q,children:"Scale"}),u.jsx(W,{variant:"secondary",onClick:te,children:"Restart"}),u.jsx(W,{variant:"secondary",onClick:$,children:"Update Image"}),u.jsx(W,{variant:"secondary",onClick:()=>h(!0),children:"Pause/Resume"}),u.jsx(W,{variant:"secondary",onClick:()=>n(`/deployments/${e}/${t}/rollback`),children:"Rollback"}),u.jsx(W,{variant:"secondary",onClick:()=>n(`/deployments/${e}/${t}/strategy`),children:"Strategy"}),u.jsx(W,{variant:"secondary",onClick:()=>n(`/deployments/${e}/${t}/resources`),children:"Resources"}),u.jsx(W,{variant:"secondary",onClick:()=>n(`/deployments/${e}/${t}/env`),children:"Env Vars"}),u.jsx(W,{variant:"secondary",onClick:()=>n(`/deployments/${e}/${t}/clone`),children:"Clone"}),u.jsx(W,{variant:"secondary",onClick:()=>w(!0),children:"View YAML"})]})]}),u.jsx("div",{className:"tabs",children:["overview","conditions","yaml"].map(ie=>u.jsx("button",{className:`tab ${i===ie?"active":""}`,onClick:()=>a(ie),children:ie.charAt(0).toUpperCase()+ie.slice(1)},ie))}),u.jsxs("div",{className:"tab-content",children:[i==="overview"&&u.jsxs("div",{className:"overview-section",children:[u.jsxs("div",{className:"info-grid",children:[u.jsxs("div",{className:"info-card",children:[u.jsx("h3",{children:"Replicas"}),u.jsx("p",{children:j.replicas})]}),u.jsxs("div",{className:"info-card",children:[u.jsx("h3",{children:"Ready Replicas"}),u.jsx("p",{children:j.readyReplicas})]}),u.jsxs("div",{className:"info-card",children:[u.jsx("h3",{children:"Available Replicas"}),u.jsx("p",{children:j.availableReplicas})]}),u.jsxs("div",{className:"info-card",children:[u.jsx("h3",{children:"Updated Replicas"}),u.jsx("p",{children:j.updatedReplicas})]}),u.jsxs("div",{className:"info-card",children:[u.jsx("h3",{children:"Strategy"}),u.jsx("p",{children:j.strategy||"RollingUpdate"})]}),u.jsxs("div",{className:"info-card",children:[u.jsx("h3",{children:"Selector"}),u.jsx("p",{children:j.selector||"-"})]})]}),u.jsxs("div",{className:"containers-section",children:[u.jsx("h3",{children:"Containers"}),(we=j.template)==null?void 0:we.containers.map((ie,We)=>u.jsxs("div",{className:"container-card",children:[u.jsx("h4",{children:ie.name}),u.jsxs("p",{children:[u.jsx("strong",{children:"Image:"})," ",ie.image]}),u.jsxs("p",{children:[u.jsx("strong",{children:"Ready:"})," ",ie.ready?"Yes":"No"]}),u.jsxs("p",{children:[u.jsx("strong",{children:"Restarts:"})," ",ie.restartCount]})]},We))]})]}),i==="conditions"&&u.jsxs("div",{className:"conditions-section",children:[u.jsx(Bn,{}),u.jsx(Cn,{data:V,columns:ee,emptyMessage:"No conditions available"})]}),i==="yaml"&&u.jsx("div",{className:"yaml-section",children:C?u.jsx("pre",{className:"yaml-content",children:C.yaml}):u.jsx(qt,{})})]}),u.jsx(hr,{isOpen:o,onClose:()=>s(!1),title:`Scale Deployment: ${j.name}`,size:"sm",children:u.jsxs("div",{className:"modal-form",children:[u.jsx("label",{children:"Number of replicas:"}),u.jsx(ge,{type:"number",min:"0",value:m,onChange:ie=>y(Number(ie.target.value)),fullWidth:!0}),u.jsxs("div",{className:"modal-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>s(!1),children:"Cancel"}),u.jsx(W,{variant:"primary",onClick:B,loading:N.isPending,children:"Scale"})]})]})}),u.jsx(hr,{isOpen:l,onClose:()=>c(!1),title:`Restart Deployment: ${j.name}`,size:"sm",children:u.jsxs("div",{className:"modal-form",children:[u.jsx("p",{children:"Are you sure you want to restart this deployment? This will restart all pods."}),u.jsxs("div",{className:"modal-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>c(!1),children:"Cancel"}),u.jsx(W,{variant:"danger",onClick:L,loading:_.isPending,children:"Restart"})]})]})}),u.jsx(hr,{isOpen:d,onClose:()=>f(!1),title:`Update Image: ${j.name}`,size:"sm",children:u.jsxs("div",{className:"modal-form",children:[u.jsx("label",{children:"Container Image:"}),u.jsx(ge,{value:g,onChange:ie=>x(ie.target.value),placeholder:"e.g., nginx:latest",fullWidth:!0}),u.jsxs("div",{className:"modal-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>f(!1),children:"Cancel"}),u.jsx(W,{variant:"primary",onClick:Y,loading:M.isPending,children:"Update"})]})]})}),u.jsx(hr,{isOpen:b,onClose:()=>w(!1),title:`Deployment YAML: ${j.name}`,size:"xl",children:C?u.jsx("pre",{className:"yaml-modal-content",children:C.yaml}):u.jsx(qt,{})}),u.jsx(hr,{isOpen:p,onClose:()=>h(!1),title:`${j.replicas>0?"Pause":"Resume"} Deployment: ${j.name}`,size:"sm",children:u.jsxs("div",{className:"modal-form",children:[u.jsxs("p",{children:["Are you sure you want to ",j.replicas>0?"pause":"resume"," this deployment?"]}),u.jsxs("div",{className:"modal-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>h(!1),children:"Cancel"}),u.jsx(W,{variant:j.replicas>0?"danger":"primary",onClick:()=>j.replicas>0?R.mutate(void 0):G.mutate(void 0),loading:R.isPending||G.isPending,children:j.replicas>0?"Pause":"Resume"})]})]})})]}),u.jsx("style",{children:`
        .deployment-details {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .namespace-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .tabs {
          display: flex;
          gap: 4px;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 24px;
        }

        .tab {
          padding: 12px 20px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab:hover {
          color: #374151;
          background: #f9fafb;
        }

        .tab.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
          background: #eff6ff;
        }

        .tab-content {
          min-height: 400px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .info-card {
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .info-card h3 {
          margin: 0 0 8px 0;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
        }

        .info-card p {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .containers-section, .conditions-section, .yaml-section {
          margin-top: 24px;
        }

        .containers-section h3, .conditions-section h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .container-card {
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .container-card h4 {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .container-card p {
          margin: 4px 0;
          font-size: 14px;
          color: #374151;
        }

        .yaml-content {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.5;
          max-height: 500px;
          overflow-y: auto;
        }

        .yaml-modal-content {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.5;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-form label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .modal-form p {
          margin: 0;
          font-size: 14px;
          color: #374151;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `})]})}async function Rae(e){let t=no(e||{});e!=null&&e.namespace&&(t+=`&namespace=${encodeURIComponent(e.namespace)}`),e!=null&&e.search&&(t+=`&search=${encodeURIComponent(e.search)}`);const n=await ce.get(`/api/v1/services?${t}`);return ye(n.data,gi(qB))}async function Mae(e,t){const n=await ce.delete(`/api/v1/services/${encodeURIComponent(e)}/${encodeURIComponent(t)}`);ye(n.data,mi())}function Dae(){const{showToast:e}=Ct(),t=ct(),[n,r]=v.useState({search:"",namespace:""}),[i,a]=v.useState(null),[o,s]=v.useState({key:"name",order:"asc"}),{data:l,isLoading:c,error:d,refetch:f}=Ae(["services",n,o],()=>Rae({search:n.search||void 0,namespace:n.namespace||void 0})),p=Ne(async x=>{await Mae(x.namespace,x.name)},{onSuccess:()=>{e({message:"Service deleted successfully",type:"success"}),f(),a(null)}}),h=(x,b)=>{s({key:x,order:b})},m=x=>{t(`/services/${x.namespace}/${x.name}`)},y=async x=>{await p.mutateAsync({namespace:x.namespace,name:x.name})},g=[{key:"name",header:"Name",sortable:!0,render:(x,b)=>u.jsx("a",{href:`/services/${b.namespace}/${b.name}`,className:"resource-link",onClick:w=>{w.stopPropagation(),t(`/services/${b.namespace}/${b.name}`)},children:x})},{key:"namespace",header:"Namespace",sortable:!0},{key:"type",header:"Type",sortable:!0,render:(x,b)=>u.jsx(tt,{status:x})},{key:"clusterIPs",header:"Cluster IP",sortable:!0,render:(x,b)=>u.jsx("span",{children:x.join(", ")||"-"})},{key:"ports",header:"Ports",sortable:!0,render:(x,b)=>u.jsx("div",{className:"ports-cell",children:x.map((w,j)=>{var k;return u.jsxs("span",{className:"port-badge",children:[w.name?`${w.name}: `:"",w.port,"/",(k=w.protocol)==null?void 0:k.toLowerCase()]},j)})})},{key:"endpoints",header:"Endpoints",sortable:!0,render:(x,b)=>{const w=x,j=w.filter(P=>P.ready).length,k=w.length;return u.jsx("span",{children:`${j}/${k}`})}},{key:"actions",header:"Actions",render:(x,b)=>u.jsxs("div",{className:"actions-cell",children:[u.jsx("button",{className:"action-button",onClick:w=>{w.stopPropagation(),t(`/services/${b.namespace}/${b.name}`)},children:"View"}),u.jsx("button",{className:"action-button danger",onClick:w=>{w.stopPropagation(),a(b)},children:"Delete"})]})}];return d?u.jsx("div",{className:"service-list",children:u.jsxs("div",{className:"error-message",children:["Error loading services: ",d.message]})}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"service-list",children:[u.jsx("div",{className:"page-header",children:u.jsx("h1",{children:"Services"})}),u.jsx("div",{className:"filters-bar",children:u.jsx(W,{variant:"secondary",onClick:()=>r({search:"",namespace:""}),disabled:!n.search&&!n.namespace,children:"Clear"})}),u.jsx(Bn,{}),u.jsx(Cn,{data:(l==null?void 0:l.items)||[],columns:g,onSort:h,defaultSort:o,onRowClick:m,loading:c,emptyMessage:"No services found matching your filters"}),i&&u.jsx(vi,{title:"Delete Service",message:`Are you sure you want to delete service "${i.name}" in namespace "${i.namespace}"? This action cannot be undone.`,onConfirm:()=>y(i),onCancel:()=>a(null),confirmText:"Delete",variant:"danger"})]}),u.jsx("style",{children:`
        .service-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .filters-bar {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .resource-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .ports-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .port-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #1e40af;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-button {
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .action-button:hover {
          background: #2563eb;
        }

        .action-button.danger {
          background: #dc2626;
        }

        .action-button.danger:hover {
          background: #b91c1c;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `})]})}async function zae(e){let t=no(e||{});e!=null&&e.namespace&&(t+=`&namespace=${encodeURIComponent(e.namespace)}`),e!=null&&e.search&&(t+=`&search=${encodeURIComponent(e.search)}`);const n=await ce.get(`/api/v1/configmaps?${t}`);return ye(n.data,gi(YB))}async function Iae(e,t){const n=await ce.delete(`/api/v1/configmaps/${encodeURIComponent(e)}/${encodeURIComponent(t)}`);ye(n.data,mi())}function $ae(){const e=ct(),{showToast:t}=Ct(),[n,r]=v.useState({search:"",namespace:""}),[i,a]=v.useState(null),[o,s]=v.useState(null),[l,c]=v.useState({key:"name",order:"asc"}),{data:d,isLoading:f,error:p,refetch:h}=Ae(["configmaps",n,l],()=>zae({search:n.search||void 0,namespace:n.namespace||void 0})),m=Ne(async j=>{await Iae(j.namespace,j.name)},{onSuccess:()=>{t({message:"ConfigMap deleted successfully",type:"success"}),h(),a(null)}}),y=(j,k)=>{c({key:j,order:k})},g=j=>{e(`/configmaps/${j.namespace}/${j.name}`)},x=async j=>{await m.mutateAsync({namespace:j.namespace,name:j.name})},b=j=>{s(j)},w=[{key:"name",header:"Name",sortable:!0,render:(j,k)=>u.jsx("a",{href:`/configmaps/${k.namespace}/${k.name}`,className:"resource-link",onClick:P=>{P.stopPropagation(),e(`/configmaps/${k.namespace}/${k.name}`)},children:j})},{key:"namespace",header:"Namespace",sortable:!0},{key:"data",header:"Keys",sortable:!0,render:(j,k)=>{const P=j;if(!P||Object.keys(P).length===0)return"-";const S=Object.keys(P);return u.jsxs("div",{className:"keys-cell",children:[S.slice(0,3).map(C=>u.jsx("span",{className:"key-badge",children:C},C)),S.length>3&&u.jsxs("span",{className:"key-more",children:["+",S.length-3," more"]})]})}},{key:"creationTimestamp",header:"Created",sortable:!0,render:(j,k)=>u.jsx("span",{children:new Date(j).toLocaleDateString()})},{key:"actions",header:"Actions",render:(j,k)=>u.jsxs("div",{className:"actions-cell",children:[u.jsx("button",{className:"action-button",onClick:P=>{P.stopPropagation(),b(k)},children:"View Data"}),u.jsx("button",{className:"action-button danger",onClick:P=>{P.stopPropagation(),a(k)},children:"Delete"})]})}];return p?u.jsx("div",{className:"configmap-list",children:u.jsxs("div",{className:"error-message",children:["Error loading ConfigMaps: ",p.message]})}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"configmap-list",children:[u.jsx("div",{className:"page-header",children:u.jsx("h1",{children:"ConfigMaps"})}),u.jsx("div",{className:"filters-bar",children:u.jsx(W,{variant:"secondary",onClick:()=>r({search:"",namespace:""}),disabled:!n.search&&!n.namespace,children:"Clear"})}),u.jsx(Bn,{}),u.jsx(Cn,{data:(d==null?void 0:d.items)||[],columns:w,onSort:y,defaultSort:l,onRowClick:g,loading:f,emptyMessage:"No ConfigMaps found matching your filters"}),i&&u.jsx(vi,{title:"Delete ConfigMap",message:`Are you sure you want to delete ConfigMap "${i.name}" in namespace "${i.namespace}"? This action cannot be undone.`,onConfirm:()=>x(i),onCancel:()=>a(null),confirmText:"Delete",variant:"danger"}),o&&u.jsx("div",{className:"data-modal-overlay",onClick:()=>s(null),children:u.jsxs("div",{className:"data-modal",onClick:j=>j.stopPropagation(),children:[u.jsxs("div",{className:"data-modal-header",children:[u.jsxs("h3",{children:["ConfigMap: ",o.name]}),u.jsx("button",{className:"close-button",onClick:()=>s(null),children:"×"})]}),u.jsx("div",{className:"data-modal-content",children:o.data&&Object.keys(o.data).length>0?Object.entries(o.data).map(([j,k])=>u.jsxs("div",{className:"data-item",children:[u.jsx("div",{className:"data-key",children:j}),u.jsx("pre",{className:"data-value",children:k})]},j)):u.jsx("p",{className:"no-data",children:"No data in this ConfigMap"})})]})})]}),u.jsx("style",{children:`
        .configmap-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .filters-bar {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .resource-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .keys-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .key-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #1e40af;
        }

        .key-more {
          color: #6b7280;
          font-size: 11px;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-button {
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .action-button:hover {
          background: #2563eb;
        }

        .action-button.danger {
          background: #dc2626;
        }

        .action-button.danger:hover {
          background: #b91c1c;
        }

        .data-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
        }

        .data-modal {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 800px;
          width: 100%;
          max-height: 600px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .data-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .data-modal-header h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #111827;
        }

        .close-button {
          background: transparent;
          border: none;
          font-size: 28px;
          color: #6b7280;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }

        .close-button:hover {
          background: #f3f4f6;
        }

        .data-modal-content {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
        }

        .data-item {
          margin-bottom: 16px;
        }

        .data-key {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }

        .data-value {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 12px;
          margin: 0;
          font-size: 13px;
          color: #374151;
          overflow-x: auto;
        }

        .no-data {
          color: #6b7280;
          font-size: 14px;
          text-align: center;
          padding: 24px;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `})]})}async function Lae(e){let t=no(e||{});e!=null&&e.namespace&&(t+=`&namespace=${encodeURIComponent(e.namespace)}`),e!=null&&e.search&&(t+=`&search=${encodeURIComponent(e.search)}`);const n=await ce.get(`/api/v1/secrets?${t}`);return ye(n.data,gi(GB))}async function Fae(e,t){const n=await ce.delete(`/api/v1/secrets/${encodeURIComponent(e)}/${encodeURIComponent(t)}`);ye(n.data,mi())}function Uae(){const e=ct(),{showToast:t}=Ct(),[n,r]=v.useState({search:"",namespace:""}),[i,a]=v.useState(null),[o,s]=v.useState(!0),[l,c]=v.useState({key:"name",order:"asc"}),{data:d,isLoading:f,error:p,refetch:h}=Ae(["secrets",n,l],()=>Lae({search:n.search||void 0,namespace:n.namespace||void 0})),m=Ne(async w=>{await Fae(w.namespace,w.name)},{onSuccess:()=>{t({message:"Secret deleted successfully",type:"success"}),h(),a(null)}}),y=(w,j)=>{c({key:w,order:j})},g=w=>{e(`/secrets/${w.namespace}/${w.name}`)},x=async w=>{await m.mutateAsync({namespace:w.namespace,name:w.name})},b=[{key:"name",header:"Name",sortable:!0,render:(w,j)=>u.jsx("a",{href:`/secrets/${j.namespace}/${j.name}`,className:"resource-link",onClick:k=>{k.stopPropagation(),e(`/secrets/${j.namespace}/${j.name}`)},children:w})},{key:"namespace",header:"Namespace",sortable:!0},{key:"type",header:"Type",sortable:!0,render:(w,j)=>u.jsx(tt,{status:w})},{key:"data",header:"Keys",sortable:!0,render:(w,j)=>{const k=w;if(!k||Object.keys(k).length===0)return"-";const P=Object.keys(k);return u.jsxs("div",{className:"keys-cell",children:[P.slice(0,3).map(S=>u.jsx("span",{className:"key-badge",children:S},S)),P.length>3&&u.jsxs("span",{className:"key-more",children:["+",P.length-3," more"]})]})}},{key:"immutable",header:"Immutable",sortable:!0,render:(w,j)=>u.jsx("span",{children:w?"Yes":"No"})},{key:"creationTimestamp",header:"Created",sortable:!0,render:(w,j)=>u.jsx("span",{children:new Date(w).toLocaleDateString()})},{key:"actions",header:"Actions",render:(w,j)=>u.jsx("div",{className:"actions-cell",children:u.jsx("button",{className:"action-button danger",onClick:k=>{k.stopPropagation(),a(j)},children:"Delete"})})}];return p?u.jsx("div",{className:"secret-list",children:u.jsxs("div",{className:"error-message",children:["Error loading Secrets: ",p.message]})}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"secret-list",children:[u.jsxs("div",{className:"page-header",children:[u.jsx("h1",{children:"Secrets"}),u.jsx("div",{className:"header-actions",children:u.jsx(W,{variant:"secondary",onClick:()=>s(!o),children:o?"Unmask Values":"Mask Values"})})]}),u.jsx("div",{className:"filters-bar",children:u.jsx(W,{variant:"secondary",onClick:()=>r({search:"",namespace:""}),disabled:!n.search&&!n.namespace,children:"Clear"})}),u.jsx(Bn,{}),u.jsx(Cn,{data:(d==null?void 0:d.items)||[],columns:b,onSort:y,defaultSort:l,onRowClick:g,loading:f,emptyMessage:"No Secrets found matching your filters"}),i&&u.jsx(vi,{title:"Delete Secret",message:`Are you sure you want to delete Secret "${i.name}" in namespace "${i.namespace}"? This action cannot be undone.`,onConfirm:()=>x(i),onCancel:()=>a(null),confirmText:"Delete",variant:"danger"})]}),u.jsx("style",{children:`
        .secret-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .filters-bar {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .resource-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .keys-cell {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .key-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #fef3c7;
          border: 1px solid #fde68a;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #92400e;
        }

        .key-more {
          color: #6b7280;
          font-size: 11px;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-button {
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .action-button:hover {
          background: #2563eb;
        }

        .action-button.danger {
          background: #dc2626;
        }

        .action-button.danger:hover {
          background: #b91c1c;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `})]})}async function Bae(e){let t=no(e||{});e!=null&&e.namespace&&(t+=`&namespace=${encodeURIComponent(e.namespace)}`),e!=null&&e.search&&(t+=`&search=${encodeURIComponent(e.search)}`);const n=await ce.get(`/api/v1/statefulsets?${t}`);return ye(n.data,gi(QB))}async function Wae(e,t,n){const r=await ce.put(`/api/v1/statefulsets/${encodeURIComponent(e)}/${encodeURIComponent(t)}/scale`,{replicas:n});return ye(r.data,J({message:A()}))}async function Hae(e,t){const n=await ce.delete(`/api/v1/statefulsets/${encodeURIComponent(e)}/${encodeURIComponent(t)}`);ye(n.data,mi())}function Kae(){const{showToast:e}=Ct(),t=ct(),[n,r]=v.useState({search:"",namespace:""}),[i,a]=v.useState(null),[o,s]=v.useState(null),[l,c]=v.useState(1),[d,f]=v.useState({key:"name",order:"asc"}),{data:p,isLoading:h,error:m,refetch:y}=Ae(["statefulsets",n,d],()=>Bae({search:n.search||void 0,namespace:n.namespace||void 0})),g=Ne(async C=>{await Hae(C.namespace,C.name)},{onSuccess:()=>{e({message:"StatefulSet deleted successfully",type:"success"}),y(),a(null)}}),x=Ne(async C=>{await Wae(C.namespace,C.name,C.replicas)},{onSuccess:()=>{e({message:"StatefulSet scaled successfully",type:"success"}),y(),s(null)}}),b=(C,N)=>{f({key:C,order:N})},w=C=>{t(`/statefulsets/${C.namespace}/${C.name}`)},j=async C=>{await g.mutateAsync({namespace:C.namespace,name:C.name})},k=()=>{o&&x.mutateAsync({namespace:o.namespace,name:o.name,replicas:l})},P=C=>{r(N=>({...N,...C}))},S=[{key:"name",header:"Name",sortable:!0,render:(C,N)=>u.jsx("a",{href:`/statefulsets/${N.namespace}/${N.name}`,className:"resource-link",onClick:_=>{_.stopPropagation(),t(`/statefulsets/${N.namespace}/${N.name}`)},children:C})},{key:"namespace",header:"Namespace",sortable:!0},{key:"replicas",header:"Replicas",sortable:!0,render:(C,N)=>u.jsx("span",{children:`${N.readyReplicas}/${C}`})},{key:"currentReplicas",header:"Current",sortable:!0},{key:"readyReplicas",header:"Ready",sortable:!0},{key:"actions",header:"Actions",render:(C,N)=>u.jsxs("div",{className:"actions-cell",children:[u.jsx("button",{className:"action-button",onClick:_=>{_.stopPropagation(),s(N),c(N.replicas)},children:"Scale"}),u.jsx("button",{className:"action-button danger",onClick:_=>{_.stopPropagation(),a(N)},children:"Delete"})]})}];return m?u.jsx("div",{className:"statefulset-list",children:u.jsxs("div",{className:"error-message",children:["Error loading StatefulSets: ",m.message]})}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"statefulset-list",children:[u.jsx("div",{className:"page-header",children:u.jsx("h1",{children:"StatefulSets"})}),u.jsx("div",{className:"filters-bar",children:u.jsx(W,{variant:"secondary",onClick:()=>P({search:"",namespace:""}),children:"Clear"})}),u.jsx(Bn,{}),u.jsx(Cn,{data:(p==null?void 0:p.items)||[],columns:S,onSort:b,defaultSort:d,onRowClick:w,loading:h,emptyMessage:"No StatefulSets found matching your filters"}),i&&u.jsx(vi,{title:"Delete StatefulSet",message:`Are you sure you want to delete StatefulSet "${i.name}" in namespace "${i.namespace}"? This action cannot be undone.`,onConfirm:()=>j(i),onCancel:()=>a(null),confirmText:"Delete",variant:"danger"}),o&&u.jsx(hr,{isOpen:!!o,onClose:()=>s(null),title:`Scale StatefulSet: ${o.name}`,size:"sm",children:u.jsxs("div",{className:"scale-modal",children:[u.jsx("label",{children:"Number of replicas:"}),u.jsx(ge,{type:"number",min:"0",value:l,onChange:C=>c(Number(C.target.value)),fullWidth:!0}),u.jsxs("div",{className:"modal-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>s(null),children:"Cancel"}),u.jsx(W,{variant:"primary",onClick:k,loading:x.isPending,children:"Scale"})]})]})})]}),u.jsx("style",{children:`
        .statefulset-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .filters-bar {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .resource-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-button {
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .action-button:hover {
          background: #2563eb;
        }

        .action-button.danger {
          background: #dc2626;
        }

        .action-button.danger:hover {
          background: #b91c1c;
        }

        .scale-modal {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .scale-modal label {
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `})]})}async function Vae(e){let t=no(e||{});e!=null&&e.namespace&&(t+=`&namespace=${encodeURIComponent(e.namespace)}`),e!=null&&e.search&&(t+=`&search=${encodeURIComponent(e.search)}`);const n=await ce.get(`/api/v1/daemonsets?${t}`);return ye(n.data,gi(XB))}async function Zae(e,t){const n=await ce.delete(`/api/v1/daemonsets/${encodeURIComponent(e)}/${encodeURIComponent(t)}`);ye(n.data,mi())}function qae(){const e=ct(),{showToast:t}=Ct(),[n,r]=v.useState({search:"",namespace:""}),[i,a]=v.useState(null),[o,s]=v.useState({key:"name",order:"asc"}),{data:l,isLoading:c,error:d,refetch:f}=Ae(["daemonsets",n,o],()=>Vae({search:n.search||void 0,namespace:n.namespace||void 0})),p=Ne(async b=>{await Zae(b.namespace,b.name)},{onSuccess:()=>{t({message:"DaemonSet deleted successfully",type:"success"}),f(),a(null)}}),h=(b,w)=>{s({key:b,order:w})},m=b=>{e(`/daemonsets/${b.namespace}/${b.name}`)},y=async b=>{await p.mutateAsync({namespace:b.namespace,name:b.name})},g=b=>{r(w=>({...w,...b}))},x=[{key:"name",header:"Name",sortable:!0,render:(b,w)=>u.jsx("a",{href:`/daemonsets/${w.namespace}/${w.name}`,className:"resource-link",onClick:j=>{j.stopPropagation(),e(`/daemonsets/${w.namespace}/${w.name}`)},children:b})},{key:"namespace",header:"Namespace",sortable:!0},{key:"replicas",header:"Desired",sortable:!0},{key:"currentReplicas",header:"Current",sortable:!0},{key:"readyReplicas",header:"Ready",sortable:!0},{key:"availableReplicas",header:"Available",sortable:!0},{key:"actions",header:"Actions",render:(b,w)=>u.jsx("div",{className:"actions-cell",children:u.jsx("button",{className:"action-button danger",onClick:j=>{j.stopPropagation(),a(w)},children:"Delete"})})}];return d?u.jsx("div",{className:"daemonset-list",children:u.jsxs("div",{className:"error-message",children:["Error loading DaemonSets: ",d.message]})}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"daemonset-list",children:[u.jsx("div",{className:"page-header",children:u.jsx("h1",{children:"DaemonSets"})}),u.jsx("div",{className:"filters-bar",children:u.jsx(W,{variant:"secondary",onClick:()=>g({search:"",namespace:""}),children:"Clear"})}),u.jsx(Bn,{}),u.jsx(Cn,{data:(l==null?void 0:l.items)||[],columns:x,onSort:h,defaultSort:o,onRowClick:m,loading:c,emptyMessage:"No DaemonSets found matching your filters"}),i&&u.jsx(vi,{title:"Delete DaemonSet",message:`Are you sure you want to delete DaemonSet "${i.name}" in namespace "${i.namespace}"? This action cannot be undone.`,onConfirm:()=>y(i),onCancel:()=>a(null),confirmText:"Delete",variant:"danger"})]}),u.jsx("style",{children:`
        .daemonset-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .page-header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .filters-bar {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .resource-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        .resource-link:hover {
          text-decoration: underline;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-button {
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }

        .action-button:hover {
          background: #2563eb;
        }

        .action-button.danger {
          background: #dc2626;
        }

        .action-button.danger:hover {
          background: #b91c1c;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `})]})}function _C({code:e,language:t="yaml"}){const[n,r]=v.useState(!0),i=v.useMemo(()=>Yae(e),[e]),a=v.useMemo(()=>{const o=[];let s=1,l=[];return i.forEach(c=>{c.value.split(`
`).forEach((f,p)=>{p>0&&(o.push({line:s,tokens:[...l]}),s++,l=[]),l.push({type:c.type,value:f})})}),l.length>0&&o.push({line:s,tokens:l}),o},[i]);return u.jsxs("div",{className:"resource-yaml",children:[u.jsxs("div",{className:"yaml-header",children:[u.jsx("span",{className:"language-badge",children:t}),u.jsxs("button",{className:"toggle-button",onClick:()=>r(!n),children:[n?"Hide":"Show"," Line Numbers"]})]}),u.jsxs("div",{className:"yaml-content",children:[n&&u.jsx("div",{className:"line-numbers",children:a.map(o=>u.jsx("div",{className:"line-number",children:o.line},o.line))}),u.jsx("pre",{className:"code-block",children:a.map((o,s)=>u.jsx("div",{className:"code-line",children:o.tokens.map((l,c)=>u.jsx("span",{className:`token token-${l.type}`,children:l.value},c))},s))})]})]})}function Yae(e){const t=[],n=e.split(`
`);for(const r of n){const i=r.trim();if(i===""){t.push({type:"plain",value:r+`
`});continue}if(i.startsWith("#")){t.push({type:"comment",value:r+`
`});continue}if(i.includes(":")){const a=r.split(":"),o=a[0],s=a.slice(1).join(":"),l=(o==null?void 0:o.search(/\S|$/))||0,c=(o==null?void 0:o.trim())||"";t.push({type:"plain",value:" ".repeat(l)}),t.push({type:"key",value:c}),t.push({type:"plain",value:":"});const d=(s==null?void 0:s.trim())||"";if(d===""){t.push({type:"plain",value:`
`});continue}if(s.search(/\S|$/),i.startsWith("- ")){t.push({type:"plain",value:" "}),t.push({type:"string",value:"- "+d}),t.push({type:"plain",value:`
`});continue}if(d.startsWith('"')||d.startsWith("'")){t.push({type:"plain",value:" "}),t.push({type:"string",value:d}),t.push({type:"plain",value:`
`});continue}if(/^-?\d+\.?\d*$/.test(d)){t.push({type:"plain",value:" "}),t.push({type:"number",value:d}),t.push({type:"plain",value:`
`});continue}if(d==="true"||d==="false"){t.push({type:"plain",value:" "}),t.push({type:"value",value:d}),t.push({type:"plain",value:`
`});continue}if(d==="null"||d==="~"){t.push({type:"plain",value:" "}),t.push({type:"value",value:d}),t.push({type:"plain",value:`
`});continue}t.push({type:"plain",value:" "}),t.push({type:"value",value:d}),t.push({type:"plain",value:`
`});continue}if(i.startsWith("- ")){t.push({type:"string",value:r+`
`});continue}t.push({type:"plain",value:r+`
`})}return t}const AC={Deployment:`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 80`,StatefulSet:`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: my-statefulset
  namespace: default
spec:
  serviceName: my-service
  replicas: 1
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 80`,DaemonSet:`apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: my-daemonset
  namespace: default
spec:
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:latest
        ports:
        - containerPort: 80`,Job:`apiVersion: batch/v1
kind: Job
metadata:
  name: my-job
  namespace: default
spec:
  template:
    spec:
      containers:
      - name: my-container
        image: busybox
        command: ["/bin/sh", "-c", "echo hello world"]
      restartPolicy: OnFailure`,CronJob:`apiVersion: batch/v1
kind: CronJob
metadata:
  name: my-cronjob
  namespace: default
spec:
  schedule: "*/5 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: my-container
            image: busybox
            command: ["/bin/sh", "-c", "date"]
          restartPolicy: OnFailure`};function Gae(){const e=ct(),{showToast:t}=Ct(),[n,r]=v.useState("type"),[i,a]=v.useState(""),[o,s]=v.useState(""),[l,c]=v.useState(!1),[d,f]=v.useState(!1),p=Ne(async b=>await yae(b),{onSuccess:b=>{l?t({message:"Validation successful - workload is valid",type:"success"}):(t({message:`Workload ${b.kind} ${b.name} created successfully in ${b.namespace}`,type:"success"}),e(`/deployments/${b.namespace}/${b.name}`))},onError:b=>{t({message:`Failed to create workload: ${b.message}`,type:"error"})}}),h=b=>{a(b),s(AC[b]??""),r("yaml")},m=b=>{s(b)},y=()=>{c(!0),p.mutate({yaml:o,dryRun:!0})},g=()=>{c(!1),p.mutate({yaml:o,dryRun:!1})},x=()=>{n==="yaml"?r("type"):n==="review"&&r("yaml")};return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"workload-create",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsx("h1",{children:"Create Workload"}),u.jsx("p",{children:"Create a new Kubernetes workload from YAML"})]}),u.jsx("div",{className:"header-actions",children:u.jsx(W,{variant:"secondary",onClick:()=>e(-1),children:"Cancel"})})]}),n==="type"&&u.jsxs("div",{className:"type-selection",children:[u.jsx("h2",{children:"Select Workload Type"}),u.jsx("div",{className:"type-grid",children:Object.keys(AC).map(b=>u.jsxs("button",{className:`type-card ${i===b?"selected":""}`,onClick:()=>h(b),children:[u.jsx("div",{className:"type-icon",children:b.charAt(0)}),u.jsx("div",{className:"type-name",children:b}),u.jsxs("div",{className:"type-description",children:[b==="Deployment"&&"Manages stateless applications with scaling and rolling updates",b==="StatefulSet"&&"Manages stateful applications with stable network identities",b==="DaemonSet"&&"Ensures a copy of a pod runs on every node",b==="Job"&&"Runs one or more pods to completion",b==="CronJob"&&"Runs jobs on a schedule"]})]},b))})]}),n==="yaml"&&u.jsxs("div",{className:"yaml-editor-section",children:[u.jsxs("div",{className:"yaml-header",children:[u.jsxs("div",{className:"yaml-title",children:[u.jsx("h2",{children:"Edit YAML"}),u.jsx("span",{className:"selected-type-badge",children:i})]}),u.jsxs("div",{className:"yaml-actions",children:[u.jsx(W,{variant:"secondary",size:"sm",onClick:x,children:"Back"}),u.jsx(W,{variant:"secondary",size:"sm",onClick:y,loading:p.isPending,children:"Validate"}),u.jsx(W,{variant:"primary",size:"sm",onClick:()=>r("review"),children:"Review"})]})]}),u.jsx("div",{className:"yaml-editor-container",children:u.jsx("textarea",{className:"yaml-textarea",value:o,onChange:b=>m(b.target.value),placeholder:"Paste or type your YAML here...",spellCheck:!1})}),d&&u.jsxs("div",{className:"yaml-preview",children:[u.jsx("h3",{children:"Preview"}),u.jsx(_C,{code:o,language:"yaml"})]})]}),n==="review"&&u.jsxs("div",{className:"review-section",children:[u.jsxs("div",{className:"review-header",children:[u.jsxs("div",{children:[u.jsx("h2",{children:"Review Workload"}),u.jsx("p",{children:"Review the workload before creating"})]}),u.jsxs("div",{className:"review-actions",children:[u.jsx(W,{variant:"secondary",onClick:x,children:"Back"}),u.jsx(W,{variant:"primary",onClick:g,loading:p.isPending,children:"Create Workload"})]})]}),u.jsx("div",{className:"yaml-preview",children:u.jsx(_C,{code:o,language:"yaml"})})]})]}),u.jsx("style",{children:`
        .workload-create {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .page-header p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .type-selection h2 {
          margin: 0 0 24px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .type-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .type-card {
          padding: 24px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .type-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
          transform: translateY(-2px);
        }

        .type-card.selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .type-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          border-radius: 12px;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .type-name {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
        }

        .type-description {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .yaml-editor-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .yaml-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .yaml-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .yaml-title h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .selected-type-badge {
          padding: 4px 12px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .yaml-actions {
          display: flex;
          gap: 12px;
        }

        .yaml-editor-container {
          position: relative;
        }

        .yaml-textarea {
          width: 100%;
          min-height: 500px;
          padding: 20px;
          background: #1e1e1e;
          color: #d4d4d4;
          border: none;
          border-radius: 8px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 13px;
          line-height: 1.6;
          resize: vertical;
        }

        .yaml-textarea:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }

        .yaml-preview {
          margin-top: 20px;
        }

        .yaml-preview h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .review-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .review-header h2 {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .review-header p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .review-actions {
          display: flex;
          gap: 12px;
        }
      `})]})}function Qae(){const{namespace:e,name:t}=Br(),n=ct(),{showToast:r}=Ct(),[i,a]=v.useState(!1),[o,s]=v.useState(null),[l,c]=v.useState(),{data:d,isLoading:f,error:p,refetch:h}=Ae(["deployment-revisions",e,t],()=>e&&t?jae(e,t):Promise.reject(new Error("Missing params"))),m=Ne(async j=>e&&t?await Sae(e,t,j):Promise.reject(new Error("Missing params or revision")),{onSuccess:()=>{r({message:"Deployment rolled back successfully",type:"success"}),h(),a(!1)},onError:j=>{r({message:`Failed to rollback deployment: ${j.message}`,type:"error"})}}),y=j=>{s(j),c(j.revision),a(!0)},g=()=>{if(d&&d.length>1){const j=d[1];j&&(s(j),c(j.revision),a(!0))}},x=()=>{l!==void 0?m.mutate(l):r({message:"No revision selected for rollback.",type:"error"})},b=j=>{const k=j.annotations["kubectl.kubernetes.io/change-cause"]||"";if(k.includes("image:")){const P=k.match(/image:\s*(\S+)/);return P&&P[1]||"Unknown"}return"Unknown"},w=j=>{const k=j.annotations["kubectl.kubernetes.io/change-cause"];return k||"Manual update"};return p?u.jsx("div",{className:"workload-rollback",children:u.jsxs("div",{className:"error-message",children:["Error loading revision history: ",p.message]})}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"workload-rollback",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsxs("h1",{children:["Rollback Deployment: ",t]}),u.jsx("span",{className:"namespace-badge",children:e})]}),u.jsxs("div",{className:"header-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>n(-1),children:"Cancel"}),d&&d.length>1&&u.jsx(W,{variant:"primary",onClick:g,children:"Rollback to Previous"})]})]}),u.jsxs("div",{className:"info-banner",children:[u.jsx("div",{className:"info-icon",children:"ℹ️"}),u.jsxs("div",{className:"info-content",children:[u.jsx("strong",{children:"Rollback Information"}),u.jsx("p",{children:"Rolling back to a previous revision will create a new revision with the previous configuration. The deployment will be updated to match the selected revision's pod template."})]})]}),f?u.jsxs("div",{className:"loading-container",children:[u.jsx(qt,{}),u.jsx("p",{children:"Loading revision history..."})]}):u.jsxs("div",{className:"revisions-list",children:[u.jsx("h2",{children:"Revision History"}),!d||d.length===0?u.jsx("div",{className:"empty-state",children:u.jsx("p",{children:"No revision history available"})}):u.jsx("div",{className:"revisions-container",children:d.map((j,k)=>u.jsxs("div",{className:`revision-card ${k===0?"current":""}`,children:[u.jsxs("div",{className:"revision-header",children:[u.jsxs("div",{className:"revision-info",children:[u.jsxs("div",{className:"revision-number",children:[u.jsx("span",{className:"revision-label",children:"Revision"}),u.jsx("span",{className:"revision-value",children:j.revision}),k===0&&u.jsx(tt,{status:"Running",label:"Current"})]}),u.jsx("div",{className:"revision-meta",children:u.jsxs("span",{className:"meta-item",children:[u.jsx("span",{className:"meta-label",children:"Image:"}),u.jsx("span",{className:"meta-value",children:b(j)})]})})]}),k!==0&&u.jsx(W,{variant:"secondary",size:"sm",onClick:()=>y(j),disabled:m.isPending,children:"Rollback to this"})]}),u.jsx("div",{className:"revision-details",children:u.jsxs("div",{className:"detail-row",children:[u.jsx("span",{className:"detail-label",children:"Change Cause:"}),u.jsx("span",{className:"detail-value",children:w(j)})]})})]},j.revision))})]})]}),u.jsx(hr,{isOpen:i,onClose:()=>a(!1),title:`Confirm Rollback: ${t}`,size:"sm",children:u.jsxs("div",{className:"modal-content",children:[u.jsx("p",{children:"Are you sure you want to rollback this deployment?"}),o&&u.jsxs("div",{className:"rollback-info",children:[u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Revision:"}),u.jsx("span",{className:"info-value",children:o.revision})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Image:"}),u.jsx("span",{className:"info-value",children:b(o)})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Change Cause:"}),u.jsx("span",{className:"info-value",children:w(o)})]})]}),u.jsxs("div",{className:"warning-banner",children:[u.jsx("strong",{children:"Warning:"})," This will create a new deployment revision and may cause temporary downtime or service disruption."]}),u.jsxs("div",{className:"modal-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>a(!1),children:"Cancel"}),u.jsx(W,{variant:"primary",onClick:x,loading:m.isPending,children:"Confirm Rollback"})]})]})}),u.jsx("style",{children:`
        .workload-rollback {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .namespace-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .info-banner {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-content strong {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          color: #1e40af;
        }

        .info-content p {
          margin: 0;
          font-size: 13px;
          color: #3b82f6;
          line-height: 1.5;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .revisions-list h2 {
          margin: 0 0 24px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .empty-state {
          padding: 48px;
          text-align: center;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .revisions-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .revision-card {
          padding: 20px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .revision-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
        }

        .revision-card.current {
          background: #f0fdf4;
          border-color: #22c55e;
        }

        .revision-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .revision-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .revision-number {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .revision-label {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
        }

        .revision-value {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
        }

        .revision-meta {
          display: flex;
          gap: 24px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
        }

        .meta-label {
          color: #6b7280;
          font-weight: 500;
        }

        .meta-value {
          color: #111827;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        .revision-details {
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .detail-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: 13px;
        }

        .detail-label {
          color: #6b7280;
          font-weight: 500;
          flex-shrink: 0;
        }

        .detail-value {
          color: #374151;
          line-height: 1.5;
        }

        .modal-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-content p {
          margin: 0;
          font-size: 14px;
          color: #374151;
        }

        .rollback-info {
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 13px;
        }

        .info-label {
          color: #6b7280;
          font-weight: 500;
        }

        .info-value {
          color: #111827;
          font-weight: 600;
        }

        .warning-banner {
          padding: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          font-size: 13px;
          color: #991b1b;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }
      `})]})}function Xae(){const{namespace:e,name:t}=Br(),n=ct(),{showToast:r}=Ct(),[i,a]=v.useState("RollingUpdate"),[o,s]=v.useState("25%"),[l,c]=v.useState("25%"),[d,f]=v.useState(!1),{data:p,isLoading:h,error:m}=Ae(["deployment",e,t],()=>e&&t?Gu(e,t):Promise.reject(new Error("Missing params"))),y=Ne(async b=>await wae(e||"",t||"",b),{onSuccess:()=>{r({message:"Update strategy updated successfully",type:"success"}),n(-1)},onError:b=>{r({message:`Failed to update strategy: ${b.message}`,type:"error"})}}),g=()=>{y.mutate({strategy:i,maxSurge:i==="RollingUpdate"?o:void 0,maxUnavailable:i==="RollingUpdate"?l:void 0})},x=b=>{a(b)};return m?u.jsx("div",{className:"workload-update-strategy",children:u.jsxs("div",{className:"error-message",children:["Error loading deployment: ",m.message]})}):h?u.jsx("div",{className:"workload-update-strategy",children:u.jsxs("div",{className:"loading-container",children:[u.jsx(qt,{}),u.jsx("p",{children:"Loading deployment..."})]})}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"workload-update-strategy",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsxs("h1",{children:["Update Strategy: ",t]}),u.jsx("span",{className:"namespace-badge",children:e})]}),u.jsxs("div",{className:"header-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>n(-1),children:"Cancel"}),u.jsx(W,{variant:"primary",onClick:g,loading:y.isPending,children:"Update Strategy"})]})]}),u.jsxs("div",{className:"content-sections",children:[u.jsxs("div",{className:"strategy-config",children:[u.jsx("h2",{children:"Configuration"}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"Strategy Type"}),u.jsx(Jv,{value:i,onChange:x,options:[{value:"RollingUpdate",label:"Rolling Update"},{value:"Recreate",label:"Recreate"}],fullWidth:!0}),u.jsx("p",{className:"field-description",children:i==="RollingUpdate"?"Gradually replaces old pods with new ones while maintaining availability":"Terminates all pods before creating new ones"})]}),i==="RollingUpdate"&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"Max Surge"}),u.jsx(ge,{value:o,onChange:b=>s(b.target.value),placeholder:"e.g., 25% or 2",fullWidth:!0}),u.jsx("p",{className:"field-description",children:"Maximum number of pods that can be created above the desired number of replicas"})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"Max Unavailable"}),u.jsx(ge,{value:l,onChange:b=>c(b.target.value),placeholder:"e.g., 25% or 2",fullWidth:!0}),u.jsx("p",{className:"field-description",children:"Maximum number of pods that can be unavailable during the update"})]})]})]}),u.jsxs("div",{className:"strategy-info",children:[u.jsx("h2",{children:"Strategy Information"}),u.jsxs("div",{className:"info-card",children:[u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Current Strategy:"}),u.jsx("span",{className:"info-value",children:(p==null?void 0:p.strategy)||"RollingUpdate"})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Replicas:"}),u.jsx("span",{className:"info-value",children:(p==null?void 0:p.replicas)||0})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Ready Replicas:"}),u.jsx("span",{className:"info-value",children:(p==null?void 0:p.readyReplicas)||0})]})]}),u.jsxs("div",{className:"strategy-details",children:[u.jsx("h3",{children:"Rolling Update"}),u.jsx("p",{children:"The Rolling Update strategy ensures that pods are gradually replaced, maintaining application availability during updates. You can control the pace using maxSurge and maxUnavailable parameters."}),u.jsxs("ul",{className:"feature-list",children:[u.jsx("li",{children:"Zero downtime updates"}),u.jsx("li",{children:"Gradual pod replacement"}),u.jsx("li",{children:"Rollback support"}),u.jsx("li",{children:"Configurable update pace"})]})]}),u.jsxs("div",{className:"strategy-details",children:[u.jsx("h3",{children:"Recreate"}),u.jsx("p",{children:"The Recreate strategy terminates all existing pods before creating new ones. This causes downtime but ensures a clean slate for the update."}),u.jsxs("ul",{className:"feature-list",children:[u.jsx("li",{children:"Simple deployment"}),u.jsx("li",{children:"Clean state"}),u.jsx("li",{children:"Temporary downtime"}),u.jsx("li",{children:"No resource overhead"})]})]}),u.jsxs("button",{className:"preview-button",onClick:()=>f(!d),children:[d?"Hide":"Show"," YAML Preview"]}),d&&u.jsx("div",{className:"yaml-preview",children:u.jsx("pre",{children:`apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${t}
  namespace: ${e}
spec:
  replicas: ${(p==null?void 0:p.replicas)||1}
  strategy:
    type: ${i}
${i==="RollingUpdate"?`    rollingUpdate:
      maxSurge: ${o}
      maxUnavailable: ${l}`:""}
  selector:
    matchLabels:
      app: ${(p==null?void 0:p.selector)||"app"}`})})]})]})]}),u.jsx("style",{children:`
        .workload-update-strategy {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .namespace-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .content-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .strategy-config h2,
        .strategy-info h2 {
          margin: 0 0 24px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .field-description {
          margin: 8px 0 0 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .info-card {
          padding: 20px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
          border-bottom: 1px solid #e5e7eb;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          color: #6b7280;
          font-weight: 500;
        }

        .info-value {
          color: #111827;
          font-weight: 600;
        }

        .strategy-details {
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .strategy-details h3 {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .strategy-details p {
          margin: 0 0 12px 0;
          font-size: 14px;
          color: #374151;
          line-height: 1.6;
        }

        .feature-list {
          margin: 0;
          padding-left: 20px;
          font-size: 14px;
          color: #374151;
        }

        .feature-list li {
          margin-bottom: 4px;
        }

        .preview-button {
          width: 100%;
          padding: 12px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .preview-button:hover {
          background: #eff6ff;
          border-color: #3b82f6;
          color: #1e40af;
        }

        .yaml-preview {
          margin-top: 16px;
          padding: 16px;
          background: #1e1e1e;
          border-radius: 8px;
          overflow-x: auto;
        }

        .yaml-preview pre {
          margin: 0;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 12px;
          color: #d4d4d4;
          line-height: 1.5;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        @media (max-width: 1024px) {
          .content-sections {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function Jae(){var w;const{namespace:e,name:t}=Br(),n=ct(),{showToast:r}=Ct(),[i,a]=v.useState(""),[o,s]=v.useState({containerName:"",cpuRequest:"",cpuLimit:"",memoryRequest:"",memoryLimit:""}),[l,c]=v.useState(!1),{data:d,isLoading:f,error:p,refetch:h}=Ae(["deployment",e,t],()=>e&&t?Gu(e,t):Promise.reject(new Error("Missing params"))),m=Ne(async j=>await kae(e||"",t||"",j.containerName,j.request),{onSuccess:()=>{r({message:"Container resources updated successfully",type:"success"}),h(),n(-1)},onError:j=>{r({message:`Failed to update resources: ${j.message}`,type:"error"})}}),y=j=>{var P;a(j),((P=d==null?void 0:d.template)==null?void 0:P.containers.find(S=>S.name===j))&&s({containerName:j,cpuRequest:"",cpuLimit:"",memoryRequest:"",memoryLimit:""})},g=(j,k)=>{s(P=>({...P,[j]:k}))},x=()=>{const j={};o.cpuRequest&&(j.cpuRequest=o.cpuRequest),o.cpuLimit&&(j.cpuLimit=o.cpuLimit),o.memoryRequest&&(j.memoryRequest=o.memoryRequest),o.memoryLimit&&(j.memoryLimit=o.memoryLimit),m.mutate({containerName:o.containerName,request:j})};if(p)return u.jsx("div",{className:"workload-resources",children:u.jsxs("div",{className:"error-message",children:["Error loading deployment: ",p.message]})});if(f)return u.jsx("div",{className:"workload-resources",children:u.jsxs("div",{className:"loading-container",children:[u.jsx(qt,{}),u.jsx("p",{children:"Loading deployment..."})]})});const b=((w=d==null?void 0:d.template)==null?void 0:w.containers)||[];return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"workload-resources",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsxs("h1",{children:["Container Resources: ",t]}),u.jsx("span",{className:"namespace-badge",children:e})]}),u.jsxs("div",{className:"header-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>n(-1),children:"Cancel"}),u.jsx(W,{variant:"primary",onClick:x,loading:m.isPending,disabled:!i,children:"Update Resources"})]})]}),u.jsxs("div",{className:"info-banner",children:[u.jsx("div",{className:"info-icon",children:"ℹ️"}),u.jsxs("div",{className:"info-content",children:[u.jsx("strong",{children:"Resource Requests and Limits"}),u.jsx("p",{children:"Configure CPU and memory requests (guaranteed resources) and limits (maximum resources) for each container. Requests ensure the container gets the specified amount, while limits prevent it from exceeding."})]})]}),u.jsxs("div",{className:"content-sections",children:[u.jsxs("div",{className:"containers-section",children:[u.jsx("h2",{children:"Containers"}),u.jsx("div",{className:"containers-list",children:b.length===0?u.jsx("div",{className:"empty-state",children:u.jsx("p",{children:"No containers found"})}):b.map(j=>u.jsxs("div",{className:`container-card ${i===j.name?"selected":""}`,onClick:()=>y(j.name),children:[u.jsxs("div",{className:"container-header",children:[u.jsx("div",{className:"container-name",children:j.name}),u.jsx("div",{className:"container-status",children:j.ready?u.jsx(tt,{status:"Running",label:"Ready"}):u.jsx(tt,{status:"Pending",label:"Not Ready"})})]}),u.jsxs("div",{className:"container-info",children:[u.jsxs("span",{className:"info-item",children:["Image: ",j.image]}),u.jsxs("span",{className:"info-item",children:["Restarts: ",j.restartCount]})]})]},j.name))})]}),i&&u.jsxs("div",{className:"resources-editor",children:[u.jsxs("h2",{children:["Resources: ",i]}),u.jsxs("div",{className:"resources-grid",children:[u.jsxs("div",{className:"resource-section",children:[u.jsx("h3",{children:"CPU"}),u.jsxs("div",{className:"resource-inputs",children:[u.jsxs("div",{className:"input-group",children:[u.jsx("label",{children:"Request"}),u.jsx(ge,{value:o.cpuRequest,onChange:j=>g("cpuRequest",j.target.value),placeholder:"e.g., 500m or 0.5",fullWidth:!0}),u.jsx("p",{className:"input-hint",children:"Minimum guaranteed CPU cores (e.g., 100m, 0.5, 1)"})]}),u.jsxs("div",{className:"input-group",children:[u.jsx("label",{children:"Limit"}),u.jsx(ge,{value:o.cpuLimit,onChange:j=>g("cpuLimit",j.target.value),placeholder:"e.g., 1000m or 1",fullWidth:!0}),u.jsx("p",{className:"input-hint",children:"Maximum CPU cores allowed (e.g., 500m, 1, 2)"})]})]})]}),u.jsxs("div",{className:"resource-section",children:[u.jsx("h3",{children:"Memory"}),u.jsxs("div",{className:"resource-inputs",children:[u.jsxs("div",{className:"input-group",children:[u.jsx("label",{children:"Request"}),u.jsx(ge,{value:o.memoryRequest,onChange:j=>g("memoryRequest",j.target.value),placeholder:"e.g., 256Mi or 1Gi",fullWidth:!0}),u.jsx("p",{className:"input-hint",children:"Minimum guaranteed memory (e.g., 256Mi, 512Mi, 1Gi)"})]}),u.jsxs("div",{className:"input-group",children:[u.jsx("label",{children:"Limit"}),u.jsx(ge,{value:o.memoryLimit,onChange:j=>g("memoryLimit",j.target.value),placeholder:"e.g., 512Mi or 2Gi",fullWidth:!0}),u.jsx("p",{className:"input-hint",children:"Maximum memory allowed (e.g., 512Mi, 1Gi, 2Gi)"})]})]})]})]}),u.jsxs("button",{className:"preview-button",onClick:()=>c(!l),children:[l?"Hide":"Show"," YAML Preview"]}),l&&u.jsx("div",{className:"yaml-preview",children:u.jsx("pre",{children:`resources:
  requests:
    cpu: ${o.cpuRequest||"not set"}
    memory: ${o.memoryRequest||"not set"}
  limits:
    cpu: ${o.cpuLimit||"not set"}
    memory: ${o.memoryLimit||"not set"}`})})]}),!i&&u.jsx("div",{className:"empty-editor",children:u.jsx("p",{children:"Select a container to configure its resources"})})]})]}),u.jsx("style",{children:`
        .workload-resources {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .namespace-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .info-banner {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-content strong {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          color: #1e40af;
        }

        .info-content p {
          margin: 0;
          font-size: 13px;
          color: #3b82f6;
          line-height: 1.5;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .content-sections {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 32px;
        }

        .containers-section h2,
        .resources-editor h2 {
          margin: 0 0 20px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .containers-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .empty-state {
          padding: 48px;
          text-align: center;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .container-card {
          padding: 16px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .container-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
        }

        .container-card.selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .container-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .container-name {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .container-info {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 12px;
          color: #6b7280;
        }

        .resources-editor {
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .resources-grid {
          display: grid;
          gap: 24px;
          margin-bottom: 24px;
        }

        .resource-section h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .resource-inputs {
          display: grid;
          gap: 20px;
        }

        .input-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .input-hint {
          margin: 8px 0 0 0;
          font-size: 12px;
          color: #6b7280;
          line-height: 1.5;
        }

        .preview-button {
          width: 100%;
          padding: 12px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .preview-button:hover {
          background: #eff6ff;
          border-color: #3b82f6;
          color: #1e40af;
        }

        .yaml-preview {
          margin-top: 16px;
          padding: 16px;
          background: #1e1e1e;
          border-radius: 8px;
          overflow-x: auto;
        }

        .yaml-preview pre {
          margin: 0;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 12px;
          color: #d4d4d4;
          line-height: 1.5;
        }

        .empty-editor {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          min-height: 200px;
        }

        .empty-editor p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        @media (max-width: 1024px) {
          .content-sections {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function eoe(){var _;const{namespace:e,name:t}=Br(),n=ct(),{showToast:r}=Ct(),[i,a]=v.useState(""),[o,s]=v.useState([]),[l,c]=v.useState(!1),[d,f]=v.useState(""),[p,h]=v.useState(""),[m,y]=v.useState(!1),{data:g,isLoading:x,error:b,refetch:w}=Ae(["deployment",e,t],()=>e&&t?Gu(e,t):Promise.reject(new Error("Missing params"))),j=Ne(async M=>await Pae(e||"",t||"",M.containerName,M.request),{onSuccess:()=>{r({message:"Environment variables updated successfully",type:"success"}),w(),n(-1)},onError:M=>{r({message:`Failed to update environment variables: ${M.message}`,type:"error"})}}),k=M=>{var G;a(M),((G=g==null?void 0:g.template)==null?void 0:G.containers.find(V=>V.name===M))&&s([{key:"ENV1",value:"value1",isSecret:!1},{key:"ENV2",value:"value2",isSecret:!0}])},P=(M,R,G)=>{s(V=>{const ee=[...V],Q=ee[M];if(!Q)return ee;const te={key:R==="key"?G:Q.key,value:R==="value"?G:Q.value,isSecret:R==="isSecret"?G:Q.isSecret};return ee[M]=te,ee})},S=M=>{s(R=>R.filter((G,V)=>V!==M))},C=()=>{const M={};o.forEach(R=>{M[R.key]=R.value}),j.mutate({containerName:i,request:{envVars:M}})};if(b)return u.jsx("div",{className:"workload-env-editor",children:u.jsxs("div",{className:"error-message",children:["Error loading deployment: ",b.message]})});if(x)return u.jsx("div",{className:"workload-env-editor",children:u.jsxs("div",{className:"loading-container",children:[u.jsx(qt,{}),u.jsx("p",{children:"Loading deployment..."})]})});const N=((_=g==null?void 0:g.template)==null?void 0:_.containers)||[];return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"workload-env-editor",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsxs("h1",{children:["Environment Variables: ",t]}),u.jsx("span",{className:"namespace-badge",children:e})]}),u.jsxs("div",{className:"header-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>n(-1),children:"Cancel"}),u.jsx(W,{variant:"primary",onClick:C,loading:j.isPending,disabled:!i,children:"Save Changes"})]})]}),u.jsxs("div",{className:"info-banner",children:[u.jsx("div",{className:"info-icon",children:"ℹ️"}),u.jsxs("div",{className:"info-content",children:[u.jsx("strong",{children:"Environment Variables"}),u.jsx("p",{children:"Configure environment variables for container processes. Variables marked as secrets should reference Kubernetes secrets rather than storing values directly."})]})]}),u.jsxs("div",{className:"content-sections",children:[u.jsxs("div",{className:"containers-section",children:[u.jsx("h2",{children:"Containers"}),u.jsx("div",{className:"containers-list",children:N.length===0?u.jsx("div",{className:"empty-state",children:u.jsx("p",{children:"No containers found"})}):N.map(M=>u.jsxs("div",{className:`container-card ${i===M.name?"selected":""}`,onClick:()=>k(M.name),children:[u.jsxs("div",{className:"container-header",children:[u.jsx("div",{className:"container-name",children:M.name}),u.jsx("div",{className:"container-status",children:M.ready?u.jsx(tt,{status:"Running",label:"Ready"}):u.jsx(tt,{status:"Pending",label:"Not Ready"})})]}),u.jsxs("div",{className:"container-info",children:[u.jsxs("span",{className:"info-item",children:["Image: ",M.image]}),u.jsxs("span",{className:"info-item",children:["Restarts: ",M.restartCount]})]})]},M.name))})]}),i&&u.jsxs("div",{className:"env-vars-editor",children:[u.jsxs("div",{className:"editor-header",children:[u.jsxs("h2",{children:["Environment Variables: ",i]}),u.jsx(W,{variant:"secondary",size:"sm",onClick:()=>c(!0),children:"Add Variable"})]}),o.length===0?u.jsxs("div",{className:"empty-env",children:[u.jsx("p",{children:"No environment variables configured"}),u.jsx(W,{variant:"secondary",size:"sm",onClick:()=>c(!0),children:"Add First Variable"})]}):u.jsx("div",{className:"env-vars-list",children:o.map((M,R)=>u.jsxs("div",{className:"env-var-card",children:[u.jsxs("div",{className:"env-var-header",children:[u.jsx("div",{className:"env-var-key",children:M.key}),u.jsx("div",{className:"env-var-actions",children:u.jsx(W,{variant:"secondary",size:"sm",onClick:()=>S(R),children:"Remove"})})]}),u.jsxs("div",{className:"env-var-body",children:[u.jsxs("div",{className:"input-group",children:[u.jsx("label",{children:"Value"}),u.jsx(ge,{type:M.isSecret?"password":"text",value:M.value,onChange:G=>P(R,"value",G.target.value),placeholder:"Enter value...",fullWidth:!0})]}),u.jsxs("div",{className:"checkbox-group",children:[u.jsx("input",{type:"checkbox",id:`secret-${R}`,checked:M.isSecret,onChange:G=>P(R,"isSecret",G.target.checked)}),u.jsx("label",{htmlFor:`secret-${R}`,children:"Mark as secret"})]})]})]},R))})]}),!i&&u.jsx("div",{className:"empty-editor",children:u.jsx("p",{children:"Select a container to edit its environment variables"})})]})]}),u.jsx("style",{children:`
        .workload-env-editor {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .namespace-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .info-banner {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-content strong {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          color: #1e40af;
        }

        .info-content p {
          margin: 0;
          font-size: 13px;
          color: #3b82f6;
          line-height: 1.5;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .content-sections {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 32px;
        }

        .containers-section h2,
        .env-vars-editor h2 {
          margin: 0 0 20px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .containers-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .empty-state {
          padding: 48px;
          text-align: center;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .container-card {
          padding: 16px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .container-card:hover {
          border-color: #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
        }

        .container-card.selected {
          border-color: #3b82f6;
          background: #eff6ff;
        }

        .container-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .container-name {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .container-info {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 12px;
          color: #6b7280;
        }

        .env-vars-editor {
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .empty-env {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-env p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .env-vars-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .env-var-card {
          padding: 16px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .env-var-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .env-var-key {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        .env-var-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .checkbox-group input[type="checkbox"] {
          width: 16px;
          height: 16px;
        }

        .checkbox-group label {
          font-size: 13px;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
        }

        .empty-editor {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          min-height: 200px;
        }

        .empty-editor p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        @media (max-width: 1024px) {
          .content-sections {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function toe(){var b;const{namespace:e,name:t}=Br(),n=ct(),{showToast:r}=Ct(),[i,a]=v.useState(""),[o,s]=v.useState(""),[l,c]=v.useState(!0),[d,f]=v.useState(!0),{data:p,isLoading:h,error:m}=Ae(["deployment",e,t],()=>e&&t?Gu(e,t):Promise.reject(new Error("Missing params"))),y=Ne(async w=>await Cae(e||"",t||"",w),{onSuccess:w=>{r({message:`Deployment cloned successfully as ${w.name}`,type:"success"}),n(`/deployments/${w.namespace}/${w.name}`)},onError:w=>{r({message:`Failed to clone deployment: ${w.message}`,type:"error"})}}),g=()=>{if(!i||!o){r({message:"Please fill in all required fields",type:"error"});return}y.mutate({newName:i,targetNamespace:o})},x=t?`${t}-clone`:"";return m?u.jsx("div",{className:"workload-clone",children:u.jsxs("div",{className:"error-message",children:["Error loading deployment: ",m.message]})}):h?u.jsx("div",{className:"workload-clone",children:u.jsxs("div",{className:"loading-container",children:[u.jsx(qt,{}),u.jsx("p",{children:"Loading deployment..."})]})}):u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"workload-clone",children:[u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsxs("h1",{children:["Clone Deployment: ",t]}),u.jsx("span",{className:"namespace-badge",children:e})]}),u.jsxs("div",{className:"header-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>n(-1),children:"Cancel"}),u.jsx(W,{variant:"primary",onClick:g,loading:y.isPending,children:"Clone Deployment"})]})]}),u.jsxs("div",{className:"info-banner",children:[u.jsx("div",{className:"info-icon",children:"ℹ️"}),u.jsxs("div",{className:"info-content",children:[u.jsx("strong",{children:"Clone Deployment"}),u.jsx("p",{children:"Create a copy of this deployment with a new name and namespace. The cloned deployment will have the same configuration, including containers, resources, and environment variables."})]})]}),u.jsxs("div",{className:"content-sections",children:[u.jsxs("div",{className:"source-info",children:[u.jsx("h2",{children:"Source Deployment"}),u.jsxs("div",{className:"info-card",children:[u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Name:"}),u.jsx("span",{className:"info-value",children:p==null?void 0:p.name})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Namespace:"}),u.jsx("span",{className:"info-value",children:p==null?void 0:p.namespace})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Replicas:"}),u.jsx("span",{className:"info-value",children:p==null?void 0:p.replicas})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Ready Replicas:"}),u.jsx("span",{className:"info-value",children:p==null?void 0:p.readyReplicas})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Strategy:"}),u.jsx("span",{className:"info-value",children:(p==null?void 0:p.strategy)||"RollingUpdate"})]})]}),u.jsxs("div",{className:"containers-info",children:[u.jsx("h3",{children:"Containers"}),(b=p==null?void 0:p.template)==null?void 0:b.containers.map((w,j)=>u.jsxs("div",{className:"container-item",children:[u.jsx("div",{className:"container-name",children:w.name}),u.jsx("div",{className:"container-image",children:w.image})]},j))]})]}),u.jsxs("div",{className:"clone-config",children:[u.jsx("h2",{children:"Clone Configuration"}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"New Deployment Name *"}),u.jsx(ge,{value:i,onChange:w=>a(w.target.value),placeholder:`e.g., ${x}`,fullWidth:!0}),u.jsx("p",{className:"field-hint",children:"Enter a unique name for the cloned deployment"})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"Target Namespace *"}),u.jsx(ge,{value:o,onChange:w=>s(w.target.value),placeholder:"e.g., production",fullWidth:!0}),u.jsx("p",{className:"field-hint",children:"Select or enter the target namespace for the cloned deployment"})]}),u.jsxs("div",{className:"options-group",children:[u.jsx("h3",{children:"Clone Options"}),u.jsxs("div",{className:"checkbox-item",children:[u.jsx("input",{type:"checkbox",id:"clone-labels",checked:l,onChange:w=>c(w.target.checked)}),u.jsx("label",{htmlFor:"clone-labels",children:"Clone labels"})]}),u.jsxs("div",{className:"checkbox-item",children:[u.jsx("input",{type:"checkbox",id:"clone-annotations",checked:d,onChange:w=>f(w.target.checked)}),u.jsx("label",{htmlFor:"clone-annotations",children:"Clone annotations"})]})]}),u.jsxs("div",{className:"preview-section",children:[u.jsx("h3",{children:"Clone Summary"}),u.jsxs("div",{className:"summary-card",children:[u.jsxs("div",{className:"summary-row",children:[u.jsx("span",{className:"summary-label",children:"Source:"}),u.jsxs("span",{className:"summary-value",children:[e,"/",t]})]}),u.jsxs("div",{className:"summary-row",children:[u.jsx("span",{className:"summary-label",children:"Target:"}),u.jsxs("span",{className:"summary-value",children:[o||"-","/",i||"-"]})]}),u.jsxs("div",{className:"summary-row",children:[u.jsx("span",{className:"summary-label",children:"Clone labels:"}),u.jsx("span",{className:"summary-value",children:l?"Yes":"No"})]}),u.jsxs("div",{className:"summary-row",children:[u.jsx("span",{className:"summary-label",children:"Clone annotations:"}),u.jsx("span",{className:"summary-value",children:d?"Yes":"No"})]})]})]})]})]})]}),u.jsx("style",{children:`
        .workload-clone {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .namespace-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .info-banner {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-content strong {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          color: #1e40af;
        }

        .info-content p {
          margin: 0;
          font-size: 13px;
          color: #3b82f6;
          line-height: 1.5;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .content-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .source-info h2,
        .clone-config h2 {
          margin: 0 0 24px 0;
          font-size: 24px;
          font-weight: 600;
          color: #111827;
        }

        .info-card {
          padding: 20px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
          border-bottom: 1px solid #e5e7eb;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          color: #6b7280;
          font-weight: 500;
        }

        .info-value {
          color: #111827;
          font-weight: 600;
        }

        .containers-info h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .container-item {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .container-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .container-image {
          font-size: 13px;
          color: #6b7280;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .field-hint {
          margin: 8px 0 0 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.5;
        }

        .options-group h3 {
          margin: 0 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          margin-bottom: 12px;
          cursor: pointer;
        }

        .checkbox-item input[type="checkbox"] {
          width: 18px;
          height: 18px;
        }

        .checkbox-item label {
          font-size: 14px;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
        }

        .preview-section h3 {
          margin: 24px 0 16px 0;
          font-size: 18px;
          font-weight: 600;
          color: #111827;
        }

        .summary-card {
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
          border-bottom: 1px solid #e5e7eb;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .summary-label {
          color: #6b7280;
          font-weight: 500;
        }

        .summary-value {
          color: #111827;
          font-weight: 600;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        @media (max-width: 1024px) {
          .content-sections {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function noe(){const[e,t]=v.useState(1),[n]=v.useState(20),[r,i]=v.useState(""),[a,o]=v.useState(""),{data:s,isLoading:l,error:c}=Ae(["jobs",e,n,r,a],()=>Oae({page:e,limit:n,namespace:r||void 0,search:a||void 0}),{}),d=(s==null?void 0:s.items)||[],f=(s==null?void 0:s.total)||0,p=[{key:"name",header:"Name",render:x=>u.jsx("span",{children:x})},{key:"namespace",header:"Namespace",render:x=>u.jsx("span",{className:"namespace-badge",children:x})},{key:"status",header:"Status",render:x=>{const b=x,j={Active:"Running",Complete:"Succeeded",Failed:"Failed",Pending:"Pending"}[b]||"Pending";return u.jsx(tt,{status:j,label:b})}},{key:"active",header:"Active",render:x=>u.jsx("span",{children:x||"-"})},{key:"succeeded",header:"Succeeded",render:x=>u.jsx("span",{children:x||0})},{key:"failed",header:"Failed",render:x=>u.jsx("span",{children:x||0})}],h=x=>{o(x.target.value),t(1)},m=x=>{i(x.target.value),t(1)},y=x=>{t(x)},g=Math.ceil(f/n);return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"job-list",children:[u.jsx(Bn,{}),u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsx("h1",{children:"Jobs"}),u.jsx("p",{children:"Manage Kubernetes jobs for batch processing"})]}),u.jsx("div",{className:"header-actions",children:u.jsx(W,{variant:"primary",children:"Create Job"})})]}),u.jsxs("div",{className:"filters",children:[u.jsx(ge,{placeholder:"Search jobs...",value:a,onChange:h,fullWidth:!0}),u.jsx(ge,{placeholder:"Filter by namespace...",value:r,onChange:m,fullWidth:!0})]}),l?u.jsxs("div",{className:"loading-container",children:[u.jsx(qt,{}),u.jsx("p",{children:"Loading jobs..."})]}):c?u.jsxs("div",{className:"error-message",children:["Error loading jobs: ",c.message]}):d.length===0?u.jsx("div",{className:"empty-state",children:u.jsx("p",{children:"No jobs found"})}):u.jsxs("div",{className:"table-container",children:[u.jsx(Cn,{data:d,columns:p,emptyMessage:"No jobs found"}),g>1&&u.jsxs("div",{className:"pagination",children:[u.jsx(W,{variant:"secondary",size:"sm",onClick:()=>y(e-1),disabled:e===1,children:"Previous"}),u.jsxs("span",{className:"page-info",children:["Page ",e," of ",g]}),u.jsx(W,{variant:"secondary",size:"sm",onClick:()=>y(e+1),disabled:e===g,children:"Next"})]})]})]}),u.jsx("style",{children:`
        .job-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .page-header p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .filters {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        .empty-state {
          padding: 48px;
          text-align: center;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .table-container {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .page-info {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .namespace-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        @media (max-width: 640px) {
          .filters {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function roe(){const[e,t]=v.useState(1),[n]=v.useState(20),[r,i]=v.useState(""),[a,o]=v.useState(""),{data:s,isLoading:l,error:c}=Ae(["cronjobs",e,n,r,a],()=>Eae({page:e,limit:n,namespace:r||void 0,search:a||void 0}),{}),d=(s==null?void 0:s.items)||[],f=(s==null?void 0:s.total)||0,p=[{key:"name",header:"Name",render:x=>u.jsx("span",{children:x})},{key:"namespace",header:"Namespace",render:x=>u.jsx("span",{className:"namespace-badge",children:x})},{key:"schedule",header:"Schedule",render:x=>u.jsx("code",{className:"schedule-code",children:x})},{key:"suspend",header:"Status",render:x=>u.jsx(tt,{status:x?"Pending":"Running",label:x?"Suspended":"Active"})},{key:"succeeded",header:"Succeeded",render:x=>u.jsx("span",{children:x||0})},{key:"failed",header:"Failed",render:x=>u.jsx("span",{children:x||0})}],h=x=>{o(x.target.value),t(1)},m=x=>{i(x.target.value),t(1)},y=x=>{t(x)},g=Math.ceil(f/n);return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"cronjob-list",children:[u.jsx(Bn,{}),u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsx("h1",{children:"CronJobs"}),u.jsx("p",{children:"Manage scheduled jobs for periodic tasks"})]}),u.jsx("div",{className:"header-actions",children:u.jsx(W,{variant:"primary",children:"Create CronJob"})})]}),u.jsxs("div",{className:"filters",children:[u.jsx(ge,{placeholder:"Search cronjobs...",value:a,onChange:h,fullWidth:!0}),u.jsx(ge,{placeholder:"Filter by namespace...",value:r,onChange:m,fullWidth:!0})]}),l?u.jsxs("div",{className:"loading-container",children:[u.jsx(qt,{}),u.jsx("p",{children:"Loading cronjobs..."})]}):c?u.jsxs("div",{className:"error-message",children:["Error loading cronjobs: ",c.message]}):d.length===0?u.jsx("div",{className:"empty-state",children:u.jsx("p",{children:"No cronjobs found"})}):u.jsxs("div",{className:"table-container",children:[u.jsx(Cn,{data:d,columns:p,emptyMessage:"No cronjobs found"}),g>1&&u.jsxs("div",{className:"pagination",children:[u.jsx(W,{variant:"secondary",size:"sm",onClick:()=>y(e-1),disabled:e===1,children:"Previous"}),u.jsxs("span",{className:"page-info",children:["Page ",e," of ",g]}),u.jsx(W,{variant:"secondary",size:"sm",onClick:()=>y(e+1),disabled:e===g,children:"Next"})]})]})]}),u.jsx("style",{children:`
        .cronjob-list {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .page-header p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .filters {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        .empty-state {
          padding: 48px;
          text-align: center;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .table-container {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .page-info {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .namespace-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .schedule-code {
          display: inline-block;
          padding: 2px 8px;
          background: #1e1e1e;
          color: #10b981;
          border-radius: 4px;
          font-size: 12px;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        @media (max-width: 640px) {
          .filters {
            grid-template-columns: 1fr;
          }
        }
      `})]})}function ioe(){ct();const{showToast:e}=Ct(),[t,n]=v.useState(1),[r]=v.useState(20),[i,a]=v.useState(""),[o,s]=v.useState(!1),[l,c]=v.useState(!1),[d,f]=v.useState(null),[p,h]=v.useState(""),[m,y]=v.useState(""),[g,x]=v.useState(),[b,w]=v.useState(),[j,k]=v.useState(""),[P,S]=v.useState(""),{data:C,isLoading:N,error:_}=Ae(["pdbs",t,r,i],()=>Nae({page:t,limit:r,namespace:i||void 0})),M=(C==null?void 0:C.items)||[],R=(C==null?void 0:C.total)||0,G=Ne(async L=>{const Y={};return j&&P&&(Y[j]=P),await _ae(m,p,g,b,Object.keys(Y).length>0?Y:void 0)},{onSuccess:()=>{e({message:"PodDisruptionBudget created successfully",type:"success"}),s(!1),h(""),y(""),x(void 0),w(void 0),k(""),S(""),window.location.reload()},onError:L=>{e({message:`Failed to create PDB: ${L.message}`,type:"error"})}}),V=Ne(async L=>d?await Aae(d.namespace,d.name):Promise.resolve(),{onSuccess:()=>{e({message:"PodDisruptionBudget deleted successfully",type:"success"}),c(!1),f(null),window.location.reload()},onError:L=>{e({message:`Failed to delete PDB: ${L.message}`,type:"error"})}}),ee=[{key:"name",header:"Name"},{key:"namespace",header:"Namespace",render:(L,Y)=>u.jsx("span",{className:"namespace-badge",children:typeof L=="string"?L:String(L)})},{key:"minAvailable",header:"Min Available",render:(L,Y)=>typeof L=="number"&&L!==void 0?L:"-"},{key:"maxUnavailable",header:"Max Unavailable",render:(L,Y)=>typeof L=="number"&&L!==void 0?L:"-"},{key:"currentHealthy",header:"Current Healthy",render:(L,Y)=>{var re;return typeof L=="number"?`${L} / ${((re=M.find(Oe=>Oe.currentHealthy===L))==null?void 0:re.desiredHealthy)||"-"}`:"-"}},{key:"status",header:"Status",render:(L,Y)=>{const re=Y.currentHealthy>=Y.desiredHealthy;return u.jsx(tt,{status:re?"Running":"Pending",label:re?"Healthy":"Unhealthy"})}},{key:"actions",header:"Actions",render:(L,Y)=>u.jsx("div",{className:"action-buttons",children:u.jsx(W,{variant:"danger",size:"sm",onClick:()=>{f(Y),c(!0)},children:"Delete"})})}],Q=()=>{if(!p||!m){e({message:"Please fill in all required fields",type:"error"});return}if(g===void 0&&b===void 0){e({message:"Please specify either minAvailable or maxUnavailable",type:"error"});return}G.mutate()},te=L=>{a(L.target.value),n(1)},$=L=>{n(L)},B=Math.ceil(R/r);return u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"pdb-management",children:[u.jsx(Bn,{}),u.jsxs("div",{className:"page-header",children:[u.jsxs("div",{children:[u.jsx("h1",{children:"PodDisruptionBudgets"}),u.jsx("p",{children:"Manage pod disruption budgets for high availability"})]}),u.jsx("div",{className:"header-actions",children:u.jsx(W,{variant:"primary",onClick:()=>s(!0),children:"Create PDB"})})]}),u.jsx("div",{className:"filters",children:u.jsx(ge,{placeholder:"Filter by namespace...",value:i,onChange:te,fullWidth:!0})}),u.jsxs("div",{className:"info-banner",children:[u.jsx("div",{className:"info-icon",children:"ℹ️"}),u.jsxs("div",{className:"info-content",children:[u.jsx("strong",{children:"PodDisruptionBudgets"}),u.jsx("p",{children:"PDBs ensure minimum availability of pods during voluntary disruptions like node maintenance or deployment updates. Configure minAvailable or maxUnavailable to control disruption behavior."})]})]}),N?u.jsxs("div",{className:"loading-container",children:[u.jsx(qt,{}),u.jsx("p",{children:"Loading PodDisruptionBudgets..."})]}):_?u.jsxs("div",{className:"error-message",children:["Error loading PDBs: ",_.message]}):M.length===0?u.jsxs("div",{className:"empty-state",children:[u.jsx("p",{children:"No PodDisruptionBudgets found"}),u.jsx(W,{variant:"primary",onClick:()=>s(!0),children:"Create First PDB"})]}):u.jsxs("div",{className:"table-container",children:[u.jsx(Cn,{data:M,columns:ee,emptyMessage:"No PodDisruptionBudgets found"}),B>1&&u.jsxs("div",{className:"pagination",children:[u.jsx(W,{variant:"secondary",size:"sm",onClick:()=>$(t-1),disabled:t===1,children:"Previous"}),u.jsxs("span",{className:"page-info",children:["Page ",t," of ",B]}),u.jsx(W,{variant:"secondary",size:"sm",onClick:()=>$(t+1),disabled:t===B,children:"Next"})]})]})]}),u.jsx(hr,{isOpen:o,onClose:()=>s(!1),title:"Create PodDisruptionBudget",size:"md",children:u.jsxs("div",{className:"modal-form",children:[u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"Name *"}),u.jsx(ge,{value:p,onChange:L=>h(L.target.value),placeholder:"e.g., my-pdb",fullWidth:!0})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"Namespace *"}),u.jsx(ge,{value:m,onChange:L=>y(L.target.value),placeholder:"e.g., default",fullWidth:!0})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"Min Available (optional)"}),u.jsx(ge,{type:"number",value:g||"",onChange:L=>x(L.target.value?parseInt(L.target.value):void 0),placeholder:"e.g., 2",fullWidth:!0}),u.jsx("p",{className:"field-hint",children:"Minimum number of pods that must be available"})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"Max Unavailable (optional)"}),u.jsx(ge,{type:"number",value:b||"",onChange:L=>w(L.target.value?parseInt(L.target.value):void 0),placeholder:"e.g., 1",fullWidth:!0}),u.jsx("p",{className:"field-hint",children:"Maximum number of pods that can be unavailable"})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"Selector Key (optional)"}),u.jsx(ge,{value:j,onChange:L=>k(L.target.value),placeholder:"e.g., app",fullWidth:!0})]}),u.jsxs("div",{className:"form-group",children:[u.jsx("label",{children:"Selector Value (optional)"}),u.jsx(ge,{value:P,onChange:L=>S(L.target.value),placeholder:"e.g., my-app",fullWidth:!0}),u.jsx("p",{className:"field-hint",children:"Labels to match pods"})]}),u.jsxs("div",{className:"modal-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>s(!1),children:"Cancel"}),u.jsx(W,{variant:"primary",onClick:Q,loading:G.isPending,children:"Create PDB"})]})]})}),u.jsx(hr,{isOpen:l,onClose:()=>c(!1),title:"Delete PodDisruptionBudget",size:"sm",children:u.jsxs("div",{className:"modal-form",children:[u.jsx("p",{children:"Are you sure you want to delete this PodDisruptionBudget?"}),d&&u.jsxs("div",{className:"pdb-info",children:[u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Name:"}),u.jsx("span",{className:"info-value",children:d.name})]}),u.jsxs("div",{className:"info-row",children:[u.jsx("span",{className:"info-label",children:"Namespace:"}),u.jsx("span",{className:"info-value",children:d.namespace})]})]}),u.jsxs("div",{className:"warning-banner",children:[u.jsx("strong",{children:"Warning:"})," Deleting this PDB may affect pod availability during node maintenance."]}),u.jsxs("div",{className:"modal-actions",children:[u.jsx(W,{variant:"secondary",onClick:()=>c(!1),children:"Cancel"}),u.jsx(W,{variant:"danger",onClick:()=>V.mutate(),loading:V.isPending,children:"Delete PDB"})]})]})}),u.jsx("style",{children:`
        .pdb-management {
          padding: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .page-header h1 {
          margin: 0 0 8px 0;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        }

        .page-header p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .filters {
          margin-bottom: 24px;
        }

        .info-banner {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .info-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-content strong {
          display: block;
          margin-bottom: 4px;
          font-size: 14px;
          color: #1e40af;
        }

        .info-content p {
          margin: 0;
          font-size: 13px;
          color: #3b82f6;
          line-height: 1.5;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
        }

        .loading-container p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .error-message {
          padding: 16px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          color: #b91c1c;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding: 48px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .empty-state p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .table-container {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .namespace-badge {
          display: inline-block;
          padding: 2px 8px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .page-info {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .field-hint {
          margin: 8px 0 0 0;
          font-size: 12px;
          color: #6b7280;
        }

        .modal-form p {
          margin: 0;
          font-size: 14px;
          color: #374151;
        }

        .pdb-info {
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-size: 14px;
        }

        .info-label {
          color: #6b7280;
          font-weight: 500;
        }

        .info-value {
          color: #111827;
          font-weight: 600;
        }

        .warning-banner {
          padding: 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          font-size: 13px;
          color: #991b1b;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
        }
      `})]})}const aoe=a6([{path:"/login",element:u.jsx(tF,{})},{path:"/",element:u.jsx(J3,{children:u.jsx(X3,{})}),children:[{index:!0,element:u.jsx(nF,{})},{path:"cluster",children:[{index:!0,element:u.jsx(g7,{})},{path:"resources",element:u.jsx(y7,{})},{path:"metrics",element:u.jsx(Lie,{})},{path:"events",element:u.jsx(v7,{})},{path:"nodes",children:[{index:!0,element:u.jsx(Bie,{})},{path:":name",element:u.jsx(Hie,{})}]}]},{path:"namespaces",children:[{index:!0,element:u.jsx(Gie,{})},{path:"create",element:u.jsx(eae,{})},{path:":name/manage",element:u.jsx(rae,{})},{path:":name/edit",element:u.jsx(tae,{})},{path:":name",element:u.jsx(Jie,{})}]},{path:"profile",element:u.jsx(iae,{})},{path:"pods",children:[{index:!0,element:u.jsx(dae,{})},{path:":namespace/:name",element:u.jsx(fae,{})}]},{path:"deployments",children:[{index:!0,element:u.jsx(vae,{})},{path:"create",element:u.jsx(Gae,{})},{path:":namespace/:name",element:u.jsx(Tae,{})},{path:":namespace/:name/rollback",element:u.jsx(Qae,{})},{path:":namespace/:name/strategy",element:u.jsx(Xae,{})},{path:":namespace/:name/resources",element:u.jsx(Jae,{})},{path:":namespace/:name/env",element:u.jsx(eoe,{})},{path:":namespace/:name/clone",element:u.jsx(toe,{})}]},{path:"jobs",children:[{index:!0,element:u.jsx(noe,{})}]},{path:"cronjobs",children:[{index:!0,element:u.jsx(roe,{})}]},{path:"pdb",children:[{index:!0,element:u.jsx(ioe,{})}]},{path:"services",children:[{index:!0,element:u.jsx(Dae,{})}]},{path:"configmaps",children:[{index:!0,element:u.jsx($ae,{})}]},{path:"secrets",children:[{index:!0,element:u.jsx(Uae,{})}]},{path:"statefulsets",children:[{index:!0,element:u.jsx(Kae,{})}]},{path:"daemonsets",children:[{index:!0,element:u.jsx(qae,{})}]}]}]),ooe=new A$({defaultOptions:{queries:{staleTime:60*1e3,gcTime:5*60*1e3,retry:3,refetchOnWindowFocus:!1},mutations:{retry:1}}});function soe(){return u.jsx(T$,{client:ooe,children:u.jsx(q3,{children:u.jsx(Z3,{children:u.jsx(G3,{children:u.jsx(v6,{router:aoe})})})})})}Mg.createRoot(document.getElementById("root")).render(u.jsx(Zp.StrictMode,{children:u.jsx(soe,{})}));
