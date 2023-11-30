import User from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";
import sendCookie from "../utils/sendCookie.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js"
import crypto from "crypto"


//register user
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User already exists", 400));
  user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "this is public url id",
    },
  });
  sendCookie(user, res, 201, "user created successfully");
};

//loginuser
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email && !password)
      return next(new ErrorHandler("Please enter Email and password", 401));
    let user = await User.findOne({ email }).select("+password");

    //401=unauthoraizes
    if (!user) return next(new ErrorHandler("Invalid email or password", 401));
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      return new (next(new ErrorHandler("Invalid email or password", 401)));

    sendCookie(user, res, 200, `Hello ${user.name}`);
  } catch (error) {
    next(error);
  }
};

//logout user
export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout confirmed",
    });
};


//forgot password link creation
export const forgotPassword = async (req, res,next) => {
  try{
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

    // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
    
    await user.save({ validateBeforeSave: false });

    const url = `${req.protocol}://${req.get("host")}/api/v1/${resetToken}`
    const message = `Your password reset token is :- \n\n ${url} \n\nIf you have not requested this email then, please ignore it.`;

    try {

        await sendEmail({ 
          email:user.email,
          subject: `Enclave password Recovery`,
          message
        })

        res.status(200).json({
          success:true,
          message:`email sent to ${user.email}` 

        })

      
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire= undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));

      
    }
  }
  catch(error){ 

next(error)
  }

};

//reset password
export const resetPassword = async (req, res, next) => {
 
try {
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");

const user = await User.findOne({
  resetPasswordToken,
  resetPasswordExpire: { $gt: Date.now() },
});

if (!user) return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));

if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler("Password does not match", 400));

user.password = req.body.password;

user.resetPasswordToken = undefined;

user.resetPasswordExpire = undefined;

await user.save();

sendCookie(user, res, 200,"password changed");
  
} catch (error) {
  next(error)
}

};


//get user details(no password seen in postman as select false)
export const userDetails = async(req,res,next)=>{ 
  try {
    const user = await User.findById(req.user._id).select("+password");

    res.status(200).json({
      success: true,
      user,
    });
  
  } catch (error) {
    next(error)
  }

}


//update user password after login
export const updatePassword = async(req,res,next)=>{ 
  
try {
  const user = await User.findById(req.user._id).select("+password")

  const isMatched = await bcrypt.compare(req.body.password, user.password);
  if (!isMatched)return next(new ErrorHandler("Old password is incorrect", 401));
  
  if(req.body.newPassword!=req.body.confirmPassword)  return next(new ErrorHandler("password does not match", 400));
  
  user.password = req.body.newPassword;

  await user.save();

  sendCookie(user, res, 200, "password updated");

} catch (error) {
  next(error)
}

  
}


//update profile(name,image,profile pic)
export const updateProfile = async(req,res,next)=>{ 
  try {
    
    const {name,email} = req.body;

    const newUserData = {
      name,email
    };
  
    //no need to do user.save() cauz findByIdUpdate does it
      const user= await User.findByIdAndUpdate(req.user._id,newUserData,{ 
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
  
      //profile pic later
  
      res.status(200).json({ 
        success:true,
        message:"profile updated",
        user
      })
  
  } catch (error) {
   
    next(error)
  }


}


//get all user --admin

export const getAllUsers = async(req,res,next)=>{ 

  try {
    const users = await  User.find();

  res.json({ 
    success:true,
    message:"All user details",
    users
  })
    
  } catch (error) {
    next(error)
  }
}


//get single user --admin

export const getSingleUser = (async (req, res, next) => {
 try {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
 } catch (error) {
  next(error)
 }
});


//update user role --admin

export const updateUserRole = async(req,res,next)=>{ 
  try {
    const user = await User.findById(req.params.id);

    if(!user)return new ErrorHandler(`User does not exist with Id: ${req.params.id}`,400)
  
  
    //we send name and email as well cauz to tell which user to update the role
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
  
     //no need to do user.save() cauz findByIdUpdate does it
    await User.findByIdAndUpdate(req.params.id,newUserData,{ 
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
  res.status(200).json({ 
    success:true,
    message:"role updated"
  })
    
    
  } catch (error) {
    next(error);
  }
 
}


//delete user --admin
export const deleteUser = async(req,res,next)=>{ 
  try {
    const user = await User.findById(req.params.id);
    if(!user) return new ErrorHandler(`User does not exist with Id: ${req.params.id}`,400)
    res.status(200).json({ 
     succes:true,
     message: `${user.name} user deleted`
    })
    await User.deleteOne(user);
  } catch (error) {
    next(error)
  }

}