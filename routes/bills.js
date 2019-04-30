var express = require('express')
var router = express.Router()
var billsController = require('../controllers/bills.js')

router.get('/', billsController.fetchAll)
router.get('/:id', billsController.fetchOne)
router.get('/user/:username', billsController.fetchBillsByName)
router.post('/', billsController.add)
router.post('/:id', billsController.update)
router.delete('/:id', billsController.remove)

module.exports = router