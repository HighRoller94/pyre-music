import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Options from './Options/Options';

function Layout({ accessToken, chooseTrack }) {
    return (
        <div className="layout">
            <div>
            <Header chooseTrack={chooseTrack} />
            <Sidebar accessToken={accessToken} />
            <Options />
            <Footer accessToken={accessToken} />
        </div>
        <Outlet />
        </div>
        
    )
}

export default Layout