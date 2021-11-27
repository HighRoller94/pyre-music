import React from 'react'
import { Link } from 'react-router-dom'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import '../styles/styles.scss'

function ArtistAlbums({ chooseTrack, track }) {
    
    function handlePlay() {
        chooseTrack(track)
    }

    return (
        <div className="album">
            <div className="artist__album" style={{ width: 150, height: 150, backgroundImage: `url(${track?.images[0].url})`, backgroundSize: 'contain'}}>
                <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
            </div>
            <Link to={`/album/${track?.id}`}>
                <p>{track.name}</p>
            </Link>
        </div>
    )
}

export default ArtistAlbums
