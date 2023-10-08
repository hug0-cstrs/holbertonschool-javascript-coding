const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

// Function to count and process students' data
async function countStudents(path) {
  try {
    // Read the database file
    const data = await fs.readFile(path, 'utf8');
    const response = [];
    const students = data.split('\n');
    let count = 0;
    // Process each student's data
    for (let i = 1; i < students.length; i += 1) {
      if (students[i]) {
        count += 1;
        const student = students[i].split(',');
        // Group students by field of study
        if (!response[student[3]]) response[student[3]] = [];
        response[student[3]].push(student[0]);
      }
    }
    // Create an array with the results
    const result = [`Number of students: ${count}`];
    for (const key in response) {
      if (key) {
        const list = response[key];
        // Build the response for each field of study
        result.push(`Number of students in ${key}: ${list.length}. List: ${list.join(', ')}`);
      }
    }
    // Join the results and return as a string
    return result.join('\n');
  } catch (error) {
    // Handle errors while reading the database
    throw new Error('Cannot load the database');
  }
}

app.get('/', (req, res) => {
  // Respond with a simple message for the root URL
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    // Call the countStudents function and include the result in the response
    const result = await countStudents(process.argv[2]);
    res.send(`This is the list of our students\n${result}`);
  } catch (error) {
    // Handle errors during student data processing
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
