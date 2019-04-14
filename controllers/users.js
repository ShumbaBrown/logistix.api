var mongoose = require('mongoose')
var crypto = require('crypto')
var User = require('../models/user')

module.exports.fetchAll = (req, res) => {
  User.find({}, (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (result) {
      console.log('Get request for users')
      return res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data: result
      })
    } else return res.status(400).json({
      success: false,
      message: 'None'
    })
  })
}

module.exports.fetchOne = (req, res) => {
  User.findOne({ userId: req.params.id }, (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: result
      })
    } else return res.status(400).json({
      success: false,
      message: 'None'
    })
  })
}

module.exports.add = (req, res) => {
  var newUser = new User({
    userId: crypto.randomBytes(4).toString('hex'),
    username: req.params.id,
    firstName: req.query.firstName ? req.query.firstName : '',
    lastName: req.query.lastName ? req.query.lastName : '',
    password: req.query.password ? req.query.password : 'P4ssw0rd',
    bills: req.query.bills ? req.query.bills : [],
    groups: req.query.groups ? req.query.groups : [],
  })

  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({
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

  User.updateOne({userId: req.params.id}, queryData, (err, user) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (user.ok) {
      return res.status(200).json({ 
        success: true,
        message: 'User updated successfully'
      })
    }
  })
}

module.exports.remove = (req, res) => {
  User.deleteOne({userId: req.params.id}, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    })
  })
}