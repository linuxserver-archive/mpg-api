var db = require("../db/mysql");

module.exports = (function() {

    var create, update, remove, find, findAll;

    create = function(data, done) {

        var query = "INSERT INTO vehicles (name, registration, model, make, picture, yearOfManufacture, " +
            "vin, fuelType, fuelUnit, distanceUnit, fuelConsumptionUnit) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        var values = [
            data.name,
            data.registration,
            data.model,
            data.make,
            data.picture,
            data.yearOfManufacture,
            data.vin,
            data.fuelType,
            data.fuelUnit,
            data.distanceUnit,
            data.fuelConsumptionUnit
        ];

        db.get().query(query, values, function(error, results) {

            if (error) return done(error);
            done(null, results.insertId);
        });
    };

    update = function(id, data, done) {

        var query = "UPDATE vehicles SET name = ?, registration = ?, model = ?, make = ?, picture = ?, yearOfManufacture = ?, " +
            "vin = ?, fuelType = ?, fuelUnit = ?, distanceUnit = ?, fuelConsumptionUnit = ? WHERE id = ?";

        var values = [
            data.name,
            data.registration,
            data.model,
            data.make,
            data.picture,
            data.yearOfManufacture,
            data.vin,
            data.fuelType,
            data.fuelUnit,
            data.distanceUnit,
            data.fuelConsumptionUnit,
            id
        ];

        db.get().query(query, values, function(error, results) {

            if (error) return done(error);
            done();
        });
    };

    find = function(id, done) {

        db.get().query("SELECT * FROM vehicles AS v WHERE v.id = ?", id, function(error, results) {

            if (error) return done(error);
            done(null, results[0]);
        });
    };

    findAll = function(done) {

        db.get().query("SELECT * FROM vehicles", function(error, results) {

            if (error) return done(error);
            done(null, results);
        });
    };

    remove = function(id, done) {

        db.get().query("DELETE FROM fuel WHERE vehicle = ?; DELETE FROM costs WHERE vehicle = ?; DELETE FROM vehicles WHERE id = ?", [id, id, id], function(error, results) {

            if (error) return done(error);
            done();
        });
    };

    return {

        create: create,
        update: update,
        remove: remove,
        find: find,
        findAll: findAll
    };

}());
