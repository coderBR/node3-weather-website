const request = require('request')

const geocode = (address, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY29kZXJiciIsImEiOiJjazh1Z2c4eDMwMWQ3M2dud3B2cmRyNmV4In0.Byg9LYHkct7f9OkUQiQ-4g'

    request({ url: mapBoxUrl, json: true }, (error, {body}) => {
        if (error) {
            callback( { error: 'Unable to connect to geocoding service!' }, undefined)
        } else if (body.features.length == 0) {
            callback( { error: 'Unable to determine location!'}, undefined)
        }
        else {            
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode