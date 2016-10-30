var Subject = require('../model/subject');
var service = require('../service/subjectService');
var express = require('express');
var router = express.Router();

router.get('/', getAll);
router.get('/:subject_id', getBySubjectId);
router.get('/:subject_id/courses', getCoursesBySubjectId);
router.get('/:subject_id/courses/:course_id', getCourseBySubjectIdAndCourseId);


function getAll(req, res) {
    service.findAll(function(all) {
        res.send(all);
        //res.send(all.map(function (toMap) {return new Subject(toMap)}));
    });
}

function getBySubjectId(req, res) {
    service.findBySubjectId(req.params.subject_id, function(result) {
        res.send(result);
    });
}

function getCoursesBySubjectId(req, res) {
    service.findCoursesBySubjectId(req.params.subject_id, function (result) {
        res.send(result);
    });
}

function getCourseBySubjectIdAndCourseId(req, res) {
    service.findCourseBySubjectIdAndCourseId(req.params.subject_id, req.params.course_id, function (result) {
        res.send(result);
    });
}

module.exports = router;
