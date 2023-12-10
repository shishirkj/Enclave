import express from 'express'
import {loginUser,logoutUser, registerUser,forgotPassword,resetPassword, userDetails,updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/auth.js';


const userRoute =express.Router();

userRoute
        .post('/user',registerUser)
        .post('/login',loginUser)
        .get('/logout',logoutUser)
        .post('/password/forgot',forgotPassword)
        .get('/me',isAuthenticated,userDetails)
        .put('/me/password',isAuthenticated,updatePassword)
        .put('/me/update',isAuthenticated,updateProfile)
        .get('/admin/users', isAuthenticated,authorizeRoles("admin"), getAllUsers)
        .put('/password/reset/:token',resetPassword)
        .get('/admin/user/:id',isAuthenticated,authorizeRoles("admin"),getSingleUser)
        .put('/admin/user/:id',isAuthenticated,authorizeRoles("admin"),updateUserRole)
        .delete('/admin/user/:id',isAuthenticated,authorizeRoles("admin"),deleteUser)
       


export default userRoute