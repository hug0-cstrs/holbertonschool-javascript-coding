const fs = require('fs');

function countStudents(path) {
  if (!fs.existsSync(path)) {
    console.log(`File ${path} does not exist`);
    return null;
  }

  try {
    const data = fs.readFileSync(path, 'utf8').split('\n');

    // Remove any empty lines from the end of the file
    while (data[data.length - 1] === '') {
      data.pop();
    }

    if (data.length === 0) {
      console.log(`File ${path} is empty`);
      return {};
    }

    const students = data.map((line) => line.split(','));
    const header = students.shift(); // Remove the header

    const fields = {};

    students.forEach((student) => {
      const [firstname, lastname, age, field] = student;
      if (!fields[field]) {
        fields[field] = {
          count: 0,
          list: [],
        };
      }
      fields[field].count++;
      fields[field].list.push(firstname);
    });

    console.log(`Number of students: ${students.length}`);

    for (const field in fields) {
      console.log(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].list.join(', ')}`);
    }

    return fields;
  } catch (error) {
    console.log(`Error reading file ${path}: ${error.message}`);
    return null;
  }
}

module.exports = countStudents;
