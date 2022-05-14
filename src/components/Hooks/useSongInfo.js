import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../../DataLayer';


function useSongInfo() {
    const [{ playingTrack }, dispatch] = useDataLayerValue();
    const [playingInfo, setPlayingInfo] = useState(null);
    const spotifyApi = useSpotify();

    useEffect(() => {
        const fetchSongInfo = async () => {
            spotifyApi.getMyCurrentPlayingTrack()
            .then(res => {
                setPlayingInfo(res)
            })
        }

        fetchSongInfo();
        console.log(playingInfo)
    }, [playingTrack])

    return playingInfo; 
}

export default useSongInfo