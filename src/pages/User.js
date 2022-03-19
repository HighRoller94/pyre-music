import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'

import { motion } from 'framer-motion/dist/framer-motion'

import UserInfo from '../components/UserInfo'
import UserPlaylists from '../components/UserPlaylists'

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
        <motion.div className="user__page" 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}>
            <div className="user__info">
                <UserInfo total={total} info={userInfo} accessToken={accessToken} />
            </div>
            <div className="user__playlists">
                {userPlaylists?.map((track) =>
                    <UserPlaylists track={track} chooseTrack={chooseTrack} />
                )}
            </div>
        </motion.div>
    )
}

export default User
