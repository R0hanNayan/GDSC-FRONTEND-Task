const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require("ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("footer");
});

app.listen(3000, function(){
    console.log("Server running on Port 3000");
})

