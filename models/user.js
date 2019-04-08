var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  username: String,
  password: String
})

module.exports = mongoose.model('User', userSchema)
