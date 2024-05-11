import {api} from "./api";
import type {ILike} from "../types";

export const likeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        likePost: builder.mutation<
            ILike,
            { postId: string }
        >({
            query: (likeData) => ({
                url: '/like',
                method: 'POST',
                body: likeData
            })
        }),
        unlikePost: builder.mutation<void, string>({
            query: (id) => ({
                url: `/unlike/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useLikePostMutation,
    useUnlikePostMutation
} = likeApi

export const {
    endpoints: {
        likePost,
        unlikePost
    }
} = likeApi
