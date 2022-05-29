import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import { useDataLayerValue } from '../../DataLayer';
import { toast } from 'react-toastify';

import noImage from '../../assets/images/noImage.jpg';

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function UserInfo({ total, info, accessToken }) {
    const [{ playingTrack, user, playing }, dispatch] = useDataLayerValue();
    const { id } = useParams();
    const fileInputRef = useRef();
    const [contains, setContains] = useState();
    
    console.log(info)
    const followUserToast = () => {
        return (
            <div className="follow__toast">
                <p>Now following {info?.display_name}</p>
            </div>
        )
    };

    const displayFollowMsg = () => {
        toast(
            followUserToast, {
                autoClose: 2000
            }
        );
    }

    const unfollowUserToast = () => {
        return (
            <div className="follow__toast">
                <p>No longer following {info?.display_name}</p>
            </div>
        )
    };

    const displayUnfollowedMsg = () => {
        toast(
            unfollowUserToast, {
                autoClose: 2000,
                toastId: "1"
            }
        )
    }

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);

        let userId = [id]
        spotifyApi.isFollowingUsers(userId)
        .then(res => {
            setContains(res?.body[0])
        });
    }, [])

    function followUser() {
        spotifyApi.followUsers([`${id}`])
        .then(res => {
            setContains(true)
        })
        displayFollowMsg();
    };

    function unfollowUser() {
        spotifyApi.unfollowUsers([`${id}`])
        .then(res => {
            setContains(false)
        })
        displayUnfollowedMsg();
    };

    return (
            <div className="user__header">
                <div className="user__image">
                    {info?.images[0]?.url ? (
                        <img src={info?.images[0]?.url} alt="" />
                    ) : (
                        <img src={noImage} alt="" />
                    )}
                </div>
                <div className="user__info">
                    <h1>{info?.display_name}</h1>
                    {user.body.display_name != info?.display_name ? (
                        <div className="user__followButton">
                            {contains ? (
                                <button className="user__unfollow" onClick={unfollowUser}>Unfollow</button>
                            ) : (
                                <button className="user__follow" onClick={followUser}>Follow</button>
                            )}
                            <div>
                                <p>{info?.followers.total} followers · {total} public playlists</p>
                            </div>
                        </div>
                    ) : (
                        null
                    )}
                </div>
            </div>
    )
}

export default UserInfo
