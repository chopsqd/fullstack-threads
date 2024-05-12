import React from 'react';
import {useGetAllPostsQuery} from "../store/services/post.api";
import CreatePost from "../components/CreatePost";
import Card from "../components/Card";
import type {IPost} from "../store/types";

const Posts = () => {
    const {data} = useGetAllPostsQuery()

    return (
        <>
            <div className={'mb-10 w-full'}>
                <CreatePost/>
            </div>
            {
                data && data.length > 0
                    ? data.map((post: IPost) => (
                        <Card
                            key={post.id}
                            avatarUrl={post.author.avatarUrl ?? ''}
                            content={post.content}
                            name={post.author.name ?? ''}
                            likesCount={post.likes.length}
                            commentsCount={post.comments.length}
                            authorId={post.authorId}
                            id={post.id}
                            likedByUser={post.likedByUser}
                            createdAt={post.createdAt}
                            cardFor={'post'}
                        />
                    )) : null
            }
        </>
    );
};

export default Posts;
