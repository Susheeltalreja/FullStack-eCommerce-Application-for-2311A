import { configureStore } from "@reduxjs/toolkit"

import AuthSlice from './Authentication/Slice';

import BrandCategorySlice from "./AdminSlices/BrandCategorySlice";

import ProductSlice from "./AdminSlices/ProductSlice";

import UserProductSlice from "./UserSlices/UserProductSlice";

import CartSlice from "./UserSlices/CartSlice";

const store = configureStore({
    reducer: {
        Auth: AuthSlice,
        BrandCategory: BrandCategorySlice,
        Product: ProductSlice,
        UserProduct: UserProductSlice,
        Cart: CartSlice
    }
})

export default store;