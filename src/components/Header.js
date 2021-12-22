import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { Link, useHistory } from 'react-router-dom'

import SearchPage from '../pages/SearchPage'
import { useDataLayerValue } from '../DataLayer'

import SearchIcon from '@material-ui/icons/Search'
import { Avatar } from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Header({ accessToken, chooseTrack }) {
    const history = useHistory()
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
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMe().then((user) => {
            dispatch({
                type: 'SET_USER',
                user: user
            })
        })
    }, [accessToken])
    
    useEffect(() => {
        if (!search) return setTrackSearch([])
        if (!accessToken) return

        spotifyApi.searchTracks(search, { limit: 5 })
        .then(res => {
            setTrackSearch(res.body.tracks.items)
        })

        spotifyApi.searchArtists(search, {limit: 3})
        .then(res => {
            setArtistSearch(res.body.artists.items)
        })

        spotifyApi.searchPlaylists(search, {limit: 7})
        .then(res => {
            setPlaylistSearch(res.body.playlists.items)
        })
        
    }, [search, accessToken])
    
    return (
        <div>
            <div className="header">
                <div className="header__left">
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
                    <div className="nav">
                        <div className="nav__icons">
                            <KeyboardArrowLeftIcon onClick={() => history.goBack()} className="nav__iconOne"/>
                        </div>
                        <div className="nav__icons">
                            <KeyboardArrowRightIcon onClick={() => history.goForward()} className="nav__iconTwo"/>
                        </div>
                    </div>
                </div>
                <div className="header__right">
                    <h1 className="header__name">Hey {user?.body.display_name}</h1>
                    <Link to={`/user/${user?.body.display_name}`}>
                    <Avatar style={{ width: 70, height: 70 }} src={user?.body.images[0]?.url} />
                    </Link>
                </div>
            </div>
            {search ? <SearchPage resetSearch={resetSearch} chooseTrack={chooseTrack} trackSearch={trackSearch} playlistSearch={playlistSearch} artistSearch={artistSearch} /> : null}
        </div>
        )
}

export default Header
