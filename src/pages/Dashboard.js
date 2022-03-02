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

function Dashboard({ accessToken, chooseTrack }) {
    const [uniqueSongs, setUniqueSongs] = useState()
    const uniquePlays = []

    useEffect(() => {
        // Check for access token, if not, return
        if (!accessToken) return
        // Set Access Token from code
        spotifyApi.setAccessToken(accessToken)

        // Get first 15 recently played tracks (enough to ensure 8 unique)
        spotifyApi.getMyRecentlyPlayedTracks({
            limit: 15
        }).then(res => {
            // From result, identify unique arrays
            for (let index = 0; index < res.body.items?.length; index++) {
                let unique = res.body.items[index].track;
                if (!uniquePlays.includes(unique)) {
                    uniquePlays.push(unique);
                }
                // Set unique arrays in new array using set, cut array down to 8
                let set = new Set(uniquePlays.map(JSON.stringify));
                let uniqueSongs = Array.from(set).map(JSON.parse).slice(0,8);
                setUniqueSongs(uniqueSongs)
            }
        })
    }, [accessToken])

    return (
        <div className="home" >
            <div className="home__gridone">
                <div className="recent__row">
                    <h1>Jump back in</h1>
                    <div className="recent__items">
                        {uniqueSongs?.map((track =>
                                <RecentlyPlayedSong chooseTrack={chooseTrack} track={track}/>
                        ))}
                    </div>
                </div>
                <div className="recent__artists">
                    <h2>Artists</h2>
                    <div className="recent__items">
                        {uniqueSongs?.map((track =>
                                <RecentlyPlayedArtist accessToken={accessToken} chooseTrack={chooseTrack} track={track} />
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

export default Dashboard
