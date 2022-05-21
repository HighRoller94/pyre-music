import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../DataLayer';
import SpotifyWebApi from 'spotify-web-api-node';
import { useNavigate } from 'react-router-dom';

import Playlist from '../components/Base/Playlist';
import Album from '../components/Base/Album';

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Library({ chooseTrack, accessToken }) {
    const navigate = useNavigate();
    const[{ user }, dispatch] = useDataLayerValue();
    const [myPlaylists, setMyPlaylists] = useState();
    const [myAlbums, setMyAlbums] = useState();

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);

        spotifyApi.getUserPlaylists(`${user.body.id}`, { limit: 12 })
        .then(res => {
            setMyPlaylists(res.body.items)
        });

        spotifyApi.getMySavedAlbums({ limit: 12 })
        .then(res => {
            setMyAlbums(res.body.items)
        });

    }, [accessToken])

    function createNewPlaylist () {
        spotifyApi.createPlaylist('My Playlist', { 'description': 'My New playlist', 'public': true})
        .then(res => {
            console.log(res)
            navigate(`/playlist/${res.body.id}`)
        })
    };

    return (
        <div className="library">
            <div className="library__playlists">
                <div className="library__header">
                    <h1>Saved Playlists</h1>
                    <p className="add__playlist" onClick={createNewPlaylist}>Add a new playlist</p>
                </div>
                <div className="divider"></div>
                <div className="my__playlists">
                    {myPlaylists?.map((playlist) =>
                        <Playlist key={playlist.name} chooseTrack={chooseTrack} track={playlist} />
                    )}
                </div>
            </div>
            
            <div className="library__albums">
                <div className="library__albumHeader">
                    <h1>My Albums</h1>
                    <p>See all</p>
                </div>
                <div className="divider"></div>
                <div className="my__albums">
                    {myAlbums?.map((album) => 
                        <Album key={album.album.name} chooseTrack={chooseTrack} track={album.album} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Library
