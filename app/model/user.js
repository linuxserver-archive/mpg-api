var db = require("../db/mysql");

module.exports = (function() {

    var find, findByUsername;

    find = function(userId, done) {

        db.get().query("SELECT * FROM users WHERE id = ?", userId, function(error, results) {

            if (error) return done(error);
            done(null, results[0]);
        });
    };

    findByEmail = function(email, done) {

        db.get().query("SELECT * FROM users WHERE email = ?", email, function(error, results) {

            if (error) return done(error);
            done(null, results[0]);
        });
    };

    return {
        find: find,
        findByEmail: findByEmail
    };

}());
