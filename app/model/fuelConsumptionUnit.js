var db = require("../db/mysql");

module.exports = (function() {

    var findAll;

    findAll = function(done) {

        db.get().query("SELECT * FROM fuelConsumptionUnits", function(error, results) {

            if (error) return done(error);
            done(null, results);
        });
    };

    return {
        findAll: findAll
    };

}());
