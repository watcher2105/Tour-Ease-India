let personCount = 3;

function updateGroupSize(change) {
    const groupSizeInput = document.getElementById('group-size');
    let newSize = parseInt(groupSizeInput.value) + change;
    newSize = newSize < 1 ? 1 : newSize;
    groupSizeInput.value = newSize;
}

function startCalculation() {
    const size = parseInt(document.getElementById('group-size').value);
    localStorage.setItem('groupSize', size);
    window.location.href = 'split.html';
}

function populatePeopleList() {
    const size = localStorage.getItem('groupSize');
    const peopleList = document.getElementById('people-list');
    for (let i = 1; i <= size; i++) {
        addPerson(i);
    }
}

function addPerson(index) {
    const peopleList = document.getElementById('people-list');
    const personDiv = document.createElement('div');
    personDiv.className = 'person';
    personDiv.innerHTML = `
        <input type="text" placeholder="Name ${index}" id="name-${index}">
        <input type="number" placeholder="Amount" id="amount-${index}" min="0">
    `;
    peopleList.appendChild(personDiv);
}

async function calculateSplit() {
    const people = [];
    for (let i = 1; i <= localStorage.getItem('groupSize'); i++) {
        const name = document.getElementById(`name-${i}`).value || `Person ${i}`;
        const amount = parseFloat(document.getElementById(`amount-${i}`).value) || 0;
        people.push({ name, amount });
    }

    const response = await fetch('/split', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ people })
    });

    const result = await response.json();
    displayResult(result);
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Who pays whom how much:<br>';
    result.transactions.forEach(transaction => {
        resultDiv.innerHTML += `${transaction.from} pays ${transaction.amount} to ${transaction.to}<br>`;
    });
}

if (window.location.pathname.endsWith('split.html')) {
    populatePeopleList();
}
