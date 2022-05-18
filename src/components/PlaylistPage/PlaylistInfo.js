import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from '../../DataLayer'
import SpotifyWebApi from 'spotify-web-api-node'
import { Link, useParams } from 'react-router-dom'
import EditPlaylist from './EditPlaylist'
import { toast } from 'react-toastify';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import EditSharpIcon from '@material-ui/icons/EditSharp'

import noImage from '../../assets/images/noImage.jpg'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function PlaylistInfo({ updatePlaylist, info, chooseTrack, accessToken, code}) {
    const [{ playingTrack, playing, user }, dispatch] = useDataLayerValue();
    const track = info?.body
    const { id } = useParams();
    const [contains, setContains] = useState()
    const [open, setOpen] = useState(false)

    const addPlaylistToast = () => {
        return (
            <div className="follow__toast">
                <p>Added to library</p>
            </div>
        )
    };

    const displayFollowMsg = () => {
        toast(
            addPlaylistToast, {
                autoClose: 2000
            }
        );
    }

    const removePlaylistToast = () => {
        return (
            <div className="follow__toast">
                <p>Removed from your library</p>
            </div>
        )
    };

    const displayUnfollowedMsg = () => {
        toast(
            removePlaylistToast, {
                autoClose: 2000,
                toastId: "1"
            }
        )
    }

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [])

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

    function followPlaylist() {
        spotifyApi.followPlaylist(`${id}`)
        .then(res => {
            console.log('Following Playlist')
            setContains(true)
        }, function(err) {
            console.log('Something went wrong!', err);
        });
        displayFollowMsg();
    }

    function unfollowPlaylist() {
        spotifyApi.unfollowPlaylist(`${id}`)
        .then(res => {
            console.log('Unfollowed Playlist')
            setContains(false)
        }, function(err) {
            console.log('Something went wrong!', err);
        });
        displayUnfollowedMsg();
    }

    const scrollTo = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behaviour: 'smooth'
        });
    }

    return (
        <div className="playlistInfo">
            <div className="playlist__info">
                {info?.body.images[0]?.url ? (
                    <img src={info?.body.images[0]?.url} alt="" />
                ) : (
                    <img src={noImage} alt="" />
                )}
                
                <div className="playlist__text">
                    <h2>{info?.body.name}</h2>
                    <Link to={`/user/${info?.body.owner.id}`}>
                    <h1>{info?.body.owner.display_name}</h1>
                    </Link>
                    <div className="playlist__icons">
                        {(info?.body.uri != playingTrack || !playing) ?
                                <PlayCircleFilledIcon onClick={handlePlay} className="play__icon"/>
                            : 
                                <PauseCircleFilledIcon onClick={handlePause} className="play__icon"/>
                        }
                        {info?.body.owner.id == user?.body.id ? (
                            <EditSharpIcon className="edit__icon" onClick={() => setOpen(true)} />   
                        ) : (
                        <div>
                            {contains ? (
                                <FavoriteIcon onClick={unfollowPlaylist} className="fav__icon" />
                            ) : (
                                <FavoriteBorderIcon onClick={followPlaylist} className="fav__icon" />
                            )}
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="playlist__count">
                <p>{info?.body.tracks.total} tracks · </p>
                {info?.body.owner.id == user?.body.id ? ( 
                    <h4 onClick={scrollTo}>Add to this playlist</h4>
                ) : (
                    <div>
                        {info?.body.public ? (
                            <h4>Public Playlist</h4>
                        ) :(
                            null
                        )}
                    </div>
                )}
                
            </div>
            <EditPlaylist code={code} updatePlaylist={updatePlaylist} open={open} info={info} setOpen={setOpen} accessToken={accessToken} />
        </div>
    )
}

export default PlaylistInfo
