import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { toggleSearchIcon } from "../../features/products/productSlice";
import { logoutAsync } from "../authentication/loginSlice";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";


export default function NavBar() {
const dispatch = useDispatch();
let isSearchIconClicked = useSelector(state=>state.product.isSearchIconClicked)
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useNavigate();


const toggleSearch = ()=>{ 
 dispatch(toggleSearchIcon())
}

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
  // Close the search when opening the menu
  isSearchIconClicked(false);
};

const logout = () => {
  dispatch(logoutAsync());
  
  const path='/login'
    history(path);
    
};

const profile = ()=>{ 
  const path = '/profile'
  history(path)
}



  return (
    <>
  

      <section className="relative mx-auto">
        {/* navbar */}
        <nav className=" flex  justify-between bg-gray-900 text-white w-screen">
          <div className="px-5 xl:px-12 py-6 flex w-full items-center ">
            <Link to = '/' className="text-3xl font-bold font-heading font-fijila" >
              Enclave
            </Link>
            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <Link to = "/" className="hover:text-gray-200 font-fijila">
                  Home
                </Link>
              </li>
              <li>
              <Link to = '/category' className="hover:text-gray-200 font-fijila">Category</Link>
              </li>
              <li>
                <Link to = '/products' className="hover:text-gray-200 font-fijila" >
                  Products
                </Link>
              </li>
              <li>
                <a className="hover:text-gray-200 font-fijila" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
            {/* Header Icons */}
            {/* search bar */}
            <div className="hidden xl:flex  space-x-5 items-center">
              <div onClick={toggleSearch} className="hover:text-gray-200" >
              <svg
  xmlns="http://www.w3.org/2000/svg"
  height={20}
  width={20}
  viewBox="0 0 512 512"
>
  <path
    fill="#ffffff"
    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
  />
</svg>



              </div>
              {/* cart icon */}
              <Link to={'/cart'} className="flex items-center hover:text-gray-200" >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </Link>
              {/* Profile  */}
              <a onClick = {profile} className="flex items-center hover:text-gray-200" >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
              
              {/* logout icon */}
              <a  onClick={logout} className="flex items-center hover:text-gray-200"  >      
              <svg
  xmlns="http://www.w3.org/2000/svg"
  height={16}
  width={16}
  viewBox="0 0 512 512"
>
  <path
    fill="#ffffff"
    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
  />
</svg>

          </a>
            </div>
          </div>
          
          {/* Responsive navbar */}
          
          {/* cart icon */}
          <Link to={'/cart'} className="xl:hidden flex mr-6 items-center" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="flex absolute -mt-5 ml-4">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </Link>
          {/* search logo */}
          <div onClick={toggleSearch} className=" cursor-pointer xl:hidden flex mr-6 items-center" >
          <svg
  xmlns="http://www.w3.org/2000/svg"
  height={20}
  width={20}
  viewBox="0 0 512 512"
>
  <path
    fill="#ffffff"
    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
  />
</svg>

              </div>
              
              {/* profile logo */}
              <a onClick = {()=>{history('/profile')}} className=" xl:hidden flex items-center hover:text-gray-200" >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
              {/* logout icon */}
              <a  onClick={logout} className="  xl:hidden ml-3 flex items-center hover:text-gray-200" >
              <svg
  xmlns="http://www.w3.org/2000/svg"
  height={16}
  width={16}
  viewBox="0 0 512 512"
>
  <path
    fill="#ffffff"
    d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
  />
</svg>

          </a>


        {/* search icon */}
          <a onClick = {toggleMenu}  className="navbar-burger self-center  ml-4 mr-12 xl:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </a>
          
        </nav>
        {isMenuOpen && (
          <div className="  xl:hidden  bg-gray-900 text-white p-4">
            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-gray-200 font-fijila">
                  Home
                </Link>
              </li>
              <li>
                <Link to = '/category' className="hover:text-gray-200 font-fijila">Category</Link>
              </li>
              <li>
              <Link to = '/products' className="hover:text-gray-200 font-fijila">
                  Products
                </Link>
              </li>
              <li>
                <a className="hover:text-gray-200 font-fijila" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        )}
      </section>
    

</>  )



}
