var parsedJSON = require('../resources/subjects.json');

var map = {}

parsedJSON.forEach(function (subject) {
    map[subject.id] = subject;
});


var Service = function() {
    parsedJSON.forEach(function (subject) {
        map[subject.id] = subject;
    });
};

Service.findAll = function(callback) {
    callback(map);
};

Service.findBySubjectId = function(subjectId, callback) {
    callback(map[subjectId]);
};

Service.findCoursesBySubjectId = function(subjectId, callback) {
    callback(map[subjectId].courses);
};

Service.findCourseBySubjectIdAndCourseId = function(subjectId, courseId, callback) {

    var courses = map[subjectId].courses;
    callback(courses.filter(function (element) {return element.id == courseId}).pop());
};


module.exports = Service;



