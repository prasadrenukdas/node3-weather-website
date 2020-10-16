const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Prasad Renukdas'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Prasad Renukdas',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Help message',
        title: 'Help',
        name: 'Prasad Renukdas',
    });
})

app.get('/weather', (req, res) => {
   if (!req.query.address) {
       return res.send('Error: Please enter the address or location name')
   }

   forecast(req.query.address, (error, forecastData) => {
       if (error) {
           return res.send({
               error: 'No data found for given location'
           })
       }
       res.send({forecastData, address: req.query.address});
       
   })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help page not found',
        title: 'Help',
        name: 'Prasad Renukdas',
    });
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page not found',
        name: 'Prasad Renukdas',
    });
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})