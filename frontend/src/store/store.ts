import {configureStore} from "@reduxjs/toolkit"
import {api} from "./services/api";
import user from './slices/user.slice'
import {listenerMiddleware} from "../middleware/auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
        .concat(api.middleware)
        .prepend(listenerMiddleware.middleware)
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore["dispatch"]
