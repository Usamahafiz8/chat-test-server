const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid'); // We'll use uuid to generate random tokens.

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// In-memory data store
const dataStore = {};

// API to generate authentication token
app.post('/api/generate-token', (req, res) => {
  const userDetails = req.body;
  const authToken = uuid.v4(); // Generate a random token

  // Store the user details with the generated token
  dataStore[authToken] = userDetails;

  res.json({ authToken });
});

// API to retrieve data using authentication token
  app.get('/api/get-data', (req, res) => {
  const authToken = req.header('Authorization');

  if (!authToken || !dataStore[authToken]) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userDetails = dataStore[authToken];
  res.json(userDetails);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
