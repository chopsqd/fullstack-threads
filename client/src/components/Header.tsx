import React, {useContext} from 'react';
import {ThemeContext} from "./ThemeProvider";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";
import {FaRegMoon} from "react-icons/fa";
import {LuSunMedium} from "react-icons/lu";

const Header = () => {
    const {theme, toggleTheme} = useContext(ThemeContext)

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
                    ...
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
