import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { Link, useNavigate } from 'react-router-dom'
import { WaveformVisualizer, WaveformVisualizerTheme } from 'react-audio-visualizers';

import SearchPage from '../../../../pages/SearchPage';
import { useDataLayerValue } from '../../../../DataLayer'

import SearchIcon from '@material-ui/icons/Search'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Header({ accessToken, chooseTrack }) {
    const navigate = useNavigate()
    const [{ user }, dispatch] = useDataLayerValue()
    const [search, setSearch] = useState("")
    const [trackSearch, setTrackSearch] = useState([])
    const [artistSearch, setArtistSearch] = useState([])
    const [playlistSearch, setPlaylistSearch] = useState([])
    const [openSearch, setOpenSearch] = useState(false);

    function resetSearch() {
        setSearch('')
    }
    
    useEffect(() => {
        if (!search) return setTrackSearch([])
        if (!accessToken) return

        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)

        spotifyApi.searchTracks(search, { limit: 5 })
        .then(res => {
            setTrackSearch(res.body.tracks.items)
        })

        spotifyApi.searchArtists(search, {limit: 3})
        .then(res => {
            setArtistSearch(res.body.artists.items)
        })

        spotifyApi.searchPlaylists(search, {limit: 6})
        .then(res => {
            setPlaylistSearch(res.body.playlists.items)
        })
        
    }, [search, accessToken])
    
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__main">
                    <div className="header__left">
                        <div className="header__top">
                            <h1>Hey {user?.body.display_name}, what shall we listen to today?</h1>
                            <div className="search__input">
                                <SearchIcon className="search__icon" onClick={setOpenSearch}/>
                                <input 
                                    placeholder="Search artists..." 
                                    spellCheck="false"
                                    type="text" 
                                    value={search} 
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="nav">
                            <div className="nav__icons">
                                <KeyboardArrowLeftIcon onClick={() => navigate(-1)} className="nav__iconOne"/>
                            </div>
                            <div className="nav__icons">
                                <KeyboardArrowRightIcon onClick={() => navigate(+1)} className="nav__iconTwo"/>
                            </div>
                        </div>
                    </div>
                    {/* <div className="header__right">
                    <WaveformVisualizer
                        audio="https://open.spotify.com/track/3BEGSRPgeIOUKdMXzJL84R"
                        theme={WaveformVisualizerTheme.line}
                        colors={['#009688', '#26a69a']}
                        iconsColor="#26a69a"
                        backgroundColor="white"
                        showMainActionIcon
                        showLoaderIcon
                        highFrequency={8000}
                    />
                    </div>
                    */}
                </div>
                
            </div>
            <div className="search">
                {search ? 
                <SearchPage 
                    resetSearch={resetSearch} 
                    chooseTrack={chooseTrack} 
                    trackSearch={trackSearch} 
                    playlistSearch={playlistSearch} 
                    artistSearch={artistSearch} 
                /> : null}
            </div>
        </div>
    )
}

export default Header
