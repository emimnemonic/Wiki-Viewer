$(document).ready(function () {

    var searchBtn = $('#search-btn'),
        form = $('#search-form'),
        field = $('#search-field'),
        type = $('#type-search'),
        close = $('#close'),
        clear = $('#clear-search');

    searchBtn.click(function () {
        $(this).fadeToggle("slow", "linear", function () {
            form.fadeToggle("slow", "linear");
            field.focus();
        });
    });

    field.keypress(function () {
        if ($(this).val() !== "") {
            type.addClass("hide");
            close.removeClass("hide");
        }
    });

    field.keyup(function () {
        if ($(this).val() === "") {
            close.addClass("hide");
            type.removeClass("hide");
        }
    });

    clear.click(function () {
        field.val("");
        close.addClass("hide");
        type.removeClass("hide");
        field.focus();
    });
});
