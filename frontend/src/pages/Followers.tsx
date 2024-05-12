import React from 'react';
import {useAppSelector} from "../store/hooks";
import {selectCurrent} from "../store/slices/user.slice";
import {Link} from "react-router-dom";
import {Card, CardBody} from "@nextui-org/react";
import User from "../components/User";

const Followers = () => {
    const currentUser = useAppSelector(selectCurrent)

    if (!currentUser) {
        return null
    }

    return currentUser.followers.length > 0
        ? (
            <div className={'flex flex-col gap-5'}>
                {currentUser.followers.map(user => (
                    <Link
                        key={user.follower.id}
                        to={`/users/${user.follower.id}`}
                    >
                        <Card>
                            <CardBody className={'block'}>
                                <User
                                    name={user.follower.name ?? ''}
                                    avatarUrl={user.follower.avatarUrl ?? ''}
                                    description={user.follower.email ?? ''}
                                />
                            </CardBody>
                        </Card>
                    </Link>
                ))}
            </div>
        ) : (
            <h2>
                У вас нет подписчиков
            </h2>
        )
};

export default Followers;
