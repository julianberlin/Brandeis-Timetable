"use strict";

const mongoose = require("mongoose");
const adminList = require("./models/Admin");

mongoose.connect(
  'mongodb://localhost/timetable',
  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}
);

mongoose.connection;

let admins = [
  {
    googleemail: "chena@brandeis.edu"
  },
  {
    googleemail: "tianqizhao@brandeis.edu"
  },
  {
    googleemail: "julianb@brandeis.edu"
  },
  {
    googleemail: "louiszhao0517@gmail.com"
  }
];

adminList.deleteMany()
  .exec()
  .then(() => {
    console.log("Delete all admins");
  });

let commands = [];

admins.forEach((i) => {
  commands.push(adminList.create({
    googleemail: i.googleemail
  }));
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`Error: ${error}`);
  });
