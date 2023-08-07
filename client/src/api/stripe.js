export const getPublishableKey=fetch("/config")
export const getClientSecret=fetch("/create-payment-intent",{method: "POST",body:JSON.stringify({})})