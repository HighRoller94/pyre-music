import React from 'react'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../../DataLayer'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

import PlayingAnim from '../PlayingAnim';

function TopTracks({ index, track, chooseTrack }) {
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

    function convertTimestamp(ms) {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }

    return (
        <div className="top__track">
            <div className="playlist__track" onDoubleClick={handlePlay}>
                <div className="track__infoLeft">
                    {(track.uri != playingTrack || !playing) ? 
                        <p>{index + 1}</p>
                        :
                        <PlayingAnim />
                    }
                    <Link to={`/album/${track?.album.id}`}>
                        <img className="track__image" src={track?.album.images[0]?.url} alt="" />
                    </Link>
                    <h1>{track.name}</h1>
                </div>
                <div className="track__infoMid">
                    <Link to={`/artist/${track.artists[0].id}`} styles={{ background: 'none'}}>
                        <h2 className="artist__name">{track?.artists[0].name}</h2>
                    </Link>
                </div>
                <div className="track__infoRight">
                    <h3>{convertTimestamp(track?.duration_ms)}</h3>
                    {(track.uri != playingTrack || !playing) ?
                            <PlayCircleFilledIcon onClick={handlePlay} className="play__icon" />
                        : 
                            <PauseCircleFilledIcon onClick={handlePause} className="play__icon" />
                    }
                </div>
            </div>
        </div>
    )
}

export default TopTracks
