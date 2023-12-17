import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAsync } from "../products/productSlice";
import ReactStar from "react-rating-stars-component";
import Loading from "../../components/Loading.jsx/Loading";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import 'rc-slider/assets/index.css';




export default function Category() {
    const dispatch = useDispatch();
    const {products,status,error,productCount,resultPerPage} = useSelector((state) => state.product);
    //by this when we click card we get the param and use it to show searched product using search box
    const { key } = useParams() || "";
  
    const [currentPage, setCurrentPage] = useState(1);
    const [price,setPrice] = useState([0,25000])
    let [selectedCategory, setSelectedCategory] = useState('');
    
    useEffect(() => {
      if (error) {
        console.log(error);
        toast.error(error);
      }
        
      dispatch(fetchAsync({ key, currentPage,...(selectedCategory !== '' && { selectedCategory }),price}));
    }, [dispatch, error, key, currentPage,selectedCategory,price]);
  
    function changePage(e) {
      setCurrentPage(e);
    }
    const handleSliderChange=(value)=>{ 
      // value = e
     
        setPrice([value,25000])
        
    }
  
    const options = {
      edit: false,
      color: "rgba(20,20,20,0.1)",
      activeColor: "tomato",
      value: true,
      isHalf: true,
      size: window.innerWidth < 600 ? 20 : 25,
    };
    
  const categories = ["Laptop", "Phone", "Footwear", "Camera", "Bottom"];
  const handleCheckboxChange = (category) => {
    // If the clicked checkbox is already selected, unselect it
    // Otherwise, select it and unselect others
    setSelectedCategory((prev) => (prev === category ? '' : category));
  };

 

  return (
    <div>
        <div className='flex  md:h-[2000px]'>
      <div className="relative w-1/5 bg-gray-900 ">
  
  <p className=" mt-7 mb-2 text-xs md:text-sm lg:text-lg xl:text-base lg:pl-5 md:pl-2 text-white font-roboto">Price Range</p>

  <Slider className=" ml-2 mb-4  w-[4rem]  lg:w-[9rem]" 
   min={0}
   max={25000}
   step={1}
   onChange={handleSliderChange} 
   valueLabelDisplay="on"
   getAriaValueText={(value) => {
    return `Value: ${value}`;
  }}
   />


        {categories.map((category, index) => (
          <div className="p-2 py-4" key={index}>
            
            <label className="   flex items-center space-x-1">
            <input
                  onChange={() => handleCheckboxChange(category)}
                  checked={selectedCategory === category}
                  type="checkbox"
                  className="text-white"
                  disabled={selectedCategory && selectedCategory !== category}
                />
              <span className=" pr-3 font-bold text-roberto text-xs md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl text-white">{category}</span>
            </label>
          </div>

        ))}
     
      </div>
      {status === "loading" ? (
          <Loading />
        ) : (
          <>
          <div className= 'relative h-screen flex flex-wrap justify-center w-4/5 md:flex md:flex-wrap md:justify-center  '>
            {products &&
              products.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div className="relative m-10 w-100 max-w-xs overflow-hidden rounded-lg bg-white shadow-md hover:translate-y-2 transition-all">
                    <img
                      className="h-60 rounded-t-lg object-cover"
                      src={product.images[0].url}
                      alt={product.name}
                    />
                    <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
                      Sale
                    </span>
                    <div className="mt-4 px-5 pb-5">
                      <h5 className="text-xl font-semibold tracking-tight text-slate-900">
                        {product.name}
                      </h5>
                      <div className="mt-2.5 mb-5 flex items-center">
                        <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                          {product.ratings}
                        </span>
                        <ReactStar
                          className=""
                          edit={options.edit}
                          color={options.color}
                          activeColor={options.activeColor}
                          value={product.ratings}
                          isHalf={options.isHalf}
                          size={options.size}
                        ></ReactStar>
                        <p className="  ml-7 text-sm bg-amber-200 text-stone-900 rounded-full px-1">{`Total Reviews:${product.numOfReviews}`}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p>
                          <span className="text-3xl font-bold text-slate-900">
                            {`₹${product.price}`}
                          </span>
                          <span className="text-sm text-slate-900 line-through">{`₹${
                            product.price + 500
                          }`}</span>
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Add to cart
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              </div>
          </>//end of image card 
        )}
</div>
<ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
  <div className="flex justify-center  m-7 ">
      
      {resultPerPage<productCount &&  
      <Pagination
      activePage={currentPage}
      itemsCountPerPage={resultPerPage}
      totalItemsCount={productCount}
      onChange={changePage}
      itemClass="relative inline-block px-3 py-2 leading-5 border rounded-md bg-gray-800 border-gray-800 text-white text-lg font-medium hover:bg-gray-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-900 transition duration-150 ease-in-out m-[2px]"
      activeClass="z-10 bg-gray-800 text-white border-blue-500 hover:bg-gray-500"
      
    />} 

       </div> 
    </div>
  );
}
