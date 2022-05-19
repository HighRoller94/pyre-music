import React from 'react'

import pyreLogo from '../assets/images/pyreLogo.png';

import '../styles/styles.scss'

const authEndpoint = "http://accounts.spotify.com/authorize";
const redirectURI = "http://localhost:3000/dashboard";
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
        <div className="login__page">
            <div className="login__container">
                <div className="login__logo">
                    <img src={pyreLogo} alt="Logo" />
                    <h1>Pyre</h1>
                </div>
                <h1>Log in to continue.</h1>
                <a href="https://www.spotify.com/uk/">
                    <h2>Don't have an account?<span>SIGNUP</span></h2>
                </a>
                <div className="divider"></div>
                <a className="login__button" href={loginURL}>Login with Spotify</a>
            </div>
        </div>
    )
}

export default Login
