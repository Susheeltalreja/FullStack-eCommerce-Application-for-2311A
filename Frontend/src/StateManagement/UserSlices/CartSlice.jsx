

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AddToCartThunk = createAsyncThunk(
    "/cart/AddToCartThunk",
    async(Data) => {
        const response = await axios.post("http://localhost:5000/user/cart/add", Data);
        return response?.data;
    }
) 

export const FetchCartThunk = createAsyncThunk(
    "/cart/FetchCartThunk",
    async({id}) => {
        const response = await axios.get(`http://localhost:5000/user/cart/fetch-cart/${id}`);
        return response?.data;
    }
)

export const IncreaseQuantityThunk = createAsyncThunk(
    "/cart/IncreaseQuantityThunk",
    async(data) => {
        const response = await axios.post("http://localhost:5000/user/cart/increase", data);
        return response?.data;
    }
)
export const DecreaseQuantityThunk = createAsyncThunk(
    "/cart/DecreaseQuantityThunk",
    async(data) => {
        const response = await axios.post("http://localhost:5000/user/cart/decrease", data);
        return response?.data;
    }
)
export const RemoveItemThunk = createAsyncThunk(
    "/cart/RemoveItemThunk",
    async(data) => {
        const response = await axios.delete("http://localhost:5000/user/cart/remove", {
            data: data
        });
        return response?.data;
    }
)

const CartSliceMain = createSlice({
    name: "CartSliceMain",
    initialState: {
        isLoading: false,
        Cart: []
    },
    extraReducers: (build) => {
        build.addCase(FetchCartThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(FetchCartThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.Cart = action?.payload?.Data
        }).addCase(FetchCartThunk.rejected, (state) => {
            state.isLoading = false;
            state.Cart = [];
        })
    }
})

export default CartSliceMain.reducer;