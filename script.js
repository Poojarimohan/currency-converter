const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const convertButton = document.getElementById("convert-btn");
const resultDiv = document.getElementById("result");

// Sample API Key (replace this later with your own)
const apiKey = "71fe3292ba781811dd3c9fb0";

// Add event listener to the Convert button
convertButton.addEventListener("click", () => {
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Basic input check
    if (amount === "" || isNaN(amount)) {
        resultDiv.innerText = "⚠️ Please enter a valid amount.";
        return;
    }

    // Construct API URL
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    // Fetch exchange rate
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === "error") {
                resultDiv.innerText = "❌ API error or invalid key.";
                return;
            }

            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);

            resultDiv.innerText = `✅ ${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => {
            console.error("Error:", error);
            resultDiv.innerText = "❌ Something went wrong. Try again.";
        });
});
