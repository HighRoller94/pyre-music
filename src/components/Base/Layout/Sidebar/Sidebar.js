import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node'
import { useDataLayerValue } from '../../../../DataLayer'

import pyreLogo from '../../../../assets/images/pyreLogo.png';

import { motion } from 'framer-motion';

import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LaunchIcon from '@material-ui/icons/Launch';

const spotifyApi = new SpotifyWebApi({
    clientId: "a4461782c5b040b2a456806c4d99258f",
});

function Sidebar({ accessToken }) {
    const [{ user }, dispatch] = useDataLayerValue()
    const { pathname } = useLocation();

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMe().then((user) => {
            dispatch({
                type: 'SET_USER',
                user: user
            })
        })
        const sideMenu = document.querySelector('.sidebar')
        const expandBtn = document.querySelector('.expandBtn');
        expandBtn.addEventListener('click', () => {
            sideMenu.classList.toggle('active');
        })
    }, [accessToken])

    return (
        <motion.div 
            className="sidebar"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <ul className="sidebar__menu">
                <li className="logo__content">
                    <img src={pyreLogo} className="sidebar__logo" alt="" />
                    <h1 className="logo__name">Pyre</h1>
                </li>
                <li className={pathname === "/dashboard" ? "active option": "option" } component={Link} to="/dashboard">
                    <Link to="/dashboard">
                        <HomeIcon className="icon" />
                    </Link>
                    <Link to="/dashboard">
                        <span>Home</span>
                    </Link>
                </li>
                <li className={pathname === "/library" ? "active option": "inactive option"} component={Link} to="/library">
                    <Link to="/library">
                        <LibraryMusicIcon className="icon" />
                    </Link>
                    <Link to="/library">
                        <span>Library</span>
                    </Link>
                </li>
                <li className={pathname === "/favourites" ? "active option": "inactive option"} component={Link} to="/favourites">
                    <Link to="/favourites">
                        <FavoriteIcon className="icon" />
                    </Link>
                    <Link to="/favourites">
                        <span>Favourites</span>
                    </Link>
                </li>
                <li className={pathname === `/user/${user?.body.id}` ? "active option": "inactive option"} component={Link} to="/favourites">
                    <Link to={`/user/${user?.body.id}`}>
                        <AccountCircleIcon className="icon" />
                    </Link>
                    <Link to={`/user/${user?.body.id}`}>
                        <span>Account</span>
                    </Link>
                </li>
                <li className="user">
                    <img className="user__image" src={user?.body.images[0]?.url} alt="UserImage" />
                    <div className="user__logged">
                        <span>Logged in as</span>
                        <h1>{user?.body.display_name}</h1>
                    </div>
                </li>
                <li className="expand__container">
                    <LaunchIcon className="expandBtn" />
                </li>
            </ul>
            
        </motion.div>
    )
}

export default Sidebar