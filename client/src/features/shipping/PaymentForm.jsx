import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";


export default function PaymentForm() {
const stripe = useStripe();
  const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);




   const handleSubmit = async (e)=>{ 
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
    
      return;
    }


    setIsProcessing(true);


    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } 
    
   
    else {
      console.log(error)
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);

   }
    
  return (
    <div>

   <div className=" max-w-sm mx-auto   shadow-lg p-8 mt-10 rounded-md">
      <form className="space-y-4 " id="payment-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="payment-element" className="text-xl font-medium font-fijila text-gray-700">
            Card Details
          </label>
          <div className="mt-1">
            <PaymentElement id="payment-element" />
          </div>
        </div>
        <button
          type="submit"
          id="submit"
          className={`w-full px-4 py-2 bg-gray-900 text-white rounded-md ${
            isProcessing ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span id="button-text">
            {isProcessing ? "Processing..." : "Pay Now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && (
          <div
            id="payment-message"
            className={`mt-4 p-2 ${
              message.includes("Success") ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
            } rounded-md`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
    </div>
  )
}
