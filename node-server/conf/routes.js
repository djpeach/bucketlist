const express = require('express')
const router = express.Router()

const utils = require('../controllers/utils')

router.get('/utils/reset', utils.reset)

module.exports = router
