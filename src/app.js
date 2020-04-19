const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Marcos'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Marcos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Dynamic help',
        title: 'Help',
        name: 'Marcos'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send('error: a address is required.')
    } else {
        geocode( req.query.address, (error, {latitude, longitude, location} = {}) =>{
            if (error) return res.send(error) 

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) return res.send(error)
        
                res.send({ 
                    forecast: forecastData, 
                    location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: 'Help',
        name: 'Marcos'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Marcos'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})