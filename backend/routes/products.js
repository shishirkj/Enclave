import express from 'express'
import { createProduct, getAllProduct } from "../controllers/productControllers.js";


const router = express.Router();


router.post('/new',createProduct)


export default router