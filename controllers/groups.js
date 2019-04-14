var mongoose = require('mongoose')
var crypto = require('crypto')
var Group = require('../models/group')

module.exports.fetchAll = (req, res) => {
  Group.find({}, (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (result) {
      console.log('Get request for groups')
      return res.status(200).json({
        success: true,
        message: 'Groups fetched successfully',
        data: result
      })
    } else return res.status(400).json({
      success: false,
      message: 'None'
    })
  })
}

module.exports.fetchOne = (req, res) => {
  Group.findOne({ groupId: req.params.id }, (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Group fetched successfully',
        data: result
      })
    } else return res.status(400).json({
      success: false,
      message: 'None'
    })
  })
}

module.exports.add = (req, res) => {
  var newGroup = new Group({
    groupId: crypto.randomBytes(4).toString('hex'),
    users: req.query.users ? req.query.users : [],
    bills: req.query.bills ? req.query.bills : [],
  })

  newGroup.save((err, group) => {
    if (err) {
      return res.status(400).json({
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

  Group.updateOne({groupId: req.params.id}, queryData, (err, group) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (group.ok) {
      return res.status(200).json({ 
        success: true,
        message: 'Group updated successfully'
      })
    }
  })
}

module.exports.remove = (req, res) => {
  Group.deleteOne({groupId: req.params.id}, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Group deleted successfully'
    })
  })
}