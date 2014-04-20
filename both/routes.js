// iron router routes
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404'
});

Router.map(function() {
    this.route('home', {
        path: '/',
        waitOn: function() {
            return Meteor.subscribe('courseList', 9999);
        },
        data: function() {
            templateData = {
                courses: Courses.find({}),
            };
            return templateData;
        }
    });

    this.route('course', {
        path: '/course/:_id',
        data: function() {
            _id = this.params._id;
            return Courses.findOne({
                _id: this.params._id
            });
        }
    });

    this.route('mine');

});
