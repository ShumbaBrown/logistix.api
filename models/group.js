var mongoose = require('mongoose')

var groupSchema = mongoose.Schema({
  groupId: String,
  users: Array,
  bills: Array,
})

module.exports = mongoose.model('Group', groupSchema)
