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

    return (
        <div className="search__result">
            <img src={track.album.images[0].url} />
            <Link to={`/artist/${track?.artists[0].id}`} onClick={resetSearch}>
            <h3>{track.name}</h3>
            </Link>
            {(track.uri != playingTrack || !playing) ?
                    <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                : 
                    <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                }
        </div>
    )
}

export default SearchResult
