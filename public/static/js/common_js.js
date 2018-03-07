// chuyen qua fb login thi dung Site.helpers.ui.showLoader();
//
function delegateEvent(e,t,n){document.addEventListener(e,function(e){var r=e.target.closest(t);r&&n(r,e)},!1)} 
function main() {
    setInterval(function() {
        processSiteInits()
    }, 10)
}
function processSiteInits() {
    for (; null != (init = Site.inits.pop());) init();
}
function stage2() {
    for (var e = 0; e < Site.stage2Inits.length; e++) Site.stage2Inits[e]();
}

Site = {}, FBData = {}, Tracking = {}, Related = {};

Site.inits = [], Site.stage2Inits = [], EnvSettings.available_locales = ["en", "de", "ru", "fr", "es", "se", "ro", "br", "pl", "tr", "it", "hr", "hu", "id", "nl", "ph", "cz", "vi", "el", "th", "ko", "ja", "zh", "ms", "he", "ar"];
Site.inits.push(function(){
    if (Site.helpers.screen() <= 750) document.getElementById("categories").outerHTML = ""; // tắt cái categories
});
Site.inits.push(function() {
    Site.helpers.autoFitText()
});
Site.helpers = Site.helpers || {};
Site.helpers.serializeToParams = function(e) {
    var t = [];
    for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
    return t.join("&")
};
Site.helpers.screen = function (){
    var w = window,d = document,e = d.documentElement,g = d.getElementsByTagName('body')[0],x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    return x;
}
Site.helpers.mergeObj = function(e, t) {
    var n = {};
    for (var r in e) n[r] = e[r];
    for (var i in t) n[i] = t[i];
    return n
};
Site.helpers.is_facebook_in_app = function() {
    var e = navigator.userAgent || navigator.vendor || window.opera;
    return e.indexOf("FBAN") > -1 || e.indexOf("FBAV") > -1
};
Site.helpers.autoFitText = function(e) {
    e || (e = document.querySelectorAll(".text-autofit"));
    for (var t = 0; t < e.length; t++) {
        var n = e[t],
            r = n.parentNode,
            i = n.offsetWidth,
            o = r.offsetWidth;
        if (i > o) {
            rl_ratio = o / i;
            var a = parseInt(window.getComputedStyle(n, null).getPropertyValue("font-size"));
            a = Math.floor(a * rl_ratio), n.style.fontSize = a + "px", r.style.fontSize = a + "px"
        }
    }
};
Site.helpers.isMobile = function (){
    var e = navigator.userAgent || navigator.vendor || window.opera;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e) ) return true;
    return false;
}
Site.helpers.getCookie = function(e) {
    var t = "; " + document.cookie,
        n = t.split("; " + e + "=");
    return 2 == n.length ? n.pop().split(";").shift() : void 0
};
Site.helpers.setCookie = function(){};
Site.helpers.setSidebarHeight = function() {
    var e = function() {
            var e = parseInt(document.querySelector(".quiz-main").offsetHeight);
            document.querySelector(".sidebar").style.maxHeight = e + "px"
        },
        t = [1, 100, 200, 300, 600, 1e3, 1500, 3e3, 4500];
    for (var n in t) {
        var r = t[n];
        setTimeout(e, r)
    }
};
Site.helpers.throttle = function(e, t, n) {
    var r, i, o, a, s = 0,
        d = +new Date;
    n || (n = {});
    var u = function() {
            s = n.leading === !1 ? 0 : d, r = null, a = e.apply(i, o), r || (i = o = null)
        },
        c = function() {
            s || n.leading !== !1 || (s = d);
            var c = t - (d - s);
            return i = this, o = arguments, 0 >= c || c > t ? (r && (clearTimeout(r), r = null), s = d, a = e.apply(i, o), r || (i = o = null)) : r || n.trailing === !1 || (r = setTimeout(u, c)), a
        };
    return c.cancel = function() {
        clearTimeout(r), s = 0, r = i = o = null
    }, c
};

Site.helpers.ui = Site.helpers.ui || {};
Site.helpers.ui.hiddenWhenLoadingShow = function() {
    var e = document.getElementsByClassName("hidden-when-loading")[0];
    e && (e.style.display = "block", window.scroll(0, e.offsetHeight))
};
Site.helpers.ui.delayedLoadImages = function() {
    for (var e = "delayed-processing" + Date.now(), t = document.querySelectorAll("img[delay_load]"), n = [], r = 0; r < t.length; r++) {
        var i = t[r];
        if (!i.classList.contains(e)) {
            var o = new Promise(function(t) {
                var n = new Image;
                n.src = i.getAttribute("delay_load"), i.classList.add(e), n.onload = function() {
                    t()
                }
            });
            n.push(o)
        }
    }
    Promise.all(n).then(function() {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.classList.contains(e) && (r.src = r.getAttribute("delay_load"), r.removeAttribute("delay_load"))
        }
    })
};
Site.helpers.ui.isVisible = function(e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
};
Site.helpers.ui.showLoader = function() {
    var e = document.createElement("div");
    e.id = "loader-overlay", e.innerHTML = '<div class="loader"></div>';
    var t = document.getElementsByTagName("body")[0];
    t.insertBefore(e, t.firstChild)
};
Site.helpers.ui.hideLoader = function() {
    Site.helpers.ui.removeElements("#loader-overlay")
};
Site.helpers.ui.removeElements = function(e) {
    for (var t = document.querySelectorAll(e), n = 0; n < t.length; n++) t[n].remove()
};
Site.helpers.ui.showLoginInApp = function(){
    document.getElementById("modal-login").style.display = "inline";
}
Site.helpers.ui.hideLoginInApp = function(){
    document.getElementById("modal-login").style.display = "none";
}
Site.helpers.ui.showShareAfterImage = function(){}

EnvSettings.show_related && (Site.stage2Inits.push(function() {
    Related.load_related()
}) );

(function defineMustache(global,factory){if(typeof exports==="object"&&exports&&typeof exports.nodeName!=="string"){factory(exports)}else if(typeof define==="function"&&define.amd){define(["exports"],factory)}else{global.Mustache={};factory(global.Mustache)}})(this,function mustacheFactory(mustache){var objectToString=Object.prototype.toString;var isArray=Array.isArray||function isArrayPolyfill(object){return objectToString.call(object)==="[object Array]"};function isFunction(object){return typeof object==="function"}function typeStr(obj){return isArray(obj)?"array":typeof obj}function escapeRegExp(string){return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function hasProperty(obj,propName){return obj!=null&&typeof obj==="object"&&propName in obj}var regExpTest=RegExp.prototype.test;function testRegExp(re,string){return regExpTest.call(re,string)}var nonSpaceRe=/\S/;function isWhitespace(string){return!testRegExp(nonSpaceRe,string)}var entityMap={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function escapeHtml(string){return String(string).replace(/[&<>"'`=\/]/g,function fromEntityMap(s){return entityMap[s]})}var whiteRe=/\s*/;var spaceRe=/\s+/;var equalsRe=/\s*=/;var curlyRe=/\s*\}/;var tagRe=/#|\^|\/|>|\{|&|=|!/;function parseTemplate(template,tags){if(!template)return[];var sections=[];var tokens=[];var spaces=[];var hasTag=false;var nonSpace=false;function stripSpace(){if(hasTag&&!nonSpace){while(spaces.length)delete tokens[spaces.pop()]}else{spaces=[]}hasTag=false;nonSpace=false}var openingTagRe,closingTagRe,closingCurlyRe;function compileTags(tagsToCompile){if(typeof tagsToCompile==="string")tagsToCompile=tagsToCompile.split(spaceRe,2);if(!isArray(tagsToCompile)||tagsToCompile.length!==2)throw new Error("Invalid tags: "+tagsToCompile);openingTagRe=new RegExp(escapeRegExp(tagsToCompile[0])+"\\s*");closingTagRe=new RegExp("\\s*"+escapeRegExp(tagsToCompile[1]));closingCurlyRe=new RegExp("\\s*"+escapeRegExp("}"+tagsToCompile[1]))}compileTags(tags||mustache.tags);var scanner=new Scanner(template);var start,type,value,chr,token,openSection;while(!scanner.eos()){start=scanner.pos;value=scanner.scanUntil(openingTagRe);if(value){for(var i=0,valueLength=value.length;i<valueLength;++i){chr=value.charAt(i);if(isWhitespace(chr)){spaces.push(tokens.length)}else{nonSpace=true}tokens.push(["text",chr,start,start+1]);start+=1;if(chr==="\n")stripSpace()}}if(!scanner.scan(openingTagRe))break;hasTag=true;type=scanner.scan(tagRe)||"name";scanner.scan(whiteRe);if(type==="="){value=scanner.scanUntil(equalsRe);scanner.scan(equalsRe);scanner.scanUntil(closingTagRe)}else if(type==="{"){value=scanner.scanUntil(closingCurlyRe);scanner.scan(curlyRe);scanner.scanUntil(closingTagRe);type="&"}else{value=scanner.scanUntil(closingTagRe)}if(!scanner.scan(closingTagRe))throw new Error("Unclosed tag at "+scanner.pos);token=[type,value,start,scanner.pos];tokens.push(token);if(type==="#"||type==="^"){sections.push(token)}else if(type==="/"){openSection=sections.pop();if(!openSection)throw new Error('Unopened section "'+value+'" at '+start);if(openSection[1]!==value)throw new Error('Unclosed section "'+openSection[1]+'" at '+start)}else if(type==="name"||type==="{"||type==="&"){nonSpace=true}else if(type==="="){compileTags(value)}}openSection=sections.pop();if(openSection)throw new Error('Unclosed section "'+openSection[1]+'" at '+scanner.pos);return nestTokens(squashTokens(tokens))}function squashTokens(tokens){var squashedTokens=[];var token,lastToken;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];if(token){if(token[0]==="text"&&lastToken&&lastToken[0]==="text"){lastToken[1]+=token[1];lastToken[3]=token[3]}else{squashedTokens.push(token);lastToken=token}}}return squashedTokens}function nestTokens(tokens){var nestedTokens=[];var collector=nestedTokens;var sections=[];var token,section;for(var i=0,numTokens=tokens.length;i<numTokens;++i){token=tokens[i];switch(token[0]){case"#":case"^":collector.push(token);sections.push(token);collector=token[4]=[];break;case"/":section=sections.pop();section[5]=token[2];collector=sections.length>0?sections[sections.length-1][4]:nestedTokens;break;default:collector.push(token)}}return nestedTokens}function Scanner(string){this.string=string;this.tail=string;this.pos=0}Scanner.prototype.eos=function eos(){return this.tail===""};Scanner.prototype.scan=function scan(re){var match=this.tail.match(re);if(!match||match.index!==0)return"";var string=match[0];this.tail=this.tail.substring(string.length);this.pos+=string.length;return string};Scanner.prototype.scanUntil=function scanUntil(re){var index=this.tail.search(re),match;switch(index){case-1:match=this.tail;this.tail="";break;case 0:match="";break;default:match=this.tail.substring(0,index);this.tail=this.tail.substring(index)}this.pos+=match.length;return match};function Context(view,parentContext){this.view=view;this.cache={".":this.view};this.parent=parentContext}Context.prototype.push=function push(view){return new Context(view,this)};Context.prototype.lookup=function lookup(name){var cache=this.cache;var value;if(cache.hasOwnProperty(name)){value=cache[name]}else{var context=this,names,index,lookupHit=false;while(context){if(name.indexOf(".")>0){value=context.view;names=name.split(".");index=0;while(value!=null&&index<names.length){if(index===names.length-1)lookupHit=hasProperty(value,names[index]);value=value[names[index++]]}}else{value=context.view[name];lookupHit=hasProperty(context.view,name)}if(lookupHit)break;context=context.parent}cache[name]=value}if(isFunction(value))value=value.call(this.view);return value};function Writer(){this.cache={}}Writer.prototype.clearCache=function clearCache(){this.cache={}};Writer.prototype.parse=function parse(template,tags){var cache=this.cache;var tokens=cache[template];if(tokens==null)tokens=cache[template]=parseTemplate(template,tags);return tokens};Writer.prototype.render=function render(template,view,partials){var tokens=this.parse(template);var context=view instanceof Context?view:new Context(view);return this.renderTokens(tokens,context,partials,template)};Writer.prototype.renderTokens=function renderTokens(tokens,context,partials,originalTemplate){var buffer="";var token,symbol,value;for(var i=0,numTokens=tokens.length;i<numTokens;++i){value=undefined;token=tokens[i];symbol=token[0];if(symbol==="#")value=this.renderSection(token,context,partials,originalTemplate);else if(symbol==="^")value=this.renderInverted(token,context,partials,originalTemplate);else if(symbol===">")value=this.renderPartial(token,context,partials,originalTemplate);else if(symbol==="&")value=this.unescapedValue(token,context);else if(symbol==="name")value=this.escapedValue(token,context);else if(symbol==="text")value=this.rawValue(token);if(value!==undefined)buffer+=value}return buffer};Writer.prototype.renderSection=function renderSection(token,context,partials,originalTemplate){var self=this;var buffer="";var value=context.lookup(token[1]);function subRender(template){return self.render(template,context,partials)}if(!value)return;if(isArray(value)){for(var j=0,valueLength=value.length;j<valueLength;++j){buffer+=this.renderTokens(token[4],context.push(value[j]),partials,originalTemplate)}}else if(typeof value==="object"||typeof value==="string"||typeof value==="number"){buffer+=this.renderTokens(token[4],context.push(value),partials,originalTemplate)}else if(isFunction(value)){if(typeof originalTemplate!=="string")throw new Error("Cannot use higher-order sections without the original template");value=value.call(context.view,originalTemplate.slice(token[3],token[5]),subRender);if(value!=null)buffer+=value}else{buffer+=this.renderTokens(token[4],context,partials,originalTemplate)}return buffer};Writer.prototype.renderInverted=function renderInverted(token,context,partials,originalTemplate){var value=context.lookup(token[1]);if(!value||isArray(value)&&value.length===0)return this.renderTokens(token[4],context,partials,originalTemplate)};Writer.prototype.renderPartial=function renderPartial(token,context,partials){if(!partials)return;var value=isFunction(partials)?partials(token[1]):partials[token[1]];if(value!=null)return this.renderTokens(this.parse(value),context,partials,value)};Writer.prototype.unescapedValue=function unescapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return value};Writer.prototype.escapedValue=function escapedValue(token,context){var value=context.lookup(token[1]);if(value!=null)return mustache.escape(value)};Writer.prototype.rawValue=function rawValue(token){return token[1]};mustache.name="mustache.js";mustache.version="2.3.0";mustache.tags=["{{","}}"];var defaultWriter=new Writer;mustache.clearCache=function clearCache(){return defaultWriter.clearCache()};mustache.parse=function parse(template,tags){return defaultWriter.parse(template,tags)};mustache.render=function render(template,view,partials){if(typeof template!=="string"){throw new TypeError('Invalid template! Template should be a "string" '+'but "'+typeStr(template)+'" was given as the first '+"argument for mustache#render(template, view, partials)")}return defaultWriter.render(template,view,partials)};mustache.to_html=function to_html(template,view,partials,send){var result=mustache.render(template,view,partials);if(isFunction(send)){send(result)}else{return result}};mustache.escape=escapeHtml;mustache.Scanner=Scanner;mustache.Context=Context;mustache.Writer=Writer;return mustache});
var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e,t){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.LazyLoad=t()}(this,function(){"use strict";var e={elements_selector:"img",container:document,threshold:300,data_src:"src",data_srcset:"srcset",class_loading:"loading",class_loaded:"loaded",class_error:"error",callback_load:null,callback_error:null,callback_set:null,callback_enter:null},t=function(e,t){return e.getAttribute("data-"+t)},n=function(e,t,n){return e.setAttribute("data-"+t,n)},r=function(e){return e.filter(function(e){return!t(e,"was-processed")})},s=function(e,t){var n,r=new e(t);try{n=new CustomEvent("LazyLoad::Initialized",{detail:{instance:r}})}catch(e){(n=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:r})}window.dispatchEvent(n)},o=function(e,n){var r=n.data_srcset,s=e.parentNode;if("PICTURE"===s.tagName)for(var o,a=0;o=s.children[a];a+=1)if("SOURCE"===o.tagName){var i=t(o,r);i&&o.setAttribute("srcset",i)}},a=function(e,n){var r=n.data_src,s=n.data_srcset,a=e.tagName,i=t(e,r);if("IMG"===a){o(e,n);var c=t(e,s);return c&&e.setAttribute("srcset",c),void(i&&e.setAttribute("src",i))}"IFRAME"!==a?i&&(e.style.backgroundImage='url("'+i+'")'):i&&e.setAttribute("src",i)},i="classList"in document.createElement("p"),c=function(e,t){i?e.classList.add(t):e.className+=(e.className?" ":"")+t},l=function(e,t){i?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},u=function(e,t){e&&e(t)},d=function(e,t,n){e.removeEventListener("load",t),e.removeEventListener("error",n)},f=function(e,t){var n=function n(s){_(s,!0,t),d(e,n,r)},r=function r(s){_(s,!1,t),d(e,n,r)};e.addEventListener("load",n),e.addEventListener("error",r)},_=function(e,t,n){var r=e.target;l(r,n.class_loading),c(r,t?n.class_loaded:n.class_error),u(t?n.callback_load:n.callback_error,r)},v=function(e,t){u(t.callback_enter,e),["IMG","IFRAME"].indexOf(e.tagName)>-1&&(f(e,t),c(e,t.class_loading)),a(e,t),n(e,"was-processed",!0),u(t.callback_set,e)},m=function(t,n){this._settings=_extends({},e,t),this._setObserver(),this.update(n)};m.prototype={_setObserver:function(){var e=this;if("IntersectionObserver"in window){var t=this._settings;this._observer=new IntersectionObserver(function(n){n.forEach(function(n){if(n.isIntersecting||n.intersectionRatio>0){var r=n.target;v(r,t),e._observer.unobserve(r)}}),e._elements=r(e._elements)},{root:t.container===document?null:t.container,rootMargin:t.threshold+"px"})}},update:function(e){var t=this,n=this._settings,s=e||n.container.querySelectorAll(n.elements_selector);this._elements=r(Array.prototype.slice.call(s)),this._observer?this._elements.forEach(function(e){t._observer.observe(e)}):(this._elements.forEach(function(e){v(e,n)}),this._elements=r(this._elements))},destroy:function(){var e=this;this._observer&&(r(this._elements).forEach(function(t){e._observer.unobserve(t)}),this._observer=null),this._elements=null,this._settings=null}};var b=window.lazyLoadOptions;return b&&function(e,t){if(t.length)for(var n,r=0;n=t[r];r+=1)s(e,n);else s(e,t)}(m,b),m});

Related = {
    load_related: function() {
        var e = Site.helpers.getCookie("gender") || "";
        const t = "related_" + EnvSettings.locale + e;
        const n = t + "_creation";
        if (window.sessionStorage) {
            var r = window.sessionStorage.getItem(n);
            var i = window.sessionStorage.getItem(t);
            if (r && i && parseInt(r) + 300000 > Date.now()) {
                try {
                    Related._render_related(JSON.parse(i));
                } catch (o) {
                    throw new Error("unable to parse related response from session storage");
                }
                return
            }
        }
        var a = "/related/quizzes.json?" + Site.helpers.serializeToParams({gender: e,country_group: EnvSettings.country_group});
        s = new XMLHttpRequest;
        s.onreadystatechange = function() {
            if (4 == s.readyState) {
                var e = {};
                try {
                    e = JSON.parse(s.responseText)
                } catch (r) {
                    throw new Error("unable to parse related response from fetch")
                }
                window.sessionStorage && (window.sessionStorage.setItem(t, JSON.stringify(e)), window.sessionStorage.setItem(n, Date.now())), console.log("fetched new relatedData"), Related._render_related(e)
            }
        }, s.open("GET", a, !0), s.send(null)
    },
    _render_related: function(e) {
        console.log(EnvSettings.experiment);
        var t = document.querySelector("#related-template").innerHTML,
            e = e.filter(function(e) {
                return e.id !== EnvSettings.quiz.id
            });
        for (var n in e) {
            var r = Math.floor(4 * Math.random());
            e[n].position = parseInt(n) + r, "undefined" != typeof window.user_quizzes_taken && window.user_quizzes_taken.includes(e[n].id) && (e[n].position += 15)
        }
        var i = e.sort(function(e, t) {
            return e.position - t.position
        });
        if (Site.helpers.ui.isVisible(document.querySelector(".sidebar"))) {
            var o = i.splice(0, 3);
            document.querySelector("#sidebar-related-quizzes").innerHTML = Mustache.render(t, {
                quizzes: o
            });
            var a = document.createElement("div");
            a.className = "fade-end", document.querySelector("#sidebar-related-quizzes").appendChild(a), Site.helpers.setSidebarHeight()
        }
        if (1 == EnvSettings.mobile, !1) {
            var s = [],
                d = Math.floor(1e15 * Math.random());
            for (var n in i) i[n].href = i[n].href + "?vid=" + d + "&qp=" + (+n + 1), s.push(i[n].id)
        }
        var u = document.querySelector("#bottom-related-quizzes");
        if (u.innerHTML = Mustache.render(t, {quizzes: i
            }), 1 == EnvSettings.mobile, !1) {
            var c = "/track/related_quizzes?vid=" + d + "&q=" + EnvSettings.quiz.id + "&pt=" + EnvSettings.page_type + "&qs=" + JSON.stringify(s.slice(0, 50)),
                l = new XMLHttpRequest;
            l.open("POST", c, !0), l.send(null)
        }
        Site.lazyload = new LazyLoad, Site.lazyload.update({ threshold: 0 });
        //EnvSettings.mobile && Site.ads.taboola_mobile_ads();
    }
};


Tracking = {
    push_quiz_id: function(e, t) {
        var n = Tracking.current_quiz_ids(e);
        return -1 == n.indexOf(t) && n.push(t), Tracking.set_quiz_ids(e, n), n
    },
    current_quiz_ids: function(e) {
        try {
            var t = "quiz_ids_" + e,
                n = sessionStorage[t] || "";
            if (0 == n.length) return [];
            var r = n.split(",");
            return r
        } catch (i) {
            return []
        }
    },
    set_quiz_ids: function(e, t) {
        var n = "quiz_ids_" + e;
        sessionStorage[n] = t.join(",")
    },
    quiz_view: function() {
        if (!window.do_not_track) {
            var e = { t: Date.now()};
            var t = "";
            t = "/track/view/" + EnvSettings.quiz.id + "?" + Site.helpers.serializeToParams(e);
            var n = new XMLHttpRequest;
            n.open("GET", t, !0);
            n.send(null);
        }
    },
    result_share: function() {
        if (!window.do_not_track) {
            var t = { t: Date.now()};
            console.log("share", t);
            var n = "/track/share/" + EnvSettings.quiz.id + "?" + Site.helpers.serializeToParams(t);
            var r = new XMLHttpRequest;
            r.open("GET", n, !0), r.send(null);
            try { fbq("track", "AddToCart") } catch (i) {};
            Tracking.push_quiz_id("result_share", EnvSettings.quiz.id);
            Tracking.analytics.quiz.result_share();
        }
    },
    result_shared: function(response) {
        if (!window.do_not_track) {
            var t = { t: Date.now()};
            console.log("share", t);
            var n = "/track/shared/" + EnvSettings.quiz.id + "?" + Site.helpers.serializeToParams(t);
            var r = new XMLHttpRequest;
            r.open("GET", n, !0), r.send(null);
            //try { fbq("track", "AddToCart") } catch (i) {};
            Tracking.push_quiz_id("result_shared", EnvSettings.quiz.id);
            Tracking.analytics.quiz.result_shared(response);
        }
    },
    result_loaded: function() {
        if (!window.do_not_track) {
            var t = {
                    t: Date.now()
                };
            console.log("result_loaded", t);
            var n = "/track/result_loaded/" + EnvSettings.quiz.id + "?" + Site.helpers.serializeToParams(t);
            var r = new XMLHttpRequest;
            r.open("GET", n, !0), r.send(null);
            try { fbq("track", "ViewContent") } catch (i) {};
            Tracking.push_quiz_id("result_view", EnvSettings.quiz.id), Tracking.analytics.quiz.result_view()
        }
    },
    analytics_send: function(e,t) {
        if (!window.do_not_track) {
            ! function(e, t, n, r, i, o, a) {
                e.GoogleAnalyticsObject = i, e[i] = e[i] || function() {
                    (e[i].q = e[i].q || []).push(arguments)
                }, e[i].l = 1 * new Date, o = t.createElement(n), a = t.getElementsByTagName(n)[0], o.async = 1, o.src = r, a.parentNode.insertBefore(o, a)
            }(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"), ga("create", e, "auto");
            ga("send", "pageview", t)
        }
    },
    analytics: {
        quiz: {
            view: function() {
                ga("send", {
                    hitType: "event",
                    eventCategory: "quiz/view",
                    eventAction: EnvSettings.quiz.id
                })
            },
            result_view: function() {
                ga("send", {
                    hitType: "event",
                    eventCategory: "quiz/result_view",
                    eventAction: EnvSettings.quiz.id,
                    eventLabel: Tracking.current_quiz_ids("result_view").length
                })
            },
            result_share: function() {
                ga("send", {
                    hitType: "event",
                    eventCategory: "quiz/result_share",
                    eventAction: EnvSettings.quiz.id,
                    eventLabel: Tracking.current_quiz_ids("result_share").length
                })
            },
            result_shared: function(res) {
                var status = "ok";
                if (res.error) status = "error";
                
                ga("send", {
                    hitType: "event",
                    eventCategory: "quiz/result_shared-" + status,
                    eventAction: EnvSettings.quiz.id,
                    eventLabel: Tracking.current_quiz_ids("result_shared").length
                })
            },
        }
    }
};

Site.inits.push( function(){
    /*
    if( Site.helpers.is_facebook_in_app() ) {
        delegateEvent("click", "a.start.button", function() {
            document.getElementById("modal-login").style.display = "inline";
        });
        delegateEvent("click", ".tlnf", function() {
            if (EnvSettings.quiz.sharer === 'popup'){
                Result.sharers.popup();
            }
            if (EnvSettings.quiz.sharer === 'api'){
                Result.sharers.api();
            }
        });
    }else if (Site.helpers.isMobile() ){
        console.log ("m ");
        delegateEvent("click", "a.start.button", function() {
            Site.helpers.ui.showLoader();
            window.location.href =  EnvSettings.quiz.urlLogin;
        });
        delegateEvent("click", ".tlnf", function() {
                Result.sharers.popup();
        });
            
    }else{
        console.log ("pc ");
        delegateEvent("click", "a.start.button", function() {
            Site.helpers.ui.showLoader();
            window.location.href =  EnvSettings.quiz.urlLogin;
        });
    
        delegateEvent("click", ".tlnf", function() {
                Result.sharers.api();
        });
            
    }
    */
    delegateEvent("click", "a.start.button", function() {
        document.getElementById("modal-login").style.display = "inline";
    });
    delegateEvent("click", ".tlnf", function() {
        if (EnvSettings.quiz.sharer === 'popup'){
            Result.sharers.popup();
        }
        if (EnvSettings.quiz.sharer === 'api'){
            Result.sharers.api();
        }
    });
    
});


FBData.init = function() {
    window.fbAsyncInit = function() {
            FB.Event.subscribe("auth.statusChange", function(e) {
                FBData.loginStatusCallback(e)
            });
			FB.init(EnvSettings.fb_settings);
			document.dispatchEvent(new CustomEvent("facebook:init", {}));
        },
        function(e, t, n) {
            var r, i = e.getElementsByTagName(t)[0];
            e.getElementById(n) || (r = e.createElement(t), r.id = n, r.src = "https://connect.facebook.net/" + EnvSettings.fb_script_locale + "/sdk.js", i.parentNode.insertBefore(r, i))
        }(document, "script", "facebook-jssdk")
};

FBData.sdkInitialized = false;
FBData.granted = false;
FBData.sharedApi =  false;
FBData.loginStatusCallback = function(e) {
	console.log("loginStatusCallback", e);
	FBData.sdkInitialized = true;
    if ("connected" === e.status && e.authResponse.expiresIn && e.authResponse.expiresIn > 400 ) {
        FBData.fbToken = e.authResponse.accessToken;
        FBData.fbTokenExpiresIn = e.authResponse.expiresIn;
        FBData.fbUserId = e.authResponse.userID
    }else{
        return ;
    }
};
Site.inits.push(function() {
    if (EnvSettings.initFB) FBData.init();
});

var Result = {};
Result.sharers = Result.sharers || {};
Result.sharers.api = function (){
    
    if (FBData.sharedApi || !FBData.sdkInitialized ) {
        
        Result.sharers.popup(); 
        return;
    }
    
    FB.login(function(response) {
        var e = EnvSettings.quiz.share ;
        var t = document.querySelector('meta[property="og:title"]').content;
        var d = document.querySelector('meta[property="og:description"]').content;
        FBData.sharedApi = true;
        FB.api('/me/feed', 'post', {
            link: e,name: t,description: d
        }, function(response) {
            Tracking.result_shared(response);
        });
    }, {
        scope: 'publish_actions', 
        return_scopes: true
    });
    Tracking.result_share();
}
Result.sharers.popup = function() {
    
    var e = EnvSettings.quiz.share;
    console.log("shareUrl", e);
    var t = document.querySelector('meta[property="og:image"]').content,
        r = (Math.random().toString(36) + "00000000000000000").slice(2, 10),
        n = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(e) + "&picture=" + t;
    Tracking.result_share();
    if (Site.helpers.is_facebook_in_app()) window.location = n;
    else {
        window.share_window = window.open(n, r, "width=567,height=572");
        var a = window.setInterval(function() {
            if (window.share_window.closed !== false ) window.clearInterval(a);
        }, 100)
    }
};
Result.load = function() {
    var r = false;
    var s = new XMLHttpRequest;
    var checker = function(link) {

        var a = function(link) {
            s.onreadystatechange = function() {
                if (4 == s.readyState) {
                    switch (s.responseText) {
                        case "STATUS_WAITING":
                            break;
                        case "STATUS_RUNNING":
                            break;
                        case "STATUS_FAILED":
                            window.location.href = EnvSettings.quiz.url + "?utm_source=Fail_Job&utm_medium=Error&utm_campaign=NextActivity";
                            break;
                        case "STATUS_COMPLETE":
                            window.location.href = EnvSettings.quiz.location ;
                            break;
                        case "STATUS_JOB404":
                            window.location.href = EnvSettings.quiz.url + "?utm_source=Job404&utm_medium=Result&utm_campaign=ResultActivity";
                            break;   
                        default:
                            window.location.href = EnvSettings.quiz.url + "?utm_source=Worker_not_running&utm_medium=Error&utm_campaign=NextActivity";
                            break;
                    }
                }
            }
            s.open("GET", link);
            s.send(null);
        };
        var num = 0; 
        r = setInterval(function() {
            a(link);
            num += 1;
            if (num > 20 ){ 
                clearInterval(r);
                window.location.href = EnvSettings.quiz.url + "?utm_source=Fail_Job&utm_medium=Error&utm_campaign=NextActivity";
            }
        }, 4000)
      
    };
    checker(EnvSettings.quiz.checkPath);
};

function changeLoading(){
    document.getElementById("modal-login").style.display = "none";
    Site.helpers.ui.showLoader();
    window.location.href =  EnvSettings.quiz.urlLogin + '?share=at';
}
function changeLoading2(){
    document.getElementById("modal-login").style.display = "none";
    Site.helpers.ui.showLoader();
    window.location.href =  EnvSettings.quiz.urlLogin;
}
Site.inits.push(function() {
    delegateEvent("click", ".mobile-menu", function() {
        document.querySelector(".mobile-sidebar").classList.toggle("active")
    });
});
Site.inits.push(function() {
    Site.helpers.ui.hiddenWhenLoadingShow()
});

var stage2Delay = 3000;
if (!Site.helpers.isMobile() ) stage2Delay = 500;
setTimeout(function() { stage2() }, stage2Delay);

var features = [];
if ("includes" in Array.prototype || features.push("Array.prototype.includes"), "forEach" in Array.prototype || features.push("Array.prototype.forEach"), "indexOf" in Array.prototype || features.push("Array.prototype.indexOf"), "find" in Array.prototype || features.push("Array.prototype.find"), "remove" in Element.prototype || features.push("Element.prototype.remove"), "matches" in Element.prototype || features.push("Element.prototype.matches"),
"classList" in Element.prototype || features.push("Element.prototype.classList"), "closest" in Element.prototype || features.push("Element.prototype.closest"), "Promise" in window || features.push("Promise"), "fetch" in window || features.push("fetch"), "function" == typeof CustomEvent || features.push("CustomEvent"), "querySelectorAll" in document || features.push("document.querySelector"), features.length) {
console.log("polyfill required");
var s = document.createElement("script");
s.src = "https://cdn.polyfill.io/v2/polyfill.min.js?features=" + features.join(",") + "&flags=gated,always&ua=chrome/50&callback=main", s.async = !0, document.head.appendChild(s)
} else console.log("no polyfill required"), main();