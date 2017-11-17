var express = require("express");
var router = express.Router();

router.get('/', function(req, res) {
    res.send("Hello all fuel");
});

router.get('/:id', function(req, res) {
    res.send("Hello fuel " + req.params.id);
});

router.post('/', function(req, res) {

});

router.put('/:id', function(req, res) {
    res.send("Hello " + req.params.id);
});

module.exports = router;
