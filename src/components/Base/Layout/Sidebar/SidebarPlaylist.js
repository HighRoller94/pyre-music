import React from 'react';
import { Link } from 'react-router-dom';

function SidebarPlaylist({ playlist }) {
    return (
        <Link to={`/playlist/${playlist?.id}`} >
            <div className="side__playlist">
                <img src={playlist.images[0].url} />
                <p>{playlist.name}</p>
            </div>
        </Link>
    )
}

export default SidebarPlaylist