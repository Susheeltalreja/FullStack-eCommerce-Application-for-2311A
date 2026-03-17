import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchOrdersThunk = createAsyncThunk(
    "/admin/FetchOrdersThunk",
    async() => {
        const response = await axios.get("http://localhost:5000/admin/orders/get-orders");
        return response?.data;
    }
)

export const UpdateStatusThunk = createAsyncThunk(
    "/admin/UpdateStatusThunk",
    async({id, Data}) => {
        const response = await axios.put(`http://localhost:5000/admin/orders/update-order/${id}`, Data);
        return response?.data;
    }
)

const OrderSlice = createSlice({
    name: "OrderSlice",
    initialState: {
        isLoading: false,
        Orders: []
    },
    extraReducers: (build) => {
        build.addCase(FetchOrdersThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(FetchOrdersThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.Orders = action?.payload?.Data;
        }).addCase(FetchOrdersThunk.rejected, (state) => {
            state.isLoading = false;
            state.Orders = [];
        })
    }
})

export default OrderSlice.reducer;