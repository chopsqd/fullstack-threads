import {api} from "./api";
import type {IPost} from "../types";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<
            IPost,
            { content: string }
        >({
            query: (postData) => ({
                url: '/posts',
                method: 'POST',
                body: postData
            })
        }),
        getAllPosts: builder.query<IPost[], void>({
            query: () => ({
                url: '/posts',
                method: 'GET'
            })
        }),
        getPostById: builder.query<IPost, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'GET'
            })
        }),
        deletePost: builder.mutation<void, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useDeletePostMutation,
    useLazyGetAllPostsQuery,
    useLazyGetPostByIdQuery
} = postApi

export const {
    endpoints: {
        createPost,
        getAllPosts,
        getPostById,
        deletePost
    }
} = postApi
