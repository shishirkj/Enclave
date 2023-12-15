import { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch,useSelector } from "react-redux";
import { updatePasswordAsync } from "../authentication/loginSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { resetIsUpdated } from "../authentication/loginSlice";

 export default  function UpdatePassword() {
  
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({password:'',newPassword:'',confirmPassword:''});  
  
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

let name,value

  const handleInputs=(e)=>{ 

    name = e.target.name;
    value = e.target.value;
    //we spread the operator because if not and just directly change we only get that property and value
    setForm((prevForm)=>({...prevForm,[name]:value}))
    }

    const{error,isUpdated} = useSelector(state=>state.login);
   

    useEffect(() => {
  
      if (error === "Request failed with status code 401") {
        toast.error('wrong old password');
        return;
      }
 
       if(isUpdated)
       {
         dispatch(resetIsUpdated())
      toast.success('password updated')
      navigate('/profile')
       }

    }, [error,navigate,isUpdated,dispatch]);


  const confirmPassword = (e) => {
    e.preventDefault();
      const {password,newPassword,confirmPassword}=form;  
     
      
      if(password.length<=8)
      { 
        toast.error('Password should be greater than 8 characters')
       return;
      }
      if((newPassword.length)<=8)
      { 
        toast.error('newPassword should be greater than 8 characters')
       return;
      }
      

      // Check if newPassword and confirmPassword match
  if (newPassword !== confirmPassword) {
    toast.error('New password and confirm password do not match');
    return;
  }


      const myForm = new FormData();

      myForm.set("password", password);
      myForm.set("newPassword", newPassword);
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
      

      dispatch(updatePasswordAsync(myForm))
      
  };



  return (
    <div> 
      
   <section className="bg-white ">
    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">

      {/* FORM */}
      <form onSubmit={confirmPassword} className="w-full max-w-md" >
        <div className="flex justify-center mx-auto">
          <h1 className="text-5xl pb-7 font-extrabold underline">
            <span className=" text-gray-900 ">Envc</span>
            <span className="text-blue-600">lave</span>
          </h1>
        </div>

        {/* Old password input */}
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleInputs}
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Old Password"
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


        {/* New password input */}
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
            type={showPassword ? "text" : "password"}value={form.newPassword} name="newPassword" onChange={handleInputs} 
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="New Password"
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


        {/* Confirm Password input */}
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
            type={showPassword ? "text" : "password"}value={form.confirmPassword} name="confirmPassword" onChange={handleInputs}
            className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Confirm Password"
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
            Update Password
          </button>
        </div>
      </form>
    </div>
  </section>


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
  )
}
