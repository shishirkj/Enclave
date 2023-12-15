
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
import UpdateProfile from "./components/profile/updateProfile";
import NoMatchFound from "./components/Route/NoMatchFound";
import UpdatePassword from "./components/profile/updatePassword";
 import ProtectedRoute from "./components/Route/ProtectedRoute";
import Loading from "./components/Loading.jsx/Loading";


export default function App() {
  const dispatch  = useDispatch()
  
  const isAuthenticated = useSelector(state=>state.login.isAuthenticated)



    useEffect(() => {

        dispatch(getUserDetailAsync());
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
  
  




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
             {/* <Route path= '/profile'  element = {<Profile/>}/> */}
            
              <Route path='/profile' element={<ProtectedRoute Component={Profile}/>}/>
              <Route path='/updateProfile' element={<ProtectedRoute Component={UpdateProfile}/>}/>
              <Route path='/updatePassword' element={<ProtectedRoute Component={UpdatePassword}/>}/>
              <Route path="/loading" element={ <Loading/>} /> 
          
          <Route path= '*'  element = {<NoMatchFound />}/>
            </Routes>
            {isAuthenticated?<Footer/>:''}  
     
      </div>
    </Router>

    
  );
}