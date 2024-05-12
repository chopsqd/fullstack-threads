import React from 'react';
import {useAppSelector} from "../store/hooks";
import {selectCurrent} from "../store/slices/user.slice";
import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import {BASE_URL} from "../config";
import {Link} from "react-router-dom";
import {MdAlternateEmail} from "react-icons/md";

const Profile = () => {
    const current = useAppSelector(selectCurrent)

    if (!current) {
        return null
    }

    const {name, email, avatarUrl, id} = current

    return (
        <Card className={'py-4 w-[300px]'}>
            <CardHeader className={'pb-0 pt-2 px-4 flex-col items-center'}>
                <Image
                    alt={name}
                    className={'object-cover rounded-xl'}
                    src={BASE_URL + avatarUrl}
                    width={370}
                />
            </CardHeader>
            <CardBody>
                <Link to={`/users/${id}`}>
                    <h4 className={'font-bold text-large mb-2'}>{name}</h4>
                </Link>
                <p className={'text-default-500 flex items-center gap-2'}>
                    <MdAlternateEmail/>
                    {email}
                </p>
            </CardBody>
        </Card>
    );
};

export default Profile;
