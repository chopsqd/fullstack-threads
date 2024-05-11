import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../config";
import type {RootState} from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token || localStorage.getItem("token")

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: retry(baseQuery, {maxRetries: 1}),
    refetchOnMountOrArgChange: true,
    endpoints: () => ({})
})
