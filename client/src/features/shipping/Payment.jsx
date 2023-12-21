import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import Loading from "../../components/Loading.jsx/Loading";

export default function Payment() {
  // eslint-disable-next-line no-unused-vars
  const [clientSecret, setClientSecret] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [paymentApi, setPaymentApi] = useState(null);
  const { sumTotal,address,state,city,pinCode,phoneNo,name} = useSelector((state) => state.cart.shippingInfo);


  //stripe publish api
  useEffect(() => {
    const payApi = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/paymentapi"
        );

        setPaymentApi(loadStripe(data.stripeApiKey));
      } catch (error) {
        console.log(error);
      }
    };

    payApi();
  }, []);

  //stripe secret key api
  useEffect(() => {
    async function check() {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      };
      const requestData = JSON.stringify({
        amount:sumTotal ,
          address,
          state,
          city,
          pinCode,
          phoneNo,
          name
      });
  console.log(requestData)
      const response = await axios.post(
        "http://localhost:5000/api/v1/payment",requestData,config);
          let secret = response.data.client_secret
      setClientSecret(secret);
     
    }
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-center text-3xl font-fijila m-5 font-bold">ENCLAVE</h1>
      {paymentApi && clientSecret ? (
        <Elements stripe={paymentApi} options={{ clientSecret }}>

          <PaymentForm />
        </Elements>
      ) : (
        <Loading />
      )}
    </div>
  );
}
