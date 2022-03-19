import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from '../DataLayer'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'

import { motion } from 'framer-motion/dist/framer-motion'

import AlbumInfo from '../components/AlbumInfo'
import AlbumTracks from '../components/AlbumTracks'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Album({ accessToken, chooseTrack }) {
    const [{ playingTrack, playing}, dispatch] = useDataLayerValue()
    const { id } = useParams();
    const [albumInfo, setAlbumInfo] = useState()
    const [albumTracks, setAlbumTracks] = useState()

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        
        spotifyApi.getAlbum(`${id}`)
        .then(res => {
            setAlbumInfo(res)
            setAlbumTracks(res.body.tracks)
        })
    }, [accessToken, id])

    return (
        <motion.div className="album__page"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}} >
                <div>
                    <AlbumInfo info={albumInfo} accessToken={accessToken} chooseTrack={chooseTrack} />
                </div>
                <div className="album__tracks">
                    {albumTracks?.items.map((item) => 
                        <AlbumTracks track={item} chooseTrack={chooseTrack} />
                    )}
                </div>
        </motion.div>
    )
}

export default Album
