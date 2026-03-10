

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const AddToCartThunk = createAsyncThunk(
    "/cart/AddToCartThunk",
    async(Data) => {
        const response = await axios.post("http://localhost:5000/user/cart/add", Data);
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

    }
})

export default CartSliceMain.reducer;