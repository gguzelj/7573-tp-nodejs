var parsedJSON = require('../resources/subjects.json');

var map = {}

parsedJSON.forEach(function (subject) {
    map[subject.code] = subject;
});


var Service = function() {
    parsedJSON.forEach(function (subject) {
        map[subject.code] = subject;
    });
};

Service.findAll = function(callback) {
    callback(map);
};

Service.findBySubjectId = function(id, callback) {
    callback(map[id]);
};

module.exports = Service;



