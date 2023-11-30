import axios from "axios"


export default function fetchProductDetails(productId) {
  return  axios.get(`http://localhost:5000/api/v1/product/${productId}`)
}
