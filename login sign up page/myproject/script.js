document.getElementById('inputForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const mobile = document.getElementById('mobile').value;
    const emergencyContact = document.getElementById('emergencyContact').value;
    const bloodGrp = document.getElementById('bloodGrp').value;
    const nationality = document.getElementById('nationality').value;
    const purpose = document.getElementById('purpose').value;
    const medicalHistory = document.getElementById('medicalHistory').value;

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            name: name, 
            email: email,
            gender: gender,
            age: age,
            mobile: mobile,
            emergencyContact: emergencyContact,
            bloodGrp: bloodGrp,
            nationality: nationality,
            purpose: purpose,
            medicalHistory: medicalHistory
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'New record created successfully') {
            window.location.href = 'check.html';
        } else {
            document.getElementById('result').textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'An error occurred. Please try again.';
    });
});
