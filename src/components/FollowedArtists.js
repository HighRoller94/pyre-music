import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { useDataLayerValue } from '../DataLayer'
import { Link } from 'react-router-dom'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function FollowedArtists({ artist, chooseTrack }) {
    const [{ user, playing, playingTrack }, dispatch] = useDataLayerValue();
    const track = artist

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
    return (
        <div>
            <div className="followed__container">
                <div className="followed__artist" style={{ width: 150, height: 150, backgroundImage: `url(${artist?.images[0].url})`, backgroundSize: 'cover', borderRadius: '50%'}}>
                {(artist?.uri != playingTrack || !playing) ?
                    <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                : 
                    <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                }
                </div>
                <Link to={`/artist/${artist?.id}`}>
                <p>{artist?.name}</p>
                </Link>
        </div>
        </div>
    )
}

export default FollowedArtists
