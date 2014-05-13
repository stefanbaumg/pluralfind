// iron router routes
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404'
});

// home-route. display all courses, search
Router.map(function() {
    this.route('home', {
        path: '/',
        progress: {
            enabled: false
        },
        waitOn: function() {
            return Meteor.subscribe('courses-list');
        },
        onRun: function() {
            Session.set('itemsLimit', 20);
        },
        data: function() {
            //parse categories:
            var categories = [];
            if (this.params.categories) {
                categories = this.params.categories.split("_");
            }

            var filters = {
                //name: 'ADO.NET Fundamentals',
                category: categories.length > 0 ? {
                    $in: categories
                } : {
                    $ne: null
                },
                //level: 'Intermediate',
                // duration: {
                //     $gt: 300
                // }
                $or: [{
                    rating: {
                        $gt: this.params.rating ? parseFloat(this.params.rating) : -1
                    }
                }, {
                    rating: this.params.rating ? -1 : null
                }]

                // released: {
                //     $gt: "2014-03-16T04:00:00.000Z"
                // }
            };
            templateData = {
                courses: Courses.find(filters, {
                    limit: Session.get('itemsLimit')
                }),
                courseCount: Courses.find(filters).count(),
                showLoading: Courses.find(filters).count() > Session.get('itemsLimit')
            };
            return templateData;
        }
    });

    // route for a specific course. don't know if i'll use this
    this.route('course', {
        path: '/course/:_id',
        data: function() {
            _id = this.params._id;
            return Courses.findOne({
                _id: this.params._id
            });
        }
    });

    // route for the user's courses
    this.route('mine');

});
