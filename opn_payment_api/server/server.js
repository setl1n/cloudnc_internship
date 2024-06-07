require('dotenv').config();
const OMISE_SECRET_KEY = process.env.OMISE_SECRET_KEY;
const OMISE_PUBLIC_KEY = process.env.OMISE_PUBLIC_KEY;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const omise = require('omise')({
    'secretKey': OMISE_SECRET_KEY,
    'omiseVersion': '2019-05-29'
});
const http = require('http');
const WebSocket = require('ws');

const connectToDatabase = require('./services/db.js');


const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(bodyParser.json()); // Add this line to parse JSON request bodies

let db;

// attaches database to db variable for every request
app.use(async (req, res, next) => {
    if (!db) {
        db = await connectToDatabase();
    }
    req.db = db;
    next();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
})

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});


// Simple GET route to verify the server is running
app.get('/', async (req, res) => {
    res.send('Server is running');
});

app.get('/public-key', (req, res) => {
    res.json({ OMISE_PUBLIC_KEY });
});

app.post('/create-charge', async (req, res) => {
    try {
        const { sourceId, amount, currency, return_uri } = req.body;

        const charge = await omise.charges.create({
            'amount': amount,
            'currency': currency,
            'source': sourceId,
            'return_uri': return_uri,
        });

        res.status(200).json(charge);
    } catch (error) {
        console.error('Error creating charge:', error); // Log the error to the console
        res.status(500).json({ error: error.toString() });
    }
});

// Endpoint to handle webhook events from Omise
app.post('/webhook', async (req, res) => {
    const event = req.body;

    // assigning variables for database storage
    const collection = req.db.collection('transactions');
    const documents = await collection.find({}).toArray();
    console.log(documents);
    
    console.log('Received webhook event:');
    console.log('Event type: ', event.key);

    if (event.key == 'charge.create') {
        res.status(200).send('Charge.create webhook event, no action from server');
    } else if (event.key === 'charge.complete') {
        try {
            if (event.data.status == 'successful') {
                // Make a GET request to Omise API to verify the charge status
                const chargeId = event.data.id;
                const response = await axios.get(`https://api.omise.co/charges/${chargeId}`, {
                    auth: {
                        username: OMISE_SECRET_KEY,
                        password: ''
                    }
                });
                const verifiedCharge = response.data;

                if (verifiedCharge.status === 'successful') {
                    console.log('Charge independently verified as successful:', verifiedCharge);

                    // Notify all connected WebSocket clients
                    wss.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({
                                type: 'charge.complete',
                                data: verifiedCharge
                            }));
                        }
                    });
                    // Process the verified successful charge
                    res.status(200).send('Charge was successful. Verified and processed');
                }
            } else if (event.data.status == 'failed') {
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'charge.complete',
                            data: event.data
                        }));
                    }
                });
                res.status(200).send('Payment failed but was processed successfully by the server and client.');
            } else {
                // charge expiered
                console.log('Charge expired.');
                res.status(501).send('Unhandled expired event');
            }
        } catch (error) {
            console.error('Error verifying charge:', error);
            res.status(500).send('Error verifying charge');
        }
    } else {
        console.log('Unhandled event type:', event.key);
        res.status(200).send('Unhandled event type');
    }
});


