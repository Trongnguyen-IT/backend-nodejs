'use strict'

const express = require('express')
const routes = require('./auth')

const router = express.Router()

router.use('/v1/api/', routes)

module.exports = router