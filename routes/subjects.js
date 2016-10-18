var service = require('../service/subjectService');
var express = require('express');
var router = express.Router();

router.get('/', getAll);
router.get('/:subject_id', getBySubjectId);
//router.get('/:subject_id/courses', getCoursesBySubjectId);
//router.get('/:subject_id/courses', getCourseBySubjectIdAndCourseId);


function getCourseBySubjectIdAndCourseId() {

}

function getAll(req, res) {
    service.findAll(function(all) {
        res.send(all);
    });
}

function getBySubjectId(req, res) {
    service.findBySubjectId(req.params.subject_id, function(result) {
        res.send(result);
    });
}

function getCoursesBySubjectId() {

}

module.exports = router;
