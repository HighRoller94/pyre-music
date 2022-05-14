import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAuth from './components/Hooks/useAuth'
import { useDataLayerValue } from './DataLayer'
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios'
import ScrollToTop from './ScrollToTop'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// PAGES

import Login from './pages/Login'
import Library from './pages/Library'
import Artist from './pages/Artist'
import Dashboard from './pages/Dashboard'
import Favourites from './pages/Favourites'
import Album from './pages/Album'
import Playlist from './pages/Playlist'
import User from './pages/User'

// LAYOUT

import Layout from './components/Base/Layout/Layout';

// STYLES (+ imports)

import './styles/styles.scss'
import pyreLogo from './assets/images/pyreLogo.png'

const code = new URLSearchParams(window.location.search).get('code')

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function App() {
    const [{ user, token }, dispatch] = useDataLayerValue();
    const accessToken = useAuth(code)
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
    const [show, handleShow] = useState(false);

    const scrollNav = () => {
        if (window.scrollY > 400) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollNav);
        return () => window.removeEventListener("scroll", scrollNav);
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behaviour: 'smooth'
        });
    }

    useEffect(() => {
        if (!code) return
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        dispatch({
            type: "SET_CODE",
            code: code
        })
    }, [accessToken])

    function chooseTrack(track) {
        if (track) {
            setPlayingTrack(track)
            dispatch({ 
                type: "SET_LYRICS",
                lyrics: lyrics
            })
            dispatch({
                type: "SET_PLAYING",
                playing: true
            })
            dispatch({ 
                type: "SET_PLAYING_TRACK",
                playingTrack: track.uri,
            })
            spotifyApi.play({
                uris: [track.uri]
            })
        } else {
            dispatch({ 
                type: "SET_PLAYING_TRACK",
                playing: null
            })
        }
    }

    useEffect(() => {
        if (!playingTrack) return
        axios.get('https://us-central1-pyre-2e47e.cloudfunctions.net/app/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    return (
        <div className="app">
        <Router >
            <ScrollToTop />
            {code &&
                <Routes>
                    <Route element={<Layout accessToken={accessToken} chooseTrack={chooseTrack} />}>
                        <Route path="dashboard" element={<Dashboard chooseTrack={chooseTrack} accessToken={accessToken} />} />
                        <Route path="library" element={<Library chooseTrack={chooseTrack} accessToken={accessToken} />} />
                        <Route path="artist/:id" element={<Artist chooseTrack={chooseTrack} accessToken={accessToken} />} />
                        <Route path="album/:id" element={<Album chooseTrack={chooseTrack} accessToken={accessToken} />} />
                        <Route path="playlist/:id" element={<Playlist chooseTrack={chooseTrack} accessToken={accessToken} />} />
                        <Route path="favourites" element={<Favourites chooseTrack={chooseTrack} accessToken={accessToken} />} />
                        <Route path="user/:id" element={<User chooseTrack={chooseTrack} accessToken={accessToken} />} />
                    </Route>
                </Routes>
            }
        </Router>
        {code && 
        <div>
            <img className="logo" src={pyreLogo} alt="" /> 
            {show ? (
                <div 
                onClick={scrollToTop}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 1}}
                className="scroll__icon">
                    <KeyboardArrowUpIcon className="scroll__top"/>
                </div>
            ) : (
                null
            )}
        </div>
        }
        {!code && <Login /> } 
        </div>
    );
}

export default App;
