const mongoose = require('mongoose')
const Schema = mongoose.Schema
// import User from '../models/user'

const Round = new Schema({
  // users: [User],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Round', Round)
