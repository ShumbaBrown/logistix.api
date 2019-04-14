var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  bills: Array,
  groups: Array,
})

module.exports = mongoose.model('User', userSchema)
