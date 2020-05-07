const request = require('request')
const chalk = require('chalk')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=1628ba72e350e10512ef3bf322fd47c5&units=metric'

    request( {url, json: true}, (error, {body}) => {
        if (error) {
            callback(chalk.inverse.red('Unable to connect to weather sevice!'), undefined)
        } else if (body.message) {
            callback(chalk.inverse.yellow('Unable to find location. Try another search.'), undefined)
        } else {
            const temp = body.main.temp
            const airPressure = body.main.pressure
            const desc = body.weather[0].description

            callback(undefined, `Weather description in Serbian: ${desc}.\nIt is currently ${temp} degrees out. Air pressure is ${airPressure} mbar.`)
        }
    })
}

module.exports = forecast