import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
  error:''
};

//action creator->fetchAsync
export const fetchAsync = createAsyncThunk(
  //action type->products/fetchProducts
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data.products;
  }
);


export const productSlice = createSlice({
  name: 'products',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  
  },
  

  //reducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error=action.error.message;
      });
  },
});

// export const {} = productSlice.actions;
export default productSlice.reducer;
