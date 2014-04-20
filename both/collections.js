//set up mongo collections
Courses = new Meteor.Collection("courses");

//only allow user to add himself to course
Courses.allow({});
