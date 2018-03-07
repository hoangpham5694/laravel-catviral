function openModal() {
    modal.fadeIn("fast"), $("body").css("overflow", "hidden")
}
function closeModal() {
    primeiroClique = !0, modal.fadeOut("fast"), $("body").css("overflow", "visible")
}
function closeModalShare() {
    primeiroClique = !0, modal.fadeOut("fast"), $("body").css("overflow", "visible")
}
function closeModalQuiz() {
    primeiroClique = !0, modal.fadeOut("fast"), $("body").css("overflow", "visible")
}
function isMobile() {
    var a = $(window).innerWidth();
    return a <= 1024
}
var visible = !0,
    hover = !1,
    y = 0,
    buffer = 100;
if ("sim" == SELECIONA_SIGNO) var modal = $("#modal-signo");
else var modal = $("#modal-login");
!
function (a) {
    function b() {
        visible || (h.removeClass("hide-offscreen"), visible = !0)
    }
    function c() {
        var b = a(window).scrollTop();
        b > buffer && (h.addClass("hide-offscreen"), visible = !1, isMobile() && e())
    }
    function d() {
        i.fadeIn("fast"), a("body").css("overflow", "hidden")
    }
    function e() {
        i.fadeOut("fast"), a("body").css("overflow", "visible")
    }
    function f() {
        g(), j.slideDown()
    }
    function g() {
        a(".alert .msg").html(""), j.slideUp(0)
    }
    a("#main-feat").slick({
        dots: !0,
        arrows: !1,
        infinite: !0,
        centerMode: !1,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "15px",
        autoplay: !0,
        autoplaySpeed: 5e3,
        responsive: [{
            breakpoint: 1025,
            settings: {
                dots: !1,
                centerMode: !1
            }
        }, {
            breakpoint: 530,
            settings: {
                dots: !1,
                centerMode: !0,
                centerPadding: "15px"
            }
        }]
    });
    var h = a(".header"),
        i = a(".nav-mobile");
    isMobile() && a(window).scroll(function () {
        var d = a(window).scrollTop(),
            e = d - y,
            f = d >= y ? "down" : "up";
        if (y = d, "down" == f) {
            if (e < 2) return;
            c()
        } else b()
    }), isMobile() && (a("#open-nav-mobile").click(function (a) {
        a.preventDefault(), d()
    }), a("#close-nav-mobile").click(function (a) {
        e()
    })), a("#open-search").click(function (b) {
        b.preventDefault(), a("#search-container").addClass("show")
    }), a("#close-search").click(function (b) {
        b.preventDefault(), a("#search-container").removeClass("show")
    }), a("html").bind("click", function () {
        a("#search-container").removeClass("show")
    }), h.bind("click", function (a) {
        a.stopPropagation()
    }), a(".open-modal").click(function (a) {
        a.preventDefault(), openModal()
    }), a(".close-modal").click(function (a) {
        closeModal()
    }), a(".close-modal-quiz").click(function (a) {
        closeModalQuiz()
    }), a(".close-modal-share").click(function (a) {
        closeModalShare()
    });
    var j = a(".alert");
    a(".form-contato .bt-submit").click(function (b) {
        return "" == a(".form-contato #nome").val() ? (f(), a(".alert .msg").append("Nome invalido!"), !1) : "" == a(".form-contato #email").val() || a(".form-contato #email").val().indexOf("@") == -1 || a(".form-contato #email").val().indexOf(".") == -1 ? (f(), a(".alert .msg").append("E-mail invalido!"), !1) : "" == a(".form-contato #assunto").val() ? (f(), a(".alert .msg").append("Assunto invalido!"), !1) : "" == a(".form-contato #msg").val() ? (f(), a(".alert .msg").append("Mensagem invalida!"), !1) : void 0
    }), j.click(function (a) {
        g()
    })
}(jQuery);
var primeiroClique = !0;
$(document).ready(function () {
    $("#lingua").change(function () {
        window.location.href = "//" + $("#lingua option:selected").val()
    }), null !== document.getElementById("loadAppHome") ? $(document).scroll(function () {
        var a = $("#loadAppHome").height() + $("#loadAppHome").offset().top,
            b = $(window).height() + $(window).scrollTop();
        b + 200 > a && carregadorDeAplicativo.fazer("#loadAppHome")
    }) : null !== document.getElementById("loadApp") && $(document).scroll(function () {
        var a = $("#loadApp").height() + $("#loadApp").offset().top,
            b = $(window).height() + $(window).scrollTop();
        b + 200 > a && carregadorDeAplicativo.fazer("#loadApp")
    })
});