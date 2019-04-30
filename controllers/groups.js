var mongoose = require('mongoose')
var crypto = require('crypto')
var Group = require('../models/group')

module.exports.fetchAll = (req, res) => {
  Group.find({}, (err, result) => {
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
      message: 'Groups fetched successfully',
      data: result
    })
  })
}

module.exports.fetchOne = (req, res) => {
  Group.findOne({ groupId: req.params.id }, (err, result) => {
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
      message: 'Group fetched successfully',
      data: result
    })
  })
}

/*
 * Todo(shumba): add comments to each function.
 */
module.exports.fetchUserByName = (req, res) => {
  Group.findOne({ users: req.params.username }, (err, result) => {
    console.log(result)
    if (err || !result) { 
      return res.status(500).json({
        success: false,
        message: 'Error!'
      })
    }
    if (result.length < 1) {
      return res.status(500).json({
        success: false,
        message: 'None.'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Fetched user successfully',
      data: result
    })
  })
}

module.exports.add = (req, res) => {
  newGroupId = crypto.randomBytes(4).toString('hex')
  var newGroup = new Group({
    groupId: newGroupId,
    users: req.body.users ? req.body.users : [],
    bills: req.body.bills ? req.body.bills : [],
    name: req.body.name ? req.body.name : `Group ${newGroupId}`
  })
  newGroup.save((err, group) => {
    if (err || !group) {
      return res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'New group created successfully',
      groupId: group.groupId
    })
  })
}

module.exports.update = (req, res) => {
  var queryData = {}
  if (req.body.users) queryData.users = req.body.users
  if (req.body.bills) queryData.bills = req.body.bills
  if (req.body.name) queryData.name = req.body.name

  Group.findOneAndUpdate({groupId: req.params.id}, queryData, {new: true}, (err, result) => {
    if (err || !result) {
      return res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Group updated successfully',
      group: result
    })
  })
}

module.exports.addUser = (req, res) => {
  if (req.body.username && req.params.id) {
    Group.findOneAndUpdate({groupId: req.params.id}, {$push: { users: req.body.username }},
      {new: true}, (err, result) => {
        if (err || !result) {
          return res.status(500).json({
            success: false,
            message: 'Error'
          })
        }
        return res.status(200).json({
          success: true,
          message: 'User added to group successfully',
          group: result
        })
    })
  } else {
    return res.status(500).json({
      success: false,
      message: 'Error'
    })
  }
}

module.exports.remove = (req, res) => {
  Group.deleteOne({groupId: req.params.id}, (err, result) => {
    if (result.deletedCount) {
      console.log(result)
      return res.status(200).json({
        success: true,
        message: 'Group deleted successfully'
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
