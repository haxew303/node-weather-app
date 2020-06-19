const request = require('postman-request');
require('dotenv').config();

const currentWeather = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACKAPIKEY + 
                '&query=' + lat +','+ lon +'&units=f';
    request({url, json: true}, (error, {body} = {}) =>{
        if (error) callback('Could not connect to the weather service', undefined);
        else if (body.error) callback('Weather data not found!', undefined);
        else callback(undefined, {
            weather: body.current.weather_descriptions[0] + ". It is currently " 
                   + body.current.temperature + " degrees outside. It feels like " 
                   + body.current.feelslike + " degrees. The UV index is "
                   + body.current.uv_index,
            wlat: body.location.lat,
            wlon: body.location.lon
        });
    })

};

module.exports = currentWeather;