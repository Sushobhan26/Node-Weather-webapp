 const path = require('path');
 const express = require('express');
 const hbs = require('hbs');
 const request = require('request');


const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

 //console.log(__dirname);
 //path is used to manupulate the directory paths
 //console.log(path.join(__dirname, '../public'))
 
 const app = express();
 //define paths for express config
 const publicDir = path.join(__dirname, '../public');
//if views dir has to be customised, new dir has to be explicitly provided to express
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//handlebar view dir has to be under root with the name views --> express looks for views dir
 //hbs is the express plugin integrated with handlebar
app.set('view engine', 'hbs');
app.set('views', viewsPath)  //reqd only if views dir has been customised
hbs.registerPartials(partialsPath); //to register the partials dir with hbs

//setup static directory to serve
app.use(express.static(publicDir));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sushobhan Datta'
    })  //render is used to render the views by hbs
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sushobhan Datta'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help',
        name: 'Sushobhan Datta'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please enter the location'
        })
    }
    //console.log(req.query.address)
    //destructured objects has to be initialized with empty arrays to avoid server crash/errors
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {       
        if (error){
            return res.send({
                error
            })
        }
        //console.log('Data', data)
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                //console.log(latitude, longitude)
                return res.send({
                    error
                })
                }
                //console.log(location)
                //console.log(forecastData)
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address                   
                })               
            })
        
        //console.log(latitude, longitude)
    })
})
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Please enter a search value'
        })
    }
    //console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found!',
        name: 'Sushobhan Datta'
    })
})
app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found!',
        name: 'Sushobhan Datta'
    })
})

 app.listen(3000, () => {
     console.log('Listening on port 3000')
 })