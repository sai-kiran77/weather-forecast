const express = require("express")
const app = express()

const weather = require("./utils/geocode")

const path = require("path")
const hbs = require("hbs")

const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, "../")))

app.get("/", (req, res) => {
    res.render("index", {
        title: "Home page"
    })
})

app.get("/weather", (req, res) => {
    if (req.query.search) {
        weather.geocode(req.query.search, (err, { latitude, longitude, location }) => {
            if (err) {
                res.send(err)
            }
            else {
                weather.forecast(latitude, longitude, (err, weather_Report) => {
                    if (err) {
                        res.send(err)
                    }
                    else {
                        res.send(
                            {
                                weather_Report: weather_Report,
                                address:location
                            })
                    }
                })
            }
        })
    }
    else {
        res.send({ error: "provide valid search" })
    }
})
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page"
    })
})
app.get("*", (req, res) => {
    res.render("404", {
        title: 404
    })
})

app.listen(3000, () => {
    console.log("server connected")
})