'use strict'

const express = require('express')
const router = express.Router()
const authenticationController = require('../../controllers/auth.controller')

//signup
router.post('/authentication/signup', authenticationController.signUp)

module.exports = router