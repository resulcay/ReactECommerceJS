import { configureStore } from '@reduxjs/toolkit'
import productSlice from './slices/productSlice'
import appSlice from './slices/appSlice'
import basketSlice from './slices/basketSlice'

export const store = configureStore({
    reducer: {
        app: appSlice,
        product: productSlice,
        basket: basketSlice
    },
})