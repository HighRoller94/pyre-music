import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { useDataLayerValue } from '../DataLayer'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function RecentPlaylists({ accessToken }) {
    const [{ user }, dispatch] = useDataLayerValue()
    const [recentPlaylists, setRecentPlaylists] = useState()

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return

        spotifyApi.getMyRecentlyPlayedTracks({
            limit: 20
        }).then(res => {
            setRecentPlaylists(res.body)
        })

    }, [accessToken])

    return (
        <div>
            
        </div>
    )
}

export default RecentPlaylists
