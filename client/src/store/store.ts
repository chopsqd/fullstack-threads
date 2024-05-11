import {configureStore} from "@reduxjs/toolkit"
import {api} from "./services/api";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore["dispatch"]
