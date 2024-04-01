import { createSlice, } from '@reduxjs/toolkit'


interface State {
    checkServerLoader: boolean,
    loader: boolean
}

const initialState: State = {
    checkServerLoader: false,
    loader: false
}

export const loaderSlice = createSlice({
    name: 'loaders',
    initialState,
    reducers: {
        reset_loaders: () => initialState,
        enableCheckServerLoader: (state) => {
            state.checkServerLoader = true
        },
        disableCheckServerLoader: (state) => {
            state.checkServerLoader = false
        },
        enableLoader: (state) => {
            state.loader = true
        },
        disableLoader: (state) => {
            state.loader = false
        },
    }
})


export const { reset_loaders, enableCheckServerLoader,
    disableCheckServerLoader } = loaderSlice.actions
export default loaderSlice.reducer