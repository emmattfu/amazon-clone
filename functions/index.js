const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const { request } = require('express');
const stripe = require('stripe')('sk_test_51HT0EgLDM9Q25ThyZPYUis2aU6kB05xjIzTjgTSIgAgj3247WrLIY0CKMvPmBXKygSIvUipDgeUR6maVIsN6YMYl00MVdKLwSk');

// API

// App config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get('/', (request, response) => response.status(200).send('hello world'))

//Listen command
exports.api = functions.https.onRequest(app)