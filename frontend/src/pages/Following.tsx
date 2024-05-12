import React from 'react';
import {useAppSelector} from "../store/hooks";
import {selectCurrent} from "../store/slices/user.slice";
import {Link} from "react-router-dom";
import {Card, CardBody} from "@nextui-org/react";
import User from "../components/User";

const Following = () => {
    const currentUser = useAppSelector(selectCurrent)

    if (!currentUser) {
        return null
    }

    return currentUser.following.length > 0
        ? (
            <div className={'flex flex-col gap-5'}>
                {currentUser.following.map(user => (
                    <Link
                        key={user.following.id}
                        to={`/users/${user.following.id}`}
                    >
                        <Card>
                            <CardBody className={'block'}>
                                <User
                                    name={user.following.name ?? ''}
                                    avatarUrl={user.following.avatarUrl ?? ''}
                                    description={user.following.email ?? ''}
                                />
                            </CardBody>
                        </Card>
                    </Link>
                ))}
            </div>
        ) : (
            <h2>
                У вас нет подписок
            </h2>
        )
};

export default Following;
