import { configureStore } from "@reduxjs/toolkit"

import AuthSlice from './Authentication/Slice';

import BrandCategorySlice from "./AdminSlices/BrandCategorySlice";

import ProductSlice from "./AdminSlices/ProductSlice";

const store = configureStore({
    reducer: {
        Auth: AuthSlice,
        BrandCategory: BrandCategorySlice,
        Product: ProductSlice
    }
})

export default store;