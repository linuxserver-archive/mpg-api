var express = require("express");
var router = express.Router();
var _ = require("lodash");

var Vehicle = require("../model/vehicle");
var Fuel = require("../model/fuel");
var Cost = require("../model/cost");

var noItemsInResponse = function(response) {
    return _.isUndefined(response) || (!_.isArray(response) && _.isEmpty(response));
};

var responseHandler = function(res, key, response, error) {

    var obj = {};

    if (error) {

        res.status(500).json({
            "status": error
        });

    } else {

        if (noItemsInResponse(response)) {
            res.status(404).end();
        } else {

            obj[key] = response;
            res.json(obj);
        }
    }
};

// VEHICLE
// -------
router.get('/', function(req, res) {

    Vehicle.findAll(function(error, vehicles) {
        responseHandler(res, "vehicles", vehicles, error);
    });
});

router.get('/:id', function(req, res) {

    Vehicle.find(req.params.id, function(error, vehicle) {
        responseHandler(res, "vehicle", vehicle, error);
    });
});

router.post('/', function(req, res) {

    Vehicle.create(req.body, function(error, id) {

        if (error) {
            res.status(500).json({
                "status": error
            });
        } else {

            Vehicle.find(id, function(error, vehicle) {
                responseHandler(res, "vehicle", vehicle, error);
            });
        }
    });
});

router.put('/:id', function(req, res) {

    var id = req.params.id;

    Vehicle.update(req.params.id, req.body, function(error) {

        if (error) {
            res.status(500).json({
                "status": error
            });
        } else {

            Vehicle.find(id, function(error, vehicle) {
                responseHandler(res, "vehicle", vehicle, error);
            });
        }
    });
});

router.delete("/:id", function(req, res) {

    Vehicle.remove(req.params.id, function(error) {
        responseHandler(res, "status", "Item deleted", error);
    });
});

// FUEL
// ----
router.get('/:vehicleId/fuel', function(req, res) {

    Fuel.findAll(req.params.vehicleId, function(error, fuel) {
        responseHandler(res, "fuel", fuel, error);
    });
});

router.get('/:vehicleId/fuel/:id', function(req, res) {

    Fuel.find(req.params.vehicleId, req.params.id, function(error, fuel) {
        responseHandler(res, "fuel", fuel, error);
    });
});

router.post('/:vehicleId/fuel', function(req, res) {

    Fuel.create(req.params.vehicleId, req.body, function(error, id) {

        if (error) {
            res.status(500).json({
                "status": error
            });
        } else {

            Fuel.find(req.params.vehicleId, id, function(error, fuel) {
                responseHandler(res, "fuel", fuel, error);
            });
        }
    });
});

router.put('/:vehicleId/fuel/:id', function(req, res) {

    var id = req.params.id;

    Fuel.update(req.params.vehicleId, req.params.id, req.body, function(error) {

        if (error) {
            res.status(500).json({
                "status": error
            });
        } else {

            Fuel.find(req.params.vehicleId, id, function(error, fuel) {
                responseHandler(res, "fuel", fuel, error);
            });
        }
    });
});

router.delete("/:vehicleId/fuel/:id", function(req, res) {

    Fuel.remove(req.params.vehicleId, req.params.id, function(error) {
        responseHandler(res, "status", "Item deleted", error);
    });
});

// COST
// ----
router.get('/:vehicleId/costs', function(req, res) {

    Cost.findAll(req.params.vehicleId, function(error, costs) {
        responseHandler(res, "costs", costs, error);
    });
});

router.get('/:vehicleId/cost/:id', function(req, res) {

    Cost.find(req.params.vehicleId, req.params.id, function(error, cost) {
        responseHandler(res, "cost", cost, error);
    });
});

router.post('/:vehicleId/cost', function(req, res) {

    Cost.create(req.params.vehicleId, req.body, function(error, id) {

        if (error) {
            res.status(500).json({
                "status": error
            });
        } else {

            Cost.find(req.params.vehicleId, id, function(error, cost) {
                responseHandler(res, "cost", cost, error);
            });
        }
    });
});

router.put('/:vehicleId/cost/:id', function(req, res) {

    var id = req.params.id;

    Cost.update(req.params.vehicleId, req.params.id, req.body, function(error) {

        if (error) {
            res.status(500).json({
                "status": error
            });
        } else {

            Cost.find(req.params.vehicleId, id, function(error, cost) {
                responseHandler(res, "cost", cost, error);
            });
        }
    });
});

router.delete("/:vehicleId/cost/:id", function(req, res) {

    Cost.remove(req.params.vehicleId, req.params.id, function(error) {
        responseHandler(res, "status", "Item deleted", error);
    });
});

module.exports = router;
