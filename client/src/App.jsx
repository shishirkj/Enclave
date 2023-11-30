
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";
import ProductDetails from "./features/productDetails/ProductDetails";
import Search from "./features/Search/Search";
import FilterProducts from "./features/Search/FilterProducts";



export default function App() {

 
  return (
    <Router>
      <div className="overflow-x-hidden">
      
      

    
            <NavBar />
            <Search/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:productId" element={<ProductDetails />}/>
              <Route path="/products" element = {<FilterProducts/>} />  
              <Route path="/products/:key" element = {<FilterProducts/>} />            
            </Routes>
    
      </div>
    </Router>
  );
}