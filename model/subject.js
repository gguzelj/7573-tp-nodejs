var method = Subject.prototype;

function Subject(code, name) {
    this.code = code;
    this.name = name;
}

method.getCode = function() {
    return this.code;
};

module.exports = Subject;