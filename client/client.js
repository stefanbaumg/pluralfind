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

// format dates using moment js
Handlebars.registerHelper('formatDate', function(date) {
    // half star?
    if (!date)
        return "";
    else
        return moment(date).calendar();
});

Handlebars.registerHelper('isSelected', function(value, param) {
    if (value == decodeURIComponent(param)){
        return "selected";
    }
    return "";
});

// events on course list
Template.home.events({
    // do search on text field blur
    'blur #search-text': function(e, t) {
        e.preventDefault();

        redirectSearch();
    },
    'change select': function(e, t){
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
    },
    'click #load-more': function(e, t){
        e.preventDefault();
        Session.set('page', Session.get('page') + 1);
    }
});

// when a search control is changed, go to new route
function redirectSearch() {

    var query = "text=" + encodeURIComponent($("#search-text").val()) + "&category=" + encodeURIComponent($("#search-category").val());

    Router.go('home', null, {
        query: query
    });
}

// // load more items on scroll
// Template.layout.created = function() {
//     $(window).on('scroll', _.throttle(scrollHandler, 200));
// };

// // remove the scrollhandler if we're  no longer using the layout
// Template.layout.destroyed = function() {
//     $(window).off('scroll', scrollHandler);
// };

// // the function that handles scrolls. simply increment page by one when user gets to bottom of page
// var scrollHandler = function(e) {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//         Session.set('page', Session.get('page') + 1);
//     }
// };
