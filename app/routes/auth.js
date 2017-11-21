var express = require("express"),
    router = express.Router(),
    auth = require("../auth"),
    User = require("../model/user");

router.post("/authenticate", function(req, res) {

    if (req.body.username && req.body.password) {

        var username = req.body.username;
        var password = req.body.password;

        User.findByUsername(username, function(error, user) {

            if (user) {

                if (password === user.password) {

                    var payload = {
                        id: user.id
                    };

                    res.json({
                        token: auth.sign(payload)
                    });

                } else {
                    return auth.unauthorised(res, "Incorrect password");
                }

            } else {
                return auth.unauthorised(res, "User not found");
            }
        });

    } else {
        return auth.unauthorised(res, "Request body missing username or password");
    }
});

module.exports = router;
