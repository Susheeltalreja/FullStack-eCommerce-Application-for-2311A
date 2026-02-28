import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    Brands: [],
    Category: []
}
// Brand thunks
export const AddBrandThunk = createAsyncThunk(
    "/brand/AddBrandThunk",
    async(data) => {
        const response = await axios.post("http://localhost:5000/cb/add-brand", data, {
            withCredentials: true
        });
        return response?.data;
    }
)

export const FetchBrandThunk = createAsyncThunk(
    "/brand/FetchBrandThunk",
    async() => {
        const response = await axios.get("http://localhost:5000/cb/get-brand");
        return response?.data;
    }
);

export const UpdateBrandThunk = createAsyncThunk(
    "/brand/UpdateBrandThunk",
    async({id, data}) => {
        const response = await axios.put(`http://localhost:5000/cb/update-brand/${id}`, data, {
            withCredentials: true
        });
        return response?.data;
    }
)

export const DeleteBrandThunk = createAsyncThunk(
    "/brand/DeleteBrandThunk",
    async(id) => {
        const response = await axios.delete(`http://localhost:5000/cb/delete-brand/${id}`, {
            withCredentials: true
        });
        return response?.data;
    }
)

// Category Thunk
export const AddCategoryThunk = createAsyncThunk(
    "/Category/AddCategoryThunk",
    async(data) => {
        const response = await axios.post("http://localhost:5000/cb/add-category", data, {
            withCredentials: true
        });
        return response?.data;
    }
)

export const FetchCategoryThunk = createAsyncThunk(
    "/Category/FetchCategoryThunk",
    async() => {
        const response = await axios.get("http://localhost:5000/cb/get-category");
        return response?.data;
    }
)
export const UpdateCategoryThunk = createAsyncThunk(
    "/brand/UpdateCategoryThunk",
    async({id, data}) => {
        const response = await axios.put(`http://localhost:5000/cb/update-category/${id}`, data, {
            withCredentials: true
        });
        return response?.data;
    }
)

export const DeleteCategoryThunk = createAsyncThunk(
    "/brand/DeleteCategoryThunk",
    async(id) => {
        const response = await axios.delete(`http://localhost:5000/cb/delete-category/${id}`, {
            withCredentials: true
        });
        return response?.data;
    }
)

const BrandCategorySlice = createSlice({
    name: "BrandCategorySlice",
    initialState,
    extraReducers : (build) => {
        build.addCase(FetchBrandThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(FetchBrandThunk.fulfilled, (state, action) => {
            // console.log("Action: ", action)
            state.isLoading = false;
            state.Brands = action?.payload?.data;
        }).addCase(FetchBrandThunk.rejected, (state) => {
            state.isLoading = false;
            state.Brands = [];
        }).addCase(FetchCategoryThunk.pending, (state) => {
            state.isLoading = true;
        }).addCase(FetchCategoryThunk.fulfilled, (state, action) => {
            // console.log("Action: ", action)
            state.isLoading = false;
            state.Category = action?.payload?.data
        }).addCase(FetchCategoryThunk.rejected, (state) => {
            state.isLoading = false;
            state.Category = [];
        })
    }
})

export default BrandCategorySlice.reducer;