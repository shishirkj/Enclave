import axios from "axios"


export default function fetchProductDetails(productId) {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  };
  return  axios.get(`http://localhost:5000/api/v1/product/${productId}`,config)
}
