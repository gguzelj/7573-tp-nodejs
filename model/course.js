var Schedule = require('./schedules');

var Course = function (data) {
    return {
        id : data.id || undefined,
        headquarters : data.headquarters || undefined,
        professors : data.professors || undefined,
        schedule : processSchedules(data.schedule)
    };

    //////////////////

    function processSchedules (schedulesData) {
        var response = [];
        for(var key in schedulesData) {
            response.push(new Schedule(schedulesData[key]));
        }
        return response;
    }

};


module.exports = Course;
