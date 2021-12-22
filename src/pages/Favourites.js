import React, { useEffect, useState} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

import TopArtists from '../components/TopArtists'
import TopTracks from '../components/TopTracks'
import TopPlaylists from '../components/TopPlaylists'
import FollowedArtists from '../components/FollowedArtists'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Favourites({ chooseTrack, accessToken }) {
    const [topArtists, setTopArtists] = useState()
    const [topTracks, setTopTracks] = useState()
    const [followedArtists, setFollowedArtists] = useState()
    
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMyTopArtists()
        .then(res => {
            setTopArtists(res.body.items)
        })
        spotifyApi.getMyTopTracks()
        .then(res => {
            setTopTracks(res.body.items)
        })
        spotifyApi.getFollowedArtists({ limit : 8})
        .then(res => {
            setFollowedArtists(res.body.artists.items)
            console.log(res)
        })
    }, [accessToken])

    const artists = topArtists?.slice(0,8)
    const tracks = topTracks?.slice(0,6)

    return (
        <div className="favs__page">
            <div className="fav__artists">
                <h1>Top Played Artists...</h1>
                <div className="artists">
                    {artists?.map((artist) =>
                        <TopArtists chooseTrack={chooseTrack} artist={artist}/>
                    )}
                </div>
            </div>
            <div className="fav__tracks">
                <h2>...Your top hits</h2>
                <div className="tracks">
                    {tracks?.map((track) =>
                        <TopTracks chooseTrack={chooseTrack} track={track} />
                    )}
                </div>
            </div>
            <div className="fav__playlists">
                <h1>Playlists</h1>
                <div className="playlists">
                    {artists?.map((artist) =>
                        <TopArtists chooseTrack={chooseTrack} artist={artist}/>
                    )}
                </div>
            </div>
            <div className="followed__artists">
                <h1>Followed Artists</h1>
                <div className="f__artists">
                    {followedArtists?.map((artist) =>
                        <FollowedArtists chooseTrack={chooseTrack} artist={artist}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Favourites
