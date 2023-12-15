import axios from "axios"


//register api
export function register(form) {

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
    withCredentials: true,
  };

  return axios.post('http://localhost:5000/api/v1/user', form, config);
}
  


  //login api
  export function login(loginForm) {
    JSON.stringify(loginForm);
    return  axios.post('http://localhost:5000/api/v1/login',loginForm,{
    headers:{'Content-Type':'application/json'},
    withCredentials: true})
  }
  


  //get user details
  export function getUserDetail() {   
     
    return  axios.get(' http://localhost:5000/api/v1/me',{
    headers:{'Content-Type':'application/json'},
    withCredentials: true})
  }


  //we use logout api to remove cookies from application
  export function logout() {    
    return  axios.get(' http://localhost:5000/api/v1/logout',{
    headers:{'Content-Type':'application/json'},
    withCredentials: true})
  }




  //updateProfile api
export  function  updateProfile(form) {

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
    },
    withCredentials: true,
  };

  return axios.put('http://localhost:5000/api/v1/me/update', form, config);
}
  

//updatePassword api
export  function  updatePassword(form) {

  const config = {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  };
  
  return axios.put('http://localhost:5000/api/v1/me/password', form, config);
}
  


//forgot password api
export function forgotPassword(form)
{ 
  const config = { 
    headers:{ 
      "Content-type":"application/json",
    },
    withCredentials: true,
  };

  return axios.post('http://localhost:5000/api/v1/password/forgot',form,config)
}



//reset Password api
export  function  resetPassword(token,form) {

  const config = {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  };
  
  return axios.put(`http://localhost:5000/api/v1/password/reset/${token}`, form, config);
}