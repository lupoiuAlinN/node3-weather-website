const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Define path for express config
const pathPublicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express();
//setup hendelbars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(pathPublicDir))


app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather App',
        name: 'ALin'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'about',
        name: 'Name'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        helpText: 'Helptext',
        title: "Help",
        name: 'ALlin'

    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    } else {
        geocode(req.query.address, (error, {location, longitude, latitude} ={}) => {
            if(error) {
                return  res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {

                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                });
            })
        })
    }

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }

        res.send({
            products: []
        })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ali',
        errorMessage :'Help article not found'
    })
})



app.get('*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'Ali',
       errorMessage : 'page not found'
   })
})


app.listen(3000, () => {
    console.log('Server si up on port 3000');
})