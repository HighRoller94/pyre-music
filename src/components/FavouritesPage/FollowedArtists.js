import React from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

function FollowedArtists({ artist, chooseTrack }) {
    const [{ user, playing, playingTrack }, dispatch] = useDataLayerValue();
    const track = artist;

    function handlePlay() {
        chooseTrack(track);
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
    };
    
    return (
        <div>
            <div className="followed__container">
                <div className="followed__artist" style={{ width: 165, height: 165, backgroundImage: `url(${artist?.images[0].url})`, backgroundSize: 'cover', borderRadius: '50%'}}>
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
