// list of courses for the homepage. only getting a subset of fields for better performance
Meteor.publish("courseList", function(limit) {

    //default limit if none set
    var dl = limit || 25;

    //TODO: Make paging work

    return Courses.find({}, {
        fields: {
            name: 1,
            rating: 1,
            category: 1,
            level: 1,
            duration: 1,
            released: 1,
            url: 1
        },
        sort: {
            category: 1,
            name: 1
        },
        limit: dl
    });
});

// This happens when the app first starts
Meteor.startup(function() {

    //Courses.remove({});

    //add courses in the courses.js file we grabbed from PluralSight to meteor mongo
    if (Courses.find().count() === 0) {
        for (var i = courses.length - 1; i >= 0; i--) {
            Courses.insert(courses[i]);
        }
    }
});
