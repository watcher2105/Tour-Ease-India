document.getElementById('checkForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('id').value;

    fetch('/check-id', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('checkResult').textContent = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('checkResult').textContent = 'An error occurred. Please try again.';
    });
});
