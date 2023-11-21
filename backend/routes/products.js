import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getProductDetails, updateProduct } from "../controllers/productControllers.js";
import { isAuthenticated,authorizeRoles } from '../middlewares/auth.js';


const router = express.Router();


router
    .post('/new', isAuthenticated,authorizeRoles("admin"),createProduct)
    .get('/products',getAllProduct)
    //an array is sent cauz it can be authorizeRoles("admin","editor") 
    .put('/product/:id',isAuthenticated,authorizeRoles("admin"),updateProduct)
    .delete('/product/:id',isAuthenticated,authorizeRoles("admin"),deleteProduct)
    .get('/product/:id',isAuthenticated,authorizeRoles("admin"),getProductDetails)
 

export default router