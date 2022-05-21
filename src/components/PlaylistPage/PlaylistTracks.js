import React, { useEffect } from 'react';
import { useDataLayerValue } from '../../DataLayer';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function PlaylistTracks({ index, updatePlaylist, track, info, chooseTrack, accessToken }) {
    const [{ playingTrack, playing, user}, dispatch] = useDataLayerValue();
    const { id } = useParams();

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    function handlePlay() {
        chooseTrack(track.track)
    }

    function handlePause() {
        dispatch({
            type: 'SET_PLAYING_TRACK',
            playingTrack: null,
        })
        dispatch({
            type: 'SET_PLAYING',
            playing: false,
        })
    }

    function convertTimestamp(ms) {
        const minutes = Math.floor(ms / 60000)
        const seconds = ((ms % 60000) / 1000).toFixed(0)
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }

    function removeTrackFromPlaylist() {
        spotifyApi.removeTracksFromPlaylist(`${id}`, [{ uri: `${track.track.uri}` }], { snapshot_id : `${info.body.snapshot_id}`})
        .then(function(data) {
            console.log('Track removed from playlist');
        }, function(err) {
            console.log('Something went wrong!', err);
        });
    }

    return (
        <div className="playlist__row">
            <div className="playlist__track" onDoubleClick={handlePlay}>
                <div className="track__infoLeft">
                    <p>{index + 1}</p>
                    <Link to={`/album/${track.track.album.id}`}>
                        <img className="track__image" src={track?.track.album.images[0]?.url} alt="" />
                    </Link>
                    <h1>{track.track.name}</h1>
                    <Link to={`/artist/${track?.track.artists[0].id}`} styles={{ background: 'none'}}>
                        <h2 className="artist__name">{track?.track.artists[0].name}</h2>
                    </Link>
                </div>
                <div className="track__infoMid">
                    <Link to={`/album/${track?.track.album.id}`}>
                        <p className="track__albumName">{track?.track.album.name}</p>
                    </Link>
                </div>
                <div className="track__infoRight">
                    <h3>{convertTimestamp(track.track.duration_ms)}</h3>
                    {(track.track.uri != playingTrack || !playing) ?
                            <PlayCircleFilledIcon onClick={handlePlay} className="play__icon" />
                        : 
                            <PauseCircleFilledIcon onClick={handlePause} className="play__icon" />
                    }
                    {info?.body.owner.display_name === user.body.display_name ? (
                        <RemoveCircleIcon className="remove__icon" onClick={() => { removeTrackFromPlaylist(); updatePlaylist(); }} />
                    ) :(
                        null
                    )}
                </div>
            </div>
        </div>
    )
}

export default PlaylistTracks
