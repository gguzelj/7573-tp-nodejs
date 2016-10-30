var Course = require('./course');

var Subject = function (data) {

    return {
        id : data.id || undefined,
        department : data.department || undefined,
        code : data.code || undefined,
        name : data.name || undefined,
        credits : data.credits || undefined,
        courses : processCourses(data.courses)
    };

    function processCourses (coursesData) {
        var response = [];
        for(var key in coursesData) {
            response.push(new Course(coursesData[key]));
        }
        return response;
    }

};

module.exports = Subject;
