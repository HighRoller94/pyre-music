import React, { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Options({accessToken}) {

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    const logOut = () => {
        spotifyApi.resetAccessToken('');
        console.log('logged out')
    }

    return (
        <div className="options">
            <div className="option">
                <PersonIcon className="option__icon" style={{ background: "none"}} />
            </div>
            <div className="option">
                <SettingsIcon className="option__icon" style={{ background: "none"}} />
            </div>
            <div className="option">
                <ExitToAppIcon className="option__icon" style={{ background: "none"}} onClick={logOut}/>
            </div>
        </div>
    )
}

export default Options
