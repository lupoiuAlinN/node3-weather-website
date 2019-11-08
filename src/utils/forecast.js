const request = require('request');


const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/d0f6a1e36973a388ab50e219b8ac15c9/' + long + ',' + lat + '?units=si&lang=ro'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to waether service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                    summary: body.daily.data[0].summary,
                   temperatureMax: body.daily.data[0].temperatureMax,
                    temperatureMin: body.daily.data[0].temperatureMin,
                    temperature: body.currently.temperature,
                    precipitation: body.currently.precipProbability
                }
            )
        }

    })
}

module.exports = forecast