var db = require("../db/mysql");

module.exports = (function() {

    var find, findByUsername;

    find = function(userId, done) {

        db.get().query("SELECT * FROM users WHERE id = ?", userId, function(error, results) {

            if (error) return done(error);
            done(null, results[0]);
        });
    };

    findByUsername = function(username, done) {

        db.get().query("SELECT * FROM users WHERE username = ?", username, function(error, results) {

            if (error) return done(error);
            done(null, results[0]);
        });
    };

    return {
        find: find,
        findByUsername: findByUsername
    };

}());
