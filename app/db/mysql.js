var mysql = require("mysql");

var HOST = process.env.MYSQL_HOST,
    USERNAME = process.env.MYSQL_USERNAME,
    PASSWORD = process.env.MYSQL_PASSWORD;

var state = {
    pool: null
};

var resultsHandler = function(field, next) {

    if (field.type == "TINY" && field.length == 1) {
        return field.string() == "1";
    }

    return next();
};

exports.connect = function(done) {

    state.pool = mysql.createPool({

        host: HOST,
        user: USERNAME,
        password: PASSWORD,
        database: "mpg",
        multipleStatements: true,
        typeCast: resultsHandler
    });

    done();
};

exports.get = function() {
    return state.pool;
};

exports.CURRENT_TIMESTAMP = {

    toSqlString: function() {
        return "CURRENT_TIMESTAMP()";
    }
};
