
import { configureStore } from "@reduxjs/toolkit";
import productReducer from  "./features/products/productSlice"
import productDetailsReducer from "./features/productDetails/productDetailsSlice"
import loginReducer from "./components/authentication/loginSlice"

const store = configureStore({reducer:{
    product:productReducer,
    productDetail:productDetailsReducer,
    login:loginReducer
}});

export default store;