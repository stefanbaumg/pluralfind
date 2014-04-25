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

Template.home.rendered = function() {};
