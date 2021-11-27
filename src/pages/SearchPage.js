import React from 'react'
import { motion } from 'framer-motion'

import SearchResult from '../components/SearchResult'
import SearchedArtist from '../components/SearchedArtist'
import SearchedPlaylist from '../components/SearchedPlaylist'

import ClearIcon from '@material-ui/icons/Clear'

import '../styles/styles.scss'

function SearchPage({ trackSearch, chooseTrack, playlistSearch, artistSearch, resetSearch}) {

    return (
        <motion.div 
        className="search__page" 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        >
            <div className="search__header">
                <h1>Search</h1>
                <ClearIcon  className="clear__icon" onClick={resetSearch}/>
            </div>
                <div className="search__results">
                    <div className="search__tracks">
                        {trackSearch.map(track => (
                            <SearchResult resetSearch={resetSearch} chooseTrack={chooseTrack} track={track} key={track.uri} />
                        ))}
                    </div>
                    <div className="search__artists"> 
                        <h2>Artists</h2>
                        <div className="artist__container">
                            {artistSearch.map(track => (
                                <SearchedArtist resetSearch={resetSearch} chooseTrack={chooseTrack} track={track} key={track.uri} />
                            ))}
                        </div>
                    </div>
                </div>
            <h2>Playlists</h2>
            <div className="search__playlists">
                    {playlistSearch.map(track => (
                        <SearchedPlaylist resetSearch={resetSearch} chooseTrack={chooseTrack} track={track} key={track.uri} />
                    ))}
            </div>
        </motion.div>
    )
}

export default SearchPage
