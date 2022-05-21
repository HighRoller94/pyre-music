import React from 'react'
import { Link } from 'react-router-dom'
import { useDataLayerValue } from '../../DataLayer'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

function ArtistTracks({ index, chooseTrack, track }) {
    const [{ playingTrack, playing }, dispatch] = useDataLayerValue();

    function handlePlay() {
        chooseTrack(track)
    }

    function convertTimestamp(ms) {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
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
        <div className="artist__track" onDoubleClick={handlePlay}>
                <div className="track__infoLeft">
                    <p>{index + 1}</p>
                    <Link to={`/album/${track.album.id}`}>
                        <img className="track__image" src={track.album.images[0]?.url} alt="" />
                    </Link>
                    <h1 className="artist__trackName">{track.name}</h1>
                    <h2 className="artist__name">{track.artists[0].name}</h2>
                </div>
                <div className="track__infoMid">
                    <Link to={`/album/${track.album.id}`}>
                        <p className="track__albumName">{track.album.name}</p>
                    </Link>
                </div>
                <div className="track__infoRight">
                    <h3>{convertTimestamp(track.duration_ms)}</h3>
                    {(track.uri != playingTrack || !playing) ?
                            <PlayCircleFilledIcon onClick={handlePlay} className="play__icon" />
                        : 
                            <PauseCircleFilledIcon onClick={handlePause} className="play__icon" />
                    }
                </div>
            </div>
    )
}

export default ArtistTracks
