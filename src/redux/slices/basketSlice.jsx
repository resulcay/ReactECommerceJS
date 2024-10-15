import { createSlice } from '@reduxjs/toolkit';

const readItemsFromLocalStorage = () => {
    if (localStorage.getItem('basket')) {
        return JSON.parse(localStorage.getItem('basket'));
    }
    return [];
}

const initialState = {
    products: readItemsFromLocalStorage(),
}

const writeItemsToLocalStorage = (items) => {
    localStorage.setItem('basket', JSON.stringify(items))
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const exsitingProduct = state.products && state.products.find(product => product.id === action.payload.id);
            if (exsitingProduct) {
                const extractedProducts = state.products.filter(product => product.id !== action.payload.id);
                exsitingProduct.amount += action.payload.amount;
                state.products = [...extractedProducts, exsitingProduct];
                writeItemsToLocalStorage(state.products);
            } else {
                state.products = [...state.products, action.payload];
                writeItemsToLocalStorage(state.products);
            }
        },
        removeFromBasket: (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            let newBasket = [...state.products];

            if (index >= 0) {
                newBasket.splice(index, 1);

                const localStorageBasket = JSON.parse(localStorage.getItem('basket')) || [];
                const updatedLocalStorageBasket = localStorageBasket.filter(item => item.id !== action.payload.id);
                localStorage.setItem('basket', JSON.stringify(updatedLocalStorageBasket));
            } else {
                console.log(`Can't remove product (id: ${action.payload.id}) as it's not in basket!`);
            }

            state.products = newBasket;
        }
    }
})

export const { addToBasket, removeFromBasket } = basketSlice.actions
export default basketSlice.reducer