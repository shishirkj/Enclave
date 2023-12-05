import axios from "axios"


export function register(form) {
    JSON.stringify(form);
    return  axios.post('http://localhost:5000/api/v1/user',form,{
    headers:{'Content-Type':'application/json'}})
  }
  