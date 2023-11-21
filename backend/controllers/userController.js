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
    const isMatched = bcrypt.compare(password, user.password);
    if (!isMatched)
      return new (next(new ErrorHandler("Invalid email or password", 401)))();

    sendCookie(user, res, 200, `Hello ${user.name}`);
  } catch (error) {
    next(error);
  }
};


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


//reset password
export const resetPassword = async (req, res, next) => {
 

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
};
