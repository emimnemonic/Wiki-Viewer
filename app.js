$(document).ready(function () {

    var searchBtn = $('#search-btn'),
        form = $('#search-form'),
        field = $('#search-field'),
        type = $('#type-search'),
        close = $('#close'),
        clear = $('#clear-search'),
        back = $('#back');

    // Hide help text and show search options
    function toSearch(p1, p2) {
        p1.addClass("hide");
        p2.removeClass("hide");
    };

    // Hide search options and show help text

    function stopSearch(p1, p2) {
        p1.removeClass("hide");
        p2.addClass("hide");
    };

    // Show search field on button click

    searchBtn.click(function () {
        $(this).fadeToggle("slow", "linear", function () {
            form.toggleClass("hide");
            field.focus();
            type.removeClass('hide');
        });
    });

    // Show search options when user inputs text

    field.keypress(function () {
        if ($(this).val() !== "") {
            toSearch(type, close);
        }
    });

    // Clear search options and show help text when user deletes text

    field.keyup(function () {
        if ($(this).val() === "") {
            stopSearch(type, close);
        }
    });

    // Clear search option

    clear.click(function (e) {
        e.preventDefault();
        field.val("");
        stopSearch(type, close);
        field.focus();
    });

    // Submitting search queries

    field.keypress(function (e) {
        // When user presses enter
        if (e.which === 13) {
            e.preventDefault();

            // And if search field isn't empty

            var term = $(this).val();

            if (term !== "") {

                // Call Wikimedia API

                $.ajax({
                    url: "https://en.wikipedia.org/w/api.php?",
                    data: {
                        action: 'query',
                        generator: 'search',
                        gsrsearch: term,
                        gsrlimit: 10,
                        prop: 'extracts',
                        explaintext: true,
                        exintro: true,
                        exchars: 320,
                        exlimit: 10,
                        format: 'json'
                    },
                    dataType: 'jsonp',
                    headers: {
                        'Api-User-Agent': 'WikiViewer/1.0 (https://github.com/emimnemonic)'
                    },
                    success: function (data) {
                        console.log(data);
                        var results = data.query.pages,
                            resultsList = $('ul.results-list'),
                            url = 'https://en.wikipedia.org/?curid=';

                        // Check if there are previous results and if so remove them

                        while (resultsList.children().length !== 0) {
                            resultsList.children().remove();
                        }
                        // Iterate through array and add information to list

                        $.each(results, function (i, val) {
                            resultsList.append($('<a href="' + url + results[i].pageid + '" target="_blank"><li class="item"><strong>' + results[i].title + '</strong><br /><p class="list-content">' + results[i].extract + '</p></li></a>'));
                        });

                        // Slide menu left or up and reveal search results

                        $('.container').addClass("move").delay(1000).queue(function () {
                            $('.results').removeClass('hide');
                            back.removeClass("hide");
                            $(this).dequeue();
                        });
                    }
                });
            }
        }
    });

    back.click(function () {
        $('.results').addClass("hide");
        $('.container').removeClass("move");
        back.addClass("hide").queue(function () {
            form.toggleClass("hide");
            stopSearch(type, close);
            searchBtn.fadeToggle("fast", "linear");
            field.val("");
            $(this).dequeue();
        });
    });
});