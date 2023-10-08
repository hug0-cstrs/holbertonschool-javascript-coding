const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!\n');
  } else if (pathname === '/students') {
    const databaseFilePath = process.argv[2];

    if (!databaseFilePath) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Database file not provided.\n');
    } else {
      fs.readFile(databaseFilePath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error.\n');
        } else {
          const students = data
            .split('\n')
            .filter((line) => line.trim() !== '');

          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.write('This is the list of our students\n');

          const countStudents = require('./3-read_file_async');
          countStudents(databaseFilePath, (error, result) => {
            if (error) {
              res.end(`Error: ${error.message}\n`);
            } else {
              res.end(result);
            }
          });
        }
      });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

app.listen(1245);

module.exports = app;
