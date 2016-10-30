var Subject = require('../model/subject');

var parsedJSON = require('../resources/subjects.json');

var map = {};

parsedJSON.forEach(function (jsonElement) {
    map[jsonElement.id] = new Subject(jsonElement);
});


var Service = {};

Service.findAll = function(callback) {
    var response = [];
    for(key in map){
        response.push(map[key]);
    }
    callback(response);
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



