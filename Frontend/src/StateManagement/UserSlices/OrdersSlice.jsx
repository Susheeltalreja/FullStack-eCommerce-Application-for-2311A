import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchOrdersForUserThunk = createAsyncThunk(
  "/admin/FetchOrdersForUserThunk",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/admin/orders/fetch-orders/${id}`,
    );
    return response?.data;
  },
);


const OrderSlice = createSlice({
  name: "OrderSlice",
  initialState: {
    isLoading: false,
    UserOrders: []
  },
  extraReducers: (build) => {
    build
      .addCase(FetchOrdersForUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FetchOrdersForUserThunk.fulfilled, (state, action) => {
        console.log("Act", action)
        state.isLoading = false;
        state.UserOrders = action?.payload?.Data;
      })
      .addCase(FetchOrdersForUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.UserOrders = [];
      });
  },
});

export default OrderSlice.reducer;
