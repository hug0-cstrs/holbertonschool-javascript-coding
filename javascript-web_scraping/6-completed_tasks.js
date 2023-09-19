#!/usr/bin/node
const request = require('request');
const url = process.argv[2]; // url to request

request(url, function (err, response, body) {
  if (err) {
    console.log(err);
  } else {
    const tasks = {};
    const json = JSON.parse(body);
    for (const task of json) {
      if (task.completed === true) {
        if (tasks[task.userId] === undefined) {
          tasks[task.userId] = 1;
        } else {
          tasks[task.userId] += 1;
        }
      }
    }
    console.log(tasks);
  }
}); // request and store the body response to a file
