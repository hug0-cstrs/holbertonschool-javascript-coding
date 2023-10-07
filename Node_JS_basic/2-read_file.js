const fs = require('fs');

// Define a function that takes a file path as an argument
function countStudents(path) {
  try {
    // Read the file synchronously and split it into an array of lines
    const data = fs.readFileSync(path, 'utf8').split('\n');

    // Remove any empty lines from the end of the file
    while (data[data.length - 1] === '') {
      data.pop();
    }

    // Map each line to an array of values and store the resulting array of arrays in a variable
    const students = data.map((line) => line.split(','));

    // Create an empty object to store the count and list of students for each field of study
    const fields = {};

    // Loop through each student and update the count and list for their field of study
    students.forEach((student) => {
    // Destructure the student array to get the first name and field of study
      const [firstname, , , field] = student;
      // If the field of study is not yet in the fields object, add it with an empty count and list
      if (!fields[field]) {
        fields[field] = {
          count: 0,
          list: [],
        };
      }
      fields[field].count += 1; // Increment the count for the field of study
      // Add the student's first name to the list for the field of study
      fields[field].list.push(firstname);
    });

    // Log the total number of students
    console.log(`Number of students: ${students.length}`);

    // Loop through each field of study and log the count and list of students
    for (const field in fields) {
    // Check if field is a direct property of the fields object (not inherited from the prototype)
      if (Object.prototype.hasOwnProperty.call(fields, field)) {
        console.log(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].list.join(', ')}`);
      }
    }
  } catch (error) { // If there is an error reading the file, throw a new error with a message
    throw new Error('Cannot load the database');
  }
}

// Export the countStudents function as a module
module.exports = countStudents;
