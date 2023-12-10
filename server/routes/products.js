import express from 'express'
import { createAndUpdateProductReview, createProduct, deleteProduct, deleteReviews, getAllProduct, getAllreviews, getProductDetails, updateProduct } from "../controllers/productController.js";
import { isAuthenticated,authorizeRoles } from '../middlewares/auth.js';


const router = express.Router();


router
    .post('/admin/new', isAuthenticated,authorizeRoles("admin"),createProduct)
    .get('/products',getAllProduct)
    //an array is sent cauz it can be authorizeRoles("admin","editor") 
    .put('/admin/product/:id',isAuthenticated,authorizeRoles("admin"),updateProduct)
    .delete('/admin/product/:id',isAuthenticated,authorizeRoles("admin"),deleteProduct)
    //need to add isAuthenticated below
    .get('/product/:id',isAuthenticated,getProductDetails)
    .put('/review',isAuthenticated,createAndUpdateProductReview)
    .get('/reviews',isAuthenticated,getAllreviews)
    .delete('/reviews',isAuthenticated,authorizeRoles("admin"),deleteReviews)
 

export default router