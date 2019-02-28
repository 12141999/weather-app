const request = require('request');

const darksky = (lat ,lng ,callback) => {
    request({
        url : `https://api.darksky.net/forecast/63afa5b6b7939736f4d5e3f91ff3cd5c/${lat},${lng}`,
        json : true
        } , (error , response , body ) => {
        if(error)
        {
            callback('unable to connect darksky api');
        }
        else if(response.statusCode === 400)
        {
            callback('unable to fetch temperature');
        }
        else if(response.statusCode === 200){
        callback(undefined , {
           temperature : body.currently.temperature,
           apparentTemperature : body.currently.apparentTemperature
        });
        }
    });

}

module.exports.darksky = darksky;
