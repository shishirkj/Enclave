import express from 'express'
import { getPaymentApiKey, processPayment } from "../controllers/paymentControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";


const payRoute = express.Router()



payRoute
        .post('/payment',isAuthenticated,processPayment)
        .get('/paymentapi',isAuthenticated,getPaymentApiKey)




export default payRoute