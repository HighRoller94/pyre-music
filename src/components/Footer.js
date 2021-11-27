import React, { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import SpotifyWebApi from 'spotify-web-api-node'
import { useDataLayerValue } from '../DataLayer'

import '../styles/styles.scss'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Footer({ accessToken }) {
    const [{ playingTrack, playing }, dispatch] = useDataLayerValue();
    const [play, setPlay] = useState(false)
    
    useEffect(() => setPlay(true), [playingTrack])
    
    useEffect(() => {
        if (!accessToken) return null
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    if (!accessToken) return null
    return (
        <div>           
                <div className="footer">
                {playingTrack ? (
                    <div>
                    
                    <SpotifyPlayer 
                    className="player"
                    token={accessToken}
                    showSaveIcon
                    callback={state => {
                        if (!state.isPlaying) setPlay(true)
                    }}
                    play={playing}
                    uris={playingTrack ? [playingTrack] : []}
                    styles={{
                        height: 80,
                        color: 'white',
                        bgColor: 'none',
                        trackNameColor: 'white',
                        trackArtistColor: 'white',
                        sliderColor: '#FF6600',
                        sliderHandleColor: 'white',
                        sliderTrackColor: '1c1c1c'
                    }}
                    
                />
                </div>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default Footer
