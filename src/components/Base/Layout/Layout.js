import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Options from './Options/Options';

function Layout({ accessToken, chooseTrack }) {
    return (
        <div className="layout">
            <div className="layout">
                <Sidebar accessToken={accessToken} />
                <div className="layout__content">
                    <Header chooseTrack={chooseTrack} accessToken={accessToken}/>
                    <Outlet />
                    <Options />
                </div>
                <Footer accessToken={accessToken} />
            </div>
            
        </div>
    )
}

export default Layout