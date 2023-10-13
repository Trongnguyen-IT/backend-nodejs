'use strict'

const express = require('express')
const routes = require('./access')
const { apiKey, permission } = require('../auth/checkAuth')

const router = express.Router()

router.use(apiKey)
router.use(permission('0000'))

router.get('/', (req, res) => res.send('home'))
router.use('/v1/api/', routes)

module.exports = router