import React from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';


function Album({ track, chooseTrack }) {
    const [{ playingTrack, playing}, dispatch] = useDataLayerValue()

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
        <div className="album__container">
            <img className="album__image" src={track.images[0].url} alt="Album Image" />
                {(track?.uri != playingTrack || !playing) ?
                    <PlayCircleFilledIcon onClick={handlePlay} track={track} className="play__icon"/>
                    : 
                    <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                }
            <Link to={`/album/${track?.id}`}>
                <p className="album__name">{track.name}</p>
                <div className="album__tracks">
                    <AudiotrackIcon />
                    <p className="track__count">{track.total_tracks} tracks</p>
                </div>
            </Link>
        </div>
    )
}

export default Album
