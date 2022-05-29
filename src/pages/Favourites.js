import React, { useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

import Artist from '../components/Base/Artist';
import TopTracks from '../components/FavouritesPage/TopTracks';

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Favourites({ chooseTrack, accessToken }) {
    const [topArtists, setTopArtists] = useState()
    const [topTracks, setTopTracks] = useState()
    const [followedArtists, setFollowedArtists] = useState()
    
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getMyTopArtists()
        .then(res => {
            setTopArtists(res.body.items)
        });
        spotifyApi.getMyTopTracks()
        .then(res => {
            setTopTracks(res.body.items)
        });
        spotifyApi.getFollowedArtists({ limit : 10})
        .then(res => {
            setFollowedArtists(res.body.artists.items)
        });
    }, [accessToken])

    const artists = topArtists?.slice(0,6);
    const tracks = topTracks?.slice(0,8);

    return (
        <div className="favs__page">
            <div className="fav__artists">
                <div className="fav__artistsHeader">
                    <div className="fav__titles">
                        <h1>Top Played Artists</h1>
                        <p>All of your favourite artists in one place</p>
                    </div>
                    <p className="see__more">See more</p>
                </div>
                <div className="divider"></div>
                <div className="artists">
                    {artists?.map((artist =>
                        <Artist key={artist.id} chooseTrack={chooseTrack} track={artist}/>
                    ))}
                </div>
            </div>
            <div className="fav__tracks">
                <div className="fav__tracksHeader">
                    <div className="fav__tracksTitles">
                        <h1>Your top hits</h1>
                        <p>Lets run it back</p>
                    </div>
                    <p className="see__more">See more</p>
                </div>
                <div className="divider"></div>
                <div className="tracks">
                    {tracks?.map((track, i) =>
                        <TopTracks index={i} key={track.id} chooseTrack={chooseTrack} track={track} />
                    )}
                </div>
            </div>
            <div className="followed__artists">
                <div className="followed__artistsHeader">
                    <div className="followed__titles">
                        <h1>Followed Artists</h1>
                        <p>A few of your followed artists</p>
                    </div>
                    <p className="see__more">See more</p>
                </div>
                <div className="divider"></div>
                <div className="f__artists">
                    {followedArtists?.map((artist) =>
                        <Artist key={artist.id} chooseTrack={chooseTrack} track={artist}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Favourites
