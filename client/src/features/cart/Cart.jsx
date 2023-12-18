import { useSelector,useDispatch} from "react-redux"
import { addAsync, deleteAsync } from "./cartSlice"
import { useNavigate } from "react-router-dom";


export default function Cart() {


 const {cartItems} = useSelector((state)=>state.cart)

const navigate = useNavigate()
const dispatch = useDispatch();

const increaseQuantity = (id, quantity, stock) => {
  
  
    if (stock <= quantity) {
      return;
    }
    let newQty = quantity+1
    dispatch(addAsync({ productId: id, quantity: newQty }));
  };

 
const decrementQuantity=(quantity,id)=>{ 
    
    if(quantity<=1)
    return 
    let newQty = quantity-1;
    dispatch(addAsync({ productId: id, quantity: newQty }))
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


  return (
    <div>
        <div className="h-full bg-gray-100 pt-20">
  <h1 className="mb-10 text-center text-2xl font-bold font-fijila text-gray-900">Cart Items</h1>
  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    <div className="rounded-lg md:w-2/3">
      {cartItems.length===0?<h1 className=" text-2xl font-bold text-gray-900 font-fijila  text-center">No Items added in cart</h1>:cartItems.map((product)=>( 
            <div key = {product._id}>
            <div >
             <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
        <img
          src={product.image}
          alt="product-image"
          className="w-full rounded-lg sm:w-40"
        />
        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
          <div className="mt-5 sm:mt-0">
            <h2 className="text-lg font-bold text-gray-900">
             {product.name}
            </h2>
            <p className="mt-1 text-xs text-gray-700">{product._id}</p>
          </div>
          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
            <div className="flex items-center border-gray-100">
              <button onClick={()=>decrementQuantity(product.quantity,product._id)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {" "}
                -{" "}
              </button>
              <input
                className="h-8 w-8 border bg-white text-center text-xs outline-none readonly"
                type="number" 
               value={product.quantity} onChange={()=>product.quantity}
              />
              <button onClick={()=>increaseQuantity(product._id,product.quantity,product.Stock)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                {" "}
                +{" "}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm">₹{product.price}</p>
              {/* Remove item icon */}
              <div onClick={()=>dispatch(deleteAsync({productId:product._id}))}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
            </div>
        ))}
     
     
     
    </div>
    {/* Sub total */}
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">₹{sum}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">GST</p>
        <p className="text-gray-700">{sum===0?0:18}%</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">₹{sum===0?0:total+4.99}</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <button onClick={()=>navigate('/shipping')} className="mt-6 w-full rounded-md bg-gray-900 py-1.5 font-medium text-blue-50 hover:bg-gray-800">
        Check out
      </button>
    </div>
  </div>
</div>

    </div>
  )
}
