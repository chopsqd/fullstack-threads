import type React from 'react';
import {useState} from 'react';
import {Card as NextCard, CardBody, CardFooter, CardHeader, Spinner} from '@nextui-org/react'
import {useLikePostMutation, useUnlikePostMutation} from "../store/services/like.api";
import {useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery} from "../store/services/post.api";
import {useDeleteCommentMutation} from "../store/services/comment.api";
import {Link, useNavigate} from "react-router-dom";
import {useAppSelector} from "../store/hooks";
import {selectCurrent} from "../store/slices/user.slice";
import User from "./User";
import {formatDate} from "../utils/formatDate";
import {RiDeleteBinLine} from "react-icons/ri";
import Typography from "./Typography";
import MetaInfo from "./MetaInfo";
import {FcDislike} from "react-icons/fc";
import {MdOutlineFavoriteBorder} from "react-icons/md";
import {FaRegComment} from "react-icons/fa";
import ErrorMessage from "./ErrorMessage";
import {hasErrorField} from "../utils/hasErrorField";

interface ICardProps {
    avatarUrl: string
    name: string
    authorId: string
    content: string
    commentId?: string
    likesCount?: number
    commentsCount?: number
    createdAt?: Date
    id?: string
    cardFor: 'comment' | 'post' | 'current-post'
    likedByUser?: boolean
}

const Card: React.FC<ICardProps> = ({
                                        avatarUrl = '',
                                        name = '',
                                        authorId = '',
                                        content = '',
                                        commentId = '',
                                        likesCount = 0,
                                        commentsCount = 0,
                                        createdAt,
                                        id = '',
                                        cardFor = 'post',
                                        likedByUser = false
                                    }) => {
    const navigate = useNavigate()
    const currentUser = useAppSelector(selectCurrent)
    const [likePost] = useLikePostMutation()
    const [unlikePost] = useUnlikePostMutation()
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
    const [triggerGetPostById] = useLazyGetPostByIdQuery()
    const [deletePost, deletePostStatus] = useDeletePostMutation()
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
    const [error, setError] = useState<string>('')

    const refetchPosts = async () => {
        switch (cardFor) {
            case 'post':
                await triggerGetAllPosts().unwrap()
                break
            case 'current-post':
                await triggerGetAllPosts().unwrap()
                break
            case 'comment':
                await triggerGetPostById(id).unwrap()
                break
            default:
                throw new Error('Неверный аргумент cardFor')
        }
    }

    const handleDelete = async () => {
        try {
            switch (cardFor) {
                case 'post':
                    await deletePost(id).unwrap()
                    await refetchPosts()
                    break
                case 'current-post':
                    await deletePost(id).unwrap()
                    navigate('/')
                    break
                case 'comment':
                    await deleteComment(commentId).unwrap()
                    await refetchPosts()
                    break
                default:
                    throw new Error('Неверный аргумент cardFor')
            }
        } catch (error) {
            if (hasErrorField(error)) {
                setError(error.data.message)
            } else {
                setError(error as string)
            }
        }
    }

    const handleLike = async () => {
        try {
            likedByUser
                ? await unlikePost(id).unwrap()
                : await likePost({postId: id}).unwrap()

            if (cardFor === 'current-post') {
                await triggerGetPostById(id).unwrap()
            }

            if (cardFor === 'post') {
                await triggerGetAllPosts().unwrap()
            }
        } catch (error) {
            if (hasErrorField(error)) {
                setError(error.data.message)
            } else {
                setError(error as string)
            }
        }
    }

    return (
        <NextCard className={'mb-5'}>
            <CardHeader className={'justify-between items-center bg-transparent'}>
                <Link to={`/users/${authorId}`}>
                    <User
                        name={name}
                        className={'text-small font-semibold leading-none text-default-600'}
                        avatarUrl={avatarUrl}
                        description={createdAt && formatDate(createdAt)}
                    />
                </Link>
                {
                    authorId === currentUser?.id && (
                        <div
                            className={'cursor-pointer'}
                            onClick={handleDelete}
                        >
                            {
                                deletePostStatus.isLoading || deleteCommentStatus.isLoading
                                    ? <Spinner/>
                                    : <RiDeleteBinLine/>
                            }
                        </div>
                    )
                }
            </CardHeader>
            <CardBody className={'px-3 py-2 mb-5'}>
                <Typography>{content}</Typography>
            </CardBody>
            {
                cardFor !== 'comment' && (
                    <CardFooter className={'gap-3'}>
                        <div className={'flex gap-5 items-center'}>
                            <div onClick={handleLike}>
                                <MetaInfo
                                    count={likesCount}
                                    Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
                                />
                            </div>
                            <Link to={`/posts/${id}`}>
                                <MetaInfo
                                    count={commentsCount}
                                    Icon={FaRegComment}
                                />
                            </Link>
                        </div>
                        <ErrorMessage error={error}/>
                    </CardFooter>
                )
            }
        </NextCard>
    );
};

export default Card;
