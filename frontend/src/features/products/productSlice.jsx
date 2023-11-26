import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "./productApi";

const initialState = {
  products: [],
  loading: "false",
  error: '',
  productsFetched: false
};

export const fetchAsync = createAsyncThunk('products/fetchProducts', async () => {
try{
    const response = await fetchProducts();
    return response.data.products;
}
catch(error){
  console.log(error.message)
}
  
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        
        state.loading = "true";
        console.log("Pending: Loading is true");
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.loading ="false";
        console.log("Fulfilled: Loading is false");
        state.products = action.payload;
        state.productsFetched = "true";
      })
      .addCase(fetchAsync.rejected, (state, action) => {
        state.loading = "false";
        state.error = action.error.message;
      });
  }
});

export default productSlice.reducer;