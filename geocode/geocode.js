const request = require('request');


const geocodeAddress = (address , callback) => {
const encodedAddress = encodeURIComponent(address);
request({ 
    url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBfeJEhYBehzdv61AfFCdcqwZ_J2DcrzWM`,
    json: true
} , (error , res , body) => {
    if(error)
    {
        callback('unable to connect google server');
    }
    else if(body.status === 'ZERO_RESULTS')
    {
        callback('your address is invalid');
    }
    else if(body.status === 'OK')
    {
        callback(undefined , {
            address : body.results[0].formatted_address,
            latitude : body.results[0].geometry.location.lat,
            longitude : body.results[0].geometry.location.lng
        });
    }
    else{
        callback('something error found');
    }
});

}

module.exports.geocodeAddress = geocodeAddress;