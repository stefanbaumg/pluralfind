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
            return Meteor.subscribe('courses-list', this.params.text, this.params.category, Session.get('page'));
        },
        onRun: function() {
            Session.set('page', 1);
        },
        data: function() {
            templateData = {
                // pass in params so we can set the controls correctly
                paramText: this.params.text,

                // the "actual" data: courses
                courses: Courses.find(),
                courseCount: 1200,
                showLoading: 1200 > Session.get('page') * 20
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
