import { deleteAllCookies, getCookie } from '@/utils/cookieHelper'
import { createSlice } from '@reduxjs/toolkit'


interface State {
    accessToken: string | null
}

const initialState: State = {
    accessToken: getCookie('accessToken'),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: state => {
            state.accessToken = null;
            deleteAllCookies()
        },
    }
})


export const { logOut } = authSlice.actions
export default authSlice.reducer