import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from '../../DataLayer'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'
import { toast } from 'react-toastify';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'

import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function ArtistInfo({ info, chooseTrack, accessToken }) {
    const [{ playingTrack, playing, user }, dispatch] = useDataLayerValue();
    const track = info?.body
    const { id } = useParams();
    const [contains, setContains] = useState()

    const ArtistFollowToast = () => {
        return (
            <div className="follow__toast">
                <p>Now following {info?.body.name}</p>
            </div>
        )
    };

    const displayFollowMsg = () => {
        toast(
            ArtistFollowToast, {
                autoClose: 2000
            }
        );
    }

    const ArtistUnfollowedToast = () => {
        return (
            <div className="follow__toast">
                <p>No longer following {info?.body.name}</p>
            </div>
        )
    };

    const displayUnfollowedMsg = () => {
        toast(
            ArtistUnfollowedToast, {
                autoClose: 2000,
                toastId: "1"
            }
        )
    }
    
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)

        let artistsId = [id]
        spotifyApi.isFollowingArtists(artistsId)
        .then(res => {
            setContains(res?.body[0])
        })
    }, [])

    function followArtist() {
        spotifyApi.followArtists([`${id}`])
        .then(res => {
            setContains(true);
            console.log('following')
        })
        displayFollowMsg();
    }

    function unfollowArtist() {
        spotifyApi.unfollowArtists([`${id}`])
        .then(res => {
            setContains(false)
        })
        displayUnfollowedMsg();
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
        <div className="artist">
            <div className="artist__info">
                <div>
                    <img src={info?.body.images[0]?.url} alt="" />
                </div>
                <div className="info">
                    <h1>{info?.body.name}</h1>
                    <p>{info?.body.followers.total} followers</p>
                </div>
            </div>
            <div className="artist__icons">
                {(track?.uri != playingTrack || !playing) ?
                        <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                    : 
                        <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                }
                {contains ? (
                    <FavoriteIcon className="fav__icon" onClick={unfollowArtist} />
                ) : (
                    <FavoriteBorderIcon className="fav__icon" onClick={followArtist} />
                )}
            </div>
        </div>
    )
}

export default ArtistInfo
