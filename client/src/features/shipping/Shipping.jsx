import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react";
import Indian_states_cities_list from "indian-states-cities-list";

export default function Shipping() {

  const [dhl,setDhl] = useState(false)
  const {cartItems} = useSelector((state)=>state.cart)



  const [address, setAddress] = useState('');
  const [state, setState] = useState('India');
  const [pinCode, setPinCode] = useState('');
  const [phoneNo, setPhoneNo] = useState('');


const handleAdress = (e)=>{ 
setAddress(e.target.value)
}

const handlePincode = (e)=>{ 
  setPinCode(e.target.value)
  }
    
const handlePhone = (e)=>{ 
  setPhoneNo(e.target.value)
     }

      
  let sum =0;let total;
  if(cartItems.length!=0)
  { 
    
  
    for(let i =0;i<cartItems.length;i++)
    { 
      const{quantity,price} = cartItems[i]
       sum+=price*quantity
    }
     total=sum* 1.18;
  }
  //  subtotal,
  // shippingCharges,
  // tax,
  // totalPrice,



  return (
    <div>
        <>
  <div className="flex  flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
    <Link to={'/'} className="text-3xl font-bold text-gray-800">
     SKJ
    </Link>
    <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
      <div className="relative">
        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <a
              className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </a>
            <span className="font-semibold text-gray-900">Shop</span>
          </li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <a
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
              href="#"
            >
              2
            </a>
            <span className="font-semibold text-gray-900">Shipping</span>
          </li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <li className="flex items-center space-x-3 text-left sm:space-x-4">
            <a
              className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
              href="#"
            >
              3
            </a>
            <span className="font-semibold text-gray-500">Payment</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
    <div className="px-4 pt-8 pb-2 ">
      <p className="text-xl font-medium font-fijila">Order Summary</p>
      <p className="text-gray-400">
        Check your items. And select a suitable shipping method.
      </p>
      {/* cart box */}
      {cartItems.map((product)=>( 
        <div key = {product._id}>
          <div>
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
          <img
            className="m-2 h-24 w-28 rounded-md border object-cover object-center"
            src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
          <div className="flex w-full flex-col px-4 py-4">
            <span className="font-semibold">
              {product.name}
            </span>
            <span className="float-right text-gray-400">x{product.quantity}</span>
            <p className="text-lg font-bold">₹{product.price}</p>
          </div>
        </div>
      </div>
      </div>
      </div>
      ))}
    

    {/* Billing */}
    </div>
    <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">
        Complete your order by providing your payment details.
      </p>
      <form>
      <div className="">
        <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
          Phone Number
        </label>
        <div className="relative">
          <input 
            type="number"
            id="number"
            name="number" value={phoneNo} onChange={handlePhone}
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3 text-gray">
           +91
          </div>
        </div>
        <label
          htmlFor="card-holder"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Card Holder
        </label>
        <div className="relative">
          <input
            type="text"
            id="card-holder"
            name="card-holder"
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Your full name here"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
              />
            </svg>
          </div>
        </div>
        <label
          htmlFor="card-no"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Card Details
        </label>
        <div className="flex">
          <div className="relative w-7/12 flex-shrink-0">
            <input
              type="text"
              id="card-no"
              name="card-no"
              className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
              </svg>
            </div>
          </div>
          <input
            type="text"
            name="credit-expiry"
            className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="MM/YY"
          />
          <input
            type="text"
            name="credit-cvc"
            className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="CVC"
          />
        </div>
        <label
          htmlFor="billing-address"
          className="mt-4 mb-2 block text-sm font-medium"
        >
          Billing Address
        </label>
        <div className="flex flex-col sm:flex-row">
          <div className="relative flex-shrink-0 sm:w-7/12">
            <input
              type="text"
              id="billing-address"
              name="address" value={address}
              onChange={handleAdress}
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Street Address"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <img
                className="h-5 w-5 object-contain"
                src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png"
                alt=""
              />
            </div>
          </div>
          <select
            type="text"
            name="billing-state" 
            value={state} onChange={setState}
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
            {Indian_states_cities_list.STATES_OBJECT.map((state,index)=>( 
              <option key={index} className="font-fijila ">
                {state.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="pinCode" value={pinCode} onChange={handlePincode}
            className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Pin Code"
          />
        </div>
        {/* Total */}
        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">₹{sum===0?0:total+4.99}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">₹{dhl?300:200}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">₹{sum===0?0:(dhl?total+4.99+300:total+4.99+200)}</p>
        </div>
      </div>
      <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
        Place Order
      </button>
      {/* Shipping */}
      <p className="mt-8 text-lg font-medium">Shipping Methods</p>
      <div className="mt-5 grid gap-6">
        <div className="relative">
          <input onClick={()=>setDhl(true)}
            className="peer hidden"
            id="radio_1"
            type="radio"
            name="radio"
            defaultChecked=""
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="radio_1"
          >
            <img
              className="w-20 object-contain"
              src="https://logowik.com/content/uploads/images/417_dhl.jpg"
              alt=""
            />
            <div className="ml-5">
              <span className="mt-2 font-semibold">DHL Delivery</span>
              <p className="text-slate-500 text-sm leading-6">
                Delivery: 1-2 Days
              </p>
            </div>
          </label>
        </div>
        <div onClick={()=>setDhl(false)} className="relative">
          <input
            className="peer hidden"
            id="radio_2"
            type="radio"
            name="radio"
            defaultChecked=""
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
          <label
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
            htmlFor="radio_2"
          >
            <img
              className="w-14 object-contain"
              src="https://images.squarespace-cdn.com/content/v1/61f92d97a17c5428e2a2caa7/78a90a87-3330-4efa-acb8-3cee83a3b7d6/hidden+arrow+fedex+logo.jpeg"
              alt=""
            />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Fedex Delivery</span>
              <p className="text-slate-500 text-sm leading-6">
                Delivery: 2-4 Days
              </p>
            </div>
          </label>
        </div>
      </div>
      </form>
    </div>
  </div>
</>

    </div>
  )
}
