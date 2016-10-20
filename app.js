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
            if ($(this).val() !== "") {

                var term = $(this).val();

                $.ajax({
                    url: "https://en.wikipedia.org/w/api.php?",
                    data: {
                        action: 'query',
                        list: 'search',
                        srsearch: term,
                        format: 'json'
                    },
                    dataType: 'jsonp',
                    headers: {
                        'Api-User-Agent': 'WikiViewer/1.0 (https://github.com/emimnemonic)'
                    },
                    success: function (data) {
                        console.log(data);
                        var results = data.query.search;
                        console.log(results);
                        $.each(results, function (i, val) {
                            $('ul.results-list').append($('<li><strong>'+results[i].title+'</strong><p class="list-content">'+results[i].snippet+'</p></li>'));
                        });
                        $('.container').toggleClass("move");
                        $('.results').toggleClass('hide');
                        back.removeClass("hide");
                    }
                });
            }
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