import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productApi';

const initialState = {
  products: [],
  status: 'idle',
  error:'',
  isSearchIconClicked:false,
  productCount:0,
  resultPerPage:0
};


//action creator->fetchAsync
export const fetchAsync = createAsyncThunk(
  //action type->products/fetchProducts
  'products/fetchProducts',
  // u have to send it like an object in parameters
  async ({key='',currentPage,selectedCategory='',price=[0,25000]}) => { 
      const response = await fetchProducts(key,currentPage,selectedCategory,price);
      return response.data;
  
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
        state.products = action.payload.products;
        state.productCount = action.payload.productCount,
        state.resultPerPage = action.payload.resultPerPage
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
