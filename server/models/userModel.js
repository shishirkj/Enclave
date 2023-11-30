import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import crypto from 'crypto'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    //validate uses regular expression to check format of email
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


//compare password (optional)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});


//reset password
userSchema.methods.getResetPasswordToken = function(){ 
const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");


    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model("User",userSchema);

export default User;