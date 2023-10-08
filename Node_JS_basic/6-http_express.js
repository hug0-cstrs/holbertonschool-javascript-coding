const express = require('express');

// Create an instance of the Express application
const app = express();

// Define a route for the root URL '/'
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Start the HTTP server on port 1245
app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

// Export the Express app for testing purposes
module.exports = app;
