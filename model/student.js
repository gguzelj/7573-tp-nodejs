var Student = function (data) {
    return {
        student_id : data.student_id || undefined,
        name : data.name || undefined,
        last_name : data.last_name || undefined
    };
};

module.exports = Student;
