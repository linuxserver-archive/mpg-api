var express = require("express");
var router = express.Router();

// Models
var fuelUnit = require("../model/fuelUnit");
var fuelConsumptionUnit = require("../model/fuelConsumptionUnit");
var distanceUnit = require("../model/distanceUnit");

var responseHandler = function(res, key, response, error) {

    var obj = {};

    if (error) {

        res.status(500).json({
            "status": error
        });

    } else {

        obj[key] = response;
        res.json(obj);
    }
};

router.get("/fuelUnits", function(req, res) {

    fuelUnit.findAll(function(error, fuelUnits) {
        responseHandler(res, "fuelUnits", fuelUnits, error);
    });
});

router.get("/fuelConsumptionUnits", function(req, res) {

    fuelConsumptionUnit.findAll(function(error, fuelConsumptionUnits) {
        responseHandler(res, "fuelConsumptionUnits", fuelConsumptionUnits, error);
    });
});

router.get("/distanceUnits", function(req, res) {

    distanceUnit.findAll(function(error, distanceUnits) {
        responseHandler(res, "distanceUnits", distanceUnits, error);
    });
});

module.exports = router;
