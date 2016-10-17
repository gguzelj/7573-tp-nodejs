var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('views/landing/index.html')
});

router.get('/:subject_id', function(req, res) {
    res.json({ message: 'GET subject by id!' + req.params.subject_id });
});

module.exports = router;
