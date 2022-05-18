import React, { useState } from 'react'
import { useDataLayerValue } from '../../DataLayer'
import { Link } from 'react-router-dom'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

function RecentlyPlayedArtists({ track }) {
    const [{ playing, playingTrack }, dispatch] = useDataLayerValue();
    const [setPlayingArtist] = useState()

    function chooseTrack(track) {
        if (track) {
            setPlayingArtist(track)
            dispatch({
                type: "SET_PLAYING",
                playing: true
            })
            dispatch({ 
                type: "SET_PLAYING_TRACK",
                playingTrack: track.uri
            })
        } else {
            dispatch({ 
                type: "SET_PLAYING_ARTIST",
                playing: null
            })
        }
    }

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
        <div className="artist__container">
                <div className="artist">
                    <img className="artist__image" src={track?.images[0]?.url} alt="Artist" />
                        {(track.uri !== playingTrack || !playing) ?
                            <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                        : 
                            <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                        }
                    <Link to={`/artist/${track?.id}`}>
                        <div className="artist__dets">
                            <p className="artist__name">{track?.name}</p>
                            <p className="artist__type">{track?.type}</p>
                        </div>
                    </Link>
                </div>
        </div>
    )
}

export default RecentlyPlayedArtists
