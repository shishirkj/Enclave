import axios from "axios"

export  function fetchProducts(){ 
    return  axios.get("http://localhost:5000/api/v1/products")
}