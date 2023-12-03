import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register} from './loginApi';

const initialState = {
  form: [],
  status: 'idle',
  error:''
};




export const addAsync = createAsyncThunk(
  'register/User',
  async (form) => {
    console.log(form)
    const response = await register(form)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);






export const loginSlice = createSlice({
  name: 'login',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  
  },
  
  extraReducers: (builder) => {
    builder
    .addCase(addAsync.pending, (state) => {
        state.status = 'loading';
      })
    .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.form.push(action.payload);
      })
    .addCase(addAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message
      });
      
  },
});


export default loginSlice.reducer;
