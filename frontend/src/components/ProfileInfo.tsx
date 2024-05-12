import type React from 'react';

interface IProfileInfoProps {
    title?: string
    info?: string
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({
                                                      title,
                                                      info
                                                  }) => {
    if (!info) {
        return null
    }

    return (
        <p className={'font-semibold'}>
            <span className={'text-gray-500 mr-2'}>{title}</span>
        </p>
    );
};

export default ProfileInfo;
