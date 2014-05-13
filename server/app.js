// list of courses for the homepage. only getting a subset of fields for better performance
Meteor.publish("courses-list", function() {
    return Courses.find({},{
        sort: {
            category: 1,
            name: 1
        }
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
