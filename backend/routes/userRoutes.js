import express from 'express'
import {loginUser,logoutUser, registerUser,forgotPassword,resetPassword } from '../controllers/userController.js';


const userRoute =express.Router();

userRoute
        .post('/user',registerUser)
        .post('/login',loginUser)
        .get('/logout',logoutUser)
        .post('/password/forgot',forgotPassword)
        .put('/password/reset/:token',resetPassword)

export default userRoute