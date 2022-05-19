import React from 'react';

import SearchResult from '../components/SearchPage/SearchResult';
import Artist from '../components/Base/Artist';
import Playlist from '../components/Base/Playlist';

function SearchPage({ trackSearch, chooseTrack, playlistSearch, artistSearch, resetSearch}) {

    return (
        <div className="search__page">
            <div className="search__results">
                <div className="search__header">
                    <h2>Search Results</h2>
                </div>
                <div className="divider"></div>
                <div className="search__tracks">
                    <div className="search__tracksContainer">
                        {trackSearch.map(track => (
                            <SearchResult resetSearch={resetSearch} chooseTrack={chooseTrack} track={track} key={track.uri} />
                        ))}
                    </div>
                    <div className="search__artistsContainer">
                        {artistSearch.map(track => (
                            <Artist resetSearch={resetSearch} chooseTrack={chooseTrack} track={track} key={track.uri} />
                        ))}
                    </div>
                </div>
                <h3>Playlists</h3>
                <div className="divider"></div>
                <div className="search__playlists">
                    {playlistSearch.map(track => (
                        <Playlist resetSearch={resetSearch} chooseTrack={chooseTrack} track={track} key={track.uri} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchPage
