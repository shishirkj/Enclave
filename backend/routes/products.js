import express from 'express'
import { createProduct, deleteProduct, getAllProduct, getProductDetails, updateProduct } from "../controllers/productControllers.js";


const router = express.Router();


router
    .post('/new',createProduct)
    .get('/products',getAllProduct)
    .put('/product/:id',updateProduct)
    .delete('/product/:id',deleteProduct)
    .get('/product/:id',getProductDetails)

export default router