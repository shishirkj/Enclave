import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register} from './loginApi';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  form: [],
  status: 'idle',
  error:'',
  isAuthenticated:false
};




export const addAsync = createAsyncThunk(
  'register/User',
  async (form) => {   
      const response = await register(form)
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
        state.isAuthenticated=false
      })
    .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.form=action.payload;
        state.isAuthenticated= true;
        state.error=''
      })
    .addCase(addAsync.rejected, (state, action) => {
        state.status = 'idle';
       
        if(action.error.message==='Request failed with status code 400')
        { 
         toast.error('user already registered')
        }
        
        state.isAuthenticated = false
      });
      
  },
});

<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>




export default loginSlice.reducer;
