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

    var subject = map[subject_id];
    if (!subject) return callback(new Error('No subject exists with id ' + subject_id), null);

    var courses = subject.courses;

    for(var course_id in courses){
      for(var index in courses[course_id].students) {
        if (courses[course_id].students[index].student_id == studentBody.student_id) {
            return callback(new Error('Already enrolled student with id ' + studentBody.student_id), null);
        }
      }
    }

    var course = courses.filter(function (element) {return element.id == course_id}).pop();
    if (!course) return callback(new Error('No course exists with id ' + course_id), null);

    if (course.vacancy <= 0) {
        return callback(new Error('No more vacancy for course ' + course_id), null);
    }

    var newStudent = new Student(studentBody);
    course.students.push(newStudent);
    --course.vacancy;

    return callback(null, newStudent);
};

Service.unrollStudent = function(subject_id, course_id, student_id, callback) {
    if (!subject_id) { return callback(new Error('subject id cant be null'), null);}
    if (!course_id) { return callback(new Error('course id cant be null'), null);}

    var subject = map[subject_id];
    if (!subject) return callback(new Error('No subject exists with id ' + subject_id), null);

    var courses = subject.courses;
    var course = courses.filter(function (element) {return element.id == course_id}).pop();
    if (!course) return callback(new Error('No course exists with id ' + course_id), null);

    var toDelete;
    course.students.forEach(function(student, index, object) {
        if (student.student_id === student_id) {
            toDelete = student;
            object.splice(index, 1);
        }
    });
    ++course.vacancy;

    return callback(null, toDelete);
};

module.exports = Service;
