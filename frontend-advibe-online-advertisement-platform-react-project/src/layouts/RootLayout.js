import {NavLink, Outlet} from "react-router-dom";
import React from "react";
import UserLogin from "../component/user-component/UserLogin";

/*
* Root Layout navigate the user according to the menu nav
* */
const RootLayout = () => {
    return (
            <div className="layout">
                <header className="header">
                    <div className="logo">
                        <img src="AdVibeTrans.png" alt="logo"/>
                    </div>
                    <div className="header-container">
                        <h1 className="header-title">AdVibe</h1>
                        <h3 className="header-subtitle">An <em>Online Advertisement Platform</em></h3>
                    </div>
                    <nav className="menu">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="user"><UserLogin/></NavLink>
                    </nav>
                </header>
                <main className="content">
                    <div className="site-layout-content">
                        <Outlet/>
                    </div>
                </main>
                <footer className="footer">
                    <div className="footer-container">
                        <h1 className="footer-title">AdVibe</h1>
                        <h3 className="footer-subtitle">An <em> Online Advertisement Platform ©2024</em></h3>
                    </div>
                </footer>
            </div>
    );
}

export default RootLayout;