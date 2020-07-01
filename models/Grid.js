'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const gridSchema = Schema( {
  prof_name: String,
  department: String,
  courseid: String,
  prof_hours: String,
  prof_office: String,
  tas: [{ta_name: String, ta_hours: String}]
  //bugs: [{bugs_name: String, bugs_hous: String}]
});

module.exports = mongoose.model('GridT4', gridSchema);
