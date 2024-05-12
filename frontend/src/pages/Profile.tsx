import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Button, Card, Image, useDisclosure} from "@nextui-org/react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {resetUser, selectCurrent} from "../store/slices/user.slice";
import {useGetUserByIdQuery, useLazyCurrentQuery, useLazyGetUserByIdQuery} from "../store/services/user.api";
import {useFollowUserMutation, useUnfollowUserMutation} from "../store/services/follow.api";
import GoBack from "../components/GoBack";
import {BASE_URL} from "../config";
import {MdOutlinePersonAddAlt1, MdOutlinePersonAddDisabled} from "react-icons/md";
import {CiEdit} from "react-icons/ci";
import ProfileInfo from "../components/ProfileInfo";
import {formatDate} from "../utils/formatDate";
import CountInfo from "../components/CountInfo";
import EditProfile from "../components/EditProfile";

const Profile = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const currentUser = useAppSelector(selectCurrent)
    const {data} = useGetUserByIdQuery(id ?? '')
    const [followUser] = useFollowUserMutation()
    const [unfollowUser] = useUnfollowUserMutation()
    const [triggerGetUserByIdQuery] = useLazyGetUserByIdQuery()
    const [triggerCurrentQuery] = useLazyCurrentQuery()

    useEffect(() => {
        return () => {
            dispatch(resetUser())
        }
    }, []);

    if (!data) {
        return null
    }

    const handleFollow = async () => {
        try {
            if (id) {
                data?.isFollowing
                    ? await unfollowUser(id).unwrap()
                    : await followUser({followingId: id}).unwrap()

                await triggerGetUserByIdQuery(id)
                await triggerCurrentQuery()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClose = async () => {
        try {
            if (id) {
                await triggerGetUserByIdQuery(id)
                await triggerCurrentQuery()
                onClose()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <GoBack/>
            <div className={'flex items-center gap-4'}>
                <Card className={'flex flex-col items-center text-center space-y-4 p-5 flex-2'}>
                    <Image
                        src={BASE_URL + data.avatarUrl}
                        alt={data.name}
                        width={200}
                        height={200}
                        className={'border-4 border-white'}
                    />
                    <div className={'flex flex-col text-2xl font-bold gap-4 items-center'}>
                        {data.name}
                        {
                            currentUser?.id !== id ? (
                                <Button
                                    color={data.isFollowing ? 'default' : 'primary'}
                                    variant={'flat'}
                                    className={'gap-2'}
                                    onClick={handleFollow}
                                    endContent={
                                        data.isFollowing
                                            ? <MdOutlinePersonAddDisabled/>
                                            : <MdOutlinePersonAddAlt1/>
                                    }
                                >
                                    {data.isFollowing ? 'Отписаться' : 'Подписаться'}
                                </Button>
                            ) : (
                                <Button
                                    endContent={<CiEdit/>}
                                    onClick={onOpen}
                                >
                                    Редактировать
                                </Button>
                            )
                        }
                    </div>
                </Card>
                <Card className={'flex flex-col space-y-4 p-5 flex-1'}>
                    <ProfileInfo title={'Почта'} info={data.email}/>
                    <ProfileInfo title={'Местоположение'} info={data.location}/>
                    <ProfileInfo title={'Дата рождения'} info={formatDate(data.birthDate)}/>
                    <ProfileInfo title={'Обо мне'} info={data.bio}/>

                    <div className={'flex gap-2'}>
                        <CountInfo
                            count={data.followers.length}
                            title={'Подписчики'}
                        />
                        <CountInfo
                            count={data.following.length}
                            title={'Подписки'}
                        />
                    </div>
                </Card>
            </div>

            <EditProfile
                isOpen={isOpen}
                onClose={handleClose}
                user={data}
            />
        </>
    );
};

export default Profile;
