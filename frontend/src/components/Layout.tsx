import React, {useEffect} from 'react';
import Header from "./Header";
import Container from "./Container";
import Navbar from "./Navbar";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "../store/hooks";
import {selectIsAuthenticated, selectUser} from "../store/slices/user.slice";
import Profile from "./Profile";

const Layout = () => {
    const navigate = useNavigate()
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const user = useAppSelector(selectUser)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth')
        }
    }, []);

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
                <div className={'flex-2 p-4'}>
                    <div className={'flex flex-col gap-5'}>
                        {!user && <Profile/>}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Layout;
