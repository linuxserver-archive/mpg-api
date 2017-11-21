var express = require("express");
var router = express.Router();
var auth = require("../auth");
var User = require("../model/user");

router.post("/", function(req, res) {

    if (req.body.email && req.body.password) {

        var email = req.body.email;
        var password = req.body.password;

        User.findByEmail(email, function(error, user) {

            if (user) {

                if (password === user.password) {

                    var payload = {
                        id: user.id,
                        email: user.email
                    };

                    res.json({
                        token: auth.sign(payload)
                    });

                } else {
                    res.status(401).end();
                }

            } else {
                res.status(401).end();
            }
        });

    } else {
        res.status(401).end();
    }
});

module.exports = router;
