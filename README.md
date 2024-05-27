# CloudNC Internship Project

This project demonstrates handling webhooks from Omise.js using a Node.js server with Express.js.

## Prerequisites

- Node.js
- npm
- ngrok (optional, for exposing local server)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/setl1n/cloudnc_internship.git
   cd cloudnc_internship
2. **Install Depedencies:**
   ```bash
   npm install
## Running the server
**Note:** You will need 3 concurrent terminal windows or tabs to run the client, server and ngrok simultaneously.
1. **Start the client**  
   Run the client to serve front-end files on port 8000:
   ```bash
   npm run client
2. **Start the server**  
   Run the server to handle webhook events on port 3000:
   ```bash
   npm run server
3. **Expose the Server with ngrok**  
   Use ngrok to expose the local server to the internet:
   ```bash
   npm run start-ngrok
   ```
   This provides a public URL for webhook testing.

## Testing Promptpay from Opn Payments
