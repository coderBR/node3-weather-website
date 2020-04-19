const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const weatherStackUrl = 'http://api.weatherstack.com/current?access_key=4aa7ddfd8507e729646caf3189348ca1&query=' 
                            + latitude + ',' + longitude

    request({ url: weatherStackUrl, json: true}, (error, {body}) => {
        if (error) {
            callback( { error: 'Unable to connect to weather service!' }, undefined)
        } else if (body.error) {
            callback( { error: 'Unable to find location!' }, undefined)
        } else {        
            callback(undefined, {
                weather_description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
            })   
        }
    })

}

module.exports = forecast