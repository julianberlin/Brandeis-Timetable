'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contactSchema = Schema( {
  name: String,
  email: String,
  message: String
});

module.exports = mongoose.model('ContactT4', contactSchema);
