var mongoose = require('mongoose')
var User = require('../models/user')

module.exports.fetchAll = (req, res) => {
  User.find({}, (err, result) => {
    if (err) throw (err)
    if (result) {
      console.log('Get request for users')
      res.status(200).json(result)
    }
  })
}

module.exports.fetchOne = (req, res) => {
  res.status(200).json({
    success: true
  })
}

module.exports.add = (req, res) => {
  res.status(200).json({
    success: true
  })
}

module.exports.update = (req, res) => {
  res.status(200).json({
    success: true
  })
}

module.exports.remove = (req, res) => {
  res.status(200).json({
    success: true
  })
}