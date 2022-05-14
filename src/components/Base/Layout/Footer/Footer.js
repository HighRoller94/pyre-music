import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyWebApi from 'spotify-web-api-node';
import { useDataLayerValue } from '../../../../DataLayer';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FastForwardIcon from '@material-ui/icons/FastForward';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import RepeatIcon from '@material-ui/icons/Repeat';

import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';


const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Footer({ chooseTrack, accessToken }) {
    const [playingInfo, setPlayingInfo] = useState();
    const [{ playingTrack, playing }, dispatch] = useDataLayerValue();
    const [play, setPlay] = useState(false)
    const [volume, setVolume] = useState(100)

    useEffect(() => setPlay(true), [playingTrack])
    
    useEffect(() => {
        if (!accessToken) return null
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState()
        .then(res => {
            if (playing) {
                spotifyApi.pause();
                dispatch({
                    type: "SET_PLAYING",
                    playing: false
                })
            } else {
                spotifyApi.play();
                dispatch({
                    type: "SET_PLAYING",
                    playing: true
                })
            }
        })
    }
    if (!accessToken) return null
    return (   
        <div>           
                <div className="footer">
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
                        height: 60,
                        color: 'white',
                        bgColor: '#080808',
                        trackNameColor: 'white',
                        trackArtistColor: 'white',
                        sliderColor: '#FF6600',
                        sliderHandleColor: 'white',
                        sliderTrackColor: '2c2c2c',
                        sliderTrackBorderRadius: '2'
                    }}
                    
                />
                </div>
            </div>
            {/* 
            <div>
                <div className="footer">
                    <div className="footer__left">
                        <img className="song__img" src={playingInfo?.body?.item?.album.images[0].url} alt="Song Image"/>
                        <div className="song__Info">
                            <h4>{playingInfo?.body?.item.name}</h4>
                            <p>{playingInfo?.body?.item.artists[0].name}</p>
                        </div>
                    </div>
                    <div className="footer__center">
                        {playing ? (
                            <PauseCircleFilledIcon onClick={handlePlayPause} />
                        ) : (
                            <PlayCircleFilledIcon onClick={handlePlayPause} />
                        )}
                    </div>
                    <div className="footer__right">
                        
                    </div>
                </div>
            </div>
            */}    
        </div>
    )
}

export default Footer
