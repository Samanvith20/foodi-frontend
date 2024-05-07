import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useCart from "../../hooks/useCart";
const Payment = () => {
  const [cart] = useCart();

  // Check if cart.data exists and has items before performing the calculation
  const Totalprice =
    cart.data && cart.data.length > 0
      ? cart.data.reduce((sum, item) => sum + (item?.price || 0), 0)
      : 0;

  // Check if Totalprice is not undefined before calling .toFixed(2)
  const fixedprice =
     Totalprice !== "undefined" ? parseFloat(Totalprice.toFixed(2)) : 0;

//   console.log(fixedprice);
  const stripePromise = loadStripe(import.meta.env.VITE_Publishablekey);
  // console.log(import.meta.env.VITE_Publishablekey);
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
      <Elements stripe={stripePromise}>
        <CheckoutForm  cart={cart} price={fixedprice}/>
      </Elements>
    </div>
  );
};

export default Payment;
