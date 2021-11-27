import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { useDataLayerValue } from '../DataLayer'

import RecentlyPlayedSong from '../components/RecentlyPlayedSong'
import RecentlyPlayedArtist from '../components/RecentlyPlayedArtists'
import RecentPlaylists from '../components/RecentPlaylists'
import NewReleases from '../components/NewReleases'
import FeaturedPlaylists from '../components/FeaturedPlaylists'
import Categories from '../components/Categories'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Home({ accessToken, chooseTrack }) {
    const [{ user }, dispatch] = useDataLayerValue()
    const [recentlyPlayed, setRecentlyPlayed] = useState()
    const [info, setInfo] = useState()
    const artistInfo = []
    
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.getMyRecentlyPlayedTracks({
            limit: 8
        }).then(res => {
            setRecentlyPlayed(res.body.items)
            recentlyPlayed?.forEach(iterateForArtistInfo);
        })
    }, [accessToken])

    function iterateForArtistInfo(item) {
        spotifyApi.getArtist(`${item.track.artists[0].id}`)
        .then(res => {
            setInfo(res.body)
            console.log(res.body)
        })
    }

    return (
        <div className="home" >
            <div className="home__gridone">
                <div className="recent__row">
                    <h1>Jump back in</h1>
                    <div className="recent__items">
                        {recentlyPlayed?.map((item =>
                                <RecentlyPlayedSong chooseTrack={chooseTrack} track={item.track}/>
                        ))}
                    </div>
                </div>
                <div className="recent__artists">
                    <h2>Artists</h2>
                    <div className="recent__items">
                        {recentlyPlayed?.map((item =>
                                <RecentlyPlayedArtist accessToken={accessToken} chooseTrack={chooseTrack} track={item.track} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="recent__playlists">
                <RecentPlaylists chooseTrack={chooseTrack} accessToken={accessToken} />
            </div>
            <div className="recommended__artists">
                <FeaturedPlaylists chooseTrack={chooseTrack} accessToken={accessToken} />
            </div>
            <div className="new__releases">
                <NewReleases chooseTrack={chooseTrack} accessToken={accessToken} />
            </div>
            <div>
                <Categories chooseTrack={chooseTrack} accessToken={accessToken} />
            </div>
        </div>
    )
}

export default Home
