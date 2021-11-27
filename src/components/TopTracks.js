import React from 'react'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../DataLayer'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

import '../styles/styles.scss'


function TopTracks({ track, chooseTrack }) {
    const [{ user, playing, playingTrack }, dispatch] = useDataLayerValue();
    
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
        <div className="track" onDoubleClick={handlePlay} >
            <img src={track.album.images[0].url} alt="" />
            <div className="track__info">
                <p>{track.name}</p>
            </div>
            {(track.uri != playingTrack || !playing) ?
                    <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                : 
                    <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
            }
        </div>
    )
}

export default TopTracks
