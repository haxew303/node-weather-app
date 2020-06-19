const request = require('postman-request');
require('dotenv').config();

const getMap = (lat, lon, wlat, wlon, callback) => {
    const clat = (Number(lat) + Number(wlat)) / 2;
    const clon = (Number(lon) + Number(wlon)) / 2;
    const zoom = 12.5;
    const baseURL = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/";
    const mapPath = `pin-s-home+9ed4bd(${lon},${lat}),pin-s-lighthouse+000(${wlon},${wlat})/${clon},${clat},${zoom},0,0/800x500`;
    const params = `?access_token=${process.env.MAPBOXAPIKEY}`;
    const url = baseURL + mapPath + params;
    request({url, encoding: null}, (error, {headers, body}) => {
        if (error) callback('Could not connect to the mapping service.', undefined);
        if (headers["content-type"] !== "image/png") callback(undefined, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=");
        else {
            const map = "data:image/png;base64," + Buffer.from(body).toString('base64');
            callback(undefined, map);
        }
    })
};

module.exports = getMap;