require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.static(__dirname + "/public"));

const port = process.env.port || 3000;

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.listen(port, function(){
    console.log("Server running on port 3000");
})