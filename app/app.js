var express = require("express");
var morgan = require("morgan");
var db = require("./db/mysql");
var app = express();

app.use(require("helmet")());
app.use(require("body-parser").json());
app.use(morgan("combined"));

app.use(function(req, res, next) {

    var apiKey = req.query.apiKey || req.headers["x-api-key"];

    if (apiKey === process.env.API_KEY) {
        next();
    } else {
        res.status(401).json({ status: "Incorrect API key" });
    }
});

app.use("/units", require("./routes/units"));
app.use("/vehicle", require("./routes/vehicle"));
app.use("/ping", require("./routes/ping"));

db.connect(function(err) {

    if (err) {
        console.error("Unable to connect to backend database. Check your credentials and connection.");
    } else {

        module.exports = app.listen(3000, function() {
            console.log('Now listening on port 3000');
        });
    }
});
