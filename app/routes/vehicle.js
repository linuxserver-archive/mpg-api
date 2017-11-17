var express = require("express");
var router = express.Router();
var model = require("../model/vehicle");

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

router.get('/', function(req, res) {

    model.findAll(function(error, vehicles) {
        responseHandler(res, "vehicles", vehicles, error);
    });
});

router.get('/:id', function(req, res) {

    model.find(req.params.id, function(error, vehicle) {
        responseHandler(res, "vehicle", vehicle, error);
    });
});

router.post('/', function(req, res) {

    model.create(req.body, function(error, id) {

        if (error) {
            res.status(500).json({
                "status": error
            });
        } else {

            model.find(id, function(error, vehicle) {
                responseHandler(res, "vehicle", vehicle, error);
            });
        }
    });
});

router.put('/:id', function(req, res) {

    var id = req.params.id;

    model.update(req.params.id, req.body, function(error) {

        if (error) {
            res.status(500).json({
                "status": error
            });
        } else {

            model.find(id, function(error, vehicle) {
                responseHandler(res, "vehicle", vehicle, error);
            });
        }
    });
});

module.exports = router;
