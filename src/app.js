const path = require('path')
const hbs = require ('hbs')
//
const geoCode = require ('./geocode.js')
const forecast = require ('./forecast.js')
const chalk = require ('chalk')
//


const express = require('express')
const app = express ()
const port = process.env.PORT || 3000
//defining the path
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set ('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res) => {
    res.render ('index', {
        title: 'Weather App',
        name: 'Dusan Djokovic'

    })
})
app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Dusan Djokovic'

    })

})
app.get('/help', (req,res)=>{
    res.render('help',{
        message: 'I am here to seek help',
        title: 'Help',
        name: 'Dusan Djokovic'

    })

})


app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
           error: 'You must provide address'
       })

   }
   geoCode(req.query.address, (error, {latitude,longitude,location} = {}) =>{
       if(error){
           return res.send({
               error
           })
       }
       forecast(longitude, latitude, (error, forecastData)=>{
           if(error){
               return res.send({error})
           }
           res.send ({
               forecast: forecastData,
               location,
               address: req.query.address
           })

       })

   })

})
app.get('/products',(req,res)=>{
    // if search is not provided 
    if(!req.query.search){
         return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render ('error', {
        title: '404 help',
        name: 'Dusan Djokovic',
        errorMessage: 'Help article not found'
    })

})
app.get ('*', (req,res) => {
       res.render('error', {
           title: '404' ,
           name: 'Dusan Djokovic',
           errorMessage: 'Page not found'
       })

})
app.listen(port, () => {
    console.log('The server started on port ' +port)

})