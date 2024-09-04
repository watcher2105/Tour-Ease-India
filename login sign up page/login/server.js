const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const connection = mysql.createConnection({
  host: 'your host',
  user: 'your user',
  password: 'your password',
  database: 'your database'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Handle form submission
app.post('/check-details', (req, res) => {
  const { name, email } = req.body;
  const query = 'SELECT * FROM users WHERE name = ? AND email = ?';

  connection.query(query, [name, email], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      res.redirect(`/details.html?name=${name}&email=${email}`);
    } else {
      res.send('Details do not match');
    }
  });
});

// Serve user details
app.get('/user-details', (req, res) => {
  const { name, email } = req.query;
  const query = 'SELECT * FROM users WHERE name = ? AND email = ?';

  connection.query(query, [name, email], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(results);
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
