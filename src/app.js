const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const currentWeather = require('./utils/currentWeather.js');
const getMap = require('./utils/getMap.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const pubdir = path.join(__dirname, '../public');

// Setup handlebars engine and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(pubdir));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Donald'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Donald'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Provide a location, and get the current weather.',
        title: 'Help',
        name: 'Donald'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({error: 'You must provide an address'});
    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if (error) return res.send({error});
        currentWeather(lat, lon, (error, {wlat, wlon, weather}) => {
            if (error) return res.send({error});
            getMap(lat, lon, wlat, wlon, (error, map) => {
                if (error) return res.send({error});
                res.send({
                    address: req.query.address,
                    location,
                    weather,
                    map
                });
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search);
    res.send({
        products: [],
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - Not Found',
        name: 'Donald',
        error: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Not Found',
        name: 'Donald',
        error: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});