const http = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/v4/geocode/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWFuY2hpa2FudGlzYWlraXJhbiIsImEiOiJjazd5dDdicWswMDlyM3NyMGhtYjUydmpxIn0.O6isDnNozzmv81Nj46Yhnw&limit=1&"
    http({ url, json: true }, (err, result) => {//use of object short hand 
        if (err) {
            callback({error:"unable to connect to web services"}, {undefined})
        } else if (result.body.features.length === 0) {
            callback({error:"unable to find loaction,try another search"},{undefined})
        }
        else {
            callback(undefined, {
                latitude: result.body.features[0].center[1],
                longitude: result.body.features[0].center[0],
                location: result.body.features[0].place_name
            })
        }
    })
}

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/bdc48d7842c8c438c7f0dff7a2f0169f/" + latitude + "," + longitude + "?&lang=es"
    http({ url: url, json: true }, (error, Response) => {
        if (error) {
            callback("unable to connect to weather services")
        } else if (Response.body.code) {
            callback("try again with another search")
        }
        else {
            callback(undefined, "it is currently " + Response.body.currently.temperature + "degrees out. there is a " + Response.body.currently.precipProbability + "% chance of rain")
        }
    })
}

module.exports = { geocode, forecast }