import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'
import { useDataLayerValue } from '../DataLayer'

import noImage from '../assets/images/noImage.jpg'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function UserInfo({ total, info, accessToken }) {
    const [{ playingTrack, user, playing }, dispatch] = useDataLayerValue();
    const { id } = useParams();
    const fileInputRef = useRef()
    const [contains, setContains] = useState()
    
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)

        let userId = [id]
        spotifyApi.isFollowingUsers(userId)
        .then(res => {
            setContains(res?.body[0])
            console.log(res)
        })
    }, [])

    function followUser() {
        spotifyApi.followUsers([`${id}`])
        .then(res => {
            setContains(true)
        })
    }

    function unfollowUser() {
        spotifyApi.unfollowUsers([`${id}`])
        .then(res => {
            setContains(false)
        })
    }

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
                                <p>{info?.followers.total} followers · {total} playlists</p>
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
