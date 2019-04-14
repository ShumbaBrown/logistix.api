var mongoose = require('mongoose')
var crypto = require('crypto')
var Bill = require('../models/bill')

module.exports.fetchAll = (req, res) => {
  Bill.find({}, (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (result) {
      console.log('Get request for bills')
      return res.status(200).json({
        success: true,
        message: 'Bills fetched successfully',
        data: result
      })
    } else return res.status(400).json({
      success: false,
      message: 'None'
    })
  })
}

module.exports.fetchOne = (req, res) => {
  Bill.findOne({ billId: req.params.id }, (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Bill fetched successfully',
        data: result
      })
    } else return res.status(400).json({
      success: false,
      message: 'None'
    })
  })
}

module.exports.add = (req, res) => {
  var newBill = new Bill({
    billId: crypto.randomBytes(4).toString('hex'),
    groupId: req.query.groupId ? req.query.groupId : '',
    users: req.query.users ? req.query.users : [],
    billName: req.query.billName ? req.query.billName : `Bill ${this.billId}`
  })

  newBill.save((err, bill) => {
    if (err) {
      return res.status(400).json({
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
  if (req.query.billName) queryData.billName = req.query.billName

  Bill.updateOne({billId: req.params.id}, queryData, (err, bill) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Bill updated successfully'
    })
  })
}

module.exports.remove = (req, res) => {
  Bill.deleteOne({billId: req.params.id}, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Error'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Bill deleted successfully'
    })
  })
}