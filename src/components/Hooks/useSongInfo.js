import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../DataLayer';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function useSongInfo() {
    const [{ playingTrack }, dispatch] = useDataLayerValue();
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {

        const fetchSongInfo = async () => {
            if (playingTrack) {
                spotifyApi.getMyCurrentPlayingTrack()
                .then(res => {
                    setSongInfo(res)
                })
            }
        }
        fetchSongInfo();

    }, [playingTrack])

    return songInfo; 
}

export default useSongInfo