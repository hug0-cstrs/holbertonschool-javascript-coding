const http = require('http');
const fs = require('fs');

// Create a server instance
const app = http.createServer((req, res) => {
  // Handle requests for the root URL
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') { // Handle requests for the '/students' URL
    // Read the database file from the command line arguments
    const database = process.argv[2];
    // Read the contents of the database file
    fs.readFile(database, 'utf8', (err, data) => {
      if (err) {
        // Handle errors while reading the database file
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        // Parse the student data from the database file
        const students = data.split('\n').filter((line) => line !== '');
        const fields = {};

        // Group the students by field of study
        students.forEach((student) => {
          const [firstname, , , field] = student.split(',');
          if (!fields[field]) {
            fields[field] = {
              count: 0,
              list: [],
            };
          }
          fields[field].count += 1;
          fields[field].list.push(firstname);
        });

        // Send the response with the list of students grouped by field of study
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is the list of our students\n');
        res.write(`Number of students: ${students.length}\n`);

        for (const field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields, field)) {
            res.write(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].list.join(', ')}\n`);
          }
        }

        res.end();
      }
    });
  } else { // Handle all other requests
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server and listen on port 1245
app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

// Export the server instance for testing purposes
module.exports = app;
