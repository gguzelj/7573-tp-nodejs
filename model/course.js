var Schedule = require('./schedules');
var Student = require('./student');

var Course = function (data) {
    return {
        id : data.id || undefined,
        headquarters : data.headquarters || undefined,
        professors : data.professors || undefined,
        schedule : mapArray(data.schedule, function (scheduleJson) {return new Schedule(scheduleJson)}),
        vacancy : data.vacancy || undefined,
        students : mapArray(data.students, function (studentJson) {return new Student(studentJson)})
    };

    function mapArray (array, callback) {
        var response = [];
        for(var key in array) {
            response.push(callback(array[key]));
        }
        return response;
    }
};


module.exports = Course;
