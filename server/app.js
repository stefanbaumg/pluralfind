// list of courses for the homepage. only getting a subset of fields for better performance
Meteor.publish("courses-list", function(text, categories, page) {

    // the query that returns the filtered, paged list of courses.
    // only return some of the fields of a course to save bandwidth
    return Courses.find(getFilters(text, categories), {
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
        skip: page* 10,
        limit: 10
    });
}); // end publish courses paged and filtered

Meteor.methods({
    getCoursesCount: function(text, categories){
        return Courses.find(getFilters(text, categories), {
        fields: {
            _id: 1
        }
    }).count();
    },
    getCoursesCategories: function(text, categories){
        return Courses.find(getFilters(text, ''), {
        fields: {
            category: 1
        },
        sort: {
            category: 1
        }
    }).fetch();
    }
});

// this function builds a filter expression from the given filter params
function getFilters(text, categories){
    // split the categories-string into an array
    categories = decodeURIComponent(categories);
    if (categories) {
        categories = categories.split("_");
    } else {
        categories = [];
    }

    // if text is not given, set to empty string for simpler searching
    if (text === null) {
        text = '';
    }

    return {
        $or: [{
            author: new RegExp(text.replace(".", "\\."), "i")
        },{
            category: new RegExp(text.replace(".", "\\."), "i")
        }, {
            name: new RegExp(text.replace(".", "\\."), "i")
        }, {
            description: new RegExp(text.replace(".", "\\."), "i")
        }],
        category: categories.length > 0 ? {
            $in: categories
        } : {
            $ne: null
        },
        //level: 'Intermediate',
        // duration: {
        //     $gt: 300
        // }
        // $or: [{
        //     rating: {
        //         $gt: this.params.rating ? parseFloat(this.params.rating) : -1
        //     }
        // }, {
        //     rating: this.params.rating ? -1 : null
        // }]

        // released: {
        //     $gt: "2014-03-16T04:00:00.000Z"
        // }
    };
}

// This happens when the app first starts
// Good place to set up base data
Meteor.startup(function() {

    //Courses.remove({});

    //add courses in the courses.js file we grabbed from PluralSight to meteor mongo
    if (Courses.find().count() === 0) {
        for (var i = courses.length - 1; i >= 0; i--) {
            Courses.insert(courses[i]);
        }
    }
});
