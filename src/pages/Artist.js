import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import ArtistInfo from '../components/ArtistPage/ArtistInfo';
import ArtistTracks from '../components/ArtistPage/ArtistTracks';
import Album from '../components/Base/Album';

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Artist({ accessToken, chooseTrack }) {
    const { id } = useParams();
    const [artistInfo, setArtistInfo] = useState();
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistTracks, setArtistTracks] = useState([]);

    useEffect( () => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
        
        spotifyApi.getArtist(`${id}`)
        .then(res => {
            setArtistInfo(res)
        });

        spotifyApi.getArtistTopTracks(`${id}`, 'GB')
        .then(res => {
            setArtistTracks(res.body.tracks)
        });

        spotifyApi.getArtistAlbums(`${id}`)
        .then(res => {
            setArtistAlbums(res.body.items)
        });

    }, [accessToken, id])

    const topTracks = artistTracks.slice(0,5);

    return (
        <div className="artist__page">
            <div>
                <ArtistInfo info={artistInfo} accessToken={accessToken} chooseTrack={chooseTrack}/>
            </div>
            
            <div className="artist__tracks">
                <h1>Top Tracks</h1>
                <div className="divider"></div>
                <div className="top__tracks">
                    {topTracks?.map((track, i) => 
                        <ArtistTracks key={track.id} index={i} chooseTrack={chooseTrack} track={track} />    
                    )}
                </div>
            </div>
            <div className="artist__albums">
                <h1>Albums</h1>
                <div className="divider"></div>
                <div className="albums">
                    {artistAlbums?.map((album) => 
                        <Album key={album.id} chooseTrack={chooseTrack} track={album} />    
                    )}
                </div>
            </div>
        </div>
    )
}

export default Artist
