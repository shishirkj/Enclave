import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getOrders from './orderApi';

const initialState = {
  orderDetails:[],
  status: 'idle',
  error:''
};



//action creator->fetchOrder
export const fetchOrder = createAsyncThunk(
  //action type->orders/orderDetails
  'order/fetchOrderDetails',
  async () => { 
    const response = await getOrders();
    console.log(response)
    return response
  }
);



export const orderDetailSlices = createSlice({
    name: 'productDetails',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
    
    },
    
  //reducers
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
       
        state.status = 'idle';
       
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message
      });
  }
})

// export const {} = productSlice.actions;
export default orderDetailSlices.reducer;
