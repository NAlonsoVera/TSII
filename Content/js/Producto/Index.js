$(function() {

    $(".cProduct").keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("#btnSearchProducto").trigger("click");
        }
    })

    if (window.matchMedia('(max-width: 575px)').matches) {
        $(".card-body").removeClass("show");
    } else {
        //...
    }
    $(".btnSolicitarProducto").on("click", function () {
        $.ajax({
            url: "/TicketAtencion/PartiaGenerarTicket",
            type: "GET",
            dataType: "html",
            success: function (data) {
                $("body").append(data);
            },
            beforeSend: function () {
                $(".loading").show();
            },
            complete: function () {
                $(".loading").hide();
            }
        });
    });

    $("#Filtrar").on("click", function () {
        $(".filtro").css({ "display": "block" });
        $("#menu-loading").removeClass("hidden");
        $("header").addClass("index-9999");
    });

    $("div.jplist-pagingmid, div.jplist-pagingnext, div.jplist-pagingprev").on('click', 'button', function () {
        window.scrollTo(0, 75);
    })

})