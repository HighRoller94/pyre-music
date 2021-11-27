import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'

import UserInfo from '../components/UserInfo'
import UserPlaylists from '../components/UserPlaylists'
import UserTopArtists from '../components/UserTopArtists'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function User({ chooseTrack, accessToken }) {
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState()
    const [userPlaylists, setUserPlaylists] = useState()
    const [userTopArtists, setUserTopArtists] = useState()
    const [total, setTotal] = useState()

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)

        spotifyApi.getUser(`${id}`)
        .then(res => {
            setUserInfo(res.body)
        })

        spotifyApi.getUserPlaylists(`${id}`)
        .then(res => {
            setUserPlaylists(res.body.items)
            setTotal(res.body.total)
        })

    }, [id]);

    return (
        <div className="user__page">
            <div className="user__info">
                <UserInfo total={total} info={userInfo} accessToken={accessToken} />
            </div>
            <div className="user__playlists">
                {userPlaylists?.map((track) =>
                    <UserPlaylists track={track} chooseTrack={chooseTrack} />
                )}
            </div>
        </div>
    )
}

export default User
