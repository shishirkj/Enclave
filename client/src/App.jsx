
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import ProductDetails from "./features/productDetails/ProductDetails";
import Search from "./features/Search/Search";
import FilterProducts from "./features/Search/FilterProducts";
import Category from './features/Search/Category'
import Login from "./components/authentication/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetailAsync } from "./components/authentication/loginSlice";
import Profile from "./components/profile/Profile";


export default function App() {

  const isAuthenticated = useSelector(state=>state.login.isAuthenticated)


const dispatch  = useDispatch()


  useEffect(()=>{ 

      dispatch(getUserDetailAsync())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
  
    <Router>
      <div className="overflow-x-hidden">
      
      
    <Search/>
           {isAuthenticated?<NavBar/>:''}
            <Routes>   
              <Route path="/" element={<Home />} />
             <Route path="/product/:productId" element={<ProductDetails />}/>
              < Route path = "/products/product/:productId" element = {<ProductDetails/>}/>
              {/* on click to products */}
              <Route path="/products" element = {<FilterProducts/>} />  
              <Route path="/products/:key" element = {<FilterProducts/>} />  
              <Route path = '/category' element = {<Category/>}/>  
              <Route path= '/login'  element = {<Login/>}/>  
              <Route path= '/profile'  element = {<Profile/>}/>  
            </Routes>
            {isAuthenticated?<Footer/>:''}         
      </div>
    </Router>
    
  );
}