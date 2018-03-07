function delegateEvent(e, t, n) {
    document.addEventListener(e, function (e) {
        var r = e.target.closest(t);
        r && n(r, e)
    }, !1)
}

function sendAdserverRequest() {
    sendAdserverRequestCalledAtLeastOnce = !0, EnvSettings.readyForAds && (pbjs.adserverRequestSent || (EnvSettings.initAds && window.history && history.pushState && history.replaceState(null, null, window.location.href + "?init=" + Math.floor(Date.now() / 1e3)), pbjs.adserverRequestSent = !0, googletag.cmd.push(function () {
        pbjs.que.push(function () {
            pbjs.setTargetingForGPTAsync(), googletag.pubads().refresh()
        })
    }), EnvSettings.initAds && window.history && history.pushState && setTimeout(function () {
        history.replaceState(null, null, window.location.href.replace(/\?init=\d+/, ""))
    }, 100)))
}

function main() {
    setInterval(function () {
        processSiteInits()
    }, 10)
}

function processSiteInits() {
    for (; null != (init = Site.inits.pop());) init()
}

function stage2() {
    for (var e = 0; e < Site.stage2Inits.length; e++) Site.stage2Inits[e]()
}
console.log("common_init.js"), Site = {}, FBData = {}, Tracking = {}, Related = {}, AdSettings = {}, Site.inits = [], Site.stage2Inits = [], EnvSettings.available_locales = ["en", "de", "ru", "fr", "es", "se", "ro", "br", "pl", "tr", "it", "hr", "hu", "id", "nl", "ph", "cz", "vi", "el", "th", "ko", "ja", "zh", "ms", "he", "ar"], Site.inits.push(function () {
        Site.helpers.autoFitText()
    }), Site.helpers = Site.helpers || {}, Site.helpers.serializeToParams = function (e) {
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t.join("&")
    }, Site.helpers.mergeObj = function (e, t) {
        var n = {};
        for (var r in e) n[r] = e[r];
        for (var i in t) n[i] = t[i];
        return n
    }, Site.helpers.is_facebook_in_app = function () {
        var e = navigator.userAgent || navigator.vendor || window.opera;
        return e.indexOf("FBAN") > -1 || e.indexOf("FBAV") > -1
    }, Site.helpers.autoFitText = function (e) {
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
    }, Site.helpers.getCookie = function (e) {
        var t = "; " + document.cookie,
            n = t.split("; " + e + "=");
        return 2 == n.length ? n.pop().split(";").shift() : void 0
    }, Site.helpers.ui = Site.helpers.ui || {}, Site.helpers.ui.hiddenWhenLoadingShow = function () {
        var e = document.getElementsByClassName("hidden-when-loading")[0];
        e && (e.style.display = "block", window.scroll(0, e.offsetHeight))
    }, Site.helpers.ui.delayedLoadImages = function () {
        for (var e = "delayed-processing" + Date.now(), t = document.querySelectorAll("img[delay_load]"), n = [], r = 0; r < t.length; r++) {
            var i = t[r];
            if (!i.classList.contains(e)) {
                var o = new Promise(function (t) {
                    var n = new Image;
                    n.src = i.getAttribute("delay_load"), i.classList.add(e), n.onload = function () {
                        t()
                    }
                });
                n.push(o)
            }
        }
        Promise.all(n).then(function () {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.classList.contains(e) && (r.src = r.getAttribute("delay_load"), r.removeAttribute("delay_load"))
            }
        })
    }, Site.helpers.ui.isVisible = function (e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, Site.helpers.ui.showLoader = function () {
        var e = document.createElement("div");
        e.id = "loader-overlay", e.innerHTML = '<div class="loader"></div>';
        var t = document.getElementsByTagName("body")[0];
        t.insertBefore(e, t.firstChild)
    }, Site.helpers.ui.hideLoader = function () {
        Site.helpers.ui.removeElements("#loader-overlay")
    }, Site.helpers.ui.removeElements = function (e) {
        for (var t = document.querySelectorAll(e), n = 0; n < t.length; n++) t[n].remove()
    }, Site.helpers.setSidebarHeight = function () {
        var e = function () {
                var e = parseInt(document.querySelector(".quiz-main").offsetHeight);
                document.querySelector(".sidebar").style.maxHeight = e + "px"
            },
            t = [1, 100, 200, 300, 600, 1e3, 1500, 3e3, 4500];
        for (var n in t) {
            var r = t[n];
            setTimeout(e, r)
        }
    }, Site.helpers.throttle = function (e, t, n) {
        var r, i, o, a, s = 0,
            d = +new Date;
        n || (n = {});
        var u = function () {
                s = n.leading === !1 ? 0 : d, r = null, a = e.apply(i, o), r || (i = o = null)
            },
            c = function () {
                s || n.leading !== !1 || (s = d);
                var c = t - (d - s);
                return i = this, o = arguments, 0 >= c || c > t ? (r && (clearTimeout(r), r = null), s = d, a = e.apply(i, o), r || (i = o = null)) : r || n.trailing === !1 || (r = setTimeout(u, c)), a
            };
        return c.cancel = function () {
            clearTimeout(r), s = 0, r = i = o = null
        }, c
    },
    function (e, t) {
        "object" == typeof exports && exports && "string" != typeof exports.nodeName ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : (e.Mustache = {}, t(e.Mustache))
    }(this, function (e) {
        function t(e) {
            return "function" == typeof e
        }

        function n(e) {
            return m(e) ? "array" : typeof e
        }

        function r(e) {
            return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }

        function i(e, t) {
            return null != e && "object" == typeof e && t in e
        }

        function o(e, t) {
            return b.call(e, t)
        }

        function a(e) {
            return !o(v, e)
        }

        function s(e) {
            return String(e).replace(/[&<>"'`=\/]/g, function (e) {
                return h[e]
            })
        }

        function d(t, n) {
            function i() {
                if (v && !h)
                    for (; b.length;) delete g[b.pop()];
                else b = [];
                v = !1, h = !1
            }

            function o(e) {
                if ("string" == typeof e && (e = e.split(S, 2)), !m(e) || 2 !== e.length) throw new Error("Invalid tags: " + e);
                s = new RegExp(r(e[0]) + "\\s*"), d = new RegExp("\\s*" + r(e[1])), f = new RegExp("\\s*" + r("}" + e[1]))
            }
            if (!t) return [];
            var s, d, f, p = [],
                g = [],
                b = [],
                v = !1,
                h = !1;
            o(n || e.tags);
            for (var T, A, I, B, C, j, O = new l(t); !O.eos();) {
                if (T = O.pos, I = O.scanUntil(s))
                    for (var R = 0, k = I.length; k > R; ++R) B = I.charAt(R), a(B) ? b.push(g.length) : h = !0, g.push(["text", B, T, T + 1]), T += 1, "\n" === B && i();
                if (!O.scan(s)) break;
                if (v = !0, A = O.scan(E) || "name", O.scan(y), "=" === A ? (I = O.scanUntil(w), O.scan(w), O.scanUntil(d)) : "{" === A ? (I = O.scanUntil(f), O.scan(_), O.scanUntil(d), A = "&") : I = O.scanUntil(d), !O.scan(d)) throw new Error("Unclosed tag at " + O.pos);
                if (C = [A, I, T, O.pos], g.push(C), "#" === A || "^" === A) p.push(C);
                else if ("/" === A) {
                    if (j = p.pop(), !j) throw new Error('Unopened section "' + I + '" at ' + T);
                    if (j[1] !== I) throw new Error('Unclosed section "' + j[1] + '" at ' + T)
                } else "name" === A || "{" === A || "&" === A ? h = !0 : "=" === A && o(I)
            }
            if (j = p.pop()) throw new Error('Unclosed section "' + j[1] + '" at ' + O.pos);
            return c(u(g))
        }

        function u(e) {
            for (var t, n, r = [], i = 0, o = e.length; o > i; ++i) t = e[i], t && ("text" === t[0] && n && "text" === n[0] ? (n[1] += t[1], n[3] = t[3]) : (r.push(t), n = t));
            return r
        }

        function c(e) {
            for (var t, n, r = [], i = r, o = [], a = 0, s = e.length; s > a; ++a) switch (t = e[a], t[0]) {
                case "#":
                case "^":
                    i.push(t), o.push(t), i = t[4] = [];
                    break;
                case "/":
                    n = o.pop(), n[5] = t[2], i = o.length > 0 ? o[o.length - 1][4] : r;
                    break;
                default:
                    i.push(t)
            }
            return r
        }

        function l(e) {
            this.string = e, this.tail = e, this.pos = 0
        }

        function f(e, t) {
            this.view = e, this.cache = {
                ".": this.view
            }, this.parent = t
        }

        function p() {
            this.cache = {}
        }
        var g = Object.prototype.toString,
            m = Array.isArray || function (e) {
                return "[object Array]" === g.call(e)
            },
            b = RegExp.prototype.test,
            v = /\S/,
            h = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;",
                "`": "&#x60;",
                "=": "&#x3D;"
            },
            y = /\s*/,
            S = /\s+/,
            w = /\s*=/,
            _ = /\s*\}/,
            E = /#|\^|\/|>|\{|&|=|!/;
        l.prototype.eos = function () {
            return "" === this.tail
        }, l.prototype.scan = function (e) {
            var t = this.tail.match(e);
            if (!t || 0 !== t.index) return "";
            var n = t[0];
            return this.tail = this.tail.substring(n.length), this.pos += n.length, n
        }, l.prototype.scanUntil = function (e) {
            var t, n = this.tail.search(e);
            switch (n) {
                case -1:
                    t = this.tail, this.tail = "";
                    break;
                case 0:
                    t = "";
                    break;
                default:
                    t = this.tail.substring(0, n), this.tail = this.tail.substring(n)
            }
            return this.pos += t.length, t
        }, f.prototype.push = function (e) {
            return new f(e, this)
        }, f.prototype.lookup = function (e) {
            var n, r = this.cache;
            if (r.hasOwnProperty(e)) n = r[e];
            else {
                for (var o, a, s = this, d = !1; s;) {
                    if (e.indexOf(".") > 0)
                        for (n = s.view, o = e.split("."), a = 0; null != n && a < o.length;) a === o.length - 1 && (d = i(n, o[a])), n = n[o[a++]];
                    else n = s.view[e], d = i(s.view, e);
                    if (d) break;
                    s = s.parent
                }
                r[e] = n
            }
            return t(n) && (n = n.call(this.view)), n
        }, p.prototype.clearCache = function () {
            this.cache = {}
        }, p.prototype.parse = function (t, n) {
            var r = this.cache,
                i = r[t];
            return null == i && (i = r[t + ":" + (n || e.tags).join(":")] = d(t, n)), i
        }, p.prototype.render = function (e, t, n) {
            var r = this.parse(e),
                i = t instanceof f ? t : new f(t);
            return this.renderTokens(r, i, n, e)
        }, p.prototype.renderTokens = function (e, t, n, r) {
            for (var i, o, a, s = "", d = 0, u = e.length; u > d; ++d) a = void 0, i = e[d], o = i[0], "#" === o ? a = this.renderSection(i, t, n, r) : "^" === o ? a = this.renderInverted(i, t, n, r) : ">" === o ? a = this.renderPartial(i, t, n, r) : "&" === o ? a = this.unescapedValue(i, t) : "name" === o ? a = this.escapedValue(i, t) : "text" === o && (a = this.rawValue(i)), void 0 !== a && (s += a);
            return s
        }, p.prototype.renderSection = function (e, n, r, i) {
            function o(e) {
                return a.render(e, n, r)
            }
            var a = this,
                s = "",
                d = n.lookup(e[1]);
            if (d) {
                if (m(d))
                    for (var u = 0, c = d.length; c > u; ++u) s += this.renderTokens(e[4], n.push(d[u]), r, i);
                else if ("object" == typeof d || "string" == typeof d || "number" == typeof d) s += this.renderTokens(e[4], n.push(d), r, i);
                else if (t(d)) {
                    if ("string" != typeof i) throw new Error("Cannot use higher-order sections without the original template");
                    d = d.call(n.view, i.slice(e[3], e[5]), o), null != d && (s += d)
                } else s += this.renderTokens(e[4], n, r, i);
                return s
            }
        }, p.prototype.renderInverted = function (e, t, n, r) {
            var i = t.lookup(e[1]);
            return !i || m(i) && 0 === i.length ? this.renderTokens(e[4], t, n, r) : void 0
        }, p.prototype.renderPartial = function (e, n, r) {
            if (r) {
                var i = t(r) ? r(e[1]) : r[e[1]];
                return null != i ? this.renderTokens(this.parse(i), n, r, i) : void 0
            }
        }, p.prototype.unescapedValue = function (e, t) {
            var n = t.lookup(e[1]);
            return null != n ? n : void 0
        }, p.prototype.escapedValue = function (t, n) {
            var r = n.lookup(t[1]);
            return null != r ? e.escape(r) : void 0
        }, p.prototype.rawValue = function (e) {
            return e[1]
        }, e.name = "mustache.js", e.version = "2.3.0", e.tags = ["{{", "}}"];
        var T = new p;
        return e.clearCache = function () {
            return T.clearCache()
        }, e.parse = function (e, t) {
            return T.parse(e, t)
        }, e.render = function (e, t, r) {
            if ("string" != typeof e) throw new TypeError('Invalid template! Template should be a "string" but "' + n(e) + '" was given as the first argument for mustache#render(template, view, partials)');
            return T.render(e, t, r)
        }, e.to_html = function (n, r, i, o) {
            var a = e.render(n, r, i);
            return t(o) ? void o(a) : a
        }, e.escape = s, e.Scanner = l, e.Context = f, e.Writer = p, e
    });
var _extends = Object.assign || function (e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    },
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
! function (e, t) {
    "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.LazyLoad = t()
}(this, function () {
    "use strict";
    var e = {
            elements_selector: "img",
            container: window,
            threshold: 300,
            throttle: 150,
            data_src: "src",
            data_srcset: "srcset",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            class_initial: "initial",
            skip_invisible: !0,
            callback_load: null,
            callback_error: null,
            callback_set: null,
            callback_processed: null
        },
        t = !("onscroll" in window) || /glebot/.test(navigator.userAgent),
        n = function (e, t) {
            e && e(t)
        },
        r = function (e) {
            return e.getBoundingClientRect().top + window.pageYOffset - e.ownerDocument.documentElement.clientTop
        },
        i = function (e, t, n) {
            var i = t === window ? window.innerHeight + window.pageYOffset : r(t) + t.offsetHeight;
            return i <= r(e) - n
        },
        o = function (e) {
            return e.getBoundingClientRect().left + window.pageXOffset - e.ownerDocument.documentElement.clientLeft
        },
        a = function (e, t, n) {
            var r = window.innerWidth,
                i = t === window ? r + window.pageXOffset : o(t) + r;
            return i <= o(e) - n
        },
        s = function (e, t, n) {
            var i = t === window ? window.pageYOffset : r(t);
            return i >= r(e) + n + e.offsetHeight
        },
        d = function (e, t, n) {
            var r = t === window ? window.pageXOffset : o(t);
            return r >= o(e) + n + e.offsetWidth
        },
        u = function (e, t, n) {
            return !(i(e, t, n) || s(e, t, n) || a(e, t, n) || d(e, t, n))
        },
        c = function (e, t) {
            var n, r = "LazyLoad::Initialized",
                i = new e(t);
            try {
                n = new CustomEvent(r, {
                    detail: {
                        instance: i
                    }
                })
            } catch (o) {
                n = document.createEvent("CustomEvent"), n.initCustomEvent(r, !1, !1, {
                    instance: i
                })
            }
            window.dispatchEvent(n)
        },
        l = function (e, t) {
            var n = t.length;
            if (n)
                for (var r = 0; n > r; r++) c(e, t[r]);
            else c(e, t)
        },
        f = "data-",
        p = function (e, t) {
            return e.getAttribute(f + t)
        },
        g = function (e, t, n) {
            return e.setAttribute(f + t, n)
        },
        m = function (e, t) {
            var n = e.parentNode;
            if ("PICTURE" === n.tagName)
                for (var r = 0; r < n.children.length; r++) {
                    var i = n.children[r];
                    if ("SOURCE" === i.tagName) {
                        var o = p(i, t);
                        o && i.setAttribute("srcset", o)
                    }
                }
        },
        b = function (e, t, n) {
            var r = e.tagName,
                i = p(e, n);
            if ("IMG" === r) {
                m(e, t);
                var o = p(e, t);
                return o && e.setAttribute("srcset", o), void(i && e.setAttribute("src", i))
            }
            return "IFRAME" === r ? void(i && e.setAttribute("src", i)) : void(i && (e.style.backgroundImage = 'url("' + i + '")'))
        },
        v = "classList" in document.createElement("p"),
        h = function (e, t) {
            return v ? void e.classList.add(t) : void(e.className += (e.className ? " " : "") + t)
        },
        y = function (e, t) {
            return v ? void e.classList.remove(t) : void(e.className = e.className.replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, ""))
        },
        S = function (t) {
            this._settings = _extends({}, e, t), this._queryOriginNode = this._settings.container === window ? document : this._settings.container, this._previousLoopTime = 0, this._loopTimeout = null, this._boundHandleScroll = this.handleScroll.bind(this), this._isFirstLoop = !0, window.addEventListener("resize", this._boundHandleScroll), this.update()
        };
    S.prototype = {
        _reveal: function (e) {
            var t = this._settings,
                r = function o() {
                    t && (e.removeEventListener("load", i), e.removeEventListener("error", o), y(e, t.class_loading), h(e, t.class_error), n(t.callback_error, e))
                },
                i = function a() {
                    t && (y(e, t.class_loading), h(e, t.class_loaded), e.removeEventListener("load", a), e.removeEventListener("error", r), n(t.callback_load, e))
                };
            "IMG" !== e.tagName && "IFRAME" !== e.tagName || (e.addEventListener("load", i), e.addEventListener("error", r), h(e, t.class_loading)), b(e, t.data_srcset, t.data_src), n(t.callback_set, e)
        },
        _loopThroughElements: function () {
            var e = this._settings,
                r = this._elements,
                i = r ? r.length : 0,
                o = void 0,
                a = [],
                s = this._isFirstLoop;
            for (o = 0; i > o; o++) {
                var d = r[o];
                e.skip_invisible && null === d.offsetParent || (t || u(d, e.container, e.threshold)) && (s && h(d, e.class_initial), this._reveal(d), a.push(o), g(d, "was-processed", !0))
            }
            for (; a.length;) r.splice(a.pop(), 1), n(e.callback_processed, r.length);
            0 === i && this._stopScrollHandler(), s && (this._isFirstLoop = !1)
        },
        _purgeElements: function () {
            var e = this._elements,
                t = e.length,
                n = void 0,
                r = [];
            for (n = 0; t > n; n++) {
                var i = e[n];
                p(i, "was-processed") && r.push(n)
            }
            for (; r.length > 0;) e.splice(r.pop(), 1)
        },
        _startScrollHandler: function () {
            this._isHandlingScroll || (this._isHandlingScroll = !0, this._settings.container.addEventListener("scroll", this._boundHandleScroll))
        },
        _stopScrollHandler: function () {
            this._isHandlingScroll && (this._isHandlingScroll = !1, this._settings.container.removeEventListener("scroll", this._boundHandleScroll))
        },
        handleScroll: function () {
            var e = this._settings.throttle;
            if (0 !== e) {
                var t = Date.now(),
                    n = e - (t - this._previousLoopTime);
                0 >= n || n > e ? (this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._previousLoopTime = t, this._loopThroughElements()) : this._loopTimeout || (this._loopTimeout = setTimeout(function () {
                    this._previousLoopTime = Date.now(), this._loopTimeout = null, this._loopThroughElements()
                }.bind(this), n))
            } else this._loopThroughElements()
        },
        update: function () {
            this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)), this._purgeElements(), this._loopThroughElements(), this._startScrollHandler()
        },
        destroy: function () {
            window.removeEventListener("resize", this._boundHandleScroll), this._loopTimeout && (clearTimeout(this._loopTimeout), this._loopTimeout = null), this._stopScrollHandler(), this._elements = null, this._queryOriginNode = null, this._settings = null
        }
    };
    var w = window.lazyLoadOptions;
    return w && l(S, w), S
}), ! function (e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var i = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function (e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e) {
        e.forEach(function (e) {
            if (u(e.called) === O) try {
                e.call(), e.called = !0
            } catch (t) {
                _.logError("Error processing command :", "prebid.js", t)
            }
        })
    }

    function o(e) {
        var t = S._bidsRequested.map(function (e) {
            return e.bids.map(function (e) {
                return e.placementCode
            })
        }).reduce(l.flatten).filter(l.uniques);
        return _.contains(t, e) ? !0 : void _.logError('The "' + e + '" placement is not defined.')
    }

    function a() {
        S._bidsRequested = [], S._bidsReceived = S._bidsReceived.filter(function (e) {
            return !S._adUnitCodes.includes(e.adUnitCode)
        })
    }

    function s(e, t, n) {
        e.defaultView && e.defaultView.frameElement && (e.defaultView.frameElement.width = t, e.defaultView.frameElement.height = n)
    }
    var d = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        c = n(1),
        l = n(2),
        f = n(4),
        p = n(7);
    n(22);
    var g = n(20),
        m = n(13),
        b = n(70),
        v = n(71),
        h = n(11),
        y = n(19),
        S = c.getGlobal(),
        w = n(3),
        _ = n(2),
        E = n(12),
        T = n(5),
        A = n(14),
        I = n(9),
        B = n(72),
        C = n(73),
        j = "function",
        O = "undefined",
        R = "object",
        k = w.EVENTS.BID_WON,
        N = w.EVENTS.SET_TARGETING,
        x = !1,
        U = [],
        P = {
            bidWon: o
        };
    S._bidsRequested = [], S._bidsReceived = [], S._adUnitCodes = [], S._winningBids = [], S._adsReceived = [], S._sendAllBids = !1, S.bidderSettings = S.bidderSettings || {}, S.bidderTimeout = S.bidderTimeout || 3e3, S.cbTimeout = S.cbTimeout || 200, S.timeoutBuffer = 200, S.logging = S.logging || !1, S.publisherDomain = S.publisherDomain || window.location.origin, S.libLoaded = !0, S.version = "v0.25.0", _.logInfo("Prebid.js v0.25.0 loaded"), S.adUnits = S.adUnits || [], S.cookieSyncDelay = S.cookieSyncDelay || 100, S.cmd.push = function (e) {
        if (("undefined" == typeof e ? "undefined" : u(e)) === j) try {
            e.call()
        } catch (t) {
            _.logError("Error processing command :" + t.message)
        } else _.logError("Commands written into pbjs.cmd.push must be wrapped in a function")
    }, S.que.push = S.cmd.push, S.getAdserverTargetingForAdUnitCodeStr = function (e) {
        if (_.logInfo("Invoking pbjs.getAdserverTargetingForAdUnitCodeStr", arguments), e) {
            var t = S.getAdserverTargetingForAdUnitCode(e);
            return _.transformAdServerTargetingObj(t)
        }
        _.logMessage("Need to call getAdserverTargetingForAdUnitCodeStr with adunitCode")
    }, S.getAdserverTargetingForAdUnitCode = function (e) {
        return S.getAdserverTargeting(e)[e]
    }, S.getAdserverTargeting = function (e) {
        return _.logInfo("Invoking pbjs.getAdserverTargeting", arguments), C.getAllTargeting(e).map(function (e) {
            return r({}, Object.keys(e)[0], e[Object.keys(e)[0]].map(function (e) {
                return r({}, Object.keys(e)[0], e[Object.keys(e)[0]].join(", "))
            }).reduce(function (e, t) {
                return d(t, e)
            }, {}))
        }).reduce(function (e, t) {
            var n = Object.keys(t)[0];
            return e[n] = d({}, e[n], t[n]), e
        }, {})
    }, S.getBidResponses = function () {
        _.logInfo("Invoking pbjs.getBidResponses", arguments);
        var e = S._bidsReceived.filter(l.adUnitsFilter.bind(this, S._adUnitCodes)),
            t = e && e.length && e[e.length - 1].requestId;
        return e.map(function (e) {
            return e.adUnitCode
        }).filter(l.uniques).map(function (n) {
            return e.filter(function (e) {
                return e.requestId === t && e.adUnitCode === n
            })
        }).filter(function (e) {
            return e && e[0] && e[0].adUnitCode
        }).map(function (e) {
            return r({}, e[0].adUnitCode, {
                bids: e
            })
        }).reduce(function (e, t) {
            return d(e, t)
        }, {})
    }, S.getBidResponsesForAdUnitCode = function (e) {
        var t = S._bidsReceived.filter(function (t) {
            return t.adUnitCode === e
        });
        return {
            bids: t
        }
    }, S.setTargetingForGPTAsync = function (e) {
        if (_.logInfo("Invoking pbjs.setTargetingForGPTAsync", arguments), !l.isGptPubadsDefined()) return void _.logError("window.googletag is not defined on the page");
        var t = C.getAllTargeting(e);
        C.resetPresetTargeting(e), C.setTargeting(t), I.emit(N)
    }, S.setTargetingForAst = function () {
        return _.logInfo("Invoking pbjs.setTargetingForAn", arguments), C.isApntagDefined() ? (C.setTargetingForAst(), void I.emit(N)) : void _.logError("window.apntag is not defined on the page")
    }, S.allBidsAvailable = function () {
        return _.logInfo("Invoking pbjs.allBidsAvailable", arguments), E.bidsBackAll()
    }, S.renderAd = function (e, t) {
        if (_.logInfo("Invoking pbjs.renderAd", arguments), _.logMessage("Calling renderAd with adId :" + t), e && t) try {
            var n = S._bidsReceived.find(function (e) {
                return e.adId === t
            });
            if (n) {
                n.ad = _.replaceAuctionPrice(n.ad, n.cpm), n.url = _.replaceAuctionPrice(n.url, n.cpm), S._winningBids.push(n), I.emit(k, n);
                var r = n.height,
                    i = n.width,
                    o = n.ad,
                    a = n.mediaType,
                    d = n.adUrl,
                    u = n.renderer;
                if (u && u.url) u.render(n);
                else if (e === document && !_.inIframe() || "video" === a) _.logError("Error trying to write ad. Ad render call ad id " + t + " was prevented from writing to the main document.");
                else if (o) e.write(o), e.close(), s(e, i, r);
                else if (d) {
                    var c = _.createInvisibleIframe();
                    c.height = r, c.width = i, c.style.display = "inline", c.style.overflow = "hidden", c.src = d, _.insertElement(c, e, "body"), s(e, i, r)
                } else _.logError("Error trying to write ad. No ad for bid response id: " + t)
            } else _.logError("Error trying to write ad. Cannot find ad by given id : " + t)
        } catch (l) {
            _.logError("Error trying to write ad Id :" + t + " to the page:" + l.message)
        } else _.logError("Error trying to write ad Id :" + t + " to the page. Missing document or adId")
    }, S.removeAdUnit = function (e) {
        if (_.logInfo("Invoking pbjs.removeAdUnit", arguments), e)
            for (var t = 0; t < S.adUnits.length; t++) S.adUnits[t].code === e && S.adUnits.splice(t, 1)
    }, S.clearAuction = function () {
        x = !1, v.syncCookies(S.cookieSyncDelay), _.logMessage("Prebid auction cleared"), U.length && U.shift()()
    }, S.requestBids = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.bidsBackHandler,
            n = e.timeout,
            r = e.adUnits,
            i = e.adUnitCodes;
        I.emit("requestBids");
        var o = S.cbTimeout = n || S.bidderTimeout;
        r = r || S.adUnits, _.logInfo("Invoking pbjs.requestBids", arguments), i && i.length ? r = r.filter(function (e) {
            return i.includes(e.code)
        }) : i = r && r.map(function (e) {
            return e.code
        });
        var s = r.filter(f.videoAdUnit).filter(f.hasNonVideoBidder);
        if (s.forEach(function (e) {
                _.logError("adUnit " + e.code + " has 'mediaType' set to 'video' but contains a bidder that doesn't support video. No Prebid demand requests will be triggered for this adUnit.");
                for (var t = 0; t < r.length; t++) r[t].code === e.code && r.splice(t, 1)
            }), r.filter(p.nativeAdUnit).filter(p.hasNonNativeBidder).forEach(function (e) {
                var t = e.bids.filter(function (e) {
                    return !p.nativeBidder(e)
                }).map(function (e) {
                    return e.bidder
                }).join(", ");
                _.logError("adUnit " + e.code + " has 'mediaType' set to 'native' but contains non-native bidder(s) " + t + ". No Prebid demand requests will be triggered for those bidders."), e.bids = e.bids.filter(p.nativeBidder)
            }), x) return void U.push(function () {
            S.requestBids({
                bidsBackHandler: t,
                timeout: o,
                adUnits: r,
                adUnitCodes: i
            })
        });
        if (x = !0, S._adUnitCodes = i, E.externalCallbackReset(), a(), !r || 0 === r.length) return _.logMessage("No adUnits configured. No bids requested."), ("undefined" == typeof t ? "undefined" : u(t)) === j && E.addOneTimeCallback(t, !1), void E.executeCallback();
        var d = !0,
            c = E.executeCallback.bind(E, d),
            l = setTimeout(c, o);
        y.setAjaxTimeout(o), ("undefined" == typeof t ? "undefined" : u(t)) === j && E.addOneTimeCallback(t, l), T.callBids({
            adUnits: r,
            adUnitCodes: i,
            cbTimeout: o
        }), 0 === S._bidsRequested.length && E.executeCallback()
    }, S.addAdUnits = function (e) {
        _.logInfo("Invoking pbjs.addAdUnits", arguments), _.isArray(e) ? (e.forEach(function (e) {
            return e.transactionId = _.generateUUID()
        }), S.adUnits.push.apply(S.adUnits, e)) : ("undefined" == typeof e ? "undefined" : u(e)) === R && (e.transactionId = _.generateUUID(), S.adUnits.push(e))
    }, S.onEvent = function (e, t, n) {
        return _.logInfo("Invoking pbjs.onEvent", arguments), _.isFn(t) ? n && !P[e].call(null, n) ? void _.logError('The id provided is not valid for event "' + e + '" and no handler was set.') : void I.on(e, t, n) : void _.logError('The event handler provided is not a function and was not set on event "' + e + '".')
    }, S.offEvent = function (e, t, n) {
        _.logInfo("Invoking pbjs.offEvent", arguments), (!n || P[e].call(null, n)) && I.off(e, t, n)
    }, S.addCallback = function (e, t) {
        _.logInfo("Invoking pbjs.addCallback", arguments);
        var n = null;
        return e && t && ("undefined" == typeof t ? "undefined" : u(t)) === j ? (n = _.getUniqueIdentifierStr, E.addCallback(n, t, e), n) : (_.logError("error registering callback. Check method signature"), n)
    }, S.removeCallback = function () {
        return null
    }, S.registerBidAdapter = function (e, t) {
        _.logInfo("Invoking pbjs.registerBidAdapter", arguments);
        try {
            T.registerBidAdapter(e(), t)
        } catch (n) {
            _.logError("Error registering bidder adapter : " + n.message)
        }
    }, S.registerAnalyticsAdapter = function (e) {
        _.logInfo("Invoking pbjs.registerAnalyticsAdapter", arguments);
        try {
            T.registerAnalyticsAdapter(e)
        } catch (t) {
            _.logError("Error registering analytics adapter : " + t.message)
        }
    }, S.bidsAvailableForAdapter = function (e) {
        _.logInfo("Invoking pbjs.bidsAvailableForAdapter", arguments), S._bidsRequested.find(function (t) {
            return t.bidderCode === e
        }).bids.map(function (t) {
            return d(t, A.createBid(1), {
                bidderCode: e,
                adUnitCode: t.placementCode
            })
        }).map(function (e) {
            return S._bidsReceived.push(e)
        })
    }, S.createBid = function (e) {
        return _.logInfo("Invoking pbjs.createBid", arguments), A.createBid(e)
    }, S.addBidResponse = function (e, t) {
        _.logInfo("Invoking pbjs.addBidResponse", arguments), E.addBidResponse(e, t)
    }, S.loadScript = function (e, t, n) {
        _.logInfo("Invoking pbjs.loadScript", arguments), h.loadScript(e, t, n)
    }, S.enableAnalytics = function (e) {
        e && !_.isEmpty(e) ? (_.logInfo("Invoking pbjs.enableAnalytics for: ", e), T.enableAnalytics(e)) : _.logError("pbjs.enableAnalytics should be called with option {}")
    }, S.aliasBidder = function (e, t) {
        _.logInfo("Invoking pbjs.aliasBidder", arguments), e && t ? T.aliasBidAdapter(e, t) : _.logError("bidderCode and alias must be passed as arguments", "pbjs.aliasBidder")
    }, S.setPriceGranularity = function (e) {
        if (_.logInfo("Invoking pbjs.setPriceGranularity", arguments), !e) return void _.logError("Prebid Error: no value passed to `setPriceGranularity()`");
        if ("string" == typeof e) E.setPriceGranularity(e);
        else if ("object" === ("undefined" == typeof e ? "undefined" : u(e))) {
            if (!m.isValidePriceConfig(e)) return void _.logError("Invalid custom price value passed to `setPriceGranularity()`");
            E.setCustomPriceBucket(e), E.setPriceGranularity(w.GRANULARITY_OPTIONS.CUSTOM), _.logMessage("Using custom price granularity")
        }
    }, S.enableSendAllBids = function () {
        S._sendAllBids = !0
    }, S.getAllWinningBids = function () {
        return S._winningBids
    }, S.buildMasterVideoTagFromAdserverTag = function (e, t) {
        _.logInfo("Invoking pbjs.buildMasterVideoTagFromAdserverTag", arguments);
        var n = g.parse(e);
        if (0 === S._bidsReceived.length) return e;
        var r = "";
        if ("dfp" !== t.adserver.toLowerCase()) return void _.logError("Only DFP adserver is supported");
        var i = B.dfpAdserver(t, n);
        return i.verifyAdserverTag() || _.logError("Invalid adserverTag, required google params are missing in query string"), i.appendQueryParams(), r = g.format(i.urlComponents)
    }, S.setBidderSequence = function (e) {
        e === w.ORDER.RANDOM && T.setBidderSequence(w.ORDER.RANDOM)
    }, S.getHighestCpmBids = function (e) {
        return C.getWinningBids(e)
    }, S.setS2SConfig = function (e) {
        if (!_.contains(Object.keys(e), "accountId")) return void _.logError("accountId missing in Server to Server config");
        if (!_.contains(Object.keys(e), "bidders")) return void _.logError("bidders missing in Server to Server config");
        var t = d({
            enabled: !1,
            endpoint: w.S2S.DEFAULT_ENDPOINT,
            timeout: 1e3,
            maxBids: 1,
            adapter: "prebidServer"
        }, e);
        T.setS2SConfig(t)
    }, S.cmd.push(function () {
        return b.listenMessagesFromCreative()
    }), i(S.cmd), i(S.que)
}, function (e, t) {
    "use strict";

    function n() {
        return window.pbjs
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getGlobal = n, window.pbjs = window.pbjs || {}, window.pbjs.cmd = window.pbjs.cmd || [], window.pbjs.que = window.pbjs.que || []
}, function (e, t, n) {
    "use strict";

    function r() {
        return U() + Math.random().toString(16).substr(2)
    }

    function i() {
        return window.console && window.console.log
    }

    function o(e, t, n) {
        return n.indexOf(e) === t
    }

    function a(e, t) {
        return e.concat(t)
    }

    function s(e) {
        return pbjs._bidsRequested.map(function (t) {
            return t.bids.find(function (t) {
                return t.bidId === e
            })
        }).find(function (e) {
            return e
        })
    }

    function d(e) {
        return Object.keys(e)
    }

    function u(e, t) {
        return e[t]
    }

    function c() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : pbjs.adUnits;
        return e.map(function (e) {
            return e.bids.map(function (e) {
                return e.bidder
            }).reduce(a, [])
        }).reduce(a).filter(o)
    }

    function l() {
        return window.googletag && t.isFn(window.googletag.pubads) && t.isFn(window.googletag.pubads().getSlots) ? !0 : void 0
    }

    function f(e, t) {
        return e.cpm === t.cpm ? e.timeToRespond > t.timeToRespond ? t : e : e.cpm < t.cpm ? t : e
    }

    function p(e) {
        for (var t = e.length; t > 0;) {
            var n = Math.floor(Math.random() * t);
            t--;
            var r = e[t];
            e[t] = e[n], e[n] = r
        }
        return e
    }

    function g(e, t) {
        return e.includes(t && t.placementCode || t && t.adUnitCode)
    }

    function m(e) {
        return e.defaultView && e.defaultView.frameElement && "srcdoc" in e.defaultView.frameElement && !/firefox/i.test(navigator.userAgent)
    }

    function b(e) {
        return JSON.parse(JSON.stringify(e))
    }

    function v() {
        try {
            return window.self !== window.top
        } catch (e) {
            return !0
        }
    }

    function h() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    }

    function y(e, t) {
        return e ? e.replace(/\$\{AUCTION_PRICE\}/g, t) : void 0
    }

    function S(e) {
        return pbjs._bidsRequested.find(function (t) {
            return t.bidderCode === e
        })
    }

    function w(e, t) {
        return pbjs._bidsRequested.find(function (n) {
            return n.bids.filter(function (n) {
                return n.bidder === e && n.placementCode === t
            }).length > 0
        }) || {
            start: null,
            requestId: null
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var _ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
    } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
    t.uniques = o, t.flatten = a, t.getBidRequest = s, t.getKeys = d, t.getValue = u, t.getBidderCodes = c, t.isGptPubadsDefined = l, t.getHighestCpm = f, t.shuffle = p, t.adUnitsFilter = g, t.isSrcdocSupported = m, t.cloneJson = b, t.inIframe = v, t.isSafariBrowser = h, t.replaceAuctionPrice = y, t.getBidderRequestAllAdUnits = S, t.getBidderRequest = w;
    var E = n(3),
        T = "object",
        A = "string",
        I = "number",
        B = !1,
        C = "Array",
        j = "String",
        O = "Function",
        R = "Number",
        k = Object.prototype.toString,
        N = null;
    try {
        N = console.info.bind(window.console)
    } catch (x) {}
    t.replaceTokenInString = function (e, t, n) {
        return this._each(t, function (t, r) {
            t = void 0 === t ? "" : t;
            var i = n + r.toUpperCase() + n,
                o = new RegExp(i, "g");
            e = e.replace(o, t)
        }), e
    };
    var U = function () {
        var e = 0;
        return function () {
            return e++, e
        }
    }();
    t.getUniqueIdentifierStr = r, t.generateUUID = function z(e) {
        return e ? (e ^ 16 * Math.random() >> e / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, z)
    }, t.getBidIdParameter = function (e, t) {
        return t && t[e] ? t[e] : ""
    }, t.tryAppendQueryString = function (e, t, n) {
        return n ? e += t + "=" + encodeURIComponent(n) + "&" : e
    }, t.parseQueryStringParameters = function (e) {
        var t = "";
        for (var n in e) e.hasOwnProperty(n) && (t += n + "=" + encodeURIComponent(e[n]) + "&");
        return t
    }, t.transformAdServerTargetingObj = function (e) {
        return e && Object.getOwnPropertyNames(e).length > 0 ? d(e).map(function (t) {
            return t + "=" + encodeURIComponent(u(e, t))
        }).join("&") : ""
    }, t.parseSizesInput = function (e) {
        var t = [];
        if (("undefined" == typeof e ? "undefined" : _(e)) === A) {
            var n = e.split(","),
                r = /^(\d)+x(\d)+$/i;
            if (n)
                for (var i in n) M(n, i) && n[i].match(r) && t.push(n[i])
        } else if (("undefined" == typeof e ? "undefined" : _(e)) === T) {
            var o = e.length;
            if (o > 0)
                if (2 === o && _(e[0]) === I && _(e[1]) === I) t.push(this.parseGPTSingleSizeArray(e));
                else
                    for (var a = 0; o > a; a++) t.push(this.parseGPTSingleSizeArray(e[a]))
        }
        return t
    }, t.parseGPTSingleSizeArray = function (e) {
        return !this.isArray(e) || 2 !== e.length || isNaN(e[0]) || isNaN(e[1]) ? void 0 : e[0] + "x" + e[1]
    }, t.getTopWindowLocation = function () {
        var e = void 0;
        try {
            e = window.top.location
        } catch (t) {
            e = window.location
        }
        return e
    }, t.getTopWindowUrl = function () {
        var e = void 0;
        try {
            e = this.getTopWindowLocation().href
        } catch (t) {
            e = ""
        }
        return e
    }, t.logWarn = function (e) {
        q() && console.warn && console.warn("WARNING: " + e)
    }, t.logInfo = function (e, t) {
        q() && i() && N && (t && 0 !== t.length || (t = ""), N("INFO: " + e + ("" === t ? "" : " : params : "), t))
    }, t.logMessage = function (e) {
        q() && i() && console.log("MESSAGE: " + e)
    }, t.hasConsoleLogger = i;
    var P = function (e) {
            return e ? window.console.error ? "error" : "log" : ""
        }(i()),
        q = function () {
            return pbjs.logging === !1 && B === !1 && (pbjs.logging = "TRUE" === D(E.DEBUG_MODE).toUpperCase(), B = !0), !!pbjs.logging
        };
    t.debugTurnedOn = q, t.logError = function (e, t, n) {
        var r = t || "ERROR";
        q() && i() && console[P](console, r + ": " + e, n || "")
    }, t.createInvisibleIframe = function () {
        var e = document.createElement("iframe");
        return e.id = r(), e.height = 0, e.width = 0, e.border = "0px", e.hspace = "0", e.vspace = "0", e.marginWidth = "0", e.marginHeight = "0", e.style.border = "0", e.scrolling = "no", e.frameBorder = "0", e.src = "about:blank", e.style.display = "none", e
    };
    var D = function (e) {
        var t = "[\\?&]" + e + "=([^&#]*)",
            n = new RegExp(t),
            r = n.exec(window.location.search);
        return null === r ? "" : decodeURIComponent(r[1].replace(/\+/g, " "))
    };
    t.hasValidBidRequest = function (e, t, n) {
        function r(e, n) {
            n === t[o] && (i = !0)
        }
        for (var i = !1, o = 0; o < t.length; o++)
            if (i = !1, this._each(e, r), !i) return this.logError("Params are missing for bid request. One of these required paramaters are missing: " + t, n), !1;
        return !0
    }, t.addEventHandler = function (e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !0) : e.attachEvent && e.attachEvent("on" + t, n)
    }, t.isA = function (e, t) {
        return k.call(e) === "[object " + t + "]"
    }, t.isFn = function (e) {
        return this.isA(e, O)
    }, t.isStr = function (e) {
        return this.isA(e, j)
    }, t.isArray = function (e) {
        return this.isA(e, C)
    }, t.isNumber = function (e) {
        return this.isA(e, R)
    }, t.isEmpty = function (e) {
        if (!e) return !0;
        if (this.isArray(e) || this.isStr(e)) return !(e.length > 0);
        for (var t in e)
            if (hasOwnProperty.call(e, t)) return !1;
        return !0
    }, t.isEmptyStr = function (e) {
        return this.isStr(e) && (!e || 0 === e.length)
    }, t._each = function (e, t) {
        if (!this.isEmpty(e)) {
            if (this.isFn(e.forEach)) return e.forEach(t, this);
            var n = 0,
                r = e.length;
            if (r > 0)
                for (; r > n; n++) t(e[n], n, e);
            else
                for (n in e) hasOwnProperty.call(e, n) && t.call(this, e[n], n)
        }
    }, t.contains = function (e, t) {
        if (this.isEmpty(e)) return !1;
        if (this.isFn(e.indexOf)) return -1 !== e.indexOf(t);
        for (var n = e.length; n--;)
            if (e[n] === t) return !0;
        return !1
    }, t.indexOf = function () {
        return Array.prototype.indexOf ? Array.prototype.indexOf : void 0
    }(), t._map = function (e, t) {
        if (this.isEmpty(e)) return [];
        if (this.isFn(e.map)) return e.map(t);
        var n = [];
        return this._each(e, function (r, i) {
            n.push(t(r, i, e))
        }), n
    };
    var M = function (e, t) {
        return e.hasOwnProperty ? e.hasOwnProperty(t) : "undefined" != typeof e[t] && e.constructor.prototype[t] !== e[t]
    };
    t.insertElement = function (e, t, n) {
        t = t || document;
        var r = void 0;
        r = n ? t.getElementsByTagName(n) : t.getElementsByTagName("head");
        try {
            r = r.length ? r : t.getElementsByTagName("body"), r.length && (r = r[0], r.insertBefore(e, r.firstChild))
        } catch (i) {}
    }, t.insertPixel = function (e) {
        var t = new Image;
        t.id = this.getUniqueIdentifierStr(), t.src = e, t.height = 0, t.width = 0, t.style.display = "none", t.onload = function () {
            try {
                this.parentNode.removeChild(this)
            } catch (e) {}
        }, this.insertElement(t)
    }, t.insertCookieSyncIframe = function (e, t) {
        var n = this.createTrackPixelIframeHtml(e, t),
            r = document.createElement("div");
        r.innerHTML = n;
        var i = r.firstChild;
        this.insertElement(i)
    }, t.createTrackPixelHtml = function (e) {
        if (!e) return "";
        var t = encodeURI(e),
            n = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
        return n += '<img src="' + t + '"></div>'
    }, t.createTrackPixelIframeHtml = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
        return e ? (t && (e = encodeURI(e)), '<iframe frameborder="0" allowtransparency="true" marginheight="0" marginwidth="0" width="0" hspace="0" vspace="0" height="0" style="height:0p;width:0p;display:none;" scrolling="no" src="' + e + '"></iframe>') : ""
    }, t.getIframeDocument = function (e) {
        if (e) {
            var t = void 0;
            try {
                t = e.contentWindow ? e.contentWindow.document : e.contentDocument.document ? e.contentDocument.document : e.contentDocument
            } catch (n) {
                this.logError("Cannot get iframe document", n)
            }
            return t
        }
    }, t.getValueString = function (e, t, n) {
        return void 0 === t || null === t ? n : this.isStr(t) ? t : this.isNumber(t) ? t.toString() : void this.logWarn("Unsuported type for param: " + e + " required type: String")
    }
}, function (e) {
    e.exports = {
        JSON_MAPPING: {
            PL_CODE: "code",
            PL_SIZE: "sizes",
            PL_BIDS: "bids",
            BD_BIDDER: "bidder",
            BD_ID: "paramsd",
            BD_PL_ID: "placementId",
            ADSERVER_TARGETING: "adserverTargeting",
            BD_SETTING_STANDARD: "standard"
        },
        REPO_AND_VERSION: "prebid_prebid_0.25.0",
        DEBUG_MODE: "pbjs_debug",
        STATUS: {
            GOOD: 1,
            NO_BID: 2
        },
        CB: {
            TYPE: {
                ALL_BIDS_BACK: "allRequestedBidsBack",
                AD_UNIT_BIDS_BACK: "adUnitBidsBack",
                BID_WON: "bidWon",
                REQUEST_BIDS: "requestBids"
            }
        },
        objectType_function: "function",
        objectType_undefined: "undefined",
        objectType_object: "object",
        objectType_string: "string",
        objectType_number: "number",
        EVENTS: {
            AUCTION_INIT: "auctionInit",
            AUCTION_END: "auctionEnd",
            BID_ADJUSTMENT: "bidAdjustment",
            BID_TIMEOUT: "bidTimeout",
            BID_REQUESTED: "bidRequested",
            BID_RESPONSE: "bidResponse",
            BID_WON: "bidWon",
            SET_TARGETING: "setTargeting",
            REQUEST_BIDS: "requestBids"
        },
        EVENT_ID_PATHS: {
            bidWon: "adUnitCode"
        },
        ORDER: {
            RANDOM: "random"
        },
        GRANULARITY_OPTIONS: {
            LOW: "low",
            MEDIUM: "medium",
            HIGH: "high",
            AUTO: "auto",
            DENSE: "dense",
            CUSTOM: "custom"
        },
        TARGETING_KEYS: ["hb_bidder", "hb_adid", "hb_pb", "hb_size", "hb_deal"],
        S2S: {
            DEFAULT_ENDPOINT: "https://prebid.adnxs.com/pbs/v1/auction"
        }
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.hasNonVideoBidder = t.videoAdUnit = void 0;
    var r = n(5),
        i = (t.videoAdUnit = function (e) {
            return "video" === e.mediaType
        }, function (e) {
            return !r.videoAdapters.includes(e.bidder)
        });
    t.hasNonVideoBidder = function (e) {
        return e.bids.filter(i).length
    }
}, function (e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function i(e) {
        var t = e.bidderCode,
            n = e.requestId,
            r = e.bidderRequestId,
            i = e.adUnits;
        return i.map(function (e) {
            return e.bids.filter(function (e) {
                return e.bidder === t
            }).map(function (t) {
                var i = e.sizes;
                if (e.sizeMapping) {
                    var o = u.mapSizes(e);
                    if ("" === o) return "";
                    i = o
                }
                return e.nativeParams && (t = s({}, t, {
                    nativeParams: l["default"](e.nativeParams)
                })), s({}, t, {
                    placementCode: e.code,
                    mediaType: e.mediaType,
                    transactionId: e.transactionId,
                    sizes: i,
                    bidId: t.bid_id || p.getUniqueIdentifierStr(),
                    bidderRequestId: r,
                    requestId: n
                })
            })
        }).reduce(d.flatten, []).filter(function (e) {
            return "" !== e
        })
    }

    function o(e) {
        var t = [],
            n = p.parseSizesInput(e.sizes);
        return n.forEach(function (e) {
            var n = e.split("x"),
                r = {
                    w: parseInt(n[0]),
                    h: parseInt(n[1])
                };
            t.push(r)
        }), t
    }
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        s = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        d = n(2),
        u = n(6),
        c = n(7),
        l = r(c),
        f = n(8),
        p = n(2),
        g = n(3),
        m = n(9),
        b = {};
    t.bidderRegistry = b;
    var v = {},
        h = {},
        y = null;
    t.callBids = function (e) {
        var t = e.adUnits,
            n = e.cbTimeout,
            r = p.generateUUID(),
            a = Date.now(),
            s = {
                timestamp: a,
                requestId: r
            };
        m.emit(g.EVENTS.AUCTION_INIT, s);
        var c = d.getBidderCodes(t);
        if (y === g.ORDER.RANDOM && (c = d.shuffle(c)), v.enabled) {
            var l = v.bidders;
            c = c.filter(function (e) {
                return !l.includes(e)
            });
            var f = p.cloneJson(t);
            f.forEach(function (e) {
                e.sizeMapping && (e.sizes = u.mapSizes(e), delete e.sizeMapping), e.sizes = o(e), e.bids = e.bids.filter(function (e) {
                    return l.includes(e.bidder)
                }).map(function (e) {
                    return e.bid_id = p.getUniqueIdentifierStr(), e
                })
            });
            var h = p.generateUUID();
            l.forEach(function (e) {
                var t = p.getUniqueIdentifierStr(),
                    n = {
                        bidderCode: e,
                        requestId: r,
                        bidderRequestId: t,
                        tid: h,
                        bids: i({
                            bidderCode: e,
                            requestId: r,
                            bidderRequestId: t,
                            adUnits: f
                        }),
                        start: (new Date).getTime(),
                        auctionStart: a,
                        timeout: v.timeout
                    };
                pbjs._bidsRequested.push(n)
            });
            var S = {
                    tid: h,
                    ad_units: f
                },
                w = b[v.adapter];
            p.logMessage("CALLING S2S HEADER BIDDERS ==== " + l.join(",")), w.setConfig(v), w.callBids(S)
        }
        c.forEach(function (e) {
            var o = b[e];
            if (o) {
                var s = p.getUniqueIdentifierStr(),
                    d = {
                        bidderCode: e,
                        requestId: r,
                        bidderRequestId: s,
                        bids: i({
                            bidderCode: e,
                            requestId: r,
                            bidderRequestId: s,
                            adUnits: t
                        }),
                        start: (new Date).getTime(),
                        auctionStart: a,
                        timeout: n
                    };
                d.bids && 0 !== d.bids.length && (p.logMessage("CALLING BIDDER ======= " + e), pbjs._bidsRequested.push(d), m.emit(g.EVENTS.BID_REQUESTED, d), o.callBids(d))
            } else p.logError("Adapter trying to be called which does not exist: " + e + " adaptermanager.callBids")
        })
    }, t.registerBidAdapter = function (e, t) {
        e && t ? a(e.callBids) === g.objectType_function ? b[t] = e : p.logError("Bidder adaptor error for bidder code: " + t + "bidder must implement a callBids() function") : p.logError("bidAdaptor or bidderCode not specified")
    }, t.aliasBidAdapter = function (e, t) {
        var n = b[t];
        if (("undefined" == typeof n ? "undefined" : a(n)) === g.objectType_undefined) {
            var r = b[e];
            if (("undefined" == typeof r ? "undefined" : a(r)) === g.objectType_undefined) p.logError('bidderCode "' + e + '" is not an existing bidder.', "adaptermanager.aliasBidAdapter");
            else try {
                var i = null;
                r instanceof f.BaseAdapter ? p.logError(e + " bidder does not currently support aliasing.", "adaptermanager.aliasBidAdapter") : (i = r.createNew(), i.setBidderCode(t), this.registerBidAdapter(i, t))
            } catch (o) {
                p.logError(e + " bidder does not currently support aliasing.", "adaptermanager.aliasBidAdapter")
            }
        } else p.logMessage('alias name "' + t + '" has been already specified.')
    }, t.registerAnalyticsAdapter = function (e) {
        var t = e.adapter,
            n = e.code;
        t && n ? a(t.enableAnalytics) === g.objectType_function ? (t.code = n, h[n] = t) : p.logError('Prebid Error: Analytics adaptor error for analytics "' + n + '"\n        analytics adapter must implement an enableAnalytics() function') : p.logError("Prebid Error: analyticsAdapter or analyticsCode not specified")
    }, t.enableAnalytics = function (e) {
        p.isArray(e) || (e = [e]), p._each(e, function (e) {
            var t = h[e.provider];
            t ? t.enableAnalytics(e) : p.logError("Prebid Error: no analytics adapter found in registry for\n        " + e.provider + ".")
        })
    }, t.setBidderSequence = function (e) {
        y = e
    }, t.setS2SConfig = function (e) {
        v = e
    };
    var S = n(10);
    t.registerBidAdapter(new S, "appnexus");
    var w = n(16);
    t.registerBidAdapter(new w, "openx");
    var _ = n(17);
    t.registerBidAdapter(new _, "pulsepoint");
    var E = n(18);
    t.registerBidAdapter(new E, "audienceNetwork"), t.aliasBidAdapter("appnexus", "brealtime"), t.aliasBidAdapter("appnexus", "pagescience"), t.aliasBidAdapter("appnexus", "defymedia"), t.aliasBidAdapter("appnexus", "gourmetads"), t.aliasBidAdapter("appnexus", "matomy"), t.aliasBidAdapter("appnexus", "featureforward"), t.aliasBidAdapter("appnexus", "oftmedia"), t.videoAdapters = [];
    var T = n(21)["default"] || n(21);
    t.registerAnalyticsAdapter({
        adapter: T,
        code: "ga"
    })
}, function (e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function i(e) {
        if (!o(e.sizeMapping)) return e.sizes;
        var t = a();
        if (!t) {
            var n = e.sizeMapping.reduce(function (e, t) {
                return e.minWidth < t.minWidth ? t : e
            });
            return n.sizes && n.sizes.length ? n.sizes : e.sizes
        }
        var r = "",
            i = e.sizeMapping.find(function (e) {
                return t > e.minWidth
            });
        return i && i.sizes && i.sizes.length ? (r = i.sizes, u.logMessage("AdUnit : " + e.code + " resized based on device width to : " + r)) : u.logMessage("AdUnit : " + e.code + " not mapped to any sizes for device width. This request will be suppressed."), r
    }

    function o(e) {
        return u.isArray(e) && e.length > 0 ? !0 : (u.logInfo("No size mapping defined"), !1)
    }

    function a(e) {
        var t = e || c || window,
            n = t.document;
        return t.innerWidth ? t.innerWidth : n.body.clientWidth ? n.body.clientWidth : n.documentElement.clientWidth ? n.documentElement.clientWidth : 0
    }

    function s(e) {
        c = e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.setWindow = t.getScreenWidth = t.mapSizes = void 0;
    var d = n(2),
        u = r(d),
        c = void 0;
    t.mapSizes = i, t.getScreenWidth = a, t.setWindow = s
}, function (e, t, n) {
    "use strict";

    function r(e) {
        return e && e.type && i(e.type) ? l[e.type] : e
    }

    function i(e) {
        return e && Object.keys(l).includes(e) ? !0 : (s.logError(e + " nativeParam is not supported"), !1)
    }

    function o(e) {
        var t = s.getBidRequest(e.adId);
        if (!t) return !1;
        var n = t.nativeParams;
        if (!n) return !0;
        var r = Object.keys(n).filter(function (e) {
                return n[e].required
            }),
            i = Object.keys(e["native"]);
        return r.every(function (e) {
            return i.includes(e)
        })
    }

    function a(e) {
        var t = e["native"] && e["native"].impressionTrackers;
        (t || []).forEach(function (e) {
            s.insertPixel(e)
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.hasNonNativeBidder = t.nativeBidder = t.nativeAdUnit = t.NATIVE_TARGETING_KEYS = t.NATIVE_KEYS = void 0, t["default"] = r, t.nativeBidIsValid = o, t.fireNativeImpressions = a;
    var s = n(2),
        d = [],
        u = t.NATIVE_KEYS = {
            title: "hb_native_title",
            body: "hb_native_body",
            sponsoredBy: "hb_native_brand",
            image: "hb_native_image",
            icon: "hb_native_icon",
            clickUrl: "hb_native_linkurl"
        },
        c = (t.NATIVE_TARGETING_KEYS = Object.keys(u).map(function (e) {
            return u[e]
        }), {
            image: {
                required: !0
            },
            title: {
                required: !0
            },
            sponsoredBy: {
                required: !0
            },
            clickUrl: {
                required: !0
            },
            body: {
                required: !1
            },
            icon: {
                required: !1
            }
        }),
        l = {
            image: c
        },
        f = (t.nativeAdUnit = function (e) {
            return "native" === e.mediaType
        }, t.nativeBidder = function (e) {
            return d.includes(e.bidder)
        });
    t.hasNonNativeBidder = function (e) {
        return e.bids.filter(function (e) {
            return !f(e)
        }).length
    }
}, function (e, t) {
    "use strict";

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function () {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }();
    t.BaseAdapter = function () {
        function e(t) {
            n(this, e), this.code = t
        }
        return r(e, [{
            key: "getCode",
            value: function () {
                return this.code
            }
        }, {
            key: "setCode",
            value: function (e) {
                this.code = e
            }
        }, {
            key: "callBids",
            value: function () {
                throw "adapter implementation must override callBids method"
            }
        }]), e
    }()
}, function (e, t, n) {
    "use strict";
    var r = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        i = n(2),
        o = n(3),
        a = Array.prototype.slice,
        s = Array.prototype.push,
        d = i._map(o.EVENTS, function (e) {
            return e
        }),
        u = o.EVENT_ID_PATHS,
        c = [];
    e.exports = function () {
        function e(e, t) {
            i.logMessage("Emitting event for: " + e);
            var r = t[0] || {},
                o = u[e],
                a = r[o],
                d = n[e] || {
                    que: []
                },
                l = i._map(d, function (e, t) {
                    return t
                }),
                f = [];
            c.push({
                eventType: e,
                args: r,
                id: a
            }), a && i.contains(l, a) && s.apply(f, d[a].que), s.apply(f, d.que), i._each(f, function (e) {
                if (e) try {
                    e.apply(null, t)
                } catch (n) {
                    i.logError("Error executing handler:", "events.js", n)
                }
            })
        }

        function t(e) {
            return i.contains(d, e)
        }
        var n = {},
            o = {};
        return o.on = function (e, r, o) {
            if (t(e)) {
                var a = n[e] || {
                    que: []
                };
                o ? (a[o] = a[o] || {
                    que: []
                }, a[o].que.push(r)) : a.que.push(r), n[e] = a
            } else i.logError("Wrong event name : " + e + " Valid event names :" + d)
        }, o.emit = function (t) {
            var n = a.call(arguments, 1);
            e(t, n)
        }, o.off = function (e, t, r) {
            var o = n[e];
            i.isEmpty(o) || i.isEmpty(o.que) && i.isEmpty(o[r]) || r && (i.isEmpty(o[r]) || i.isEmpty(o[r].que)) || (r ? i._each(o[r].que, function (e) {
                var n = o[r].que;
                e === t && n.splice(i.indexOf.call(n, e), 1)
            }) : i._each(o.que, function (e) {
                var n = o.que;
                e === t && n.splice(i.indexOf.call(n, e), 1)
            }), n[e] = o)
        }, o.get = function () {
            return n
        }, o.getEvents = function () {
            var e = [];
            return i._each(c, function (t) {
                var n = r({}, t);
                e.push(n)
            }), e
        }, o
    }()
}, function (e, t, n) {
    "use strict";
    var r, i = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        o = n(2),
        a = n(3),
        s = n(2),
        d = n(11),
        u = n(12),
        c = n(14),
        l = n(15);
    r = function f() {
        function e(e, t) {
            var n = s.getBidIdParameter("placementId", e.params),
                r = s.getBidIdParameter("memberId", e.params),
                o = s.getBidIdParameter("member", e.params),
                a = s.getBidIdParameter("invCode", e.params),
                d = s.getBidIdParameter("query", e.params),
                u = s.getBidIdParameter("referrer", e.params),
                c = s.getBidIdParameter("alt_referrer", e.params),
                l = "//ib.adnxs.com/jpt?";
            l = s.tryAppendQueryString(l, "callback", "pbjs.handleAnCB"), l = s.tryAppendQueryString(l, "callback_uid", t), l = s.tryAppendQueryString(l, "psa", "0"), l = s.tryAppendQueryString(l, "id", n), o ? l = s.tryAppendQueryString(l, "member", o) : r && (l = s.tryAppendQueryString(l, "member", r), s.logMessage('appnexus.callBids: "memberId" will be deprecated soon. Please use "member" instead')), l = s.tryAppendQueryString(l, "code", a), l = s.tryAppendQueryString(l, "traffic_source_code", s.getBidIdParameter("trafficSourceCode", e.params));
            var f = "",
                p = s.parseSizesInput(e.sizes),
                g = p.length;
            if (g > 0 && (f = "size=" + p[0], g > 1)) {
                f += "&promo_sizes=";
                for (var m = 1; g > m; m++) f += p[m] += ",";
                f && "," === f.charAt(f.length - 1) && (f = f.slice(0, f.length - 1))
            }
            f && (l += f + "&");
            var b = s.parseQueryStringParameters(d);
            b && (l += b);
            var v = i({}, e.params);
            delete v.placementId, delete v.memberId, delete v.invCode, delete v.query, delete v.referrer, delete v.alt_referrer, delete v.member;
            var h = s.parseQueryStringParameters(v);
            return h && (l += h), "" === u && (u = s.getTopWindowUrl()), l = s.tryAppendQueryString(l, "referrer", u), l = s.tryAppendQueryString(l, "alt_referrer", c), l.lastIndexOf("&") === l.length - 1 && (l = l.substring(0, l.length - 1)), s.logMessage("jpt request built: " + l), e.startTime = (new Date).getTime(), l
        }
        var t = l.createNew("appnexus"),
            n = !1;
        return t.callBids = function (t) {
            for (var n = t.bids, r = 0; r < n.length; r++) {
                var i = n[r],
                    o = i.bidId;
                d.loadScript(e(i, o))
            }
        }, pbjs.handleAnCB = function (e) {
            var t;
            if (e && e.callback_uid) {
                var r, i = e.callback_uid,
                    d = "",
                    l = o.getBidRequest(i);
                l && (t = l.bidder, d = l.placementCode, l.status = a.STATUS.GOOD), s.logMessage("JSONP callback function called for ad ID: " + i);
                var f = [];
                if (e.result && e.result.cpm && 0 !== e.result.cpm) {
                    r = parseInt(e.result.cpm, 10), r /= 1e4;
                    var p = e.result.creative_id;
                    f = c.createBid(1, l), f.creative_id = p, f.bidderCode = t, f.cpm = r, f.adUrl = e.result.ad, f.width = e.result.width, f.height = e.result.height, f.dealId = e.result.deal_id, u.addBidResponse(d, f)
                } else s.logMessage("No prebid response from AppNexus for placement code " + d), f = c.createBid(2, l), f.bidderCode = t, u.addBidResponse(d, f);
                if (!n) {
                    var g = s.createInvisibleIframe();
                    g.src = "//acdn.adnxs.com/ib/static/usersync/v3/async_usersync.html";
                    try {
                        document.body.appendChild(g)
                    } catch (m) {
                        s.logError(m)
                    }
                    n = !0
                }
            } else s.logMessage("No prebid response for placement %%PLACEMENT%%")
        }, {
            callBids: t.callBids,
            setBidderCode: t.setBidderCode,
            createNew: f.createNew,
            buildJPTCall: e
        }
    }, r.createNew = function () {
        return new r
    }, e.exports = r
}, function (e, t, n) {
    "use strict";

    function r(e, t) {
        var n = document.createElement("script");
        n.type = "text/javascript", n.async = !0, t && "function" == typeof t && (n.readyState ? n.onreadystatechange = function () {
            ("loaded" === n.readyState || "complete" === n.readyState) && (n.onreadystatechange = null, t())
        } : n.onload = function () {
            t()
        }), n.src = e;
        var r = document.getElementsByTagName("head");
        r = r.length ? r : document.getElementsByTagName("body"), r.length && (r = r[0], r.insertBefore(n, r.firstChild))
    }
    var i = n(2),
        o = {};
    t.loadScript = function (e, t, n) {
        return e ? void(n ? o[e] ? t && "function" == typeof t && (o[e].loaded ? t() : o[e].callbacks.push(t)) : (o[e] = {
            loaded: !1,
            callbacks: []
        }, t && "function" == typeof t && o[e].callbacks.push(t), r(e, function () {
            o[e].loaded = !0;
            try {
                for (var t = 0; t < o[e].callbacks.length; t++) o[e].callbacks[t]()
            } catch (n) {
                i.logError("Error executing callback", "adloader.js:loadScript", n)
            }
        })) : r(e, t)) : void i.logError("Error attempting to request empty URL", "adloader.js:loadScript")
    }
}, function (e, t, n) {
    "use strict";

    function r() {
        return (new Date).getTime()
    }

    function i(e) {
        return e.bidderCode
    }

    function o(e) {
        return e.bidder
    }

    function a(e) {
        var t = this,
            n = pbjs._bidsRequested.map(function (n) {
                return n.bids.filter(y.adUnitsFilter.bind(t, pbjs._adUnitCodes)).filter(function (t) {
                    return t.placementCode === e
                })
            }).reduce(y.flatten, []).map(function (e) {
                return "indexExchange" === e.bidder ? e.sizes.length : 1
            }).reduce(s, 0),
            r = pbjs._bidsReceived.filter(function (t) {
                return t.adUnitCode === e
            }).length;
        return n === r
    }

    function s(e, t) {
        return e + t
    }

    function d() {
        var e = pbjs._bidsRequested.map(function (e) {
                return e.bids
            }).reduce(y.flatten, []).filter(y.adUnitsFilter.bind(this, pbjs._adUnitCodes)).map(function (e) {
                return "indexExchange" === e.bidder ? e.sizes.length : 1
            }).reduce(function (e, t) {
                return e + t
            }, 0),
            t = pbjs._bidsReceived.filter(y.adUnitsFilter.bind(this, pbjs._adUnitCodes)).length;
        return e === t
    }

    function u(e, t) {
        var n = {},
            r = pbjs.bidderSettings;
        if (t && r) {
            var i = m();
            c(n, i, t)
        }
        return e && t && r && r[e] && r[e][_.JSON_MAPPING.ADSERVER_TARGETING] ? (c(n, r[e], t), t.alwaysUseBid = r[e].alwaysUseBid, t.sendStandardTargeting = r[e].sendStandardTargeting) : O[e] && (c(n, O[e], t), t.alwaysUseBid = O[e].alwaysUseBid, t.sendStandardTargeting = O[e].sendStandardTargeting), t["native"] && Object.keys(t["native"]).forEach(function (e) {
            var r = w.NATIVE_KEYS[e],
                i = t["native"][e];
            r && (n[r] = i)
        }), n
    }

    function c(e, t, n) {
        var r = t[_.JSON_MAPPING.ADSERVER_TARGETING];
        return n.size = n.getSize(), T._each(r, function (r) {
            var i = r.key,
                o = r.val;
            if (e[i] && T.logWarn("The key: " + i + " is getting ovewritten"), T.isFn(o)) try {
                o = o(n)
            } catch (a) {
                T.logError("bidmanager", "ERROR", a)
            }("undefined" == typeof t.suppressEmptyKeys || t.suppressEmptyKeys !== !0) && "hb_deal" !== i || !T.isEmptyStr(o) && null !== o && void 0 !== o ? e[i] = o : T.logInfo("suppressing empty key '" + i + "' from adserver targeting")
        }), e
    }

    function l(e) {
        var t = [e];
        f(B.byAdUnit, t)
    }

    function f(e, t) {
        var n = this;
        T.isArray(e) && e.forEach(function (e) {
            var r = t || pbjs._adUnitCodes,
                i = [pbjs._bidsReceived.filter(y.adUnitsFilter.bind(n, r)).reduce(p, {})];
            e.apply(pbjs, i)
        })
    }

    function p(e, t) {
        return e[t.adUnitCode] || (e[t.adUnitCode] = {
            bids: []
        }), e[t.adUnitCode].bids.push(t), e
    }

    function g(e) {
        var t = e.bidderCode,
            n = e.cpm;
        if (t && pbjs.bidderSettings && pbjs.bidderSettings[t] && v(pbjs.bidderSettings[t].bidCpmAdjustment) === I) try {
            n = pbjs.bidderSettings[t].bidCpmAdjustment.call(null, e.cpm, h({}, e))
        } catch (r) {
            T.logError("Error during bid adjustment", "bidmanager.js", r)
        }
        n >= 0 && (e.cpm = n)
    }

    function m() {
        var e = pbjs.bidderSettings;
        return e[_.JSON_MAPPING.BD_SETTING_STANDARD] || (e[_.JSON_MAPPING.BD_SETTING_STANDARD] = {
            adserverTargeting: [{
                key: "hb_bidder",
                val: function (e) {
                    return e.bidderCode
                }
            }, {
                key: "hb_adid",
                val: function (e) {
                    return e.adId
                }
            }, {
                key: "hb_pb",
                val: function (e) {
                    return C === _.GRANULARITY_OPTIONS.AUTO ? e.pbAg : C === _.GRANULARITY_OPTIONS.DENSE ? e.pbDg : C === _.GRANULARITY_OPTIONS.LOW ? e.pbLg : C === _.GRANULARITY_OPTIONS.MEDIUM ? e.pbMg : C === _.GRANULARITY_OPTIONS.HIGH ? e.pbHg : C === _.GRANULARITY_OPTIONS.CUSTOM ? e.pbCg : void 0
                }
            }, {
                key: "hb_size",
                val: function (e) {
                    return e.size
                }
            }, {
                key: "hb_deal",
                val: function (e) {
                    return e.dealId
                }
            }]
        }), e[_.JSON_MAPPING.BD_SETTING_STANDARD]
    }

    function b() {
        return m()[_.JSON_MAPPING.ADSERVER_TARGETING]
    }
    var v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        h = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        y = n(2),
        S = n(13),
        w = n(7),
        _ = n(3),
        E = _.EVENTS.AUCTION_END,
        T = n(2),
        A = n(9),
        I = "function",
        B = {
            byAdUnit: [],
            all: [],
            oneTime: null,
            timer: !1
        },
        C = _.GRANULARITY_OPTIONS.MEDIUM,
        j = void 0,
        O = {};
    t.setCustomPriceBucket = function (e) {
        j = e
    }, t.getTimedOutBidders = function () {
        return pbjs._bidsRequested.map(i).filter(y.uniques).filter(function (e) {
            return pbjs._bidsReceived.map(o).filter(y.uniques).indexOf(e) < 0
        })
    }, t.bidsBackAll = function () {
        return d()
    }, t.addBidResponse = function (e, n) {
        if (!e) return void T.logWarn("No adUnitCode supplied to addBidResponse, response discarded");
        if (n) {
            if ("native" === n.mediaType && !w.nativeBidIsValid(n)) return void T.logError("Native bid response does not contain all required assets. This bid won't be addeed to the auction");
            var i = y.getBidderRequest(n.bidderCode, e),
                o = i.requestId,
                s = i.start;
            if (h(n, {
                    requestId: o,
                    responseTimestamp: r(),
                    requestTimestamp: s,
                    cpm: parseFloat(n.cpm) || 0,
                    bidder: n.bidderCode,
                    adUnitCode: e
                }), n.timeToRespond = n.responseTimestamp - n.requestTimestamp, n.timeToRespond > pbjs.cbTimeout + pbjs.timeoutBuffer) {
                var c = !0;
                t.executeCallback(c)
            }
            A.emit(_.EVENTS.BID_ADJUSTMENT, n), A.emit(_.EVENTS.BID_RESPONSE, n);
            var f = S.getPriceBucketString(n.cpm, j);
            n.pbLg = f.low, n.pbMg = f.med, n.pbHg = f.high, n.pbAg = f.auto, n.pbDg = f.dense, n.pbCg = f.custom;
            var p = {};
            n.bidderCode && (n.cpm > 0 || n.dealId) && (p = u(n.bidderCode, n)), n.adserverTargeting = p, pbjs._bidsReceived.push(n)
        }
        n && n.adUnitCode && a(n.adUnitCode) && l(n.adUnitCode), d() && t.executeCallback()
    }, t.getKeyValueTargetingPairs = function () {
        return u.apply(void 0, arguments)
    }, t.setPriceGranularity = function (e) {
        var t = _.GRANULARITY_OPTIONS;
        Object.keys(t).filter(function (n) {
            return e === t[n]
        }) ? C = e : (T.logWarn("Prebid Warning: setPriceGranularity was called with invalid setting, using `medium` as default."), C = _.GRANULARITY_OPTIONS.MEDIUM)
    }, t.registerDefaultBidderSetting = function (e, t) {
        O[e] = t
    }, t.executeCallback = function (e) {
        if (!e && B.timer && clearTimeout(B.timer), B.all.called !== !0 && (f(B.all), B.all.called = !0, e)) {
            var n = t.getTimedOutBidders();
            n.length && A.emit(_.EVENTS.BID_TIMEOUT, n)
        }
        if (B.oneTime) {
            A.emit(E);
            try {
                f([B.oneTime])
            } catch (r) {
                T.logError("Error executing bidsBackHandler", null, r)
            } finally {
                B.oneTime = null, B.timer = !1, pbjs.clearAuction()
            }
        }
    }, t.externalCallbackReset = function () {
        B.all.called = !1
    }, t.addOneTimeCallback = function (e, t) {
        B.oneTime = e, B.timer = t
    }, t.addCallback = function (e, t, n) {
        t.id = e, _.CB.TYPE.ALL_BIDS_BACK === n ? B.all.push(t) : _.CB.TYPE.AD_UNIT_BIDS_BACK === n && B.byAdUnit.push(t)
    }, A.on(_.EVENTS.BID_ADJUSTMENT, function (e) {
        g(e)
    }), t.adjustBids = function () {
        return g.apply(void 0, arguments)
    }, t.getStandardBidderAdServerTargeting = b
}, function (e, t) {
    "use strict";

    function n(e, t) {
        var n = 0;
        return n = parseFloat(e), isNaN(n) && (n = ""), {
            low: "" === n ? "" : r(e, s),
            med: "" === n ? "" : r(e, d),
            high: "" === n ? "" : r(e, u),
            auto: "" === n ? "" : r(e, l),
            dense: "" === n ? "" : r(e, c),
            custom: "" === n ? "" : r(e, t)
        }
    }

    function r(e, t) {
        var n = "";
        if (!i(t)) return n;
        var r = t.buckets.reduce(function (e, t) {
                return e.max > t.max ? e : t
            }, {
                max: 0
            }),
            s = t.buckets.find(function (t) {
                if (e > r.max) {
                    var i = t.precision || a;
                    n = t.max.toFixed(i)
                } else if (e <= t.max && e >= t.min) return t
            });
        return s && (n = o(e, s.increment, s.precision)), n
    }

    function i(e) {
        if (!e || !e.buckets || !Array.isArray(e.buckets)) return !1;
        var t = !0;
        return e.buckets.forEach(function (e) {
            "undefined" != typeof e.min && e.max && e.increment || (t = !1)
        }), t
    }

    function o(e, t, n) {
        n || (n = a);
        var r = 1 / t;
        return (Math.floor(e * r) / r).toFixed(n)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = 2,
        s = {
            buckets: [{
                min: 0,
                max: 5,
                increment: .5
            }]
        },
        d = {
            buckets: [{
                min: 0,
                max: 20,
                increment: .1
            }]
        },
        u = {
            buckets: [{
                min: 0,
                max: 20,
                increment: .01
            }]
        },
        c = {
            buckets: [{
                min: 0,
                max: 3,
                increment: .01
            }, {
                min: 3,
                max: 8,
                increment: .05
            }, {
                min: 8,
                max: 20,
                increment: .5
            }]
        },
        l = {
            buckets: [{
                min: 0,
                max: 5,
                increment: .05
            }, {
                min: 5,
                max: 10,
                increment: .1
            }, {
                min: 10,
                max: 20,
                increment: .5
            }]
        };
    t.getPriceBucketString = n, t.isValidePriceConfig = i
}, function (e, t, n) {
    "use strict";

    function r(e, t) {
        function n() {
            switch (o) {
                case 0:
                    return "Pending";
                case 1:
                    return "Bid available";
                case 2:
                    return "Bid returned empty or error response";
                case 3:
                    return "Bid timed out"
            }
        }
        var r = t && t.bidId || i.getUniqueIdentifierStr(),
            o = e || 0;
        this.bidderCode = t && t.bidder || "", this.width = 0, this.height = 0, this.statusMessage = n(), this.adId = r, this.getStatusCode = function () {
            return o
        }, this.getSize = function () {
            return this.width + "x" + this.height
        }
    }
    var i = n(2);
    t.createBid = function () {
        return new(Function.prototype.bind.apply(r, [null].concat(Array.prototype.slice.call(arguments))))
    }
}, function (e, t) {
    "use strict";

    function n(e) {
        function t(e) {
            i = e
        }

        function n() {
            return i
        }

        function r() {}
        var i = e;
        return {
            callBids: r,
            setBidderCode: t,
            getBidderCode: n
        }
    }
    t.createNew = function (e) {
        return new n(e)
    }
}, function (e, t, n) {
    "use strict";
    var r = n(14),
        i = n(12),
        o = n(11),
        a = n(3),
        s = n(2),
        d = function () {
            function e(e) {
                var t = void 0,
                    n = void 0,
                    r = window,
                    i = document,
                    o = i.documentElement,
                    a = void 0;
                if (e) {
                    try {
                        r = window.top, i = window.top.document
                    } catch (s) {
                        return
                    }
                    o = i.documentElement, a = i.body, t = r.innerWidth || o.clientWidth || a.clientWidth, n = r.innerHeight || o.clientHeight || a.clientHeight
                } else o = i.documentElement, t = r.innerWidth || o.clientWidth, n = r.innerHeight || o.clientHeight;
                return t + "x" + n
            }

            function t(e) {
                var t = s.createInvisibleIframe(),
                    n = "openx-pd";
                t.setAttribute("id", n), t.setAttribute("name", n);
                var r = document.body;
                r && (t.src = e, b ? (b.parentNode.replaceChild(t, b), b = t) : b = r.appendChild(t))
            }

            function n(e, t) {
                var n = r.createBid(e ? a.STATUS.GOOD : a.STATUS.NO_BID, t);
                if (n.bidderCode = p, e) {
                    var o = e.creative[0];
                    n.ad = e.html, n.cpm = Number(e.pub_rev) / 1e3, n.ad_id = e.adid, e.deal_id && (n.dealId = e.deal_id), o && (n.width = o.width, n.height = o.height)
                }
                i.addBidResponse(t.placementCode, n)
            }

            function d(e) {
                for (var t in e) e.hasOwnProperty(t) && (e[t] || delete e[t]);
                return s._map(Object.keys(e), function (t) {
                    return t + "=" + e[t]
                }).join("&")
            }

            function u(e, t) {
                var n = new Image,
                    r = e.tracking.impression,
                    i = r.match(/([^?]+\/)ri\?/);
                i && (n.src = i[1] + "bo?" + d(t))
            }

            function c(e, t) {
                var n = s.parseSizesInput(t.sizes),
                    r = n && n.length || 0,
                    i = !1,
                    o = e.creative && e.creative[0],
                    a = String(o.width) + "x" + String(o.height);
                if (s.isArray(n))
                    for (var d = 0; r > d; d++) {
                        var u = n[d];
                        if (String(u) === String(a)) {
                            i = !0;
                            break
                        }
                    }
                return i
            }

            function l(e, t, n) {
                if (s.isArray(e)) {
                    t.auid = s._map(e, function (e) {
                        return e.params.unit
                    }).join("%2C"), t.aus = s._map(e, function (e) {
                        return s.parseSizesInput(e.sizes).join(",")
                    }).join("|"), e.forEach(function (e) {
                        for (var n in e.params.customParams) e.params.customParams.hasOwnProperty(n) && (t["c." + n] = e.params.customParams[n])
                    }), t.callback = "window.pbjs.oxARJResponse";
                    var r = d(t);
                    o.loadScript("//" + n + "/w/1.0/arj?" + r)
                }
            }

            function f(t) {
                var n = void 0,
                    r = t.bids || [],
                    i = window.parent !== window ? document.referrer : window.location.href;
                i = i && encodeURIComponent(i);
                try {
                    n = window.self !== window.top
                } catch (o) {
                    n = !1
                }
                if (0 !== r.length) {
                    var a = r[0].params.delDomain;
                    m = new Date(t.start), l(r, {
                        ju: i,
                        jr: i,
                        ch: document.charSet || document.characterSet,
                        res: screen.width + "x" + screen.height + "x" + screen.colorDepth,
                        ifr: n,
                        tz: m.getTimezoneOffset(),
                        tws: e(n),
                        ef: "bt%2Cdb",
                        be: 1,
                        bc: g
                    }, a)
                }
            }
            var p = "openx",
                g = "hb_pb",
                m = void 0,
                b = null;
            return pbjs.oxARJResponse = function (e) {
                var r = e.ads.ad;
                e.ads && e.ads.pixels && t(e.ads.pixels), r || (r = []);
                for (var i = pbjs._bidsRequested.find(function (e) {
                        return "openx" === e.bidderCode
                    }).bids, o = 0; o < i.length; o++) {
                    for (var a = i[o], s = null, d = null, l = 0; l < r.length; l++)
                        if (d = r[l], String(a.params.unit) === String(d.adunitid) && c(d, a) && !d.used) {
                            s = d.adunitid;
                            break
                        }
                    var f = {
                        bd: +new Date - m,
                        br: "0",
                        bt: pbjs.cbTimeout || pbjs.bidderTimeout,
                        bs: window.location.hostname
                    };
                    s && d.pub_rev ? (d.used = !0, f.br = f.bt < f.bd ? "t" : "p", f.bp = d.pub_rev, f.ts = d.ts, n(d, a), u(d.creative[0], f)) : n(null, a)
                }
            }, {
                callBids: f
            }
        };
    e.exports = d
}, function (e, t, n) {
    "use strict";
    var r = n(14),
        i = n(12),
        o = n(11),
        a = n(2),
        s = function () {
            function e(e) {
                "undefined" == typeof window.pp ? o.loadScript(c, function () {
                    t(e)
                }, !0) : t(e)
            }

            function t(e) {
                for (var t = e.bids, r = 0; r < t.length; r++) {
                    var i = t[r];
                    n(i)
                }
            }

            function n(e) {
                try {
                    var t = new window.pp.Ad(s(e));
                    t.display()
                } catch (n) {
                    a.logError("pulsepoint.requestBid", "ERROR", n), u(e)
                }
            }

            function s(e) {
                var t = d(e),
                    n = {
                        cn: 1,
                        ca: window.pp.requestActions.BID,
                        cu: l,
                        adUnitId: e.placementCode,
                        callback: t
                    };
                for (var r in e.params) e.params.hasOwnProperty(r) && (n[r] = e.params[r]);
                return n
            }

            function d(e) {
                return function (t) {
                    u(e, t)
                }
            }

            function u(e, t) {
                if (t) {
                    var n = e.params.cf.toUpperCase().split("X"),
                        o = r.createBid(1, e);
                    o.bidderCode = e.bidder, o.cpm = t.bidCpm, o.ad = t.html, o.width = n[0], o.height = n[1], i.addBidResponse(e.placementCode, o)
                } else {
                    var a = r.createBid(2, e);
                    a.bidderCode = e.bidder, i.addBidResponse(e.placementCode, a)
                }
            }
            var c = window.location.protocol + "//tag-st.contextweb.com/getjs.static.js",
                l = window.location.protocol + "//bid.contextweb.com/header/tag";
            return {
                callBids: e
            }
        };
    e.exports = s
}, function (e, t, n) {
    "use strict";
    var r = function () {
            function e(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    o = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                } catch (d) {
                    i = !0, o = d
                } finally {
                    try {
                        !r && s["return"] && s["return"]()
                    } finally {
                        if (i) throw o
                    }
                }
                return n
            }
            return function (t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        o = n(19),
        a = n(14),
        s = n(12),
        d = n(3),
        u = n(20),
        c = n(2),
        l = n(15),
        f = l.createNew("audienceNetwork"),
        p = f.setBidderCode,
        g = f.getBidderCode,
        m = function (e) {
            return "object" === i(e.params) && "string" == typeof e.params.placementId && e.params.placementId.length > 0 && Array.isArray(e.sizes) && e.sizes.length > 0
        },
        b = function (e) {
            return Array.isArray(e) && 2 === e.length ? e[0] + "x" + e[1] : e
        },
        v = function (e) {
            return ["300x250", "320x50"].includes(e)
        },
        h = function () {
            return Boolean(window && window.location && "string" == typeof window.location.search && -1 !== window.location.search.indexOf("anhb_testmode")).toString()
        },
        y = function (e) {
            var t = {};
            try {
                t = JSON.parse(e)
            } catch (n) {}
            return t
        },
        S = function (e, t, n) {
            var r = "native" === t ? '<script>window.onload=function(){if(parent){var o=document.getElementsByTagName("head")[0];var s=parent.document.getElementsByTagName("style");for(var i=0;i<s.length;i++)o.appendChild(s[i].cloneNode(true));}}</script>' : "",
                i = "native" === t ? '<div class="thirdPartyRoot"><a class="fbAdLink"><div class="fbAdMedia thirdPartyMediaClass"></div><div class="fbAdSubtitle thirdPartySubtitleClass"></div><div class="fbDefaultNativeAdWrapper"><div class="fbAdCallToAction thirdPartyCallToActionClass"></div><div class="fbAdTitle thirdPartyTitleClass"></div></div></a></div>' : "";
            return "<html><head>" + r + "</head><body><div style=\"display:none;position:relative;\">\n<script type='text/javascript'>var data = {placementid:'" + e + "',format:'" + t + "',bidid:'" + n + "',onAdLoaded:function(e){console.log('Audience Network [" + e + "] ad loaded');e.style.display = 'block';},onAdError:function(c,m){console.log('Audience Network [" + e + "] error (' + c + ') ' + m);}};\n(function(a,b,c){var d='https://www.facebook.com',e='https://connect.facebook.net/en_US/fbadnw55.js',f={iframeLoaded:true,xhrLoaded:true},g=a.data,h=function(){if(Date.now){return Date.now();}else return +new Date();},i=function(aa){var ba=d+'/audience_network/client_event',ca={cb:h(),event_name:'ADNW_ADERROR',ad_pivot_type:'audience_network_mobile_web',sdk_version:'5.5.web',app_id:g.placementid.split('_')[0],publisher_id:g.placementid.split('_')[1],error_message:aa},da=[];for(var ea in ca)da.push(encodeURIComponent(ea)+'='+encodeURIComponent(ca[ea]));var fa=ba+'?'+da.join('&'),ga=new XMLHttpRequest();ga.open('GET',fa,true);ga.send();if(g.onAdError)g.onAdError('1000','Internal error.');},j=function(){if(b.currentScript){return b.currentScript;}else{var aa=b.getElementsByTagName('script');return aa[aa.length-1];}},k=function(aa){try{return aa.document.referrer;}catch(ba){}return '';},l=function(){var aa=a,ba=[aa];try{while(aa!==aa.parent&&aa.parent.document)ba.push(aa=aa.parent);}catch(ca){}return ba.reverse();},m=function(){var aa=l();for(var ba=0;ba<aa.length;ba++){var ca=aa[ba],da=ca.ADNW||{};ca.ADNW=da;if(!ca.ADNW)continue;return da.v55=da.v55||{ads:[],window:ca};}throw new Error('no_writable_global');},n=function(aa){var ba=aa.indexOf('/',aa.indexOf('://')+3);if(ba===-1)return aa;return aa.substring(0,ba);},o=function(aa){return aa.location.href||k(aa);},p=function(aa){if(aa.sdkLoaded)return;var ba=aa.window.document,ca=ba.createElement('iframe');ca.name='fbadnw';ca.style.display='none';ba.body.appendChild(ca);var da=ca.contentDocument.createElement('script');da.src=e;da.async=true;ca.contentDocument.body.appendChild(da);aa.sdkLoaded=true;},q=function(aa){var ba=/^https?:\\/\\/www\\.google(\\.com?)?\\.\\w{2,3}$/;return !!aa.match(ba);},r=function(aa){return !!aa.match(/cdn\\.ampproject\\.org$/);},s=function(){var aa=c.ancestorOrigins||[],ba=aa[aa.length-1]||c.origin,ca=aa[aa.length-2]||c.origin;if(q(ba)&&r(ca)){return n(ca);}else return n(ba);},t=function(aa){try{return JSON.parse(aa);}catch(ba){i(ba.message);throw ba;}},u=function(aa,ba,ca){if(!aa.iframe){var da=ca.createElement('iframe');da.src=d+'/audiencenetwork/iframe/';da.style.display='none';ca.body.appendChild(da);aa.iframe=da;aa.iframeAppendedTime=h();aa.iframeData={};}ba.iframe=aa.iframe;ba.iframeData=aa.iframeData;ba.tagJsIframeAppendedTime=aa.iframeAppendedTime||0;},v=function(aa){var ba=d+'/audiencenetwork/xhr/?sdk=5.5.web';for(var ca in aa)if(typeof aa[ca]!=='function')ba+='&'+ca+'='+encodeURIComponent(aa[ca]);var da=new XMLHttpRequest();da.open('GET',ba,true);da.withCredentials=true;da.onreadystatechange=function(){if(da.readyState===4){var ea=t(da.response);aa.events.push({name:'xhrLoaded',source:aa.iframe.contentWindow,data:ea,postMessageTimestamp:h(),receivedTimestamp:h()});}};da.send();},w=function(aa,ba){var ca=d+'/audiencenetwork/xhriframe/?sdk=5.5.web';for(var da in ba)if(typeof ba[da]!=='function')ca+='&'+da+'='+encodeURIComponent(ba[da]);var ea=b.createElement('iframe');ea.src=ca;ea.style.display='none';b.body.appendChild(ea);ba.iframe=ea;ba.iframeData={};ba.tagJsIframeAppendedTime=h();},x=function(aa){var ba=function(event){try{var da=event.data;if(da.name in f)aa.events.push({name:da.name,source:event.source,data:da.data});}catch(ea){}},ca=aa.iframe.contentWindow.parent;ca.addEventListener('message',ba,false);},y=function(aa){if(aa.context&&aa.context.sourceUrl)return true;try{return !!JSON.parse(decodeURI(aa.name)).ampcontextVersion;}catch(ba){return false;}},z=function(aa){var ba=h(),ca=l()[0],da=j().parentElement,ea=ca!=a.top,fa=ca.$sf&&ca.$sf.ext,ga=o(ca),ha=m();p(ha);var ia={amp:y(ca),events:[],tagJsInitTime:ba,rootElement:da,iframe:null,tagJsIframeAppendedTime:ha.iframeAppendedTime||0,url:ga,domain:s(),channel:n(o(ca)),width:screen.width,height:screen.height,pixelratio:a.devicePixelRatio,placementindex:ha.ads.length,crossdomain:ea,safeframe:!!fa,placementid:g.placementid,format:g.format||'300x250',testmode:!!g.testmode,onAdLoaded:g.onAdLoaded,onAdError:g.onAdError};if(g.bidid)ia.bidid=g.bidid;if(ea){w(ha,ia);}else{u(ha,ia,ca.document);v(ia);}; x(ia);ia.rootElement.dataset.placementid=ia.placementid;ha.ads.push(ia);};try{z();}catch(aa){i(aa.message||aa);throw aa;}})(window,document,location);\n</script>\n" + i + "</div></body></html>";
        },
        w = function (e, t, n, i, o) {
            var s = a.createBid(d.STATUS.GOOD, {
                bidId: i
            });
            s.bidderCode = g(), s.cpm = o / 100, s.ad = S(e, n, i);
            var u = t.split("x").map(Number),
                c = r(u, 2);
            return s.width = c[0], s.height = c[1], s.hb_bidder = "fan", s.fb_bidid = i, s.fb_format = n, s.fb_placementid = e, s
        },
        _ = function () {
            var e = a.createBid(d.STATUS.NO_BID);
            return e.bidderCode = g(), e
        },
        E = function (e) {
            var t = [],
                n = [],
                r = [],
                i = [];
            if (e.bids.filter(m).forEach(function (e) {
                    return e.sizes.map(b).filter(v).slice(0, 1).forEach(function (o) {
                        t.push(e.placementCode), n.push(e.params.placementId), r.push(e.params.format || o), i.push(o)
                    })
                }), n.length) {
                var a = h(),
                    d = u.format({
                        protocol: "https",
                        host: "an.facebook.com",
                        pathname: "/v2/placementbid.json",
                        search: {
                            sdk: "5.5.web",
                            testmode: a,
                            placementids: n,
                            adformats: r
                        }
                    });
                o.ajax(d, function (e) {
                    var n = y(e);
                    if (n.errors && n.errors.length) {
                        var o = _();
                        t.forEach(function (e) {
                            return s.addBidResponse(e, o)
                        }), n.errors.forEach(c.logError)
                    } else Object.keys(n.bids).map(function (e) {
                        return n.bids[e]
                    }).reduce(function (e, t) {
                        return e.concat(t)
                    }, []).forEach(function (e, n) {
                        return s.addBidResponse(t[n], w(e.placement_id, i[n], r[n], e.bid_id, e.bid_price_cents))
                    })
                }, null, {
                    withCredentials: !0
                })
            } else c.logError("No valid bids requested")
        },
        T = function () {
            return {
                callBids: E,
                setBidderCode: p,
                getBidderCode: g
            }
        };
    e.exports = T
}, function (e, t, n) {
    "use strict";

    function r(e) {
        c = e
    }

    function i(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        try {
            var i = void 0,
                l = !1,
                f = r.method || (n ? "POST" : "GET"),
                p = "object" === ("undefined" == typeof t ? "undefined" : a(t)) ? t : {
                    success: function () {
                        d.logMessage("xhr success")
                    },
                    error: function (e) {
                        d.logError("xhr error", null, e)
                    }
                };
            if ("function" == typeof t && (p.success = t), window.XMLHttpRequest ? (i = new window.XMLHttpRequest, void 0 === i.responseType && (l = !0)) : l = !0, i.timeout = c, l ? (i = new window.XDomainRequest, i.onload = function () {
                    p.success(i.responseText, i)
                }, i.onerror = function () {
                    p.error("error", i)
                }, i.ontimeout = function () {
                    p.error("timeout", i)
                }, i.onprogress = function () {
                    d.logMessage("xhr onprogress")
                }) : i.onreadystatechange = function () {
                    if (i.readyState === u) {
                        var e = i.status;
                        e >= 200 && 300 > e || 304 === e ? p.success(i.responseText, i) : p.error(i.statusText, i)
                    }
                }, "GET" === f && n) {
                var g = s.parse(e);
                o(g.search, n), e = s.format(g)
            }
            i.open(f, e), l || (r.withCredentials && (i.withCredentials = !0), d._each(r.customHeaders, function (e, t) {
                i.setRequestHeader(t, e)
            }), r.preflight && i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), i.setRequestHeader("Content-Type", r.contentType || "text/plain")), i.send("POST" === f && n)
        } catch (m) {
            d.logError("xhr construction", m)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    t.setAjaxTimeout = r, t.ajax = i;
    var s = n(20),
        d = n(2),
        u = 4,
        c = 3e3
}, function (e, t) {
    "use strict";

    function n(e) {
        return e ? e.replace(/^\?/, "").split("&").reduce(function (e, t) {
            var n = t.split("="),
                r = a(n, 2),
                i = r[0],
                o = r[1];
            return /\[\]$/.test(i) ? (i = i.replace("[]", ""), e[i] = e[i] || [], e[i].push(o)) : e[i] = o || "", e
        }, {}) : {}
    }

    function r(e) {
        return Object.keys(e).map(function (t) {
            return Array.isArray(e[t]) ? e[t].map(function (e) {
                return t + "[]=" + e
            }).join("&") : t + "=" + e[t]
        }).join("&")
    }

    function i(e) {
        var t = document.createElement("a");
        return t.href = decodeURIComponent(e), {
            protocol: (t.protocol || "").replace(/:$/, ""),
            hostname: t.hostname,
            port: +t.port,
            pathname: t.pathname.replace(/^(?!\/)/, "/"),
            search: n(t.search || ""),
            hash: (t.hash || "").replace(/^#/, ""),
            host: t.host
        }
    }

    function o(e) {
        return (e.protocol || "http") + "://" + (e.host || e.hostname + (e.port ? ":" + e.port : "")) + (e.pathname || "") + (e.search ? "?" + r(e.search || "") : "") + (e.hash ? "#" + e.hash : "")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = function () {
        function e(e, t) {
            var n = [],
                r = !0,
                i = !1,
                o = void 0;
            try {
                for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
            } catch (d) {
                i = !0, o = d
            } finally {
                try {
                    !r && s["return"] && s["return"]()
                } finally {
                    if (i) throw o
                }
            }
            return n
        }
        return function (t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.parseQS = n, t.formatQS = r, t.parse = i, t.format = o
}, function (e, t, n) {
    "use strict";

    function r() {
        if (_ && "function" == typeof window[w]) {
            for (var e = 0; e < S.length; e++) S[e].call();
            S.push = function (e) {
                e.call()
            }, _ = !1
        }
        p.logMessage("event count sent to GA: " + T)
    }

    function i(e) {
        return e ? Math.floor(100 * e) : 0
    }

    function o(e) {
        var t;
        return e >= 0 && 200 > e ? t = "0-200ms" : e >= 200 && 300 > e ? t = "0200-300ms" : e >= 300 && 400 > e ? t = "0300-400ms" : e >= 400 && 500 > e ? t = "0400-500ms" : e >= 500 && 600 > e ? t = "0500-600ms" : e >= 600 && 800 > e ? t = "0600-800ms" : e >= 800 && 1e3 > e ? t = "0800-1000ms" : e >= 1e3 && 1200 > e ? t = "1000-1200ms" : e >= 1200 && 1500 > e ? t = "1200-1500ms" : e >= 1500 && 2e3 > e ? t = "1500-2000ms" : e >= 2e3 && (t = "2000ms above"), t
    }

    function a(e) {
        var t;
        return e >= 0 && .5 > e ? t = "$0-0.5" : e >= .5 && 1 > e ? t = "$0.5-1" : e >= 1 && 1.5 > e ? t = "$1-1.5" : e >= 1.5 && 2 > e ? t = "$1.5-2" : e >= 2 && 2.5 > e ? t = "$2-2.5" : e >= 2.5 && 3 > e ? t = "$2.5-3" : e >= 3 && 4 > e ? t = "$3-4" : e >= 4 && 6 > e ? t = "$4-6" : e >= 6 && 8 > e ? t = "$6-8" : e >= 8 && (t = "$8 above"), t
    }

    function s(e) {
        e && e.bidderCode && S.push(function () {
            T++, window[w](I, "event", E, "Requests", e.bidderCode, 1, y)
        }), r()
    }

    function d(e) {
        e && e.bidderCode && S.push(function () {
            var t = i(e.cpm),
                n = e.bidderCode;
            if ("undefined" != typeof e.timeToRespond && A) {
                T++;
                var r = o(e.timeToRespond);
                window[w](I, "event", "Prebid.js Load Time Distribution", r, n, 1, y)
            }
            if (e.cpm > 0) {
                T += 2;
                var s = a(e.cpm);
                A && (T++, window[w](I, "event", "Prebid.js CPM Distribution", s, n, 1, y)), window[w](I, "event", E, "Bids", n, t, y), window[w](I, "event", E, "Bid Load Time", n, e.timeToRespond, y)
            }
        }), r()
    }

    function u(e) {
        S.push(function () {
            p._each(e, function (e) {
                T++, window[w](I, "event", E, "Timeouts", e, y)
            })
        }), r()
    }

    function c(e) {
        var t = i(e.cpm);
        S.push(function () {
            T++, window[w](I, "event", E, "Wins", e.bidderCode, t, y)
        }), r()
    }
    var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        f = n(9),
        p = n(2),
        g = n(3),
        m = g.EVENTS.BID_REQUESTED,
        b = g.EVENTS.BID_TIMEOUT,
        v = g.EVENTS.BID_RESPONSE,
        h = g.EVENTS.BID_WON,
        y = {
            nonInteraction: !0
        },
        S = [],
        w = null,
        _ = !0,
        E = "Prebid.js Bids",
        T = 0,
        A = !1,
        I = null,
        B = !0;
    t.enableAnalytics = function (e) {
        var t = e.provider,
            n = e.options;
        w = t || "ga", I = n && n.trackerName ? n.trackerName + ".send" : "send", B = "undefined" == typeof n || "undefined" == typeof n.sampling || Math.random() < parseFloat(n.sampling), n && "undefined" != typeof n.global && (w = n.global), n && "undefined" != typeof n.enableDistribution && (A = n.enableDistribution);
        var r = null;
        if (B) {
            var i = f.getEvents();
            p._each(i, function (e) {
                if ("object" === ("undefined" == typeof e ? "undefined" : l(e))) {
                    var t = e.args;
                    if (e.eventType === m) r = t, s(r);
                    else if (e.eventType === v) r = t, d(r);
                    else if (e.eventType === b) {
                        var n = t;
                        u(n)
                    } else e.eventType === h && (r = t, c(r))
                }
            }), f.on(m, function (e) {
                s(e)
            }), f.on(v, function (e) {
                d(e)
            }), f.on(b, function (e) {
                u(e)
            }), f.on(h, function (e) {
                c(e)
            })
        } else p.logMessage("Prebid.js google analytics disabled by sampling");
        this.enableAnalytics = function () {
            return p.logMessage("Analytics adapter already enabled, unnecessary call to `enableAnalytics`.")
        }
    }, t.getTrackerSend = function () {
        return I
    }
}, function (e, t, n) {
    "use strict";
    n(23), n(56), n(61), Number.isInteger = Number.isInteger || function (e) {
        return "number" == typeof e && isFinite(e) && Math.floor(e) === e
    }
}, function (e, t, n) {
    n(24), e.exports = n(27).Array.find
}, function (e, t, n) {
    "use strict";
    var r = n(25),
        i = n(43)(5),
        o = "find",
        a = !0;
    o in [] && Array(1)[o](function () {
        a = !1
    }), r(r.P + r.F * a, "Array", {
        find: function (e) {
            return i(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), n(55)(o)
}, function (e, t, n) {
    var r = n(26),
        i = n(27),
        o = n(28),
        a = n(38),
        s = n(41),
        d = "prototype",
        u = function (e, t, n) {
            var c, l, f, p, g = e & u.F,
                m = e & u.G,
                b = e & u.S,
                v = e & u.P,
                h = e & u.B,
                y = m ? r : b ? r[t] || (r[t] = {}) : (r[t] || {})[d],
                S = m ? i : i[t] || (i[t] = {}),
                w = S[d] || (S[d] = {});
            m && (n = t);
            for (c in n) l = !g && y && void 0 !== y[c], f = (l ? y : n)[c], p = h && l ? s(f, r) : v && "function" == typeof f ? s(Function.call, f) : f, y && a(y, c, f, e & u.U), S[c] != f && o(S, c, p), v && w[c] != f && (w[c] = f)
        };
    r.core = i, u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u
}, function (e) {
    var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = t)
}, function (e) {
    var t = e.exports = {
        version: "2.4.0"
    };
    "number" == typeof __e && (__e = t)
}, function (e, t, n) {
    var r = n(29),
        i = n(37);
    e.exports = n(33) ? function (e, t, n) {
        return r.f(e, t, i(1, n))
    } : function (e, t, n) {
        return e[t] = n, e
    }
}, function (e, t, n) {
    var r = n(30),
        i = n(32),
        o = n(36),
        a = Object.defineProperty;
    t.f = n(33) ? Object.defineProperty : function (e, t, n) {
        if (r(e), t = o(t, !0), r(n), i) try {
            return a(e, t, n)
        } catch (s) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
}, function (e, t, n) {
    var r = n(31);
    e.exports = function (e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function (e) {
    e.exports = function (e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function (e, t, n) {
    e.exports = !n(33) && !n(34)(function () {
        return 7 != Object.defineProperty(n(35)("div"), "a", {
            get: function () {
                return 7
            }
        }).a
    })
}, function (e, t, n) {
    e.exports = !n(34)(function () {
        return 7 != Object.defineProperty({}, "a", {
            get: function () {
                return 7
            }
        }).a
    })
}, function (e) {
    e.exports = function (e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, function (e, t, n) {
    var r = n(31),
        i = n(26).document,
        o = r(i) && r(i.createElement);
    e.exports = function (e) {
        return o ? i.createElement(e) : {}
    }
}, function (e, t, n) {
    var r = n(31);
    e.exports = function (e, t) {
        if (!r(e)) return e;
        var n, i;
        if (t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;
        if ("function" == typeof (n = e.valueOf) && !r(i = n.call(e))) return i;
        if (!t && "function" == typeof (n = e.toString) && !r(i = n.call(e))) return i;
        throw TypeError("Can't convert object to primitive value")
    }
}, function (e) {
    e.exports = function (e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function (e, t, n) {
    var r = n(26),
        i = n(28),
        o = n(39),
        a = n(40)("src"),
        s = "toString",
        d = Function[s],
        u = ("" + d).split(s);
    n(27).inspectSource = function (e) {
        return d.call(e)
    }, (e.exports = function (e, t, n, s) {
        var d = "function" == typeof n;
        d && (o(n, "name") || i(n, "name", t)), e[t] !== n && (d && (o(n, a) || i(n, a, e[t] ? "" + e[t] : u.join(String(t)))), e === r ? e[t] = n : s ? e[t] ? e[t] = n : i(e, t, n) : (delete e[t], i(e, t, n)))
    })(Function.prototype, s, function () {
        return "function" == typeof this && this[a] || d.call(this)
    })
}, function (e) {
    var t = {}.hasOwnProperty;
    e.exports = function (e, n) {
        return t.call(e, n)
    }
}, function (e) {
    var t = 0,
        n = Math.random();
    e.exports = function (e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++t + n).toString(36))
    }
}, function (e, t, n) {
    var r = n(42);
    e.exports = function (e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
            case 1:
                return function (n) {
                    return e.call(t, n)
                };
            case 2:
                return function (n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function (n, r, i) {
                    return e.call(t, n, r, i)
                }
        }
        return function () {
            return e.apply(t, arguments)
        }
    }
}, function (e) {
    e.exports = function (e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function (e, t, n) {
    var r = n(41),
        i = n(44),
        o = n(46),
        a = n(48),
        s = n(50);
    e.exports = function (e, t) {
        var n = 1 == e,
            d = 2 == e,
            u = 3 == e,
            c = 4 == e,
            l = 6 == e,
            f = 5 == e || l,
            p = t || s;
        return function (t, s, g) {
            for (var m, b, v = o(t), h = i(v), y = r(s, g, 3), S = a(h.length), w = 0, _ = n ? p(t, S) : d ? p(t, 0) : void 0; S > w; w++)
                if ((f || w in h) && (m = h[w], b = y(m, w, v), e))
                    if (n) _[w] = b;
                    else if (b) switch (e) {
                case 3:
                    return !0;
                case 5:
                    return m;
                case 6:
                    return w;
                case 2:
                    _.push(m)
            } else if (c) return !1;
            return l ? -1 : u || c ? c : _
        }
    }
}, function (e, t, n) {
    var r = n(45);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) {
        return "String" == r(e) ? e.split("") : Object(e)
    }
}, function (e) {
    var t = {}.toString;
    e.exports = function (e) {
        return t.call(e).slice(8, -1)
    }
}, function (e, t, n) {
    var r = n(47);
    e.exports = function (e) {
        return Object(r(e))
    }
}, function (e) {
    e.exports = function (e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function (e, t, n) {
    var r = n(49),
        i = Math.min;
    e.exports = function (e) {
        return e > 0 ? i(r(e), 9007199254740991) : 0
    }
}, function (e) {
    var t = Math.ceil,
        n = Math.floor;
    e.exports = function (e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? n : t)(e)
    }
}, function (e, t, n) {
    var r = n(51);
    e.exports = function (e, t) {
        return new(r(e))(t)
    }
}, function (e, t, n) {
    var r = n(31),
        i = n(52),
        o = n(53)("species");
    e.exports = function (e) {
        var t;
        return i(e) && (t = e.constructor, "function" != typeof t || t !== Array && !i(t.prototype) || (t = void 0), r(t) && (t = t[o], null === t && (t = void 0))), void 0 === t ? Array : t
    }
}, function (e, t, n) {
    var r = n(45);
    e.exports = Array.isArray || function (e) {
        return "Array" == r(e)
    }
}, function (e, t, n) {
    var r = n(54)("wks"),
        i = n(40),
        o = n(26).Symbol,
        a = "function" == typeof o,
        s = e.exports = function (e) {
            return r[e] || (r[e] = a && o[e] || (a ? o : i)("Symbol." + e))
        };
    s.store = r
}, function (e, t, n) {
    var r = n(26),
        i = "__core-js_shared__",
        o = r[i] || (r[i] = {});
    e.exports = function (e) {
        return o[e] || (o[e] = {})
    }
}, function (e, t, n) {
    var r = n(53)("unscopables"),
        i = Array.prototype;
    void 0 == i[r] && n(28)(i, r, {}), e.exports = function (e) {
        i[r][e] = !0
    }
}, function (e, t, n) {
    n(57), e.exports = n(27).Array.includes
}, function (e, t, n) {
    "use strict";
    var r = n(25),
        i = n(58)(!0);
    r(r.P, "Array", {
        includes: function (e) {
            return i(this, e, arguments.length > 1 ? arguments[1] : void 0)
        }
    }), n(55)("includes")
}, function (e, t, n) {
    var r = n(59),
        i = n(48),
        o = n(60);
    e.exports = function (e) {
        return function (t, n, a) {
            var s, d = r(t),
                u = i(d.length),
                c = o(a, u);
            if (e && n != n) {
                for (; u > c;)
                    if (s = d[c++], s != s) return !0
            } else
                for (; u > c; c++)
                    if ((e || c in d) && d[c] === n) return e || c || 0;
            return !e && -1
        }
    }
}, function (e, t, n) {
    var r = n(44),
        i = n(47);
    e.exports = function (e) {
        return r(i(e))
    }
}, function (e, t, n) {
    var r = n(49),
        i = Math.max,
        o = Math.min;
    e.exports = function (e, t) {
        return e = r(e), 0 > e ? i(e + t, 0) : o(e, t)
    }
}, function (e, t, n) {
    n(62), e.exports = n(27).Object.assign
}, function (e, t, n) {
    var r = n(25);
    r(r.S + r.F, "Object", {
        assign: n(63)
    })
}, function (e, t, n) {
    "use strict";
    var r = n(64),
        i = n(68),
        o = n(69),
        a = n(46),
        s = n(44),
        d = Object.assign;
    e.exports = !d || n(34)(function () {
        var e = {},
            t = {},
            n = Symbol(),
            r = "abcdefghijklmnopqrst";
        return e[n] = 7, r.split("").forEach(function (e) {
            t[e] = e
        }), 7 != d({}, e)[n] || Object.keys(d({}, t)).join("") != r
    }) ? function (e) {
        for (var t = a(e), n = arguments.length, d = 1, u = i.f, c = o.f; n > d;)
            for (var l, f = s(arguments[d++]), p = u ? r(f).concat(u(f)) : r(f), g = p.length, m = 0; g > m;) c.call(f, l = p[m++]) && (t[l] = f[l]);
        return t
    } : d
}, function (e, t, n) {
    var r = n(65),
        i = n(67);
    e.exports = Object.keys || function (e) {
        return r(e, i)
    }
}, function (e, t, n) {
    var r = n(39),
        i = n(59),
        o = n(58)(!1),
        a = n(66)("IE_PROTO");
    e.exports = function (e, t) {
        var n, s = i(e),
            d = 0,
            u = [];
        for (n in s) n != a && r(s, n) && u.push(n);
        for (; t.length > d;) r(s, n = t[d++]) && (~o(u, n) || u.push(n));
        return u
    }
}, function (e, t, n) {
    var r = n(54)("keys"),
        i = n(40);
    e.exports = function (e) {
        return r[e] || (r[e] = i(e))
    }
}, function (e) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function (e, t) {
    t.f = Object.getOwnPropertySymbols
}, function (e, t) {
    t.f = {}.propertyIsEnumerable
}, function (e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function i() {
        addEventListener("message", o, !1)
    }

    function o(e) {
        var t = e.message ? "message" : "data",
            n = {};
        try {
            n = JSON.parse(e[t])
        } catch (r) {
            return
        }
        if (n.adId) {
            var i = pbjs._bidsReceived.find(function (e) {
                return e.adId === n.adId
            });
            "Prebid Request" === n.message && (a(i, n.adServerDomain, e.source), pbjs._winningBids.push(i), u["default"].emit(p, i)), "Prebid Native" === n.message && (l["default"](i), pbjs._winningBids.push(i), u["default"].emit(p, i))
        }
    }

    function a(e, t, n) {
        var r = e.adId,
            i = e.ad,
            o = e.adUrl,
            a = e.width,
            d = e.height;
        r && (s(e), n.postMessage(JSON.stringify({
            message: "Prebid Response",
            ad: i,
            adUrl: o,
            adId: r,
            width: a,
            height: d
        }), t))
    }

    function s(e) {
        var t = e.adUnitCode,
            n = e.width,
            r = e.height,
            i = document.getElementById(window.googletag.pubads().getSlots().find(function (e) {
                return e.getAdUnitPath() === t || e.getSlotElementId() === t
            }).getSlotElementId()).querySelector("iframe");
        i.width = "" + n, i.height = "" + r
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.listenMessagesFromCreative = i;
    var d = n(9),
        u = r(d),
        c = n(7),
        l = r(c),
        f = n(3),
        p = f.EVENTS.BID_WON
}, function (e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function i() {
        l.forEach(function (e) {
            u.logMessage("Invoking cookie sync for bidder: " + e.bidder), "iframe" === e.type ? u.insertCookieSyncIframe(e.url, !1) : u.insertPixel(e.url)
        }), l.length = 0
    }

    function o(e) {
        for (var t = 0; t < document.links.length; t++) {
            var n = document.links[t];
            n.href = e + encodeURIComponent(n.href)
        }
    }

    function a(e) {
        "true" !== document.cookie.replace(/(?:(?:^|.*;\s*)pbsCookiePersistFooter\s*\=\s*([^;]*).*$)|^.*$/, "$1") && (document.body.appendChild(s(e)), document.cookie = "pbsCookiePersistFooter=true; expires=Fri, 31 Dec 9999 23:59:59 GMT")
    }

    function s(e) {
        var t = document.createElement("div");
        t.style.background = "#D3D3D3", t.style.color = "#555", t.style.boxShadow = "0 -1px 2px rgba(0, 0, 0, 0.2)", t.style.fontFamily = "sans-serif", t.style.lineHeight = "1.5", t.style.position = "fixed", t.style.bottom = "0", t.style.left = "0", t.style.right = "0", t.style.width = "100%", t.style.padding = "1em 0", t.style.zindex = "1000";
        var n = document.createElement("p");
        return n.style.margin = "0 2em", n.innerHTML = e, t.appendChild(n), t
    }
    var d = n(2),
        u = r(d),
        c = t,
        l = [];
    c.queueSync = function (e) {
        var t = e.bidder,
            n = e.url,
            r = e.type;
        l.push({
            bidder: t,
            url: n,
            type: r
        })
    }, c.syncCookies = function (e) {
        e ? setTimeout(i, e) : i()
    }, c.persist = function (e, t) {
        u.isSafariBrowser() && (o(e), a(t))
    }
}, function (e, t, n) {
    "use strict";
    var r = n(20),
        i = n(73),
        o = function (e) {
            this.name = e.adserver, this.code = e.code, this.getWinningBidByCode = function () {
                return i.getWinningBids(this.code)[0]
            }
        };
    t.dfpAdserver = function (e, t) {
        var n = new o(e);
        n.urlComponents = t;
        var i = {
                env: "vp",
                gdfp_req: "1",
                impl: "s",
                unviewed_position_start: "1"
            },
            a = ["output", "iu", "sz", "url", "correlator", "description_url", "hl"],
            s = function (e) {
                return encodeURIComponent(r.formatQS(e))
            };
        return n.appendQueryParams = function () {
            var e = n.getWinningBidByCode();
            e && (this.urlComponents.search.description_url = encodeURIComponent(e.descriptionUrl), this.urlComponents.search.cust_params = s(e.adserverTargeting), this.urlComponents.search.correlator = Date.now())
        }, n.verifyAdserverTag = function () {
            for (var e in i)
                if (!this.urlComponents.search.hasOwnProperty(e) || this.urlComponents.search[e] !== i[e]) return !1;
            for (var t in a)
                if (!this.urlComponents.search.hasOwnProperty(a[t])) return !1;
            return !0
        }, n
    }
}, function (e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e) {
        return "string" == typeof e ? [e] : p.isArray(e) ? e : pbjs._adUnitCodes || []
    }

    function o(e) {
        var t = m.getWinningBids(e),
            n = a();
        return t = t.map(function (e) {
            return r({}, e.adUnitCode, Object.keys(e.adserverTargeting).filter(function (t) {
                return "undefined" == typeof e.sendStandardTargeting || e.sendStandardTargeting || -1 === n.indexOf(t)
            }).map(function (t) {
                return r({}, t.substring(0, 20), [e.adserverTargeting[t]])
            }))
        })
    }

    function a() {
        return f.getStandardBidderAdServerTargeting().map(function (e) {
            return e.key
        }).concat(g.TARGETING_KEYS).filter(c.uniques)
    }

    function s(e) {
        var t = a();
        return pbjs._bidsReceived.filter(c.adUnitsFilter.bind(this, e)).map(function (e) {
            return e.alwaysUseBid ? r({}, e.adUnitCode, Object.keys(e.adserverTargeting).map(function (n) {
                return t.indexOf(n) > -1 ? void 0 : r({}, n.substring(0, 20), [e.adserverTargeting[n]])
            }).filter(function (e) {
                return e
            })) : void 0
        }).filter(function (e) {
            return e
        })
    }

    function d(e) {
        var t = g.TARGETING_KEYS.concat(l.NATIVE_TARGETING_KEYS);
        return pbjs._bidsReceived.filter(c.adUnitsFilter.bind(this, e)).map(function (e) {
            return e.adserverTargeting ? r({}, e.adUnitCode, u(e, t.filter(function (t) {
                return "undefined" != typeof e.adserverTargeting[t]
            }))) : void 0
        }).filter(function (e) {
            return e
        })
    }

    function u(e, t) {
        return t.map(function (t) {
            return r({}, (t + "_" + e.bidderCode).substring(0, 20), [e.adserverTargeting[t]])
        })
    }
    var c = n(2),
        l = n(7),
        f = n(12),
        p = n(2),
        g = n(3),
        m = t,
        b = [];
    m.resetPresetTargeting = function (e) {
        if (c.isGptPubadsDefined()) {
            var t = i(e),
                n = pbjs.adUnits.filter(function (e) {
                    return t.includes(e.code)
                });
            window.googletag.pubads().getSlots().forEach(function (e) {
                b.forEach(function (t) {
                    n.forEach(function (n) {
                        (n.code === e.getAdUnitPath() || n.code === e.getSlotElementId()) && e.setTargeting(t, null)
                    })
                })
            })
        }
    }, m.getAllTargeting = function (e) {
        var t = i(e),
            n = o(t).concat(s(t)).concat(pbjs._sendAllBids ? d(t) : []);
        return n.map(function (e) {
            Object.keys(e).map(function (t) {
                e[t].map(function (e) {
                    -1 === b.indexOf(Object.keys(e)[0]) && (b = Object.keys(e).concat(b))
                })
            })
        }), n
    }, m.setTargeting = function (e) {
        window.googletag.pubads().getSlots().forEach(function (t) {
            e.filter(function (e) {
                return Object.keys(e)[0] === t.getAdUnitPath() || Object.keys(e)[0] === t.getSlotElementId()
            }).forEach(function (e) {
                return e[Object.keys(e)[0]].forEach(function (e) {
                    e[Object.keys(e)[0]].map(function (n) {
                        return p.logMessage("Attempting to set key value for slot: " + t.getSlotElementId() + " key: " + Object.keys(e)[0] + " value: " + n), n
                    }).forEach(function (n) {
                        t.setTargeting(Object.keys(e)[0], n)
                    })
                })
            })
        })
    }, m.getWinningBids = function (e) {
        var t = i(e);
        return pbjs._bidsReceived.filter(function (e) {
            return t.includes(e.adUnitCode)
        }).filter(function (e) {
            return e.cpm > 0
        }).map(function (e) {
            return e.adUnitCode
        }).filter(c.uniques).map(function (e) {
            return pbjs._bidsReceived.filter(function (t) {
                return t.adUnitCode === e ? t : null
            }).reduce(c.getHighestCpm, {
                adUnitCode: e,
                cpm: 0,
                adserverTargeting: {},
                timeToRespond: 0
            })
        })
    }, m.setTargetingForAst = function () {
        var e = pbjs.getAdserverTargeting();
        Object.keys(e).forEach(function (t) {
            return Object.keys(e[t]).forEach(function (n) {
                if (p.logMessage("Attempting to set targeting for targetId: " + t + " key: " + n + " value: " + e[t][n]), p.isStr(e[t][n]) || p.isArray(e[t][n])) {
                    var r = {},
                        i = "hb_adid",
                        o = n.substring(0, i.length) === i ? n.toUpperCase() : n;
                    r[o] = e[t][n], window.apntag.setKeywords(t, r)
                }
            })
        })
    }, m.isApntagDefined = function () {
        return window.apntag && p.isFn(window.apntag.setKeywords) ? !0 : void 0
    }
}]);
var AdSettings = {};
AdSettings.PREBID_TIMEOUT = 1200, AdSettings.clientWidth = document.documentElement.clientWidth, AdSettings.adUnits = [], AdSettings.adSlotDefinitions = [], AdSettings.sizeMappings = {}, AdSettings.sizeMappings.mappingTop = function () {
    return googletag.sizeMapping().addSize([1100, 0], [
        [728, 90],
        [970, 90]
    ]).addSize([768, 0], [
        [468, 60],
        [728, 90]
    ]).addSize([0, 0], [
        [300, 250]
    ]).build()
}, AdSettings.sizeMappings.mappingBottom = function () {
    return googletag.sizeMapping().addSize([360, 0], [
        [300, 250],
        [336, 280]
    ]).addSize([0, 0], [
        [300, 250]
    ]).build()
}, AdSettings.sizeMappings.mappingRight = function () {
    return googletag.sizeMapping().addSize([360, 0], [
        [300, 250],
        [336, 280]
    ]).addSize([0, 0], [
        [300, 250]
    ]).build()
}, AdSettings.showAds = function () {
    googletag.cmd.push(function () {
        AdSettings.adSlotDefinitions.forEach(function (e) {
            e()
        }), googletag.pubads().setTargeting("locale", EnvSettings.locale), googletag.pubads().setTargeting("ab_tag", EnvSettings.experiment), googletag.pubads().collapseEmptyDivs(), googletag.pubads().enableSingleRequest(), googletag.enableServices(), AdSettings.adUnits.forEach(function (e) {
            googletag.display(e.code)
        })
    }), pbjs.addAdUnits(AdSettings.adUnits), pbjs.requestBids({
        bidsBackHandler: sendAdserverRequest
    })
};
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [], pbjs.bidderSettings = {
    standard: {
        adserverTargeting: [{
            key: "hb_bidder",
            val: function (e) {
                return e.bidderCode
            }
        }, {
            key: "hb_adid",
            val: function (e) {
                return e.adId
            }
        }, {
            key: "hb_pb",
            val: function (e) {
                var t = e.cpm;
                return 3 >= t ? (Math.floor(100 * t) / 100).toFixed(2) : 15 >= t ? (Math.floor(10 * t) / 10).toFixed(2) : 30 > t ? 15 : 0
            }
        }]
    }
};
var sendAdserverRequestCalledAtLeastOnce = !1,
    googletag = googletag || {};
googletag.cmd = googletag.cmd || [], googletag.cmd.push(function () {
        googletag.pubads().disableInitialLoad()
    }), setTimeout(function () {
        sendAdserverRequest()
    }, AdSettings.PREBID_TIMEOUT),
    function () {
        var e = document.createElement("script");
        e.async = !0, e.type = "text/javascript";
        var t = "https:" == document.location.protocol;
        e.src = (t ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
        var n = document.getElementsByTagName("script")[0];
        n.parentNode.insertBefore(e, n)
    }(), Site.ads = Site.ads || {}, Site.ads.taboola_was_intialized = !1, Site.ads.taboola_init = function () {
        Site.ads.taboola_was_intialized = !0, window._taboola = window._taboola || [], _taboola.push({
            article: "auto"
        }), ! function (e, t, n, r) {
            document.getElementById(r) || (e.async = 1, e.src = n, e.id = r, t.parentNode.insertBefore(e, t))
        }(document.createElement("script"), document.getElementsByTagName("script")[0], window.taboola_src, "tb_loader_script"), window.performance && "function" == typeof window.performance.mark && window.performance.mark("tbl_ic")
    }, Site.ads.taboola_desktop_ads = function () {
        Site.ads.taboola_was_intialized || Site.ads.taboola_init()
    }, Site.ads.taboola_mobile_ads = function () {
        console.log("-----mobile ads-----"), Site.ads.taboola_was_intialized || Site.ads.taboola_init();
        var e = EnvSettings.locale,
            t = EnvSettings.taboola_position;
        if ("br" == e || "it" == e) var n = "a";
        else var n = "b";
        var r = document.createElement("div");
        r.className = "ads-taboola", r.style.padding = "padding: 0 5px;", r.innerHTML = '<div id="taboola-below-article-thumbnails"></div>';
        var i = document.querySelector("#bottom-related-quizzes");
        i.insertBefore(r, i.children[t]), window._taboola = window._taboola || [], _taboola.push({
            mode: "thumbnails-" + n,
            container: "taboola-below-article-thumbnails",
            placement: "3m_taboola_8 Below Article Thumbnails",
            target_type: "mix"
        })
    }, Site.ads.related_quiz_ad = function (e, t) {
        var n = "div-gpt-ad-" + e + "-" + EnvSettings.page_type,
            r = "/182469239/quizzstar_" + e + "_" + EnvSettings.page_type,
            t = t,
            i = googletag.defineSlot(r, [
                [728, 90],
                [320, 50]
            ], n).setTargeting("user", EnvSettings.user_status).addService(googletag.pubads()).defineSizeMapping(AdSettings.sizeMappings.mappingRight()),
            o = document.createElement("div");
        o.id = n, o.className = "ad-right", o.innerHTML = "<script>googletag.cmd.push(function() {googletag.display(" + n + ");});</script>";
        var a = document.querySelector("#bottom-related-quizzes");
        a.insertBefore(o, a.children[t]);
        var s = a.children[t - 4].offsetHeight;
        Site.ads._scroll_listener(s, [i])
    }, Site.ads._scroll_listener = function (e, t) {
        var n = !1,
            r = function () {
                window.scrollY >= e && !n && (console.log("-----lazy loading related ad-----"), googletag.cmd.push(function () {
                    googletag.pubads().refresh(t)
                }), n = !0, window.removeEventListener("scroll", r))
            };
        window.addEventListener("scroll", Site.helpers.throttle(r, 500, {
            leading: !0,
            trailing: !0
        }))
    }, EnvSettings.show_related && (Site.stage2Inits.push(function () {
        Related.load_related()
    }), EnvSettings.mobile || Site.stage2Inits.push(function () {
        Site.ads.taboola_desktop_ads()
    })), Related = {
        load_related: function () {
            var e = Site.helpers.getCookie("gender") || "";
            const t = "related_" + EnvSettings.locale + e,
                n = t + "_creation";
            if (window.sessionStorage) {
                var r = window.sessionStorage.getItem(n),
                    i = window.sessionStorage.getItem(t);
                if (r && i && parseInt(r) + 3e5 > Date.now()) {
                    try {
                        Related._render_related(JSON.parse(i))
                    } catch (o) {
                        throw new Error("unable to parse related response from session storage")
                    }
                    return
                }
            }
            var a = "/ajax.php?" + Site.helpers.serializeToParams({
                    gender: e,
                    country_group: EnvSettings.country_group
                }),
                s = new XMLHttpRequest;
            s.onreadystatechange = function () {
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
        _render_related: function (e) {
            console.log(EnvSettings.experiment);
            var t = document.querySelector("#related-template").innerHTML,
                e = e.filter(function (e) {
                    return e.id !== EnvSettings.quiz.id
                });
            for (var n in e) {
                var r = Math.floor(4 * Math.random());
                e[n].position = parseInt(n) + r, "undefined" != typeof window.user_quizzes_taken && window.user_quizzes_taken.includes(e[n].id) && (e[n].position += 15)
            }
            var i = e.sort(function (e, t) {
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
            if (u.innerHTML = Mustache.render(t, {
                    quizzes: i
                }), 1 == EnvSettings.mobile, !1) {
                var c = "/track/related_quizzes?vid=" + d + "&q=" + EnvSettings.quiz.id + "&pt=" + EnvSettings.page_type + "&qs=" + JSON.stringify(s.slice(0, 50)),
                    l = new XMLHttpRequest;
                l.open("POST", c, !0), l.send(null)
            }
            Site.lazyload = new LazyLoad, Site.lazyload.update({
                threshold: 0
            }), EnvSettings.mobile && Site.ads.taboola_mobile_ads()
        }
    }, Site.inits.push(function () {
        FBData.init()
    }), FBData.init = function () {
        window.fbAsyncInit = function () {
                FB.Event.subscribe("auth.statusChange", function (e) {
                    FBData.loginStatusCallback(e)
                }), FB.init(EnvSettings.fb_settings), FBData.sdkInitialized = !0, document.dispatchEvent(new CustomEvent("facebook:init", {}))
            },
            function (e, t, n) {
                var r, i = e.getElementsByTagName(t)[0];
                e.getElementById(n) || (r = e.createElement(t), r.id = n, r.src = "https://connect.facebook.net/" + EnvSettings.fb_script_locale + "/sdk.js", i.parentNode.insertBefore(r, i))
            }(document, "script", "facebook-jssdk")
    }, FBData.sdkInitialized = !1, FBData.checkIfInitialized = function (e) {
        FBData.sdkInitialized ? e() : document.addEventListener("facebook:init", e)
    }, FBData.loginStatusCallback = function (e) {
        console.log("loginStatusCallback", e), "connected" === e.status && e.authResponse.expiresIn && e.authResponse.expiresIn > 400 && (FBData.fbToken = e.authResponse.accessToken, FBData.fbTokenExpiresIn = e.authResponse.expiresIn, FBData.isUserLoggedInWithFacebook = !0, FBData.fbUserId = e.authResponse.userID)
    }, Tracking = {
        push_quiz_id: function (e, t) {
            var n = Tracking.current_quiz_ids(e);
            return -1 == n.indexOf(t) && n.push(t), Tracking.set_quiz_ids(e, n), n
        },
        current_quiz_ids: function (e) {
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
        set_quiz_ids: function (e, t) {
            var n = "quiz_ids_" + e;
            sessionStorage[n] = t.join(",")
        },
        quiz_view: function () {
            if (!window.do_not_track) {
                var e = {
                        t: Date.now()
                    },
                    t = "";
                EnvSettings.gr ? (e = Site.helpers.mergeObj(e, {
                    ref: 1,
                    p: EnvSettings.gr.tracking
                }), t = "/track/view/" + EnvSettings.quiz.id + "/" + EnvSettings.gr.id + "?" + Site.helpers.serializeToParams(e)) : t = "/track/view/" + EnvSettings.quiz.id + "?" + Site.helpers.serializeToParams(e);
                var n = new XMLHttpRequest;
                n.open("GET", t, !0), n.send(null)
            }
        },
        result_share: function () {
            if (!window.do_not_track) {
                var e = EnvSettings.gr.tracking,
                    t = {
                        t: Date.now(),
                        p: e
                    };
                console.log("share", t);
                var n = "/track/share/" + EnvSettings.quiz.id + "/" + EnvSettings.gr.id + "?" + Site.helpers.serializeToParams(t),
                    r = new XMLHttpRequest;
                r.open("GET", n, !0), r.send(null);
                try {
                    fbq("track", "AddToCart")
                } catch (i) {}
                Tracking.push_quiz_id("result_share", EnvSettings.quiz.id), Tracking.analytics.quiz.result_share()
            }
        },
        result_loaded: function () {
            if (!window.do_not_track) {
                var e = EnvSettings.gr.tracking,
                    t = {
                        t: Date.now(),
                        p: e
                    };
                console.log("result_loaded", t);
                var n = "/track/result_loaded/" + EnvSettings.quiz.id + "/" + EnvSettings.gr.id + "?" + Site.helpers.serializeToParams(t),
                    r = new XMLHttpRequest;
                r.open("GET", n, !0), r.send(null);
                try {
                    fbq("track", "ViewContent")
                } catch (i) {}
                Tracking.push_quiz_id("result_view", EnvSettings.quiz.id), Tracking.analytics.quiz.result_view()
            }
        },
        analytics_send: function (e) {
            if (!window.do_not_track) {
                ! function (e, t, n, r, i, o, a) {
                    e.GoogleAnalyticsObject = i, e[i] = e[i] || function () {
                        (e[i].q = e[i].q || []).push(arguments)
                    }, e[i].l = 1 * new Date, o = t.createElement(n), a = t.getElementsByTagName(n)[0], o.async = 1, o.src = r, a.parentNode.insertBefore(o, a)
                }(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"), ga("create", e, "auto");
                var t = window.location.pathname;
                strip_id_regexs = [
                    [/\/apps\/result\/[^\/]+\/([a-fA-F0-9]{24})\/[a-fA-F0-9]{24}/, "/apps/result/$1"],
                    [/\/apps\/r\/[^\/]+\/([a-fA-F0-9]{24})\/[a-fA-F0-9]{24}/, "/apps/r/$1"]
                ];
                for (var n = 0; n < strip_id_regexs.length; n++) t = t.replace(strip_id_regexs[n][0], strip_id_regexs[n][1]);
                ga("send", "pageview", t)
            }
        },
        analytics: {
            quiz: {
                view: function () {
                    ga("send", {
                        hitType: "event",
                        eventCategory: "quiz/view",
                        eventAction: EnvSettings.quiz.id
                    })
                },
                result_view: function () {
                    ga("send", {
                        hitType: "event",
                        eventCategory: "quiz/result_view",
                        eventAction: EnvSettings.quiz.id,
                        eventLabel: Tracking.current_quiz_ids("result_view").length
                    })
                },
                result_share: function () {
                    ga("send", {
                        hitType: "event",
                        eventCategory: "quiz/result_share",
                        eventAction: EnvSettings.quiz.id,
                        eventLabel: Tracking.current_quiz_ids("result_share").length
                    })
                }
            }
        }
    }, Site.inits.push(function () {
        delegateEvent("click", "a.start.button", function () {
            Site.helpers.ui.showLoader()
        }), delegateEvent("click", ".mobile-menu", function () {
            document.querySelector(".mobile-sidebar").classList.toggle("active")
        })
    }), Site.inits.push(function () {
        Site.helpers.ui.hiddenWhenLoadingShow()
    });
var stage2Delay = 3e3;
EnvSettings.mobile === !1 && (stage2Delay = 500), setTimeout(function () {
    stage2()
}, stage2Delay);
var features = [];
if ("includes" in Array.prototype || features.push("Array.prototype.includes"), "forEach" in Array.prototype || features.push("Array.prototype.forEach"), "indexOf" in Array.prototype || features.push("Array.prototype.indexOf"), "find" in Array.prototype || features.push("Array.prototype.find"), "remove" in Element.prototype || features.push("Element.prototype.remove"), "matches" in Element.prototype || features.push("Element.prototype.matches"),
    "classList" in Element.prototype || features.push("Element.prototype.classList"), "closest" in Element.prototype || features.push("Element.prototype.closest"), "Promise" in window || features.push("Promise"), "fetch" in window || features.push("fetch"), "function" == typeof CustomEvent || features.push("CustomEvent"), "querySelectorAll" in document || features.push("document.querySelector"), features.length) {
    console.log("polyfill required");
    var s = document.createElement("script");
    s.src = "https://cdn.polyfill.io/v2/polyfill.min.js?features=" + features.join(",") + "&flags=gated,always&ua=chrome/50&callback=main", s.async = !0, document.head.appendChild(s)
} else console.log("no polyfill required"), main();