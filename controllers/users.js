var mongoose = require('mongoose')
var crypto = require('crypto')
var User = require('../models/user')

module.exports.fetchAll = (req, res) => {
  User.find({}, (err, result) => {
    if (err || !result) {
      return res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
    if (result.length < 1) {
      return res.status(200).json({
        success: false,
        message: 'None'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: result
    })
  })
}

module.exports.fetchOne = (req, res) => {
  User.findOne({ userId: req.params.id }, (err, result) => {
    if (err || !result) {
      return res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
    if (result.length < 1) {
      return res.status(200).json({
        success: false,
        message: 'None'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result
    })
  })
}

module.exports.add = (req, res) => {
  newUserId = crypto.randomBytes(4).toString('hex')
  var newUser = new User({
    userId: newUserId,
    username: req.query.username,
    firstName: req.query.firstName ? req.query.firstName : '',
    lastName: req.query.lastName ? req.query.lastName : '',
    password: req.query.password ? req.query.password : 'P4ssw0rd',
    bills: req.query.bills ? req.query.bills : [],
    groups: req.query.groups ? req.query.groups : [],
  })

  newUser.save((err, user) => {
    if (err || !user) {
      return res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'New user created successfully',
      userId: user.userId
    })
  })
}

module.exports.update = (req, res) => {
  var queryData = {}
  if (req.query.firstName) queryData.firstName = req.query.firstName
  if (req.query.lastName) queryData.lastName = req.query.lastName
  if (req.query.username) queryData.username = req.query.username
  if (req.query.password) queryData.password = req.query.password
  if (req.query.bills) queryData.bills = req.query.bills
  if (req.query.groups) queryData.groups = req.query.groups

  User.findOneAndUpdate({userId: req.params.id}, queryData, (err, user) => {
    if (err || !result) {
      return res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      bill: result
    })
  })
}

module.exports.remove = (req, res) => {
  User.deleteOne({userId: req.params.id}, (err, result) => {
    if (result.deletedCount) {
      console.log(result)
      return res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      })
    }
    if (err || !result.deletedCount) {
      return res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
  })
}