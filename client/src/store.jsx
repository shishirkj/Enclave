
import { configureStore } from "@reduxjs/toolkit";
import productReducer from  "./features/products/productSlice"
import productDetailsReducer from "./features/productDetails/productDetailsSlice"


const store = configureStore({reducer:{
    product:productReducer,
    productDetail:productDetailsReducer
}});

export default store;