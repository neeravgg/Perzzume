import { createSlice, } from '@reduxjs/toolkit'


interface State {
    checkServerLoader: boolean
}

const initialState: State = {
    checkServerLoader: false
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
            state.checkServerLoader = true
        },
    }
})


export const { reset_loaders, enableCheckServerLoader,
    disableCheckServerLoader } = loaderSlice.actions
export default loaderSlice.reducer