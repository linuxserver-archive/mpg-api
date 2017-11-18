var db = require("../db/mysql");

module.exports = (function() {

    var findAll;

    findAll = function(vehicleId, done) {

        db.get().query("SELECT id, DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date, fuelAmountLitres, totalCost, fuelCostPerLitre, locationLatitude, locationLongitude, odometerReading, notes, fullTank FROM fuel WHERE vehicle = ?", vehicleId, function(error, results) {

            if (error) return done(error);
            done(null, results);
        });
    };

    find = function(vehicleId, fuelId, done) {

        db.get().query("SELECT DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date, fuelAmountLitres, totalCost, fuelCostPerLitre, locationLatitude, locationLongitude, odometerReading, notes, fullTank FROM fuel WHERE vehicle = ? AND id = ?", [vehicleId, fuelId], function(error, results) {

            if (error) return done(error);
            done(null, results[0]);
        });
    };

    create = function(vehicleId, data, done) {

        var query = "INSERT INTO fuel (vehicle, date, fuelAmountLitres, totalCost, fuelCostPerLitre, locationLatitude, locationLongitude, odometerReading, notes, fullTank)" +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        var values = [
            vehicleId,
            data.date != null ? data.date : db.CURRENT_TIMESTAMP,
            data.fuelAmountLitres,
            data.totalCost,
            data.fuelCostPerLitre,
            data.locationLatitude,
            data.locationLongitude,
            data.odometerReading,
            data.notes,
            data.fullTank
        ];

        db.get().query(query, values, function(error, results) {

            if (error) return done(error);
            done(null, results.insertId);
        });
    };

    update = function(vehicleId, fuelId, data, done) {

        var query = "UPDATE fuel SET date = ?, fuelAmountLitres = ?, totalCost = ?, fuelCostPerLitre = ?, locationLatitude = ?, locationLongitude = ?, " +
            "odometerReading = ?, notes = ?, fullTank = ? WHERE vehicle = ? AND id = ?";

        var values = [
            data.date != null ? data.date : db.CURRENT_TIMESTAMP,
            data.fuelAmountLitres,
            data.totalCost,
            data.fuelCostPerLitre,
            data.locationLatitude,
            data.locationLongitude,
            data.odometerReading,
            data.notes,
            data.fullTank,
            vehicleId,
            fuelId
        ];

        db.get().query(query, values, function(error, results) {

            if (error) return done(error);
            done();
        });
    };

    remove = function(vehicleId, fuelId, done) {

        db.get().query("DELETE FROM fuel WHERE vehicle = ? AND id = ?", [vehicleId, fuelId], function(error, results) {

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
