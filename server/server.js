const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});




app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {


  const customer = await stripe.customers.create({
    description: 'My First Test Customer (created for API docs)',
    email:'ivan.ivanov@app-streams.com',
    name:'Ivan Ivanov'
  
  })
  
  const invoice = await stripe.invoices.create({
    customer: customer.id,
    pending_invoice_items_behavior:'exclude',
    collection_method:'send_invoice',
    days_until_due:'7'
  })

  console.log(customer.id)
  console.log(invoice.id)
  const product = await stripe.products.create({
    name: 'Gold Special',
  });
  console.log(product.id)

  const price = await stripe.prices.create({
    unit_amount: 100,
    currency: 'bgn',
    product: product.id,

  });
  
  console.log(price.id)
  const invoiceItems=await stripe.invoiceItems.create({
    customer:customer.id,
    invoice:invoice.id,
    price:price.id
}
  )
  console.log(invoiceItems.id)

  const finalizedInvoice = await stripe.invoices.finalizeInvoice(
   invoice.id
  ); 
  
  console.log('invoice.hosted_invoice_url',invoice.hosted_invoice_url)
  //https://stripe.com/docs/payments/payment-intents
  try {
    // Create or use a preexisting Customer to associate with the payment
   
  
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'bgn',
      // amounts in cents
      amount:'100',
      // choose payment methods from stripe dashboard
      automatic_payment_methods: {
        enabled: true,
      },

    })
  
    res.send({clientSecret:paymentIntent.client_secret})
  } catch (error) {
    return res.status(400).send({error:{message:error.message}})
  }
  
});

app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
