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

module.exports.add = (req, res) => {
  newGroupId = crypto.randomBytes(4).toString('hex')
  var newGroup = new Group({
    groupId: newGroupId,
    users: req.query.users ? req.query.users : [],
    bills: req.query.bills ? req.query.bills : [],
    name: req.query.name ? req.query.name : `Group ${newGroupId}`
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
  if (req.query.users) queryData.users = req.query.users
  if (req.query.bills) queryData.bills = req.query.bills
  if (req.query.name) queryData.name = req.query.name

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