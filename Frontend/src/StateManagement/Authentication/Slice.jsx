import axios from "axios";

import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isAuth: false,
    User: {},
    AuthLoad : false
}

export const UserRegister = createAsyncThunk(
    "/auth/UserRegister",
    async(FormData) => {
        const response = await axios.post("http://localhost:5000/auth/register", FormData);
        return response?.data
    }
)

export const UserLogin = createAsyncThunk(
    "/auth/UserLogin",
    async(FormData) => {
        const result = await axios.post("http://localhost:5000/auth/login", FormData, {
            withCredentials: true
        });
        return result?.data;
    }
)

export const ReturnUser = createAsyncThunk(
    "/auth/ReturnUser",
    async() => {
        const response = await axios.get("http://localhost:5000/auth/return", {
            withCredentials: true
        })
        return response?.data;
    }
)

export const LogoutUser = createAsyncThunk(
    "/auth/LogoutUser",
    async () => {
        const response = await axios.post("http://localhost:5000/auth/logout", {}, {
            withCredentials: true
        })
        return response?.data;
    }
)

export const otpVerifyThunk = createAsyncThunk(
    "/auth/otpVerifyThunk",
    async(OtpData) => {
        const response = await axios.post("http://localhost:5000/auth/otp-verify", OtpData);
        return response?.data;
    }
)

export const regenaretOtpThunk = createAsyncThunk(
    "/auth/regenaretOtpThunk",
    async(email) => {
        const response = await axios.post("http://localhost:5000/auth/regenrate-otp", email);
        return response?.data;
    }
)

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState,
    extraReducers: (build) => {
        build.addCase(UserLogin.pending, (state) => {
            state.isLoading = true;
        }).addCase(UserLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = action?.payload?.success;
            state.User = action?.payload?.User;
        }).addCase(UserLogin.rejected, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.User = {};
        }).addCase(ReturnUser.pending, (state) => {
            state.isLoading = true;
            state.AuthLoad = false;
        }).addCase(ReturnUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = action?.payload?.success;
            state.User = action?.payload?.UserData;
            state.AuthLoad = true;
        }).addCase(ReturnUser.rejected, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.User = {};
            state.AuthLoad = true;
        }).addCase(LogoutUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(LogoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.User = {}
        }).addCase(LogoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = action?.payload?.success;
            state.User = action?.payload?.UserData;
        })
    }
})

export default AuthSlice.reducer;