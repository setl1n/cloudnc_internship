# CloudNC Opn Payments API Project

This project demonstrates handling webhooks from Omise.js using a Node.js server with Express.js.

## Prerequisites

- Node.js
- npm
- ngrok (optional, for exposing local server)

## Installation and Set Up

1. **Clone the repository:**
   ```bash
   git clone https://github.com/setl1n/cloudnc_internship.git
   cd cloudnc_internship/opn_payment_api
   ```
2. **Install Depedencies:**
   ```bash
   npm install
   ```
3. **Create Opn Payments' Omise API account**  
   Create a *[free Opn Payments' Omise API account](https://dashboard.omise.co/v2)* to generate own set of API keys for testing  

4. **Create .env file for API key configuration**  
   Create a new `.env` file in the `opn_payment_api` folder and insert your own API keys from your Opn Payments account in the format below:  
   **Note:** API Keys can be found at Settings > Keys on the Opn Website
   ```makefile
   OMISE_PUBLIC_KEY=<insert_own_public_key_here>
   OMISE_SECRET_KEY=<insert_own_private_key_here>
   ```
   For example, if your public key is "abcdefg" and your private key is "123456" your `.env` file should look like this:
   ```makefile
   OMISE_PUBLIC_KEY=abcdefg
   OMISE_SECRET_KEY=123456
   ```

## Install ngrok
Check if ngrok is installed in your system by running the following command in terminal/command prompt:
```bash
ngrok version
```
You may skip these steps if ngrok is installed.
1. **Install ngrok using Homebrew.**  
If you are using macOS and have Homebrew installed, you can install ngrok using the following command:
```bash
brew install ngrok
```
2. **Sign up for a *[free ngrok account](https://ngrok.com/)* and get authorisation token from *[ngrok dashboard](https://dashboard.ngrok.com/)*.**
Run the following command to set your authtoken:
```bash
ngrok authtoken YOUR_AUTHTOKEN
```
Replace YOUR_AUTHTOKEN with the token you copied.

## Running the server
**Note:** You will need 3 concurrent terminal windows or tabs to run the client, server and ngrok simultaneously.
1. **Start the server**  
   Run the server to handle webhook events on port 3000:
   ```bash
   npm run server
   ```
2. **Start the client**  
   Run the client to serve front-end files on port 8000:
   ```bash
   npm run client
   ```
3. **Expose the Server with ngrok**  
   Use ngrok to expose the local server to the internet:  
   **Note:** Server runs on port 3000 by default, change the command according to the port your server is running on.  
   ```bash
   ngrok http 3000
   ```
     
   This command provides a public URL for webhook testing.

## Testing Promptpay from Opn Payments
1. **Configure Webhook URL**  
Append the public URL generated by ngrok with \`**/webhook**\` and insert as Opn Payment's Webhook Endpoint under Settings > Webhooks.  

   For example, if your ngrok console shows:
   ```
   Forwarding    https://414b-2405-9800-b660-485e-64d8-6f63-b690-99f7.ngrok-free.app -> http://localhost:3000
   ```
   You should insert:
   ```
   https://414b-2405-9800-b660-485e-64d8-6f63-b690-99f7.ngrok-free.app/webhook
   ```
   into the Opn Payments configuration.

2. **Load Client Webpage**  
   Load the client webpage at the IP address indicated on the \`npm run client\` terminal with \`*/client.html*\` appended.  

   For example, if the terminal shows: 
    ```
    Available on:
    http://127.0.0.1:8000
    http://192.168.1.144:8000
    ```
   Load the client webpage at \`http://127.0.0.1:8000/client.html\`.

3. **Submit Payment**  
   Insert a number between 20 and 150,000 into the input field and submit.

4. **Check Charges**  
   A new charge should appear in your Opn Payments' charges. Imitate the client's payment through the Opn Payments website.

5. **Verify Payment**  
   The payment should be reflected accordingly on the client's webpage.