var passport = require("passport");
var passportJWT = require("passport-jwt");
var jwt = require('jsonwebtoken');
var User = require("./model/user");

var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: "linuxserverrocks"
};

module.exports = (function() {

    var strategy = new Strategy(jwtOptions, function(payload, next) {

        User.find(payload.id, function(done, user) {

            if (user) {
                next(null, { id: user.id, email: user.email });
            } else {
                next(new Error("User not found"), null);
            }
        });
    });

    passport.use(strategy);

    return {

        initialize: function() {
            return passport.initialize();
        },

        authenticate: function() {
            return passport.authenticate("jwt", { session: false });
        },

        sign: function(payload) {
            return jwt.sign(payload, jwtOptions.secretOrKey);
        }
    };
}());
