const request =  require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxpbjE1OTIiLCJhIjoiY2sya2Z1Y2xhMDA1NDNsazBvZTM2dWNwbSJ9.gHX8jnxhYZCXswirg82Q9g&limit=1'

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to service', undefined)
        } else if (body.features.length === 0) {
            callback('Location not found', undefined);

        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;