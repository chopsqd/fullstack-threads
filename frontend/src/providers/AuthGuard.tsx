import type React from 'react';
import {useCurrentQuery} from "../store/services/user.api";
import {Spinner} from "@nextui-org/react";

interface IAuthGuardProps {
    children: JSX.Element
}

const AuthGuard: React.FC<IAuthGuardProps> = ({children}) => {
    const {isLoading} = useCurrentQuery()

    if (isLoading) {
        return <Spinner/>
    }

    return children
};

export default AuthGuard;
