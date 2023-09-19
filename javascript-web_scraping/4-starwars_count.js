#!/usr/bin/node
const request = require('request');
const url = process.argv[2];
let count = 0;
request(url, function (err, response, body) {
  if (err) {
    console.log(err);
  } else {
    const results = JSON.parse(body).results;
    for (let i = 0; i < results.length; i++) {
      const characters = results[i].characters;
      for (let j = 0; j < characters.length; j++) {
        if (characters[j].includes('18')) {
          count++;
        }
      }
    }
    console.log(count);
  }
});
