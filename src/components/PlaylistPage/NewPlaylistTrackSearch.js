import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

import PlaylistSearchTracks from './NewPlaylistSearchedTracks';

import SearchIcon from '@material-ui/icons/Search'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function PlaylistSearch({ updatePlaylist, accessToken , chooseTrack }) {
    const [search, setSearch] = useState("")
    const [trackSearch, setTrackSearch] = useState([])

    useEffect(() => {
        if (!search) return setTrackSearch([])
        if (!accessToken) return

        spotifyApi.setAccessToken(accessToken)
        
        spotifyApi.searchTracks(search, { limit: 5 })
        .then(res => {
            setTrackSearch(res.body.tracks.items)
        })

    }, [search, accessToken])

    return (
        <div className="playlist__search">
            <div className="playlist__searchLeft">
                <div className="search__container">
                    <SearchIcon className="search__icon"/>
                    <input 
                        placeholder="Search artists..." 
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>
            {search ? 
            <div>
                {trackSearch?.map((track) =>
                    <PlaylistSearchTracks updatePlaylist={updatePlaylist} chooseTrack={chooseTrack} accessToken={accessToken} track={track} /> 
                )}
            </div>
            : null}
        </div>
    )
}

export default PlaylistSearch
