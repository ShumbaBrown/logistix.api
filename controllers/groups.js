var mongoose = require('mongoose')
var crypto = require('crypto')
var Group = require('../models/group')

module.exports.fetchAll = (req, res) => {
  Group.find({}, (err, result) => {
    if (err || result.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (result) {
      console.log('Get request for groups')
      res.status(200).json({
        success: true,
        message: 'Groups fetched successfully',
        data: result
      })
    } else res.status(400).json({
      success: false,
      message: 'None'
    })
  })
}

module.exports.fetchOne = (req, res) => {
  Group.findOne({ groupId: req.params.id }, (err, result) => {
    if (err || result.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Group fetched successfully',
        data: result
      })
    } else res.status(400).json({
      success: false,
      message: 'None'
    })
  })
}

module.exports.add = (req, res) => {
  var newGroup = new Group({
    groupId: crypto.randomBytes(4).toString('hex'),
    users: []
  })

  newGroup.save((err, group) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    res.status(200).json({
      success: true,
      message: 'New group created successfully',
      groupId: group.groupId
    })
  })
}

module.exports.update = (req, res) => {
  var queryData = {}
  if (req.query.users) queryData.users = req.query.users

  Group.updateOne({groupId: req.params.id}, queryData, (err, group) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (group.ok) {
      res.status(200).json({ 
        success: true,
        message: 'Group updated successfully'
      })
    }
  })
}

module.exports.remove = (req, res) => {
  Group.deleteOne({groupId: req.params.id}, (err) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Group deleted successfully'
    })
  })
}