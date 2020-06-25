'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = Schema( {
  googleid: String,
  googletoken: String,
  googlename: String,
  googleemail: String,
} );

module.exports = mongoose.model('UserT4', userSchema);
