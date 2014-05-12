// set how many items should be loaded at a time in infinite scroll

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

// load more items on scroll
Template.layout.created = function() {
    $(window).on('scroll', scrollHandler);
};

Template.layout.destroyed = function() {
    $(window).off('scroll', scrollHandler);
};

var scrollHandler = function(e){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
         Session.set('itemsLimit', Session.get('itemsLimit') + 20);
    }
};