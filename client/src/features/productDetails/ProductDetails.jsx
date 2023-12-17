import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { fetchAsync } from "./productDetailsSlice";
import { useParams } from "react-router-dom"; // Import the useParams hook
import Loading from "../../components/Loading.jsx/Loading";
import ReactStar from "react-rating-stars-component";
import { addAsync } from "../cart/cartSlice";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const productDetails = useSelector(
    (state) => state.productDetail.productDetails
  );
  const loading = useSelector((state) => state.productDetail.status);
  const {Stock} = useSelector((state)=>state.productDetail.productDetails)
  const {error} = useSelector((state)=>state.productDetail)

  const { images } = productDetails;

  const [quantity,setQuantity] = useState(1);



  const incrementQuantity = ()=>{
    if(quantity>=Stock)
    { 
      
      return;
    }
    let qty = quantity+1;
    setQuantity(qty)
  }

  const decrementQuantity=()=>{ 
    if(quantity<=1)
    return   
    let qty = quantity-1;
    setQuantity(qty)
  }

  const addToCart = ()=>{ 
    //must send as single object in parameter
    dispatch(addAsync({productId,quantity}))
    toast.success('Added to Cart')
  }

  useEffect(() => {
    dispatch(fetchAsync(productId));
  }, [dispatch, productId]);

  useEffect(()=>{ 
    if(error)
    { 
      toast.error(error)
    }
  },[error])


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value:true,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };


  return (
    // Your component
// Your component
<div className="bg-amber-100  py-10 sm:py-16 lg:py-20">
  {loading === "loading" ? (
    <Loading />
  ) : (
    <>
      <div className="flex flex-col md:flex-row  items-center md:items-start px-4 md:px-10">
        {/* Image Slider */}
        <Slider {...settings} className="w-full md:w-2/5 lg:w-1/2 mb-8 md:mb-0 md:mr-8 p-4">
          {images &&
            images.map((image) => (
              <div key={image._id}>
                <img className="rounded-md w-full" src={image.url} alt={image._id} />
              </div>
            ))}
        </Slider>
        {/* product Details */}
        <div className="flex flex-col ml-[15%] mt-2 w-full md:w-3/5">
          {/* block1 */}
          <div>
            <h2 className="font-roboto text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 mb-2 md:mb-4">
              {productDetails.name}
            </h2>
            <p className="text-sm md:text-base text-gray-800 mb-4">{productDetails._id}</p>
          </div>
          {/* block2 */}
          <div className="mb-4">
            <ReactStar
              className=""
              edit={options.edit}
              color={options.color}
              activeColor={options.activeColor}
              value={productDetails.ratings}
              isHalf={options.isHalf}
              size={options.size}
            />
            <span className="font-bold text-sm md:text-base">
              ({productDetails.numOfReviews} Reviews)
            </span>
          </div>
          {/* block3 */}
          <div className="flex flex-col  space-x-2">
            <h1 className="font-roboto text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 my-4">
              {`₹${productDetails.price}`}
            </h1>
            <div className="flex space-x-2">
              <button onClick={decrementQuantity} className="bg-gray-900 text-white px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-gray-800">
                -
              </button>
              <input
                value={quantity} readOnly
                className="border border-gray-300 text-gray-900 font-bold py-1 px-2 md:px-3 h-8 md:h-10 w-8 md:w-11 rounded-md"
              />
              <button onClick={incrementQuantity} className="bg-gray-900 text-white px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-gray-800">
                +
              </button>
            </div>
          </div>
          <button onClick={addToCart} className=" w-40 bg-gray-900 text-white py-2 mt-5 rounded-md hover:bg-gray-600">
            Add to Cart
          </button>
          <p className="font-semibold text-gray-800 my-4">Description: {productDetails.description}</p>
        </div>
      </div>

  {/* {reviews.map((rev)=>(<p key = {rev._id}>{rev.name}</p>))} */}
      {/* { rev.map((review)=>(<p key = {review._id}>{review.name}</p>))} */}

    </>
  )}

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
   
</div>

  );
}
