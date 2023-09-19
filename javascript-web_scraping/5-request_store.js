#!/usr/bin/node
const request = require('request');
const fs = require('fs'); // file system
const url = process.argv[2]; // url to request
const path = process.argv[3]; // path to store the body response

request(url, function (err, response, body) {
  if (err) {
    console.log(err);
  } else {
    fs.writeFile(path, body, 'utf-8', function (err) {
      if (err) {
        console.log(err);
      }
    }); // write the body response to the file
  }
}); // request and store the body response to a file
