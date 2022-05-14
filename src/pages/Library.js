import React, { useEffect, useState } from 'react';
import { useDataLayerValue } from '../DataLayer';
import SpotifyWebApi from 'spotify-web-api-node';
import { useNavigate } from 'react-router-dom';

import MyPlaylists from '../components/Library/MyPlaylists';
import MyAlbums from '../components/Library/MyAlbums';

import AddCircleIcon from '@material-ui/icons/AddCircle';

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

        spotifyApi.getUserPlaylists(`${user.body.id}`, { limit: 10 })
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
                    <AddCircleIcon className="add__playlist" onClick={createNewPlaylist}/>
                </div>
                <div className="my__playlists">
                    {myPlaylists?.map((playlist) =>
                        <MyPlaylists chooseTrack={chooseTrack} track={playlist} />
                    )}
                </div>
            </div>
            
            <div className="library__albums">
                <h1>My Albums</h1>
                <div className="my__albums">
                    {myAlbums?.map((album) => 
                        <MyAlbums chooseTrack={chooseTrack} track={album.album} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Library
