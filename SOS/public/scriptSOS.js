document.getElementById('sendSMSBtn').addEventListener('click', function() {
    // Get user's location
    navigator.geolocation.getCurrentPosition(function(position) {
        // Extract latitude and longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        // Format location data
        const locationMessage = `Latitude: ${latitude}, Longitude: ${longitude}`;

        // Replace these values with your Twilio Account SID, Auth Token, Twilio phone number, and recipient's phone number
        const accountSid = 'account sid';
        const authToken = 'auth token';
        const fromNumber = 'twilo account no.';
        const toNumber = 'YOur no.';

        // Send the SMS using Twilio's REST API
        fetch(`your twilo api url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
            },
            body: new URLSearchParams({
                'To': toNumber,
                'From': fromNumber,
                'Body': locationMessage
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('SMS sent successfully');
            } else {
                throw new Error('Failed to send SMS');
            }
        })
        .catch(error => {
            console.error('Error sending SMS:', error);
        });
    }, function(error) {
        console.error('Error getting location:', error);
    });
});
