import React, {useContext} from 'react';
import {ThemeContext} from "../providers/ThemeProvider";
import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {FaRegMoon} from "react-icons/fa";
import {LuSunMedium} from "react-icons/lu";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {logout, selectIsAuthenticated} from "../store/slices/user.slice";
import {useNavigate} from "react-router-dom";
import {CiLogout} from "react-icons/ci";

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {theme, toggleTheme} = useContext(ThemeContext)
    const isAuthenticated = useAppSelector(selectIsAuthenticated)

    const handleLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        navigate('/auth')
    }

    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">React Threads</p>
            </NavbarBrand>
            <NavbarContent justify={"end"}>
                <NavbarItem
                    onClick={toggleTheme}
                    className={"lg:flex text-3xl cursor-pointer"}
                >
                    {theme === 'light' ? <FaRegMoon/> : <LuSunMedium/>}
                </NavbarItem>
                <NavbarItem>
                    {isAuthenticated && (
                        <Button
                            color={'default'}
                            variant={'flat'}
                            className={'gap-2'}
                            onClick={handleLogout}
                        >
                            <CiLogout/>
                            <span>Выйти</span>
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
