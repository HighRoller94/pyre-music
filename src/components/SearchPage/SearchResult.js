import React, { useState } from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

function SearchResult({ track, chooseTrack, resetSearch }) {
    const [{ playingTrack, playing }, dispatch] = useDataLayerValue();
    const [search, setSearch] = useState("")

    function handlePlay() {
        chooseTrack(track)
    };

    function handlePause() {
        dispatch({
            type: 'SET_PLAYING_TRACK',
            playingTrack: null,
        })
        dispatch({
            type: 'SET_PLAYING',
            playing: false,
        })
    };

    function convertTimestamp(ms) {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }
    
    return (
        <div className="search__result">
            <div className="track__infoLeft">
                <Link to={`/album/${track.album.id}`}>
                    <img className="track__image" src={track.album.images[0]?.url} alt="" />
                </Link>
                <h1 className="artist__trackName">{track.name}</h1>
                <h2 className="artist__name">{track.artists[0].name}</h2>
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

export default SearchResult
