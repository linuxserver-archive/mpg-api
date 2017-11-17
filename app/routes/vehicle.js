var express = require("express");
var router = express.Router();
var model = require("../model/vehicle");

router.get('/', function(req, res) {

    model.findAll(function(error, vehicles) {

        if (error) {
            res.status(500).json({ "status": error });
        } else {
            res.json(vehicles);
        }
    });
});

router.get('/:id', function(req, res) {

    model.find(req.params.id, function(error, vehicle) {

        if (error) {
            res.status(500).json({ "status": error });
        } else {
            res.json(vehicle);
        }
    });
});

router.post('/', function(req, res) {

    model.create(req.body, function(error, id) {

        if (error) {
            res.status(500).json({ "status": error });
        } else {

            model.find(id, function(error, vehicle) {

                if (error) {
                    res.status(500).json({ "status": error });
                } else {
                    res.json(vehicle);
                }
            });
        }
    });
});

router.put('/:id', function(req, res) {
    res.send("Hello " + req.params.id);
});

module.exports = router;
