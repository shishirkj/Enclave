import { useState } from 'react';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch,useSelector} from 'react-redux';
import { updateProfileAsync } from '../authentication/loginSlice';
import Loading from '../Loading.jsx/Loading';
import { useNavigate } from 'react-router-dom';


export default function UpdateProfile() {

    const dispatch = useDispatch() 
    const history = useNavigate()
    
    const loading = useSelector(state=>state.login.status)
    const error = useSelector(state=>state.login.error)


  const [form, setForm] = useState({
    name: '',
    email: '',
    avatar: '/profile_pic.png',
    avatarPreview: 'avatar image',
  });

  const handleInputs = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files)
    const file = e.target.files[0];
    setForm((prevForm) => ({ ...prevForm, avatar: file }));
    if (file) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
         //to handle async nature(safety)i didnt write setForm({...form,avatar:file})
        setForm((prevForm) => ({ ...prevForm, avatar:file, avatarPreview: reader.result }));
      };
  
      //to add the file/image in avatar and avatarpreview
      reader.readAsDataURL(file);
    }
  };
  const updateUser = (e) => {
    e.preventDefault();

      const {name,email,avatar}=form;  
      if(name.length<=4)
      { 
        toast.error('Name should have more than 4 characters')
        return
      }
    
      if(email.length===0)
      { 
        toast.error('Please enter email')
        return
      }
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("email", email);
    
      myForm.set("avatar", avatar);
    
      //to console myForm
      // for (var key of myForm.entries()) {
      //   console.log(key[0] + ', ' + key[1])
      // }

      if(error)
      { 
        toast.error(error)
      }
      else
      {
        dispatch(updateProfileAsync(myForm));
        history('/profile')
      }
     
  };

  return (
    <div>

{loading==="loading"?<><Loading/></>:<>(<section className="bg-white">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={updateUser}
            className="w-full max-w-md"
          >
            <div className="flex justify-center mx-auto">
              <h1 className="text-5xl pb-7 font-extrabold font-fijila">
                <span className="text-gray-900 ">Update </span>
                <span className="text-blue-600">Profile</span>
              </h1>
            </div>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                {/* ... SVG Icon */}
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputs}
                className="block w-full py-3 text-white bg-gray-900 rounded-lg px-11 dark:bg-gray-900 dark:text-white dark:border-gray-900 focus:border-gray-400 dark:focus:border-gray-900 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Username"
              />
            </div>

            <div className="relative flex items-center mt-6">
              <span className="absolute">
                {/* ... SVG Icon */}
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputs}
                className="block w-full py-3 text-white bg-gray-900 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-900 focus:border-gray-900 dark:focus:border-gray-900 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
            </div>

            <label
              htmlFor="dropzone-file"
              className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
            >
              {/* ... SVG Icon */}
              <img
                src={form.avatarPreview}
                alt="avatar-preview"
                className="w-16 h-16 mx-3 rounded-full object-cover"
              />
              <h2 className="mx-3 text-gray-400">Profile Photo</h2>
              <input
                id="dropzone-file"
                onChange={handleFileChange}
                name="avatar"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
            <div className='mt-6'>
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
               Update 
              </button>
            </div>
      
      
          </form>
          
        </div>
      
     
   
     
      </section>)</>
}
     



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
