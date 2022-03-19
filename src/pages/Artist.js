import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-node'

import { motion } from 'framer-motion/dist/framer-motion'

import ArtistInfo from '../components/ArtistInfo'
import ArtistTracks from '../components/ArtistTracks'
import ArtistAlbums from '../components/ArtistAlbums'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Artist({ accessToken, chooseTrack }) {
    const { id } = useParams();
    const [artistInfo, setArtistInfo] = useState()
    const [artistAlbums, setArtistAlbums] = useState([])
    const [artistTracks, setArtistTracks] = useState([])

    useEffect( () => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        
        spotifyApi.getArtist(`${id}`)
        .then(res => {
            setArtistInfo(res)
        })
        spotifyApi.getArtistTopTracks(`${id}`, 'GB')
        .then(res => {
            setArtistTracks(res.body.tracks)
        })
        spotifyApi.getArtistAlbums(`${id}`)
        .then(res => {
            setArtistAlbums(res.body.items)
        })
    }, [accessToken, id])

    const topTracks = artistTracks.slice(0,6)

    return (
        <motion.div className="artist__page"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}>
            <div>
                <ArtistInfo info={artistInfo} accessToken={accessToken} chooseTrack={chooseTrack}/>
            </div>
            <div className="artist__tracks">
                <h1>Top Tracks</h1>
                <div className="top__tracks">
                    {topTracks?.map((track) => 
                        <ArtistTracks chooseTrack={chooseTrack} track={track} />    
                    )}
                </div>
            </div>
            <div className="artist__albums">
                <h1>Albums</h1>
                <div className="albums">
                    {artistAlbums?.map((album) => 
                        <ArtistAlbums chooseTrack={chooseTrack} track={album} />    
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export default Artist
