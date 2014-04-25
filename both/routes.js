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
        waitOn: function() {
            return Meteor.subscribe('courseList', 100);
        },
        data: function() {
            templateData = {
                courses: Courses.find({}),
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
