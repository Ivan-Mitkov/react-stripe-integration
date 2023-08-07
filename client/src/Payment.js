
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

import useStripeLoader from "./hooks";

function Payment(props) {

  const {stripePromise,clientSecret}=useStripeLoader("/config","/create-payment-intent")
  

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
