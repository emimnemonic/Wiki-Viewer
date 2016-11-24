$(document).ready(function () {

    var searchBtn = $('#search-btn'),
        form = $('#search-form'),
        field = $('#search-field'),
        type = $('#type-search'),
        clear = $('#clear-text'),
        clearBtn = $('#clear-btn'),
        back = $('#back'),
        container = $('.container'),
        resultsList = $('ul.results-list'),
        // Search methods
        search = {
            toggleText: function (toHide, toShow) {
                toHide.addClass("hide");
                toShow.removeClass("hide");
            },
            open: function () {
                form.toggleClass("hide");
                field.focus();
                type.removeClass("hide");
            },
            close: function () {
                form.toggleClass("hide");
                field.blur();
                field.val("");
                type.addClass("hide");
                clear.addClass("hide");
            },
            checkPos: function (el) {
                return el.hasClass('move');
            },
            checkStatus: function (toCheck) {
                return toCheck.hasClass("hide");
            },
            showOptions: function (value) {
                if (value !== "") {
                    search.toggleText(type, clear);
                }
            },
            hideOptions: function (value) {
                if (value === "") {
                    search.toggleText(clear, type);
                }
            }
        };
    // Show and hide search field on button click

    searchBtn.click(function (e) {
        e.preventDefault();

        $(this).fadeOut("slow", function () {
            search.open();

            $(document).on('click', function (e) {
                if (!search.checkStatus(form) && !search.checkPos($('#wrap')) && e.target.id !== 'search-field') {
                    search.close();
                    searchBtn.fadeIn("slow");
                };
            });

        });
    });

    // Show search options when user inputs text

    field.keypress(function (value) {
        value = $(this).val();
        search.showOptions();
    });

    // Clear search options and show help text when user deletes text

    field.keyup(function (value) {
        value = $(this).val();
        search.hideOptions();
    });

    // Clear search option

    clearBtn.click(function (e) {
        e.preventDefault();
        field.val("");
        search.toggleText(clear, type);
        field.focus();
    });
    // Submitting search queries

    field.keypress(function (e) {
        // When user presses enter
        if (e.which === 13) {
            e.preventDefault();
            field.blur();
            // And if search field isn't empty

            var term = $(this).val();

            if (term !== "") {
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
                    timeout: 5000,
                    headers: {
                        'Api-User-Agent': 'WikiViewer/1.0 (https://github.com/emimnemonic)'
                    }
                })
                .then(function (data) {
                    var results = data.query.pages;
                    // Removes previous results if any
                    while (resultsList.children().length !== 0) {
                        resultsList.children().remove();
                    }
                    // Base URL for articles link
                    var url = 'https://en.wikipedia.org/?curid=';
                    // Loop through results and append items to the list
                    $.each(results, function (i, val) {
                        resultsList.append($('<a href="' + url + results[i].pageid + '" target="_blank"><li class="list-item"><p><strong>' + results[i].title + '</strong></p><p>' + results[i].extract + '</p></li></a>'));
                    });
                })
                // Handle error
                .catch(function (err) {
                    console.log(err);
                    resultsList.children().remove();
                    resultsList.append("<li class='list-item'><p>Oops! Something went wrong... Please try again later.</p></li>");
                })
                // Move container no matter what
                .always(function () {
                    container.addClass("move").delay(1000).queue(function () {
                        $('.results').removeClass('hide');
                        back.removeClass("hide");
                        $(this).dequeue();
                    });
                });
            }
        }
    });

    back.click(function () {
        $('.results').addClass("hide");
        container.removeClass("move");
        back.addClass("hide").queue(function () {
            form.toggleClass("hide");
            search.toggleText(clear, type);
            searchBtn.fadeToggle("fast", "linear");
            field.val("");
            $(this).dequeue();
        });
    });
});
