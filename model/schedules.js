var Schedule = function (data) {
    return {
        classroom : data.classroom || undefined,
        type : data.type || undefined,
        day : data.day || undefined,
        from : data.from || undefined,
        to : data.to || undefined
    };

};

module.exports = Schedule;