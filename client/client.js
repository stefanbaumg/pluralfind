// returns class for the given rating and star-number
Handlebars.registerHelper('starClass', function(rating, starNumber) {
    // half star?
    if (rating == "Not")
        return "";
    else if (rating >= starNumber)
        return "full";
    else if (rating >= starNumber - 0.5)
        return "half";
    else
        return "";
});

// events on course list
Template.home.events({
    // do search on text field blur
    'blur #search-text': function(e, t) {
        e.preventDefault();

        redirectSearch();
    },
    // do search when button pushed:
    'click #search-go': function(e, t) {
        e.preventDefault();

        redirectSearch();
    },
    // do search on enter
    'keyup .search-field input': function(e, t) {
        if (e.keyCode == 13) {
            $('#search-go').click();
        }
    }
});

function redirectSearch() {

    var query = "text=" + $("#search-text").val();

    Router.go('home', null,
    {query: query});
    // Router.go('home', {
    //     _categories: $("#search-text").val(),
    // });
}

// load more items on scroll
Template.layout.created = function() {
    $(window).on('scroll', scrollHandler);
};

Template.layout.destroyed = function() {
    $(window).off('scroll', scrollHandler);
};

var scrollHandler = function(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        Session.set('itemsLimit', Session.get('itemsLimit') + 20);
    }
};
