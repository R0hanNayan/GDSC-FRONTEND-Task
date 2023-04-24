const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require("ejs");
const appId = "6d39d4da1f8c05662f46ab74ac368eab";
const appId2 = "1b824dfc1395760e3c534359f4cb76da";
const fetch = require("node-fetch");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const topArtist=[];
const topSongs = [];
const flag = [];

app.set('view engine', 'ejs');

app.get("/", async function(req, res){
    res.render("footer", {name: topArtist, song: topSongs, code:flag[0]});
    topArtist.splice(0,topArtist.length);
    topSongs.splice(0,topSongs.length);
    flag.splice(0,flag.length);
});


app.post("/footer", async function(req, res){
    //last.fm API
    const songUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${req.body.country}&api_key=${appId}&format=json`;
    const Artisturl = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${req.body.country}&api_key=${appId}&format=json`;
    const artits = await fetch(Artisturl);
    const song = await fetch(songUrl);
    const data2 = await song.json();
    const data = await artits.json();

    try{
        for(let i=0; i<5; i++){
            topArtist.push(data.topartists.artist[i].name);
            topSongs.push(data2.toptracks.track[i].name)
        }
        console.log(topSongs);
        console.log(topArtist);

        //Flag Image API
        const codeUrl = `https://restcountries.com/v3.1/name/${req.body.country}?fullText=true`;
        const code = await fetch(codeUrl);
        const data3 = await code.json();
        const countryCode = data3[0].cca2;
        flag.push(countryCode);
        
        res.redirect("/");
    }
    catch(err){
        console.log("Country name Error");
        res.redirect("/");
    }
});

app.listen(3000, function(){
    console.log("Server running on Port 3000");
})

