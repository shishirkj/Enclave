
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import ProductDetails from "./features/productDetails/ProductDetails";
import Search from "./features/Search/Search";
import FilterProducts from "./features/Search/FilterProducts";
import Category from './features/Search/Category'
import Login from "./components/authentication/Login";
import { useState } from "react";
export default function App() {

  const [check,setCheck] = useState(false)
 
  return (
    <Router>
      <div className="overflow-x-hidden">
      
      
      {check?(<><Search/>
            <NavBar/>
            <Routes>   
              <Route path="/" element={<Home />} />
              <Route path="/product/:productId" element={<ProductDetails />}/>
              < Route path = "/products/product/:productId" element = {<ProductDetails/>}/>
              <Route path="/products" element = {<FilterProducts/>} />  
              <Route path="/products/:key" element = {<FilterProducts/>} />  
              <Route path = '/category' element = {<Category/>}/>       
            </Routes>
            <Footer/>
   </> ):
   <>
    <Login/>
    </>
   }


            
      </div>
    </Router>
  );
}