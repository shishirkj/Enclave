

import Stripe from 'stripe';
import { config } from "dotenv";


config({
        path: "C:/Users/reach/Desktop/enclave/server/data/config.env",
      });
      

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const processPayment = async (req, res, next) => {
  try {
    
    
    const { amount,address,state,city,pinCode,phoneNo,name} = req.body;


// convert the float to a round of
const amountInPaise = Math.round(amount * 100);
    const myPayment = await stripe.paymentIntents.create({
      amount:amountInPaise,
      shipping: {
        name: name,
        address: {
          line1:address,
          postal_code: pinCode,
          city:city,
          state: state,
          country: "US",
        }},
      description: 'product buying from Enclave(dummy Ecommerce website)',
      currency: 'inr',
      metadata: {
        company: 'Encalve',
      }
    });

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    next(error);
  }
};




export const getPaymentApiKey = async(req,res,next)=>{ 

    try {
        res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });

    } catch (error) {
        next(error);
    }
}