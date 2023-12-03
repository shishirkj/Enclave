import axios from "axios"

// A mock function to mimic making an async request for data
export function fetchProducts(key='',currentPage=1,selectedCategory='',price=[0,25000]) {
  const categoryParam = selectedCategory !== '' ? `&category=${selectedCategory}` : '';
 console.log(price)
  return  axios.get(`http://localhost:5000/api/v1/products?key=${key}&page=${currentPage}${categoryParam}&price[gte]=${price[0]}&price[lte]=${price[1]}`)
}
