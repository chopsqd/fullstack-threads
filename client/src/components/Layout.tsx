import React from 'react';
import Header from "./Header";
import Container from "./Container";
import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <Header/>
            <Container>
                <div className="flex-2 p-4">
                    <Navbar/>
                </div>
                <div className="flex-1 p-4">
                    <Outlet/>
                </div>
            </Container>
        </>
    );
};

export default Layout;
