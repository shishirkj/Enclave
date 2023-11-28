
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";



export default function App() {

 
  return (
    <Router>
      <div>
      
      

    
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        
      </div>
    </Router>
  );
}