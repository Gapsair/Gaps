const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmV1d2VsczA5IiwiYSI6ImNraWc0emt2aDBxZ3Eyem54YzV6emlzaTYifQ.YdVvx8uX3h8QQK8CpG34uA'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to location services!', undefined)
        }else if(body.features.length === 0){
            callback('unable to fine location. Try another search!', undefined)
        }else{
            callback( undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode