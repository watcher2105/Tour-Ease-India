const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 5500;

// MySQL connection for main database
const mainDb = mysql.createConnection({
    host: 'your host',
    user: 'your user', // your MySQL username
    password: 'your password', // your MySQL password
    database: 'your database'
});

mainDb.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Main Database Connected...');
});

// MySQL connection for ID matching database
const idDb = mysql.createConnection({
    host: 'your host',
    user: 'your user', // your MySQL username
    password: 'your password', // your MySQL password
    database: 'your second database'
});

idDb.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('ID Database Connected...');
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Routes
app.post('/submit', (req, res) => {
    const { 
        name, email, gender, age, mobile, emergencyContact, bloodGrp, 
        nationality, purpose, medicalHistory 
    } = req.body;
    const query = 'INSERT INTO users (name, email, gender, age, mobile, emergencyContact, bloodGrp, nationality, purpose, medicalHistory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    mainDb.query(query, [name, email, gender, age, mobile, emergencyContact, bloodGrp, nationality, purpose, medicalHistory], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Database insertion failed' });
        } else {
            res.status(200).json({ message: 'New record created successfully' });
        }
    });
});

app.post('/check-id', (req, res) => {
    const { id } = req.body;
    const query = 'SELECT * FROM ids WHERE id = ?';

    idDb.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Database query failed' });
        } else {
            if (result.length > 0) {
                res.status(200).json({ message: 'ID matched' });
            } else {
                res.status(200).json({ message: 'ID not matched' });
            }
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
