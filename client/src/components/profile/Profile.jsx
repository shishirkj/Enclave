import { useSelector, } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";



export default function Profile(){


  const history = useNavigate()
const {name,email,createdAt} = useSelector(state=>state.login.form.user)
const {avatar} = useSelector(state=>state.login.form.user)
// const {status} = useSelector(state=>state.login)


const formatCreatedAt = (createdAt) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', };
  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, options);
  return formattedDate;
};

const userData = {
  fullName: name,
  email: email,
  joinedOn: formatCreatedAt(createdAt),
  image:avatar.url
};


    return(
      
    userData.image && <div className="bg-amber-100 min-h-screen flex items-center justify-center">
       
      <div className="container flex-col space-y-20 p-8">
        <h1 className="text-5xl font-extrabold  font-fijila text-center mb-16 md:text-left md:text-7xl">
          <span className="text-gray-900">My </span>
          <span className="text-blue-600">Profile</span>
        </h1>
    
        <div className="md:flex md:justify-between space-y-20">
          <div className="md:flex-col md:items-start md:justify-start w-1/2 flex justify-between content-center">
            <img className="rounded-full h-40 w-40 md:w-60 md:h-60" src={userData.image} />
            <button onClick={()=>{history('/updateProfile')}} className=" bg-gray-900 ml-[3.5rem] my-14 text-white px-4 md:px-4 py-1 md:py-2 rounded-md hover:bg-gray-800">
              Edit Profile
            </button>
          </div>
          <div className="space-y-4 md:space-y-14">
            <h2 className="text-2xl md:text-4xl font-semibold font-fijila text-gray-900">Full Name: {userData.fullName}</h2>
            <h2 className="text-2xl block md:text-4xl font-fijila font-semibold text-gray-900">Email: {userData.email}</h2>
            <h2 className="text-2xl md:text-4xl font-semibold font-fijila text-gray-900">Joined On: {userData.joinedOn}</h2>
          </div>
        </div>
    
        <div className="flex justify-between">
          <button className="bg-gray-900 my-14 md:w-[14rem] md:h-[3rem] text-white px-4 md:px-4 py-1 md:py-2 rounded-md hover:bg-gray-800">
            Change Password
          </button>
          <button className="bg-gray-900 my-14 md:w-[14rem] text-white px-4 md:px-4 py-1 md:py-2 rounded-md hover:bg-gray-800">
            My Orders
          </button>
        </div>
      </div>
    </div>
    
    );
   }
  
 
  