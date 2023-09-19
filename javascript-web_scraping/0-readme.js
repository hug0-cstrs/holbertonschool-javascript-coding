#!/usr/bin/node
const fs = require('fs');
fs.readFile(process.argv[2], 'utf8', (error, data) => {
  if (error) { console.log(error); } else { console.log(data); }
});
