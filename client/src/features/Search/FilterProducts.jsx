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


export default function FilterProducts() {
  const dispatch = useDispatch();
  const {products,loading,error,productCount,resultPerPage} = useSelector((state) => state.product);
  const { key } = useParams() || "";
 

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error);
    }

    dispatch(fetchAsync({ key, currentPage }));
  }, [dispatch, error, key, currentPage]);

  function changePage(e) {
    setCurrentPage(e);
  }

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: true,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };
  
  return (
    <div>
      <div className="container flex flex-wrap justify-center ">
        {loading === "loading" ? (
          <Loading />
        ) : (
          <>
            {products &&
              products.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div className="relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md hover:translate-y-2 transition-all">
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
          </>
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

        
        </div> {/*end of container div */}
    </div> // end of return div
  );
}
