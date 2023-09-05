import 'dotenv/config'
import express from "express";
import bodyParser from "body-parser";
import axios from 'axios';

import { dirname } from "path";
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT;


app.get("/", function (req, res) {
    res.render("index");
})


app.post("/", function (req, res) {

    const url = "https://us9.api.mailchimp.com/3.0/lists/" + process.env.MAILCHIMP_LIST

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const options = {
        auth: {
            username: "madmap.uk",
            password: process.env.MAILCHIMP_KEY
        },
    }

    axios.post(url, data, options)
        .then(function (response) {
            if (response.status === 200) {
                res.render("success");
            } else {
                res.render("failure");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
})


app.get("/index.js", function (req, res) {
    res.sendFile(__dirname + "/index.js");
})

app.post("/success", function (req, res) {
    res.redirect("/");
})

app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.get("/map", function (req, res) {
    res.render("map");
})

app.listen(port, function () {
    console.log(`Server running on port ${port}`);
})
