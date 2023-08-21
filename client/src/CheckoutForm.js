import { useEffect, useState } from "react";
import { useStripe,useElements } from "@stripe/react-stripe-js";
import { PaymentElement,LinkAuthenticationElement } from "@stripe/react-stripe-js";
import AddressForm from './AddressForm';

export default function CheckoutForm({redirect}) {
  console.log('CheckoutForm redirect',redirect);
  const [message, setMessage] = useState(null);
  const[email,setEmail]=useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSavingCard, setIsSavingCard] = useState(false);

  // get stripe and elements
  /**
   * The useStripe hook returns a reference to the Stripe instance passed to the Elements provider. If you need to access the Stripe object from a class component, use ElementsConsumer instead.
   */
  const stripe=useStripe();

  /**
   * To safely pass the payment information collected by the Payment Element to the Stripe API, access the Elements instance so that you can use it with stripe.confirmPayment. If you use the React Hooks API, then useElements is the recommended way to access a mounted Element. If you need to access an Element from a class component, use ElementsConsumer instead.
   */
  const elements = useElements();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!stripe||!elements)return;

    setIsProcessing(true)

    // wait for stripe to confirm payment 
    // in NO redirect case paymentIntent will be returned   
    /**
     * If the confirmation fails, the Promise will resolve with an {error} object that describes the failure. When the error type is card_error or validation_error, you can display the error message in error.message directly to your user. An error type of invalid_request_error could be due to an invalid request or 3DS authentication failures.
     */
    const {error,paymentIntent}=await stripe.confirmPayment({
      elements,
      confirmParams:{
        return_url:`${window.location.origin}/completion`,        
      },
      redirect:'if_required'
    })

    console.log(paymentIntent)

    if (error) {
      // Show error to your customer (for example, payment details incomplete)
     setMessage(error.message);
    } else if(paymentIntent && paymentIntent.status==='succeeded'){
      setMessage('Payment status: '+paymentIntent.status)
    }
    else {
     setMessage('Unexpected state')
    }

    setIsProcessing(false)
  };

  

console.log(message)
  /**
   * Payment Element
   * PaymentElement	Collects payment details for 25+ payment methods from around the globe. See the Payment Element docs. https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements&client=react
   */
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
            {/* <LinkAuthenticationElement id="link-authentication-element"
             // Access the email value like so:
        onChange={(event) => {
         setEmail(event.value.email);
        }}
        //
        // Prefill the email field like so:
        options={{defaultValues: {email: 'foo@bar.com'}}}
        /> */}
      <PaymentElement/>
      {/* <h3>Shipping address</h3>
          <AddressForm/>
          <div >
              <label ><input type="checkbox" onChange={()=>setIsSavingCard(!isSavingCard)} /> Save card for future payments</label>
            </div> */}
      <button disabled={isProcessing} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
