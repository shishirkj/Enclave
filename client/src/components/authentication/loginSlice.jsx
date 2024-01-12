import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  getUserDetail,
  logout,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword
} from "./loginApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





const initialState = {
  form: [],
  status: "idle",
  error: "",
  userError:'',
  isAuthenticated: false,
  isUpdated: false,
  passwordSent:false,
  success:false
};




//APIS


//registerAsync
export const addAsync = createAsyncThunk("register/User", async (form) => {
  const response = await register(form);
  return response.data;
});

//loginAsync
export const loginAsync = createAsyncThunk("login/User", async (loginForm) => {
  const response = await login(loginForm);
  return response.data;
});

// userDetailAsync
//to handle on reload dataso in redux state isnt empty(in App.jsx)
export const getUserDetailAsync = createAsyncThunk(
  "getUserDtail/User",
  async () => {
    const response = await getUserDetail();
    return response.data;
  }
);



//logutAsync
//we use logout api to remove cookies from application
export const logoutAsync = createAsyncThunk("logout/User", async () => {
  const response = await logout();
  return response.data;
});



//updateProfileAsync
export const updateProfileAsync = createAsyncThunk(
  "updateProfile/User",
  async (form) => {
    const response = await updateProfile(form);
    return response.data;
  }
);



//updatePasswordAsync

export const updatePasswordAsync = createAsyncThunk(
  "updatePassword/User",
  async (form) => {
    const response = await updatePassword(form);
    return response.data;
  }
);



//forgotPasswordAsync
export const forgotPasswordAsync = createAsyncThunk(
  "forgotPassword/User",
  async (form) => {
    const response = await forgotPassword(form);
    return response.data;
  }
);


//resetPasswordAsync
//form and token in parametershld be a single object in parameter
export const resetPasswordAsync = createAsyncThunk(
  "resetPassword/User",
  async ({token,form}) => {
    const response = await resetPassword(token,form);
    return response.data;
  }
);




export const loginSlice = createSlice({
  name: "login",
  initialState,


  //reducers
  reducers: {
    resetIsUpdated: (state) => {
      state.isUpdated = false;
    },
    passwordIsSent: (state) => {
      state.passwordSent = false;
    },
    // success reducer is used in resetPassword when password is changed
    isSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      //register reducers
      .addCase(addAsync.pending, (state) => {
        state.status = "loading";
        state.isAuthenticated = false;
        state.error = "";
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.form = action.payload;
        state.isAuthenticated = true;
        state.error = "";
      })
      .addCase(addAsync.rejected, (state, action) => {
        state.status = "idle";

        if (action.error.message === "Request failed with status code 400") {
          toast.error("user already registered");
        }

        state.isAuthenticated = false;
      })

      //login reducers
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
        state.isAuthenticated = false;
        state.error = "";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.form = action.payload;
        state.isAuthenticated = true;
        state.error = "";
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "idle";
        state.form = action.payload;
        if (action.error.message === "Request failed with status code 401") {
          toast.error("Invalid Email or Password");
        }
        state.isAuthenticated = false;
        state.error = "";
      })

      //getUserDetails reducers
      .addCase(getUserDetailAsync.pending, (state) => {
        state.form = "";
        state.status = "loading";
        state.error = "";
      })
      .addCase(getUserDetailAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.form = action.payload;
        state.isAuthenticated = true;
        state.error = "";
      })
      .addCase(getUserDetailAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userError = action.error.message;
        state.isAuthenticated = false;
      })

      //logout reducers
      //we use logout api to remove cookies from application
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading";
        state.isAuthenticated = false;
        state.error = "";
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = "idle";
        state.form = "";
        state.isAuthenticated = false;
        state.error = "";
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = "idle";

        state.error = action.error.message;

        state.isAuthenticated = false;
      })

      //updateProfile reducers
      .addCase(updateProfileAsync.pending, (state) => {
        state.status = "loading";
        state.isAuthenticated = true;
        state.error = "";
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.form = action.payload;
        state.isAuthenticated = true;
        state.error = "";
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
        state.isAuthenticated = false;
      })

      // update password
      .addCase(updatePasswordAsync.pending, (state) => {
        state.status = "loading";
        state.isAuthenticated = true;
        state.error = "";
        state.isUpdated = false;
      })
      .addCase(updatePasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.form = action.payload;
        state.isAuthenticated = true;
        state.error = "";
        state.isUpdated = true;
      })
      .addCase(updatePasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.isUpdated = "false";
        state.form = "";
        state.error = action.error.message;
      })

      //forgot password
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = "loading";
        state.isAuthenticated = false;
        state.error = "";
       
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.form = action.payload;
        state.isAuthenticated = false;
        state.error = "";
        state.passwordSent=true
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.form = "";
        state.error = action.error.message;
        
      })

       //reset password
       .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
        state.isAuthenticated = false;
        state.error = "";
       
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.form = action.payload;
        state.isAuthenticated = false;
        state.error = "";
        state.success = true
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.form = "";
        state.success = false;
        state.error = action.error.message;
        
      })
  },
});



<ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>;

export const { resetIsUpdated,passwordIsSent,isSuccess} = loginSlice.actions;
export default loginSlice.reducer;
