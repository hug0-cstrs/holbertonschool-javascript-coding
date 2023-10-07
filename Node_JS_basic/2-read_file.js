const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter((line) => line);
    const fields = {};
    let students = 0;

    lines.forEach((line) => {
      const student = line.split(',');
      if (!fields[student[3]]) {
        fields[student[3]] = [];
      }
      if (student[0]) {
        fields[student[3]].push(student[0]);
        students += 1;
      }
    });

    console.log(`Number of students: ${students}`);
    for (const field in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        const list = fields[field].join(', ');
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${list}`);
      }
    }
  } catch (err) {
    console.error(`Cannot load the database: ${err}`);
  }
}

countStudents('database.csv');
