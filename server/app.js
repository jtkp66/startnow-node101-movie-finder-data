const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
var cache = {};
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    var movieId = req.query.i;
    var movieTitle = req.query.t;
    if (movieId) {
        if (cache[movieId]) { res.send(cache[movieId]) }

        else {
            axios.get("http://omdbapi.com/?i=" + encodeURI(movieId) + "&apikey=8730e0e")
            .then(function(response) {
                cache[movieId] = response.data;
                res.json(response.data);
            })
            .catch(function(response) {
                res.status(500).send(response)
            })
            
        }
    }
    else if (movieTitle) {
        if (cache[movieTitle]) { res.send(cache[movieTitle]) }

        else {
            axios.get("http://omdbapi.com/?t=" + encodeURI(movieTitle) + "&apikey=8730e0e")
            .then(function(response) {
                cache[movieTitle] = response.data;
                res.json(response.data);
            })
            .catch(function(response) {
                res.status(500).send(response)
            })
        }
    } else {
        res.status(400).send("you are missing params")
    }
    // res.send('ok');
})

//res.send(200)









// const database = {
//     url: '', data: ''
// }
//     app.use("morgan"("dev"));

//     app.get("/", function (req, res) {
//         if (req.url === database.url) {
//             res.send(database.data)
//         } else {
//         axios
//         .get("http://omdbapi.com/?i=" + req.url + "&apikey=8730e0e")
//         .get("http://omdbapi.com/?t=" + req.url + "&apikey=8730e0e")
//         .then(function (response) {
//                 database.url = req.url;
//                 database.data = response.data;
//                 res.json(response.data)
//                 })
//                 .catch(function (error) {
//                 console.log(error.message);
//                 })
//     }
// })
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
module.exports = app;