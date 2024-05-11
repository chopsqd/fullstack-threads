import type {IUser} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {userApi} from "../services/user.api";
import type {RootState} from "../store";

interface IInitialState {
    user: IUser | null
    isAuthenticated: boolean
    users: IUser[] | null
    current: IUser | null
    token?: string
}

const initialState: IInitialState = {
    user: null,
    isAuthenticated: false,
    users: null,
    current: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.user = null
        },
        logout: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
                state.token = action.payload.token
                state.isAuthenticated = true
            })
            .addMatcher(userApi.endpoints.current.matchFulfilled, (state, action) => {
                state.isAuthenticated = true
                state.current = action.payload
            })
            .addMatcher(userApi.endpoints.getUserById.matchFulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})


export const {resetUser, logout} = userSlice.actions
export default userSlice.reducer

export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated

export const selectCurrent = (state: RootState) => state.user.current

export const selectUser = (state: RootState) => state.user.user
