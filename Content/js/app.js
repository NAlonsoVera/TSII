$(function () {

    $(".owl-carousel-portada").owlCarousel({
        items: 1,
        autoplay: true,
        loop: true,
        smartSpeed: 1000,
        dots: true,
        nav: true,
        navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"]
    });

    $(".owl-carousel-four").owlCarousel({
        autoplay: false,
        loop: true,
        smartSpeed: 2000,
        dots: false,
        responsiveClass: true,
        nav: true,
        navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            415: {
                items: 1
            },
            768: {
                items: 2
            },
            900: {
                items: 3
            },
            1100: {
                items: 4
            }
        }
    });

    $(".owl-carousel-three").owlCarousel({
        autoplay: false,
        loop: true,
        smartSpeed: 2000,
        dots: false,
        responsiveClass: true,
        nav: true,
        navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            415: {
                items: 1
            },
            768: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    });


    $(".owl-carousel-infusiones").owlCarousel({
        autoplay: false,
        loop: true,
        smartSpeed: 2000,
        dots: false,
        responsiveClass: true,
        nav: true,
        navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
        responsive: {
            0: {
                items: 1
            },
            415: {
                items: 1
            },
            768: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    });

    $(document).on('click', function (e) {
        if ($(e.target).closest("#Buscador").length === 0) {
            if (!$("#search-loading").hasClass("hidden")) $("#search-loading").addClass("hidden");
            $("#Buscador").removeClass("index-9999");
        }else {
            $("#search-loading").removeClass("hidden");
            $("#Buscador").addClass("index-9999");
        }
    });

    $(document).on('mouseover', function (e) {

        $buton = $("button.dl-trigger");
        $ul = $("ul.dl-menu");

        $("li.menu-main").removeClass("bg-active-nav");

        if ($(e.target).closest(".filtro").length === 1) {

            if ($("#mobile").css('display') == 'none') {
                $(".filtro").css({ "display": "block" });
            }

            $buton.removeClass("dl-active");
            $ul.removeClass("dl-menuopen");
            

        } else if ($(e.target).closest(".dl-menu").length === 1) {


        } else if ($(e.target).closest(".nav li").length === 0) {

            if (!$("#menu-loading").hasClass("hidden"))
                $("#menu-loading").addClass("hidden");

            $("header").removeClass("index-9999");

            if ($("#mobile").css('display') == 'none') {
                $(".filtro").css({ "display": "none" });
            }

            $buton.removeClass("dl-active");
            $ul.removeClass("dl-menuopen");
            

        } else {

            $("#menu-loading").removeClass("hidden");
            $("header").addClass("index-9999");

            if ($("#mobile").css('display') == 'none') {
                $(".filtro").css({ "display": "none" });
            }

            $buton.removeClass("dl-active");
            $ul.removeClass("dl-menuopen");
            
            $(e.target).closest("li.menu-main").addClass("bg-active-nav");
        }
    });

    $(".nav_mobile").on("click", function () {
        $buton = $("button.dl-trigger");
        $ul = $("ul.dl-menu");

        if ($buton.hasClass("dl-active")) {
            $buton.removeClass("dl-active");
            $ul.removeClass("dl-menuopen");
            $("#menu-loading").addClass("hidden");
            $("header").removeClass("index-9999");
        } else {
            $buton.addClass("dl-active");
            $ul.addClass("dl-menuopen");
            $("#menu-loading").removeClass("hidden");
            $("header").addClass("index-9999");
        }
    });

    $(".dl-menu li a.menu-action").on("click", function () {
        $("li.dl-back a").text($(this).text());
    });

});

function agregarCommaMillions(data) {
    var str = data.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
}