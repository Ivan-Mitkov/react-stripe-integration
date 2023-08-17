
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

import useStripeLoader from "./hooks";

function Payment(props) {

  const {stripePromise,clientSecret}=useStripeLoader("/config","/create-payment-intent")
  

  const hasStripeAndSecret=stripePromise&&clientSecret

  const THEME={
    Stripe:'stripe',
    Night:'night',
   Flat:'flat',
  }
  const appearance = {
    theme: THEME.Stripe,
    variables: {
      colorPrimary: 'red',
      colorBackground: 'pink',
      colorText: 'black',
      colorDanger: '#df1b41',
      fontFamily: 'Nunito, system-ui, sans-serif',
      fontSizeBase:'16px',
      spacingUnit: '8px',
      borderRadius: '16px',
    },
    rules: {
      '.Tab': {
        // border: '1px solid #E0E6EB',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)',
      },

      '.Tab:hover': {
        color: 'var(--colorText)',
      },

      '.Tab--selected': {
        borderColor: '#E0E6EB',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)',
      },

      '.Input--invalid': {
        boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)',
      },

      // See all supported class names and selector syntax below
    }
    ,labels: 'above',
    // ,labels: 'floating',

  };
  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {/**
       * 
       * The Elements provider allows you to use Element components and access the Stripe object in any nested component. Render an Elements provider at the root of your React app so that it is available everywhere you need it.

        To use the Elements provider, call loadStripe from @stripe/stripe-js with your publishable key. The loadStripe function asynchronously loads the Stripe.js script and initializes a Stripe object. Pass the returned Promise to Elements.
       */}
   {hasStripeAndSecret&&
      <Elements stripe={stripePromise} options={{clientSecret,appearance}}>
          <CheckoutForm/>
      </Elements>}
    </>
  );
}

export default Payment;
