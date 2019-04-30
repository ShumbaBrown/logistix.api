var express = require('express')
var router = express.Router()
var groupsController = require('../controllers/groups.js')

router.get('/', groupsController.fetchAll)
router.get('/:id', groupsController.fetchOne)
router.get('/user/:username', groupsController.fetchUserByName)
router.post('/', groupsController.add)
router.post('/:id', groupsController.update)
router.post('/:id/add', groupsController.addUser)
router.delete('/:id', groupsController.remove)

module.exports = router
