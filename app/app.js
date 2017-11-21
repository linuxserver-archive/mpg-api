var express = require("express"),
    morgan = require("morgan"),
    db = require("./db/mysql"),
    app = express(),
    auth = require("./auth");

app.use(require("helmet")());
app.use(require("body-parser").json());
app.use(morgan("combined"));

// Unauthenticated endpoint used for checking user credentials
app.use("/auth", require("./routes/auth"));

// All authenticated endpoints - user must provide a valid JWT in the header
app.use("/units", auth.verify, require("./routes/units"));
app.use("/vehicle", auth.verify, require("./routes/vehicle"));
app.use("/ping", auth.verify, require("./routes/ping"));

db.connect(function(err) {

    if (err) {
        console.error("Unable to connect to backend database. Check your credentials and connection.");
    } else {

        module.exports = app.listen(3000, function() {
            console.log('Now listening on port 3000');
        });
    }
});
