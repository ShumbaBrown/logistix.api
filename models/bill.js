var mongoose = require('mongoose')

var billSchema = mongoose.Schema({
  billId: String,
  groupId: String,
  users: Array
})

module.exports = mongoose.model('Bill', billSchema)
