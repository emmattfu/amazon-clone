const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51HT0EgLDM9Q25ThyZPYUis2aU6kB05xjIzTjgTSIgAgj3247WrLIY0CKMvPmBXKygSIvUipDgeUR6maVIsN6YMYl00MVdKLwSk');

// API

// App config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    console.log('payment req recieved', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    });

    // Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

//Listen command
exports.api = functions.https.onRequest(app)