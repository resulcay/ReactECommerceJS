import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    drawer: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleDrawer: (state, action) => {
            state.drawer = action.payload;
        }
    },
})

export const { toggleDrawer } = appSlice.actions
export default appSlice.reducer