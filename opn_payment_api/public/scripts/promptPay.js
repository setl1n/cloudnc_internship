function payWithPromptPay() {
    try {
        let inputAmount = processInput();
        Omise.createSource('promptpay', {
            "amount": inputAmount,
            "currency": "THB"
        }, handleSourceCreated);
    } catch (error) {
        let statusDisplay = document.getElementById('status');
        statusDisplay.textContent = error.message;
        statusDisplay.style.color = 'red';
    }
}

function handleSourceCreated(statusCode, response) {
    let statusDisplay = document.getElementById('status');

    if (statusCode === 200) {
        fetch('http://localhost:3000/create-charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sourceId: response.id,
                amount: response.amount,
                currency: response.currency,
            })
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => { throw new Error(err.error) });
                }
                return res.json();
            })
            .then(data => {
                console.log("Charge created: ", data);
                if (data.status === 'pending') {
                    statusDisplay.textContent = "Pending Transfer";
                    currentChargeId = data.id;

                    // Display QR Code if available
                    if (data.source && data.source.scannable_code && data.source.scannable_code.image && data.source.scannable_code.image.download_uri) {
                        var qrCodeImage = document.getElementById('qrCode');
                        qrCodeImage.src = data.source.scannable_code.image.download_uri;
                        qrCodeImage.style.display = 'block';
                    }
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