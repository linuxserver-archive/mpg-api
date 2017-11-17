var express = require("express");
var app = express();
var db = require("./db/mysql");

app.use(require("helmet")());
app.use(require("body-parser").json());

app.use("/units", require("./routes/units"));
app.use("/vehicle", require("./routes/vehicle"));
app.use("/vehicle/:id/fuel", require("./routes/fuel"));
app.use("/ping", require("./routes/ping"));

db.connect(function(err) {

    if (err) {
        console.error("Unable to connect to backend database. Check your credentials and connection.");
    } else {

        app.listen(3000, function() {
            console.log('Now listening on port 3000');
        });
    }
});
