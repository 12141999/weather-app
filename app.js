const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const darksky = require('./weather/darksky');

// const geocode = require('../geocode/geocode');
// const darksky = require('../weather/darksky');


const argv = yargs
    .options({
        a: {
            demand : true,
            alias : 'address',
            describe : 'address for weather-app',
            string : true
        }
    })
    .help()
    .alias('help' , 'h')
    .argv;

    

geocode.geocodeAddress(argv.a , (error , results) => {
    if(error)
    {
        console.log(error);
    }
    else{
        console.log(JSON.stringify(results , undefined , 2));
        darksky.darksky(results.latitude , results.longitude , (error , weatherresults) => {
            if(error)
            {
                console.log(error);
            }
            else{
                console.log(`temperature : ${weatherresults.temperature}`);
                console.log(`apparent temperature : ${weatherresults.apparentTemperature}`);
            }
        });
    }
});

//63afa5b6b7939736f4d5e3f91ff3cd5c