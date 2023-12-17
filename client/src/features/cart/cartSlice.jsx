import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchProductDetails from '../productDetails/productDetailsApi';

const initialState = {
  cartItems: [],
  status: 'idle',
  error:'',
showFooter:true
};



//add item to cart
export const addAsync = createAsyncThunk(
  'cart/addItems',
  async ({productId,quantity},thunkAPI) => {
    let response = await fetchProductDetails(productId);
    const {product}=response.data;
    const {name,_id,price,images,Stock} = product;
    //only send one image to cart
    const image = images[0].url;

    response ={name,_id,price,image,Stock,quantity}
    const currentState = thunkAPI.getState();

    // Save to localStorage using the current state
    localStorage.setItem("cartItems", JSON.stringify(currentState.cart.cartItems));
    return response   
  }
);



//delete item from cart
export const deleteAsync = createAsyncThunk(
  'cart/deleteItems',
  async ({productId}) => {
    console.log(productId)
    let response =productId
    return response   
  }
);








export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  extraReducers: (builder) => {
    builder
     
      .addCase(addAsync.pending, (state) => {
        state.status = 'loading';
        state.error='';
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        const newItem = action.payload;

        const existingItemIndex = state.cartItems.findIndex(
          (i) => i._id === newItem._id
        );
  
        if (existingItemIndex !== -1) {
          // If the item already exists, replace it with the new item
          state.cartItems[existingItemIndex] = newItem;
        } else {
          // If the item doesn't exist, add it to cartItems
          state.cartItems.push(newItem);
        }
  
        // Saveing the updated cartItems to localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        state.error=''
      })
      .addCase(addAsync.rejected, (state,action) => {
        state.status = 'idle';
        state.cartItems = '';
        state.error = action.error.message;
      })

      //deleteAsync
      .addCase(deleteAsync.pending, (state) => {
        state.status = 'loading';
        state.error='';
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        const deletedItemId = action.payload;
          console.log(deletedItemId)
       state.cartItems= state.cartItems.filter(
          (i) => i._id !== deletedItemId
        );
        
        // Saveing the updated cartItems to localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        state.error=''
      })
      .addCase(deleteAsync.rejected, (state,action) => {
        state.status = 'idle';
        state.cartItems =[];
        state.error = action.error.message;
      })
     

  },
});


export default cartSlice.reducer;
