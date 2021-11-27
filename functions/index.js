const functions = require("firebase-functions");

require('dotenv').config()

const express = require('express');
const cors = require('cors')
const lyricsFinder = require('lyrics-finder')
const SpotifyWebApi = require('spotify-web-api-node')

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken

    const spotifyApi = new SpotifyWebApi({
    redirectUri: "https://pyre-2e47e.web.app/dashboard",
    clientId: "a4461782c5b040b2a456806c4d99258f",
    clientSecret: "aa8b6faf91d0499a84091561056bec2b",
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
        redirectUri: "https://pyre-2e47e.web.app/dashboard",
        clientId: "a4461782c5b040b2a456806c4d99258f",
        clientSecret: "aa8b6faf91d0499a84091561056bec2b",
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