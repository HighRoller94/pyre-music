import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from '../../DataLayer'
import SpotifyWebApi from 'spotify-web-api-node'
import { useParams, Link } from 'react-router-dom'

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function AlbumInfo({ info, chooseTrack, accessToken }) {
    const [{ playingTrack, playing }, dispatch] = useDataLayerValue();
    const [contains, setContains] = useState()
    const track = info?.body
    const { id } = useParams();

    console.log(info)
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.containsMySavedAlbums([`${id}`])
        .then(res => {
            setContains(res?.body[0])
        })
    }, [accessToken])

    function addAlbum() {
        spotifyApi.addToMySavedAlbums([`${id}`])
        .then(res => {
            setContains(true)
        })
    }

    function removeAlbum() {
        spotifyApi.removeFromMySavedAlbums([`${id}`])
        .then(res => {
            setContains(false)
        })
    }

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
        <div className="albumInfo">
            <div className="album__info">
                <div>
                    <img src={info?.body.images[0]?.url} alt="" />
                </div>
                <div className="album__text">
                    <h1>{info?.body.name}</h1>
                    <Link style={{ textDecoration: "none" }}to={`/artist/${info?.body.artists[0].id}`}>
                        <h2>{info?.body.artists[0].name}</h2>
                    </Link>
                    <div className="info__icons">
                        {(info?.body.uri != playingTrack || !playing) ?
                                <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                            : 
                                <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                        }
                        {contains ? (
                            <FavoriteIcon className="saved__icon" onClick={removeAlbum} />
                        ) : (
                            <FavoriteBorderIcon className="saved__icon" onClick={addAlbum} />
                        )}
                    </div>
                </div>
            </div>
            <p>{info?.body.total_tracks} tracks · </p>
        </div>
    )
}

export default AlbumInfo
