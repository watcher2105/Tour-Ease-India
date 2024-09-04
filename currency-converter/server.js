const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4500;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to get exchange rates
app.get('/api/rates', async (req, res) => {
    try {
        const response = await axios.get('your api url');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
