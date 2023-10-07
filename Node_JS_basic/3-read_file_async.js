const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n');
        const headers = lines.shift().split(',');
        const students = lines.map((line) => line.split(',')).filter((student) => student.length === headers.length);
        const fields = {};
        students.forEach((student) => {
          headers.forEach((header, index) => {
            if (student[index] !== '') {
              if (fields[header] === undefined) {
                fields[header] = [];
              }
              fields[header].push(student[index]);
            }
          });
        });
        console.log(`Number of students: ${students.length}`);
        for (const field in fields) {
          if (Object.prototype.hasOwnProperty.call(fields, field)) {
            console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
          }
        }
        resolve();
      }
    });
  });
}

module.exports = countStudents;
