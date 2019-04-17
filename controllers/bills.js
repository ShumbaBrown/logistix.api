var mongoose = require('mongoose')
var crypto = require('crypto')
var Bill = require('../models/bill')

module.exports.fetchAll = (req, res) => {
  Bill.find({}, (err, result) => {
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
      message: 'Bills fetched successfully',
      data: result
    })
  })
}

module.exports.fetchOne = (req, res) => {
  Bill.findOne({ billId: req.params.id }, (err, result) => {
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
      message: 'Bill fetched successfully',
      data: result
    })
  })
}

module.exports.add = (req, res) => {
  const newBillId = crypto.randomBytes(4).toString('hex')
  var newBill = new Bill({
    billId: newId,
    groupId: req.query.groupId ? req.query.groupId : '',
    users: req.query.users ? req.query.users : [],
    name: req.query.name ? req.query.name : `Bill ${newBillId}`
  })
  newBill.save((err, bill) => {
    if (err || !bill) {
      return res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'New bill created successfully',
      billId: bill.billId
    })
  })
}

module.exports.update = (req, res) => {
  var queryData = {}
  if (req.query.groupId) queryData.groupId = req.query.groupId
  if (req.query.users) queryData.users = req.query.users
  if (req.query.name) queryData.name = req.query.name

  Bill.findOneAndUpdate({billId: req.params.id}, queryData, {new: true}, (err, result) => {
    if (err || !result) {
      return res.status(500).json({
        success: false,
        message: 'Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Bill updated successfully',
      bill: result
    })
  })
}

module.exports.remove = (req, res) => {
  Bill.deleteOne({billId: req.params.id}, (err, result) => {
    if (result.deletedCount) {
      console.log(result)
      return res.status(200).json({
        success: true,
        message: 'Bill deleted successfully'
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