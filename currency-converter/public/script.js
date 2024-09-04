document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convert');
    const resultDiv = document.getElementById('result');

    fetch('/api/rates')
        .then(response => response.json())
        .then(data => {
            const rates = data.rates;
            const currencies = Object.keys(rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                const option2 = document.createElement('option');
                option1.value = option2.value = currency;
                option1.textContent = option2.textContent = currency;
                fromCurrency.appendChild(option1);
                toCurrency.appendChild(option2);
            });
        });

    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount';
            return;
        }

        fetch('/api/rates')
            .then(response => response.json())
            .then(data => {
                const rates = data.rates;
                const convertedAmount = (amount / rates[from]) * rates[to];
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
            })
            .catch(error => {
                resultDiv.textContent = 'Error fetching exchange rates';
            });
    });
});
