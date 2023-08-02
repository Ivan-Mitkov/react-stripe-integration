import { useEffect, useState } from "react";
import { useStripe,useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
  };


  /**
   * Payment Element
   * PaymentElement	Collects payment details for 25+ payment methods from around the globe. See the Payment Element docs. https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements&client=react
   */
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement/>
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
