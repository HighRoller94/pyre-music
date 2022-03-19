import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import useAuth from './useAuth'
import { useDataLayerValue } from './DataLayer'
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import './styles/styles.scss'

import Login from './pages/Login'
import Library from './pages/Library'
import Artist from './pages/Artist'
import Dashboard from './pages/Dashboard'
import Favourites from './pages/Favourites'
import Album from './pages/Album'
import Playlist from './pages/Playlist'
import Following from './pages/Following'
import User from './pages/User'

import Header from './components/Header'   
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import Options from './components/Options'

import pyreLogo from './assets/images/pyreLogo.png'

const code = new URLSearchParams(window.location.search).get('code')

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function App() {
    const [{ user }, dispatch] = useDataLayerValue();
    const accessToken = useAuth(code)
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
    const [show, handleShow] = useState(false);

    const scrollNav = () => {
        if (window.scrollY > 400) {
            handleShow(true);
            console.log('show')
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
            {code &&
            <AnimatePresence exitBeforeEnter>
            <Switch>
                <Route path="/dashboard">
                    <Sidebar />
                    <Header chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Dashboard chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Options accessToken={accessToken} />
                    <Footer accessToken={accessToken}/>
                </Route>
                <Route path="/library">
                    <Sidebar />
                    <Header chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Library chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Options />
                    <Footer accessToken={accessToken}/>
                </Route>
                <Route path="/artist/:id">
                    <Sidebar />
                    <Header chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Artist chooseTrack={chooseTrack} accessToken={accessToken}/>
                    <Options />
                    <Footer accessToken={accessToken}/>
                </Route>
                <Route path="/album/:id">
                    <Sidebar />
                    <Header chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Album chooseTrack={chooseTrack} accessToken={accessToken}/>
                    <Options />
                    <Footer accessToken={accessToken}/>
                </Route>
                <Route path="/playlist/:id">
                    <Sidebar />
                    <Header chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Playlist chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Options />
                    <Footer accessToken={accessToken}/>
                </Route>
                <Route path="/favourites">
                    <Sidebar />
                    <Header chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Favourites chooseTrack={chooseTrack} accessToken={accessToken}/>
                    <Options />
                    <Footer accessToken={accessToken}/>
                </Route>
                <Route path="/follow">
                    <Sidebar />
                    <Header chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Following chooseTrack={chooseTrack} accessToken={accessToken}/>
                    <Options />
                    <Footer accessToken={accessToken}/>
                </Route>
                <Route path="/user/:id">
                    <Sidebar />
                    <Header chooseTrack={chooseTrack} accessToken={accessToken} />
                    <User chooseTrack={chooseTrack} accessToken={accessToken} />
                    <Options />
                    <Footer accessToken={accessToken}/>
                </Route>
            </Switch>
            </AnimatePresence>
            }
        </Router>
        {code && 
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
            <img className="logo" src={pyreLogo} alt="" /> 
            {show ? (
                <motion.div 
                onClick={scrollToTop}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 1}}
                className="scroll__icon">
                    <KeyboardArrowUpIcon className="scroll__top"/>
                </motion.div>
            ) : (
                null
            )}
        </motion.div>
        }
        {!code && <Login /> } 
        </div>
    );
}

export default App;
