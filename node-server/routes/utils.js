const express = require('express')
const router = express.Router()
const controller = require('../controllers/utils')

// /utils/reset
router.get('/reset', controller.reset)

module.exports = router
