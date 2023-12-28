import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useLocation } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Completion() {
  const {shippingInfo,cartItems} = useSelector((state) => state.cart);
  const {sumTotal,ship} = useSelector((state) => state.cart.shippingInfo);
  const {_id} = useSelector(state=>state.login?.form?.user)

const {state} = useLocation();



  useEffect(()=>{ 
    const orderConfirmation=async()=>{ 
try {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const orderData = {
   shippingInfo,cartItems,
   totalPrice:sumTotal,
   "itemsPrice": (sumTotal-ship),
   "taxPrice": 18,
   "shippingPrice":ship,
   "paymentInfo": {
    "id": state,  
    "status": "Paid"
  },
  userId:_id

  };

  const modify = JSON.stringify(orderData)

const response = await axios.post('http://localhost:5000/api/v1/order/new',modify,config);
console.log(response);
if(response)
{ 
  toast.success("Order Created")
}

} catch (error) {
  console.log(error)
}
    }
    orderConfirmation();    

    },[cartItems,ship,shippingInfo,sumTotal,state,_id])
    const navigate = useNavigate();
    return ( 
        <>
  {/* component */}
  <div className="bg-gray-100 h-screen">
    <div className="bg-white p-6  md:mx-auto">
      <svg
        viewBox="0 0 24 24"
        className="text-green-600 w-16 h-16 mx-auto my-6"
      >
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <div className="text-center">
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
          Payment Done!
        </h3>
        <p className="text-gray-600 my-2">
          Thank you for completing your secure online payment.
        </p>
        <p> Have a great day!</p>
        <div className="py-10 text-center">
          <a
            onClick={()=>navigate('/')}
            className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
          >
            GO BACK
          </a>
        </div>
      </div>
    </div>
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
</>

    )
  }
  
  export default Completion;