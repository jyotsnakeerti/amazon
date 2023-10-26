

const functions = require("firebase-functions")
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const stripe = require('stripe')('sk_test_51Nec6XSABs1CDGvtxFQ7XST1nH7vWQmPsOF1VePDUIwxuAI8jZwMa1nhHr5DRFtYs3MPYeISprPOuw9pD8GnWbmf00H4Wux0r7');

const app = express();

// Use the cors middleware
app.use(cors({origin: 'http://localhost:3000'}));

app.use(express.json());

app.get("/", (req,res)=>res.status(200).send("Hello"))


app.post("/api/checkout", async (req, res) => {
  const { items, email } = req.body;

  console.log("payement")
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // Stripe accepts amounts in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cart',
      customer_email: email,
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

exports.api = functions.https.onRequest(app)



