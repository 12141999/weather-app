const express = require("express");
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const geocode = require('./geocode/geocode');
const darksky = require('./weather/darksky');


app.use(bodyParser.urlencoded({ extended: true }));
app.use('', express.static(path.join(__dirname + '')));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.render("input.ejs");
});

app.post('/input', (req, res) => {
    var input = req.body.location;
    console.log(input);
    geocode.geocodeAddress(input, (error, results) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(JSON.stringify(results, undefined, 2));
            darksky.darksky(results.latitude, results.longitude, (error, weatherresults) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log(`temperature : ${weatherresults.temperature}`);
                    console.log(`apparent temperature : ${weatherresults.apparentTemperature}`);
                    res.redirect("/");
                }
            });
        }
    });
});

app.listen("3000" , (req,res) => {
    console.log("server is started at 3000");
});

