import { Error } from 'mongoose';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export const processPayment = async(next,req,res)=>{ 

    try {
        
        const myPayment = await stripe.paymentIntents.create({ 
            amount:req.body.amount,
            currency:'inr',
            metadata:{ 
                company:'Encalve'
            }
        })


        res.status(200).json({ 
            success:true,
            client_secret:myPayment.client_secret
        })

    } catch (error) {
        next(error);
    }
}



export const getPaymentApiKey = async(next,req,res)=>{ 

    try {
      

        res.res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });

    } catch (error) {
        next(error);
    }
}