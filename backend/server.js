require('dotenv').config({path: '.env'});
const express = require('express');
const axios = require('axios');
const qs = require('qs');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

app.post("/login", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    var data = qs.stringify({
        'grant_type': 'password',
        'username': username,
        'password': password
    });

    axios({
        method: "POST",
        url: process.env.API_URL,
        headers: {
            'Authorization': "Basic " + process.env.API_BASIC_TOKEN,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    }).then((response) => {
        res.status(200).send(JSON.stringify(response.data));
    })
    .catch((error) => {
        if(error.response.status === 500) {
            res.status(500).send({"message": "Please contact the dev team."})
        }
        res.send({"error": 404, "message": error.response.statusText + " - " + (error.response.data.error_description ? error.response.data.error_description : ".")})
    })
})

console.log("API running on 3333")
app.listen(3333)