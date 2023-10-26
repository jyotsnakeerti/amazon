


const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require('stripe')("sk_test_51Nec6XSABs1CDGvtxFQ7XST1nH7vWQmPsOF1VePDUIwxuAI8jZwMa1nhHr5DRFtYs3MPYeISprPOuw9pD8GnWbmf00H4Wux0r7");

app.use(express.json());
app.use(cors());

app.post("/api/create-checkout-session", async (req, res) => {
  const { product } = req.body;

  const lineItems = product.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.title
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel"
  });

  res.json({ id: session.id });
});

app.listen(8000, () => {
  console.log("Server running at port 8000");
});

