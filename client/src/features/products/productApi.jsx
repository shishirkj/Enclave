import axios from "axios"

// A mock function to mimic making an async request for data
export function fetchProducts(key='') {
  return  axios.get(`http://localhost:5000/api/v1/products?key=${key}`)
}
