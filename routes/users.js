var express = require('express')
var router = express.Router()
var usersController = require('../controllers/users.js')

router.get('/', usersController.fetchAll)
router.get('/:id', usersController.fetchOne)
router.post('/', usersController.add)
router.post('/auth', usersController.auth)
router.post('/:id', usersController.update)
router.delete('/:id', usersController.remove)

module.exports = router