// list of courses for the homepage. only getting a subset of fields for better performance
Meteor.publish("courses-list", function(text, categories, page) {

if (categories) {
                categories = categories.split("_");
            } else {
                categories = [];
            }

            if (text === null)
                text = '';

            var filters = {
                $or: [{
                    category: new RegExp(text.replace(".", "\\."), "i")
                },{
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

    return Courses.find(filters,{
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
        limit: page * 20
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
