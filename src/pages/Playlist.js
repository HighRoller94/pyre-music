import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from '../DataLayer'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'

import PlaylistInfo from '../components/PlaylistPage/PlaylistInfo'
import PlaylistTracks from '../components/PlaylistPage/PlaylistTracks'
import PlaylistSearch from '../components/PlaylistPage/NewPlaylistTrackSearch'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Playlist({ updatePlaylist, accessToken, chooseTrack, code}) {
    const [{ playingTrack, playing, user}, dispatch] = useDataLayerValue()
    const { id } = useParams();
    const [playlistInfo, setPlaylistInfo] = useState()
    const [playlistTracks, setPlaylistTracks] = useState()
    const [count, setCount] = useState()
    const [showSearch, setShowSearch] = useState()
    
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)

        spotifyApi.getPlaylist(`${id}`)
        .then(res => {
            setPlaylistInfo(res)
            setPlaylistTracks(res.body.tracks.items)
            setCount(0)
        })
    }, [id, count]);

    function updatePlaylist() {
        setCount(count +1)
    }

    return (
        <div className="playlist__page">
            <div className="playlist__info">
                <PlaylistInfo code={code} updatePlaylist={updatePlaylist} info={playlistInfo} chooseTrack={chooseTrack} accessToken={accessToken} />
            </div>
            <div layout className="playlist__tracks">
                {playlistTracks?.map((track) => 
                    <PlaylistTracks updatePlaylist={updatePlaylist} track={track} info={playlistInfo} chooseTrack={chooseTrack} accessToken={accessToken} />
                )}
            </div>
            {playlistInfo?.body.owner.display_name == user?.body.id ? (
                <div>
                    <PlaylistSearch updatePlaylist={updatePlaylist} chooseTrack={chooseTrack} accessToken={accessToken} />   
                </div> 
            ) : (
                null
            )}
        </div>
    )
}

export default Playlist
