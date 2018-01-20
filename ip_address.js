var express = require('express');
var ip = require('ip');
var parser = require('accept-language-parser');
var app = express();
var getos = require('getos');
var express_locale = require('express-locale');

app.use(express_locale());
app.get("/ip", function(req, res) {
    //get the device ip address
    var myIp = ip.address();

    // get the device language
    var lang = req.locale;
    var language_to_display = lang.language + "-" + lang.region;

    // get the device operating-system
    var os_sys = getos(function(error, system) {
        return system.os + ", " + system.dist;
    })

    res.send({ "ip address": myIp, "language": language_to_display, "software": os_sys });
})

app.listen(3000, function() {
    console.log("App is listening on port 3000");
})