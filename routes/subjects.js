var service = require('../service/subjectService');
var express = require('express');
var router = express.Router();

router.get('/', getAll);
router.get('/:subject_id', getBySubjectId);
router.get('/:subject_id/courses', getCoursesBySubjectId);
router.get('/:subject_id/courses/:course_id', getCourseBySubjectIdAndCourseId);

router.post('/', createSubject);
router.put('/:subject_id', updateSubject);

function getAll(req, res) {
    service.findAll(function(all) {
        res.send(all);
    });
}

function getBySubjectId(req, res) {
    service.findBySubjectId(req.params.subject_id, function(result) {
        if (!result) {res.statusCode = 204;}
        res.send(result);
    });
}

function getCoursesBySubjectId(req, res) {
    service.findCoursesBySubjectId(req.params.subject_id, function (result) {
        if (!result) {res.statusCode = 204;}
        res.send(result);
    });
}

function getCourseBySubjectIdAndCourseId(req, res) {
    service.findCourseBySubjectIdAndCourseId(req.params.subject_id, req.params.course_id, function (result) {
        if (!result) {res.statusCode = 204;}
        res.send(result);
    });
}

function createSubject(req, res, next) {
    service.createNewSubject(req.body, function(err, response) {
        if (err) {
            err.code = 400;
            return next(err);
        }
        res.statusCode = 201;
        res.send(response);
    });
}

function updateSubject(req, res, next) {
    service.updateSubject(req.params.subject_id, req.body, function(err, response) {
        if (err) {
            err.code = 400;
            return next(err);
        }
        res.statusCode = 200;
        res.send(response);
    });
}


module.exports = router;
