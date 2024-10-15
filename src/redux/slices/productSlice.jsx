import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products: [],
    seledtedProduct: {},
    loading: false
}

const BASE_URL = 'https://fakestoreapi.com';

export const getAllProducts = createAsyncThunk(
    'getAllProducts',
    async () => {
        const response = await axios.get(`${BASE_URL}/products`)
        return response.data
    }
);

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        setCurrentProduct: (state, action) => {
            state.selectedProduct = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
    }
})

export const { setCurrentProduct } = productSlice.actions
export default productSlice.reducer