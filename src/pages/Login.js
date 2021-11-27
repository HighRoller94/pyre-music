import React from 'react'


import '../styles/styles.scss'

const authEndpoint = "http://accounts.spotify.com/authorize";
const redirectURI = "https://pyre-2e47e.web.app/dashboard";
const clientId = "a4461782c5b040b2a456806c4d99258f";

const scopes = [
    "streaming",
    "user-read-recently-played",
    "user-top-read",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "user-library-modify",
    "user-follow-modify",
    "user-follow-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
    "playlist-modify-private",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-read-collaborative",
    "streaming",
]

const loginURL = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}&scope=${scopes.join("%20")}`

function Login() {
    return (
        <div className="login">
            <a className="login__button" href={loginURL}>Login with Spotify</a>
        </div>
    )
}

export default Login
