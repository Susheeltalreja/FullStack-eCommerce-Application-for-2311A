import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


export const AddProductThunk = createAsyncThunk(
    "/product/addProductThunk",
    async(data) => {
        const response = await axios.post("http://localhost:5000/product/add-product", data);
        return response?.data
    }
)

export const FetchProductsThunk = createAsyncThunk(
    "/product/FetchProductsThunk",
    async() => {
        const response = await axios.get("http://localhost:5000/product/get-product");
        return response?.data
    }
)

export const UpdateProductThunk = createAsyncThunk(
    "/product/UpdateProductThunk",
    async({Data, Id}) => {
        const response = await axios.put(`http://localhost:5000/product/update-product/${Id}`, Data);
        return response?.data
    }
)

export const DeleteProductThunk = createAsyncThunk(
    "/product/DeleteProductThunk",
    async(id) => {
        const response = await axios.delete(`http://localhost:5000/product/delete-product/${id}`);
        return response?.data
    }
)

const ProductSlice = createSlice(
    {
        name: "ProductSlice",
        initialState: {
            isLoading: false,
            Products: []
        },
        extraReducers: (build) => {
            build.addCase(FetchProductsThunk.pending, (state) => {
                state.isLoading = true;
            }).addCase(FetchProductsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Products = action?.payload?.data
            }).addCase(FetchProductsThunk.rejected, (state) => {
                state.isLoading = false;
                state.Products = []
            })
        }
    }
)

export default ProductSlice.reducer;