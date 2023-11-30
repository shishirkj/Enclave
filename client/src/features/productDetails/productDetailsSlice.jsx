import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchProductDetails from './productDetailsApi';

const initialState = {
  productDetails:{},
  status: 'idle',
  error:''
};

//action creator->fetchAsync
export const fetchAsync = createAsyncThunk(
  //action type->products/fetchProductDetails
  'productDetails/fetchProductDetails',
  async (productId) => { 
    const response = await fetchProductDetails(productId);
    return response.data.product; 
    
  }
);


export const productDetailsSlice = createSlice({
  name: 'productDetails',
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
        console.log()
        state.productDetails = action.payload;
      })
      .addCase(fetchAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message
      });
  },
});

// export const {} = productSlice.actions;
export default productDetailsSlice.reducer;
