import { useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

function Payment(props) {

  const[stripePromise,setStripePromise]=useState(null)
  const[clientSecret,setClientSecret]=useState('')

  /**loadStripe
   * 
   *    https://stripe.com/docs/stripe-js/react
   *   https://github.com/stripe/stripe-js/blob/master/README.md#loadstripe
   * 
   * This function returns a Promise that resolves with a newly created Stripe object once Stripe.js has loaded. It takes the same parameters passed when directly initializing a Stripe instance. If necessary, it will load Stripe.js for you by inserting the Stripe.js script tag. If you call loadStripe in a server environment it will resolve to null.
   */

  useEffect(()=>{
    // get key from backend and use it to set Stripe
    fetch("/config").then(async(r)=>{
      const {publishableKey}= await r.json()
      console.log(publishableKey)
     setStripePromise( loadStripe(publishableKey)) 
    })

  },
  // needs to run once
  [])

  // payment intent from the backend in order to get client secret
  useEffect(()=>{
    // get key from backend and use it to set Stripe 
    // this is POST request with empty body
    fetch("/create-payment-intent",{method: "POST",body:JSON.stringify({})}).then(async(r)=>{
      const {clientSecret}= await r.json()
      console.log(clientSecret)
      setClientSecret( clientSecret) 
    })

  },
  // needs to run once
  [])

  const hasStripeAndSecret=stripePromise&&clientSecret
  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {/**
       * 
       * The Elements provider allows you to use Element components and access the Stripe object in any nested component. Render an Elements provider at the root of your React app so that it is available everywhere you need it.

        To use the Elements provider, call loadStripe from @stripe/stripe-js with your publishable key. The loadStripe function asynchronously loads the Stripe.js script and initializes a Stripe object. Pass the returned Promise to Elements.
       */}
   {hasStripeAndSecret&&
      <Elements stripe={stripePromise} options={{clientSecret}}>
          <CheckoutForm/>
      </Elements>}
    </>
  );
}

export default Payment;
