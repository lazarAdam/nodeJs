const request = require('request')


const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}
    .json?access_token=pk.eyJ1IjoiYWRhbTQwMCIsImEiOiJja3FhNDhhMHUwajQzMnVsY3RwY25ndjkxIn0.isnxtyZ5zoz_XXH8niw8rQ&limit=1`

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location. Try again', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                longi: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

const forecast = (lat, long, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=3b838f7eb309d1d37b195c1c0f2738d8&query=${lat},${long}&units=f`;


    request({url: url, json: true},
        (error, response) => {

            if (error) {

                callback('unable to connect to the weather service.', undefined)

            } else if (response.body.error) {

                callback('unable to find weather data for the specified location', undefined)

            } else {


                callback(undefined,
                    `${response.body.current.weather_descriptions[0]} .its currently ${response.body.current.temperature} degrees F
        \nwith a ${response.body.current.precip}% chance of rain`)
            }

        })


}


module.exports = {
    geocode: geocode,
    forecast:forecast
}

///d