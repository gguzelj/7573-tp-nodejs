var Subject = require('../model/subject');
var Student = require('../model/student');

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
};

Service.updateSubject = function(subject_id, subject, callback) {
    if (!subject_id) { return callback(new Error('Id cant be null'), null);}
    if (!map[subject_id]) { return callback(new Error('No subject with id ' + subject.id + ' exists'), null); }

    subject.id = subject_id;
    map[subject_id] = subject;
    return callback(null, subject);
};

Service.enrollStudent = function(subject_id, course_id, studentBody, callback) {
    if (!subject_id) { return callback(new Error('subject id cant be null'), null);}
    if (!course_id) { return callback(new Error('course id cant be null'), null);}
    if (!map[subject_id]) { return callback(new Error('No subject with id ' + subject_id + ' exists'), null); }
    if (!map[subject_id].courses[course_id]) { return callback(new Error('No course with id ' + course_id + ' exists'), null); }

    var course = map[subject_id].courses[course_id];
    for(var index in course.students) {
        if (course.students[index].student_id == studentBody.student_id) {
            return callback(new Error('Already enrolled student with id ' + studentBody.student_id), null);
        }
    }
    var newStudent = new Student(studentBody);
    course.students.push(newStudent);

    return callback(null, newStudent);
}

module.exports = Service;



