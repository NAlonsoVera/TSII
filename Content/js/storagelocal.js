
$(function () {

    mpolRefreshItem();

    try {
        $.validator.setDefaults({
            ignore: [],
            // other default options
        });
    } catch (err) { }

    $.ajax({
        url: "/Login/ValidateSession",
        type: "GET",
        success: function (data) {
            if (data) {
                const items = mpolLocalStorage("mpol_carritotemporal").get();
                if (items && items.length !== 0) {
                    $.ajax({
                        url: "/ShoppingCart/AgregarMasivo",
                        data: {
                            productos: items
                        },
                        type: "POST",
                        success: function (result) {
                            if (result.Success) {
                                mpolLocalStorage("mpol_carritotemporal").delete();
                                mpolRefreshItem(true);
                            } else {
                                console.log("Error..." + result.MessageError);
                            }
                        }
                    });
                }
            }
        }
    });

    if (window.location.origin !== window.location.href.slice(0, -1)) {
        $.ajax({
            url: "/Default/Tracking",
            data: {
                link: window.location.href
            },
            type: "GET",
            success: function (result) { }
        });
    }

});

function mpolLocalStorage(nameItem) {

    console.log(nameItem);

    if (typeof (Storage) === "undefined") {
        alert("Sorry! No Web Storage support..");
        return false;
    }
    const objectItem = localStorage.getItem(nameItem);
    const jsonObjectItem = objectItem ? JSON.parse(objectItem) : [];

    return {
        add: function (data) {
            jsonObjectItem.push(data);
            localStorage.setItem(nameItem, JSON.stringify(jsonObjectItem));
            return true;
        },
        set: function (key, data) {
            jsonObjectItem[key] = data;
            localStorage.setItem(nameItem, JSON.stringify(jsonObjectItem));
            return true;
        },
        get: function (key) {
            if (!key) {
                return jsonObjectItem;
            } else {
                return jsonObjectItem[key];
            }
        },
        delete: function (key) {

            if (key == undefined) {
                localStorage.removeItem(nameItem);
                return true;
            } else {
                jsonObjectItem.splice(key, 1);
                localStorage.setItem(nameItem, JSON.stringify(jsonObjectItem));
                return true;
            }
        }
    }
}

function mpolRefreshItem(online) {

    if (online === true) {
        $.ajax({
            url: "/ShoppingCart/Count",
            type: "GET",
            success: function (count) {
                if (count && count !== 0) {
                    $(".cart-no").text(count);
                }
            }
        });
    }
    else if (online === false) {
        const $localCarrito = mpolLocalStorage("mpol_carritotemporal").get();

        if ($localCarrito && $localCarrito.length !== 0) {
            $(".cart-no").text($localCarrito.length);
        }
    } else {

        $.ajax({
            url: "/Login/ValidateSession",
            type: "GET",
            success: function (data) {
                if (data) {
                    $.ajax({
                        url: "/ShoppingCart/Count",
                        type: "GET",
                        success: function (count) {
                            if (count && count !== 0) {
                                $(".cart-no").text(count);
                            }
                        }
                    });
                } else {
                    const $localCarrito = mpolLocalStorage("mpol_carritotemporal").get();
                    if ($localCarrito && $localCarrito.length !== 0) {
                        $(".cart-no").text($localCarrito.length);
                    }
                }
            }
        });
    }
}

function formatMoney(n, currency) {
    return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

function invocarModal(url, onSuccess) {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "html",
        success: function (data) {
            $("body").append(data);
            if (onSuccess)
                onSuccess(data);
        },
        beforeSend: function () {
            $("#adminlte--Loading").addClass("active");
        },
        complete: function () {
            $("#adminlte--Loading").removeClass("active");
        }
    });
}