var service = require('../service/subjectService');
var express = require('express');
var router = express.Router();
var cors = require('cors');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use(cors());


router.get('/', getAll);
router.get('/:subject_id', getBySubjectId);
router.get('/:subject_id/courses', getCoursesBySubjectId);
router.get('/:subject_id/courses/:course_id', getCourseBySubjectIdAndCourseId);
router.get('/:subject_id/courses/:course_id/students', getStudentsBySubjectIdAndCourseId);

router.post('/', createSubject);
router.put('/:subject_id', updateSubject);
router.post('/:subject_id/courses/:course_id', enrollStudent);

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

function getStudentsBySubjectIdAndCourseId(req, res) {
    service.findCourseBySubjectIdAndCourseId(req.params.subject_id, req.params.course_id, function (result) {
        if (!result) {res.statusCode = 204;}
        res.send(result.students);
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

function enrollStudent(req, res, next) {
    service.enrollStudent(req.params.subject_id, req.params.course_id, req.body, function(err, response) {
        if (err) {
            res.status(401).send({ message: err.message });
        }
        res.statusCode = 200;
        res.send(response);
    });
}


module.exports = router;
