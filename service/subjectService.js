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

Service.createNewSubject = function(subject, callback) {
    if (!subject.id) { return callback(new Error('Id cant be null'), null);}
    if (map[subject.id]) { return callback(new Error('Id specified is already in use'), null); }

    //Further validations will be nice
    map[subject.id] = subject;
    return callback(null, subject);
}

Service.updateSubject = function(subject_id, subject, callback) {
    if (!subject_id) { return callback(new Error('Id cant be null'), null);}
    if (!map[subject_id]) { return callback(new Error('No subject with id ' + subject.id + ' exists'), null); }

    subject.id = subject_id;
    map[subject_id] = subject;
    return callback(null, subject);
}

module.exports = Service;



