import type React from 'react';
import {User as NextUser} from '@nextui-org/react';
import {BASE_URL} from "../config";

interface IUserProps {
    name: string
    avatarUrl: string
    description?: string
    className?: string
}

const User: React.FC<IUserProps> = ({
                                        name = '',
                                        avatarUrl = '',
                                        description = '',
                                        className = ''
                                    }) => {
    return (
        <NextUser
            name={name}
            className={className}
            description={description}
            avatarProps={{
                src: BASE_URL + avatarUrl
            }}
        />
    );
};

export default User;
