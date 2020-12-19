const request = require('request')

const forcast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=827354e58518d990f030a1b07b4edc2d&query=' + latitude  + ','  + longitude  + '&units=f'

       request({ url, json: true}, (error, {body}) => {
           if (error) {
               callback('unable to connect to weather services!', undefined)
           }else if (body.error) {
               callback('unable to find location', undefined)
           } else {
               callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + ' degree out. Its feels like '+ body.current.feelslike + "degree out.")
           }
       })
}

module.exports = forcast