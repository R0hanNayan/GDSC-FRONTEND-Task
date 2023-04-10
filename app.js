const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require("ejs");
const appId = "6d39d4da1f8c05662f46ab74ac368eab"
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const topArtist=[];
const topSongs = [];

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("footer", {name: topArtist, song: topSongs});
    topArtist.splice(0,topArtist.length);
    topSongs.splice(0,topSongs.length);
});


app.post("/footer", async function(req, res){
    const songUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${req.body.country}&api_key=${appId}&format=json`
    const Artisturl = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${req.body.country}&api_key=${appId}&format=json`;
    const artits = await fetch(Artisturl);
    const song = await fetch(songUrl);
    const data2 = await song.json();
    const data = await artits.json();
    for(let i=0; i<5; i++){
        topArtist.push(data.topartists.artist[i].name);
        topSongs.push(data2.toptracks.track[i].name)
    }
    console.log(topSongs);
    console.log(topArtist);
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server running on Port 3000");
})

