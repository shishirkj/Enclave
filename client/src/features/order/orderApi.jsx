import axios from "axios";


export default function getOrders() {
   
    return  axios.get("http://localhost:5000/api/v1/orders/me",)
  }
  