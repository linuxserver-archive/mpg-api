var db = require("../db/mysql");

exports.create = function(data, done) {

    var values = [data.name, data.registration, data.model, data.make];

    db.get().query("INSERT INTO vehicles (name, registration, model, make) VALUES (?, ?, ?, ?)", values, function(error, results) {

        if (error) return done(error);
        done(null, results.insertId);
    });
};

exports.find = function(id, done) {

    db.get().query("SELECT * FROM vehicles WHERE id = ?", id, function(error, results) {

        if (error) return done(error);
        done(null, results[0]);
    });
};

exports.findAll = function(done) {

    db.get().query("SELECT * FROM vehicles", function(error, results) {

        if (error) return done(error);
        done(null, { "vehicles": results });
    });
};

exports.remove = function(id, done) {

    db.get().query("DELETE FROM fuel WHERE vehicleId = ?; DELETE FROM costs WHERE vehicleId = ?; DELETE FROM vehicles WHERE id = ?", function(error, results) {

    });
};
