import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productApi';

const initialState = {
  products: [],
  status: 'idle',
  error:'',
  isSearchIconClicked:false
};


//action creator->fetchAsync
export const fetchAsync = createAsyncThunk(
  //action type->products/fetchProducts
  'products/fetchProducts',
  async () => {
    
      const response = await fetchProducts();
      return response.data.products;
  
  }
);


export const productSlice = createSlice({
  name: 'products',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleSearchIcon: (state) => {
      state.isSearchIconClicked = !state.isSearchIconClicked;
    },
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
        state.error = action.error.message
      });
  },
});

export const { toggleSearchIcon } = productSlice.actions;
// export const {} = productSlice.actions;
export default productSlice.reducer;
