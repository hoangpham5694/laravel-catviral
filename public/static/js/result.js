Site.inits.push(function() {
    delegateEvent("click", ".tlnf", function() {
        Result.sharers.popup()
    }), Site.helpers.ui.delayedLoadImages()
});
var Result = {};
Result.sharers = Result.sharers || {}, Result.sharers.popup = function() {
    var e = document.querySelector('meta[property="og:url"]').content;
    console.log("shareUrl", e);
    var t = document.querySelector('meta[property="og:image"]').content,
        r = (Math.random().toString(36) + "00000000000000000").slice(2, 10),
        n = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(e) + "&picture=" + t;
    if (Tracking.result_share(), Site.helpers.is_facebook_in_app()) window.location = n;
    else {
        window.share_window = window.open(n, r, "width=567,height=572");
        var a = window.setInterval(function() {
            window.share_window.closed !== !1 && window.clearInterval(a)
        }, 100)
    }
}, Result.load = function() {
    var e = new Pusher(EnvSettings.gr.pusherPublicKey),
        t = e.subscribe(EnvSettings.gr.pusherChannelName),
        r = !1,
        n = !1,
        a = function(e, t) {
            var a = function() {
                    fetch(e + "?" + Date.now()).then(function(e) {
                        return e.json()
                    }).then(function(e) {
                        console.log("from polling"), e.done ? t(e.data) : e.redirect && (window.location.href = e.redirect)
                    })
                },
                i = 3e3;
            n = setTimeout(function() {
                a();
                var e = 0;
                r = setInterval(function() {
                    a(), e += 1, e > 8 && clearInterval(r)
                }, 4e3)
            }, i)
        },
        i = function(t) {
            clearInterval(r), clearTimeout(n);
            try {
                e.disconnect()
            } catch (a) {}
            Result.renderResult(t)
        };
    t.bind("result_ready", function(e) {
        console.log("from pusher"), i(e)
    }), a(EnvSettings.gr.checkPath, i)
}, Result.renderResult = function(data) {
    if (EnvSettings.gr.tracking = data.track_info, Tracking.result_loaded(EnvSettings.quiz.id, data.track_info), window.history && history.pushState) {
        Site.helpers.ui.hideLoader(), Site.helpers.ui.removeElements('meta[property="og:image"]'), Site.helpers.ui.removeElements('meta[property="og:title"]'), Site.helpers.ui.removeElements('meta[property="og:description"]'), Site.helpers.ui.removeElements('meta[property="og:url"]');
        var addMetaTag = function(e, t) {
            var r = document.createElement("meta");
            r.setAttribute("property", e), r.setAttribute("content", t), document.getElementsByTagName("head")[0].appendChild(r)
        };
        addMetaTag("og:image", data.result_image_url), addMetaTag("og:title", data.result_title), addMetaTag("og:description", data.result_share_byline), addMetaTag("og:url", data.result_share_url);
        var dummy = document.createElement("div");
        dummy.innerHTML = data.html;
        for (var replacements = dummy.querySelectorAll(".result-section"), resultSections = document.querySelectorAll(".result-wrapper .result-section"), i = 0; i < resultSections.length; i++)
            if (replacements[i]) {
                resultSections[i].innerHTML = replacements[i].innerHTML;
                var scriptTags = resultSections[i].getElementsByTagName("script");
                console.log(scriptTags);
                for (var n = 0; n < scriptTags.length; n++) eval(scriptTags[n].innerHTML)
            }
        document.querySelector(".quiz-load-container").style.display = "none";
        try {
            FB.XFBML.parse()
        } catch (ex) {}
        Site.helpers.ui.delayedLoadImages(), "loadCallback" in Result && Result.loadCallback(), "Special" in window && Special.afterResult && Special.afterResult(), history.replaceState(null, null, EnvSettings.gr.resultUrl), Site.helpers.setSidebarHeight()
    } else window.location.replace(EnvSettings.gr.resultUrl);
    EnvSettings.readyForAds = !0, sendAdserverRequestCalledAtLeastOnce && (sendAdserverRequest(), "function" == typeof resultAdSenseShow && resultAdSenseShow())
};