function processInput() {
    let inputAmount = parseInt(document.getElementById('amount').value) * 100;
    let minAmount = 2000; // Minimum amount in satangs
    let maxAmount = 15000000; // Maximum amount in satangs

    console.log('Checking if input (' + inputAmount / 100 + 'baht) is between ' + (minAmount / 100) + ' and ' + (maxAmount / 100) + ' baht.');

    if (inputAmount < minAmount || inputAmount > maxAmount) {
        throw new Error('Please enter an amount between ' + (minAmount / 100) + ' and ' + (maxAmount / 100) + ' baht.');
    }

    // Disable the input field and button, and update status
 
    disableInputs()
    let statusDisplay = document.getElementById('status');
    statusDisplay.style.color = 'black';
    statusDisplay.textContent = "Processing...";
    return inputAmount;
}

function disableInputs() {
    let inputField = document.getElementById('amount');
    inputField.disabled = true;
    let promptPayButton = document.getElementById('promptPayButton');
    promptPayButton.disabled = true;
    let rabbitLinePayButton = document.getElementById('rabbitLinePayButton');
    rabbitLinePayButton.disabled = true;
}
