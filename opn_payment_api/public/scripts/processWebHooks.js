// WebSocket setup
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log('WebSocket connection opened');
};

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log(message);
    // only process message from server if it matches charge ID and is a charge.complete type
    if (message.data.charge_id === currentChargeId && message.type === 'charge.complete') {
        // Additional logic to update the UI or redirect the user
        if (message.data.payment_status === 'successful') {
            document.getElementById('qrCode').style.display = 'none';
            document.getElementById('status').textContent = 'Payment successful!';
            console.log('Charge complete:', message.data);
        } else if (message.data.payment_status === 'failed') {
            document.getElementById('qrCode').style.display = 'none';
            document.getElementById('status').textContent = 'Payment failed because: ' + message.data.failure_message;
        }
    } else {
        // methods to process other messages
    }
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};