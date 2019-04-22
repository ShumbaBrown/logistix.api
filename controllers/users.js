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
  User.findOne({ username: req.query.username }, (err, result) => {
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
    username: req.body.username,
    firstName: req.body.firstName ? req.body.firstName : '',
    lastName: req.body.lastName ? req.body.lastName : '',
    password: req.body.password ? req.body.password : 'P4ssw0rd',
    bills: req.body.bills ? req.body.bills : [],
    groups: req.body.groups ? req.body.groups : [],
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
  if (req.body.firstName) queryData.firstName = req.body.firstName
  if (req.body.lastName) queryData.lastName = req.body.lastName
  if (req.body.username) queryData.username = req.body.username
  if (req.body.password) queryData.password = req.body.password
  if (req.body.bills) queryData.bills = req.body.bills
  if (req.body.groups) queryData.groups = req.body.groups

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

// module.exports.login = (req, res) => {
//   User.findOne({ username: req.body.username }, (err, result) => {
//     if (err || !result) {
//       return res.status(500).json({
//         success: false,
//         message: 'Error'
//       })
//     }
//     if (result.length < 1) {
//       return res.status(200).json({
//         success: false,
//         message: 'None'
//       })
//     }
//     if (req.body.password == result)
//     return res.status(200).json({
//       success: true,
//       message: 'User fetched successfully',
//       data: result
//     })
//   })
// }