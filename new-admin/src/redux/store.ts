import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/user.slice'
import loadersReducer from './features/loaders.slice'
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        user: userReducer,
        loaders: loadersReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector