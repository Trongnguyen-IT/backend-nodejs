'use strict'

const express = require('express')
const { asyncHandler } = require('../../auth/checkAuth')
const authenticationController = require('../../controllers/access.controller')

const router = express.Router()


router.post('/authentication/signup', asyncHandler(authenticationController.signUp))
router.post('/authentication/login', asyncHandler(authenticationController.login))

module.exports = router