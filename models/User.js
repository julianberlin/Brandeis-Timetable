'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = Schema( {
  googleid: String,
  googletoken: String,
  googlename: String,
  googleemail: String,
  gridids: [ObjectId]
} );

module.exports = mongoose.model('UserT4', userSchema);
