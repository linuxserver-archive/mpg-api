var mysql = require("mysql");

var HOST = process.env.MYSQL_HOST,
    USERNAME = process.env.MYSQL_USERNAME,
    PASSWORD = process.env.MYSQL_PASSWORD;

var state = {
    pool: null
};

exports.connect = function(done) {

    state.pool = mysql.createPool({

        host: HOST,
        user: USERNAME,
        password: PASSWORD,
        database: "mpg"
    });

    done();
};

exports.get = function() {
    return state.pool;
};
