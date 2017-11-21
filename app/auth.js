var jwt = require('jsonwebtoken'),
    _ = require("lodash"),
    User = require("./model/user");

var secret = process.env.AUTH_SECRET;

module.exports = (function() {

    var unauthorised = function(res, message) {

        return res.status(401).json({
            status: "Unauthorised",
            message: message
        });
    };

    return {

        verify: function(req, res, next) {

            var authHeader = req.headers.authorization;

            if (authHeader) {

                var token = _.split(authHeader, "JWT ")[1];

                jwt.verify(token, secret, function(error, decodedToken) {

                    if (error) {
                        return unauthorised(res, error.message);
                    } else {

                        req.user = decodedToken;
                        next();
                    }
                });

            } else {
                return unauthorised(res, "No JWT provided in Authorization header");
            }
        },

        sign: function(payload) {

            return jwt.sign(payload, secret, {
                expiresIn: "60m"
            });
        },

        unauthorised: unauthorised
    };
}());
