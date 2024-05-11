import {api} from "./api";
import type {IUser} from "../types";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<
            { email: string, password: string, name: string },
            { email: string, password: string, name: string }
        >({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData
            })
        }),
        login: builder.mutation<
            { token: string },
            { email: string, password: string }
        >({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData
            })
        }),
        current: builder.query<IUser, void>({
            query: () => ({
                url: '/current',
                method: 'GET'
            })
        }),
        getUserById: builder.query<IUser, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'GET'
            })
        }),
        updateUser: builder.mutation<
            IUser,
            { userData: FormData, id: string }
        >({
            query: ({userData, id}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: userData
            })
        })
    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useCurrentQuery,
    useLazyCurrentQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useUpdateUserMutation
} = userApi

export const {
    endpoints: {
        login,
        register,
        current,
        getUserById,
        updateUser
    }
} = userApi
