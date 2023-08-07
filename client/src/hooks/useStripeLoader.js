import { useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {getPublishableKey,getClientSecret} from '../api/stripe'

const useStripeLoader=()=>{
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
        console.log('publishableKey')
      // get key from backend and use it to set Stripe
      getPublishableKey.then(async(r)=>{
        const {publishableKey}= await r.json()
        console.log(publishableKey)
       setStripePromise( loadStripe(publishableKey)) 
      })
  
    },
    // needs to run once
    [])
  
    // payment intent from the backend in order to get client secret
    useEffect(()=>{
        console.log('clientSecret')

      // get key from backend and use it to set Stripe 
      // this is POST request with empty body
      getClientSecret.then(async(r)=>{
        const {clientSecret}= await r.json()
        console.log(clientSecret)
        setClientSecret( clientSecret) 
      })
  
    },
    // needs to run once
    [])

    return {stripePromise,clientSecret}
}

export default useStripeLoader
