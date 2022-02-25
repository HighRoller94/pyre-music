import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import pyreLogo from '../assets/images/pyreLogo.png';

import HomeIcon from '@material-ui/icons/Home';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GroupIcon from '@material-ui/icons/Group';

import '../styles/styles.scss';

function Sidebar() {

    const { pathname } = useLocation();

    return (
        <motion.div 
            className="sidebar"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            >
            <div className={pathname === "/dashboard" ? "sidebar__options": "inactive__options"} component={Link} to="/dashboard">
                <Link to="/dashboard" activeClassName="active">
                    <HomeIcon className="side__option" />
                </Link>
            </div>
            <div className={pathname === "/library" ? "sidebar__options": "inactive__options"} component={Link} to="/library">
                <NavLink to="/library" style={{ background: 'none' }}>
                    <LibraryMusicIcon className="side__option" />
                </NavLink>
            </div>
            <div className={pathname === "/favourites" ? "sidebar__options": "inactive__options"} component={Link} to="/favourites">
                <NavLink to="/favourites" style={{ background: 'none'}}>
                <FavoriteIcon className="side__option" />
                </NavLink>
            </div>
            <div className="sidebar__bottom">
                <img src={pyreLogo} className="pyre__logo" alt="" />
            </div>
        </motion.div>
    )
}

export default Sidebar
