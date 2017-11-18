var db = require("../db/mysql");

module.exports = (function() {

    var findAll;

    findAll = function(vehicleId, done) {

        db.get().query("SELECT id, DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date, costType, totalCost, invoice, notes FROM costs WHERE vehicle = ?", vehicleId, function(error, results) {

            if (error) return done(error);
            done(null, results);
        });
    };

    find = function(vehicleId, costId, done) {

        db.get().query("SELECT DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date, costType, totalCost, invoice, notes FROM costs WHERE vehicle = ? AND id = ?", [vehicleId, costId], function(error, results) {

            if (error) return done(error);
            done(null, results[0]);
        });
    };

    create = function(vehicleId, data, done) {

        var query = "INSERT INTO costs (vehicle, date, costType, totalCost, invoice, notes) VALUES (?, ?, ?, ?, ?, ?)";

        var values = [
            vehicleId,
            data.date != null ? data.date : db.CURRENT_TIMESTAMP,
            data.costType,
            data.totalCost,
            data.invoice,
            data.notes
        ];

        db.get().query(query, values, function(error, results) {

            if (error) return done(error);
            done(null, results.insertId);
        });
    };

    update = function(vehicleId, costId, data, done) {

        var query = "UPDATE costs SET date = ?, costType = ?, totalCost = ?, invoice = ?, notes = ? WHERE vehicle = ? AND id = ?";

            var values = [
                data.date != null ? data.date : db.CURRENT_TIMESTAMP,
                data.costType,
                data.totalCost,
                data.invoice,
                data.notes,
                vehicleId,
                costId
            ];

        db.get().query(query, values, function(error, results) {

            if (error) return done(error);
            done();
        });
    };

    remove = function(vehicleId, costId, done) {

        db.get().query("DELETE FROM costs WHERE vehicle = ? AND id = ?", [vehicleId, costId], function(error, results) {

            if (error) return done(error);
            done();
        });
    };

    return {
        findAll: findAll,
        find: find,
        create: create,
        update: update,
        remove: remove
    };

}());
