import React from 'react'
import { useDataLayerValue } from '../DataLayer'
import { Link } from 'react-router-dom'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

import '../styles/styles.scss'

function RecentlyPlayedSong({ track, chooseTrack }) {
    const [{ playingTrack, playing }, dispatch] = useDataLayerValue();
    
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
            <div className="recent__song">
                <img src={track.album.images[0].url} alt="" />
                <Link to={`/album/${track?.album.id}`}>
                    <p>{track.name}</p>
                </Link>
                {(track.uri != playingTrack || !playing) ?
                    <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                : 
                    <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                }
            </div>
        </div>
    )
}

export default RecentlyPlayedSong
