
import { configureStore } from "@reduxjs/toolkit";
import productReducer from  "./features/products/productSlice"
import productDetailsReducer from "./features/productDetails/productDetailsSlice"
import loginReducer from "./components/authentication/loginSlice"
import cartReducer from './features/cart/cartSlice'



const cartItemsFromStorage = localStorage.getItem("cartItems");
const shippingInfoFromStorage = localStorage.getItem('shippingInfo')

let cartItems,shippingInfo;

if (cartItemsFromStorage) {
  try {
    cartItems = JSON.parse(cartItemsFromStorage);
  } catch (error) {
    console.error("Error parsing cartItems from localStorage:", error);
  }
} else {
  cartItems = [];
}


if(shippingInfoFromStorage)
{ 
  try {
    shippingInfo = JSON.parse(shippingInfoFromStorage)
  } catch (error) {
    shippingInfo = {};
  }
}
const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailsReducer,
    login: loginReducer,
    cart: cartReducer
  },
  preloadedState: {
    cart: {
      cartItems,
      shippingInfo
    }
  }
});

export default store;