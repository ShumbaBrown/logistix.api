var mongoose = require('mongoose')
var crypto = require('crypto')
var Bill = require('../models/bill')

module.exports.fetchAll = (req, res) => {
  Bill.find({}, (err, result) => {
    if (err) throw err
    if (result) {
      console.log('Get request for bills')
      res.status(200).json({
        success: true,
        message: 'Bills fetched successfully',
        data: result
      })
    } else res.status(200).send('None')
  })
}

module.exports.fetchOne = (req, res) => {
  Bill.findOne({ billId: req.params.id }, (err, result) => {
    if (err) throw err
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Bill fetched successfully',
        data: result
      })
    } else res.status(200).send('None')
  })
}

module.exports.add = (req, res) => {
  var newBill = new Bill({
    billId: crypto.randomBytes(7).toString('hex'),
    groupId: '',
    users: []
  })

  newBill.save((err, bill) => {
    if (err) throw err
    res.status(200).json({
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

  Bill.updateOne({billId: req.params.id}, queryData, (err, bill) => {
    if (err) throw err
    res.status(200).json({
      success: true,
      message: 'Bill updated successfully'
    })
  })
}

module.exports.remove = (req, res) => {
  Bill.deleteOne({billId: req.params.id}, (err) => {
    if (err) throw err
    res.status(200).json({
      success: true,
      message: 'Bill deleted successfully'
    })
  })
}