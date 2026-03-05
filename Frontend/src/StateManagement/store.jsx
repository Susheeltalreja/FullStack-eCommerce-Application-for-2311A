import { configureStore } from "@reduxjs/toolkit"

import AuthSlice from './Authentication/Slice';

import BrandCategorySlice from "./AdminSlices/BrandCategorySlice";

import ProductSlice from "./AdminSlices/ProductSlice";

import UserProductSlice from "./UserSlices/UserProductSlice";

const store = configureStore({
    reducer: {
        Auth: AuthSlice,
        BrandCategory: BrandCategorySlice,
        Product: ProductSlice,
        UserProduct: UserProductSlice
    }
})

export default store;