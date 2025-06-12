const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("from-currency");
const toCurrencySelect = document.getElementById("to-currency");
const convertButton = document.getElementById("convert-btn");
const resultDiv = document.getElementById("result");

const apiKey = "71fe3292ba781811dd3c9fb0";

convertButton.addEventListener("click", () => {
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount === "" || isNaN(amount)) {
        resultDiv.innerText = "⚠️ Please enter a valid amount.";
        return;
    }

    
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

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
