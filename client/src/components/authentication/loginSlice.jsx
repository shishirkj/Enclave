import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register,login, getUserDetail,logout} from './loginApi';
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


export const loginAsync = createAsyncThunk(
  'login/User',
  async (loginForm) => {   
      const response = await login(loginForm)
      return response.data;

  }
);


export const getUserDetailAsync = createAsyncThunk(
  'getUserDtail/User',
  async () => {   
      const response = await getUserDetail()
      return response.data;
  }
);

  //we use logout api to remove cookies from application
export const logoutAsync = createAsyncThunk(
  'logout/User',
  async () => {   
      const response = await logout()
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
    //register reducers
    .addCase(addAsync.pending, (state) => {
        state.status = 'loading';
        state.isAuthenticated=false;
        state.error = ''
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
      })

      //login reducers
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.isAuthenticated=false;
        state.error=''
      })
    .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';   
        state.form=action.payload;
        state.isAuthenticated= true;
        state.error=''
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'idle';   
        state.form=action.payload;
        if(action.error.message==='Request failed with status code 401')
        { 
         toast.error('Invalid Email or Password')
        }
        state.isAuthenticated= false;
        state.error=''
      })

      //getUserDetails reducers
      .addCase(getUserDetailAsync.pending, (state) => {
        state.status = 'loading';
        state.isAuthenticated=false;
        state.error=''
      })
    .addCase(getUserDetailAsync.fulfilled, (state, action) => {
        state.status = 'idle';   
        state.form=action.payload;
        state.isAuthenticated= true;
        state.error=''
      })
      .addCase(getUserDetailAsync.rejected, (state, action) => {
        state.status = 'idle';   
        state.error=action.error.message;
        state.isAuthenticated= false;
      
      })

      //logout reducers
      //we use logout api to remove cookies from application
      .addCase(logoutAsync.pending, (state) => {
        state.status = 'loading';
        state.isAuthenticated=false;
        state.error=''
      })
    .addCase(logoutAsync.fulfilled, (state) => {
        state.status = 'idle';   
        state.form=null;
        state.isAuthenticated= true;
        state.error=''
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = 'idle';   
        state.error=action.error.message;
        state.isAuthenticated= false;
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
