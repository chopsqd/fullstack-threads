import {api} from "./api";
import type {IComment} from "../types";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createComment: builder.mutation<
            IComment,
            Partial<IComment>
        >({
            query: (commentData) => ({
                url: '/comments',
                method: 'POST',
                body: commentData
            })
        }),
        deleteComment: builder.mutation<void, string>({
            query: (id) => ({
                url: `/comments/${id}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useCreateCommentMutation,
    useDeleteCommentMutation
} = commentApi

export const {
    endpoints: {
        createComment,
        deleteComment
    }
} = commentApi
