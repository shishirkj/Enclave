import express from 'express'
import { getPaymentApiKey, processPayment } from "../controllers/paymentControllers.js";



const payRoute = express.Router()



payRoute
        .post('/payment',processPayment)
        .get('/paymentapi',getPaymentApiKey)


export default payRoute