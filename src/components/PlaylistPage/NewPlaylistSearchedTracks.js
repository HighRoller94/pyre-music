import React, { useEffect } from 'react'
import { useDataLayerValue } from '../../DataLayer'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function PlaylistSearchTracks({ updatePlaylist, track, chooseTrack, accessToken }) {
    const [{ playingTrack, playing }, dispatch] = useDataLayerValue();
    const { id } = useParams();

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    function handlePlay() {
        chooseTrack(track)
    }

    function handlePause() {
        dispatch({
            type: 'SET_PLAYING_TRACK',
            playingTrack: null,
        })
        dispatch({
            type: 'SET_PLAYING',
            playing: false,
        })
    }

    function addTrackToPlaylist() {
        spotifyApi.addTracksToPlaylist(`${id}`, [`${track.uri}`])
    }

    function convertTimestamp(ms) {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }

    return (
        <div className="searched__row">
            <div className="searched__track">
                <img src={track.album.images[0]?.url} alt="" />
                <div className="track__left">
                    <h1>{track.name}</h1>
                    <h2>{track.artists[0].name}</h2>
                </div>
                <div className="track__right">
                    <h3>{convertTimestamp(track.duration_ms)}</h3>
                    {(track.uri != playingTrack || !playing) ?
                            <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                        : 
                            <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                    }
                    <AddCircleIcon className="add__icon" onClick={() => { addTrackToPlaylist(); updatePlaylist(); }} />
                </div>
            </div>
        </div>
    )
}

export default PlaylistSearchTracks
