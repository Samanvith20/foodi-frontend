import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../Firebase/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const CheckoutForm = ({ cart, price }) => {
  const { user } = useContext(AuthContext);
  //console.log(user);
   const navigate=useNavigate()
   const axiosSecure=useAxiosSecure()
    const [errormessage,setErrormessage]= useState("")
     const[clientsecret,setClientSecret]=useState("")
     useEffect(() => {
      if (typeof price !== "number" || price < 1) {
          return;
      }
      axios.post("https://foodi-backend-1.onrender.com/create-payment-intent", { price,})
          .then((res) => {
              // console.log(res.data.clientSecret);
              setClientSecret(res.data.clientSecret);
          })
          .catch((error) => {
              // Handle error
              console.error("Error creating payment intent:", error);
          });
  }, [price, axiosSecure]);
  
  
    const stripe= useStripe()
    const element=useElements()
    const handleSubmit= async(event)=>{
        event.preventDefault();
        if (!stripe || !element) {
            
            return;
          }
          // create a card element
          const card = element.getElement(CardElement);
      
          if (card == null) {
            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
          if (error) {
            console.log('[error]', error);
            setErrormessage(error?.
                message
                )
          } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setErrormessage("Success")
          }
          const {paymentIntent, error:conformpaymentError} = await stripe.confirmCardPayment(
            clientsecret,
            {
              payment_method: {
                card:card ,
                billing_details: {
                  name: user?.displayName||'anoyomous',
                  email:user?.email||"Unknown"
                },
              },
              
            },
          );
         
            if (paymentIntent) {
            
              setErrormessage(`your Transaction id is :${paymentIntent.id}`);
              
          
          
            // paymentInfo details
            const paymentInfo={
            email:user.email,
            transitionid:paymentIntent.id,
            price,
            quantity:cart?.data?.quantity,
            status:"order-pending",
           itemName:cart?.data?.map(item=>item?.name),
           cartItems:cart?.data?.map(item=>item?._id),
           menuItems:cart?.data?.map(item=>item.menuItemId)

            }
            console.log(paymentInfo);
            // send information to backend using a API request
            axiosSecure.post("/payment",paymentInfo)
            .then(res=> 
              console.log(res.data))
             alert("Payment Successful")
             navigate("/order")
          }
          else{
            
            console.error(conformpaymentError);
          }

    }
  return (
    <div className="flex flex-col md:flex-row justify-start items-start gap-7 ">
      {/*left side */}
      <div className="md:w-1/2 w-full space-y-3 ">
        <h4 className="text-lg font-semibold">order Summary</h4>
        <p>Total Price:${price}</p>
        <p>Number of items:{cart?.data?.length}</p>
      </div>
      {/*Right side */}
      <div className="md:w-1/3 w-full space-y-3 card shrink-0  max-w-sm shadow-2xl bg-base-100 px-4 py-8 ">
      <h4 className="text-lg font-semibold">Process Your Payment</h4>
      <h5 className="font-medium">Credit/Debit card</h5>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" className="btn btn-sm mt-5 text-white w-full bg-orange-600" disabled={!stripe}>
          Pay
        </button>
      </form>
      {errormessage? <p> {errormessage} </p>:""}
      </div>
    </div>
  );
};

export default CheckoutForm;
