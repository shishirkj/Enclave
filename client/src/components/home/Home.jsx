// Home.js
/* eslint-disable no-unused-vars */

import Product from "../../features/products/Product";
import React from "react";


export default function Home() {


  return (

  
    <div>
<h2 className="text-center  font-roboto  thickness-md text-xl  mt-5  p-3 ">Best in Class</h2>
    <div className = " text-black border-b-2 w-[150px] m-auto mb-2"></div>
  <div className="contianer">
  <Product/>
      </div>
      
    </div>
  );
}