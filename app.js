$(document).ready(function () {

    var searchBtn = $('#search-btn'),
        form = $('#search-form'),
        field = $('#search-field'),
        type = $('#type-search'),
        close = $('#close'),
        clear = $('#clear-search'),
        back = $('#back');

    function toSearch(p1, p2) {
        p1.addClass("hide");
        p2.removeClass("hide");
    };

    function stopSearch(p1, p2) {
        p1.removeClass("hide");
        p2.addClass("hide");
    };

    searchBtn.click(function () {
        $(this).fadeToggle("slow", "linear", function () {
            form.fadeToggle("slow", "linear");
            field.focus();
        });
    });

    field.keypress(function () {
        if ($(this).val() !== "") {
            toSearch(type, close);
        }
    });

    field.keyup(function () {
        if ($(this).val() === "") {
            stopSearch(type, close);
        }
    });

    clear.click(function () {
        field.val("");
        stopSearch(type, close);
        field.focus();
    });


    field.keypress(function (e) {
        if (e.which === 13) {
            $('.container').toggleClass("move");
            $('.results').toggleClass('hide');
            back.removeClass("hide");
        }
    });

    back.click(function () {
        form.fadeToggle("fast", "linear", function () {
            searchBtn.fadeToggle("fast", "linear");
            $('.container').toggleClass("move");
            $('.results').toggleClass('hide');
            back.toggleClass("hide");
            field.val("");
            stopSearch(type, close);
        });
    });
});