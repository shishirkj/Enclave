import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";


export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(req.cookies)
console.log(token)

  if (!token) return next(new ErrorHandler("Login First", 404));

  const decoded = jwt.verify(token, process.env.JWT);

  req.user = await User.findById(decoded.id);

  next();
};

//roles below is an array cauz it can be authorizeRoles("admin","editor") in routes/productRoute
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    //if roles array include req.user.role(that can be user or admin) if user then go error since array has only admin or else true
    roles.includes(req.user.role)
      ? next()
      : next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
  };
};
