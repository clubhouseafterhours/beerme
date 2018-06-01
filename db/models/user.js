const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  username: String,
  realname: String,
  beersInFridge: Number,
  beersReceived: Number,
  saladsReceived: Number,
  create: { type: Date, defaut: Date.now },
  updated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', User)
