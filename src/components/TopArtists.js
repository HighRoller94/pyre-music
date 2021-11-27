import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from '../DataLayer'

import { Link } from 'react-router-dom'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

import '../styles/styles.scss'

function TopArtists({ artist, chooseTrack }) {
    const [{ playingTrack, playing}, dispatch] = useDataLayerValue()
    const track = artist

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
        <div className="artist__container">
            <div className="top__artist" style={{ width: 150, height: 150, backgroundImage: `url(${artist.images[0].url})`, backgroundSize: 'cover'}}>
                {(artist?.uri != playingTrack || !playing) ?
                        <PlayCircleFilledIcon onClick={handlePlay} track={track} className="play__icon"/>
                : 
                        <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                }
            </div>
            <Link to={`/artist/${artist?.id}`}>
                <p>{artist.name}</p>
            </Link>
        </div>
    )
}

export default TopArtists
