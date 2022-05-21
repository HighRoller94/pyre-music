import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Options from './Options/Options';

function Layout({ accessToken, chooseTrack }) {
    return (
        <div className="layout">
            <Sidebar accessToken={accessToken} />
            <div className="outlet">
                <Header chooseTrack={chooseTrack} accessToken={accessToken}/>
                <Outlet />
            </div>
            <Options />
            <Footer accessToken={accessToken} />
        </div>
    )
}

export default Layout