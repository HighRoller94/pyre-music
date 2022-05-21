import React, { useState, useEffect }from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

import noImage from '../../assets/images/noImage.jpg';

function Playlist({ resetSearch, chooseTrack, track }) {
    const [{ playingTrack, playing}, dispatch] = useDataLayerValue();
    const [image, setImage] = useState();

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

    useEffect(() => {
        if (!track.images[0]?.url) {
            setImage(noImage)
        } else {
            setImage(track.images[0].url)
        }
    }, []);
    
    return (
        <div className="playlist__container">
            <div className="playlist">
                <img className="playlist__image" src={image} alt="Playlist Image" />
                    {(track?.uri != playingTrack || !playing) ?
                        <PlayCircleFilledIcon onClick={handlePlay} track={track} className="play__icon"/>
                    : 
                        <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                    }
                <Link to={`/playlist/${track?.id}`} onClick={resetSearch}>
                    <p className="playlist__name">{track.name}</p>
                    <p className="playlist__owner">By {track?.owner.display_name}</p>
                </Link>
            </div>
        </div>
    )
}

export default Playlist
