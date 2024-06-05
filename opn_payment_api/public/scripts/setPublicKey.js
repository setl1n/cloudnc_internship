// scripts/setPublicKey.js

async function setPublicKey() {
    try {
        const response = await fetch('http://localhost:3000/public-key');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log("Setting public key from server: ", data);
        Omise.setPublicKey(data.OMISE_PUBLIC_KEY);
    } catch (error) {
        console.error('There was a problem setting pubic key: ', error);
    }
}

setPublicKey();
