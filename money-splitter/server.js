const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/split', (req, res) => {
    const { people } = req.body;
    const totalAmount = people.reduce((sum, person) => sum + person.amount, 0);
    const eachPersonPay = totalAmount / people.length;

    const balances = people.map(person => ({
        name: person.name,
        balance: person.amount - eachPersonPay
    }));

    const creditors = balances.filter(person => person.balance > 0);
    const debtors = balances.filter(person => person.balance < 0);

    const transactions = [];

    while (creditors.length > 0 && debtors.length > 0) {
        const creditor = creditors[0];
        const debtor = debtors[0];
        
        const amount = Math.min(creditor.balance, -debtor.balance);

        transactions.push({
            from: debtor.name,
            to: creditor.name,
            amount: amount.toFixed(2)
        });

        creditor.balance -= amount;
        debtor.balance += amount;

        if (creditor.balance === 0) creditors.shift();
        if (debtor.balance === 0) debtors.shift();
    }

    res.json({ transactions });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
