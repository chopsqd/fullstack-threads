import React from 'react';
import {useParams} from "react-router-dom";
import {useGetPostByIdQuery} from "../store/services/post.api";
import Card from "../components/Card";
import GoBack from "../components/GoBack";
import CreateComment from "../components/CreateComment";
import {IComment} from "../store/types";

const CurrentPost = () => {
    const params = useParams<{ id: string }>()
    const {data} = useGetPostByIdQuery(params?.id ?? '')

    if (!data) {
        return <h2>Поста не существует</h2>
    }

    const {
        content, id, authorId, comments,
        likes, author, likedByUser, createdAt
    } = data
    return (
        <>
            <GoBack/>
            <Card
                avatarUrl={author.avatarUrl ?? ''}
                content={content}
                name={author.name ?? ''}
                likesCount={likes.length}
                commentsCount={comments.length}
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor={'current-post'}
            />
            <div className={'mt-10'}>
                <CreateComment/>
            </div>
            <div className={'mt-10'}>
                {
                    data.comments
                        ? data.comments.map((comment: IComment) => (
                            <Card
                                key={comment.id}
                                cardFor={'comment'}
                                avatarUrl={comment.user.avatarUrl ?? ''}
                                content={comment.content}
                                name={comment.user.name ?? ''}
                                authorId={comment.userId}
                                commentId={comment.id}
                                id={id}
                            />
                        ))
                        : null
                }
            </div>
        </>
    );
};

export default CurrentPost;
