import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import { useDataLayerValue } from '../DataLayer';

import RecentlyPlayedSong from '../components/Dashboard/RecentlyPlayedSong';
import RecentlyPlayedArtist from '../components/Dashboard/RecentlyPlayedArtists';

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Dashboard({ accessToken, chooseTrack }) {
    const [{ token }, dispatch] = useDataLayerValue();
    const [uniqueSongs, setUniqueSongs] = useState();
    const uniquePlays = [];
    const [artistInfo, setArtistInfo] = useState();
    const [topArtists, setTopArtists] = useState();

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
        
        // Get Top played artists
        spotifyApi.getMyTopArtists()
        .then(res => {
            setTopArtists(res.body.items)
        })

    }, [accessToken])

    const artists = topArtists?.slice(0,8)

    return (
        <div class="dashboard">
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
                        {artists?.map((track =>
                                <RecentlyPlayedArtist accessToken={accessToken} chooseTrack={chooseTrack} track={track} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
