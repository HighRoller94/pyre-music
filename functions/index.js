const functions = require("firebase-functions");

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const lyricsFinder = require('lyrics-finder')
const SpotifyWebApi = require('spotify-web-api-node');

const APP_KEY = functions.config().pyre.key;
const APP_ID = functions.config().pyre.id;
const APP_REDIRECT = functions.config().pyre.redirect;

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken

    const spotifyApi = new SpotifyWebApi({
    redirectUri: APP_REDIRECT,
    clientId: APP_ID,
    clientSecret: APP_KEY,
    refreshToken,
    })
    spotifyApi.refreshAccessToken().then(data => {
        res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
        }) 
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
    const code = req.body.code

    const spotifyApi = new SpotifyWebApi({
        redirectUri: APP_REDIRECT,
        clientId: APP_ID,
        clientSecret: APP_KEY,
    })
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.get('/lyrics', async (req, res) => {
    const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
    res.json({ lyrics })
})

app.listen(3001)

exports.app = functions.https.onRequest(app);