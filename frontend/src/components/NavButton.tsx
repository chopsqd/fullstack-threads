import type React from 'react';
import Button from "./Button";
import {Link} from "react-router-dom";

interface INavButtonProps {
    children: React.ReactNode
    icon: JSX.Element
    href: string
}

const NavButton: React.FC<INavButtonProps> = ({
                                                  children,
                                                  icon,
                                                  href
                                              }) => {
    return (
        <Button className={"flex justify-start text-xl"} icon={icon}>
            <Link to={href}>
                {children}
            </Link>
        </Button>
    );
};

export default NavButton;
