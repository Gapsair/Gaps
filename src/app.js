const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handleBars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Reuel Gaps'
    })
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About litleBoi',
        name: 'Reuel Gaps'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        helpbox: 'This is a helpful info.',
        title: 'Help',
        name: 'Reuel Gaps'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) =>{
    if (!req.query.search) {
     return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Reuel Gaps',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
      title: '404',
      name: 'Reuel Gaps',
      errorMessage: 'Page not Found'  
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.');
})