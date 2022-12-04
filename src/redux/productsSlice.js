import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';
import { PRODUCTS_API } from "../api";

const initialState = {
    products: [],
    status: 'idle',
    error: null,
    categories: [],
    cart: JSON.parse(localStorage.getItem('cart')) || []
}

export const fetchCategories = createAsyncThunk('products/fetchCategories', async (thunkAPI) => {
    try {
        const response = await axios.get(PRODUCTS_API + '/categories');

        return response.data;
    } catch(err) {
        if(!err.response) {
            throw thunkAPI.rejectWithValue(err.message);
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (thunkAPI) => {
    try {
        const response = await axios.get(PRODUCTS_API);

        return response.data;
    } catch(err) {
        if(!err.response) {
            throw thunkAPI.rejectWithValue(err.message);
        }

        throw thunkAPI.rejectWithValue(err.response.data.message);
    }
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart(state, action) {
            let i = 0;
            while(i < state.cart.length && state.cart[i].id !== action.payload.id) {
                i++;
            }
            if(i < state.cart.length) {
                state.cart[i] = {
                    ...action.payload,
                    quantity: state.cart[i].quantity + action.payload.quantity
                }
            } else {
                state.cart.push(action.payload);
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        incrementQuantity(state, action) {
            let i = 0;
            while(i < state.cart.length && state.cart[i].id !== action.payload.id) {
                i++;
            }
            if(i < state.cart.length && state.cart[i].quantity < 99) {
                state.cart[i] = {
                    ...state.cart[i],
                    quantity: state.cart[i].quantity + 1,
                    total: state.cart[i].price * (state.cart[i].quantity + 1)
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        decrementQuantity(state, action) {
            let i = 0;
            while(i < state.cart.length && state.cart[i].id !== action.payload.id) {
                i++;
            }
            if(i < state.cart.length && state.cart[i].quantity > 1) {
                state.cart[i] = {
                    ...state.cart[i],
                    quantity: state.cart[i].quantity - 1,
                    total: state.cart[i].price * (state.cart[i].quantity - 1)
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        handleQuantity(state, action) {
            if(action.payload.number > 0 && action.payload.number < 100) {
                let i = 0;
                while(i < state.cart.length && state.cart[i].id !== action.payload.id) {
                    i++;
                }
                if(i < state.cart.length && state.cart[i].quantity > 1) {
                    state.cart[i] = {
                        ...state.cart[i],
                        quantity: Number(action.payload.number),
                        total: state.cart[i].price * Number(action.payload.number)
                    }
                }
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFromCart(state, action) {
            state.cart = state.cart.filter(prd => prd.id !== action.payload.id);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        emptyCart(state) {
            state.cart = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export default productsSlice.reducer;
export const {addToCart, incrementQuantity, decrementQuantity, handleQuantity, removeFromCart, emptyCart} = productsSlice.actions;
export const selectAllProducts = state => state.products.products;
export const getStatusProducts = state => state.products.status;
export const getErrorProducts = state => state.products.error;
export const selectAllCategories = state => state.products.categories;
export const selectProductById = (state, productId) => state.products.products.find(product => product.id === productId);
export const selectCart = state => state.products.cart;