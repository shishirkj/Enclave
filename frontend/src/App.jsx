
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./components/Loading/Loading";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import NavBar from "./components/navbar/NavBar";


export default function App() {

const loading = useSelector(state=>state.product.loading)
  return (
    <Router>
      <div>
      
     { loading==="true"?<Loading/>:(
      <>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
            </>
        )
     }
      </div>
    </Router>
  );
}