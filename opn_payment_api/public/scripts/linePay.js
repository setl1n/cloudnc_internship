{
    function payWithLinePay() {
        try {
            let inputAmount = processInput();
            Omise.createSource('rabbit_linepay', {
                "amount": inputAmount,
                "currency": "THB"
            }, handleSourceCreated);
        } catch (error) {
            let statusDisplay = document.getElementById('status');
            statusDisplay.textContent = error.message;
            statusDisplay.style.color = 'red';
        }
    }
    let handleSourceCreated = (statusCode, response) => {
        let statusDisplay = document.getElementById('status');
        if (statusCode === 200) {
            console.log("Response from Omise.js: ", response);
            let protocol = window.location.protocol;
            let hostname = window.location.hostname;
            let port = window.location.port;

            fetch('http://localhost:3000/create-charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sourceId: response.id,
                    amount: response.amount,
                    currency: response.currency,
                    return_uri: `${protocol}${hostname}:${port}/completionpage.html?sourceid=${response.id}`
                })
            })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(err => { throw new Error(err.error) });
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.status === 'pending') {
                        statusDisplay.textContent = "Pending Transfer";
                        currentChargeId = data.id;
                        window.open(data.authorize_uri, '_blank');
                    }
                })
                .catch(error => {
                    console.error('Error creating charge: ', error);
                    statusDisplay.textContent = "Failed to process the charge.";
                });
        } else {
            console.error(response);
            statusDisplay.textContent = "Failed to create source.";
        }
    }
}