
import {useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAsync,forgotPasswordAsync,loginAsync } from "./loginSlice";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../Loading.jsx/Loading'
import { useNavigate } from "react-router-dom";
import { passwordIsSent } from "./loginSlice";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false);
  const [form, setForm] = useState({name:'',email:'',password:'',avatar:'/profile_pic.png',avatarPreview:''});
  const [loginForm,setLoginForm] = useState({email:'',password:''});
  const dispatch = useDispatch();
  const history = useNavigate();

  const isAuthenticated = useSelector(state=>state.login.isAuthenticated)
  const loading = useSelector(state=>state.login.status)
  const {error,passwordSent} = useSelector(state=>state.login)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // eslint-disable-next-line no-unused-vars
  let name,value
 
const handleInputs=(e)=>{ 

name = e.target.name;
value = e.target.value;
//we spread the operator because if not and just directly change we only get that property and value
setForm({...form,[name]:value})
}


const handleLoginInputs=(e)=>{ 

  name = e.target.name;
  value = e.target.value;
  //we spread the operator because if not and just directly change we only get that property and value
  setLoginForm({...loginForm,[name]:value})
  }
  

const handleFileChange = (e) => {

  const file = e.target.files[0];
  setForm((prevForm) => ({ ...prevForm, avatar: file }));
  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
       //to handle async nature(safety)i didnt write setForm({...form,avatar:file})
      setForm((prevForm) => ({ ...prevForm, avatar:file, avatarPreview: reader.result }));
    };

    //to add the file/image in avatar and avatarpreview
    reader.readAsDataURL(file);
  }
};
  
  const registerUser = (e) => {
    e.preventDefault();
      const {name,password,email,avatar}=form;  
      if(name.length<=4)
      { 
        toast.error('Name should have more than 4 characters')
        
      }
      if(password.length<=8)
      { 
        toast.error('Password should be greater than 8 characters')
       return
      }
      if(email.length===0)
      { 
        toast.error('Please enter email')
        return
      }
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
    
      //to console myForm
      // for (var key of myForm.entries()) {
      //   console.log(key[0] + ', ' + key[1])
      // }
      dispatch(addAsync(myForm));
  };


const loginUser = (e)=>{ 
  e.preventDefault();
  const {email,password} = loginForm

      if(email.length===0)
      { 
        toast.error('Please enter email')
        return
      }
      if(password.length===0)
      { 
        toast.error('Please enter password')
        return
      }
  dispatch(loginAsync(loginForm));
  
}


//FOR FORGOT PASSWORD ERROR
useEffect(()=>{
  if(error)
  { 

    if(error==='Request failed with status code 404')
    
    toast.error('User not Found');

  }
  
  if(passwordSent)
  {
  dispatch(passwordIsSent())
toast.success("Password Link sent successfully")
  }
},[error,passwordSent,dispatch])


const forgotPassword=()=>{ 
const {email}= loginForm;

if(email.length===0)
{ 
  toast.error('Please enter email')
  return;
}


const myForm = new FormData();
myForm.set("email", email);

dispatch(forgotPasswordAsync(myForm))
setLoginForm({ ...loginForm, email: '' });
}




  return (
    <div>
      {
        isAuthenticated?history('/'):<>
        
        {loading==='loading'?<Loading/>:<>

{login ? (
    <>
      <section className="bg-white ">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md" onSubmit={loginUser}>
            <div className="flex justify-center mx-auto">
              <h1 className="text-5xl pb-7 font-extrabold underline font-fijila">
                <span className=" text-gray-900 ">Enc</span>
                <span className="text-blue-600">lave</span>
              </h1>
            </div>
            <h1 className="mt-3 text-2xl font-semibold font-fijila text-gray-800 capitalize sm:text-3xl ">
              sign In
            </h1>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email" name="email" onChange={handleLoginInputs}
                className="block w-full py-3 text-white bg-white border rounded-lg px-11 dark:bg-gray-900  dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
            </div>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"} name="password" onChange={handleLoginInputs}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
              <span className="absolute right-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.68 14.36A10.94 10.94 0 0112 16a10.94 10.94 0 01-5.68-1.64M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                    />
                  )}
                </svg>
              </span>
            </div>
            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign in
              </button>

              <div className="mt-6 text-center ">
                <a
                  onClick={() => setLogin(false)}
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400 cursor-pointer"
                >
                  Don’t have an account yet? Sign up
                </a>
              </div>
              <div className="mt-6 text-center ">
                <a onClick={forgotPassword} className="text-sm text-blue-500 hover:underline dark:text-blue-400 cursor-pointer">
                  Forgot Passsword ?
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  ) : (
    <>
      {" "}
      <section className="bg-white ">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form method="post" encType="multipart/form-data"  onSubmit={registerUser}  className="w-full max-w-md">
            <div className="flex justify-center mx-auto">
              <h1 className="text-5xl pb-7 font-extrabold underline font-fijila ">
                <span className=" text-gray-900 ">Envc</span>
                <span className="text-blue-600">lave</span>
              </h1>
            </div>
            <div className="flex items-center justify-center mt-6"></div>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                type="text" name='name'
                value={form.name}
                onChange={handleInputs}
                className="block w-full py-3 text-white bg-gray-900 rounded-lg px-11 dark:bg-gray-900 dark:text-white dark:border-gray-900 focus:border-gray-400 dark:focus:border-gray-900 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Username"
              />
            </div>

            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email" name='email'
                value={form.email}
                onChange={handleInputs}
                className="block w-full py-3 text-white bg-gray-900 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-900 focus:border-gray-900 dark:focus:border-gray-900 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
            </div>
            <label
              htmlFor="dropzone-file"
              className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <img
                              src={form.avatarPreview}
                              alt="avatar-preview"
                              className="w-16 h-16 mx-3 rounded-full object-cover"
                            />
              <h2 className="mx-3 text-gray-400">Profile Photo</h2>
              <input id="dropzone-file"  onChange={handleFileChange} name = 'avatar' type="file" accept="image" className="hidden" />
            </label>

            {/* Password input */}
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"} name='password'
                value={form.password}
                onChange={handleInputs}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
              <span className="absolute right-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.68 14.36A10.94 10.94 0 0112 16a10.94 10.94 0 01-5.68-1.64M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                    />
                  )}
                </svg>
              </span>
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign Up
              </button>
              <div className="mt-6 text-center ">
                <a
                  onClick={() => setLogin(true)}
                  className="text-MD text-blue-600 hover:underline cursor-pointer"
                >
                  Already have an account?
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )}
 


</>}


        </>
      }
   



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
   
    </div>
  );
}
