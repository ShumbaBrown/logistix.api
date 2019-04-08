var express = require('express')
var router = express.Router()
var groupsController = require('../controllers/groups.js')

router.get('/', groupsController.fetchAll)
router.get('/:id', groupsController.fetchOne)
router.post('/', groupsController.add)
router.post('/:id', groupsController.update)
router.delete('/:id', groupsController.remove)

module.exports = router